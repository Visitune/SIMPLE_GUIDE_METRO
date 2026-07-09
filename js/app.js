/**
 * VisiPilot — Métrologie Préemballages
 * Application JavaScript v3
 */

// ═══════════════════════════════════════════════════════════════
//  TIPS_DATA — Bibliothèque de fiches pédagogiques
//  Chaque fiche est un objet JSON. L'admin peut activer/désactiver
//  via le panneau d'administration (bouton ⚙️ dans le header).
//  Les préférences sont sauvegardées dans localStorage.
//
//  Champs :
//    id       — identifiant unique stable (ne pas modifier)
//    cat      — catégorie : fondamentaux | instruments | capabilite |
//               echantillonnage | tares | documentation | sanctions | pratique
//    icon     — classe FontAwesome pour le recto
//    title    — titre du recto (court)
//    backIcon — icône du verso
//    backTitle— titre du verso
//    body     — texte HTML du verso (max ~300 char conseillé)
//    ref      — références réglementaires
//    active   — true = affiché par défaut
// ═══════════════════════════════════════════════════════════════
const TIPS_DATA = [

  // ── FONDAMENTAUX ─────────────────────────────────────────────
  {
    id:'tip-001', cat:'fondamentaux',
    icon:'fa-solid fa-tag', title:'1. La Quantité Nominale (QN)',
    backIcon:'fa-solid fa-circle-info', backTitle:'Définition légale',
    body:'C\'est la promesse commerciale inscrite sur l\'étiquette. La moyenne réelle du lot doit être ≥ QN. Plage légale : 5 g à 10 kg (ou 10 L) avec signe <em>e</em>.',
    ref:'[Dir. 76/211/CEE Art.2] | [Guide §III.A.1] | [WELMEC 6.4]',
    active:true
  },
  {
    id:'tip-002', cat:'fondamentaux',
    icon:'fa-solid fa-ruler-horizontal', title:'2. L\'EMTM',
    backIcon:'fa-solid fa-scale-balanced', backTitle:'La tolérance en moins',
    body:'L\'Erreur Maximale Tolérée en <strong>Moins</strong>. Pour 100 g → EMTM = 4,5 g. Pour 500 g → EMTM = 15 g. C\'est l\'unité de base de tous les réglages et seuils.',
    ref:'[Dir. 76/211/CEE Annexe I] | [Guide §III.A.1.2 + Annexe 5] | [WELMEC 6.5]',
    active:true
  },
  {
    id:'tip-003', cat:'fondamentaux',
    icon:'fa-solid fa-boxes-stacked', title:'3. La Notion de Lot',
    backIcon:'fa-solid fa-clock', backTitle:'POL ≤ 1h → Lot ≤ 1h',
    body:'Un lot est une production homogène. La réglementation exige que tout déréglage soit <strong>détecté en ≤ 1 h (POM ≤ POl)</strong>. Si un écart est trouvé, la prod depuis le dernier prélèvement conforme est mise en cause.',
    ref:'[Guide §III.A.2 + §VII.B.2.3] | [WELMEC 6.4]',
    active:true
  },
  {
    id:'tip-004', cat:'fondamentaux',
    icon:'fa-solid fa-chart-bar', title:'4. Règle 1 : La Moyenne',
    backIcon:'fa-solid fa-check-double', backTitle:'Moyenne ≥ QN — sans exception',
    body:'La moyenne effective du lot doit toujours être ≥ QN. Si la moyenne tombe à 99,9 g pour QN = 100 g, le lot est juridiquement <strong>falsifié</strong>, même si chaque unité semble correcte.',
    ref:'[Dir. 76/211/CEE Annexe I] | [Guide §III.A.1.1] | [WELMEC 6.4]',
    active:true
  },
  {
    id:'tip-005', cat:'fondamentaux',
    icon:'fa-solid fa-circle-exclamation', title:'5. Règle 2 : Limite T1',
    backIcon:'fa-solid fa-percent', backTitle:'2% de défectueux max',
    body:'Max <strong>2% de préemballages défectueux</strong> (contenu &lt; QN − EMTM). Le NQA 2,5% est le paramètre du <em>plan de sondage côté inspecteur</em> — la limite côté producteur est 2%.',
    ref:'[Dir. 76/211/CEE Annexe I] | [Guide §III.A.1.2] | [WELMEC 6.4]',
    active:true
  },
  {
    id:'tip-006', cat:'fondamentaux',
    icon:'fa-solid fa-triangle-exclamation', title:'6. Règle 3 : Seuil TU2',
    backIcon:'fa-solid fa-gavel', backTitle:'Zéro Tolérance',
    body:'Aucun préemballage ne doit peser moins que <strong>QN − 2×EMTM</strong> (seuil TU2). Un seul exemplaire dans cette zone entraîne la non-conformité immédiate — quel que soit le taux global.',
    ref:'[Guide §III.A.1.3] | [WELMEC 6.4]',
    active:true
  },
  {
    id:'tip-007', cat:'fondamentaux',
    icon:'fa-solid fa-wave-square', title:'7. L\'Écart-Type (σ)',
    backIcon:'fa-solid fa-sliders', backTitle:'Maîtriser la dispersion',
    body:'Plus la doseuse est instable, plus σ est élevé et plus le surdosage est important. Règle-clé : si σ ≤ E/2,05, le centrage sur QN est possible. Au-delà, surdosage obligatoire.',
    ref:'[Guide §V.A] | [WELMEC 6.4] | [NF X06-030]',
    active:true
  },
  {
    id:'tip-008', cat:'capabilite',
    icon:'fa-solid fa-chart-line', title:'8. L\'Indice Cpk',
    backIcon:'fa-solid fa-bolt', backTitle:'Performance machine',
    body:'Seuil métrologique : <strong>Cpk ≥ 0,68</strong> (= 2,05/3) pour tenir le critère des 2 % de défectueux. Avec signe <em>e</em> : vérifier aussi Cpk_super ≥ U/3 (1,03 / 1,24 / 1,42 selon N). Repère industriel : ≥ 1,33 = marge confortable (sans valeur réglementaire).',
    ref:'[Guide §V] | [NF X06-030]',
    active:true
  },
  {
    id:'tip-009', cat:'instruments',
    icon:'fa-solid fa-scale-unbalanced-flip', title:'9. Règle du 1/5ème',
    backIcon:'fa-solid fa-compass', backTitle:'Adéquation balance',
    body:'L\'EMT en service de la balance doit être <strong>≤ 1/5 de l\'EMTM</strong>. Ex. pour QN=100 g (EMTM=4,5 g) : EMT service ≤ 0,9 g. Sinon la balance introduit trop d\'erreur dans la décision.',
    ref:'[WELMEC 6.4] | [Guide §IV] | [Décret 91-330]',
    active:true
  },
  {
    id:'tip-010', cat:'tares',
    icon:'fa-solid fa-box-open', title:'10. Règle du 1/5ème (Tares)',
    backIcon:'fa-solid fa-box-archive', backTitle:'Tare Moyenne ou Individuelle ?',
    body:'Peser ≥ 20 emballages vides. Si s_t &gt; <strong>E/5</strong> → tare individuelle obligatoire. Si s_t ≤ E/5 → tare moyenne autorisée. Ex. QN=100 g (E=4,5 g) → seuil = 0,9 g.',
    ref:'[Guide §VI.A] | [WELMEC 6.4] | [OIML R87]',
    active:true
  },
  {
    id:'tip-011', cat:'echantillonnage',
    icon:'fa-solid fa-hourglass-half', title:'11. POL ≤ 1 Heure',
    backIcon:'fa-solid fa-stopwatch', backTitle:'Réactivité réglementaire',
    body:'Le plan de contrôle doit détecter tout déréglage grave en <strong>≤ 60 min</strong> : POM ≤ POl, avec POl = nombre de prélèvements par heure (ex. toutes les 15 min → POl = 4). Si POM &gt; POl : augmenter n, la quantité cible QC ou la fréquence.',
    ref:'[Guide §VII.B.2.3 + Annexe 4] | [NF X06-031-1]',
    active:true
  },
  {
    id:'tip-012', cat:'documentation',
    icon:'fa-solid fa-file-signature', title:'12. Preuve de Contrôle',
    backIcon:'fa-solid fa-shield-halved', backTitle:'Opposabilité juridique',
    body:'Un contrôle non documenté <strong>n\'existe pas</strong> face à la DGCCRF. Conserver tous les enregistrements <strong>2 ans minimum</strong> (avec signe <em>e</em>) : pesées, corrections, vérifications instruments.',
    ref:'[Guide §III.B.2.5] | [Arrêté 20/10/1978] | [WELMEC 6.4]',
    active:true
  },
  {
    id:'tip-013', cat:'instruments',
    icon:'fa-solid fa-robot', title:'13. IPFA vs IPFNA',
    backIcon:'fa-solid fa-microchip', backTitle:'Deux référentiels distincts',
    body:'<strong>IPFNA (balances)</strong> : EMT service = 2 × EMT neuve — Décret 91-330.<br><strong>IPFA (trieuses)</strong> : EMT = EMT nominale, pas de doublement — Arrêté 10/01/2006. Vérification : 20 passages du même préemballage.',
    ref:'[Guide §IV.A.2 + §IV.B.2] | [Décret 91-330] | [Arr. 10/01/2006]',
    active:true
  },
  {
    id:'tip-014', cat:'documentation',
    icon:'fa-solid fa-book-medical', title:'14. Carnet de Vie',
    backIcon:'fa-solid fa-history', backTitle:'Identité de l\'instrument',
    body:'Chaque instrument doit avoir un <strong>carnet métrologique</strong> tenu à jour sur son lieu d\'utilisation : pannes, ajustages, vérifications périodiques, interventions. Absence = défaut documentaire.',
    ref:'[Guide §IV.A.1 + §IV.B.1] | [Décret 91-330]',
    active:true
  },
  {
    id:'tip-015', cat:'instruments',
    icon:'fa-solid fa-certificate', title:'15. La Vignette Verte',
    backIcon:'fa-solid fa-calendar-check', backTitle:'Vérification périodique',
    body:'La vignette verte atteste de la vérification périodique (VP) annuelle par un organisme accrédité. <strong>Vignette rouge = interdiction</strong> d\'utilisation pour le contrôle des préemballages.',
    ref:'[Guide §IV.A] | [Décret 91-330] | [Arr. 26/05/2004]',
    active:true
  },
  {
    id:'tip-016', cat:'sanctions',
    icon:'fa-solid fa-handcuffs', title:'16. Sanctions & Risques',
    backIcon:'fa-solid fa-gavel', backTitle:'Le Procès Verbal',
    body:'Un lot NC expose à des <strong>suites administratives et pénales</strong> : injonction, retrait/saisie des lots, contravention par préemballage non conforme et, en cas de tromperie sur la quantité, délit du Code de la consommation. La responsabilité du conditionneur et du dirigeant est engagée.',
    ref:'[C. conso Art. L412-1] | [Décret 78-166] | [Arrêté 20/10/1978]',
    active:true
  },
  {
    id:'tip-017', cat:'pratique',
    icon:'fa-solid fa-droplet-slash', title:'17. Écoulement & Pertes',
    backIcon:'fa-solid fa-filter', backTitle:'Produits visqueux',
    body:'Produits sujets à perte de poids après dosage (cuisson, séchage, congélation, égouttage…) : contrôler de préférence <strong>après la phase de perte</strong> — la conformité est due jusqu\'au départ des marchandises. Poids net égoutté : EMT doublée admise en France.',
    ref:'[Guide §III.B.1.1.7 + §III.A.2.4]',
    active:true
  },
  {
    id:'tip-018', cat:'instruments',
    icon:'fa-solid fa-weight-hanging', title:'18. Masses Étalons',
    backIcon:'fa-solid fa-microscope', backTitle:'Règle du 1/3 e',
    body:'L\'incertitude de la masse étalon doit être <strong>≤ e/3</strong> (échelon de vérification de la balance). Ex. balance e=1 g → masse étalon U ≤ 0,33 g. Raccordement COFRAC obligatoire.',
    ref:'[Guide §IV.A.2] | [OIML R111]',
    active:true
  },
  {
    id:'tip-019', cat:'echantillonnage',
    icon:'fa-solid fa-shuffle', title:'19. Tirage Aléatoire',
    backIcon:'fa-solid fa-random', backTitle:'Représentativité obligatoire',
    body:'Le prélèvement doit être <strong>aléatoire et représentatif</strong> de la production en cours. Choisir "les meilleurs" ou éviter les fins de ligne constitue une <strong>fraude métrologique</strong>.',
    ref:'[Guide §VII.B] | [Arrêté 20/10/1978] | [WELMEC 6.4]',
    active:true
  },
  {
    id:'tip-020', cat:'pratique',
    icon:'fa-solid fa-font', title:'20. Hauteur du Signe e',
    backIcon:'fa-solid fa-ruler-vertical', backTitle:'Min 3 mm',
    body:'Le symbole <em>e</em> doit mesurer <strong>au moins 3 mm</strong> de haut pour être conforme aux exigences de lisibilité. Il doit être indélébile et figurer à proximité du poids net.',
    ref:'[Dir. 76/211/CEE Annexe I §3.3] | [Guide §III.B.2.1]',
    active:true
  },
  {
    id:'tip-021', cat:'capabilite',
    icon:'fa-solid fa-bullseye', title:'21. Cpk & Centrage',
    backIcon:'fa-solid fa-crosshairs', backTitle:'Stable mais bien centré',
    body:'Un processus stable mais mal centré est aussi dangereux qu\'un processus dispersé. Le <strong>seuil de centrage ms</strong> = QN si σ ≤ E/2,05, sinon ms = QN − E + 2,05σ.',
    ref:'[Guide §V.A] | [WELMEC 6.4]',
    active:true
  },
  {
    id:'tip-022', cat:'pratique',
    icon:'fa-solid fa-vial-circle-check', title:'22. Masse vs Volume',
    backIcon:'fa-solid fa-flask', backTitle:'Densimétrie',
    body:'Vendre au <strong>volume (mL)</strong> impose de peser en grammes puis de diviser par la <strong>densité réelle</strong> à température de production. Une variation de ±2°C peut modifier la densité et créer un déficit systématique.',
    ref:'[Guide §III.B.1.1 + Annexe 1] | [WELMEC 6.11]',
    active:true
  },
  {
    id:'tip-023', cat:'documentation',
    icon:'fa-solid fa-shield-virus', title:'23. Dossier de Défense',
    backIcon:'fa-solid fa-shield-halved', backTitle:'Face à l\'audit DGCCRF',
    body:'En cas de contrôle, votre seule défense est l\'<strong>historique documenté</strong> : cartes de contrôle, preuves de réactivité (POL ≤ 1h), vérifications instruments, fiches de lot. Sans traces = NC présumée.',
    ref:'[Guide §III.B.2.5] | [Décret 78-166] | [WELMEC 6.4]',
    active:true
  },
  {
    id:'tip-024', cat:'fondamentaux',
    icon:'fa-solid fa-user-shield', title:'24. Rôle DGCCRF',
    backIcon:'fa-solid fa-building-shield', backTitle:'Surveillance officielle',
    body:'L\'inspecteur juge la <strong>loyauté du système d\'autocontrôle</strong>, pas uniquement le résultat d\'un lot. Un autocontrôle robuste et documenté est la meilleure protection — même si un lot s\'avère NC.',
    ref:'[Guide §I] | [Arrêté 20/10/1978]',
    active:true
  },

  // ── FICHES SUPPLÉMENTAIRES (inactives par défaut — activables via Admin) ──
  {
    id:'tip-025', cat:'instruments',
    icon:'fa-solid fa-clock-rotate-left', title:'Vérification IPFNA : Fréquence',
    backIcon:'fa-solid fa-calendar', backTitle:'Contrôle hebdomadaire',
    body:'Avec signe <em>e</em> : vérification de routine <strong>hebdomadaire minimum</strong>. Hors <em>e</em> : fréquence par analyse de risque. Toujours avec des masses étalon raccordées. La VP annuelle ne dispense pas des contrôles routiniers.',
    ref:'[Guide §IV.A.2] | [Décret 91-330]',
    active:false
  },
  {
    id:'tip-026', cat:'instruments',
    icon:'fa-solid fa-conveyor-belt', title:'Vérification IPFA : 20 passages',
    backIcon:'fa-solid fa-repeat', backTitle:'Protocole trieuse',
    body:'Faire passer <strong>20 fois</strong> le même préemballage en mode automatique. Calculer moyenne et écart-type, comparer à l\'EMT et σ_max. Vérifier aussi le bon fonctionnement du système d\'éjection.',
    ref:'[Guide §IV.B.2] | [Arr. 10/01/2006] | [OIML R51]',
    active:false
  },
  {
    id:'tip-027', cat:'capabilite',
    icon:'fa-solid fa-arrows-alt-h', title:'Cp vs Cpk',
    backIcon:'fa-solid fa-balance-scale', backTitle:'Symétrique vs Centré',
    body:'<strong>Cp = E/(3σ)</strong> mesure la capacité intrinsèque (symétrique). <strong>Cpk</strong> intègre le centrage réel μ. On peut avoir Cp élevé (machine précise) mais Cpk faible (mal réglée). Les deux sont nécessaires.',
    ref:'[Guide §V] | [NF X06-030]',
    active:false
  },
  {
    id:'tip-028', cat:'capabilite',
    icon:'fa-solid fa-arrow-trend-up', title:'Surdosage Économique',
    backIcon:'fa-solid fa-coins', backTitle:'Coût du sur-remplissage',
    body:'Un surdosage de 1 g/unité sur 1 M préemballages/an = 1 tonne de produit offert. Pour un produit à 5 €/kg, c\'est <strong>5 000 €/an perdus</strong>. Réduire σ₀ sous E/2,05 permet de centrer sur QN et d\'éliminer ce surcoût.',
    ref:'[Guide §V.A] | [WELMEC 6.4]',
    active:false
  },
  {
    id:'tip-029', cat:'echantillonnage',
    icon:'fa-solid fa-table-cells', title:'Taille n optimale',
    backIcon:'fa-solid fa-list-ol', backTitle:'7 à 10 recommandé',
    body:'Le Guide recommande <strong>n = 7 à 10</strong> unités par prélèvement. En multi-becs, prendre un multiple du nombre de becs pour couvrir tous les postes. Moins de 5 = plan insuffisant statistiquement.',
    ref:'[Guide §VII.B.1.1 + §VII.B.2.3] | [NF X06-031-1]',
    active:false
  },
  {
    id:'tip-030', cat:'echantillonnage',
    icon:'fa-solid fa-function', title:'Valeur g (Annexe 3)',
    backIcon:'fa-solid fa-superscript', backTitle:'t(1-α)/√n à 90%',
    body:'g = t(1-α, n-1)/√n avec α=10%. Pour n=10 : g=0,437. Test : <strong>x̄ − g·s ≥ QN</strong>. Ce critère emplisseur (risque β minimisé) est différent du test officiel côté inspecteur (risque α).',
    ref:'[Guide Annexe 3 + §VII.B.1.2] | [Arrêté 20/10/1978 Art. 7]',
    active:false
  },
  {
    id:'tip-031', cat:'echantillonnage',
    icon:'fa-solid fa-chart-area', title:'Cartes de Contrôle',
    backIcon:'fa-solid fa-wave-square', backTitle:'LCS, LSS, LSI, LCI',
    body:'4 limites : LCS/LCI (action = arrêt immédiat), LSS/LSI (surveillance = vigilance). Calculées avec σ₀ et ms. <strong>Ne jamais utiliser TU1 (QN−E) comme limite</strong> — c\'est une erreur réglementaire.',
    ref:'[Guide §VII.B.2.1 + §VII.B.2.2] | [NF X06-031-1] | [ISO 7870-2]',
    active:false
  },
  {
    id:'tip-032', cat:'tares',
    icon:'fa-solid fa-wine-bottle', title:'Tares en Verre',
    backIcon:'fa-solid fa-magnifying-glass', backTitle:'Toujours individuelle',
    body:'Pour les emballages en verre, la variabilité de tare est quasi toujours supérieure à E/5. La <strong>tare individuelle est généralement obligatoire</strong>. Peser le verre avant remplissage et soustraire.',
    ref:'[Guide §VI.A] | [WELMEC 6.4] | [OIML R87]',
    active:false
  },
  {
    id:'tip-033', cat:'tares',
    icon:'fa-solid fa-arrow-down-up-across-line', title:'Arrondi Tare Moyenne',
    backIcon:'fa-solid fa-calculator', backTitle:'Arrondir par excès',
    body:'La tare moyenne utilisée dans les calculs doit être <strong>arrondie par excès</strong>. Une tare sous-estimée génère un sous-dosage systématique. Ex. tare moyenne = 12,4 g → utiliser 12,5 g (arrondir au 0,5 g supérieur).',
    ref:'[Guide §VI.B] | [WELMEC 6.4]',
    active:false
  },
  {
    id:'tip-034', cat:'documentation',
    icon:'fa-solid fa-floppy-disk', title:'2 Ans d\'Archives',
    backIcon:'fa-solid fa-folder-open', backTitle:'Enregistrements obligatoires',
    body:'Avec signe <em>e</em> : conserver 2 ans minimum tous les résultats de contrôle, cartes de contrôle, vérifications instruments, journal de bord, fiches de tare. L\'absence de document est une NC documentaire.',
    ref:'[Guide §III.B.2.5] | [Arrêté 20/10/1978] | [WELMEC 6.4]',
    active:false
  },
  {
    id:'tip-035', cat:'documentation',
    icon:'fa-solid fa-book-open', title:'Journal de Bord',
    backIcon:'fa-solid fa-pen-to-square', backTitle:'Traçabilité de production',
    body:'Le journal de bord doit consigner : heures démarrage/arrêt, causes d\'arrêt, changements d\'équipe, lots de produit, paramètres de marche, anomalies, maintenance. C\'est la preuve de maîtrise du processus.',
    ref:'[Guide §III.B.2.5] | [WELMEC 6.4]',
    active:false
  },
  {
    id:'tip-036', cat:'fondamentaux',
    icon:'fa-solid fa-tag', title:'Multipack : Règles Spéciales',
    backIcon:'fa-solid fa-layer-group', backTitle:'Produits groupés',
    body:'Un multipack (ex. 6×100 g) est soumis à des règles spécifiques : la QN s\'applique au <strong>contenu total déclaré</strong>. Le contrôle peut porter sur les unités individuelles avec E = EMT(QN globale) <strong>÷ nombre d\'unités</strong>, l\'échelon étant choisi selon la quantité cible unitaire.',
    ref:'[Guide §III.B.1.1.6]',
    active:false
  },
  {
    id:'tip-037', cat:'pratique',
    icon:'fa-solid fa-temperature-half', title:'Températures & Densité',
    backIcon:'fa-solid fa-thermometer', backTitle:'Correction volumétrique',
    body:'Pour les liquides vendus en volume, la densité doit être mesurée à la <strong>température de conditionnement</strong>. L\'eau passe de 0,9982 g/mL à 20°C à 0,9970 g/mL à 25°C : un écart de 1,2 g/L non compensé.',
    ref:'[Guide §III.B.1.1 + Annexe 1] | [WELMEC 6.11]',
    active:false
  },
  {
    id:'tip-038', cat:'pratique',
    icon:'fa-solid fa-list-check', title:'Gammes de Volumes Fixées',
    backIcon:'fa-solid fa-wine-glass', backTitle:'Vins & Spiritueux',
    body:'Certains produits (vins, spiritueux) doivent être conditionnés dans des <strong>volumes normalisés fixés</strong> par arrêté (ex. 75 cl, 1L pour vins). Ils ne peuvent pas choisir librement leur QN.',
    ref:'[Arrêté 08/10/2008] | [Dir. 2007/45/CE] | [Guide §II.A]',
    active:false
  },
  {
    id:'tip-039', cat:'capabilite',
    icon:'fa-solid fa-arrow-right-arrow-left', title:'Critère Superdéfectueux',
    backIcon:'fa-solid fa-xmark-circle', backTitle:'U × σ selon taille lot',
    body:'Pour signe <em>e</em> : ms = max(QN−E+2,05σ, <strong>QN−2E+U×σ</strong>). U = 3,09 (N≤1000), 3,71 (N≤10000), 4,26 (N>10000). Plus le lot est grand, plus le critère est exigeant.',
    ref:'[Guide §V.B] | [Dir. 76/211/CEE Annexe I]',
    active:false
  },
  {
    id:'tip-040', cat:'instruments',
    icon:'fa-solid fa-plug', title:'Portée Minimale',
    backIcon:'fa-solid fa-down-left-and-up-right-to-center', backTitle:'Min utile',
    body:'Ne pas utiliser une balance en dessous de sa portée minimale (Min). En dessous, l\'EMT garantie n\'est plus respectée. Vérifier que Min ≤ tare + (QN − 2E) pour utilisation en mode brut.',
    ref:'[OIML R76] | [Dir. 2014/31/UE] | [Décret 91-330]',
    active:false
  },
  {
    id:'tip-041', cat:'echantillonnage',
    icon:'fa-solid fa-magnifying-glass-chart', title:'POM — Définition',
    backIcon:'fa-solid fa-chart-pie', backTitle:'Période Opérationnelle Moyenne',
    body:'POM = <strong>nombre moyen d\'échantillonnages</strong> pour détecter un déréglage donné (probabilité 50 %). Se détermine en fonction de δ√n, avec δ = (QC − m)/σ₀ où m est la cible déréglée (m1 ou m2 de l\'Annexe 4).',
    ref:'[Guide §VII.B.2.3 + Annexe 4] | [NF X06-031-1]',
    active:false
  },
  {
    id:'tip-042', cat:'echantillonnage',
    icon:'fa-solid fa-flag-checkered', title:'POL — Définition',
    backIcon:'fa-solid fa-stopwatch-20', backTitle:'Période Opérationnelle Limite',
    body:'POl = <strong>nombre d\'échantillonnages réalisés en 1 heure</strong> de fabrication (ex. fréquence 15 min → POl = 4). Efficacité correcte si <strong>POM ≤ POl</strong> : le déréglage est alors décelé en moyenne en moins d\'une heure.',
    ref:'[Guide §VII.B.2.3 + Annexe 4] | [NF X06-031-1] | [ISO 7870-2]',
    active:false
  },
  {
    id:'tip-043', cat:'capabilite',
    icon:'fa-solid fa-sigma', title:'σ₀ : Mesure Correcte',
    backIcon:'fa-solid fa-ruler-combined', backTitle:'≥ 20 pesées consécutives',
    body:'σ₀ doit être mesuré sur <strong>≥ 20 pesées consécutives</strong> en production normale (pas en démarrage). L\'écart-type estimé sur l\'échantillon s ≠ σ₀ (processus). σ₀ s\'obtient sur plusieurs lots.',
    ref:'[Guide §V] | [NF X06-030]',
    active:false
  },
  {
    id:'tip-044', cat:'fondamentaux',
    icon:'fa-solid fa-balance-scale-left', title:'Falsification Légale',
    backIcon:'fa-solid fa-gavel', backTitle:'Art. L412-1 C. Conso.',
    body:'Mettre sur le marché un lot dont la <strong>moyenne est &lt; QN</strong> constitue une infraction de "tromperie sur la quantité" punie même sans mauvaise intention. C\'est une infraction objective (résultat, pas intention).',
    ref:'[C. Conso. Art. L441-1] | [Guide §III.A.1.1] | [Dir. 76/211/CEE]',
    active:false
  },
  {
    id:'tip-045', cat:'instruments',
    icon:'fa-solid fa-industry', title:'Trieuse : σ max classe X(1)',
    backIcon:'fa-solid fa-chart-column', backTitle:'Limite variabilité IPFA',
    body:'L\'arrêté 10/01/2006 impose un σ_max selon la classe et la charge. Ex. 100 g, classe X(1) : σ_max = 0,3 g. Classe X(0,5) : σ_max = 0,15 g. Mesurer sur 20 passages pour valider.',
    ref:'[Arr. 10/01/2006] | [Guide §IV.B.2 Tableau 5]',
    active:false
  },
  {
    id:'tip-046', cat:'echantillonnage',
    icon:'fa-solid fa-layer-group', title:'Cumul d\'Échantillons',
    backIcon:'fa-solid fa-plus', backTitle:'Contrôle cumulatif',
    body:'Alternative au test simple : cumuler tous les prélèvements de la fraction horaire. Test final : x̄̄ − g(n_cumulé) × s̄ ≥ QN. Augmente la puissance statistique en fin de lot.',
    ref:'[Guide §VII.B.1.3]',
    active:false
  },
  {
    id:'tip-047', cat:'tares',
    icon:'fa-solid fa-box', title:'Composite Emballage',
    backIcon:'fa-solid fa-puzzle-piece', backTitle:'Tare = contenant complet',
    body:'Peser systématiquement le <strong>contenant complet</strong> (pot + couvercle + film + opercule). Oublier un composant sous-estime la tare → surestimation du poids net → risque de sous-dosage caché.',
    ref:'[Guide §VI.A] | [WELMEC 6.4]',
    active:false
  },
  {
    id:'tip-048', cat:'pratique',
    icon:'fa-solid fa-recycle', title:'Remise en Conformité',
    backIcon:'fa-solid fa-rotate', backTitle:'Lots NC — Options',
    body:'Lot NC en moyenne : <strong>1) mélange</strong> avec lot surdosé (au moins au niveau cartons), <strong>2) complément produit</strong> (reconditionnement), <strong>3) tri</strong> automatique ou manuel. Documenter la décision.',
    ref:'[Guide §IX.A]',
    active:false
  },
  {
    id:'tip-049', cat:'fondamentaux',
    icon:'fa-solid fa-hashtag', title:'QN ≥ 5 g ou 5 mL',
    backIcon:'fa-solid fa-weight-scale', backTitle:'Champ d\'application',
    body:'La réglementation préemballages s\'applique à partir de <strong>QN ≥ 5 g ou 5 mL</strong> et jusqu\'à 10 kg / 10 L (pour signe <em>e</em>). En-dessous ou au-delà : réglementation spécifique ou négociée.',
    ref:'[Dir. 76/211/CEE Art. 1] | [Guide §III.A.1]',
    active:false
  },
  {
    id:'tip-050', cat:'capabilite',
    icon:'fa-solid fa-magnifying-glass-plus', title:'Réduction Variabilité',
    backIcon:'fa-solid fa-wrench', backTitle:'Leviers d\'action',
    body:'Pour réduire σ₀ : <strong>1) maintenance préventive</strong> pompe/buse, <strong>2) stabilisation température produit</strong>, <strong>3) réduction vibrations</strong> machine, <strong>4) formation opérateurs</strong>. Mesurer avant/après chaque action.',
    ref:'[Guide §V] | [NF X06-030]',
    active:false
  },
  {
    id:'tip-051', cat:'documentation',
    icon:'fa-solid fa-timeline', title:'Journal : Changement d\'Équipe',
    backIcon:'fa-solid fa-users', backTitle:'Continuité du contrôle',
    body:'Chaque changement d\'équipe doit être consigné avec un <strong>prélèvement de validation immédiat</strong>. Un nouveau réglage ou remise en route après arrêt aussi. La continuité documentaire prouve l\'absence d\'interruption.',
    ref:'[Guide §III.B.2.5] | [WELMEC 6.4]',
    active:false
  },
  {
    id:'tip-052', cat:'instruments',
    icon:'fa-solid fa-scale-balanced', title:'Éjection Trieuse',
    backIcon:'fa-solid fa-eject', backTitle:'Vérifier l\'éjection',
    body:'La trieuse doit non seulement <strong>détecter</strong> les défectueux mais aussi les <strong>éjecter efficacement</strong>. Vérifier la redirection physique (bac, volet) lors de chaque vérification. Un défectueux non éjecté est un lot NC non intercepté.',
    ref:'[Guide §IV.B.2] | [Arr. 10/01/2006]',
    active:false
  }

];

// ═══════════════════════════════════════════════════════════════
//  ADMIN TIPS — Gestion des fiches actives via localStorage
// ═══════════════════════════════════════════════════════════════

const TIPS_STORAGE_KEY = 'vp_tips_active';

function getTipsActive() {
  try {
    const stored = localStorage.getItem(TIPS_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch(e) {}
  // Défaut : état initial des données
  const def = {};
  TIPS_DATA.forEach(t => { def[t.id] = t.active; });
  return def;
}

function saveTipsActive(state) {
  try { localStorage.setItem(TIPS_STORAGE_KEY, JSON.stringify(state)); } catch(e) {}
}

function renderTips() {
  const grid = document.getElementById('tips-grid');
  if (!grid) return;
  const state = getTipsActive();

  const activeTips = TIPS_DATA.filter(t => state[t.id]);
  grid.innerHTML = '';

  activeTips.forEach(tip => {
    const div = document.createElement('div');
    div.className = 'flip-card';
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', tip.title);
    div.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <i class="${tip.icon}" style="font-size:2.2rem; color:var(--brand-500); margin-bottom:10px;"></i>
          <h3>${tip.title}</h3>
        </div>
        <div class="flip-card-back">
          <h4><i class="${tip.backIcon}" style="margin-right:6px;"></i> ${tip.backTitle}</h4>
          <p>${tip.body}</p>
          <div class="ref-box">Ref: ${tip.ref}</div>
        </div>
      </div>`;
    grid.appendChild(div);
  });

  // Accessibilité clavier : Enter/Space retourne la carte
  grid.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.querySelector('.flip-card-inner').style.transform =
          card.querySelector('.flip-card-inner').style.transform === 'rotateY(180deg)'
            ? '' : 'rotateY(180deg)';
      }
    });
  });

  // Compteur dans l'en-tête
  const ctr = document.getElementById('tips-count');
  if (ctr) ctr.textContent = activeTips.length;
}

function openAdminTips() {
  const modal = document.getElementById('admin-tips-modal');
  if (!modal) return;
  const state = getTipsActive();
  const list = document.getElementById('admin-tips-list');
  if (!list) return;

  // Catégories
  const cats = {
    fondamentaux: 'Fondamentaux',
    instruments: 'Instruments',
    capabilite: 'Capabilité',
    echantillonnage: 'Échantillonnage',
    tares: 'Tares',
    documentation: 'Documentation',
    sanctions: 'Sanctions',
    pratique: 'Pratique'
  };

  const grouped = {};
  TIPS_DATA.forEach(t => {
    if (!grouped[t.cat]) grouped[t.cat] = [];
    grouped[t.cat].push(t);
  });

  let html = '';
  Object.entries(cats).forEach(([key, label]) => {
    const tips = grouped[key] || [];
    if (!tips.length) return;
    html += `<div style="margin-bottom:16px;">
      <div style="font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--brand-500);margin-bottom:8px;border-bottom:1px solid var(--border);padding-bottom:4px;">${label}</div>`;
    tips.forEach(t => {
      const checked = state[t.id] ? 'checked' : '';
      html += `<label style="display:flex;align-items:flex-start;gap:10px;padding:6px 0;cursor:pointer;border-bottom:1px solid var(--border-subtle);">
        <input type="checkbox" data-tip-id="${t.id}" ${checked} style="margin-top:3px;flex-shrink:0;accent-color:var(--brand-500);">
        <span>
          <strong style="font-size:.85rem;">${t.title}</strong>
          <span style="display:block;font-size:.75rem;color:var(--text-muted);margin-top:2px;">${t.backTitle}</span>
        </span>
      </label>`;
    });
    html += `</div>`;
  });

  list.innerHTML = html;
  modal.classList.add('modal-overlay--active');
  document.body.style.overflow = 'hidden';
}

function saveAdminTips() {
  const state = {};
  document.querySelectorAll('#admin-tips-list input[data-tip-id]').forEach(cb => {
    state[cb.dataset.tipId] = cb.checked;
  });
  saveTipsActive(state);
  closeModal('admin-tips-modal');
  renderTips();
}

function resetAdminTips() {
  const state = {};
  TIPS_DATA.forEach(t => { state[t.id] = t.active; });
  saveTipsActive(state);
  closeModal('admin-tips-modal');
  renderTips();
}

// ═══ DATA ═══
const EMTM_TABLE = [
  { max: 50,    val: 9,   pct: true  },
  { max: 100,   val: 4.5, pct: false },
  { max: 200,   val: 4.5, pct: true  },
  { max: 300,   val: 9,   pct: false },
  { max: 500,   val: 3,   pct: true  },
  { max: 1000,  val: 15,  pct: false },
  { max: 10000, val: 1.5, pct: true  }
];

const NAWI_EMT = {
  I:    { s1: 50000, s2: 200000, label: 'Classe I — Très haute précision' },
  II:   { s1: 5000,  s2: 20000,  label: 'Classe II — Haute précision' },
  III:  { s1: 500,   s2: 2000,   label: 'Classe III — Standard' },
  IIII: { s1: 50,    s2: 200,    label: 'Classe IIII — Usage moins exigeant' }
};

// Tableau 4 du Guide (arrêté 10/01/2006) : plages 0–500e / 500–2000e / 2000–10000e,
// identiques quelle que soit la classe (indépendantes du facteur « x »)
const IPFA_EMT = {
  XII:  { s1: 500, s2: 2000, label: 'Classe XII — Trieuse haute précision' },
  XIII: { s1: 500, s2: 2000, label: 'Classe XIII — Trieuse standard industrielle' }
};

const G_TABLE = {
  2:2.176,3:1.089,4:0.819,5:0.686,6:0.603,7:0.544,8:0.500,
  9:0.466,10:0.437,11:0.414,12:0.394,13:0.376,14:0.361,15:0.347,
  16:0.335,17:0.324,18:0.314,19:0.305,20:0.297,21:0.289,22:0.282,
  23:0.275,24:0.269,25:0.264,26:0.258,27:0.253,28:0.248,29:0.244,
  30:0.239,31:0.235,32:0.231,33:0.228,34:0.224,35:0.221,36:0.218,
  37:0.215,38:0.212,39:0.209,40:0.206,41:0.204,42:0.201,43:0.199,
  44:0.196,45:0.194,46:0.192,47:0.190,48:0.188,49:0.186,50:0.184,
  55:0.175,60:0.167,65:0.161
};

const reports = { balance: null, cpk: null, pom: null, tare: null };


// ═══ UTILS ═══
function f(v, d = 3) {
  if (typeof v !== 'number' || isNaN(v)) return 'N/A';
  return parseFloat(v.toFixed(d)).toString();
}

/**
 * Parse une liste de nombres saisie librement (retours ligne, espaces, ; ou ,).
 * Gère la virgule décimale française : si le texte ne contient aucun point,
 * une virgule entre deux chiffres est traitée comme séparateur décimal (12,5 → 12.5).
 */
function parseNumberList(raw) {
  let txt = (raw || '').trim();
  if (!txt) return [];
  if (!txt.includes('.')) txt = txt.replace(/(\d),(?=\d)/g, '$1.');
  return txt.split(/[\s,;]+/).map(parseFloat).filter(v => !isNaN(v) && v > 0);
}

function computeEMTM(qn) {
  for (const r of EMTM_TABLE) { if (qn <= r.max) return r.pct ? (r.val / 100) * qn : r.val; }
  return 0.015 * qn;
}

function computeEMT(qn, classe, e, type) {
  const t = type === 'nawi' ? NAWI_EMT[classe] : IPFA_EMT[classe];
  if (!t) return null;
  const ratio = qn / e;
  let fac;
  if (type === 'nawi') {
    fac = ratio <= t.s1 ? 0.5 : ratio <= t.s2 ? 1.0 : 1.5;
    return { emt_neuf: fac * e, emt_service: 2 * fac * e, fac, ratio };
  }
  fac = ratio <= t.s1 ? 1.0 : ratio <= t.s2 ? 2.0 : 3.0;
  return { emt_neuf: fac * e, emt_service: fac * e, fac, ratio };
}

function getG(n) {
  if (G_TABLE[n]) return G_TABLE[n];
  const keys = Object.keys(G_TABLE).map(Number).sort((a, b) => a - b);
  let lo = keys[0], hi = keys[keys.length - 1];
  for (const k of keys) { if (k < n) lo = k; if (k > n && hi === keys[keys.length - 1]) hi = k; }
  if (lo === hi) return G_TABLE[lo];
  const t = (n - lo) / (hi - lo);
  return G_TABLE[lo] + t * (G_TABLE[hi] - G_TABLE[lo]);
}

function echelonAdapte(qn, e, type) {
  const tbl = type === 'nawi'
    ? [[0.1,0],[0.2,10],[0.5,50],[1,200],[2,2000],[5,5000],[10,10000],[20,20000],[50,50000]]
    : [[0.1,0],[0.2,10],[0.5,25],[1,110],[2,330],[5,1670],[10,3330],[20,6670]];
  const row = tbl.find(([ec]) => Math.abs(ec - e) < 0.0001);
  return row ? qn >= row[1] : true;
}

function echelonNote(type, qn, e) {
  const tbl = type === 'nawi'
    ? [[0.1,0],[0.2,10],[0.5,50],[1,200],[2,2000],[5,5000],[10,10000],[20,20000],[50,50000]]
    : [[0.1,0],[0.2,10],[0.5,25],[1,110],[2,330],[5,1670],[10,3330],[20,6670]];
  const row = tbl.find(([ec]) => Math.abs(ec - e) < 0.0001);
  if (!row) return '';
  return qn >= row[1]
    ? `Échelon e compatible pour e = ${f(e, 3)} g.`
    : `Échelon e à vérifier : charge minimale non atteinte pour e = ${f(e, 3)} g.`;
}

function phi(z) {
  // Fonction de répartition de la loi normale N(0,1) : Φ(z) = ½·(1 + erf(z/√2))
  // erf approché par Abramowitz & Stegun 7.1.26 (erreur < 1,5×10⁻⁷)
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const erf = 1 - t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))) * Math.exp(-x * x);
  const cdf = 0.5 * (1 + erf);
  return z >= 0 ? cdf : 1 - cdf;
}

// Constante c4 de la carte s (espérance de s = c4·σ) : c4 = √(2/(n−1))·Γ(n/2)/Γ((n−1)/2)
function c4(n) {
  function lnGammaHalf(m) { // ln Γ(m/2) pour m entier ≥ 1
    let ln = m % 2 === 0 ? 0 : 0.5 * Math.log(Math.PI);
    for (let k = m - 2; k >= 1; k -= 2) ln += Math.log(k / 2);
    return ln;
  }
  return Math.sqrt(2 / (n - 1)) * Math.exp(lnGammaHalf(n) - lnGammaHalf(n - 1));
}

// P(χ²(k) > x) — fonction de survie du chi-deux via la gamma incomplète régularisée
// (série pour x < k/2+1, fraction continue de Lentz sinon)
function chi2Sf(x, k) {
  if (x <= 0) return 1;
  const a = k / 2, xx = x / 2;
  function lnGamma(z) { // Lanczos g=7
    const c = [676.5203681218851, -1259.1392167224028, 771.32342877765313,
      -176.61502916214059, 12.507343278686905, -0.13857109526572012,
      9.9843695780195716e-6, 1.5056327351493116e-7];
    let s = 0.99999999999980993;
    for (let i = 0; i < 8; i++) s += c[i] / (z + i + 1);
    const t = z + 7.5;
    return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(s) - Math.log(z);
  }
  if (xx < a + 1) { // série : P(a,x) puis Q = 1−P
    let sum = 1 / a, term = sum, ap = a;
    for (let i = 0; i < 300; i++) {
      ap += 1; term *= xx / ap; sum += term;
      if (Math.abs(term) < Math.abs(sum) * 1e-12) break;
    }
    return 1 - sum * Math.exp(-xx + a * Math.log(xx) - lnGamma(a));
  }
  // fraction continue (Lentz) : Q(a,x) directement
  let b = xx + 1 - a, c_ = 1e300, d = 1 / b, h = d;
  for (let i = 1; i < 300; i++) {
    const an = -i * (i - a);
    b += 2; d = an * d + b; if (Math.abs(d) < 1e-300) d = 1e-300;
    c_ = b + an / c_; if (Math.abs(c_) < 1e-300) c_ = 1e-300;
    d = 1 / d; const del = d * c_; h *= del;
    if (Math.abs(del - 1) < 1e-12) break;
  }
  return h * Math.exp(-xx + a * Math.log(xx) - lnGamma(a));
}

// ── Gestion Excel (SheetJS) ──
function downloadTemplate(type) {
  const data = [["Poids (g)"], [100.1], [100.2], [99.8], [100.5]]; // Exemple
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Données");
  XLSX.writeFile(wb, `Modele_${type.toUpperCase()}.xlsx`);
  updateStepper(type, 2);
}

function handleFileUpload(input, type) {
  const file = input.files[0];
  if (!file) return;
  
  document.getElementById(`${type}_filename`).textContent = file.name;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, {type: 'array'});
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const json = XLSX.utils.sheet_to_json(worksheet, {header: 1});
    
    // Extraction des nombres (on ignore les entêtes texte)
    const nums = json.flat().map(v => parseFloat(String(v).replace(',', '.'))).filter(v => !isNaN(v));
    
    processImportedData(type, nums);
  };
  reader.readAsArrayBuffer(file);
}

function processImportedData(type, nums) {
  if (nums.length < 2) {
    alert("Le fichier doit contenir au moins 2 valeurs numériques.");
    return;
  }

  const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
  const std = Math.sqrt(nums.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (nums.length - 1));

  if (type === 'cpk') {
    document.getElementById('c_sigma').value = std.toFixed(4);
    document.getElementById('c_sigma_display').value = `${std.toFixed(4)} g (${nums.length} pesées)`;
    document.getElementById('c_calc_btn').disabled = false;
    updateStepper('cpk', 3);
  } else if (type === 'pom') {
    document.getElementById('p_xbar').value = mean.toFixed(4);
    document.getElementById('p_s').value = std.toFixed(4);
    document.getElementById('p_xbar_display').value = `${mean.toFixed(4)} g`;
    document.getElementById('p_s_display').value = `${std.toFixed(4)} g (${nums.length} pesées)`;
    document.getElementById('p_n').value = nums.length;
    document.getElementById('p_calc_btn').disabled = false;
    updateStepper('pom', 3);
  } else if (type === 'tare') {
    document.getElementById('t_sigma').value = std.toFixed(4);
    document.getElementById('t_sigma_display').value = `${std.toFixed(4)} g (${nums.length} pesées)`;
    document.getElementById('t_calc_btn').disabled = false;
    updateStepper('tare', 3);
  }
}

function updateStepper(type, step) {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`s_${type}_${i}`);
    if (!el) continue;
    el.classList.remove('stepper__item--active', 'stepper__item--done');
    if (i < step) el.classList.add('stepper__item--done');
    else if (i === step) el.classList.add('stepper__item--active');
  }
}


// ═══ UI HELPERS ═══
function setVerdict(id, state, title, text) {
  const el = document.getElementById(id);
  if (!el) return;
  const icons = { success: '✅', danger: '❌', warning: '⚠️', info: 'ℹ️', neutral: '○' };
  el.className = `verdict verdict--${state || 'neutral'}`;
  el.innerHTML = `<div class="verdict__icon">${icons[state] || icons.neutral}</div><div class="verdict__content"><div class="verdict__title">${title}</div><div class="verdict__text">${text}</div></div>`;
}

function renderGTable(selectedN) {
  const tbody = document.querySelector('#g_table_static tbody');
  if (!tbody) return;
  if (tbody.children.length === 0) {
    Object.keys(G_TABLE).map(Number).sort((a, b) => a - b).forEach(n => {
      const tr = document.createElement('tr');
      tr.id = `g_row_${n}`;
      tr.innerHTML = `<td>${n}</td><td>${f(G_TABLE[n], 3)}</td>`;
      tbody.appendChild(tr);
    });
  }
  tbody.querySelectorAll('tr').forEach(r => r.classList.remove('table__highlight'));
  if (selectedN) { const r = document.getElementById(`g_row_${selectedN}`); if (r) r.classList.add('table__highlight'); }
}

function buildCompareBar(used, limit, left, right) {
  const max = Math.max(used, limit) * 1.15 || 1;
  const uPct = Math.min((used / max) * 100, 100);
  const lPct = Math.min((limit / max) * 100, 100);
  return `<div class="compare">
    <div class="compare__header"><span>${used <= limit ? '✓ Sous le seuil' : '✗ Au-dessus du seuil'}</span></div>
    <div class="compare__bar"><div class="compare__fill" style="width:${uPct}%"></div><div class="compare__limit" style="left:${lPct}%"></div></div>
    <div class="compare__labels"><span><strong>${left}</strong> ${f(used)} g</span><span><strong>${right}</strong> ${f(limit)} g</span></div>
  </div>`;
}

function rowInfo(l, v) { return `<tr><td>${l}</td><td>${v}</td></tr>`; }
function rowOK(l, v, ok) { return `<tr><td>${l}</td><td style="color:var(--${ok?'success':'danger'}-500);font-weight:600;">${v}</td></tr>`; }
function rowCrit(l, v, tone) {
  const c = tone === 'emtm' ? 'var(--brand-500)' : tone === 'emt' ? 'var(--warning-500)' : 'var(--text-primary)';
  return `<tr><td>${l}</td><td style="color:${c};font-weight:700;">${v}</td></tr>`;
}
function sectionRow(t) { return `<tr style="background:var(--brand-50);color:var(--brand-600);font-weight:700;"><td colspan="2">${t}</td></tr>`; }

// ═══ TABS ═══
function switchTab(id) {
  document.querySelectorAll(".nav__btn").forEach(b => { 
    b.classList.remove("nav__btn--active"); 
    b.setAttribute("aria-selected", "false"); 
  });
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("panel--active"));
  
  const btn = document.getElementById(`tab-${id}`);
  if (btn) { 
    btn.classList.add("nav__btn--active"); 
    btn.setAttribute("aria-selected", "true"); 
  }
  
  const panel = document.getElementById(`panel-${id}`);
  if (panel) panel.classList.add("panel--active");
  
  if (id === "pom") setTimeout(() => renderGTable(), 50);
}

// ═══ PANEL 1: BALANCE ═══
function onTypeChange() {
  const t = document.getElementById('b_type').value;
  const sel = document.getElementById('b_classe');
  sel.innerHTML = '';
  (t === 'nawi' ? ['I','II','III','IIII'] : ['XII','XIII']).forEach(c => {
    const o = document.createElement('option'); o.value = c; o.textContent = 'Classe ' + c; sel.appendChild(o);
  });
  if (t === 'nawi') sel.value = 'III';
  updateBalanceClassInfo();
}

function updateBalanceClassInfo() {
  const type = document.getElementById('b_type').value;
  const classe = document.getElementById('b_classe').value;
  const info = type === 'nawi' ? NAWI_EMT[classe] : IPFA_EMT[classe];
  document.getElementById('b_class_desc').textContent = info?.label || '';
}

function verifyBalance() {
  const type = document.getElementById('b_type').value;
  const classe = document.getElementById('b_classe').value;
  const ref = document.getElementById('b_ref').value || 'N/A';
  const e = parseFloat(document.getElementById('b_e').value);
  const d = parseFloat(document.getElementById('b_d').value);
  const max_p = parseFloat(document.getElementById('b_max').value);
  const min_p = parseFloat(document.getElementById('b_min').value);
  const qn = parseFloat(document.getElementById('b_qn').value);
  const prod = document.getElementById('b_prod').value || 'N/A';

  if ([e, d, max_p, qn].some(v => isNaN(v) || v <= 0)) { alert('Vérifiez les valeurs saisies.'); return; }

  const emtm = computeEMTM(qn);
  const emtm5 = emtm / 5;
  const emt_data = computeEMT(qn, classe, e, type);
  if (!emt_data) { alert('Erreur de calcul EMT.'); return; }

  const emt_service = emt_data.emt_service;
  const isAdapte = emt_service <= emtm5;
  const echelonOK = echelonAdapte(qn, e, type);
  const note = echelonNote(type, qn, e);
  const outOfScope = qn > 10000;

  const emtmRowId = qn <= 50 ? 'emtm_row_0' : qn <= 100 ? 'emtm_row_1' : qn <= 200 ? 'emtm_row_2' : qn <= 300 ? 'emtm_row_3' : qn <= 500 ? 'emtm_row_4' : qn <= 1000 ? 'emtm_row_5' : 'emtm_row_6';
  document.querySelectorAll('.table tbody tr').forEach(r => r.classList.remove('table__highlight'));
  const emtmRow = document.getElementById(emtmRowId);
  if (emtmRow) { emtmRow.classList.add('table__highlight'); emtmRow.closest('details').open = true; }

  const plageLabel = (() => {
    const r = emt_data.ratio;
    if (type === 'nawi') {
      const t = NAWI_EMT[classe];
      return r <= t.s1 ? `m ≤ ${t.s1}e → ×0,5` : r <= t.s2 ? `${t.s1}e < m ≤ ${t.s2}e → ×1,0` : `m > ${t.s2}e → ×1,5`;
    }
    const t = IPFA_EMT[classe];
    return r <= t.s1 ? `m ≤ ${t.s1}e → ×1e` : r <= t.s2 ? `${t.s1}e < m ≤ ${t.s2}e → ×2e` : `m > ${t.s2}e → ×3e`;
  })();

  const nomType = type === 'nawi' ? 'IPFNA' : 'IPFA';
  const descClasse = (type === 'nawi' ? NAWI_EMT[classe] : IPFA_EMT[classe])?.label;

  setVerdict('b_verdict', isAdapte && echelonOK ? 'success' : isAdapte ? 'warning' : 'danger',
    isAdapte && echelonOK ? 'Balance ADAPTÉE' : isAdapte ? 'Vérifier échelon' : 'NON ADAPTÉE',
    isAdapte && echelonOK ? `EMT ${f(emt_service)} g ≤ 1/5 EMTM ${f(emtm5)} g` : `EMT ${f(emt_service)} g > 1/5 EMTM ${f(emtm5)} g`
  );

  const both = isAdapte && echelonOK;
  let html = `<div class="kpi-grid">
    <div class="kpi ${isAdapte ? 'kpi--ok' : 'kpi--danger'}"><div class="kpi__label">EMT service</div><div class="kpi__value">${f(emt_service)}<span class="kpi__unit">g</span></div></div>
    <div class="kpi"><div class="kpi__label">1/5 EMTM</div><div class="kpi__value">${f(emtm5)}<span class="kpi__unit">g</span></div></div>
    <div class="kpi"><div class="kpi__label">EMTM</div><div class="kpi__value">${f(emtm)}<span class="kpi__unit">g</span></div></div>
    <div class="kpi ${echelonOK ? 'kpi--ok' : 'kpi--warn'}"><div class="kpi__label">Échelon e</div><div class="kpi__value">${echelonOK ? '✓' : '⚠'}</div></div>
  </div>
  <table class="table">
    ${rowInfo('Instrument', `${nomType} — Classe ${classe}`)}
    ${rowInfo('Référence', ref)}
    ${rowInfo('Description', descClasse || '')}
    ${rowInfo('Échelon e / d', f(e) + ' g / ' + f(d) + ' g')}
    ${rowInfo('Portée', f(max_p) + ' g / ' + f(min_p, 1) + ' g')}
    ${rowInfo('Produit / QN', prod + ' — ' + f(qn, 2) + ' g')}
    ${sectionRow('Calculs')}
    ${rowInfo('Ratio m/e', f(qn / e, 1) + ' → ' + plageLabel)}
    ${rowCrit('EMT neuve', '±' + f(emt_data.emt_neuf) + ' g', 'emtm')}
    ${rowCrit('EMT service', '±' + f(emt_service) + ' g', 'emt')}
    ${rowCrit('EMTM', f(emtm) + ' g', 'emtm')}
    ${rowOK('EMT ≤ 1/5 EMTM ?', f(emt_service) + ' ≤ ' + f(emtm5) + ' → ' + (isAdapte ? 'OUI' : 'NON'), isAdapte)}
    ${rowOK('Échelon adapté ?', echelonOK ? 'OUI' : 'NON', echelonOK)}
  </table>
  ${buildCompareBar(emt_service, emtm5, 'EMT service', '1/5 EMTM')}`;

  if (note) html += `<div class="alert alert--info mt-4">${note}</div>`;
  if (!both) html += `<div class="alert alert--${isAdapte ? 'warning' : 'danger'} mt-3"><strong>Actions :</strong> ${isAdapte ? "Vérifiez l'échelon e." : "Balance de classe supérieure, QN plus élevé, ou e plus petit."}</div>`;
  if (outOfScope) html += `<div class="alert alert--danger mt-3"><strong>⚠️ Hors domaine :</strong> QN > 10 000 g — calcul indicatif uniquement.</div>`;

  html += `<div class="conclusion conclusion--${both ? 'success' : isAdapte ? 'warning' : 'danger'}">
    ${both ? "✅ Balance ADAPTÉE pour " + prod + " (" + f(qn, 2) + " g)." : isAdapte ? "⚠️ Vérifier l'échelon e." : "❌ Balance NON ADAPTÉE."}</div>`;

  const hdr = document.getElementById('b_result_hdr');
  hdr.className = `result__header result__header--${both ? 'success' : isAdapte ? 'warning' : 'danger'}`;
  hdr.textContent = both ? '✅ Balance ADAPTÉE' : isAdapte ? '⚠️ Vérifier échelon' : '❌ NON ADAPTÉE';
  document.getElementById('b_result_body').innerHTML = html;
  document.getElementById('b_result').style.display = 'block';
  document.getElementById('b_dl_btn').disabled = false;
  document.getElementById('b_result').scrollIntoView({ behavior: 'smooth', block: 'start' });

  reports.balance = `RAPPORT ADÉQUATION — VisiPilot\nDate: ${new Date().toLocaleString('fr-FR')}\nInstrument: ${nomType} Classe ${classe}\nRéf: ${ref}\nE: ${f(e)}g | D: ${f(d)}g\nEMT service: ±${f(emt_service)}g\nEMTM: ${f(emtm)}g | 1/5: ${f(emtm5)}g\nRésultat: ${both ? 'ADAPTÉE' : 'NON ADAPTÉE'}`;
}


// ═══ PANEL 2: CPk ═══
function calcCpk() {
  updateStepper('cpk', 4);
  const qn = parseFloat(document.getElementById('c_qn').value);
  const mu = parseFloat(document.getElementById('c_mu').value);
  const sigma = parseFloat(document.getElementById('c_sigma').value);
  const signeE = document.getElementById('c_signe_e').value === 'oui';
  const U = parseFloat(document.getElementById('c_lot_n').value);

  if ([qn, sigma, mu].some(v => isNaN(v) || v <= 0)) { alert('Vérifiez les valeurs.'); return; }

  const E = computeEMTM(qn);
  const seuilSigma = E / 2.05;
  const sigmaOK = sigma <= seuilSigma;
  const ms_defect = sigmaOK ? qn : qn - E + 2.05 * sigma;
  let ms = ms_defect;
  if (signeE) ms = Math.max(ms_defect, qn - 2 * E + U * sigma);

  const Cp = E / (3 * sigma);
  const Cpk_lower = (mu - (qn - E)) / (3 * sigma);
  const Cpk_super = signeE ? (mu - (qn - 2 * E)) / (3 * sigma) : null;
  const Cpk = Cpk_super !== null ? Math.min(Cpk_lower, Cpk_super) : Cpk_lower;

  const z_defect = (mu - (qn - E)) / sigma;
  const pct_defect = (1 - phi(z_defect)) * 100;
  const msOK = mu >= ms;
  const gaugePos = Math.min(Math.max(Cpk / 2, 0), 1) * 100;

  // Seuils MÉTROLOGIQUES dérivés des textes (et non des conventions industrielles) :
  //  - critère défectueux 2 % (z = 2,05)          → Cpk_lower ≥ 2,05/3 ≈ 0,68
  //  - critère superdéfectueux signe e (z = U)    → Cpk_super ≥ U/3 (1,03 / 1,24 / 1,42 selon N)
  const CPK_MIN_DEFECT = 2.05 / 3;
  const cpkSuperMin = signeE ? U / 3 : null;
  const reglOK = Cpk_lower >= CPK_MIN_DEFECT && (!signeE || Cpk_super >= cpkSuperMin);

  let interp;
  if (!reglOK) interp = { label: 'Non conforme aux critères métrologiques — surdosage ou amélioration machine requis', cls: 'danger' };
  else if (Cpk < 1.00) interp = { label: 'Conforme aux critères métrologiques — marge faible (bonne pratique : viser ≥ 1,33)', cls: 'warning' };
  else if (Cpk < 1.33) interp = { label: 'Conforme — marge correcte', cls: 'success' };
  else interp = { label: 'Conforme — marge confortable', cls: 'success' };

  setVerdict('c_verdict', reglOK && msOK ? (Cpk >= 1.00 ? 'success' : 'warning') : 'danger',
    `Cpk = ${f(Cpk, 3)} — ${interp.label}`,
    `Seuil réglementaire Cpk ≥ ${f(CPK_MIN_DEFECT, 2)}${signeE ? ' et Cpk_super ≥ ' + f(cpkSuperMin, 2) : ''}, ms = ${f(ms)} g`
  );

  let html = `<div class="kpi-grid">
    <div class="kpi ${Cpk >= 1.33 ? 'kpi--ok' : Cpk >= 1.00 ? 'kpi--warn' : 'kpi--danger'}"><div class="kpi__label">Cpk</div><div class="kpi__value">${f(Cpk, 3)}</div></div>
    <div class="kpi"><div class="kpi__label">Cp</div><div class="kpi__value">${f(Cp, 3)}</div></div>
    <div class="kpi ${sigmaOK ? 'kpi--ok' : 'kpi--danger'}"><div class="kpi__label">σ / seuil</div><div class="kpi__value">${sigmaOK ? '✓' : '✗'}</div></div>
    <div class="kpi ${msOK ? 'kpi--ok' : 'kpi--danger'}"><div class="kpi__label">μ ≥ ms</div><div class="kpi__value">${msOK ? '✓' : '✗'}</div></div>
  </div>
  <div class="gauge">
    <div class="gauge__label">Cpk = ${f(Cpk, 3)}</div>
    <div class="gauge__bar"><div class="gauge__needle" style="left:${gaugePos}%"></div></div>
    <div class="gauge__scale">
      <span><strong>0</strong>non mesuré</span>
      <span><strong>0,68</strong>seuil 2 % défect.</span>
      <span><strong>1,00</strong>marge correcte</span>
      <span><strong>1,33</strong>confortable</span>
      <span><strong>2,0</strong>&nbsp;</span>
    </div>
  </div>
  <table class="table">
    ${rowInfo('QN', f(qn, 2) + ' g')}
    ${rowCrit('EMTM (E)', f(E) + ' g', 'emtm')}
    ${rowInfo('Seuil défectueux TU1', f(qn - E) + ' g')}
    ${signeE ? rowInfo('Seuil superdéfectueux TU2', f(qn - 2 * E) + ' g') : ''}
    ${rowInfo('σ₀', f(sigma) + ' g')}
    ${rowInfo('Seuil σ (E/2,05)', f(seuilSigma) + ' g')}
    ${rowOK('σ ≤ E/2,05', sigmaOK ? 'OUI' : 'NON — surdosage', sigmaOK)}
    ${sectionRow('Capabilité vs critères métrologiques')}
    ${rowOK('Cpk défectueux ≥ 0,68 (z = 2,05 → 2 %)', f(Cpk_lower, 3) + ' → ' + (Cpk_lower >= CPK_MIN_DEFECT ? 'OUI' : 'NON'), Cpk_lower >= CPK_MIN_DEFECT)}
    ${signeE ? rowOK('Cpk superdéf. ≥ ' + f(cpkSuperMin, 2) + ' (z = U = ' + f(U, 2) + ')', f(Cpk_super, 3) + ' → ' + (Cpk_super >= cpkSuperMin ? 'OUI' : 'NON'), Cpk_super >= cpkSuperMin) : ''}
    ${sectionRow('Centrage')}
    ${rowInfo('ms requis', f(ms) + ' g')}
    ${rowInfo('μ actuelle', f(mu) + ' g')}
    ${rowOK('μ ≥ ms', f(mu) + ' ≥ ' + f(ms) + ' → ' + (msOK ? 'OUI' : 'NON'), msOK)}
    ${rowInfo('Surdosage (μ − ms)', f(mu - ms, 3) + ' g')}
    ${sectionRow('Défectueux')}
    ${rowInfo('Taux estimé', f(pct_defect, 4) + ' %')}
  </table>`;

  if (!sigmaOK) html += `<div class="alert alert--warning mt-4">Surdosage recommandé : μ ≥ ${f(ms)} g (actuellement ${f(mu)} g, surdosage de ${f(Math.max(ms - mu, 0), 3)} g).</div>`;
  html += `<div class="conclusion conclusion--${interp.cls}">Cpk = ${f(Cpk, 3)} — ${interp.label}</div>`;

  const hdr = document.getElementById('c_result_hdr');
  hdr.className = `result__header result__header--${interp.cls === 'success' ? 'success' : interp.cls === 'warning' ? 'warning' : 'danger'}`;
  hdr.textContent = `Cpk = ${f(Cpk, 3)} — ${interp.label}`;
  document.getElementById('c_result_body').innerHTML = html;
  document.getElementById('c_result').style.display = 'block';
  document.getElementById('c_dl_btn').disabled = false;
  document.getElementById('c_result').scrollIntoView({ behavior: 'smooth', block: 'start' });

  reports.cpk = `RAPPORT CPk — VisiPilot\nDate: ${new Date().toLocaleString('fr-FR')}\nQN: ${f(qn,2)}g | E: ${f(E)}g | σ: ${f(sigma)}g | μ: ${f(mu)}g\nCp: ${f(Cp,3)} | Cpk: ${f(Cpk,3)}\nσ ≤ E/2,05: ${sigmaOK?'OUI':'NON'} | ms: ${f(ms)}g | μ≥ms: ${msOK?'OUI':'NON'}\nTaux défectueux: ${f(pct_defect,4)}%\nVerdict: ${interp.label}`;
}


// ═══ PANEL 3: POM/POL ═══
/**
 * Efficacité du plan d'échantillonnage selon le Guide DGCCRF 2014, Annexe 4.
 * Trois dérèglements officiels à détecter en ≤ 1 h de fabrication :
 *   1. Carte moyenne / critère moyenne      : m1 = 0,998·QN (avec QN − m1 ≥ 0,1 g)
 *   2. Carte moyenne / critère défectueux   : m2 = QN − E + 2,05·σ₀
 *   3. Carte écart-type / critère défectueux: σ₁ = (QC − (QN − E)) / 2,05
 * POl = nombre d'échantillonnages par heure ; efficacité correcte si POM ≤ POl.
 * POM calculée analytiquement (carte de Shewhart : limite ±3σ/√n pour la moyenne,
 * limite c4+3·√(1−c4²) pour la carte s). Les tables de la NF X06-031-1 peuvent
 * différer légèrement (règles complémentaires) : l'exemple chiffré de l'Annexe 4
 * est reproduit ici à ≈ 5 % près, avec les mêmes verdicts.
 */
function calcPomPol() {
  const qn = parseFloat(document.getElementById('p_qn').value);
  const sigma = parseFloat(document.getElementById('p_sigma').value);
  const n = parseInt(document.getElementById('p_n').value);
  const freq = parseFloat(document.getElementById('p_freq').value);
  const signeE = document.getElementById('p_signe_e').value === 'oui';
  const U = parseFloat(document.getElementById('p_lot_n').value);
  const qcInput = parseFloat(document.getElementById('p_qc').value);
  const xbar = parseFloat(document.getElementById('p_xbar').value);
  const s = parseFloat(document.getElementById('p_s').value);

  if ([qn, sigma, n, freq, xbar, s].some(v => isNaN(v) || v <= 0)) { alert('Vérifiez les valeurs.'); return; }
  if (n < 2 || n > 65) { alert('n doit être entre 2 et 65.'); return; }

  const E = computeEMTM(qn);
  const g = getG(n);
  const seuilSigma = E / 2.05;
  const sigmaOK = sigma <= seuilSigma;
  // ms = seuil de centrage : critère défectueux, plus critère superdéfectueux si signe 'e'
  // (Guide DGCCRF §V — même règle que CPk)
  const ms_defect = sigmaOK ? qn : qn - E + 2.05 * sigma;
  const ms = signeE ? Math.max(ms_defect, qn - 2 * E + U * sigma) : ms_defect;

  // Quantité cible QC = ms + k (k = surdosage d'efficacité, Annexe 4) ; défaut : QC = ms
  const QC = !isNaN(qcInput) && qcInput > 0 ? qcInput : ms;
  const k = QC - qn;
  const qcOK = QC >= ms - 1e-9;

  // Test de conformité de la moyenne (§VII.B.1.2 + Annexe 3)
  const test_val = xbar - g * s;
  const testOK = test_val >= qn;
  const testMargin = test_val - qn;

  // Limites de la carte de la moyenne, centrée sur QC (NF X06-031-1 / ISO 7870-2)
  const se = sigma / Math.sqrt(n);
  const lc_upper = QC + 3 * se;
  const ls_upper = QC + 2 * se;
  const ls_lower = QC - 2 * se;
  const lc_lower = QC - 3 * se;

  // POl = nombre d'échantillonnages par heure (Annexe 4 : ex. 15 min → POl = 4)
  const POl = Math.floor(60 / freq);
  const freqOK = freq <= 60 && POl >= 1;

  // ── Dérèglement 1 : carte moyenne, critère de la moyenne ──
  const m1 = Math.min(0.998 * qn, qn - 0.1);
  const delta1 = (QC - m1) / sigma;
  const P1 = phi(delta1 * Math.sqrt(n) - 3);
  const POM1 = P1 > 0 ? 1 / P1 : Infinity;
  // ── Dérèglement 2 : carte moyenne, critère des défectueux ──
  const m2 = qn - E + 2.05 * sigma;
  const delta2 = (QC - m2) / sigma;
  const P2 = phi(delta2 * Math.sqrt(n) - 3);
  const POM2 = P2 > 0 ? 1 / P2 : Infinity;
  // ── Dérèglement 3 : carte écart-type, critère des défectueux ──
  const sigma1 = (QC - (qn - E)) / 2.05;
  const c4n = c4(n);
  const UCLs = sigma * (c4n + 3 * Math.sqrt(1 - c4n * c4n));
  const P3 = sigma1 > 0 ? chi2Sf((n - 1) * Math.pow(UCLs / sigma1, 2), n - 1) : 0;
  const POM3 = P3 > 0 ? 1 / P3 : Infinity;

  const eff1 = POM1 <= POl, eff2 = POM2 <= POl, eff3 = POM3 <= POl;
  const effOK = eff1 && eff2 && eff3;
  const pomMax = Math.max(POM1, POM2, POM3);
  const fPOM = (v) => v === Infinity || v > 9999 ? '> 9999' : f(v, 1);

  renderGTable(n);
  updateStepper('pom', 3);

  const overallOK = testOK && effOK && freqOK && qcOK;
  setVerdict('p_verdict', overallOK ? 'success' : testOK ? 'warning' : 'danger',
    overallOK ? 'Plan conforme (Annexe 4)' : testOK ? 'Plan à optimiser' : 'Non conforme',
    testOK ? `POM max = ${fPOM(pomMax)} vs POl = ${POl} (n=${n}, ${freq} min)` : `x̄ − g·s < QN`
  );

  let html = `<div class="kpi-grid">
    <div class="kpi ${testOK ? 'kpi--ok' : 'kpi--danger'}"><div class="kpi__label">Test moyenne</div><div class="kpi__value">${testOK ? '✓' : '✗'}</div></div>
    <div class="kpi"><div class="kpi__label">g(n=${n})</div><div class="kpi__value">${f(g, 3)}</div></div>
    <div class="kpi ${effOK ? 'kpi--ok' : 'kpi--danger'}"><div class="kpi__label">POM max / POl</div><div class="kpi__value">${fPOM(pomMax)}<span class="kpi__unit">/ ${POl}</span></div></div>
    <div class="kpi ${freqOK ? 'kpi--ok' : 'kpi--warn'}"><div class="kpi__label">Fréquence</div><div class="kpi__value">${freq}<span class="kpi__unit">min</span></div></div>
  </div>
  <table class="table">
    ${sectionRow('Test de la moyenne (§VII.B.1.2 + Annexe 3)')}
    ${rowInfo('x̄ − g·s', f(xbar) + ' − ' + f(g, 3) + ' × ' + f(s) + ' = ' + f(test_val, 4) + ' g')}
    ${rowOK('≥ QN ?', testOK ? `OUI (+${f(testMargin, 4)} g)` : `NON (−${f(Math.abs(testMargin), 4)} g)`, testOK)}
    ${sectionRow('Carte de contrôle de la moyenne (centrée sur QC)')}
    ${rowInfo('Seuil de centrage ms', f(ms) + ' g')}
    ${rowOK('Quantité cible QC (= ms + k)', f(QC) + ' g (k = ' + f(k, 3) + ' g) → ' + (qcOK ? 'OK' : 'QC < ms !'), qcOK)}
    ${rowInfo('LCS / LSS', f(lc_upper, 4) + ' g / ' + f(ls_upper, 4) + ' g')}
    ${rowInfo('LSI / LCI', f(ls_lower, 4) + ' g / ' + f(lc_lower, 4) + ' g')}
    ${sectionRow('Efficacité — Annexe 4 (POM ≤ POl = ' + POl + ' prélèv./h)')}
    ${rowOK('① m1 = 0,998·QN = ' + f(m1, 2) + ' g (δ√n = ' + f(delta1 * Math.sqrt(n), 2) + ')', 'POM = ' + fPOM(POM1) + ' → ' + (eff1 ? 'efficace' : 'INSUFFISANT'), eff1)}
    ${rowOK('② m2 = QN−E+2,05σ₀ = ' + f(m2, 2) + ' g (δ√n = ' + f(delta2 * Math.sqrt(n), 2) + ')', 'POM = ' + fPOM(POM2) + ' → ' + (eff2 ? 'efficace' : 'INSUFFISANT'), eff2)}
    ${rowOK('③ σ₁ = (QC−TU1)/2,05 = ' + f(sigma1, 2) + ' g (σ₁/σ₀ = ' + f(sigma1 / sigma, 2) + ')', 'POM = ' + fPOM(POM3) + ' → ' + (eff3 ? 'efficace' : 'INSUFFISANT'), eff3)}
    ${rowOK('Fréquence ≤ 60 min', freq + ' min → ' + (freqOK ? 'OUI' : 'NON'), freqOK)}
  </table>
  <p style="font-size:.75rem;color:var(--text-muted);margin-top:6px;">POM calculées analytiquement (carte de Shewhart, limites 3σ) — les tables NF X06-031-1 peuvent différer légèrement ; l'exemple chiffré de l'Annexe 4 du Guide est reproduit à ≈ 5 % près avec les mêmes verdicts.</p>`;

  if (!overallOK) html += `<div class="alert alert--${testOK ? 'warning' : 'danger'} mt-4"><strong>Actions (Annexe 4) :</strong> ${testOK ? 'Augmentez l\'effectif n (7–10 recommandé), <strong>augmentez la quantité cible QC</strong> (surdosage k), réduisez σ₀ (maintenance, centrage des becs) ou resserrez la fréquence de prélèvement.' : 'Le critère x̄ − g·s ≥ QN n\'est pas atteint : la partie de lot contrôlée ne peut être déclarée conforme. Vérifiez le réglage (μ ≥ ms) avant d\'optimiser le plan.'}</div>`;
  html += `<div class="conclusion conclusion--${overallOK ? 'success' : testOK ? 'warning' : 'danger'}">
    ${overallOK ? '✅ Plan conforme — chaque dérèglement de l\'Annexe 4 est détecté en ≤ 1 h' : testOK ? '⚠️ Test moyenne OK — efficacité de carte insuffisante (POM > POl)' : '❌ Test moyenne NON CONFORME'}</div>`;

  const hdr = document.getElementById('p_result_hdr');
  hdr.className = `result__header result__header--${overallOK ? 'success' : testOK ? 'warning' : 'danger'}`;
  hdr.textContent = overallOK ? '✅ Plan CONFORME' : testOK ? '⚠️ Test OK — plan à optimiser' : '❌ NON CONFORME';
  document.getElementById('p_result_body').innerHTML = html;
  document.getElementById('p_result').style.display = 'block';
  document.getElementById('p_dl_btn').disabled = false;
  document.getElementById('p_result').scrollIntoView({ behavior: 'smooth', block: 'start' });

  reports.pom = `RAPPORT POM/POL (Annexe 4) — VisiPilot\nDate: ${new Date().toLocaleString('fr-FR')}\nQN: ${f(qn,2)}g | E: ${f(E)}g | σ₀: ${f(sigma)}g | n: ${n} | freq: ${freq}min\nms: ${f(ms)}g | QC: ${f(QC)}g (k=${f(k,3)}g)${signeE ? ' | signe e (U='+U+')' : ''}\nTest moyenne x̄−g·s ≥ QN : ${f(xbar)} − ${f(g,3)}×${f(s)} = ${f(test_val,4)}g → ${testOK?'CONFORME':'NON CONFORME'}\nPOl: ${POl} prélèv./h\n① m1=${f(m1,2)}g → POM=${fPOM(POM1)} (${eff1?'efficace':'insuffisant'})\n② m2=${f(m2,2)}g → POM=${fPOM(POM2)} (${eff2?'efficace':'insuffisant'})\n③ σ₁=${f(sigma1,2)}g → POM=${fPOM(POM3)} (${eff3?'efficace':'insuffisant'})\nRésultat global: ${overallOK?'CONFORME':'NON CONFORME'}\nRéf: Guide DGCCRF 2014 Annexe 4 | NF X06-031-1 | ISO 7870-2`;
}

function deriveStatsFromRaw() {
  const raw = document.getElementById('p_raw_values').value.trim();
  const nums = parseNumberList(raw);
  if (nums.length < 2) { alert('Saisissez au moins 2 mesures.'); return; }
  const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
  const std = Math.sqrt(nums.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (nums.length - 1));
  document.getElementById('p_xbar').value = mean.toFixed(4);
  document.getElementById('p_s').value = std.toFixed(4);
  document.getElementById('raw_count').textContent = String(nums.length);
  document.getElementById('raw_mean').textContent = f(mean, 4);
  document.getElementById('raw_std').textContent = f(std, 4);
}

function syncSigmaInputs(sourceId) {
  const value = document.getElementById(sourceId).value;
  const targetId = sourceId === 'c_sigma' ? 'p_sigma' : 'c_sigma';
  const target = document.getElementById(targetId);
  if (target && target.value !== value) target.value = value;
}

// ═══ CALCUL TARE ═══
/**
 * Analyse la variabilité des tares et détermine si la tare moyenne est autorisée.
 *
 * Règle réglementaire (Guide DGCCRF §VI.A + WELMEC 6.4) :
 *   — Tare MOYENNE autorisée  si : s_t ≤ E/5  (≤ 20% de l'EMTM)
 *   — Tare INDIVIDUELLE oblig. si : s_t  > E/5
 *
 * L'écart-type s_t est calculé sur un échantillon représentatif (≥ 20 emballages).
 */
function calcTare() {
  const qn = parseFloat(document.getElementById('t_qn').value);
  if (isNaN(qn) || qn <= 0) { alert('Saisissez une QN valide (> 0).'); return; }

  // Récupération des pesées : depuis le textarea manuel ou depuis l'import Excel (t_sigma)
  const rawText = (document.getElementById('t_weights')?.value || '').trim();
  let nums = [];

  if (rawText.length > 0) {
    // Saisie manuelle : valeurs séparées par retour ligne, espace ou ; — virgule décimale française gérée
    nums = parseNumberList(rawText);
  }

  // Fallback : σ importé depuis fichier Excel (handleFileUpload → t_sigma)
  const importedSigma = parseFloat(document.getElementById('t_sigma')?.value);
  const useImported = nums.length < 2 && !isNaN(importedSigma) && importedSigma > 0;

  let st, n_tare, t_mean;

  if (useImported) {
    // Mode import : on dispose de σ directement
    st = importedSigma;
    n_tare = null;
    t_mean = null;
  } else {
    if (nums.length < 2) {
      alert('Saisissez au moins 2 pesées de tares (ou importez un fichier Excel).');
      return;
    }
    n_tare = nums.length;
    t_mean = nums.reduce((a, b) => a + b, 0) / n_tare;
    st = Math.sqrt(nums.reduce((sum, x) => sum + Math.pow(x - t_mean, 2), 0) / (n_tare - 1));
  }

  // ── Calcul réglementaire ──────────────────────────────────────────────────
  const E      = computeEMTM(qn);           // EMTM selon Directive 76/211/CEE
  const seuil  = E / 5;                     // Seuil légal = E/5 (Guide §VI.A)
  const isOk   = st <= seuil;               // true → tare moyenne autorisée
  const ratio  = (st / E * 100).toFixed(1); // % de E

  // ── Interface : verdict ───────────────────────────────────────────────────
  setVerdict(
    't_verdict',
    isOk ? 'success' : 'danger',
    isOk ? 'Tare Moyenne AUTORISÉE' : 'Tare Individuelle OBLIGATOIRE',
    isOk
      ? `s_t = ${f(st, 3)} g ≤ E/5 = ${f(seuil, 3)} g (${ratio}% de l'EMTM). Variabilité emballage maîtrisée.`
      : `s_t = ${f(st, 3)} g > E/5 = ${f(seuil, 3)} g (${ratio}% de l'EMTM). Pesée individuelle obligatoire à chaque préemballage.`
  );

  // ── Construction du rapport détaillé ─────────────────────────────────────
  let html = `<div class="kpi-grid">
    <div class="kpi ${isOk ? 'kpi--ok' : 'kpi--danger'}"><div class="kpi__label">s_t tare</div><div class="kpi__value">${f(st, 3)}<span class="kpi__unit">g</span></div></div>
    <div class="kpi"><div class="kpi__label">Seuil E/5</div><div class="kpi__value">${f(seuil, 3)}<span class="kpi__unit">g</span></div></div>
    <div class="kpi"><div class="kpi__label">EMTM (E)</div><div class="kpi__value">${f(E, 3)}<span class="kpi__unit">g</span></div></div>
    <div class="kpi ${isOk ? 'kpi--ok' : 'kpi--danger'}"><div class="kpi__label">Résultat</div><div class="kpi__value">${isOk ? '✓' : '✗'}</div></div>
  </div>
  <table class="table">
    <tr style="background:var(--brand-50);color:var(--brand-600);font-weight:700;"><td colspan="2">Données produit</td></tr>
    <tr><td>Quantité Nominale QN</td><td>${f(qn, 2)} g</td></tr>
    <tr><td style="color:var(--brand-500);font-weight:700;">EMTM (E) — Dir. 76/211/CEE</td><td style="color:var(--brand-500);font-weight:700;">${f(E, 3)} g</td></tr>
    <tr style="background:var(--brand-50);color:var(--brand-600);font-weight:700;"><td colspan="2">Analyse des tares</td></tr>
    ${n_tare !== null ? `<tr><td>Nombre d'emballages pesés</td><td>${n_tare} ${n_tare < 20 ? '<span style="color:var(--warning-500);">⚠️ (recommandation : ≥ 20)</span>' : '✓'}</td></tr>` : '<tr><td>Source σ</td><td>Import Excel</td></tr>'}
    ${t_mean !== null ? `<tr><td>Tare moyenne</td><td>${f(t_mean, 3)} g</td></tr>` : ''}
    <tr><td style="color:var(--warning-500);font-weight:700;">Écart-type tares s_t</td><td style="color:var(--warning-500);font-weight:700;">${f(st, 3)} g (${ratio}% de E)</td></tr>
    <tr style="background:var(--brand-50);color:var(--brand-600);font-weight:700;"><td colspan="2">Règle réglementaire (Guide §VI.A)</td></tr>
    <tr><td>Seuil légal E/5</td><td>${f(seuil, 3)} g</td></tr>
    <tr><td style="color:var(--${isOk ? 'success' : 'danger'}-500);font-weight:700;">s_t ≤ E/5 ?</td><td style="color:var(--${isOk ? 'success' : 'danger'}-500);font-weight:700;">${f(st, 3)} g ${isOk ? '≤' : '>'} ${f(seuil, 3)} g → ${isOk ? 'OUI' : 'NON'}</td></tr>
  </table>
  ${buildCompareBar(st, seuil, 's_t (écart-type tares)', 'E/5 (seuil légal)')}
  <div class="alert alert--${isOk ? 'success' : 'danger'} mt-4">
    <strong>${isOk ? '✅ Tare Moyenne AUTORISÉE' : '❌ Tare Individuelle OBLIGATOIRE'}</strong><br>
    ${isOk
      ? `La variabilité des emballages est suffisamment faible. Vous pouvez utiliser une tare constante (tare moyenne arrondie par excès). Réévaluez à chaque changement de lot d'emballages.`
      : `L'emballage vide varie trop entre unités. La simple soustraction d'une tare fixe ne garantit plus le poids net. Chaque préemballage doit être taré individuellement avant remplissage (ou après vidage).`
    }
  </div>
  <div class="alert alert--info mt-3">
    <strong>Références :</strong> Guide DGCCRF §VI.A — WELMEC 6.4 — Décret 78-166 Art. 4<br>
    <strong>Fréquence de contrôle :</strong> Réévaluer la tare à chaque changement de lot d'emballages ou de format. Conserver les résultats 2 ans minimum (obligatoire avec signe 'e').
  </div>`;

  if (!isOk) {
    html += `<div class="alert alert--warning mt-3">
      <strong>💡 Alternatives :</strong> Trier les emballages par classe de poids (réduire s_t), ou traiter la variabilité avec votre fournisseur d'emballages. Si s_t reste &gt; E/5 après action corrective, la tare individuelle reste obligatoire.
    </div>`;
  }

  html += `<div class="conclusion conclusion--${isOk ? 'success' : 'danger'}">
    ${isOk
      ? `✅ s_t = ${f(st, 3)} g ≤ E/5 = ${f(seuil, 3)} g — Tare Moyenne AUTORISÉE`
      : `❌ s_t = ${f(st, 3)} g > E/5 = ${f(seuil, 3)} g — Tare Individuelle OBLIGATOIRE`
    }
  </div>`;

  const hdr = document.getElementById('t_result_hdr');
  hdr.className = `result__header result__header--${isOk ? 'success' : 'danger'}`;
  hdr.textContent = isOk ? '✅ Tare Moyenne AUTORISÉE' : '❌ Tare Individuelle OBLIGATOIRE';
  document.getElementById('t_result_body').innerHTML = html;
  document.getElementById('t_result').style.display = 'block';
  const dlBtn = document.getElementById('t_dl_btn');
  if (dlBtn) dlBtn.disabled = false;
  document.getElementById('t_result').scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Stockage rapport texte
  reports.tare = `RAPPORT GESTION DES TARES — VisiPilot\nDate: ${new Date().toLocaleString('fr-FR')}\nQN: ${f(qn,2)} g | EMTM (E): ${f(E,3)} g\nSeuil légal E/5: ${f(seuil,3)} g\n${n_tare !== null ? 'N pesées: ' + n_tare + '\nTare moyenne: ' + f(t_mean,3) + ' g\n' : ''}Écart-type s_t: ${f(st,3)} g (${ratio}% de E)\nRègle s_t ≤ E/5: ${isOk ? 'OUI — Tare Moyenne AUTORISÉE' : 'NON — Tare Individuelle OBLIGATOIRE'}\nRéf: Guide DGCCRF §VI.A | WELMEC 6.4`;
}


// ═══ DOWNLOAD ═══
function downloadReport(type) {
  const content = reports[type];
  if (!content) return;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `visipilot_${type}_${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}


// ═══ MODALS ═══
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('modal-overlay--active'); document.body.style.overflow = 'hidden'; }
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('modal-overlay--active'); document.body.style.overflow = ''; }
}

function resetAll() { if (confirm('Réinitialiser ?')) window.location.reload(); }

document.querySelectorAll('.modal-overlay').forEach(ov => {
  ov.addEventListener('click', e => { if (e.target === ov) { ov.classList.remove('modal-overlay--active'); document.body.style.overflow = ''; } });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay--active').forEach(m => m.classList.remove('modal-overlay--active'));
    document.body.style.overflow = '';
  }
});


// ═══ THEME TOGGLE ═══
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('vp-theme', next);
  document.querySelector('.theme-toggle').innerHTML = next === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

// Restore saved theme
(function() {
  const saved = localStorage.getItem('vp-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.innerHTML = saved === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  }
})();


// ═══ INIT ═══
document.addEventListener('DOMContentLoaded', () => {
  onTypeChange();
  
  const cSigneE = document.getElementById('c_signe_e');
  if (cSigneE) {
    cSigneE.addEventListener('change', function() {
      const wrap = document.getElementById('c_lot_wrap');
      if (wrap) wrap.classList.toggle('hidden', this.value !== 'oui');
    });
  }
  
  const cSigma = document.getElementById('c_sigma');
  if (cSigma) cSigma.addEventListener('input', () => syncSigmaInputs('c_sigma'));
  
  const pSigma = document.getElementById('p_sigma');
  if (pSigma) pSigma.addEventListener('input', () => syncSigmaInputs('p_sigma'));
  
  renderGTable();
  renderTips();
  initSidebarToggle();
});

// ═══ SIDEBAR TOGGLE ═══
function toggleSidebar(btn) {
  const panel = btn.closest('.panel--split');
  const sidebar = panel.querySelector('.app__sidebar');
  const collapsed = sidebar.classList.toggle('is-collapsed');
  btn.classList.toggle('is-collapsed', collapsed);
  try { localStorage.setItem('vp_sidebar_open', !collapsed); } catch(e) {}
}

function initSidebarToggle() {
  const open = localStorage.getItem('vp_sidebar_open') !== 'false';
  if (!open) {
    document.querySelectorAll('.panel--split').forEach(panel => {
      panel.querySelector('.app__sidebar')?.classList.add('is-collapsed');
      panel.querySelector('.sidebar-toggle-strip')?.classList.add('is-collapsed');
    });
  }
}
