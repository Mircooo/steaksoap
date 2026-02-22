import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useMediaQuery } from '../useMediaQuery';

describe('useMediaQuery', () => {
  let listeners: Array<() => void>;
  let matchesValue: boolean;

  beforeEach(() => {
    listeners = [];
    matchesValue = false;

    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        get matches() {
          return matchesValue;
        },
        media: query,
        addEventListener: (_event: string, cb: () => void) => {
          listeners.push(cb);
        },
        removeEventListener: (_event: string, cb: () => void) => {
          listeners = listeners.filter(l => l !== cb);
        },
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns false when media query does not match', () => {
    matchesValue = false;
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(result.current).toBe(false);
  });

  it('returns true when media query matches', () => {
    matchesValue = true;
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('updates when media query changes', () => {
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(result.current).toBe(false);

    matchesValue = true;
    act(() => {
      for (const cb of listeners) cb();
    });

    expect(result.current).toBe(true);
  });

  it('cleans up listener on unmount', () => {
    const { unmount } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(listeners).toHaveLength(1);

    unmount();
    expect(listeners).toHaveLength(0);
  });

  it('re-subscribes when query changes', () => {
    const { rerender } = renderHook(({ q }) => useMediaQuery(q), {
      initialProps: { q: '(max-width: 768px)' },
    });

    expect(listeners).toHaveLength(1);

    rerender({ q: '(min-width: 1024px)' });
    // Old listener removed, new one added
    expect(listeners).toHaveLength(1);
  });
});
