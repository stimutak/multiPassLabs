# AGENTS.md

# Repository Guidelines

Concise contributor guide for the MultiPass Labs Next.js/TypeScript codebase. Follow CLAUDE.md and modify files in place.

## Project Structure & Module Organization
- `app/`: Next.js App Router (routes, layouts, pages). Example: `app/(marketing)/page.tsx`.
- `components/`: Reusable React components (PascalCase files, co-located styles).
- `lib/`: Utilities, API clients, and helpers.
- `store/`: Redux Toolkit slices and setup.
- `prisma/`: Schema and migrations. Seed: `prisma/seed.js`.
- `locales/` and `i18n/`: `next-intl` messages and config.
- `public/` assets, `styles/` Tailwind setup, tests in `__tests__/` or `*.test.tsx` next to source.

## Build, Test, and Development Commands
- `npm run dev`: Start Next.js dev server on port 3002.
- `npm run build`: Production build (`.next/`).
- `npm run start`: Start app via `app.js` in production.
- `npm run lint` / `npm run format`: ESLint and Prettier checks/fixes.
- `npm run typecheck`: TypeScript `--noEmit` strict checking.
- `npm test` / `npm run test:coverage`: Jest unit/component tests (jsdom).
- `npm run e2e`: Playwright E2E tests.
- `npm run db:migrate` / `db:studio`: Prisma migrate and Studio.

## Coding Style & Naming Conventions
- TypeScript strict mode enabled (`tsconfig.json`). Prefer explicit types and `noImplicitReturns`.
- Prettier: 2 spaces, single quotes, trailing commas, width 80.
- ESLint (Next.js + TypeScript). Avoid unused vars; `console` only `warn`/`error`.
- Components and hooks: `PascalCase`/`camelCase`; route segments: `kebab-case`.
- Always use translation keys with `next-intl` (no hardcoded UI strings).

## Testing Guidelines
- Frameworks: Jest + React Testing Library; E2E with Playwright.
- File patterns: `**/__tests__/**/*` and `*.{test,spec}.{ts,tsx}`.
- Coverage target: ≥70% global (branches, functions, lines, statements).
- Example: `npm run test:watch` for local TDD; keep tests colocated when practical.

## Commit & Pull Request Guidelines
- Commits: short, imperative, descriptive (e.g., "Add mobile header"). Reference issues when relevant (`#123`).
- PRs: clear description, linked issue, screenshots for UI changes, test plan, and risk notes.
- Require: passing lint, typecheck, and tests; include i18n updates and migrations if applicable.

## Security & Configuration Tips
- Use `.env` based on `.env.example`; never commit secrets.
- Validate inputs; rely on Prisma to parameterize queries.
- Auth/Payments (NextAuth/Stripe): configure via env vars only.
- Run `npm run i18n:extract` to keep messages in sync.
