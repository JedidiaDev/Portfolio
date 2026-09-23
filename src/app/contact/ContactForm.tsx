"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  CONTACT_EMAIL,
  EMAILJS,
  isEmailConfigured,
  THROTTLE_MS,
} from "@/lib/emailjs";

/* ==========================================================================
   Formulaire de contact — envoi via EmailJS depuis le navigateur.

   Le template EmailJS doit exposer ces variables :
     {{name}} {{email}} {{subject}} {{message}}
   Les alias {{from_name}} / {{reply_to}} / {{title}} sont aussi envoyés pour
   rester compatible avec le template par défaut d'EmailJS — une variable
   envoyée mais non utilisée par le template est simplement ignorée.
   ========================================================================== */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "name" | "email" | "subject" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState<string | null>(null);
  // Honeypot : invisible pour un humain, rempli par la plupart des bots.
  const honeypot = useRef<HTMLInputElement>(null);

  function set(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    if (status === "error") setStatus("idle");
  }

  function validate(): Errors {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "INDIQUE UN NOM";
    if (!EMAIL_RE.test(values.email.trim())) next.email = "EMAIL INVALIDE — VÉRIFIE LE @";
    if (values.subject.trim().length < 3) next.subject = "SUJET TROP COURT";
    if (values.message.trim().length < 10) next.message = "MESSAGE TROP COURT (10 CAR. MIN.)";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFailure(null);

    // Bot détecté : on affiche le même succès qu'un envoi réel pour ne pas
    // lui indiquer que le piège a fonctionné, mais rien n'est envoyé.
    if (honeypot.current?.value) {
      setStatus("sent");
      setValues(EMPTY);
      return;
    }

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
          // Alias du template EmailJS par défaut.
          from_name: values.name.trim(),
          reply_to: values.email.trim(),
          title: values.subject.trim(),
        },
        {
          publicKey: EMAILJS.publicKey,
          // Le SDK bloque un second envoi trop rapproché depuis ce
          // navigateur, sans consommer de quota.
          limitRate: { id: "contact", throttle: THROTTLE_MS },
        },
      );
      setStatus("sent");
      setValues(EMPTY);
    } catch (err) {
      setStatus("error");
      // EmailJS rejette avec un EmailJSResponseStatus ({ status, text }),
      // pas avec une Error — d'où la lecture défensive.
      const text =
        typeof err === "object" && err !== null && "text" in err
          ? String((err as { text: unknown }).text)
          : null;
      setFailure(
        text?.toLowerCase().includes("limit")
          ? "Doucement — attends une trentaine de secondes avant de renvoyer."
          : "L'envoi a échoué. Réessaie, ou écris-moi directement par email.",
      );
    }
  }

  // Sans configuration EmailJS, un formulaire ne ferait qu'échouer :
  // on propose l'email direct, qui lui fonctionne toujours.
  if (!isEmailConfigured) {
    return (
      <div className="form-wrap">
        <p className="form-status warn" role="status">
          FORMULAIRE HORS LIGNE — ÉCRIS-MOI DIRECTEMENT
        </p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="btn full">
          {CONTACT_EMAIL.toUpperCase()}
        </a>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <div className="form-wrap">
      {/* aria-live : lu par un lecteur d'écran sans déplacer le focus. */}
      <div aria-live="polite">
        {status === "sent" && (
          <p className="form-status">
            <svg width="12" height="12" aria-hidden="true">
              <use href="#i-heart" />
            </svg>
            MESSAGE ENVOYÉ — RÉPONSE SOUS 48 H
          </p>
        )}
        {status === "error" && failure && (
          <p className="form-status err">{failure}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <fieldset className="form-fieldset" disabled={sending}>
          {/* Honeypot — hors flux et hors tabulation, invisible à l'écran
              comme au lecteur d'écran. */}
          <input
            ref={honeypot}
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="honeypot"
          />

          <div className={`field${errors.name ? " error" : ""}`}>
            <label htmlFor="name">VOTRE NOM</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              maxLength={80}
              value={values.name}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-err" : undefined}
              onChange={(e) => set("name", e.target.value)}
            />
            {errors.name && (
              <p className="field-error" id="name-err">{errors.name}</p>
            )}
          </div>

          <div className={`field${errors.email ? " error" : ""}`}>
            <label htmlFor="email">EMAIL</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              maxLength={120}
              value={values.email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-err" : undefined}
              onChange={(e) => set("email", e.target.value)}
            />
            {errors.email && (
              <p className="field-error" id="email-err">{errors.email}</p>
            )}
          </div>

          <div className={`field${errors.subject ? " error" : ""}`}>
            <label htmlFor="subject">SUJET</label>
            <input
              id="subject"
              type="text"
              maxLength={120}
              value={values.subject}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "subject-err" : undefined}
              onChange={(e) => set("subject", e.target.value)}
            />
            {errors.subject && (
              <p className="field-error" id="subject-err">{errors.subject}</p>
            )}
          </div>

          <div className={`field${errors.message ? " error" : ""}`}>
            <label htmlFor="message">
              MESSAGE
              <span className="field-count">{values.message.length}/2000</span>
            </label>
            <textarea
              id="message"
              rows={5}
              maxLength={2000}
              value={values.message}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-err" : undefined}
              onChange={(e) => set("message", e.target.value)}
            />
            {errors.message && (
              <p className="field-error" id="message-err">{errors.message}</p>
            )}
          </div>

          <button type="submit" className="btn full">
            {sending ? (
              <>
                <span className="spinner-px" aria-hidden="true" />
                ENVOI...
              </>
            ) : (
              "ENVOYER"
            )}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
