import Link from "next/link";
import FxToggle from "../common/FxToggle";
import { SOCIALS } from "@/data/socials";

/* Composant serveur : seul le bouton d'effets a besoin du navigateur, et il
   porte son propre "use client". L'état FX vit sur <html data-fx>, plus dans
   des props — le pied de page est donc rendu une fois dans le layout au lieu
   d'être recopié page par page. */

const STATUS = [
  { k: "STACK PRINCIPALE", v: "SPRING BOOT · LARAVEL · REACT / NEXT.JS" },
  { k: "RÔLE ACTUEL", v: "CTO @ AFROZA EDITOR" },
  { k: "BASE", v: "YAOUNDÉ, CAMEROUN" },
  { k: "FORMATION", v: "LICENCE SÉCURITÉ INFORMATIQUE — UNIV. YAOUNDÉ I" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-wrap">
        <div className="footer-cols">
          <div>
            <h2 className="t-sm" style={{ color: "var(--ochre)" }}>
              PLAYER STATUS
            </h2>
            <table className="status-table">
              <tbody>
                {STATUS.map((row) => (
                  <tr key={row.k}>
                    <th scope="row">{row.k}</th>
                    <td>{row.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="footer-aside">
            <h2 className="t-sm" style={{ color: "var(--ochre)" }}>
              LIENS
            </h2>
            <ul className="footer-links">
              {SOCIALS.map((s) => {
                const external = s.href.startsWith("http");
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
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
                  </li>
                );
              })}
              <li>
                <Link href="/soutien">
                  SOUTENIR
                  <span className="ext-mark" aria-hidden="true">
                    ●
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="foot-bar">
        <span className="t-xs">© 2026 JEDIDIA KAMDEM SOUOP</span>
        <FxToggle />
      </div>
    </footer>
  );
}
