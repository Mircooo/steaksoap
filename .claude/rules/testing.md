---
paths: ["src/**/*.test.*", "src/test/**", "vitest.config.*"]
---

# Testing Rules

## Stack
- Vitest — test runner (Vite-native, fast)
- @testing-library/react — render and query components
- @testing-library/user-event — simulate real user interactions
- @testing-library/jest-dom — DOM matchers (toBeInTheDocument, toBeVisible…)

## File convention
Tests live BESIDE their source file:
- `src/components/ui/Button.tsx` → `src/components/ui/__tests__/Button.test.tsx`
- `src/hooks/useTheme.ts` → `src/hooks/__tests__/useTheme.test.ts`
- `src/utils/cn.ts` → `src/utils/__tests__/cn.test.ts`

## Test structure
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Button } from '../Button';

describe('Button', () => {
  it('renders with text content', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('is disabled when isLoading is true', () => {
    render(<Button isLoading>Save</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## Query priority (most → least preferred)
1. getByRole — accessible role (button, heading, textbox, link)
2. getByLabelText — form inputs with labels
3. getByPlaceholderText — when no label exists
4. getByText — visible text content
5. getByTestId — LAST RESORT only

## Principles
- Test BEHAVIOR, not implementation (what the user sees and does)
- If a refactor breaks the test but not the feature → bad test
- Never test React internals (state values, hook returns directly)
- Every component test should at minimum: render without crash + verify key UI element
- For hooks: use `renderHook` from @testing-library/react

## What to test per file type
- **UI components**: render, interactions (click, type, focus), variants, disabled/loading states
- **Hooks**: initial value, state transitions via act()
- **Utils**: pure function input/output, edge cases (empty, null, boundary values)
- **Pages**: renders at route, key content visible, navigation works (wrap in MemoryRouter)
- **Config**: fallback values when env vars missing

## Running tests
- `pnpm test` — run all tests once
- `pnpm test:watch` — watch mode
- `pnpm test -- Button` — run tests matching "Button"
- `pnpm test:coverage` — run with coverage report

## Coverage

Run `pnpm test:coverage` to generate a coverage report.
- Report in terminal + HTML report in `coverage/`
- Thresholds are set in `vitest.config.ts` — they are a ratchet (only go UP)
- When you add tests that increase coverage: bump the threshold to lock the new level
- Never lower thresholds without explicit owner approval
