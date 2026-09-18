"use client";

import Link from "next/link";
import Image from "next/image";
import { DOMAINS } from "@/data/domains";
import Footer from "@/components/layout/footer";
import SpriteSheet from "@/components/common/SpriteSheet";

export default function Profil() {
  return (
    <>
    <SpriteSheet />
    <section id="profil" className="scr-section scr-full">
      <div className="wrap">
        <h2 className="t-lg">PLAYER 1</h2>
        <p className="body section-lede">
          Développeur full-stack basé à Yaoundé, au Cameroun.
        </p>
        <div className="player-grid">
          <div>
            <div className="portrait px">
              <div className="img">
                <Image
                  src="/images/portrait.jpeg"
                  alt="Portrait de Jedidia Kamdem Souop, traité en pixel art"
                  width={468}
                  height={468}
                  className="portrait-pixel"
                  priority
                />
              </div>
              <div className="cap">J. KAMDEM SOUOP</div>
            </div>
            <ul className="idcard">
              <li>
                <span>CLASSE</span>
                <b>FULL-STACK</b>
              </li>
              <li>
                <span>GUILDE</span>
                <b>AFROZA EDITOR</b>
              </li>
              <li>
                <span>BASE</span>
                <b>YAOUNDÉ</b>
              </li>
              <li>
                <span>GITHUB</span>
                <a href="https://github.com/JedidiaDev">JEDIDIADEV</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="body">
              Je construis des produits web de bout en bout depuis Yaoundé.
              Comme <b>CTO d&apos;Afroza Editor</b>, je pilote une petite
              équipe pluridisciplinaire sur cinq produits en parallèle —
              d&apos;une place de marché en production à un système de
              paiement mobile encore en prototype.
            </p>
            <p className="body" style={{ marginTop: 14 }}>
              Ma licence en sécurité informatique n&apos;est pas une ligne
              décorative : elle change la façon dont je découpe une API, dont
              je gère une session et dont je révise le code des autres.
            </p>
            <div className="domains">
              {DOMAINS.map((d) => (
                <div className="domain-card" key={d.title}>
                  <h4>{d.title}</h4>
                  <p>{d.text}</p>
                  <div className="chips">
                    {d.tools.map((t) => (
                      <span className="chip" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer fxOn={false} onToggleFx={() => {}} />
    </>
  );
}