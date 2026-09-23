import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Stage select",
  description:
    "Les produits construits par Jedidia Kamdem Souop entre 2024 et 2026 : marketplace, paiement mobile, mobilité urbaine, plateformes éducatives.",
  alternates: { canonical: "/projects" },
};

/* Le décompte suit les données : « six produits » écrit en dur mentait dès
   le septième ajouté. */
const COUNT = PROJECTS.length;

export default function Projets() {
  return (
    <section id="projets" className="scr-section scr-top">
      <div className="wrap">
        <h1 className="t-lg">STAGE SELECT</h1>
        <p className="body section-lede">
          {COUNT} produits construits entre 2024 et 2026.
        </p>

        <ul className="stages">
          {PROJECTS.map((p) => (
            <li key={p.id} className="stage-cell">
              <Link href={`/projects/${p.id}`} className="stage px">
                <span className={`thumb ${p.thumb}`} aria-hidden="true">
                  <span className="no">{p.no}</span>
                  <svg>
                    <use href={`#i-${p.icon}`} />
                  </svg>
                </span>
                <span className="in">
                  <span className="stage-head">
                    <h2>{p.title}</h2>
                    <span className={`pill ${p.status}`}>{p.statusLabel}</span>
                  </span>
                  <span className="desc">{p.desc}</span>
                  <span className="chips">
                    {p.chips.map((c) => (
                      <span className="chip" key={c}>
                        {c}
                      </span>
                    ))}
                  </span>
                  <span className="foot">
                    <span className="stage-go" aria-hidden="true">
                      VOIR LE STAGE <span className="glyph">▸</span>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
