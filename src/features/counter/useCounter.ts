import { useCallback, useState } from 'react';

import type { CounterState } from './types';

export function useCounter(initial = 0, min = -10, max = 10) {
  const [count, setCount] = useState(initial);

  const increment = useCallback(() => setCount(c => Math.min(c + 1, max)), [max]);
  const decrement = useCallback(() => setCount(c => Math.max(c - 1, min)), [min]);
  const reset = useCallback(() => setCount(initial), [initial]);

  const state: CounterState = { count, min, max };

  return { ...state, increment, decrement, reset } as const;
}
