# /migrate

Transform an existing project into a steaksoap-powered project.

## Arguments
$ARGUMENTS — Path to the existing project folder.
Examples: "../classe2-site", "../client-portfolio", "../old-react-app"

## Philosophy
A migration is not a copy-paste. It's a rebirth.
The old project had soul but no structure. steaksoap adds the structure.
Your job is to preserve the soul — every design choice, every animation,
every pixel that makes this project unique — while upgrading everything else.

## Phase 1 — DIAGNOSTIC (don't touch anything yet)

### 1a. Scan
Read the entire source project:
- package.json → framework, deps, scripts
- File structure → flat? organized? how many files? how many empty?
- Styles → Tailwind version? CSS modules? inline? SCSS?
- Routing → React Router? Next.js? manual?
- State → Context? Redux? Zustand? none?
- Tests → any? framework?
- TypeScript → yes/no/partial?
- CI/CD → any?
- Git → clean history? conventional commits?
- Responsive → mobile-first? desktop-only? breakpoints used?

### 1b. Identity extraction
Find what makes this project UNIQUE:
- **Colors**: Extract every color used. List them with hex values.
- **Fonts**: What fonts are loaded? How? (Google Fonts, local, CDN?)
- **Signature components**: What components are custom/unique to this project?
  (custom cursor, particle effects, special animations, unique layouts)
- **Animations**: What timing functions? What durations? What triggers?
  For each animation: does it work on mobile? Does it NEED a mobile variant?
- **Assets**: Images, SVGs, icons — where are they and how are they used?

### 1c. Present the diagnostic

Show the user a clear report:

```
═══════════════════════════════════════════════════════════
MIGRATION DIAGNOSTIC: [project name]
═══════════════════════════════════════════════════════════

CURRENT STATE
  Framework:    React 19 (JSX, no TypeScript)
  Styling:      Tailwind 3 + PostCSS
  Routing:      React Router 6
  Tests:        None
  CI/CD:        None
  Structure:    Flat (all files in src/)
  Files:        42 total, 30 empty
  Responsive:   Partial (desktop-first, some breakpoints)

DESIGN IDENTITY
  ┌─────────────────┬────────────┬──────────────────────┐
  │ Token           │ Hex        │ Maps to steaksoap    │
  ├─────────────────┼────────────┼──────────────────────┤
  │ Acid (accent)   │ #D4FF00    │ --color-accent ✅    │
  │ Void (dark bg)  │ #0A0A0A    │ --color-bg ✅        │
  │ Paper (light bg)│ #F4F4F0    │ --color-bg (light) ✅│
  │ Ink (text)      │ #1A1A1A    │ --color-fg ✅        │
  │ Mist (dark text)│ #F0F0F0    │ --color-fg (dark) ✅ │
  └─────────────────┴────────────┴──────────────────────┘

  Font: Space Grotesk → --font-family-sans ✅
  Mono: (none) → JetBrains Mono will be added

SIGNATURE COMPONENTS
  ⭐ CustomCursor — SVG halo effect
     📱 Mobile: DISABLE (no cursor on touch)
  ⭐ ParticleField — Canvas particle animation
     📱 Mobile: SIMPLIFY (reduce particles, disable on low-end)
  ⭐ Noise — Grain overlay
     📱 Mobile: KEEP (lightweight CSS)
  ⭐ GhostCards — Blur/grayscale reveal on hover
     📱 Mobile: REPLACE (tap-to-reveal instead of hover)
  ⭐ CountryMap — IP country widget
     📱 Mobile: KEEP (small, lightweight)
  ⭐ RealTimeClock — HUD clock
     📱 Mobile: KEEP (text only)

PAGES TO MIGRATE
  1. Home (hero + project cards)
  2. Team (member cards)
  3. Expertise (skills grid)
  4. Contact (info + solar system animation)
  5. DevKit (design system showcase)
  6. ProjectDetail (dynamic project pages)

WHAT YOU GAIN
  ✅ TypeScript strict (was: JavaScript)
  ✅ 18+ tests (was: 0)
  ✅ 22 AI commands (was: 0)
  ✅ 4 specialized agents (was: 0)
  ✅ 10 contextual rules (was: 0)
  ✅ CI/CD with 3 workflows (was: 0)
  ✅ Conventional commits + auto changelog (was: manual)
  ✅ Tailwind 4 CSS-native (was: Tailwind 3 + PostCSS)
  ✅ Lazy loaded routes (was: all-in-one bundle)
  ✅ A11y compliance (was: 0 aria attributes)
  ✅ Mobile-first responsive (was: desktop-first)
  ✅ Extension registry for future integrations

ESTIMATED EFFORT
  Pages:       6
  Signatures:  6 (port as features/)
  Tokens:      Already matching ✅
  Time:        3-5 hours with AI assistance
```

Ask: "Ready to start? I'll go step by step, you validate each one."

## Phase 2 — TOKEN MAPPING (5 minutes)

1. Update `src/index.css` @theme with extracted colors
2. Update font imports if different
3. Run dev server
4. Ask: "Check the Playground — colors and fonts match?"
5. WAIT for confirmation

Commit: `feat(migrate): map design tokens from [source]`

## Phase 3 — SIGNATURE COMPONENTS (the soul)

Port unique components FIRST. For each one:
1. Create in `src/features/[name]/`
2. Convert to TypeScript
3. Adapt to steaksoap tokens
4. Use cn() for className
5. Add `// WHY:` comments
6. Add human-readable header
7. **Create mobile variant if needed** (see diagnostic)
8. Write test
9. Show user: "Here's your [component]. Same as before?"
10. WAIT for confirmation

### Mobile variant rules for signature components
Every signature component MUST have a mobile strategy:
- **KEEP**: Works as-is on mobile. No changes needed.
- **SIMPLIFY**: Same idea, reduced complexity. (fewer particles, simpler animation)
- **REPLACE**: Different interaction entirely. (hover → tap, cursor effect → touch ripple)
- **DISABLE**: Only on desktop. Hidden on mobile with `hidden md:block`.
  When disabling, ALWAYS provide a fallback that fills the visual gap.
  Never leave empty space where a desktop-only effect was.

Commit per component: `feat(migrate): port [Name] from [source]`

## Phase 4 — PAGES

For each page (Home first, then by importance):
1. Create via steaksoap pattern (lazy route + page + constants)
2. Port layout from source
3. Port content
4. Wire signature components
5. **Verify mobile layout independently** — not just "does it shrink",
   but "does it WORK as a mobile experience"
6. Show user: "Here's [page]. Compare with original."
7. WAIT for confirmation

Commit per page: `feat(migrate): recreate [PageName]`

## Phase 5 — CLEANUP & POLISH

1. Remove temp files
2. `pnpm validate` — fix ALL errors
3. `pnpm done` — fix ALL warnings
4. `/responsive-check` — fix ALL mobile issues
5. Update DEPENDENCIES.md, decisions.md, site.ts

Commit: `chore(migrate): cleanup and finalize`

## Phase 6 — REPORT

```
═══════════════════════════════════════════════════════════
MIGRATION COMPLETE: [project name]
═══════════════════════════════════════════════════════════

            BEFORE                    AFTER
  ─────────────────────   ─────────────────────
  JavaScript              TypeScript strict
  0 tests                 [X] tests
  Tailwind 3 + PostCSS    Tailwind 4 CSS-native
  No linting              ESLint 9 + Prettier
  No CI/CD                3 GitHub workflows
  No git hooks            Husky + commitlint
  No AI workflow          22 commands + 4 agents
  Flat structure          Organized
  [X] empty files         0 empty files
  No accessibility        WCAG AA compliant
  No lazy loading         All routes lazy loaded
  Desktop-first           Mobile-first responsive

  Design identity:        ✅ Preserved
  Signature components:   ✅ All ported (with mobile variants)
  Pages:                  ✅ All recreated
```

Save in `docs/migration-report.md`.

## Rules
- NEVER skip Phase 1
- NEVER proceed without user confirmation
- NEVER copy-paste — adapt everything
- ALWAYS port design, not debt
- ALWAYS convert to TypeScript
- ALWAYS add tests
- ALWAYS plan mobile variant for every signature component
- ALWAYS run /responsive-check before Phase 6
