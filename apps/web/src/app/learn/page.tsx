import Link from "next/link";
import { LESSONS } from "@zen/core";

export default function LearnPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Lessons</h1>
      <ul className="grid gap-3 sm:grid-cols-2">
        {Object.values(LESSONS).map((l) => (
          <li key={l.id}>
            <Link href={`/learn/${l.id}`} className="block rounded-lg border border-ink/10 p-4 hover:bg-ink/5">
              <h2 className="font-medium">{l.title}</h2>
              <p className="mt-1 text-sm text-ink/60">{l.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
