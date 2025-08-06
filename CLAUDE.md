# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Status

This repository is currently empty and awaiting initialization. No existing codebase, configuration files, or project structure has been established yet.

## Next Steps

When the project is initialized, this file should be updated with:
1. Build, test, and development commands specific to the chosen technology stack
2. High-level architecture and project structure
3. Key patterns and conventions used in the codebase

Until then, Claude Code should help with:
- Initializing the project with appropriate technology choices
- Setting up development environment and tooling
- Establishing project structure based on requirements


⚠️ MANDATORY: This file contains CRITICAL project constraints that MUST be followed.

This document guides the Claude Code assistant when working on the custom e‑commerce/art platform we are building. YOU MUST READ THIS ENTIRE FILE BEFORE MAKING ANY CHANGES. The goal of the project is to create a bespoke, full‑stack web application for selling artwork, music and interactive experiences without relying on WordPress or similar CMS platforms. The site should feel immersive and be capable of handling real‑time visuals and audio‑reactive content while still operating as a functional online store.

⚠️ CRITICAL: STOP AND THINK BEFORE CODING

Before You Write ANY Code:
	1.	CHECK IF IT ALREADY EXISTS – The existing codebase (once scaffolded) will contain slices, components and utilities. Always search thoroughly before adding new files or functions. Avoid scattering logic across multiple similarly named modules.
	2.	DON’T CREATE “ENHANCED” VERSIONS – We already have unused enhancedAuthSlice.js and enhancedCartSlice.js in the template. Do not add *-enhanced.js files or similar. If improvements are needed, modify the original file instead of creating a parallel implementation.
	3.	DON’T ADD UNNECESSARY COMPLEXITY – This is an e‑commerce platform, not a research project. Unless explicitly requested, avoid introducing event emitters, custom connection pools, caching layers, AI agents, performance monitors, or bespoke build tools. Stick to the established framework conventions.
	4.	USE EXISTING PATTERNS – Follow the patterns already established in the codebase. If state management uses Redux Toolkit, use it consistently; if pages are defined in a pages/ directory following Next.js conventions, continue that approach. Keep components presentational where possible and avoid mixing concerns.

🛠️ Technology Overview

The project will use a modern JavaScript/TypeScript stack to build a responsive, internationalised website that showcases Oliver’s artwork and music while providing a secure and performant e‑commerce experience.

Front‑End
	•	Framework: Next.js (≥13), which combines React components with server‑side rendering and API routes. This choice allows us to build pages, handle routing and provide SEO‑friendly markup. Use the /app directory structure for layouts and server components.
	•	Styling: Tailwind CSS for utility‑first styling. It integrates well with Next.js and makes it easy to implement responsive, accessible designs. Maintain a consistent spacing scale and colour palette that complements the visual art.
	•	State Management: Redux Toolkit or Zustand; pick one and use it consistently across the project. Do not create both.
	•	Internationalisation (i18n): Use next-intl or react-intl to handle multiple languages. The site will serve an international audience; always consider translation keys and avoid hard‑coding strings.
	•	Interactivity: For audio‑reactive visuals and generative art, use client‑side libraries like Three.js, Tone.js or p5.js. Encapsulate these features in isolated components to prevent them from bloating the rest of the code.

Back‑End
	•	API Layer: Use Next.js API routes or a dedicated Express/Node server if more flexibility is required. APIs should be RESTful or GraphQL depending on the selected pattern. Keep controllers thin; heavy business logic should live in services.
	•	Database: Prefer PostgreSQL for relational data or MongoDB if a document model better suits the artwork metadata. Use an ORM such as Prisma to abstract queries and enforce type safety.
	•	Authentication: Implement JWT or NextAuth.js for user authentication. Reuse existing slices for auth and avoid creating parallel versions. Support OAuth providers (e.g. Google) but keep the implementation simple.
	•	Payments: Integrate Stripe for checkout and subscription management. Use Stripe’s official SDK and webhooks; do not roll your own payment processing.
	•	Content Management: For editable pages (e.g. blog posts, biography), consider a headless CMS (e.g. Sanity or Strapi) or build a simple admin panel. However, do not introduce a full CMS like WordPress.

Dev‑Ops & Tooling
	•	Version Control: Git with a clear branching strategy. Claude should never commit directly to main; use feature branches and make incremental changes.
	•	Testing: Unit tests with Jest and React Testing Library. Integrate end‑to‑end tests using Cypress or Playwright. Ensure that each component or slice has tests before shipping.
	•	Linting & Formatting: Use ESLint with Airbnb or Next.js default config and Prettier. Do not introduce conflicting configurations.
	•	Accessibility: All interactive elements must be keyboard navigable and screen‑reader friendly. Run Axe audits and fix violations in place.

🎨 Design Guidelines
	1.	Minimal and Immersive – The site should emphasise Oliver’s artwork. Use clean layouts, generous whitespace, and subtle animations. Avoid clutter and keep navigation intuitive.
	2.	Responsive by Default – Design mobile‑first. All pages must look and function correctly on phones, tablets, and desktops.
	3.	Consistent Typography – Define a small set of type styles (e.g. headings, body, captions) and reuse them. Do not hard‑code font sizes; reference a central theme.
	4.	Generative Visuals – When integrating audio‑reactive or generative visuals, encapsulate them in reusable components. Provide fallbacks for browsers without WebGL.
	5.	Inclusive Colours – Ensure sufficient contrast for text and UI elements. Provide light and dark themes if feasible.
	6.	Internationalisation – All text must go through translation helpers. Do not embed static English strings directly in components. Think about date formats and currency symbols.

📏 Coding Principles
	1.	Fix in place – If you find a bug or performance issue, modify the existing file rather than creating a *-fixed version. Deleting unused code is encouraged.
	2.	Keep it Simple – Use straightforward data structures and patterns. Avoid premature optimisation or over‑engineering. For example, use built‑in fetch or Axios for API calls instead of custom wrappers unless necessary.
	3.	Avoid Duplication – Before writing new functions or components, search the codebase. If a similar function exists, refactor it for reuse rather than duplicating logic.
	4.	Do Not Create New Files Unless Absolutely Necessary – Only add new modules when the existing ones cannot be extended cleanly. Always justify why a new file is required (e.g. a new page or model).
	5.	No “Enhanced” Versions – Do not add enhanced or improved variants of existing modules. The existing files should be extended or refactored in place.
	6.	Security Best Practices – Sanitise all user input, escape SQL queries with parameterised statements, and follow OWASP guidelines. Use HTTPS, secure cookies, and CSRF tokens.
	7.	International Support – Always consider language and localisation in both UI and data formats. Use libraries that support pluralisation and RTL if needed.
	8.	Test Thoroughly – Because many interdependencies exist, each change should be accompanied by tests. Manual QA is not enough.

👷‍♂️ Typical Workflow for Claude Code
	1.	Understand the Task – Re‑read the ticket or prompt. Clarify unclear requirements before coding.
	2.	Search the Codebase – Use the repository search to locate existing files related to the task. Identify where to integrate your changes.
	3.	Plan the Change – Decide whether the task can be accomplished by editing existing code. If a new file is truly necessary, document why.
	4.	Implement Incrementally – Make small, atomic commits. Write or update tests as you go. Avoid large, monolithic changes.
	5.	Run the Tests – Ensure that unit and integration tests pass. Fix failing tests before requesting review.
	6.	Review Against This Guide – Before finalising, check that your changes adhere to all constraints listed here.

🎯 Summary: Think Before You Code
	1.	This codebase already has too much code – Don’t add more without good reason.
	2.	Duplication is the enemy – Always search for existing implementations.
	3.	Simple is better – This is an e‑commerce site, not a spaceship.
	4.	Fix in place – Update existing code rather than creating new versions.
	5.	Test thoroughly – Many interdependencies exist.

Remember: The best code is often the code you don’t write. Always consider if the existing code can be fixed or reused before creating something new.

## 🔒 How to Ensure AI Agents Follow This Guide

1. **Always reference CLAUDE.md** in your prompts:
   ```
   "Following the constraints in CLAUDE.md, implement..."
   "As specified in CLAUDE.md, avoid creating enhanced versions..."
   ```

2. **Explicitly state constraints**:
   ```
   "DO NOT create new files, modify existing ones"
   "This is an international platform - include i18n support"
   "Keep it simple - no event emitters or complex patterns"
   ```

3. **Review AI output against this checklist**:
   - [ ] No new "enhanced" versions created?
   - [ ] No duplicate files with -fixed, -new suffixes?
   - [ ] Uses existing middleware and patterns?
   - [ ] Includes i18n considerations?
   - [ ] Follows security best practices?

4. **Reject non-compliant code**:
   - If AI creates duplicate files, reject and re-prompt
   - If AI adds unnecessary complexity, reject and request simpler solution
   - If AI ignores i18n requirements, reject and request international support
