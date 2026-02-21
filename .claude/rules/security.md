---
paths: ["src/config/**", ".env*", "package.json"]
---

# Security Rules

## Environment variables
- All env vars defined in `src/config/env.ts` with explicit fallbacks
- Client-side vars MUST be prefixed with `VITE_` (Vite requirement)
- NEVER put secrets in VITE_ vars — they are bundled into client code and visible to anyone
- `.env.local` is gitignored — never commit it
- `.env.example` documents available vars with placeholder values
- The app MUST work without any .env.local file (all vars have fallbacks)

## Dependencies
Before adding ANY new dependency:
1. Check npm weekly downloads (>10,000 preferred)
2. Check last publish date (<6 months preferred)
3. Check bundle size impact (bundlephobia.com)
4. Check for known vulnerabilities
5. Prefer dependencies with TypeScript types included
6. Document in DEPENDENCIES.md after adding

## Code security
- NEVER use eval() or Function() constructor
- NEVER use dangerouslySetInnerHTML with user-provided data
- NEVER use innerHTML for user-controlled content
- React JSX auto-escapes by default — don't bypass this
- Sanitize ALL external data before rendering
- Use proper TypeScript types to catch type-related vulnerabilities

## Audit
- Run `pnpm audit` periodically
- Dependabot is configured for automated security patches
- Review dependency updates before merging (check changelogs)
