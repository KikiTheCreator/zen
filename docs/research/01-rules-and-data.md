# 01 — Riot Rules and Data Sources

## 1. Policy: what you can and cannot build

Source: Riot Developer Portal (developer.riotgames.com/docs/lol and /policies/general).

**Explicitly allowed examples** (LoL docs): showing your own stats, training tools based on
your own match history, LFG tools, static-data overlays, aggregate stats, official ladder
leaderboards.

**Not allowed:**
- Game-session information that is unknown to the player (e.g. enemy summoner cooldowns
  you did not see, hidden jungler position)
- **Apps that dictate player decisions**; the general policy says products "should not remove game
  decisions" but may "highlight decisions that are important and give multiple choices"
- MMR/ELO calculators or alternative ranking systems
- De-anonymizing hidden players (e.g. streamer mode, hidden names in champ select)
- Using info not present in the client for a competitive edge
- Augment/Arena item win rates
- Crypto/blockchain, gambling, "data broker" apps
- Ads inside the game, loading screens or Riot client
- Products "should increase, and not decrease, the diversity of game decisions
  (builds, compositions, characters)"

**Practical interpretation for this project**

| Feature | Risk | Notes |
|---|---|---|
| Post-game review of own matches | ✅ Safe | Core feature |
| Lessons, quizzes, drills | ✅ Safe | Original content |
| Pre-game champion/build *options* with reasons | ✅ Likely safe | Show 2–3 options + why, not one forced answer |
| Draft helper in champ select (picks from your pool) | ⚠️ Gray | Offer ranked options with explanations; never auto-lock. Ask Riot dev support |
| Live in-game build that changes with game state | ❌ Avoid | Matches the TFT policy's own example of what's not OK |
| Live jungle tracker / enemy timers | ❌ No | Session info unknown to the player |
| Mental "take a break" reminder between games | ✅ Safe | Not a game decision |

**Required notice** (must be visible in the app):
> [Your product] isn't endorsed by Riot Games and doesn't reflect the views or opinions of
> Riot Games or anyone officially involved in producing or managing Riot Games properties.
> Riot Games, and all associated properties are trademarks or registered trademarks of
> Riot Games, Inc.

You must also **register the product** on the developer portal. Keep the API key on the
server, never in the client.

## 2. October 2026 changes (very recent; they affect the design)

- **Game memory access blocked** for unknown third-party apps since **Oct 6, 2026** (LoL, TFT,
  VALORANT). Known, approved tools get a grace period until **April 2027**. Riot says the only
  permitted way to get game data is now its official APIs. → Never read game memory.
- **Patch 26.20 (Oct 7, 2026): private replays.** You can only access replays of your own
  matches, and **third-party apps lost replay download access**. → You can't parse `.rofl`
  files as an app feature. Instead, ask the user to open their own replay at timestamps you give
  (e.g. "watch 6:20–6:50"). That works fine and is a good learning habit.

## 3. Data sources

### Riot Web API (needs API key; personal key is fine for you + friend)
- **Account-v1**: Riot ID (`name#tag`) → PUUID
- **Summoner-v4**: by PUUID (the `by-name` endpoints are deprecated)
- **League-v4**: rank, LP
- **Champion-Mastery-v4**: mastery per champion, which helps detect the champion pool
- **Match-v5**: match list by PUUID, match details, and **timeline**
  - Regional routing: `americas` (NA, BR, LAN, LAS), `europe`, `asia` (KR, JP), `sea`
  - **Timeline** = one frame per minute with each player's gold, XP, level, CS,
    jungle CS, **position (x,y)**, and damage stats, plus an event list (CHAMPION_KILL with
    assisters and position, WARD_PLACED/KILLED, ITEM_PURCHASED/SOLD/UNDO, SKILL_LEVEL_UP,
    ELITE_MONSTER_KILL, BUILDING_KILL, TURRET_PLATE_DESTROYED, LEVEL_UP...)
  - Match details: per player final stats, runes, items, summoners, `challenges` block
    (many derived stats like lane CS advantage, solo kills, vision score per minute)
- Key types: **development** (expires every 24h, low limits, for prototyping),
  **personal** (small projects, for you + friend), **production** (public app; needs
  approval; required for Riot Sign-On). Respect `429` + `Retry-After`.

### Data Dragon (static, free, no key)
- `https://ddragon.leagueoflegends.com/api/versions.json` → latest patch
- `/cdn/{version}/data/{locale}/champion.json`, `champion/{Name}.json` (abilities,
  ratios), `item.json`, `runesReforged.json`, `summoner.json`
- Images for champions, spells, items, runes, map
- Ability tooltips use placeholders (`{{ e1 }}`, `{{ a1 }}`) and are often incomplete. For
  exact ratios use **CommunityDragon** (raw game files) or the **Meraki Analytics** champion
  JSON (cleaner, community-maintained).
- Has locales like `es_ES`, `es_MX` and `pt_BR`, so the app can be multilingual for free.

### Live Client Data API (local, during your own game)
- `https://127.0.0.1:2999/liveclientdata/...` (self-signed certificate)
- `activeplayer`, `playerlist`, `eventdata`, `gamestats`, `playerscores`...
- Only shows what the player could see anyway. Allowed uses: **recording your own
  session for post-game review** (e.g. gold/CS curve at second-level precision, death
  timestamps). Avoid live prescriptive advice.
- Desktop-only (needs a native companion app: Tauri/Electron). Not needed for MVP.

### League Client API (LCU)
- Local client API used for champ select, runes import, etc. **Officially unsupported**
  for third parties (no docs or stability guarantees) and must be declared at registration.
  Skip it for MVP.

### Aggregate stats (win rates, matchups)
- Building your own requires crawling many high-elo matches (rate limits make this slow
  but doable: seed from Challenger/GM/Master lists → match IDs → match details).
- For MVP, don't scrape u.gg/op.gg (terms of service). Use **your own data + curated
  content**, then add a crawler in phase 3.

## 4. Sources
- https://developer.riotgames.com/docs/lol
- https://developer.riotgames.com/policies/general
- https://developer.riotgames.com/league-client-apis.html
- https://support.riotgames.com/en-us/riot/performance/game-memory-access-removed-for-third-party-apps
- https://u.gg/lol/news/patch-26-20-official-notes-league-of-legends
- https://insider-gaming.com/lol-patch-26-20-every-change-impact-worlds-meta/
