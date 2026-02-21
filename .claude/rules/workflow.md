---
paths: ["src/**", "scripts/**", "docs/**", "*.md", "*.json", "*.ts", "*.js"]
---

# Workflow & Communication Rules

## The owner is a vibe coder
- Does not read code — reads explanations, summaries, comments
- Understands logic, not syntax. Knows what they want, not how to write it
- Gives direction, the AI executes with rigor
- Is demanding — if it's not clean, it doesn't ship
- NEVER touch git, terminal, config files, or commands — the AI does everything

## Communication format

When performing a major action:
```
ACTION: I will [describe the action]
WHERE: [affected file(s)]
WHY: [reason in 1-2 simple sentences]
RISK: [none / low / medium — and why]
```

When there's a bug:
```
ERROR: [error name]
IN SIMPLE TERMS: [accessible explanation]
SOLUTION: [what you propose]
WHERE: [file and line]
```

When installing a package:
```
NEW PACKAGE: [name]
WHAT IT IS: [1-sentence explanation]
STATS: [downloads/week, last updated]
WHY: [why we need it]
```

## Standard workflow — every task
1. UNDERSTAND → Rephrase the request in 1-2 sentences. If unclear, ask.
2. BRANCH → git checkout -b <type>/<scope> from main
3. CODE → Implement. Explain every important decision.
4. VALIDATE → pnpm validate → zero errors required
5. COMMIT → Conventional, atomic messages in English
6. MERGE → git checkout main && git merge --no-ff <branch>
7. PUSH → git push origin main
8. CLEAN UP → git branch -d <branch>
9. EVALUATE → Check if a release is warranted (see git.md rules)
10. SUMMARIZE → Explain what was done + state of unreleased commits

## When the owner says...
| They say | You do |
|---|---|
| "add X" | Branch → code → validate → commit → merge → push → evaluate release |
| "fix X" | Branch → code → validate → commit → merge → push → evaluate release |
| "commit" | git add + git commit with the correct conventional message |
| "push" | git push origin main (or the active branch) |
| "release" | Immediate release with the correct type |
| "what's the status?" | git status + git log since last release + summary |

## When the owner reports a bug
Fixing is NOT enough. You must also:
1. Fix the problem immediately
2. Understand why it happened (what rule was missing?)
3. Add a rule so it NEVER happens again
4. Document: commit with clear explanation of the fix + the new rule

## Performance standards
- Lighthouse: 90+ on all 4 categories
- No package > 50kb without justification
- Images: WebP/AVIF by default via Cloudinary
- Lazy loading on everything below the fold
- No unused CSS/JS in the final bundle

## Non-negotiable rules

### NEVER
- Act without explaining what you're doing and why
- Assume the owner knows how the code works
- Install a package without justification + explanation
- Use --force, --no-verify, or reset --hard without asking
- Leave dead code, unresolved TODOs, or ignored warnings
- Assert something is "unused" or "broken" without verifying in code first
- Remove a dependency without a functional replacement ready
- Change the project's direction without explicit owner approval

### ALWAYS
- Check git status and the active branch before coding
- Announce your plan before executing it
- Explain in simple terms (the owner is smart but doesn't code)
- pnpm validate before merge/push
- Separate commits by topic, even within the same session
- Think about the next person — a human dev or another AI must understand in 5 minutes
- Verify claims with code search before stating something is unused, broken, or redundant
- Preserve the `pnpm setup --update` workflow — merging upstream template changes is non-negotiable
