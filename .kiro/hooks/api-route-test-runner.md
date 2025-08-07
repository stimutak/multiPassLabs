# API Route Test Runner Hook

## Description
Run relevant API tests and check for proper error handling when API route files are modified to ensure API reliability and security.

## Trigger
- **Event**: File Save
- **File Pattern**: `app/api/**/*.ts`

## Actions

### 1. Identify Related Tests
- Find test files matching the API route pattern
- Look for tests in `__tests__/api/` or `*.test.ts` files
- Map route to corresponding test suite

### 2. Run Specific Tests
```bash
npm test -- --testPathPattern=api/[route-name]
```

### 3. Security Validation
Check for common security patterns:
- Authentication middleware usage
- Input validation with proper sanitization
- Error handling that doesn't leak sensitive info
- Rate limiting implementation
- CORS configuration

### 4. Error Handling Check
Verify proper error responses:
- 400 for bad requests
- 401 for unauthorized
- 403 for forbidden
- 500 for server errors
- Consistent error message format

## Success Criteria
- All related tests pass
- Security checklist items verified
- Error handling follows project standards

## Benefits
- Ensures API reliability and security
- Catches regressions early
- Enforces consistent error handling