# Champion setup catalog coverage

Reviewed snapshot: **2026-10-15**, Data Dragon **16.20.1**, game patch **26.20**. The authored entries are bilingual educational starting points. They are not Riot recommendations, statistical rankings, “best builds,” win-rate claims, or guarantees. Data Dragon validates current IDs and availability; its champion files do not establish strategy.

## Reviewed champion-role memberships

Each row is an explicit hand-curated membership. Shared profile mechanics are narrowed with champion notes where kits or roles differ. No class or role label automatically adds champions to the catalog.

| Profile                  | Champion-role coverage                         | Distinction captured                                                                                                                              |
| ------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tryndamere-top`         | Tryndamere TOP                                 | Kraken → Navori crit/attack route; critical strikes and Navori attack refunds support repeated E spins.                                           |
| `yorick-top`             | Yorick TOP                                     | Trinity → Shojin spell-and-attack route; Hullbreaker, armor shred and anti-heal are conditional.                                                  |
| `gwen-top`               | Gwen TOP                                       | AP Nashor → Riftmaker; magic damage applies Morellonomicon, with AP/MR defense options. No Smite or physical anti-heal.                           |
| `fighter-jungle`         | Vi, Lee Sin, Xin Zhao, Jarvan IV, Viego JUNGLE | Sundered Sky → Black Cleaver physical engage route; every offered spell pair includes Smite and Flash.                                            |
| `ap-mid`                 | Ahri, Lux, Orianna, Syndra, Viktor MIDDLE      | Ranged control mage burst path; durable-frontline Liandry branch is situational. Lux UTILITY is separate.                                         |
| `akali-mid`              | Akali MIDDLE                                   | AP energy assassin, separate from AD assassin and mana mage profiles.                                                                             |
| `assassin-mid`           | Qiyana, Talon, Zed MIDDLE                      | Youmuu → Profane lethality and roam route; armor penetration is conditional.                                                                      |
| `brand-mid`              | Brand MIDDLE                                   | Liandry → Rylai sustained area damage; Luden is a squishy-target alternative. Separate from Brand UTILITY.                                        |
| `malphite-ap-mid`        | Malphite MIDDLE                                | AP burst engage, separate from tank TOP.                                                                                                          |
| `cassiopeia-mid`         | Cassiopeia MIDDLE                              | Tear → Archangel's Staff, which auto-transforms into Seraph; Liandry/Rylai sustain. No boots.                                                     |
| `adc-onhit`              | Kog'Maw, Vayne BOTTOM                          | Repeated-hit route distinct from crit carries; notes cover mixed damage and range.                                                                |
| `ezreal-bottom`          | Ezreal BOTTOM                                  | Mana, skillshots and spell weaving; distinct from crit and on-hit starts.                                                                         |
| `ap-jg-ivern`            | Ivern JUNGLE                                   | Moonstone → Redemption ally shielding/healing route; Smite and jungle companion required.                                                         |
| `engage-support`         | Leona, Nautilus, Rell, Thresh UTILITY          | Locket → Knight's Vow team-defense route, support quest, Guardian/Aftershock choice; personal damage branches stay situational.                   |
| `enchanter-support`      | Janna, Lulu, Milio, Soraka UTILITY             | Moonstone → Redemption repeated ally protection; Mikael's remains for eligible stun/root threats.                                                 |
| `mage-support`           | Brand, Xerath, Zyra UTILITY                    | Poke and zone control under support income and vision constraints.                                                                                |
| `senna-support`          | Senna UTILITY                                  | Umbral Glaive vision → Black Cleaver physical-team support; Kraken is an ahead-only branch, not default.                                          |
| `pyke-support`           | Pyke UTILITY                                   | Umbral Glaive → Youmuu lethality/vision route; Edge of Night is situational. Bonus health converts to AD; ultimate execute scales with lethality. |
| `ap-jungle-diana`        | Diana JUNGLE                                   | Melee Conqueror/Electrocute pages; Nashor → Riftmaker sustained dive.                                                                             |
| `ap-jungle-fiddlesticks` | Fiddlesticks JUNGLE                            | Harvest/First Strike ambush pages; Liandry → Zhonya channel follow-up.                                                                            |
| `ap-jungle-karthus`      | Karthus JUNGLE                                 | Harvest/Comet farming pages; Liandry → Void Staff when MR is completed.                                                                           |
| `tank-top-malphite`      | Malphite TOP                                   | Grasp lane page; Aftershock only after level 6 R knock-up. Armor/MR routes, no Maw or Mortal Reminder.                                            |
| `tank-top-ornn`          | Ornn TOP                                       | Grasp trades / Aftershock hard-CC entry; armor/MR routes.                                                                                         |
| `tank-top-sion`          | Sion TOP                                       | Grasp trades / Aftershock committed Q or R control; armor/MR routes.                                                                              |
| `tank-top-shen`          | Shen TOP                                       | Grasp Q trades / Aftershock E taunt; armor/MR routes.                                                                                             |
| `adc-jhin`               | Jhin BOTTOM                                    | Fleet/Dark Harvest, Collector → Infinity Edge; no Kraken default.                                                                                 |
| `adc-jinx`               | Jinx BOTTOM                                    | Lethal Tempo/PTA, Kraken → Infinity Edge; Doran's Shield for repeated poke.                                                                       |
| `adc-ashe`               | Ashe BOTTOM                                    | Lethal Tempo/Fleet, Kraken → Infinity Edge; utility comes from slows and ultimate.                                                                |
| `adc-missfortune`        | Miss Fortune BOTTOM                            | PTA/Comet, Collector → Infinity Edge; Q/R damage pattern over generic attack-speed core.                                                          |

Coverage totals **29 profiles, 46 distinct champions, and 48 champion-role memberships**: TOP 7, JUNGLE 9, MIDDLE 12, BOTTOM 7, UTILITY 13. Other roster champions and off-roles remain unsupported until separately reviewed.

## Catalog rules applied

- Every authored membership has two complete, distinct rune pages. The engine checks current primary tree rows, secondary tree and distinct minor rows, shard slots, names and localized metadata.
- Every jungle spell pair includes Smite and Flash; no authored non-jungle pair offers Smite. The live-catalog test executes the actual `championSetup` engine for every membership in both supported locales.
- Item records are frozen from Data Dragon 16.20.1 for `en_US` and `es_MX`, including all referenced items and true rune-tree row data. Opportunity `6701` appears in the current file but Data Dragon marks it non-purchasable on Summoner's Rift; it is excluded. Pyke uses purchasable Edge of Night `3814` as the conditional spell-shield option instead.
- Core arrays are reviewed purchase order; alternatives and matchup branches sit under situational choices with triggers and costs. Percent-penetration choices are alternatives, and Lifeline options are not stacked.
- Top Teleport copy describes the 2026 fork: selecting it gives the quest-upgraded spell and max-health shield; declining it yields only the free longer-cooldown version after quest completion.

## Validation

The fixture-backed regression test uses the current Data Dragon IDs and tree rows and calls the production `championSetup` engine for all 48 memberships in both `en` and `es`. Result: **29 profiles, 48 memberships, zero status issues in either locale**. It also asserts the Gwen, Jhin, Cassiopeia, Pyke, tank-top and jungle-role corrections. The fixture is [setup-profiles.fixture.json](../../packages/core/src/builds/setup-profiles.fixture.json).

World Atlas `3865` has an empty DDragon description in both locales. The existing core validator has an ID-scoped exception requiring its name, icon, Summoner's Rift availability and purchase status, so required support starts resolve cleanly without inventing an item effect.

## Sources and limits

- Current mechanics and IDs: Riot [26.20 patch notes](https://www.leagueoflegends.com/en-us/news/game-updates/league-of-legends-patch-26-20-notes/), [Data Dragon documentation](https://developer.riotgames.com/docs/lol#data-dragon), and versioned [items](https://ddragon.leagueoflegends.com/cdn/16.20.1/data/en_US/item.json), [runes](https://ddragon.leagueoflegends.com/cdn/16.20.1/data/en_US/runesReforged.json), and [summoner spells](https://ddragon.leagueoflegends.com/cdn/16.20.1/data/en_US/summoner.json). The parallel Spanish files supply localized validation.
- Current system and rune mechanics: Riot [26.9 patch notes](https://www.leagueoflegends.com/en-us/news/game-updates/league-of-legends-patch-26-9-notes/) (Stormraider trigger and Opportunity removal). Role quest mechanics: Riot's [2026 season preview](https://www.leagueoflegends.com/en-ph/news/dev/dev-2026-season-one-gameplay-preview/) and [26.19 notes](https://www.leagueoflegends.com/en-us/news/game-updates/league-of-legends-patch-26-19-notes/).
- Champion kit identity: Riot [champion pages](https://www.leagueoflegends.com/en-us/champions/) and versioned champion static data.
- Strategic rune, item and spell choices in this catalog are authored heuristics for review and adaptation. DDragon does not provide champion-role build strategy or performance evidence. No third-party aggregate rates or unverified “optimal” claims are used.
