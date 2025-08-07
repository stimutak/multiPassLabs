# Bundle Size Monitor Hook

## Description
Check bundle size impact and suggest optimizations when adding new dependencies or large assets to maintain performance targets.

## Trigger
- **Event**: File Save
- **File Pattern**: `package.json`, `public/**/*`, `components/**/*.{tsx,jsx}`

## Actions

### 1. Analyze Bundle Impact
```bash
npm run build
npx next-bundle-analyzer
```

### 2. Size Threshold Check
- Warn if total bundle size > 500KB
- Alert if individual chunks > 200KB
- Flag if new dependency adds > 50KB

### 3. Optimization Suggestions
For large bundles, suggest:
- Dynamic imports for heavy components
- Tree shaking opportunities
- Image optimization with Next.js Image
- Code splitting strategies
- Alternative lighter libraries

### 4. Asset Optimization
For new assets in `public/`:
- Check image file sizes
- Suggest WebP conversion for images
- Recommend compression for large files
- Verify proper Next.js Image usage

## Success Criteria
- Bundle size stays under performance targets
- Actionable optimization suggestions provided
- Asset sizes are reasonable for web delivery

## Performance Targets
- Total bundle size: < 500KB
- Individual chunks: < 200KB
- Images: < 1MB each
- Load time: < 2 seconds

## Benefits
- Maintains performance targets (< 2s load time)
- Prevents bundle bloat
- Provides optimization guidance