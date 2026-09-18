export type Project = {
  id: string;
  no: string;
  thumb: "a" | "b" | "c" | "d" | "e";
  icon: "cart" | "key" | "flask" | "book" | "car" | "hands";
  title: string;
  desc: string;
  chips: string[];
  status: "live" | "mvp" | "rnd" | "wip";
  statusLabel: string;
  context: string;
  role: string;
  architecture: string;
  result: string;
  liveUrl?: string;
  codeUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "marketplace",
    no: "STAGE 01",
    thumb: "b",
    icon: "cart",
    title: "AFROZA MARKETPLACE",
    desc: "Place de marché panafricaine, en production. Catalogue, paiements, gestion vendeurs, stockage objet.",
    chips: ["Laravel", "React", "Inertia.js", "PostgreSQL", "MinIO", "Docker"],
    status: "live",
    statusLabel: "LIVE",
    context:
      "Donner aux vendeurs camerounais une vitrine en ligne qui tienne la charge et accepte les paiements locaux.",
    role: "Architecture, backend Laravel, intégration React via Inertia, mise en production Docker/Nginx, revue de code de l'équipe.",
    architecture: `navigateur
   │
   ├─ Nginx ──► Laravel (API + Inertia)
   │               ├─ PostgreSQL   données
   │               ├─ MinIO        médias
   │               └─ Reverb       temps réel
   │
   └─ React / TypeScript (SPA)`,
    result: "En production sur afrozamarketplace.app.", // TODO: remplace par un résultat vérifiable (volume, uptime, etc.)
    liveUrl: "https://afrozamarketplace.app",
  },
  {
    id: "afroza-pay",
    no: "STAGE 02",
    thumb: "a",
    icon: "key",
    title: "AFROZA PAY",
    desc: "Identité numérique et paiements mobiles pour l'inclusion financière. Né au Africa Digital ID Hackathon.",
    chips: ["Elixir", "React Native", "Stablecoin"],
    status: "mvp",
    statusLabel: "MVP",
    context:
      "Concevoir un système de paiement mobile appuyé sur une identité numérique vérifiable, pour des utilisateurs souvent hors des circuits bancaires classiques.",
    role: "Conception du concept produit et de l'architecture technique dans le cadre du hackathon.",
    architecture: `app mobile (React Native)
   │
   └─ API Elixir ──► identité numérique (SSI)
                  ──► rail de paiement mobile`,
    result: "Prototype présenté au Africa Digital ID Hackathon.", // TODO: préciser le classement / retour du jury si pertinent
  },
  {
    id: "openscience-hub",
    no: "STAGE 03",
    thumb: "c",
    icon: "flask",
    title: "OPENSCIENCEHUB",
    desc: "Plateforme de recherche scientifique africaine : IA, recherche sémantique, attestations vérifiables.",
    chips: ["IA", "Recherche sémantique", "SSI"],
    status: "rnd",
    statusLabel: "R&D",
    context:
      "Donner à la recherche scientifique africaine une plateforme qui combine découverte assistée par IA et vérification d'identité décentralisée.",
    role: "Conception du dossier de candidature YouthConnekt Sahel et de l'architecture produit.",
    architecture: `recherche sémantique (IA)
   │
   └─ index de publications ──► identifiants vérifiables (SSI)`,
    result: "Dossier de candidature YouthConnekt Sahel Forum 2026 déposé.",
  },
  {
    id: "tutorhub",
    no: "STAGE 04",
    thumb: "d",
    icon: "book",
    title: "TUTORHUB",
    desc: "Plateforme EdTech camerounaise. Mise en relation élèves/tuteurs, sessions en temps réel.",
    chips: ["Spring Boot", "Next.js", "TypeScript", "WebSockets"],
    status: "wip",
    statusLabel: "EN COURS",
    context:
      "Mettre en relation élèves et tuteurs au Cameroun, avec des sessions de cours suivies en temps réel.",
    role: "Architecture Spring Boot + Next.js, couche temps réel par WebSockets.",
    architecture: `Next.js (client)
   │
   └─ Spring Boot API ──► PostgreSQL
                       ──► WebSockets (sessions live)`,
    result: "En développement.", // TODO: mettre à jour au lancement
  },
  {
    id: "vora",
    no: "STAGE 05",
    thumb: "e",
    icon: "car",
    title: "VORA",
    desc: "Mobilité urbaine : signalements collaboratifs, suivi du chauffeur en direct, bouton SOS. Construit en 48 h.",
    chips: ["Spring Boot", "Temps réel", "Hackathon NuxCine 2026"],
    status: "mvp",
    statusLabel: "48H",
    context:
      "MVP de VTC/covoiturage pour le hackathon NuxCine 2026 : trois apps (passager, chauffeur, dashboard admin) reliées en temps réel.",
    role: "Choix et développement du backend Spring Boot, connexion temps réel entre les trois apps.",
    architecture: `App Passager ─┐
App Chauffeur ─┼─► Spring Boot API ──► canal temps réel (SOS, tracking)
Dashboard Admin ─┘`,
    result: "MVP livré en 48h dans le cadre du hackathon NuxCine 2026.",
  },
  {
    id: "afroza-together",
    no: "STAGE 06",
    thumb: "c",
    icon: "hands",
    title: "AFROZA TOGETHER",
    desc: "Cagnottes solidaires. Collecte, suivi de progression, reversement.",
    chips: ["Django", "React"],
    status: "live",
    statusLabel: "LIVE",
    context: "Permettre des cagnottes solidaires suivies et transparentes.",
    role: "Refonte de l'identité visuelle et de l'expérience de suivi de progression.",
    architecture: `React (client)
   │
   └─ Django API ──► PostgreSQL`,
    result: "En ligne.", // TODO: remplace par un résultat vérifiable
  },
];