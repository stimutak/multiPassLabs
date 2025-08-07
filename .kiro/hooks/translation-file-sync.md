# Translation File Sync Hook

## Description
Update all locale files (en, es) with new keys and placeholder values when translation keys are extracted to keep translations synchronized.

## Trigger
- **Event**: Command Execution
- **Command**: `npm run i18n:extract`
- **Manual**: Button click "Sync Translations"

## Actions

### 1. Extract New Keys
```bash
npm run i18n:extract
```

### 2. Analyze Extracted Keys
- Compare with existing translation files
- Identify new keys that need translation
- Find orphaned keys no longer used

### 3. Update Locale Files
For each new key found:
- Add to `locales/en/[namespace].json` with English text
- Add to `locales/es/[namespace].json` with placeholder: `"[NEEDS TRANSLATION]"`
- Maintain JSON structure and formatting

### 4. Generate Translation Report
Create summary showing:
- New keys added
- Keys needing Spanish translation
- Orphaned keys that can be removed
- Translation completion percentage

## Success Criteria
- All locale files contain same keys
- New keys have appropriate placeholders
- JSON files remain valid
- Translation status is clear

## File Structure
```
locales/
├── en/
│   ├── common.json
│   └── shop.json
└── es/
    ├── common.json
    └── shop.json
```

## Benefits
- Keeps translations synchronized across languages
- Identifies missing translations clearly
- Maintains translation file integrity
- Provides translation progress visibility