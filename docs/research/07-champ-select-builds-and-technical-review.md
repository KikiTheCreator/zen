# 07 — Champ Select Assistant, Situational Builds, Technical Review

Decisions from the user (2026-10-14):
- The core in-game moment is **champion select**: pick the best champion from the player's
  pool for this match, plus situational runes/items.
- Reviews must be **more technical** than competitors (XP sharing, running instead of
  farming, etc.).

---

## A. Champ select assistant

### How to get the draft
| Option | How | Pros / cons |
|---|---|---|
| **Manual (web)** | Player taps allies + enemies on a phone/second screen | Zero policy risk, works everywhere; slower (≈20s) |
| **Desktop companion + LCU** | Reads `/lol-champ-select/v1/session` from the local League Client API | Automatic and instant. LCU is "not officially supported" and must be declared when registering the app. Not affected by the memory block (it's a local HTTP API, not game memory) |

Plan: **manual first** (MVP), desktop companion in phase 2.

Rules: show only picks the client shows the player. **Never** try to reveal hidden summoner
names in champ select (de-anonymizing is banned). Show **2–3 ranked options + reasons**; never
auto-lock or force one answer.

### Output on screen
```
Your pool for MID vs [Zed] with allies [K'Sante, Vi, Jinx, Lulu]
1. Malzahar  ★ 82  – Safe vs Zed (R suppresses through W/R shadow), team lacks AP, 58% WR (24 g)
2. Annie     ★ 71  – Point-and-click burst + engage with Vi; weaker if Zed gets level 6 first
3. Yasuo     ★ 55  – High comfort, but team already AD heavy (4 AD)
Runes for #1: ... (why)   Starting items: ... (why)   Situational items: see B
```

---

## B. Situational builds (rules engine, pre-game)

Allowed form: **static, pre-game guidance from the visible draft**, with options and reasons
("if their tank gets ahead, buy X"). Avoid an in-game overlay that changes the build live
from game state (that's the TFT policy's own example of a problem).

### Make it patch-proof
Don't hardcode item names. Tag items from **Data Dragon stats/descriptions** every patch
(armor pen, magic pen, anti-heal, %HP damage, armor, MR, tenacity, stasis, cleanse, spell shield,
lifesteal...), then the rules pick the best-fitting items **for the champion's class**.
Item names below are examples to check against the live patch.

### Enemy-draft triggers → answer by your class

| Trigger (from enemy draft tags) | Marksman | Fighter / bruiser | Mage | Assassin | Tank / support |
|---|---|---|---|---|---|
| **2+ tanks / armor stackers** | Lord Dominik's Regards, BotRK, Kraken | Black Cleaver, Serylda's Grudge | Void Staff, Liandry's, Cryptbloom | Target squishies; Serylda's/LDR late | Focus utility; Thornmail if they're AD |
| **Heavy healing** (Soraka, Aatrox, Vladimir, Sylas...) | Mortal Reminder / Executioner's | Chempunk Chainsword | Morellonomicon | Executioner's / Chempunk | Thornmail, support Oblivion Orb |
| **Shields** (Lulu, Karma, Janna...) | Serpent's Fang (AD) | Serpent's Fang | — | Serpent's Fang | — |
| **Burst assassin AD** (Zed, Talon, Rengar) | GA, Shieldbow | Death's Dance, Sterak's | Zhonya's, Stopwatch | Edge of Night | Plated Steelcaps, Randuin's |
| **Burst AP** (Syndra, LeBlanc, Fizz) | Maw of Malmortius / Wit's End | Maw, Wit's End, Mercury's | Banshee's Veil | Edge of Night / Maw | Kaenic Rookern, Force of Nature |
| **Point-and-click suppress/hard CC** (Malzahar, Warwick, Skarner, Urgot) | QSS / Mercurial Scimitar | Mercury's Treads, Sterak's | Banshee's | QSS | Mercury's Treads; Mikael's (support) |
| **Lots of CC overall** | Mercury's Treads | Mercury's, Sterak's | Mercury's | Mercury's | Mercury's |
| **Crit/AS carries** (Jinx, Yasuo, Tryndamere) | — | Randuin's (if tanky) | — | — | Randuin's, Frozen Heart, Thornmail |
| **Mostly AD team** | — | Armor items, Plated Steelcaps | Zhonya's | — | Frozen Heart, Thornmail, Randuin's |
| **Mostly AP team** | — | MR items | Banshee's | — | Kaenic Rookern, Force of Nature, Spirit Visage |

Also give **rune adjustments**: Second Wind / Bone Plating vs poke lanes; Unflinching /
Legend: Tenacity vs CC-heavy; Cut Down vs tanks; Coup de Grace vs squishies.
Each suggestion shows a **one-line reason** ("Their team has 3 healers: Vladimir, Soraka, Aatrox").

Data needed: a curated **champion tag table** (tank, healer, shielder, burst AD/AP,
suppress, CC count, crit carry...) for ~170 champions. That's the main content job, and
it's shared with the pick engine (04).

---

## C. Technical review (the differentiator)

### What the data gives (Match-V5 timeline)
- **Frames every 60s** per player: `position (x,y)`, `xp`, `level`, `minionsKilled`,
  `jungleMinionsKilled`, `currentGold`, `totalGold`, `damageStats`
  (e.g. `totalDamageDoneToChampions`, damage taken), `timeEnemySpentControlled`
- **Events with exact timestamps**: `LEVEL_UP`, `SKILL_LEVEL_UP`, `ITEM_PURCHASED/SOLD/UNDO`,
  `WARD_PLACED/KILLED`, `CHAMPION_KILL` (position, killer, assisters, **and a
  damage breakdown of what killed you**: `victimDamageReceived` with source champion,
  spell name, physical/magic/true), `ELITE_MONSTER_KILL`, `BUILDING_KILL`,
  `TURRET_PLATE_DESTROYED`
- **Limit:** positions are only every **60s**, so "running around" must be inferred
  (distance between frames + CS gained), not tracked second by second. Second-level
  precision would need the desktop companion recording **your own** game with the Live
  Client Data API (CS, gold, levels and items for all players; no positions). It only records
  and shows nothing during the game; the analysis happens after.

### Detector catalogue (each → explanation + lesson + replay timestamp)

**Laning XP/gold efficiency**
| Detector | How (data) |
|---|---|
| **XP sharing** | Your XP/min in lane vs lane opponent and vs the solo-lane benchmark; an ally (often your jungler or a roaming support) within ~1500 units of you in your lane in ≥2 frames while you're not fighting → "you shared 2 waves of XP with Vi at 4:00–6:00, which put you 1 level behind" |
| **Level race lost** | `LEVEL_UP` timestamps vs lane opponent for levels 2, 3, 6 → "Zed hit 6 at 7:41, you at 8:20, and you died at 7:55" |
| **Running instead of farming** | Distance traveled between frames is high but CS gain is low, and position is far from your lane while waves keep arriving → "minute 9–11: you walked ~7000 units and got 3 CS (≈30 available)" |
| **CS missed per wave** | CS/min vs minions that spawned (known wave schedule) → % of farm collected per phase (lane, mid, late) |
| **Bad roam** | Left lane (position) → no kill/assist/objective in the next 60–90s + CS lost |
| **Recall timing** | `currentGold` spike + purchases: recalled with <500g, or sat with >1500g without recalling; CS lost around recall (wave not pushed) |
| **Unspent gold** | Time spent with high `currentGold` alive in late game |
| **Plates** | Plates you lost or gave vs the window your lane allowed |

**Fighting**
| Detector | How |
|---|---|
| **What killed you** | `victimDamageReceived` → "72% of the damage was Zed R + Ignite. You had Flash available (no summoner use)" → lesson on the matchup's all-in |
| **Fought behind** | Death while level/item disadvantage vs killer (frames) |
| **Trading output** | Damage to champions per minute in lane vs opponent (frame `damageStats` delta) → "you're too passive" or "you trade but lose" |
| **Death positions** | Deaths in the enemy half without allies nearby, or no ward placed nearby in 90s |
| **Time dead** | Sum of death timers late game (deaths after 25:00 cost a lot) |

**Jungle specific**
| Detector | How |
|---|---|
| **Clear efficiency** | `jungleMinionsKilled` per minute vs benchmark; full-clear time |
| **Gank efficiency** | Positions in lanes + kill/assist/flash-burn within 60s; ganks into pushed lanes |
| **Farming vs ganking ratio** | Camps/min vs lane presence; idle frames |
| **Objective setup** | Distance to dragon/grubs/baron 60s before kill/spawn; wards placed before |

**Macro / vision**
| Detector | How |
|---|---|
| **Absent at objective** | Your position far away when an `ELITE_MONSTER_KILL` happened (and team fought) |
| **Vision before objectives** | `WARD_PLACED` count in the 90s before (⚠️ ward events have **no position**, so "near the pit" can't be checked: team-level only) |
| **Control wards** | Purchases and placement count |

**Build and runes**
| Detector | How |
|---|---|
| **Build vs damage taken** | Match detail: magic vs physical taken vs your defensive stats |
| **Situational item missing** | Enemy tags (from B) vs items bought: no anti-heal vs 3 healers, no armor pen vs 2 tanks |
| **Skill order** | `SKILL_LEVEL_UP` vs the champion's standard max order |

### Presentation
- A **timeline strip** of the match with flagged moments; click → minimap with positions
  (frames + event positions), explanation, lesson, and "watch your replay at 7:41".
- **Benchmarks by rank and role** (from a crawler later; start with hand-set targets).
- A **confidence score** per detection and a "not a mistake" button (to tune detectors).

### Phase order
1. XP sharing, level race, what killed you, CS missed, recall timing, death positions
2. Running vs farming, roams, jungle detectors, objective presence/vision
3. Build vs damage, situational item missing, skill order, benchmarks per rank
