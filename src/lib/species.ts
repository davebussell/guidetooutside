/**
 * The wild-edible library: 161 species with months, regions, zones,
 * identification, use and look-alikes, and the queries the place pages,
 * foraging pages and calendar run over it.
 *
 * Extracted from client module 21135 (the restored src/lib/species.jsx): the
 * species array (src/data/species.json `species`, as written, before the
 * extra-range maps) and the three extra-range maps passed to withRegions
 * (`extraRegions`, Europe, Africa, then later additions). SPECIES reproduces
 * data-recovered/21135.json `n` exactly; LOOKALIKE_KEYWORDS is 21135 `r`;
 * matchSpecies and monthName are the module's two client exports, unchanged.
 *
 * Months are written for the northern hemisphere — except for a species found
 * only in southern regions, which gives its real local months — and are read
 * half a year on south of the equator (libraryMonth in ecoregions). The
 * in-season order (speciesNow) was reconstructed from the live place pages:
 * species whose range was written for the place's own continent first, then
 * the rest, then the species found everywhere; shortest season first within
 * each, then by name. It reproduces every captured /foraging/<town> and
 * /guide/<town> list.
 *
 * Regional-accuracy audit, 14 October 2026 (agent RF; full table in
 * /home/claude/rebuild/audit/RF-findings.md, change list under `audit` in
 * species.json). The `zones` upper bounds were written for the continental
 * North American interior, where zone 8–9 means hot summers; in oceanic
 * Europe and the Pacific Northwest zone 9 means mild winters and cool
 * summers, so the caps excluded wild garlic, sloes, rowan, bilberry, birch
 * sap, garlic mustard, fireweed and spruce tips from every Atlantic-European
 * town (all zone 9 on the site), huckleberry, camas, Oregon grape, salmonberry
 * kin and cranberry from every Pacific-maritime town (Vancouver, Victoria,
 * Seattle, Portland: 9a), and fiddleheads and maple sap from Toronto (7a,
 * NRCan) and Asheville (7b, USDA 2023). Caps raised accordingly, and chickweed
 * and sheep sorrel (regions "all") given a ceiling of zone 11 so they stop
 * appearing in Lagos, Accra and Mombasa.
 * // source: Woodland Trust, "Wild garlic" — "common and widespread across the UK"
 * //   https://woodlandtrust.org.uk/trees-woods-and-wildlife/plants/wild-flowers/wild-garlic/
 * // source: POWO (Kew), Stellaria media distribution — introduced into Kenya, Tanzania,
 * //   Cape Provinces, Cameroon, Guinea; not recorded in Nigeria or Ghana
 * //   https://powo.science.kew.org/taxon/159330-1
 * // source: TRCA Kortright Centre (Vaughan, GTA) Maple Syrup Festival, March to mid-April
 * // source: NRCan Plant Hardiness Zones 2010 (Toronto 7a, Vancouver 9a); USDA 2023 (Asheville 7b, Seattle/Portland 9a)
 * The real fix is in logic (speciesNow/growsAt): a heat ceiling should be a
 * warmest-month mean, not a USDA zone — see the findings file.
 *
 * Round 2 (agent C, 14 October 2026): records may now carry geography finer
 * than the ecoregion — `excludeCountries`, `onlyCountries`, `regionCountries`
 * and `within` (a box inside one ecoregion) — applied with the place's
 * country and coordinates (L7), and `monthsByRegion` for a region whose
 * season is not a six-month shift of the northern one (L5): pine rings and
 * king boletes in the Cape's winter rains, termite mushrooms and amaranth
 * with each of Nairobi's two rainy seasons, and an empty list for the Cape's
 * shellfish, which have no month but a red-tide alert. Every value is sourced
 * in species.json `sources`.
 * // source: USDA Forest Service Silvics, common persimmon — range "to southeast Iowa… through eastern
 * //   Kansas and Oklahoma to the Valley of the Colorado River in Texas" https://research.fs.usda.gov/silvics/common-persimmon
 * // source: USDA Forest Service Silvics, pecan — "extends westward to eastern Kansas and central Texas"
 * //   https://research.fs.usda.gov/silvics/pecan
 * // source: Mail & Guardian, "Forage for edible mushrooms in Cape Town" (June 2022) — "Winter is the best time
 * //   for foraging in the Western Cape… Normally May"; porcini (Boletus edulis) under pine, poplar and oak
 * //   https://mg.co.za/friday/2022-06-13-forage-for-edible-mushrooms-in-cape-town
 * // source: Eikestadnuus, "Let's go foraging for mushrooms" — pine rings and ceps in the Simonsberg pine forest
 * //   "during the autumn months", after "the first autumn rains and cold" https://novanews.co.za/eikestadnuus/lets-go-foraging-for-mushrooms/
 * // source: Kisovi et al. 2007, Tanzania J. of Forestry and Nature Conservation 77(2) — wild mushrooms "appear
 * //   during the rain season and are equally available during the short and long rains"
 * //   https://ir-library.ku.ac.ke/items/1fd8e8a0-690c-4610-832e-217287ab15af/full
 * // source: Kenya Meteorological Department — long rains March–May, short rains October–December
 * //   https://meteo.go.ke/documents/10/MAM_2024_Forecast.pdf
 * // source: Oyetayo 2012 (PMC3354627), Termitomyces in Ondo and Ekiti States — "They usually appear between the
 * //   months of April through October" https://pmc.ncbi.nlm.nih.gov/articles/PMC3354627
 * // source: The Standard (Farm Kenya), Amaranth (terere) — sow "at the onset of the rainy season", leaves
 * //   "three to seven weeks after sowing" https://www.standardmedia.co.ke/farmkenya/article/2001495241/amaranthterere-how-to-cultivate-this-healthy-delicacy
 * // source: POWO (Kew), Vitellaria paradoxa — Senegal to Uganda, South Sudan and Ethiopia; not Kenya or Tanzania
 * //   https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:790034-1
 */

import { continentServed } from "@/lib/scope";
import data from "@/data/species.json";
import { getEcoregion, libraryMonth, withRegions } from "@/lib/ecoregions";

export type SpeciesKind = "green" | "fruit" | "berry" | "mushroom" | "coastal" | "root" | "tree" | "nut";

/** A box on the map, in degrees; any side may be open. */
export type GeoBox = { minLat?: number; maxLat?: number; minLon?: number; maxLon?: number };

/**
 * Geography finer than the ecoregion, shared by wild edibles and creatures:
 * where a record is absent though its ecoregion is listed.
 */
export type Ranged = {
  /** ISO 3166-1 alpha-2 codes where the record is absent though its ecoregion is listed. */
  excludeCountries?: string[];
  /** ISO codes the record is limited to, everywhere. */
  onlyCountries?: string[];
  /** Per ecoregion, the countries the record is limited to there. */
  regionCountries?: Record<string, string[]>;
  /** Per ecoregion, the box the record is limited to there. */
  within?: Record<string, GeoBox>;
  /**
   * Months in the place's own calendar for a region whose season is not a
   * six-month shift of the northern one. An empty list means no fixed
   * season there: shown all year with the caution ("by alert, not by month").
   */
  monthsByRegion?: Record<string, number[]>;
};

/** What the geography rules need to know about the place. */
export type PlaceLike = { countryCode?: string; lat?: number; lon?: number; admin1?: string; admin1Code?: string };

/**
 * Where a piece of regional text holds. Every condition given must hold; a place that does not say what a
 * condition needs (no region, no country, no province) does not match it and gets the record's own text.
 */
export type TextScope = {
  continents?: string[];
  regions?: string[];
  /** ISO 3166-1 alpha-2 codes. */
  countries?: string[];
  /** Province or state codes or names (any). */
  admin1?: string[];
  /** Province or state codes or names the text does not hold in. */
  notAdmin1?: string[];
};

/** The printed text of a library record. */
export type SpeciesText = { name: string; latin: string; habitat: string; identify: string; use: string; lookalikes: string; caution?: string };

export type Species = Ranged & {
  slug: string;
  name: string;
  latin: string;
  kind: SpeciesKind;
  /** English Wikipedia article title. */
  wiki: string;
  /** Months in season, northern calendar unless the species is southern-only. */
  months: number[];
  /** Ecoregion slugs, the first being the one the range was written from; "all" for cosmopolitan weeds. */
  regions: "all" | string[];
  /** Hardiness zones [min, max] the species is limited to, where it is. */
  zones?: [number, number];
  habitat: string;
  identify: string;
  use: string;
  lookalikes: string;
  caution?: string;
  /** Has a dangerous (poisonous) look-alike. */
  deadlyDouble?: boolean;
  /**
   * Text that holds only in part of the record's range, applied in order where the place matches (speciesHere);
   * a later entry wins a field. The record's own text is what a page with no place, or a place no entry
   * matches, prints. Audit of 10 November 2026: South African mussel names, Canada's yew and mulberry notes,
   * California's fennel and poison sumac "in swamps" were printed far outside the range they were written for.
   */
  local?: { where: TextScope; set: Partial<SpeciesText> }[];
  /**
   * The published native range, per ecoregion: boxes on the map, and a place there must lie in one of them. Each
   * entry rests on a range description in species.json `sources` (USDA Forest Service Silvics or the Woody Plant
   * Seed Manual), and a box leaves out only the towns the description plainly puts outside the range.
   *
   * Applied to the regional list only (inRange, in plant-presence split): a town's own records still decide its
   * in-season list, and the live panel prints what was recorded, because a tree recorded near a town grows there
   * whatever the range map says; both say such trees are likely planted (OUTSIDE_RANGE_NOTE; audit of 10 November
   * 2026, Day 4). Audit of 11 November 2026: wild pecans on the regional list at Columbus,
   * Indianapolis and Nashville, beyond the native range ("eastward to western Mississippi and western Tennessee").
   */
  range?: Record<string, GeoBox[]>;
  /**
   * The whole published native range, as boxes round it on the map, for a species that has `range`: a place outside every
   * box is outside the native range whatever its ecoregion, listed or not. From the same range descriptions (species.json
   * `sources`), each box leaving out only what the description plainly puts outside. Audit of 10 November 2026 (Day 4):
   * "Wild pecans" on the Sacramento panel from 6 records, where the library lists no Californian region and so held no
   * box to test; Silvics puts pecan's range between central Texas and the Alabama margin.
   */
  nativeBounds?: GeoBox[];
  /**
   * What a record of the entry is a record of, for an entry matched at genus level (latin "Quercus spp."): "oak trees".
   * The live panel adds up every species of the genus under the entry, and a record is of the plant, not of the food.
   * Audit of 10 November 2026 (Day 4): "Acorns: 206 records within 40 km this month" at Orlando counted oak trees.
   */
  recordOf?: string;
};

const D = data as unknown as { species: Species[]; extraRegions: Record<string, string[]>[] };

/**
 * Is a library record written for a served continent (src/lib/scope.ts)? One written for every region is. A record
 * written only for parked regions has no page and is in no list.
 */
export const recordServed = (regions: "all" | string[]): boolean =>
  regions === "all" || regions.some((r) => continentServed(getEcoregion(r)?.continent as string | undefined));

/** Every species in the library, parked ones included: for the build checks only. */
export const ALL_SPECIES: Species[] = withRegions(D.species, ...D.extraRegions) as Species[];
/** The species the site serves. */
export const SPECIES: Species[] = ALL_SPECIES.filter((s) => recordServed(s.regions));

const BY_SLUG = new Map(SPECIES.map((s) => [s.slug, s]));
export const getSpecies = (slug: string) => BY_SLUG.get(slug);

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const monthName = (m: number) => MONTHS[m - 1];

/** The continent of an ecoregion ("north-america" for the regions that do not say). */
export const continentOfRegion = (regionSlug: string): string => (getEcoregion(regionSlug)?.continent as string | undefined) ?? "north-america";

/** Species that grow only on the shore though they are not seaweeds or shellfish, so they are left out of an inland place's lists. */
export const COASTAL_SPECIES = new Set<string>(["sea-grape"]);
/** A species of the sea shore: a coastal kind, or a shore-only plant. */
export const isShoreSpecies = (s: { slug: string; kind?: string }) => s.kind === "coastal" || COASTAL_SPECIES.has(s.slug);

type Seasonal = Ranged & { months: number[]; regions: "all" | string[] };

/** True when `region` reads this item's months half a year on (a southern place, a species written for the north). */
const shifted = (item: Seasonal, region?: string) => !!region && libraryMonth(1, region, item.regions) !== 1;

/** The record's own months for the region, when it has them (already in the place's calendar). */
const regionMonths = (item: Seasonal, region?: string): number[] | undefined => (region ? item.monthsByRegion?.[region] : undefined);

/**
 * The item with its months in the place's own calendar: the region's own
 * list where the record gives one, else shifted half a year for a southern
 * place reading a northern range.
 */
export function inLocalMonths<T extends Seasonal>(item: T, regionSlug?: string): T {
  const own = regionMonths(item, regionSlug);
  if (own) return { ...item, months: own };
  return shifted(item, regionSlug) ? { ...item, months: item.months.map((m) => ((m + 5) % 12) + 1) } : item;
}

/**
 * In season in `month` at a place in `regionSlug` (any place, if none). A
 * record whose months for the region are an empty list has no fixed season
 * there and counts as in season all year (its caution says how to decide).
 */
export const inSeasonAt = (s: Seasonal, month: number, regionSlug?: string): boolean => {
  const own = regionMonths(s, regionSlug);
  if (own) return own.length === 0 || own.includes(month);
  return s.months.includes(libraryMonth(month, regionSlug, s.regions));
};

/** True when the scope covers the place (see TextScope). */
export function scopeMatches(w: TextScope, regionSlug?: string, place?: PlaceLike | null): boolean {
  if (w.continents && !(regionSlug && w.continents.includes(continentOfRegion(regionSlug)))) return false;
  if (w.regions && !(regionSlug && w.regions.includes(regionSlug))) return false;
  const cc = place?.countryCode?.toUpperCase();
  if (w.countries && !(cc && w.countries.some((c) => c.toUpperCase() === cc))) return false;
  const here = [place?.admin1, place?.admin1Code].filter((x): x is string => !!x).map((x) => x.toLowerCase());
  if (w.admin1 && !w.admin1.some((a) => here.includes(a.toLowerCase()))) return false;
  if (w.notAdmin1 && (!here.length || w.notAdmin1.some((a) => here.includes(a.toLowerCase())))) return false;
  return true;
}

/**
 * The record with the text for this place: each `local` entry whose scope covers the place, in order. Applied
 * where a list is built (speciesNow, speciesSoon) and again when a stored record is shown (local-flora floraHere),
 * so a record written before an entry existed prints the right text too.
 */
export function speciesHere<T extends Species>(s: T, regionSlug?: string, place?: PlaceLike | null): T {
  if (!s.local?.length) return s;
  let out: T = s;
  for (const l of s.local) if (scopeMatches(l.where, regionSlug, place)) out = { ...out, ...l.set };
  return out;
}

/** True when the record has no fixed season in the region (shellfish by red-tide alert). */
export const noFixedSeason = (s: Seasonal, regionSlug?: string): boolean => regionMonths(s, regionSlug)?.length === 0;

const inBox = (b: GeoBox, lat: number, lon: number) =>
  !(b.minLat != null && lat < b.minLat) && !(b.maxLat != null && lat > b.maxLat) && !(b.minLon != null && lon < b.minLon) && !(b.maxLon != null && lon > b.maxLon);

/**
 * Whether a record's finer geography admits the place: its country against
 * `excludeCountries`, `onlyCountries` and the region's `regionCountries`,
 * and its coordinates against the region's `within` box. A place without a
 * country or coordinates passes the rules that need them.
 */
export function placeAllows(item: Ranged, regionSlug?: string, place?: PlaceLike | null): boolean {
  if (!place) return true;
  const cc = place.countryCode?.toUpperCase();
  if (cc) {
    if (item.excludeCountries?.some((c) => c.toUpperCase() === cc)) return false;
    if (item.onlyCountries && !item.onlyCountries.some((c) => c.toUpperCase() === cc)) return false;
    const inRegion = regionSlug ? item.regionCountries?.[regionSlug] : undefined;
    if (inRegion && !inRegion.some((c) => c.toUpperCase() === cc)) return false;
  }
  const box = regionSlug ? item.within?.[regionSlug] : undefined;
  if (box && place.lat != null && place.lon != null && !inBox(box, place.lat, place.lon)) return false;
  return true;
}

/**
 * Whether the place lies inside the record's published native range: inside one of its `nativeBounds` boxes where it has
 * them, and inside one of the boxes for its region (Species `range`). A region with no range given, or a place without
 * coordinates, passes. False means the description plainly puts the place outside the native range, so trees recorded
 * there were planted or grew from planted ones (SeasonalForaging and the live panel say so; audit of 10 November 2026,
 * Day 4: pecans at Sacramento).
 */
export function inRange(s: Pick<Species, "range" | "nativeBounds">, regionSlug?: string, place?: PlaceLike | null): boolean {
  if (place?.lat == null || place?.lon == null) return true;
  if (s.nativeBounds?.length && !s.nativeBounds.some((b) => inBox(b, place.lat!, place.lon!))) return false;
  const boxes = regionSlug ? s.range?.[regionSlug] : undefined;
  if (!boxes?.length) return true;
  return boxes.some((b) => inBox(b, place.lat!, place.lon!));
}

/**
 * Printed with a food recorded where inRange is false (the live panel, and the in-season list of a town in the presence
 * table). Every species with a `range` or `nativeBounds` is a tree (scripts/check-foraging.ts holds the list), and its
 * range rests on a USDA Forest Service description (Silvics or the Woody Plant Seed Manual) in species.json `sources`.
 * Outside a native range a tree was planted or grew from planted ones; the note says "likely" because a record does not
 * say which.
 */
export const OUTSIDE_RANGE_NOTE = "Outside its native range (USDA Forest Service), so the trees recorded here are likely planted, or grown from planted ones.";

/** True for a southern-hemisphere ecoregion (the site reads the library's months half a year on there). */
const southern = (regionSlug: string) => !!(getEcoregion(regionSlug) as { south?: boolean } | undefined)?.south;

/**
 * Whether a record's text and months were written for a place in `regionSlug`: the record covers every region, lists
 * this one, or lists one on the same continent and in the same hemisphere (its months then hold in the place's calendar
 * as libraryMonth reads them). Audit of 10 November 2026 (Day 4): "Sour fig (suurvy)" on the Santa Barbara and San Diego
 * panels from 16 and 35 records, with the Cape's Afrikaans name, habitat, puff adders, CapeNature permit and
 * southern-summer months read as November to March in California, where the plant is the invasive iceplant; the stored
 * records also put North American staghorn sumac, goldenrod and Jerusalem artichoke text, and African amaranth text, on
 * European panels. A record not written for the place is never shown there as a library food: the live panel names and
 * counts it with the other species recorded (local-flora knownAmong), with no months and none of the library's text.
 */
export function writtenFor(s: Pick<Species, "regions">, regionSlug?: string): boolean {
  if (!regionSlug || s.regions === "all" || s.regions.includes(regionSlug)) return true;
  const continent = continentOfRegion(regionSlug);
  const south = southern(regionSlug);
  return s.regions.some((r) => continentOfRegion(r) === continent && southern(r) === south);
}

type Where = { coast?: boolean; place?: PlaceLike | null };
const growsAt = (s: Species, regionSlug?: string, zone?: number, opts?: Where) =>
  (!regionSlug || s.regions === "all" || s.regions.includes(regionSlug)) &&
  (zone == null || !s.zones || (zone >= s.zones[0] && zone <= s.zones[1])) &&
  !(opts?.coast === false && isShoreSpecies(s)) &&
  placeAllows(s, regionSlug, opts?.place);

/** 0: written for the place's continent; 1: other ranges; 2: found everywhere. */
function tier(s: Species, continent: string | null): number {
  if (s.regions === "all") return 2;
  return continent && continentOfRegion(s.regions[0]) === continent ? 0 : 1;
}
/** A record with no fixed season sorts after every seasonal one. */
const seasonLength = (s: Seasonal, region?: string) => (noFixedSeason(s, region) ? 13 : s.months.length);
const bySeason = (continent: string | null, region?: string) => (a: Species, b: Species) =>
  tier(a, continent) - tier(b, continent) || seasonLength(a, region) - seasonLength(b, region) || a.name.localeCompare(b.name);

/**
 * Wild edibles in season in `month` at a place: in its region (any region if
 * none), within its hardiness zone, and — when `coast` is false — leaving out
 * the shore species; with `place`, also within the record's country and box
 * rules. Native-first: species written for the place's continent, then the
 * rest, then the cosmopolitan weeds; shortest season first, then by name.
 * Months come back in the place's local calendar.
 */
export function speciesNow(month: number, regionSlug?: string, zone?: number, opts?: Where): Species[] {
  const continent = regionSlug ? continentOfRegion(regionSlug) : null;
  return SPECIES.filter((s) => growsAt(s, regionSlug, zone, opts) && inSeasonAt(s, month, regionSlug))
    .sort(bySeason(continent, regionSlug))
    .map((s) => speciesHere(inLocalMonths(s, regionSlug), regionSlug, opts?.place));
}

/** Wild edibles not in season in `month` but coming in within the next two months, by name; local months. */
export function speciesSoon(month: number, regionSlug?: string, zone?: number, opts?: Where): Species[] {
  const next = [(month % 12) + 1, ((month + 1) % 12) + 1];
  return SPECIES.filter(
    (s) => growsAt(s, regionSlug, zone, opts) && !inSeasonAt(s, month, regionSlug) && next.some((m) => inSeasonAt(s, m, regionSlug)),
  )
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((s) => speciesHere(inLocalMonths(s, regionSlug), regionSlug, opts?.place));
}

/**
 * "Also in season in <month>" on a species page: the others written for its
 * continent, then the cosmopolitan ones, in the in-season order (for a
 * cosmopolitan species, every species in season). The live page hands the first 24
 * to RegionPick (limit 3), which shows the first three, or the first three in
 * the reader's region.
 */
export function alsoInSeason(s: Species, month: number, n = 24): Species[] {
  const continent = s.regions === "all" ? null : continentOfRegion(s.regions[0]);
  const list = SPECIES.filter(
    (o) => o.slug !== s.slug && o.months.includes(month) && (!continent || o.regions === "all" || continentOfRegion(o.regions[0]) === continent),
  ).sort(bySeason(continent));
  return list.slice(0, n);
}

/** "Wild edibles in Zone n": species limited to a zone range that includes it, narrowest range first (species with no zone limit last), library order within; the zone pages show six. */
export function speciesInZone(zone: number, n = 6): Species[] {
  const width = (s: Species) => (s.zones ? s.zones[1] - s.zones[0] : Infinity);
  return SPECIES.map((s, i) => ({ s, i }))
    .filter(({ s }) => !s.zones || (zone >= s.zones[0] && zone <= s.zones[1]))
    .sort((a, b) => width(a.s) - width(b.s) || a.i - b.i)
    .slice(0, n)
    .map(({ s }) => s);
}

/** Months as runs, "March – April, September – November"; a run through December is kept whole ("September – April"); "No fixed season" for an empty list. */
export function monthRange(months: number[]): string {
  if (!months.length) return "No fixed season";
  if (months.length >= 12) return `${MONTHS[0]} – ${MONTHS[11]}`;
  const set = new Set(months);
  const runs: string[] = [];
  for (let m = 1; m <= 12; m++) {
    if (!set.has(m) || set.has(((m + 10) % 12) + 1)) continue;
    let end = m;
    while (set.has((end % 12) + 1) && (end % 12) + 1 !== m) end = (end % 12) + 1;
    runs.push(end === m ? MONTHS[m - 1] : `${MONTHS[m - 1]} – ${MONTHS[end - 1]}`);
  }
  return runs.join(", ");
}

/** Look-alike names that must not be read as the edible (a "death camas" record is not camas). 21135 `r`. */
export const LOOKALIKE_KEYWORDS: Record<string, string[]> = {
  camas: ["death camas", "toxicoscordion", "zigadenus"],
  "wild-carrot": ["poison hemlock", "water hemlock", "conium", "cicuta"],
  "cow-parsnip": ["giant hogweed", "mantegazzianum"],
  "white-pine": ["blister rust"],
  "wild-currant": ["flowering currant", "indian currant", "coralberry"],
  "black-cherry": ["chokecherry", "choke cherry"],
};

const norm = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** The library species a free-text name refers to: by binomial first, then by common name. */
export const matchSpecies = function (text: string): Species | undefined {
  const q = norm(text);
  if (!q) return;
  const excluded = (s: Species) => (LOOKALIKE_KEYWORDS[s.slug] ?? []).some((k) => q.includes(k));
  for (const s of SPECIES) {
    const latin = norm(s.latin.replace(/ spp\.?/, ""));
    if (latin.split(" ").length > 1 && q.includes(latin)) return s;
  }
  for (const s of SPECIES) {
    if (excluded(s)) continue;
    const name = norm(s.name.replace(/\(.*?\)/g, ""));
    if (name.length >= 5 && (q.includes(name) || (q.length >= 5 && name.includes(q)))) return s;
    const alt = norm((s.name.match(/\((.*?)\)/) || [])[1] ?? "");
    if (alt.length >= 5 && q.includes(alt)) return s;
  }
};
