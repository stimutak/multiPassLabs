import { LAB_ENTITIES } from './entities';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  featured: boolean;
  published: boolean;
  entityId: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Get a deterministic "random" entity based on a string seed (like post ID or title)
// This creates consistent pseudo-random assignment
function getSeededEntityId(seed: string): string {
  // Simple hash function to convert string to number
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use the hash to pick an entity
  const entityIndex = Math.abs(hash) % LAB_ENTITIES.length;
  return LAB_ENTITIES[entityIndex]?.id || 'null-form';
}

// Entity expertise mapping (add your overrides here)
const ENTITY_EXPERTISE: Record<string, string[]> = {
  'noise-path': ['audio', 'sound', 'music', 'synthesis', 'dsp'],
  'xeno-form': ['generative', 'ai', 'ml', 'neural', 'gan'],
  'ctrl-noir': ['ui', 'interface', 'frontend', 'css', 'design'],
  'filament': ['shaders', 'graphics', 'webgl', 'three', 'visual'],
  // Add more as you define entity specialties
};

// Get entity ID with optional override based on tags/keywords
function getPostEntityId(slug: string, tags?: string[]): string {
  // Check if any tags match an entity's expertise
  if (tags) {
    for (const [entityId, keywords] of Object.entries(ENTITY_EXPERTISE)) {
      const hasMatch = tags.some(tag => 
        keywords.some(keyword => 
          tag.toLowerCase().includes(keyword)
        )
      );
      if (hasMatch) {
        return entityId; // Override with expert entity
      }
    }
  }
  
  // Fall back to seeded random
  return getSeededEntityId(slug);
}

// Static blog posts
export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'How to Get GPT-5 Running in Codex CLI on macOS (and Fix the "Outdated Version" Trap)',
    content: `## Intro

If you've been using the Codex CLI on macOS and wondering why it doesn't feel like GPT-5 power, you're not alone.
Many devs (myself included) installed Codex months ago, never updated it, and were quietly stuck on an ancient build — even while OpenAI's GitHub repo had jumped way ahead.

The result: a lot of people think Codex is still running the old Codex model from 2021 (fine-tuned GPT-3).
The reality: the new Codex CLI does use GPT-5 when you sign in with a ChatGPT Plus/Pro/Team account — but only if you're on the latest CLI release.

---

## The Misconception

Older Codex CLI versions (e.g. v0.10.0) still run, but they miss newer features, bug fixes, and in some cases will fail to correctly call the GPT-5 endpoints.
If you're stuck on one of these, you'll never see the full speed, reasoning depth, or coding quality GPT-5 can deliver.

---

## The Problem

When Codex is installed globally with npm, it won't auto-update. If you never explicitly run \`npm install -g @openai/codex@latest\`, you'll keep using the old binary indefinitely.

In my case:

\`\`\`bash
codex --version
# v0.10.0  ← yikes
\`\`\`

Meanwhile, the official repo was already at v0.20.0.

---

## The Solution

Here's how to update Codex CLI on macOS to the latest release and ensure it's GPT-5-ready:

### 1. Check current version

\`\`\`bash
codex --version
\`\`\`

If you see anything less than v0.20.0 (or whatever is current on GitHub), update.

### 2. Update to latest

\`\`\`bash
npm install -g @openai/codex@latest
\`\`\`

### 3. Verify

\`\`\`bash
codex --version
# v0.20.0
\`\`\`

---

## Bonus: Confirm It's Really GPT-5

Once updated, you can run:

\`\`\`bash
codex repl
\`\`\`

Then in the REPL, ask:

> What model are you using?

You should see something like:

> I'm running gpt-5 (2025-xx-xx) through the Codex CLI.

---

## Why This Matters

With GPT-5 under the hood, Codex CLI can:
• Handle more complex multi-file refactors.
• Produce more accurate, reasoning-rich code.
• Integrate seamlessly with the Model Context Protocol (MCP) for tool use.
• Run faster and cheaper than old Codex model calls.

---

## Wrap-Up

If you've been underwhelmed by Codex lately, check your version.
A one-line update could turn it from "meh" to GPT-5-level code generation and debugging instantly.

---

💡 **Pro Tip:** If you also use Cursor or Claude Code, try the same coding prompt across all three — Codex (GPT-5), Cursor (GPT-5 or Claude 4), and Claude Code (Opus 4.1) — and see which one nails your style and workflow.`,
    excerpt: `Many devs installed Codex CLI months ago and never updated it, missing out on GPT-5 power. Here's how to fix that outdated version trap and unlock the full potential of modern AI coding assistance.`,
    slug: 'gpt5-codex-cli-macos-update',
    featured: false,
    published: true,
    entityId: 'xeno-form', // Manual override: x3n0.form handles AI topics
    tags: ['GPT-5', 'Codex', 'CLI', 'macOS', 'development-tools', 'AI'],
    createdAt: '2025-01-09T12:00:00.000Z',
    updatedAt: '2025-01-09T12:00:00.000Z'
  }
];

// Function to get all published posts
export function getPublishedPosts(): BlogPost[] {
  return BLOG_POSTS.filter(post => post.published);
}

// Function to get posts by entity
export function getPostsByEntity(entityId: string): BlogPost[] {
  return BLOG_POSTS.filter(post => post.published && post.entityId === entityId);
}

// Function to get a single post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}

// Function to get featured posts
export function getFeaturedPosts(): BlogPost[] {
  return BLOG_POSTS.filter(post => post.published && post.featured);
}