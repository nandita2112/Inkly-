import { useEffect, useState } from 'react';

// Works like useState, but the value survives page reloads.
// The lazy initializer `() => ...` only runs once, on the first render.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Runs after every change to `value` and writes it to storage.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage may be full or blocked; the app still works in memory */
    }
  }, [key, value]);

  return [value, setValue];
}
