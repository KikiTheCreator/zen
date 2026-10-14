# 06 — Product, Architecture, Roadmap

## Main screens
1. **Profile**: Riot ID → rank, champion pool (auto-detected), current focus habit.
2. **Last games**: list; each opens a **Review**:
   - Gold/XP/CS graphs vs lane opponent (timeline frames)
   - **Map of deaths** (event positions over the Summoner's Rift minimap image)
   - 3–5 **flagged moments** with timestamp → "open your replay at 7:05" → linked lesson
   - Reflection questions
3. **Learn**: curriculum levels (03), each lesson = text + diagram/clip + drill + quiz.
4. **Champion page**: identity, abilities and scaling (Data Dragon/Meraki), combos, spikes,
   runes/items with reasons, and the player's **matchup cards**.
5. **Draft helper** (pre-game): role + allies + enemies → 2–3 options from the pool with reasons.
6. **Mental**: check-ins, session tracker, trends.

## Architecture (simple, cheap)
```
Next.js (React) web app  ──>  API server (Next.js routes or Node/Python)
                                  │
                                  ├─ Riot API client (rate-limited queue, key on server)
                                  ├─ Analyzer: timeline → metrics → mistake detectors
                                  ├─ Draft scorer
                                  └─ Postgres (or SQLite to start)
                                        players, matches, timelines(JSON), metrics,
                                        champion_tags, matchup_notes, lessons, checkins
Static: Data Dragon (cache per patch), lessons in Markdown/MDX
Later: desktop companion (Tauri) using Live Client Data API to record own sessions
```
- Language: TypeScript end-to-end is easiest; Python is good for the analysis/ML part.
- Cache match/timeline data: they never change, so call the API once per match.
- i18n from day one (English + your friend's language; Data Dragon supplies champion text).

## Data model (core)
- `player(puuid, riot_id, region, main_role)`
- `match(match_id, patch, queue, duration, win, champion, role, raw_json)`
- `timeline(match_id, raw_json)`
- `match_metrics(match_id, puuid, cs10, gold_diff10, xp_diff10, deaths_pre14, vision_pm, ...)`
- `flag(match_id, ts, type, details_json, lesson_id)`
- `champion_tag(champion_id, tag, value)`, `matchup_note(puuid, champ, vs_champ, text)`
- `lesson(id, level, title, body, drill, metric)`, `checkin(puuid, ts, mood, focus, notes)`

## Roadmap
**Phase 0 — 1 week:** dev key, fetch friend's last 20 games, print metrics in a script.
Validate: do the flagged moments match what you see when you watch the replays?

**Phase 1 — MVP (3–5 weeks):** web app with review page + deaths map + 5 detectors +
10 lessons (Level 0–1) + mental check-in/stop-loss. Use it with your friend for 2 weeks.

**Phase 2:** champion pages (learning framework), matchup cards, rune/item "why",
draft helper (rule-based), more detectors (objectives, vision, itemization).

**Phase 3:** register for **production key**, own crawler for matchup/synergy stats,
ML draft model, desktop companion for richer own-session data, community lessons.

## Risks
- Policy: keep everything pre-/post-game; register the product; ask Riot dev support about the
  draft helper.
- Patch drift: tag every lesson/number with the patch; review every 2 weeks.
- Bad detectors erode trust: show confidence and let user mark "not a mistake".
- Content is the real work: start with your friend's role and 2–3 champions only.

## Open questions for you
1. Your friend's **role, champions, rank, region** and **language**?
2. Web app, desktop app, or both? (Web is my recommendation for MVP.)
3. Just for you two, or public later? (Decides personal vs production key.)
4. Your coding experience/stack preference?
