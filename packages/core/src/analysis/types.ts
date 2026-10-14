import type { Point } from "../riot/types";
import type { LessonId } from "../lessons";

export type Severity = 1 | 2 | 3;
export type Confidence = "high" | "medium" | "low";

interface FindingBase {
  id: string;
  /** Game time in ms where the moment starts (use it for "watch your replay at"). */
  start: number;
  end?: number;
  severity: Severity;
  confidence: Confidence;
  lessonId: LessonId;
}

export interface DamageSource {
  name: string;
  spell: string;
  physical: number;
  magic: number;
  true: number;
  total: number;
}

export type Finding = FindingBase &
  (
    | {
        kind: "levelRace";
        data: { level: number; myTime: number; opponentTime: number; opponent: string; diedInWindow: boolean };
      }
    | {
        kind: "xpSharing";
        data: { ally: string; minutes: number; xpBehind: number; myXpGain: number; opponentXpGain: number };
      }
    | {
        kind: "death";
        data: {
          position: Point;
          killer: string;
          assisters: string[];
          ganked: boolean;
          isolated: boolean;
          enemyHalf: boolean;
          levelDiffVsKiller: number;
          sources: DamageSource[];
          totals: { physical: number; magic: number; true: number };
        };
      }
    | {
        kind: "lowCs";
        data: { at: number; cs: number; target: number; opponentCs?: number; goldLost: number };
      }
    | {
        kind: "runningNotFarming";
        data: { minutes: number; distance: number; csGained: number; csExpected: number };
      }
    | {
        kind: "unspentGold";
        data: { minutes: number; maxGold: number };
      }
  );

export type FindingKind = Finding["kind"];

export interface MatchMetrics {
  durationMin: number;
  csPerMin: number;
  csAt10?: number;
  csAt15?: number;
  goldDiffAt10?: number;
  goldDiffAt15?: number;
  xpDiffAt10?: number;
  xpDiffAt15?: number;
  level6At?: number;
  opponentLevel6At?: number;
  deathsBefore14: number;
  killParticipation: number;
  damageTaken: { physical: number; magic: number; true: number };
}

export interface MatchAnalysis {
  matchId: string;
  championName: string;
  opponentChampion?: string;
  position: string;
  win: boolean;
  metrics: MatchMetrics;
  findings: Finding[];
}
