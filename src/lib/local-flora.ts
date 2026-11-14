/**
 * What has actually been found near a place this month: the plants and fungi
 * recorded within FLORA_RADIUS_KM (40 km; iNaturalist research-grade
 * observations, species counts for the calendar month over every year on
 * record), matched against the site's library of wild edibles and its hazard
 * roster.
 *
 * The answer for a place and month is stored as a record
 * (`rec:v1:flora:<lat2>_<lon2>_<month>`, fresh for two weeks) and served from
 * there; the raw counts are cached under `inat:v1:<group>:<lat1>:<lon1>:<month>`
 * and the photographs looked up for unmatched taxa under
 * `inatphoto:v1:<taxonId>`. Only openly licensed photographs (CC0, CC BY,
 * CC BY-SA) are used.
 *
 * Species that are not in the library are named and counted only — never
 * presented as edible.
 */
import { cacheGet, cacheSet } from "./cache";
import { readRecord } from "./records";
import { SPECIES, continentOfRegion, getSpecies, inLocalMonths, inRange, speciesHere, writtenFor, type PlaceLike, type Species } from "./species";
import { classifyEcoregion, libraryMonth } from "./ecoregions";
import { MIN_MONTH_RECORDS, presenceSoon, type LiveEvidence } from "./plant-presence";
import { FLORA_RADIUS_KM } from "./plant-presence-info";
import { bansOn } from "@/data/harvest-bans";
import { hazardFor, hazardHere, type Hazard } from "@/data/hazards";

export type Photo = { url: string; author: string; license: string; licenseUrl: string; source: string };

export type Taxon = {
  id: number;
  group: "Fungi" | "Plantae";
  latin: string;
  common: string | null;
  count: number;
  wikipedia: string | null;
  photo: Photo | null;
};

export type LocalFind = {
  taxon: Taxon;
  species: Species | null;
  hazard: Hazard | null;
  /**
   * Set on a panel entry (knownAmong) where the place lies outside the species' published native range (species inRange):
   * the trees recorded are likely planted. Audit of 10 November 2026 (Day 4): "Wild pecans" at Sacramento on 6 records.
   */
  outsideRange?: boolean;
};

export type LocalFlora = {
  /** In the library, in season, found here at least MIN_MONTH_RECORDS times in the month, and not banned here: most recorded first. */
  known: LocalFind[];
  /** Everything else recorded, by group, most recorded first. */
  alsoFungi: LocalFind[];
  alsoPlants: LocalFind[];
  /** Library species coming into season in the next two months that have been recorded near this place in those months (empty where the presence table has no data). */
  comingSoon: Species[];
  /** Hazard-roster species recorded here, the deadliest and commonest first. */
  hazards: { hazard: Hazard; count: number }[];
  /** The commonest tree genera recorded. */
  trees: { genus: string; label: string; count: number }[];
  /** How many species were recorded in all. */
  recorded: number;
  /** False when the observation service could not be reached. */
  live: boolean;
};

/** Two weeks: the month's record fills in as people log what they find. */
export const FLORA_FRESH_SECONDS = 14 * 24 * 3600;

export const floraId = (lat: number, lon: number, month: number) => `${lat.toFixed(2)}_${lon.toFixed(2)}_${month}`;

/** Tree genera worth naming, and what they are called. */
export const TREES: Record<string, string> = {
  Abies: "fir",
  Acer: "maple",
  Alnus: "alder",
  Arbutus: "arbutus",
  Betula: "birch",
  Carpinus: "hornbeam",
  Carya: "hickory",
  Castanea: "chestnut",
  Celtis: "hackberry",
  Fagus: "beech",
  Fraxinus: "ash",
  Juglans: "walnut",
  Larix: "larch",
  Liriodendron: "tulip tree",
  Malus: "apple",
  Morus: "mulberry",
  Nyssa: "tupelo",
  Ostrya: "ironwood",
  Picea: "spruce",
  Pinus: "pine",
  Platanus: "sycamore",
  Populus: "poplar and aspen",
  Prunus: "cherry",
  Pseudotsuga: "Douglas-fir",
  Quercus: "oak",
  Robinia: "black locust",
  Salix: "willow",
  Sequoia: "redwood",
  Sorbus: "mountain ash",
  Thuja: "cedar",
  Tilia: "basswood",
  Tsuga: "hemlock",
  Ulmus: "elm",
};

/** The trees a library mushroom or nut is found with, in the order they are named. */
export const HOSTS: Record<string, string[]> = {
  "black-walnut": ["Juglans"],
  "chicken-of-the-woods": ["Quercus", "Fagus", "Prunus", "Salix"],
  "hen-of-the-woods": ["Quercus"],
  "king-bolete": ["Picea", "Pinus", "Abies", "Tsuga", "Quercus"],
  "lions-mane": ["Fagus", "Quercus", "Acer", "Juglans"],
  "lobster-mushroom": ["Tsuga", "Picea", "Abies"],
  matsutake: ["Pinus", "Abies", "Pseudotsuga"],
  "oyster-mushroom": ["Populus", "Fagus", "Acer", "Ulmus", "Salix"],
};

/**
 * Species that are protected where they grow, so that whoever lists one is
 * told. Keyed by lower-case binomial. A caution here is shown on every card
 * and tree list that names the species (an observed-only card included) and is
 * a statement of status with its sources, nothing more.
 * // source: Government of Ontario, "Butternut" species-at-risk page: butternut is "Endangered" in Ontario;
 * //   reassessed November 2017; habitat protected since 30 June 2013; get a Butternut health assessment
 * //   "before impacting any Butternut tree of any age" https://ontario.ca/page/butternut-species-risk
 * // source: Government of Canada, species at risk public registry, COSEWIC status report 2017: Endangered
 * //   (first designated November 2003, confirmed April 2017); federally Endangered and listed on Schedule 1
 * //   of the Species at Risk Act
 * //   https://www.canada.ca/en/environment-climate-change/services/species-risk-public-registry/cosewic-assessments-status-reports/butternut-2017.html
 * // checked 2 November 2026. The Ontario page does not state the federal status; the Canada page does.
 */
export type AtRisk = { name: string; headline: string; text: string; sources: { label: string; url: string }[]; checked: string };
export const AT_RISK: Record<string, AtRisk> = {
  "juglans cinerea": {
    name: "Butternut",
    headline: "Endangered in Ontario and federally",
    text: "Butternut (Juglans cinerea) is listed as Endangered in Ontario and federally in Canada. In Ontario, get a butternut health assessment before affecting any butternut tree, even a dead or dying one. Leave butternut trees alone.",
    sources: [
      { label: "Government of Ontario: Butternut (species at risk)", url: "https://ontario.ca/page/butternut-species-risk" },
      { label: "Government of Canada: COSEWIC butternut status report 2017 (SARA Schedule 1)", url: "https://www.canada.ca/en/environment-climate-change/services/species-risk-public-registry/cosewic-assessments-status-reports/butternut-2017.html" },
    ],
    checked: "2026-11-02",
  },
};
/** The protection note for a recorded taxon, by its scientific name. */
export const atRiskFor = (latin: string): AtRisk | undefined => AT_RISK[latin.replace(/\s+(spp?\.|sp\.)$/i, "").trim().toLowerCase()];

/** "oak and beech": the host trees of a species that are among the commonest here. */
export function hostsHere(slug: string, trees: LocalFlora["trees"]): string[] {
  const here = new Set(trees.map((t) => t.genus));
  return (HOSTS[slug] ?? []).filter((g) => here.has(g)).map((g) => TREES[g]);
}

const binomial = (latin: string) =>
  latin
    .replace(/\s+(spp?\.|sp\.)$/i, "")
    .trim()
    .toLowerCase();

const SPECIES_BY_LATIN = new Map<string, Species>();
const SPECIES_BY_GENUS = new Map<string, Species>();
for (const s of SPECIES) {
  const l = binomial(s.latin);
  if (/\s/.test(l)) SPECIES_BY_LATIN.set(l, s);
  else SPECIES_BY_GENUS.set(l, s);
}

const SEVERITY_RANK = { deadly: 0, serious: 1, irritant: 2 } as const;

/** The hazard-roster entries among some recorded taxa, a genus entry counting all its species. */
export function hazardsIn(taxa: { latin: string; count: number }[]): { hazard: Hazard; count: number }[] {
  const by = new Map<Hazard, number>();
  for (const t of taxa) {
    const h = hazardFor(t.latin);
    if (h) by.set(h, (by.get(h) ?? 0) + t.count);
  }
  return [...by.entries()]
    .map(([hazard, count]) => ({ hazard, count }))
    .sort((a, b) => SEVERITY_RANK[a.hazard.severity] - SEVERITY_RANK[b.hazard.severity] || b.count - a.count);
}

function findFor(t: Taxon): LocalFind {
  const l = binomial(t.latin);
  const species = SPECIES_BY_LATIN.get(l) ?? SPECIES_BY_GENUS.get(l.split(" ")[0]) ?? null;
  const hazard = hazardFor(t.latin) ?? null;
  return { taxon: t, species, hazard };
}

// ------------------------------------------------------------ iNaturalist

const INAT = "https://api.inaturalist.org/v1";
const OPEN = new Set(["cc0", "cc-by", "cc-by-sa"]);
const LICENSE: Record<string, { label: string; url: string }> = {
  cc0: { label: "CC0", url: "https://creativecommons.org/publicdomain/zero/1.0/" },
  "cc-by": { label: "CC BY", url: "https://creativecommons.org/licenses/by/4.0/" },
  "cc-by-sa": { label: "CC BY-SA", url: "https://creativecommons.org/licenses/by-sa/4.0/" },
};

type InatPhoto = { id: number; license_code: string | null; attribution: string; medium_url?: string; url?: string };

function photoOf(p: InatPhoto | null | undefined): Photo | null {
  if (!p || !p.license_code || !OPEN.has(p.license_code)) return null;
  const lic = LICENSE[p.license_code];
  const url = p.medium_url ?? p.url?.replace("/square.", "/medium.");
  if (!url) return null;
  // "(c) Tom Norton, some rights reserved (CC BY)" → "Tom Norton"; CC0 → "no rights reserved".
  const author = p.license_code === "cc0" ? "no rights reserved" : p.attribution.replace(/^\(c\)\s*/i, "").replace(/,\s*(some|all|no) rights reserved.*$/i, "").trim();
  return { url, author, license: lic.label, licenseUrl: lic.url, source: `https://www.inaturalist.org/photos/${p.id}` };
}

async function inatJson<T>(path: string): Promise<T> {
  const res = await fetch(`${INAT}${path}`, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(12_000) });
  if (!res.ok) throw new Error(`inat ${res.status}`);
  return (await res.json()) as T;
}

/** The species recorded within FLORA_RADIUS_KM in a calendar month (every year on record), one group, most recorded first. Cached a year. */
export async function localTaxa(lat: number, lon: number, month: number, group: "Fungi" | "Plantae", n = 200): Promise<Taxon[]> {
  const key = `inat:v1:${group}:${lat.toFixed(1)}:${lon.toFixed(1)}:${month}`;
  const hit = await cacheGet<Taxon[]>(key);
  if (hit) return hit;
  try {
    const q = `/observations/species_counts?lat=${lat}&lng=${lon}&radius=${FLORA_RADIUS_KM}&month=${month}&iconic_taxa=${group}&quality_grade=research&per_page=${n}&locale=en`;
    const json = await inatJson<{ results: { count: number; taxon: { id: number; name: string; preferred_common_name?: string; wikipedia_url?: string | null; default_photo?: InatPhoto | null } }[] }>(q);
    const taxa: Taxon[] = json.results.map((r) => ({
      id: r.taxon.id,
      group,
      latin: r.taxon.name,
      common: r.taxon.preferred_common_name ?? null,
      count: r.count,
      wikipedia: r.taxon.wikipedia_url ?? null,
      photo: photoOf(r.taxon.default_photo),
    }));
    await cacheSet(key, taxa, 365 * 24 * 3600);
    return taxa;
  } catch {
    return [];
  }
}

/** An openly licensed photograph for a taxon, where its default one is not. Cached. */
async function photoFor(id: number): Promise<Photo | null> {
  const key = `inatphoto:v1:${id}`;
  const hit = await cacheGet<{ photo: Photo | null }>(key);
  if (hit) return hit.photo;
  try {
    const json = await inatJson<{ results: { photos: InatPhoto[] }[] }>(
      `/observations?taxon_id=${id}&photo_license=cc0,cc-by,cc-by-sa&quality_grade=research&order_by=votes&per_page=1`,
    );
    const photo = photoOf(json.results[0]?.photos?.find((p) => p.license_code && OPEN.has(p.license_code)));
    await cacheSet(key, { photo }, 365 * 24 * 3600);
    return photo;
  } catch {
    return null;
  }
}

async function withPhotos(taxa: Taxon[]): Promise<Taxon[]> {
  return Promise.all(taxa.map(async (t) => (t.photo ? t : { ...t, photo: await photoFor(t.id) })));
}

/**
 * The finds that may sit under a food heading ("Wild edibles recorded nearby"):
 * only taxa that match a curated edible of the library, are not on the hazard
 * roster, are in the library's season for the month, and were recorded here this
 * month (the finds come from the month's own record). A taxon that is merely
 * observed nearby (black knot, alder buckthorn, a crust fungus) has no library
 * entry, so it can never come through here; it is named and counted only, in the
 * "Other species recorded nearby" block, which says it is not a list of edibles.
 *
 * Audit of 10 November 2026: the panel and the weekly headline must agree, under the two-records rule of 5 November,
 * so an entry needs MIN_MONTH_RECORDS records (its taxa added together) and none banned at the place by a regulator.
 * The species comes back with the text for the place (speciesHere).
 */
export function knownAmong(finds: LocalFind[], month: number, region: string, place?: PlaceLike | null): LocalFind[] {
  const byEntry = new Map<string, LocalFind>();
  for (const f of finds) {
    // Audit of 10 November 2026 (Day 4): a record written for another continent or hemisphere (the Cape's sour fig at
    // Santa Barbara) has neither text nor months for the place; it is named and counted with the other species instead.
    if (!f.species || f.hazard || !writtenFor(f.species, region) || !f.species.months.includes(libraryMonth(month, region, f.species.regions))) continue;
    const prev = byEntry.get(f.species.slug);
    if (!prev) byEntry.set(f.species.slug, { ...f, species: speciesHere(inLocalMonths(f.species, region), region, place) });
    else prev.taxon = { ...(prev.taxon.count >= f.taxon.count ? prev.taxon : f.taxon), count: prev.taxon.count + f.taxon.count };
  }
  return [...byEntry.values()]
    .filter((f) => f.taxon.count >= MIN_MONTH_RECORDS && !bansOn(f.species!.slug, place ?? null, month).length)
    .map((f) => ({ ...f, outsideRange: !inRange(f.species!, region, place) }))
    .sort((a, b) => b.taxon.count - a.taxon.count);
}

/**
 * What a panel entry's records are records of, or null where a record is of the food itself (a mushroom, a green, a
 * seaweed). A record of a nut, fruit, berry, root or tree food is of the plant, whatever it bore that day; an entry
 * matched at genus level adds up every species of the genus. Audit of 10 November 2026 (Day 4): "Acorns: 206 records
 * within 40 km this month" at Orlando (174 at Fort Lauderdale, 110 at Tampa) counted observations of oak trees, not of
 * acorns.
 */
export function recordedAs(f: Pick<LocalFind, "taxon" | "species">): string | null {
  const s = f.species;
  if (!s) return null;
  const lib = binomial(s.latin);
  if (!/\s/.test(lib)) {
    const genus = lib.charAt(0).toUpperCase() + lib.slice(1);
    return `${s.recordOf ?? (f.taxon.group === "Fungi" ? "fungi" : "plants")} (${genus}, all species)`;
  }
  // A green or a seaweed is eaten whole: a record of the plant is a record of the food.
  if (f.taxon.group === "Fungi" || s.kind === "green" || s.kind === "coastal" || s.kind === "mushroom") return null;
  return `the plant (${f.taxon.common ? `${f.taxon.common}, ` : ""}${f.taxon.latin})`;
}

/** A recorded taxon matched to the library (or not) and to the hazard roster; exported for the checks. */
export const findForTaxon = findFor;

/**
 * Everything the foraging page needs about one place in one month.
 *
 * Both groups are fetched together and the whole answer is cached upstream, so
 * a warm place costs nothing; a cold one costs two requests and degrades to the
 * curated library alone if the service is slow.
 */
export async function floraNearby(lat: number, lon: number, month: number, opts: { photos?: number } = {}): Promise<LocalFlora> {
  const [fungi, plants] = await Promise.all([localTaxa(lat, lon, month, "Fungi", 200), localTaxa(lat, lon, month, "Plantae", 200)]);
  const all = [...fungi, ...plants];
  const live = all.length > 0;
  // The library's months are written for the north; south of the equator they are read half a year on.
  const region = classifyEcoregion(lat, lon)!.slug as string;
  const inSeason = (s: Species, m: number) => s.months.includes(libraryMonth(m, region, s.regions));

  const trees = Object.entries(
    all.reduce<Record<string, number>>((acc, t) => {
      const g = t.latin.split(" ")[0];
      if (TREES[g]) acc[g] = (acc[g] ?? 0) + t.count;
      return acc;
    }, {}),
  )
    .map(([genus, count]) => ({ genus, label: TREES[genus], count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const finds = all.map(findFor);

  // In season, in our library, and someone has actually found it here.
  //
  // One entry can match several observed species — "Acorns" is every oak in the
  // wood — so the counts are added and the commonest one represents it, rather
  // than the same page listing acorns three times.
  const known = knownAmong(finds, month, region, { lat, lon });

  const seen = new Set(known.map((f) => f.species!.slug));
  const rest = finds.filter((f) => !f.hazard && (!f.species || !seen.has(f.species.slug))).sort((a, b) => b.taxon.count - a.taxon.count);

  // Photographs cost a lookup each, so only the ones about to be shown get one.
  const want = opts.photos ?? 12;
  const split = async (group: "Fungi" | "Plantae") => {
    const list = rest.filter((f) => f.taxon.group === group);
    const pics = await withPhotos(list.slice(0, want).map((f) => f.taxon));
    return [...pics.map((taxon, i) => ({ ...list[i], taxon })), ...list.slice(want)];
  };
  const [alsoFungi, alsoPlants] = await Promise.all([split("Fungi"), split("Plantae")]);

  const next = [(month % 12) + 1, ((month + 1) % 12) + 1];
  // Only records written for the place's continent and hemisphere (writtenFor): the Cape's southern-summer months are
  // not a northern town's (audit of 10 November 2026, Day 4).
  const comingSoon = SPECIES.filter((s) => writtenFor(s, region) && !inSeason(s, month) && next.some((m) => inSeason(s, m)))
    .map((s) => inLocalMonths(s, region))
    // A continent's worth of species is not "coming into season" at this place: only those recorded within
    // about 50 km of it in the coming months (the presence table), and none at a place the table does not cover.
    .filter((s) => presenceSoon({ lat, lon }, s, month).state === "ready");

  return {
    known,
    alsoFungi,
    alsoPlants,
    comingSoon,
    // Stored as the roster has them; the continent's name and sentence are added when the card is shown (floraHere).
    hazards: hazardsIn(all.map((t) => ({ latin: t.latin, count: t.count }))),
    trees,
    recorded: all.length,
    live,
  };
}

/**
 * A stored flora record as it is shown at a place: the edibles, the coming list and the hazard cards re-read from
 * today's library and roster, with the text for the place (speciesHere, hazardHere), the two-records rule and the
 * regulators' bans. Applied every time the record is shown, not only when it is written: audit of 10 November 2026,
 * records stored before the hazard text was scoped (`rec:v1:flora`) printed the South African thorn-apple, senecio,
 * euphorbia, chinaberry and castor oil notes on all 11 US foraging pages.
 */
export function floraHere(flora: LocalFlora, place: PlaceLike & { lat: number; lon: number }, month: number): LocalFlora {
  const region = classifyEcoregion(place.lat, place.lon)!.slug as string;
  const continent = continentOfRegion(region);
  const stored = flora.known.map((f) => findFor(f.taxon));
  const known = knownAmong(stored, month, region, place);
  // A stored entry whose record is not written for the place (audit of 10 November 2026, Day 4: the Cape's sour fig at
  // Santa Barbara) is named and counted with the other species, as a fresh record would have it, where it stands for a
  // single recorded species; an entry that added up a whole genus has no one name for its count, and is left out.
  // The same holds for a stored entry whose record is parked (src/lib/scope.ts): the store listed it as a food when it
  // was written, it matches no served record now, and it is named and counted with the other species.
  const notHere = stored.filter(
    (f, i) =>
      (f.species && !f.hazard && !writtenFor(f.species, region) && /\s/.test(binomial(f.species.latin)) && binomial(f.taxon.latin) === binomial(f.species.latin)) ||
      (!f.species && !f.hazard && !!flora.known[i]?.species && /\s/.test(binomial(f.taxon.latin))),
  );
  const withNotHere = (list: LocalFind[], group: Taxon["group"]) => {
    const add = notHere.filter((f) => f.taxon.group === group && !list.some((x) => x.taxon.id === f.taxon.id));
    return add.length ? [...list, ...add].sort((a, b) => b.taxon.count - a.taxon.count) : list;
  };
  const comingSoon = flora.comingSoon
    .map((s) => getSpecies(s.slug))
    .filter((s): s is Species => !!s && writtenFor(s, region))
    .map((s) => speciesHere(inLocalMonths(s, region), region, place))
    .filter((s) => presenceSoon(place, s, month).state === "ready");
  const hazards = flora.hazards
    .map(({ hazard, count }) => ({ hazard: hazardHere(hazard, continent), count }))
    .filter((x): x is { hazard: Hazard; count: number } => !!x.hazard);
  return { ...flora, known, comingSoon, hazards, alsoFungi: withNotHere(flora.alsoFungi, "Fungi"), alsoPlants: withNotHere(flora.alsoPlants, "Plantae") };
}

/**
 * The live evidence for the weekly guide's foraging gate (plant-presence gateGuideForaging): the place's stored flora
 * record for the month, as the panel shows it. Null when no live record is stored.
 */
export async function floraEvidence(place: PlaceLike & { lat: number; lon: number }, month: number): Promise<LiveEvidence | null> {
  const r = await readRecord<LocalFlora>("flora", floraId(place.lat, place.lon, month)).catch(() => null);
  if (!r?.value?.live) return null;
  const here = floraHere(r.value, place, month);
  return { month, counts: Object.fromEntries(here.known.map((f) => [f.species!.slug, f.taxon.count])) };
}
