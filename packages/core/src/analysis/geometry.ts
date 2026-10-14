import type { Point, Position, TeamId } from "../riot/types";

// Summoner's Rift coordinates: (0,0) is the blue (team 100) corner, red base near (14800,14800).
export const MAP_SIZE = 15000;

export type Zone = "top" | "mid" | "bot" | "blueBase" | "redBase" | "jungle";

export function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** Rough zone classification. Good enough for minute-level frames, not for precise pathing. */
export function zoneOf({ x, y }: Point): Zone {
  if (x < 4200 && y < 4200 && x + y < 7000) return "blueBase";
  if (x > 10600 && y > 10600 && x + y > 23000) return "redBase";
  if (x < 2600 && y > 5000) return "top";
  if (y > 12300 && x < 10000) return "top";
  if (x < 4500 && y > 10500) return "top";
  if (y < 2600 && x > 5000) return "bot";
  if (x > 12300 && y < 10000) return "bot";
  if (x > 10500 && y < 4500) return "bot";
  if (Math.abs(x - y) < 2200) return "mid";
  return "jungle";
}

export const LANE_OF_POSITION: Partial<Record<Position, Zone>> = {
  TOP: "top",
  MIDDLE: "mid",
  BOTTOM: "bot",
  UTILITY: "bot",
};

/** True when the point is on the enemy team's side of the river diagonal. */
export function inEnemyHalf(point: Point, team: TeamId): boolean {
  const sum = point.x + point.y;
  return team === 100 ? sum > MAP_SIZE + 600 : sum < MAP_SIZE - 600;
}
