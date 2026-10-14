import { Suspense } from "react";
import { getChampions, getItemNames } from "@/lib/ddragon";
import { DraftTool } from "./draft-tool";

export default function DraftPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Champ select</h1>
        <p className="text-ink/60">
          Add your champion pool once, then fill in the picks as they happen. Zen ranks your champions for this team and
          suggests situational items and runes. Enemy lanes are a guess; tap a lane to correct it.
        </p>
      </div>
      <Suspense fallback={<p className="text-ink/60">Loading champions…</p>}>
        <DraftData />
      </Suspense>
    </div>
  );
}

async function DraftData() {
  const [{ version, champions }, itemNames] = await Promise.all([getChampions(), getItemNames()]);
  return <DraftTool version={version} champions={champions} itemNames={itemNames} />;
}
