import { Suspense } from "react";
import { analyzeMatch, buildSampleGame, SAMPLE_PUUID } from "@zen/core";
import { getVersion } from "@/lib/ddragon";
import { MatchReview } from "@/components/match-review";

export default function DemoPage() {
  return (
    <div className="space-y-6">
      <p className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-3 text-sm text-ink/70">
        Demo: a made-up game showing every kind of mistake Zen detects. Search your Riot ID on the home page to review
        your real games.
      </p>
      <Suspense fallback={<p className="text-ink/60">Loading…</p>}>
        <Demo />
      </Suspense>
    </div>
  );
}

async function Demo() {
  const { match, timeline } = buildSampleGame();
  const analysis = analyzeMatch(match, timeline, SAMPLE_PUUID);
  return <MatchReview analysis={analysis} version={await getVersion()} backHref="/" backLabel="← Home" />;
}
