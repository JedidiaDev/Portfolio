import crypto from "node:crypto";

/* ==========================================================================
   POST /api/saspay/webhook
   Reçoit les events SasPay (transaction.success, transaction.failed…).
   Doc : https://docs.saspay.me/api-reference/webhooks

   À déclarer depuis le tableau de bord SasPay (Webhooks → Ajouter) :
   l'URL publique de cette route, puis copie le `signing_secret` dans
   SASPAY_WEBHOOK_SECRET — il n'est affiché qu'une seule fois.
   ========================================================================== */

export const dynamic = "force-dynamic";

/** Tolérance d'horodatage recommandée par la doc : 5 minutes. */
const TOLERANCE_SECONDS = 300;

/**
 * Deux contrôles, pas un seul :
 *  1. l'âge — sans lui, un webhook légitime intercepté reste rejouable
 *     indéfiniment, sa signature ne périmant jamais ;
 *  2. la signature — recalculée sur le corps BRUT reçu, jamais sur une
 *     re-sérialisation (l'ordre des clés casserait la comparaison).
 */
function isValidSignature(
  rawBody: string,
  signature: string,
  timestamp: string,
  secret: string,
): boolean {
  const sent = Number(timestamp);
  if (!Number.isFinite(sent)) return false;

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - sent) > TOLERANCE_SECONDS) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  // timingSafeEqual exige des longueurs égales — on compare d'abord, sinon
  // il lève au lieu de renvoyer false.
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = process.env.SASPAY_WEBHOOK_SECRET;

  // Sans secret configuré, on refuse tout plutôt que de traiter des
  // livraisons non vérifiées : n'importe qui pourrait sinon poster ici.
  if (!secret) {
    console.error("[saspay:webhook] SASPAY_WEBHOOK_SECRET absente — livraison refusée.");
    return new Response("webhook non configuré", { status: 503 });
  }

  const signature = request.headers.get("x-webhook-signature") ?? "";
  const timestamp = request.headers.get("x-webhook-timestamp") ?? "";
  const rawBody = await request.text();

  if (!isValidSignature(rawBody, signature, timestamp, secret)) {
    return new Response("signature invalide", { status: 403 });
  }

  let event: { event?: string; data?: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("corps illisible", { status: 400 });
  }

  switch (event.event) {
    case "transaction.success": {
      const d = event.data ?? {};
      // `amount` n'est pas ce que le payeur débourse : selon fee_charge_mode,
      // c'est `charged` qui quitte son compte et `net_amount` qui revient.
      console.info(
        `[saspay:webhook] don confirmé — net ${d.net_amount} ${d.currency} (débité : ${d.charged}), réf ${d.reference}`,
      );
      break;
    }
    case "transaction.failed":
    case "transaction.cancelled":
      console.info(`[saspay:webhook] ${event.event} — réf ${event.data?.reference}`);
      break;
    case "webhook.test":
      console.info("[saspay:webhook] event de test reçu — intégration OK.");
      break;
    default:
      console.info(`[saspay:webhook] event ignoré : ${event.event}`);
  }

  // Répondre 2xx rapidement : SasPay coupe à 15 s et ne retente que 5 fois
  // (immédiat, +30 s, +5 min, +30 min, +2 h) avant un échec définitif.
  return new Response(null, { status: 204 });
}
