import Link from "next/link";
import { LESSONS, POSITION_LABEL, type MatchAnalysis, type Position } from "@zen/core";
import { championIcon, mapImage } from "@/lib/ddragon";
import { champName, clock, describeFinding, SEVERITY_STYLE, signed } from "@/lib/format";
import { DeathMap } from "@/components/death-map";

interface Props {
  analysis: MatchAnalysis;
  version: string;
  backHref: string;
  backLabel: string;
}

export function MatchReview({ analysis, version, backHref, backLabel }: Props) {
  const m = analysis.metrics;
  const deaths = analysis.findings.filter((f) => f.kind === "death");

  return (
    <div className="space-y-8">
      <Link href={backHref} className="text-sm text-ink/50 hover:text-ink">
        {backLabel}
      </Link>

      <header className="flex items-center gap-4">
        <img src={championIcon(version, analysis.championName)} alt="" className="h-16 w-16 rounded" />
        <div>
          <h1 className="text-2xl font-semibold">
            {champName(analysis.championName)}
            {analysis.opponentChampion && (
              <span className="text-ink/50"> vs {champName(analysis.opponentChampion)}</span>
            )}
          </h1>
          <p className="text-ink/60">
            {analysis.position ? POSITION_LABEL[analysis.position as Position] : "Unknown role"} ·{" "}
            {Math.round(m.durationMin)} min ·{" "}
            <span
              className={analysis.win ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}
            >
              {analysis.win ? "Win" : "Loss"}
            </span>
          </p>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="CS @10" value={m.csAt10 ?? "–"} />
        <Stat label="CS / min" value={m.csPerMin.toFixed(1)} />
        <Stat label="Gold diff @10 / @15" value={`${signed(m.goldDiffAt10)} / ${signed(m.goldDiffAt15)}`} />
        <Stat label="XP diff @10 / @15" value={`${signed(m.xpDiffAt10)} / ${signed(m.xpDiffAt15)}`} />
        <Stat
          label="Level 6 (you / them)"
          value={`${m.level6At ? clock(m.level6At) : "–"} / ${m.opponentLevel6At ? clock(m.opponentLevel6At) : "–"}`}
        />
        <Stat label="Deaths before 14:00" value={m.deathsBefore14} />
        <Stat label="Kill participation" value={`${Math.round(m.killParticipation * 100)}%`} />
        <Stat
          label="Damage taken (phys / magic)"
          value={`${Math.round(m.damageTaken.physical / 1000)}k / ${Math.round(m.damageTaken.magic / 1000)}k`}
        />
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <section className="space-y-3">
          <h2 className="text-lg font-medium">What to work on ({analysis.findings.length})</h2>
          {analysis.findings.length === 0 && <p className="text-ink/60">No issues detected in this game. Nice.</p>}
          {analysis.findings.map((f) => {
            const text = describeFinding(f);
            const lesson = LESSONS[f.lessonId];
            return (
              <article key={f.id} className={`rounded-lg border p-4 ${SEVERITY_STYLE[f.severity]}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium">{text.title}</h3>
                  <span className="shrink-0 font-mono text-sm text-ink/60">
                    {clock(f.start)}
                    {f.end !== undefined && f.end !== f.start ? `–${clock(f.end)}` : ""}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink/75">{text.body}</p>
                <p className="mt-2 flex flex-wrap gap-x-4 text-xs text-ink/50">
                  <span>Watch your replay at {clock(Math.max(0, f.start - 15_000))}</span>
                  {f.confidence !== "high" && <span>Confidence: {f.confidence}</span>}
                  <Link href={`/learn/${lesson.id}`} className="text-sky-700 dark:text-sky-300 hover:underline">
                    Lesson: {lesson.title}
                  </Link>
                </p>
              </article>
            );
          })}
        </section>
        <aside className="space-y-2">
          <h2 className="text-lg font-medium">Where you died</h2>
          <DeathMap
            mapSrc={mapImage(version)}
            deaths={deaths.map((d) => ({ id: d.id, at: d.start, position: d.data.position, severity: d.severity }))}
          />
          <p className="text-xs text-ink/50">Red = alone in enemy territory. Hover a dot for the time.</p>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-ink/10 p-3">
      <p className="text-xs text-ink/50">{label}</p>
      <p className="mt-1 font-mono text-lg">{value}</p>
    </div>
  );
}
