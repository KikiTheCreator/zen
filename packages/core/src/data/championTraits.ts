// Hand-curated champion traits used by the draft scorer and situational builds.
// Keys are Data Dragon champion ids. Coarse on purpose: a trait means
// "a draft opponent should plan for this". Verify on balance patches.

export type Trait =
  | "tank" // stacks HP/resists, hard to kill
  | "healer" // heals self or allies significantly → anti-heal
  | "shielder" // shields allies → Serpent's Fang
  | "burstAD" // AD assassin burst
  | "burstAP" // AP burst
  | "suppress" // point-and-click suppression / unavoidable lockdown → QSS
  | "engage" // starts fights
  | "hardCC" // lots of reliable crowd control
  | "critCarry" // crit / attack-speed carry → Randuin's, Frozen Heart
  | "poke" // long-range poke
  | "splitpush" // strong 1v1 side laner
  | "scalesLate"
  | "strongEarly";

const list = (s: string) => s.split(/\s+/).filter(Boolean);

const BY_TRAIT: Record<Trait, string[]> = {
  tank: list(`Malphite Ornn Sion Chogath KSante Maokai Sejuani Zac Rammus Amumu Leona Nautilus
    Alistar Braum TahmKench Poppy Shen Rell Taric Skarner Nunu DrMundo Galio Volibear`),
  healer: list(`Aatrox Soraka Vladimir Sylas Yuumi Sona Nami Warwick Swain DrMundo Fiddlesticks
    Briar Illaoi Milio Maokai Samira Zac Trundle Olaf Gwen`),
  shielder: list(`Lulu Karma Janna Seraphine Milio Lux Orianna Taric Ivern Sona Renata`),
  burstAD: list(`Zed Talon Rengar Khazix Qiyana Naafiri Kayn Pyke Nocturne Shaco`),
  burstAP: list(`Syndra Leblanc Fizz Evelynn Akali Diana Ekko Veigar Annie Kassadin Katarina
    Elise Nidalee Vex Zoe Ahri Lissandra`),
  suppress: list(`Malzahar Warwick Skarner Urgot`),
  engage: list(`Malphite Amumu Leona Nautilus Alistar Rell Rakan Sejuani Zac Ornn JarvanIV Vi Galio
    MonkeyKing Kennen Hecarim Diana Sion Gragas KSante Maokai Rammus Lissandra Nocturne Annie`),
  hardCC: list(`Leona Nautilus Alistar Amumu Sejuani Lissandra Rell Rakan Thresh Morgana Zac Maokai
    Ornn Malphite Annie Vi Ashe Braum Blitzcrank Taric Galio JarvanIV Poppy Lux Varus Zyra Neeko
    Seraphine Skarner Malzahar Warwick Leblanc Twitch`),
  critCarry: list(`Jinx Yasuo Yone Tryndamere Aphelios Caitlyn Jhin Xayah Zeri Tristana MissFortune
    Draven Samira Nilah Twitch Vayne Kaisa KogMaw MasterYi Gangplank Yunara Smolder`),
  poke: list(`Xerath Velkoz Ziggs Jayce Lux Zoe Varus Ezreal Hwei Mel Karma Brand Caitlyn Corki Nidalee`),
  splitpush: list(`Fiora Jax Camille Tryndamere Yorick Nasus Gwen Trundle Riven Irelia Shen Udyr Sion`),
  scalesLate: list(`Kayle Kassadin Vayne Jinx Smolder Nasus Veigar Aphelios Vladimir Azir KogMaw Gwen
    Senna AurelionSol Ryze Twitch Yunara`),
  strongEarly: list(`Renekton Draven Lucian Pantheon Elise LeeSin Darius Olaf Kalista Leblanc Talon
    Rengar Blitzcrank Pyke XinZhao Kled`),
};

export const CHAMPION_TRAITS: Record<string, Set<Trait>> = {};
for (const [trait, champions] of Object.entries(BY_TRAIT) as [Trait, string[]][]) {
  for (const id of champions) (CHAMPION_TRAITS[id] ??= new Set()).add(trait);
}

/** Champions that deal mostly magic damage even if Data Dragon ratings suggest otherwise. */
export const AP_OVERRIDES = new Set(
  list(`Teemo Diana Ekko Elise Evelynn Fizz Gragas Gwen Kennen Mordekaiser Nidalee Rumble Singed
    Sylas Vladimir Lillia Fiddlesticks Karthus Kassadin Akali Amumu Zac Sejuani Maokai Malphite
    Katarina Kayle Shyvana Nunu Rammus Galio Volibear`),
);

/** Champions whose damage is meaningfully mixed. */
export const MIXED_DAMAGE = new Set(list(`Kaisa Corki Jax KogMaw Varus Ezreal Shaco Kayle Katarina`));
