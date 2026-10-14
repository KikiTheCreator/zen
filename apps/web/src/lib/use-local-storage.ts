"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const EVENT = "zen-local-storage";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

/** JSON value persisted in localStorage. Renders `fallback` on the server and first paint. */
export function useLocalStorage<T>(key: string, fallback: T): [T, (value: T) => void] {
  const raw = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key),
    () => null,
  );
  const value = useMemo(() => {
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
    // `fallback` is a default for missing data; changing it shouldn't re-parse.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);
  const set = useCallback(
    (next: T) => {
      localStorage.setItem(key, JSON.stringify(next));
      window.dispatchEvent(new Event(EVENT));
    },
    [key],
  );
  return [value, set];
}
