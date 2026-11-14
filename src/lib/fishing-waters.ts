/**
 * The fishing of a place, water by water: the sea, the estuaries, the rivers
 * and the lakes and dams — each one shown only where the place has it, with
 * the fish of that water in season now, the rest of its fish in season, and
 * the ones whose season is another time of year.
 *
 * Round 2 (agent C, 14 October 2026): given the place, the list honours the
 * records' country and box rules (L7) and the regulator's closed seasons
 * (L8): a fish that the library calls active but the regulator has closed is
 * never deleted and never leads — it moves to the section's `closed` list
 * with "Closed season until 30 November — Ontario MNRF (FMZ 20)" on it. The
 * section also names its waters with the flags from water-setting (L13), and
 * says `avoid` when every named water of the kind is one to stay away from,
 * so the page and the guide writer stop treating a sewage works or a
 * drinking-water reservoir as a fishery.
 *
 * Accuracy audit (2 November 2026): a fish is listed as in season only when it
 * has been RECORDED near the town (src/lib/fish-presence.ts, GBIF records
 * inside 60 km). The region's other fish are named, with no months and no
 * tactic, as "Regional species, not checked near here" (`unchecked`); fish
 * with no record at a town with plenty of fish records are not shown. Where a
 * closed-season row names the fish at the place, the regulator's season
 * decides whether it is in season (`basis: "regulator"`); everywhere else the
 * months are the library's typical angling months, not legal seasons
 * (`basis: "typical"`). Salt-water wording (`tacticSea`, `whereSea`) is used
 * only in the sea and estuary sections.
 *
 * Audit of 10 November 2026 (fish package fixes, 11 November):
 *  - A sea or sea-run fish is in season only in the months its records near
 *    the town bear out (`seasonHere`, fish-presence monthsRecorded), unless the
 *    months are a fisheries agency's own for the place (LOCAL_MONTHS) or a cited
 *    region's (`monthsByRegion`). The library's months are the union of every
 *    region's: Atlantic cod's "Oct-Apr" (Norway and the UK) put cod in season
 *    in November at the five coastal Acadian towns, Boston and New York; bluefish
 *    "Jun-Mar" in the north; flathead grey mullet and tarpon all year. A fish
 *    recorded near the town whose records bear out none of its months is listed
 *    apart (`undated`), with its evidence and no season.
 *  - A regulator's catch-and-release-only days (`noKeep` on a closed-season
 *    row) are not in season: the fish sits with the closed ones, its note says
 *    "Catch and release only until 1 September" and names the regulator
 *    (Boston's cod, kept only 1 September to 31 October in 2026).
 *  - Alternative names are printed only in the regions that use them
 *    (`localName`): "Bluefish (elf, shad)" read on North American pages, where
 *    shad is another fish.
 *
 * Follow-ups to the water and fish fixes (audit of 10 November 2026, 11 November):
 *  - A town on a tidal estuary (`water.tidal`, kind "estuary") read "The Patapsco River, and the river mouths along
 *    the shore." The estuary line now names the reach and says what its source in water-setting.ts TIDAL_REACHES says,
 *    in the overview's words (place-profile `waterLines`).
 *  - Moncton, Savannah and Jacksonville stand 10 to 30 km from the open coast, yet the sea section said "The coast is
 *    within about 30 km" under the title "The sea" and its cards were tagged "surf beaches · rocky shores" as if at the
 *    town. Where the open coast is 10 to 30 km away the section is titled so (`away`), and the tags say it
 *    (`habitatTags`); only the sea section ever carries surf or rock tags, never a tidal river or an estuary.
 *  - The Day page (src/lib/rhythm.ts) and the guide's fallback list (src/lib/guide-rules.ts) used the library's
 *    months and ignored catch-and-release days, so 188 town, date and fish entries disagreed with this page
 *    (striped bass "active" at Moncton and Portland in November). Both now ask `inSeasonOnPage`, which is this page's
 *    own test (`placeFish`): records' months, closed rows and `noKeep` rows, water by water.
 *
 * Day 3 audit (Appalachian, Central Hardwoods and Gulf Coast towns, 11 November 2026):
 *  - A fish counts as sea-run only where the town has sea or estuary water (`marineAt`). Little Rock's striped bass, in
 *    the dammed Arkansas River far above tidewater, took sea tactics and a one-month season from its records; inland, a
 *    fish with fresh-water months in the library (`monthsFresh`, striped bass) takes them, with their source, and its
 *    base tactic is the fresh-water one.
 *  - A fresh-water fish's months widen where the town's own records clearly show it in more months (`widenedByRecords`):
 *    Houston's largemouth bass read "Apr–Oct" with 89 November and 88 January records. The card names the months added
 *    and says they come from the records.
 *  - Stocked winter trout take the stocking agency's months where its page says so (LOCAL_MONTHS: Missouri's St. Louis
 *    urban lakes, Arkansas's community ponds, Tennessee's winter programme), scoped to the town where the state also has
 *    year-round trout water.
 *  - A fish whose latest record near the town is older than 2006 is listed with its evidence and no season (`undated`,
 *    why "old"): Pittsburgh's striped bass rest on 148 rows, none since 2004.
 *  - Fish-consumption advisories (src/data/fish-advisories.ts) are printed with the section and beside each fish they
 *    name (`advisoriesFor`): Pittsburgh's three rivers, the Mississippi at St. Louis, the Houston Ship Channel.
 *  - A great river formed at a confluence is named whole in the rivers line (Pittsburgh: the Allegheny, the Monongahela
 *    and the Ohio), and a named river that is one of them is not listed twice ("the Rio Grande and Rio Grande").
 *  - Brownsville's estuary line named the Rio Grande as the tidal water; its salt water is the Lower Laguna Madre and the
 *    ship channel, 10 to 30 km out (water-setting TIDAL_REACHES `away`), and the section says so in its title and tags.
 *  - Where the map look-up failed, the rivers and lakes lines say the list of named waters did not load.
 *
 * Day 4 audit (Florida Peninsula, Deserts and Mediterranean California towns, 13 November 2026):
 *  - Trout lived only in small cold streams and lakes, so the Boise River (wild and stocked rainbow and brown trout) and
 *    Albuquerque's winter-stocked drains beside the Rio Grande showed none. An agency's trout water (water-setting
 *    TROUT_WATERS) gives the trout it names a place in the rivers section, with the agency's note, and a trout it names in
 *    the river alone is not filed under the ponds of a warm town (`habitatsAt`).
 *  - Agency months: New Mexico's winter stocking (November to March) at Albuquerque, Idaho's year-round Boise River trout,
 *    and California's 2026 fall-run Chinook season at Sacramento (16 July to 16 December), each for the waters its page
 *    names (LOCAL_MONTHS `water`).
 *  - A fish's text for a region (creatures.json `byRegion`): striped bass in California take CDFW's waters, methods and
 *    spring river months, not "Live eels … into a blitz", "on the Atlantic" or Florida's FWC months.
 *  - A river a source calls dry or concrete is named with that reason (water-setting URBAN_DRAINS): the Los Angeles River.
 */
import { FISH, creatureAt, getCreature, inLocalMonths, orderCreatures, type Creature, type PlaceLike } from "./nature";
import { PRESENCE_METHOD, monthsRecorded, presentFish, recordedNote, tooOldForSeason } from "./fish-presence";
import { HABITAT_LABEL, WATER_GROUPS, habitatsOf, waterOf, type Habitat, type WaterGroup } from "./fish-habitats";
import {
  closingLabel,
  closingSoon,
  closureLabel,
  closureOf,
  dayAfter,
  dayKey,
  dayWords,
  inRange,
  jurisdictionNotes,
  monthTouches,
  monthWithin,
  rulesFor,
  monthClosure,
  monthsLessClosed,
  openWords,
  regulatorFor,
  rulesNaming,
  type ClosedSeason,
  type Closure,
  type ClosedRange,
  type PlaceScope,
  type RegulatorInfo,
} from "./closed-seasons";
import { lakeName, riverName } from "./water-names";
import { shortMonthRange } from "./month-range";
import { isCodedWaterName } from "./guide-check";
import { habitatsAt, waterSetting, type FishingWater, type WaterSetting } from "./water-setting";
import { bigRiverNames, riverKey } from "./place-profile";
import { FISH_ADVISORIES, type FishAdvisory } from "@/data/fish-advisories";
import { rangeGap } from "./fish-range-gaps";

/** A fish-consumption advisory as the page prints it (src/data/fish-advisories.ts). */
export type AdvisoryNote = Pick<FishAdvisory, "id" | "fish" | "waters" | "advice" | "who" | "contaminant" | "agency" | "source" | "checked"> & {
  /** The library fish it names here ("*" rows name every fish). */
  species: string[];
};

/** A closed season as the page prints it on a fish. */
export type ClosureNote = {
  /** "Closed season until 30 November — Ontario MNRF (FMZ 20)" or "Closes 15 October until the last day of February — DFFE (…)". */
  label: string;
  /** Closed on the day asked (or the whole month); false when it closes later in the month. */
  closedNow: boolean;
  until: string;
  from: string;
  allYear: boolean;
  regulator: string;
  source: string;
  note: string;
  /** A catch-and-release-only period (`noKeep`), not a closed season: the fish may be fished for but not kept. */
  release?: boolean;
};

/** A fish in a water section, with its closed season when the regulator has one. */
export type SectionFish = Creature & {
  closure?: ClosureNote;
  /**
   * "regulator": a closed-season row names this fish here, so the regulator's open season decides whether it is in season;
   * "typical": no rule is loaded for it here, so `anglingMonths` are the library's typical angling months, not a legal season.
   */
  basis: "regulator" | "typical";
  /** With basis "regulator": the days the fish may be fished, "15 May to 31 March". */
  openWords?: string;
  /** With basis "regulator": who set the season and the page it was read from. */
  regulator?: string;
  ruleSource?: string;
  /** The fish's months in the place's calendar; with basis "regulator" less the months the closed season covers entirely. */
  anglingMonths: number[];
  /**
   * "records": a sea or sea-run fish whose months are the library's typical months that records near the town bear out
   * (seasonHere); "library": the library's typical months, or an agency's or a cited region's own.
   */
  seasonFrom: "records" | "library";
  /** With a catch-and-release-only period: the days the fish may be kept, "1 September to 31 October" ("never" when none). */
  keepWords?: string;
  /** Why it is listed: "36 GBIF records within 10 km of town since 1990, latest 2026". */
  evidence: string;
  /** When the months here are a regulator's or a fisheries agency's own for the place (Texas winter trout), what it says and where. */
  monthsNote?: { text: string; source: string };
  /** Months added to the library's because the town's own records clearly show the fish then (`widenedByRecords`). */
  widened?: number[];
  /** Fish-consumption advice that names this fish in this water. */
  advisories?: AdvisoryNote[];
  /** Why an `undated` fish has no season: its records bear out none of its months, or the latest is older than 2006. */
  undatedWhy?: "months" | "old";
  /**
   * With months from records: the month (1–12) its records near the town peak in, when that month is not among the months
   * shown and holds at least a quarter of the rows (`recordsPeak`). Day 5 audit: Portland's Chinook read "months that
   * records near here bear out: Jul–Oct" while its 8,608 rows peak in May (4,871) and October holds 13. A floor on a month's
   * share cannot fix the months: single months of tens of thousands of rows (Vancouver's 25,771 May coho, likely juvenile
   * counts) would take the autumn coho months away. So the months stay the typical ones the records bear out, and the card
   * says where the records peak.
   */
  peakOutside?: number;
};

/** The month a fish's records near the town peak in, with at least a quarter of the rows, if it is not among `months`. */
export function recordsPeak(info: { n: number; byMonth?: number[] } | undefined, months: number[]): number | undefined {
  const bm = info?.byMonth;
  if (!bm || !months.length) return undefined;
  const total = bm.reduce((a, b) => a + b, 0);
  const top = bm.indexOf(Math.max(...bm)) + 1;
  return total > 0 && bm[top - 1] * 4 >= total && !months.includes(top) ? top : undefined;
}

/**
 * Months a fisheries agency gives for a fish in its own waters, where the region's typical months would mislead:
 * the place's months replace the library's for that fish. Each row is scoped to a country and province or state.
 */
type LocalMonths = {
  species: string[];
  countryCode: string;
  admin1: string[];
  /** A circle the row is limited to, where the state also has trout water the programme does not describe. */
  near?: { lat: number; lon: number; km: number };
  /** The kinds of water the agency's page describes (Day 4 audit: the Boise River's trout, not its ponds'); absent, all. */
  water?: WaterGroup[];
  months: number[];
  text: string;
  source: string;
  checked: string;
};
export const LOCAL_MONTHS: LocalMonths[] = [
  // source: TPWD news release, 18 November 2024, "Rainbow Trout Arriving Soon at a Waterbody Near You" — stocking "from Nov. 26 —
  //   March 9"; rainbow trout are "unable to survive in most areas of Texas after winter due to the warm water temperatures", the
  //   Guadalupe River below Canyon Lake excepted; statewide bag "five trout with no minimum length limit". The 5 Nov 2026 audit found
  //   Dallas's trout shown in the Great Plains' spring and autumn months.
  {
    species: ["rainbow-trout"],
    countryCode: "US",
    admin1: ["TX", "Texas"],
    months: [12, 1, 2, 3],
    text: "Texas Parks and Wildlife stocks rainbow trout from late November to early March; they do not survive the summer in most Texas waters (the Guadalupe below Canyon Lake is the exception).",
    source: "https://tpwd.texas.gov/newsmedia/releases/?req=20241118a",
    checked: "2026-11-09",
  },
  // Stocked winter trout (Day 3 audit, 11 November 2026): the library's spring and autumn months put the St. Louis,
  // Nashville and Little Rock trout of stocked lakes in season in summer-warm water. Each row is limited to a circle round
  // the town, because each state also has year-round trout water (Missouri's Ozark trout parks, the White and Little Red
  // tailwaters in Arkansas, Tennessee's cold tailwaters) that these programmes do not describe.
  // source: MDC, "St. Louis Urban Fishing Program Lakes" — rainbow trout "stocked several times during the Winter Trout
  //   Program, November through March" in Carondelet Park Boathouse Lake, Forest Park Jefferson Lake, O'Fallon Park Lake,
  //   Suson Park, Tilles Park and other St. Louis area lakes (read 11 November 2026).
  {
    species: ["rainbow-trout"],
    countryCode: "US",
    admin1: ["MO", "Missouri"],
    near: { lat: 38.63, lon: -90.19, km: 40 },
    months: [11, 12, 1, 2, 3],
    text: "The Missouri Department of Conservation stocks rainbow trout in St. Louis's urban fishing lakes several times in its Winter Trout Program, November through March.",
    source: "https://mdc.mo.gov/fishing/fishing-prospects/areas/st-louis-urban-fishing-program-lakes",
    checked: "2026-11-11",
  },
  // source: AGFC, Family and Community Fishing Program — "Catchable-sized rainbow trout are stocked each winter from
  //   November through February"; channel catfish "from April through October". Little Rock's ponds include Boyle Park,
  //   Conner Park, Hindman Park, MacArthur Park and Western Hills (read 11 November 2026).
  {
    species: ["rainbow-trout"],
    countryCode: "US",
    admin1: ["AR", "Arkansas"],
    near: { lat: 34.75, lon: -92.29, km: 50 },
    months: [11, 12, 1, 2],
    text: "The Arkansas Game and Fish Commission stocks rainbow trout in its Family and Community Fishing ponds each winter, November through February (Little Rock's include Boyle, Conner, Hindman and MacArthur parks).",
    source: "https://www.agfc.com/en/fishing/where-fish/family-and-community/",
    checked: "2026-11-11",
  },
  // source: TWRA news, 26 November 2025, "TWRA Begins 2025-26 Winter Trout Stocking Program" (tailwaters, reservoirs and
  //   community lakes; a trout licence is needed besides the fishing licence) and 1 December 2023, "2023-24 TWRA Winter Trout
  //   Stocking Program Underway": trout released "through March", "during the winter months when water temperatures are
  //   cold". The programme starts at the end of November, so November is not counted (read 11 November 2026).
  {
    species: ["rainbow-trout"],
    countryCode: "US",
    admin1: ["TN", "Tennessee"],
    near: { lat: 36.16, lon: -86.78, km: 60 },
    months: [12, 1, 2, 3],
    text: "The Tennessee Wildlife Resources Agency stocks rainbow trout in tailwaters, reservoirs and community lakes in winter, from the end of November through March, when the water is cold; a trout licence is needed as well as a fishing licence.",
    source: "https://www.tn.gov/twra/news/2025/11/26/twra-begins-2025-26-winter-trout-stocking-program.html",
    checked: "2026-11-11",
  },
  // Day 4 audit (13 November 2026). source: NMDGF, "Winter fish stocking" (article of 12 November 2015): "Trout are stocked
  //   every week from November through March", in the Tingley Beach ponds and "the drains that run alongside the Rio
  //   Grande" (read 13 November 2026). The town's 47 rainbow trout rows fall from November to April. New Mexico also has
  //   year-round trout water (the San Juan, mountain streams), so the row is limited to Albuquerque's circle.
  {
    species: ["rainbow-trout"],
    countryCode: "US",
    admin1: ["NM", "New Mexico"],
    near: { lat: 35.0841, lon: -106.651, km: 25 },
    months: [11, 12, 1, 2, 3],
    text: "New Mexico Game and Fish stocks rainbow trout every week from November through March in the Tingley Beach ponds and the drains beside the Rio Grande.",
    source: "https://wildlife.dgf.nm.gov/winter-fish-stocking/",
    checked: "2026-11-13",
  },
  // source: IDFG press release, "Fishing the Boise River in Winter" (undated): "Wild rainbow and brown trout spend their
  //   entire lives in the Boise River"; it "is stocked with trout every month of the year except in the spring during high
  //   water events" (read 13 November 2026). The region's months for rainbow trout (deserts: November to March) are winter
  //   stocking months for warm desert waters; Boise's river trout are there all year. For the river only: the page says
  //   nothing of the ponds' months.
  {
    species: ["rainbow-trout", "brown-trout"],
    countryCode: "US",
    admin1: ["ID", "Idaho"],
    near: { lat: 43.6166, lon: -116.2009, km: 25 },
    water: ["rivers"],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    text: "Idaho Fish and Game says wild rainbow and brown trout spend their whole lives in the Boise River, and it stocks the river with rainbow trout every month of the year except during spring high water.",
    source: "https://idfg.idaho.gov/press/fishing-boise-river-winter",
    checked: "2026-11-13",
  },
  // source: CDFW news, 12 May 2026, "Chinook fishing to reopen on Klamath, Trinity and Sacramento rivers after 3-year
  //   closure": the Central Valley general fall-run season "July 16 to Dec. 16, 2026", with some variation for upper and lower
  //   stretches; two fish a day, four in possession (read 13 November 2026). The library's "Jul–Oct" left out November, when
  //   the town's records peak (22,659 November rows, Day 4 audit). For the rivers only; the ocean season is another rule.
  {
    species: ["chinook-salmon"],
    countryCode: "US",
    admin1: ["CA", "California"],
    near: { lat: 38.5811, lon: -121.4939, km: 30 },
    water: ["rivers"],
    months: [7, 8, 9, 10, 11, 12],
    text: "CDFW reopened Central Valley fall-run Chinook fishing in 2026 after a three-year closure: its May 2026 announcement gives the general season as 16 July to 16 December, with some variation by stretch, and a limit of two a day.",
    source: "https://wildlife.ca.gov/News/Archive/chinook-fishing-to-reopen-on-klamath-trinity-and-sacramento-rivers-after-3-year-closure",
    checked: "2026-11-13",
  },
];

/**
 * Named waters whose managing agency lists the fish it puts in them (Day 3 audit, 11 November 2026: the stored guide put
 * walleye "in Benton Park Lake and Fairground Park Lake" at St. Louis, where MDC stocks no walleye). The stored-guide vet
 * (src/lib/guide-vet.ts) drops an entry that places another library fish in one of these waters, and the lakes section
 * carries the agency's note where the town is in the row's circle.
 */
export type ManagedWater = { near: { lat: number; lon: number; km: number }; names: RegExp; species: string[]; note: string; agency: string; source: string; checked: string };
export const MANAGED_WATERS: ManagedWater[] = [
  // source: MDC, "St. Louis Urban Fishing Program Lakes" (read 11 November 2026): 18 lakes; hybrid sunfish and channel
  //   catfish stocked April to September; rainbow trout at eleven of them in the winter; spring largemouth bass fishing
  //   suggested at Horseshoe, Island, January-Wabash, Blackjack and Bee Tree Park lakes. No other fish is named.
  {
    near: { lat: 38.63, lon: -90.19, km: 40 },
    names:
      /\b(benton park|carondelet|boathouse lake|horseshoe lake|fairground|jefferson lake|lafayette park|o'?fallon park|willmore|fountain lake|suson|carp lake|island lake|tilles|blackjack lake|gendron|january-wabash|ballwin|vlasis|koeneman|walker lake)\b/i,
    species: ["channel-catfish", "rainbow-trout", "largemouth-bass"],
    note: "The Missouri Department of Conservation stocks St. Louis's 18 urban fishing lakes (Benton Park, Fairgrounds Park, Forest Park's Jefferson Lake and others) with channel catfish and hybrid sunfish from April to September, and eleven of them with rainbow trout in winter.",
    agency: "Missouri Department of Conservation",
    source: "https://mdc.mo.gov/fishing/fishing-prospects/areas/st-louis-urban-fishing-program-lakes",
    checked: "2026-11-11",
  },
];

const kmTo = (a: number, b: number, c: number, d: number) => {
  const r = Math.PI / 180;
  return Math.hypot((d - b) * r * Math.cos(((a + c) / 2) * r), (c - a) * r) * 6371;
};
const inCircle = (place: { lat?: number; lon?: number } | null | undefined, near?: { lat: number; lon: number; km: number }) =>
  !near || (place?.lat != null && place.lon != null && kmTo(place.lat, place.lon, near.lat, near.lon) <= near.km);

/** The managed waters whose circle holds the place. */
export const managedWatersAt = (place: { lat?: number; lon?: number } | null | undefined): ManagedWater[] => MANAGED_WATERS.filter((m) => inCircle(place, m.near));

/** The fish-consumption advisories for a place, a kind of water and, where a row names rivers, the town's great rivers. */
export function advisoriesFor(place: PlaceScope | null | undefined, group: WaterGroup | undefined, w: Pick<WaterSetting, "bigRiver" | "confluence"> | null): AdvisoryNote[] {
  if (!place?.countryCode) return [];
  const mine = [place.admin1, place.admin1Code].filter((x): x is string => !!x).map((x) => x.toLowerCase());
  const big = new Set(bigRiverNames(w).map(riverKey));
  return FISH_ADVISORIES.filter(
    (a) =>
      a.countryCode === place.countryCode!.toUpperCase() &&
      (!a.admin1 || a.admin1.some((x) => mine.includes(x.toLowerCase()))) &&
      inCircle(place, a.near) &&
      !(a.notNear ?? []).some((c) => inCircle(place, c)) &&
      (!a.water || !group || a.water.includes(group)) &&
      (!a.rivers || a.rivers.some((r) => big.has(riverKey(r)))),
  ).map((a) => ({ id: a.id, fish: a.fish, waters: a.waters, advice: a.advice, who: a.who, contaminant: a.contaminant, agency: a.agency, source: a.source, checked: a.checked, species: a.species }));
}

/** The advisories among `all` that name a fish (or every fish). */
export const advisoriesNaming = (all: AdvisoryNote[], slug: string): AdvisoryNote[] => all.filter((a) => a.species.includes("*") || a.species.includes(slug));

/** The agency's own months for a fish at a place, when a LOCAL_MONTHS row applies (in `group`, where one is given). */
function localMonths(place: PlaceScope | null, slug: string, group?: WaterGroup): LocalMonths | null {
  if (!place?.countryCode) return null;
  const mine = [place.admin1, place.admin1Code].filter((x): x is string => !!x).map((x) => x.toLowerCase());
  return (
    LOCAL_MONTHS.find(
      (r) =>
        r.species.includes(slug) &&
        r.countryCode === place.countryCode!.toUpperCase() &&
        r.admin1.some((a) => mine.includes(a.toLowerCase())) &&
        inCircle(place, r.near) &&
        (!r.water || !group || r.water.includes(group)),
    ) ?? null
  );
}

/** A fish's text and fresh-water months written for one region (creatures.json `byRegion`). */
type RegionText = Partial<Pick<Creature, "where" | "whereSea" | "tactic" | "tacticSea" | "note">> & FreshMonths & { source: string };

/**
 * The fish as the region's page should word it: the library's text, with the region's own where it has one (Day 4 audit,
 * 13 November 2026: striped bass in California read "Live eels and plugs at night; metal into a blitz by day" and "on the
 * Atlantic", and inland took the Florida FWC's months). The source stays in creatures.json.
 */
export function regionText<T extends Creature>(c: T, regionSlug: string): T {
  const r = (c as T & { byRegion?: Record<string, RegionText> }).byRegion?.[regionSlug];
  if (!r) return c;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { source, ...text } = r;
  return { ...c, ...text };
}

type LocalName = { name: string; regions: string[] | "all" };

/**
 * A fish's name as the page's region uses it: the library's name, then in brackets only the alternative names used in that
 * region (creatures.json `localNames`, scripts/fix-fish-local-names.mjs). "Bluefish (elf, shad)" at Cape Town, "Bluefish"
 * at Boston, where shad is American shad, another fish (audit, 10 November 2026).
 */
export function localName(c: { name: string; localNames?: LocalName[] }, regionSlug?: string): string {
  const alts = (c.localNames ?? []).filter((n) => n.regions === "all" || (!!regionSlug && n.regions.includes(regionSlug))).map((n) => n.name);
  return alts.length ? `${c.name} (${alts.join(", ")})` : c.name;
}

const MARINE = new Map<string, boolean>();

/**
 * Whether the place has sea or estuary water (its water setting's sea or estuary group, from the grid and the tidal
 * reaches alone, so no map look-up is needed). An unknown place counts as marine, the stricter reading for a sea-run fish.
 */
export function marineAt(place: { lat?: number; lon?: number } | null | undefined): boolean {
  if (place?.lat == null || place.lon == null) return true;
  const key = `${place.lat.toFixed(3)}:${place.lon.toFixed(3)}`;
  let v = MARINE.get(key);
  if (v === undefined) {
    const g = waterSetting(place.lat, place.lon, []).groups;
    v = g.includes("sea") || g.includes("estuary");
    MARINE.set(key, v);
  }
  return v;
}

/** A fish of both waters with months for its land-locked or river populations (creatures.json `monthsFresh`). */
type FreshMonths = { monthsFresh?: { months: number[]; text: string; source: string } };

/** A month added from the records needs at least this many rows in it (Day 3 audit). */
const WIDEN_MIN = 10;
const wrap = (m: number) => ((((m - 1) % 12) + 12) % 12) + 1;

/**
 * The months a fresh-water fish's records near the town add to its typical months (Day 3 audit, 11 November 2026: the
 * library's months were written for the north, so Houston's largemouth bass read "Apr–Oct" with 89 November and 88 January
 * records, and its channel catfish "May–Oct" with 53 in November).
 *
 * Only the library's winter gap may widen (the run of months outside its typical months that holds January, or July south
 * of the equator), and only where the fish is recorded in that coldest month at least WIDEN_MIN times, so the town has no
 * closed winter for it. A first version widened any month and added July and August to perch, pike and crappie at 70
 * northern towns: summer is when most records are made, so its counts say more about observers than about the fishing, and
 * an autumn month of spawning brook trout on their redds (Toronto, October and November) is not an angling month. Within the
 * winter gap a month is added when its rows are at least WIDEN_MIN and at least half the fish's average in its typical
 * months; a single month between two months in season, itself with WIDEN_MIN rows, fills the gap. Records say the fish is
 * caught or seen then, not that it may be taken: a regulator's closed season still wins (placeFish).
 *
 * Trout, char, salmon, kokanee, grayling and whitefish never widen: they spawn in autumn and winter, and their records then
 * count spawners and stocking (Vancouver's 2,086 October and 959 January kokanee rows, London's 300 December brown trout).
 */
const SALMONID = /^(Oncorhynchus|Salmo|Salvelinus|Thymallus|Coregonus|Prosopium|Hucho)\b/;
export function widenedByRecords(months: number[], slug: string, place?: { slug?: string; lat?: number } | null): number[] {
  if (SALMONID.test(getCreature(slug)?.latin ?? "")) return [];
  const info = presentFish(place?.slug).fish[slug];
  const bm = info?.status === "recorded" ? info.byMonth : undefined;
  const coldest = (place?.lat ?? 0) < 0 ? 7 : 1;
  if (!bm || !months.length || months.includes(coldest)) return [];
  const rows = (m: number) => bm[wrap(m) - 1] ?? 0;
  if (rows(coldest) < WIDEN_MIN) return [];
  // The winter gap: the months outside the typical ones, running out from the coldest month.
  const gap = new Set<number>([coldest]);
  for (let m = coldest - 1; !months.includes(wrap(m)) && !gap.has(wrap(m)); m--) gap.add(wrap(m));
  for (let m = coldest + 1; !months.includes(wrap(m)) && !gap.has(wrap(m)); m++) gap.add(wrap(m));
  const usual = months.reduce((s, m) => s + rows(m), 0) / months.length;
  const add = new Set<number>();
  for (const m of gap) if (rows(m) >= WIDEN_MIN && rows(m) * 2 >= usual) add.add(m);
  const on = (m: number) => months.includes(wrap(m)) || add.has(wrap(m));
  for (const m of gap) if (!on(m) && rows(m) >= WIDEN_MIN && on(m - 1) && on(m + 1)) add.add(m);
  return [...add].sort((a, b) => a - b);
}

export type Season = {
  months: number[];
  from: "records" | "library";
  local: LocalMonths | null;
  /** Months the town's records added (fresh-water fish only). */
  widened: number[];
  /** A fish of both waters inland: its fresh-water months and their source. */
  fresh: { text: string; source: string } | null;
};

/**
 * The months a fish is in season at a place, and on what they rest. `base.months` must already be in the place's calendar
 * (orderCreatures or inLocalMonths gives them so). An agency's own months (LOCAL_MONTHS) win; a fish listed for the page's
 * region alone, or with a cited region's months, keeps them. A fish of fresh water keeps its typical months, widened where
 * the town's records clearly show it in more (`widenedByRecords`). A fish of both waters counts as sea-run only where the
 * town has sea or estuary water (`opts.marine`, else `marineAt`): inland it takes its fresh-water months where the
 * library has them (striped bass), and otherwise, as a sea or sea-run fish does, keeps only those of its typical months that
 * its records near the town bear out (fish-presence monthsRecorded), none where the table holds no month counts.
 * The Day page (src/lib/rhythm.ts) and the guide's fallback list (src/lib/guide-rules.ts) ask this through inSeasonOnPage.
 */
export function seasonHere(
  base: Creature,
  regionSlug: string,
  place: (PlaceScope & { slug?: string }) | null,
  opts: { marine?: boolean; group?: WaterGroup } = {},
): Season {
  const local = localMonths(place, base.slug, opts.group);
  const none = { local, widened: [] as number[], fresh: null };
  if (local) return { ...none, months: local.months, from: "library" };
  // A fish listed for this region alone has months written for it (white steenbras at the Cape), not a union of regions'.
  const ownRegion = Array.isArray(base.regions) && base.regions.length === 1 && base.regions[0] === regionSlug;
  if (ownRegion || base.monthsByRegion?.[regionSlug]) return { ...none, months: base.months, from: "library" };
  const water = waterOf(base.slug);
  if (water === "fresh") {
    const widened = widenedByRecords(base.months, base.slug, place);
    return { ...none, months: [...base.months, ...widened], from: "library", widened };
  }
  const freshMonths = (regionText(base, regionSlug) as Creature & FreshMonths).monthsFresh;
  if (water === "both" && freshMonths && !(opts.marine ?? marineAt(place))) {
    const months = inLocalMonths({ ...base, months: freshMonths.months }, regionSlug).months;
    return { ...none, months, from: "library", fresh: { text: freshMonths.text, source: freshMonths.source } };
  }
  const rec = monthsRecorded(presentFish(place?.slug).fish[base.slug]) ?? [];
  return { ...none, months: base.months.filter((m) => rec.includes(m)), from: "records" };
}

/** Whether a fish (months in the place's calendar) is in season in `month` at the place by seasonHere; closures are apart. */
export const inSeasonHere = (base: Creature, month: number, regionSlug: string, place: (PlaceScope & { slug?: string }) | null, opts: { marine?: boolean } = {}): boolean =>
  seasonHere(base, regionSlug, place, opts).months.includes(month);

/** A fish of the region that has not been checked near the town: named only, with no months, tactic or season. */
export type RegionalFish = Pick<Creature, "slug" | "name" | "latin"> & {
  /** Why it could not be checked here, in a few words ("1 record in the outer corner of the area: too thin to say it lives near here."). */
  reason: string;
};

/** What the page says about the evidence behind the lists. */
export type PresenceNote = { checked: boolean; dataPoor: boolean; boxKm: number; since: number; source: string };

export type WaterSection = {
  id: WaterGroup;
  /** "The sea"; "The sea, 10 to 30 km away" where the open coast is that far from town (`away`). */
  title: string;
  /** "The open coast, within about 10 km.", "Lake Ontario." */
  where: string;
  /**
   * "10 to 30 km away": the sea where the open coast is that far from town (water setting `coast: "near"`), and the
   * estuary where the town's estuary water is a reach that far out (TIDAL_REACHES `away`, Brownsville's lagoon).
   */
  away?: string;
  /** In season now and open to fishing, in this water: the best first. A fish that closes later this month carries `closure` with `closedNow: false`. */
  fish: SectionFish[];
  /** In season by the library but closed by the regulator now: shown after the open fish, never deleted. */
  closed: SectionFish[];
  /** Recorded fish of this water whose typical angling months are another time of year. */
  later: SectionFish[];
  /** Sea or sea-run fish recorded near the town whose records bear out none of their typical months: listed with no season. */
  undated: SectionFish[];
  /** The region's fish for this water that could not be checked near the town (data-poor, town not in the table, or too thin): names only. */
  unchecked: RegionalFish[];
  /** The named waters of this kind, with the reason when one is not fishing water. */
  waters: FishingWater[];
  /** Set when every named water of this kind is one to stay away from (or the whole water is closed to fishing). */
  avoid?: { reason: string };
  /** Licence and no-closed-season notes from the regulator for this place and kind of water. */
  notes: { note: string; regulator: string; source: string }[];
  /** The regulator behind the page for this place: closed seasons loaded, a no-closed-season note, or a page to check. */
  regulation: RegulatorInfo;
  /** How the fish were checked near the town. */
  presence: PresenceNote;
  /** The kinds of water this place has (from its water setting), so a card never tags a fish "big lakes" where there is none. */
  habitats: Habitat[];
  /** Fish-consumption advice for this kind of water here (src/data/fish-advisories.ts). */
  advisories: AdvisoryNote[];
  /** Above a dam that cut the sea-run fish off (water-setting SEA_RUN_BLOCKED): a salmon here is a lake fish (Day 5). */
  seaRunBlocked?: boolean;
};

export type FishByWaterOptions = {
  /** The place, for the records' country rules and the regulator's closed seasons. */
  place?: (PlaceLike & PlaceScope & { slug?: string }) | null;
  /** The day to judge closures by (ISO date or Date); the whole month when absent. */
  today?: string | Date;
};

const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

const cap = (x: string) => `${x.charAt(0).toUpperCase()}${x.slice(1)}`;

/** The sea's distance words where the open coast is 10 to 30 km from town; none where it is within about 10 km. */
const seaAway = (w: WaterSetting): string | undefined => (w.coast === "near" ? "10 to 30 km away" : undefined);

function whereText(id: WaterGroup, w: WaterSetting): string {
  // The water setting's bands (water-setting.ts `coast`): "on" within about 10 km of the open sea, "near" 10 to 30 km.
  // The fish below a "near" sea are the coast's, not the water at the town (a tidal river or estuary has its own section).
  // An inland sea (the Salish Sea, Day 5 audit: Seattle read "The open coast, within about 10 km") is named, in its
  // source's words (water-setting INLAND_SEAS), and never called the open coast.
  if (id === "sea" && w.inlandSea) return `${cap(w.inlandSea.water)}: ${w.inlandSea.says}.`;
  if (id === "sea") return w.coast === "on" ? "The open coast, within about 10 km." : "The open coast, not the water at the town.";
  if (id === "estuary") {
    // A reach 10 to 30 km out (Brownsville's Lower Laguna Madre): its distance and its source's words, as the overview has them.
    if (w.tidal?.kind === "estuary" && w.tidal.away) return `${cap(w.tidal.water)}, ${w.tidal.away}${w.tidal.says ? `: ${w.tidal.says}` : ""}.`;
    // A tidal estuary reach: the water itself, in the words of its source (TIDAL_REACHES) as the overview prints them.
    if (w.tidal?.kind === "estuary") return `${cap(w.tidal.water)}: tidal water at the town, part river and part sea.`;
    if (w.estuary) return `${cap(w.estuary)}, and the river mouths along the shore.`;
    const r = w.rivers[0]?.name ?? (w.bigRiver ? riverName(w.bigRiver) : null);
    return r ? `Where the ${r.replace(/^the /i, "")} and the coast's other rivers meet the tide.` : "River mouths and coastal lagoons along the shore.";
  }
  // The map service did not answer: say so, and never pass the empty list off as the town's waters.
  const unlisted = w.namedWaters === "unavailable" ? " The list of named waters near here did not load." : "";
  if (id === "rivers") {
    // A database code ("Trib 00774 To Darby Creek", Philadelphia, audit of 10 November 2026) is not a water's name. A
    // confluence names all its rivers, and a named river that is one of the great rivers is not listed again (Day 3 audit).
    const big = bigRiverNames(w);
    const bigKeys = new Set(big.map(riverKey));
    // An agency's trout water is named whether or not the map answered (the Boise River, Albuquerque's drains).
    const named = [...w.rivers.filter((r) => !bigKeys.has(riverKey(r.name))).map((r) => r.name), ...w.streams.map((s) => s.name)];
    const trout = (w.troutWaters ?? []).map((t) => t.river).filter((t) => !named.some((n) => riverKey(n) === riverKey(t)));
    const names = [...big.map(riverName), ...trout, ...named].filter((n) => !isCodedWaterName(n));
    // One entry per river: OpenStreetMap often holds a river and a stream of one name ("Naura" and "Naura River" at Arusha).
    const keys = new Set<string>();
    const uniq = names.filter((n) => !keys.has(riverKey(n)) && !!keys.add(riverKey(n))).slice(0, Math.max(4, big.length + trout.length + 1));
    // A river a source calls a concrete channel is named with its reason (the Los Angeles River, Day 4 audit).
    const soft = w.rivers.filter((r) => r.avoid && !r.avoid.certain && r.avoid.kind !== "reservoir-closed" && r.avoid.kind !== "pool" && uniq.includes(r.name));
    const why = soft.map((r) => ` ${r.name}: ${r.avoid!.reason}.`).join("");
    return `${uniq.length ? `${list(uniq)}.` : "The rivers and streams around town."}${why}${unlisted}`;
  }
  const names = [...(w.bigLake ? [lakeName(w.bigLake.name)] : []), ...w.lakes.map((l) => l.name)].filter((n) => !isCodedWaterName(n));
  const uniq = [...new Set(names)].slice(0, 4);
  const reservoir = w.lakes.some((l) => l.avoid?.kind === "reservoir-closed");
  return `${uniq.length ? `${list(uniq)}.` : "Lakes, dams and ponds around town."}${reservoir ? " A reservoir or dam may be closed to angling or need a permit; check with its owner before you go." : ""}${unlisted}`;
}

/** The named waters that belong to a kind of water, kept ones first, then the dropped ones with their reasons. */
function watersOf(id: WaterGroup, w: WaterSetting): FishingWater[] {
  const dropped = (kinds: string[]) => w.avoid.filter((x) => kinds.includes(x.kind));
  const named = (xs: FishingWater[]) => xs.filter((x) => !isCodedWaterName(x.name));
  if (id === "rivers") return named([...w.rivers, ...w.streams, ...dropped(["river", "stream"])]);
  if (id === "lakes") return named([...w.lakes, ...dropped(["lake", "reservoir"])]);
  return [];
}

/** The reason a whole kind of water is one to stay away from, when it is. */
function avoidReason(id: WaterGroup, w: WaterSetting, waters: FishingWater[]): string | null {
  if (id !== "rivers" && id !== "lakes") return null;
  if (id === "rivers" && w.bigRiver) return null;
  if (id === "lakes" && w.bigLake) return null;
  const named = waters.filter((x) => x.avoid?.kind !== "not-a-name");
  // A pond whose owner bans fishing (Houston's Kinder Lake, Day 3 audit) is still a pond: it says nothing about the town's
  // other still waters, so it never makes the whole kind "Not here".
  if (named.some((x) => x.avoid?.kind === "no-fishing")) return null;
  if (!named.length || !named.every((x) => x.avoid)) return null;
  const what = id === "rivers" ? "rivers" : "still waters";
  const kept = named.filter((x) => !x.avoid!.certain);
  // Some named waters remain, all of them doubtful (reservoirs, "pools"): say what they are.
  if (kept.length) {
    const kinds = new Set(kept.map((x) => x.avoid!.kind));
    const list4 = list(kept.slice(0, 4).map((x) => x.name));
    if (kinds.size === 1 && kinds.has("reservoir-closed"))
      return `The ${what} named near here (${list4}) are reservoirs and dams, which may be closed to angling or need a permit; check with the owner before you go.`;
    if (kinds.size === 1 && kinds.has("pool")) return `The ${what} named near here (${list4}) are called pools, which may be swimming pools — check before you go.`;
    return `The ${what} named near here (${list4}) are doubtful fishing water: ${[...new Set(kept.map((x) => x.avoid!.reason))].join("; ")}.`;
  }
  // Every named water was dropped: name them and give the first reason.
  const reasons = [...new Set(named.map((x) => x.avoid!.reason))];
  return `The ${what} named near here (${list(named.slice(0, 4).map((x) => x.name))}) are not fishing water: ${reasons[0]}.`;
}

/**
 * The names a regulator's note uses for a fish: its library name, its last word where that is the fish's own kind
 * ("salmon" for a Chinook, "perch" for a yellow perch), and the run names of its kind.
 */
function noteNames(f: Pick<Creature, "slug" | "name">): RegExp {
  const name = f.name.toLowerCase().replace(/\s*\(.*\)$/, "");
  const words = new Set([name, name.replace(/ salmon$/, ""), ...(/salmon|steelhead/.test(name) ? ["salmon"] : []), ...(/perch|lingcod|halibut|walleye|sturgeon/.test(name) ? [name.split(" ").pop()!] : [])]);
  const esc = [...words].filter((x) => x.length > 3).map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return new RegExp(`\\b(${esc.join("|")})s?\\b`, "i");
}
const CLOSED_WORDS = /\b(closed|no open season|not open|may not be (kept|retained|taken)|must be released|catch and release only|non-retention|no retention)\b/i;
/** A clause that says the opposite ("no closed season", "open all year", Wisconsin's "continuous"). */
const OPEN_WORDS = /\b(no closed season|not closed|open all year|open the rest of the year|continuous|may still|under \d+|over \d+|shorter than|longer than)\b/i;

/**
 * Whether a regulator's note shown with a section says, in a sentence that names the fish, that it is closed or may not
 * be kept (Day 5 audit, 14 November 2026: Seattle's and Portland's salmon, BC's salmon, Kelowna's perch and Victoria's and
 * Nanaimo's lingcod were "in season" by their typical months beside a note saying the fish was closed, because a note with
 * no closing dates closes nothing). The clause is returned. Prose is not data: the clause test still catches size limits
 * and closures of single named waters, so the page does not act on it. The fix is a row with dates (src/data/region-rules,
 * package A1 of 14 November); check-fish (30) prints every town, water and fish where a note shown on the page and an
 * "in season" card disagree, so a note-only row that should have been a row cannot hide.
 */
export function noteSaysClosed(note: string, f: Pick<Creature, "slug" | "name">): string | null {
  const re = noteNames(f);
  // Clause by clause: a list such as "perch as open all year, …, and lake sturgeon as closed all year" closes the sturgeon only.
  for (const s of note.split(/(?<=[.;:])\s+|\n|,\s+|\s+\(|\)\s*/)) if (re.test(s) && CLOSED_WORDS.test(s) && !OPEN_WORDS.test(s)) return s.trim();
  return null;
}

/** `openWords` for a fish open all year that may never be kept (a noKeep range over the whole year; Day 5 audit). */
export const RELEASE_ALL_YEAR = "all year, catch and release only";

/** "Typical angling months, less the closed season: May–Mar" — never "Year-round" beside a closed season (Day 5 audit; src/components/FishByWater.tsx prints it). */
export function typicalLine(fish: SectionFish, lead0: string): string {
  const rec = fish.seasonFrom === "records" ? " that records near here bear out" : "";
  // Catch and release all year has no closed season to be "less" (FishByWater picks the lead from openWords === "all year").
  const lead = fish.openWords === RELEASE_ALL_YEAR ? "Typical angling months within it" : lead0;
  if (fish.basis === "regulator" && fish.openWords && fish.openWords !== "all year" && fish.openWords !== RELEASE_ALL_YEAR && fish.anglingMonths.length === 12)
    return `Typical angling months${rec}: the whole year outside the closed season.`;
  return `${lead}${rec}: ${shortMonthRange(fish.anglingMonths)}.`;
}

/** A fish in the "Other months" list: its months, and its open season where the regulator's rows govern it here. */
export function laterWords(f: SectionFish): string {
  if (f.basis === "regulator" && f.openWords) return `${shortMonthRange(f.anglingMonths)}; legally open ${f.openWords}, ${f.regulator}`;
  return `${shortMonthRange(f.anglingMonths)}, typical, not a legal season`;
}

/** The habitats of a fish that this water group has here, in the fish's own order. */
export function habitatsHere(fish: Creature, group: WaterGroup, w: WaterSetting): Habitat[] {
  const g = WATER_GROUPS.find((x) => x.id === group)!;
  const here = new Set<Habitat>(w.habitats);
  return habitatsAt(fish.slug, w).filter((h) => g.habitats.includes(h) && here.has(h));
}

/**
 * A fish card's habitat line: the fish's habitats that belong to the section's kind of water and that the place has, in
 * the fish's own order ("surf beaches · rocky shores"). Audit of 5 November 2026: no habitat the place lacks ("big lakes"
 * at Calgary). Audit of 10 November 2026: where the open coast is 10 to 30 km from town, the line says so ("…, 10 to 30
 * km away"), and surf and rock tags belong to the sea section alone, never to a tidal river or an estuary.
 */
export function habitatTags(fish: Pick<Creature, "slug">, section: Pick<WaterSection, "id" | "habitats" | "away" | "seaRunBlocked">): string {
  const g = WATER_GROUPS.find((x) => x.id === section.id)!;
  const has = new Set(section.habitats);
  // Above a dam with no fish passage, a salmon's water is the lake (Spokane's Chinook, Day 5 audit).
  const own = section.seaRunBlocked ? habitatsAt(fish.slug, { seaRunBlocked: true }) : habitatsOf(fish.slug);
  const tags = own.filter((h) => g.habitats.includes(h) && has.has(h) && (section.id === "sea" || (h !== "surf" && h !== "rocks")));
  const line = tags.map((h) => HABITAT_LABEL[h]).join(" · ");
  return line && section.away ? `${line}, ${section.away}` : line;
}

const toNote = (c: Closure, closedNow: boolean): ClosureNote => ({
  label: closedNow ? closureLabel(c) : closingLabel(c),
  closedNow,
  until: c.until,
  from: c.from,
  allYear: c.allYear,
  regulator: c.rule.regulator,
  source: c.rule.source,
  note: c.rule.note,
});

const LAST = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const YEAR_DAYS = (() => {
  const out: string[] = [];
  for (let m = 1; m <= 12; m++) for (let d = 1; d <= LAST[m - 1]; d++) out.push(`${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
  return out;
})();

/** "1 September to 31 October": the days of the year left by a set of ranges, as spans; "" when none is left. */
function spansOutside(ranges: ClosedRange[]): string {
  const ok = YEAR_DAYS.map((d) => !ranges.some((r) => inRange(d, r)));
  if (ok.every(Boolean)) return "all year";
  const n = ok.length;
  const spans: string[] = [];
  for (let i = 0; i < n; i++) {
    if (!ok[i] || ok[(i + n - 1) % n]) continue;
    let j = i;
    while (ok[(j + 1) % n]) j = (j + 1) % n;
    spans.push(`${dayWords(YEAR_DAYS[i])} to ${dayWords(YEAR_DAYS[j])}`);
  }
  return spans.join(" and ");
}

/** The days a fish may be kept here, when a row naming it has a catch-and-release-only period: outside its closed and no-keep days. */
function keepWordsFor(place: PlaceScope, slug: string, group: WaterGroup): string | null {
  const rows = rulesNaming(place, slug, group);
  if (!rows.some((r) => r.noKeep?.length)) return null;
  return spansOutside(rows.flatMap((r) => [...r.closed, ...(r.noKeep ?? [])])) || "never";
}

/**
 * A catch-and-release-only period on a fish in a kind of water (a row's `noKeep`): on `today` (or, with no day, for the
 * whole month), or starting later this month; or none.
 */
function releaseFor(place: PlaceScope, slug: string, group: WaterGroup | undefined, month: number, today?: string | Date): ClosureNote | null {
  const day = today ? dayKey(today) : null;
  const last = `${String(month).padStart(2, "0")}-${LAST[month - 1]}`;
  for (const rule of rulesNaming(place, slug, group)) {
    for (const range of rule.noKeep ?? []) {
      const now = day ? inRange(day, range) : monthWithin(month, range);
      const soon = !now && (day ? range.from > day && range.from <= last : monthTouches(month, range));
      if (!now && !soon) continue;
      const until = dayWords(dayAfter(range.to));
      const from = dayWords(range.from);
      // Day 5 audit (14 November 2026): a no-keep range for the whole year (BC fresh-water salmon at Nanaimo and Victoria,
      // 1 January to 31 December) read "Catch and release only until 1 January". It has no end: "all year".
      const allYear = range.from === "01-01" && range.to === "12-31";
      return {
        label: allYear ? `Catch and release only all year — ${rule.regulator}` : now ? `Catch and release only until ${until} — ${rule.regulator}` : `Catch and release only from ${from} — ${rule.regulator}`,
        closedNow: now,
        // No end to give for a whole-year range ("" keeps guide-ai from adding "until 1 January").
        until: allYear ? "" : until,
        from,
        allYear,
        regulator: rule.regulator,
        source: rule.source,
        note: rule.note,
        release: true,
      };
    }
  }
  return null;
}

/**
 * The closure on a fish in a kind of water: closed on `today` (or, with no
 * day, for the whole month); or closing later this month; or none.
 */
function closureFor(place: PlaceScope, slug: string, group: WaterGroup | undefined, month: number, today?: string | Date): ClosureNote | null {
  if (today) {
    const now = closureOf(place, slug, today, group);
    if (now) return toNote(now, true);
    const soon = closingSoon(place, slug, month, today, group);
    return soon ? toNote(soon, false) : null;
  }
  const m = monthClosure(place, slug, month, group);
  return m ? toNote(m.closure, m.wholeMonth) : null;
}

/** Where a fish goes in a kind of water at a place: its season here, the regulator's notes on it, and the list it joins. */
type Placing = {
  list: "fish" | "closed" | "undated" | "later";
  /** With list "undated": its records bear out none of its months, or none is newer than 2005. */
  why?: "months" | "old";
  season: ReturnType<typeof seasonHere>;
  /** The regulator's note the fish carries: closed now, catch and release only now, or either one later this month. */
  note: ClosureNote | null;
  rule?: ClosedSeason;
  open: string | null;
};

/**
 * The fishing page's test for one fish in one kind of water (`group`; with none, every row naming the fish counts, the
 * strictest reading). `f` has its months in the place's calendar (orderCreatures or inLocalMonths). The regulator's rows
 * win: a closed season, then a catch-and-release-only period, sets the fish apart whatever its months; a sea fish recorded
 * here whose records bear out none of its months is "undated"; a fresh-water fish whose rows give it an open season is in
 * season while it is open (a season open all year says nothing about when the fish is there, so then, as where no rule
 * is loaded, the months decide: Dallas's stocked winter trout were "in season" in July); a sea fish needs its records'
 * months as well (an open season does not put cod off Saint John in a month with no cod recorded).
 */
function placeFish(
  f: Creature,
  group: WaterGroup | undefined,
  month: number,
  regionSlug: string,
  place: FishByWaterOptions["place"],
  today?: string | Date,
  marine?: boolean,
): Placing {
  const p = place ?? null;
  const season = seasonHere(f, regionSlug, p, { marine, group });
  const months = season.months;
  const closure = p ? closureFor(p, f.slug, group, month, today) : null;
  const release = p && !closure?.closedNow ? releaseFor(p, f.slug, group, month, today) : null;
  const rule = p ? rulesNaming(p, f.slug, group)[0] : undefined;
  const open = p && rule ? openWords(p, f.slug, group) : null;
  const note = closure ?? release;
  const byRecords = season.from === "records";
  // Records none newer than 2005 cannot date the fish here now (Pittsburgh's striped bass, latest 2004): no season (Day 3).
  const old = tooOldForSeason(presentFish(p?.slug).fish[f.slug]);
  const list: Placing["list"] = closure?.closedNow || release?.closedNow
    ? "closed"
    : old || (byRecords && !months.length)
      ? "undated"
      : (!byRecords && !!rule && open !== "all year") || months.includes(month)
        ? "fish"
        : "later";
  return { list, ...(list === "undated" ? { why: old ? ("old" as const) : ("months" as const) } : {}), season, note: closure?.closedNow ? closure : release?.closedNow ? release : note, rule, open };
}

/**
 * Whether the fishing page lists a library fish as in season at the place on the day: recorded near the town, admitted
 * by the region and the place's record rules, and in season by `placeFish` in at least one kind of water the place has
 * and the fish takes to, other than a water the page marks "Not here". The Day page and the guide's fallback list name
 * no water, so a fish the page sets apart (closed, or catch and release only) in any of those waters today is not
 * offered either, as the Day page did before (a walleye closed in the rivers is not "active" because a lake is open).
 * With no water setting, the fish is judged against every row that names it. This is the test the Day page
 * (src/lib/rhythm.ts) and the guide's fallback list (src/lib/guide-rules.ts) use, so they never call a fish active that
 * this page sets apart or leaves for later (audit of 10 November 2026: striped bass "active" on the Day page at Moncton
 * and Portland in November, 188 such entries).
 */
export function inSeasonOnPage(
  c: Creature,
  month: number,
  regionSlug: string,
  place: FishByWaterOptions["place"],
  opts: { today?: string | Date; water?: WaterSetting | null } = {},
): boolean {
  if (c.group !== "fish" || !creatureAt(c, regionSlug, place ?? null)) return false;
  if (presentFish(place?.slug).fish[c.slug]?.status !== "recorded") return false;
  const f = inLocalMonths(c, regionSlug);
  const w = opts.water ?? null;
  // The kinds of water the place has and the fish takes to (fishByWater's sections for it); every row with no setting.
  const groups: (WaterGroup | undefined)[] = w
    ? WATER_GROUPS.filter((g) => w.groups.includes(g.id) && habitatsAt(c.slug, w).some((h) => g.habitats.includes(h) && w.habitats.includes(h))).map((g) => g.id)
    : [undefined];
  const marine = w ? w.groups.includes("sea") || w.groups.includes("estuary") : undefined;
  const placed = groups.map((g) => ({ g, list: placeFish(f, g, month, regionSlug, place, opts.today, marine).list }));
  if (placed.some((x) => x.list === "closed")) return false;
  return placed.some((x) => x.list === "fish" && !(w && x.g && avoidReason(x.g, w, watersOf(x.g, w))));
}

/**
 * Whether a sea-run fish may be named as a regional species at a town (Day 5 audit, src/lib/fish-range-gaps.ts gate 1):
 * only where it has sea, estuary or big-lake water to run to, and no dam has cut its run off. A steelhead is a rainbow
 * trout that runs (fish-presence SAME_RECORDS); a fish of both waters is one whose habitats include salt water. A
 * steelhead's lake run counts only in the Great Lakes region, the one region away from the Pacific slope where the library
 * lists it (creatures.json): Kelowna's Okanagan Lake (water-setting WATER_FIXES) is a big lake, not a steelhead lake.
 */
export function seaRunGate(slug: string, w: Pick<WaterSetting, "habitats" | "seaRunBlocked" | "troutWaters" | "coldStreams">, regionSlug?: string): boolean {
  if (slug !== "steelhead" && waterOf(slug) !== "both") return true;
  if (!habitatsAt(slug, w).length || w.seaRunBlocked) return false;
  const runs: Habitat[] = ["surf", "rocks", "harbour", "offshore", "estuary", ...(slug !== "steelhead" || regionSlug === "great-lakes-st-lawrence" ? (["big-lake"] as Habitat[]) : [])];
  return runs.some((h) => w.habitats.includes(h));
}

export function fishByWater(month: number, regionSlug: string, w: WaterSetting, opts: FishByWaterOptions = {}): WaterSection[] {
  const place = opts.place ?? null;
  const here = new Set<Habitat>(w.habitats);
  // The region's fish that the place's country and box rules admit, in the page's order, months in the place's calendar.
  const regional = FISH.filter((f) => creatureAt(f, regionSlug, place));
  const ordered = orderCreatures(regional, regionSlug, place).map((f) => regionText(f, regionSlug));
  const info = presentFish(place?.slug);
  const status = (f: Creature) => info.fish[f.slug]?.status ?? "regional";
  // Only a fish recorded near the town may be in season; the others are named apart or left out.
  const recorded = ordered.filter((f) => status(f) === "recorded");
  // The regional list names only fish of the town's area (Day 5 audit, C1): sea-run fish where they can run, and none that
  // GBIF's 150 km box shows to be absent (src/lib/fish-range-gaps.ts).
  const unchecked = ordered.filter((f) => status(f) === "regional" && seaRunGate(f.slug, w, regionSlug) && !rangeGap(place?.slug, f.slug));
  // The regulator's notes: the jurisdiction's own (licence, no closed season in general) and those of the rows that name species as open all year.
  const notes = place ? [...jurisdictionNotes(place), ...rulesFor(place).filter((r) => r.closed.length === 0)] : [];
  const regulation = regulatorFor(place ?? {});
  const presence: PresenceNote = { checked: info.checked, dataPoor: info.dataPoor, boxKm: PRESENCE_METHOD.boxKm, since: PRESENCE_METHOD.since, source: PRESENCE_METHOD.source };
  // Sea-run only where the town has sea or estuary water (Day 3 audit: Little Rock's striped bass).
  const marine = w.groups.includes("sea") || w.groups.includes("estuary");
  // The agency's note on its managed lakes, where the town is in the row's circle (MDC's St. Louis urban lakes).
  const managed = managedWatersAt(place).map((m) => ({ note: m.note, regulator: m.agency, source: m.source }));
  // The agencies' trout waters (Day 4 audit): their note with the rivers, and with the lakes where they stock ponds too.
  const trout = (w.troutWaters ?? []).map((t) => ({ note: t.note, regulator: t.agency, source: t.source, still: t.still.length > 0 }));

  return WATER_GROUPS.filter((g) => w.groups.includes(g.id))
    .map((g) => {
      const inGroup = (f: Creature) => habitatsAt(f.slug, w).some((h) => g.habitats.includes(h) && here.has(h));
      // A fish whose main water is this kind of water leads; then the ones that also take to it.
      const main = (f: Creature) => (g.habitats.includes(habitatsAt(f.slug, w)[0]) ? 0 : 1);
      const byMain = <T extends Creature>(xs: T[]): T[] =>
        xs
          .map((f, i) => ({ f, i }))
          .sort((a, b) => main(a.f) - main(b.f) || a.i - b.i)
          .map(({ f }) => f);
      // Salt-water wording belongs to the sea and the estuaries only.
      const salty = g.id === "sea" || g.id === "estuary";
      const worded = (f: Creature): Creature => ({
        ...f,
        name: localName(f, regionSlug),
        where: salty && f.whereSea ? f.whereSea : f.where,
        ...(salty && f.tacticSea ? { tactic: f.tacticSea } : {}),
      });
      const advisories = advisoriesFor(place, g.id, w);
      const fish: SectionFish[] = [];
      const closed: SectionFish[] = [];
      const later: SectionFish[] = [];
      const undated: SectionFish[] = [];
      for (const base of byMain(recorded.filter(inGroup))) {
        // The one test (placeFish) that the Day page and the guide's fallback list ask too, through inSeasonOnPage.
        const { list: goes, why, season, note, rule, open } = placeFish(base, g.id, month, regionSlug, place, opts.today, marine);
        const local = season.local;
        const f = { ...base, months: goes === "undated" ? [] : season.months };
        const advice = advisoriesNaming(advisories, f.slug);
        const governed = !!place && !!rule;
        const keep = place ? keepWordsFor(place, f.slug, g.id) : null;
        const card: SectionFish = {
          ...worded(f),
          basis: governed ? "regulator" : "typical",
          anglingMonths: governed ? monthsLessClosed(place!, f.slug, f.months, g.id) : f.months,
          seasonFrom: season.from,
          evidence: recordedNote(info.fish[f.slug]),
          // Day 5 audit (14 November 2026): a row with no closed dates that names the fish reads as "open all year"
          // (closed-seasons namesOpenAllYear), even when its noKeep range covers the whole year. Then the fish may be
          // fished for but never kept, and the card says "all year, catch and release only", never a bare "Open all year".
          ...(open ? { openWords: open === "all year" && keep === "never" ? RELEASE_ALL_YEAR : open } : {}),
          ...(keep ? { keepWords: keep } : {}),
          ...(rule ? { regulator: rule.regulator, ruleSource: rule.source } : {}),
          ...(local ? { monthsNote: { text: local.text, source: local.source } } : season.fresh ? { monthsNote: season.fresh } : {}),
          ...(season.widened.length && goes !== "undated" ? { widened: season.widened } : {}),
          ...(advice.length ? { advisories: advice } : {}),
          ...(why ? { undatedWhy: why } : {}),
          ...(season.from === "records" && goes !== "undated" && recordsPeak(info.fish[f.slug], f.months) ? { peakOutside: recordsPeak(info.fish[f.slug], f.months) } : {}),
        };
        // Closed or catch and release only now (the note says which); recorded with no season; in season (with a note when
        // it closes later this month); or another time of year.
        if (goes === "closed") closed.push({ ...card, closure: note! });
        else if (goes === "undated") undated.push(card);
        else if (goes === "fish") fish.push(note ? { ...card, closure: note } : card);
        else later.push(card);
      }
      const waters = watersOf(g.id, w);
      // A whole water closed to fishing (the inner Oslofjord) is an avoid too.
      const banned = place && (g.id === "sea" || g.id === "estuary") ? closureFor(place, "*", g.id, month, opts.today) : null;
      const reason = banned?.closedNow && banned.allYear ? banned.note : avoidReason(g.id, w, waters);
      const away = g.id === "sea" ? seaAway(w) : g.id === "estuary" ? w.tidal?.away : undefined;
      return {
        id: g.id,
        title: away ? `${g.title}, ${away}` : g.title,
        ...(away ? { away } : {}),
        where: whereText(g.id, w),
        fish,
        closed,
        later,
        undated,
        unchecked: byMain(unchecked.filter(inGroup)).map((u): RegionalFish => ({ slug: u.slug, name: localName(u, regionSlug), latin: u.latin, reason: info.fish[u.slug]?.reason ?? "" })),
        waters,
        ...(reason ? { avoid: { reason } } : {}),
        notes: [
          ...notes.filter((n) => !n.water || n.water.includes(g.id)).map((n) => ({ note: n.note, regulator: n.regulator, source: n.source })),
          ...(g.id === "lakes" ? managed : []),
          ...trout.filter((t) => g.id === "rivers" || (g.id === "lakes" && t.still)).map(({ note, regulator, source }) => ({ note, regulator, source })),
        ],
        regulation,
        presence,
        habitats: w.habitats,
        advisories,
        ...(w.seaRunBlocked ? { seaRunBlocked: true } : {}),
      };
    })
    .filter((s) => s.fish.length || s.closed.length || s.later.length || s.undated.length || s.unchecked.length);
}
