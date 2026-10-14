# LoL Coach — Project Research (2026-10-14)

Goal: a tool that helps a struggling player (and anyone else) **learn** League of Legends,
not just copy builds. Topics: laning, learning a new champion, matchups, micro/kiting/trading,
tempo, wave control, itemization, draft/champion choice, map awareness, and mental.

## Files

| File | What's in it |
|---|---|
| `01-rules-and-data.md` | What Riot allows, where data comes from, the October 2026 changes that limit what you can build |
| `02-market.md` | Existing tools and the gap this project can fill |
| `03-curriculum.md` | The core teaching content for every topic, in learning order |
| `04-draft-engine.md` | How to recommend a champion from a player's pool, given allies and enemies |
| `05-mental.md` | What the research says about tilt, plus concrete features |
| `06-product-and-roadmap.md` | Feature list, architecture, data model, and a phased plan |
| `07-champ-select-builds-and-technical-review.md` | **Decided scope**: champ select pick from pool, situational build rules, technical review detectors (XP sharing, running vs farming...) |
| `08-decisions-champ-select-and-costs.md` | Two roles, how the web app sees champ select (desktop companion), keeping server costs near zero, monetization rules |

## The five findings that shape the project

1. **Teach, don't dictate.** Riot's policy bans apps that "dictate player decisions" or use
   live game-session info the player wouldn't otherwise know. That means no real-time
   "buy this now" or "jungler is coming" overlay. But that is also the right design for
   *learning*: pre-game prep and post-game review are both allowed and are where improvement
   actually happens.
2. **The post-game review is the heart of the product.** The Match-V5 **timeline** gives
   per-minute gold, XP, CS and positions, plus events (kills, wards, items, objectives).
   That is enough to auto-detect mistakes like "you died without vision at 6:40 while
   your wave was crashing into your tower" and link each one to a lesson.
3. **October 2026 platform changes:** Riot started blocking game-memory access for unknown
   third-party apps on Oct 6, 2026, and patch 26.20 (Oct 7) made replays private, so
   third-party apps can no longer download them. So build only on official APIs:
   the Riot Web API, Data Dragon, and the local Live Client Data API.
4. **The 2026 game is different from older guides.** Minions spawn at 0:30, Atakhan and
   Feats of Strength are gone, Role Quests exist, turret plates stay all game, and Faelights
   change warding. Most YouTube and blog content about wave/tempo is from before 2026 and partly
   wrong now, so your content has to be patch-aware.
5. **Mental is under-served.** No major competitor treats tilt seriously. Research says
   toxicity exposure predicts tilt, and tilt is measurable. A simple "stop-loss" and
   reflection system is cheap to build and could be a real differentiator.

## Recommended MVP (for your friend first)

Web app with: (1) Riot ID login lookup → (2) post-game review with 3–5 auto-flagged
mistakes, each linked to a short lesson → (3) champion pool + simple draft helper (pre-game)
→ (4) mental check-in and session stop-loss. Details in `06-product-and-roadmap.md`.

Note: my training knowledge goes to mid-2026; game-specific numbers in these docs should be
checked against the current patch (26.20 at time of writing) before going in the app.
