# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚨 CRITICAL: READ BEFORE ANY CODE CHANGES

**Project:** Multipass Labs - Experimental collective platform for audio-reactive visuals and generative art  
**Stack:** Next.js 14+, TypeScript, PostgreSQL, Stripe  
**Goal:** Dark, glitchy terminal-aesthetic platform operated by 10 mysterious lab entities showcasing experiments in TouchDesigner, Notch, Max/MSP, SuperCollider, and web-based generative art

## ⚡ Quick Reference Commands

```bash
# Development
npm run dev              # Start development server (port 3002)
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run format          # Run Prettier
npm run typecheck       # Run TypeScript compiler check

# Database
npm run db:push         # Push Prisma schema to database
npm run db:migrate      # Run database migrations
npm run db:studio       # Open Prisma Studio
npm run db:seed         # Seed database with test data

# Testing
npm run test            # Run unit tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
npm run e2e             # Run end-to-end tests
npm run e2e:ui          # Run e2e tests with UI

# i18n
npm run i18n:extract    # Extract translation keys
npm run i18n:compile    # Compile translation files
```

## 🛑 MANDATORY CONSTRAINTS

### Before Writing ANY Code:

1. **SEARCH FIRST** - Always check if functionality exists before creating new files
2. **NO ENHANCED VERSIONS** - Never create `*-enhanced.js`, `*-improved.js`, `*-v2.js` files
3. **FIX IN PLACE** - Modify existing files rather than creating duplicates
4. **KEEP IT SIMPLE** - No event emitters, custom pools, or unnecessary abstractions
5. **USE EXISTING PATTERNS** - Follow established conventions consistently

### File Creation Rules:
- ❌ NEVER create new files unless absolutely necessary
- ❌ NEVER create duplicate implementations
- ✅ ALWAYS extend/modify existing files
- ✅ ALWAYS document why if new file is required

## 🏗️ Architecture Overview

```
multiPassLabs/
├── app/                    # Next.js 14 App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── layout.tsx     # Root layout with providers
│   │   ├── page.tsx       # Homepage
│   │   ├── shop/          # E-commerce pages
│   │   ├── gallery/       # Art gallery
│   │   ├── music/         # Music/audio experiences
│   │   └── admin/         # Admin panel (protected)
│   └── api/               # API routes
│       ├── auth/          # NextAuth endpoints
│       ├── stripe/        # Payment webhooks
│       └── trpc/          # tRPC API (if used)
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── shop/             # E-commerce components
│   ├── gallery/          # Gallery components
│   └── interactive/      # Three.js/p5.js components
├── lib/                   # Core utilities
│   ├── db.ts             # Prisma client
│   ├── stripe.ts         # Stripe configuration
│   └── auth.ts           # Auth utilities
├── store/                # Redux store
│   ├── slices/           # Redux slices
│   │   ├── authSlice.ts  # Authentication state
│   │   ├── cartSlice.ts  # Shopping cart
│   │   └── uiSlice.ts    # UI state (theme, modals)
│   └── store.ts          # Store configuration
├── styles/               # Global styles
├── locales/              # Translation files
├── prisma/               # Database schema
└── public/               # Static assets
```

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + CSS Modules for complex components
- **State:** Redux Toolkit (NO Zustand in parallel)
- **i18n:** next-intl (all strings must use translation keys)
- **Interactive:** Three.js/p5.js in isolated components only

### Backend
- **API:** Next.js API routes (RESTful)
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** NextAuth.js with JWT
- **Payments:** Stripe (official SDK only)
- **File Storage:** AWS S3 or Cloudinary

### DevOps
- **Testing:** Jest + React Testing Library + Playwright
- **Linting:** ESLint (Next.js config) + Prettier
- **CI/CD:** GitHub Actions
- **Deployment:** Vercel or Railway

## 📏 Coding Standards

### TypeScript
```typescript
// ✅ GOOD: Simple, typed, reusable
export function formatPrice(cents: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD'
  }).format(cents / 100);
}

// ❌ BAD: Over-engineered
export class PriceFormatterFactory {
  private static instance: PriceFormatterFactory;
  // ... unnecessary complexity
}
```

### Components
```tsx
// ✅ GOOD: Simple, focused component
export function ProductCard({ product, locale }: Props) {
  const t = useTranslations('shop');
  return (
    <article className="rounded-lg border p-4">
      <h3>{product.title[locale]}</h3>
      <p>{formatPrice(product.price, locale)}</p>
      <Button>{t('addToCart')}</Button>
    </article>
  );
}

// ❌ BAD: Mixed concerns, hardcoded strings
export function ProductCardEnhanced({ product, onBuy }) {
  // Database queries in component
  // Hardcoded "Add to Cart" text
  // Complex business logic
}
```

### State Management
```typescript
// ✅ GOOD: Use existing slice
import { cartSlice } from '@/store/slices/cartSlice';

// ❌ BAD: Creating duplicate slice
import { enhancedCartSlice } from '@/store/slices/enhancedCartSlice';
```

## 🌍 Internationalization Requirements

### MANDATORY for ALL text:
```tsx
// ✅ GOOD
const t = useTranslations('common');
<Button>{t('submit')}</Button>

// ❌ BAD
<Button>Submit</Button>
```

### Date/Time Formatting:
```tsx
// ✅ GOOD
format(date, 'PP', { locale: dateLocale })

// ❌ BAD
date.toLocaleDateString('en-US')
```

## 🔒 Security Checklist

- [ ] All user input sanitized
- [ ] SQL queries use Prisma (parameterized)
- [ ] Authentication required for admin routes
- [ ] CSRF protection enabled
- [ ] Environment variables never exposed
- [ ] Stripe webhooks verified
- [ ] File uploads validated and sanitized
- [ ] Rate limiting on API routes

## 🎨 Design Principles

1. **Mobile-First Responsive** - Test on smallest screen first
2. **Accessibility** - Keyboard navigation, ARIA labels, contrast ratios
3. **Performance** - Lazy load images, code split routes, optimize bundles
4. **Immersive** - Clean, minimal UI that highlights artwork
5. **International** - RTL support, locale-specific formatting

## 🎭 Loading Experience & Lab Entity System

### ASCII Boot Sequence (Terminal Style)
The site opens with a glitchy terminal boot sequence that establishes the mysterious lab atmosphere:

1. **Visual Design**:
   - Pure black background (#000000)
   - Green phosphor terminal text (#00ff00)
   - Matrix rain effect in background (opacity 10%)
   - ASCII art logo for Multipass Labs
   - Glitch effects and scanlines
   - Richard Devine-inspired audio (optional toggle)

2. **Boot Sequence Phases**:
   - **Phase 1 - Boot**: "[SYSTEM] Booting MultiPass Labs v1.0.0..."
   - **Phase 2 - System**: Progressive system checks with entity signatures
   - **Phase 3 - Logo**: ASCII art reveal with "Press any key to continue..."
   - **Phase 4 - Ready**: "WELCOME - Entering the multiverse..."

3. **Lab Entities (10 Personas)**:
   Each post is randomly attributed to one of these entities:
   
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

4. **Implementation Components**:
   - `components/ui/startup-intro.tsx` - ASCII boot sequence
   - `lib/entities.ts` - Lab entity definitions and logic
   - `lib/audio/glitch-audio.ts` - Richard Devine-style sound generation
   - `styles/terminal.css` - Terminal-specific styles

5. **Entity Attribution System**:
   - Random assignment on post creation
   - Manual override option in post editor
   - Entity signature appears with posts
   - Accent color highlights on cards/buttons
   - Version tags like [sig/3.3] in metadata

## 🧪 Testing Requirements

### Before ANY commit:
1. Run `npm run lint` - Must pass
2. Run `npm run typecheck` - Must pass
3. Run `npm run test` - Must pass
4. Test manually on mobile viewport

### For new features:
- Unit tests required for utilities
- Component tests for UI components
- E2E tests for critical user flows

## 📋 PR Checklist

Before requesting review:
- [ ] No new "enhanced" versions created
- [ ] No duplicate files with -fixed, -new, -v2 suffixes
- [ ] All strings use translation keys
- [ ] Tests written and passing
- [ ] Mobile responsive verified
- [ ] Accessibility checked
- [ ] No console.logs or debug code
- [ ] Environment variables documented

## 🚀 Deployment

### Environment Variables Required:
```env
# Database
DATABASE_URL=

# Authentication
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Storage
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=

# Email
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

## 🔄 TRANSFORMATION PLAN: Multipass Labs Collective

### Phase 1: Core Infrastructure (Current)
**Owner:** Claude Code
- [ ] Create lab entities data structure (`lib/entities.ts`)
- [ ] Update startup intro with entity signatures
- [ ] Implement glitch audio system (Web Audio API)
- [ ] Create terminal-style CSS framework

### Phase 2: Visual Transformation
**Owner:** Claude Code
- [ ] Convert site to dark terminal aesthetic
- [ ] Replace gradient backgrounds with black/glitch
- [ ] Update typography to monospace/terminal fonts
- [ ] Add scanline and CRT effects

### Phase 3: Entity Attribution System
**Owner:** Task Agent (for complex state management)
- [ ] Create post metadata system for entities
- [ ] Random entity assignment logic
- [ ] Entity signature injection in posts
- [ ] Color accent system per entity

### Phase 4: Content & Pages
**Owner:** Claude Code
- [ ] Update About page with collective lore
- [ ] Create experiments section layout
- [ ] Design history/timeline view
- [ ] Implement blog with entity attribution

### Phase 5: Interactive Features
**Owner:** Task Agent (for performance optimization)
- [ ] Audio toggle in settings
- [ ] Glitch effects on hover
- [ ] Terminal commands easter eggs
- [ ] Entity switching animations

### Deployment Checklist
- [ ] Test all entity attributions
- [ ] Verify audio works across browsers
- [ ] Check mobile terminal experience
- [ ] Performance audit (target <2s load)
- [ ] Accessibility for screen readers

## ❌ Common Mistakes to Avoid

1. **Creating new files instead of modifying existing ones**
2. **Hardcoding strings instead of using translations**
3. **Adding complex abstractions for simple features**
4. **Forgetting mobile/responsive testing**
5. **Mixing concerns (business logic in components)**
6. **Creating "enhanced" versions of existing code**
7. **Skipping tests "just this once"**
8. **Using console.log instead of proper logging**

## 💡 Remember

> "The best code is often the code you don't write."

- Search before creating
- Fix in place
- Keep it simple
- Test thoroughly
- Think internationally