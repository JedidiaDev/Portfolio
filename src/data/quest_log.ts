export type QuestStatus = "done" | "now";

export type QuestEntry = {
  year: string;
  status: QuestStatus;
  title: string;
  text: string;
};

// TODO: vérifie chaque année avant publication — reconstituées à partir
// des projets connus, pas confirmées une à une.
export const QUEST_LOG: QuestEntry[] = [
  {
    year: "2026 — EN COURS",
    status: "now",
    title: "AFRICA DIGITAL ID HACKATHON — AFROZA PAY",
    text: "Conception d'un système de paiement mobile appuyé sur une identité numérique vérifiable (SSI).",
  },
  {
    year: "2026 — EN COURS",
    status: "now",
    title: "HACKATHON NUXCINE — VORA",
    text: "MVP de mobilité urbaine (passager, chauffeur, dashboard admin) livré en 48h, backend Spring Boot.",
  },
  {
    year: "2026 — EN COURS",
    status: "now",
    title: "OPENSCIENCEHUB — YOUTHCONNEKT SAHEL",
    text: "Dossier de candidature déposé pour la plateforme de recherche scientifique africaine.",
  },
  {
    year: "2025",
    status: "done",
    title: "CTO @ AFROZA EDITOR",
    text: "Direction technique de cinq produits actifs et d'une équipe pluridisciplinaire. Audit technique interne, business plan pour un programme d'incubation.",
  },
  {
    year: "2025",
    status: "done",
    title: "LICENCE EN SÉCURITÉ INFORMATIQUE",
    text: "Université de Yaoundé I, Faculté des Sciences.",
  },
  {
    year: "2024",
    status: "done",
    title: "PREMIERS PRODUITS EN PRODUCTION",
    text: "Afroza Marketplace et la cagnotte solidaire (Afroza Together) passent en ligne.",
  },
];
