# 🛡️ Portfolio - Développeur Full Stack & Ethical Hacker

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)

*Un portfolio moderne avec un thème cybersecurity/hacker, des animations fluides et un curseur personnalisé.*

[🚀 Démo Live](#) • [📧 Contact](#contact)

</div>

---

## 📸 Aperçu

```
┌──────────────────────────────────────────────────────────────┐
│  ███████╗██╗   ██╗██╗     ██╗         ███████╗████████╗ █████╗ ██████╗██╗  ██╗  │
│  ██╔════╝██║   ██║██║     ██║         ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝  │
│  █████╗  ██║   ██║██║     ██║         ███████╗   ██║   ███████║██║     █████╔╝   │
│  ██╔══╝  ██║   ██║██║     ██║         ╚════██║   ██║   ██╔══██║██║     ██╔═██╗   │
│  ██║     ╚██████╔╝███████╗███████╗    ███████║   ██║   ██║  ██║╚██████╗██║  ██╗  │
│  ╚═╝      ╚═════╝ ╚══════╝╚══════╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝  │
└──────────────────────────────────────────────────────────────┘
```

## ✨ Fonctionnalités

### 🎨 Design & Thème
- **Thème Cyberpunk/Hacker** - Palette de couleurs sombres avec accents néon verts
- **Style Terminal** - Interface inspirée des terminaux Linux avec police monospace
- **Effets Visuels** - Grille cyber, effets néon glow, scanlines

### 🖱️ Curseur Personnalisé
- Curseur en forme de crosshair avec cercle rotatif animé
- Effet de traînée avec particules lumineuses
- Animation d'onde au clic
- Changement d'apparence au survol des éléments interactifs

### 🎬 Animations
- **Matrix Rain** - Effet de pluie de caractères en arrière-plan
- **Glitch Effect** - Textes avec effet de distorsion aléatoire
- **Typing Effect** - Animation de frappe pour les rôles
- **Scroll Animations** - Apparitions fluides au défilement
- **Skill Bars** - Barres de progression animées

### 📄 Sections
| Section | Description |
|---------|-------------|
| **Home** | Hero avec terminal animé, nom en glitch et statistiques |
| **About** | Bio, timeline de parcours et compétences techniques |
| **Projects** | Galerie filtrable avec cartes interactives |
| **Contact** | Formulaire style terminal et liens sociaux |

## 🛠️ Technologies

```bash
$ cat ./tech_stack.json
```

```json
{
  "frontend": {
    "framework": "React 19",
    "language": "TypeScript 5.9",
    "styling": "Tailwind CSS 4.1",
    "components": "shadcn/ui",
    "animations": "Framer Motion"
  },
  "build": {
    "bundler": "Vite 7.3",
    "package_manager": "npm"
  },
  "design": {
    "icons": "Lucide React",
    "fonts": ["JetBrains Mono", "Fira Code"]
  }
}
```

## 🚀 Installation

```bash
# Cloner le repository
$ git clone https://github.com/JedidiaDev/portfolio.git

# Accéder au dossier
$ cd portfolio

# Installer les dépendances
$ npm install

# Lancer le serveur de développement
$ npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## 📦 Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile le projet pour la production |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Vérifie le code avec ESLint |

## 📁 Structure du Projet

```
portfolio/
├── public/                 # Assets statiques
├── src/
│   ├── assets/            # Images et ressources
│   ├── components/        # Composants React
│   │   ├── ui/           # Composants shadcn/ui
│   │   ├── CustomCursor.tsx
│   │   ├── MatrixRain.tsx
│   │   ├── GlitchText.tsx
│   │   ├── TypingEffect.tsx
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── lib/              # Utilitaires
│   ├── pages/            # Pages du portfolio
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── App.tsx           # Composant principal
│   ├── App.css           # Styles globaux
│   ├── index.css         # Configuration Tailwind
│   └── main.tsx          # Point d'entrée
├── components.json        # Configuration shadcn/ui
├── tailwind.config.js     # Configuration Tailwind
├── vite.config.ts         # Configuration Vite
└── package.json
```

## ⚙️ Personnalisation

### Modifier les informations personnelles

1. **Nom et rôles** → `src/pages/Home.tsx`
2. **Bio et compétences** → `src/pages/About.tsx`
3. **Projets** → `src/pages/Projects.tsx`
4. **Liens sociaux** → `src/pages/Contact.tsx` et `src/components/footer.tsx`

### Modifier le thème

Les variables de couleur sont définies dans `src/index.css` :

```css
:root {
  --primary: oklch(0.75 0.25 145);      /* Vert néon */
  --accent: oklch(0.6 0.2 180);          /* Cyan */
  --background: oklch(0.08 0.01 150);    /* Fond sombre */
  /* ... */
}
```

## 🔧 Configuration

### Ajouter des composants shadcn/ui

```bash
$ npx shadcn@latest add [component-name]
```

### Variables d'environnement

Créez un fichier `.env.local` pour les variables sensibles :

```env
VITE_CONTACT_EMAIL=your@email.com
VITE_GITHUB_URL=https://github.com/username
```

## 📱 Responsive Design

Le portfolio est entièrement responsive et optimisé pour :
- 📱 Mobile (< 768px)
- 📱 Tablette (768px - 1024px)
- 💻 Desktop (> 1024px)

## 🎯 Performance

- ⚡ Lazy loading des images
- 🗜️ Code splitting automatique avec Vite
- 🎨 CSS optimisé avec Tailwind
- 🔄 Animations GPU-accelerated

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contact

<div align="center">

**Développeur Full Stack & Ethical Hacker**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](#)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](#)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](#)

</div>

---

<div align="center">

```
$ echo "Hack the planet! 🌍"
```

Made with ❤️ and lots of ☕

</div>

