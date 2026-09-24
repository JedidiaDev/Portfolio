import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DOMAINS } from "@/data/domains";

export const metadata: Metadata = {
  title: "Player card",
  description:
    "Développeur full-stack basé à Yaoundé : backend Java/Spring et Laravel, frontend React/Next.js, sécurité et infrastructure.",
  alternates: { canonical: "/about" },
};

/* Composant serveur — la page n'a aucun état. */

const IDCARD = [
  { k: "CLASSE", v: "FULL-STACK" },
  { k: "GUILDE", v: "AFROZA EDITOR" },
  { k: "RANG", v: "CTO" },
  { k: "BASE", v: "YAOUNDÉ, CM" },
  { k: "FORMATION", v: "LICENCE SÉCURITÉ INFO." },
];

export default function Profil() {
  return (
    <section id="profil" className="scr-section scr-top">
      <div className="wrap">
        <h1 className="t-lg">PLAYER 1</h1>
        <p className="body section-lede">
          Développeur full-stack basé à Yaoundé, au Cameroun.
        </p>

        <div className="player-grid">
          {/* Colonne fiche — portrait + caractéristiques, épinglée au défilement */}
          <aside className="player-aside">
            <div className="portrait px-thick">
              <div className="img">
                <Image
                  src="/images/portrait.jpeg"
                  alt="Portrait de Jedidia Kamdem Souop, traité en pixel art"
                  width={468}
                  height={468}
                  className="portrait-pixel"
                  sizes="(max-width: 1000px) 100vw, 420px"
                  priority
                />
              </div>
              <div className="cap">J. KAMDEM SOUOP</div>
            </div>

            <ul className="idcard">
              {IDCARD.map((row) => (
                <li key={row.k}>
                  <span>{row.k}</span>
                  <b>{row.v}</b>
                </li>
              ))}
              <li>
                <span>GITHUB</span>
                <a
                  href="https://github.com/JedidiaDev"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  JEDIDIADEV
                  <span className="ext-mark" aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>

            <div className="aside-actions">
              <Link href="/contact" className="btn sm full">
                ME CONTACTER
              </Link>
              <Link href="/projects" className="btn sm ghost full">
                VOIR LES PROJETS
              </Link>
            </div>
          </aside>

          {/* Colonne récit — boîte de dialogue, puis inventaire. Les deux
              vivent ici : avec la seule boîte de dialogue, le portrait
              laissait cette colonne vide sur presque toute sa hauteur. */}
          <div className="player-main">
            <div className="dialog-box px">
              <div className="dialog-name">
                <svg width="16" height="16" aria-hidden="true">
                  <use href="#i-bust" />
                </svg>
                JEDIDIA
              </div>
              <div className="dialog-body">
                <p className="body">
                  Je construis des produits web de bout en bout depuis
                  Yaoundé. Comme <b>CTO d&apos;Afroza Editor</b>, je pilote une
                  petite équipe pluridisciplinaire sur cinq produits en
                  parallèle — d&apos;une place de marché en production à un
                  système de paiement mobile encore en prototype.
                </p>
                <div>
                  <p className="body">
                    Ma licence en sécurité informatique n&apos;est pas une ligne
                    décorative : elle change la façon dont je découpe une API,
                    dont je gère une session et dont je révise le code des
                    autres.
                  </p>
                  <p className="body">
                    Ma devise : <b>
                      « La sécurité n&apos;est pas une option, c&apos;est une
                      nécessité »
                    </b>.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="t-sm domains-title">INVENTAIRE / DOMAINES</h2>
            <ul className="domains">
              {DOMAINS.map((d) => (
                <li className="domain-card px" key={d.title}>
                  <div className="domain-head">
                    <span className="domain-icon" aria-hidden="true">
                      <svg width="20" height="20">
                        <use href={`#i-${d.icon}`} />
                      </svg>
                    </span>
                    <h3>{d.title}</h3>
                  </div>
                  <p>{d.text}</p>
                  <div className="chips">
                    {d.tools.map((t) => (
                      <span className="chip" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
