import { AP_OVERRIDES, CHAMPION_TRAITS, MIXED_DAMAGE, type Trait } from "./data/championTraits";

/** Subset of a Data Dragon `champion.json` entry. */
export interface ChampionInfo {
  /** Data Dragon id, e.g. "MonkeyKing". */
  id: string;
  /** Numeric champion id as a string, e.g. "62" (matches Match-v5 championId). */
  key: string;
  /** Display name, e.g. "Wukong". */
  name: string;
  /** Data Dragon classes, e.g. ["Fighter", "Tank"]. */
  tags: string[];
  info: { attack: number; defense: number; magic: number; difficulty: number };
}

export type DamageType = "AD" | "AP" | "MIXED";
export type ChampionClass = "Tank" | "Fighter" | "Mage" | "Assassin" | "Marksman" | "Support";

export function damageTypeOf(champ: ChampionInfo): DamageType {
  if (MIXED_DAMAGE.has(champ.id)) return "MIXED";
  if (AP_OVERRIDES.has(champ.id)) return "AP";
  return champ.info.magic > champ.info.attack ? "AP" : "AD";
}

export function classOf(champ: ChampionInfo): ChampionClass {
  return (champ.tags[0] as ChampionClass | undefined) ?? "Fighter";
}

export function traitsOf(champ: ChampionInfo): Set<Trait> {
  const traits = new Set(CHAMPION_TRAITS[champ.id]);
  if (!CHAMPION_TRAITS[champ.id] && champ.tags[0] === "Tank") traits.add("tank");
  return traits;
}

export function hasTrait(champ: ChampionInfo, trait: Trait): boolean {
  return traitsOf(champ).has(trait);
}
