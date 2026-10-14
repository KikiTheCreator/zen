import type { LevelUpEvent, Match, Timeline } from "../riot/types";
import { createContext, cs, killEvents, type AnalysisContext } from "./context";
import { detectDeaths } from "./detectors/deaths";
import { detectLowCs, detectRunningNotFarming } from "./detectors/farming";
import { detectUnspentGold } from "./detectors/gold";
import { detectLevelRace } from "./detectors/levelRace";
import { detectXpSharing } from "./detectors/xpSharing";
import type { Finding, MatchAnalysis, MatchMetrics } from "./types";

const DETECTORS: ((ctx: AnalysisContext) => Finding[])[] = [
  detectLevelRace,
  detectXpSharing,
  detectDeaths,
  detectLowCs,
  detectRunningNotFarming,
  detectUnspentGold,
];

export function analyzeMatch(match: Match, timeline: Timeline, puuid: string): MatchAnalysis {
  const ctx = createContext(match, timeline, puuid);
  const findings = DETECTORS.flatMap((detect) => detect(ctx)).sort((a, b) => a.start - b.start);
  return {
    matchId: match.metadata.matchId,
    championName: ctx.me.championName,
    opponentChampion: ctx.opponent?.championName,
    position: ctx.me.teamPosition,
    win: ctx.me.win,
    metrics: computeMetrics(ctx),
    findings,
  };
}

function computeMetrics(ctx: AnalysisContext): MatchMetrics {
  const { me, opponent } = ctx;
  const durationMin = ctx.durationMs / 60_000;
  const at = (i: number, pid: number) => (i < ctx.frameCount ? ctx.frame(i, pid) : undefined);
  const diff = (i: number, key: "totalGold" | "xp") => {
    const a = at(i, me.participantId);
    const b = opponent && at(i, opponent.participantId);
    return a && b ? a[key] - b[key] : undefined;
  };
  const level6 = (pid: number) =>
    ctx.events.find((e): e is LevelUpEvent => e.type === "LEVEL_UP" && e.participantId === pid && e.level === 6)
      ?.timestamp;

  const teamKills = killEvents(ctx).filter((k) => ctx.byId.get(k.killerId)?.teamId === me.teamId).length;

  return {
    durationMin,
    csPerMin: (me.totalMinionsKilled + me.neutralMinionsKilled) / Math.max(1, durationMin),
    csAt10: at(10, me.participantId) && cs(at(10, me.participantId)),
    csAt15: at(15, me.participantId) && cs(at(15, me.participantId)),
    goldDiffAt10: diff(10, "totalGold"),
    goldDiffAt15: diff(15, "totalGold"),
    xpDiffAt10: diff(10, "xp"),
    xpDiffAt15: diff(15, "xp"),
    level6At: level6(me.participantId),
    opponentLevel6At: opponent && level6(opponent.participantId),
    deathsBefore14: killEvents(ctx).filter((k) => k.victimId === me.participantId && k.timestamp < 14 * 60_000).length,
    killParticipation: teamKills ? (me.kills + me.assists) / teamKills : 0,
    damageTaken: { physical: me.physicalDamageTaken, magic: me.magicDamageTaken, true: me.trueDamageTaken },
  };
}
