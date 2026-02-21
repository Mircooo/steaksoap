# AI Command Reference

Complete list of Claude Code slash commands in steaksoap.

## Scaffolding

| Command | Arguments | What it creates |
|---|---|---|
| `/new-page` | `PageName` | Page + route constant + lazy import + test |
| `/new-component` | `ComponentName [ui\|feature\|layout]` | Component + test in the right folder |
| `/new-feature` | `FeatureName` | Feature folder (component + hook + types + barrel + test) |
| `/new-hook` | `HookName` (without "use") | Custom hook + test |
| `/add-api` | `resourceName` | TanStack Query service + hooks |

## Workflow

| Command | Arguments | What it does |
|---|---|---|
| `/status` | — | Git status, validation report, dependency health |
| `/deploy` | — | Validate, build, deploy to Vercel or Netlify |
| `/release` | — | Analyze commits, version bump, changelog, git tag |
| `/update-deps` | — | Safe dependency updates with validation after each |
| `/fix` | `"description of bug"` | Systematic bug diagnosis and fix |

## Quality

| Command | Arguments | What it does |
|---|---|---|
| `/review` | — | Code review of recent changes |
| `/audit` | — | Bundle size + accessibility + performance analysis |
| `/test` | `[file or feature]` | Run tests + find coverage gaps |
| `/theme` | `"description of changes"` | Modify design tokens interactively |
| `/responsive-check` | `[page or component]` | Verify all breakpoints (320px to 1440px) |

## Sub-agents

Agents are specialized personas that Claude Code can adopt.
See [agents.md](agents.md) for full documentation.

| Agent | When to use |
|---|---|
| `reviewer` | "Act as the reviewer agent and check my code" |
| `debugger` | "Act as the debugger agent to fix this issue" |
| `designer` | "Act as the designer agent for this UI change" |
| `tester` | "Act as the tester agent to write tests for this" |
