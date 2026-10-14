# 03 — Curriculum: What to Teach, in What Order

Principle: a struggling player improves fastest by fixing **one habit at a time**.
Each lesson = concept (2–3 min read or short clip) → in-game drill → measurable check from
their match data. The app should only "unlock" the next focus when the metric improves.

⚠️ 2026 context: minions spawn at **0:30**, plates stay **all game** and extend to inner and
inhibitor turrets, untouched turrets grow **Crystalline Overgrowth** (damaging them makes
crystals explode for bonus damage), Atakhan and Feats of Strength are removed (first blood =
100g, first turret = 300g), Baron at **20:00**, epic monsters scale with champion level,
**Role Quests** exist, and **Faelights** boost warding at set spots. Verify numbers each patch.

---

## Level 0 — Fundamentals (biggest win for low elo)

### 0.1 Farming (CS)
- Target: 6 CS/min → 7 → 8+. Lose ~20g+ per missed minion, and a full wave ≈ 1 kill of gold.
- Melee minion ~21g, caster ~14g, cannon ~60g+ (growing). Never miss cannons.
- **Drill:** Practice Tool, no items, 10 minutes, 80+ CS. Then the same with an enemy dummy.
- **Metric (timeline):** CS@10, CS@15 vs role benchmarks.

### 0.2 Not dying
- Most low-elo games are lost by deaths that give gold + tempo + objectives.
- Before every step forward ask: *Where is the enemy jungler? How many enemies are missing?
  Do I have vision? Is my wave in a safe spot?*
- **Metric:** deaths before 14:00; deaths with 0 nearby allies; deaths without a ward nearby.

### 0.3 Minimap habit
- Look every time you last-hit, or every 3–5 seconds. Tip: bind camera to "semi-locked" and make
  the minimap bigger (Options → Interface → Minimap scale).
- **Drill:** in a normal game, call out loud each time you see an enemy on the map.

### 0.4 Champion pool discipline
- Pick 1 main role, 2–3 champions max. Mastery > meta at low and mid elo.

---

## Level 1 — Laning phase

### 1.1 Wave control (the most important lane skill)
Key idea: **whoever's wave pushes into the enemy tower gets weaker position; whoever's wave
is near their own tower is safer and forces the enemy to walk up.** Waves move toward the side
with fewer minions.

| Technique | How | When |
|---|---|---|
| **Slow push** | Kill only caster minions of enemy wave; let your bigger wave stack | Before recall / dive / roam / dragon. Creates a big wave that crashes |
| **Fast push / crash** | Kill everything fast | To recall without losing CS; to roam; before objectives |
| **Freeze** | Keep enemy wave just outside your tower by only last-hitting (enemy wave needs ~3–4 more caster minions than yours) | When ahead or vs lane bully; denies the enemy farm and exposes them to ganks |
| **Bounce** | Crash into tower → wave comes back to you | Recall timing: crash, recall, return as it bounces |
| **Reset (thin the wave)** | Kill your own wave under enemy tower or let it be destroyed | To break an enemy freeze |

- **Recall timing**: recall right after crashing a wave, with gold for a component.
  Bad recall = losing a full wave + plates.
- **Metric:** gold/XP diff@10 and @15 vs lane opponent, CS lost around recalls,
  plates taken/lost (BUILDING/TURRET_PLATE events).

### 1.2 Trading
- **Trade when the enemy can't answer**: when they last-hit (their animation commits them),
  when their key cooldown is used, when your minion wave is bigger (minion aggro hurts them),
  when you hit a level advantage (levels 2, 3, 6).
- **Level 2 spike:** 1st wave (6 minions) + 1st melee minion of 2nd wave (in lane solo).
  Whoever hits level 2 first can win an all-in.
- **Minion aggro:** hitting an enemy champion makes nearby enemy minions target you for ~2s.
  Trade then step back out of minions.
- **Short trade** (poke and leave) vs **extended trade/all-in**: depends on champion
  pattern (lesson 2.3).
- **Metric:** HP% at minute 5/10 vs opponent (via kills/deaths + gold), solo deaths in lane.

### 1.3 Matchups
For each of the player's champions, document the top 10 common matchups:
1. Who is stronger at levels 1-3, 6, at first item, and late?
2. Enemy's **key ability** (the one you must punish or dodge). Trade when it's on cooldown.
3. Who wants to short-trade and who wants to all-in?
4. Rune and starting-item adjustments.
5. Who should push the wave, and where does the jungler gank?
- App format: a "matchup card" with 5 lines, editable by the player after each game
  (their own notes become the best guide).

### 1.4 Jungle tracking (for laners)
- Infer jungler start from level 1 leash and the first 3 camps (with 0:30 minions,
  ~3:15 first full clear region; adjust to patch).
- If the enemy jungler showed bot side at 3:30 → top is safe to push; mid should be careful.
- **Metric:** deaths to ganks (kill event where killer is jungler + you are in lane).

---

## Level 2 — Learning a new champion (a reusable framework)

A 5-step template the app fills automatically from Data Dragon/Meraki + curated notes:

1. **Identity**: class (assassin, mage, juggernaut, tank, marksman, enchanter...), what role
   in teamfights (engage, peel, frontline, backline DPS, pick), win condition (split push,
   teamfight, early snowball).
2. **Abilities**: what each does, cooldowns at rank 1 vs max, **scaling ratios** (AD/AP/HP),
   **skill max order** and why ("max Q for wave clear and damage, W second for...").
3. **Combos**: 2–4 core combos, from basic to advanced, including **animation cancels**
   and **auto-reset** abilities. Drill in Practice Tool against a dummy: 20 clean reps.
4. **Power spikes**: levels (2/3/6/11/16), item spikes (first item, 2 items), when to fight.
5. **Runes and items**: default page + when to change it (vs heavy AP / poke / tanks).
   Show the "why" of every rune and item.

**Learning plan:** 1) 10 games in normals/Practice Tool before ranked, 2) first 5 games
focus only on combos + farming, 3) next 5 on trading windows and matchups.
**Metric:** CS/min and deaths trend over first 10–20 games on the champion.

---

## Level 3 — Micro mechanics

| Skill | Key concept | Drill |
|---|---|---|
| **Kiting (orb walking)** | Move between autos. Attack speed sets the rhythm; attack-move (A-click / "Player attack move click") on the cursor | Practice Tool: kite a dummy/bot in circles; Aim trainer custom games |
| **Spacing** | Stay just out of enemy ability/auto range; know your range vs theirs (Data Dragon gives attack range) | Show range overlays in Practice Tool (Options → show attack range) |
| **Dodging** | Move perpendicular to skillshots; don't walk in straight lines | Custom game vs Ezreal/Lux bots |
| **Animation cancel** | Abilities that reset/cancel an auto (e.g., Riven Q, Lucian E) | Champion-specific |
| **Flash usage** | Offensive flash for guaranteed kill; defensive only if it really saves you | Review deaths with flash up |
| **Target selection** | Hit the closest safe target; "Target champions only" key | Teamfight review |

Settings worth teaching: quick cast with indicator, attack-move on left click, smart-cast
for fast abilities, camera lock behavior.

---

## Level 4 — Tempo and macro

### 4.1 Tempo
- Tempo = **who can act first**. If your wave is crashing and theirs is not, you have
  free time to roam, invade, or take an objective, and they must catch the wave or lose gold.
- **Priority (prio)**: lanes with pushed waves can move first to help the jungler. Jungler should
  play toward lanes with prio.
- Recall syncing: recall at the same time as the enemy, or after you make them recall.

### 4.2 Objectives (2026)
- **Dragons**: soul at 4 drakes; elemental buffs; Dragon Vengeance helps the team that's behind.
- **Voidgrubs → Rift Herald → Baron (20:00)**; epic monsters scale with champion level.
- **Setup ~45–60s before spawn**: push waves near the objective, ward/sweep, recall with gold,
  then group. Bad setup is why most low-elo objective fights are lost.
- **Trade objectives**: if the enemy takes dragon, take grubs/herald/towers at the same time.
- **Turret plates are permanent now** and towers grow **Crystalline Overgrowth** if not
  hit, so side-lane pressure and splitpushing are stronger in 2026.

### 4.3 Role Quests (2026) — teach each role what its quest gives
- Top: free long-cooldown Teleport (or better TP shield), bonus XP, higher level cap
- Mid: free tier-3 boots, empowered recall
- ADC: gold, extra minion gold, **7th item slot**
- Jungle: more gold/XP from large monsters, movement speed in jungle
- Support: control-ward slot, ward discounts, passive gold
→ Lesson: "completing your quest is a power spike; plan your laning to get it."

### 4.4 Mid and late game
- After laning: **group for objectives, side lane with the right champion**, never face-check.
- **"1-3-1" and "1-4"**: splitpusher with TP (top Role Quest!) vs grouped team.
- Waves before objectives: push side waves first so they arrive at the same time as your team.
- After winning a fight: convert the gold into **objectives** (tower, dragon, baron), not chases.

---

## Level 5 — Map awareness and vision

- **Ward timing over ward count**: ward when the enemy jungler could arrive (3:00+), before
  objectives, and in the river/jungle entrances you'd be ganked from.
- **Faelights** (2026): preset spots that give extra vision to a ward placed there. Teach the
  map positions per game stage (show a map overlay with them; verify on current patch).
- **Control wards**: always carry one after the first recall (support has a dedicated slot).
- **Sweeping**: clear enemy vision before objectives (Oracle Lens).
- **Reading the map**: count enemies visible; "missing" = danger; last seen positions +
  move speed ≈ where they can be now.
- **Metric**: vision score/min, wards placed before each objective (WARD_PLACED events near
  dragon/baron 90s before ELITE_MONSTER_KILL), control wards bought.

---

## Level 6 — Itemization and runes

Teach the **logic**, then show options:
- **Damage type**: are the enemies mostly AP or AD? Who is fed? Who kills you?
- **Defensive answers**: armor vs AD, MR vs AP, **anti-heal (Grievous Wounds)** vs healers,
  **armor penetration** vs tanks stacking armor, **%HP damage** vs tanks, **QSS/Cleanse** vs
  point-and-click suppression, **Zhonya's/Stopwatch** vs dive/assassins, tenacity boots vs CC.
- **Build path**: buy components that give a spike now (e.g. first item component before
  the boots if the lane needs it).
- **Gold efficiency**: don't sit on gold; recall with a target amount.
- **Runes**: keystone fits the champion pattern (Conqueror = extended fights, Electrocute =
  burst trades, Grasp = short trades melee vs ranged, Phase Rush = escape/kiting,
  Aery/Comet = poke, Lethal Tempo = attack-speed fights...). Secondary runes adapt to matchup
  (Second Wind/Bone Plating vs poke, Unflinching vs CC...).
- App: show 2–3 build options for the player's champion and team composition with
  short reasons, **pre-game**. Post-game: compare what they bought vs enemy damage
  dealt (match detail gives damage taken by type).

---

## Level 7 — Teamfighting

- Know your job (from champion identity): engage, peel, backline, flank, zone.
- Positioning: frontline in front, carries behind, never be the first visible target.
- Ultimate and summoner check before fighting ("are their key ults up?").
- Fight around **numbers and cooldowns**, not emotions.

---

## Auto-detected mistakes (bridge between data and lessons)

| Mistake detector (timeline/match data) | Lesson |
|---|---|
| Died before 14:00 with no allied ward placed in last 90s nearby | 0.2, 5 |
| Died while enemy jungler was the killer/assister (gank) | 1.4 |
| CS@10 below role target | 0.1 |
| Large gold drop around recall (CS lost while away) | 1.1 recall timing |
| Objective lost with no wards placed in 90s before | 4.2, 5 |
| Died 30s before an objective spawned | 4.2 setup |
| No anti-heal bought vs 2+ healers on enemy team | 6 |
| Many deaths with Flash available | 3 |
| Deaths far from allies after 20:00 (position in enemy half) | 4.4, 5 |
| Damage taken mostly magic but only armor items | 6 |
| Lost games streak / long session | Mental (05) |
