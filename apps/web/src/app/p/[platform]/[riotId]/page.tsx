import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { isPlatform, POSITION_LABEL, type Position } from "@zen/core";
import { championIcon, getVersion } from "@/lib/ddragon";
import { attempt, getAccount, getMatch, getMatchIds, isSummonersRift } from "@/lib/riot";
import { slugToRiotId } from "@/lib/format";
import { ErrorBox } from "@/components/error-box";

export default function PlayerPage({ params }: PageProps<"/p/[platform]/[riotId]">) {
  return (
    <Suspense fallback={<p className="text-ink/60">Loading your games…</p>}>
      <PlayerGames params={params} />
    </Suspense>
  );
}

async function PlayerGames({ params }: Pick<PageProps<"/p/[platform]/[riotId]">, "params">) {
  const { platform, riotId } = await params;
  const id = slugToRiotId(riotId);
  if (!isPlatform(platform) || !id) notFound();

  const result = await attempt(async () => {
    const account = await getAccount(platform, id.gameName, id.tagLine);
    const [ids, version] = await Promise.all([getMatchIds(platform, account.puuid), getVersion()]);
    const matches = (await Promise.all(ids.map(getMatch))).filter(isSummonersRift);
    return { account, version, matches };
  });
  if ("error" in result) return <ErrorBox error={result.error} />;
  const { account, version, matches } = result.data;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        {account.gameName}
        <span className="text-ink/40">#{account.tagLine}</span>
      </h1>
      {matches.length === 0 && <p className="text-ink/60">No recent Summoner&apos;s Rift games found.</p>}
      <ul className="space-y-2">
        {matches.map((m) => {
          const me = m.info.participants.find((p) => p.puuid === account.puuid)!;
          const minutes = Math.round(m.info.gameDuration / 60);
          return (
            <li key={m.metadata.matchId}>
              <Link
                href={`/p/${platform}/${riotId}/match/${m.metadata.matchId}`}
                className={`flex items-center gap-4 rounded-lg border p-3 hover:bg-ink/5 ${
                  me.win ? "border-emerald-500/30" : "border-rose-500/30"
                }`}
              >
                <img src={championIcon(version, me.championName)} alt={me.championName} className="h-12 w-12 rounded" />
                <div className="flex-1">
                  <p className="font-medium">
                    {me.championName}{" "}
                    <span className="text-sm text-ink/50">
                      {me.teamPosition ? POSITION_LABEL[me.teamPosition as Position] : ""}
                    </span>
                  </p>
                  <p className="text-sm text-ink/60">
                    {me.kills}/{me.deaths}/{me.assists} · {me.totalMinionsKilled + me.neutralMinionsKilled} CS ·{" "}
                    {minutes} min
                  </p>
                </div>
                <span
                  className={me.win ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}
                >
                  {me.win ? "Win" : "Loss"}
                </span>
                <span className="text-sm text-ink/50">Review →</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
