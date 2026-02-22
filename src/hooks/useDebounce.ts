import { useEffect, useState } from 'react';

/**
 * Debounces a value by the given delay in milliseconds.
 *
 * The returned value only updates after the input has stopped
 * changing for the specified delay.
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 300);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
