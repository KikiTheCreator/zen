import { describe, expect, it } from "vitest";
import type { ChampionInfo } from "../champions";
import { situationalBuild } from "../builds/situational";
import { predictRoles } from "./rolePrediction";
import { recommendPicks } from "./score";

function champ(id: string, tags: string[], attack: number, magic: number): ChampionInfo {
  return { id, key: id, name: id, tags, info: { attack, defense: 5, magic, difficulty: 5 } };
}

const CHAMPIONS: Record<string, ChampionInfo> = Object.fromEntries(
  [
    champ("Zed", ["Assassin"], 9, 1),
    champ("Malphite", ["Tank", "Fighter"], 5, 7),
    champ("Ornn", ["Tank"], 5, 3),
    champ("Soraka", ["Support", "Mage"], 2, 7),
    champ("Caitlyn", ["Marksman"], 8, 2),
    champ("Pantheon", ["Fighter", "Assassin"], 9, 3),
    champ("Malzahar", ["Mage"], 2, 9),
    champ("Yasuo", ["Fighter", "Assassin"], 8, 4),
    champ("Annie", ["Mage"], 2, 10),
    champ("Vi", ["Fighter", "Assassin"], 8, 3),
    champ("Jinx", ["Marksman"], 9, 2),
    champ("KSante", ["Tank", "Fighter"], 8, 2),
    champ("Lulu", ["Support", "Mage"], 2, 7),
    champ("Darius", ["Fighter", "Tank"], 9, 1),
  ].map((c) => [c.id, c]),
);

describe("predictRoles", () => {
  it("is confident for one-role champions", () => {
    const roles = predictRoles(["Zed"], CHAMPIONS);
    expect(roles.Zed!.MIDDLE).toBeGreaterThan(0.9);
  });

  it("uses elimination: if the other four fill their roles, Pantheon is the support", () => {
    const roles = predictRoles(["Zed", "Caitlyn", "Ornn", "Vi", "Pantheon"], CHAMPIONS);
    expect(roles.Pantheon!.UTILITY).toBeGreaterThan(0.6);
  });

  it("respects user corrections", () => {
    const roles = predictRoles(["Pantheon"], CHAMPIONS, { Pantheon: "MIDDLE" });
    expect(roles.Pantheon!.MIDDLE).toBe(1);
  });
});

describe("recommendPicks", () => {
  it("prefers an AP pick when the team is all physical damage", () => {
    const result = recommendPicks({
      role: "MIDDLE",
      pool: [
        { championId: "Yasuo", comfort: 0.6 },
        { championId: "Malzahar", comfort: 0.6 },
      ],
      allies: ["KSante", "Vi", "Jinx"],
      enemies: ["Zed"],
      champions: CHAMPIONS,
    });
    expect(result.options[0]!.championId).toBe("Malzahar");
    expect(result.options[0]!.reasons.some((r) => r.text.includes("magic damage"))).toBe(true);
    expect(result.likelyOpponent).toMatchObject({ championId: "Zed" });
  });

  it("never suggests a champion that is already picked", () => {
    const result = recommendPicks({
      role: "MIDDLE",
      pool: [
        { championId: "Annie", comfort: 1 },
        { championId: "Malzahar", comfort: 0.2 },
      ],
      allies: [],
      enemies: ["Annie"],
      champions: CHAMPIONS,
    });
    expect(result.options.map((o) => o.championId)).toEqual(["Malzahar"]);
  });
});

describe("situationalBuild", () => {
  it("suggests armor penetration for a marksman against two tanks", () => {
    const advice = situationalBuild(CHAMPIONS.Jinx!, "BOTTOM", [CHAMPIONS.Malphite!, CHAMPIONS.Ornn!, CHAMPIONS.Zed!]);
    const tanks = advice.find((a) => a.threat === "tanks");
    expect(tanks?.items).toContain("Lord Dominik's Regards");
    expect(tanks?.reason).toContain("Malphite");
  });

  it("drops items that are not in the current patch", () => {
    const advice = situationalBuild(
      CHAMPIONS.Darius!,
      "TOP",
      [CHAMPIONS.Malphite!, CHAMPIONS.Ornn!],
      new Set(["Black Cleaver"]),
    );
    expect(advice.find((a) => a.threat === "tanks")?.items).toEqual(["Black Cleaver"]);
  });
});
