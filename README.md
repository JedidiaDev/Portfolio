# Portfolio — Jedidia Kamdem Souop

Portfolio personnel en Next.js 16 (App Router), direction artistique « borne
d'arcade » : palette Ndop, grille 8 px stricte, aucun arrondi.

## Démarrer

```bash
npm install
cp .env.example .env    # puis remplis les valeurs
npm run dev
```

Le site tourne sur http://localhost:3000.

```bash
npm run build && npm run start   # build de production
npx eslint src                   # lint
npx tsc --noEmit                 # types
```

## Variables d'environnement

Toutes décrites dans `.env.example`. `.env` est ignoré par git — ne le
committe jamais.

| Variable | Côté | Rôle |
| --- | --- | --- |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | client | Formulaire de contact |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | client | Formulaire de contact |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | client | Formulaire de contact |
| `SASPAY_API_KEY` | **serveur** | Encaissement des dons |
| `SASPAY_WEBHOOK_SECRET` | **serveur** | Vérification des webhooks |
| `NEXT_PUBLIC_SITE_URL` | les deux | URL canonique, `return_url` SasPay |

> Les variables `NEXT_PUBLIC_*` sont inlinées dans le bundle du navigateur.
> N'y mets jamais un secret. `SASPAY_API_KEY` donne un accès complet au compte
> marchand : `src/lib/saspay.ts` porte `import "server-only"`, ce qui fait
> échouer le build si ce module est importé depuis un composant client.

## Formulaire de contact (EmailJS)

L'envoi part du navigateur via `@emailjs/browser`. Le template EmailJS doit
exposer ces variables :

```
{{name}}  {{email}}  {{subject}}  {{message}}
```

Les alias `{{from_name}}`, `{{reply_to}}` et `{{title}}` sont aussi envoyés,
pour rester compatible avec le template par défaut d'EmailJS.

La clé publique EmailJS est publique par conception. La protection contre
l'abus vient donc d'ailleurs :

1. **Console EmailJS → Account → Security → Allowed origins** : n'autorise que
   ton domaine. C'est la seule barrière qui compte.
2. Un throttle de 30 s par navigateur (`limitRate` du SDK).
3. Un champ honeypot invisible.

Sans les trois variables, le formulaire est remplacé par un lien `mailto:` —
il ne peut donc jamais échouer silencieusement.

## Dons (SasPay)

Doc de référence : https://docs.saspay.me

Le flux utilise le **checkout hébergé** :

```
navigateur                     serveur                      SasPay
    │  POST /api/soutien          │                            │
    │  { amount, name, email }    │                            │
    ├────────────────────────────►│  POST /checkout-sessions/  │
    │                             ├───────────────────────────►│
    │                             │◄───────────────────────────┤
    │◄────────────────────────────┤   { checkout_url }         │
    │  redirection vers checkout_url ─────────────────────────►│
    │                                                          │
    │  ◄── retour sur /soutien/merci après 3 s (succès)        │
    │                             │◄── webhook transaction.success
```

- `src/lib/saspay.ts` — client HTTP, `server-only`, montants en XAF, pays CM.
- `src/app/api/soutien/route.ts` — valide montant / nom / email, puis crée la
  session. La clé secrète ne quitte jamais le serveur.
- `src/app/soutien/merci/page.tsx` — cible de `return_url`.
- `src/app/api/saspay/webhook/route.ts` — réception des events.

### Configurer le webhook

1. Tableau de bord SasPay → Webhooks → ajouter
   `https://<ton-domaine>/api/saspay/webhook`.
2. Abonne-le à `transaction.success`, `transaction.failed`,
   `transaction.cancelled`.
3. **Copie le `signing_secret` immédiatement** — il n'est affiché qu'une fois —
   dans `SASPAY_WEBHOOK_SECRET`.

Tant que ce secret est absent, la route répond `503` et refuse toute
livraison, plutôt que d'accepter des événements non vérifiés. La vérification
suit la doc : contrôle d'âge à 5 minutes **et** HMAC SHA-256 sur
`timestamp.corps_brut`, comparé en temps constant.

> La page `/soutien/merci` ne confirme rien par elle-même : une redirection est
> falsifiable. La confirmation qui fait foi arrive par webhook.

### Montant minimum

SasPay refuse toute session sous **200 XAF** (`MIN_AMOUNT` dans
`src/lib/saspay.ts`, repris côté formulaire). Le montant est validé avant
l'appel réseau, et leur message d'erreur est de toute façon relayé tel quel
si leur plancher change.

### Tester sans argent réel

Utilise une clé `sk_test_...` plutôt que `sk_live_...`. Une session de
checkout ne débite rien tant qu'elle n'est pas payée.

## Fichiers attendus dans `public/`

Ces fichiers sont optionnels : le code détecte leur absence au build et masque
l'élément correspondant plutôt que d'afficher un lien mort
(`src/lib/assets.ts`).

| Fichier | Effet s'il est absent |
| --- | --- |
| `public/cv.pdf` | L'entrée « CV.PDF » disparaît du menu |
| `public/images/binance-pay-qr.png` | Le QR disparaît de `/soutien` (l'identifiant reste) |

L'image de partage (Open Graph) est générée au build par
`src/app/opengraph-image.tsx` — il n'y a pas de `og-image.png` à fournir.

## Structure

```
src/
├─ app/
│  ├─ api/soutien/route.ts          création de session SasPay
│  ├─ api/saspay/webhook/route.ts   réception des events SasPay
│  ├─ contact/ContactForm.tsx       formulaire EmailJS (client)
│  ├─ opengraph-image.tsx           image de partage générée
│  ├─ error.tsx / loading.tsx / not-found.tsx
│  └─ …                             une page par écran
├─ components/
│  ├─ layout/    header (HUD), footer
│  └─ common/    CommandMenu, SpriteSheet, FxToggle, SaspayDonationForm
├─ data/         contenu éditorial (projets, parcours, domaines…)
├─ lib/          nav, fx, assets, saspay, emailjs
└─ app/styles/globals.css    jetons de design + tous les composants
```

## Direction artistique

Les jetons vivent en haut de `globals.css` :

- **Couleurs** — `--void`, `--ndop`, `--raffia`, `--toghu`, `--ochre`,
  `--phosphor`. Jamais de blanc pur.
- **Espacement** — multiples de 8 px uniquement (`--s1` … `--s12`).
- **Typo** — Press Start 2P (titres, HUD), Space Grotesk (texte),
  IBM Plex Mono (code, valeurs).
- **Bordures** — via `box-shadow` (`.px`, `.px-thick`), jamais `border-radius`.
- Press Start 2P n'a pas de flèches ni de puces : les glyphes décoratifs
  (`← ▸ ◂ ● ↗`) passent par la classe `.glyph`, qui emprunte la police de
  texte et les remonte en taille.

Les effets d'écran (scanlines) sont pilotés par `html[data-fx]`, posé par un
script inline avant le premier paint — pas de flash, pas d'erreur
d'hydratation. `prefers-reduced-motion` les désactive par défaut.
