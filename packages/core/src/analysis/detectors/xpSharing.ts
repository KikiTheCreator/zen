import { involvedBetween, type AnalysisContext } from "../context";
import { distance, LANE_OF_POSITION, zoneOf } from "../geometry";
import type { Finding } from "../types";

const SHARE_RADIUS = 1400; // XP range is ~1600 units; frames are snapshots so stay conservative
const FIRST_FRAME = 2;
const LAST_FRAME = 14;
const MIN_XP_BEHIND = 150;

/**
 * An ally stood in your solo lane for 2+ minute snapshots without a kill happening,
 * and you gained less XP than your lane opponent over that window.
 */
export function detectXpSharing(ctx: AnalysisContext): Finding[] {
  const { me, opponent } = ctx;
  if (!opponent) return [];
  if (me.teamPosition !== "TOP" && me.teamPosition !== "MIDDLE" && me.teamPosition !== "BOTTOM") return [];
  const lane = LANE_OF_POSITION[me.teamPosition];
  // Your bot lane partner is supposed to be there.
  const intruders = ctx.allies.filter((a) => !(me.teamPosition === "BOTTOM" && a.teamPosition === "UTILITY"));

  // For each ally, collect the frames where they were sharing your lane.
  const findings: Finding[] = [];
  for (const ally of intruders) {
    let run: number[] = [];
    const flush = () => {
      if (run.length >= 2) {
        const finding = evaluateWindow(ctx, ally.participantId, ally.championName, run);
        if (finding) findings.push(finding);
      }
      run = [];
    };
    for (let i = FIRST_FRAME; i <= Math.min(LAST_FRAME, ctx.frameCount - 1); i++) {
      const mine = ctx.frame(i, me.participantId);
      const theirs = ctx.frame(i, ally.participantId);
      const sharing =
        mine && theirs && zoneOf(mine.position) === lane && distance(mine.position, theirs.position) <= SHARE_RADIUS;
      if (sharing) run.push(i);
      else flush();
    }
    flush();
  }
  return findings;
}

function evaluateWindow(ctx: AnalysisContext, allyId: number, allyName: string, frames: number[]): Finding | undefined {
  const { me, opponent } = ctx;
  const first = frames[0]! - 1;
  const last = frames[frames.length - 1]!;
  const from = first * 60_000;
  const to = last * 60_000;
  // A gank or fight explains the visit; that's not passive XP sharing.
  if (involvedBetween(ctx, me.participantId, from, to) || involvedBetween(ctx, allyId, from, to)) return undefined;

  const gain = (pid: number) => (ctx.frame(last, pid)?.xp ?? 0) - (ctx.frame(first, pid)?.xp ?? 0);
  const myXpGain = gain(me.participantId);
  const opponentXpGain = gain(opponent!.participantId);
  const xpBehind = opponentXpGain - myXpGain;
  if (xpBehind < MIN_XP_BEHIND) return undefined;

  return {
    id: `xpSharing-${allyId}-${first}`,
    kind: "xpSharing",
    start: from,
    end: to,
    severity: xpBehind > 400 ? 3 : 2,
    confidence: "medium",
    lessonId: "xp-sharing",
    data: { ally: allyName, minutes: last - first, xpBehind, myXpGain, opponentXpGain },
  };
}
