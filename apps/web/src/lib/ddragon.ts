import "server-only";
import { cacheLife } from "next/cache";
import type { ChampionInfo } from "@zen/core";

// Data Dragon: Riot's static data CDN. Images are loaded straight from Riot (their bandwidth).
const CDN = "https://ddragon.leagueoflegends.com";

export async function getVersion(): Promise<string> {
  "use cache";
  cacheLife("hours");
  const versions = (await fetch(`${CDN}/api/versions.json`).then((r) => r.json())) as string[];
  return versions[0]!;
}

export async function getChampions(): Promise<{ version: string; champions: Record<string, ChampionInfo> }> {
  "use cache";
  cacheLife("hours");
  const version = await getVersion();
  const json = (await fetch(`${CDN}/cdn/${version}/data/en_US/champion.json`).then((r) => r.json())) as {
    data: Record<string, ChampionInfo>;
  };
  const champions: Record<string, ChampionInfo> = {};
  for (const c of Object.values(json.data)) {
    champions[c.id] = { id: c.id, key: c.key, name: c.name, tags: c.tags, info: c.info };
  }
  return { version, champions };
}

/** Names of items purchasable on Summoner's Rift this patch. */
export async function getItemNames(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  const version = await getVersion();
  const json = (await fetch(`${CDN}/cdn/${version}/data/en_US/item.json`).then((r) => r.json())) as {
    data: Record<string, { name: string; maps: Record<string, boolean>; gold: { purchasable: boolean } }>;
  };
  return [
    ...new Set(
      Object.values(json.data)
        .filter((i) => i.maps["11"] && i.gold.purchasable)
        .map((i) => i.name),
    ),
  ];
}

export function championIcon(version: string, championId: string) {
  return `${CDN}/cdn/${version}/img/champion/${championId}.png`;
}

export function mapImage(version: string) {
  return `${CDN}/cdn/${version}/img/map/map11.png`;
}
