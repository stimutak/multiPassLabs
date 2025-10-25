const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Create a document
const doc = new PDFDocument({
  size: 'A4',
  margins: {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
  }
});

// Pipe to a file
const outputPath = path.join(__dirname, 'MultipassLabs-Project-Overview.pdf');
doc.pipe(fs.createWriteStream(outputPath));

// Colors
const colors = {
  terminalGreen: '#00ff00',
  cyan: '#00f4ff',
  purple: '#9b59ff',
  pink: '#d982ff',
  black: '#000000',
  gray: '#666666',
  darkGray: '#333333'
};

// Helper functions
function addTitle(text, fontSize = 24) {
  doc
    .fontSize(fontSize)
    .fillColor(colors.terminalGreen)
    .text(text, { align: 'left' });
  doc.moveDown(0.5);
}

function addSubtitle(text, fontSize = 16) {
  doc
    .fontSize(fontSize)
    .fillColor(colors.cyan)
    .text(text);
  doc.moveDown(0.3);
}

function addText(text, fontSize = 11) {
  doc
    .fontSize(fontSize)
    .fillColor(colors.black)
    .text(text);
  doc.moveDown(0.5);
}

function addBullet(text, fontSize = 10) {
  doc
    .fontSize(fontSize)
    .fillColor(colors.black)
    .text('• ' + text, { indent: 20 });
  doc.moveDown(0.2);
}

function addSection(title) {
  doc.moveDown(0.5);
  doc
    .fontSize(14)
    .fillColor(colors.purple)
    .text(title);
  doc.moveDown(0.3);
}

function addHorizontalLine() {
  const y = doc.y;
  doc
    .strokeColor(colors.terminalGreen)
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(545, y)
    .stroke();
  doc.moveDown(0.5);
}

// Start building the PDF

// Header
doc
  .fontSize(28)
  .fillColor(colors.terminalGreen)
  .text('MULTIPASS LABS', { align: 'center' });
doc
  .fontSize(14)
  .fillColor(colors.cyan)
  .text('PROJECT OVERVIEW & CURRENT STATE', { align: 'center' });
doc
  .fontSize(10)
  .fillColor(colors.gray)
  .text('Generated: ' + new Date().toLocaleDateString(), { align: 'center' });
doc.moveDown(1);

addHorizontalLine();

// What is this project
addTitle('🎯 What Is This Project?', 18);
addText('Multipass Labs is an experimental collective platform showcasing audio-reactive visuals and generative art with a dark, glitchy terminal aesthetic. The site is "operated" by 10 mysterious lab entities, each with their own signature style and color scheme.');

addSection('Tech Stack');
addBullet('Next.js 14 (App Router) + TypeScript');
addBullet('PostgreSQL + Prisma ORM');
addBullet('Redux Toolkit for state management');
addBullet('Stripe for payments');
addBullet('Terminal/CRT aesthetic with Web Audio API for glitch sounds');

doc.moveDown(0.5);
addHorizontalLine();

// What's Working
addTitle('✅ What\'s Working (Strong Foundation - ~75% Complete)', 18);

addSection('Excellent Implementation');
addBullet('Boot Sequence: Immersive terminal startup with Matrix rain, entity authentication, glitch audio, scanlines');
addBullet('Lab Entity System: 10 unique personas with signatures, colors, roles, and individual animations');
addBullet('Terminal Aesthetic: Complete CSS framework with CRT effects, phosphor glow, scanlines, glitch animations');
addBullet('Audio System: Richard Devine-inspired procedural glitch sounds, boot tones, ambient drones');
addBullet('Homepage: Stunning terminal interface with entity cycling, subliminal flash effects, command history');
addBullet('About Page: Full collective lore, entity roster, technical specs in terminal style');
addBullet('Blog: Entity-attributed posts with filtering, metallic waves background');

addSection('Database & Core Features');
addBullet('Prisma schema with Posts, Products, Gallery, Orders, Users');
addBullet('Entity attribution system (all content tagged with entity ID)');
addBullet('Redux state management (auth, cart, UI)');
addBullet('NextAuth authentication setup');

doc.addPage();

// What Needs Work
addTitle('⚠️ What Needs Work', 18);

addSection('Missing/Incomplete');
addBullet('Shop Page: Currently just a placeholder (needs product grid, cart, Stripe integration)');
addBullet('Music Page: Stub only (needs audio player, visualizations)');
addBullet('Gallery Styling: Inconsistent aesthetic (white text vs terminal green)');
addBullet('Terminal Commands: No keyboard command system (/help, /entities, etc.)');
addBullet('Mobile Testing: Effects may not work well on small screens');

addSection('Code Quality Issues');
addBullet('Duplicate files (startup-intro.tsx v1 & v2 - violates CLAUDE.md "no -v2 files" rule)');
addBullet('Multiple header components with unclear usage');
addBullet('Inconsistent translation usage');

doc.moveDown(0.5);
addHorizontalLine();

// The 10 Lab Entities
addTitle('🎨 The 10 Lab Entities', 18);

const entities = [
  { name: 'nU11.form', sig: '[nU11.form] v0.3a', color: 'Cyan', role: 'Glitch theory' },
  { name: 'drex:0m', sig: '[drex:0m] b01', color: 'Purple', role: 'Chaos mapping' },
  { name: 'noize.p4th', sig: '[noize.p4th] //dev.05', color: 'Green', role: 'Audio-reactive' },
  { name: 'x3n0.form', sig: '[x3n0.form] ∆x.14', color: 'Blue', role: 'Generative art' },
  { name: 'ƒ1lament', sig: '[ƒ1lament] v1.0a', color: 'Pink', role: 'Waveforms' },
  { name: '5ub.signal', sig: '[5ub.signal] .sig/3.3', color: 'Yellow', role: 'Feedback loops' },
  { name: '1r1s.fade', sig: '[1r1s.fade] ::OBSCURA', color: 'Light pink', role: 'Cinematic' },
  { name: 'ctrlN0!r', sig: '[ctrlN0!r] CRL/09', color: 'Red', role: 'Interface sabotage' },
  { name: 'NØD3//STATE', sig: '[NØD3//STATE] 07_hz', color: 'Teal', role: 'Topological flow' },
  { name: 'mu1ti.p@ss', sig: '[mu1ti.p@ss] root', color: 'Gray', role: 'Meta/master' }
];

entities.forEach(entity => {
  doc
    .fontSize(10)
    .fillColor(colors.purple)
    .text(`${entity.name}`, { continued: true })
    .fillColor(colors.gray)
    .text(` | ${entity.sig} | ${entity.color} | ${entity.role}`);
  doc.moveDown(0.2);
});

doc.moveDown(0.5);
addHorizontalLine();

// Transformation Plan Status
addTitle('📊 Transformation Plan Status', 18);
addText('From CLAUDE.md\'s 5-phase plan:');
doc.moveDown(0.3);
addBullet('✅ Phase 1: Core Infrastructure (95%)');
addBullet('✅ Phase 2: Visual Transformation (90%)');
addBullet('⚠️ Phase 3: Entity Attribution (75%)');
addBullet('⚠️ Phase 4: Content & Pages (50% - missing shop/music)');
addBullet('❌ Phase 5: Interactive Features (20%)');

doc.addPage();

// Recent Work
addTitle('🔥 Recent Work', 18);
addText('Last commits focused on polish:');
addBullet('Boot replay button in header');
addBullet('Fix hydration errors');
addBullet('Liquid chrome metallic effect');
addBullet('Subliminal animation stabilization');
addBullet('TypeScript fixes');

doc.moveDown(0.5);
addHorizontalLine();

// Key Directories
addTitle('📁 Key Directories & Files', 18);

addSection('Core Features');
doc.fontSize(9).fillColor(colors.black);
doc.text('├── lib/entities.ts                      [Entity system - 10 entities]', { indent: 10 });
doc.text('├── lib/audio/glitch-audio.ts            [Audio generation - complete]', { indent: 10 });
doc.text('├── app/[locale]/page.tsx                [Homepage - excellent]', { indent: 10 });
doc.text('├── app/[locale]/about/page.tsx          [About - excellent]', { indent: 10 });
doc.text('└── styles/globals.css                   [Terminal CSS - comprehensive]', { indent: 10 });

doc.moveDown(0.5);
addSection('Components');
doc.fontSize(9).fillColor(colors.black);
doc.text('├── components/ui/startup-intro-v2.tsx   [Boot animation - main version]', { indent: 10 });
doc.text('├── components/ui/simple-header.tsx      [Header - active]', { indent: 10 });
doc.text('└── components/backgrounds/entity-animations.tsx [Canvas animations]', { indent: 10 });

doc.moveDown(0.5);
addSection('Pages');
doc.fontSize(9).fillColor(colors.black);
doc.text('├── app/[locale]/blog/page.tsx           [Blog - good]', { indent: 10 });
doc.text('├── app/[locale]/gallery/page.tsx        [Gallery - needs work]', { indent: 10 });
doc.text('├── app/[locale]/shop/page.tsx           [STUB]', { indent: 10 });
doc.text('└── app/[locale]/music/page.tsx          [STUB]', { indent: 10 });

doc.moveDown(1);
addHorizontalLine();

// Implementation Highlights
addTitle('🎯 Implementation Highlights', 18);

addSection('Strongest Areas');
addBullet('Startup/boot sequence is exceptional - smooth, immersive, feature-rich');
addBullet('Audio system is well-engineered with proper cleanup');
addBullet('CSS terminal aesthetics are comprehensive and professional');
addBullet('Entity system is elegant and extensible');
addBullet('Homepage is visually stunning with good UX');

addSection('Most Mature Features');
addText('1. Terminal aesthetic & styling\n2. Boot animation & audio\n3. Entity system & lore\n4. Blog with entity filtering\n5. About page with collective story');

addSection('Needs Most Work');
addText('1. Shop page (completely missing)\n2. Music page (completely missing)\n3. Gallery styling (inconsistent)\n4. Mobile experience (untested)\n5. Interactive features (limited)');

doc.moveDown(1);
addHorizontalLine();

// Footer
doc
  .fontSize(10)
  .fillColor(colors.gray)
  .text('This is a solid foundation for an experimental collective art platform.', { align: 'center' });
doc
  .fontSize(9)
  .text('The main work remaining is completing the shop/music pages, polishing the gallery styling,', { align: 'center' });
doc.text('and adding interactive features like terminal commands and more glitch effects.', { align: 'center' });

doc.moveDown(1);
doc
  .fontSize(8)
  .fillColor(colors.terminalGreen)
  .text('[ mu1ti.p@ss ] root - Generated by Claude Code', { align: 'center' });

// Finalize PDF
doc.end();

console.log(`✅ PDF generated successfully: ${outputPath}`);
