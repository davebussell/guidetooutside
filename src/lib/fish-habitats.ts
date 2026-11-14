/**
 * Where each fish lives: the kinds of water (habitats), the four groups of
 * water a place's fishing page is arranged by, and each fish's habitats.
 *
 * Extracted from client module 88643 (the restored GuideLoader.jsx):
 * FISH_HABITATS is 88643 `m`, SALT is 88643 `p`, and the fallback for a fish
 * with no entry (["lake", "river"]) and the salt/both/fresh rule are the ones
 * that module applies to every fish. HABITAT_LABEL and the WATER_GROUPS titles
 * are the labels printed on the captured /fishing/<town> pages ("rocky shores ·
 * surf beaches", "The sea", "Estuaries and lagoons"…); the group habitats are
 * the ones src/lib/water-setting.ts (recovered) adds for each kind of water.
 */

/**
 * "trout-river" (Day 4 audit, 13 November 2026): a river or drain that a fisheries agency stocks with trout or calls trout
 * water, in a climate too warm for the "cold-stream" test (water-setting TROUT_WATERS). Trout were tied to small cold
 * streams and lakes, so the Boise River, which Idaho Fish and Game calls one of the finest urban trout rivers in the
 * country, and the drains beside the Rio Grande that New Mexico stocks every winter week, lost their trout. A place has
 * it only where a sourced row names the water, and a trout takes it only where the row names that trout.
 */
export type Habitat = "surf" | "rocks" | "harbour" | "offshore" | "estuary" | "big-lake" | "lake" | "pond" | "river" | "big-river" | "cold-stream" | "trout-river";

export type WaterGroup = "sea" | "estuary" | "rivers" | "lakes";

/** The salt-water habitats. A fish found only in these is a sea fish; in some of them, a fish of both waters. */
export const SALT: Habitat[] = ["surf", "rocks", "estuary", "harbour", "offshore"];

/** How each habitat is named on a fish card. */
export const HABITAT_LABEL: Record<Habitat, string> = {
  surf: "surf beaches",
  rocks: "rocky shores",
  harbour: "harbours and piers",
  offshore: "offshore",
  estuary: "estuaries",
  "big-lake": "big lakes",
  lake: "lakes and dams",
  pond: "ponds",
  river: "rivers",
  "big-river": "big rivers",
  "cold-stream": "cold streams",
  "trout-river": "trout water",
};

/** The kinds of water a place's fishing page is arranged by, in page order. */
export const WATER_GROUPS: { id: WaterGroup; title: string; habitats: Habitat[] }[] = [
  { id: "sea", title: "The sea", habitats: ["surf", "rocks", "harbour", "offshore"] },
  { id: "estuary", title: "Estuaries and lagoons", habitats: ["estuary"] },
  { id: "rivers", title: "Rivers and streams", habitats: ["river", "big-river", "cold-stream", "trout-river"] },
  { id: "lakes", title: "Lakes, dams and ponds", habitats: ["big-lake", "lake", "pond"] },
];

/** Each fish's habitats, the one it is most associated with first. */
export const FISH_HABITATS: Record<string, Habitat[]> = {
  walleye: ["big-lake", "lake", "river", "big-river"],
  "smallmouth-bass": ["big-lake", "lake", "river"],
  "largemouth-bass": ["lake", "pond", "river"],
  "northern-pike": ["big-lake", "lake", "river"],
  muskellunge: ["big-lake", "lake", "river"],
  "lake-trout": ["big-lake", "lake"],
  "brook-trout": ["cold-stream", "pond"],
  // "trout-river" only where a sourced row names the water and the trout (water-setting TROUT_WATERS, habitatsAt).
  "rainbow-trout": ["cold-stream", "trout-river", "lake"],
  "brown-trout": ["cold-stream", "trout-river", "lake"],
  "yellow-perch": ["big-lake", "lake", "pond"],
  "black-crappie": ["lake", "pond"],
  bluegill: ["lake", "pond"],
  "channel-catfish": ["river", "big-river", "lake", "pond"],
  "chinook-salmon": ["big-lake", "river", "big-river", "offshore", "harbour"],
  "coho-salmon": ["big-lake", "river", "offshore", "harbour"],
  steelhead: ["river", "cold-stream", "big-lake"],
  "atlantic-salmon": ["cold-stream", "estuary"],
  "striped-bass": ["surf", "rocks", "estuary", "big-river"],
  "arctic-grayling": ["cold-stream", "lake"],
  "lake-whitefish": ["big-lake", "lake"],
  burbot: ["big-lake", "lake", "river"],
  redfish: ["estuary", "surf", "harbour"],
  "speckled-trout": ["estuary", "surf"],
  snook: ["estuary", "surf", "harbour"],
  halibut: ["offshore"],
  lingcod: ["rocks", "offshore"],
  kokanee: ["lake"],
  "european-perch": ["lake", "pond", "river", "big-lake"],
  zander: ["big-lake", "lake", "river", "big-river"],
  "common-carp": ["lake", "pond", "river", "big-river"],
  tench: ["lake", "pond"],
  roach: ["lake", "pond", "river"],
  "common-bream": ["lake", "river", "big-river"],
  barbel: ["river", "big-river"],
  chub: ["river", "cold-stream"],
  "european-grayling": ["cold-stream"],
  "arctic-char": ["lake", "big-lake", "cold-stream"],
  "wels-catfish": ["big-river", "river", "lake"],
  "european-whitefish": ["big-lake", "lake"],
  "european-sea-bass": ["surf", "rocks", "estuary", "harbour"],
  "gilthead-seabream": ["estuary", "harbour", "surf", "rocks"],
  "atlantic-mackerel": ["harbour", "rocks", "offshore"],
  pollack: ["rocks", "offshore", "harbour"],
  "atlantic-cod": ["offshore", "rocks", "harbour"],
  "european-eel": ["river", "lake", "estuary", "pond"],
  "nile-perch": ["big-lake", "big-river", "lake"],
  "nile-tilapia": ["big-lake", "lake", "pond", "river"],
  "mozambique-tilapia": ["lake", "pond", "river", "estuary"],
  tigerfish: ["big-river", "river", "big-lake", "lake"],
  "goliath-tigerfish": ["big-river"],
  "sharptooth-catfish": ["river", "lake", "pond", "big-river"],
  vundu: ["big-river", "big-lake"],
  "smallmouth-yellowfish": ["river", "lake"],
  "largemouth-yellowfish": ["river", "big-river"],
  "dusky-kob": ["estuary", "surf"],
  galjoen: ["rocks", "surf"],
  snoek: ["offshore"],
  "yellowtail-amberjack": ["offshore", "rocks"],
  "giant-trevally": ["surf", "rocks", "offshore", "estuary"],
  "african-threadfin": ["surf", "estuary"],
  bluefish: ["surf", "rocks", "estuary", "harbour"],
  "white-steenbras": ["surf", "estuary"],
  "hottentot-seabream": ["rocks", "offshore"],
  "white-musselcracker": ["rocks", "surf"],
  leerfish: ["estuary", "surf", "rocks"],
  "spotted-grunter": ["estuary", "surf"],
  "white-seabream": ["rocks", "surf", "harbour"],
  "red-roman": ["offshore", "rocks"],
  "cape-kurper": ["cold-stream", "river"],
  "common-dentex": ["rocks", "offshore"],
  "flathead-grey-mullet": ["harbour", "estuary", "surf"],
  garfish: ["harbour", "rocks", "surf"],
  "ballan-wrasse": ["rocks", "harbour"],
  "black-seabream": ["rocks", "offshore", "harbour"],
  "european-flounder": ["estuary", "surf", "harbour"],
  "great-barracuda": ["offshore", "rocks", "harbour"],
  // No "river" (audit of 10 November 2026, 11 November): tarpon's records near Houston and Brownsville are all bay and
  // lagoon records 30 to 60 km out (Texas City, Galveston, the Laguna Madre), and the "river" habitat put them in the
  // bayous' and the Rio Grande's sections. A river mouth is the estuary section's water.
  "atlantic-tarpon": ["estuary", "surf", "harbour"],
  "narrow-barred-spanish-mackerel": ["offshore"],
  "crevalle-jack": ["surf", "estuary", "harbour", "rocks"],
  "west-african-ladyfish": ["estuary", "surf", "harbour"],
  "blackchin-tilapia": ["estuary"],
  "cassava-croaker": ["offshore", "surf"],
  "gorean-snapper": ["rocks", "offshore", "harbour", "estuary"],
  "silver-catfish": ["estuary", "river", "big-river", "lake"],
  milkfish: ["estuary", "harbour", "surf"],
  "mangrove-red-snapper": ["estuary", "rocks", "harbour", "offshore"],
  "talang-queenfish": ["offshore", "surf", "estuary", "harbour"],
  "spangled-emperor": ["offshore", "rocks"],};

/** A fish's habitats; a fish with no entry is taken as a lake and river fish. */
export const habitatsOf = (slug: string): Habitat[] => FISH_HABITATS[slug] ?? ["lake", "river"];

/** "salt" when every habitat is salt water, "both" when some are, "fresh" when none are. */
export function waterOf(slug: string): "salt" | "both" | "fresh" {
  const h = habitatsOf(slug);
  const salt = h.filter((x) => SALT.includes(x)).length;
  return salt === h.length ? "salt" : salt ? "both" : "fresh";
}

/** A fish only found in salt water — only offered to places near the sea. */
export const seaOnly = (slug: string) => waterOf(slug) === "salt";

/** The water groups a fish belongs to. */
export const groupsOf = (slug: string): WaterGroup[] => {
  const h = habitatsOf(slug);
  return WATER_GROUPS.filter((g) => g.habitats.some((x) => h.includes(x))).map((g) => g.id);
};
