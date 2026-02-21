# Add a Feature

> Create a full feature module with component, hook, types, and barrel export.

## AI shortcut

```
/new-feature ShoppingCart
```

## Manual steps

1. **Create the folder**: `src/features/shopping-cart/`

2. **Types** — `ShoppingCart.types.ts`:

```ts
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ShoppingCartProps {
  className?: string;
}
```

3. **Hook** — `useShoppingCart.ts`:

```ts
import { useState } from 'react';

import type { CartItem } from './ShoppingCart.types';

export const useShoppingCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { items, setItems, total };
};
```

4. **Component** — `ShoppingCart.tsx`:

```tsx
import { cn } from '@utils/cn';

import type { ShoppingCartProps } from './ShoppingCart.types';
import { useShoppingCart } from './useShoppingCart';

export const ShoppingCart = ({ className }: ShoppingCartProps) => {
  const { items, total } = useShoppingCart();
  return (
    <div className={cn('rounded-lg border border-border bg-surface p-6', className)}>
      <h2 className="text-fg text-xl font-semibold">Cart ({items.length})</h2>
      <p className="text-muted">Total: ${total}</p>
    </div>
  );
};
```

5. **Barrel export** — `index.ts`:

```ts
export { ShoppingCart } from './ShoppingCart';
export { useShoppingCart } from './useShoppingCart';
export type { CartItem, ShoppingCartProps } from './ShoppingCart.types';
```

6. **Test** — `__tests__/ShoppingCart.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ShoppingCart } from '../ShoppingCart';

describe('ShoppingCart', () => {
  it('renders cart heading', () => {
    render(<ShoppingCart />);
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });
});
```

7. **Validate**: `pnpm validate`

## Structure

```
src/features/shopping-cart/
├── ShoppingCart.tsx          — main component
├── ShoppingCart.types.ts     — TypeScript interfaces
├── useShoppingCart.ts        — custom hook
├── index.ts                  — barrel export
└── __tests__/
    └── ShoppingCart.test.tsx  — tests
```
