---
paths: ["src/components/**", "src/features/**"]
---

# Component Rules

## File structure
```tsx
// 1. Imports (sorted by eslint-plugin-simple-import-sort)
import { cn } from '@utils/cn';

// 2. Types
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}

// 3. Component (arrow function, named export)
/** Primary action button with loading state support. */
export const Button = ({ variant = 'primary', size = 'md', isLoading, className, children, ...rest }: ButtonProps) => {
  return (
    <button
      className={cn('...base', variantClasses[variant], sizeClasses[size], className)}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};
```

## Rules
- Functional components ONLY — no class components
- Arrow functions with named export — no default exports
- Props interface defined ABOVE the component, named `<ComponentName>Props`
- Destructure ALL props in the function signature
- ALWAYS accept `className?: string` for override capability
- Use cn() for ALL className construction
- JSDoc comment on every exported component (one line is fine)

## Organization
- `src/components/ui/` → reusable atoms: Button, Input, Card, Modal, Badge, Skeleton, Avatar, Tooltip, Select, Textarea
- `src/components/layout/` → structural: Header, Footer, Container, Section, SeoHead
- `src/components/features/` → domain-specific components (user creates these)
- `src/features/<name>/` → feature modules: component + hook + types + barrel

## Naming
- Component files: PascalCase — `Button.tsx`, `UserCard.tsx`
- Hook files: camelCase with use prefix — `useTheme.ts`, `useMediaQuery.ts`
- Test files: `__tests__/<ComponentName>.test.tsx`
- Types: `<ComponentName>Props` for props, descriptive names for others

## Accessibility requirements (every component)
- Interactive elements MUST have accessible names (text content or aria-label)
- Form inputs MUST have associated <label> via htmlFor/id
- Images MUST have meaningful alt text (or alt="" for decorative)
- Focus MUST be visible on all interactive elements (never remove outline without replacement)
- Color contrast MUST meet WCAG AA: 4.5:1 for text, 3:1 for large text
- NEVER use cursor: none
- Modals MUST trap focus (tab cycles inside modal)
- Dropdowns/menus MUST be keyboard navigable (arrow keys, Escape to close)

## Props patterns
- Variant prop for visual variations: `variant?: 'primary' | 'secondary' | ...`
- Size prop for sizing: `size?: 'sm' | 'md' | 'lg'`
- State props: `isLoading?`, `isDisabled?`, `isOpen?`
- Always provide sensible defaults
- Spread remaining HTML attrs: `...rest` → applied to root element
