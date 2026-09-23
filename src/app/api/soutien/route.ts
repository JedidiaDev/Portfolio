import {
  createCheckoutSession,
  isSaspayConfigured,
  MAX_AMOUNT,
  MIN_AMOUNT,
  SaspayError,
} from "@/lib/saspay";

/* ==========================================================================
   POST /api/soutien
   Crée une session de checkout SasPay et renvoie l'URL de paiement.
   La clé secrète ne quitte jamais ce processus : le navigateur n'envoie
   qu'un montant et l'identité du donateur, et ne reçoit qu'une URL.
   ========================================================================== */

// Un paiement n'a rien de statique — jamais de prerender ni de cache.
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fail(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

/**
 * Base publique du site, pour construire la `return_url`.
 * On préfère la variable d'env (valeur canonique, sans port de dev) et on
 * retombe sur l'origine de la requête — jamais sur un header `Host` brut
 * qui serait contrôlé par l'appelant sans filet.
 */
function siteOrigin(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  return new URL(request.url).origin;
}

export async function POST(request: Request) {
  if (!isSaspayConfigured()) {
    return fail(
      "Les dons sont momentanément indisponibles. Réessaie plus tard.",
      503,
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return fail("Requête illisible.", 400);
  }

  const { amount, name, email } = (payload ?? {}) as Record<string, unknown>;

  const parsedAmount = typeof amount === "number" ? amount : Number(amount);
  if (!Number.isFinite(parsedAmount) || !Number.isInteger(parsedAmount)) {
    return fail("Montant invalide.", 400);
  }
  if (parsedAmount < MIN_AMOUNT || parsedAmount > MAX_AMOUNT) {
    return fail(
      `Le montant doit être compris entre ${MIN_AMOUNT} et ${MAX_AMOUNT.toLocaleString("fr-FR")} XAF.`,
      400,
    );
  }

  // `customer_name` et `customer_email` sont requis par l'API SasPay.
  const customerName = typeof name === "string" ? name.trim() : "";
  const customerEmail = typeof email === "string" ? email.trim() : "";

  if (customerName.length < 2 || customerName.length > 80) {
    return fail("Indique un nom (2 caractères minimum).", 400);
  }
  if (!EMAIL_RE.test(customerEmail) || customerEmail.length > 120) {
    return fail("Indique une adresse email valide.", 400);
  }

  try {
    const session = await createCheckoutSession({
      amount: parsedAmount,
      customerName,
      customerEmail,
      description: `Soutien au portfolio — ${parsedAmount.toLocaleString("fr-FR")} XAF`,
      returnUrl: `${siteOrigin(request)}/soutien/merci`,
      metadata: { source: "portfolio", kind: "donation" },
    });

    return Response.json(
      { url: session.checkout_url, id: session.id },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof SaspayError) {
      // Les erreurs de validation ou d'état (4xx) portent un message utile au
      // visiteur ; les pannes côté SasPay restent volontairement opaques.
      console.error(`[saspay] ${error.code} (${error.status}): ${error.message}`);
      const clientSafe = error.status >= 400 && error.status < 500;
      return fail(
        clientSafe
          ? error.message
          : "SasPay est injoignable pour le moment. Réessaie dans un instant.",
        clientSafe ? 400 : 502,
      );
    }

    console.error("[saspay] erreur inattendue", error);
    return fail("Une erreur est survenue. Réessaie dans un instant.", 500);
  }
}
