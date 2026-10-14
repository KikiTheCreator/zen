import type { Match, MatchParticipant, ParticipantFrame, Position, Timeline, TimelineFrame } from "../riot/types";

// Synthetic game: you are Ahri mid (id 3, blue) vs Zed (id 8). Vi (id 2) is your jungler.
const ROSTER: [number, string, Position][] = [
  [1, "Garen", "TOP"],
  [2, "Vi", "JUNGLE"],
  [3, "Ahri", "MIDDLE"],
  [4, "Jinx", "BOTTOM"],
  [5, "Lulu", "UTILITY"],
  [6, "Darius", "TOP"],
  [7, "LeeSin", "JUNGLE"],
  [8, "Zed", "MIDDLE"],
  [9, "Caitlyn", "BOTTOM"],
  [10, "Thresh", "UTILITY"],
];
const MID = { x: 7400, y: 7400 };

function participant(id: number, championName: string, teamPosition: Position): MatchParticipant {
  return {
    puuid: `p${id}`,
    participantId: id,
    teamId: id <= 5 ? 100 : 200,
    championId: id,
    championName,
    teamPosition,
    win: id <= 5,
    kills: 0,
    deaths: 0,
    assists: 0,
    champLevel: 12,
    totalMinionsKilled: 150,
    neutralMinionsKilled: 0,
    goldEarned: 9000,
    totalDamageDealtToChampions: 10000,
    physicalDamageTaken: 8000,
    magicDamageTaken: 4000,
    trueDamageTaken: 500,
    visionScore: 20,
    item0: 0,
    item1: 0,
    item2: 0,
    item3: 0,
    item4: 0,
    item5: 0,
    item6: 0,
  };
}

/** A synthetic ranked game with one example of each mistake Zen detects. Used by tests and the demo page. */
export function buildSampleGame() {
  const frames: TimelineFrame[] = [];
  for (let i = 0; i <= 20; i++) {
    const pf: Record<string, ParticipantFrame> = {};
    for (const [id] of ROSTER) {
      pf[id] = {
        participantId: id,
        position: { x: 2000 + id * 1000, y: 2000 + id * 600 },
        currentGold: 300,
        totalGold: 500 + i * 400,
        xp: i * 400,
        level: 1 + Math.floor(i / 2),
        minionsKilled: i * 7,
        jungleMinionsKilled: 0,
      };
    }
    // Me: in mid, farming poorly (4.5 CS/min), XP behind Zed while Vi sits in lane at 4-6.
    pf[3] = {
      ...pf[3]!,
      position: MID,
      minionsKilled: Math.round(i * 4.5),
      xp: i >= 4 && i <= 6 ? 1200 + (i - 3) * 150 : i * 380,
    };
    pf[8] = { ...pf[8]!, position: { x: 8200, y: 8200 } };
    if (i >= 4 && i <= 6) pf[2] = { ...pf[2]!, position: { x: 7700, y: 7300 } };
    // Minute 9→10: walked to top lane with no CS and nothing happening.
    if (i === 10) pf[3] = { ...pf[3]!, position: { x: 1500, y: 12500 }, minionsKilled: pf[3]!.minionsKilled - 4 };
    // Sitting on gold 15-18.
    if (i >= 15 && i <= 18) pf[3] = { ...pf[3]!, currentGold: 2100 };
    frames.push({ timestamp: i * 60_000, participantFrames: pf, events: [] });
  }
  frames[7]!.events.push(
    { type: "LEVEL_UP", timestamp: 390_000, participantId: 8, level: 6 },
    {
      type: "CHAMPION_KILL",
      timestamp: 420_000,
      killerId: 8,
      victimId: 3,
      assistingParticipantIds: [7],
      position: { x: 8000, y: 8100 },
      victimDamageReceived: [
        {
          basic: false,
          magicDamage: 0,
          physicalDamage: 400,
          trueDamage: 0,
          name: "Zed",
          participantId: 8,
          spellName: "ZedR",
          spellSlot: 3,
          type: "OTHER",
        },
        {
          basic: false,
          magicDamage: 0,
          physicalDamage: 0,
          trueDamage: 120,
          name: "Zed",
          participantId: 8,
          spellName: "SummonerDot",
          spellSlot: 4,
          type: "OTHER",
        },
        {
          basic: true,
          magicDamage: 0,
          physicalDamage: 90,
          trueDamage: 0,
          name: "LeeSin",
          participantId: 7,
          spellName: "",
          spellSlot: 0,
          type: "OTHER",
        },
      ],
    },
  );
  frames[8]!.events.push({ type: "LEVEL_UP", timestamp: 440_000, participantId: 3, level: 6 });

  const match: Match = {
    metadata: { matchId: "LA1_1", participants: ROSTER.map(([id]) => `p${id}`) },
    info: {
      gameCreation: 0,
      gameDuration: 20 * 60,
      gameVersion: "16.20.1",
      gameMode: "CLASSIC",
      queueId: 420,
      mapId: 11,
      participants: ROSTER.map(([id, name, pos]) => participant(id, name, pos)),
    },
  };
  const timeline: Timeline = { metadata: { matchId: "LA1_1" }, info: { frameInterval: 60_000, frames } };
  return { match, timeline };
}

export const SAMPLE_PUUID = "p3";
