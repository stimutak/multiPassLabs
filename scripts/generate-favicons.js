#!/usr/bin/env node

/**
 * Script to generate favicon PNGs from SVG
 * Run: node scripts/generate-favicons.js
 * 
 * Note: Requires sharp package (npm install --save-dev sharp)
 * If sharp is not available, use an online converter or image editor
 */

const fs = require('fs');
const path = require('path');

console.log('=================================');
console.log('FAVICON GENERATION INSTRUCTIONS');
console.log('=================================\n');

console.log('The SVG favicon has been created at: public/favicon.svg\n');

console.log('To generate PNG versions, you have several options:\n');

console.log('Option 1: Use an online converter');
console.log('  1. Go to https://cloudconvert.com/svg-to-png');
console.log('  2. Upload public/favicon.svg');
console.log('  3. Generate these sizes:');
console.log('     - 16x16 (save as favicon-16.png)');
console.log('     - 32x32 (save as favicon-32.png)');
console.log('     - 192x192 (save as favicon-192.png)');
console.log('     - 512x512 (save as favicon-512.png)');
console.log('     - 180x180 (save as apple-touch-icon.png)');
console.log('  4. Save all files to the public/ directory\n');

console.log('Option 2: Use ImageMagick (if installed)');
console.log('  Run these commands from project root:');
console.log('  convert public/favicon.svg -resize 16x16 public/favicon-16.png');
console.log('  convert public/favicon.svg -resize 32x32 public/favicon-32.png');
console.log('  convert public/favicon.svg -resize 192x192 public/favicon-192.png');
console.log('  convert public/favicon.svg -resize 512x512 public/favicon-512.png');
console.log('  convert public/favicon.svg -resize 180x180 public/apple-touch-icon.png\n');

console.log('Option 3: Use a design tool');
console.log('  Open public/favicon.svg in Figma, Sketch, or Adobe Illustrator');
console.log('  Export at the required sizes listed above\n');

console.log('For the ICO file:');
console.log('  1. Go to https://www.favicon-generator.org/');
console.log('  2. Upload the 512x512 PNG');
console.log('  3. Download the generated favicon.ico');
console.log('  4. Place it in the public/ directory\n');

console.log('=================================');
console.log('The terminal-style favicon features:');
console.log('- Green phosphor text (#00ff00)');
console.log('- Black terminal background');
console.log('- "MPL" text with glitch effect');
console.log('- Blinking cursor animation');
console.log('- Scanline effects');
console.log('- Terminal window brackets');
console.log('=================================');