import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));
    expect(result.current).toBe('hello');
  });

  it('does not update before delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'hello' },
    });

    rerender({ value: 'world' });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe('hello');
  });

  it('updates after delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'hello' },
    });

    rerender({ value: 'world' });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('world');
  });

  it('resets timer on rapid changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: 'c' });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Only 200ms since last change — should still be 'a'
    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(100);
    });

    // 300ms since last change — should be 'c'
    expect(result.current).toBe('c');
  });

  it('works with number values', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 0 },
    });

    rerender({ value: 42 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(42);
  });
});
