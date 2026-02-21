---
paths: ["src/app/routes/**", "src/pages/**"]
---

# Routing Rules

## React Router 7 with lazy loading
All routes are defined in `src/app/routes/`. Every page is lazy-loaded:

```tsx
import { lazy } from 'react';

const Home = lazy(() => import('@pages/Home'));
const About = lazy(() => import('@pages/About'));
```

## Adding a new route — checklist
1. Create page component in `src/pages/<PageName>.tsx`
   - Include SeoHead for meta tags
   - Wrap content in Container
   - Named export

2. Add lazy import in route config file (`src/app/routes/index.tsx` or similar)

3. Add route definition in the router:
   ```tsx
   { path: '/about', element: <About /> }
   ```
   - Path: lowercase, kebab-case
   - Wrap in Suspense with fallback if not already handled globally

4. Create test `src/pages/__tests__/<PageName>.test.tsx`:
   ```tsx
   import { render, screen } from '@testing-library/react';
   import { MemoryRouter } from 'react-router-dom';
   import { describe, expect, it } from 'vitest';

   import { About } from '../About';

   describe('About page', () => {
     it('renders', () => {
       render(<MemoryRouter><About /></MemoryRouter>);
       expect(screen.getByRole('heading')).toBeInTheDocument();
     });
   });
   ```

## Route organization
- Each page = one file in src/pages/
- Complex pages can have sub-components in the same folder or in src/features/
- Never hardcode route paths in components — use constants from route config
- 404/catch-all route should always exist

## Navigation
- Use <Link> from react-router-dom for internal navigation
- Never use <a href=""> for internal routes
- Active link styling via NavLink or manual matching
