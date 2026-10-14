"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
const STORAGE_KEY = "zen.theme";
const EVENT = "zen-theme";

/**
 * Runs before first paint (inlined in <head>) so a saved dark theme doesn't flash light.
 * Light is the default.
 */
export const THEME_SCRIPT = `try{if(localStorage.getItem("${STORAGE_KEY}")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(
    subscribe,
    () => (document.documentElement.classList.contains("dark") ? "dark" : "light"),
    () => "light",
  );
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.classList.toggle("dark", next === "dark");
        localStorage.setItem(STORAGE_KEY, next);
        window.dispatchEvent(new Event(EVENT));
      }}
      className="rounded-md border border-ink/15 px-2.5 py-1 text-ink/70 hover:text-ink"
      aria-label={`Switch to ${next} theme`}
    >
      {theme === "dark" ? "☀ Light" : "☾ Dark"}
    </button>
  );
}
