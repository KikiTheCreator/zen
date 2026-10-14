import type { DamageInstance } from "../../riot/types";
import { killEvents, type AnalysisContext } from "../context";
import { distance, inEnemyHalf } from "../geometry";
import type { DamageSource, Finding } from "../types";

const ALLY_NEAR_RADIUS = 2000;
const LANING_PHASE_END = 14 * 60_000;

/** One finding per death: what killed you, where, and whether you were alone or ganked. */
export function detectDeaths(ctx: AnalysisContext): Finding[] {
  const { me } = ctx;
  return killEvents(ctx)
    .filter((k) => k.victimId === me.participantId)
    .map((kill, n): Finding => {
      const killer = ctx.byId.get(kill.killerId);
      const assisters = (kill.assistingParticipantIds ?? []).map((id) => ctx.byId.get(id)).filter((p) => !!p);
      const enemiesInvolved = [killer, ...assisters].filter((p) => !!p);

      const fi = ctx.frameIndexAt(kill.timestamp);
      const isolated = !ctx.allies.some((a) => {
        const pos = ctx.frame(fi, a.participantId)?.position;
        return pos && distance(pos, kill.position) <= ALLY_NEAR_RADIUS;
      });
      const enemyHalf = inEnemyHalf(kill.position, me.teamId);
      const ganked =
        kill.timestamp < LANING_PHASE_END &&
        me.teamPosition !== "JUNGLE" &&
        enemiesInvolved.some((p) => p.teamPosition === "JUNGLE");

      const myLevel = ctx.frame(fi, me.participantId)?.level ?? 0;
      const killerLevel = killer ? (ctx.frame(fi, killer.participantId)?.level ?? 0) : myLevel;

      const { sources, totals } = summarizeDamage(kill.victimDamageReceived ?? []);

      let severity: 1 | 2 | 3 = 1;
      if (kill.timestamp < LANING_PHASE_END) severity = 2;
      if (isolated && enemyHalf) severity = 3;

      return {
        id: `death-${n}`,
        kind: "death",
        start: kill.timestamp,
        severity,
        confidence: "high",
        lessonId: ganked ? "jungle-tracking" : isolated && enemyHalf ? "map-awareness" : "dont-die",
        data: {
          position: kill.position,
          killer: killer?.championName ?? "Minions/Turret",
          assisters: assisters.map((a) => a.championName),
          ganked,
          isolated,
          enemyHalf,
          levelDiffVsKiller: myLevel - killerLevel,
          sources,
          totals,
        },
      };
    });
}

function summarizeDamage(instances: DamageInstance[]) {
  const bySource = new Map<string, DamageSource>();
  const totals = { physical: 0, magic: 0, true: 0 };
  for (const d of instances) {
    const spell = spellLabel(d);
    const key = `${d.name}|${spell}`;
    const entry = bySource.get(key) ?? { name: d.name, spell, physical: 0, magic: 0, true: 0, total: 0 };
    entry.physical += d.physicalDamage;
    entry.magic += d.magicDamage;
    entry.true += d.trueDamage;
    entry.total += d.physicalDamage + d.magicDamage + d.trueDamage;
    bySource.set(key, entry);
    totals.physical += d.physicalDamage;
    totals.magic += d.magicDamage;
    totals.true += d.trueDamage;
  }
  const sources = [...bySource.values()].sort((a, b) => b.total - a.total);
  return { sources, totals };
}

const SUMMONER_SPELLS: Record<string, string> = {
  summonerdot: "Ignite",
  summonerflash: "Flash",
  summonerexhaust: "Exhaust",
  summonersmite: "Smite",
  summonerteleport: "Teleport",
  summonerhaste: "Ghost",
  summonerbarrier: "Barrier",
  summonerheal: "Heal",
  summonerboost: "Cleanse",
};

/** "ZedR" → "R", "SummonerDot" → "Ignite", basic attacks → "Basic attacks". */
function spellLabel(d: DamageInstance): string {
  if (d.basic) return "Basic attacks";
  const name = d.spellName.toLowerCase();
  for (const [key, label] of Object.entries(SUMMONER_SPELLS)) if (name.startsWith(key)) return label;
  if (d.type !== "OTHER") return d.type.charAt(0) + d.type.slice(1).toLowerCase(); // Tower, Minion, Monster
  return ["Q", "W", "E", "R"][d.spellSlot] ?? (d.spellName || "Unknown");
}
