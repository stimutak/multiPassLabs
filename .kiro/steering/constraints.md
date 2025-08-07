# Development Constraints & Guidelines

## Critical Rules - READ BEFORE ANY CODE CHANGES

### File Management
- **NEVER** create "enhanced", "improved", "v2", or "fixed" versions of files
- **ALWAYS** modify existing files rather than creating duplicates
- **SEARCH FIRST** - Check if functionality exists before creating new files
- **FIX IN PLACE** - Extend/modify existing files instead of duplicating

### Code Philosophy
- Keep implementations simple - no unnecessary abstractions
- No event emitters, custom pools, or over-engineering
- Follow established patterns consistently
- Document why if a new file is absolutely required

## Security Requirements

### Mandatory Security Checklist
- [ ] All user input sanitized
- [ ] SQL queries use Prisma (parameterized)
- [ ] Authentication required for admin routes
- [ ] CSRF protection enabled
- [ ] Environment variables never exposed
- [ ] Stripe webhooks verified
- [ ] File uploads validated and sanitized
- [ ] Rate limiting on API routes

## Internationalization Rules

### ALL Text Must Use Translation Keys
```tsx
// ✅ CORRECT
const t = useTranslations('common');
<Button>{t('submit')}</Button>

// ❌ WRONG
<Button>Submit</Button>
```

### Date/Time Formatting
```tsx
// ✅ CORRECT
format(date, 'PP', { locale: dateLocale })

// ❌ WRONG
date.toLocaleDateString('en-US')
```

## Testing Requirements

### Before ANY Commit
1. `npm run lint` - Must pass
2. `npm run typecheck` - Must pass  
3. `npm run test` - Must pass
4. Manual mobile viewport testing

### For New Features
- Unit tests required for utilities
- Component tests for UI components
- E2E tests for critical user flows

## Design Principles

1. **Mobile-First Responsive** - Test smallest screen first
2. **Accessibility** - Keyboard navigation, ARIA labels, contrast ratios
3. **Performance** - Lazy load images, code split routes, optimize bundles
4. **Dark Terminal Aesthetic** - Black backgrounds, green phosphor text
5. **International** - RTL support, locale-specific formatting

## Common Mistakes to Avoid

1. Creating new files instead of modifying existing ones
2. Hardcoding strings instead of using translations
3. Adding complex abstractions for simple features
4. Forgetting mobile/responsive testing
5. Mixing concerns (business logic in components)
6. Creating "enhanced" versions of existing code
7. Skipping tests "just this once"
8. Using console.log instead of proper logging

## Remember: "The best code is often the code you don't write."