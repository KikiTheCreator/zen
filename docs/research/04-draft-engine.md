# 04 — Champion Pick Engine (Pool + Allies + Enemies)

## Goal
Given: the player's **champion pool** (with comfort), their **role**, **allied picks**, and
**enemy picks**. Output: **2–3 ranked options with reasons** (policy: give options, don't
dictate; pre-game).

## Inputs
- **Comfort** per champion: games played recently + win rate + mastery points + KDA trend
  (from Match-v5 + Champion-Mastery-v4). Comfort matters most at low/mid elo.
- **Champion tags** (curated, ~170 champs × ~12 tags): damage type (AD/AP/mixed),
  range (melee/ranged), engage, disengage, peel, poke, waveclear, scaling (early/mid/late),
  splitpush, frontline, CC amount, mobility, healing.
- **Matchup data**: lane win rate vs opponent (own crawler later; curated
  easy/even/hard to start).
- **Synergy data**: pair win rates (e.g., bot lane duos, engage + follow-up).

## Scoring (simple, explainable version first)
```
score(c) =  w1 * comfort(c)
          + w2 * matchup(c, laneOpponent)          # if known
          + w3 * compNeeds(allies + c)              # fills missing: AP dmg, frontline, engage, CC
          + w4 * counterTeam(c, enemies)            # e.g. anti-dive vs assassins, tank shred vs tanks
          + w5 * synergy(c, allies)
          - penalty(blind pick risk if no opponent known)
```
Start with hand-tuned weights, comfort first (e.g. w1 = 0.4). Every term produces a
**human-readable reason**: "Your team has no AP damage", "Strong vs immobile enemy ADC",
"You have 62% WR on this champ in last 30 games".

### Unknown enemy lanes (decided 2026-10-14)
The client never says which lane an enemy plays, so the score is mostly **team fit + vs the whole
enemy team**, with the lane matchup only as a *weighted guess*:
```
matchup(c) = Σ over enemies e:  P(e plays my role) × laneScore(c, e)
```
- `P(e plays my role)` comes from role frequency (Zed ≈ 95% mid; Pantheon spread over top/mid/
  support/jungle). Also eliminate roles: if 4 enemies clearly fill 4 roles, the 5th is solved.
- Only show "likely opponent: Zed (95%)" when confidence is high; otherwise say "opponent
  unknown" and weight team fit + blind-pick safety more.
- The user can tap to correct a lane. The score updates instantly.
- Draft phases: **no enemies locked yet** → safe blind picks + team needs; **some locked** →
  add vs-team threats (tanks, burst, healing, CC) + probable lane; **your lane opponent
  certain** → full matchup weight.

### Composition checklist (easy to code, good to teach)
- Damage mix: ≥1 meaningful AP and AD source
- Frontline: at least one tank/bruiser
- Engage or pick tool
- Waveclear for defending sieges
- Win condition: teamfight / pick / split / poke / protect-the-carry

## Later: ML version
- **DraftRec** (arXiv 2204.12750): models each player's champion preferences + interactions
  between players; trained on ~280k LoL matches. Good fit since it is player-aware.
- UW project (Kim et al.): synergy/counter mined from match data normalized by popularity
  → "Composite Win Rate". A simple, good baseline.
- Graph-based approaches (champion relation graphs + GNN/Transformer) for synergy.
- Caution: win-rate models need lots of data per patch; small samples mislead. Keep the
  explainable scorer as default and show confidence.

## Champion pool builder (bonus feature)
Help pick a 2–3 champ pool that covers matchups:
- 1 "blind pick" safe champion + 1–2 "counter pick" options
- Similar mechanics (easier transfer), different damage types if possible
- Show "matchups your pool handles badly" → suggest one champion to cover them.

## Sources
- https://arxiv.org/pdf/2204.12750v1.pdf (DraftRec)
- https://arxiv.org/pdf/1806.10130 (The Art of Drafting)
- https://courses.cs.washington.edu/courses/cse547/21sp/old_projects/kim_etal.pdf
- https://www.bruinsportsanalytics.com/post/lol-recommender
