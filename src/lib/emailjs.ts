/* ==========================================================================
   Configuration EmailJS — formulaire de contact.

   Les trois valeurs sont publiques par conception : la « public key » EmailJS
   est faite pour vivre dans le navigateur. La protection contre l'abus ne
   vient donc pas du secret mais de la console EmailJS :
     Account → Security → Allowed origins  (n'autorise que ton domaine)
   à compléter par le throttle et le honeypot côté formulaire.
   ========================================================================== */

export const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
} as const;

/**
 * Next.js remplace `process.env.NEXT_PUBLIC_*` à la compilation : si une
 * variable manque au build, la chaîne est vide côté client. On le détecte
 * ici pour afficher un repli utilisable (lien mailto) plutôt qu'un
 * formulaire qui échouerait à l'envoi.
 */
export const isEmailConfigured =
  EMAILJS.serviceId !== "" &&
  EMAILJS.templateId !== "" &&
  EMAILJS.publicKey !== "";

/** Adresse de repli, affichée si EmailJS n'est pas configuré. */
export const CONTACT_EMAIL = "jedidiakamdemsouop@gmail.com";

/**
 * Délai minimum entre deux envois depuis le même navigateur, appliqué par le
 * SDK (`limitRate`). Une tentative plus rapprochée est rejetée localement,
 * sans consommer de quota EmailJS.
 */
export const THROTTLE_MS = 30_000;
