import { CHAMPION_ROLES } from "../data/championRoles";
import type { ChampionInfo } from "../champions";
import { POSITIONS, type Position } from "../riot/types";

type Shares = Record<Position, number>;

const FALLBACK_BY_CLASS: Record<string, Partial<Shares>> = {
  Marksman: { BOTTOM: 0.8, MIDDLE: 0.1, TOP: 0.1 },
  Support: { UTILITY: 0.8, MIDDLE: 0.2 },
  Mage: { MIDDLE: 0.6, UTILITY: 0.3, BOTTOM: 0.1 },
  Assassin: { MIDDLE: 0.6, JUNGLE: 0.4 },
  Tank: { TOP: 0.4, JUNGLE: 0.3, UTILITY: 0.3 },
  Fighter: { TOP: 0.6, JUNGLE: 0.4 },
};

/** Small floor so off-role picks are unlikely but never impossible. */
const EPSILON = 0.02;

export function roleShares(champ: ChampionInfo | undefined, id: string): Shares {
  const known = CHAMPION_ROLES[id] ?? FALLBACK_BY_CLASS[champ?.tags[0] ?? "Fighter"] ?? {};
  const shares = {} as Shares;
  for (const p of POSITIONS) shares[p] = (known[p] ?? 0) + EPSILON;
  return shares;
}

/**
 * Probability that each enemy plays each role, using every possible assignment of enemies
 * to distinct roles (so "4 enemies obviously fill 4 roles" solves the 5th).
 * `fixed` pins a champion to a role (user correction).
 */
export function predictRoles(
  enemyIds: string[],
  champions: Record<string, ChampionInfo>,
  fixed: Record<string, Position> = {},
): Record<string, Shares> {
  const shares = enemyIds.map((id) => {
    if (fixed[id]) {
      const pinned = {} as Shares;
      for (const p of POSITIONS) pinned[p] = p === fixed[id] ? 1 : 0;
      return pinned;
    }
    return roleShares(champions[id], id);
  });

  const totals = enemyIds.map(() => Object.fromEntries(POSITIONS.map((p) => [p, 0])) as Shares);
  let sum = 0;
  const used = new Set<Position>();
  const chosen: Position[] = [];

  const walk = (k: number, weight: number) => {
    if (weight === 0) return;
    if (k === enemyIds.length) {
      sum += weight;
      chosen.forEach((p, i) => (totals[i]![p] += weight));
      return;
    }
    for (const p of POSITIONS) {
      if (used.has(p)) continue;
      used.add(p);
      chosen.push(p);
      walk(k + 1, weight * shares[k]![p]);
      chosen.pop();
      used.delete(p);
    }
  };
  walk(0, 1);

  const result: Record<string, Shares> = {};
  enemyIds.forEach((id, i) => {
    const row = {} as Shares;
    for (const p of POSITIONS) row[p] = sum ? totals[i]![p] / sum : 0;
    result[id] = row;
  });
  return result;
}

/** Most likely lane opponent for `role`, with its probability. */
export function likelyOpponent(
  role: Position,
  predicted: Record<string, Shares>,
): { championId: string; probability: number } | undefined {
  let best: { championId: string; probability: number } | undefined;
  for (const [championId, row] of Object.entries(predicted)) {
    if (!best || row[role] > best.probability) best = { championId, probability: row[role] };
  }
  return best;
}
