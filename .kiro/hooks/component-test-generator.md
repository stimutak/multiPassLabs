# Component Test Generator Hook

## Description
Generate basic test file template with component imports when a new React component is created to encourage test-driven development.

## Trigger
- **Event**: File Creation
- **File Pattern**: `components/**/*.{tsx,jsx}`

## Actions

### 1. Analyze Component
- Extract component name from filename
- Identify props interface if present
- Detect if component uses hooks or context

### 2. Generate Test File
Create `[ComponentName].test.tsx` with:
```typescript
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders without crashing', () => {
    render(<ComponentName />);
  });

  it('displays expected content', () => {
    render(<ComponentName />);
    // Add specific assertions here
  });
});
```

### 3. Add Testing Utilities
Include common testing patterns:
- Mock translation functions if i18n is used
- Mock Redux store if component uses Redux
- Mock Next.js router if needed

## Success Criteria
- Test file created in same directory as component
- Basic test structure includes render test
- Appropriate mocks included based on component dependencies

## Benefits
- Encourages test-driven development
- Provides consistent test structure
- Reduces friction in writing tests