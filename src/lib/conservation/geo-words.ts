/**
 * Words for the geography of the conservation library: province and state
 * names from their codes, country names as a sentence uses them ("the US",
 * "the UK", "Canada"), ecoregion names, and an organisation's service areas
 * as one plain line ("Works on the Ottawa River, in Ontario and Quebec").
 * Pure, no data beyond the ecoregion table and the pre-built towns.
 */
import type { Organisation, ServiceArea } from "@/data/conservation";
import { getEcoregion } from "@/lib/ecoregions";
import KNOWN from "@/lib/served-places";
import { sourcedWaters } from "./sources";

export const ADMIN1_NAMES: Record<string, Record<string, string>> = {
  CA: {
    AB: "Alberta", BC: "British Columbia", MB: "Manitoba", NB: "New Brunswick", NL: "Newfoundland and Labrador", NS: "Nova Scotia",
    NT: "the Northwest Territories", NU: "Nunavut", ON: "Ontario", PE: "Prince Edward Island", QC: "Quebec", SK: "Saskatchewan", YT: "Yukon",
  },
  US: {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida",
    GA: "Georgia", HI: "Hawaiʻi", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine",
    MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska",
    NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
    OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas",
    UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", DC: "the District of Columbia",
  },
};

/** "ON" in Canada → "Ontario"; unknown → the code. */
export const admin1Name = (countryCode: string, code: string): string => ADMIN1_NAMES[countryCode]?.[code] ?? code;

/** Countries a sentence names with "the", and everyday short forms. */
const COUNTRY_WORDS: Record<string, string> = {
  US: "the US", GB: "the UK", NL: "the Netherlands", CZ: "Czechia", CD: "DR Congo", CG: "the Republic of the Congo", CF: "the Central African Republic",
  GM: "the Gambia", AE: "the UAE", CH: "Switzerland", VA: "Vatican City", BA: "Bosnia and Herzegovina", CI: "Côte d’Ivoire", MK: "North Macedonia",
  XK: "Kosovo", SZ: "Eswatini", ST: "São Tomé and Príncipe", CV: "Cabo Verde",
};
let displayNames: Intl.DisplayNames | null = null;
/** "CA" → "Canada", "US" → "the US", "GB" → "the UK". */
export function countryWords(code: string): string {
  if (COUNTRY_WORDS[code]) return COUNTRY_WORDS[code];
  try {
    displayNames ??= new Intl.DisplayNames(["en"], { type: "region" });
    return displayNames.of(code) ?? code;
  } catch {
    return code;
  }
}
/** "the US" → "The US", for the start of a heading or a select option. */
export const countryLabel = (code: string) => {
  const w = countryWords(code);
  return w.charAt(0).toUpperCase() + w.slice(1);
};

/** The ecoregion's name ("Great Lakes & St. Lawrence Lowlands"), or the slug. */
export const ecoregionName = (slug: string): string => (getEcoregion(slug) as { name?: string } | undefined)?.name ?? slug;

const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/**
 * "the Ottawa River", "the Thames", "the Bay of Fundy", "the Niagara Escarpment",
 * "the Gatineau Hills", but "Lake Ontario",
 * "Dow's Lake", "Mission Creek", "Gatineau Park", "Lac des Deux Montagnes".
 */
export function withArticle(name: string): string {
  // Names that carry their own article or start with the kind of water: "La Seine", "Lake Ontario", "Île aux Basques".
  if (/^(the|la|le|les|l['’]|el|los|las|il|lo|lake|lac|lago|loch|lough|llyn|mont|mount|parc|cape|cap|isle|île|ile)(\b|(?<=['’]))/i.test(name)) return name;
  if (/^(bay|gulf|sea|firth|sound|strait|vale|valley)\s+of\b/i.test(name)) return `the ${name}`;
  if (/\b(lake|pond|reservoir|creek|brook|burn|beck|marsh|bog|fen|harbour|harbor|bay|park|island|mountain|hill|wood|forest|lagoon|loch|lough|falls|paradise|sanctuary|reserve|wetlands?)$/i.test(name)) return name;
  return `the ${name}`;
}

const EARTH_KM = 6371;
export const kmBetween = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_KM * Math.asin(Math.sqrt(a));
};

/** The pre-built town nearest a point, with its distance. */
export function nearestTown(lat: number, lon: number): { name: string; slug: string; km: number } | null {
  let best: { name: string; slug: string; km: number } | null = null;
  for (const p of KNOWN as { name: string; slug: string; lat: number; lon: number }[]) {
    const d = kmBetween(lat, lon, p.lat, p.lon);
    if (!best || d < best.km) best = { name: p.name, slug: p.slug, km: d };
  }
  return best;
}

/** Where a radius or box sits, in words: "within about 50 km of Ottawa", "in an area around Bristol". */
function pointWords(a: Extract<ServiceArea, { kind: "radius" } | { kind: "box" }>, org: Organisation): string | null {
  const wide = org.countryCode ? `across a wide area of ${countryWords(org.countryCode)}` : "across a wide area";
  const lat = a.kind === "radius" ? a.lat : (a.latMin + a.latMax) / 2;
  const lon = a.kind === "radius" ? a.lon : (a.lonMin + a.lonMax) / 2;
  const town = nearestTown(lat, lon);
  if (!town) return null;
  if (a.kind === "radius") {
    if (a.km >= 400) return wide;
    const r = a.km >= 100 ? Math.round(a.km / 10) * 10 : Math.round(a.km);
    return town.km < 35 ? `within about ${r} km of ${town.name}` : `within about ${r} km of its base near ${town.name}`;
  }
  if (kmBetween(a.latMin, a.lonMin, a.latMax, a.lonMax) >= 700) return wide;
  return town.km < 35 ? `in an area around ${town.name}` : `in an area near ${town.name}`;
}

/**
 * The organisation's remit as one line: "Works on the Ottawa River, in Ontario
 * and Quebec", "Works across Canada", "Works worldwide". Named waters first,
 * then the narrowest areas, then the wide ones.
 */
export function scopeLine(org: Organisation): string {
  const parts: string[] = [];
  // Only the waters its own pages name (sources.ts): the 13 Nov 2026 audit found unsourced waters on the lists this
  // line prints from, such as Save The Bay's Coyote Creek and Guadalupe River.
  const waters = sourcedWaters(org);
  if (waters.length) parts.push(`on ${list(waters.slice(0, 3).map(withArticle))}`);
  const admin = org.areas.filter((a): a is Extract<ServiceArea, { kind: "admin1" }> => a.kind === "admin1");
  const countries = org.areas.filter((a): a is Extract<ServiceArea, { kind: "country" }> => a.kind === "country").flatMap((a) => a.countries);
  const ecos = org.areas.filter((a): a is Extract<ServiceArea, { kind: "ecoregion" }> => a.kind === "ecoregion").flatMap((a) => a.ecoregions);
  const conts = org.areas.filter((a): a is Extract<ServiceArea, { kind: "continent" }> => a.kind === "continent").map((a) => a.continent);
  const world = org.areas.some((a) => a.kind === "world");
  const geo = org.areas.filter((a): a is Extract<ServiceArea, { kind: "radius" } | { kind: "box" }> => a.kind === "radius" || a.kind === "box");

  if (!waters.length && geo.length) {
    const w = pointWords(geo[0], org);
    if (w) parts.push(w);
  }
  if (admin.length) {
    const names = admin.flatMap((a) => a.admin1Codes.map((c) => admin1Name(a.countryCode, c)));
    parts.push(names.length > 6 ? `in ${names.length} ${admin[0].countryCode === "CA" ? "provinces and territories" : "states"}` : `in ${list(names)}`);
  }
  if (countries.length) parts.push(countries.length > 6 ? `in ${countries.length} countries` : `across ${list(countries.map(countryWords))}`);
  if (ecos.length) parts.push(ecos.length > 2 ? `in ${ecos.length} of the regions this site covers` : `across ${list(ecos.map((e) => `the ${ecoregionName(e)}`))}`);
  const CONT: Record<string, string> = { "north-america": "North America", europe: "Europe", africa: "Africa" };
  if (conts.length) parts.push(`across ${list(conts.map((c) => CONT[c] ?? c))}`);
  if (world) parts.push("worldwide");
  if (!parts.length) return "";
  // "Works on the Ottawa River, in Ontario and Quebec" — the first part plain, the rest after commas.
  return `Works ${parts.join(", ")}`;
}

const EUROPE_CC = new Set(
  "AD AL AT AX BA BE BG BY CH CY CZ DE DK EE ES FI FO FR GB GG GI GR HR HU IE IM IS IT JE LI LT LU LV MC MD ME MK MT NL NO PL PT RO RS RU SE SI SJ SK SM UA VA XK".split(" "),
);
const AFRICA_CC = new Set(
  "AO BF BI BJ BW CD CF CG CI CM CV DJ DZ EG EH ER ET GA GH GM GN GQ GW KE KM LR LS LY MA MG ML MR MU MW MZ NA NE NG RE RW SC SD SH SL SN SO SS ST SZ TD TG TN TZ UG YT ZA ZM ZW".split(" "),
);

export type HubContinent = "north-america" | "europe" | "africa" | "international";
export const HUB_CONTINENT_LABEL: Record<HubContinent, string> = { "north-america": "North America", europe: "Europe", africa: "Africa", international: "Worldwide" };

/** The site's continent for a country code, or "international" for one outside the three. */
export function continentOfCountry(cc: string): HubContinent {
  if (cc === "CA" || cc === "US") return "north-america";
  if (EUROPE_CC.has(cc)) return "europe";
  if (AFRICA_CC.has(cc)) return "africa";
  return "international";
}

/** Where the hub files an organisation: its continent by country, or "international" for world bodies. */
export function hubContinent(org: Organisation): HubContinent {
  if (org.scope === "international" || !org.countryCode) return "international";
  const c = continentOfCountry(org.countryCode);
  return c === "international" ? (org.continent ?? "international") : c;
}
