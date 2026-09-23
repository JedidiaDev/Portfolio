import type { Metadata } from "next";
import { SOCIALS } from "@/data/socials";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une mission, un poste, un projet à construire ensemble ? Écrivez à Jedidia Kamdem Souop — réponse sous 48 h.",
  alternates: { canonical: "/contact" },
};

const COUNTDOWN = ["10", "09", "08", "07", "06", "05", "04", "03", "02", "01"];

export default function Contact() {
  return (
    <section id="contact" className="continue-section">
      <div className="continue-inner">
        <h1 className="t-lg" style={{ color: "var(--toghu)" }}>
          CONTINUE?
        </h1>

        {/* Décor : le compteur d'arcade défile en CSS, figé si l'utilisateur
            a demandé moins de mouvement. */}
        <div className="countdown" aria-hidden="true">
          {COUNTDOWN.map((n, i) => (
            <span key={n} style={{ animationDelay: `${i * 0.12}s` }}>
              {n}
            </span>
          ))}
        </div>

        <p className="body section-lede" style={{ margin: "0 auto var(--s4)", textAlign: "center" }}>
          Une mission, un poste, un projet à construire ensemble ? Écrivez, je
          réponds sous 48 h.
        </p>

        <ContactForm />

        <div className="socials">
          {SOCIALS.map((s) => {
            const external = s.href.startsWith("http");
            return (
              <a
                key={s.label}
                href={s.href}
                className="btn sm ghost"
                {...(external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                {s.label}
                {external && (
                  <span className="ext-mark" aria-hidden="true">
                    ↗
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
