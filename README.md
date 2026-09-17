# AMK BOUQUETS • DALOA

> **Atelier de Haute Confection Florale en Satin • Daloa, Côte d'Ivoire**  
> Boutique en ligne et vitrine Haute Couture pour bouquets de roses éternelles en satin, confectionnées à la main avec amour à Daloa.

---

## Présentation du Projet

AMK BOUQUETS est une application web moderne (frontend-only) développée en React 19, TypeScript et Tailwind CSS. Elle propose :
- Une vitrine luxueuse reprenant les codes de la Haute Couture florale.
- Un catalogue complet de 5 collections d'atelier et une pièce maîtresse (*« Le Somptueux »*).
- Un configurateur interactif de bouquets (choix du nombre de roses, palette de satin, personnalisation de ruban).
- Un panier d'achat avec persistance locale (`localStorage`).
- Une **Fiche d'Atelier & Bon de Confection** Haute Couture avec rendu instantané, calcul automatique du nombre total de roses et des montants en FCFA, verset biblique (1 Co 16:14), sceau de cire doré et transmission WhatsApp.

---

## Technologies Utilisées

- **Framework** : React 19.2.8 + TypeScript
- **Bundler** : Vite 8.3.0
- **Routing** : React Router DOM 7.18.4
- **Styling** : Tailwind CSS 3.4.19 (Palette personnalisée : Crème `#FBF9F5`, Sable `#F0EAE1`, Espresso `#2B2118`, Caramel `#8C5835`, Or `#C8A366`)
- **Polices** : Google Fonts (*Bodoni Moda*, *Cinzel*, *Plus Jakarta Sans*)
- **Capture Visuelle** : `html2canvas` (capture HD de la Fiche d'Atelier)
- **Icônes** : `lucide-react`
- **Linting** : `oxlint`

---

## Structure du Projet

```
AMK-boutique/
├── public/                     # Assets publics statiques
├── src/
│   ├── assets/                 # Images des créations de satin & photographies d'atelier
│   ├── components/
│   │   ├── bouquet/            # Composants catalogue, pièce vedette & configurateur
│   │   ├── cart/               # Tiroir panier, modale & Fiche d'Atelier Haute Couture
│   │   ├── layout/             # Header, Footer, AnnouncementBar
│   │   ├── sections/           # Sections éditoriales (Hero, Atelier, Galerie, etc.)
│   │   └── ui/                 # Composants d'interface (Toast)
│   ├── context/                # Gestionnaire d'état du panier (CartContext)
│   ├── data/                   # Catalogue des créations florales (bouquets.ts)
│   ├── hooks/                  # Custom hooks (useCart)
│   ├── pages/                  # Pages de l'application (Accueil, Bouquets, Détail, Panier)
│   ├── services/               # Génération de messages & liens WhatsApp d'atelier
│   ├── types/                  # Définitions TypeScript
│   ├── App.tsx                 # Routage principal
│   ├── index.css               # Styles globaux et typographies
│   └── main.tsx                # Point d'entrée React
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Installation & Démarrage

### 1. Installation des dépendances
```bash
npm install
```

### 2. Lancement du serveur de développement
```bash
npm run dev
```
L'application est accessible sur : [http://localhost:5173](http://localhost:5173)

### 3. Compilation pour la production
```bash
npm run build
```

### 4. Vérification de code (Lint)
```bash
npm run lint
```
