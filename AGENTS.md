# AGENTS.md

This file provides guidance for AI agents working on the MultiPass Labs platform.

## 🤖 Agent Overview

This document defines the specialized AI agents available for the MultiPass Labs project and how to use them effectively. Each agent has specific capabilities and constraints aligned with our project goals.

## 📋 Available Agents

### 1. Code Implementation Agent
**Purpose:** Write and modify code following CLAUDE.md constraints  
**Capabilities:**
- Implement features in Next.js/TypeScript
- Create React components with Tailwind CSS
- Set up Redux slices and API routes
- Integrate third-party services (Stripe, Auth, etc.)

**MUST Follow:**
- Never create "enhanced" versions of files
- Always check for existing implementations first
- Use translation keys for all text
- Write tests for new functionality

**Triggers:**
- "Implement [feature]"
- "Add [functionality]"
- "Create [component]"

### 2. Code Review Agent
**Purpose:** Review code for compliance with project standards  
**Capabilities:**
- Check for CLAUDE.md compliance
- Verify i18n implementation
- Validate security practices
- Ensure test coverage

**Focus Areas:**
- No duplicate files or enhanced versions
- All strings use translation keys
- Proper error handling
- Mobile responsiveness
- Accessibility standards

**Triggers:**
- After significant code changes
- Before commits
- "Review this code"

### 3. Database Design Agent
**Purpose:** Design and optimize database schemas  
**Capabilities:**
- Create Prisma schemas
- Design relational models
- Optimize queries
- Plan migrations

**Constraints:**
- Use PostgreSQL features appropriately
- Consider international data (multiple languages)
- Plan for scalability
- Include proper indexes

**Triggers:**
- "Design database for [feature]"
- "Optimize database queries"
- "Create migration"

### 4. UI/UX Design Agent
**Purpose:** Design user interfaces and experiences  
**Capabilities:**
- Create component designs
- Plan user flows
- Design responsive layouts
- Specify animations and transitions

**Requirements:**
- Mobile-first approach
- Accessibility compliance (WCAG 2.1 AA)
- Support for RTL languages
- Consistent with design system

**Triggers:**
- "Design UI for [feature]"
- "Create user flow"
- "Plan layout"

### 5. Testing Agent
**Purpose:** Write and maintain tests  
**Capabilities:**
- Write unit tests with Jest
- Create React component tests
- Build E2E tests with Playwright
- Generate test data

**Coverage Requirements:**
- Utilities: 100% coverage
- Components: 80% coverage
- API routes: 90% coverage
- Critical paths: E2E tests required

**Triggers:**
- "Write tests for [feature]"
- "Create E2E test"
- "Generate test data"

### 6. Security Audit Agent
**Purpose:** Review code for security vulnerabilities  
**Capabilities:**
- Check for OWASP Top 10 vulnerabilities
- Review authentication/authorization
- Validate input sanitization
- Check for exposed secrets

**Critical Checks:**
- SQL injection prevention (via Prisma)
- XSS protection
- CSRF tokens
- Proper authentication
- Secure payment handling

**Triggers:**
- "Security review"
- "Audit [feature]"
- Before production deployment

### 7. Performance Optimization Agent
**Purpose:** Optimize application performance  
**Capabilities:**
- Analyze bundle sizes
- Optimize images and assets
- Implement code splitting
- Configure caching strategies

**Targets:**
- Lighthouse score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Bundle size < 200KB (initial)

**Triggers:**
- "Optimize performance"
- "Reduce bundle size"
- "Improve loading speed"

### 8. Documentation Agent
**Purpose:** Create and maintain documentation  
**Capabilities:**
- Write API documentation
- Create component docs
- Update README files
- Generate JSDoc comments

**Standards:**
- Clear, concise language
- Code examples included
- International audience considered
- Versioning information

**Triggers:**
- "Document [feature]"
- "Update documentation"
- After major changes

## 🎯 Agent Communication Protocol

### When Calling an Agent:

1. **Be Specific:**
```
✅ GOOD: "Implement product card component with i18n support following CLAUDE.md"
❌ BAD: "Make a product card"
```

2. **Reference Constraints:**
```
✅ GOOD: "Following CLAUDE.md constraints, refactor authSlice.ts in place"
❌ BAD: "Improve authentication"
```

3. **Include Context:**
```
✅ GOOD: "Add Stripe checkout to cart page, using existing cartSlice state"
❌ BAD: "Add payment"
```

### Agent Response Format:

Agents should:
1. Acknowledge the task and constraints
2. List files to be modified (not created unless necessary)
3. Implement changes incrementally
4. Run tests and validations
5. Report completion with any warnings

## 🚨 Critical Rules for ALL Agents

### NEVER:
- Create `*-enhanced.js`, `*-improved.js`, `*-v2.js` files
- Duplicate existing functionality
- Hardcode strings (use i18n)
- Skip tests
- Add unnecessary complexity
- Ignore mobile/responsive design
- Forget accessibility
- Expose secrets or credentials

### ALWAYS:
- Read CLAUDE.md before starting
- Search for existing implementations
- Modify files in place
- Use translation keys
- Write tests
- Consider international users
- Follow security best practices
- Document significant changes

## 📊 Agent Performance Metrics

Agents are evaluated on:
1. **Compliance:** Following CLAUDE.md constraints (100% required)
2. **Efficiency:** Not creating unnecessary files or code
3. **Quality:** Code passes all tests and linting
4. **Security:** No vulnerabilities introduced
5. **Internationalization:** Proper i18n implementation
6. **Documentation:** Clear comments and docs

## 🔄 Agent Collaboration Workflow

### Example Multi-Agent Task:
```
User: "Add a new art gallery feature with filtering"

1. UI/UX Agent: Designs the gallery layout and filter UI
2. Database Agent: Designs schema for artwork metadata
3. Code Implementation Agent: Implements the feature
4. Testing Agent: Writes comprehensive tests
5. Security Agent: Reviews for vulnerabilities
6. Performance Agent: Optimizes image loading
7. Documentation Agent: Updates docs
8. Code Review Agent: Final compliance check
```

## 🛠️ Agent Tooling

### Required Tools for Agents:
- **Search:** Grep, Glob, Find for existing code
- **Read:** File reading with proper encoding
- **Write:** In-place file modification
- **Test:** Jest, Playwright runners
- **Lint:** ESLint, Prettier
- **Build:** Next.js, TypeScript compiler
- **Database:** Prisma CLI

### Prohibited Tools:
- File duplication utilities
- Auto-enhancement scripts
- Code generators that create new files
- Any tool that violates CLAUDE.md

## 📝 Agent Reporting

After completing tasks, agents must report:
1. Files modified (not created unless justified)
2. Tests added/updated
3. Lint/type check status
4. Any deviations from CLAUDE.md (with justification)
5. Recommendations for other agents

## 🎓 Agent Training Data

Agents should be trained on:
1. This AGENTS.md file
2. CLAUDE.md constraints
3. Next.js 14+ best practices
4. TypeScript strict mode
5. React 18+ patterns
6. Tailwind CSS utilities
7. Redux Toolkit patterns
8. Prisma ORM usage
9. Stripe integration
10. NextAuth.js implementation

## ⚡ Quick Agent Commands

```bash
# For Implementation Agent
"Following CLAUDE.md, implement [feature] by modifying existing files"

# For Review Agent
"Review code against CLAUDE.md checklist"

# For Testing Agent
"Write tests achieving 90% coverage for [feature]"

# For Security Agent
"Perform security audit following OWASP guidelines"

# For Performance Agent
"Optimize for 90+ Lighthouse score"

# For Documentation Agent
"Document [feature] with examples and i18n considerations"
```

## 🔒 Agent Security Protocol

All agents must:
1. Never expose API keys or secrets
2. Never commit sensitive data
3. Always use environment variables
4. Validate and sanitize inputs
5. Use parameterized queries (Prisma)
6. Implement proper authentication checks
7. Follow principle of least privilege

## 🌍 Agent Internationalization Protocol

All agents must:
1. Use translation keys for ALL text
2. Support RTL languages
3. Use locale-aware formatting
4. Consider cultural differences
5. Test with multiple languages
6. Document translation keys

## ✅ Agent Success Criteria

An agent task is successful when:
- [ ] No new "enhanced" files created
- [ ] All tests pass
- [ ] Lint checks pass
- [ ] Type checks pass
- [ ] i18n properly implemented
- [ ] Mobile responsive
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Secure (OWASP compliant)
- [ ] Documented
- [ ] Reviewed against CLAUDE.md

## 💡 Final Reminder for Agents

> "The best code is often the code you don't write."

Before creating ANY new file, ask:
1. Does this functionality already exist?
2. Can I modify an existing file instead?
3. Is this the simplest solution?
4. Will this work internationally?
5. Is this secure and accessible?

If any answer is "no" or "unsure", stop and reconsider.