import { connection } from "next/server";
import { Suspense } from "react";
import { getRiotApiKey } from "@/lib/secrets";
import { KeyForm } from "./key-form";

export default function SettingsPage() {
  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <Suspense fallback={<p className="text-ink/60">Loading…</p>}>
        <KeyStatus />
      </Suspense>
    </div>
  );
}

async function KeyStatus() {
  await connection();
  const { key, source } = await getRiotApiKey();
  return (
    <section className="space-y-4">
      <div className="rounded-lg border border-ink/10 p-4 text-sm">
        <p className="font-medium">Riot API key</p>
        {key ? (
          <p className="mt-1 text-emerald-700 dark:text-emerald-300">
            Set{source === "env" ? " (from RIOT_API_KEY in .env.local)" : ""}, ending in …{key.slice(-4)}
          </p>
        ) : (
          <p className="mt-1 text-amber-700 dark:text-amber-300">
            Not set: game reviews won&apos;t work until you add one.
          </p>
        )}
        <p className="mt-2 text-ink/50">
          The key stays on the server and is never shown again. Development keys expire every 24 hours: get a new one at{" "}
          <a
            href="https://developer.riotgames.com"
            target="_blank"
            rel="noreferrer"
            className="text-sky-700 dark:text-sky-300 underline"
          >
            developer.riotgames.com
          </a>
          .
        </p>
      </div>
      {source === "env" ? (
        <p className="text-sm text-ink/60">
          The key comes from <code>.env.local</code>, which takes priority. Remove it there to manage it here.
        </p>
      ) : (
        <KeyForm hasKey={!!key} />
      )}
    </section>
  );
}
