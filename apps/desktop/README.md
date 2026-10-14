# Zen Desktop (planned, not started)

A small desktop companion that reads **champion select** from the League Client automatically, so
players don't have to type the draft into the website. Saved here to build later.

## Why it's needed
A website can't see champ select: the data comes from the League Client's local API (LCU), which
needs a port and password from a `lockfile` on disk. Browsers can't read local files or call that
local server. The website keeps working with manual input; the desktop app makes it automatic.

## Plan
- **Electron + TypeScript** (all-TS, fastest to ship). Consider Tauri later if install size matters.
- Load the same Next.js UI (the `/draft` page) in the app window and pass the draft to it over IPC.
  No server involved, so no hosting cost.
- Reuse `@zen/core` (`recommendPicks`, `predictRoles`, `situationalBuild`) directly.

## LCU integration
1. Find the client `lockfile`:
   - Windows: `C:\Riot Games\League of Legends\lockfile` (or find the `LeagueClientUx` process and
     read `--app-port` / `--remoting-auth-token` from its command line)
   - macOS: `/Applications/League of Legends.app/Contents/LoL/lockfile`
   - Format: `name:pid:port:password:protocol`
2. Connect to `wss://127.0.0.1:<port>` with basic auth `riot:<password>` (self-signed certificate).
3. Subscribe: `[5, "OnJsonApiEvent_lol-champ-select_v1_session"]`.
4. From the session: `localPlayerCellId`, `myTeam[].assignedPosition` / `championId` /
   `championPickIntent` (hover), `theirTeam[].championId`, `bans`, `timer`.
   Enemy positions are **not** provided: use `predictRoles` and let the user correct.
5. Map numeric `championId` → Data Dragon id with `champion.json` (`key` field).

## Rules (Riot policy)
- LCU is **not officially supported** for third parties: declare it when registering the product
  on developer.riotgames.com.
- Show only what the client shows. Never reveal hidden summoner names.
- Show options with reasons; never auto-lock a champion.
- Allowed later: one-click rune page import (`/lol-perks/v1/pages`), like other approved apps.
- Never read game memory (blocked for unknown apps since Oct 6, 2026).

## Later ideas
- Record your **own** game with the Live Client Data API (`https://127.0.0.1:2999/liveclientdata/`)
  for second-level CS/gold/level data in reviews. Record only; show nothing during the game.
- Tray icon + auto-open when champ select starts.
