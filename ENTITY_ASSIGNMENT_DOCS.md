# Entity Assignment System Documentation

## Overview

The Multipass Labs blog system uses a sophisticated entity assignment mechanism that attributes each blog post to one of the 10 lab entities. This system provides both automatic pseudo-random assignment and manual override capabilities.

## The 10 Lab Entities

| Entity | ID | Signature | Role | Expertise Areas |
|--------|----|-----------|----|-----------------|
| nU11.form | `null-form` | [nU11.form] v0.3a | Logic-melting glitch theorist | Glitch art, experimental systems |
| drex:0m | `drex-0m` | [drex:0m] b01 | Structural rewriter/chaos mapper | Code architecture, system design |
| noize.p4th | `noise-path` | [noize.p4th] //dev.05 | Audio-reactive tactician | Audio, sound synthesis, DSP, music |
| x3n0.form | `xeno-form` | [x3n0.form] ∆x.14 | Generative alien artifacts expert | AI, ML, neural networks, generative art |
| ƒ1lament | `filament` | [ƒ1lament] v1.0a | Delicate waveform sculptor | Shaders, graphics, WebGL, visual effects |
| 5ub.signal | `sub-signal` | [5ub.signal] .sig/3.3 | Feedback manipulator | Signal processing, feedback systems |
| 1r1s.fade | `iris-fade` | [1r1s.fade] ::OBSCURA | Cinematic ghost of soft light | Cinematics, lighting, atmospheric effects |
| ctrlN0!r | `ctrl-noir` | [ctrlN0!r] CRL/09 | Interface saboteur | UI/UX, frontend, CSS, interface design |
| NØD3//STATE | `node-state` | [NØD3//STATE] 07_hz | Topological flow architect | Data flow, state management, architecture |
| mu1ti.p@ss | `multi-pass` | [mu1ti.p@ss] root | Meta-entity/master access | System administration, meta topics |

## Assignment Methods

### 1. Automatic Seeded Random Assignment

The default method uses a deterministic hash function to create consistent pseudo-random assignments:

```typescript
entityId: getSeededEntityId('your-unique-post-slug')
```

**How it works:**
- Takes the post slug as a seed
- Generates a hash from the string
- Maps the hash to one of the 10 entities
- Always returns the same entity for the same slug
- Different slugs appear randomly distributed across entities

**Example:**
```typescript
{
  id: '2',
  title: 'Building Audio-Reactive Visuals',
  slug: 'audio-reactive-visuals-guide',
  entityId: getSeededEntityId('audio-reactive-visuals-guide'), // Auto-assigns consistently
  // ... rest of post
}
```

### 2. Tag-Based Smart Assignment

Uses post tags to automatically assign the most appropriate entity based on expertise:

```typescript
entityId: getPostEntityId('post-slug', ['audio', 'synthesis'])
```

**Current Expertise Mapping:**
```typescript
const ENTITY_EXPERTISE: Record<string, string[]> = {
  'noise-path': ['audio', 'sound', 'music', 'synthesis', 'dsp'],
  'xeno-form': ['generative', 'ai', 'ml', 'neural', 'gan'],
  'ctrl-noir': ['ui', 'interface', 'frontend', 'css', 'design'],
  'filament': ['shaders', 'graphics', 'webgl', 'three', 'visual'],
  // Add more as you define entity specialties
};
```

**How it works:**
- Checks if any post tags match an entity's expertise keywords
- If match found, assigns that expert entity
- If no match, falls back to seeded random assignment
- First matching entity wins if multiple matches exist

**Example:**
```typescript
{
  id: '3',
  title: 'WebGL Shader Techniques',
  slug: 'webgl-shader-techniques',
  tags: ['webgl', 'shaders', 'graphics'],
  entityId: getPostEntityId('webgl-shader-techniques', ['webgl', 'shaders', 'graphics']),
  // Will auto-assign to 'filament' based on expertise
}
```

### 3. Manual Override Assignment

Directly specify which entity should author a post:

```typescript
entityId: 'xeno-form' // Manual assignment to x3n0.form
```

**When to use:**
- You want specific entity attribution regardless of tags
- You're establishing an entity's expertise area
- You want to balance entity distribution
- The post covers multiple expertise areas

**Example:**
```typescript
{
  id: '1',
  title: 'GPT-5 in Codex CLI',
  slug: 'gpt5-codex-cli-macos-update',
  entityId: 'xeno-form', // Manually assigned to AI expert
  tags: ['GPT-5', 'AI', 'CLI'],
  // ... rest of post
}
```

## Implementation Details

### The Hash Function

Located in `/lib/blog-data.ts`:

```typescript
function getSeededEntityId(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  const entityIndex = Math.abs(hash) % LAB_ENTITIES.length;
  return LAB_ENTITIES[entityIndex]?.id || 'null-form';
}
```

### Adding New Expertise Areas

To define or update entity expertise, edit the `ENTITY_EXPERTISE` object in `/lib/blog-data.ts`:

```typescript
const ENTITY_EXPERTISE: Record<string, string[]> = {
  'noise-path': ['audio', 'sound', 'music', 'synthesis', 'dsp', 'max-msp'],
  'xeno-form': ['generative', 'ai', 'ml', 'neural', 'gan', 'gpt', 'llm'],
  // ... add more keywords as needed
};
```

## Best Practices

### 1. Consistency First
- Always use the same assignment method for a post
- Don't change entity assignment after publishing (breaks immersion)
- Use slugs as seeds (they're unique and stable)

### 2. Building Entity Personalities
- Start with random assignment to establish diversity
- Gradually identify expertise areas through content
- Update `ENTITY_EXPERTISE` as patterns emerge
- Use manual overrides to reinforce specializations

### 3. Hydration Safety
- Never use `Math.random()` directly
- Always use deterministic functions
- Use static dates, not `new Date()`
- Test builds to catch hydration mismatches

### 4. Entity Distribution
- Monitor entity usage to ensure balanced representation
- Use manual overrides if one entity is over/underrepresented
- Consider entity "availability" in your narrative

## Common Patterns

### New Blog Post with Auto-Assignment
```typescript
{
  id: '4',
  title: 'Your Post Title',
  slug: 'your-post-slug',
  entityId: getSeededEntityId('your-post-slug'),
  tags: ['your', 'tags'],
  published: true,
  featured: false,
  createdAt: '2025-01-10T12:00:00.000Z',
  updatedAt: '2025-01-10T12:00:00.000Z',
  excerpt: 'Post excerpt...',
  content: `Post content...`
}
```

### New Blog Post with Smart Assignment
```typescript
{
  id: '5',
  title: 'Advanced Audio Synthesis',
  slug: 'advanced-audio-synthesis',
  entityId: getPostEntityId('advanced-audio-synthesis', ['audio', 'synthesis']),
  tags: ['audio', 'synthesis', 'dsp'],
  // ... will auto-assign to noise-path
}
```

### New Blog Post with Manual Assignment
```typescript
{
  id: '6',
  title: 'The Collective Speaks',
  slug: 'collective-announcement',
  entityId: 'multi-pass', // Root entity for meta topics
  tags: ['announcement', 'collective'],
  // ... manually assigned to mu1ti.p@ss
}
```

## Troubleshooting

### Hydration Errors
**Problem:** "Hydration failed because the server rendered text didn't match"

**Solution:** 
- Ensure you're not using `Math.random()` or `new Date()`
- Use the deterministic functions provided
- Check that entity IDs are spelled correctly

### Wrong Entity Assignment
**Problem:** Post assigned to unexpected entity

**Solution:**
- Check if tags match any expertise keywords
- Verify the slug is unique (same slug = same entity)
- Consider using manual override for specific attribution

### Entity Not Found
**Problem:** Entity shows as [UNKNOWN]

**Solution:**
- Verify entity ID matches exactly (case-sensitive)
- Check that entity exists in LAB_ENTITIES array
- Use fallback: `|| 'null-form'` in assignment

## Future Enhancements

### Planned Features
1. **Entity Collaboration**: Posts co-authored by multiple entities
2. **Entity Moods**: Different writing styles based on entity state
3. **Temporal Assignment**: Entity availability based on time/date
4. **Weighted Distribution**: Control entity appearance frequency
5. **Dynamic Expertise**: Entities learn new areas over time

### Potential Improvements
- Cache hash calculations for performance
- Add entity dialogue/personality snippets
- Create entity interaction system for comments
- Implement entity-specific post styling
- Add entity activity logs/timelines

## Migration Guide

### From Random to Deterministic
If you have existing posts using `Math.random()`:

1. Choose assignment method for each post
2. Replace `getRandomEntityId()` with appropriate function
3. Test build for hydration errors
4. Commit with static entity assignments

### Adding Expertise
When an entity develops a specialty:

1. Identify common tags/keywords
2. Add to `ENTITY_EXPERTISE` mapping
3. Optionally migrate related posts to use smart assignment
4. Document the entity's expertise in this file

## API Reference

### Functions

#### `getSeededEntityId(seed: string): string`
Returns deterministic entity ID based on seed string.

#### `getPostEntityId(slug: string, tags?: string[]): string`
Returns entity ID based on expertise matching or seeded random.

#### `getEntityById(id: string): LabEntity | undefined`
Returns full entity object by ID (from `/lib/entities.ts`).

### Types

```typescript
interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  featured: boolean;
  published: boolean;
  entityId: string; // Lab entity ID
  tags: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

interface LabEntity {
  id: string;
  name: string;
  signature: string;
  version: string;
  color: string;
  role: string;
  glitchPattern?: string;
  animation?: string;
}
```

## Contact

For questions about entity assignment or to suggest expertise mappings, consult the collective consciousness at `/dev/null` or raise an issue in the astral plane.

---

*Document generated by [mu1ti.p@ss] root - Meta-entity/master access*
*Last updated: 2025-01-09T12:00:00.000Z*