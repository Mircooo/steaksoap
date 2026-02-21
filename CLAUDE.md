# steaksoap

AI-first React starter kit for vibe coders.
The commands and rules are the product. The boilerplate is the vehicle.

## Stack
React 19 · TypeScript 5.9 · Vite 7 · Tailwind CSS 4 · pnpm · Vitest · ESLint 9

## Commands
pnpm dev              — dev server (port 5173)
pnpm build            — production build
pnpm preview          — preview production build
pnpm validate         — lint + typecheck + test + build (run before every PR)
pnpm setup            — interactive project setup wizard
pnpm setup:update     — pull latest template improvements
pnpm release          — create versioned release with changelog

## Architecture
src/
├── app/            — routes, providers, app layout
├── components/ui/  — reusable atoms (Button, Input, Card, Modal…)
├── components/layout/ — Header, Footer, Container, Section
├── config/         — env.ts (with fallbacks), site.ts, cloudinary.ts
├── features/       — feature modules (component + hook + types)
├── hooks/          — custom React hooks
├── pages/          — page components (one per route)
├── utils/          — cn() and helpers

## Code Rules (brief)
- TypeScript strict — no `any`, no `as` casts, no non-null assertions
- Functional components only, named exports, PascalCase files
- Mobile-first responsive: base → sm: → md: → lg:
- Path aliases: @components, @hooks, @pages, @utils, @config, @features
- Tests beside source: Button.tsx → Button.test.tsx
- Tailwind tokens only — never hardcode colors (use @theme variables)
- cn() for all className merging

## Workflow
1. Create branch from main: feat/<name> or fix/<name>
2. Implement — follow rules in .claude/rules/ (loaded automatically)
3. Run `pnpm validate` — must pass before committing
4. Commit with Conventional Commits: feat:, fix:, docs:, refactor:, test:, chore:
5. Batch commits — don't release after every commit
6. Push → PR → merge → release when meaningful set of changes is ready

## Communication Style
- Start with ACTION (what you're doing), then WHERE (which files), then WHY
- After completing work: summary of changes, files modified, what to test
- If unsure: ask one focused question, don't guess

## Detailed Rules
See .claude/rules/ — these files are loaded automatically based on what you're working on.
