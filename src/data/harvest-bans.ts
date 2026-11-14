/**
 * Regulators' rules on taking a wild food, one row per rule: which library species (src/data/species.json slugs),
 * where it applies, the regulator, its wording kept close to the page, the page itself and the date it was read.
 *
 * A row with `ban: true` is a harvest ban. Where it applies the food is never called "in season", "ready" or "coming
 * into season" (plant-presence.ts takes it out of every list under the town's name, the stored weekly guide included)
 * and the ban is printed in its place with the regulator and the source. A row with `ban: false` is a rule printed
 * beside the food where it is listed (a daily limit, closures to check); it does not change the lists.
 *
 * Why it exists (audit of 10 November 2026): mussels were "in season" at Saint John, on the Bay of Fundy, where
 * Fisheries and Oceans Canada says mussel fishing is prohibited. The land rule `bay-of-fundy-mussels`
 * (src/data/region-rules/acadian-forest.ts) printed the ban within 30 km of Saint John while the food list above it
 * still called mussels in season, and Moncton, on the bay's inner arm, got neither.
 *
 * A place is in a row's scope when it is in the country (a place that gives no country is judged by the area alone),
 * in one of the provinces or states when the row names any, and its centre lies inside the area outline when the row
 * has one. Outlines are [lat, lon] rings drawn by hand round the water a rule names, with a band of shore about 20 km
 * deep, so that a town on the shore is inside and a town on another coast is not; scripts/check-foraging.ts pins
 * which towns fall inside.
 */

export type HarvestRule = {
  id: string;
  /** Library species the rule is about. */
  species: string[];
  /** True: a harvest ban (the food is not in season where it applies). False: a rule printed beside the food. */
  ban: boolean;
  scope: {
    /** How the regulator names the area ("the Bay of Fundy"). */
    label: string;
    countryCode: string;
    /** Province or state codes or names; any. */
    admin1?: string[];
    /** The outline the place's centre must lie inside, [lat, lon] pairs. */
    area?: [number, number][];
  };
  /** Calendar months the rule applies in; every month when absent. */
  months?: number[];
  regulator: string;
  /** The rule, kept close to the regulator's wording. */
  rule: string;
  source: { label: string; url: string; /** The page's own "date modified", where it gives one. */ modified?: string };
  /** A page the rule tells the reader to check (a closures map). */
  check?: { label: string; url: string };
  /** The date the page was opened and read (ISO). */
  checked: string;
};

/** A place as the rules need it. */
export type BanPlace = { lat?: number; lon?: number; countryCode?: string; admin1?: string; admin1Code?: string };

// The Bay of Fundy's Canadian waters and tidal arms (Passamaquoddy Bay to Chignecto Bay; Shepody Bay and the Petitcodiac
// estuary up to Moncton and Dieppe; Cumberland Basin; Minas Channel, Minas Basin and Cobequid Bay to Truro; Annapolis Basin;
// out to Brier Island and Grand Manan), with a band of shore. Moncton is inside because the Petitcodiac at the city is the
// bay's tidal arm; Shediac, on the Northumberland Strait (Gulf of St. Lawrence), Fredericton, up the Saint John River, and
// Halifax, on the Atlantic, are outside.
const BAY_OF_FUNDY: [number, number][] = [
  [45.1, -67.3],
  [45.35, -67.0],
  [45.45, -66.3],
  [45.55, -65.7],
  [45.75, -65.15],
  [46.2, -64.95],
  [46.15, -64.6],
  [45.95, -64.2],
  [45.6, -63.8],
  [45.5, -63.1],
  [45.25, -63.1],
  [45.1, -63.6],
  [44.85, -63.95],
  [44.85, -64.6],
  [44.6, -65.4],
  [44.45, -65.9],
  [44.1, -66.3],
  [44.1, -66.6],
  [44.55, -66.95],
  [44.85, -67.0],
];

// DFO's Maritimes Region on the water: the Bay of Fundy and Nova Scotia's Atlantic coast to Cape North (the page's own
// scallop-licence area runs "from Cape North, Cape Breton, NS, to the Canada/US border in NB"). The Northumberland Strait
// shores of New Brunswick and Nova Scotia, Prince Edward Island and western Cape Breton face the Gulf of St. Lawrence and
// are left out.
const DFO_MARITIMES: [number, number][] = [
  [45.1, -67.3],
  [45.45, -66.8],
  [45.55, -66.0],
  [45.85, -65.2],
  [46.2, -64.95],
  [46.15, -64.6],
  [45.95, -64.2],
  [45.6, -63.8],
  [45.45, -63.0],
  [45.45, -62.2],
  [45.55, -61.4],
  [45.9, -61.1],
  [46.4, -60.9],
  [46.9, -60.6],
  [47.05, -60.4],
  [47.1, -59.0],
  [43.0, -59.0],
  [43.0, -66.3],
  [44.4, -67.1],
];

const DFO_MARITIMES_INVERTS = "https://dfo-mpo.gc.ca/fisheries-peches/recreational-recreative/maritimes/invert-eng.html";

export const HARVEST_RULES: HarvestRule[] = [
  // source: Fisheries and Oceans Canada, Maritimes Region, "Recreational fishing: invertebrates" (date modified 2026-07-02),
  //   read 11 November 2026. Mussels: "Fishing for mussels in the Bay of Fundy is prohibited." Read for the other shellfish
  //   that bear on Saint John, Moncton and Halifax: clams (bar, bay quahaug, razor, softshell: seven Clam Harvesting Areas,
  //   limits and sizes by area, CHA 7 being New Brunswick's Bay of Fundy), oysters (licence limited to existing holders) and
  //   scallops (licence) are not in the wild-food library, so they are not rows here. The page names no other ban on a
  //   library food. The scope is the whole Bay of Fundy, as the page says, not a circle round Saint John.
  {
    id: "dfo-maritimes-bay-of-fundy-mussels",
    species: ["mussels"],
    ban: true,
    scope: { label: "the Bay of Fundy", countryCode: "CA", admin1: ["NB", "New Brunswick", "NS", "Nova Scotia"], area: BAY_OF_FUNDY },
    regulator: "Fisheries and Oceans Canada, Maritimes Region",
    rule: "Fishing for mussels in the Bay of Fundy is prohibited.",
    source: { label: "Fisheries and Oceans Canada (Maritimes): recreational fishing for invertebrates", url: DFO_MARITIMES_INVERTS, modified: "2026-07-02" },
    checked: "2026-11-11",
  },
  // Same page, same reading. Mussels: seasons "vary by area" (check with DFO or the Maritimes Orders Registry); daily limit
  //   300; no licence required. Bivalve harvest areas "may be closed at any time due to dangerous bacterial and biotoxin
  //   levels"; closed areas are shown in real time on the shellfish mapping tool linked from the page. Printed where mussels
  //   are listed in the Maritimes Region outside the Bay of Fundy (Halifax).
  {
    id: "dfo-maritimes-mussels",
    species: ["mussels"],
    ban: false,
    scope: { label: "Fisheries and Oceans Canada's Maritimes Region", countryCode: "CA", admin1: ["NB", "New Brunswick", "NS", "Nova Scotia"], area: DFO_MARITIMES },
    regulator: "Fisheries and Oceans Canada, Maritimes Region",
    rule: "Mussel seasons vary by area: check with DFO or its orders registry before you harvest. The limit is 300 mussels a day, and no licence is needed. Shellfish harvest areas may be closed at any time because of dangerous bacteria or biotoxin levels.",
    source: { label: "Fisheries and Oceans Canada (Maritimes): recreational fishing for invertebrates", url: DFO_MARITIMES_INVERTS, modified: "2026-07-02" },
    check: { label: "DFO shellfish closures map", url: "https://www.dfo-mpo.gc.ca/shellfish-mollusques/cssp-map-eng.htm" },
    checked: "2026-11-11",
  },
];

/** True when the point is inside the [lat, lon] ring. */
export function insideRing(lat: number, lon: number, ring: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [ai, oi] = ring[i];
    const [aj, oj] = ring[j];
    if (oi > lon !== oj > lon && lat < ((aj - ai) * (lon - oi)) / (oj - oi) + ai) inside = !inside;
  }
  return inside;
}

/** True when the rule's place scope covers the place. */
export function ruleCovers(r: HarvestRule, place?: BanPlace | null): boolean {
  if (!place || place.lat == null || place.lon == null) return false;
  const cc = place.countryCode?.toUpperCase();
  if (cc && cc !== r.scope.countryCode) return false;
  if (r.scope.admin1 && (place.admin1 || place.admin1Code)) {
    const here = [place.admin1, place.admin1Code].filter(Boolean).map((s) => s!.toLowerCase());
    if (!r.scope.admin1.some((a) => here.includes(a.toLowerCase()))) return false;
  }
  return !r.scope.area || insideRing(place.lat, place.lon, r.scope.area);
}

const inMonth = (r: HarvestRule, month?: number) => month == null || !r.months || r.months.includes(month);

/** The bans on a species at a place (in a month, when given). */
export function bansOn(slug: string, place?: BanPlace | null, month?: number): HarvestRule[] {
  return HARVEST_RULES.filter((r) => r.ban && r.species.includes(slug) && inMonth(r, month) && ruleCovers(r, place));
}

/** The rules that are not bans, printed beside a species listed at a place. */
export function harvestNotesOn(slug: string, place?: BanPlace | null, month?: number): HarvestRule[] {
  return HARVEST_RULES.filter((r) => !r.ban && r.species.includes(slug) && inMonth(r, month) && ruleCovers(r, place));
}

/** "11 November 2026" from "2026-11-11". */
export const readOn = (iso: string): string => {
  const [y, m, d] = iso.split("-").map(Number);
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${d} ${MONTHS[m - 1]} ${y}`;
};
