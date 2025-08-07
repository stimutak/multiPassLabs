# Entity Attribution Assistant Hook

## Description
Suggest random lab entity assignment with preview of signature/color when creating new blog posts or gallery items to streamline content creation.

## Trigger
- **Event**: File Creation
- **File Pattern**: `app/[locale]/blog/**/*.tsx`, `app/[locale]/gallery/**/*.tsx`
- **Manual**: Button click "Assign Lab Entity"

## Actions

### 1. Random Entity Selection
- Select one of the 10 lab entities randomly
- Load entity data from `lib/entities.ts`
- Ensure even distribution over time

### 2. Entity Preview
Show preview with:
- Entity name and signature (e.g., "[nU11.form] v0.3a")
- Entity color swatch
- Entity role description
- Example of how it will appear in the UI

### 3. Manual Override Option
- Provide dropdown to select different entity
- Show all 10 entities with their signatures and colors
- Allow "Random" option to get new random assignment

### 4. Database Integration
- Set entityId field in Post or GalleryItem model
- Validate entityId exists in the entities list
- Store entity assignment with content

## Success Criteria
- Valid entity assigned to new content
- Entity data properly stored in database
- Preview accurately shows final appearance

## Error Handling
- If entities.ts is missing, show error and creation instructions
- If database update fails, show error and retry option
- Gracefully handle invalid entity selections

## Lab Entities Reference
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

## Benefits
- Streamlines content creation with proper entity attribution
- Maintains lab entity system integrity
- Provides visual feedback for entity assignments