# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚨 CRITICAL: READ BEFORE ANY CODE CHANGES

**Project:** Custom E-commerce/Art Platform for Oliver's artwork, music, and interactive experiences  
**Stack:** Next.js 14+, TypeScript, PostgreSQL, Stripe  
**Goal:** Immersive, international art platform with real-time visuals and audio-reactive content

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

## 🎭 Loading Experience Guidelines

### Initial Load Screen
The loading screen sets the tone for the entire platform experience:

1. **Visual Design**:
   - Purple/violet gradient background (from-gray-900 via-purple-900 to-violet-900)
   - Dual rotating rings with opposite spin directions
   - Animated floating particles for depth
   - Centered "M" logo with pulsing effect
   - Progress bar with gradient fill

2. **Loading States**:
   - **Initial**: "Preparing your experience..."
   - **Gallery**: "Initializing art gallery..."
   - **Shop**: "Connecting to shop..."
   - **Music**: "Loading audio..."
   - **Complete**: "Ready to explore!"

3. **Animation Timings**:
   - Minimum display: 2 seconds (prevents flash)
   - Message rotation: Every 2 seconds
   - Progress simulation: Smooth with slight randomness
   - Fade transitions: 500ms duration

4. **Implementation Components**:
   - `components/ui/loading.tsx` - Main loading screen
   - `components/client-layout.tsx` - Layout wrapper with loading state
   - `lib/hooks/useLoading.ts` - Loading state management hooks
   - CSS animations in `styles/globals.css`

5. **Best Practices**:
   - Always show loading for data-heavy operations
   - Use skeleton loaders for content areas
   - Implement progressive image loading
   - Maintain loading state during route transitions
   - Respect user's motion preferences (prefers-reduced-motion)

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