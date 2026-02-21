# /discover

Find and install extensions from the steaksoap registry.

## Arguments
$ARGUMENTS — Natural language description of what you need (e.g., "3D rendering", "payments", "animations", "email contact form").

## Steps (follow this exact sequence)

1. **LOAD REGISTRY** — Read `registry/extensions.json`

2. **MATCH** — Find relevant extensions:
   - Compare the user's description against each extension's `tags`, `name`, and `description`
   - Rank by relevance (exact tag match > partial name match > description match)
   - Select the top 1-3 matches

3. **PRESENT** — Show results clearly:
   For each match, display:
   ```
   EXTENSION: [name]
   CATEGORY: [category]
   PACKAGES: [npm_packages joined with ", "]
   WHAT IT DOES: [description]
   SETUP: [numbered setup_instructions]
   DOCS: [references as clickable links]
   ```

4. **NO MATCH** — If nothing matches:
   - Say: "No matching extension found in the registry."
   - Offer: "I can set this up manually following project conventions. Want me to proceed?"
   - If the user agrees, proceed with manual installation following `.claude/rules/` patterns

5. **INSTALL** — If the user picks an extension:
   - Confirm what will be installed
   - Run the `setup_instructions` step by step
   - Install npm packages
   - Create necessary files following project conventions
   - Add environment variables to `.env.example` and `src/config/env.ts` if needed
   - Run `pnpm validate`
   - Commit: `feat(<scope>): add <extension-name> integration`

## Examples

```
User: /discover animations
→ Shows: Motion (Framer Motion)

User: /discover "I want users to pay for stuff"
→ Shows: Stripe Payments

User: /discover 3D
→ Shows: Three.js + React Three Fiber

User: /discover "contact form with email"
→ Shows: Resend Email
```
