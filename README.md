# Zen

Learn League of Legends from your own games: technical game reviews, champion select help from
your own champion pool, and short lessons.

## Structure

| Path | What |
|---|---|
| `apps/web` | Next.js website: reviews, champ select tool, lessons |
| `apps/desktop` | Planned desktop companion that reads champ select automatically (see its README) |
| `packages/core` | Pure TypeScript logic shared by both: review detectors, pick engine, situational builds, lessons |
| `docs/research` | The research behind the project: Riot rules, data sources, curriculum, roadmap |

## Run it

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local   # then paste your Riot API key
pnpm dev                                       # http://localhost:3000
```

Get a key at <https://developer.riotgames.com>. Development keys expire every 24 hours. Keep the
key in `.env.local` only (it's git-ignored) and never commit it.

Without a key you can still use **/draft** (champ select), **/learn** and **/demo** (a sample review).

## Checks

```bash
pnpm test        # core unit tests
pnpm typecheck
pnpm lint
pnpm format
```

## How it works

- **Review** (`/p/<platform>/<Name-TAG>/match/<id>`): fetches Match-v5 + timeline, runs the
  detectors in `packages/core/src/analysis/detectors`, links each finding to a lesson.
  Current detectors: level race (2/3/6), XP sharing, deaths (what killed you, gank, isolated),
  low CS, walking instead of farming, unspent gold.
- **Champ select** (`/draft`): pool per role (primary + secondary), manual draft input, ranked
  options with reasons, likely lane opponent, situational items/runes filtered to the current patch.
- Finished matches never change, so they're cached on disk in `apps/web/.zen-cache` (swap for
  Cloudflare R2 in production).

## Known limits / next steps

- Champion traits and role shares (`packages/core/src/data`) are hand-curated seeds: verify them
  and later compute role shares from crawled matches.
- Timeline positions are one snapshot per minute, so "walking" and "XP sharing" are estimates
  (shown with medium confidence). Ward events have no position, so vision detectors aren't built yet.
- CS targets are fixed numbers; replace with per-rank, per-role benchmarks.
- Not built yet: mental check-ins, objective/vision detectors, import pool from match history,
  translations, accounts.

Zen isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone
officially involved in producing or managing Riot Games properties. Riot Games, and all associated
properties are trademarks or registered trademarks of Riot Games, Inc.
