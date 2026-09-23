"use client";

import { useEffect } from "react";
import Link from "next/link";

/* Frontière d'erreur du segment racine. Un composant client par convention :
   React doit pouvoir la remonter côté navigateur. */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="scr-section scr-full state-section">
      <div className="wrap state-inner">
        <p className="t-xs state-code">SYSTEM FAULT</p>
        <h1 className="t-lg" style={{ color: "var(--toghu)" }}>
          CONTINUE ?
        </h1>
        <p className="body" style={{ margin: "var(--s3) auto 0" }}>
          Quelque chose a planté de mon côté. Tu peux relancer l&apos;écran —
          si ça recommence, dis-le-moi.
        </p>
        {/* `digest` identifie l'erreur dans les logs serveur sans exposer
            le message d'origine au visiteur. */}
        {error.digest && (
          <p className="mono state-digest">RÉF : {error.digest}</p>
        )}
        <div className="state-actions">
          <button type="button" className="btn" onClick={reset}>
            RÉESSAYER
          </button>
          <Link href="/" className="btn ghost">
            ACCUEIL
          </Link>
        </div>
      </div>
    </section>
  );
}
