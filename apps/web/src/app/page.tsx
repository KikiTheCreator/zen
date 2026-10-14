import Link from "next/link";
import { PLATFORMS } from "@zen/core";
import { SearchForm } from "./search-form";

export default function Home() {
  const platforms = Object.entries(PLATFORMS).map(([id, p]) => ({ id, label: p.label }));
  return (
    <div className="space-y-10">
      <section className="space-y-3 pt-6">
        <h1 className="text-4xl font-semibold">Learn from your own games.</h1>
        <p className="max-w-2xl text-ink/70">
          Zen reviews your matches minute by minute: XP you shared, time spent walking instead of farming, level races
          you lost, and exactly what killed you. Each mistake links to a short lesson.
        </p>
      </section>
      <SearchForm platforms={platforms} />
      <p className="text-sm text-ink/50">
        No account handy?{" "}
        <Link href="/demo" className="text-sky-700 dark:text-sky-300 hover:underline">
          See a demo review
        </Link>
        .
      </p>
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ["Technical review", "Mistakes found in your timeline, with the time to check in your replay."],
          ["Champ select", "The best pick from your pool for this team, plus situational items and runes."],
          ["Lessons", "Short, practical lessons with drills, linked to what you actually did."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-lg border border-ink/10 p-4">
            <h2 className="font-medium">{title}</h2>
            <p className="mt-1 text-sm text-ink/60">{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
