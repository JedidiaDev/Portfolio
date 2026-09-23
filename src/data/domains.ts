/* Chaque domaine porte un sprite de la feuille commune (SpriteSheet.tsx) :
   l'icône donne un repère visuel à la carte, en réutilisant le système
   existant plutôt qu'en important un jeu d'icônes. */
export type Domain = {
  title: string;
  icon: "chip" | "book" | "shield" | "key" | "hands";
  tools: string[];
  text: string;
};

export const DOMAINS: Domain[] = [
  {
    title: "BACKEND",
    icon: "chip",
    tools: ["Java", "Spring Boot", "Elixir", "Laravel", "Node.js"],
    text: "Colonne vertébrale d'Afroza Marketplace (Laravel) et de TutorHub (Spring Boot) — API, files d'attente temps réel, intégrations de paiement.",
  },
  {
    title: "FRONTEND",
    icon: "book",
    tools: ["React", "Next.js", "TypeScript", "Inertia.js", "React Native"],
    text: "Interfaces des cinq produits Afroza et de l'app mobile VORA, du prototype au déploiement.",
  },
  {
    title: "SÉCURITÉ",
    icon: "shield",
    tools: ["Licence sécurité informatique", "Audit", "Hardening"],
    text: "Formation dédiée en sécurité informatique, appliquée à la conception d'API et aux revues de code de l'équipe Afroza.",
  },
  {
    title: "INFRA",
    icon: "key",
    tools: ["Docker", "Nginx", "PostgreSQL", "MinIO"],
    text: "Mise en production et exploitation d'Afroza Marketplace, du reverse proxy au stockage objet.",
  },
  {
    title: "PRODUIT",
    icon: "hands",
    tools: ["Architecture", "Roadmap", "Encadrement d'équipe"],
    text: "CTO d'Afroza Editor : direction technique d'une équipe pluridisciplinaire sur cinq produits en parallèle.",
  },
];