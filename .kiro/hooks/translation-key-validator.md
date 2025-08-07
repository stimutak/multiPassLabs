# Translation Key Validator Hook

## Description
Scan React component files for hardcoded strings and suggest translation keys to enforce internationalization requirements.

## Trigger
- **Event**: File Save
- **File Pattern**: `**/*.{tsx,jsx}`

## Actions

### 1. Scan for Hardcoded Strings
Search for JSX text content that doesn't use the `t()` function:
- Look for text between JSX tags: `<div>Hardcoded text</div>`
- Check for hardcoded strings in attributes: `placeholder="Enter text"`
- Ignore strings that are already using `t()` function

### 2. Generate Suggestions
For each hardcoded string found:
- Suggest a translation key based on the context
- Show the correct format: `{t('suggested.key')}`
- Provide the file location and line number

### 3. Check Translation Files
- Verify suggested keys don't already exist in `locales/en/` files
- Suggest appropriate namespace (common, shop, etc.)

## Success Criteria
- Identify all hardcoded user-facing strings
- Provide actionable suggestions for translation keys
- Skip technical strings (class names, IDs, etc.)

## Error Handling
- If translation files are missing, warn the user
- If unable to parse JSX, show parsing error
- Gracefully handle edge cases in string detection

## Benefits
- Enforces internationalization requirements
- Prevents hardcoded strings from reaching production
- Maintains consistency with project i18n standards