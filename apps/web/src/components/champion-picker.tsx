"use client";

import { useState } from "react";
import type { ChampionInfo } from "@zen/core";

interface Props {
  champions: ChampionInfo[];
  version: string;
  exclude?: Set<string>;
  placeholder: string;
  onPick: (championId: string) => void;
  disabled?: boolean;
}

/** Type a few letters, pick from the list. Enter picks the first match. */
export function ChampionPicker({ champions, version, exclude, placeholder, onPick, disabled }: Props) {
  const [query, setQuery] = useState("");
  const q = normalize(query);
  // Names starting with the query come first ("vi" → Vi before Anivia).
  const matches = q
    ? champions
        .filter((c) => !exclude?.has(c.id) && normalize(c.name).includes(q))
        .sort((a, b) => Number(normalize(b.name).startsWith(q)) - Number(normalize(a.name).startsWith(q)))
        .slice(0, 6)
    : [];

  const pick = (id: string) => {
    onPick(id);
    setQuery("");
  };

  return (
    <div className="relative">
      <input
        value={query}
        disabled={disabled}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && matches[0]) {
            e.preventDefault();
            pick(matches[0].id);
          }
        }}
        placeholder={placeholder}
        className="w-full rounded-md border border-ink/15 bg-ink/5 px-3 py-2 text-sm outline-none focus:border-ink/40 disabled:opacity-40"
      />
      {matches.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-ink/15 bg-paper shadow-lg">
          {matches.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => pick(c.id)}
                className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm hover:bg-ink/10"
              >
                <ChampionIcon version={version} id={c.id} size={24} />
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z]/g, "");
}

export function ChampionIcon({ version, id, size = 32 }: { version: string; id: string; size?: number }) {
  return (
    <img
      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${id}.png`}
      alt={id}
      width={size}
      height={size}
      className="rounded"
    />
  );
}
