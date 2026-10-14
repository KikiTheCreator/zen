import type { Finding } from "@zen/core";

export function clock(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export function signed(n: number | undefined): string {
  if (n === undefined) return "–";
  return `${n > 0 ? "+" : ""}${Math.round(n)}`;
}

/** "Name#TAG" ⇄ URL segment "Name-TAG" (tags can't contain "-"; names can, so split on the last one). */
export function riotIdToSlug(gameName: string, tagLine: string) {
  return encodeURIComponent(`${gameName}-${tagLine}`);
}

export function slugToRiotId(slug: string): { gameName: string; tagLine: string } | undefined {
  const decoded = decodeURIComponent(slug);
  const i = decoded.lastIndexOf("-");
  if (i <= 0 || i === decoded.length - 1) return undefined;
  return { gameName: decoded.slice(0, i), tagLine: decoded.slice(i + 1) };
}

const NAME_EXCEPTIONS: Record<string, string> = {
  MonkeyKing: "Wukong",
  KSante: "K'Sante",
  Chogath: "Cho'Gath",
  Kaisa: "Kai'Sa",
  Khazix: "Kha'Zix",
  KogMaw: "Kog'Maw",
  Velkoz: "Vel'Koz",
  RekSai: "Rek'Sai",
  Belveth: "Bel'Veth",
  Leblanc: "LeBlanc",
  JarvanIV: "Jarvan IV",
  Nunu: "Nunu & Willump",
  Renata: "Renata Glasc",
  FiddleSticks: "Fiddlesticks",
};

/** Match-v5 gives Data Dragon ids ("LeeSin"); show display names ("Lee Sin"). */
export function champName(id: string): string {
  return NAME_EXCEPTIONS[id] ?? id.replace(/([a-z])([A-Z])/g, "$1 $2");
}

/** Human explanation for a finding. Kept out of @zen/core so it can be translated later. */
export function describeFinding(f: Finding): { title: string; body: string } {
  switch (f.kind) {
    case "levelRace": {
      const late = Math.round((f.data.myTime - f.data.opponentTime) / 1000);
      return {
        title: `${champName(f.data.opponent)} hit level ${f.data.level} ${late}s before you`,
        body:
          `${champName(f.data.opponent)} reached level ${f.data.level} at ${clock(f.data.opponentTime)}, you at ${clock(f.data.myTime)}.` +
          (f.data.diedInWindow
            ? " You died in that window, while you were a level behind."
            : " Avoid fighting while you're a level behind."),
      };
    }
    case "xpSharing":
      return {
        title: `${champName(f.data.ally)} shared your lane's XP`,
        body: `${champName(f.data.ally)} stayed in your lane for ~${f.data.minutes} min with no kill or fight. You gained ${f.data.myXpGain} XP vs ${f.data.opponentXpGain} for your opponent: ${f.data.xpBehind} XP behind.`,
      };
    case "death": {
      const d = f.data;
      const total = d.totals.physical + d.totals.magic + d.totals.true || 1;
      const top = d.sources
        .slice(0, 3)
        .map((s) => `${champName(s.name)} ${s.spell} (${Math.round((s.total / total) * 100)}%)`);
      const split = `${Math.round((d.totals.physical / total) * 100)}% physical, ${Math.round((d.totals.magic / total) * 100)}% magic, ${Math.round((d.totals.true / total) * 100)}% true`;
      const context = [
        d.ganked && "you were ganked by their jungler",
        d.isolated && "no ally was near you",
        d.enemyHalf && "you were on their side of the map",
        d.levelDiffVsKiller < 0 && `you were ${-d.levelDiffVsKiller} level(s) behind ${champName(d.killer)}`,
      ].filter(Boolean);
      return {
        title: `Killed by ${champName(d.killer)}${d.assisters.length ? ` + ${d.assisters.map(champName).join(", ")}` : ""}`,
        body: `${top.length ? `Damage: ${top.join(", ")}. ` : ""}${split}.${context.length ? ` Context: ${context.join("; ")}.` : ""}`,
      };
    }
    case "lowCs":
      return {
        title: `${f.data.cs} CS at ${f.data.at} min (target ${f.data.target})`,
        body: `That's about ${f.data.goldLost} gold missing${f.data.opponentCs !== undefined ? `; your opponent had ${f.data.opponentCs} CS` : ""}.`,
      };
    case "runningNotFarming":
      return {
        title: `Walked around for ${f.data.minutes} min instead of farming`,
        body: `You moved ~${f.data.distance} units but got ${f.data.csGained} CS (up to ~${f.data.csExpected} was available), and no kill, objective or recall came from it.`,
      };
    case "unspentGold":
      return {
        title: `Held up to ${f.data.maxGold} gold for ${f.data.minutes} min`,
        body: "That gold wasn't helping you fight. Recall after pushing your wave and turn it into items.",
      };
  }
}

export const SEVERITY_STYLE: Record<1 | 2 | 3, string> = {
  1: "border-sky-500/40 bg-sky-500/5",
  2: "border-amber-500/50 bg-amber-500/5",
  3: "border-rose-500/60 bg-rose-500/10",
};
