import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Écran introuvable" };

export default function NotFound() {
  return (
    <section className="scr-section scr-full state-section">
      <div className="wrap state-inner">
        <p className="t-xs state-code">ERROR 404</p>
        <h1 className="t-lg" style={{ color: "var(--toghu)" }}>
          GAME OVER
        </h1>
        <p className="body" style={{ margin: "var(--s3) auto 0" }}>
          Cet écran n&apos;existe pas — ou n&apos;existe plus. Rien de cassé
          de ton côté.
        </p>
        <div className="state-actions">
          <Link href="/" className="btn">
            CONTINUE ?
          </Link>
          <Link href="/projects" className="btn ghost">
            STAGE SELECT
          </Link>
        </div>
      </div>
    </section>
  );
}
