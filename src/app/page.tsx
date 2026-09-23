import Image from "next/image";
import Link from "next/link";
import { PIXEL_STACK } from "@/data/stack";

/* ============================================================
   Attract screen — l'écran d'appel de la borne.
   Composant serveur : rien ici n'a besoin du navigateur.
   ============================================================ */

const SPRITES = [
  { id: "i-coin", color: "#F5A623" },
  { id: "i-shield", color: "#E2453F" },
  { id: "i-chip", color: "#45E08C" },
  { id: "i-key", color: "#F2E7D5" },
  { id: "i-coin", color: "#F5A623" },
];

/* Les destinations proposées juste sous le hero : sans elles, la seule voie
   depuis l'accueil était le menu, que rien n'obligeait à ouvrir. */
const SLOTS = [
  { n: "01", title: "PLAYER CARD", hint: "Qui je suis, et ce que je sais faire.", href: "/about" },
  { n: "02", title: "STAGE SELECT", hint: "Six produits construits entre 2024 et 2026.", href: "/projects" },
  { n: "03", title: "QUEST LOG", hint: "Le parcours, année par année.", href: "/parcours" },
  { n: "04", title: "CONTINUE?", hint: "Une mission, un poste, un projet.", href: "/contact" },
];

function Hero() {
  return (
    <section id="accueil" className="attract-section">
      <div className="attract-inner">
        <p className="credits">ANONYM</p>
        <h1 className="t-xl title-stack">
          <span className="ndop-text">JEDIDIA KAMDEM SOUOP</span>
        </h1>
        <p className="role-line">
          FULL-STACK DEVELOPER
          <br />
          CTO @ AFROZA EDITOR
          <br />
          CYBERSECURITY ENTHUSIAST
        </p>

        <div className="sprites" aria-hidden="true">
          {SPRITES.map((s, i) => (
            <svg key={`${s.id}-${i}`} style={{ color: s.color }}>
              <use href={`#${s.id}`} />
            </svg>
          ))}
        </div>

        <Link href="/about" className="prompt blink">
          PRESS START
        </Link>

        <a href="#select" className="scroll-cue" aria-label="Voir les destinations">
          <span aria-hidden="true">▼</span>
        </a>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...PIXEL_STACK, ...PIXEL_STACK, ...PIXEL_STACK, ...PIXEL_STACK].map(
            (t, i) => (
              <Image
                key={`${t.id}-${i}`}
                src={t.image}
                alt=""
                width={44}
                height={44}
                className="ticker-icon"
                // Les premières icônes sont visibles d'emblée ; le reste du
                // ruban peut attendre.
                loading={i < 8 ? "eager" : "lazy"}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function PlayerSelect() {
  return (
    <section id="select" className="scr-section select-section">
      <div className="wrap">
        <h2 className="t-lg">SELECT YOUR SCREEN</h2>
        <p className="body section-lede">
          Quatre écrans, dans l&apos;ordre que tu veux.
        </p>

        <div className="player-select">
          {SLOTS.map((slot) => (
            <Link key={slot.href} href={slot.href} className="slot px">
              <span className="n">{slot.n}</span>
              <span className="title">{slot.title}</span>
              <span className="hint">{slot.hint}</span>
              <span className="slot-go" aria-hidden="true">
                ENTRER <span className="glyph">▸</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <PlayerSelect />
    </>
  );
}
