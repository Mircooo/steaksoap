# /migrate

Analyze an existing project and create a structured migration plan to steaksoap.

## Arguments
$ARGUMENTS — Path to the existing project, or a description of what it is.
Examples: "../classe2-site", "a React portfolio with Tailwind 3", "a vanilla HTML/CSS site"

## Steps

1. **Scan the source project** (if path provided):
   - Read package.json for deps and scripts
   - Read the file structure
   - Identify: framework, styling approach, routing, state management, fonts, colors
   - List all components/pages
   - Check for tests, TypeScript, linting

2. **Compare with steaksoap**:
   - What the source project has that steaksoap already provides (mapping)
   - What the source project has that steaksoap doesn't (to recreate)
   - What steaksoap adds that the source doesn't have (value gained)

3. **Generate migration plan**:
   ```
   ## MIGRATION PLAN: [project name]

   ### What you keep (copy & adapt)
   - [component] → adapt to TypeScript + steaksoap tokens + cn()
   - [page] → recreate via /new-page, then port content
   - [styles] → extract colors into @theme tokens, map to steaksoap tokens

   ### What steaksoap replaces
   - [old routing] → React Router 7 lazy loading (already configured)
   - [old styling] → Tailwind 4 with @theme tokens
   - [old build] → Vite 7 (already configured)

   ### What you gain
   - TypeScript strict (was: JavaScript)
   - Tests (was: none)
   - AI workflow (commands, agents, rules)
   - CI/CD (was: none)

   ### Migration order
   1. [step — what to do first and why]
   2. [step]
   3. [step]
   ...

   ### Design tokens to set
   - accent: [extracted from source or keep default]
   - bg dark: [extracted]
   - bg light: [extracted]
   - font-sans: [extracted]
   - font-mono: [keep default]

   ### Estimated effort
   - Pages to recreate: X
   - Components to port: X
   - Custom logic to rewrite: X
   - Estimated time: [X hours with AI assistance]
   ```

4. Present the plan. Ask: "Want me to start with step 1?"

5. Execute step by step:
   - Each migrated component: adapt to TypeScript + steaksoap patterns + add test
   - Each migrated page: use /new-page, then port content
   - Validate after each major step (`pnpm validate`)
   - Commit after each logical group

## Rules
- NEVER blindly copy-paste source code. Every file must be adapted to steaksoap conventions.
- Port the DESIGN (colors, fonts, layout), not the technical debt.
- If the source uses inline styles or hardcoded colors, convert to tokens.
- If the source has no tests, ADD tests during migration.
- Update DEPENDENCIES.md and decisions.md after migration.
