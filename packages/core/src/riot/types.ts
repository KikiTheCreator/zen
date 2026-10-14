// Minimal Riot API types: only the fields Zen reads.
// Reference: https://developer.riotgames.com/apis (Account-v1, Match-v5)

export type Position = "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM" | "UTILITY";
export type TeamId = 100 | 200;

export interface Account {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface MatchParticipant {
  puuid: string;
  participantId: number;
  teamId: TeamId;
  championId: number;
  championName: string;
  /** Empty string in some modes (ARAM, remakes). */
  teamPosition: Position | "";
  riotIdGameName?: string;
  riotIdTagline?: string;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  champLevel: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  goldEarned: number;
  totalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  magicDamageTaken: number;
  trueDamageTaken: number;
  visionScore: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
}

export interface Match {
  metadata: { matchId: string; participants: string[] };
  info: {
    gameCreation: number;
    gameStartTimestamp?: number;
    gameDuration: number; // seconds
    gameVersion: string;
    gameMode: string;
    queueId: number;
    mapId: number;
    participants: MatchParticipant[];
  };
}

export interface Point {
  x: number;
  y: number;
}

export interface ParticipantFrame {
  participantId: number;
  position: Point;
  currentGold: number;
  totalGold: number;
  xp: number;
  level: number;
  minionsKilled: number;
  jungleMinionsKilled: number;
  damageStats?: { totalDamageDoneToChampions?: number };
}

export interface DamageInstance {
  basic: boolean;
  magicDamage: number;
  physicalDamage: number;
  trueDamage: number;
  /** Champion name, or monster/minion/turret name. */
  name: string;
  participantId: number;
  spellName: string;
  spellSlot: number;
  type: "OTHER" | "MINION" | "MONSTER" | "TOWER" | string;
}

interface BaseEvent {
  timestamp: number;
  type: string;
}

export interface ChampionKillEvent extends BaseEvent {
  type: "CHAMPION_KILL";
  killerId: number; // 0 = executed by minion/turret/monster
  victimId: number;
  assistingParticipantIds?: number[];
  position: Point;
  victimDamageReceived?: DamageInstance[];
}

export interface LevelUpEvent extends BaseEvent {
  type: "LEVEL_UP";
  participantId: number;
  level: number;
}

export interface ItemEvent extends BaseEvent {
  type: "ITEM_PURCHASED" | "ITEM_SOLD" | "ITEM_DESTROYED" | "ITEM_UNDO";
  participantId: number;
  itemId?: number;
}

export interface EliteMonsterKillEvent extends BaseEvent {
  type: "ELITE_MONSTER_KILL";
  killerId: number;
  killerTeamId?: TeamId;
  monsterType: string;
  monsterSubType?: string;
  position: Point;
  assistingParticipantIds?: number[];
}

export interface BuildingKillEvent extends BaseEvent {
  type: "BUILDING_KILL";
  killerId: number;
  teamId: TeamId; // team that LOST the building
  position: Point;
  assistingParticipantIds?: number[];
}

export interface WardEvent extends BaseEvent {
  type: "WARD_PLACED" | "WARD_KILL";
  creatorId?: number;
  killerId?: number;
  wardType: string;
}

export type OtherEvent = BaseEvent & Record<string, unknown>;

export type TimelineEvent =
  ChampionKillEvent | LevelUpEvent | ItemEvent | EliteMonsterKillEvent | BuildingKillEvent | WardEvent;

export interface TimelineFrame {
  timestamp: number;
  participantFrames: Record<string, ParticipantFrame>;
  events: (TimelineEvent | OtherEvent)[];
}

export interface Timeline {
  metadata: { matchId: string };
  info: {
    frameInterval: number;
    frames: TimelineFrame[];
    participants?: { participantId: number; puuid: string }[];
  };
}

export const POSITIONS: Position[] = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"];

export const POSITION_LABEL: Record<Position, string> = {
  TOP: "Top",
  JUNGLE: "Jungle",
  MIDDLE: "Mid",
  BOTTOM: "Bot",
  UTILITY: "Support",
};
