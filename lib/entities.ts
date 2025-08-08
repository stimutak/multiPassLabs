/**
 * Lab Entity System for Multipass Labs
 * Each entity represents a mysterious persona that creates content
 */

export interface LabEntity {
  id: string;
  name: string;
  signature: string;
  version: string;
  color: string;
  role: string;
  glitchPattern?: string;
  animation?: 'oscilloscope' | 'circuitTraces' | 'hexWaterfall' | 'glitchGrid' | 'waveInterference' | 'feedbackLoop' | 'softParticles' | 'corruptedTerminal' | 'flowField' | 'allGlitch';
}

export const LAB_ENTITIES: LabEntity[] = [
  {
    id: 'null-form',
    name: 'nU11.form',
    signature: '[nU11.form]',
    version: 'v0.3a',
    color: '#00f4ff',
    role: 'Logic-melting glitch theorist',
    glitchPattern: '█▓▒░',
    animation: 'glitchGrid'
  },
  {
    id: 'drexom',
    name: 'drex:0m',
    signature: '[drex:0m]',
    version: 'b01',
    color: '#9b59ff',
    role: 'Structural rewriter/chaos mapper',
    glitchPattern: '◢◤◥◣',
    animation: 'circuitTraces'
  },
  {
    id: 'noize-path',
    name: 'noize.p4th',
    signature: '[noize.p4th]',
    version: '//dev.05',
    color: '#59ff6d',
    role: 'Audio-reactive tactician',
    glitchPattern: '∿∿∿',
    animation: 'oscilloscope'
  },
  {
    id: 'xeno-form',
    name: 'x3n0.form',
    signature: '[x3n0.form]',
    version: '∆x.14',
    color: '#0078f2',
    role: 'Generative alien artifacts expert',
    glitchPattern: '⟨⟩⟪⟫',
    animation: 'hexWaterfall'
  },
  {
    id: 'filament',
    name: 'ƒ1lament',
    signature: '[ƒ1lament]',
    version: 'v1.0a',
    color: '#d982ff',
    role: 'Delicate waveform sculptor',
    glitchPattern: '≈≋≈'
  },
  {
    id: 'sub-signal',
    name: '5ub.signal',
    signature: '[5ub.signal]',
    version: '.sig/3.3',
    color: '#ffe95c',
    role: 'Feedback manipulator',
    glitchPattern: '◉◎◉'
  },
  {
    id: 'iris-fade',
    name: '1r1s.fade',
    signature: '[1r1s.fade]',
    version: '::OBSCURA',
    color: '#ffa4f9',
    role: 'Cinematic ghost of soft light',
    glitchPattern: '░▒▓'
  },
  {
    id: 'ctrl-noir',
    name: 'ctrlN0!r',
    signature: '[ctrlN0!r]',
    version: 'CRL/09',
    color: '#ff5566',
    role: 'Interface saboteur',
    glitchPattern: '▪▫▪'
  },
  {
    id: 'node-state',
    name: 'NØD3//STATE',
    signature: '[NØD3//STATE]',
    version: '07_hz',
    color: '#58d2bf',
    role: 'Topological flow architect',
    glitchPattern: '⌬⌬⌬'
  },
  {
    id: 'multipass',
    name: 'mu1ti.p@ss',
    signature: '[mu1ti.p@ss]',
    version: 'root',
    color: '#dddddd',
    role: 'Meta-entity/master access',
    glitchPattern: '░░░'
  }
];

/**
 * Get a random lab entity
 */
export function getRandomEntity(): LabEntity {
  const randomIndex = Math.floor(Math.random() * LAB_ENTITIES.length);
  return LAB_ENTITIES[randomIndex] || LAB_ENTITIES[0] || LAB_ENTITIES.find(() => true)!;
}

/**
 * Get entity by ID
 */
export function getEntityById(id: string): LabEntity | undefined {
  return LAB_ENTITIES.find(entity => entity.id === id);
}

/**
 * Format entity signature with version
 */
export function formatEntitySignature(entity: LabEntity): string {
  return `${entity.signature} ${entity.version}`;
}

/**
 * Generate a glitched version of text using entity pattern
 */
export function glitchText(text: string, entity: LabEntity): string {
  if (!entity.glitchPattern) return text;
  
  const pattern = entity.glitchPattern.split('');
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    if (Math.random() > 0.8) {
      result += pattern[Math.floor(Math.random() * pattern.length)];
    } else {
      result += text[i];
    }
  }
  
  return result;
}

/**
 * CSS custom properties for entity theming
 */
export function getEntityCSSVars(entity: LabEntity): Record<string, string> {
  return {
    '--entity-color': entity.color,
    '--entity-color-dim': entity.color + '33',
    '--entity-color-bright': entity.color + 'ff',
    '--entity-glow': `0 0 20px ${entity.color}66`,
  };
}