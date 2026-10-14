import type { AnalysisContext } from "../context";
import type { Finding } from "../types";

const GOLD_THRESHOLD = 1500;
const MIN_FRAMES = 3;
const START_FRAME = 8;

/** Carrying a lot of unspent gold for several minutes instead of recalling to buy. */
export function detectUnspentGold(ctx: AnalysisContext): Finding[] {
  const pid = ctx.me.participantId;
  const findings: Finding[] = [];
  let run: { i: number; gold: number }[] = [];

  const flush = () => {
    if (run.length >= MIN_FRAMES) {
      const first = run[0]!.i;
      const last = run[run.length - 1]!.i;
      findings.push({
        id: `unspentGold-${first}`,
        kind: "unspentGold",
        start: first * 60_000,
        end: last * 60_000,
        severity: run.length >= 5 ? 3 : 2,
        confidence: "high",
        lessonId: "recall-timing",
        data: { minutes: last - first + 1, maxGold: Math.max(...run.map((r) => r.gold)) },
      });
    }
    run = [];
  };

  for (let i = START_FRAME; i < ctx.frameCount; i++) {
    const gold = ctx.frame(i, pid)?.currentGold ?? 0;
    if (gold >= GOLD_THRESHOLD) run.push({ i, gold });
    else flush();
  }
  flush();
  return findings;
}
