# DGCCRF MetroGuide

**Application web de conformité métrologique des préemballages — par VisiPilot**

> Outil d'autocontrôle interactif basé sur le Guide de bonnes pratiques DGCCRF 2014, la Directive 76/211/CEE et les guides WELMEC 6.4 / 6.5.

---

## Objectifs

Les industriels qui conditionnent des produits alimentaires, cosmétiques ou ménagers sous signe **« e »** doivent démontrer à tout moment que leurs lots respectent les trois critères légaux de conformité métrologique. En pratique, cela implique :

- de choisir un instrument de mesure adapté à la tolérance du produit ;
- d'estimer la capabilité de leur ligne d'emplissage ;
- de dimensionner un plan de surveillance statistique efficace ;
- de maîtriser la variabilité des emballages vides (tares).

**MetroGuide** centralise ces quatre vérifications dans une interface unique, guidée et pédagogique. L'application produit des rapports téléchargeables et explique chaque résultat avec sa référence réglementaire.

---

## Fonctionnalités

### 1. Guide Interactif — 52 fiches DGCCRF
- 52 fiches double-face (flip cards) couvrant l'intégralité des principes du Guide DGCCRF 2014
- Organisées par thème : fondamentaux, instruments, capabilité, plans de contrôle, tares, conformité du lot
- Système d'administration : choisir quelles fiches afficher, en ajouter, les activer/désactiver via un modal dédié
- Préférences sauvegardées en `localStorage`

### 2. Adéquation Balance
- Supporte les **IPFNA** (balances non automatiques, Décret 91-330 / Dir. 2014/31/UE) et les **IPFA** (trieuses pondérales, Arrêté 10/01/2006 / Dir. 2014/32/UE)
- Calcul de l'EMT selon la plage de charge réelle (pas de simplification à 0,5e)
- Pour les IPFNA : **EMT service = 2 × EMT neuve** (règle légale souvent méconnue)
- Pour les IPFA : EMT service = EMT nominale (pas de doublement)
- Vérification de la **règle du 1/5** : EMT service ≤ EMTM / 5
- Vérification de l'adéquation de l'échelon e à la QN (Tableaux 1 et 3 du Guide DGCCRF — arrêté 20/10/1978 et WELMEC 6.4)
- Rapport téléchargeable (.txt)

### 3. Capabilité CPk
- Import de données de pesées via fichier Excel / CSV
- Calcul de σ₀ (écart-type du processus)
- Calcul du **Cp** et du **Cpk métrologique** (côté inférieur uniquement — pas de borne supérieure pour les préemballages)
- Prise en compte du **signe « e »** : critère superdéfectueux (TU2 = QN − 2E) en plus du critère défectueux (TU1 = QN − E)
- Calcul du **seuil de centrage ms** et de la quantité cible QC
- Seuil critique : σ₀ ≤ E/2,05 → centrage sur QN sans surdosage
- Seuils métrologiques dérivés des textes : Cpk ≥ 0,68 (critère 2 % défectueux, z = 2,05) ; signe e : Cpk_super ≥ U/3 (1,03 / 1,24 / 1,42 selon N) — repères industriels (1,00/1,33) en mention secondaire
- Rapport téléchargeable

### 4. Plan POM/POL
- Efficacité du plan selon l'**Annexe 4 du Guide DGCCRF 2014** : POM ≤ POl (POl = nombre d'échantillonnages par heure)
- Les trois déréglages officiels : m1 = 0,998·QN (critère moyenne), m2 = QN − E + 2,05σ₀ (critère défectueux), hausse de σ (carte écart-type)
- POM calculées analytiquement (carte de Shewhart / loi du χ²) — l'exemple chiffré de l'Annexe 4 est reproduit à ≈ 5 % près avec les mêmes verdicts
- Quantité cible QC = ms + k ajustable (surdosage d'efficacité k)
- Table des valeurs de g (Annexe 3 du Guide DGCCRF, seuil α = 10 %)
- Import des pesées du prélèvement pour test de conformité x̄ − g×s ≥ QN
- Rapport téléchargeable

### 5. Gestion des Tares
- Import des pesées d'emballages vides (≥ 20 emballages représentatifs, Guide §VI.A)
- Calcul de la moyenne t̄ et de l'écart-type s_t
- Application de la **règle E/5** (Guide DGCCRF §VI.A | WELMEC 6.4)
- Verdict : tare moyenne autorisée (s_t ≤ E/5) ou tare individuelle obligatoire (s_t > E/5)
- Barre de comparaison visuelle s_t vs seuil
- Rapport téléchargeable

---

## Base réglementaire

| Texte | Contenu |
|---|---|
| **Directive 76/211/CEE** | Spécifications métrologiques des lots (EMTM, 3 critères) |
| **Décret 78-166 du 31/01/1978** | Contrôle métrologique des préemballages |
| **Arrêté du 20/10/1978** | Plans de contrôle officiels |
| **Décret 91-330 du 27/03/1991** | Instruments de pesage à fonctionnement non automatique (IPFNA) |
| **Arrêté du 10/01/2006** | Instruments de pesage à fonctionnement automatique (IPFA/trieuses) |
| **Directive 2014/31/UE (IPFNA / « NAWI »)** | Instruments de pesage non automatiques — remplace 90/384/CEE |
| **Directive 2014/32/UE (MID/AWI)** | Instruments automatiques |
| **Guide DGCCRF 2014** | Guide de bonnes pratiques d'autocontrôle métrologique |
| **WELMEC 6.4** | Guide emplisseurs / importateurs (préemballages signe « e ») |
| **WELMEC 6.5** | Guide contrôles officiels |
| **NF X06-031-1 / ISO 7870-2** | Cartes de contrôle aux mesures |
| **ISO 8258** | Cartes de contrôle Shewhart (remplacée par ISO 7870-2 ; les deux sont citées par le Guide §II.B) |

---

## Table EMTM (Directive 76/211/CEE)

| Quantité Nominale | EMTM |
|---|---|
| 5 g ≤ QN ≤ 50 g | 9 % de QN |
| 50 g < QN ≤ 100 g | 4,5 g |
| 100 g < QN ≤ 200 g | 4,5 % de QN |
| 200 g < QN ≤ 300 g | 9 g |
| 300 g < QN ≤ 500 g | 3 % de QN |
| 500 g < QN ≤ 1 000 g | 15 g |
| 1 000 g < QN ≤ 10 000 g | 1,5 % de QN |

---

## Architecture technique

```
SIMPLE_GUIDE_METRO/
├── index.html          # Application principale (SPA 5 onglets)
├── confBALGEM.html     # Module Balance — version autonome
├── css/
│   ├── tokens.css      # Variables CSS (couleurs, typographie, espacements)
│   ├── layout.css      # Structure de page, grille, sidebar, responsive
│   └── components.css  # Composants UI (cards, flip cards, badges, alerts…)
├── js/
│   └── app.js          # Logique applicative complète
├── logo.png
└── logo 04 copie.jpg
```

### Technologies
- **HTML5 / CSS3 / JavaScript vanilla** — aucune dépendance framework
- **Font Awesome 6** — icônes (CDN)
- **SheetJS (xlsx)** — lecture de fichiers Excel / CSV côté client
- **localStorage** — persistance des préférences (fiches actives, état sidebar, thème)
- **CSS custom properties** — thème clair/sombre natif

### Composants clés
- **Flip cards** : CSS 3D (`transform-style: preserve-3d`, `backface-visibility`) avec hauteur auto-adaptée via `display: grid` (les deux faces partagent `grid-area: 1/1`)
- **Sidebar rétractable** : flex layout + transition CSS `width 0.3s ease`, chevron rotatif
- **Accordéons** : éléments HTML natifs `<details>` / `<summary>` sans JavaScript
- **TIPS_DATA** : tableau JSON de 52 objets, rendu dynamique, gérable via modal admin
- **Cartes de contrôle** : limites LCI/LCS calculées dynamiquement selon σ₀ et n

---

## Lancement

Aucune installation requise. Ouvrir `index.html` directement dans un navigateur moderne (Chrome, Firefox, Edge, Safari).

Pour un accès réseau local :
```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .
```

Puis ouvrir `http://localhost:8080`.

---

## Flux d'utilisation typique

```
1. Guide Interactif  →  Parcourir les 52 fiches pour maîtriser les concepts
2. Adéquation Balance →  Vérifier que l'instrument est adapté au produit
3. Capabilité CPk    →  Mesurer σ₀ sur ≥ 20 pesées, calculer ms et QC
4. Plan POM/POL      →  Dimensionner n et la fréquence pour POL ≤ 60 min
5. Gestion Tares     →  Peser ≥ 20 emballages vides, valider la règle E/5
```

---

## Auteur

Développé par **VisiPilot** — outil d'aide à l'autocontrôle métrologique.

> ⚠️ Cet outil est une aide à la décision. Les résultats doivent être interprétés par un métrologue qualifié. Ils ne se substituent pas à un contrôle officiel DGCCRF.
