import { classOf, damageTypeOf, traitsOf, type ChampionInfo } from "../champions";
import type { Trait } from "../data/championTraits";
import type { Position } from "../riot/types";
import { likelyOpponent, predictRoles } from "./rolePrediction";

export interface PoolEntry {
  championId: string;
  /** 0..1: how comfortable the player is (games, win rate, mastery). */
  comfort: number;
  games?: number;
  winRate?: number;
}

export interface DraftInput {
  role: Position;
  pool: PoolEntry[];
  /** Champion ids already picked by allies (not including you). */
  allies: string[];
  /** Champion ids locked by enemies. */
  enemies: string[];
  /** User corrections: enemy champion → role. */
  enemyRoles?: Record<string, Position>;
  champions: Record<string, ChampionInfo>;
}

export type ReasonKind = "comfort" | "team" | "enemies" | "lane";

export interface Reason {
  kind: ReasonKind;
  /** Positive helps the pick, negative hurts it. */
  impact: number;
  text: string;
}

export interface DraftOption {
  championId: string;
  score: number;
  reasons: Reason[];
}

export interface DraftResult {
  options: DraftOption[];
  likelyOpponent?: { championId: string; probability: number };
}

const WEIGHTS = { comfort: 0.45, team: 0.3, enemies: 0.15, lane: 0.1 };
/** Below this we say "opponent unknown" and ignore the lane term. */
const CONFIDENT_OPPONENT = 0.6;

export function recommendPicks(input: DraftInput, limit = 3): DraftResult {
  const { champions } = input;
  const taken = new Set([...input.allies, ...input.enemies]);
  const predicted = predictRoles(input.enemies, champions, input.enemyRoles);
  const opp = likelyOpponent(input.role, predicted);
  const opponent = opp && opp.probability >= CONFIDENT_OPPONENT ? opp : undefined;

  const options = input.pool
    .filter((entry) => champions[entry.championId] && !taken.has(entry.championId))
    .map((entry): DraftOption => {
      const champ = champions[entry.championId]!;
      const reasons: Reason[] = [
        ...comfortReasons(entry),
        ...teamReasons(
          champ,
          input.allies.map((id) => champions[id]).filter((c) => !!c),
        ),
        ...enemyReasons(
          champ,
          input.enemies.map((id) => champions[id]).filter((c) => !!c),
        ),
        ...(opponent ? laneReasons(champ, champions[opponent.championId]) : []),
      ];
      const part = (kind: ReasonKind) =>
        clamp(0.5 + reasons.filter((r) => r.kind === kind).reduce((s, r) => s + r.impact, 0), 0, 1);
      const raw =
        WEIGHTS.comfort * clamp(entry.comfort, 0, 1) +
        WEIGHTS.team * part("team") +
        WEIGHTS.enemies * part("enemies") +
        WEIGHTS.lane * (opponent ? part("lane") : 0.5);
      return { championId: entry.championId, score: Math.round(raw * 100), reasons };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return { options, likelyOpponent: opp };
}

function comfortReasons(entry: PoolEntry): Reason[] {
  if (entry.games === undefined) return [];
  const wr = entry.winRate !== undefined ? `, ${Math.round(entry.winRate * 100)}% WR` : "";
  return [{ kind: "comfort", impact: 0, text: `${entry.games} recent games${wr}` }];
}

function count(champs: ChampionInfo[], trait: Trait) {
  return champs.filter((c) => traitsOf(c).has(trait)).length;
}

function teamReasons(champ: ChampionInfo, allies: ChampionInfo[]): Reason[] {
  const reasons: Reason[] = [];
  if (allies.length === 0) return reasons;
  const dmg = damageTypeOf(champ);
  const ap =
    allies.filter((c) => damageTypeOf(c) === "AP").length +
    allies.filter((c) => damageTypeOf(c) === "MIXED").length / 2;
  const ad = allies.length - ap;
  if (dmg === "AP" && ap < 1 && allies.length >= 2)
    reasons.push({ kind: "team", impact: 0.3, text: "Your team has almost no magic damage" });
  if (dmg === "AD" && ad < 1 && allies.length >= 2)
    reasons.push({ kind: "team", impact: 0.3, text: "Your team has almost no physical damage" });
  if (dmg === "AD" && ad >= 3)
    reasons.push({ kind: "team", impact: -0.25, text: "Your team is already heavy on physical damage" });
  if (dmg === "AP" && ap >= 3)
    reasons.push({ kind: "team", impact: -0.25, text: "Your team is already heavy on magic damage" });

  const frontline = allies.some((c) => traitsOf(c).has("tank") || classOf(c) === "Tank");
  const isFront = traitsOf(champ).has("tank") || classOf(champ) === "Tank" || classOf(champ) === "Fighter";
  if (!frontline && isFront && allies.length >= 2)
    reasons.push({ kind: "team", impact: 0.2, text: "Adds the frontline your team is missing" });

  if (count(allies, "engage") === 0 && traitsOf(champ).has("engage") && allies.length >= 2)
    reasons.push({ kind: "team", impact: 0.2, text: "Gives your team a way to start fights" });

  const carries = allies.filter((c) => ["Marksman", "Mage"].includes(classOf(c)));
  if (carries.length >= 1 && (traitsOf(champ).has("hardCC") || traitsOf(champ).has("shielder")))
    reasons.push({ kind: "team", impact: 0.1, text: "Can protect your carries" });
  return reasons;
}

function enemyReasons(champ: ChampionInfo, enemies: ChampionInfo[]): Reason[] {
  const reasons: Reason[] = [];
  if (enemies.length === 0) return reasons;
  const cls = classOf(champ);
  const traits = traitsOf(champ);
  const tanks = count(enemies, "tank");
  const burst = count(enemies, "burstAD") + count(enemies, "burstAP");
  const cc = count(enemies, "hardCC");
  const poke = count(enemies, "poke");

  if (tanks >= 2 && (cls === "Marksman" || traits.has("scalesLate")))
    reasons.push({ kind: "enemies", impact: 0.25, text: `Sustained damage is good against their ${tanks} tanks` });
  if (tanks >= 2 && cls === "Assassin")
    reasons.push({ kind: "enemies", impact: -0.25, text: `Assassins struggle against ${tanks} tanks` });
  if (burst >= 2 && (cls === "Tank" || traits.has("tank")))
    reasons.push({ kind: "enemies", impact: 0.15, text: "Hard to burst down for their assassins" });
  if (burst >= 2 && (cls === "Marksman" || cls === "Mage") && !traits.has("engage"))
    reasons.push({ kind: "enemies", impact: -0.15, text: `Fragile against their ${burst} burst threats` });
  if (cc >= 3 && (cls === "Assassin" || cls === "Fighter"))
    reasons.push({ kind: "enemies", impact: -0.1, text: "Their team has a lot of crowd control to stop you" });
  if (poke >= 2 && traits.has("engage"))
    reasons.push({ kind: "enemies", impact: 0.2, text: "Hard engage punishes their poke composition" });
  return reasons;
}

function laneReasons(champ: ChampionInfo, opponent: ChampionInfo | undefined): Reason[] {
  if (!opponent) return [];
  const mine = traitsOf(champ);
  const theirs = traitsOf(opponent);
  const reasons: Reason[] = [];
  if (theirs.has("strongEarly") && mine.has("scalesLate"))
    reasons.push({
      kind: "lane",
      impact: -0.2,
      text: `${opponent.name} is strong early; expect a hard first 10 minutes`,
    });
  if (mine.has("strongEarly") && theirs.has("scalesLate"))
    reasons.push({ kind: "lane", impact: 0.2, text: `You can punish ${opponent.name} before they scale` });
  if (classOf(opponent) === "Assassin" && mine.has("hardCC") && classOf(champ) === "Mage")
    reasons.push({ kind: "lane", impact: 0.1, text: `Your crowd control stops ${opponent.name}'s all-in` });
  return reasons;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
