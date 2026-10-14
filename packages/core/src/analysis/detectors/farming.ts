import { cs, involvedBetween, type AnalysisContext } from "../context";
import { distance } from "../geometry";
import type { Finding } from "../types";
import type { ItemEvent } from "../../riot/types";

// Rough targets (CS at 10 minutes). A solid laner reaches ~70, a jungler ~60.
// TODO: replace with per-rank, per-role benchmarks from crawled matches.
const CS_TARGET_AT_10: Record<string, number> = { TOP: 70, MIDDLE: 70, BOTTOM: 70, JUNGLE: 60 };
const GOLD_PER_CS = 20; // blended melee/caster/cannon value, approximate
const CS_AVAILABLE_PER_MIN = 10; // ignores waves already pushed, so treat as an upper bound

/** CS at 10 well below target. */
export function detectLowCs(ctx: AnalysisContext): Finding[] {
  const target = CS_TARGET_AT_10[ctx.me.teamPosition];
  if (!target || ctx.frameCount <= 10) return [];
  const mine = cs(ctx.frame(10, ctx.me.participantId));
  const opponentCs = ctx.opponent ? cs(ctx.frame(10, ctx.opponent.participantId)) : undefined;
  if (mine >= target - 10) return [];
  const missing = target - mine;
  return [
    {
      id: "lowCs-10",
      kind: "lowCs",
      start: 0,
      end: 10 * 60_000,
      severity: missing > 25 ? 3 : 2,
      confidence: "high",
      lessonId: "cs-basics",
      data: { at: 10, cs: mine, target, opponentCs, goldLost: missing * GOLD_PER_CS },
    },
  ];
}

const MOVE_THRESHOLD = 3500; // units between two snapshots one minute apart
const MAX_CS_WHILE_MOVING = 2;

/**
 * Laning-phase minutes where you covered a lot of ground but picked up almost no CS and
 * nothing happened (no kill, death, assist, objective, shopping) to justify it.
 */
export function detectRunningNotFarming(ctx: AnalysisContext): Finding[] {
  const { me } = ctx;
  if (!["TOP", "MIDDLE", "BOTTOM"].includes(me.teamPosition)) return [];
  const pid = me.participantId;
  const purchases = ctx.events.filter(
    (e): e is ItemEvent => e.type === "ITEM_PURCHASED" && (e as ItemEvent).participantId === pid,
  );
  const elite = ctx.events.filter((e) => e.type === "ELITE_MONSTER_KILL");

  const flagged: { i: number; dist: number; cs: number }[] = [];
  for (let i = 4; i <= Math.min(14, ctx.frameCount - 1); i++) {
    const prev = ctx.frame(i - 1, pid);
    const cur = ctx.frame(i, pid);
    if (!prev || !cur) continue;
    const from = (i - 1) * 60_000;
    const to = i * 60_000;
    const dist = distance(prev.position, cur.position);
    const gained = cs(cur) - cs(prev);
    if (dist < MOVE_THRESHOLD || gained > MAX_CS_WHILE_MOVING) continue;
    // Something explains the movement: a fight/death, a recall (walking back), or an objective soon.
    if (involvedBetween(ctx, pid, from - 30_000, to + 15_000)) continue;
    if (purchases.some((p) => p.timestamp >= from - 60_000 && p.timestamp <= to)) continue;
    if (elite.some((e) => e.timestamp >= from && e.timestamp <= to + 90_000)) continue;
    flagged.push({ i, dist, cs: gained });
  }

  // Merge consecutive minutes into one finding.
  const findings: Finding[] = [];
  for (let k = 0; k < flagged.length;) {
    let j = k;
    while (j + 1 < flagged.length && flagged[j + 1]!.i === flagged[j]!.i + 1) j++;
    const group = flagged.slice(k, j + 1);
    const minutes = group.length;
    findings.push({
      id: `running-${group[0]!.i}`,
      kind: "runningNotFarming",
      start: (group[0]!.i - 1) * 60_000,
      end: group[group.length - 1]!.i * 60_000,
      severity: minutes >= 2 ? 3 : 2,
      confidence: "medium",
      lessonId: "wave-control",
      data: {
        minutes,
        distance: Math.round(group.reduce((s, g) => s + g.dist, 0)),
        csGained: group.reduce((s, g) => s + g.cs, 0),
        csExpected: minutes * CS_AVAILABLE_PER_MIN,
      },
    });
    k = j + 1;
  }
  return findings;
}
