import "server-only";

/* ==========================================================================
   Client SasPay — encaissement par checkout hébergé.
   Doc : https://docs.saspay.me/api-reference/introduction

   `import "server-only"` fait échouer le build si ce fichier est jamais
   importé depuis un composant client : la clé secrète donne un accès complet
   au compte marchand (encaissement, retraits, solde) et ne doit jamais
   atteindre le navigateur.
   ========================================================================== */

const API_BASE = process.env.SASPAY_API_BASE ?? "https://api.saspay.me/api/v1";

/** Pays du compte — présélectionne le Cameroun sur la page de paiement. */
export const COUNTRY = "CM";
/** Devise du Cameroun d'après le catalogue SasPay (réseaux mtn_cm, orange_cm). */
export const CURRENCY = "XAF";

/** Bornes du don, en XAF. Le minimum est celui qu'applique SasPay : un
    montant inférieur est refusé par leur API (`Le montant minimum est de
    200 XAF`), autant l'arrêter avant l'aller-retour réseau. Le maximum borne
    ce qu'un formulaire public peut déclencher. */
export const MIN_AMOUNT = 200;
export const MAX_AMOUNT = 1_000_000;

/** Réponse utile d'une création de session — le reste du corps est ignoré. */
export type CheckoutSession = {
  id: string;
  slug: string;
  checkout_url: string;
  status: string;
};

export type CheckoutInput = {
  amount: number;
  customerName: string;
  customerEmail: string;
  description: string;
  returnUrl: string;
  metadata?: Record<string, string>;
};

/** Erreur portant le code métier SasPay, pour distinguer « leur faute » de
    « notre faute » dans la route et ne montrer au visiteur qu'un message sûr. */
export class SaspayError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = "SaspayError";
    this.status = status;
    this.code = code;
  }
}

export function isSaspayConfigured(): boolean {
  return Boolean(process.env.SASPAY_API_KEY);
}

/**
 * L'API enveloppe ses réponses dans `{ success, data, code }`, mais les
 * exemples de /checkout-sessions/ montrent aussi l'objet nu. On accepte les
 * deux formes plutôt que de parier sur une seule.
 */
function unwrap(body: unknown): Record<string, unknown> {
  if (body && typeof body === "object" && "data" in body) {
    const inner = (body as { data: unknown }).data;
    if (inner && typeof inner === "object") return inner as Record<string, unknown>;
  }
  return (body ?? {}) as Record<string, unknown>;
}

/**
 * Extrait un message lisible des deux formes d'erreur documentées :
 * erreur métier `{ message, code }` et erreur de validation
 * `{ champ: ["message"] }`.
 */
function readError(body: unknown): { message: string; code: string } {
  const root = (body ?? {}) as Record<string, unknown>;
  const error = (root.error ?? root) as Record<string, unknown>;

  if (typeof error.message === "string") {
    return {
      message: error.message,
      code: typeof error.code === "string" ? error.code : "saspay_error",
    };
  }

  // Erreur de validation : une entrée par champ invalide. Les noms de champs
  // sont ceux de l'API ; on les traduit pour ne pas afficher « amount : … »
  // à un visiteur.
  const FIELD_LABELS: Record<string, string> = {
    amount: "Montant",
    currency: "Devise",
    customer_email: "Email",
    customer_name: "Nom",
    country: "Pays",
  };
  const first = Object.entries(error).find(
    ([, v]) => Array.isArray(v) && typeof v[0] === "string",
  );
  if (first) {
    const [field, messages] = first;
    const label = FIELD_LABELS[field];
    const text = (messages as string[])[0];
    return {
      message: label ? `${label} : ${text}` : text,
      code: "validation_error",
    };
  }

  return { message: "Réponse inattendue de SasPay.", code: "unknown_error" };
}

/**
 * Crée une session de checkout hébergé et renvoie l'URL vers laquelle
 * rediriger le visiteur.
 *
 * `amount` part en chaîne décimale à deux décimales, comme dans tous les
 * exemples de la doc — un nombre JSON risquerait une notation exponentielle
 * sur les grands montants.
 *
 * Note : cet endpoint ne gère pas `Idempotency-Key` (un double appel crée
 * deux sessions), mais une session ne débite rien tant qu'elle n'est pas
 * payée — sans conséquence financière.
 */
export async function createCheckoutSession(
  input: CheckoutInput,
): Promise<CheckoutSession> {
  const apiKey = process.env.SASPAY_API_KEY;
  if (!apiKey) {
    throw new SaspayError("SASPAY_API_KEY absente.", 503, "not_configured");
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE}/checkout-sessions/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: input.amount.toFixed(2),
        currency: CURRENCY,
        country: COUNTRY,
        description: input.description,
        customer_email: input.customerEmail,
        customer_name: input.customerName,
        return_url: input.returnUrl,
        metadata: input.metadata ?? {},
      }),
      // Un paiement ne doit jamais être servi depuis un cache.
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
  } catch (cause) {
    throw new SaspayError(
      cause instanceof Error && cause.name === "TimeoutError"
        ? "SasPay n'a pas répondu à temps."
        : "Impossible de joindre SasPay.",
      502,
      "network_error",
    );
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const { message, code } = readError(body);
    throw new SaspayError(message, response.status, code);
  }

  const data = unwrap(body);
  const checkoutUrl = data.checkout_url;

  // Un 2xx sans checkout_url n'est pas exploitable : mieux vaut échouer ici
  // que rediriger le visiteur vers `undefined`.
  if (typeof checkoutUrl !== "string" || checkoutUrl.length === 0) {
    throw new SaspayError(
      "SasPay n'a pas renvoyé d'URL de paiement.",
      502,
      "missing_checkout_url",
    );
  }

  return {
    id: String(data.id ?? ""),
    slug: String(data.slug ?? ""),
    checkout_url: checkoutUrl,
    status: String(data.status ?? "PENDING"),
  };
}
