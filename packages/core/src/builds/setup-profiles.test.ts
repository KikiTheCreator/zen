import { describe, expect, it } from "vitest";
import fixture from "./setup-profiles.fixture.json";
import { SETUP_PROFILES } from "./setup-profiles";
import { championSetup } from "./setup";
import type { SetupCatalog } from "./setup-types";
import type { Position } from "../riot/types";

const catalogs = [fixture.en as SetupCatalog, fixture.es as SetupCatalog];

describe("authored champion setup catalog", () => {
  it.each(catalogs.map((catalog) => [catalog.locale, catalog] as const))(
    "returns complete current %s setups for every authored champion-role membership",
    (_locale, catalog) => {
      const seen = new Set<string>();
      for (const authored of SETUP_PROFILES) {
        for (const role of authored.roles) {
          for (const championId of authored.championIds) {
            const key = `${championId}:${role}`;
            expect(seen.has(key), `duplicate authored membership ${key}`).toBe(false);
            seen.add(key);

            const result = championSetup(championId, role, catalog);
            expect(result.status, `${catalog.locale} ${key}: ${result.issues.join("; ")}`).toBe("ready");
            expect(result.issues, `${catalog.locale} ${key}`).toEqual([]);
            expect(result.profile?.runes, `${catalog.locale} ${key}`).toHaveLength(2);
            expect(result.profile!.runes[0]!.primary[0]).not.toBe(result.profile!.runes[1]!.primary[0]);
            expect(result.profile?.starts.length, `${catalog.locale} ${key}`).toBeGreaterThan(0);
            expect(result.profile?.core.length, `${catalog.locale} ${key}`).toBeGreaterThan(0);
            expect(result.profile?.spells.length, `${catalog.locale} ${key}`).toBeGreaterThan(0);
            if (role === "JUNGLE") {
              expect(
                result.profile!.starts.some(({ itemId }) =>
                  ["1101", "1102", "1103", "1105", "1106", "1107"].includes(itemId),
                ),
              ).toBe(true);
              expect(result.profile!.spells.every(({ spellIds }) => spellIds.includes("SummonerSmite"))).toBe(true);
            } else {
              expect(
                result.profile!.spells.every(({ spellIds }) => !spellIds.includes("SummonerSmite")),
                key,
              ).toBe(true);
            }
            if (role === "UTILITY") expect(result.profile!.starts.some(({ itemId }) => itemId === "3865")).toBe(true);
          }
        }
      }
      expect(seen.size).toBe(48);
    },
  );

  it("keeps champion-specific damage and item paths coherent", () => {
    const catalog = catalogs[0]!;
    const get = (championId: string, role: Position) => championSetup(championId, role, catalog).profile!;

    const gwen = get("Gwen", "TOP");
    expect(gwen.core.map(({ itemId }) => itemId)).toEqual(["3115", "4633"]);
    expect(gwen.situational.map(({ itemId }) => itemId)).toContain("3165");
    expect(gwen.situational.map(({ itemId }) => itemId)).not.toContain("3033");
    expect(gwen.situational.map(({ itemId }) => itemId)).not.toContain("3156");

    const jhin = get("Jhin", "BOTTOM");
    expect(jhin.core.map(({ itemId }) => itemId)).toEqual(["6676", "3031"]);
    expect(jhin.core.map(({ itemId }) => itemId)).not.toContain("6672");
    expect(jhin.runes.map(({ primary }) => primary[0])).toEqual([8021, 8128]);

    const cassiopeia = get("Cassiopeia", "MIDDLE");
    expect(cassiopeia.core.map(({ itemId }) => itemId)).toEqual(["3070", "6653", "3003", "3116"]);
    expect(cassiopeia.boots).toEqual([]);

    const pyke = get("Pyke", "UTILITY");
    expect(pyke.core.map(({ itemId }) => itemId)).toEqual(["3179", "3142"]);
    expect(pyke.situational.map(({ itemId }) => itemId)).toContain("3814");

    for (const tank of ["Malphite", "Ornn", "Sion", "Shen"]) {
      const profile = get(tank, "TOP");
      expect(profile.runes.map(({ primary }) => primary[0])).toContain(8437);
      expect(profile.runes.map(({ primary }) => primary[0])).toContain(8439);
      expect(profile.core.map(({ itemId }) => itemId)).not.toContain("3078");
      expect(profile.situational.map(({ itemId }) => itemId)).not.toContain("3156");
      expect(profile.situational.map(({ itemId }) => itemId)).not.toContain("3033");
      expect(profile.situational.map(({ itemId }) => itemId)).toContain("3076");
      if (tank === "Malphite") {
        expect(profile.championNotes?.Malphite?.en).toContain("pre-6");
        expect(profile.runes.find(({ primary }) => primary[0] === 8439)?.when.en).toContain("level 6");
      }
    }
  });
});
