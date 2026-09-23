import type { Metadata } from "next";
import { QUEST_LOG } from "@/data/quest_log";
import QuestScene from "@/components/common/QuestScene";

export const metadata: Metadata = {
  title: "Quest log",
  description:
    "Le parcours de Jedidia Kamdem Souop : licence en sécurité informatique, CTO d'Afroza Editor, hackathons et mises en production.",
  alternates: { canonical: "/parcours" },
};

const STATUS_LABEL = { now: "EN COURS", done: "TERMINÉ" } as const;

/** Les années du jeu de données portent parfois leur statut en suffixe
    (« 2026 — EN COURS »). On ne garde que l'année : le statut est déjà
    rendu par la pastille, l'écrire deux fois est du bruit. */
function yearOf(raw: string): string {
  return raw.split("—")[0].trim();
}

export default function Parcours() {
  const inProgress = QUEST_LOG.filter((q) => q.status === "now").length;
  const done = QUEST_LOG.length - inProgress;

  return (
    <section id="parcours" className="scr-section scr-top quest-section">
      {/* Décor animé, derrière le contenu — voir QuestScene.tsx */}
      <QuestScene />

      <div className="wrap">
        <h1 className="t-lg">QUEST LOG</h1>
        <p className="body section-lede">Le parcours, en bref.</p>

        {/* Un état d'avancement lisible d'un coup d'œil, et la légende des
            pastilles — sans elle, leurs couleurs ne voulaient rien dire. */}
        <div className="quest-meta">
          <p className="quest-count">
            <span className="quest-count-n">{QUEST_LOG.length}</span> QUÊTES
          </p>
          <ul className="quest-legend">
            <li className="legend-item now">
              <span className="legend-dot" aria-hidden="true" />
              {STATUS_LABEL.now} — {inProgress}
            </li>
            <li className="legend-item done">
              <span className="legend-dot" aria-hidden="true" />
              {STATUS_LABEL.done} — {done}
            </li>
          </ul>
        </div>

        {/* Une liste ordonnée : la chronologie est portée par le balisage,
            pas seulement par le trait vertical décoratif. */}
        <ol className="quest">
          {QUEST_LOG.map((q) => (
            <li className={`qnode ${q.status}`} key={`${q.year}-${q.title}`}>
              <div className="qnode-card px">
                <div className="qnode-head">
                  <p className="yr">{yearOf(q.year)}</p>
                  <span className={`qchip ${q.status}`}>
                    {STATUS_LABEL[q.status]}
                  </span>
                </div>
                <h2>{q.title}</h2>
                <p>{q.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
