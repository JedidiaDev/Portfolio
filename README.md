# Portfolio - Développeur Full-Stack

Un portfolio moderne et interactif construit avec React et Framer Motion.

## Fonctionnalités

- **Animations fluides** : Animations de scroll, effets de parallax et transitions élégantes avec Framer Motion
- **Curseur personnalisé** : Curseur animé avec effets de survol
- **Design responsive** : Adapté à tous les écrans (mobile, tablette, desktop)
- **Mode sombre** : Design épuré avec thème sombre moderne
- **Performance optimisée** : Chargement rapide et animations fluides

## Sections

1. **Hero** - Présentation avec effet typewriter et animations au scroll
2. **À propos** - Section sur vous avec statistiques animées
3. **Projets** - Grille de projets filtrable avec hover effects
4. **Compétences** - Barres de progression animées par catégorie
5. **Contact** - Formulaire de contact avec animations de focus

## Technologies utilisées

- **React 18** - Framework JavaScript
- **Vite** - Build tool ultra-rapide
- **Framer Motion** - Animations et gestures
- **CSS Modules** - Styles scopés par composant
- **React Intersection Observer** - Animations au scroll

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## Personnalisation

### Modifier vos informations

1. **Hero** (`src/components/Hero.jsx`) : Changez votre nom et titre
2. **About** (`src/components/About.jsx`) : Modifiez votre description et statistiques
3. **Projects** (`src/components/Projects.jsx`) : Ajoutez vos projets
4. **Skills** (`src/components/Skills.jsx`) : Mettez à jour vos compétences
5. **Contact** (`src/components/Contact.jsx`) : Changez vos coordonnées

### Modifier les couleurs

Éditez les variables CSS dans `src/styles/index.css` :

```css
:root {
  --accent-primary: #6366f1;    /* Couleur principale */
  --accent-secondary: #8b5cf6;  /* Couleur secondaire */
  --bg-primary: #0a0a0f;        /* Fond principal */
}
```

### Ajouter EmailJS pour le formulaire

1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Configurez un service et template
3. Modifiez `Contact.jsx` pour intégrer EmailJS

## Structure du projet

```
src/
├── components/
│   ├── About.jsx        # Section À propos
│   ├── Contact.jsx      # Section Contact
│   ├── CustomCursor.jsx # Curseur personnalisé
│   ├── Footer.jsx       # Pied de page
│   ├── Hero.jsx         # Section Hero
│   ├── Loader.jsx       # Animation de chargement
│   ├── Navbar.jsx       # Navigation
│   ├── Projects.jsx     # Section Projets
│   ├── Skills.jsx       # Section Compétences
│   └── SmoothScroll.jsx # Wrapper scroll
├── styles/
│   └── index.css        # Styles globaux
├── App.jsx              # Composant principal
└── main.jsx             # Point d'entrée
```

## Déploiement

Le projet peut être déployé sur :

- **Vercel** : `vercel`
- **Netlify** : Glissez-déposez le dossier `dist`
- **GitHub Pages** : Avec le paquet `gh-pages`

## Licence

MIT - Utilisez librement pour vos projets personnels !
