import { notFound } from "next/navigation";
import { Suspense } from "react";
import { analyzeMatch, isPlatform } from "@zen/core";
import { getVersion } from "@/lib/ddragon";
import { attempt, getAccount, getMatch, getTimeline } from "@/lib/riot";
import { slugToRiotId } from "@/lib/format";
import { ErrorBox } from "@/components/error-box";
import { MatchReview } from "@/components/match-review";

export default function MatchPage({ params }: PageProps<"/p/[platform]/[riotId]/match/[matchId]">) {
  return (
    <Suspense fallback={<p className="text-ink/60">Analyzing the timeline…</p>}>
      <Review params={params} />
    </Suspense>
  );
}

async function Review({ params }: Pick<PageProps<"/p/[platform]/[riotId]/match/[matchId]">, "params">) {
  const { platform, riotId, matchId } = await params;
  const id = slugToRiotId(riotId);
  if (!isPlatform(platform) || !id) notFound();

  const result = await attempt(async () => {
    const account = await getAccount(platform, id.gameName, id.tagLine);
    const [match, timeline, version] = await Promise.all([getMatch(matchId), getTimeline(matchId), getVersion()]);
    return { analysis: analyzeMatch(match, timeline, account.puuid), version };
  });
  if ("error" in result) return <ErrorBox error={result.error} />;

  return <MatchReview {...result.data} backHref={`/p/${platform}/${riotId}`} backLabel="← All games" />;
}
