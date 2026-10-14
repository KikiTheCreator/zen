import { classOf, damageTypeOf, traitsOf, type ChampionClass, type ChampionInfo } from "../champions";
import type { Trait } from "../data/championTraits";
import type { Position } from "../riot/types";

// Pre-game situational advice from the visible draft. Static on purpose (Riot policy):
// options + reasons, never a live in-game build. Item names are checked against the
// current patch's item.json by the caller (`availableItems`) so removed items drop out.

type BuildClass = ChampionClass;

export type Threat =
  | "tanks"
  | "healing"
  | "shields"
  | "burstAD"
  | "burstAP"
  | "suppress"
  | "heavyCC"
  | "critCarries"
  | "mostlyAD"
  | "mostlyAP";

export interface SituationalAdvice {
  threat: Threat;
  /** Why this applies, e.g. "Their team has 3 healers: Soraka, Aatrox, Vladimir". */
  reason: string;
  items: string[];
  runes: string[];
}

type Answers = Partial<Record<BuildClass, string[]>>;

const ITEM_ANSWERS: Record<Threat, Answers> = {
  tanks: {
    Marksman: ["Lord Dominik's Regards", "Blade of the Ruined King", "Kraken Slayer"],
    Fighter: ["Black Cleaver", "Serylda's Grudge"],
    Mage: ["Void Staff", "Liandry's Torment", "Cryptbloom"],
    Assassin: ["Serylda's Grudge", "Lord Dominik's Regards"],
  },
  healing: {
    Marksman: ["Mortal Reminder", "Executioner's Calling"],
    Fighter: ["Chempunk Chainsword", "Executioner's Calling"],
    Mage: ["Morellonomicon", "Oblivion Orb"],
    Assassin: ["Chempunk Chainsword", "Executioner's Calling"],
    Tank: ["Thornmail", "Bramble Vest"],
    Support: ["Oblivion Orb", "Morellonomicon"],
  },
  shields: {
    Marksman: ["Serpent's Fang"],
    Fighter: ["Serpent's Fang"],
    Assassin: ["Serpent's Fang"],
  },
  burstAD: {
    Marksman: ["Guardian Angel", "Immortal Shieldbow"],
    Fighter: ["Death's Dance", "Sterak's Gage"],
    Mage: ["Zhonya's Hourglass"],
    Assassin: ["Edge of Night"],
    Tank: ["Plated Steelcaps", "Randuin's Omen"],
    Support: ["Plated Steelcaps", "Zhonya's Hourglass"],
  },
  burstAP: {
    Marksman: ["Maw of Malmortius", "Wit's End"],
    Fighter: ["Maw of Malmortius", "Wit's End", "Mercury's Treads"],
    Mage: ["Banshee's Veil"],
    Assassin: ["Edge of Night", "Maw of Malmortius"],
    Tank: ["Kaenic Rookern", "Force of Nature"],
    Support: ["Mercury's Treads", "Banshee's Veil"],
  },
  suppress: {
    Marksman: ["Mercurial Scimitar", "Quicksilver Sash"],
    Fighter: ["Mercury's Treads", "Sterak's Gage"],
    Mage: ["Banshee's Veil"],
    Assassin: ["Quicksilver Sash"],
    Tank: ["Mercury's Treads"],
    Support: ["Mikael's Blessing"],
  },
  heavyCC: {
    Marksman: ["Mercury's Treads"],
    Fighter: ["Mercury's Treads", "Sterak's Gage"],
    Mage: ["Mercury's Treads"],
    Assassin: ["Mercury's Treads"],
    Tank: ["Mercury's Treads"],
    Support: ["Mercury's Treads", "Mikael's Blessing"],
  },
  critCarries: {
    Fighter: ["Randuin's Omen"],
    Tank: ["Randuin's Omen", "Frozen Heart", "Thornmail"],
    Support: ["Randuin's Omen", "Frozen Heart"],
  },
  mostlyAD: {
    Fighter: ["Plated Steelcaps", "Death's Dance"],
    Mage: ["Zhonya's Hourglass"],
    Tank: ["Frozen Heart", "Thornmail", "Randuin's Omen"],
    Support: ["Plated Steelcaps"],
  },
  mostlyAP: {
    Fighter: ["Mercury's Treads", "Spirit Visage"],
    Mage: ["Banshee's Veil"],
    Tank: ["Kaenic Rookern", "Force of Nature", "Spirit Visage"],
    Support: ["Mercury's Treads"],
  },
};

const RUNE_ANSWERS: Partial<Record<Threat, string[]>> = {
  tanks: ["Cut Down"],
  burstAD: ["Bone Plating"],
  burstAP: ["Bone Plating"],
  heavyCC: ["Unflinching", "Legend: Tenacity"],
  suppress: ["Legend: Tenacity"],
};

const TRAIT_THREATS: [Trait, Threat, number, string][] = [
  ["tank", "tanks", 2, "tanks"],
  ["healer", "healing", 2, "champions with big healing"],
  ["shielder", "shields", 1, "shielding champion(s)"],
  ["burstAD", "burstAD", 1, "physical burst threat(s)"],
  ["burstAP", "burstAP", 1, "magic burst threat(s)"],
  ["suppress", "suppress", 1, "point-and-click lockdown(s)"],
  ["hardCC", "heavyCC", 3, "champions with hard crowd control"],
  ["critCarry", "critCarries", 2, "crit / attack-speed carries"],
];

export function situationalBuild(
  me: ChampionInfo,
  role: Position,
  enemies: ChampionInfo[],
  availableItems?: Set<string>,
): SituationalAdvice[] {
  const buildClass: BuildClass = role === "UTILITY" && classOf(me) !== "Tank" ? "Support" : classOf(me);
  const advice: SituationalAdvice[] = [];

  const add = (threat: Threat, reason: string) => {
    const items = (ITEM_ANSWERS[threat][buildClass] ?? []).filter((i) => !availableItems || availableItems.has(i));
    const runes = RUNE_ANSWERS[threat] ?? [];
    if (items.length || runes.length) advice.push({ threat, reason, items, runes });
  };

  for (const [trait, threat, min, label] of TRAIT_THREATS) {
    const matching = enemies.filter((e) => traitsOf(e).has(trait));
    if (matching.length >= min) {
      add(threat, `Their team has ${matching.length} ${label}: ${matching.map((e) => e.name).join(", ")}`);
    }
  }

  if (enemies.length >= 4) {
    const ap = enemies.filter((e) => damageTypeOf(e) === "AP").length;
    const ad = enemies.filter((e) => damageTypeOf(e) === "AD").length;
    if (ad >= 4) add("mostlyAD", `${ad} of their champions deal mostly physical damage`);
    if (ap >= 3) add("mostlyAP", `${ap} of their champions deal mostly magic damage`);
  }
  return advice;
}
