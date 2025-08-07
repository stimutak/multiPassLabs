# Schema Sync Check Hook

## Description
Automatically run database push and regenerate Prisma client when the Prisma schema is modified to keep database schema in sync during development.

## Trigger
- **Event**: File Save
- **File Pattern**: `prisma/schema.prisma`

## Actions

### 1. Push Schema to Database
```bash
npm run db:push
```

### 2. Regenerate Prisma Client
```bash
npx prisma generate
```

### 3. Validate Schema
- Check for syntax errors in the schema
- Verify all required fields are present
- Ensure entityId fields exist for Post and GalleryItem models

## Success Criteria
- Database schema successfully updated
- Prisma client regenerated without errors
- Schema validation passes

## Error Handling
- If db:push fails, show database connection or schema errors
- If generation fails, display Prisma client generation errors
- Suggest rollback if schema changes break existing data

## Safety Checks
- Warn if schema changes might cause data loss
- Confirm destructive changes before proceeding
- Backup recommendations for production schemas

## Benefits
- Keeps database schema in sync during development
- Prevents runtime errors from schema mismatches
- Automates tedious database maintenance tasks