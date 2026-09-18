import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import SpriteSheet from "@/components/common/SpriteSheet";




export default function Projets() {
  return (
    <section id="projets" className="scr-section scr-full scr-top">
      <SpriteSheet />
      <div className="wrap">
        <h2 className="t-lg">STAGE SELECT</h2>
        <p className="body section-lede">
          Six produits construits entre 2024 et 2026.
        </p>
        <div className="stages">
          {PROJECTS.map((p) => (
            <Link key={p.id} href={`/projects/${p.id}`} className="stage px">
              <div className={`thumb ${p.thumb}`}>
                <span className="no">{p.no}</span>
                <svg>
                  <use href={`#i-${p.icon}`} />
                </svg>
              </div>
              <div className="in">
                <h3>{p.title}</h3>
                <p className="desc">{p.desc}</p>
                <div className="chips">
                  {p.chips.map((c) => (
                    <span className="chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
                <div className="foot">
                  <span className={`pill ${p.status}`}>{p.statusLabel}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}