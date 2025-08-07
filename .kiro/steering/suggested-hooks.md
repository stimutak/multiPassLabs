# Suggested Agent Hooks

Based on the project requirements and development workflow, here are recommended agent hooks that would improve the development experience:

## Code Quality Hooks

### Pre-Commit Quality Check
**Trigger:** When a user saves any TypeScript/JavaScript file
**Action:** Run linting, type checking, and format code automatically
**Commands:**
```bash
npm run lint
npm run typecheck  
npm run format
```
**Benefit:** Ensures code quality standards before commits

### Translation Key Validator
**Trigger:** When a user saves a React component file
**Action:** Scan for hardcoded strings and suggest translation keys
**Logic:** Check for JSX text content that doesn't use `t()` function
**Benefit:** Enforces internationalization requirements

## Database Development Hooks

### Schema Sync Check
**Trigger:** When prisma/schema.prisma is modified
**Action:** Automatically run `npm run db:push` and regenerate Prisma client
**Benefit:** Keeps database schema in sync during development

### Entity ID Validator
**Trigger:** When creating/editing Post or GalleryItem models
**Action:** Ensure entityId field is properly set with valid lab entity
**Benefit:** Maintains lab entity attribution system integrity

## Testing Hooks

### Component Test Generator
**Trigger:** When a new React component is created in components/
**Action:** Generate basic test file template with component imports
**Benefit:** Encourages test-driven development

### API Route Test Runner
**Trigger:** When API route files are modified in app/api/
**Action:** Run relevant API tests and check for proper error handling
**Benefit:** Ensures API reliability and security

## Lab Entity System Hooks

### Entity Attribution Assistant
**Trigger:** When creating new blog posts or gallery items
**Action:** Suggest random lab entity assignment with preview of signature/color
**Benefit:** Streamlines content creation with proper entity attribution

### Terminal Aesthetic Checker
**Trigger:** When modifying CSS or component styles
**Action:** Verify adherence to dark terminal aesthetic (black backgrounds, green text, etc.)
**Benefit:** Maintains consistent visual identity

## Performance Hooks

### Bundle Size Monitor
**Trigger:** When adding new dependencies or large assets
**Action:** Check bundle size impact and suggest optimizations
**Benefit:** Maintains performance targets (< 2s load time)

### Image Optimization
**Trigger:** When images are added to public/ directory
**Action:** Automatically optimize images and suggest Next.js Image component usage
**Benefit:** Improves site performance and user experience

## Security Hooks

### Environment Variable Checker
**Trigger:** When .env files are modified
**Action:** Verify all required environment variables are present and properly formatted
**Benefit:** Prevents deployment issues and security misconfigurations

### Stripe Integration Validator
**Trigger:** When Stripe-related code is modified
**Action:** Check for proper webhook verification and secure API key usage
**Benefit:** Ensures payment security compliance

## Internationalization Hooks

### Translation File Sync
**Trigger:** When translation keys are extracted
**Action:** Update all locale files (en, es) with new keys and placeholder values
**Benefit:** Keeps translations synchronized across languages

### Locale Route Checker
**Trigger:** When new pages are added to app/[locale]/
**Action:** Verify proper locale handling and translation usage
**Benefit:** Ensures internationalization works correctly

## Implementation Priority

1. **High Priority:** Pre-commit quality check, Translation key validator
2. **Medium Priority:** Schema sync check, Entity attribution assistant
3. **Low Priority:** Bundle size monitor, Image optimization

These hooks would significantly improve development velocity while maintaining code quality and project-specific requirements.