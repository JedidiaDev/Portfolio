"use client";

import { useState } from "react";
import { SOCIALS } from "@/data/socials";
import Footer from "@/components/layout/footer";
import SpriteSheet from "@/components/common/SpriteSheet";




export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [emailError, setEmailError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
    if (!validEmail) {
      setEmailError(true);
      setStatus("idle");
      return;
    }
    setEmailError(false);

    // TODO: brancher un vrai backend — par ex. une route app/api/contact/route.ts
    // qui envoie l'email (Resend, Nodemailer) ou un service tiers (Formspree).
    // Ici, on simule un envoi réussi côté client.
    setStatus("sent");
    setValues({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <>
        <SpriteSheet />
        <section id="contact" className="continue-section">
        <h2 className="t-lg" style={{ color: "var(--toghu)" }}>
            CONTINUE?
        </h2>
        <div className="countdown" aria-hidden="true">
            {["10", "09", "08", "07", "06", "05", "04", "03", "02", "01"].map(
            (n, i) => (
                <span key={n} className={i === 3 ? "on" : undefined}>
                {n}
                </span>
            )
            )}
        </div>
        <p className="body" style={{ margin: "0 auto 32px", textAlign: "center" }}>
            Une mission, un poste, un projet à construire ensemble ? Écrivez, je
            réponds sous 48 h.
        </p>
        <div className="form-wrap">
            {status === "sent" && (
            <p className="form-status">MESSAGE ENVOYÉ — RÉPONSE SOUS 48H</p>
            )}
            <form onSubmit={handleSubmit} noValidate>
            <div className="field">
                <label htmlFor="name">VOTRE NOM</label>
                <input
                id="name"
                type="text"
                required
                value={values.name}
                onChange={(e) =>
                    setValues((v) => ({ ...v, name: e.target.value }))
                }
                />
            </div>
            <div className={`field${emailError ? " error" : ""}`}>
                <label htmlFor="email">EMAIL</label>
                <input
                id="email"
                type="email"
                required
                value={values.email}
                onChange={(e) =>
                    setValues((v) => ({ ...v, email: e.target.value }))
                }
                />
                {emailError && (
                <p className="field-error">EMAIL INVALIDE — VÉRIFIEZ LE @</p>
                )}
            </div>
            <div className="field">
                <label htmlFor="subject">SUJET</label>
                <input
                id="subject"
                type="text"
                required
                value={values.subject}
                onChange={(e) =>
                    setValues((v) => ({ ...v, subject: e.target.value }))
                }
                />
            </div>
            <div className="field">
                <label htmlFor="message">MESSAGE</label>
                <textarea
                id="message"
                rows={4}
                required
                value={values.message}
                onChange={(e) =>
                    setValues((v) => ({ ...v, message: e.target.value }))
                }
                />
            </div>
            <button type="submit" className="btn full">
                ENVOYER
            </button>
            </form>
            <div className="socials">
            {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} className="btn sm ghost">
                {s.label}
                </a>
            ))}
            </div>
        </div>
        </section>
        <Footer fxOn={false} onToggleFx={() => {}} />
    </>
  );
}
