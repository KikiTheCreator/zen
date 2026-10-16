import type {
  SetupExplanation,
  SetupItemChoice,
  SetupProfile,
  SetupRunePage,
  SetupSpellPair,
  SetupText,
} from "./setup-types";

const txt = (en: string, es: string): SetupText => ({ en, es });
const reason = (
  why: string,
  whyEs: string,
  when: string,
  whenEs: string,
  tradeoff: string,
  tradeoffEs: string,
): SetupExplanation => ({
  why: txt(why, whyEs),
  when: txt(when, whenEs),
  tradeoff: txt(tradeoff, tradeoffEs),
});
const item = (itemId: string, copy: SetupExplanation): SetupItemChoice => ({ itemId, ...copy });
const rune = (
  id: string,
  title: string,
  titleEs: string,
  primaryTree: number,
  primary: [number, number, number, number],
  secondaryTree: number,
  secondary: [number, number],
  shards: [number, number, number],
  copy: SetupExplanation,
): SetupRunePage => ({
  id,
  title: txt(title, titleEs),
  primaryTree,
  primary,
  secondaryTree,
  secondary,
  shards,
  ...copy,
});
const spell = (spellIds: [string, string], copy: SetupExplanation): SetupSpellPair => ({ spellIds, ...copy });

const R = {
  rune,
  tryndSustain: rune(
    "trynd-extended",
    "Extended duels",
    "Duelos prolongados",
    8000,
    [8008, 9111, 9104, 8299],
    8400,
    [8444, 8242],
    [5005, 5008, 5013],
    reason(
      "Lethal Tempo rewards repeated attacks while Tryndamere stays in range; Fury and Last Stand suit his low-health all-in window.",
      "Tempo letal recompensa los ataques repetidos mientras Tryndamere mantiene el alcance; la Furia y Último esfuerzo encajan con su ventana de combate a poca vida.",
      "Choose this when the lane and enemy draft let you stick to targets and take extended fights.",
      "Elígela cuando la línea y el equipo rival te permitan permanecer sobre el objetivo y pelear durante más tiempo.",
      "It offers less lane sustain and short-trade safety than Fleet Footwork, and disengage can deny its value.",
      "Ofrece menos sustain de línea y seguridad en intercambios breves que Juego de pies; una retirada puede anular su valor.",
    ),
  ),
  tryndSafe: rune(
    "trynd-lane",
    "Safer lane and access",
    "Línea más segura y acceso",
    8000,
    [8021, 9111, 9104, 8299],
    8400,
    [8444, 8242],
    [5005, 5008, 5013],
    reason(
      "Fleet Footwork adds a heal and movement burst to help a manaless melee champion absorb poke and choose when to engage.",
      "Juego de pies añade curación y velocidad para que un campeón cuerpo a cuerpo sin maná resista el hostigamiento y elija cuándo entrar.",
      "Choose this into repeated ranged poke or when reaching the first item safely matters more than a committed all-in.",
      "Elígela ante hostigamiento a distancia repetido o cuando llegar con seguridad al primer objeto importe más que un all-in comprometido.",
      "You give up Lethal Tempo's extended-fight attack payoff; it does not make a losing trade safe by itself.",
      "Renuncias al valor de ataques de Tempo letal en peleas largas; por sí sola no vuelve seguro un mal intercambio.",
    ),
  ),
  yorickGrasp: rune(
    "yorick-structure",
    "Durable lane and structure pressure",
    "Línea resistente y presión a estructuras",
    8400,
    [8437, 8446, 8444, 8451],
    8000,
    [8009, 8299],
    [5008, 5008, 5013],
    reason(
      "Grasp supports repeatable short trades; Demolish helps turn a managed wave into plate or turret pressure, matching Yorick's summon-assisted side-lane plan.",
      "Agarre favorece intercambios breves repetidos; Demoler convierte una oleada preparada en presión sobre placas o torres, acorde con el juego lateral de Yorick y sus invocaciones.",
      "Choose this when you can safely approach for Grasp procs and expect to use a won lane to pressure a structure.",
      "Elígela cuando puedas acercarte para activar Agarre y esperes convertir una ventaja de línea en presión sobre una estructura.",
      "It gives up Conqueror's longer-fight scaling and can be unreliable if you cannot safely reach the champion.",
      "Renuncia al escalado de Conquistador en peleas largas y puede ser inconsistente si no alcanzas al rival con seguridad.",
    ),
  ),
  yorickConq: rune(
    "yorick-fight",
    "Ability-led extended fights",
    "Peleas largas centradas en habilidades",
    8000,
    [8010, 8009, 9105, 8299],
    8400,
    [8446, 8444],
    [5008, 5008, 5013],
    reason(
      "Conqueror rewards repeated ability, ghoul and attack contact; Presence of Mind supports Yorick's mana-dependent lane and fight pattern.",
      "Conquistador recompensa el contacto repetido de habilidades, necrófagos y ataques; Presencia de ánimo ayuda con el patrón de línea y combate que depende del maná de Yorick.",
      "Choose this when fights last long enough for repeated hits and your ghouls or Maiden can keep pressure on the target.",
      "Elígela cuando las peleas duren lo suficiente para conectar varias veces y tus necrófagos o la Dama puedan mantener la presión.",
      "It is weaker in brief trades and has less immediate structure value than the Grasp page.",
      "Es más débil en intercambios breves y aporta menos valor inmediato a estructuras que la página de Agarre.",
    ),
  ),
  conq: (id: string, alt: string, title: string, titleEs: string, secondTree = 8400) =>
    rune(
      id,
      title,
      titleEs,
      8000,
      [8010, 9111, 9105, 8299],
      secondTree,
      secondTree === 8400 ? [8444, 8451] : [8226, 8210],
      [5005, 5008, 5013],
      reason(
        "Conqueror supports repeated contact and sustained combat; the minor runes reinforce uptime and a low-health finishing window.",
        "Conquistador favorece el contacto repetido y el combate sostenido; las runas menores refuerzan la continuidad y el cierre a poca vida.",
        alt,
        "cuando la pelea prevista permita mantener el contacto durante varios segundos.",
        "It needs time and access to pay off; short bursts or reliable disengage reduce its value.",
        "Necesita tiempo y acceso para rendir; el daño explosivo o una retirada fiable reducen su valor.",
      ),
    ),
  tankAfter: rune(
    "tank-engage",
    "Committed engage",
    "Inicio de combate comprometido",
    8400,
    [8439, 8463, 8473, 8451],
    8000,
    [9111, 9105],
    [5007, 5001, 5013],
    reason(
      "Aftershock adds a defensive window after your crowd-control engage; the secondary runes support repeated ability use and durability.",
      "Répliques añade una ventana defensiva tras iniciar con control; las runas secundarias apoyan el uso repetido de habilidades y la resistencia.",
      "Choose this when your job is to start fights with a reliable crowd-control ability.",
      "Elígela cuando tu función sea iniciar peleas con una habilidad fiable de control de masas.",
      "It has less lane sustain than Grasp and gives little value if you cannot trigger Aftershock on a target.",
      "Tiene menos sustain de línea que Agarre y aporta poco si no puedes activar Répliques sobre un objetivo.",
    ),
  ),
  tankGrasp: rune(
    "tank-lane",
    "Resilient lane",
    "Línea resistente",
    8400,
    [8437, 8446, 8473, 8451],
    8000,
    [9111, 9105],
    [5007, 5001, 5013],
    reason(
      "Grasp rewards safe repeated trades while Resolve runes reduce the cost of taking return damage.",
      "Agarre recompensa intercambios seguros repetidos y las runas de Valor reducen el coste del daño recibido.",
      "Choose this for a lane with regular short trades where you can trigger Grasp without forcing an engage.",
      "Elígela en una línea con intercambios breves frecuentes donde puedas activar Agarre sin forzar una iniciación.",
      "It offers less engage durability than Aftershock and requires access to the opponent for each proc.",
      "Ofrece menos resistencia al iniciar que Répliques y requiere acercarte al rival para cada activación.",
    ),
  ),
  comet: (id: string, title: string, titleEs: string, secondaryTree = 8000) =>
    rune(
      id,
      title,
      titleEs,
      8200,
      [8229, 8226, 8210, 8237],
      secondaryTree,
      secondaryTree === 8000 ? [8009, 8014] : [8347, 8313],
      [5008, 5008, 5013],
      reason(
        "Arcane Comet complements ranged spell poke; Manaflow and Transcendence support mana access and repeated spell cycles.",
        "Cometa arcano complementa el hostigamiento con hechizos a distancia; Banda de maná y Trascendencia apoyan el maná y la rotación repetida de habilidades.",
        "Choose this when you can reliably land ranged spells and pressure before a full commit.",
        "Elígela cuando puedas acertar hechizos a distancia y presionar antes de comprometerte por completo.",
        "It is less reliable against mobile targets and offers less all-in payoff than a burst keystone.",
        "Es menos fiable contra objetivos móviles y ofrece menos recompensa en un all-in que una runa de daño explosivo.",
      ),
    ),
  firstStrike: (id: string, title: string, titleEs: string) =>
    rune(
      id,
      title,
      titleEs,
      8300,
      [8369, 8304, 8313, 8347],
      8200,
      [8226, 8210],
      [5008, 5008, 5013],
      reason(
        "First Strike rewards opening a spell rotation before the opponent damages you; mana and haste runes support a follow-up cast.",
        "Primer golpe recompensa iniciar una rotación antes de recibir daño; las runas de maná y aceleración apoyan el siguiente lanzamiento.",
        "Choose this when your range or setup lets you start trades and convert a landed combo into an advantage.",
        "Elígela cuando tu alcance o preparación te permita iniciar intercambios y convertir un combo acertado en ventaja.",
        "It is unreliable when enemies consistently hit first or deny your opening spell.",
        "Es poco fiable cuando los rivales te golpean primero de forma constante o niegan tu hechizo inicial.",
      ),
    ),
};

const prof = (
  id: string,
  championIds: string[],
  roles: SetupProfile["roles"],
  title: string,
  titleEs: string,
  runes: [SetupRunePage, SetupRunePage],
  starts: SetupItemChoice[],
  core: SetupItemChoice[],
  boots: SetupItemChoice[],
  situational: SetupItemChoice[],
  spells: SetupSpellPair[],
  sources: string[],
  championNotes?: Record<string, SetupText>,
): SetupProfile => ({
  id,
  championIds,
  roles,
  title: txt(title, titleEs),
  runes,
  starts,
  core,
  boots,
  situational,
  spells,
  reviewedVersion: "16.20.1",
  sources,
  ...(championNotes ? { championNotes } : {}),
});

const SRC = {
  riot: "https://www.leagueoflegends.com/en-us/news/game-updates/league-of-legends-patch-26-20-notes/",
  ddragon: "https://ddragon.leagueoflegends.com/cdn/16.20.1/data/en_US/",
  champions: "https://www.leagueoflegends.com/en-us/champions/",
  roles: "https://www.leagueoflegends.com/en-ph/news/dev/dev-2026-season-one-gameplay-preview/",
};
// Sources identify the current game-data snapshot and general mechanics. Profile choices and
// their tradeoffs are editorial archetype starting points, not statistical or official builds.
const sources = (extra: string[] = []) => [
  SRC.riot,
  SRC.champions,
  SRC.ddragon + "runesReforged.json",
  SRC.ddragon + "item.json",
  SRC.ddragon + "summoner.json",
  SRC.roles,
  ...extra,
];

const whyItem = (id: string, why: string, whyEs: string, when: string, whenEs: string, cost: string, costEs: string) =>
  item(id, reason(why, whyEs, when, whenEs, cost, costEs));
const flashTP = spell(
  ["SummonerFlash", "SummonerTeleport"],
  reason(
    "Flash covers immediate access or escape; Teleport preserves a return and cross-map option for a side-lane plan.",
    "Destello ofrece acceso o escape inmediato; Teleportar conserva una opción de regreso y presencia en el mapa para jugar por el lateral.",
    "Choose this when wave recovery and later map response matter more than a second combat spell.",
    "Elígela cuando recuperar oleadas y responder en el mapa importe más que un segundo hechizo de combate.",
    "Choosing Teleport gives the top quest's upgraded version with a max-health shield. If you choose a combat spell, the free, longer-cooldown quest Teleport arrives only after quest completion; you lose that shield and early map access.",
    "Elegir Teleportar otorga la versión mejorada de la misión superior, con escudo según la vida máxima. Si eliges un hechizo de combate, el Teleportar gratuito de mayor enfriamiento llega al completar la misión; pierdes ese escudo y el acceso temprano al mapa.",
  ),
);

const BASE_SETUP_PROFILES: SetupProfile[] = [
  prof(
    "tryndamere-top",
    ["Tryndamere"],
    ["TOP"],
    "Fury-fueled crit duelist",
    "Duelista de crítico y Furia",
    [R.tryndSustain, R.tryndSafe],
    [
      whyItem(
        "1055",
        "Attack damage and lifesteal support early last hits and trades for a champion with no mana resource.",
        "El daño de ataque y robo de vida apoyan los últimos golpes y los intercambios de un campeón sin maná.",
        "Use as the default when you can contest the wave rather than absorb repeated ranged poke.",
        "Úsalo como opción inicial si puedes disputar la oleada en vez de resistir hostigamiento a distancia.",
        "It is less forgiving than a health-focused start when you cannot trade back.",
        "Perdona menos que un inicio con vida cuando no puedes responder al intercambio.",
      ),
    ],
    [
      whyItem(
        "6672",
        "Attack speed and repeated-hit damage fit a Fury and crit pattern built around staying in attack range.",
        "La velocidad de ataque y el daño de impactos repetidos encajan con la Furia y el crítico al mantenerte en alcance.",
        "Treat this as a candidate first completed damage item when you can keep attacking through a fight.",
        "Considéralo un posible primer objeto de daño completo si puedes seguir atacando durante una pelea.",
        "It does not solve access or durability by itself; reassess if burst or disengage prevents contact.",
        "No resuelve por sí solo el acceso ni la resistencia; reevalúa si el daño explosivo o la retirada impiden el contacto.",
      ),
      whyItem(
        "3078",
        "Trinity Force supports an attack-and-ability cycle while adding health for side-lane skirmishes.",
        "Fuerza de la Trinidad apoya el ciclo de ataques y habilidades y añade vida para escaramuzas laterales.",
        "Consider after the first damage spike when spellblade hits and extra health match your trade pattern.",
        "Considérala tras el primer pico de daño cuando los impactos de Hoja encantada y la vida adicional encajen con tus intercambios.",
        "This competes with a more focused crit/attack-speed route; do not treat both paths as mandatory.",
        "Compite con una ruta más enfocada en crítico y velocidad de ataque; no consideres obligatorias ambas rutas.",
      ),
    ],
    [
      whyItem(
        "3006",
        "Attack speed improves repeated attacks and helps convert access into damage.",
        "La velocidad de ataque mejora los golpes repetidos y convierte el acceso en daño.",
        "Choose when you can stay in range and want offensive tempo.",
        "Elígelas cuando puedas mantener el alcance y quieras ritmo ofensivo.",
        "They are less defensive than resistance boots.",
        "Son menos defensivas que las botas de resistencia.",
      ),
    ],
    [
      whyItem(
        "3033",
        "Armor penetration and healing reduction can help a physical-damage duelist into healing or durable armor targets.",
        "La penetración de armadura y reducción de curación pueden ayudar al duelista de daño físico contra objetivos con curación o armadura.",
        "Buy only when meaningful healing is swinging fights; consider the completed item when armor is also relevant.",
        "Cómpralo solo si una curación importante está decidiendo peleas; completa el objeto cuando la armadura también importe.",
        "It costs gold and delays attack or survival stats; choose this OR Lord Dominik's Regards for percent-penetration needs.",
        "Cuesta oro y retrasa estadísticas de ataque o supervivencia; elige este O Recuerdos de Lord Dominik para necesidades de penetración porcentual.",
      ),
      whyItem(
        "3036",
        "Percent armor penetration helps physical damage continue to matter against armored frontliners.",
        "La penetración porcentual de armadura ayuda a que el daño físico siga siendo relevante contra primeras líneas con armadura.",
        "Buy when armor is the problem, not simply because an enemy has high health.",
        "Cómpralo cuando el problema sea la armadura, no solo porque un rival tenga mucha vida.",
        "It delays attack speed and cannot be stacked as a second percent-penetration item with Mortal Reminder.",
        "Retrasa la velocidad de ataque y no se combina como segundo objeto de penetración porcentual con Recordatorio Mortal.",
      ),
      whyItem(
        "3742",
        "Health, armor and movement help maintain side-lane pressure while reducing physical burst.",
        "Vida, armadura y movimiento ayudan a mantener presión lateral y reducen el daño físico explosivo.",
        "Choose when physical damage or reaching a side lane safely is limiting your pressure.",
        "Elígelo cuando el daño físico o llegar con seguridad al lateral limite tu presión.",
        "It delays damage and is less useful when magic burst is the main threat.",
        "Retrasa el daño y sirve menos cuando la amenaza principal es el daño mágico explosivo.",
      ),
      whyItem(
        "3156",
        "The magic-damage shield can protect an all-in from heavy magic burst.",
        "El escudo contra daño mágico puede proteger un all-in frente a mucho daño mágico explosivo.",
        "Buy when magic burst repeatedly ends fights before your ultimate can create space.",
        "Cómpralo cuando el daño mágico explosivo termine peleas repetidamente antes de que tu definitiva cree espacio.",
        "Its Lifeline shield competes with Sterak's Gage and Immortal Shieldbow; choose one based on threat.",
        "Su escudo Salvavidas compite con Sterak y Arcoescudo Inmortal; elige uno según la amenaza.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerHaste"],
        reason(
          "Flash is the instant reposition; Ghost sustains pursuit so Tryndamere can keep making repeated attacks.",
          "Destello reposiciona al instante; Fantasmal mantiene la persecución para que Tryndamere siga atacando.",
          "Choose for a chase and extended-duel plan when map teleport access is less important.",
          "Elígela para perseguir y prolongar duelos cuando el acceso global importe menos.",
          "You give up the map and wave flexibility of Teleport; Ghost does not replace Flash's instant wall-crossing.",
          "Renuncias a la flexibilidad de mapa y oleadas de Teleportar; Fantasmal no sustituye el cruce instantáneo de muros de Destello.",
        ),
      ),
      flashTP,
    ],
    sources(),
  ),

  prof(
    "yorick-top",
    ["Yorick"],
    ["TOP"],
    "Ghoul-and-Maiden side-lane",
    "Lateral de necrófagos y Dama",
    [R.yorickGrasp, R.yorickConq],
    [
      whyItem(
        "1054",
        "Health and lane sustain help a mana-using melee caster survive poke while building graves and preparing a wave.",
        "La vida y el sustain de línea ayudan a un lanzador cuerpo a cuerpo con maná a resistir el hostigamiento mientras prepara tumbas y oleadas.",
        "Prefer into repeated poke or when you need time to reach a stable wave state.",
        "Prefiérelo ante hostigamiento repetido o cuando necesites tiempo para estabilizar la oleada.",
        "It gives up Doran's Blade's early offensive pressure.",
        "Renuncia a la presión ofensiva temprana de Espada de Doran.",
      ),
      whyItem(
        "1055",
        "Attack damage helps last hits and short trades when ghouls or a cage create a safe contact window.",
        "El daño de ataque ayuda con últimos golpes e intercambios breves cuando los necrófagos o la jaula crean una ventana segura.",
        "Choose when you can contest the lane and use your summons to protect the trade.",
        "Elígelo cuando puedas disputar la línea y usar tus invocaciones para cubrir el intercambio.",
        "It offers less health-based forgiveness into ranged pressure.",
        "Ofrece menos margen de vida ante presión a distancia.",
      ),
    ],
    [
      whyItem(
        "3078",
        "Attack damage, health and ability-linked attacks support Yorick's spell-plus-attack pattern.",
        "El daño de ataque, la vida y los ataques vinculados a habilidades apoyan el patrón de hechizos y ataques de Yorick.",
        "A candidate first core when you can weave attacks after landing abilities.",
        "Un posible primer núcleo cuando puedas intercalar ataques tras acertar habilidades.",
        "It is a general combat route, not an automatic side-lane purchase order.",
        "Es una ruta de combate general, no un orden lateral obligatorio.",
      ),
      whyItem(
        "3161",
        "Ability haste and health help sustain repeated spell cycles and longer fights.",
        "La aceleración de habilidad y la vida ayudan a mantener rotaciones de hechizos y peleas largas.",
        "Consider when repeated ability casts are more valuable than a faster structure-only branch.",
        "Considérala cuando repetir habilidades aporte más que una ruta centrada solo en estructuras.",
        "It delays defenses or specialized structure pressure; check the enemy damage before committing.",
        "Retrasa defensas o presión especializada sobre estructuras; revisa el daño enemigo antes de decidir.",
      ),
    ],
    [
      whyItem(
        "3047",
        "Armor and reduced incoming basic-attack damage help against physical attack pressure.",
        "La armadura y la reducción del daño recibido de ataques básicos ayudan contra presión de ataques físicos.",
        "Choose when physical attacks are the main lane or fight threat.",
        "Elígelas cuando los ataques físicos sean la amenaza principal en línea o peleas.",
        "They provide less help against magic damage and crowd control.",
        "Ayudan menos contra daño mágico y control de masas.",
      ),
    ],
    [
      whyItem(
        "3071",
        "Armor reduction can benefit Yorick's physical damage and allied physical damage in sustained fights.",
        "La reducción de armadura puede beneficiar el daño físico de Yorick y de sus aliados en peleas prolongadas.",
        "Buy when durable armored targets are present and your team can keep hitting them.",
        "Cómprala si hay objetivos resistentes con armadura y tu equipo puede seguir golpeándolos.",
        "It delays personal damage or defenses and is lower value into fragile teams.",
        "Retrasa daño personal o defensas y aporta menos contra equipos frágiles.",
      ),
      whyItem(
        "3033",
        "Healing reduction can matter when an enemy's sustain is deciding repeated side-lane fights.",
        "La reducción de curación importa cuando el sustain rival decide peleas laterales repetidas.",
        "Add only when substantial healing changes the outcome; it is not an automatic answer to any heal.",
        "Añádelo solo si una curación sustancial cambia el resultado; no es una respuesta automática a cualquier cura.",
        "It costs gold and competes with Lord Dominik's Regards for percent armor penetration.",
        "Cuesta oro y compite con Recuerdos de Lord Dominik por penetración porcentual de armadura.",
      ),
      whyItem(
        "3053",
        "A Lifeline shield can buy time when burst reaches Yorick before his summons establish pressure.",
        "Un escudo Salvavidas puede dar tiempo cuando el daño explosivo alcanza a Yorick antes de que sus invocaciones establezcan presión.",
        "Choose if physical burst is the recurring failure point.",
        "Elígelo si el daño físico explosivo es el problema recurrente.",
        "Its Lifeline effect competes with Maw and Immortal Shieldbow; it delays damage.",
        "Su efecto Salvavidas compite con Fauces y Arcoescudo Inmortal; retrasa el daño.",
      ),
      whyItem(
        "3742",
        "Armor, health and movement support a safer side-lane approach against physical threats.",
        "Armadura, vida y movimiento permiten un acercamiento lateral más seguro ante amenazas físicas.",
        "Buy when side-lane access is dangerous because of physical damage.",
        "Cómprala cuando el daño físico haga peligroso el acceso al lateral.",
        "It contributes less to ability damage and is weak into magic-heavy threats.",
        "Aporta menos al daño de habilidades y sirve poco ante mucho daño mágico.",
      ),
    ],
    [
      flashTP,
      spell(
        ["SummonerFlash", "SummonerDot"],
        reason(
          "Flash remains the escape or cage follow-up; Ignite adds lane pressure when committing to a close-range duel.",
          "Destello sigue siendo el escape o seguimiento a la jaula; Ignite añade presión de línea al comprometerte con un duelo cercano.",
          "Choose only when you intend to contest lane kills and accept less map flexibility.",
          "Elígela solo si piensas disputar eliminaciones en línea y aceptas menos flexibilidad de mapa.",
          "You give up Teleport's wave and cross-map option; Ignite is not a universal anti-heal purchase.",
          "Renuncias a la opción de oleadas y mapa de Teleportar; Ignite no es una compra universal contra curación.",
        ),
      ),
    ],
    sources(),
    {
      Yorick: txt(
        "Mana, graves, ghouls and Maiden enable ability-led trades and side-lane pressure; this is intentionally not Tryndamere's crit/attack-speed setup.",
        "El maná, las tumbas, los necrófagos y la Dama permiten intercambios con habilidades y presión lateral; esta configuración no es la de crítico y velocidad de ataque de Tryndamere.",
      ),
    },
  ),

  prof(
    "gwen-top",
    ["Gwen"],
    ["TOP"],
    "AP sustained skirmisher",
    "Luchadora de poder de habilidad",
    [
      R.conq(
        "gwen-conq",
        "when you expect to reach repeated Q and basic-attack cycles in a sustained fight.",
        "Sustained combat",
        "Combate sostenido",
        8400,
      ),
      R.rune(
        "gwen-grasp",
        "Durable short trades",
        "Intercambios breves resistentes",
        8400,
        [8437, 8446, 8473, 8451],
        8000,
        [9111, 9105],
        [5005, 5008, 5013],
        reason(
          "Grasp offers a sturdier short-trade option for a melee AP champion who must approach the wave.",
          "Agarre ofrece intercambios breves más resistentes para una campeona de poder de habilidad que debe acercarse a la oleada.",
          "Choose into difficult lane pressure when repeatable short trades are available.",
          "Elígela ante presión difícil cuando puedas repetir intercambios breves.",
          "You give up Conqueror's extended fight payoff.",
          "Renuncias al valor de Conquistador en peleas largas.",
        ),
      ),
    ],
    [
      whyItem(
        "1054",
        "Health and sustain help Gwen approach lane and farm toward AP items.",
        "La vida y el sustain ayudan a Gwen a acercarse a la oleada y avanzar hacia objetos de poder de habilidad.",
        "Choose into poke and when surviving the approach matters.",
        "Elígelo ante hostigamiento y cuando importe sobrevivir al acercamiento.",
        "It has less early damage than an offensive start.",
        "Aporta menos daño temprano que un inicio ofensivo.",
      ),
    ],
    [
      whyItem(
        "4633",
        "Riftmaker supports an AP melee champion in extended combat with health and combat-oriented AP.",
        "Agrietador apoya a una campeona cuerpo a cuerpo de poder de habilidad en combate prolongado con vida y poder de habilidad ofensivo.",
        "Candidate first core when fights involve sustained contact rather than one spell rotation.",
        "Posible primer núcleo si las peleas implican contacto sostenido y no una sola rotación.",
        "It is less immediate burst than a dedicated burst route.",
        "Ofrece menos daño explosivo inmediato que una ruta dedicada a burst.",
      ),
      whyItem(
        "6653",
        "Liandry's burn can reward repeated spell contact against durable targets.",
        "La quemadura de Liandry recompensa el contacto repetido de habilidades contra objetivos resistentes.",
        "Consider when fights last and enemies have health to burn through.",
        "Considéralo si las peleas duran y los rivales tienen vida que desgastar.",
        "It is less focused on surviving direct melee pressure than a health-oriented option.",
        "Se centra menos en resistir presión cuerpo a cuerpo directa que una opción con vida.",
      ),
    ],
    [
      whyItem(
        "3047",
        "Armor reduces physical threat while Gwen closes to deal sustained damage.",
        "La armadura reduce la amenaza física mientras Gwen se acerca para infligir daño sostenido.",
        "Choose into physical attacks that threaten her approach.",
        "Elígelas ante ataques físicos que amenacen su acercamiento.",
        "Less useful against magic damage and hard crowd control.",
        "Sirven menos contra daño mágico y control de masas fuerte.",
      ),
      whyItem(
        "3111",
        "Magic resistance and tenacity can reduce eligible crowd-control duration.",
        "La resistencia mágica y la tenacidad pueden reducir la duración del control de masas elegible.",
        "Choose when magic damage and reducible crowd control are both relevant.",
        "Elígelas cuando importen tanto el daño mágico como el control reducible.",
        "Tenacity does not remove suppression or airborne effects.",
        "La tenacidad no elimina supresiones ni efectos de lanzamiento por el aire.",
      ),
    ],
    [
      whyItem(
        "3156",
        "A magic-damage shield can protect Gwen from burst before she gets sustained contact.",
        "Un escudo contra daño mágico puede proteger a Gwen del daño explosivo antes de mantener contacto.",
        "Buy only when repeated magic burst is the real obstacle.",
        "Cómpralo solo si el daño mágico explosivo repetido es el obstáculo real.",
        "Lifeline competes with Sterak and Shieldbow; the item delays AP or sustained damage.",
        "Salvavidas compite con Sterak y Arcoescudo; el objeto retrasa poder de habilidad o daño sostenido.",
      ),
      whyItem(
        "3165",
        "Morellonomicon applies healing reduction through magic damage, which matches Gwen's AP damage pattern.",
        "Morellonomicon aplica reducción de curación mediante daño mágico, acorde al patrón de daño AP de Gwen.",
        "Consider only when substantial healing is deciding fights and Gwen can keep applying magic damage.",
        "Considéralo solo si una curación sustancial decide peleas y Gwen puede seguir aplicando daño mágico.",
        "It delays sustained damage or defense and is not needed for minor healing.",
        "Retrasa daño sostenido o defensa y no hace falta ante curación menor.",
      ),
    ],
    [
      flashTP,
      spell(
        ["SummonerFlash", "SummonerDot"],
        reason(
          "Flash secures an approach or escape; Ignite adds lane kill pressure and applies Grievous Wounds during Gwen's magic-damage all-in.",
          "Destello asegura la entrada o escape; Ignite añade presión de eliminación en línea y aplica Heridas graves durante el all-in mágico de Gwen.",
          "Choose when lane is a winnable matchup and you will commit to short kill windows rather than prioritize the quest Teleport shield and map access.",
          "Elígela si el enfrentamiento permite buscar bajas y priorizas ventanas de eliminación sobre el escudo de Teleportar de misión y acceso al mapa.",
          "You lose chosen Teleport's upgraded quest version and shield; free quest Teleport comes only after completion, on a longer cooldown, and without that shield.",
          "Pierdes la versión mejorada y el escudo de Teleportar elegido; el gratuito llega al completar la misión, con mayor enfriamiento y sin ese escudo.",
        ),
      ),
    ],
    sources(),
    {
      Gwen: txt(
        "Gwen is an AP melee skirmisher; Nashor's and Riftmaker support repeated magic-damage contact. Her Q and R magic damage apply Morellonomicon's Grievous Wounds; avoid physical anti-heal items.",
        "Gwen es una luchadora AP cuerpo a cuerpo; Nashor y Agrietador apoyan el contacto repetido con daño mágico. El daño mágico de Q y R aplica Heridas graves de Morellonomicon; evita objetos físicos anti-curación.",
      ),
    },
  ),

  prof(
    "fighter-jungle",
    ["Vi", "LeeSin", "XinZhao", "JarvanIV", "Viego"],
    ["JUNGLE"],
    "AD engage and skirmish jungle",
    "Jungla de iniciación y escaramuzas físicas",
    [
      R.conq(
        "jungle-fight",
        "when you can maintain contact after your first engage and expect a longer skirmish.",
        "Conqueror skirmish",
        "Escaramuza con Conquistador",
        8400,
      ),
      rune(
        "jungle-pta",
        "Early pick and focused target",
        "Selección temprana y objetivo enfocado",
        8000,
        [8005, 9111, 9105, 8014],
        8400,
        [8444, 8451],
        [5005, 5008, 5013],
        reason(
          "Press the Attack helps front-load damage on one reachable target; Resolve adds durability for the follow-up.",
          "Ataque intensificado concentra daño inicial en un objetivo alcanzable; Valor añade resistencia para continuar.",
          "Choose for early ganks or short picks rather than a long front-to-back fight.",
          "Elígela para emboscadas tempranas o selecciones breves, no para peleas largas de frente.",
          "It has less sustained-combat payoff than Conqueror.",
          "Aporta menos en combate sostenido que Conquistador.",
        ),
      ),
    ],
    [
      whyItem(
        "1101",
        "Scorchclaw Pup is a current jungle companion start; Smite remains paired with the jungle role.",
        "Cachorro de Rasgafuegos es un compañero de jungla actual; Aplastar sigue ligado al rol.",
        "Choose when the damage-oriented companion suits your route; validate the live quest choice in game.",
        "Elígelo cuando el compañero ofensivo encaje con tu ruta; confirma la opción de misión en la partida.",
        "This is a role starter, not a combat-item recommendation.",
        "Es un inicio de rol, no una recomendación de objeto de combate.",
      ),
    ],
    [
      whyItem(
        "3190",
        "Locket provides a team shield and mixed defenses that suit a frontline support's fight entry.",
        "Medallón aporta un escudo de equipo y defensas mixtas para la entrada de un soporte de primera línea.",
        "Candidate first support completion when allied protection matters after your engage.",
        "Posible primera finalización de soporte si importa proteger aliados tras iniciar.",
        "It offers less personal damage and uses support income.",
        "Aporta menos daño personal y usa ingresos de soporte.",
      ),
      whyItem(
        "3109",
        "Knight's Vow can redirect some damage from a linked ally and add frontline durability.",
        "Promesa de Caballero puede redirigir parte del daño de un aliado vinculado y añadir resistencia.",
        "Consider when a specific carry needs protection and your team can use the link.",
        "Considérala si un carry concreto necesita protección y el equipo aprovecha el vínculo.",
        "It is single-ally focused and less useful when the team needs an area shield.",
        "Se centra en un aliado y aporta menos si el equipo necesita escudo de área.",
      ),
    ],
    [
      whyItem(
        "3111",
        "Magic resistance and tenacity help into magic damage and reducible crowd control.",
        "La resistencia mágica y tenacidad ayudan contra daño mágico y control reducible.",
        "Choose based on the threats you must engage through.",
        "Elígelas según las amenazas que debas atravesar para iniciar.",
        "Tenacity does not cleanse suppression or airborne effects.",
        "La tenacidad no elimina supresiones ni efectos de lanzamiento por el aire.",
      ),
      whyItem(
        "3047",
        "Armor and basic-attack mitigation help against physical damage while diving.",
        "La armadura y mitigación de ataques básicos ayudan contra daño físico al lanzarte.",
        "Choose when the enemy's physical carries are the main fight risk.",
        "Elígelas cuando los carries físicos rivales sean el mayor riesgo.",
        "They do not address magic burst or non-attack spell damage.",
        "No resuelven el daño mágico explosivo ni el daño de hechizos que no sean ataques.",
      ),
    ],
    [
      whyItem(
        "3156",
        "The magic shield can keep an engager alive through a concentrated magic burst.",
        "El escudo mágico puede mantener con vida al iniciador ante daño mágico concentrado.",
        "Buy if magic burst repeatedly stops your engage.",
        "Cómpralo si el daño mágico explosivo detiene repetidamente tu iniciación.",
        "Lifeline competes with Sterak and Shieldbow.",
        "Salvavidas compite con Sterak y Arcoescudo.",
      ),
      whyItem(
        "3033",
        "Healing reduction can matter if enemy healing is deciding objective fights and your physical damage can apply it.",
        "La reducción de curación puede importar si la curación rival decide peleas de objetivo y tu daño físico puede aplicarla.",
        "Buy only for meaningful healing, not a small incidental heal.",
        "Cómpralo solo ante curación significativa, no por una cura incidental pequeña.",
        "It delays survivability and competes with Lord Dominik's Regards for percent penetration.",
        "Retrasa la supervivencia y compite con Recuerdos de Lord Dominik por penetración porcentual.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerSmite"],
        reason(
          "Smite handles the jungle quest and objective contests; Flash gives these melee divers a direct engage or escape tool.",
          "Aplastar sirve para la misión de jungla y disputar objetivos; Destello da a estos iniciadores cuerpo a cuerpo una entrada o escape directo.",
          "Use for standard jungle play.",
          "Úsala en jungla estándar.",
          "This profile keeps Smite mandatory; change only the non-Smite spell when champion-specific review supports it.",
          "Este perfil mantiene Aplastar como obligatorio; cambia solo el otro hechizo si una revisión específica lo respalda.",
        ),
      ),
      spell(
        ["SummonerHaste", "SummonerSmite"],
        reason(
          "Smite remains required; Ghost can extend chase for champions whose kit already supplies reliable entry.",
          "Aplastar sigue siendo necesario; Fantasmal prolonga la persecución en campeones cuyo kit ya ofrece una entrada fiable.",
          "Consider only for a reviewed champion such as Viego when sustained chase matters more than Flash's instant reposition.",
          "Considérala solo para un campeón revisado como Viego cuando la persecución importe más que el reposicionamiento instantáneo de Destello.",
          "You lose Flash's immediate wall-crossing and engage correction; do not assume this fits all melee junglers.",
          "Pierdes el cruce de muros y ajuste de iniciación inmediato de Destello; no supongas que sirve para toda jungla cuerpo a cuerpo.",
        ),
      ),
    ],
    sources(),
    {
      Vi: txt(
        "Point-and-click ultimate access rewards a reliable entry; retain Flash plus Smite for standard jungle.",
        "El acceso fiable con la definitiva de objetivo único recompensa una entrada segura; conserva Destello y Aplastar en jungla estándar.",
      ),
      LeeSin: txt(
        "Early mobility and repeatable spell casts support skirmishes; this profile does not claim a single optimal combo or build.",
        "La movilidad temprana y los lanzamientos repetidos apoyan escaramuzas; este perfil no afirma un combo ni una configuración óptimos.",
      ),
      XinZhao: txt(
        "The kit rewards direct champion contact and sustained skirmishes; choose defenses for the enemy damage mix.",
        "El kit recompensa el contacto directo y las escaramuzas sostenidas; elige defensas según el daño rival.",
      ),
      JarvanIV: txt(
        "An engage-oriented ultimate makes reliable access and survival after entry central to item choices.",
        "Una definitiva de iniciación hace centrales el acceso fiable y la supervivencia tras entrar.",
      ),
      Viego: txt(
        "Reset-focused fights reward reaching a takedown safely; the Ghost option is a champion-specific alternative, not a class default.",
        "Las peleas centradas en reinicios premian alcanzar una baja con seguridad; Fantasmal es una alternativa específica, no una regla de clase.",
      ),
    },
  ),

  prof(
    "ap-jungle",
    ["Diana", "Fiddlesticks", "Karthus"],
    ["JUNGLE"],
    "AP jungle: distinct spell-loop options",
    "Jungla de poder de habilidad: bucles distintos",
    [
      rune(
        "apj-diana",
        "Repeated-contact AP skirmish",
        "Escaramuza de poder de habilidad y contacto repetido",
        8000,
        [8010, 9111, 9105, 8299],
        8200,
        [8226, 8210],
        [5005, 5008, 5013],
        reason(
          "Conqueror supports Diana's repeated melee spell and attack contact through a committed fight.",
          "Conquistador apoya el contacto repetido de habilidades y ataques cuerpo a cuerpo de Diana durante una pelea comprometida.",
          "Choose for extended entry fights where you can stay on targets.",
          "Elígela para peleas de entrada prolongadas donde puedas mantenerte sobre los objetivos.",
          "It gives less instant burst than a dedicated first-combo page.",
          "Aporta menos daño explosivo inmediato que una página centrada en el primer combo.",
        ),
      ),
      rune(
        "apj-harvest",
        "Repeated spell damage and takedown cleanup",
        "Daño de hechizos repetido y cierre de bajas",
        8100,
        [8128, 8139, 8137, 8106],
        8200,
        [8226, 8210],
        [5008, 5008, 5013],
        reason(
          "Dark Harvest suits repeated spell damage and cleanup windows in fights; mana and haste support continued casting.",
          " cosecha oscura encaja con daño de hechizos repetido y ventanas para cerrar peleas; maná y aceleración apoyan los lanzamientos.",
          "A more appropriate authored option for Fiddlesticks or Karthus when spell damage from range or an ultimate shapes the fight.",
          "Opción más apropiada para Fiddlesticks o Karthus cuando el daño de hechizos a distancia o una definitiva define la pelea.",
          "It is less dependable before takedowns and does not replace safe positioning.",
          "Es menos fiable antes de conseguir bajas y no sustituye una posición segura.",
        ),
      ),
    ],
    [
      whyItem(
        "1102",
        "Gustwalker Hatchling is a current jungle start suited to moving through the map after camps.",
        "Cría de Trotabrisas es un inicio de jungla actual que ayuda a desplazarse por el mapa tras los campamentos.",
        "Use for a standard jungle route; pick the live companion that fits the champion and path.",
        "Úsalo en una ruta estándar; escoge el compañero vigente según campeón y recorrido.",
        "It is a role start, not a combat item.",
        "Es un inicio de rol, no un objeto de combate.",
      ),
    ],
    [
      whyItem(
        "6653",
        "Liandry's repeated burn fits sustained spell contact and damage over time.",
        "La quemadura repetida de Liandry encaja con contacto sostenido de hechizos y daño prolongado.",
        "Consider for Fiddlesticks or Karthus when enemies remain in spell zones; reassess for Diana's entry pattern.",
        "Considéralo para Fiddlesticks o Karthus si los rivales permanecen en zonas de hechizo; reevalúa para la entrada de Diana.",
        "It is not the same burst plan for all three champions.",
        "No es el mismo plan explosivo para los tres campeones.",
      ),
      whyItem(
        "3089",
        "Rabadon's amplifies a developed AP inventory for a later damage spike.",
        "Rabadon amplifica un inventario de poder de habilidad ya desarrollado para un pico de daño posterior.",
        "Consider after useful first items when you can reach enemies safely enough to cast.",
        "Considéralo tras objetos iniciales útiles cuando puedas lanzar habilidades con suficiente seguridad.",
        "It gives less utility or defense than a situational item and is costly.",
        "Aporta menos utilidad o defensa que un objeto situacional y es costoso.",
      ),
    ],
    [
      whyItem(
        "3020",
        "Magic penetration supports spell damage against targets without enough magic resistance to blunt it.",
        "La penetración mágica apoya el daño de hechizos contra objetivos sin suficiente resistencia mágica para mitigarlo.",
        "Choose when the offensive boot slot improves your planned damage pattern.",
        "Elígelas cuando las botas ofensivas mejoren tu plan de daño.",
        "They give less haste or defense than alternate boots.",
        "Aportan menos aceleración o defensa que otras botas.",
      ),
      whyItem(
        "3111",
        "Magic resistance and tenacity can help when entering fights through eligible crowd control.",
        "La resistencia mágica y tenacidad ayudan al entrar en peleas con control de masas elegible.",
        "Choose against magic threat and reducible crowd control.",
        "Elígelas ante amenazas mágicas y control reducible.",
        "Tenacity does not remove suppressions or airborne effects.",
        "La tenacidad no elimina supresiones ni efectos por el aire.",
      ),
    ],
    [
      whyItem(
        "3157",
        "Stasis can buy a short defensive window after committing into a concentrated fight.",
        "Estasis puede dar una breve ventana defensiva tras comprometerte en una pelea concentrada.",
        "Consider when enemy focus regularly lands on your dive or channel.",
        "Considéralo cuando el foco rival alcance tu entrada o canalización.",
        "It delays damage and timing it poorly can leave allies without follow-up.",
        "Retrasa el daño y usarlo mal puede dejar a tus aliados sin seguimiento.",
      ),
      whyItem(
        "3165",
        "Healing reduction is a situational option when meaningful healing is deciding fights and current effects suit your damage.",
        "La reducción de curación es una opción situacional cuando una curación importante decide peleas y el efecto actual encaja con tu daño.",
        "Buy only after confirming enemy healing is substantial.",
        "Cómpralo solo tras confirmar que la curación rival es sustancial.",
        "It delays AP and is not a substitute for applying damage reliably.",
        "Retrasa poder de habilidad y no sustituye aplicar daño de forma fiable.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerSmite"],
        reason(
          "Smite is the standard jungle requirement; Flash helps AP junglers reposition for a gank or leave after casting.",
          "Aplastar es requisito estándar de jungla; Destello ayuda a reposicionarse para una emboscada o salir tras lanzar hechizos.",
          "Use for standard jungle.",
          "Úsala en jungla estándar.",
          "A second combat spell does not replace Smite's role in the jungle quest.",
          "Un segundo hechizo de combate no reemplaza la función de Aplastar en la misión de jungla.",
        ),
      ),
      spell(
        ["SummonerHaste", "SummonerSmite"],
        reason(
          "Ghost extends movement through a fight while Smite remains required.",
          "Fantasmal prolonga el movimiento durante la pelea mientras Aplastar sigue siendo obligatorio.",
          "A champion-specific alternative for Fiddlesticks or Karthus when uninterrupted repositioning after the first cast matters.",
          "Alternativa específica para Fiddlesticks o Karthus cuando importe reposicionarse sin interrupción tras el primer lanzamiento.",
          "You lose Flash's immediate reposition; do not use this as a blanket AP-jungle choice.",
          "Pierdes el reposicionamiento inmediato de Destello; no la uses como opción universal de jungla AP.",
        ),
      ),
    ],
    sources(),
    {
      Diana: txt(
        "Diana is a melee AP diver; attack-speed shard and Conqueror reflect repeated contact, not a ranged mage plan.",
        "Diana es una iniciadora cuerpo a cuerpo de poder de habilidad; el fragmento de velocidad de ataque y Conquistador reflejan contacto repetido, no un plan de maga a distancia.",
      ),
      Fiddlesticks: txt(
        "Channel setup and area control favor finding a safe approach; survivability and vision timing matter more than dueling.",
        "La canalización y el control de zona favorecen encontrar una entrada segura; la supervivencia y el momento de visión importan más que el duelo.",
      ),
      Karthus: txt(
        "Farming and repeated area damage reward scaling spell uptime; avoid implying that a risky entry is required to deal damage.",
        "La limpieza y el daño de área repetido premian escalar y lanzar con continuidad; no implica que necesite entrar arriesgadamente para hacer daño.",
      ),
    },
  ),

  prof(
    "tank-top",
    ["Malphite", "Ornn", "Sion", "Shen"],
    ["TOP"],
    "Frontline top: engage or lane trades",
    "Superior de primera línea: iniciación o intercambios",
    [R.tankAfter, R.tankGrasp],
    [
      whyItem(
        "1054",
        "Health and sustain support a durable lane while preserving gold for tank items.",
        "Vida y sustain apoyan una línea resistente y reservan oro para objetos de tanque.",
        "Choose into poke or when the plan is to absorb pressure and scale.",
        "Elígelo ante hostigamiento o para resistir presión y escalar.",
        "It gives up the early attack damage of Blade.",
        "Renuncia al daño de ataque temprano de Espada.",
      ),
    ],
    [
      whyItem(
        "3068",
        "Sunfire Aegis supplies health, armor and haste for a frontline who remains in close combat.",
        "Égida de Fuego Solar aporta vida, armadura y aceleración para una primera línea que permanece en combate cercano.",
        "Candidate first tank completion when physical damage and sustained contact are expected.",
        "Posible primera finalización de tanque ante daño físico y contacto sostenido.",
        "It offers less magic resistance and is not a damage-first branch.",
        "Aporta menos resistencia mágica y no es una rama centrada en daño.",
      ),
      whyItem(
        "6665",
        "Jak'Sho adds mixed defenses for extended frontline fights.",
        "Jak'Sho añade defensas mixtas para peleas largas de primera línea.",
        "Consider after a first resistance item when both damage types threaten you.",
        "Considéralo tras una primera resistencia si ambos tipos de daño te amenazan.",
        "It is a durability choice that delays damage or team utility.",
        "Es una opción de resistencia que retrasa daño o utilidad de equipo.",
      ),
    ],
    [
      whyItem(
        "3047",
        "Armor and attack mitigation help against physical top-lane and carry damage.",
        "Armadura y mitigación de ataques ayudan contra daño físico de línea superior y carries.",
        "Choose when physical attacks are the lane or fight priority.",
        "Elígelas cuando los ataques físicos sean la prioridad en línea o pelea.",
        "Less effective against magic damage and control.",
        "Menos efectivas contra daño mágico y control.",
      ),
      whyItem(
        "3111",
        "Magic resistance and tenacity help against magic damage and eligible crowd control.",
        "La resistencia mágica y tenacidad ayudan contra daño mágico y control elegible.",
        "Choose when these are the threats you must withstand to engage.",
        "Elígelas cuando sean las amenazas que debas soportar para iniciar.",
        "Tenacity does not remove suppression or airborne effects.",
        "La tenacidad no elimina supresiones ni efectos por el aire.",
      ),
    ],
    [
      whyItem(
        "6664",
        "Hollow Radiance offers health and magic resistance for a frontline facing sustained magic damage.",
        "Resplandor Hueco ofrece vida y resistencia mágica para una primera línea ante daño mágico sostenido.",
        "Choose as the resistance alternative when magic damage, rather than physical attacks, is the lane or fight problem.",
        "Elígelo como alternativa de resistencia si el daño mágico, y no los ataques físicos, es el problema.",
        "It delays armor and is not needed into primarily physical teams.",
        "Retrasa armadura y no hace falta ante equipos principalmente físicos.",
      ),
      whyItem(
        "3156",
        "A magic shield can help a frontline survive concentrated magic burst.",
        "Un escudo mágico puede ayudar a la primera línea a resistir daño mágico concentrado.",
        "Buy when that burst is repeatedly deciding fights.",
        "Cómpralo cuando ese daño explosivo decida peleas repetidamente.",
        "Lifeline competes with Sterak and Shieldbow; it costs offensive stats.",
        "Salvavidas compite con Sterak y Arcoescudo; cuesta estadísticas ofensivas.",
      ),
      whyItem(
        "3742",
        "Armor, health and movement support a physical-damage frontline and side-lane rotation.",
        "Armadura, vida y movimiento apoyan una primera línea contra daño físico y rotaciones laterales.",
        "Consider against physical damage or when moving between waves and fights matters.",
        "Considérala contra daño físico o cuando importe rotar entre oleadas y peleas.",
        "It does not solve magic damage; item order must follow the actual enemy threat.",
        "No resuelve el daño mágico; el orden debe responder a la amenaza real.",
      ),
      whyItem(
        "3033",
        "Healing reduction can help only when substantial enemy healing changes the fight and the champion applies it reliably.",
        "La reducción de curación solo ayuda cuando una curación rival sustancial cambia la pelea y el campeón puede aplicarla bien.",
        "Check current item effect and champion damage before buying.",
        "Comprueba el efecto actual y el daño del campeón antes de comprar.",
        "It delays durability and is mutually exclusive with Lord Dominik's Regards for percent penetration.",
        "Retrasa resistencia y es incompatible con Recuerdos de Lord Dominik para penetración porcentual.",
      ),
    ],
    [
      flashTP,
      spell(
        ["SummonerFlash", "SummonerDot"],
        reason(
          "Flash preserves escape or engage correction; Ignite commits to lane pressure.",
          "Destello conserva escape o ajuste de iniciación; Ignite compromete a presión de línea.",
          "Consider for a champion and matchup where early lane pressure outweighs map value.",
          "Considérala si el campeón y enfrentamiento hacen que la presión temprana supere el valor de mapa.",
          "You give up Teleport's map option; the free top quest spell arrives only after completion if you did not choose Teleport.",
          "Renuncias a la opción de mapa de Teleportar; el hechizo gratuito de la misión superior llega al completarla si no elegiste Teleportar.",
        ),
      ),
    ],
    sources(),
    {
      Malphite: txt(
        "The profile is the tank/engage branch. AP burst Malphite is a separate strategy and is not implied by this entry.",
        "Este perfil es la rama de tanque e iniciación. Malphite AP de daño explosivo es otra estrategia y no está implícita aquí.",
      ),
      Ornn: txt(
        "Ornn's frontline and upgrade utility favor durable engage; do not use the optional Trinity Force branch as a default.",
        "La primera línea y utilidad de mejoras de Ornn favorecen iniciación resistente; no uses Trinidad opcional como opción predeterminada.",
      ),
      Sion: txt(
        "Choose resistance according to the opposing damage; the shared rune pages are lane-trade versus engage options.",
        "Elige resistencia según el daño rival; las páginas compartidas distinguen intercambios de línea e iniciación.",
      ),
      Shen: txt(
        "Map-aware ultimate play makes the Teleport tradeoff especially relevant; his attack pattern differs from Ornn's.",
        "La definitiva con impacto global hace especialmente relevante la decisión de Teleportar; su patrón de ataques difiere del de Ornn.",
      ),
    },
  ),

  prof(
    "ap-mid",
    ["Ahri", "Syndra", "Orianna", "Viktor", "Lux"],
    ["MIDDLE"],
    "Ranged control mage",
    "Maga de control a distancia",
    [
      R.comet("mage-poke", "Poke and control", "Hostigamiento y control"),
      R.firstStrike("mage-firststrike", "Combo opening", "Apertura de combo"),
    ],
    [
      whyItem(
        "1056",
        "Ability power and mana support a spell-focused opening and lane casting.",
        "El poder de habilidad y el maná apoyan una apertura centrada en hechizos y lanzamientos en línea.",
        "Use for a standard ranged mage lane.",
        "Úsalo en una línea estándar de maga a distancia.",
        "It offers less health than a defensive start into heavy poke.",
        "Ofrece menos vida que un inicio defensivo ante mucho hostigamiento.",
      ),
    ],
    [
      whyItem(
        "6655",
        "Luden's supplies AP and a burst-oriented spell pattern.",
        "Eco de Luden aporta poder de habilidad y un patrón de hechizos explosivo.",
        "Candidate first core for a champion who can land a reliable opening rotation.",
        "Posible primer núcleo para quien pueda acertar una rotación inicial fiable.",
        "It is less focused on repeated damage over time than Liandry's.",
        "Se centra menos en daño prolongado repetido que Liandry.",
      ),
      whyItem(
        "6653",
        "Liandry's rewards repeated spell contact against durable targets.",
        "Liandry recompensa el contacto repetido de hechizos contra objetivos resistentes.",
        "Choose when enemy frontline health and longer fights make its burn relevant.",
        "Elígelo cuando la vida de la primera línea y las peleas largas hagan relevante su quemadura.",
        "It offers less immediate burst than a burst-focused alternative.",
        "Aporta menos daño explosivo inmediato que una alternativa centrada en burst.",
      ),
    ],
    [
      whyItem(
        "3020",
        "Magic penetration supports spell damage when the opposing team is not stacking magic resistance.",
        "La penetración mágica apoya el daño de hechizos cuando el equipo rival no acumula resistencia mágica.",
        "Choose for an offensive lane plan.",
        "Elígelas para un plan ofensivo en línea.",
        "They add less ability haste or defense than alternatives.",
        "Aportan menos aceleración o defensa que otras opciones.",
      ),
      whyItem(
        "3158",
        "Ability haste supports repeated control and spell cycles.",
        "La aceleración de habilidad apoya control y rotaciones repetidas.",
        "Choose when repeated casts matter more than penetration.",
        "Elígelas cuando importen más los lanzamientos repetidos que la penetración.",
        "They offer less direct magic penetration.",
        "Ofrecen menos penetración mágica directa.",
      ),
    ],
    [
      whyItem(
        "3157",
        "Stasis can interrupt enemy focus after a committed control or dive threat.",
        "Estasis puede interrumpir el foco rival tras una amenaza de control o entrada comprometida.",
        "Buy when survival through a specific dive or burst window matters.",
        "Cómpralo cuando importe sobrevivir a una entrada o ventana de daño concreta.",
        "It delays damage; using stasis without team follow-up can waste the window.",
        "Retrasa daño; usar estasis sin seguimiento del equipo puede desperdiciar la ventana.",
      ),
      whyItem(
        "3165",
        "Healing reduction is a conditional response when meaningful healing is deciding fights.",
        "La reducción de curación es una respuesta condicional si una curación importante decide peleas.",
        "Buy only when sustained enemy healing is a real obstacle.",
        "Cómpralo solo si la curación rival sostenida es un obstáculo real.",
        "It delays AP and is not needed for every champion heal.",
        "Retrasa poder de habilidad y no hace falta ante cualquier curación.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerDot"],
        reason(
          "Flash covers escape and combo correction; Ignite adds kill pressure to a range or charm setup.",
          "Destello cubre escape y corrección de combo; Ignite añade presión de eliminación a una preparación de alcance o encanto.",
          "Choose if you can threaten lane kills and accept less map flexibility.",
          "Elígela si amenazas eliminaciones en línea y aceptas menos flexibilidad de mapa.",
          "You give up Teleport's wave recovery and cross-map value.",
          "Renuncias a la recuperación de oleadas y valor global de Teleportar.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerTeleport"],
        reason(
          "Flash preserves safety while Teleport offers wave and map response for a control mage.",
          "Destello conserva seguridad y Teleportar ofrece respuesta a oleadas y mapa para una maga de control.",
          "Choose when stable tempo and later side-lane response matter more than lane kill pressure.",
          "Elígela cuando importen más el ritmo estable y la respuesta lateral posterior que las bajas en línea.",
          "You give up Ignite's immediate duel pressure; mid quest rewards are not a free Teleport.",
          "Renuncias a la presión inmediata de duelo de Ignite; la misión de medio no otorga Teleportar gratuito.",
        ),
      ),
    ],
    sources(),
    {
      Ahri: txt(
        "Charm creates a pick window; choose between pressure with Ignite and map tempo with Teleport.",
        "Encanto crea una oportunidad de selección; decide entre presión con Ignite y ritmo de mapa con Teleportar.",
      ),
      Syndra: txt(
        "Long-range burst and control reward reliable spell setup; the rune choice is poke versus opening-combo gold pressure.",
        "El daño explosivo y control a distancia premian una preparación fiable; las runas distinguen hostigamiento y presión económica de combo inicial.",
      ),
      Orianna: txt(
        "Repeated range control and teamfight utility make safe mana use and positioning central.",
        "El control de alcance repetido y la utilidad en peleas hacen centrales el uso seguro de maná y la posición.",
      ),
      Viktor: txt(
        "A scaling control mage benefits from lane stability and repeated spell uptime; do not assume a guaranteed early kill.",
        "Una maga de control que escala se beneficia de estabilidad en línea y lanzamientos repetidos; no presupone una baja temprana.",
      ),
      Lux: txt(
        "Range and binding setup favor poke; her support-role economy is a different profile.",
        "El alcance y la inmovilización favorecen el hostigamiento; su economía de soporte usa otro perfil.",
      ),
    },
  ),

  prof(
    "akali-mid",
    ["Akali"],
    ["MIDDLE"],
    "Akali: AP melee pick",
    "Akali: selección AP cuerpo a cuerpo",
    [
      rune(
        "akali-electro",
        "Short burst and exit",
        "Daño explosivo breve y salida",
        8100,
        [8112, 8139, 8137, 8106],
        8400,
        [8444, 8453],
        [5008, 5008, 5013],
        reason(
          "Electrocute supports a compact AP trade after Akali reaches a target; Resolve helps her survive the return damage.",
          "Electrocutar apoya un intercambio AP compacto tras alcanzar al objetivo; Valor ayuda a resistir el daño de respuesta.",
          "Choose for short trades and picks rather than a prolonged front-to-back fight.",
          "Elígela para intercambios breves y selecciones, no para peleas prolongadas de frente.",
          "It needs access and a clean exit; repeated disengage reduces its value.",
          "Necesita acceso y una salida limpia; retiradas repetidas reducen su valor.",
        ),
      ),
      rune(
        "akali-conq",
        "Extended skirmish",
        "Escaramuza prolongada",
        8000,
        [8010, 9111, 9105, 8299],
        8400,
        [8444, 8453],
        [5008, 5008, 5013],
        reason(
          "Conqueror supports repeated ability and attack contact when Akali must remain in a fight.",
          "Conquistador apoya contacto repetido de habilidades y ataques cuando Akali debe permanecer en la pelea.",
          "Choose when the enemy team has durable targets and you can safely extend combat.",
          "Elígela ante objetivos resistentes y si puedes prolongar el combate con seguridad.",
          "It is weaker in a quick pick and requires repeated contact.",
          "Es más débil en una selección rápida y requiere contacto repetido.",
        ),
      ),
    ],
    [
      whyItem(
        "1056",
        "Doran's Ring gives AP and health for solo-lane spell trades; its mana effect is not the reason to choose it on Akali.",
        "Sortija de Doran da poder de habilidad y vida para intercambios con hechizos; el maná no es el motivo para elegirla con Akali.",
        "Choose for a standard AP lane opening.",
        "Elígela para una apertura estándar de línea AP.",
        "It offers less durability than Doran's Shield.",
        "Ofrece menos resistencia que Escudo de Doran.",
      ),
    ],
    [
      whyItem(
        "4633",
        "Riftmaker's health and sustained-combat effect suit an AP melee skirmisher.",
        "La vida y efecto de combate sostenido de Agrietador encajan con una luchadora AP cuerpo a cuerpo.",
        "Candidate core when you expect repeated contact rather than only one burst window.",
        "Posible núcleo si esperas contacto repetido y no solo una ventana explosiva.",
        "It offers less immediate burst than a dedicated burst purchase.",
        "Aporta menos daño explosivo inmediato que una compra dedicada a burst.",
      ),
      whyItem(
        "3089",
        "Rabadon's amplifies an AP inventory for a later burst spike.",
        "Rabadon amplifica el inventario AP para un pico explosivo posterior.",
        "Consider after core AP purchases when the team can protect your approach.",
        "Considéralo tras compras AP centrales cuando el equipo pueda proteger tu acercamiento.",
        "It is expensive and provides no defensive margin.",
        "Es costoso y no brinda margen defensivo.",
      ),
    ],
    [
      whyItem(
        "3020",
        "Magic penetration supports Akali's AP damage.",
        "La penetración mágica apoya el daño AP de Akali.",
        "Choose for an offensive plan when you can safely reach targets.",
        "Elígelas para un plan ofensivo si puedes alcanzar objetivos con seguridad.",
        "Less defense than resistance boots.",
        "Menos defensa que botas de resistencia.",
      ),
      whyItem(
        "3111",
        "Magic resistance and tenacity help against magic threat and eligible crowd control.",
        "Resistencia mágica y tenacidad ayudan ante amenaza mágica y control elegible.",
        "Choose when those threats prevent a safe entry.",
        "Elígelas si esas amenazas impiden una entrada segura.",
        "Tenacity does not remove suppression or airborne effects.",
        "La tenacidad no elimina supresiones ni efectos por el aire.",
      ),
    ],
    [
      whyItem(
        "3157",
        "Stasis can buy time after Akali commits to a dive and draws enemy focus.",
        "Estasis puede dar tiempo tras comprometerse Akali en una entrada y atraer el foco rival.",
        "Choose when a specific dive threat repeatedly reaches you.",
        "Elígelo si una amenaza concreta te alcanza repetidamente.",
        "It delays damage and does not fix a poor entry angle.",
        "Retrasa daño y no arregla un mal ángulo de entrada.",
      ),
      whyItem(
        "3102",
        "Banshee's Veil adds AP and magic resistance, and its ready spell shield can block one incoming ability before it hits Akali.",
        "Velo de la Banshee añade poder de habilidad y resistencia mágica; su escudo de hechizos disponible puede bloquear una habilidad antes de que alcance a Akali.",
        "Choose when AP or magic-burst threats repeatedly force Akali out before she can complete an entry; keep the shield intact for the key spell.",
        "Elígelo cuando amenazas AP o burst mágico obliguen repetidamente a Akali a salir antes de completar una entrada; conserva el escudo para el hechizo clave.",
        "It blocks one spell only while the shield is ready and does not cleanse applied effects; sustained magic damage can consume it early.",
        "Bloquea un solo hechizo cuando el escudo está disponible y no limpia efectos ya aplicados; el daño mágico sostenido puede consumirlo antes.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerDot"],
        reason(
          "Flash adjusts Akali's entry or exit; Ignite adds pressure to a short AP trade.",
          "Destello ajusta entrada o salida de Akali; Ignite añade presión a un intercambio AP breve.",
          "Choose when lane kill pressure matters more than map tempo.",
          "Elígela si la presión de eliminación importa más que el ritmo de mapa.",
          "You give up Teleport's wave recovery and map response.",
          "Renuncias a recuperar oleadas y responder en mapa con Teleportar.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerTeleport"],
        reason(
          "Teleport supports wave recovery and map movement while Flash preserves a direct reposition.",
          "Teleportar apoya recuperar oleadas y rotar mientras Destello conserva reposición directa.",
          "Choose for stable lane tempo and side-lane access.",
          "Elígela para ritmo estable y acceso lateral.",
          "You give up Ignite's direct lane pressure; middle quest does not grant free Teleport.",
          "Renuncias a la presión directa de Ignite; la misión de medio no otorga Teleportar gratuito.",
        ),
      ),
    ],
    sources(),
    {
      Akali: txt(
        "Akali deals AP damage and uses energy; she is not part of the AD assassin page or a mana-dependent mage setup.",
        "Akali inflige daño AP y usa energía; no pertenece a la página de asesino físico ni a una configuración de maga dependiente de maná.",
      ),
    },
  ),

  prof(
    "assassin-mid",
    ["Zed", "Talon", "Qiyana"],
    ["MIDDLE"],
    "AD / melee pick and burst",
    "Selección y daño explosivo físico/cuerpo a cuerpo",
    [
      rune(
        "assassin-electro",
        "Short pick window",
        "Ventana breve de selección",
        8100,
        [8112, 8143, 8137, 8106],
        sorceryId(),
        [8275, 8210],
        [5008, 5008, 5013],
        reason(
          "Electrocute rewards a compact burst trade when the assassin can reach and mark one target; Nimbus Cloak adds movement after a summoner spell, while Transcendence supports cooldown uptime.",
          "Electrocutar recompensa un intercambio explosivo compacto cuando el asesino alcanza a un objetivo; Capa del Nimbo añade movimiento tras un hechizo de invocador y Trascendencia apoya la disponibilidad de habilidades.",
          "Choose for short trades and picks rather than extended front-to-back fights.",
          "Elígela para intercambios breves y selecciones, no para peleas largas de frente.",
          "It has less sustained combat value and can be difficult to trigger through range disadvantage.",
          "Aporta menos en combate sostenido y puede ser difícil de activar con desventaja de alcance.",
        ),
      ),
      rune(
        "assassin-first",
        "First contact burst",
        "Daño explosivo al primer contacto",
        8300,
        [8369, 8304, 8313, 8347],
        8100,
        [8139, 8106],
        [5008, 5008, 5013],
        reason(
          "First Strike rewards a clean opening combo when you can hit before taking damage.",
          "Primer golpe recompensa un combo inicial limpio si puedes golpear antes de recibir daño.",
          "Choose into lanes where stealth, range or mobility can protect the first contact.",
          "Elígela en líneas donde sigilo, alcance o movilidad protejan el primer contacto.",
          "It loses consistency when opponents poke first; Electrocute offers a more direct combat trigger.",
          "Pierde consistencia si el rival hostiga primero; Electrocutar ofrece un activador de combate más directo.",
        ),
      ),
    ],
    [
      whyItem(
        "1055",
        "Attack damage and lifesteal support last hits and trading for a melee assassin.",
        "Daño de ataque y robo de vida apoyan últimos golpes e intercambios para un asesino cuerpo a cuerpo.",
        "Choose when you can contest the wave; use the defensive alternative only for a difficult poke lane.",
        "Elígelo si puedes disputar la oleada; usa la alternativa defensiva ante hostigamiento difícil.",
        "Less health forgiveness than Doran's Shield.",
        "Menos margen de vida que Escudo de Doran.",
      ),
    ],
    [
      whyItem(
        "6692",
        "Eclipse supports repeated physical trades and adds a defensive proc to a melee approach.",
        "Eclipse apoya intercambios físicos repetidos y añade un efecto defensivo al acercamiento cuerpo a cuerpo.",
        "Candidate core when you expect to enter more than once rather than rely on one spell rotation.",
        "Posible núcleo si esperas entrar más de una vez en vez de depender de una rotación.",
        "It is less focused on pure lethality burst than a dedicated pick route.",
        "Se centra menos en daño explosivo de letalidad pura que una ruta dedicada a selección.",
      ),
      whyItem(
        "3071",
        "Health, haste and armor reduction support repeated physical spells against durable targets.",
        "Vida, aceleración y reducción de armadura apoyan hechizos físicos repetidos contra objetivos resistentes.",
        "Consider when your team can use armor reduction and fights last.",
        "Considérala si tu equipo puede aprovechar la reducción y las peleas duran.",
        "It is less direct burst into fragile targets.",
        "Es menos explosiva contra objetivos frágiles.",
      ),
    ],
    [
      whyItem(
        "3158",
        "Ability haste supports repeated mobility and damage spells.",
        "La aceleración de habilidad apoya hechizos repetidos de movilidad y daño.",
        "Choose for a spell-cycle plan.",
        "Elígelas para un plan de rotaciones de hechizos.",
        "Less armor or magic resistance than defensive boots.",
        "Menos armadura o resistencia mágica que botas defensivas.",
      ),
      whyItem(
        "3111",
        "Magic resistance and tenacity help against magic threat and eligible crowd control.",
        "La resistencia mágica y tenacidad ayudan contra amenaza mágica y control elegible.",
        "Choose when those threats prevent reaching a target.",
        "Elígelas si esas amenazas impiden alcanzar un objetivo.",
        "Tenacity does not remove suppression or airborne effects.",
        "La tenacidad no elimina supresiones ni efectos por el aire.",
      ),
    ],
    [
      whyItem(
        "3140",
        "Quicksilver Sash is an option for an eligible removable crowd-control or suppression effect.",
        "Fajín de Mercurio es una opción ante ciertos controles eliminables o supresiones.",
        "Buy on a component after a suppression such as Malzahar R or a stun/root repeatedly stops your entry; Quicksilver removes suppression and most removable control, but not airborne knock-ups or knockbacks.",
        "Cómpralo en componente si una supresión como R de Malzahar o un aturdimiento/inmovilización detiene tu entrada; Fajín elimina supresiones y la mayoría de controles eliminables, pero no derribos ni desplazamientos por el aire.",
        "It costs damage tempo and does not remove airborne effects.",
        "Cuesta ritmo de daño y no elimina efectos por el aire.",
      ),
      whyItem(
        "3156",
        "A magic shield can protect an assassin against concentrated magic burst.",
        "Un escudo mágico puede proteger al asesino del daño mágico concentrado.",
        "Choose if magic burst is the recurring reason you cannot complete a pick.",
        "Elígelo si el daño mágico explosivo te impide completar una selección repetidamente.",
        "Lifeline competes with Sterak and Shieldbow.",
        "Salvavidas compite con Sterak y Arcoescudo.",
      ),
      whyItem(
        "3036",
        "Percent armor penetration helps against armored targets that survive the first combo.",
        "La penetración porcentual de armadura ayuda contra objetivos acorazados que sobreviven al primer combo.",
        "Buy when armor, not only health, is blunting your physical damage.",
        "Cómpralo cuando la armadura, y no solo la vida, reduzca tu daño físico.",
        "It delays lethality/haste and cannot be combined with Mortal Reminder for percent penetration.",
        "Retrasa letalidad/aceleración y no se combina con Recordatorio Mortal para penetración porcentual.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerDot"],
        reason(
          "Flash adjusts entry or exit; Ignite adds pressure to a short-range all-in.",
          "Destello ajusta la entrada o salida; Ignite añade presión a un all-in de corto alcance.",
          "Choose when lane access and kill pressure are central.",
          "Elígela cuando el acceso a línea y presión de eliminación sean centrales.",
          "You give up Teleport's map flexibility and can be punished for a failed commit.",
          "Renuncias a la flexibilidad de Teleportar y un compromiso fallido puede castigarte.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerTeleport"],
        reason(
          "Teleport supports wave recovery and side-lane access while Flash preserves a direct reposition.",
          "Teleportar apoya la recuperación de oleadas y acceso lateral mientras Destello conserva reposicionamiento directo.",
          "Choose when lane stability and map play matter more than the Ignite all-in.",
          "Elígela cuando estabilidad de línea y mapa importen más que el all-in de Ignite.",
          "It gives less direct kill pressure and mid quest does not grant free Teleport.",
          "Da menos presión de eliminación y la misión de medio no otorga Teleportar gratuito.",
        ),
      ),
    ],
    sources(),
  ),
  prof(
    "adc-crit",
    ["Jinx", "Ashe", "MissFortune", "Jhin"],
    ["BOTTOM"],
    "Ranged carry: crit, utility and attack pattern",
    "Carry a distancia: crítico, utilidad y patrón de ataque",
    [
      rune(
        "adc-pta",
        "Lane trades and focused target",
        "Intercambios de línea y objetivo enfocado",
        8000,
        [8005, 9111, 9104, 8014],
        8400,
        [8444, 8453],
        [5005, 5008, 5013],
        reason(
          "Press the Attack supports focused early trades while attack speed helps most of this group's ranged attack patterns.",
          "Ataque intensificado apoya intercambios tempranos enfocados y la velocidad de ataque ayuda al patrón a distancia de la mayoría del grupo.",
          "Choose when you can safely follow up on lane trades and attack the same target.",
          "Elígela si puedes continuar intercambios de línea con seguridad y atacar al mismo objetivo.",
          "It is less defensive than Fleet Footwork and less reliable if you cannot keep attacking.",
          "Es menos defensiva que Juego de pies y menos fiable si no puedes seguir atacando.",
        ),
      ),
      rune(
        "adc-fleet",
        "Safer lane and reposition",
        "Línea segura y reposicionamiento",
        8000,
        [8021, 9111, 9104, 8014],
        8400,
        [8444, 8453],
        [5005, 5008, 5013],
        reason(
          "Fleet offers a heal and movement to help a fragile ranged carry manage lane poke and reposition.",
          "Juego de pies ofrece curación y movimiento para que un carry frágil gestione hostigamiento y reposición.",
          "Choose when lane survival or avoiding a dangerous engage matters more than early all-in damage.",
          "Elígela cuando sobrevivir a la línea o evitar una iniciación peligrosa importe más que el daño de all-in temprano.",
          "It gives up Press the Attack's focused-target trade payoff.",
          "Renuncia al valor de Ataque intensificado contra un objetivo enfocado.",
        ),
      ),
    ],
    [
      whyItem(
        "1086",
        "Doran's Bow is an attack-focused current start for a ranged carry who wants to contest early waves.",
        "Arco de Doran es un inicio ofensivo actual para un carry a distancia que quiera disputar oleadas tempranas.",
        "Choose when the lane allows basic-attack trades and early wave control.",
        "Elígelo si la línea permite intercambios con ataques y control temprano de oleada.",
        "It has less raw health cushion than Doran's Shield.",
        "Tiene menos margen de vida que Escudo de Doran.",
      ),
      whyItem(
        "1120",
        "Doran's Helm combines health with armor and magic resistance for a mixed-threat lane.",
        "Casco de Doran combina vida con armadura y resistencia mágica ante amenazas mixtas en línea.",
        "Choose when the lane's physical and magic damage mix makes its defenses useful.",
        "Elígelo cuando la mezcla de daño físico y mágico de la línea haga útiles sus defensas.",
        "It gives up Doran's Bow's attack speed and omnivamp; inspect its current stats before choosing.",
        "Renuncia a velocidad de ataque y omnivamp de Arco de Doran; revisa sus estadísticas actuales antes de elegir.",
      ),
    ],
    [
      whyItem(
        "6672",
        "Attack damage and attack-speed-oriented damage support repeated ranged attacks.",
        "Daño de ataque y daño orientado a velocidad de ataque apoyan ataques a distancia repetidos.",
        "A candidate first core for a carry whose kit rewards sustained attacks.",
        "Posible primer núcleo para un carry cuyo kit recompensa ataques sostenidos.",
        "It is not a universal first buy for every champion in this group; Jhin and Miss Fortune have different attack patterns.",
        "No es una primera compra universal para todos; Jhin y Miss Fortune tienen otros patrones de ataque.",
      ),
      whyItem(
        "3031",
        "Infinity Edge supports a developed crit-oriented attack route.",
        "Filo del Infinito apoya una ruta de ataques centrada en crítico ya desarrollada.",
        "Consider once the build's crit pattern makes its damage amplification relevant.",
        "Considéralo cuando el patrón de crítico de la configuración haga relevante su amplificación.",
        "It costs a large amount of gold and offers little defense or utility.",
        "Cuesta mucho oro y ofrece poca defensa o utilidad.",
      ),
    ],
    [
      whyItem(
        "3006",
        "Attack speed supports repeated attacks and damage uptime.",
        "La velocidad de ataque apoya ataques repetidos y continuidad de daño.",
        "Choose when you can safely attack and want offensive throughput.",
        "Elígelas si puedes atacar con seguridad y quieres continuidad ofensiva.",
        "They do little to protect from dive or crowd control.",
        "Protegen poco contra entradas o control de masas.",
      ),
      whyItem(
        "3047",
        "Armor and attack mitigation help against physical dive and attack threats.",
        "La armadura y mitigación de ataques ayudan contra amenazas de entrada y ataques físicos.",
        "Choose when physical damage is preventing you from dealing damage.",
        "Elígelas cuando el daño físico te impida causar daño.",
        "They give up attack speed and do not stop spell crowd control.",
        "Renuncian a velocidad de ataque y no detienen el control de hechizos.",
      ),
    ],
    [
      whyItem(
        "3033",
        "Healing reduction can help when substantial healing is changing fights and the carry can apply physical damage.",
        "La reducción de curación ayuda si una curación sustancial cambia peleas y el carry puede aplicar daño físico.",
        "Buy only when healing is a real obstacle; this and Lord Dominik's Regards are alternatives for percent penetration.",
        "Cómpralo solo si la curación es un obstáculo real; este y Recuerdos de Lord Dominik son alternativas de penetración porcentual.",
        "It delays attack speed or defense; don't buy it for incidental healing.",
        "Retrasa velocidad de ataque o defensa; no lo compres por curación incidental.",
      ),
      whyItem(
        "3036",
        "Percent armor penetration supports physical damage into armored targets.",
        "La penetración porcentual de armadura apoya el daño físico contra objetivos acorazados.",
        "Choose when armor meaningfully reduces your damage.",
        "Elígelo cuando la armadura reduzca tu daño de forma importante.",
        "It is mutually exclusive with Mortal Reminder for percent-penetration needs.",
        "Es incompatible con Recordatorio Mortal para necesidades de penetración porcentual.",
      ),
      whyItem(
        "3156",
        "A magic shield can protect a carry from burst that otherwise prevents attacking.",
        "Un escudo mágico puede proteger al carry de daño explosivo que le impida atacar.",
        "Buy if enemy magic burst is repeatedly the reason you cannot stay in range.",
        "Cómpralo si el daño mágico explosivo rival te impide mantener el alcance repetidamente.",
        "Lifeline competes with Sterak and Shieldbow; this choice delays damage.",
        "Salvavidas compite con Sterak y Arcoescudo; esta opción retrasa daño.",
      ),
      whyItem(
        "6673",
        "Immortal Shieldbow offers a Lifeline option for a carry facing burst.",
        "Arcoescudo Inmortal ofrece Salvavidas para un carry frente a daño explosivo.",
        "Consider when a shield helps you continue attacking through a physical burst window.",
        "Considéralo si un escudo te ayuda a seguir atacando durante daño físico explosivo.",
        "Its Lifeline conflicts with Maw and Sterak; choose one defensive Lifeline item.",
        "Su Salvavidas compite con Fauces y Sterak; elige un solo objeto defensivo Salvavidas.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerHeal"],
        reason(
          "Flash protects against or corrects a dive; Heal offers movement and protection to you and a nearby ally.",
          "Destello protege o corrige una entrada; Curar ofrece movimiento y protección a ti y a un aliado cercano.",
          "Choose for the broad duo-lane safety option.",
          "Elígela como opción amplia de seguridad en dúo.",
          "Heal is less focused on one diver's damage than Exhaust and does not remove crowd control.",
          "Curar se centra menos en el daño de un atacante que Extenuación y no elimina control.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerExhaust"],
        reason(
          "Flash preserves repositioning; Exhaust reduces one reachable threat's damage and movement.",
          "Destello conserva reposición; Extenuación reduce daño y movimiento de una amenaza alcanzable.",
          "Choose when an assassin or diver is the main threat and your team can protect other allies.",
          "Elígela si un asesino o iniciador es la amenaza principal y el equipo puede proteger a los demás.",
          "You give up Heal's nearby ally recovery and movement boost.",
          "Renuncias a la recuperación y aceleración para un aliado cercano de Curar.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerBoost"],
        reason(
          "Cleanse removes eligible stuns and roots such as Ashe's arrow stun after it hits, while Flash remains the reposition option.",
          "Purificación elimina aturdimientos e inmovilizaciones elegibles, como el aturdimiento de la flecha de Ashe tras impactar; Destello conserva la reposición.",
          "Choose when a removable stun or root repeatedly decides your fights and spacing alone cannot prevent it.",
          "Elígela cuando un aturdimiento o inmovilización eliminable decida peleas repetidamente y el espaciado no baste para evitarlo.",
          "Cleanse does not remove suppression or airborne effects, and you give up Heal's protection and movement for your nearby ally.",
          "Purificación no elimina supresiones ni efectos por el aire, y renuncias a la protección y movimiento de Curar para tu aliado cercano.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerBarrier"],
        reason(
          "Barrier gives the carry a personal shield to survive a burst window while Flash preserves a reposition.",
          "Barrera da al carry un escudo personal para sobrevivir una ventana explosiva y Destello conserva la reposición.",
          "Choose when self-burst is the main threat and surviving it matters more than Heal's nearby duo-lane protection.",
          "Elígela cuando el burst personal sea la amenaza principal y sobrevivirlo importe más que la protección de Curar para la pareja cercana.",
          "It protects only you, does not remove crowd control, and gives up Heal's nearby ally recovery and movement.",
          "Solo te protege a ti, no elimina control y renuncia a la recuperación y movimiento de Curar para un aliado cercano.",
        ),
      ),
    ],
    sources(),
    {
      Jinx: txt(
        "Repeated attacks and range scaling reward protected uptime; select defensive spells when divers can reach her.",
        "Los ataques repetidos y el alcance creciente premian continuidad protegida; elige hechizos defensivos si pueden alcanzarla.",
      ),
      Ashe: txt(
        "Utility slows and initiation make positioning and team follow-up central; do not equate her plan with Jinx's attack-speed scaling.",
        "Las ralentizaciones y la iniciación de Ashe hacen centrales la posición y el seguimiento del equipo; su plan no es el escalado de velocidad de ataque de Jinx.",
      ),
      MissFortune: txt(
        "Lane pressure and channelled ultimate windows reward setup; avoid treating an attack-speed core as automatic.",
        "La presión de línea y ventanas de definitiva canalizada premian la preparación; no des por automático un núcleo de velocidad de ataque.",
      ),
      Jhin: txt(
        "Reload timing and crit conversion make attack speed a different stat for Jhin; his item order needs separate matchup review.",
        "La recarga y conversión de crítico hacen que la velocidad de ataque funcione distinto en Jhin; su orden de objetos requiere revisión propia.",
      ),
    },
  ),

  prof(
    "adc-onhit",
    ["KogMaw"],
    ["BOTTOM"],
    "On-hit and repeated-attack carry",
    "Carry de impactos y ataques repetidos",
    [
      rune(
        "onhit-pta",
        "Focused repeated attacks",
        "Ataques repetidos enfocados",
        8000,
        [8005, 9111, 9104, 8014],
        8400,
        [8444, 8453],
        [5005, 5008, 5013],
        reason(
          "Press the Attack supports repeated attacks focused on one target; the attack-speed shard helps reach those hits.",
          "Ataque intensificado apoya ataques repetidos contra un objetivo; el fragmento de velocidad de ataque ayuda a conectar esos golpes.",
          "Choose when the lane and team can protect your sustained attack window.",
          "Elígela cuando la línea y el equipo puedan proteger tu ventana de ataques sostenidos.",
          "It has less safety than Fleet and requires you to attack the same target.",
          "Es menos segura que Juego de pies y requiere atacar al mismo objetivo.",
        ),
      ),
      rune(
        "onhit-fleet",
        "Survive and scale",
        "Sobrevivir y escalar",
        8000,
        [8021, 9111, 9104, 8014],
        8400,
        [8444, 8453],
        [5005, 5008, 5013],
        reason(
          "Fleet adds a small sustain and movement option for a low-mobility ranged carry.",
          "Juego de pies añade sustain y movimiento para un carry a distancia con poca movilidad.",
          "Choose into poke or dive lanes where reaching a safe attack window is the challenge.",
          "Elígela ante hostigamiento o entradas cuando el reto sea alcanzar una ventana segura de ataque.",
          "You give up Press the Attack's focused damage and need time to scale.",
          "Renuncias al daño enfocado de Ataque intensificado y necesitas tiempo para escalar.",
        ),
      ),
    ],
    [
      whyItem(
        "1086",
        "Doran's Bow is an offensive start for ranged attack trades.",
        "Arco de Doran es un inicio ofensivo para intercambios de ataques a distancia.",
        "Use when lane pressure allows attacks on the wave and opponent.",
        "Úsalo si la presión permite atacar la oleada y al rival.",
        "Less forgiving than a defensive health start.",
        "Perdona menos que un inicio defensivo con vida.",
      ),
    ],
    [
      whyItem(
        "3124",
        "Guinsoo's Rageblade supports an on-hit route for champions whose repeated attacks apply kit effects.",
        "Espadafuria de Guinsoo apoya una ruta de impactos para campeones cuyos ataques repetidos aplican efectos del kit.",
        "Candidate core for Kog'Maw or Vayne when repeated attacks are the damage plan.",
        "Posible núcleo para Kog'Maw o Vayne cuando los ataques repetidos sean el plan de daño.",
        "It is not the same route as a crit carry; assess enemy range and protection.",
        "No es la misma ruta que un carry de crítico; evalúa el alcance y protección rival.",
      ),
      whyItem(
        "3085",
        "Runaan's Hurricane can spread attack effects and damage across clustered targets.",
        "Huracán de Runaan puede distribuir efectos y daño de ataques entre objetivos agrupados.",
        "Consider when teamfights offer multiple reachable targets and current effects fit the champion.",
        "Considéralo si las peleas ofrecen varios objetivos alcanzables y los efectos actuales encajan con el campeón.",
        "It offers less single-target focus and should not be purchased automatically.",
        "Se centra menos en un objetivo y no debe comprarse automáticamente.",
      ),
    ],
    [
      whyItem(
        "3006",
        "Attack speed directly supports repeated-hit damage and kiting rhythm.",
        "La velocidad de ataque apoya directamente el daño de impactos y ritmo de kiteo.",
        "Choose when you can stay at range.",
        "Elígelas si puedes mantener el alcance.",
        "Less defense than resistance boots.",
        "Menos defensa que botas de resistencia.",
      ),
      whyItem(
        "3047",
        "Armor can buy space against physical divers.",
        "La armadura puede ganar espacio contra iniciadores físicos.",
        "Choose when physical damage is the reason your attack uptime is low.",
        "Elígelas si el daño físico reduce tu continuidad de ataque.",
        "They do not add attack speed.",
        "No añaden velocidad de ataque.",
      ),
    ],
    [
      whyItem(
        "3036",
        "Percent armor penetration supports physical damage against armored targets.",
        "La penetración porcentual apoya daño físico contra objetivos acorazados.",
        "Buy when armor is limiting your sustained damage.",
        "Cómpralo si la armadura limita tu daño sostenido.",
        "It competes with Mortal Reminder for percent penetration and delays on-hit speed.",
        "Compite con Recordatorio Mortal por penetración porcentual y retrasa velocidad de impactos.",
      ),
      whyItem(
        "3156",
        "A magic shield can prevent burst from ending your attack window.",
        "Un escudo mágico puede evitar que el daño explosivo termine tu ventana de ataques.",
        "Buy against concentrated magic threat.",
        "Cómpralo ante amenaza mágica concentrada.",
        "Lifeline competes with Sterak and Shieldbow.",
        "Salvavidas compite con Sterak y Arcoescudo.",
      ),
      whyItem(
        "6673",
        "A Lifeline shield may preserve a physical carry through a burst window.",
        "Un escudo Salvavidas puede mantener al carry físico durante daño explosivo.",
        "Choose if the shield is more useful than another damage item.",
        "Elígelo si el escudo aporta más que otro objeto de daño.",
        "Do not combine with Maw or Sterak Lifeline effects.",
        "No lo combines con Salvavidas de Fauces o Sterak.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerHeal"],
        reason(
          "Flash is an emergency reposition and Heal supports both nearby duo-lane allies.",
          "Destello es reposición de emergencia y Curar apoya a ambos aliados cercanos de la línea dúo.",
          "Choose when there is no specific enemy threat that calls for another defensive answer.",
          "Elígela si no hay una amenaza específica que requiera otra defensa.",
          "Heal does not stop crowd control or reduce a diver's damage like Exhaust.",
          "Curar no detiene control ni reduce el daño del iniciador como Extenuación.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerExhaust"],
        reason(
          "Exhaust can blunt a reachable diver while Flash helps the carry reposition.",
          "Extenuación reduce el daño de un iniciador alcanzable mientras Destello ayuda al carry a reposicionarse.",
          "Choose against a single diver or assassin who can threaten your attack window.",
          "Elígela ante un iniciador o asesino que amenace tu ventana de ataques.",
          "You give up Heal's duo-lane movement and recovery.",
          "Renuncias a movimiento y recuperación de dúo de Curar.",
        ),
      ),
    ],
    sources(),
    {
      KogMaw: txt(
        "Mixed damage and long-range repeated attacks support on-hit items; survival and peel determine whether the plan can function.",
        "El daño mixto y ataques repetidos de largo alcance apoyan impactos; la supervivencia y protección determinan si funciona.",
      ),
      Vayne: txt(
        "Short range makes access and safe attack uptime the constraint; use defensive branches when divers can reach her.",
        "El corto alcance hace que el acceso y ataques seguros sean la limitación; usa ramas defensivas ante iniciadores que puedan alcanzarla.",
      ),
    },
  ),

  prof(
    "ezreal-bottom",
    ["Ezreal"],
    ["BOTTOM"],
    "Spell-weaving and skillshot carry",
    "Carry de hechizos y disparos de precisión",
    [
      rune(
        "ezreal-conq",
        "Repeated spell weaving",
        "Rotación repetida de hechizos",
        8000,
        [8010, 8009, 9105, 8014],
        8300,
        [8347, 8313],
        [5008, 5008, 5013],
        reason(
          "Conqueror and mana support repeated spell-and-attack weaving rather than a pure attack-speed pattern.",
          "Conquistador y maná apoyan hechizos y ataques intercalados, no un patrón puro de velocidad de ataque.",
          "Choose for extended fights where you can land repeated skillshots and attacks.",
          "Elígela para peleas largas donde aciertes disparos y ataques repetidos.",
          "It is less safe when enemies can force short trades before you stack value.",
          "Es menos segura si los rivales fuerzan intercambios breves antes de acumular valor.",
        ),
      ),
      rune(
        "ezreal-first",
        "Poke opening",
        "Apertura de hostigamiento",
        8300,
        [8369, 8304, 8313, 8347],
        8200,
        [8226, 8210],
        [5008, 5008, 5013],
        reason(
          "First Strike rewards a clean ranged hit before the enemy answers; mana and haste support continued poke.",
          "Primer golpe recompensa acertar a distancia antes de la respuesta rival; maná y aceleración sostienen el hostigamiento.",
          "Choose when you can repeatedly start poke exchanges and avoid being hit first.",
          "Elígela si puedes iniciar intercambios de hostigamiento y evitar recibir el primer golpe.",
          "It becomes unreliable against threats that consistently engage or poke first.",
          "Es poco fiable ante amenazas que inician u hostigan primero constantemente.",
        ),
      ),
    ],
    [
      whyItem(
        "1055",
        "Doran's Blade supports lane trades and sustain while Ezreal uses attacks between spells.",
        "Espada de Doran apoya intercambios y sustain mientras Ezreal intercala ataques entre hechizos.",
        "Choose for a lane where you can safely step up to attack.",
        "Elígela en una línea donde puedas avanzar a atacar con seguridad.",
        "Less mana support than a dedicated mana item and less health than Shield.",
        "Menos apoyo de maná que un objeto dedicado y menos vida que Escudo.",
      ),
    ],
    [
      whyItem(
        "3078",
        "Trinity Force supports spell weaving with health and attack stats.",
        "Fuerza de la Trinidad apoya hechizos intercalados con vida y estadísticas de ataque.",
        "A candidate core for a repeated ability-and-attack pattern.",
        "Posible núcleo para un patrón de habilidades y ataques repetidos.",
        "It is one build branch; don't stack it with a second spellblade item without verifying current rules.",
        "Es una rama; no la combines con otro objeto de Hoja encantada sin verificar reglas actuales.",
      ),
      whyItem(
        "3161",
        "Spear of Shojin provides attack damage, health and haste for repeated ability casts.",
        "Lanza de Shojin ofrece daño, vida y aceleración para lanzar habilidades repetidamente.",
        "Consider when repeated ability use matters more than attack-speed stacking.",
        "Considérala cuando importen más las habilidades repetidas que acumular velocidad de ataque.",
        "It delays defenses or specialized penetration.",
        "Retrasa defensas o penetración especializada.",
      ),
    ],
    [
      whyItem(
        "3158",
        "Ability haste supports more spell casts and mobility through the lane.",
        "La aceleración apoya más lanzamientos y movilidad en línea.",
        "Choose for the spell-cycle plan.",
        "Elígelas para un plan de rotación de hechizos.",
        "Less magic penetration than Sorcerer's Shoes.",
        "Menos penetración mágica que Botas del Hechicero.",
      ),
      whyItem(
        "3047",
        "Armor and attack mitigation help against physical engage.",
        "Armadura y mitigación de ataques ayudan contra iniciación física.",
        "Choose when repeated physical threat prevents safe spell-weaving.",
        "Elígelas si la amenaza física repetida impide intercalar hechizos con seguridad.",
        "They reduce offensive spell tempo.",
        "Reducen ritmo ofensivo de hechizos.",
      ),
    ],
    [
      whyItem(
        "3036",
        "Percent armor penetration can help physical damage into armor-heavy frontlines.",
        "La penetración porcentual ayuda al daño físico contra primeras líneas con mucha armadura.",
        "Buy when armor, not just health, is limiting repeated hits.",
        "Cómpralo cuando la armadura, y no solo vida, limite impactos repetidos.",
        "It competes with Mortal Reminder for percent penetration.",
        "Compite con Recordatorio Mortal por penetración porcentual.",
      ),
      whyItem(
        "3140",
        "Quicksilver Sash can answer a specific eligible CC or suppression that repeatedly catches Ezreal.",
        "Fajín puede responder a un control elegible o supresión concreta que atrape repetidamente a Ezreal.",
        "Only buy when the removable effect is decisive; verify its current behavior.",
        "Cómpralo solo si el efecto eliminable es decisivo; confirma su funcionamiento actual.",
        "It delays damage and does not remove airborne effects.",
        "Retrasa daño y no elimina efectos por el aire.",
      ),
      whyItem(
        "3156",
        "A magic shield can protect the spell-weaver from concentrated magic burst.",
        "Un escudo mágico protege al lanzador de daño mágico concentrado.",
        "Choose if magic burst is the reason you cannot keep casting from range.",
        "Elígelo si el daño mágico explosivo te impide lanzar desde distancia.",
        "Lifeline conflicts with Sterak and Shieldbow.",
        "Salvavidas compite con Sterak y Arcoescudo.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerHeal"],
        reason(
          "Flash preserves repositioning for skillshots; Heal helps both nearby allies survive and move in duo lane.",
          "Destello conserva reposición para disparos; Curar ayuda a ambos aliados cercanos a sobrevivir y moverse en dúo.",
          "Choose as the broad lane safety option.",
          "Elígela como opción amplia de seguridad en línea.",
          "Heal does not replace spacing or remove crowd control.",
          "Curar no sustituye el espaciado ni elimina control.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerTeleport"],
        reason(
          "Teleport supports wave recovery and side-lane map access while Flash keeps a direct escape.",
          "Teleportar apoya la recuperación de oleadas y acceso lateral mientras Destello conserva escape directo.",
          "Choose when wave tempo and map rotations matter more than Heal's duo-lane protection.",
          "Elígela cuando importen más oleadas y rotaciones que la protección de Curar en dúo.",
          "You give up Heal's nearby ally protection and movement.",
          "Renuncias a protección y movimiento para un aliado cercano de Curar.",
        ),
      ),
    ],
    sources(),
    {
      Ezreal: txt(
        "Ezreal is a mana-using spell-weaver; his ability-haste and skillshot plan differs from crit and on-hit carries.",
        "Ezreal intercala hechizos y depende del maná; su plan de aceleración y disparos difiere de los carries de crítico e impactos.",
      ),
    },
  ),

  prof(
    "ap-jg-ivern",
    ["Ivern"],
    ["JUNGLE"],
    "Ally-enabling utility jungle",
    "Jungla de utilidad que potencia aliados",
    [
      rune(
        "ivern-aery",
        "Shield and ally support",
        "Escudo y apoyo a aliados",
        8200,
        [8214, 8226, 8210, 8232],
        8400,
        [8463, 8453],
        [5007, 5008, 5013],
        reason(
          "Aery adds a shield when Ivern casts E on an ally, and repeated shield or damage cycles support its utility; Manaflow and Transcendence support spell uptime.",
          "Aery añade un escudo cuando Ivern lanza E sobre un aliado, y los ciclos repetidos de escudo o daño apoyan su utilidad; Banda de maná y Trascendencia ayudan a mantener habilidades.",
          "Choose when repeated E shields and ally protection matter more than personal durability against burst.",
          "Elígela cuando importen más los escudos repetidos de E y proteger aliados que resistir burst personalmente.",
          "It gives less immediate damage than Comet and does not add a defensive keystone for allies caught by a burst engage.",
          "Aporta menos daño inmediato que Cometa y no añade una clave defensiva para aliados atrapados en una iniciación explosiva.",
        ),
      ),
      rune(
        "ivern-comet",
        "Guardian peel against burst",
        "Guardiana para proteger del burst",
        8400,
        [8465, 8463, 8444, 8453],
        8200,
        [8226, 8210],
        [5007, 5008, 5013],
        reason(
          "Guardian can shield Ivern and a nearby ally when he or they take champion damage; Resolve durability plus Manaflow and Transcendence support peel and repeated E cycles.",
          "Guardiana puede escudar a Ivern y a un aliado cercano cuando él o el aliado reciben daño de campeón; la resistencia de Valor y Banda de maná con Trascendencia apoyan la protección y ciclos repetidos de E.",
          "Choose into burst engage when shielding an ally through the first enemy combo matters more than Aery's repeatable E shield.",
          "Elígela contra iniciación explosiva cuando importe escudar a un aliado durante el primer combo rival más que el escudo repetido de E de Aery.",
          "It gives up Aery's direct E shield and has less value when allies stay spread or damage arrives in small repeated hits rather than a burst window.",
          "Renuncia al escudo directo de E de Aery y aporta menos si los aliados se dispersan o el daño llega en impactos pequeños en vez de una ventana explosiva.",
        ),
      ),
    ],
    [
      whyItem(
        "1103",
        "Mosstomper Seedling is the current role start for a standard Ivern jungle route.",
        "Retoño de Pisamusgo es el inicio de rol actual para una ruta estándar de jungla con Ivern.",
        "Keep Smite for jungle quest progress and objective play.",
        "Conserva Aplastar para avanzar la misión y jugar por objetivos.",
        "It is a quest start, not a substitute for support or combat items.",
        "Es un inicio de misión, no reemplaza objetos de apoyo o combate.",
      ),
    ],
    [
      whyItem(
        "3107",
        "Redemption adds teamfight healing and a ranged active that fits an ally-support plan.",
        "Redención añade curación en equipo y un activo a distancia acorde al apoyo de aliados.",
        "Consider after the jungle start when your team can group and use the active.",
        "Considérala tras el inicio de jungla cuando el equipo pueda agruparse y aprovechar el activo.",
        "It offers less personal damage and does not replace vision or positioning.",
        "Aporta menos daño personal y no reemplaza visión o posición.",
      ),
      whyItem(
        "6617",
        "Moonstone Renewer can amplify Ivern's repeated shield and healing interactions in longer fights.",
        "Renovador de Piedra Lunar puede amplificar escudos e interacciones de curación repetidas de Ivern en peleas largas.",
        "Consider when your team fights around a protected ally and can benefit from repeated healing or shields.",
        "Considéralo si el equipo pelea alrededor de un aliado protegido y aprovecha curaciones o escudos repetidos.",
        "It offers less direct active utility than Redemption and costs gold that may be needed for defenses.",
        "Aporta menos utilidad activa directa que Redención y cuesta oro que podría necesitarse para defensas.",
      ),
    ],
    [
      whyItem(
        "3158",
        "Ability haste supports repeated shields, slows and utility spells.",
        "La aceleración apoya escudos, ralentizaciones y hechizos de utilidad repetidos.",
        "Choose for ally support and spell uptime.",
        "Elígelas para apoyar aliados y mantener habilidades disponibles.",
        "Less defensive than resistance boots.",
        "Menos defensivas que botas de resistencia.",
      ),
      whyItem(
        "3111",
        "Magic resistance and tenacity can help survive magic damage and eligible control.",
        "Resistencia mágica y tenacidad ayudan a soportar daño mágico y control elegible.",
        "Choose when those threats limit your ability to reach allies.",
        "Elígelas si esas amenazas limitan llegar a tus aliados.",
        "Tenacity does not remove suppressions or airborne effects.",
        "La tenacidad no elimina supresiones ni efectos por el aire.",
      ),
    ],
    [
      whyItem(
        "3222",
        "Mikael's can cleanse eligible crowd control from an ally and add protection.",
        "Mikael puede limpiar control elegible de un aliado y añadir protección.",
        "Buy when a stun or root on a key ally decides a fight; Mikael removes eligible stuns and roots, but not suppression or airborne effects.",
        "Cómpralo si un aturdimiento o inmovilización sobre un aliado clave decide la pelea; Mikael elimina aturdimientos e inmovilizaciones elegibles, pero no supresiones ni efectos por el aire.",
        "It does not remove suppression or airborne effects and costs other team utility.",
        "No elimina supresiones ni efectos por el aire y ocupa el lugar de otra utilidad.",
      ),
      whyItem(
        "3157",
        "Stasis can protect Ivern if enemy focus reaches him while he protects an ally.",
        "Estasis puede proteger a Ivern si el foco enemigo lo alcanza mientras protege a un aliado.",
        "Choose when personal survival is the constraint.",
        "Elígelo si la supervivencia personal es la limitación.",
        "It offers less ally utility and can interrupt your own follow-up.",
        "Aporta menos utilidad aliada y puede interrumpir tu seguimiento.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerSmite"],
        reason(
          "Smite is required for standard jungle quest progress; Flash lets Ivern reposition to shield or leave danger.",
          "Aplastar es necesario para la misión estándar de jungla; Destello permite a Ivern reposicionarse para escudar o salir del peligro.",
          "Use for standard jungle support.",
          "Úsala en jungla de apoyo estándar.",
          "Do not replace Smite with a lane support spell.",
          "No reemplaces Aplastar por un hechizo de soporte de línea.",
        ),
      ),
      spell(
        ["SummonerHaste", "SummonerSmite"],
        reason(
          "Ghost can help rotate between allies and keep pace through fights while Smite stays mandatory.",
          "Fantasmal ayuda a rotar entre aliados y mantener el ritmo en peleas mientras Aplastar es obligatorio.",
          "Consider only when movement between allies is more valuable than Flash's instant reposition.",
          "Considérala solo si moverte entre aliados importa más que la reposición inmediata de Destello.",
          "You give up instant wall-crossing and emergency repositioning.",
          "Renuncias a cruzar muros y reposicionarte de emergencia al instante.",
        ),
      ),
    ],
    sources(),
    {
      Ivern: txt(
        "Ivern's jungle economy and ally-focused kit are distinct from a lane enchanter; Smite and the jungle companion remain role requirements.",
        "La economía de jungla y kit centrado en aliados de Ivern difieren de un encantador de línea; Aplastar y el compañero siguen siendo requisitos del rol.",
      ),
    },
  ),

  prof(
    "engage-support",
    ["Nautilus", "Leona", "Rell", "Thresh"],
    ["UTILITY"],
    "Engage and protect support",
    "Soporte de iniciación y protección",
    [
      R.tankAfter,
      rune(
        "support-guardian",
        "Protect the lane partner",
        "Proteger a tu compañero",
        8400,
        [8465, 8463, 8444, 8453],
        8300,
        [8313, 8347],
        [5007, 5001, 5013],
        reason(
          "Guardian adds a defensive response around allied champions; Resolve and Inspiration support lane survival and playmaking.",
          "Guardiana añade respuesta defensiva cerca de aliados; Valor e Inspiración apoyan supervivencia y jugadas.",
          "Choose when peel and protecting the carry matter more than your own engage durability.",
          "Elígela cuando proteger al carry importe más que tu resistencia al iniciar.",
          "It offers less personal durability when you must begin fights alone.",
          "Aporta menos resistencia personal cuando debas iniciar sin ayuda.",
        ),
      ),
    ],
    [
      whyItem(
        "3865",
        "World Atlas is the current support quest starter and provides the role's income progression.",
        "Mapamundi es el inicio actual de misión de soporte y proporciona progresión de ingresos del rol.",
        "Buy as the support starting item; its evolution is quest progression, not a manual core purchase.",
        "Cómpralo como inicio de soporte; su evolución es progresión de misión, no compra manual del núcleo.",
        "It does not provide the same lane combat stats as a carry start.",
        "No ofrece las mismas estadísticas de combate de línea que un inicio de carry.",
      ),
    ],
    [
      whyItem(
        "6610",
        "Sundered Sky is a combat-oriented branch for supports who can safely make champion contact.",
        "Cielo Desgarrado es una rama de combate para soportes que puedan contactar campeones con seguridad.",
        "Only consider when ahead and your team needs added physical skirmish pressure; utility/support upgrades may take priority.",
        "Considéralo solo con ventaja y si el equipo necesita presión física; las mejoras de utilidad pueden tener prioridad.",
        "It spends support income on personal damage and is not a default support core.",
        "Usa ingresos de soporte en daño personal; no es un núcleo predeterminado.",
      ),
      whyItem(
        "3071",
        "Black Cleaver can help allied physical damage against durable armor when you can apply repeated hits.",
        "Cuchilla Oscura puede ayudar al daño físico aliado contra armadura si puedes conectar repetidamente.",
        "Consider only with a physical-damage team and durable armored targets.",
        "Considérala solo con equipo de daño físico y objetivos resistentes con armadura.",
        "It is expensive for support income and competes with vision/utility purchases.",
        "Es costosa para ingresos de soporte y compite con visión y utilidad.",
      ),
    ],
    [
      whyItem(
        "3047",
        "Armor and attack mitigation can help an engage support survive physical carries.",
        "Armadura y mitigación de ataques ayudan al soporte iniciador a resistir carries físicos.",
        "Choose if physical damage is the main threat after entry.",
        "Elígelas si el daño físico es la amenaza principal tras entrar.",
        "They offer less magic resistance and tenacity.",
        "Aportan menos resistencia mágica y tenacidad.",
      ),
      whyItem(
        "3111",
        "Magic resistance and tenacity help when entering through eligible crowd control.",
        "Resistencia mágica y tenacidad ayudan al entrar frente a control elegible.",
        "Choose against magic pressure and reducible disables.",
        "Elígelas ante presión mágica y controles reducibles.",
        "Does not remove suppression or airborne effects.",
        "No elimina supresiones ni efectos por el aire.",
      ),
    ],
    [
      whyItem(
        "3222",
        "Mikael's can remove an eligible crowd-control effect from an ally.",
        "Mikael puede quitar un efecto de control elegible de un aliado.",
        "Buy when a removable stun or root on a key ally decides fights.",
        "Cómpralo si un aturdimiento o inmovilización eliminable sobre un aliado clave decide peleas.",
        "It cannot remove suppression or airborne effects.",
        "No elimina supresiones ni efectos por el aire.",
      ),
      whyItem(
        "3157",
        "Stasis can preserve you through the enemy response after a committed engage.",
        "Estasis puede protegerte de la respuesta enemiga tras una iniciación comprometida.",
        "Choose when you repeatedly die before follow-up arrives.",
        "Elígelo si mueres repetidamente antes de que llegue el seguimiento.",
        "It delays support utility and requires good timing.",
        "Retrasa utilidad de soporte y requiere buen momento.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerExhaust"],
        reason(
          "Flash enables or corrects engage; Exhaust reduces a diver's damage to protect your carry.",
          "Destello permite o corrige la iniciación; Extenuación reduce el daño de un iniciador para proteger al carry.",
          "Choose when peel after engage is likely to matter.",
          "Elígela si probablemente importe proteger tras iniciar.",
          "You give up Ignite's lane kill pressure.",
          "Renuncias a presión de eliminación en línea de Ignite.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerDot"],
        reason(
          "Flash preserves engage access; Ignite adds pressure when your lane can coordinate a short all-in.",
          "Destello conserva acceso para iniciar; Ignite añade presión si la línea coordina un all-in breve.",
          "Choose when the lane has a clear kill window and enemy healing matters only as a secondary condition.",
          "Elígela si hay una ventana clara de eliminación y la curación rival es una condición secundaria.",
          "You give up Exhaust's peel and do not gain a suppression answer.",
          "Renuncias a la protección de Extenuación y no obtienes respuesta a supresiones.",
        ),
      ),
    ],
    sources(),
    {
      Nautilus: txt(
        "Reliable hook and root access supports engage; protect the ally after entry rather than assuming damage is the support's main job.",
        "El acceso fiable con ancla e inmovilización apoya la iniciación; protege al aliado tras entrar en vez de asumir que el daño es la función principal.",
      ),
      Leona: txt(
        "A committed multi-control entry rewards durability and a clear follow-up plan.",
        "Una entrada comprometida con varios controles premia resistencia y seguimiento claro.",
      ),
      Rell: txt(
        "Area engage makes allied follow-up and surviving the response central.",
        "La iniciación de área hace centrales el seguimiento aliado y sobrevivir a la respuesta.",
      ),
      Thresh: txt(
        "Choose engage or Guardian according to whether your lane needs access or repeated protection; lantern changes ally access.",
        "Elige iniciación o Guardiana según la línea necesite acceso o protección repetida; la linterna cambia el acceso aliado.",
      ),
    },
  ),

  prof(
    "enchanter-support",
    ["Soraka", "Janna", "Lulu", "Milio"],
    ["UTILITY"],
    "Enchanter: sustain, shield and peel",
    "Encantador: sustain, escudo y protección",
    [
      rune(
        "enchant-aery",
        "Repeated ally protection",
        "Protección aliada repetida",
        8200,
        [8214, 8226, 8210, 8237],
        8400,
        [8463, 8453],
        [5007, 5008, 5013],
        reason(
          "Aery supports repeated shielding or healing interactions; Manaflow and haste help maintain casts.",
          "Aery apoya escudos o curación repetidos; Banda de maná y aceleración mantienen los lanzamientos.",
          "Choose when protecting an ally through repeated trades is your main job.",
          "Elígela cuando proteger a un aliado en intercambios repetidos sea tu función principal.",
          "It has less lane poke burst than Comet and depends on meaningful ally interaction.",
          "Tiene menos hostigamiento explosivo que Cometa y depende de interacción útil con aliados.",
        ),
      ),
      rune(
        "enchant-guardian",
        "Defensive lane partner",
        "Compañero de línea defensivo",
        8400,
        [8465, 8463, 8444, 8453],
        8200,
        [8226, 8210],
        [5007, 5001, 5013],
        reason(
          "Guardian is a defensive option when an ally is exposed to engage; Resolve adds lane protection.",
          "Guardiana es una opción defensiva si un aliado está expuesto a iniciación; Valor añade protección en línea.",
          "Choose into lanes where a single enemy engage threatens the carry.",
          "Elígela ante líneas donde una iniciación amenace al carry.",
          "It offers less repeated offensive poke and triggers around nearby allies.",
          "Aporta menos hostigamiento ofensivo y se activa alrededor de aliados cercanos.",
        ),
      ),
    ],
    [
      whyItem(
        "3865",
        "World Atlas begins support quest income progression.",
        "Mapamundi inicia la progresión de ingresos de la misión de soporte.",
        "Take as the support start and follow its quest progression.",
        "Tómalo como inicio de soporte y sigue su misión.",
        "It is not a carry combat starter.",
        "No es un inicio de combate de carry.",
      ),
    ],
    [
      whyItem(
        "3107",
        "Redemption provides team-wide healing utility at range.",
        "Redención proporciona curación de equipo a distancia.",
        "Consider when your team groups and you can time the active around a fight.",
        "Considérala cuando el equipo se agrupe y puedas coordinar el activo con una pelea.",
        "It offers less direct shielding or personal survival than alternatives.",
        "Ofrece menos escudo directo o supervivencia personal que otras opciones.",
      ),
      whyItem(
        "3222",
        "Mikael's Blessing provides targeted protection against a removable crowd-control effect.",
        "Bendición de Mikael brinda protección dirigida contra un efecto de control eliminable.",
        "Consider as a later support completion when one eligible CC threatens a key ally.",
        "Considérala como objeto posterior si un control elegible amenaza a un aliado clave.",
        "It is conditional and should not replace Redemption when team-wide healing is more valuable.",
        "Es condicional y no debe reemplazar Redención si vale más la curación de equipo.",
      ),
    ],
    [
      whyItem(
        "3158",
        "Ability haste supports repeated shields, heals and control spells.",
        "La aceleración apoya escudos, curaciones y control repetidos.",
        "Choose when repeated casts are central.",
        "Elígelas cuando los lanzamientos repetidos sean centrales.",
        "They give less resistance than defensive boots.",
        "Dan menos resistencia que botas defensivas.",
      ),
      whyItem(
        "3111",
        "Magic resistance and tenacity help against magic pressure and eligible crowd control.",
        "Resistencia mágica y tenacidad ayudan ante presión mágica y control elegible.",
        "Choose if you need to survive a magic threat to keep protecting allies.",
        "Elígelas si necesitas resistir amenaza mágica para seguir protegiendo aliados.",
        "Tenacity does not remove suppression or airborne effects.",
        "La tenacidad no elimina supresiones ni efectos por el aire.",
      ),
    ],
    [
      whyItem(
        "3222",
        "Mikael's can cleanse eligible crowd control from a teammate.",
        "Mikael puede limpiar control elegible de un compañero.",
        "Buy when a stun or root on a key ally decides a fight; Mikael removes eligible stuns and roots, but not suppression or airborne effects.",
        "Cómpralo si un aturdimiento o inmovilización sobre un aliado clave decide la pelea; Mikael elimina aturdimientos e inmovilizaciones elegibles, pero no supresiones ni efectos por el aire.",
        "It cannot remove suppression or airborne effects.",
        "No elimina supresiones ni efectos por el aire.",
      ),
      whyItem(
        "3157",
        "Stasis may preserve a focused enchanter long enough to continue helping the team.",
        "Estasis puede proteger al encantador enfocado para que siga ayudando al equipo.",
        "Choose when enemy dive repeatedly reaches you.",
        "Elígelo si la entrada rival te alcanza repetidamente.",
        "It delays team utility and requires timing.",
        "Retrasa utilidad de equipo y requiere buen momento.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerExhaust"],
        reason(
          "Flash helps evade engage; Exhaust reduces a reachable diver's threat to your carry.",
          "Destello ayuda a esquivar iniciaciones; Extenuación reduce la amenaza de un iniciador alcanzable para tu carry.",
          "Choose when enemy dive is the main danger to your lane partner.",
          "Elígela cuando la entrada rival sea el mayor peligro para tu compañero.",
          "You give up Heal's nearby ally recovery and Ignite's lane pressure.",
          "Renuncias a la recuperación cercana de Curar y la presión de Ignite.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerHeal"],
        reason(
          "Heal offers a movement burst and recovery to you and a nearby ally; Flash keeps an emergency escape.",
          "Curar ofrece movimiento y recuperación a ti y un aliado cercano; Destello conserva un escape.",
          "Choose when no single diver or removable crowd control calls for a targeted answer.",
          "Elígela si ningún iniciador o control eliminable requiere una respuesta concreta.",
          "Heal is not a cleanse and will not stop a follow-up engage.",
          "Curar no limpia control ni detiene una iniciación posterior.",
        ),
      ),
    ],
    sources(),
    {
      Soraka: txt(
        "Protecting allies and managing health costs matter more than personal tank items; do not treat her healing as proof to buy anti-heal.",
        "Proteger aliados y gestionar el coste de vida importa más que objetos de tanque; su curación no implica comprar anti-curación.",
      ),
      Janna: txt(
        "Peel and disengage are central; choose Exhaust when a diver threatens the carry, not for extra engage.",
        "La protección y retirada son centrales; elige Extenuación ante un iniciador que amenace al carry, no para iniciar.",
      ),
      Lulu: txt(
        "Polymorph, shields and ally buffs reward staying near the protected carry; avoid spending support income on personal damage by default.",
        "Polimorfia, escudos y mejoras premian permanecer cerca del carry; no gastes ingresos de soporte en daño personal por defecto.",
      ),
      Milio: txt(
        "Range extension and cleanse-like ultimate utility reward protecting a ranged carry; Mikael is still limited by eligible CC rules.",
        "El alcance y la utilidad de la definitiva premian proteger a un carry a distancia; Mikael sigue limitado por controles elegibles.",
      ),
    },
  ),

  prof(
    "mage-support",
    ["Brand", "Xerath", "Zyra"],
    ["UTILITY"],
    "Mage support: poke and zone control",
    "Soporte mago: hostigamiento y control de zona",
    [
      R.comet("support-comet", "Poke and zone control", "Hostigamiento y control de zona", 8300),
      R.firstStrike("support-first", "Safe opening combo", "Combo inicial seguro"),
    ],
    [
      whyItem(
        "3865",
        "World Atlas is the support quest start even for a damage-oriented support.",
        "Mapamundi es el inicio de misión incluso para un soporte centrado en daño.",
        "Start with the role quest and let its income progression support later purchases.",
        "Inicia la misión del rol y usa su progresión de ingresos para compras posteriores.",
        "Support income does not justify assuming a full mid-lane mage budget.",
        "Los ingresos de soporte no justifican asumir el presupuesto de una maga de medio.",
      ),
    ],
    [
      whyItem(
        "6653",
        "Liandry's repeated burn can fit spell damage over time against durable targets.",
        "La quemadura de Liandry puede encajar con daño prolongado de hechizos contra objetivos resistentes.",
        "Candidate first AP completion when the champion can keep applying spells; consider support economy.",
        "Posible primera finalización AP si el campeón aplica hechizos repetidos; considera la economía de soporte.",
        "It is expensive relative to support income and delays vision/utility choices.",
        "Es costosa para ingresos de soporte y retrasa visión y utilidad.",
      ),
      whyItem(
        "4628",
        "Horizon Focus offers a ranged damage branch when the champion reliably tags targets from range.",
        "Enfoque al Horizonte ofrece daño a distancia si el campeón alcanza objetivos de forma fiable.",
        "Consider for ranged poke profiles such as Xerath; this is not a universal mage-support core.",
        "Considéralo para hostigamiento a distancia como Xerath; no es un núcleo universal de mago soporte.",
        "It is less durable and less useful if you cannot apply its trigger.",
        "Es menos resistente y útil si no activas su efecto.",
      ),
    ],
    [
      whyItem(
        "3020",
        "Magic penetration supports a damage-focused poke plan.",
        "La penetración mágica apoya el hostigamiento ofensivo.",
        "Choose when you can stay safe and reliably land spells.",
        "Elígelas si puedes mantenerte seguro y acertar hechizos.",
        "Less defensive than resistance boots.",
        "Menos defensivas que botas de resistencia.",
      ),
      whyItem(
        "3111",
        "Magic resistance and tenacity help against magic damage and eligible control.",
        "Resistencia mágica y tenacidad ayudan contra daño mágico y control elegible.",
        "Choose when survival lets you keep vision and poke.",
        "Elígelas si sobrevivir te permite mantener visión y hostigar.",
        "Tenacity does not remove airborne or suppression.",
        "La tenacidad no elimina efectos por el aire ni supresiones.",
      ),
    ],
    [
      whyItem(
        "3165",
        "Healing reduction is conditional when meaningful enemy healing changes fights and your spell damage applies it.",
        "La reducción de curación es condicional si la curación rival cambia peleas y tu daño de hechizos la aplica.",
        "Buy only after identifying substantial healing; do not treat a small heal as enough.",
        "Cómpralo solo tras identificar curación sustancial; una cura pequeña no basta.",
        "It delays AP and support utility.",
        "Retrasa poder de habilidad y utilidad de soporte.",
      ),
      whyItem(
        "3157",
        "Stasis protects against a dive that reaches a fragile poke support.",
        "Estasis protege de una entrada que alcance a un soporte frágil de hostigamiento.",
        "Choose if enemy dive repeatedly catches you while placing vision or casting.",
        "Elígelo si la entrada rival te atrapa al poner visión o lanzar hechizos.",
        "It delays damage and requires a timely active.",
        "Retrasa daño y requiere activar a tiempo.",
      ),
      whyItem(
        "3222",
        "Mikael's can cleanse eligible crowd control from a key ally.",
        "Mikael puede limpiar control elegible de un aliado clave.",
        "Consider only when ally protection is more valuable than another AP purchase.",
        "Considéralo solo si proteger un aliado vale más que otro objeto de poder de habilidad.",
        "It does not remove suppression or airborne effects.",
        "No elimina supresiones ni efectos por el aire.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerDot"],
        reason(
          "Flash is the escape from a dive; Ignite adds pressure when a landed root or zone creates a coordinated kill chance.",
          "Destello permite escapar de una entrada; Ignite añade presión si una inmovilización o zona crea opción coordinada de eliminación.",
          "Choose when your lane can convert poke into an all-in.",
          "Elígela cuando la línea pueda convertir hostigamiento en all-in.",
          "You give up Exhaust's peel or Heal's duo safety; support damage alone does not guarantee a kill.",
          "Renuncias a protección de Extenuación o seguridad de Curar; el daño de soporte no garantiza una baja.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerExhaust"],
        reason(
          "Exhaust protects your carry from a diver while Flash helps you avoid the initial engage.",
          "Extenuación protege al carry de un iniciador y Destello ayuda a evitar la entrada inicial.",
          "Choose into a strong diver when your team needs peel more than lane pressure.",
          "Elígela ante un iniciador fuerte si el equipo necesita protección más que presión de línea.",
          "You give up Ignite's lane damage and healing reduction.",
          "Renuncias al daño de línea y reducción de curación de Ignite.",
        ),
      ),
    ],
    sources(),
    {
      Brand: txt(
        "Repeated area damage and zone control differ from Brand mid: support income and ward responsibility limit purchases.",
        "El daño de área repetido y control de zona difieren de Brand medio: ingresos y visión limitan compras.",
      ),
      Xerath: txt(
        "Long range enables poke but low mobility makes defensive spell and boot choices relevant.",
        "El largo alcance permite hostigar, pero poca movilidad hace relevantes hechizos y botas defensivas.",
      ),
      Zyra: txt(
        "Plants and roots control space; fight around vision and setup instead of assuming a full AP budget.",
        "Plantas e inmovilizaciones controlan espacio; pelea alrededor de visión y preparación, sin asumir presupuesto AP completo.",
      ),
    },
  ),

  prof(
    "senna-support",
    ["Senna"],
    ["UTILITY"],
    "Senna: ranged damage and ally utility",
    "Senna: daño a distancia y utilidad aliada",
    [
      rune(
        "senna-fleet",
        "Kiting and lane sustain",
        "Kiteo y sustain de línea",
        8000,
        [8021, 9111, 9104, 8014],
        8400,
        [8444, 8453],
        [5005, 5008, 5013],
        reason(
          "Fleet's movement and sustain support Senna's ranged poke and need to stay safe while collecting range.",
          "Movimiento y sustain de Juego de pies apoyan el hostigamiento a distancia de Senna y su necesidad de mantenerse segura mientras obtiene alcance.",
          "Choose when the lane is about repeated poke and survival rather than hard engage.",
          "Elígela cuando la línea trate de hostigamiento repetido y supervivencia, no de iniciación fuerte.",
          "It gives up a stronger immediate all-in keystone.",
          "Renuncia a una runa de all-in inmediato más potente.",
        ),
      ),
      rune(
        "senna-glacial",
        "Set up a pick and protect an ally",
        "Preparar selección y proteger aliado",
        8300,
        [8351, 8304, 8313, 8410],
        8400,
        [8463, 8453],
        [5008, 5008, 5013],
        reason(
          "Glacial can add control after Senna's root and help allies follow a catch.",
          "Glacial añade control tras la inmovilización de Senna y ayuda a aliados a seguir una captura.",
          "Choose when team follow-up and peel are more useful than lane sustain.",
          "Elígela cuando el seguimiento y protección del equipo sean más útiles que sustain de línea.",
          "It offers less self-sustain and depends on landing setup.",
          "Aporta menos sustain personal y depende de acertar la preparación.",
        ),
      ),
    ],
    [
      whyItem(
        "3865",
        "World Atlas supports support quest income while Senna uses range to contribute damage and utility.",
        "Mapamundi apoya ingresos de misión mientras Senna aporta daño y utilidad con su alcance.",
        "Take as the support-role start.",
        "Tómalo como inicio del rol de soporte.",
        "It is not the same item plan as a bottom-lane carry.",
        "No es el mismo plan que un carry de línea inferior.",
      ),
    ],
    [
      whyItem(
        "6672",
        "Attack damage and repeated-hit output can fit Senna's ranged damage pattern.",
        "Daño de ataque e impactos repetidos pueden encajar con el patrón a distancia de Senna.",
        "Consider as a damage branch only when support income and team needs allow it.",
        "Considéralo como rama de daño solo si ingresos y necesidades del equipo lo permiten.",
        "It spends support gold on personal damage instead of team utility.",
        "Usa oro de soporte en daño personal en vez de utilidad de equipo.",
      ),
      whyItem(
        "3071",
        "Black Cleaver offers health and armor reduction when allied physical damage can use it.",
        "Cuchilla Oscura ofrece vida y reducción de armadura si los aliados de daño físico pueden aprovecharla.",
        "Choose when durable armored targets matter and your repeated hits can apply the effect.",
        "Elígela si importan objetivos acorazados y tus impactos repetidos aplican el efecto.",
        "It delays damage or utility and needs a physical-damage team.",
        "Retrasa daño o utilidad y requiere equipo físico.",
      ),
    ],
    [
      whyItem(
        "3009",
        "Movement helps Senna reposition between ranged attacks and avoid engage.",
        "El movimiento ayuda a Senna a reposicionarse entre ataques y evitar iniciación.",
        "Choose when kiting and surviving matter more than raw penetration.",
        "Elígelas cuando kitear y sobrevivir importe más que penetración.",
        "They offer less direct attack speed.",
        "Ofrecen menos velocidad de ataque directa.",
      ),
      whyItem(
        "3111",
        "Magic resistance and tenacity help against magic threats and reducible control.",
        "Resistencia mágica y tenacidad ayudan contra amenazas mágicas y control reducible.",
        "Choose when magic damage or eligible crowd control limits your range.",
        "Elígelas cuando daño mágico o control elegible limite tu alcance.",
        "Tenacity does not remove suppression or airborne effects.",
        "La tenacidad no elimina supresiones ni efectos por el aire.",
      ),
    ],
    [
      whyItem(
        "3222",
        "Mikael's can cleanse an eligible crowd-control effect from a teammate.",
        "Mikael puede limpiar control elegible de un compañero.",
        "Buy if a specific removable effect threatens a key carry.",
        "Cómpralo si un efecto eliminable amenaza a un carry clave.",
        "It cannot remove suppression or airborne effects and costs personal damage.",
        "No elimina supresiones ni efectos por el aire y cuesta daño personal.",
      ),
      whyItem(
        "3033",
        "Mortal Reminder can address substantial healing when Senna's physical damage reliably applies it.",
        "Recordatorio Mortal puede responder a curación sustancial si el daño físico de Senna lo aplica de forma fiable.",
        "Buy only when healing changes the fight.",
        "Cómpralo solo si la curación cambia la pelea.",
        "It delays utility and competes with Lord Dominik's Regards for penetration.",
        "Retrasa utilidad y compite con Recuerdos de Lord Dominik por penetración.",
      ),
      whyItem(
        "3156",
        "A magic shield can keep Senna alive when magic burst prevents her from contributing range and healing.",
        "Un escudo mágico puede mantener con vida a Senna si el daño explosivo le impide aportar alcance y curación.",
        "Choose into repeated magic burst.",
        "Elígelo ante daño mágico explosivo repetido.",
        "Lifeline competes with Sterak and Shieldbow.",
        "Salvavidas compite con Sterak y Arcoescudo.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerHeal"],
        reason(
          "Flash preserves escape; Heal supports Senna and her nearby lane ally through a trade.",
          "Destello conserva escape; Curar apoya a Senna y su aliado cercano durante un intercambio.",
          "Choose for broad lane safety.",
          "Elígela para seguridad amplia en línea.",
          "Heal does not remove crowd control or protect against all-in damage by itself.",
          "Curar no elimina control ni protege por sí sola contra todo el daño de un all-in.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerExhaust"],
        reason(
          "Exhaust can reduce one diver's damage while Senna uses range and root to protect an ally.",
          "Extenuación reduce el daño de un iniciador mientras Senna usa alcance e inmovilización para proteger.",
          "Choose against a specific assassin or diver.",
          "Elígela ante un asesino o iniciador concreto.",
          "You give up Heal's duo-lane recovery and movement.",
          "Renuncias a recuperación y movimiento de Curar en dúo.",
        ),
      ),
    ],
    sources(),
    {
      Senna: txt(
        "Senna's support economy, range, root and ally healing are distinct from a standard bottom crit carry; this setup is not an ADC default.",
        "La economía de soporte, alcance, inmovilización y curación aliada de Senna difieren de un carry crítico; no es una opción ADC predeterminada.",
      ),
    },
  ),

  prof(
    "pyke-support",
    ["Pyke"],
    ["UTILITY"],
    "Pyke: roaming pick support",
    "Pyke: soporte de selección y roaming",
    [
      rune(
        "pyke-hob",
        "Hook and fast follow-up",
        "Ancla y seguimiento rápido",
        8100,
        [9923, 8143, 8137, 8106],
        8000,
        [9111, 9105],
        [5007, 5008, 5013],
        reason(
          "Hail of Blades adds a quick attack window after Pyke reaches a target with hook or stun.",
          "Lluvia de cuchillas añade una ventana rápida de ataques tras alcanzar un objetivo con ancla o aturdimiento.",
          "Choose for short picks with allied follow-up.",
          "Elígela para selecciones breves con seguimiento aliado.",
          "It offers less value when you cannot safely reach the target and does not make Pyke a sustained carry.",
          "Aporta menos si no alcanzas al objetivo con seguridad y no convierte a Pyke en carry sostenido.",
        ),
      ),
      rune(
        "pyke-electro",
        "Burst and roam pick",
        "Selección explosiva y roaming",
        8100,
        [8112, 8143, 8137, 8106],
        8300,
        [8304, 8347],
        [5007, 5008, 5013],
        reason(
          "Electrocute supports a compact burst trade after a successful hook or stun.",
          "Electrocutar apoya un intercambio explosivo compacto tras acertar ancla o aturdimiento.",
          "Choose when the lane can create short picks and you plan to roam from priority.",
          "Elígela si la línea crea selecciones breves y planeas recorrer el mapa con prioridad.",
          "It is less useful against peel and costs lane safety compared with a defensive page.",
          "Sirve menos contra protección y ofrece menos seguridad de línea que una página defensiva.",
        ),
      ),
    ],
    [
      whyItem(
        "3865",
        "World Atlas is the support quest start; Pyke's damage pattern does not remove support income and vision duties.",
        "Mapamundi es el inicio de misión; el daño de Pyke no elimina ingresos ni deberes de visión del soporte.",
        "Take for support role and progress its quest.",
        "Tómalo para soporte y avanza la misión.",
        "Do not substitute an ordinary carry start based on his damage type.",
        "No lo sustituyas por inicio de carry según su tipo de daño.",
      ),
    ],
    [
      whyItem(
        "6692",
        "Eclipse supports a physical pick and repeated trades with a defensive proc.",
        "Eclipse apoya selecciones físicas e intercambios repetidos con un efecto defensivo.",
        "Consider as a damage branch when ahead and your team already has enough utility.",
        "Considérala como rama de daño con ventaja y suficiente utilidad en el equipo.",
        "It spends support income on personal damage and may be delayed by warding needs.",
        "Usa ingresos de soporte en daño personal y puede retrasarse por visión.",
      ),
      whyItem(
        "3071",
        "Black Cleaver can help allied physical damage against durable armor targets.",
        "Cuchilla Oscura puede ayudar daño físico aliado contra armadura resistente.",
        "Consider only when repeated hits and allied physical damage make the shred useful.",
        "Considérala solo si impactos repetidos y daño físico aliado aprovechan la reducción.",
        "It is expensive for a support and not a default tank-support item.",
        "Es costosa para soporte y no es un objeto de tanque predeterminado.",
      ),
    ],
    [
      whyItem(
        "3009",
        "Move speed helps Pyke roam and reposition to find a hook angle.",
        "La velocidad de movimiento ayuda a Pyke a recorrer y buscar ángulo para el ancla.",
        "Choose when map movement is central to your support plan.",
        "Elígelas si moverse por el mapa es central.",
        "They add less direct combat defense than resistance boots.",
        "Aportan menos defensa que botas de resistencia.",
      ),
      whyItem(
        "3111",
        "Magic resistance and tenacity help against magic damage and eligible control during a roam.",
        "Resistencia mágica y tenacidad ayudan contra daño mágico y control elegible al recorrer el mapa.",
        "Choose when those threats stop your roam or escape.",
        "Elígelas si esas amenazas detienen tu recorrido o escape.",
        "Tenacity does not remove suppression or airborne effects.",
        "La tenacidad no elimina supresiones ni efectos por el aire.",
      ),
    ],
    [
      whyItem(
        "3140",
        "Quicksilver Sash can answer an eligible removable CC or suppression that prevents Pyke from escaping.",
        "Fajín puede responder a control eliminable o supresión que impida escapar a Pyke.",
        "Buy on a component when a suppression such as Malzahar R or a removable stun/root repeatedly catches you; Quicksilver removes those effects, not airborne knock-ups or knockbacks.",
        "Cómpralo en componente si una supresión como R de Malzahar o un aturdimiento/inmovilización eliminable te atrapa repetidamente; Fajín elimina esos efectos, no derribos ni desplazamientos por el aire.",
        "It costs damage and does not remove airborne effects.",
        "Cuesta daño y no elimina efectos por el aire.",
      ),
      whyItem(
        "3156",
        "A magic shield may protect a pick support against concentrated magic burst.",
        "Un escudo mágico puede proteger al soporte de selección ante daño mágico concentrado.",
        "Choose when magic burst is the repeated reason you cannot reach or leave a fight.",
        "Elígelo si el daño mágico explosivo impide entrar o salir repetidamente.",
        "Lifeline competes with Sterak and Shieldbow.",
        "Salvavidas compite con Sterak y Arcoescudo.",
      ),
      whyItem(
        "3033",
        "Healing reduction can matter when significant healing changes the outcome and Pyke applies physical damage.",
        "La reducción de curación importa si una curación significativa cambia el resultado y Pyke aplica daño físico.",
        "Consider only when healing is decisive and support income permits the purchase.",
        "Considéralo solo si la curación es decisiva y los ingresos permiten comprarlo.",
        "It is not a support default and competes with Lord Dominik's Regards.",
        "No es predeterminado para soporte y compite con Recuerdos de Lord Dominik.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerDot"],
        reason(
          "Flash helps correct hook follow-up or escape; Ignite adds pressure to a coordinated lane pick.",
          "Destello corrige el seguimiento del ancla o permite escapar; Ignite añade presión a una selección coordinada.",
          "Choose for kill pressure when the lane can follow the hook.",
          "Elígela para presión de eliminación si la línea puede seguir el ancla.",
          "You give up Exhaust's defense against a diver and Heal's duo safety.",
          "Renuncias a la defensa de Extenuación y seguridad de Curar.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerExhaust"],
        reason(
          "Exhaust helps Pyke peel a diver while Flash preserves a hook angle or escape.",
          "Extenuación ayuda a Pyke a proteger contra un iniciador y Destello conserva ángulo o escape.",
          "Choose when protecting the carry is more important than adding lane damage.",
          "Elígela si proteger al carry importa más que añadir daño en línea.",
          "You give up Ignite's pressure and healing reduction.",
          "Renuncias a presión y reducción de curación de Ignite.",
        ),
      ),
    ],
    sources(),
    {
      Pyke: txt(
        "Pyke is an AD assassin-style support with support economy and ward duties, not a tank or ordinary crit ADC.",
        "Pyke es un soporte de estilo asesino físico con economía y visión de soporte, no un tanque ni ADC de crítico común.",
      ),
    },
  ),

  prof(
    "brand-mid",
    ["Brand"],
    ["MIDDLE"],
    "Brand mid: area spell damage",
    "Brand medio: daño de hechizos de área",
    [
      R.comet("brand-mid-comet", "Poke and spell setup", "Hostigamiento y preparación"),
      R.firstStrike("brand-mid-first", "Opening combo", "Combo inicial"),
    ],
    [
      whyItem(
        "1056",
        "Doran's Ring supports mana and repeated spells in a solo lane.",
        "Sortija de Doran apoya maná y hechizos repetidos en línea individual.",
        "Choose for standard mid lane spell trading.",
        "Elígela para intercambios estándar de medio.",
        "Less defensive than a health-focused start.",
        "Menos defensiva que un inicio centrado en vida.",
      ),
    ],
    [
      whyItem(
        "6653",
        "Liandry's repeated burn aligns with Brand's sustained area spell damage.",
        "La quemadura de Liandry encaja con el daño de área prolongado de Brand.",
        "Candidate core when fights give time to apply spells to multiple targets.",
        "Posible núcleo si las peleas permiten aplicar hechizos a varios objetivos.",
        "Less immediate burst than Luden's and no protection from dive.",
        "Menos daño explosivo inmediato que Luden y sin protección ante entradas.",
      ),
      whyItem(
        "6655",
        "Luden's supplies a burst-oriented option for catching fragile targets with a spell rotation.",
        "Luden ofrece una opción explosiva para atrapar objetivos frágiles con una rotación.",
        "Choose when the enemy composition offers accessible squishy targets.",
        "Elígelo si la composición ofrece objetivos frágiles accesibles.",
        "Less sustained damage to durable frontliners than Liandry's.",
        "Menos daño sostenido a primeras líneas resistentes que Liandry.",
      ),
    ],
    [
      whyItem(
        "3020",
        "Magic penetration supports a spell-damage plan.",
        "La penetración mágica apoya el plan de daño de hechizos.",
        "Choose when you can land spells safely.",
        "Elígelas si puedes acertar hechizos con seguridad.",
        "Less haste and defense than alternatives.",
        "Menos aceleración y defensa que otras opciones.",
      ),
      whyItem(
        "3111",
        "Magic resistance and tenacity can help Brand survive magic and eligible control threats.",
        "Resistencia mágica y tenacidad ayudan a Brand ante magia y control elegible.",
        "Choose when survival improves your chance to cast area spells.",
        "Elígelas si sobrevivir mejora la opción de lanzar hechizos de área.",
        "Does not remove suppression or airborne effects.",
        "No elimina supresiones ni efectos por el aire.",
      ),
    ],
    [
      whyItem(
        "3157",
        "Stasis can buy time after a committed area-damage rotation draws focus.",
        "Estasis puede dar tiempo cuando una rotación de daño de área atrae el foco.",
        "Choose against a dive that repeatedly reaches you.",
        "Elígelo ante una entrada que te alcance repetidamente.",
        "Delays damage and requires team follow-up.",
        "Retrasa daño y requiere seguimiento aliado.",
      ),
      whyItem(
        "3165",
        "Healing reduction is a conditional option when substantial enemy healing decides fights.",
        "La reducción de curación es condicional si curación rival sustancial decide peleas.",
        "Buy only if your current damage can apply it and healing is meaningful.",
        "Cómpralo solo si el daño actual puede aplicarlo y la curación es importante.",
        "Delays AP and is not needed for minor healing.",
        "Retrasa poder de habilidad y no hace falta ante curación menor.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerDot"],
        reason(
          "Flash helps escape or follow a stun; Ignite adds lane pressure to a reliable spell setup.",
          "Destello ayuda a escapar o seguir un aturdimiento; Ignite añade presión a una preparación fiable.",
          "Choose when the lane can coordinate a burst window.",
          "Elígela si la línea coordina una ventana explosiva.",
          "You give up Teleport's wave and map flexibility.",
          "Renuncias a la flexibilidad de oleadas y mapa de Teleportar.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerTeleport"],
        reason(
          "Teleport supports mid wave recovery and rotations while Flash preserves safety.",
          "Teleportar apoya recuperar oleadas y rotar desde medio mientras Destello conserva seguridad.",
          "Choose for stable scaling or map response rather than Ignite pressure.",
          "Elígela para escalar estable o responder en mapa en vez de presión de Ignite.",
          "You give up direct lane kill pressure; mid quest does not grant free Teleport.",
          "Renuncias a presión directa; misión de medio no da Teleportar gratuito.",
        ),
      ),
    ],
    sources(),
    {
      Brand: txt(
        "Brand mid has solo-lane gold and a different income/spell priority from Brand support, which starts with World Atlas.",
        "Brand medio tiene oro de línea individual y prioridades distintas de Brand soporte, que inicia con Mapamundi.",
      ),
    },
  ),
  prof(
    "malphite-ap-mid",
    ["Malphite"],
    ["MIDDLE"],
    "Malphite AP burst engage",
    "Malphite AP de iniciación explosiva",
    [
      R.comet("malphite-poke", "Lane poke", "Hostigamiento en línea"),
      R.firstStrike("malphite-burst", "Ultimate burst window", "Ventana explosiva de definitiva"),
    ],
    [
      whyItem(
        "1056",
        "Doran's Ring supports mana and ranged Q trades while the AP setup builds.",
        "Sortija de Doran apoya maná e intercambios con Q a distancia mientras escala la configuración AP.",
        "Choose for a solo lane AP branch.",
        "Elígela para una rama AP de línea individual.",
        "This is not the tank top start and leaves less room for mistakes than a health start.",
        "No es el inicio de tanque superior y perdona menos que un inicio con vida.",
      ),
    ],
    [
      whyItem(
        "6655",
        "Luden's supports a burst sequence after Malphite reaches a target with his ultimate.",
        "Luden apoya una secuencia explosiva tras alcanzar al objetivo con la definitiva.",
        "Candidate first AP core when your team can follow the ultimate engage.",
        "Posible primer núcleo AP si tu equipo puede seguir la iniciación de la definitiva.",
        "It offers less durability than tank items and the engage can be punished without follow-up.",
        "Aporta menos resistencia que objetos de tanque y la iniciación puede castigarse sin seguimiento.",
      ),
      whyItem(
        "3089",
        "Rabadon's amplifies a developed AP inventory for a later spell burst.",
        "Rabadon amplifica un inventario AP desarrollado para daño explosivo posterior.",
        "Consider after useful first items if the team can protect your approach.",
        "Considéralo tras objetos iniciales útiles si el equipo puede proteger tu acercamiento.",
        "It is costly and provides no defensive margin.",
        "Es costoso y no brinda margen defensivo.",
      ),
    ],
    [
      whyItem(
        "3020",
        "Magic penetration supports an AP burst plan into targets without heavy resistance.",
        "La penetración mágica apoya el burst AP contra objetivos sin mucha resistencia.",
        "Choose for an offensive AP plan.",
        "Elígelas para un plan AP ofensivo.",
        "They give less protection than resistance boots.",
        "Protegen menos que botas de resistencia.",
      ),
      whyItem(
        "3111",
        "Magic resistance and tenacity help against magic threat and reducible control.",
        "Resistencia mágica y tenacidad ayudan ante amenaza mágica y control reducible.",
        "Choose if survival is needed to reach an ultimate angle.",
        "Elígelas si necesitas sobrevivir para encontrar ángulo de definitiva.",
        "Tenacity does not remove suppression or airborne effects.",
        "La tenacidad no elimina supresiones ni efectos por el aire.",
      ),
    ],
    [
      whyItem(
        "3157",
        "Stasis can protect Malphite after an ultimate engage draws focus.",
        "Estasis puede proteger a Malphite tras atraer el foco al iniciar con definitiva.",
        "Buy when the enemy response routinely lands before allied follow-up.",
        "Cómpralo si la respuesta rival llega antes del seguimiento aliado.",
        "It delays AP and cannot repair a poorly timed engage.",
        "Retrasa poder de habilidad y no arregla una iniciación mal ejecutada.",
      ),
      whyItem(
        "3165",
        "Healing reduction is an option only if meaningful healing changes fights and the current AP item applies it.",
        "La reducción de curación solo sirve si una curación importante cambia peleas y el objeto AP actual la aplica.",
        "Confirm the current item effect and team damage before purchase.",
        "Confirma el efecto actual y daño del equipo antes de comprar.",
        "It delays burst and should not be bought for incidental healing.",
        "Retrasa burst y no debe comprarse por curación incidental.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerDot"],
        reason(
          "Flash can adjust the angle or exit; Ignite adds lane pressure to a landed ultimate or Q setup.",
          "Destello ajusta el ángulo o salida; Ignite añade presión de línea tras acertar definitiva o Q.",
          "Choose if lane pressure and immediate follow-up outweigh map tempo.",
          "Elígela si presión en línea y seguimiento inmediato superan el ritmo de mapa.",
          "You give up Teleport's wave recovery and map access.",
          "Renuncias a recuperación de oleadas y acceso de mapa de Teleportar.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerTeleport"],
        reason(
          "Teleport supports wave recovery and map response while Flash preserves engage correction.",
          "Teleportar apoya recuperar oleadas y responder en mapa mientras Destello corrige iniciación.",
          "Choose when stable tempo matters more than an Ignite lane commit.",
          "Elígela si el ritmo estable importa más que comprometer línea con Ignite.",
          "You give up kill pressure; the middle quest does not grant a free Teleport.",
          "Renuncias a presión de eliminación; la misión de medio no otorga Teleportar gratuito.",
        ),
      ),
    ],
    sources(),
    {
      Malphite: txt(
        "This is the AP middle branch with a burst engage plan. The tank top profile is separate; don't infer one from the other.",
        "Esta es la rama de medio AP con iniciación explosiva. El perfil de tanque superior es distinto; no infieras uno del otro.",
      ),
    },
  ),

  prof(
    "cassiopeia-mid",
    ["Cassiopeia"],
    ["MIDDLE"],
    "Cassiopeia: mana and sustained spell DPS",
    "Cassiopeia: maná y daño sostenido de hechizos",
    [
      rune(
        "cass-conq",
        "Sustained poison and E cycles",
        "Veneno sostenido y ciclos de E",
        8000,
        [8010, 8009, 9105, 8299],
        8200,
        [8226, 8210],
        [5008, 5008, 5013],
        reason(
          "Conqueror supports repeated spell hits while Manaflow and Presence of Mind help a mana-intensive sustained fight.",
          "Conquistador apoya impactos de hechizos repetidos mientras Banda de maná y Presencia de ánimo ayudan en una pelea sostenida de alto consumo.",
          "Choose when you expect repeated close-range spell cycles and can manage mana.",
          "Elígela si esperas ciclos de hechizos cercanos repetidos y puedes gestionar el maná.",
          "It needs ongoing contact and is weak when the opponent can disengage after one rotation.",
          "Necesita contacto continuo y sirve menos si el rival se retira tras una rotación.",
        ),
      ),
      rune(
        "cass-phase",
        "Kite and reposition",
        "Kiteo y reposicionamiento",
        8200,
        [8230, 8226, 8210, 8237],
        8000,
        [8009, 8299],
        [5008, 5008, 5013],
        reason(
          "Stormraider's Surge grants movement speed and slow resistance for 3 seconds when Cassiopeia deals damage equal to 25% of an enemy champion's maximum health within 3 seconds; its cooldown scales from 20 to 10 seconds by level.",
          "Ímpetu de Stormraider otorga velocidad de movimiento y resistencia a ralentizaciones durante 3 segundos cuando Cassiopeia inflige daño equivalente al 25% de la vida máxima de un campeón enemigo en 3 segundos; su enfriamiento baja de 20 a 10 segundos según el nivel.",
          "Choose when avoiding an engage and maintaining spell range is more important than Conqueror's sustained payoff.",
          "Elígela si evitar iniciación y mantener alcance importa más que el valor sostenido de Conquistador.",
          "It gives up Conqueror's extended-combat support and the 25%-max-health-in-3-seconds trigger is difficult to reach against durable targets.",
          "Renuncia al apoyo de Conquistador en combate largo; alcanzar 25% de vida máxima en 3 segundos es difícil contra objetivos resistentes.",
        ),
      ),
    ],
    [
      whyItem(
        "1056",
        "Doran's Ring adds mana support for Cassiopeia's high-cast lane pattern.",
        "Sortija de Doran aporta maná para el patrón de muchos lanzamientos de Cassiopeia.",
        "Use as a standard solo-lane start.",
        "Úsala como inicio estándar de línea individual.",
        "It does not eliminate the need to manage mana between waves.",
        "No elimina la necesidad de gestionar maná entre oleadas.",
      ),
    ],
    [
      whyItem(
        "6653",
        "Liandry's repeated burn fits sustained spell application and longer fights.",
        "La quemadura repetida de Liandry encaja con aplicación sostenida de hechizos y peleas largas.",
        "Candidate first completion when you can maintain poison and spell contact.",
        "Posible primera finalización cuando puedas mantener veneno y contacto de hechizos.",
        "It gives less immediate burst and does not cover her positioning needs.",
        "Aporta menos burst inmediato y no resuelve sus necesidades de posición.",
      ),
      whyItem(
        "4633",
        "Riftmaker offers a health-oriented sustained AP branch for staying in extended fights.",
        "Agrietador ofrece una rama AP sostenida con vida para permanecer en peleas largas.",
        "Consider when surviving close-range contact is as important as spell damage.",
        "Considéralo si sobrevivir al contacto cercano importa tanto como el daño de hechizos.",
        "It is less focused on ranged burst and remains vulnerable to hard engage.",
        "Se centra menos en burst a distancia y sigue vulnerable a iniciación fuerte.",
      ),
    ],
    [],
    [
      whyItem(
        "3157",
        "Stasis can buy a defensive window when a diver reaches Cassiopeia.",
        "Estasis puede dar una ventana defensiva cuando un iniciador alcanza a Cassiopeia.",
        "Choose when a specific dive is repeatedly ending your spell uptime.",
        "Elígelo si una entrada concreta termina repetidamente tu daño sostenido.",
        "It delays AP and requires timing; it does not replace spacing.",
        "Retrasa poder de habilidad y requiere buen momento; no reemplaza el espaciado.",
      ),
      whyItem(
        "3165",
        "Healing reduction is situational if substantial healing changes fights and Cassiopeia can apply the current effect.",
        "La reducción de curación es situacional si una curación sustancial cambia peleas y Cassiopeia puede aplicar el efecto actual.",
        "Verify current item effects and buy only for meaningful healing.",
        "Verifica los efectos actuales y compra solo ante curación significativa.",
        "It delays damage and is not a default mage purchase.",
        "Retrasa daño y no es compra predeterminada de maga.",
      ),
    ],
    [
      spell(
        ["SummonerFlash", "SummonerHaste"],
        reason(
          "Flash gives an instant reposition while Ghost helps Cassiopeia maintain spell range and kite without boots.",
          "Destello reposiciona al instante y Fantasmal ayuda a Cassiopeia a mantener alcance y kitear sin botas.",
          "Choose for a fight plan built around continuous spell damage and movement.",
          "Elígela para un plan de daño continuo y movimiento.",
          "You give up Teleport's map option or Ignite's lane pressure.",
          "Renuncias al mapa de Teleportar o presión de Ignite.",
        ),
      ),
      spell(
        ["SummonerFlash", "SummonerTeleport"],
        reason(
          "Teleport supports wave recovery and map access; Flash remains her emergency reposition.",
          "Teleportar apoya recuperar oleadas y acceso al mapa; Destello sigue como reposición de emergencia.",
          "Choose when lane tempo and map play matter more than Ghost's combat movement.",
          "Elígela si el ritmo y mapa importan más que el movimiento de combate de Fantasmal.",
          "Cassiopeia cannot buy boots, so she gives up a major movement spell with this choice.",
          "Cassiopeia no puede comprar botas, así que renuncia a un hechizo de movimiento importante.",
        ),
      ),
    ],
    sources(),
    {
      Cassiopeia: txt(
        "Cassiopeia cannot purchase boots; boots are intentionally empty. Her sustained poison DPS and mana use distinguish her from ranged burst mages.",
        "Cassiopeia no puede comprar botas; la lista queda vacía intencionalmente. Su daño sostenido con veneno y consumo de maná la distinguen de magas explosivas a distancia.",
      ),
    },
  ),
];

const detail = (why: string, whyEs: string, when: string, whenEs: string, cost: string, costEs: string) =>
  reason(why, whyEs, when, whenEs, cost, costEs);
function sorceryId(): number {
  return 8200;
}
const page = (
  id: string,
  title: string,
  titleEs: string,
  primaryTree: number,
  primary: [number, number, number, number],
  secondaryTree: number,
  secondary: [number, number],
  shards: [number, number, number],
  copy: SetupExplanation,
): SetupRunePage => rune(id, title, titleEs, primaryTree, primary, secondaryTree, secondary, shards, copy);

const makeSpecialist = (
  base: SetupProfile,
  championId: string,
  id: string,
  title: string,
  titleEs: string,
  runes: [SetupRunePage, SetupRunePage],
  core: SetupItemChoice[],
  situational: SetupItemChoice[],
  notes?: SetupText,
): SetupProfile => ({
  ...base,
  id,
  championIds: [championId],
  title: txt(title, titleEs),
  runes,
  core,
  situational,
  championNotes: notes ? { [championId]: notes } : undefined,
});

const AP_JUNGLE = getBase("ap-jungle");
function getBase(id: string): SetupProfile {
  return BASE_SETUP_PROFILES.find((profile) => profile.id === id)!;
}

const apRune = (
  id: string,
  title: string,
  titleEs: string,
  key: number,
  tree: number,
  minor: [number, number],
  when: string,
  whenEs: string,
  cost: string,
  costEs: string,
) =>
  page(
    id,
    title,
    titleEs,
    tree,
    key === 8010
      ? [8010, 9111, 9105, 8299]
      : key === 8112
        ? [8112, 8139, 8137, 8106]
        : key === 8128
          ? [8128, 8139, 8137, 8106]
          : key === 8229
            ? [8229, 8226, 8210, 8237]
            : key === 8369
              ? [8369, 8304, 8313, 8347]
              : [8005, 9111, 9104, 8014],
    tree === 8000 ? 8200 : tree === 8300 ? 8200 : 8000,
    tree === 8000 ? [8226, 8210] : tree === 8300 ? [8226, 8210] : key === 8128 || key === 8112 ? [9105, 8014] : minor,
    tree === 8000 ? [5005, 5008, 5013] : [5008, 5008, 5013],
    detail(
      key === 8010
        ? "Conqueror rewards Diana's repeated melee spell and attack contact during a committed dive."
        : key === 8229
          ? "Arcane Comet adds a spell proc to Karthus' ranged Q poke; it is a long-range hit option, not jungle lane control."
          : key === 8128
            ? "Dark Harvest can trigger on low-health champions and refresh after takedowns, rewarding Karthus' repeated Q and global R cleanup."
            : key === 8112
              ? "Electrocute adds a compact burst proc after separate damage instances, fitting an AP assassin's short combo."
              : key === 8369
                ? "First Strike rewards landing the opening damage before an enemy hits back, adding gold and burst to a prepared AP spell rotation."
                : "This keystone supports the champion's repeated spell damage and timing window.",
      key === 8010
        ? "Conquistador recompensa el contacto repetido de habilidades y ataques cuerpo a cuerpo de Diana durante una entrada."
        : key === 8229
          ? "Cometa añade un impacto de hechizo al hostigamiento a distancia de Q de Karthus; es una opción de impacto lejano, no control de línea en jungla."
          : key === 8128
            ? "Cosecha oscura puede activarse contra campeones con poca vida y reiniciarse tras bajas, premiando Q repetida y el remate global de R de Karthus."
            : key === 8112
              ? "Electrocutar añade un efecto explosivo compacto tras varias instancias de daño, acorde con el combo breve de un asesino AP."
              : key === 8369
                ? "Primer golpe recompensa infligir daño antes de recibirlo, y añade oro y burst a una rotación AP preparada."
                : "Esta clave apoya el daño repetido de hechizos y la ventana de acción del campeón.",
      when,
      whenEs,
      cost,
      costEs,
    ),
  );

const specializeGroups = (): SetupProfile[] => {
  const profiles = BASE_SETUP_PROFILES.filter((profile) => !["ap-jungle", "tank-top", "adc-crit"].includes(profile.id));
  const apItem = (id: string, copy: SetupExplanation) => item(id, copy);
  const commonDianaRunes: [SetupRunePage, SetupRunePage] = [
    apRune(
      "diana-conqueror",
      "Melee skirmish",
      "Escaramuza cuerpo a cuerpo",
      8010,
      8000,
      [8226, 8210],
      "Take extended fights where repeated E, Q and attacks keep you on a target.",
      "Entra en peleas largas donde E, Q y ataques repetidos te mantengan sobre un objetivo.",
      "It needs sustained contact and gives up a quicker first-burst payoff.",
      "Necesita contacto sostenido y renuncia al daño explosivo inmediato.",
    ),
    apRune(
      "diana-electrocute",
      "Short pick and burst",
      "Selección breve y daño explosivo",
      8112,
      8100,
      [8226, 8210],
      "Choose when a clean Q-to-R entry can isolate a fragile target before a long fight develops.",
      "Elígela si una entrada limpia de Q a R puede aislar a un objetivo frágil antes de una pelea larga.",
      "Less sustained damage than Conqueror; a failed entry leaves little value.",
      "Menos daño sostenido que Conquistador; una entrada fallida aporta poco.",
    ),
  ];
  profiles.push(
    makeSpecialist(
      AP_JUNGLE,
      "Diana",
      "ap-jungle-diana",
      "Diana: melee AP diver",
      "Diana: iniciadora AP cuerpo a cuerpo",
      commonDianaRunes,
      [
        apItem(
          "3115",
          detail(
            "Nashor's Tooth strengthens Diana's repeated attacks and AP spell follow-up after she reaches a target.",
            "Diente de Nashor refuerza los ataques repetidos y el seguimiento AP de Diana al alcanzar un objetivo.",
            "Build first when you can safely farm camps and expect extended champion contact.",
            "Complétalo primero si puedes limpiar con seguridad y esperas contacto prolongado con campeones.",
            "It offers attack tempo over immediate one-combo burst; avoid forcing dives without follow-up.",
            "Prioriza ritmo de ataques sobre burst de un combo; evita entradas sin seguimiento.",
          ),
        ),
        apItem(
          "4633",
          detail(
            "Riftmaker adds health and sustained-fight value for an AP diver who must remain close.",
            "Agrietador añade vida y valor en peleas largas para una iniciadora AP que debe mantenerse cerca.",
            "Follow Nashor's when fights last and enemy damage makes staying in melee costly.",
            "Sigue a Nashor si las peleas duran y el daño rival encarece permanecer cuerpo a cuerpo.",
            "Delays penetration or stasis; it is not a replacement for choosing a safe entry.",
            "Retrasa penetración o estasis; no sustituye una entrada segura.",
          ),
        ),
      ],
      [
        apItem(
          "3157",
          detail(
            "Stasis can let Diana absorb the response after a multi-target ultimate entry.",
            "Estasis permite a Diana resistir la respuesta tras entrar con una definitiva sobre varios rivales.",
            "Buy after the first AP item when enemy focus consistently lands during your R follow-up.",
            "Cómpralo tras el primer objeto AP si el foco rival cae durante el seguimiento de R.",
            "Delays damage and requires allies to use the time you buy.",
            "Retrasa daño y requiere que tus aliados aprovechen el tiempo.",
          ),
        ),
        apItem(
          "3165",
          detail(
            "Morellonomicon applies Grievous Wounds through Diana's magic damage.",
            "Morellonomicon aplica Heridas graves mediante el daño mágico de Diana.",
            "Buy after a damage component when sustained champion healing is changing fights; apply it with Q, W, E or R damage.",
            "Cómpralo tras un componente de daño si la curación sostenida cambia peleas; aplícalo con daño de Q, W, E o R.",
            "Delays AP durability or burst; do not spend a slot against incidental healing.",
            "Retrasa resistencia o burst AP; no gastes un espacio ante curación incidental.",
          ),
        ),
      ],
      txt(
        "Diana is a melee AP diver: this profile prioritizes Nashor's/Riftmaker sustained contact. Her Q and R magic damage can apply Morellonomicon's Grievous Wounds.",
        "Diana es una iniciadora AP cuerpo a cuerpo: este perfil prioriza contacto sostenido con Nashor y Agrietador. Su daño mágico de Q y R puede aplicar las Heridas graves de Morellonomicon.",
      ),
    ),
  );

  const fiddlePages: [SetupRunePage, SetupRunePage] = [
    apRune(
      "fiddle-harvest",
      "Ambush and takedown cleanup",
      "Emboscada y cierre de bajas",
      8128,
      8100,
      [8226, 8210],
      "Start R from unseen angles into grouped or low-health targets, then use the reset window to clean up.",
      "Inicia R desde ángulos no visibles contra rivales agrupados o con poca vida y aprovecha la ventana para rematar.",
      "Needs a strong ambush and takedown access; weaker when fights begin in open vision.",
      "Requiere emboscada y acceso a bajas; pierde valor si la pelea empieza con visión abierta.",
    ),
    apRune(
      "fiddle-firststrike",
      "Prepared ultimate burst",
      "Burst de definitiva preparada",
      8369,
      8300,
      [8226, 8210],
      "Choose when fog and control wards let your first R damage land before the enemy can answer.",
      "Elígela si la niebla y los guardianes de control permiten que el primer daño de R llegue antes de la respuesta rival.",
      "First Strike is denied when enemies damage you first; no value if the ultimate is interrupted or misses.",
      "Primer golpe se niega si te dañan primero; no aporta si interrumpen o fallas la definitiva.",
    ),
  ];
  profiles.push(
    makeSpecialist(
      AP_JUNGLE,
      "Fiddlesticks",
      "ap-jungle-fiddlesticks",
      "Fiddlesticks: unseen AP ambush",
      "Fiddlesticks: emboscada AP desde la niebla",
      fiddlePages,
      [
        apItem(
          "6653",
          detail(
            "Liandry's burn compounds Fiddlesticks' repeated area spell damage in clustered fights.",
            "La quemadura de Liandry amplifica el daño repetido de área de Fiddlesticks en peleas agrupadas.",
            "Complete first when fights give time for R and follow-up spells to hit multiple champions.",
            "Complétalo primero si R y los hechizos siguientes pueden alcanzar a varios campeones.",
            "Less immediate protection than Zhonya's; buy stasis next if focus stops your channel follow-up.",
            "Protege menos que Zhonya; compra estasis después si el foco corta el seguimiento.",
          ),
        ),
        apItem(
          "3157",
          detail(
            "Zhonya's gives stasis during the enemy response after Fiddlesticks channels into the fight.",
            "Zhonya permite estasis durante la respuesta rival tras canalizar hacia la pelea.",
            "Complete second when you need to survive the first response after R lands.",
            "Complétalo segundo si necesitas sobrevivir a la primera respuesta tras acertar R.",
            "Delays raw AP damage and should follow an entry that can hit multiple targets.",
            "Retrasa poder AP y requiere una entrada que alcance a varios objetivos.",
          ),
        ),
      ],
      [
        apItem(
          "3165",
          detail(
            "Morellonomicon applies Grievous Wounds through Fiddlesticks' magic damage and drain.",
            "Morellonomicon aplica Heridas graves con el daño mágico y drenaje de Fiddlesticks.",
            "Buy after a component when enemy champion healing swings an objective fight; keep applying spell damage.",
            "Cómpralo tras un componente si la curación rival cambia una pelea de objetivo; sigue aplicando daño de hechizo.",
            "Delays AP and stasis; it does not answer shields or healing reduction immunity.",
            "Retrasa AP y estasis; no responde a escudos ni inmunidad a reducción de curación.",
          ),
        ),
      ],
      txt(
        "Fiddlesticks wins value from unseen R channels and area spell hits, not melee Conqueror stacks. His magic damage applies Morellonomicon's Grievous Wounds.",
        "Fiddlesticks obtiene valor de canalizar R sin ser visto y acertar hechizos de área, no de acumulaciones cuerpo a cuerpo de Conquistador. Su daño mágico aplica las Heridas graves de Morellonomicon.",
      ),
    ),
  );

  const karthusPages: [SetupRunePage, SetupRunePage] = [
    apRune(
      "karthus-harvest",
      "Farm and scale into cleanup",
      "Farmeo y escalado para rematar",
      8128,
      8100,
      [8226, 8210],
      "Prioritize safe camp farming, then use repeated Q hits and R to finish low-health enemies.",
      "Prioriza campamentos seguros y usa Q repetida y R para rematar enemigos con poca vida.",
      "Less reliable early without takedowns and does not replace accurate Q spacing.",
      "Menos fiable al inicio sin bajas y no reemplaza espaciar bien Q.",
    ),
    apRune(
      "karthus-comet",
      "Repeated spell poke",
      "Hostigamiento repetido con hechizos",
      8229,
      8200,
      [8009, 8014],
      "Choose when Q poke and repeated spell hits matter more than takedown resets.",
      "Elígela si importa más hostigar con Q y acertar hechizos repetidos que reiniciar con bajas.",
      "Lower cleanup payoff than Harvest and weaker if Q misses or targets reach you.",
      "Menos valor para rematar que Cosecha y peor si fallas Q o te alcanzan.",
    ),
  ];
  profiles.push(
    makeSpecialist(
      AP_JUNGLE,
      "Karthus",
      "ap-jungle-karthus",
      "Karthus: farming AP damage",
      "Karthus: daño AP y farmeo",
      karthusPages,
      [
        apItem(
          "6653",
          detail(
            "Liandry's burn fits Karthus' repeated Q and area damage over a long fight.",
            "La quemadura de Liandry encaja con Q repetida y daño de área de Karthus en peleas largas.",
            "Complete first after the jungle start when your plan is camp tempo into sustained teamfight damage.",
            "Complétalo primero tras el inicio de jungla si el plan es ritmo de campamentos y daño sostenido en peleas.",
            "Less burst than a penetration purchase and no defense when an enemy reaches you.",
            "Menos burst que penetración y sin defensa si un enemigo te alcanza.",
          ),
        ),
        apItem(
          "3135",
          detail(
            "Void Staff improves magic damage against opponents who have bought substantial magic resistance.",
            "Bastón del Vacío mejora el daño mágico contra rivales con resistencia mágica sustancial.",
            "Buy second only after enemy champions begin completing magic resistance.",
            "Cómpralo segundo solo cuando los rivales empiecen a completar resistencia mágica.",
            "If they have little MR, a defensive or AP utility item gives more immediate value.",
            "Si tienen poca RM, defensa o utilidad AP aporta más valor inmediato.",
          ),
        ),
      ],
      [
        apItem(
          "3165",
          detail(
            "Morellonomicon applies Grievous Wounds to Karthus' magic damage.",
            "Morellonomicon aplica Heridas graves al daño mágico de Karthus.",
            "Buy after a damage component when sustained healing changes a fight; Q, E and R damage can apply it.",
            "Cómpralo tras un componente si la curación sostenida cambia una pelea; el daño de Q, E y R puede aplicarlo.",
            "Delays AP or penetration; skip when healing is not deciding fights.",
            "Retrasa AP o penetración; omítelo si la curación no decide peleas.",
          ),
        ),
      ],
      txt(
        "Karthus is a ranged farming and area-damage jungler. His Q, E and R deal magic damage and apply Morellonomicon's Grievous Wounds.",
        "Karthus es un jungla de farmeo y daño de área a distancia. Su Q, E y R infligen daño mágico y aplican las Heridas graves de Morellonomicon.",
      ),
    ),
  );

  // Champion-specific top profiles replace caveats with visible lane pages and coherent item paths.
  const tank = getBase("tank-top");
  const tankPages = (champion: string): [SetupRunePage, SetupRunePage] => {
    return [
      page(
        `${champion.toLowerCase()}-grasp`,
        "Lane trades",
        "Intercambios de línea",
        8400,
        [8437, 8446, 8473, 8451],
        8000,
        [9111, 9105],
        [5007, 5001, 5013],
        detail(
          "Grasp rewards short, repeatable melee trades; Second Wind or Bone Plating lowers the cost of approaching.",
          "Agarre recompensa intercambios cuerpo a cuerpo breves y repetibles; Segundo aliento o Revestimiento óseo reduce el coste de acercarte.",
          "Choose when you can touch the opponent safely during lane and need sustain or short-trade durability.",
          "Elígela si puedes tocar al rival con seguridad en línea y necesitas sustain o resistencia en intercambios breves.",
          "Less defensive burst after a committed hard-CC engage than Aftershock.",
          "Menos defensa explosiva tras iniciar con control fuerte que Réplicas.",
        ),
      ),
      page(
        `${champion.toLowerCase()}-${champion === "Malphite" ? "comet-poke" : "aftershock"}`,
        champion === "Malphite" ? "Q poke and lane mana" : "Hard-CC engage",
        champion === "Malphite" ? "Hostigamiento de Q y maná de línea" : "Iniciación con control fuerte",
        champion === "Malphite" ? 8200 : 8400,
        champion === "Malphite" ? [8229, 8226, 8210, 8237] : [8439, 8463, 8473, 8451],
        champion === "Malphite" ? 8000 : 8000,
        champion === "Malphite" ? [8009, 8014] : [9111, 9105],
        [5008, 5001, 5013],
        detail(
          champion === "Malphite"
            ? "Arcane Comet adds ranged Q poke; Q's slow makes its comet more likely to hit, while Manaflow and Presence of Mind support repeated lane casts."
            : "Aftershock gives a defensive window after hard crowd control; Resolve minor runes support the entry.",
          champion === "Malphite"
            ? "Cometa añade hostigamiento de Q a distancia; la ralentización de Q facilita acertar el cometa, mientras Banda de maná y Presencia de ánimo apoyan lanzamientos repetidos en línea."
            : "Réplicas brinda una ventana defensiva tras control fuerte; las runas menores de Valor apoyan la entrada.",
          champion === "Malphite"
            ? "Choose into ranged lanes where Grasp procs are hard to reach and Q poke can safely chip the opponent."
            : "Choose when you can reliably immobilize the target and want durability for the return trade.",
          champion === "Malphite"
            ? "Elígela contra líneas a distancia donde cueste activar Agarre y puedas desgastar con Q sin exponerte."
            : "Elígela cuando puedas inmovilizar al objetivo de forma fiable y quieras resistir el intercambio de vuelta.",
          champion === "Malphite"
            ? "Less melee trade sustain and close-range durability than Grasp; Q costs mana and poke alone does not secure the lane."
            : "Less lane sustain than Grasp; without hard crowd control at the right moment its keystone does not trigger.",
          champion === "Malphite"
            ? "Menos sustain en intercambios cuerpo a cuerpo y resistencia cercana que Agarre; Q cuesta maná y el hostigamiento no asegura la línea por sí solo."
            : "Menos sustain de línea que Agarre; sin control fuerte en el momento adecuado, la clave no se activa.",
        ),
      ),
    ];
  };
  const tankSpec = (champion: string, coreIds: string[], mrItem: string, notes: SetupText) => {
    const core = coreIds.map((id, index) =>
      item(
        id,
        detail(
          index === 0
            ? "This first completion gives a stable tank baseline for lane and teamfight entry."
            : "This second completion follows the first with the resistance or mobility the enemy damage mix requires.",
          index === 0
            ? "Esta primera finalización ofrece una base estable de tanque para la línea e iniciar peleas."
            : "Esta segunda finalización sigue a la primera con la resistencia o movilidad que exige el daño rival.",
          index === 0
            ? "Build after the lane start; use the first base to commit to this route."
            : "Buy after the first core item when the matching threat is present.",
          index === 0
            ? "Complétalo tras el inicio de línea; decide esta ruta en tu primera vuelta a base."
            : "Cómpralo después del primer núcleo si aparece la amenaza correspondiente.",
          index === 0
            ? "This delays a matchup-specific resistance item; adjust the second purchase to lane damage."
            : "Costs gold that could go to the other resistance type; do not complete it into the wrong threat.",
          index === 0
            ? "Retrasa resistencia específica del enfrentamiento; ajusta la segunda compra al daño de línea."
            : "Cuesta oro que podría ir a otra resistencia; no lo completes ante la amenaza equivocada.",
        ),
      ),
    );
    const situational = [
      item(
        mrItem,
        detail(
          "Magic resistance helps against repeated magic damage; choose the finished item by whether the threat is burst or sustained.",
          "La resistencia mágica ayuda contra daño mágico repetido; elige el objeto completo según sea burst o daño sostenido.",
          "Buy the resistance component on an early base if magic damage is already deciding trades; finish after your first core item.",
          "Compra el componente de resistencia en una vuelta temprana si la magia ya decide intercambios; complétalo tras el primer núcleo.",
          "Delays armor or health; skip into physical-heavy threats.",
          "Retrasa armadura o vida; omítelo ante amenazas físicas.",
        ),
      ),
      item(
        "3076",
        detail(
          "Bramble Vest applies Grievous Wounds when an enemy champion's basic attack hits you; armor helps against physical attackers.",
          "Chaleco de zarzas aplica Heridas graves cuando un campeón enemigo te golpea con un ataque básico; la armadura ayuda contra atacantes físicos.",
          "Buy the component early only against a healing physical attacker who must basic attack you; upgrade to Thornmail later if healing remains decisive.",
          "Compra pronto el componente solo contra un atacante físico con curación que deba golpearte con básicos; mejora a Malla de espinas después si la curación sigue decidiendo.",
          "It does not trigger from every spell hit and delays your normal tank path; do not buy it against healing alone if the target will not hit you.",
          "No se activa con cualquier hechizo y retrasa la ruta de tanque; no lo compres solo por curación si el objetivo no te golpeará.",
        ),
      ),
    ];
    return makeSpecialist(
      tank,
      champion,
      `tank-top-${champion.toLowerCase()}`,
      `${champion}: top tank`,
      `${champion}: tanque superior`,
      tankPages(champion),
      core,
      situational,
      notes,
    );
  };
  profiles.push(
    tankSpec(
      "Malphite",
      ["3068", "6664"],
      "2504",
      txt(
        "Grasp is the pre-6 lane page; Aftershock is available only after level 6 R can knock up. Q slows and E attack-speed slow do not trigger it.",
        "Agarre es la página de línea antes del nivel 6; Réplicas solo está disponible cuando R puede derribar. La ralentización de Q y la reducción de velocidad de ataque de E no la activan.",
      ),
    ),
  );
  profiles.push(
    tankSpec(
      "Ornn",
      ["6662", "6664"],
      "2504",
      txt(
        "Ornn can trigger Aftershock with his knock-up/knockback control; Grasp is for repeated lane trades. Build armor or magic resistance for the actual threat.",
        "Ornn puede activar Réplicas con sus derribos y desplazamientos; Agarre es para intercambios repetidos. Compra armadura o resistencia mágica según la amenaza real.",
      ),
    ),
  );
  profiles.push(
    tankSpec(
      "Sion",
      ["3068", "6664"],
      "4401",
      txt(
        "Grasp supports lane trades; Aftershock is for a committed Q or R crowd-control entry. His charged Q can be interrupted, so it is not automatic protection.",
        "Agarre apoya intercambios de línea; Réplicas sirve para entrar con control de Q o R. Su Q cargada puede interrumpirse, así que no garantiza protección.",
      ),
    ),
  );
  profiles.push(
    tankSpec(
      "Shen",
      ["6662", "3068"],
      "4401",
      txt(
        "Grasp rewards short trades around Q; Aftershock fits E taunt engage. Keep the second purchase responsive to the enemy damage mix.",
        "Agarre recompensa intercambios breves con Q; Réplicas encaja con la provocación de E. Ajusta la segunda compra al daño rival.",
      ),
    ),
  );

  // Four bottom-lane attack patterns; pages and item order are no longer shared across unlike kits.
  const adc = getBase("adc-crit");
  const precisionPage = (
    id: string,
    key: number,
    title: string,
    titleEs: string,
    when: string,
    whenEs: string,
    cost: string,
    costEs: string,
  ) =>
    page(
      id,
      title,
      titleEs,
      8000,
      key === 8008 ? [8008, 9111, 9104, 8014] : key === 8005 ? [8005, 9111, 9104, 8014] : [8021, 9111, 9104, 8014],
      8400,
      [8444, 8451],
      [5005, 5008, 5013],
      detail(
        key === 8008
          ? "Lethal Tempo ramps attack speed during continued attacks, matching carries that can keep firing through a protected window."
          : key === 8005
            ? "Press the Attack rewards landing three consecutive attacks on the same champion, making focused trades more valuable."
            : "Fleet Footwork builds charge through movement and attacks, then heals and grants a brief movement burst to reposition after poke.",
        key === 8008
          ? "Ritmo letal acumula velocidad de ataque durante ataques continuos, acorde con carries que pueden seguir disparando bajo protección."
          : key === 8005
            ? "Ataque intensificado recompensa conectar tres ataques consecutivos al mismo campeón y mejora intercambios enfocados."
            : "Juego de pies acumula carga al moverse y atacar; luego cura y da una breve aceleración para reposicionarse tras el hostigamiento.",
        when,
        whenEs,
        cost,
        costEs,
      ),
    );
  const dhJhin = page(
    "jhin-dark-harvest",
    "Burst and cleanup",
    "Burst y remate",
    8100,
    [8128, 8139, 8137, 8106],
    8000,
    [9104, 8014],
    [5008, 5008, 5013],
    detail(
      "Dark Harvest can trigger on low-health champions and refresh after a takedown, fitting Jhin's long-range follow-up shots.",
      "Cosecha oscura puede activarse contra campeones con poca vida y reiniciarse tras una baja, acorde con los disparos de seguimiento a distancia de Jhin.",
      "Choose when you can land W/R follow-up and convert picks into takedowns.",
      "Elígela si puedes seguir con W/R y convertir selecciones en bajas.",
      "Less lane sustain and less consistent value than Fleet when fights do not produce resets.",
      "Menos sustain en línea y valor menos constante que Juego de pies si no hay bajas.",
    ),
  );
  const adcSpec = (
    champion: string,
    runes: [SetupRunePage, SetupRunePage],
    coreIds: string[],
    starts: SetupItemChoice[],
    situations: SetupItemChoice[],
    notes: string,
  ) => {
    const adcDefenses = [
      item(
        "3026",
        detail(
          "Guardian Angel combines armor with a delayed revival after lethal damage, buying a second chance against physical dive when allies can cover the stasis window.",
          "Ángel Guardián combina armadura con una resurrección tras daño letal y da otra oportunidad contra entradas físicas si los aliados pueden cubrir la estasis.",
          "Buy after a damage completion when physical divers repeatedly reach you and your team can protect the revival location.",
          "Cómpralo tras una compra de daño cuando iniciadores físicos te alcancen repetidamente y el equipo pueda proteger el lugar de resurrección.",
          "It delays damage and is weak when enemies can wait out or immediately refocus the revival.",
          "Retrasa daño y es débil si los rivales pueden esperar o volver a enfocarte al resucitar.",
        ),
      ),
      item(
        "3140",
        detail(
          "Quicksilver Sash removes suppression and most removable crowd control, but not airborne effects.",
          "Fajín de Mercurio elimina supresiones y la mayoría de controles eliminables, pero no efectos por el aire.",
          "Buy the component early when a specific suppression or eligible stun/root repeatedly catches you before you can reposition.",
          "Compra el componente pronto cuando una supresión o aturdimiento/inmovilización elegible te atrape repetidamente antes de reposicionarte.",
          "Costs damage tempo and does not answer knock-ups, knockbacks or ordinary poke; complete an upgrade only if the threat remains decisive.",
          "Cuesta ritmo de daño y no responde a derribos, desplazamientos ni hostigamiento; completa una mejora solo si la amenaza sigue siendo decisiva.",
        ),
      ),
    ];
    const notesEs: Record<string, string> = {
      Jhin: "La recarga y el cuarto disparo de Jhin no aprovechan el efecto de impactos repetidos de Kraken como compra predeterminada. Juego de pies da sustain y reposición; Cosecha oscura apoya el burst y los remates. Núcleo: Coleccionista y luego Filo infinito para abrir con crítico y letalidad.",
      Jinx: "La minigun de Jinx premia ataques repetidos; el tercer impacto de Kraken encaja con ese patrón. Completa Kraken y luego Filo infinito. Usa el lanzacohetes para intercambiar alcance y no trates la velocidad de ataque como respuesta universal a toda pelea.",
      Ashe: "Los ataques y ralentizaciones repetidos de Ashe apoyan Ritmo letal; Juego de pies es la alternativa segura en línea. Kraken y luego Filo infinito forman una ruta física sostenida; su utilidad viene de las ralentizaciones y la definitiva, no de un plan genérico de burst.",
      MissFortune:
        "Los rebotes de Q y la canalización de R de Miss Fortune premian daño de línea y daño de ataque más que un núcleo genérico de velocidad de ataque. Coleccionista y luego Filo infinito enfatizan burst físico y crítico; Cometa apoya hostigamiento con Q/R y Ataque intensificado apoya ataques enfocados.",
    };
    const built = makeSpecialist(
      adc,
      champion,
      `adc-${champion.toLowerCase()}`,
      `${champion}: bot carry`,
      `${champion}: carry inferior`,
      runes,
      coreIds.map((id, index) =>
        item(
          id,
          detail(
            index === 0
              ? "This first damage item supports the champion's attack pattern and provides a clear default route."
              : "This completion adds the next crit/utility step to the same route.",
            index === 0
              ? "Esta primera compra de daño apoya el patrón de ataque del campeón y define una ruta predeterminada."
              : "Esta finalización añade el siguiente paso de crítico o utilidad de la misma ruta.",
            index === 0
              ? "Complete first when you can farm safely; buy components on normal recall timing."
              : "Complete second after the first item unless a situational defense must come first.",
            index === 0
              ? "Complétalo primero si puedes farmear con seguridad; compra componentes en una vuelta normal."
              : "Complétalo segundo tras el primero, salvo que una defensa situacional deba adelantarse.",
            index === 0
              ? "Delays defensive answers; avoid forcing fights before the completion."
              : "Delays situational defense; do not stack alternative first-item paths.",
            index === 0
              ? "Retrasa respuestas defensivas; evita forzar peleas antes de completarlo."
              : "Retrasa defensa situacional; no acumules rutas alternativas de primer objeto.",
          ),
        ),
      ),
      [...situations, ...adcDefenses],
      txt(notes, notesEs[champion]!),
    );
    built.starts = starts;
    return built;
  };
  const blade = item(
    "1055",
    detail(
      "Doran's Blade gives attack damage, health and omnivamp for last-hits and trades.",
      "Espada de Doran ofrece daño, vida y omnivampirismo para últimos golpes e intercambios.",
      "Use when you can contest the wave and trade back.",
      "Úsala si puedes disputar la oleada y responder al intercambio.",
      "Less health and recovery than Shield; does not reduce incoming poke.",
      "Menos vida y recuperación que Escudo; no reduce el hostigamiento recibido.",
    ),
  );
  const shield = item(
    "1054",
    detail(
      "Doran's Shield adds health and restores health after champion damage over time.",
      "Escudo de Doran añade vida y la restaura tras recibir daño de campeones.",
      "Choose into repeated poke that prevents safe last-hits; pair it with cautious ranged trades.",
      "Elígelo ante hostigamiento repetido que impide farmear; acompáñalo de intercambios a distancia prudentes.",
      "Less attack damage and lane sustain from attacking than Blade; it does not make bad trades safe.",
      "Menos daño de ataque y sustain al atacar que Espada; no vuelve seguros los malos intercambios.",
    ),
  );
  const longsword = item(
    "1055",
    detail(
      "Doran's Blade gives the carry early attack damage and health.",
      "Espada de Doran ofrece daño de ataque y vida al carry.",
      "Default when the lane is playable and you can trade through the wave.",
      "Predeterminado si la línea es jugable y puedes intercambiar entre oleadas.",
      "Less protection than Shield into repeated poke.",
      "Menos protección que Escudo ante hostigamiento repetido.",
    ),
  );
  const penetration = item(
    "3036",
    detail(
      "Lord Dominik's Regards gives percent armor penetration for physical attacks and critical damage.",
      "Recuerdos de Lord Dominik ofrece penetración porcentual para ataques físicos y daño crítico.",
      "Buy after your first two damage completions when armor is limiting damage to frontline champions.",
      "Cómpralo tras las dos primeras compras de daño cuando la armadura limite el daño a la primera línea.",
      "Delays attack-speed/utility choices; do not buy only because a target has high health.",
      "Retrasa velocidad de ataque/utilidad; no lo compres solo por mucha vida.",
    ),
  );
  const antiHealAdc = item(
    "3033",
    detail(
      "Mortal Reminder's Grievous Wounds applies when physical damage hits champions.",
      "Las Heridas graves de Recordatorio Mortal se aplican cuando el daño físico alcanza campeones.",
      "Buy after your first damage completion when sustained champion healing is changing fights; Jhin, Jinx, Ashe and Miss Fortune all apply it with physical attacks.",
      "Cómpralo tras la primera compra de daño si la curación sostenida cambia peleas; Jhin, Jinx, Ashe y Miss Fortune lo aplican con ataques físicos.",
      "Delays crit or defense and is mutually exclusive with Lord Dominik's Regards for percent armor penetration.",
      "Retrasa crítico o defensa y es excluyente con Recuerdos de Lord Dominik para penetración porcentual.",
    ),
  );
  profiles.push(
    adcSpec(
      "Jhin",
      [
        precisionPage(
          "jhin-fleet",
          8021,
          "Fleet and safe reload",
          "Juego de pies y recarga segura",
          "Choose into poke or when movement helps line up the next fourth shot.",
          "Elígela ante hostigamiento o si la velocidad ayuda a preparar el cuarto disparo.",
          "Less opening burst than Dark Harvest or Electrocute.",
          "Menos burst inicial que Cosecha oscura o Electrocute.",
        ),
        dhJhin,
      ],
      ["6676", "3031"],
      [shield, blade],
      [antiHealAdc, penetration],
      "Jhin's reload and fourth-shot pattern does not use Kraken Slayer's repeated-attack proc as a default. Fleet sustains and repositions; Dark Harvest supports burst cleanup. Core: Collector then Infinity Edge for a crit/lethality opening and crit scaling.",
    ),
  );
  profiles.push(
    adcSpec(
      "Jinx",
      [
        precisionPage(
          "jinx-lethal-tempo",
          8008,
          "Lethal Tempo uptime",
          "Ritmo letal sostenido",
          "Choose when you can safely ramp attacks in front-to-back fights.",
          "Elígela si puedes acumular ataques con seguridad en peleas frontales.",
          "Less lane sustain and weaker if you cannot remain in range.",
          "Menos sustain de línea y peor si no puedes mantener alcance.",
        ),
        precisionPage(
          "jinx-pta",
          8005,
          "Press the Attack lane",
          "Ataque intensificado en línea",
          "Choose for short focused trades and a clear target to hit repeatedly.",
          "Elígela para intercambios breves y un objetivo claro al que golpear repetidamente.",
          "Less payoff in long fights than Lethal Tempo.",
          "Menos valor en peleas largas que Ritmo letal.",
        ),
      ],
      ["6672", "3031"],
      [blade, shield],
      [antiHealAdc, penetration],
      "Jinx's minigun rewards repeated attacks; Kraken Slayer's third-hit proc fits that pattern. Complete Kraken Slayer then Infinity Edge. Use the rocket launcher to trade range and avoid treating attack-speed items as a universal answer to every fight.",
    ),
  );
  profiles.push(
    adcSpec(
      "Ashe",
      [
        precisionPage(
          "ashe-lethal-tempo",
          8008,
          "Lethal Tempo utility DPS",
          "Daño útil con Ritmo letal",
          "Choose when you can maintain safe basic-attack uptime and apply slows through a long fight.",
          "Elígela si puedes atacar con seguridad y aplicar ralentizaciones durante una pelea larga.",
          "Less sustain in a poke lane than Fleet.",
          "Menos sustain que Juego de pies ante hostigamiento.",
        ),
        precisionPage(
          "ashe-fleet",
          8021,
          "Fleet and lane movement",
          "Juego de pies y movimiento",
          "Choose when avoiding engage and returning a safe slow-enhanced trade matter most.",
          "Elígela si importa esquivar la entrada y devolver un intercambio seguro con ralentización.",
          "Less sustained attack payoff than Lethal Tempo.",
          "Menos ataques sostenidos que Ritmo letal.",
        ),
      ],
      ["6672", "3031"],
      [shield, blade],
      [antiHealAdc, penetration],
      "Ashe's repeated attacks and slows support Lethal Tempo; Fleet is the safer lane alternative. Kraken Slayer then Infinity Edge is a coherent sustained physical route; her utility comes from slows and ultimate, not a generic burst claim.",
    ),
  );
  const mfComet = page(
    "mf-comet",
    "Q and ultimate poke",
    "Hostigamiento con Q y definitiva",
    8200,
    [8229, 8226, 8210, 8237],
    8000,
    [9111, 8014],
    [5008, 5008, 5013],
    detail(
      "Comet adds spell poke to Q bounces and ultimate follow-up rather than rewarding attack speed alone.",
      "Cometa añade hostigamiento de hechizos a rebotes de Q y seguimiento de definitiva, no solo velocidad de ataque.",
      "Choose when lane Q poke and a prepared R channel are your plan.",
      "Elígela si tu plan es hostigar con Q y preparar una canalización de R.",
      "Less sustained auto-attack value than Press the Attack; missed Q/R windows reduce its payoff.",
      "Menos ataques sostenidos que Ataque intensificado; fallar ventanas de Q/R reduce su valor.",
    ),
  );
  profiles.push(
    adcSpec(
      "MissFortune",
      [
        precisionPage(
          "mf-pta",
          8005,
          "Focused Q and attack trades",
          "Intercambios con Q y ataques",
          "Choose when you can line up Q bounce trades and focus one target with attacks.",
          "Elígela si puedes alinear rebotes de Q y concentrar ataques en un objetivo.",
          "Less spell poke before attacks connect than Comet.",
          "Menos hostigamiento de hechizos que Cometa antes de conectar ataques.",
        ),
        mfComet,
      ],
      ["6676", "3031"],
      [blade, shield],
      [antiHealAdc, penetration],
      "Miss Fortune's Q bounce and channelled R reward lane damage and AD more than a generic attack-speed core. Collector then Infinity Edge emphasizes physical burst and crit; Comet supports Q/R poke while PTA supports focused attacks.",
    ),
  );
  const revise = (id: string, coreIds: string[], situationalIds: string[], note?: SetupText) => {
    const profile = profiles.find((entry) => entry.id === id);
    if (!profile) return;
    const existing = new Map([...profile.core, ...profile.situational].map((choice) => [choice.itemId, choice]));
    profile.core = coreIds.map(
      (itemId) =>
        existing.get(itemId) ??
        item(
          itemId,
          detail(
            `This is the next planned completion in the ${profile.title.en} route; keep the order unless a listed matchup trigger changes it.`,
            `Esta es la siguiente compra prevista en la ruta ${profile.title.es}; conserva el orden salvo que cambie una condición de enfrentamiento.`,
            `Buy after the previous core completion, then reassess the enemy damage and fight pattern.`,
            `Cómpralo tras la compra principal anterior y vuelve a evaluar el daño rival y el patrón de pelea.`,
            `It uses a full item slot and delays the situational response if bought before its trigger.`,
            `Ocupa un espacio completo y retrasa la respuesta situacional si se compra antes de su condición.`,
          ),
        ),
    );
    profile.situational = situationalIds
      .map((itemId) => existing.get(itemId))
      .filter((choice): choice is SetupItemChoice => !!choice);
    if (note) profile.championNotes = { ...(profile.championNotes ?? {}), [profile.championIds[0]!]: note };
  };
  revise(
    "tryndamere-top",
    ["6672", "6675"],
    ["3033", "3036", "3742", "3156"],
    txt(
      "Kraken Slayer's repeated-hit proc fits Tryndamere's attack window. Navori Flickerblade adds crit and reduces remaining basic-ability cooldowns on attacks, helping E spin recur; critical strikes also reduce Spinning Slash cooldown. Infinity Edge is a later crit alternative, not a forced third core. Top spells: take Flash+Teleport for the quest-upgraded shield and early map access, or Flash+Ghost for chase and accept only the delayed free quest Teleport without that shield.",
      "El efecto de impactos repetidos de Kraken encaja con la ventana de ataques de Tryndamere. Navori añade crítico y reduce enfriamientos restantes de habilidades básicas al atacar, ayudando a repetir E; los críticos también reducen el enfriamiento de Giro cortante. Filo infinito es una alternativa de crítico posterior, no un tercer núcleo obligatorio. En superior: Destello+Teleportar ofrece escudo mejorado de misión y acceso temprano al mapa; Destello+Fantasmal da persecución y acepta solo el Teleportar gratuito tardío sin ese escudo.",
    ),
  );
  revise("yorick-top", ["3078", "3161"], ["3181", "3071", "3033", "3053", "3742"]);
  revise("gwen-top", ["3115", "4633"], ["3165", "3102", "3157"]);
  revise(
    "cassiopeia-mid",
    ["3070", "6653", "3003", "3116"],
    ["3157", "3165"],
    txt(
      "Buy Tear of the Goddess (3070) as the mana component, then upgrade it into Archangel's Staff (3003) after stacking; it transforms automatically into Seraph's Embrace at 360 bonus mana, so never buy Seraph as a second item. Liandry and Rylai's support repeated poison damage and kiting. Stormraider's Surge triggers when Cassiopeia deals 25% of an enemy champion's maximum health within 3 seconds, granting movement speed and slow resistance for 3 seconds (20–10 second cooldown by level); this is a movement option, not a guaranteed response to every trade.",
      "Compra Lágrima de la diosa (3070) como componente de maná y mejórala a Bastón del arcángel (3003) tras acumular; se transforma automáticamente en Abrazo del serafín al llegar a 360 de maná adicional, así que no compres Serafín como segundo objeto. Liandry y Rylai apoyan daño repetido de veneno y kiteo. Ímpetu de Stormraider se activa al infligir el 25% de la vida máxima de un campeón enemigo en 3 segundos y otorga velocidad de movimiento y resistencia a ralentizaciones durante 3 segundos (20–10 segundos de enfriamiento según nivel); aporta movimiento, no una respuesta garantizada a cada intercambio.",
    ),
  );
  revise(
    "pyke-support",
    ["3179", "3142"],
    ["6701", "3140", "3156"],
    txt(
      "Umbral Glaive supports Pyke's lethality pick pattern and reveals/disables nearby enemy wards, matching support vision duties. Youmuu's Ghostblade adds lethality and roam speed. Avoid generic AD-health bruiser buys: Pyke's bonus health converts to AD, and his ultimate's execute scales with lethality. Edge of Night is a later pick item when a single spell shield lets you enter from fog.",
      "Filo umbrío apoya las selecciones de letalidad de Pyke y revela/desactiva guardianes enemigos cercanos, acorde con la visión de soporte. Fantasmal de Youmuu añade letalidad y velocidad para recorrer. Evita compras genéricas de luchador con vida: la vida adicional de Pyke se convierte en daño de ataque y la ejecución de su definitiva escala con letalidad. Filo de la noche es una opción posterior si un escudo de hechizo permite entrar desde la niebla.",
    ),
  );
  const trynd = profiles.find((profile) => profile.id === "tryndamere-top")!;
  trynd.core[0] = item(
    "6672",
    detail(
      "Kraken Slayer's third-attack physical damage fits Tryndamere's repeated Fury and attack pattern.",
      "El daño físico de cada tercer ataque de Kraken encaja con los ataques repetidos y la Furia de Tryndamere.",
      "Complete first when you can stay in attack range through a duel.",
      "Complétalo primero si puedes mantenerte en alcance durante un duelo.",
      "It does not provide the crit-based E cooldown reduction or Navori's basic-ability cooldown refund.",
      "No ofrece reducción de enfriamiento de E basada en críticos ni la devolución de enfriamiento básico de Navori.",
    ),
  );
  trynd.core[1] = item(
    "6675",
    detail(
      "Navori Flickerblade grants crit; critical strikes reduce Spinning Slash's remaining cooldown, and attacks refund 15% of remaining basic ability cooldowns.",
      "Navori otorga crítico; los críticos reducen el enfriamiento restante de Giro cortante y los ataques reducen un 15% los enfriamientos restantes de habilidades básicas.",
      "Complete after Kraken Slayer when repeated attacks and E mobility are central to staying on targets.",
      "Complétalo tras Kraken si los ataques repetidos y la movilidad de E son centrales para alcanzar objetivos.",
      "It is attack-speed focused and offers no health or resistance; prioritize defense if you cannot survive contact.",
      "Se centra en velocidad de ataque y no da vida ni resistencia; prioriza defensa si no sobrevives al contacto.",
    ),
  );
  const gwen = profiles.find((profile) => profile.id === "gwen-top")!;
  gwen.situational.push(
    item(
      "3102",
      detail(
        "Banshee's Veil combines AP and magic resistance with a spell shield against one enemy ability.",
        "Velo de la Banshee combina AP y resistencia mágica con un escudo que bloquea una habilidad enemiga.",
        "Buy after a component when one catch spell repeatedly prevents Gwen reaching melee range.",
        "Cómpralo tras un componente si un hechizo de captura impide repetidamente que Gwen llegue cuerpo a cuerpo.",
        "Delays sustained damage; the shield is consumed by any enemy ability, so it is not a reliable answer to repeated poke.",
        "Retrasa daño sostenido; cualquier habilidad rival consume el escudo, así que no responde a hostigamiento repetido.",
      ),
    ),
    item(
      "3157",
      detail(
        "Zhonya's Hourglass provides AP, armor and stasis for Gwen's close-range entry.",
        "Reloj de arena de Zhonya ofrece AP, armadura y estasis para la entrada cercana de Gwen.",
        "Complete after your first damage item if physical dive reaches you during Q or R follow-up.",
        "Complétalo tras tu primer objeto de daño si una entrada física te alcanza durante el seguimiento de Q o R.",
        "Delays sustained AP damage and stasis interrupts your own damage window.",
        "Retrasa daño AP sostenido y la estasis interrumpe tu ventana de daño.",
      ),
    ),
  );
  const pyke = profiles.find((profile) => profile.id === "pyke-support")!;
  pyke.situational.push(
    item(
      "3814",
      detail(
        "Edge of Night adds lethality and a spell shield that can protect Pyke from one disabling ability during a pick.",
        "Filo de la noche añade letalidad y un escudo de hechizo que puede proteger a Pyke de una habilidad incapacitante durante una selección.",
        "Buy after the vision-focused first items when one predictable projectile or spell stops your hook follow-up.",
        "Cómpralo tras los primeros objetos de visión si un proyectil o hechizo predecible detiene el seguimiento del ancla.",
        "It spends support gold on personal burst and the shield is consumed by any enemy ability; it delays team utility.",
        "Gasta oro de soporte en burst personal y cualquier habilidad rival consume el escudo; retrasa utilidad de equipo.",
      ),
    ),
  );
  const cass = profiles.find((profile) => profile.id === "cassiopeia-mid")!;
  cass.core[0] = item(
    "3070",
    detail(
      "Tear of the Goddess supplies the mana component and stacks through ability hits; it is consumed as part of Archangel's Staff.",
      "Lágrima de la diosa aporta el componente de maná y acumula con impactos de habilidades; forma parte del Bastón del arcángel.",
      "Buy on an early recall when mana limits repeated Q/E casts; upgrade into Archangel's Staff rather than occupying two final slots.",
      "Cómprala en una vuelta temprana si el maná limita Q/E repetidas; mejórala a Bastón del arcángel en vez de ocupar dos espacios finales.",
      "The component delays immediate combat stats until upgraded; do not buy another Tear after the staff.",
      "El componente retrasa estadísticas de combate hasta mejorarse; no compres otra Lágrima tras el bastón.",
    ),
  );
  cass.core[2] = item(
    "3003",
    detail(
      "Archangel's Staff is the Tear upgrade and transforms automatically into Seraph's Embrace when it reaches 360 bonus mana.",
      "Bastón del arcángel es la mejora de Lágrima y se transforma automáticamente en Abrazo del serafín al llegar a 360 de maná adicional.",
      "Complete after Tear has stacked enough to justify the AP and mana; Seraph is the automatic upgrade, not another purchase.",
      "Complétalo cuando Lágrima haya acumulado suficiente para justificar AP y maná; Serafín es una mejora automática, no otra compra.",
      "Delays a defensive or damage completion while stacking; do not list or buy Seraph as a separate core slot.",
      "Retrasa defensa o daño mientras acumula; no listes ni compres Serafín como espacio separado.",
    ),
  );
  cass.core[3] = item(
    "3116",
    detail(
      "Rylai's slows enemies hit by Cassiopeia's repeated poison and spell damage, helping her keep E range.",
      "Rylai ralentiza a los enemigos alcanzados por el veneno y daño repetido de Cassiopeia, ayudándola a mantener alcance de E.",
      "Complete after Liandry and the Archangel path when kiting and landing repeated E casts matter.",
      "Complétalo tras Liandry y la ruta de Arcángel si importan el kiteo y acertar E repetidamente.",
      "Delays penetration or a matchup defense; buy a defensive situational item first when dive is ending your uptime.",
      "Retrasa penetración o defensa de enfrentamiento; adelanta defensa situacional si las entradas terminan tu daño.",
    ),
  );
  const setCore = (profileId: string, itemIds: string[], explanations: SetupExplanation[]) => {
    const target = profiles.find((profile) => profile.id === profileId)!;
    target.core = itemIds.map((itemId, index) => item(itemId, explanations[index]!));
  };
  const setSituation = (profileId: string, itemId: string, copy: SetupExplanation) => {
    const target = profiles.find((profile) => profile.id === profileId)!;
    target.situational = target.situational.filter((choice) => choice.itemId !== itemId);
    target.situational.push(item(itemId, copy));
  };
  setCore(
    "akali-mid",
    ["4633", "3089"],
    [
      detail(
        "Riftmaker adds health and sustained AP for Akali to follow a first entry with repeated Q, passive attacks and a second E/R window.",
        "Agrietador añade vida y AP sostenido para que Akali continúe una primera entrada con Q, ataques pasivos y una segunda ventana de E/R.",
        "Complete first when the enemy composition lets you maintain melee contact after the opening burst.",
        "Complétalo primero si la composición enemiga te permite mantener contacto cuerpo a cuerpo tras el burst inicial.",
        "Less instant one-rotation damage than a burst route; avoid staying in range when hard control is ready.",
        "Menos daño inmediato de una rotación que una ruta explosiva; no permanezcas en alcance si hay control fuerte disponible.",
      ),
      detail(
        "Rabadon's Deathcap amplifies the AP inventory after Akali's sustained-fight item is complete.",
        "Sombrero mortal de Rabadon amplifica el inventario AP cuando el objeto de combate sostenido de Akali ya está completo.",
        "Complete second when you can afford the expensive AP spike and are not forced to buy defense first.",
        "Complétalo segundo si puedes pagar el pico AP costoso y no necesitas defensa antes.",
        "Adds no health or resistance; a single defensive item can be worth more when you cannot survive the approach.",
        "No añade vida ni resistencia; una defensa puede valer más si no sobrevives al acercamiento.",
      ),
    ],
  );
  setCore(
    "adc-onhit",
    ["3124", "3085"],
    [
      detail(
        "Guinsoo's Rageblade amplifies repeated on-hit attacks for Kog'Maw and Vayne; both need protected time to apply their hit patterns.",
        "Filo de furia de Guinsoo amplifica ataques repetidos con impactos de Kog'Maw y Vayne; ambos necesitan tiempo protegido para aplicarlos.",
        "Complete first when your support/team can protect attack uptime.",
        "Complétalo primero si soporte/equipo pueden proteger el tiempo de ataque.",
        "Low immediate defense and weaker value when you cannot stay in range; buy a survival item first if dive is ending every fight.",
        "Poca defensa inmediata y menos valor si no mantienes alcance; compra supervivencia primero si las entradas terminan cada pelea.",
      ),
      detail(
        "Runaan's Hurricane adds bolts to nearby targets and spreads compatible on-hit effects during grouped fights.",
        "Huracán de Runaan añade proyectiles a objetivos cercanos y reparte efectos de impacto compatibles en peleas agrupadas.",
        "Complete second when several reachable enemies make its multi-target attacks useful.",
        "Complétalo segundo si varios enemigos alcanzables hacen útiles sus ataques a múltiples objetivos.",
        "Less single-target damage than a focused attack item; effects that only track one champion do not become multi-target automatically.",
        "Menos daño a un objetivo que un objeto concentrado; los efectos que siguen a un solo campeón no se vuelven multiobjetivo automáticamente.",
      ),
    ],
  );
  const kogOnHit = profiles.find((profile) => profile.id === "adc-onhit")!;
  profiles.push(
    makeSpecialist(
      kogOnHit,
      "Vayne",
      "adc-vayne-onhit",
      "Vayne: focused on-hit carry",
      "Vayne: carry de impactos enfocados",
      kogOnHit.runes,
      [
        item(
          "3153",
          detail(
            "Blade of the Ruined King gives attack speed and on-hit current-health physical damage that helps Vayne's single-target Silver Bolts pattern against durable champions.",
            "Espada del Rey Arruinado da velocidad de ataque y daño físico al impacto según la vida actual, útil para el patrón de Silver Bolts de Vayne contra campeones resistentes.",
            "Complete first when you can safely attack the same durable target and need a focused on-hit route.",
            "Complétala primero si puedes atacar con seguridad al mismo objetivo resistente y necesitas una ruta de impactos enfocada.",
            "It offers less multi-target pressure than Kog'Maw's Runaan option and does not make Silver Bolts apply to secondary targets.",
            "Aporta menos presión multiobjetivo que la opción de Runaan de Kog'Maw y no hace que Silver Bolts se aplique a objetivos secundarios.",
          ),
        ),
        item(
          "3124",
          detail(
            "Guinsoo's Rageblade adds attack speed and on-hit damage for Vayne's repeated attacks while Silver Bolts still focus the chosen target.",
            "Espadafuria de Guinsoo añade velocidad de ataque y daño al impacto para los ataques repetidos de Vayne, mientras Silver Bolts sigue centrado en el objetivo elegido.",
            "Complete second when you can maintain a protected attack window against one target.",
            "Complétala segunda si puedes mantener una ventana protegida de ataques contra un objetivo.",
            "It needs attack uptime and gives up a crit-oriented route; do not add Runaan expecting Silver Bolts to spread.",
            "Necesita continuidad de ataques y renuncia a una ruta de crítico; no añadas Runaan esperando que Silver Bolts se propague.",
          ),
        ),
      ],
      kogOnHit.situational,
      txt(
        "Vayne's Silver Bolts require repeated hits on the same target; Runaan's bolts do not spread that target-specific stack, so this route keeps the focus on one champion.",
        "Silver Bolts de Vayne requiere impactos repetidos sobre el mismo objetivo; los proyectiles de Runaan no propagan esas acumulaciones, por eso esta ruta se centra en un campeón.",
      ),
    ),
  );
  setCore(
    "ezreal-bottom",
    ["3078", "3161"],
    [
      detail(
        "Trinity Force supports Ezreal's Q spellblade weave with attack damage, haste, health and movement.",
        "Fuerza de la Trinidad apoya el ciclo de Q con Hoja encantada de Ezreal mediante daño, aceleración, vida y movimiento.",
        "Complete first when you can safely land Mystic Shot and weave attacks after spells.",
        "Complétala primero si puedes acertar Disparo místico con seguridad e intercalar ataques tras hechizos.",
        "Does not solve heavy armor or burst by itself; do not pair it with a second spellblade item.",
        "No resuelve armadura alta ni burst por sí sola; no la combines con otro objeto de Hoja encantada.",
      ),
      detail(
        "Spear of Shojin adds health and ability haste to Ezreal's repeated Q/W/E casts after Trinity.",
        "Lanza de Shojin añade vida y aceleración para repetir Q/W/E de Ezreal tras Trinidad.",
        "Complete second when ability casts and safe range remain the damage plan.",
        "Complétala segunda si los lanzamientos y el alcance seguro siguen siendo el plan de daño.",
        "Delays armor penetration or defense; buy those first only when the trigger is already limiting your damage or survival.",
        "Retrasa penetración o defensa; adelántalas solo si ya limitan tu daño o supervivencia.",
      ),
    ],
  );
  setCore(
    "ezreal-bottom",
    ["3078", "3070", "3004", "3161"],
    [
      detail(
        "Trinity Force supports Ezreal's Q spellblade weave with attack damage, haste, health and movement.",
        "Fuerza de la Trinidad apoya el ciclo de Q con Hoja encantada de Ezreal mediante daño, aceleración, vida y movimiento.",
        "Complete first when you can safely land Mystic Shot and weave attacks after spells.",
        "Complétala primero si puedes acertar Disparo místico con seguridad e intercalar ataques tras hechizos.",
        "Does not solve heavy armor or burst by itself; do not pair it with a second spellblade item.",
        "No resuelve armadura alta ni burst por sí sola; no la combines con otro objeto de Hoja encantada.",
      ),
      detail(
        "Tear of the Goddess adds mana for Ezreal's spell-heavy lane; buy this component on an early recall and stack it while farming and poking.",
        "Lágrima de la Diosa añade maná para la línea de muchos hechizos de Ezreal; compra este componente en una vuelta temprana y acumúlalo al farmear y hostigar.",
        "Purchase Tear on an early back after starting the Trinity route, then upgrade that same Tear into Manamune when affordable.",
        "Compra Lágrima en una primera vuelta tras iniciar la ruta de Trinidad y luego mejora esa misma Lágrima a Manamune cuando puedas.",
        "This is a component progression, not an extra final inventory slot; delaying it loses mana stacking time, while buying it too early delays combat stats.",
        "Es una progresión de componente, no un espacio final adicional; retrasarla pierde tiempo de acumulación, pero comprarla demasiado pronto retrasa estadísticas de combate.",
      ),
      detail(
        "Manamune upgrades the stacked Tear into attack damage, mana and haste for repeated Ezreal spell hits; the Tear transforms into this item rather than occupying a second slot.",
        "Manamune mejora la Lágrima acumulada a daño de ataque, maná y aceleración para los impactos repetidos de Ezreal; Lágrima se transforma en este objeto y no ocupa otro espacio.",
        "Complete Manamune from the stacked Tear when its mana and repeated-spell damage fit the next base timing.",
        "Completa Manamune a partir de Lágrima acumulada cuando su maná y daño de hechizos repetidos encajen con la siguiente vuelta.",
        "The upgrade costs gold and delays penetration or defense; do not buy a second Tear after it transforms.",
        "La mejora cuesta oro y retrasa penetración o defensa; no compres otra Lágrima tras la transformación.",
      ),
      detail(
        "Spear of Shojin adds attack damage and haste after the mana progression, supporting Ezreal's repeated Q/W/E casts.",
        "Lanza de Shojin añade daño de ataque y aceleración tras la progresión de maná, apoyando los lanzamientos repetidos de Q/W/E de Ezreal.",
        "Complete after Manamune when repeated casts and safe range remain the damage plan.",
        "Complétala tras Manamune si los lanzamientos repetidos y el alcance seguro siguen siendo el plan de daño.",
        "Delays armor penetration or defense; move those ahead only when the trigger is already limiting damage or survival.",
        "Retrasa penetración o defensa; adelántalas solo cuando ya limiten daño o supervivencia.",
      ),
    ],
  );
  setCore(
    "ap-jungle-karthus",
    ["6653", "3089"],
    [
      detail(
        "Liandry's burn fits Karthus' repeated Q and area damage over a long fight.",
        "La quemadura de Liandry encaja con Q repetida y daño de área de Karthus en peleas largas.",
        "Complete first after the jungle start when your plan is camp tempo into sustained teamfight damage.",
        "Complétalo primero tras el inicio de jungla si el plan es ritmo de campamentos y daño sostenido en peleas.",
        "Less burst than a penetration purchase and no defense when an enemy reaches you.",
        "Menos burst que penetración y sin defensa si un enemigo te alcanza.",
      ),
      detail(
        "Rabadon's Deathcap adds a large AP spike and amplifies Karthus' repeated Q, area damage and global R when enemies have not yet committed to substantial magic resistance.",
        "Sombrero mortal de Rabadon aporta un gran pico de poder de habilidad y amplifica Q repetida, daño de área y R global de Karthus si los rivales aún no compran mucha resistencia mágica.",
        "Complete second when you can afford the expensive AP spike and enemy MR is still limited; replace this step with Void Staff if several enemies already have meaningful MR.",
        "Complétalo segundo si puedes pagar el costoso pico AP y la RM enemiga sigue baja; reemplaza este paso con Bastón del Vacío si varios rivales ya tienen RM relevante.",
        "It gives no defense and its value falls into early MR; do not treat Void Staff as a mandatory conditional second core item.",
        "No da defensa y pierde valor ante RM temprana; no trates Bastón del Vacío como segundo objeto condicional obligatorio.",
      ),
    ],
  );
  setSituation(
    "ap-jungle-karthus",
    "3135",
    detail(
      "Void Staff supplies magic penetration when enemy MR is reducing Karthus' Q, E and R damage.",
      "Bastón del Vacío aporta penetración mágica cuando la RM enemiga reduce el daño de Q, E y R de Karthus.",
      "Buy instead of the Rabadon's second core step when multiple enemies have completed meaningful magic resistance; a small component alone is not enough reason to rush it.",
      "Cómpralo en lugar del segundo paso de Rabadon cuando varios rivales hayan completado resistencia mágica relevante; un componente pequeño no basta para adelantarlo.",
      "It gives less AP amplification than Rabadon's against low-MR targets and delays defense or utility.",
      "Aporta menos amplificación AP que Rabadon contra objetivos con poca RM y retrasa defensa o utilidad.",
    ),
  );
  setCore(
    "mage-support",
    ["6653", "4628"],
    [
      detail(
        "Liandry's burn rewards Brand, Xerath and Zyra when repeated spells can tag durable enemies, but support income makes its completion a deliberate damage investment.",
        "La quemadura de Liandry recompensa a Brand, Xerath y Zyra cuando hechizos repetidos alcanzan rivales resistentes, pero completarlo usa ingresos de soporte en daño.",
        "Complete first only after the support quest is progressing and vision remains covered; buy components toward it when lane pressure allows.",
        "Complétalo primero solo si la misión de soporte progresa y la visión sigue cubierta; compra componentes cuando la presión lo permita.",
        "It delays team utility and costs more gold than a utility route; do not chase the completion while leaving objectives unwarded.",
        "Retrasa utilidad de equipo y cuesta más que una ruta de utilidad; no lo completes dejando objetivos sin visión.",
      ),
      detail(
        "Horizon Focus rewards long-range spell hits and amplifies the ranged poke plan after Liandry.",
        "Enfoque del horizonte recompensa impactos de hechizos lejanos y amplifica el hostigamiento tras Liandry.",
        "Complete second when the champion reliably lands spells from at least 600 range and your team can use the reveal/damage window.",
        "Complétalo segundo si el campeón acierta hechizos de al menos 600 de alcance y el equipo aprovecha la ventana de daño/visión.",
        "Another expensive damage slot that delays protection; skip if repeated dive prevents casting at range.",
        "Otro espacio costoso de daño que retrasa protección; omítelo si entradas repetidas impiden lanzar a distancia.",
      ),
    ],
  );
  setCore(
    "malphite-ap-mid",
    ["6655", "3089"],
    [
      detail(
        "Luden's Echo supports Malphite's AP Q poke and burst after R reaches a fragile target.",
        "Eco de Luden apoya el hostigamiento AP de Q y burst de Malphite tras alcanzar un objetivo frágil con R.",
        "Complete first when your team can follow the ultimate and the enemy lacks reliable disengage.",
        "Complétalo primero si el equipo sigue la definitiva y el rival carece de retirada fiable.",
        "Low durability; do not force R into a team that can disengage or kill you before follow-up.",
        "Poca resistencia; no fuerces R contra un equipo que pueda retirarse o eliminarte antes del seguimiento.",
      ),
      detail(
        "Rabadon's Deathcap amplifies the AP burst inventory after Luden's and useful components are complete.",
        "Sombrero mortal de Rabadon amplifica el inventario AP explosivo tras completar Luden y componentes útiles.",
        "Complete second only when you can afford its high cost without delaying a needed stasis or resistance answer.",
        "Complétalo segundo solo si puedes pagar su coste alto sin retrasar estasis o resistencia necesaria.",
        "Very expensive and gives no defensive margin; Zhonya is more valuable when the entry response kills you.",
        "Muy costoso y sin defensa; Zhonya vale más si la respuesta a tu entrada te elimina.",
      ),
    ],
  );
  profiles.find((profile) => profile.id === "cassiopeia-mid")!.core[1] = item(
    "6653",
    detail(
      "Liandry's burn compounds Cassiopeia's repeated Q poison and E spell damage during sustained fights.",
      "La quemadura de Liandry amplifica el veneno repetido de Q y el daño de E de Cassiopeia en peleas sostenidas.",
      "Complete after Tear on an early recall route when you can keep landing poison and spell hits.",
      "Complétalo tras Lágrima en una ruta de vuelta temprana si puedes seguir acertando veneno y hechizos.",
      "It gives less instant burst than penetration and no escape; keep Flash or Ghost to preserve casting range.",
      "Da menos burst que penetración y no ofrece escape; conserva Destello o Fantasmal para mantener alcance.",
    ),
  );
  setSituation(
    "ezreal-bottom",
    "3140",
    detail(
      "Quicksilver Sash can remove suppression and most removable crowd control, including eligible stuns and roots; it cannot remove airborne knock-ups or knockbacks.",
      "Fajín puede eliminar supresiones y la mayoría de controles eliminables, incluidos aturdimientos e inmovilizaciones elegibles; no elimina derribos ni desplazamientos por el aire.",
      "Buy the component after a specific suppression or stun/root repeatedly catches Ezreal before he can E away.",
      "Compra el componente si una supresión o aturdimiento/inmovilización atrapa repetidamente a Ezreal antes de que escape con E.",
      "Costs damage tempo and does not answer knock-ups, knockbacks or ordinary poke; finish only if the effect remains fight-defining.",
      "Cuesta ritmo de daño y no responde a derribos, desplazamientos ni hostigamiento; complétalo solo si el control sigue decidiendo peleas.",
    ),
  );
  const pykeCore = profiles.find((profile) => profile.id === "pyke-support")!;
  pykeCore.core = [
    item(
      "3179",
      detail(
        "Umbral Glaive gives Pyke lethality and reveals/disables nearby enemy wards, directly supporting support vision duty and his pick damage.",
        "Filo umbrío da letalidad y revela/desactiva guardianes enemigos cercanos, apoyando la visión de soporte y el daño de selección de Pyke.",
        "Complete first after the World Atlas quest begins when you can sweep a river or objective approach with allies nearby.",
        "Complétalo primero tras iniciar la misión de Mapamundi si puedes limpiar río o acceso a objetivo con aliados cerca.",
        "Its ward active is most valuable when used safely with team access; it delays raw burst and must not replace quest progress.",
        "Su activo de visión vale más si se usa con seguridad y apoyo; retrasa burst y no debe reemplazar el progreso de misión.",
      ),
    ),
    item(
      "3142",
      detail(
        "Youmuu's Ghostblade adds lethality and movement between fog-of-war angles for Pyke's hook and execute threat.",
        "Fantasmal de Youmuu añade letalidad y movimiento entre ángulos desde la niebla para el ancla y ejecución de Pyke.",
        "Complete second when support vision is maintained and Pyke can use the speed to create a safe roam or flank.",
        "Complétalo segundo si mantienes visión de soporte y Pyke puede usar la velocidad para recorrer o flanquear con seguridad.",
        "Uses limited support gold on personal damage; do not roam through unwarded enemy territory without lane and objective information.",
        "Usa oro limitado de soporte en daño personal; no recorras territorio enemigo sin visión ni información de líneas y objetivos.",
      ),
    ),
  ];
  setCore(
    "yorick-top",
    ["3078", "3161"],
    [
      detail(
        "Trinity Force supports Yorick's spell-weaving attacks with attack damage, health and movement.",
        "Fuerza de la Trinidad apoya los ataques entre hechizos de Yorick con daño, vida y movimiento.",
        "Complete first when you can land E or cage and safely weave Q-enhanced attacks.",
        "Complétala primero si puedes acertar E o jaula e intercalar ataques potenciados por Q con seguridad.",
        "Delays side-lane structure specialization or defenses; it is a combat route, not a required first item in every matchup.",
        "Retrasa especialización de estructuras o defensas; es una ruta de combate, no un primer objeto obligatorio en todo enfrentamiento.",
      ),
      detail(
        "Spear of Shojin adds health and basic-ability haste for repeated Q and E cycles with ghouls or Maiden pressure.",
        "Lanza de Shojin añade vida y aceleración de habilidades básicas para repetir Q y E con presión de necrófagos o Dama.",
        "Complete second after Trinity when fights and wave control reward repeated casts.",
        "Complétala segunda tras Trinidad si las peleas y el control de oleada premian lanzar habilidades repetidamente.",
        "Delays armor penetration; choose a situational anti-heal or defense first only when its trigger is already deciding lane.",
        "Retrasa penetración; adelanta anti-curación o defensa situacional solo si su condición ya decide la línea.",
      ),
    ],
  );
  setCore(
    "gwen-top",
    ["3115", "4633"],
    [
      detail(
        "Nashor's Tooth gives Gwen AP and attack speed for repeated Q stacking and passive true-damage trades.",
        "Diente de Nashor da AP y velocidad de ataque para acumular Q y repetir intercambios con daño verdadero pasivo.",
        "Complete first when you can safely farm toward AP and expect repeated melee contact.",
        "Complétalo primero si puedes farmear hacia AP con seguridad y esperas contacto cuerpo a cuerpo repetido.",
        "Less immediate protection than a defensive item; do not force sustained contact into hard disengage.",
        "Protege menos que un objeto defensivo; no fuerces contacto sostenido ante retirada fiable.",
      ),
      detail(
        "Riftmaker adds health and sustained-fight AP after Gwen's attack and Q pattern is online.",
        "Agrietador añade vida y AP para peleas sostenidas cuando el patrón de ataques y Q ya está establecido.",
        "Complete second when fights last long enough for repeated Q and R hits.",
        "Complétalo segundo si las peleas duran lo suficiente para acertar Q y R varias veces.",
        "Delays magic penetration or stasis; buy Zhonya first only when physical dive is ending every entry.",
        "Retrasa penetración mágica o estasis; adelanta Zhonya solo si una entrada física termina cada intento.",
      ),
    ],
  );
  setCore(
    "fighter-jungle",
    ["6610", "3071"],
    [
      detail(
        "Sundered Sky gives these AD melee junglers health and a strengthened first champion attack after an engage.",
        "Cielo Desgarrado da vida y un primer ataque potenciado contra campeones a estos junglas físicos cuerpo a cuerpo.",
        "Complete first when you can reach a champion reliably and use the first-hit heal/crit in a skirmish.",
        "Complétalo primero si alcanzas campeones de forma fiable y aprovechas la curación/crítico del primer golpe.",
        "It spends gold on a personal damage spike before armor or magic resistance; match the next purchase to the enemy.",
        "Gasta oro en un pico de daño personal antes de armadura o resistencia mágica; ajusta la siguiente compra al rival.",
      ),
      detail(
        "Black Cleaver adds health and haste while repeated physical damage shreds armor for your team.",
        "Cuchilla Oscura añade vida y aceleración y los golpes físicos repetidos reducen armadura para el equipo.",
        "Complete second when your attacks and abilities can stack the shred on a durable target your physical teammates can hit.",
        "Complétala segunda si ataques y habilidades acumulan reducción sobre un objetivo resistente al que tus aliados físicos puedan golpear.",
        "Less useful for a team that mostly deals magic damage or when fights end before repeated hits; it delays defenses.",
        "Aporta menos si el equipo inflige magia o las peleas acaban antes de repetir golpes; retrasa defensas.",
      ),
    ],
  );
  setSituation(
    "fighter-jungle",
    "3156",
    detail(
      "Maw of Malmortius is an AD/magic-resistance Lifeline option against concentrated magic burst.",
      "Fauces de Malmortius ofrece daño, resistencia mágica y Salvavidas ante burst mágico concentrado.",
      "Buy after Sundered Sky only when a magic burst combo repeatedly stops your entry; use its magic shield timing to survive the next engage.",
      "Cómpralo tras Cielo Desgarrado solo si un combo mágico detiene repetidamente tu entrada; usa su escudo para sobrevivir la siguiente iniciación.",
      "It conflicts with Sterak's Lifeline and delays Black Cleaver; do not combine Lifeline items.",
      "Compite con Salvavidas de Sterak y retrasa Cuchilla; no combines objetos Salvavidas.",
    ),
  );
  setCore(
    "ap-mid",
    ["6655", "3089"],
    [
      detail(
        "Luden's Echo gives a clear burst route for ranged control mages who open with a landed spell rotation.",
        "Eco de Luden ofrece una ruta explosiva para magas de control a distancia que abren con una rotación acertada.",
        "Complete first when the enemy backline is reachable and your spells can start a pick.",
        "Complétalo primero si puedes alcanzar la retaguardia y tus hechizos pueden iniciar una selección.",
        "Less repeated burn into durable frontliners; do not take this route when the team needs sustained magic damage more.",
        "Menos quemadura contra primeras líneas resistentes; no uses esta ruta si el equipo necesita más daño mágico sostenido.",
      ),
      detail(
        "Rabadon's Deathcap amplifies the AP from the completed burst item and spell components.",
        "Sombrero mortal de Rabadon amplifica el AP del objeto explosivo y componentes de hechizo.",
        "Complete second after the first AP item when you have enough gold and can safely reach the next spike.",
        "Complétalo segundo tras el primer objeto AP si tienes oro suficiente y puedes alcanzar el siguiente pico.",
        "Expensive and provides no defense; buy a survival item first if dive repeatedly interrupts casts.",
        "Costoso y sin defensa; compra supervivencia antes si las entradas interrumpen lanzamientos.",
      ),
    ],
  );
  setSituation(
    "ap-mid",
    "6653",
    detail(
      "Liandry's burn rewards repeated magic spell contact against durable frontliners.",
      "La quemadura de Liandry recompensa contacto repetido de hechizos mágicos contra primeras líneas resistentes.",
      "Choose instead of the Luden burst path when multiple enemies stack health and fights last.",
      "Elígelo en lugar de la ruta explosiva de Luden si varios enemigos acumulan vida y las peleas duran.",
      "It delays burst and should replace the first core choice rather than be added as an unexplained alternative slot.",
      "Retrasa burst y reemplaza la primera elección principal en vez de añadirse como alternativa sin orden.",
    ),
  );
  setCore(
    "assassin-mid",
    ["3142", "6698"],
    [
      detail(
        "Youmuu's Ghostblade gives lethality and out-of-combat movement for Zed, Talon and Qiyana to find a side angle.",
        "Fantasmal de Youmuu da letalidad y movimiento fuera de combate para que Zed, Talon y Qiyana encuentren un ángulo lateral.",
        "Complete first when you can leave vision and threaten isolated targets rather than hit a durable frontline.",
        "Complétalo primero si puedes salir de visión y amenazar objetivos aislados en vez de golpear una primera línea resistente.",
        "Less durability than Eclipse; do not roam without tracking the enemy response.",
        "Menos resistencia que Eclipse; no recorras el mapa sin anticipar la respuesta rival.",
      ),
      detail(
        "Profane Hydra adds lethality, haste and an active wave-clear hit for the same AD pick route.",
        "Hidra profana añade letalidad, aceleración y un impacto activo para limpiar oleadas en la misma ruta física de selección.",
        "Complete second when faster side-wave clear helps you create another fog-of-war angle.",
        "Complétala segunda si limpiar oleadas laterales más rápido ayuda a crear otro ángulo desde la niebla.",
        "Costs a slot that could be armor penetration or defense; do not force it into a teamfight-only game.",
        "Ocupa el espacio de penetración o defensa; no la fuerces en una partida solo de peleas grupales.",
      ),
    ],
  );
  setSituation(
    "assassin-mid",
    "3036",
    detail(
      "Lord Dominik's Regards is an armor-penetration branch for physical damage when armor is the actual obstacle.",
      "Recuerdos de Lord Dominik es una rama de penetración para daño físico cuando la armadura es el obstáculo real.",
      "Buy after the lethality core when multiple targets complete armor; damage from Q, autos and physical abilities applies its penetration.",
      "Cómpralo tras el núcleo de letalidad si varios objetivos completan armadura; Q, ataques y habilidades físicas aprovechan su penetración.",
      "Delays lethality and is mutually exclusive with Mortal Reminder; it does not counter healing.",
      "Retrasa letalidad y es excluyente con Recordatorio Mortal; no contrarresta curación.",
    ),
  );
  setCore(
    "ap-jg-ivern",
    ["6617", "3107"],
    [
      detail(
        "Moonstone Renewer gives AP and amplifies repeated shield and heal effects when Ivern's E and ally protection are used repeatedly.",
        "Renovador de Piedra Lunar da AP y amplifica escudos y curaciones repetidos cuando Ivern usa E y protege aliados varias veces.",
        "Complete first when you can stay near teammates and repeatedly shield during skirmishes.",
        "Complétalo primero si puedes permanecer cerca de aliados y escudar repetidamente en escaramuzas.",
        "Less immediate map-wide active value than Redemption; buy defenses first if Ivern is the target.",
        "Menos utilidad activa global inmediata que Redención; adelanta defensa si Ivern es el objetivo.",
      ),
      detail(
        "Redemption adds a ranged team heal and damage active after Ivern's repeated shield-support route.",
        "Redención añade curación y daño de equipo a distancia tras la ruta de escudos repetidos de Ivern.",
        "Complete second when your team groups around objectives and can use the timed active.",
        "Complétala segunda si el equipo se agrupa en objetivos y puede aprovechar el activo temporizado.",
        "Costs personal defense and has less value when teammates split before fights.",
        "Cuesta defensa personal y aporta menos si los aliados se separan antes de pelear.",
      ),
    ],
  );
  setCore(
    "engage-support",
    ["3190", "3109"],
    [
      detail(
        "Locket of the Iron Solari gives an engage support mixed defenses and a team shield for the response after entry.",
        "Medallón de los Solari de Hierro da defensas mixtas y un escudo de equipo para la respuesta tras iniciar.",
        "Complete first after the quest starter when your team groups and the enemy has mixed burst.",
        "Complétalo primero tras el objeto de misión si el equipo se agrupa y el rival tiene burst mixto.",
        "Spends limited support income on team defense rather than personal damage; track its active cooldown.",
        "Usa ingresos limitados de soporte en defensa de equipo y no daño personal; vigila el enfriamiento del activo.",
      ),
      detail(
        "Knight's Vow adds health and redirects some damage from a linked ally, matching a peel/engage follow-up plan.",
        "Promesa de caballero añade vida y redirige parte del daño de un aliado vinculado, acorde con proteger tras iniciar.",
        "Complete second when one carry is consistently the enemy's target and you can stay near them.",
        "Complétala segunda si un carry recibe el foco rival constantemente y puedes permanecer cerca.",
        "Only protects the linked ally and is less useful when your team splits; delays personal resistance.",
        "Solo protege al aliado vinculado y sirve menos si el equipo se separa; retrasa resistencia personal.",
      ),
    ],
  );
  setSituation(
    "engage-support",
    "6610",
    detail(
      "Sundered Sky is an optional personal combat purchase, not the support core.",
      "Cielo Desgarrado es una compra opcional de combate personal, no el núcleo del soporte.",
      "Only buy when ahead, the team already has enough utility, and you can safely hit champions.",
      "Cómpralo solo con ventaja, utilidad suficiente y contacto seguro con campeones.",
      "Spends support income that should otherwise complete quest utility, vision or team defense.",
      "Gasta ingresos que deberían completar utilidad de misión, visión o defensa de equipo.",
    ),
  );
  setSituation(
    "engage-support",
    "3071",
    detail(
      "Black Cleaver's armor shred can aid a physical-damage team, but it is not a default support item.",
      "La reducción de armadura de Cuchilla Oscura puede ayudar a un equipo físico, pero no es un objeto de soporte predeterminado.",
      "Only buy when allies deal mostly physical damage and you can apply repeated hits to durable targets.",
      "Cómprala solo si los aliados infligen mayormente daño físico y puedes conectar repetidamente contra objetivos resistentes.",
      "Expensive under support income; it delays Locket, vision and ally protection.",
      "Costosa con ingresos de soporte; retrasa Medallón, visión y protección aliada.",
    ),
  );
  setCore(
    "enchanter-support",
    ["6617", "3107"],
    [
      detail(
        "Moonstone Renewer amplifies repeated shielding and healing for enchanters who can stay near an ally.",
        "Renovador de Piedra Lunar amplifica escudos y curaciones repetidas para encantadores que permanecen cerca de un aliado.",
        "Complete first when your champion repeatedly heals or shields through lane and teamfights.",
        "Complétalo primero si el campeón cura o escuda repetidamente en línea y peleas.",
        "Less instant team-wide value than Redemption and still requires safe positioning.",
        "Menos valor global inmediato que Redención y aún requiere posición segura.",
      ),
      detail(
        "Redemption adds a ranged team heal and area damage after the shield/heal amplification purchase.",
        "Redención añade curación de equipo y daño de área a distancia tras amplificar escudos y curaciones.",
        "Complete second when your team can group around objectives and use the timed active.",
        "Complétala segunda si el equipo se agrupa en objetivos y puede aprovechar el activo temporizado.",
        "Delays Mikael's or defensive items; replace this step when one eligible crowd-control effect is deciding fights.",
        "Retrasa Mikael o defensa; reemplaza este paso si un control elegible decide las peleas.",
      ),
    ],
  );
  setCore(
    "senna-support",
    ["3179", "3071"],
    [
      detail(
        "Umbral Glaive gives Senna lethality and reveals/disables nearby enemy wards, directly supporting her vision duty.",
        "Filo umbrío da letalidad y revela/desactiva guardianes cercanos, apoyando directamente la visión de Senna.",
        "Complete first after the quest start when you can safely sweep vision on a roam or objective setup.",
        "Complétalo primero tras la misión si puedes limpiar visión con seguridad en una rotación u objetivo.",
        "Its damage is lower than a carry first item; avoid risky ward clearing without ally access.",
        "Aporta menos daño que un primer objeto de carry; no limpies guardianes con riesgo sin apoyo aliado.",
      ),
      detail(
        "Black Cleaver stacks armor reduction from Senna's physical attacks and Q damage for allied physical follow-up.",
        "Cuchilla Oscura acumula reducción de armadura con ataques físicos y daño de Q de Senna para el seguimiento físico aliado.",
        "Complete second when your team has multiple physical damage dealers and durable armor targets.",
        "Complétala segunda si el equipo tiene varios atacantes físicos y objetivos resistentes con armadura.",
        "Expensive on support income and delays team utility; do not buy for Senna's healing alone.",
        "Costosa con ingresos de soporte y retrasa utilidad; no la compres solo por la curación de Senna.",
      ),
    ],
  );
  setSituation(
    "senna-support",
    "6672",
    detail(
      "Kraken Slayer is a personal repeated-attack damage branch, not Senna's support default.",
      "Kraken es una rama personal de ataques repetidos, no el predeterminado de soporte de Senna.",
      "Only consider when far ahead, support quest and vision are on pace, and extended attacks are safe.",
      "Considéralo solo con mucha ventaja, misión y visión al día, y ataques prolongados seguros.",
      "Uses support income for damage instead of ward control or team utility.",
      "Usa ingresos de soporte en daño en vez de control de visión o utilidad de equipo.",
    ),
  );
  setCore(
    "brand-mid",
    ["6653", "3116"],
    [
      detail(
        "Liandry's burn fits Brand's passive and repeated area spell damage in sustained fights.",
        "La quemadura de Liandry encaja con la pasiva y el daño repetido de área de Brand en peleas largas.",
        "Complete first when fights let passive and spells affect multiple champions.",
        "Complétalo primero si la pasiva y los hechizos alcanzan a varios campeones.",
        "Less immediate burst than Luden's into fragile targets; choose the burst alternative only when picks happen before a sustained fight.",
        "Menos burst que Luden contra objetivos frágiles; elige la alternativa explosiva solo si las selecciones ocurren antes de una pelea larga.",
      ),
      detail(
        "Rylai's slows enemies hit by Brand's repeated spell and passive damage, helping the team follow his zone.",
        "Rylai ralentiza a quienes reciben hechizos y pasiva de Brand, ayudando al equipo a seguir su zona.",
        "Complete second when repeated hits and kiting matter more than a single target burst spike.",
        "Complétalo segundo si importan impactos repetidos y kiteo más que un pico explosivo a un objetivo.",
        "Delays magic penetration; buy a defensive option first if a diver prevents you casting.",
        "Retrasa penetración; compra defensa antes si un iniciador impide lanzar hechizos.",
      ),
    ],
  );
  setSituation(
    "brand-mid",
    "6655",
    detail(
      "Luden's Echo is the burst alternative for catching fragile targets with a landed spell rotation.",
      "Eco de Luden es la alternativa explosiva para atrapar objetivos frágiles con una rotación acertada.",
      "Choose instead of the Liandry first item when picks happen quickly and durable frontliners are not the main targets.",
      "Elígelo en lugar de Liandry si las selecciones son rápidas y las primeras líneas resistentes no son el objetivo principal.",
      "Less sustained burn and area value; do not add it as an unexplained second core purchase.",
      "Menos quemadura y valor de área; no lo añadas como segunda compra principal sin explicación.",
    ),
  );
  for (const target of profiles.filter((profile) => profile.roles.includes("JUNGLE"))) {
    target.spells = target.spells.filter(
      ({ spellIds }) => spellIds.includes("SummonerFlash") && spellIds.includes("SummonerSmite"),
    );
  }
  for (const target of profiles.filter((profile) => profile.roles.includes("TOP"))) {
    target.spells = target.spells.map((pair) => {
      if (pair.spellIds.includes("SummonerFlash") && pair.spellIds.includes("SummonerTeleport")) return flashTP;
      const combatSpell = pair.spellIds.includes("SummonerHaste") ? "Ghost" : "Ignite";
      const combatSpellEs = pair.spellIds.includes("SummonerHaste") ? "Fantasmal" : "Ignite";
      return {
        ...pair,
        tradeoff: txt(
          `Flash plus ${combatSpell} gives immediate combat pressure (${combatSpell === "Ghost" ? "chase" : "lane damage and Grievous Wounds"}), but you decline chosen Teleport's upgraded top-quest version and max-health shield; the free longer-cooldown quest Teleport arrives only after quest completion.`,
          `Destello más ${combatSpellEs} ofrece presión inmediata de combate (${combatSpell === "Ghost" ? "persecución" : "daño de línea y Heridas graves"}), pero renuncias a la versión mejorada de misión superior y al escudo de Teleportar elegido; el Teleportar gratuito de mayor enfriamiento llega solo al completar la misión.`,
        ),
      };
    });
  }
  const magicAntiHeal = (profileId: string, champion: string, damagingSpells: string) => {
    const target = profiles.find((profile) => profile.id === profileId);
    const choice = target?.situational.find((itemChoice) => itemChoice.itemId === "3165");
    if (!choice || !target) return;
    const copy = detail(
      `Morellonomicon applies Grievous Wounds when ${champion}'s magic damage hits enemy champions. ${damagingSpells} deal magic damage and can apply it.`,
      `Morellonomicon aplica Heridas graves cuando el daño mágico de ${champion} alcanza campeones enemigos. ${damagingSpells} infligen daño mágico y pueden aplicarlas.`,
      "Buy after a damage component when repeated champion healing is changing a fight; keep landing the named magic damage to refresh the effect.",
      "Cómpralo tras un componente de daño si la curación repetida cambia una pelea; sigue acertando el daño mágico indicado para renovar el efecto.",
      "Delays AP or defense and costs a full item slot; skip minor healing and do not buy it before the healing affects objective or teamfight outcomes.",
      "Retrasa AP o defensa y ocupa un espacio completo; omite curación menor y no lo compres antes de que afecte objetivos o peleas de equipo.",
    );
    target.situational = target.situational.map((entry) => (entry === choice ? item("3165", copy) : entry));
  };
  magicAntiHeal("ap-mid", "these ranged control mages", "their Q, E and ultimate spells");
  magicAntiHeal("akali-mid", "Akali", "her Q, E and ultimate spells");
  magicAntiHeal(
    "assassin-mid",
    "Zed, Talon and Qiyana",
    "their magic damage is limited; their physical abilities do not apply this item, so use only the magic damage portions",
  );
  magicAntiHeal("mage-support", "Brand, Xerath and Zyra", "their magic spells");
  magicAntiHeal("brand-mid", "Brand", "his passive and spells");
  magicAntiHeal("malphite-ap-mid", "Malphite", "his Q, E and R spells");
  magicAntiHeal("cassiopeia-mid", "Cassiopeia", "her Q, W, E and R spells");
  for (const target of profiles.filter((profile) => profile.id.startsWith("ap-jungle-"))) {
    magicAntiHeal(
      target.id,
      target.championIds[0]!,
      target.championIds[0] === "Diana"
        ? "Q, W, E and R"
        : target.championIds[0] === "Fiddlesticks"
          ? "his drain and area spells"
          : "Q, E and R",
    );
  }
  return profiles;
};

export const SETUP_PROFILES: SetupProfile[] = specializeGroups();
