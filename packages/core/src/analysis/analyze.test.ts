import { describe, expect, it } from "vitest";
import { analyzeMatch } from "./analyze";
import { buildSampleGame, SAMPLE_PUUID } from "../demo/sampleGame";

describe("analyzeMatch", () => {
  const { match, timeline } = buildSampleGame();
  const result = analyzeMatch(match, timeline, SAMPLE_PUUID);
  const kinds = result.findings.map((f) => f.kind);

  it("identifies you and your lane opponent", () => {
    expect(result.championName).toBe("Ahri");
    expect(result.opponentChampion).toBe("Zed");
  });

  it("flags losing the level 6 race and dying in that window", () => {
    const race = result.findings.find((f) => f.kind === "levelRace");
    expect(race?.data).toMatchObject({ level: 6, opponent: "Zed", diedInWindow: true });
    expect(race?.severity).toBe(3);
  });

  it("flags Vi sharing XP in mid", () => {
    const share = result.findings.find((f) => f.kind === "xpSharing");
    expect(share?.kind === "xpSharing" && share.data.ally).toBe("Vi");
  });

  it("explains the death: Zed R + Ignite, ganked by Lee Sin", () => {
    const death = result.findings.find((f) => f.kind === "death");
    if (death?.kind !== "death") throw new Error("no death finding");
    expect(death.data.killer).toBe("Zed");
    expect(death.data.ganked).toBe(true);
    expect(death.data.sources[0]).toMatchObject({ name: "Zed", spell: "R", physical: 400 });
    expect(death.data.sources.map((s) => s.spell)).toContain("Ignite");
    expect(death.data.totals).toEqual({ physical: 490, magic: 0, true: 120 });
  });

  it("flags low CS, running without farming, and unspent gold", () => {
    expect(kinds).toContain("lowCs");
    expect(kinds).toContain("runningNotFarming");
    expect(kinds).toContain("unspentGold");
  });

  it("computes lane diffs", () => {
    expect(result.metrics.csAt10).toBeLessThan(70);
    expect(result.metrics.level6At).toBe(440_000);
    expect(result.metrics.opponentLevel6At).toBe(390_000);
  });
});
