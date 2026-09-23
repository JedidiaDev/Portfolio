import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Merci",
  description: "Merci pour ton soutien.",
  // Page d'arrivée après paiement : aucun intérêt dans un index de recherche.
  robots: { index: false, follow: true },
};

/* Cible de la `return_url` envoyée à SasPay. La page de checkout hébergée y
   redirige le navigateur 3 secondes après un paiement réussi.

   Volontairement sans vérification de statut : SasPay ne renvoie rien
   d'exploitable dans cette URL, et une confirmation basée sur une simple
   redirection serait falsifiable. La confirmation qui fait foi arrive par
   webhook (/api/saspay/webhook). D'où le « si ton paiement est passé ». */

export default function Merci() {
  return (
    <section className="scr-section scr-full thanks-section">
      <div className="wrap thanks-inner">
        <div className="thanks-sprites" aria-hidden="true">
          <svg style={{ color: "var(--toghu)" }}><use href="#i-heart" /></svg>
          <svg style={{ color: "var(--ochre)" }}><use href="#i-coin" /></svg>
          <svg style={{ color: "var(--toghu)" }}><use href="#i-heart" /></svg>
        </div>

        <h1 className="t-lg" style={{ color: "var(--ochre)" }}>
          THANK YOU
          <br />
          FOR PLAYING
        </h1>

        <p className="body" style={{ margin: "var(--s3) auto 0" }}>
          Si ton paiement est bien passé, SasPay t&apos;envoie un reçu par
          email. Merci — ça finance directement le temps passé sur ces
          projets.
        </p>

        <div className="thanks-actions">
          <Link href="/" className="btn gold">
            RETOUR À L&apos;ACCUEIL
          </Link>
          <Link href="/projects" className="btn ghost">
            VOIR LES PROJETS
          </Link>
        </div>

        <p className="field-hint" style={{ marginTop: "var(--s3)" }}>
          Un souci avec le paiement ?{" "}
          <Link href="/contact" className="inline-link">
            Écris-moi
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
