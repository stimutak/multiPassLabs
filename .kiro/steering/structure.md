# Project Structure & Organization

## Root Directory Structure
```
multiPassLabs/
├── app/                    # Next.js App Router
├── components/            # Reusable UI components
├── lib/                   # Core utilities and configurations
├── store/                # Redux store and slices
├── styles/               # Global CSS styles
├── locales/              # Translation files (en, es)
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── i18n/                 # Internationalization config
```

## App Router Structure (`app/`)
- **`[locale]/`** - Internationalized routes (en, es)
  - **`about/`**, **`blog/`**, **`gallery/`**, **`music/`**, **`shop/`** - Feature pages
  - **`admin/`** - Admin panel routes
  - **`layout.tsx`** - Locale-specific layout
  - **`page.tsx`** - Home page
- **`api/`** - API routes
  - **`auth/`** - NextAuth endpoints
  - **`gallery/`**, **`posts/`**, **`stripe/`** - Feature APIs

## Components Structure (`components/`)
- **`ui/`** - Base UI components (Button, Card, Header, etc.)
- **`gallery/`**, **`shop/`**, **`interactive/`** - Feature-specific components
- **`client-layout.tsx`** - Client-side layout wrapper
- **`providers.tsx`** - Context providers

## Library Structure (`lib/`)
- **`auth.ts`** - NextAuth configuration
- **`db.ts`** - Prisma client setup
- **`entities.ts`** - Business entity definitions
- **`stripe.ts`** - Stripe configuration
- **`utils.ts`** - Utility functions
- **`hooks/`** - Custom React hooks

## Store Structure (`store/`)
- **`store.ts`** - Redux store configuration
- **`hooks.ts`** - Typed Redux hooks
- **`slices/`** - Redux slices (auth, cart, ui)

## Static Assets (`public/`)
- **`images/`** - Image assets (gallery, shop, icons)
- **`audio/`** - Audio files for music platform
- **`fonts/`** - Custom font files

## Key Conventions

### File Naming
- **Components**: PascalCase (e.g., `Button.tsx`, `PostCard.tsx`)
- **Pages**: lowercase (e.g., `page.tsx`, `layout.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`, `auth.ts`)
- **API routes**: lowercase (e.g., `route.ts`)

### Import Patterns
- Use `@/` alias for root imports: `import { Button } from '@/components/ui/button'`
- Relative imports for same-level files
- Group imports: external libraries, internal modules, relative imports

### Component Organization
- One component per file
- Export component as default
- Co-locate types and interfaces with components
- Use `cn()` utility for conditional classes

### Internationalization
- All user-facing text must use translation keys
- Translation files in `locales/[locale]/[namespace].json`
- Server components: `getTranslations()`
- Client components: `useTranslations()`

### Database Models
- Prisma schema in `prisma/schema.prisma`
- Models: User, Product, Order, Post, GalleryItem, Category
- Use `entityId` field to link content to lab entities

### API Routes
- RESTful conventions
- Use TypeScript for request/response types
- Handle errors consistently
- Validate input data