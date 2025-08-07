# Pre-Commit Quality Check Hook

## Description
Automatically run linting, type checking, and code formatting when TypeScript/JavaScript files are saved to ensure code quality standards before commits.

## Trigger
- **Event**: File Save
- **File Pattern**: `**/*.{ts,tsx,js,jsx}`

## Actions

### 1. Run ESLint
```bash
npm run lint
```

### 2. Run TypeScript Check
```bash
npm run typecheck
```

### 3. Format Code
```bash
npm run format
```

## Success Criteria
- All three commands must pass without errors
- If any command fails, show the error output to the user
- Only proceed if all checks pass

## Error Handling
- If linting fails: Show specific linting errors and suggest fixes
- If type checking fails: Display TypeScript errors with file locations
- If formatting fails: Show formatting issues and auto-fix if possible

## Benefits
- Ensures code quality standards before commits
- Catches errors early in development
- Maintains consistent code formatting across the project