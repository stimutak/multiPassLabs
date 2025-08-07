# Technology Stack & Build System

## Core Framework
- **Next.js 15.4.5** with App Router
- **React 19.1.1** with TypeScript 5.9.2
- **Node.js 18+** required

## Styling & UI
- **Tailwind CSS 3.4.17** (v4 not compatible)
- **@tailwindcss/forms** and **@tailwindcss/typography** plugins
- **Radix UI** components with **class-variance-authority** for variants
- **clsx** and **tailwind-merge** for conditional classes
- **Framer Motion** for animations

## State Management & Data
- **Redux Toolkit** for global state
- **Prisma 6.13.0** ORM with PostgreSQL
- **next-intl 4.3.4** for internationalization
- **NextAuth.js 4.24.11** for authentication

## Payments & External Services
- **Stripe 18.4.0** for payment processing
- **AWS S3** or **Cloudinary** for file storage

## Development Tools
- **ESLint** with Next.js config
- **Prettier** for code formatting
- **Jest** with Testing Library for unit tests
- **Playwright** for E2E testing

## Common Commands

### Development
```bash
npm run dev         # Start dev server on port 3002
npm run build       # Build for production
npm run start       # Start production server
```

### Code Quality
```bash
npm run lint        # Run ESLint
npm run format      # Format with Prettier
npm run typecheck   # TypeScript checking
```

### Database
```bash
npm run db:push     # Push schema to database
npm run db:migrate  # Run migrations
npm run db:studio   # Open Prisma Studio
npm run db:seed     # Seed test data
```

### Testing
```bash
npm run test        # Run unit tests
npm run test:watch  # Watch mode
npm run e2e         # E2E tests
npm run e2e:ui      # E2E with UI
```

### Internationalization
```bash
npm run i18n:extract  # Extract translation keys
npm run i18n:compile  # Compile translations
```

## Important Notes
- Default port is **3002** (configurable in package.json)
- Must use Tailwind CSS v3 (v4 has breaking changes)
- Next.js 15 requires async params handling in layouts
- Server components use `getTranslations()`, client components use `useTranslations()`