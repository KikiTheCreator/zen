// Platform (summoner/league APIs) vs regional (account/match APIs) routing.

export type Region = "americas" | "europe" | "asia" | "sea";

export const PLATFORMS = {
  na1: { label: "North America", region: "americas" },
  br1: { label: "Brazil", region: "americas" },
  la1: { label: "LAN", region: "americas" },
  la2: { label: "LAS", region: "americas" },
  euw1: { label: "Europe West", region: "europe" },
  eun1: { label: "Europe Nordic & East", region: "europe" },
  tr1: { label: "Türkiye", region: "europe" },
  ru: { label: "Russia", region: "europe" },
  me1: { label: "Middle East", region: "europe" },
  kr: { label: "Korea", region: "asia" },
  jp1: { label: "Japan", region: "asia" },
  oc1: { label: "Oceania", region: "sea" },
  sg2: { label: "Southeast Asia", region: "sea" },
  tw2: { label: "Taiwan", region: "sea" },
  vn2: { label: "Vietnam", region: "sea" },
} as const satisfies Record<string, { label: string; region: Region }>;

export type Platform = keyof typeof PLATFORMS;

export function isPlatform(value: string): value is Platform {
  return value in PLATFORMS;
}

export function regionOf(platform: Platform): Region {
  return PLATFORMS[platform].region;
}

/** Account-v1 has no SEA cluster; any of the other three resolves every account. */
export function accountRegionOf(platform: Platform): Exclude<Region, "sea"> {
  const region = regionOf(platform);
  return region === "sea" ? "asia" : region;
}

/** Match ids are prefixed with the platform, e.g. "LA1_1234567890". */
export function platformOfMatchId(matchId: string): Platform | undefined {
  const prefix = matchId.split("_")[0]?.toLowerCase() ?? "";
  return isPlatform(prefix) ? prefix : undefined;
}

/** Parse "Name#TAG" (tag optional → caller supplies default). */
export function parseRiotId(input: string): { gameName: string; tagLine: string } | undefined {
  const [gameName, tagLine] = input.trim().split("#");
  if (!gameName || !tagLine) return undefined;
  return { gameName: gameName.trim(), tagLine: tagLine.trim() };
}
