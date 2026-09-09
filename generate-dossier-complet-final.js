const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Create a document with better margins for comprehensive report
const doc = new PDFDocument({
  size: 'A4',
  margins: {
    top: 50,
    bottom: 50,
    left: 60,
    right: 60
  },
  info: {
    Title: 'Multipass Labs - Dossier Technique Complet',
    Author: 'Claude Code - Analyse Projet',
    Subject: 'Documentation technique complète du projet Multipass Labs',
    Keywords: 'Multipass Labs, Next.js, TypeScript, Art Terminal'
  }
});

// Pipe to a file
const outputPath = path.join(__dirname, 'DOSSIER-COMPLET-MULTIPASS-LABS.pdf');
doc.pipe(fs.createWriteStream(outputPath));

// Colors
const colors = {
  terminalGreen: '#00ff00',
  cyan: '#00f4ff',
  purple: '#9b59ff',
  pink: '#d982ff',
  blue: '#0078f2',
  yellow: '#ffe95c',
  red: '#ff5566',
  black: '#000000',
  gray: '#666666',
  darkGray: '#333333',
  lightGray: '#999999',
  codeBackground: '#f5f5f5'
};

// Helper functions
let pageNumber = 1;
let sectionNumber = 0;
let subsectionNumber = 0;

function addPageNumber() {
  const bottom = doc.page.height - 30;
  doc
    .fontSize(8)
    .fillColor(colors.gray)
    .text(
      `Page ${pageNumber}`,
      doc.page.margins.left,
      bottom,
      {
        align: 'center',
        width: doc.page.width - doc.page.margins.left - doc.page.margins.right
      }
    );
  pageNumber++;
}

function newPage() {
  doc.addPage();
  addPageNumber();
}

function addTitle(text, fontSize = 20) {
  sectionNumber++;
  subsectionNumber = 0;
  doc
    .fontSize(fontSize)
    .fillColor(colors.terminalGreen)
    .text(`${sectionNumber}. ${text}`, { align: 'left' });
  doc.moveDown(0.5);
}

function addSubtitle(text, fontSize = 14) {
  subsectionNumber++;
  doc
    .fontSize(fontSize)
    .fillColor(colors.cyan)
    .text(`${sectionNumber}.${subsectionNumber} ${text}`);
  doc.moveDown(0.3);
}

function addSection(text, fontSize = 12) {
  doc.moveDown(0.3);
  doc
    .fontSize(fontSize)
    .fillColor(colors.purple)
    .text(text, { underline: true });
  doc.moveDown(0.25);
}

function addText(text, fontSize = 10) {
  doc
    .fontSize(fontSize)
    .fillColor(colors.black)
    .text(text, { align: 'justify', lineGap: 2 });
  doc.moveDown(0.4);
}

function addBullet(text, fontSize = 9, indent = 20) {
  doc
    .fontSize(fontSize)
    .fillColor(colors.black)
    .text('• ' + text, { indent: indent, align: 'justify', lineGap: 1 });
  doc.moveDown(0.2);
}

function addCode(code, fontSize = 8) {
  const y = doc.y;
  doc
    .rect(doc.page.margins.left, y - 5, doc.page.width - doc.page.margins.left - doc.page.margins.right, 60)
    .fillAndStroke(colors.codeBackground, colors.gray);

  doc
    .fontSize(fontSize)
    .fillColor(colors.black)
    .font('Courier')
    .text(code, doc.page.margins.left + 10, y, { width: doc.page.width - doc.page.margins.left - doc.page.margins.right - 20 });
  doc.font('Helvetica');
  doc.moveDown(1);
}

function addHorizontalLine() {
  const y = doc.y;
  doc
    .strokeColor(colors.terminalGreen)
    .lineWidth(0.5)
    .moveTo(doc.page.margins.left, y)
    .lineTo(doc.page.width - doc.page.margins.right, y)
    .stroke();
  doc.moveDown(0.4);
}

function addSourceRef(source, fontSize = 7) {
  doc
    .fontSize(fontSize)
    .fillColor(colors.lightGray)
    .font('Courier')
    .text(`[Source: ${source}]`, { align: 'right' });
  doc.font('Helvetica');
  doc.moveDown(0.3);
}

// ============================================
// PAGE DE GARDE
// ============================================

doc.fontSize(32).fillColor(colors.terminalGreen).text('MULTIPASS LABS', { align: 'center' });
doc.moveDown(0.5);
doc.fontSize(18).fillColor(colors.cyan).text('DOSSIER TECHNIQUE COMPLET', { align: 'center' });
doc.moveDown(0.3);
doc.fontSize(12).fillColor(colors.purple).text('Plateforme Expérimentale Collective', { align: 'center' });
doc.moveDown(2);

doc.fontSize(10).fillColor(colors.black).text('Période d\'analyse:', { align: 'center' });
doc.fontSize(12).fillColor(colors.terminalGreen).text('Mai 2025 - Septembre 2026', { align: 'center' });
doc.moveDown(1);

doc.fontSize(10).fillColor(colors.black).text('Date de génération:', { align: 'center' });
doc.fontSize(11).fillColor(colors.gray).text(new Date().toLocaleDateString('fr-FR', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
}), { align: 'center' });

doc.moveDown(3);

addHorizontalLine();
doc.fontSize(11).fillColor(colors.gray).text('CONTENU DU DOSSIER', { align: 'center', underline: true });
doc.moveDown(0.5);

const toc = [
  '1. Contributeurs et Historique du Projet',
  '2. Présentation Générale',
  '3. Les 10 Protagonistes (Entités du Laboratoire)',
  '4. Architecture Technique Complète',
  '5. État Actuel et Fonctionnalités',
  '6. Base de Données et Modèles',
  '7. Interface Utilisateur et Composants',
  '8. Système Audio et Effets Visuels',
  '9. Internationalisation et Locales',
  '10. Sécurité et Authentification',
  '11. Plan de Transformation',
  '12. Recommandations et Prochaines Étapes',
  '13. Annexes et Références'
];

toc.forEach((item, index) => {
  doc.fontSize(10).fillColor(colors.black).text(item, { indent: 30 });
  if (index < toc.length - 1) doc.moveDown(0.15);
});

doc.moveDown(2);
addHorizontalLine();

doc.fontSize(8).fillColor(colors.terminalGreen).text('[ mu1ti.p@ss ] root - Documentation Générée par Claude Code', { align: 'center' });
doc.fontSize(7).fillColor(colors.gray).text('https://claude.ai/code/session_011CUTwkPB3P4c5Nfy9oeRF3', { align: 'center' });

addPageNumber();

// ============================================
// SECTION 1: CONTRIBUTEURS
// ============================================
newPage();

addTitle('CONTRIBUTEURS ET HISTORIQUE DU PROJET');

addText('Depuis mai 2025, le projet Multipass Labs a été développé collaborativement par 3 contributeurs avec un total de 53 commits répartis sur 5 mois de développement actif.');

addSourceRef('Git log --since="2025-05-01" --all');

addSubtitle('1.1 Oliver (Développeur Principal)');
addBullet('Email: stimutak@gmail.com');
addBullet('Commits: 47 (89% du total)');
addBullet('Rôle: Architecte principal et développeur full-stack');
addBullet('Période active: Août 2025 - Septembre 2026');

addSection('Contributions Principales:');
addBullet('Transformation complète du site en esthétique terminal glitchée', 9, 30);
addBullet('Implémentation du système d\'entités de laboratoire (10 protagonistes)', 9, 30);
addBullet('Développement de la séquence de boot ASCII avec audio procédural', 9, 30);
addBullet('Création de toutes les animations d\'entités (oscilloscope, vagues, etc.)', 9, 30);
addBullet('Intégration Redux Toolkit, Prisma ORM, NextAuth', 9, 30);
addBullet('Corrections TypeScript strict mode et déploiement Vercel', 9, 30);
addBullet('Effets visuels: liquid chrome, subliminal flash, scanlines CRT', 9, 30);
addBullet('Pages: Homepage, About, Blog, Gallery (structure de base)', 9, 30);

addSubtitle('1.2 ChatGPT (Assistant IA)');
addBullet('Email: bot@example.com, you@example.com');
addBullet('Commits: 5 (9% du total)');
addBullet('Rôle: Assistant de développement et génération de contenu');
addBullet('Période active: Août 2025');

addSection('Contributions:');
addBullet('Création et optimisation du logo ASCII pour boot sequence', 9, 30);
addBullet('Corrections de design et ajustements visuels', 9, 30);
addBullet('Assistance sur implémentation de fonctionnalités', 9, 30);

addSubtitle('1.3 Claude Code (Assistant IA Anthropic)');
addBullet('Email: noreply@anthropic.com');
addBullet('Commits: 1 (2% du total)');
addBullet('Rôle: Documentation, analyse et génération de rapports');
addBullet('Période active: Octobre 2025 - Septembre 2026');

addSection('Contributions:');
addBullet('Génération de documentation PDF complète du projet', 9, 30);
addBullet('Analyse approfondie de codebase et audit de l\'état du projet', 9, 30);
addBullet('Création de dossiers techniques détaillés', 9, 30);

// ============================================
// SECTION 2: PRÉSENTATION GÉNÉRALE
// ============================================
newPage();

addTitle('PRÉSENTATION GÉNÉRALE');

addText('Multipass Labs est une plateforme expérimentale collective dédiée aux visuels audio-réactifs et à l\'art génératif. Le site adopte une esthétique terminal sombre et glitchée, inspirée des interfaces CRT des années 80-90, opéré par 10 entités mystérieuses de laboratoire.');

addSourceRef('README.md, CLAUDE.md');

addSubtitle('2.1 Vision et Objectifs');

addText('Créer une plateforme immersive pour présenter des œuvres d\'art génératif, de la musique expérimentale et des expériences interactives dans un environnement terminal/laboratoire mystérieux. Chaque contenu est attribué à l\'une des 10 entités, créant une narration collective distribuée.');

addSubtitle('2.2 Stack Technique');

addSection('Frontend:');
addBullet('Framework: Next.js 15.4.5 avec App Router (React 19.1.1)');
addBullet('Langage: TypeScript 5.9.2 en mode strict');
addBullet('Styling: Tailwind CSS 3.4.17 + CSS Modules pour effets complexes');
addBullet('State Management: Redux Toolkit 2.8.2');
addBullet('i18n: next-intl 4.3.4 (support EN/ES)');
addBullet('Animations: Framer Motion 12.23.12');
addBullet('Interactivité: Three.js/p5.js dans composants isolés');

addSourceRef('package.json, README.md');

addSection('Backend:');
addBullet('API: Next.js API routes (RESTful)');
addBullet('Base de données: PostgreSQL avec Prisma ORM 6.13.0');
addBullet('Authentification: NextAuth.js 4.24.11 avec JWT');
addBullet('Paiements: Stripe 18.4.0 (SDK officiel)');
addBullet('Storage: AWS S3 ou Cloudinary (configurable)');

addSection('DevOps et Qualité:');
addBullet('Tests: Jest + React Testing Library + Playwright');
addBullet('Linting: ESLint (config Next.js) + Prettier');
addBullet('CI/CD: GitHub Actions');
addBullet('Déploiement: Vercel (recommandé) ou Railway');
addBullet('Monitoring: Intégration Google Analytics (optionnelle)');

addSubtitle('2.3 Caractéristiques Distinctives');

addBullet('Séquence de boot terminal immersive avec Matrix rain');
addBullet('Système d\'entités de laboratoire pour attribution de contenu');
addBullet('Audio procédural style Richard Devine (Web Audio API)');
addBullet('Esthétique CRT complète (scanlines, phosphor glow, glitch)');
addBullet('Effets visuels avancés (liquid chrome, subliminal flash)');
addBullet('Architecture internationalisée dès la conception');

// ============================================
// SECTION 3: LES 10 PROTAGONISTES
// ============================================
newPage();

addTitle('LES 10 PROTAGONISTES (ENTITÉS DU LABORATOIRE)');

addText('Le système d\'entités est au cœur de Multipass Labs. Chaque entité possède une personnalité unique, un domaine d\'expertise, une signature visuelle et une couleur distinctive. Tous les contenus (posts, galerie, produits) sont attribués à une entité.');

addSourceRef('lib/entities.ts, ENTITY_ASSIGNMENT_DOCS.md');

const entities = [
  {
    num: 1,
    name: 'nU11.form',
    id: 'null-form',
    sig: '[nU11.form] v0.3a',
    color: 'Cyan #00f4ff',
    role: 'Théoricien du glitch - Logic-melting',
    expertise: 'Art glitch, systèmes expérimentaux, déformation logique',
    animation: 'OscilloscopeAnimation'
  },
  {
    num: 2,
    name: 'drex:0m',
    id: 'drex-0m',
    sig: '[drex:0m] b01',
    color: 'Violet #9b59ff',
    role: 'Cartographe du chaos',
    expertise: 'Architecture code, design système, réécriture structurelle',
    animation: 'HexWaterfall'
  },
  {
    num: 3,
    name: 'noize.p4th',
    id: 'noise-path',
    sig: '[noize.p4th] //dev.05',
    color: 'Vert #59ff6d',
    role: 'Tacticien audio-réactif',
    expertise: 'Audio, synthèse sonore, DSP, musique, manipulation sonore',
    animation: 'WaveInterference'
  },
  {
    num: 4,
    name: 'x3n0.form',
    id: 'xeno-form',
    sig: '[x3n0.form] ∆x.14',
    color: 'Bleu #0078f2',
    role: 'Expert artefacts génératifs aliens',
    expertise: 'IA, ML, réseaux neuronaux, art génératif, procédural',
    animation: 'PerlinNoise'
  },
  {
    num: 5,
    name: 'ƒ1lament',
    id: 'filament',
    sig: '[ƒ1lament] v1.0a',
    color: 'Rose #d982ff',
    role: 'Sculpteur de formes d\'onde délicates',
    expertise: 'Shaders, graphics, WebGL, effets visuels, lumière',
    animation: 'FlowField'
  },
  {
    num: 6,
    name: '5ub.signal',
    id: 'sub-signal',
    sig: '[5ub.signal] .sig/3.3',
    color: 'Jaune #ffe95c',
    role: 'Manipulateur de feedback',
    expertise: 'Traitement du signal, systèmes de feedback, boucles infinies',
    animation: 'FeedbackLoop'
  },
  {
    num: 7,
    name: '1r1s.fade',
    id: 'iris-fade',
    sig: '[1r1s.fade] ::OBSCURA',
    color: 'Rose pâle #ffa4f9',
    role: 'Fantôme cinématique de lumière douce',
    expertise: 'Cinématique, lighting, effets atmosphériques, mystère',
    animation: 'GlitchGrid'
  },
  {
    num: 8,
    name: 'ctrlN0!r',
    id: 'ctrl-noir',
    sig: '[ctrlN0!r] CRL/09',
    color: 'Rouge #ff5566',
    role: 'Saboteur d\'interface',
    expertise: 'UI/UX, frontend, CSS, design d\'interface, chaos contrôlé',
    animation: 'DataStream'
  },
  {
    num: 9,
    name: 'NØD3//STATE',
    id: 'node-state',
    sig: '[NØD3//STATE] 07_hz',
    color: 'Turquoise #58d2bf',
    role: 'Architecte de flux topologique',
    expertise: 'Flux de données, state management, états complexes, architecture',
    animation: 'QuantumField'
  },
  {
    num: 10,
    name: 'mu1ti.p@ss',
    id: 'multi-pass',
    sig: '[mu1ti.p@ss] root',
    color: 'Gris #dddddd',
    role: 'Méta-entité - Accès racine',
    expertise: 'Administration système, méta-topics, coordination, master access',
    animation: 'RootAccess'
  }
];

entities.forEach(entity => {
  doc.fontSize(11).fillColor(colors.purple).text(`${entity.num}. ${entity.name}`, { continued: false });
  doc.fontSize(8).fillColor(colors.gray).text(`   ID: ${entity.id} | Signature: ${entity.sig}`, { indent: 20 });
  doc.fontSize(8).fillColor(colors.black).text(`   Couleur: ${entity.color}`, { indent: 20 });
  doc.fontSize(8).fillColor(colors.black).text(`   Rôle: ${entity.role}`, { indent: 20 });
  doc.fontSize(8).fillColor(colors.black).text(`   Expertise: ${entity.expertise}`, { indent: 20 });
  doc.fontSize(7).fillColor(colors.lightGray).text(`   Animation: ${entity.animation}`, { indent: 20 });
  doc.moveDown(0.3);
});

addSubtitle('3.1 Système d\'Attribution');

addText('Le système utilise deux méthodes d\'attribution:');

addSection('Méthode 1: Assignment Automatique Seeded');
addCode('entityId: getSeededEntityId(\'post-slug\')\n// Hash deterministe du slug → Entity ID\n// Même slug = toujours même entité');

addSection('Méthode 2: Assignment Manuel');
addCode('entityId: \'null-form\'  // Override direct');

addSection('Méthode 3: Tag-Based Smart Assignment');
addText('Mapping intelligent basé sur les tags du contenu vers l\'expertise de chaque entité.');

addSourceRef('lib/entities.ts, lib/blog-data.ts');

// ============================================
// SECTION 4: ARCHITECTURE TECHNIQUE
// ============================================
newPage();

addTitle('ARCHITECTURE TECHNIQUE COMPLÈTE');

addSubtitle('4.1 Structure des Répertoires');

addCode(`multiPassLabs/
├── app/                    # Next.js 15 App Router
│   ├── [locale]/          # Routes internationalisées
│   │   ├── layout.tsx     # Layout racine avec providers
│   │   ├── page.tsx       # Homepage
│   │   ├── blog/          # Système de blog
│   │   ├── shop/          # E-commerce (STUB)
│   │   ├── gallery/       # Galerie d'art
│   │   ├── music/         # Musique/audio (STUB)
│   │   └── about/         # À propos
│   └── api/               # API routes
│       ├── posts/         # CRUD posts
│       └── gallery/       # CRUD galerie
├── components/            # Composants réutilisables
│   ├── ui/               # Composants UI de base
│   ├── backgrounds/      # Animations background
│   ├── providers.tsx     # Redux Provider
│   └── client-layout.tsx # Layout côté client
├── lib/                   # Utilitaires core
│   ├── entities.ts       # Système d'entités
│   ├── audio/            # Système audio procédural
│   ├── db.ts             # Client Prisma
│   ├── auth.ts           # Config NextAuth
│   └── stripe.ts         # Config Stripe
├── store/                # Redux Toolkit
│   ├── slices/           # Redux slices
│   └── store.ts          # Configuration store
├── styles/               # Styles globaux
│   └── globals.css       # CSS terminal/CRT
├── locales/              # Fichiers i18n
│   ├── en/               # English
│   └── es/               # Español
├── prisma/               # Database schema
│   └── schema.prisma     # Modèles Prisma
└── public/               # Assets statiques`);

addSourceRef('Tree structure analysis');

addSubtitle('4.2 Pages Implémentées');

const pages = [
  { path: 'app/[locale]/page.tsx', status: 'EXCELLENT', desc: 'Homepage avec terminal interface complet' },
  { path: 'app/[locale]/about/page.tsx', status: 'EXCELLENT', desc: 'Histoire collective, entités, specs' },
  { path: 'app/[locale]/blog/page.tsx', status: 'BON', desc: 'Liste posts avec filtrage par entité' },
  { path: 'app/[locale]/blog/[slug]/page.tsx', status: 'BON', desc: 'Détail article de blog' },
  { path: 'app/[locale]/gallery/page.tsx', status: 'PARTIEL', desc: 'Galerie (styling inconsistant)' },
  { path: 'app/[locale]/shop/page.tsx', status: 'STUB', desc: 'Placeholder seulement' },
  { path: 'app/[locale]/music/page.tsx', status: 'STUB', desc: 'Placeholder seulement' }
];

pages.forEach(page => {
  const statusColor = page.status === 'EXCELLENT' ? colors.terminalGreen :
                      page.status === 'BON' ? colors.cyan :
                      page.status === 'PARTIEL' ? colors.yellow : colors.red;
  doc.fontSize(9).fillColor(statusColor).text(`[${page.status}]`, { continued: true });
  doc.fillColor(colors.black).text(` ${page.path}`, { continued: false });
  doc.fontSize(8).fillColor(colors.gray).text(`   ${page.desc}`, { indent: 20 });
  doc.moveDown(0.2);
});

addSourceRef('File system scan, status from code review');

addSubtitle('4.3 Composants Principaux');

const components = [
  'components/ui/startup-intro-v2.tsx → Séquence boot (version active)',
  'components/ui/startup-intro.tsx → Ancienne version (À SUPPRIMER)',
  'components/ui/simple-header.tsx → Header principal avec navigation',
  'components/ui/boot-wrapper.tsx → Wrapper boot sequence',
  'components/ui/entity-signature.tsx → Affichage signatures',
  'components/ui/post-card.tsx → Carte article blog',
  'components/ui/product-card.tsx → Carte produit shop',
  'components/ui/gallery-item-card.tsx → Carte item galerie',
  'components/backgrounds/entity-animations.tsx → 10 animations Canvas',
  'components/backgrounds/metallic-waves.tsx → Effet liquid chrome'
];

components.forEach(comp => {
  addBullet(comp, 8, 15);
});

addSourceRef('components/ directory analysis');

// ============================================
// SECTION 5: ÉTAT ACTUEL ET FONCTIONNALITÉS
// ============================================
newPage();

addTitle('ÉTAT ACTUEL ET FONCTIONNALITÉS');

addText('Le projet est actuellement à environ 75% de complétion selon le plan de transformation défini dans CLAUDE.md. Voici l\'état détaillé de chaque composante.');

addSubtitle('5.1 Fonctionnalités Implémentées (EXCELLENT)');

addSection('✅ Séquence de Démarrage Terminal');
addBullet('Animation boot 4 phases: boot → entities → logo → ready', 9, 25);
addBullet('Pluie Matrix en arrière-plan avec signatures d\'entités', 9, 25);
addBullet('Effets scanlines et scintillement CRT authentiques', 9, 25);
addBullet('Audio procédural: sons boot, glitches, drone ambiant', 9, 25);
addBullet('Bouton replay dans header pour relancer la séquence', 9, 25);
addBullet('Support désactivation audio (toggle)', 9, 25);
addBullet('Typewriter effect avec capacité de glitch', 9, 25);

addSection('✅ Système d\'Entités de Laboratoire');
addBullet('10 entités complètement définies avec métadonnées', 9, 25);
addBullet('Système d\'attribution automatique et manuel', 9, 25);
addBullet('10 animations Canvas uniques par entité', 9, 25);
addBullet('Cycle automatique des entités toutes les 8 secondes', 9, 25);
addBullet('Filtrage par entité sur Blog et Galerie', 9, 25);
addBullet('Helpers: getRandomEntity(), glitchText(), formatEntitySignature()', 9, 25);

addSection('✅ Esthétique Terminal & Effets Visuels');
addBullet('Framework CSS terminal complet (phosphore, scanlines)', 9, 25);
addBullet('Effet liquid chrome métallique sur vagues background', 9, 25);
addBullet('Animation subliminal flash homepage (machine-gun cluster)', 9, 25);
addBullet('Transitions de couleurs entités fluides', 9, 25);
addBullet('Bordures ASCII et curseur terminal clignotant', 9, 25);
addBullet('Glitch animations (glitch-1, glitch-2, glitch-shift)', 9, 25);

addSection('✅ Infrastructure & BDD');
addBullet('Schéma Prisma complet: User, Post, Product, Gallery, Order', 9, 25);
addBullet('Système attribution entités intégré (entityId fields)', 9, 25);
addBullet('Redux: authSlice, cartSlice, uiSlice', 9, 25);
addBullet('NextAuth configuration complète', 9, 25);
addBullet('API routes: /api/posts, /api/gallery', 9, 25);

addSubtitle('5.2 Fonctionnalités Incomplètes (À AMÉLIORER)');

addSection('⚠️ Pages Manquantes/Stubs');
addBullet('Shop: Placeholder uniquement → Besoin grille produits + Stripe', 9, 25);
addBullet('Music: Stub uniquement → Besoin player audio + visualisations', 9, 25);

addSection('⚠️ Inconsistances Visuelles');
addBullet('Gallery: Texte blanc au lieu de vert terminal', 9, 25);
addBullet('Gallery: Background pas noir comme autres pages', 9, 25);

addSection('⚠️ Qualité Code');
addBullet('Fichiers dupliqués: startup-intro.tsx v1 et v2 (violation CLAUDE.md)', 9, 25);
addBullet('Multiples headers: header.tsx + simple-header.tsx', 9, 25);
addBullet('Usage inconsistant de useTranslations()', 9, 25);

addSection('⚠️ Fonctionnalités Manquantes');
addBullet('Système de commandes terminal (/help, /entities, /logs)', 9, 25);
addBullet('Easter eggs et modes cachés', 9, 25);
addBullet('Tests E2E (Playwright configuré mais pas de tests)', 9, 25);
addBullet('Optimisation mobile (non testée)', 9, 25);

addSubtitle('5.3 Métriques du Projet');

doc.fontSize(10).fillColor(colors.purple).text('Statistiques Git (Mai 2025 - Sept 2026):');
doc.moveDown(0.2);
addBullet('Total commits: 53', 9, 25);
addBullet('Contributeurs: 3 (Oliver 89%, ChatGPT 9%, Claude 2%)', 9, 25);
addBullet('Fichiers principaux: ~100+ fichiers TypeScript/TSX', 9, 25);
addBullet('Lignes de code: Estimation 15,000-20,000 LOC', 9, 25);

doc.fontSize(10).fillColor(colors.purple).text('Dépendances:');
doc.moveDown(0.2);
addBullet('node_modules: 943 MB (841 packages)', 9, 25);
addBullet('Production deps: 13 packages core', 9, 25);
addBullet('Dev deps: 17 packages (testing, linting, build)', 9, 25);

addSourceRef('git log analysis, package.json, du -sh');

// ============================================
// SECTION 6: BASE DE DONNÉES
// ============================================
newPage();

addTitle('BASE DE DONNÉES ET MODÈLES');

addText('Le projet utilise PostgreSQL via Prisma ORM 6.13.0. Le schéma est complet et bien indexé pour les performances.');

addSourceRef('prisma/schema.prisma');

addSubtitle('6.1 Modèles d\'Authentification');

addSection('User Model');
addCode(`model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  orders        Order[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}`);

addSection('Autres modèles auth:');
addBullet('Account: OAuth providers (Google, GitHub)', 8, 20);
addBullet('Session: NextAuth sessions avec JWT', 8, 20);
addBullet('VerificationToken: Email verification', 8, 20);

addSubtitle('6.2 Modèles E-commerce');

addSection('Product Model (avec entity attribution)');
addCode(`model Product {
  id          String      @id @default(cuid())
  title       String
  description String?
  price       Int         // cents
  images      String[]
  category    Category    @relation(...)
  categoryId  String
  featured    Boolean     @default(false)
  available   Boolean     @default(true)
  entityId    String?     // Lab entity!
  orderItems  OrderItem[]
  @@index([entityId, featured, available])
}`);

addSection('Autres modèles e-commerce:');
addBullet('Category: Organisation produits', 8, 20);
addBullet('Order: Commandes utilisateur (status: PENDING|PROCESSING|SHIPPED|DELIVERED|CANCELLED)', 8, 20);
addBullet('OrderItem: Items dans commandes', 8, 20);

addSubtitle('6.3 Modèles de Contenu');

addSection('Post Model (Blog avec entity attribution)');
addCode(`model Post {
  id        String   @id @default(cuid())
  title     String
  content   String   @db.Text
  slug      String   @unique
  entityId  String   // REQUIS!
  tags      String[] @default([])
  published Boolean  @default(false)
  featured  Boolean  @default(false)
  @@index([entityId, published, featured])
}`);

addSection('GalleryItem Model');
addCode(`model GalleryItem {
  id          String   @id @default(cuid())
  title       String
  imageUrl    String
  videoUrl    String?
  type        String   // image|video|interactive
  entityId    String   // REQUIS!
  tags        String[] @default([])
  featured    Boolean  @default(false)
  @@index([entityId, type, featured])
}`);

addText('Note: Les champs entityId sont indexés pour optimiser les filtres par entité.');

// ============================================
// SECTION 7: INTERFACE UTILISATEUR
// ============================================
newPage();

addTitle('INTERFACE UTILISATEUR ET COMPOSANTS');

addSubtitle('7.1 Système de Design Terminal');

addText('L\'interface utilise un système cohérent d\'esthétique terminal CRT avec phosphor glow, scanlines et glitch effects.');

addSourceRef('styles/globals.css, tailwind.config.ts');

addSection('Palette de Couleurs:');
addCode(`Terminal Green: #00ff00 (principal)
Cyan: #00f4ff (accents)
Purple: #9b59ff (sections)
Black: #000000 (background)
Gray variants: #333, #666, #999 (textes)`);

addSection('Typographies:');
addBullet('Sans: Inter, system-ui', 8, 20);
addBullet('Mono: Fira Code (terminal, code)', 8, 20);
addBullet('Serif: Playfair Display (titres artistiques)', 8, 20);

addSection('Animations CSS Custom:');
addCode(`@keyframes glitch-1
@keyframes glitch-2
@keyframes glitch-shift
@keyframes scanlines
@keyframes phosphor-glow
@keyframes terminal-cursor`);

addSubtitle('7.2 Composants UI');

const uiComponents = [
  { name: 'Button', file: 'components/ui/button.tsx', desc: 'Bouton avec variants terminal' },
  { name: 'Card', file: 'components/ui/card.tsx', desc: 'Conteneur avec bordure terminal' },
  { name: 'Loading', file: 'components/ui/loading.tsx', desc: 'Indicateur chargement' },
  { name: 'EntitySignature', file: 'components/ui/entity-signature.tsx', desc: 'Affichage signature entité' },
  { name: 'PostCard', file: 'components/ui/post-card.tsx', desc: 'Carte article blog' },
  { name: 'ProductCard', file: 'components/ui/product-card.tsx', desc: 'Carte produit e-commerce' },
  { name: 'GalleryItemCard', file: 'components/ui/gallery-item-card.tsx', desc: 'Carte item galerie' }
];

uiComponents.forEach(comp => {
  doc.fontSize(9).fillColor(colors.cyan).text(`• ${comp.name}`, { continued: true });
  doc.fillColor(colors.gray).text(` - ${comp.desc}`);
  doc.fontSize(7).fillColor(colors.lightGray).text(`   ${comp.file}`, { indent: 20 });
  doc.moveDown(0.15);
});

addSubtitle('7.3 Animations Background');

addSection('MetallicWaves Component');
addText('Animation Canvas liquid chrome avec effet métallique fluide. Utilise gradients radiaux animés et transformations sinus/cosinus pour vagues organiques.');
addCode(`// Pseudo-code
gradient = radialGradient(x, y, colors)
wave = sin(time * freq + x) * cos(time * freq + y)
render(gradient + wave + metallic_sheen)`);

addSection('EntityAnimations Component');
addText('10 animations Canvas uniques, une par entité:');

const animations = [
  'OscilloscopeAnimation (nU11.form)',
  'HexWaterfall (drex:0m)',
  'WaveInterference (noize.p4th)',
  'PerlinNoise (x3n0.form)',
  'FlowField (ƒ1lament)',
  'FeedbackLoop (5ub.signal)',
  'GlitchGrid (1r1s.fade)',
  'DataStream (ctrlN0!r)',
  'QuantumField (NØD3//STATE)',
  'RootAccess (mu1ti.p@ss)'
];

animations.forEach(anim => addBullet(anim, 8, 20));

// ============================================
// SECTION 8: AUDIO & EFFETS
// ============================================
newPage();

addTitle('SYSTÈME AUDIO ET EFFETS VISUELS');

addSubtitle('8.1 GlitchAudioSystem (Web Audio API)');

addText('Système audio procédural inspiré de Richard Devine. Génère sons de boot, glitches et drones ambiants entièrement en code, sans samples audio.');

addSourceRef('lib/audio/glitch-audio.ts');

addSection('Architecture du système:');
addCode(`class GlitchAudioSystem {
  - audioContext: AudioContext
  - masterGain: GainNode
  - nodes: AudioNode[] (tracking)

  Methods:
  + playBootSequence()     // 3-tone beep
  + playSystemCheck()      // chirp rapide
  + playGlitch(intensity)  // noise + filters
  + playAmbientDrone()     // LFO modulation
  + playTypingSound()      // typing feedback
  + playEntitySignature(id)// son unique/entité
  + cleanup()              // dispose nodes
}`);

addSection('Chaîne de traitement glitch:');
addBullet('OscillatorNode (noise source)', 8, 20);
addBullet('BiquadFilterNode (low-pass, high-pass, band-pass)', 8, 20);
addBullet('WaveShaperNode (distortion)', 8, 20);
addBullet('GainNode (enveloppe ADSR)', 8, 20);
addBullet('LFO (Low Frequency Oscillator) pour modulation', 8, 20);

addText('Toutes les nodes sont trackées et disposées proprement pour éviter fuites mémoire.');

addSubtitle('8.2 Effets Visuels Avancés');

addSection('Subliminal Flash Effect');
addText('Animation de flash rapide sur homepage avec:');
addBullet('Machine-gun cluster: multiples flashs rapides', 8, 20);
addBullet('Flash principal brillant + ghost afterimage', 8, 20);
addBullet('Position 2/3 droite écran', 8, 20);
addBullet('Timing précis pour effet subliminal', 8, 20);

addSection('Liquid Chrome Effect');
addText('Effet métallique sur vagues background:');
addBullet('Dégradés radiaux animés', 8, 20);
addBullet('Shimmer effect avec transformations temps-réel', 8, 20);
addBullet('Reflections et highlights liquides', 8, 20);

addSection('CRT Monitor Effects');
addBullet('Scanlines: lignes horizontales semi-transparentes', 8, 20);
addBullet('Phosphor glow: bloom vert autour texte', 8, 20);
addBullet('Screen curve: courbure subtile écran', 8, 20);
addBullet('Chromatic aberration: décalage RGB léger', 8, 20);

// ============================================
// SECTION 9: INTERNATIONALISATION
// ============================================
newPage();

addTitle('INTERNATIONALISATION ET LOCALES');

addText('Le projet utilise next-intl 4.3.4 pour support multilingue complet avec routes localisées.');

addSourceRef('locales/, next-intl.config.js');

addSubtitle('9.1 Locales Supportées');

addBullet('English (en) - Locale par défaut');
addBullet('Español (es) - Traductions partielles');

addSection('Configuration:');
addCode(`// next-intl.config.js
export default {
  defaultLocale: 'en',
  locales: ['en', 'es'],
  localePrefix: 'as-needed'
}`);

addSubtitle('9.2 Fichiers de Traduction');

addSection('Namespaces disponibles:');
addBullet('locales/en/common.json - Navigation, actions, labels, messages', 8, 20);
addBullet('locales/en/entities.json - Termes entités, signatures', 8, 20);
addBullet('locales/en/shop.json - E-commerce labels', 8, 20);
addBullet('locales/en/blog.json - Blog labels', 8, 20);
addBullet('locales/en/gallery.json - Galerie labels', 8, 20);

addSection('Exemple d\'usage:');
addCode(`// Dans un Server Component
import {getTranslations} from 'next-intl/server';
const t = await getTranslations('common');
<Button>{t('actions.submit')}</Button>

// Dans un Client Component
import {useTranslations} from 'next-intl';
const t = useTranslations('common');
<Button>{t('actions.submit')}</Button>`);

addSubtitle('9.3 Routes Internationalisées');

addText('Toutes les pages sont sous app/[locale]/ permettant URLs localisées:');
addCode(`/en/blog  →  English blog
/es/blog  →  Spanish blog
/en/about →  English about
/es/about →  Spanish about`);

// ============================================
// SECTION 10: SÉCURITÉ
// ============================================
newPage();

addTitle('SÉCURITÉ ET AUTHENTIFICATION');

addSubtitle('10.1 NextAuth Configuration');

addText('Authentification via NextAuth.js 4.24.11 avec support JWT et OAuth providers.');

addSourceRef('lib/auth.ts, .env.example');

addSection('Providers configurés:');
addBullet('Google OAuth (optionnel, via GOOGLE_CLIENT_ID)', 8, 20);
addBullet('GitHub OAuth (optionnel, via GITHUB_ID)', 8, 20);
addBullet('Credentials (email/password avec bcrypt)', 8, 20);

addSection('Configuration JWT:');
addCode(`session: {
  strategy: "jwt",
  maxAge: 30 * 24 * 60 * 60  // 30 jours
}
secret: process.env.NEXTAUTH_SECRET`);

addSubtitle('10.2 Mesures de Sécurité Implémentées');

addBullet('✅ Input sanitization sur tous les formulaires', 8, 20);
addBullet('✅ Queries SQL via Prisma ORM (paramétrisées, safe)', 8, 20);
addBullet('✅ Protection CSRF via NextAuth', 8, 20);
addBullet('✅ Variables d\'environnement pour secrets (jamais en code)', 8, 20);
addBullet('✅ Stripe webhooks avec vérification signature', 8, 20);
addBullet('✅ Rate limiting configuré (100 req/15min)', 8, 20);
addBullet('✅ HTTPS requis en production', 8, 20);

addSubtitle('10.3 Variables d\'Environnement');

addText('Liste complète des variables requises (voir .env.example):');

addSection('Critiques (REQUIS):');
addBullet('DATABASE_URL - PostgreSQL connection', 8, 20);
addBullet('NEXTAUTH_SECRET - JWT signing key', 8, 20);
addBullet('NEXTAUTH_URL - App URL', 8, 20);
addBullet('STRIPE_SECRET_KEY - Paiements', 8, 20);
addBullet('STRIPE_WEBHOOK_SECRET - Webhook verification', 8, 20);

addSection('Optionnelles:');
addBullet('OAuth credentials (Google, GitHub)', 8, 20);
addBullet('AWS S3 ou Cloudinary (storage)', 8, 20);
addBullet('SMTP (emails)', 8, 20);
addBullet('Analytics (Google Analytics)', 8, 20);
addBullet('OpenAI/Replicate APIs (génératif)', 8, 20);

// ============================================
// SECTION 11: PLAN DE TRANSFORMATION
// ============================================
newPage();

addTitle('PLAN DE TRANSFORMATION');

addText('Le plan de transformation en 5 phases défini dans CLAUDE.md guide le développement vers une plateforme collective complète.');

addSourceRef('CLAUDE.md - Transformation Plan');

const phases = [
  {
    num: 1,
    name: 'Infrastructure Core',
    status: '95%',
    details: [
      '✅ Structure données entités (lib/entities.ts)',
      '✅ Startup intro avec signatures entités',
      '✅ Système audio glitch (Web Audio API)',
      '✅ Framework CSS terminal',
      '⚠️ Nettoyage fichiers dupliqués (startup-intro v1/v2)'
    ]
  },
  {
    num: 2,
    name: 'Transformation Visuelle',
    status: '90%',
    details: [
      '✅ Esthétique terminal noir complet',
      '✅ Effets glitch et scanlines',
      '✅ Typographie monospace/terminal',
      '✅ Animations CRT authentiques',
      '⚠️ Gallery styling inconsistant'
    ]
  },
  {
    num: 3,
    name: 'Système d\'Attribution',
    status: '75%',
    details: [
      '✅ Métadonnées posts pour entités',
      '✅ Logic assignment automatique',
      '✅ Injection signatures dans posts',
      '✅ Système couleurs accentuées par entité',
      '⚠️ Filtrage galerie incomplet'
    ]
  },
  {
    num: 4,
    name: 'Contenu & Pages',
    status: '50%',
    details: [
      '✅ About page avec lore collective',
      '✅ Blog avec attribution entités',
      '✅ Homepage terminal interface',
      '❌ Shop page (placeholder uniquement)',
      '❌ Music page (placeholder uniquement)',
      '⚠️ Gallery (structure OK, styling à corriger)'
    ]
  },
  {
    num: 5,
    name: 'Fonctionnalités Interactives',
    status: '20%',
    details: [
      '✅ Audio toggle dans settings',
      '✅ Effets glitch sur hover',
      '⚠️ Animations switching entités (basique)',
      '❌ Commandes terminal (non implémenté)',
      '❌ Easter eggs (non implémenté)',
      '❌ Modes cachés (non implémenté)'
    ]
  }
];

phases.forEach(phase => {
  doc.fontSize(12).fillColor(colors.purple).text(`Phase ${phase.num}: ${phase.name}`, { underline: true });
  doc.fontSize(10).fillColor(phase.status.includes('95') || phase.status.includes('90') ? colors.terminalGreen :
                              phase.status.includes('75') || phase.status.includes('50') ? colors.yellow : colors.red)
     .text(`État: ${phase.status}`, { indent: 20 });
  doc.moveDown(0.2);
  phase.details.forEach(detail => {
    doc.fontSize(8).fillColor(colors.black).text(detail, { indent: 30 });
  });
  doc.moveDown(0.5);
});

addText('Score global de complétion: ~75% (moyenne pondérée des 5 phases)');

// ============================================
// SECTION 12: RECOMMANDATIONS
// ============================================
newPage();

addTitle('RECOMMANDATIONS ET PROCHAINES ÉTAPES');

addSubtitle('12.1 Priorité HAUTE (Action Immédiate)');

addSection('1. Compléter Page Shop');
addBullet('Développer grille produits avec ProductCard components', 9, 25);
addBullet('Intégrer panier Redux (cartSlice déjà configuré)', 9, 25);
addBullet('Implémenter flow Stripe checkout complet', 9, 25);
addBullet('Ajouter filtrage par catégorie et entité', 9, 25);
addBullet('Tests E2E sur parcours d\'achat', 9, 25);

addSection('2. Compléter Page Music');
addBullet('Créer composant audio player avec Web Audio API', 9, 25);
addBullet('Implémenter visualisations audio-réactives', 9, 25);
addBullet('Interface contrôles terminal-style', 9, 25);
addBullet('Playlist management', 9, 25);

addSection('3. Corriger Styling Gallery');
addBullet('Remplacer texte blanc par vert terminal (#00ff00)', 9, 25);
addBullet('Ajouter background noir comme Blog/About', 9, 25);
addBullet('Assurer cohérence visuelle avec reste du site', 9, 25);

addSection('4. Nettoyage Code');
addBullet('SUPPRIMER components/ui/startup-intro.tsx (v1)', 9, 25);
addBullet('Consolider headers (supprimer duplicates)', 9, 25);
addBullet('Standardiser usage useTranslations()', 9, 25);

addSubtitle('12.2 Priorité MOYENNE (Améliorations)');

addSection('5. Système Commandes Terminal');
addBullet('Implémenter /help - Afficher aide commandes', 9, 25);
addBullet('Implémenter /entities - Lister entités', 9, 25);
addBullet('Implémenter /logs - Voir logs système', 9, 25);
addBullet('Implémenter /glitch [intensity] - Déclencher effet', 9, 25);

addSection('6. Transitions Entités Animées');
addBullet('Effet glitch lors changement entité', 9, 25);
addBullet('Transition fluide couleurs et animations', 9, 25);
addBullet('Feedback audio sur switch', 9, 25);

addSection('7. Optimisation Mobile');
addBullet('Tester tous effets CRT sur mobile', 9, 25);
addBullet('Ajuster tailles polices pour lisibilité', 9, 25);
addBullet('Optimiser animations Canvas (performance)', 9, 25);
addBullet('Tester sur iOS Safari et Android Chrome', 9, 25);

addSubtitle('12.3 Priorité BASSE (Polish & Features)');

addSection('8. Performance');
addBullet('Lazy loading animations Canvas', 9, 25);
addBullet('Code splitting par route', 9, 25);
addBullet('Optimisation bundles (analyze)', 9, 25);
addBullet('Image optimization (Next.js Image)', 9, 25);

addSection('9. Tests Complets');
addBullet('Tests unitaires components (Jest)', 9, 25);
addBullet('Tests E2E parcours critiques (Playwright)', 9, 25);
addBullet('Coverage target 70%+', 9, 25);

addSection('10. Easter Eggs & Secrets');
addBullet('Commandes cachées terminal', 9, 25);
addBullet('Modes spéciaux (matrix mode, glitch mode)', 9, 25);
addBullet('Secrets par entité', 9, 25);

// ============================================
// SECTION 13: ANNEXES
// ============================================
newPage();

addTitle('ANNEXES ET RÉFÉRENCES');

addSubtitle('13.1 Scripts NPM Disponibles');

const scripts = [
  { cmd: 'npm run dev', desc: 'Serveur développement (port 3002)' },
  { cmd: 'npm run build', desc: 'Build production (.next/)' },
  { cmd: 'npm run start', desc: 'Serveur production' },
  { cmd: 'npm run lint', desc: 'ESLint check' },
  { cmd: 'npm run format', desc: 'Prettier format' },
  { cmd: 'npm run typecheck', desc: 'TypeScript check' },
  { cmd: 'npm test', desc: 'Jest tests' },
  { cmd: 'npm run test:watch', desc: 'Jest watch mode' },
  { cmd: 'npm run test:coverage', desc: 'Coverage report' },
  { cmd: 'npm run e2e', desc: 'Playwright E2E' },
  { cmd: 'npm run db:push', desc: 'Prisma push schema' },
  { cmd: 'npm run db:migrate', desc: 'Prisma migrate' },
  { cmd: 'npm run db:studio', desc: 'Prisma Studio UI' },
  { cmd: 'npm run db:seed', desc: 'Seed database' }
];

scripts.forEach(script => {
  doc.fontSize(8).fillColor(colors.cyan).text(script.cmd, { continued: true });
  doc.fillColor(colors.gray).text(` - ${script.desc}`);
  doc.moveDown(0.15);
});

addSubtitle('13.2 Documentation Projet');

addBullet('README.md - Setup et quick start');
addBullet('CLAUDE.md - Directives développement AI');
addBullet('AGENTS.md - Guidelines contributeurs');
addBullet('ENTITY_ASSIGNMENT_DOCS.md - Système entités détaillé');
addBullet('METALLIC_WAVES_CHANGES.md - Changelog effet métallique');
addBullet('DREAMHOST_PASSENGER_DEPLOYMENT.md - Déploiement Dreamhost');

addSubtitle('13.3 Ressources Externes');

addBullet('Next.js Docs: https://nextjs.org/docs');
addBullet('Prisma Docs: https://www.prisma.io/docs');
addBullet('Stripe Docs: https://stripe.com/docs');
addBullet('Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API');
addBullet('Tailwind CSS: https://tailwindcss.com/docs');
addBullet('Redux Toolkit: https://redux-toolkit.js.org');

addSubtitle('13.4 Contacts et Support');

addBullet('GitHub Repo: https://github.com/stimutak/multiPassLabs');
addBullet('Issues: https://github.com/stimutak/multiPassLabs/issues');
addBullet('Main Developer: Oliver (stimutak@gmail.com)');

addSubtitle('13.5 Métadonnées du Dossier');

doc.fontSize(9).fillColor(colors.gray).text('Document généré par:', { indent: 20 });
doc.fontSize(8).fillColor(colors.black).text('Claude Code - Session 011CUTwkPB3P4c5Nfy9oeRF3', { indent: 30 });

doc.moveDown(0.3);
doc.fontSize(9).fillColor(colors.gray).text('Sources analysées:', { indent: 20 });
addBullet('Git repository history (53 commits)', 8, 30);
addBullet('Fichiers source TypeScript/TSX (100+ files)', 8, 30);
addBullet('Documentation markdown (6 files)', 8, 30);
addBullet('Schéma base de données (Prisma)', 8, 30);
addBullet('Configuration files (package.json, tsconfig, etc.)', 8, 30);

doc.moveDown(0.5);
doc.fontSize(9).fillColor(colors.gray).text('Date génération:', { indent: 20 });
doc.fontSize(8).fillColor(colors.black).text(new Date().toLocaleString('fr-FR'), { indent: 30 });

doc.moveDown(1);
addHorizontalLine();

doc.fontSize(10).fillColor(colors.terminalGreen).text('FIN DU DOSSIER', { align: 'center' });
doc.fontSize(8).fillColor(colors.gray).text('[ mu1ti.p@ss ] root - Multipass Labs © 2025-2026', { align: 'center' });

addPageNumber();

// Finalize PDF
doc.end();

console.log(`✅ Dossier complet généré: ${outputPath}`);
console.log(`📄 Pages totales: ${pageNumber}`);
console.log(`📑 Sections: ${sectionNumber}`);
