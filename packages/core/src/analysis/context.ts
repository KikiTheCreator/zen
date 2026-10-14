import type {
  ChampionKillEvent,
  Match,
  MatchParticipant,
  ParticipantFrame,
  Timeline,
  TimelineEvent,
} from "../riot/types";

export interface AnalysisContext {
  match: Match;
  timeline: Timeline;
  me: MatchParticipant;
  /** Enemy with the same teamPosition, when positions are assigned. */
  opponent?: MatchParticipant;
  allies: MatchParticipant[];
  enemies: MatchParticipant[];
  byId: Map<number, MatchParticipant>;
  events: TimelineEvent[];
  /** Participant frame at frame index `i` (frame i ≈ minute i). */
  frame(i: number, participantId: number): ParticipantFrame | undefined;
  /** Index of the frame closest to a timestamp (ms). */
  frameIndexAt(ms: number): number;
  frameCount: number;
  durationMs: number;
}

export function createContext(match: Match, timeline: Timeline, puuid: string): AnalysisContext {
  const participants = match.info.participants;
  const me = participants.find((p) => p.puuid === puuid);
  if (!me) throw new Error(`Player ${puuid} is not in match ${match.metadata.matchId}`);

  // Timeline participant ids normally equal Match-v5 ids; remap through puuid when present.
  const byId = new Map<number, MatchParticipant>();
  const timelineIds = timeline.info.participants;
  for (const p of participants) {
    const tid = timelineIds?.find((t) => t.puuid === p.puuid)?.participantId ?? p.participantId;
    byId.set(tid, { ...p, participantId: tid });
  }
  const all = [...byId.values()];
  const meT = all.find((p) => p.puuid === me.puuid)!;
  const allies = all.filter((p) => p.teamId === meT.teamId && p.participantId !== meT.participantId);
  const enemies = all.filter((p) => p.teamId !== meT.teamId);
  const opponent = meT.teamPosition ? enemies.find((p) => p.teamPosition === meT.teamPosition) : undefined;

  const frames = timeline.info.frames;
  const interval = timeline.info.frameInterval || 60_000;
  const events = frames.flatMap((f) => f.events) as TimelineEvent[];

  return {
    match,
    timeline,
    me: meT,
    opponent,
    allies,
    enemies,
    byId,
    events,
    frame: (i, pid) => frames[i]?.participantFrames[String(pid)],
    frameIndexAt: (ms) => Math.max(0, Math.min(frames.length - 1, Math.round(ms / interval))),
    frameCount: frames.length,
    durationMs: match.info.gameDuration * 1000,
  };
}

export function killEvents(ctx: AnalysisContext): ChampionKillEvent[] {
  return ctx.events.filter((e): e is ChampionKillEvent => e.type === "CHAMPION_KILL");
}

/** Whether a participant took part (killer, victim, assister) in any kill/objective in [from, to]. */
export function involvedBetween(ctx: AnalysisContext, pid: number, from: number, to: number): boolean {
  return ctx.events.some((e) => {
    if (e.timestamp < from || e.timestamp > to) return false;
    if (e.type === "CHAMPION_KILL") {
      return e.killerId === pid || e.victimId === pid || !!e.assistingParticipantIds?.includes(pid);
    }
    if (e.type === "ELITE_MONSTER_KILL" || e.type === "BUILDING_KILL") {
      return e.killerId === pid || !!e.assistingParticipantIds?.includes(pid);
    }
    return false;
  });
}

export function cs(frame: ParticipantFrame | undefined): number {
  return frame ? frame.minionsKilled + frame.jungleMinionsKilled : 0;
}
