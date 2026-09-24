export type Project = {
  id: string;
  no: string;
  thumb: "a" | "b" | "c" | "d" | "e";
  icon:
    | "cart"
    | "key"
    | "flask"
    | "book"
    | "car"
    | "hands"
    | "baby"
    | "leaf"
    | "dice"
    | "building"
    | "school";
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
  // {
  //   id: "afroza-together",
  //   no: "STAGE 06",
  //   thumb: "c",
  //   icon: "hands",
  //   title: "AFROZA TOGETHER",
  //   desc: "Cagnottes solidaires. Collecte, suivi de progression, reversement.",
  //   chips: ["Django", "React"],
  //   status: "live",
  //   statusLabel: "LIVE",
  //   context: "Permettre des cagnottes solidaires suivies et transparentes.",
  //   role: "Refonte de l'identité visuelle et de l'expérience de suivi de progression.",
  //   architecture: `React (client)
  //  │
  //  └─ Django API ──► PostgreSQL`,
  //   result: "En ligne.", // TODO: remplace par un résultat vérifiable
  // },
  {
    id: "muna-daycare",
    no: "STAGE 06",
    thumb: "d",
    icon: "baby",
    title: "MUNA DAYCARE",
    desc: "Plateforme web pour une crèche : site marketing et trois espaces tableau de bord. App mobile parents en cours de dev.",
    chips: ["NextJS", "Dashboards", "App mobile (en dev)"],
    status: "live",
    statusLabel: "LIVE",
    context:
      "Simplifier la gestion administrative d'une crèche et faciliter la communication avec les parents, notamment pour le remplissage des registres.",
    role: "Développement du site marketing sept pages, puis d'une app mobile pour faciliter le remplissage des registres par les parents.",
    architecture: `Site marketing (7 pages)
   │
   └─ 1 dashboard (Admin)
                  ──► App mobile parents (en dev)`,
    result: "En ligne sur muna-daycare.cm ; application mobile parents en cours de développement.", // TODO: mettre à jour au lancement de l'app
    liveUrl: "https://muna-daycare.cm",
  },
  {
    id: "botanik-afro",
    no: "STAGE 07",
    thumb: "a",
    icon: "leaf",
    title: "BOTANIK'AFRO",
    desc: "Système de design UI/UX complet et site sept pages pour une marque de soins capillaires naturels.",
    chips: ["Design System", "Figma", "Next.js"],
    status: "wip",
    statusLabel: "VERSION TEST",
    context:
      "Construire une identité de marque cohérente et un site aligné sur le logo, pour une marque de soins capillaires naturels.",
    role: "Conception du système de design UI/UX (palette et typographie ajustées au logo) et développement du site sept pages.",
    architecture: `Design system (Figma)
   │
   └─ Site 7 pages (Next.js)`,
    result: "Version de test en ligne.", // TODO: remplacer par l'URL et le statut définitifs au lancement
    liveUrl: "https://botanik-afro.vercel.app",
  },
  {
    id: "la-course-de-la-foi",
    no: "STAGE 08",
    thumb: "b",
    icon: "dice",
    title: "LA COURSE DE LA FOI",
    desc: "Jeu de société biblique multiplateforme (mobile, web, back-office) en 9 langues, pour un client.",
    chips: ["Spring Boot", "PostgreSQL", "Mobile", "CMS"],
    status: "rnd",
    statusLabel: "CONCEPTION",
    context:
      "Donner vie à un jeu de société biblique multilingue pensé par un client, sous forme d'application mobile, web et back-office.",
    role: "Analyse du cahier des charges, identité visuelle, maquettes UI/UX (mobile, web, CMS), architecture technique et chiffrage budgétaire, en tant que prestataire indépendant.",
    architecture: `App mobile / Web (maquettes)
   │
   └─ Spring Boot API ──► PostgreSQL
                       ──► back-office CMS`,
    result: "Cahier des charges, identité visuelle, maquettes UI/UX et architecture technique livrés au client ; développement à venir.", // TODO: mettre à jour au démarrage du développement
  },
  {
    id: "toguna-architects",
    no: "STAGE 09",
    thumb: "c",
    icon: "building",
    title: "TOGUNA ARCHITECTS",
    desc: "Charte graphique et plateforme web pour un cabinet d'architecture, logo inspiré du toguna dogon.",
    chips: ["Branding", "UI/UX", "Web"],
    status: "wip",
    statusLabel: "EN COURS",
    context:
      "Créer une identité de marque forte pour un cabinet d'architecture, avant de développer sa plateforme web complète.",
    role: "Conception de la charte graphique complète (logo inspiré du toguna dogon, slogan « From dialogue to dwelling ») puis des maquettes UI/UX de la plateforme, en tant que prestataire.",
    architecture: `Charte graphique (logo, typographie)
   │
   └─ Maquettes UI/UX ──► Plateforme web (à venir)`,
    result: "Charte graphique livrée ; maquettes UI/UX et plateforme web en préparation.", // TODO: mettre à jour à la mise en ligne
  },
  {
    id: "tamtoum",
    no: "STAGE 10",
    thumb: "e",
    icon: "school",
    title: "TAMTOUM",
    desc: "Numérisation du système éducatif camerounais : plateforme multi-tenant pour écoles, collèges et lycées.",
    chips: ["Multi-tenant", "EdTech", "SaaS"],
    status: "rnd",
    statusLabel: "R&D",
    context:
      "Numériser la gestion administrative et pédagogique des établissements scolaires camerounais via une architecture multi-tenant.",
    role: "Conception de l'architecture multi-tenant permettant à chaque établissement de gérer facilement son propre espace.",
    architecture: `Plateforme multi-tenant
   │
   └─ Établissement A / B / C ... (espace isolé par tenant)`,
    result: "Projet en phase de conception.", // TODO: mettre à jour à l'avancement du projet
  },
];