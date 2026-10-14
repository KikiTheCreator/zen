"use client";

import { useMemo, useState } from "react";
import {
  POSITION_LABEL,
  POSITIONS,
  predictRoles,
  recommendPicks,
  situationalBuild,
  type ChampionInfo,
  type PoolEntry,
  type Position,
} from "@zen/core";
import { ChampionIcon, ChampionPicker } from "@/components/champion-picker";
import { useLocalStorage } from "@/lib/use-local-storage";

interface Profile {
  primary: Position;
  secondary: Position;
  pools: Partial<Record<Position, PoolEntry[]>>;
}

const DEFAULT_PROFILE: Profile = { primary: "MIDDLE", secondary: "TOP", pools: {} };

const COMFORT_LEVELS = [
  { value: 1, label: "Main" },
  { value: 0.7, label: "Comfortable" },
  { value: 0.4, label: "Learning" },
];

interface Props {
  version: string;
  champions: Record<string, ChampionInfo>;
  itemNames: string[];
}

export function DraftTool({ version, champions, itemNames }: Props) {
  const [profile, setProfile] = useLocalStorage<Profile>("zen.profile", DEFAULT_PROFILE);
  const [role, setRole] = useState<Position | null>(null);
  const [allies, setAllies] = useState<string[]>([]);
  const [enemies, setEnemies] = useState<string[]>([]);
  const [enemyRoles, setEnemyRoles] = useState<Record<string, Position>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const list = useMemo(() => Object.values(champions).sort((a, b) => a.name.localeCompare(b.name)), [champions]);
  const items = useMemo(() => new Set(itemNames), [itemNames]);
  const activeRole = role ?? profile.primary;
  const pool = useMemo(() => profile.pools[activeRole] ?? [], [profile.pools, activeRole]);
  const taken = new Set([...allies, ...enemies]);

  const result = useMemo(
    () => recommendPicks({ role: activeRole, pool, allies, enemies, enemyRoles, champions }),
    [activeRole, pool, allies, enemies, enemyRoles, champions],
  );
  const predicted = useMemo(() => predictRoles(enemies, champions, enemyRoles), [enemies, champions, enemyRoles]);
  const focus =
    selected && result.options.some((o) => o.championId === selected) ? selected : result.options[0]?.championId;
  const advice = focus
    ? situationalBuild(champions[focus]!, activeRole, enemies.map((id) => champions[id]!).filter(Boolean), items)
    : [];

  const setPool = (next: PoolEntry[]) => setProfile({ ...profile, pools: { ...profile.pools, [activeRole]: next } });
  const name = (id: string) => champions[id]?.name ?? id;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left: profile + draft input */}
      <div className="space-y-6">
        <section className="space-y-3 rounded-lg border border-ink/10 p-4">
          <h2 className="font-medium">Your roles</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            {(["primary", "secondary"] as const).map((slot) => (
              <label key={slot} className="flex items-center gap-2">
                <span className="text-ink/60">{slot === "primary" ? "Primary" : "Secondary"}</span>
                <select
                  value={profile[slot]}
                  onChange={(e) => setProfile({ ...profile, [slot]: e.target.value as Position })}
                  className="rounded border border-ink/15 bg-ink/5 px-2 py-1"
                >
                  {POSITIONS.map((p) => (
                    <option key={p} value={p} className="bg-paper">
                      {POSITION_LABEL[p]}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <div className="flex gap-2 text-sm">
            <span className="self-center text-ink/60">Assigned this game:</span>
            {POSITIONS.map((p) => (
              <button
                key={p}
                onClick={() => setRole(p)}
                className={`rounded px-2 py-1 ${p === activeRole ? "bg-ink text-paper" : "bg-ink/5 hover:bg-ink/10"} ${
                  p === profile.primary || p === profile.secondary ? "" : "opacity-50"
                }`}
              >
                {POSITION_LABEL[p]}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3 rounded-lg border border-ink/10 p-4">
          <h2 className="font-medium">Your {POSITION_LABEL[activeRole]} pool</h2>
          <ul className="space-y-2">
            {pool.map((entry) => (
              <li key={entry.championId} className="flex items-center gap-3 text-sm">
                <ChampionIcon version={version} id={entry.championId} />
                <span className="flex-1">{name(entry.championId)}</span>
                <select
                  value={entry.comfort}
                  onChange={(e) =>
                    setPool(pool.map((p) => (p === entry ? { ...p, comfort: Number(e.target.value) } : p)))
                  }
                  className="rounded border border-ink/15 bg-ink/5 px-2 py-1"
                >
                  {COMFORT_LEVELS.map((c) => (
                    <option key={c.value} value={c.value} className="bg-paper">
                      {c.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setPool(pool.filter((p) => p !== entry))}
                  className="text-ink/40 hover:text-rose-600 dark:hover:text-rose-400"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <ChampionPicker
            champions={list}
            version={version}
            exclude={new Set(pool.map((p) => p.championId))}
            placeholder="Add a champion to this pool…"
            onPick={(id) => setPool([...pool, { championId: id, comfort: 0.7 }])}
          />
        </section>

        <section className="space-y-4 rounded-lg border border-ink/10 p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">This draft</h2>
            <button
              onClick={() => {
                setAllies([]);
                setEnemies([]);
                setEnemyRoles({});
                setSelected(null);
              }}
              className="text-sm text-ink/50 hover:text-ink"
            >
              New game
            </button>
          </div>
          <TeamInput
            title={`Your team (${allies.length}/4)`}
            ids={allies}
            max={4}
            list={list}
            version={version}
            taken={taken}
            onChange={setAllies}
          />
          <TeamInput
            title={`Enemy team (${enemies.length}/5)`}
            ids={enemies}
            max={5}
            list={list}
            version={version}
            taken={taken}
            onChange={(next) => {
              setEnemies(next);
              setEnemyRoles(Object.fromEntries(Object.entries(enemyRoles).filter(([id]) => next.includes(id))));
            }}
            renderExtra={(id) => {
              const row = predicted[id];
              if (!row) return null;
              const best = POSITIONS.reduce((a, b) => (row[b] > row[a] ? b : a));
              const pinned = enemyRoles[id];
              return (
                <button
                  title="Click to change the lane"
                  onClick={() => {
                    const next = POSITIONS[(POSITIONS.indexOf(pinned ?? best) + 1) % POSITIONS.length]!;
                    setEnemyRoles({ ...enemyRoles, [id]: next });
                  }}
                  className={`rounded px-1.5 py-0.5 text-xs ${pinned ? "bg-sky-500/30" : "bg-ink/10"}`}
                >
                  {POSITION_LABEL[pinned ?? best]} {pinned ? "" : `${Math.round(row[best] * 100)}%`}
                </button>
              );
            }}
          />
        </section>
      </div>

      {/* Right: recommendations */}
      <div className="space-y-6">
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Best picks from your pool</h2>
          <p className="text-sm text-ink/60">
            {result.likelyOpponent && result.likelyOpponent.probability >= 0.6
              ? `Likely lane opponent: ${name(result.likelyOpponent.championId)} (${Math.round(result.likelyOpponent.probability * 100)}%)`
              : "Lane opponent unknown: ranking by comfort and team fit."}
          </p>
          {pool.length === 0 && <p className="text-ink/60">Add champions to your pool to get recommendations.</p>}
          {result.options.map((o, i) => (
            <button
              key={o.championId}
              onClick={() => setSelected(o.championId)}
              className={`block w-full rounded-lg border p-4 text-left ${
                o.championId === focus ? "border-ink/40 bg-ink/5" : "border-ink/10 hover:bg-ink/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-ink/40">{i + 1}.</span>
                <ChampionIcon version={version} id={o.championId} size={40} />
                <span className="flex-1 text-lg font-medium">{name(o.championId)}</span>
                <span className="font-mono text-xl">{o.score}</span>
              </div>
              {o.reasons.length > 0 && (
                <ul className="mt-2 space-y-0.5 text-sm">
                  {o.reasons.map((r) => (
                    <li
                      key={r.text}
                      className={
                        r.impact > 0
                          ? "text-emerald-700 dark:text-emerald-300"
                          : r.impact < 0
                            ? "text-rose-700 dark:text-rose-300"
                            : "text-ink/60"
                      }
                    >
                      {r.impact > 0 ? "+ " : r.impact < 0 ? "− " : "• "}
                      {r.text}
                    </li>
                  ))}
                </ul>
              )}
            </button>
          ))}
        </section>

        {focus && (
          <section className="space-y-3">
            <h2 className="text-lg font-medium">If you play {name(focus)}: situational items & runes</h2>
            {advice.length === 0 && (
              <p className="text-sm text-ink/60">
                Nothing special yet. Your standard build is fine against this draft.
              </p>
            )}
            {advice.map((a) => (
              <div key={a.threat} className="rounded-lg border border-ink/10 p-3 text-sm">
                <p className="text-ink/70">{a.reason}</p>
                {a.items.length > 0 && <p className="mt-1">Consider: {a.items.join(" · ")}</p>}
                {a.runes.length > 0 && <p className="text-ink/60">Runes: {a.runes.join(" · ")}</p>}
              </div>
            ))}
            <p className="text-xs text-ink/40">Options, not orders: adapt to who actually gets fed.</p>
          </section>
        )}
      </div>
    </div>
  );
}

function TeamInput(props: {
  title: string;
  ids: string[];
  max: number;
  list: ChampionInfo[];
  version: string;
  taken: Set<string>;
  onChange: (ids: string[]) => void;
  renderExtra?: (id: string) => React.ReactNode;
}) {
  const { title, ids, max, list, version, taken, onChange, renderExtra } = props;
  return (
    <div className="space-y-2">
      <p className="text-sm text-ink/60">{title}</p>
      <div className="flex flex-wrap gap-2">
        {ids.map((id) => (
          <span key={id} className="flex items-center gap-1.5 rounded bg-ink/5 py-1 pr-2 pl-1 text-sm">
            <ChampionIcon version={version} id={id} size={24} />
            {list.find((c) => c.id === id)?.name}
            {renderExtra?.(id)}
            <button
              onClick={() => onChange(ids.filter((x) => x !== id))}
              className="text-ink/40 hover:text-rose-600 dark:hover:text-rose-400"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
      <ChampionPicker
        champions={list}
        version={version}
        exclude={taken}
        disabled={ids.length >= max}
        placeholder={ids.length >= max ? "Team complete" : "Type a champion…"}
        onPick={(id) => onChange([...ids, id])}
      />
    </div>
  );
}
