const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Create a document
const doc = new PDFDocument({
  size: 'A4',
  margins: {
    top: 40,
    bottom: 40,
    left: 50,
    right: 50
  }
});

// Pipe to a file
const outputPath = path.join(__dirname, 'Rapport-Multipass-Labs-Complet.pdf');
doc.pipe(fs.createWriteStream(outputPath));

// Colors
const colors = {
  terminalGreen: '#00ff00',
  cyan: '#00f4ff',
  purple: '#9b59ff',
  pink: '#d982ff',
  blue: '#0078f2',
  black: '#000000',
  gray: '#666666',
  darkGray: '#333333'
};

// Helper functions
function addTitle(text, fontSize = 22) {
  doc
    .fontSize(fontSize)
    .fillColor(colors.terminalGreen)
    .text(text, { align: 'left' });
  doc.moveDown(0.4);
}

function addSubtitle(text, fontSize = 14) {
  doc
    .fontSize(fontSize)
    .fillColor(colors.cyan)
    .text(text);
  doc.moveDown(0.3);
}

function addText(text, fontSize = 10) {
  doc
    .fontSize(fontSize)
    .fillColor(colors.black)
    .text(text, { align: 'justify' });
  doc.moveDown(0.4);
}

function addBullet(text, fontSize = 9) {
  doc
    .fontSize(fontSize)
    .fillColor(colors.black)
    .text('• ' + text, { indent: 15, align: 'justify' });
  doc.moveDown(0.15);
}

function addSection(title, fontSize = 13) {
  doc.moveDown(0.3);
  doc
    .fontSize(fontSize)
    .fillColor(colors.purple)
    .text(title);
  doc.moveDown(0.25);
}

function addHorizontalLine() {
  const y = doc.y;
  doc
    .strokeColor(colors.terminalGreen)
    .lineWidth(0.5)
    .moveTo(50, y)
    .lineTo(545, y)
    .stroke();
  doc.moveDown(0.3);
}

// ============================================
// PAGE 1 - PRÉSENTATION & CONTRIBUTEURS
// ============================================

// Header
doc
  .fontSize(26)
  .fillColor(colors.terminalGreen)
  .text('MULTIPASS LABS', { align: 'center' });
doc
  .fontSize(13)
  .fillColor(colors.cyan)
  .text('RAPPORT COMPLET DU PROJET', { align: 'center' });
doc
  .fontSize(9)
  .fillColor(colors.gray)
  .text('Période : Mai 2025 - Octobre 2025', { align: 'center' });
doc
  .fontSize(9)
  .fillColor(colors.gray)
  .text('Généré le : ' + new Date().toLocaleDateString('fr-FR'), { align: 'center' });
doc.moveDown(0.8);

addHorizontalLine();

// 0. CONTRIBUTEURS DU PROJET
addTitle('CONTRIBUTEURS (Mai 2025 - Octobre 2025)', 16);
addText('Depuis mai 2025, 3 contributeurs ont participé au développement de Multipass Labs avec un total de 53 commits :');

doc.moveDown(0.3);

doc
  .fontSize(11)
  .fillColor(colors.terminalGreen)
  .text('1. Oliver (Développeur Principal)', { continued: false });
doc
  .fontSize(9)
  .fillColor(colors.black)
  .text('   Email: stimutak@gmail.com | 47 commits (89%)', { indent: 10 });
doc
  .fontSize(8.5)
  .fillColor(colors.gray)
  .text('   Rôle: Architecte principal et développeur full-stack', { indent: 10 });
addBullet('Transformation complète du site en esthétique terminal glitchée');
addBullet('Implémentation système d\'entités de laboratoire (10 protagonistes)');
addBullet('Développement séquence de boot ASCII avec audio procédural');
addBullet('Création de toutes les animations d\'entités (oscilloscope, vagues, etc.)');
addBullet('Intégration Redux Toolkit, Prisma, NextAuth');
addBullet('Corrections TypeScript strict mode et déploiement Vercel');
addBullet('Effets visuels: liquid chrome, subliminal flash, scanlines CRT');
addBullet('Pages: Homepage, About, Blog, Gallery (structure de base)');

doc.moveDown(0.3);

doc
  .fontSize(11)
  .fillColor(colors.terminalGreen)
  .text('2. ChatGPT (Assistant IA)', { continued: false });
doc
  .fontSize(9)
  .fillColor(colors.black)
  .text('   Email: bot@example.com, you@example.com | 5 commits (9%)', { indent: 10 });
doc
  .fontSize(8.5)
  .fillColor(colors.gray)
  .text('   Rôle: Assistant de développement et génération de contenu', { indent: 10 });
addBullet('Création et optimisation du logo ASCII pour boot sequence');
addBullet('Corrections de design et ajustements visuels');
addBullet('Assistance sur implémentation de fonctionnalités');

doc.moveDown(0.3);

doc
  .fontSize(11)
  .fillColor(colors.terminalGreen)
  .text('3. Claude Code (Assistant IA Anthropic)', { continued: false });
doc
  .fontSize(9)
  .fillColor(colors.black)
  .text('   Email: noreply@anthropic.com | 1 commit (2%)', { indent: 10 });
doc
  .fontSize(8.5)
  .fillColor(colors.gray)
  .text('   Rôle: Documentation et génération de rapports', { indent: 10 });
addBullet('Génération de documentation PDF complète du projet');
addBullet('Analyse de codebase et audit de l\'état du projet');

doc.moveDown(0.5);
addHorizontalLine();

// 1. PRÉSENTATION DU PROJET
addTitle('1. PRÉSENTATION DU PROJET', 16);
addText('Multipass Labs est une plateforme expérimentale collective dédiée aux visuels audio-réactifs et à l\'art génératif. Le site adopte une esthétique terminal sombre et glitchée, opéré par 10 entités mystérieuses de laboratoire, chacune avec sa propre signature et son domaine d\'expertise.');

addSection('Stack Technique');
addBullet('Frontend: Next.js 14 (App Router) + TypeScript en mode strict');
addBullet('Styling: Tailwind CSS avec esthétique terminal/CRT personnalisée');
addBullet('Base de données: PostgreSQL + Prisma ORM');
addBullet('Gestion d\'état: Redux Toolkit');
addBullet('Audio: Web Audio API (sons glitch procéduraux style Richard Devine)');
addBullet('Paiements: Stripe SDK officiel');
addBullet('i18n: next-intl pour l\'internationalisation');

addSection('Architecture Principale');
addText('Le projet est structuré autour de l\'App Router de Next.js 14 avec routes internationalisées ([locale]), un système d\'entités de laboratoire pour l\'attribution de contenu, et une expérience de démarrage terminal immersive avec séquence de boot ASCII, pluie Matrix, et authentification des entités.');

doc.moveDown(0.3);
addHorizontalLine();

// 2. LES 10 PROTAGONISTES (ENTITÉS DU LABORATOIRE)
addTitle('2. LES PROTAGONISTES : 10 ENTITÉS DU LABORATOIRE', 16);
addText('Chaque contenu (post, galerie, produit) est attribué à l\'une de ces 10 entités mystérieuses, chacune avec sa signature unique, sa couleur et son domaine d\'expertise :');

doc.moveDown(0.3);

const entities = [
  {
    name: 'nU11.form',
    sig: '[nU11.form] v0.3a',
    color: 'Cyan (#00f4ff)',
    role: 'Théoricien du glitch - Expert en déformation logique'
  },
  {
    name: 'drex:0m',
    sig: '[drex:0m] b01',
    color: 'Violet (#9b59ff)',
    role: 'Cartographe du chaos - Réécriture structurelle'
  },
  {
    name: 'noize.p4th',
    sig: '[noize.p4th] //dev.05',
    color: 'Vert (#59ff6d)',
    role: 'Tacticien audio-réactif - Manipulation sonore'
  },
  {
    name: 'x3n0.form',
    sig: '[x3n0.form] ∆x.14',
    color: 'Bleu (#0078f2)',
    role: 'Art génératif alien - Artefacts procéduraux'
  },
  {
    name: 'ƒ1lament',
    sig: '[ƒ1lament] v1.0a',
    color: 'Rose (#d982ff)',
    role: 'Sculpteur de formes d\'onde - Délicatesse sonore'
  },
  {
    name: '5ub.signal',
    sig: '[5ub.signal] .sig/3.3',
    color: 'Jaune (#ffe95c)',
    role: 'Manipulateur de feedback - Boucles infinies'
  },
  {
    name: '1r1s.fade',
    sig: '[1r1s.fade] ::OBSCURA',
    color: 'Rose pâle (#ffa4f9)',
    role: 'Fantôme cinématique - Lumière douce et mystère'
  },
  {
    name: 'ctrlN0!r',
    sig: '[ctrlN0!r] CRL/09',
    color: 'Rouge (#ff5566)',
    role: 'Saboteur d\'interface - Chaos contrôlé'
  },
  {
    name: 'NØD3//STATE',
    sig: '[NØD3//STATE] 07_hz',
    color: 'Turquoise (#58d2bf)',
    role: 'Architecte de flux topologique - États complexes'
  },
  {
    name: 'mu1ti.p@ss',
    sig: '[mu1ti.p@ss] root',
    color: 'Gris (#dddddd)',
    role: 'Méta-entité - Accès racine et coordination'
  }
];

entities.forEach((entity, index) => {
  doc
    .fontSize(9)
    .fillColor(colors.purple)
    .text(`${index + 1}. ${entity.name}`, { continued: true })
    .fillColor(colors.gray)
    .text(` | ${entity.sig}`);
  doc
    .fontSize(8)
    .fillColor(colors.black)
    .text(`   ${entity.color} - ${entity.role}`, { indent: 20 });
  doc.moveDown(0.15);
});

// ============================================
// PAGE 2 - ÉTAT DU PROJET & FONCTIONNALITÉS
// ============================================
doc.addPage();

addTitle('3. ÉTAT ACTUEL DU PROJET (~75% COMPLET)', 16);

addSection('✅ Fonctionnalités Implémentées (Excellent)');

doc.fontSize(10).fillColor(colors.cyan).text('Séquence de Démarrage Terminal');
doc.moveDown(0.2);
addBullet('Animation de boot immersive avec 4 phases (boot → entités → logo → prêt)');
addBullet('Pluie Matrix en arrière-plan avec signatures d\'entités');
addBullet('Effets de scanlines et scintillement CRT');
addBullet('Audio procédural (sons de boot, glitches, drone ambiant)');
addBullet('Bouton de relecture dans le header');

doc.moveDown(0.2);
doc.fontSize(10).fillColor(colors.cyan).text('Système d\'Entités de Laboratoire');
doc.moveDown(0.2);
addBullet('10 entités complètes avec signatures, couleurs, rôles');
addBullet('Animations individuelles par entité (oscilloscope, ondes, etc.)');
addBullet('Attribution automatique et manuelle de contenu');
addBullet('Filtrage par entité sur Blog et Galerie');
addBullet('Helpers: getRandomEntity(), glitchText(), formatEntitySignature()');

doc.moveDown(0.2);
doc.fontSize(10).fillColor(colors.cyan).text('Esthétique Terminal & Effets Visuels');
doc.moveDown(0.2);
addBullet('Framework CSS terminal complet (phosphore, scanlines, glitch)');
addBullet('Effet liquid chrome métallique sur les vagues');
addBullet('Animation de flash subliminal sur la page d\'accueil');
addBullet('Cycle de couleurs des entités toutes les 8 secondes');
addBullet('Bordures ASCII et curseur terminal clignotant');

doc.moveDown(0.2);
doc.fontSize(10).fillColor(colors.cyan).text('Pages Complètes');
doc.moveDown(0.2);
addBullet('Homepage: Interface terminal complète avec historique de commandes, modules système');
addBullet('About: Histoire collective, roster des entités, spécifications techniques');
addBullet('Blog: Header stylisé terminal, filtrage par entité, cartes de posts');

doc.moveDown(0.2);
doc.fontSize(10).fillColor(colors.cyan).text('Infrastructure & Base de Données');
doc.moveDown(0.2);
addBullet('Schéma Prisma: Posts, Products, Gallery, Orders, Users');
addBullet('Système d\'attribution d\'entités intégré (champ entityId)');
addBullet('Redux Toolkit: authSlice, cartSlice, uiSlice');
addBullet('NextAuth configuré pour l\'authentification');

addSection('⚠️ Fonctionnalités Incomplètes ou Manquantes');

addBullet('Page Shop: Seulement un placeholder - Besoin: grille produits, intégration Stripe, panier');
addBullet('Page Music: Stub uniquement - Besoin: lecteur audio, visualisations audio-réactives');
addBullet('Galerie: Styling inconsistant (texte blanc au lieu de vert terminal)');
addBullet('Commandes terminal: Pas d\'interface clavier (/help, /entities, /logs)');
addBullet('Expérience mobile: Effets non testés sur petits écrans');
addBullet('Fichiers dupliqués: startup-intro.tsx v1 et v2 (violant règle "pas de -v2")');

addHorizontalLine();

addTitle('4. STRUCTURE DES FICHIERS CLÉS', 16);

addSection('Composants Principaux');
doc.fontSize(8).fillColor(colors.black);
doc.text('components/ui/startup-intro-v2.tsx     → Séquence de boot (version active)', { indent: 10 });
doc.text('components/ui/simple-header.tsx        → Header principal avec navigation', { indent: 10 });
doc.text('components/backgrounds/entity-animations.tsx → Animations Canvas par entité', { indent: 10 });
doc.text('components/ui/entity-signature.tsx     → Affichage des signatures d\'entités', { indent: 10 });

doc.moveDown(0.3);
addSection('Bibliothèques Essentielles');
doc.fontSize(8).fillColor(colors.black);
doc.text('lib/entities.ts                        → Système d\'entités (10 personas)', { indent: 10 });
doc.text('lib/audio/glitch-audio.ts              → Génération audio procédurale', { indent: 10 });
doc.text('lib/blog-data.ts                       → Mapping expertise des entités', { indent: 10 });

doc.moveDown(0.3);
addSection('Pages');
doc.fontSize(8).fillColor(colors.black);
doc.text('app/[locale]/page.tsx                  → Homepage (excellente)', { indent: 10 });
doc.text('app/[locale]/about/page.tsx            → À propos (excellente)', { indent: 10 });
doc.text('app/[locale]/blog/page.tsx             → Blog (bonne)', { indent: 10 });
doc.text('app/[locale]/gallery/page.tsx          → Galerie (à améliorer)', { indent: 10 });
doc.text('app/[locale]/shop/page.tsx             → Shop (STUB)', { indent: 10 });
doc.text('app/[locale]/music/page.tsx            → Musique (STUB)', { indent: 10 });

doc.moveDown(0.3);
addSection('Styles');
doc.fontSize(8).fillColor(colors.black);
doc.text('styles/globals.css                     → CSS terminal complet (effets CRT)', { indent: 10 });

// ============================================
// PAGE 3 - PLAN & RECOMMANDATIONS
// ============================================
doc.addPage();

addTitle('5. PLAN DE TRANSFORMATION (5 PHASES)', 16);

const phases = [
  {
    name: 'Phase 1 : Infrastructure Core',
    status: '95%',
    details: 'Structure entités, audio glitch, framework CSS terminal - Quasi complet'
  },
  {
    name: 'Phase 2 : Transformation Visuelle',
    status: '90%',
    details: 'Esthétique terminal noir, effets glitch, scanlines, typographie - Excellent'
  },
  {
    name: 'Phase 3 : Système d\'Attribution',
    status: '75%',
    details: 'Attribution entités, signatures, filtrage - Bon mais incomplet sur Galerie'
  },
  {
    name: 'Phase 4 : Contenu & Pages',
    status: '50%',
    details: 'Blog/About complets, Shop/Music manquants - Moyen'
  },
  {
    name: 'Phase 5 : Fonctionnalités Interactives',
    status: '20%',
    details: 'Commandes terminal, easter eggs, transitions entités - Faible'
  }
];

phases.forEach((phase, index) => {
  doc
    .fontSize(10)
    .fillColor(colors.purple)
    .text(`${phase.name} - ${phase.status}`, { continued: false });
  doc
    .fontSize(9)
    .fillColor(colors.black)
    .text(phase.details, { indent: 15 });
  doc.moveDown(0.25);
});

addHorizontalLine();

addTitle('6. RECOMMANDATIONS & PROCHAINES ÉTAPES', 16);

addSection('Priorité Haute (Développement Immédiat)');
addBullet('Compléter la page Shop : grille produits, intégration panier Redux, paiement Stripe');
addBullet('Compléter la page Music : lecteur audio, visualisations Web Audio API, contrôles terminal');
addBullet('Corriger le styling de la Galerie : passer au vert terminal, cohérence avec Blog/About');
addBullet('Supprimer fichiers dupliqués : startup-intro.tsx v1 (garder seulement v2)');

addSection('Priorité Moyenne (Améliorations)');
addBullet('Implémenter système de commandes terminal : /help, /entities, /logs, /glitch');
addBullet('Ajouter transitions animées lors du changement d\'entité (effet glitch)');
addBullet('Tester et optimiser l\'expérience mobile (effets CRT, lisibilité)');
addBullet('Améliorer les animations de toutes les 10 entités (vérifier leur fonctionnement)');

addSection('Priorité Basse (Polish & Optimisation)');
addBullet('Performance : lazy loading des animations Canvas, code splitting');
addBullet('Easter eggs : commandes secrètes, modes cachés');
addBullet('Documentation : README complet, guide de contribution');
addBullet('Tests E2E : Playwright sur parcours critiques (boot, shop, checkout)');

addHorizontalLine();

addTitle('7. POINTS FORTS & FAIBLESSES', 16);

addSection('🎯 Points Forts Exceptionnels');
addBullet('Séquence de boot : Immersive, fluide, riche en fonctionnalités');
addBullet('Système audio : Bien architecturé avec cleanup approprié');
addBullet('Esthétique CSS : Complète et professionnelle, effets CRT convaincants');
addBullet('Système d\'entités : Élégant, extensible, bien documenté');
addBullet('Homepage : Visuellement époustouflante avec bonne UX');

addSection('⚠️ Zones à Améliorer');
addBullet('Pages manquantes : Shop et Music sont des stubs complets');
addBullet('Inconsistance visuelle : Galerie ne suit pas l\'esthétique terminal');
addBullet('Code dupliqué : Multiples versions de fichiers (startup-intro)');
addBullet('Fonctionnalités interactives : Limitées, pas de commandes terminal');
addBullet('Tests : Couverture insuffisante, mobile non testé');

doc.moveDown(0.5);
addHorizontalLine();

// CONCLUSION
addTitle('CONCLUSION', 14);
addText('Multipass Labs présente une fondation solide (~75% complète) pour une plateforme collective d\'art expérimental. L\'esthétique terminal est exceptionnellement bien réalisée, le système d\'entités est ingénieux et fonctionnel, et l\'expérience de démarrage est immersive.');

addText('Le travail restant se concentre principalement sur la complétion des pages Shop et Music, la correction de l\'inconsistance visuelle de la Galerie, et l\'ajout de fonctionnalités interactives (commandes terminal, easter eggs). L\'optimisation mobile et la suppression des fichiers dupliqués sont également nécessaires pour atteindre la qualité de production.');

doc.moveDown(0.5);

// Footer
doc
  .fontSize(8)
  .fillColor(colors.gray)
  .text('Multipass Labs - Plateforme expérimentale collective', { align: 'center' });
doc
  .fontSize(7)
  .fillColor(colors.terminalGreen)
  .text('[ mu1ti.p@ss ] root - Rapport généré par Claude Code', { align: 'center' });

// Finalize PDF
doc.end();

console.log(`✅ Rapport PDF complet généré: ${outputPath}`);
