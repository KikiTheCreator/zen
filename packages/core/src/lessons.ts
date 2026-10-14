// Short lessons linked from review findings. Full curriculum: docs/research/03-curriculum.md.
// Patch context: 2026 season (minions spawn at 0:30, permanent turret plates, Role Quests).

export type LessonId =
  | "cs-basics"
  | "dont-die"
  | "wave-control"
  | "level-spikes"
  | "xp-sharing"
  | "jungle-tracking"
  | "map-awareness"
  | "recall-timing";

export interface Lesson {
  id: LessonId;
  title: string;
  summary: string;
  points: string[];
  drill: string;
}

export const LESSONS: Record<LessonId, Lesson> = {
  "cs-basics": {
    id: "cs-basics",
    title: "Farming: gold you leave on the floor",
    summary:
      "A full wave is worth about as much as a kill. Missing CS is the most common way to fall behind without dying.",
    points: [
      "Aim for 6 CS/min, then 7, then 8+. Every missed minion is ~20 gold.",
      "Never miss cannon minions: they're worth the most.",
      "When you can't last-hit everything, prioritise the cannon, then melee minions.",
      "Farm the side waves after laning instead of walking around mid with your team.",
    ],
    drill: "Practice Tool, no items, 10 minutes: reach 80 CS. Repeat until it's consistent, then do it with a dummy.",
  },
  "dont-die": {
    id: "dont-die",
    title: "Not dying: the cheapest improvement",
    summary:
      "Each death gives gold, a free wave and time to the enemy. Most games at low rank are lost by avoidable deaths.",
    points: [
      "Before stepping forward ask: where is their jungler? How many enemies are missing?",
      "Respect the enemy's power spikes (level 2, 3, 6 and completed items).",
      "If you're not sure you win the fight, you don't take it.",
    ],
    drill: "Next 3 games: say out loud how many enemies are visible every time you go past your lane's middle.",
  },
  "wave-control": {
    id: "wave-control",
    title: "Wave control instead of walking around",
    summary:
      "Minions keep arriving every 30 seconds. Time away from the wave must buy something: a kill, an objective, a plate or a recall.",
    points: [
      "Slow push (kill only their casters) to build a big wave before you leave.",
      "Crash the wave into their tower, then roam or recall: you lose less CS.",
      "Freeze near your tower when you're ahead or under pressure.",
      "If you leave the lane without a plan, you lose CS and XP for nothing.",
    ],
    drill: "In a normal game, before every roam say: 'my wave is crashing, I have ~40 seconds'.",
  },
  "level-spikes": {
    id: "level-spikes",
    title: "Level spikes: who gets there first wins",
    summary: "Levels 2, 3 and 6 change the lane. Being a level behind at those moments makes all-ins lose.",
    points: [
      "Level 2 = first wave + the first melee minions of the second wave.",
      "Push the first waves to hit level 2 first, and trade right when you hit it.",
      "If the enemy hits 6 first, back off until you get yours.",
      "Shared XP (an ally in your lane) delays your levels.",
    ],
    drill: "Practice Tool: learn the exact minion count for your level 2 and 3. In game, watch the XP bar.",
  },
  "xp-sharing": {
    id: "xp-sharing",
    title: "XP sharing: when help costs you levels",
    summary:
      "Experience from minions is split among nearby champions. A jungler or roamer standing in your lane without fighting slows both of you down.",
    points: [
      "If an ally comes and there's no kill to get, ask them to leave or go take something else.",
      "As a jungler, gank and leave: don't stand in a lane farming XP.",
      "Solo lanes need solo XP: level 6 first often decides the lane.",
    ],
    drill: "When an ally is in lane with no play, ping 'retreat' and push the wave to make them move on.",
  },
  "jungle-tracking": {
    id: "jungle-tracking",
    title: "Tracking the enemy jungler",
    summary: "Most early deaths are ganks. Where the jungler was last seen tells you where they can be now.",
    points: [
      "Watch where they start (level 1 leash) and where their first clear ends (~3:15).",
      "If they show on the other side of the map, you can push. If they're unknown, play safe.",
      "Ward the river entrance closest to the enemy jungler's side.",
    ],
    drill: "Every game, write down where the enemy jungler showed first. Check it against their gank timing.",
  },
  "map-awareness": {
    id: "map-awareness",
    title: "Map awareness: don't go where your team isn't",
    summary: "Dying alone in the enemy half without vision is the most punishing mistake in mid and late game.",
    points: [
      "Look at the minimap every 3-5 seconds.",
      "Only walk into enemy jungle with vision or with your team.",
      "Count visible enemies: missing enemies are probably waiting for you.",
    ],
    drill: "Next game: look at the minimap every time you last-hit a minion.",
  },
  "recall-timing": {
    id: "recall-timing",
    title: "Recall timing: spend your gold",
    summary: "Gold in your pocket does nothing. Recall when you have gold for a component and your wave is pushed.",
    points: [
      "Crash your wave, then recall so you don't lose CS.",
      "Plan a target: an item component or completed item.",
      "Holding 1500+ gold for minutes means you fight with weaker stats than you paid for.",
    ],
    drill: "Before each recall, say the item you're buying. If you can't, you probably shouldn't recall yet.",
  },
};
