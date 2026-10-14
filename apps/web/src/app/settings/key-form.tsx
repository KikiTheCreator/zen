"use client";

import { useActionState, useSyncExternalStore } from "react";
import { keyAction, type KeyFormState } from "./actions";

const INPUT = "w-full rounded-md border border-ink/15 bg-ink/5 px-3 py-2 font-mono outline-none focus:border-ink/40";

function useInsecureRemote() {
  return useSyncExternalStore(
    () => () => {},
    () => location.protocol === "http:" && !["localhost", "127.0.0.1", "[::1]"].includes(location.hostname),
    () => false,
  );
}

export function KeyForm({ hasKey }: { hasKey: boolean }) {
  const [state, action, pending] = useActionState<KeyFormState, FormData>(keyAction, {});
  const insecure = useInsecureRemote();

  return (
    <form action={action} className="space-y-4" autoComplete="off">
      {insecure && (
        <p className="rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-800 dark:text-amber-200">
          You&apos;re on an unencrypted connection from another computer: the key would cross your network as plain
          text. Safer: enter it on the server PC at http://localhost:3000/settings.
        </p>
      )}
      <label className="block space-y-1 text-sm">
        <span className="text-ink/70">Setup code (shown in the server&apos;s terminal)</span>
        <input name="setupCode" required placeholder="XXXXX-XXXXX" className={INPUT} spellCheck={false} />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="text-ink/70">{hasKey ? "New Riot API key" : "Riot API key"}</span>
        <input
          name="apiKey"
          type="password"
          required
          placeholder="RGAPI-…"
          className={INPUT}
          autoComplete="new-password"
          spellCheck={false}
        />
      </label>
      <div className="flex items-center gap-3">
        <button
          name="intent"
          value="save"
          disabled={pending}
          className="rounded-md bg-ink px-4 py-2 font-medium text-paper hover:bg-ink/90 disabled:opacity-50"
        >
          {pending ? "Working…" : "Save key"}
        </button>
        {hasKey && (
          <button
            name="intent"
            value="delete"
            formNoValidate
            disabled={pending}
            className="rounded-md border border-ink/15 px-4 py-2 text-sm text-ink/70 hover:text-rose-700 dark:hover:text-rose-300"
          >
            Remove key
          </button>
        )}
      </div>
      {state.message && (
        <p
          className={`text-sm ${state.ok ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
