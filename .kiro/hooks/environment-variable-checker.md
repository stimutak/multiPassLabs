# Environment Variable Checker Hook

## Description
Verify all required environment variables are present and properly formatted when .env files are modified to prevent deployment issues.

## Trigger
- **Event**: File Save
- **File Pattern**: `.env*`, `.env.local`, `.env.example`

## Actions

### 1. Required Variables Check
Verify presence of essential variables:
```env
# Database
DATABASE_URL

# Authentication
NEXTAUTH_URL
NEXTAUTH_SECRET

# Stripe
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# Storage (optional)
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_BUCKET_NAME

# Email (optional)
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
```

### 2. Format Validation
- DATABASE_URL: Valid PostgreSQL connection string
- URLs: Proper HTTP/HTTPS format
- Keys: Appropriate length and format
- Ports: Valid port numbers

### 3. Security Check
- Ensure no secrets in .env.example
- Verify .env files are in .gitignore
- Check for accidentally committed secrets
- Validate key strength where applicable

### 4. Sync Check
- Compare .env with .env.example
- Identify missing variables
- Suggest additions to .env.example for new variables

## Success Criteria
- All required variables present
- Proper formatting validated
- Security best practices followed
- .env and .env.example in sync

## Benefits
- Prevents deployment issues
- Ensures security compliance
- Maintains environment consistency