# 08 — Decisions: Roles, Champ Select Access, Hosting Costs

Decisions (2026-10-14):
- **Two roles per player** (primary + secondary, like ranked) → content and benchmarks for **all 5 roles**.
- **Public product.**
- **Stack: TypeScript + Next.js.**

## 1. Two roles
- Profile: `primaryRole`, `secondaryRole`, and a champion pool **per role** (2–3 each).
- Pick engine runs with the role assigned in champ select (the client tells you).
- Detectors are role-aware: jungle detectors (clear, gank efficiency), support detectors
  (vision, roams, XP sharing is *expected* for support), laner detectors (CS, XP sharing,
  level race).
- Content priority: build all-role fundamentals first, then role modules.

## 2. How the web app "sees" champ select

A website **cannot** read champ select by itself. The data lives in the League Client's local
API (LCU), which needs a random port and password from the client's `lockfile` on disk. A
browser can't read local files, and browsers block websites from calling local servers
(CORS / Private Network Access).

### Recommended architecture: web app + small desktop companion (same TS code)

```
┌──────────────── Desktop companion (Tauri or Electron) ────────────────┐
│  1. Finds League Client lockfile → port + password                   │
│  2. Subscribes to LCU WebSocket: OnJsonApiEvent_lol-champ-select_v1_session │
│  3. Shows the SAME Next.js UI in a webview and passes the draft to it   │
│     via IPC (postMessage); no server needed for this                   │
└────────────────────────────────────────────────────────────────────────┘
         ↑ same React components / pick engine (shared TS package)
┌──────────────── Website (Next.js) ──────────────────────────────────────┐
│  Reviews, lessons, champion pages, profile + MANUAL champ select mode  │
└────────────────────────────────────────────────────────────────────────┘
```

- **Website only**: manual mode. Fast picker (type 2–3 letters, role-filtered list,
  recently seen champions first), works on a **phone as second screen**. ~10 s per draft.
- **With companion**: automatic. Updates live as allies hover/lock and enemies lock.
- Tauri: ~10 MB install, light on RAM, frontend in TS (the LCU part needs a little Rust or a
  JS plugin). Electron: 100% TS but ~100 MB. **Recommendation: Electron first** (all TS, fastest
  to ship); switch to Tauri later if size matters.
- What the LCU session gives: your team's cells (assigned position, hovered/locked champion),
  enemy locked champions, bans, timer. **Enemy positions are not given**, so infer them from
  champion role frequency (e.g. Zed → mid) and let the user correct them.
- Policy: LCU is "not officially supported". Declare its use when registering the product.
  Never show hidden names. Show options, never auto-lock. Bonus companion features later:
  one-click rune page import (Blitz/iTero already do this through LCU).

## 3. Not losing money on servers

The Riot API **key must stay on a server**, so you need *some* backend, but it can be tiny.
The **rate limit** of the API key is a bigger constraint than server cost; caching solves both.

### Cost-saving design
1. **Do the analysis in the user's browser.** The server only proxies Riot API calls (with the
   key) and caches; the detectors run in TS on the client. CPU cost ≈ 0.
2. **Cache forever what never changes**: a match and its timeline never change after the game.
   Store compressed raw JSON in object storage with no egress fees (**Cloudflare R2**), and
   only small metrics in the DB. Delete raw timelines after ~30 days.
3. **Lazy loading**: analyze a game only when the user opens it; fetch the last 10–20 games,
   not entire histories. No background crawling per user.
4. **Static content is free**: lessons, champion pages and item rules built at deploy time
   (SSG). Images and champion data come **directly from Riot's Data Dragon CDN** (their
   bandwidth, not yours).
5. **No accounts at first**: Riot ID lookup + profile/pool saved in the browser
   (localStorage). Add accounts / Riot Sign-On later (RSO needs a production key).
6. **Aggregate stats (matchup win rates)**: a scheduled job that samples a limited number of
   high-elo matches per patch (e.g. GitHub Actions cron or a €5 VPS), saving only aggregated
   tables. Don't build this until there are users.
7. **No paid AI APIs for explanations**: explanations come from templates + translations
   (cheap, predictable, consistent).

### Hosting options
| Option | Cost | Notes |
|---|---|---|
| **Cloudflare Workers/Pages** (Next.js via OpenNext) + **R2** + **D1** or **Neon** | $0 → ~$5/mo | Generous free tiers; commercial use OK. **Recommended** |
| Vercel | Hobby $0 but **non-commercial only**; Pro $20/mo | Easiest Next.js DX; switch to Pro once you monetize |
| Hetzner VPS + Coolify | ~€5/mo flat | Predictable; you manage the server |
| DB: Neon / Supabase / Turso free tiers | $0 | Fine for first thousands of users |

Estimate: **$0–10/month up to a few thousand users** with this design. Main future
cost = the stats crawler and storage.

### Monetization (Riot rules)
From Riot's policy: product must be **registered** with status Approved/Acknowledged; you
**must have a free tier** (ads allowed); paid content must be **transformative** (it is: your
analysis); no gouging; **no ads inside the game/client** (ads on your website are fine);
donations/subscriptions OK. Contact Riot via the Developer Portal if unsure.

Ideas: free core + **donations (Ko-fi / Patreon)** at launch → later a cheap **premium**
(e.g. $3/mo: full history, deeper detectors, progress reports, duo review) + discreet
website ads for free users. Premium also helps pay for a bigger production key workload.

## Next steps
1. Register on developer.riotgames.com, get a dev key (24h) → later apply for a production key
   (needs a working prototype + product description).
2. Monorepo: `apps/web` (Next.js), `apps/desktop` (Electron), `packages/core`
   (detectors, pick engine, item rules, all pure TS, shared).
3. Prototype: Riot ID → last 20 games → first 5 detectors.

## Update (2026-10-14, first build)
- Analysis runs **on the server** after all: the detectors are cheap, but a raw timeline is large,
  so sending it to the browser costs more bandwidth than computing there and sending the small
  result. `@zen/core` stays isomorphic, so this can change later.
