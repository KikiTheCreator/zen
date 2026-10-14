"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchForm({ platforms }: { platforms: { id: string; label: string }[] }) {
  const router = useRouter();
  const [riotId, setRiotId] = useState("");
  const [platform, setPlatform] = useState("la1");
  const [error, setError] = useState("");

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        const [name, tag] = riotId.split("#").map((s) => s.trim());
        if (!name || !tag) {
          setError("Use your Riot ID with the tag, e.g. Faker#KR1");
          return;
        }
        router.push(`/p/${platform}/${encodeURIComponent(`${name}-${tag}`)}`);
      }}
    >
      <input
        value={riotId}
        onChange={(e) => {
          setRiotId(e.target.value);
          setError("");
        }}
        placeholder="Riot ID, e.g. Faker#KR1"
        className="flex-1 rounded-md border border-ink/15 bg-ink/5 px-3 py-2 outline-none focus:border-ink/40"
      />
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="rounded-md border border-ink/15 bg-ink/5 px-3 py-2"
      >
        {platforms.map((p) => (
          <option key={p.id} value={p.id} className="bg-paper">
            {p.label}
          </option>
        ))}
      </select>
      <button className="rounded-md bg-ink px-4 py-2 font-medium text-paper hover:bg-ink/90">Review my games</button>
      {error && <p className="text-sm text-rose-600 dark:text-rose-400 sm:self-center">{error}</p>}
    </form>
  );
}
