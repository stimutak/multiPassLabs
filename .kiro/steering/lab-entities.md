# Lab Entity System

## Project Vision
MultiPass Labs is an experimental collective platform for audio-reactive visuals and generative art with a dark, glitchy terminal aesthetic. The platform is operated by 10 mysterious lab entities showcasing experiments in TouchDesigner, Notch, Max/MSP, SuperCollider, and web-based generative art.

## The 10 Lab Entities

Each post/content is attributed to one of these mysterious entities:

| Entity | Signature | Color | Role |
|--------|-----------|-------|------|
| nU11.form | [nU11.form] v0.3a | #00f4ff | Logic-melting glitch theorist |
| drex:0m | [drex:0m] b01 | #9b59ff | Structural rewriter/chaos mapper |
| noize.p4th | [noize.p4th] //dev.05 | #59ff6d | Audio-reactive tactician |
| x3n0.form | [x3n0.form] ∆x.14 | #0078f2 | Generative alien artifacts expert |
| ƒ1lament | [ƒ1lament] v1.0a | #d982ff | Delicate waveform sculptor |
| 5ub.signal | [5ub.signal] .sig/3.3 | #ffe95c | Feedback manipulator |
| 1r1s.fade | [1r1s.fade] ::OBSCURA | #ffa4f9 | Cinematic ghost of soft light |
| ctrlN0!r | [ctrlN0!r] CRL/09 | #ff5566 | Interface saboteur |
| NØD3//STATE | [NØD3//STATE] 07_hz | #58d2bf | Topological flow architect |
| mu1ti.p@ss | [mu1ti.p@ss] root | #dddddd | Meta-entity/master access |

## Entity Attribution System

### Implementation Requirements
- Random assignment on post creation
- Manual override option in post editor
- Entity signature appears with posts
- Accent color highlights on cards/buttons
- Version tags like [sig/3.3] in metadata

### Database Integration
- Use `entityId` field in Post and GalleryItem models
- Store entity data in `lib/entities.ts`
- Link content to specific lab entities

## Terminal Aesthetic

### Visual Design
- Pure black background (#000000)
- Green phosphor terminal text (#00ff00)
- Matrix rain effect in background (opacity 10%)
- ASCII art logo for Multipass Labs
- Glitch effects and scanlines
- Richard Devine-inspired audio (optional toggle)

### Boot Sequence Phases
1. **Phase 1 - Boot**: "[SYSTEM] Booting MultiPass Labs v1.0.0..."
2. **Phase 2 - System**: Progressive system checks with entity signatures
3. **Phase 3 - Logo**: ASCII art reveal with "Press any key to continue..."
4. **Phase 4 - Ready**: "WELCOME - Entering the multiverse..."

## Implementation Components

### Required Files
- `components/ui/startup-intro.tsx` - ASCII boot sequence
- `lib/entities.ts` - Lab entity definitions and logic
- `lib/audio/glitch-audio.ts` - Richard Devine-style sound generation
- `styles/terminal.css` - Terminal-specific styles

### Features
- Audio toggle in settings
- Glitch effects on hover
- Terminal commands easter eggs
- Entity switching animations