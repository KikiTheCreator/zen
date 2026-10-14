import type { LevelUpEvent } from "../../riot/types";
import { killEvents, type AnalysisContext } from "../context";
import type { Finding } from "../types";

const KEY_LEVELS = [2, 3, 6];
/** How late (ms) you must be before it counts. Early levels come fast, so the bar is lower. */
const THRESHOLD: Record<number, number> = { 2: 8_000, 3: 12_000, 6: 25_000 };

function levelTime(ctx: AnalysisContext, pid: number, level: number): number | undefined {
  return ctx.events.find(
    (e): e is LevelUpEvent => e.type === "LEVEL_UP" && e.participantId === pid && e.level === level,
  )?.timestamp;
}

/** Lane opponent reached a power spike level noticeably before you. */
export function detectLevelRace(ctx: AnalysisContext): Finding[] {
  const { me, opponent } = ctx;
  if (!opponent || me.teamPosition === "JUNGLE") return [];
  const findings: Finding[] = [];

  for (const level of KEY_LEVELS) {
    const myTime = levelTime(ctx, me.participantId, level);
    const opponentTime = levelTime(ctx, opponent.participantId, level);
    if (myTime === undefined || opponentTime === undefined) continue;
    if (myTime - opponentTime < THRESHOLD[level]!) continue;

    const diedInWindow = killEvents(ctx).some(
      (k) => k.victimId === me.participantId && k.timestamp >= opponentTime && k.timestamp <= myTime,
    );
    findings.push({
      id: `levelRace-${level}`,
      kind: "levelRace",
      start: opponentTime,
      end: myTime,
      severity: diedInWindow ? 3 : level === 6 ? 2 : 1,
      confidence: "high",
      lessonId: "level-spikes",
      data: { level, myTime, opponentTime, opponent: opponent.championName, diedInWindow },
    });
  }
  return findings;
}
