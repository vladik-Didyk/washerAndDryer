import { useState, useCallback } from "react";

// initialValue may be a value or a function that returns one (like useState).
const resolveInitial = (initialValue) =>
  initialValue instanceof Function ? initialValue() : initialValue;

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : resolveInitial(initialValue);
    } catch {
      return resolveInitial(initialValue);
    }
  });

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch {
          // Storage full or unavailable
        }
        return valueToStore;
      });
    },
    [key],
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(resolveInitial(initialValue));
    } catch {
      // Storage unavailable
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
