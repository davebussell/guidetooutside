/**
 * What copy needs to know about where the reader is, derived from a place
 * (or from the remembered place cookie: `{ slug, label, lat, lon, tz }`).
 *
 * The generic pages (zones, gardening, fishing, foraging, finder wording,
 * the almanac) were written as if every reader lived in North America: USDA
 * zones as a universal, "postal code or ZIP", "fall", °F beside every °C, a
 * state or provincial regulator. This module is the one place that decides
 * those words from the place, so a reader in Lisbon, Nairobi or Cape Town
 * sees their own continent, hemisphere, zone system, postal word, season
 * word, units and regulator family — and a page with no place known stays
 * neutral (`NEUTRAL_CONTEXT`).
 *
 * Pure and dependency-light (the ecoregion classifier only), so it runs on
 * the server and in client components alike. The regulator link itself
 * (src/lib/regs.ts, 142 entries) is looked up by `regsForContext` in
 * src/lib/region-regs.ts so that the regulations table is not bundled into
 * every page that only needs a placeholder word.
 */
import { regionOf, type Ecoregion } from "./region";

export type Continent = "north-america" | "europe" | "africa";
export type Hemisphere = "north" | "south";
/** How the hardiness zone shown should be explained. */
export type ZoneSystem =
  /** Canada and the US: the official USDA 2023 / NRCan maps, estimated elsewhere. */
  | "usda-nrcan"
  /** Europe: a USDA-equivalent zone from the same temperature rule, with the RHS rating alongside. */
  | "usda-equivalent-rhs"
  /** Temperate Africa (Cape, Highveld, Atlas): a USDA-equivalent zone; no official national map. */
  | "usda-equivalent"
  /** The tropics: frost-free; zones are a loose guide and the rains set the year. */
  | "loose";
export type PostalWord = "postal code" | "ZIP code" | "postcode";
export type RegulatorFamily = "state" | "province" | "country";

export type RegionContext = {
  /** Whether a place was known at all; false for `NEUTRAL_CONTEXT`. */
  known: boolean;
  continent: Continent;
  hemisphere: Hemisphere;
  /** Within 23.5° of the equator. */
  tropical: boolean;
  /** ISO 3166-1 alpha-2 when it can be told from the place or its label. */
  countryCode: string | null;
  /** Canadian province / US state code ("ON", "NY") when known. */
  admin1Code: string | null;
  regionSlug: string | null;
  regionName: string | null;
  zoneSystem: ZoneSystem;
  /** One sentence to put under a zone figure for this reader. */
  zoneNote: string;
  postalWord: PostalWord;
  /** The search box's placeholder for this reader. */
  searchPlaceholder: string;
  /** "autumn" everywhere but the US. */
  autumn: "autumn" | "fall";
  /** Only the US reads °F, miles and gallons; everyone else gets metric alone. */
  imperial: boolean;
  regulatorFamily: RegulatorFamily;
  /** "your state's", "your province's", "your country's" — for sentences about rules. */
  regulatorPossessive: string;
};

export type PlaceLike = { lat: number; lon: number; countryCode?: string | null; label?: string | null; admin1Code?: string | null };

// ---- RHS hardiness ratings ---------------------------------------------------
//
// Source: Royal Horticultural Society, "RHS hardiness ratings" (introduced 2012,
// revised 2013), https://www.rhs.org.uk/plants/trials-awards/award-of-garden-merit/rhs-hardiness-rating
// — the table there gives each rating's temperature range in °C and the USDA
// zone equivalent, read 2026-10-14. The ranges are the plant's tolerance of
// the winter minimum, so a place whose average coldest night is −7 °C is an
// "H4 winter": plants rated H4 and hardier survive it.
export type RhsRating = { code: string; minC: number; maxC: number; category: string; usda: string };
export const RHS_RATINGS: RhsRating[] = [
  { code: "H1a", minC: 15, maxC: Infinity, category: "heated glasshouse – tropical", usda: "13" },
  { code: "H1b", minC: 10, maxC: 15, category: "heated glasshouse – subtropical", usda: "12" },
  { code: "H1c", minC: 5, maxC: 10, category: "heated glasshouse – warm temperate", usda: "11" },
  { code: "H2", minC: 1, maxC: 5, category: "tender – cool or frost-free glasshouse", usda: "10b" },
  { code: "H3", minC: -5, maxC: 1, category: "half-hardy – unheated glasshouse or mild winter", usda: "9b/10a" },
  { code: "H4", minC: -10, maxC: -5, category: "hardy – average winter", usda: "8b/9a" },
  { code: "H5", minC: -15, maxC: -10, category: "hardy – cold winter", usda: "7b/8a" },
  { code: "H6", minC: -20, maxC: -15, category: "hardy – very cold winter", usda: "6b/7a" },
  { code: "H7", minC: -Infinity, maxC: -20, category: "very hardy", usda: "6a and colder" },
];

/** The RHS rating whose range holds a winter minimum (°C): the hardiness a plant needs there. */
export function rhsRatingFor(minC: number): RhsRating {
  return RHS_RATINGS.find((r) => minC >= r.minC && minC < r.maxC) ?? RHS_RATINGS[RHS_RATINGS.length - 1];
}

/** "−5 to 1 °C" for an RHS row. */
export function rhsRange(r: RhsRating): string {
  const f = (n: number) => `${n < 0 ? "−" : ""}${Math.abs(n)}`;
  if (r.maxC === Infinity) return `above ${f(r.minC)} °C`;
  if (r.minC === -Infinity) return `below ${f(r.maxC)} °C`;
  return `${f(r.minC)} to ${f(r.maxC)} °C`;
}

/** The USDA zone's temperature band from its label ("9a" → −6.7 to −3.9 °C), on the 10 °F / 5 °F rule. */
export function zoneBandC(zone: string): { lo: number; hi: number } | null {
  const m = zone.match(/^(\d{1,2})([ab])?$/);
  if (!m) return null;
  const loF = -60 + (Number(m[1]) - 1) * 10 + (m[2] === "b" ? 5 : 0);
  const hiF = loF + (m[2] ? 5 : 10);
  const c = (f: number) => Math.round(((f - 32) * 5) / 9 * 10) / 10;
  return { lo: c(loF), hi: c(hiF) };
}

/**
 * Official hardiness maps the site can point to, by zone system. Only
 * sources that are the publishing body's own page are listed; Germany and the
 * Netherlands use USDA-style zone maps in the nursery trade (Heinze & Schreiber
 * 1984, and derivatives) but no government or national society publishes one
 * on a page we could verify, so none is linked for them.
 */
export const ZONE_SOURCES = {
  // USDA Agricultural Research Service, Plant Hardiness Zone Map (2023 edition).
  usda: { label: "USDA Plant Hardiness Zone Map (2023)", url: "https://planthardiness.ars.usda.gov/" },
  // Natural Resources Canada, Plant Hardiness of Canada (zones and extreme-minimum maps).
  nrcan: { label: "Natural Resources Canada plant hardiness zones", url: "https://planthardiness.gc.ca/" },
  // Royal Horticultural Society hardiness ratings H1a–H7 (the UK trade standard; used across Ireland and much of Europe).
  rhs: { label: "RHS hardiness ratings (H1a–H7)", url: "https://www.rhs.org.uk/plants/trials-awards/award-of-garden-merit/rhs-hardiness-rating" },
} as const;

// ---- country and admin1 from a label ---------------------------------------
//
// The cookie carries only `{slug, label, lat, lon, tz}`; the label is
// "Town, Province" in Canada and the US and "Town, Country" elsewhere
// (src/lib/geocode.ts makePlace), so the country can usually be read back.

const CA_PROVINCES: Record<string, string> = {
  alberta: "AB", "british columbia": "BC", manitoba: "MB", "new brunswick": "NB", "newfoundland and labrador": "NL", "nova scotia": "NS",
  "northwest territories": "NT", nunavut: "NU", ontario: "ON", "prince edward island": "PE", quebec: "QC", québec: "QC", saskatchewan: "SK", yukon: "YT",
};
const US_STATES: Record<string, string> = {
  alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA", colorado: "CO", connecticut: "CT", delaware: "DE", florida: "FL", georgia: "GA",
  hawaii: "HI", hawaiʻi: "HI", idaho: "ID", illinois: "IL", indiana: "IN", iowa: "IA", kansas: "KS", kentucky: "KY", louisiana: "LA", maine: "ME", maryland: "MD",
  massachusetts: "MA", michigan: "MI", minnesota: "MN", mississippi: "MS", missouri: "MO", montana: "MT", nebraska: "NE", nevada: "NV", "new hampshire": "NH",
  "new jersey": "NJ", "new mexico": "NM", "new york": "NY", "north carolina": "NC", "north dakota": "ND", ohio: "OH", oklahoma: "OK", oregon: "OR",
  pennsylvania: "PA", "rhode island": "RI", "south carolina": "SC", "south dakota": "SD", tennessee: "TN", texas: "TX", utah: "UT", vermont: "VT", virginia: "VA",
  washington: "WA", "west virginia": "WV", wisconsin: "WI", wyoming: "WY", "district of columbia": "DC",
};
/** Country names as the labels print them (geocode.ts countryShort, Nominatim's English names) → ISO code. */
const COUNTRIES: Record<string, string> = {
  // Europe
  albania: "AL", andorra: "AD", austria: "AT", belarus: "BY", belgium: "BE", "bosnia and herzegovina": "BA", "bosnia & herzegovina": "BA", bulgaria: "BG",
  croatia: "HR", cyprus: "CY", czechia: "CZ", "czech republic": "CZ", denmark: "DK", estonia: "EE", "faroe islands": "FO", finland: "FI", france: "FR",
  germany: "DE", gibraltar: "GI", greece: "GR", guernsey: "GG", hungary: "HU", iceland: "IS", ireland: "IE", "isle of man": "IM", italy: "IT", jersey: "JE",
  kosovo: "XK", latvia: "LV", liechtenstein: "LI", lithuania: "LT", luxembourg: "LU", malta: "MT", moldova: "MD", monaco: "MC", montenegro: "ME",
  netherlands: "NL", "the netherlands": "NL", "north macedonia": "MK", norway: "NO", poland: "PL", portugal: "PT", romania: "RO", russia: "RU",
  "san marino": "SM", serbia: "RS", slovakia: "SK", slovenia: "SI", spain: "ES", sweden: "SE", switzerland: "CH", ukraine: "UA", "united kingdom": "GB",
  uk: "GB", "vatican city": "VA",
  // Africa
  algeria: "DZ", angola: "AO", benin: "BJ", botswana: "BW", "burkina faso": "BF", burundi: "BI", cameroon: "CM", "cape verde": "CV", "cabo verde": "CV",
  "central african republic": "CF", chad: "TD", comoros: "KM", congo: "CG", "republic of the congo": "CG", "congo-brazzaville": "CG", "dr congo": "CD",
  "democratic republic of the congo": "CD", "côte d'ivoire": "CI", "côte d’ivoire": "CI", "ivory coast": "CI", djibouti: "DJ", egypt: "EG",
  "equatorial guinea": "GQ", eritrea: "ER", eswatini: "SZ", swaziland: "SZ", ethiopia: "ET", gabon: "GA", gambia: "GM", "the gambia": "GM", ghana: "GH",
  guinea: "GN", "guinea-bissau": "GW", kenya: "KE", lesotho: "LS", liberia: "LR", libya: "LY", madagascar: "MG", malawi: "MW", mali: "ML", mauritania: "MR",
  mauritius: "MU", mayotte: "YT", morocco: "MA", mozambique: "MZ", namibia: "NA", niger: "NE", nigeria: "NG", réunion: "RE", reunion: "RE", rwanda: "RW",
  "são tomé and príncipe": "ST", "sao tome and principe": "ST", senegal: "SN", seychelles: "SC", "sierra leone": "SL", somalia: "SO", "south africa": "ZA",
  "south sudan": "SS", "st. helena": "SH", "saint helena": "SH", sudan: "SD", tanzania: "TZ", togo: "TG", tunisia: "TN", uganda: "UG", zambia: "ZM",
  zimbabwe: "ZW",
  // North America (labels never carry these, but a geocoded country name might)
  canada: "CA", "united states": "US", "united states of america": "US", usa: "US",
};

/** "London, UK" → { countryCode: "GB" }; "Ottawa, Ontario" → { countryCode: "CA", admin1Code: "ON" }. */
export function placeFromLabel(label: string | null | undefined): { countryCode: string | null; admin1Code: string | null } {
  const tail = (label ?? "").split(",").slice(1).join(",").trim().toLowerCase();
  if (!tail) return { countryCode: null, admin1Code: null };
  if (CA_PROVINCES[tail]) return { countryCode: "CA", admin1Code: CA_PROVINCES[tail] };
  if (US_STATES[tail]) return { countryCode: "US", admin1Code: US_STATES[tail] };
  return { countryCode: COUNTRIES[tail] ?? null, admin1Code: null };
}

// ---- the context ---------------------------------------------------------------

const POSTCODE_COUNTRIES = new Set(["GB", "IE", "GG", "JE", "IM", "GI"]);

const continentOf = (eco: Ecoregion): Continent => {
  const c = (eco as { continent?: string }).continent;
  return c === "europe" || c === "africa" ? c : "north-america";
};

export function postalWordFor(countryCode: string | null, continent: Continent): PostalWord {
  if (countryCode === "US") return "ZIP code";
  if (countryCode && POSTCODE_COUNTRIES.has(countryCode)) return "postcode";
  void continent;
  return "postal code";
}

function zoneSystemFor(continent: Continent, tropical: boolean): ZoneSystem {
  if (continent === "north-america") return "usda-nrcan";
  if (tropical) return "loose";
  return continent === "europe" ? "usda-equivalent-rhs" : "usda-equivalent";
}

const ZONE_NOTES: Record<ZoneSystem, string> = {
  "usda-nrcan": "USDA (US) and Natural Resources Canada zones; the local guide estimates the zone for the exact point from ten years of winter lows.",
  "usda-equivalent-rhs":
    "A USDA-equivalent zone, worked out from the place's own winter lows by the USDA rule; European gardeners usually read hardiness as an RHS rating (H1a–H7), shown alongside.",
  "usda-equivalent": "A USDA-equivalent zone, worked out from the place's own winter lows by the USDA rule; there is no official national zone map here.",
  loose: "Frost is rare or unknown here, so a hardiness zone says little: the rains and the dry season set the growing year, not the cold.",
};

/** The search box's wording: the postal word the reader uses, and the zone shortcut only where zones are the local habit. */
export function searchPlaceholderFor(postalWord: PostalWord, zoneSystem: ZoneSystem): string {
  return zoneSystem === "usda-nrcan" ? `Town, ${postalWord} or a zone such as 5b` : `Town or ${postalWord}`;
}

/** The context for a page with no place known: neutral words, metric, no zone shortcut. */
export const NEUTRAL_CONTEXT: RegionContext = {
  known: false,
  continent: "north-america",
  hemisphere: "north",
  tropical: false,
  countryCode: null,
  admin1Code: null,
  regionSlug: null,
  regionName: null,
  zoneSystem: "usda-nrcan",
  zoneNote: ZONE_NOTES["usda-nrcan"],
  postalWord: "postal code",
  searchPlaceholder: "Town or postal code",
  autumn: "autumn",
  imperial: false,
  regulatorFamily: "country",
  regulatorPossessive: "your country's",
};

/** Derive the context from a place (a full Place, or the cookie's `{label, lat, lon}`). */
export function regionContext(p: PlaceLike | null | undefined): RegionContext {
  if (!p || !Number.isFinite(p.lat) || !Number.isFinite(p.lon)) return NEUTRAL_CONTEXT;
  const eco = regionOf(p.lat, p.lon);
  const continent = continentOf(eco);
  const fromLabel = placeFromLabel(p.label);
  const countryCode = (p.countryCode ?? fromLabel.countryCode)?.toUpperCase() ?? null;
  const admin1Code = p.admin1Code ?? fromLabel.admin1Code ?? null;
  const tropical = Math.abs(p.lat) < 23.5;
  const zoneSystem = zoneSystemFor(continent, tropical);
  const postalWord = postalWordFor(countryCode, continent);
  const regulatorFamily: RegulatorFamily = countryCode === "US" ? "state" : countryCode === "CA" ? "province" : "country";
  return {
    known: true,
    continent,
    hemisphere: p.lat < 0 ? "south" : "north",
    tropical,
    countryCode,
    admin1Code,
    regionSlug: eco.slug,
    regionName: eco.name,
    zoneSystem,
    zoneNote: ZONE_NOTES[zoneSystem],
    postalWord,
    searchPlaceholder: searchPlaceholderFor(postalWord, zoneSystem),
    autumn: countryCode === "US" ? "fall" : "autumn",
    imperial: countryCode === "US",
    regulatorFamily,
    regulatorPossessive: regulatorFamily === "state" ? "your state's" : regulatorFamily === "province" ? "your province's" : "your country's",
  };
}

/** "Fall" → "Autumn" for readers outside the US (the data's season names are North American). */
export function seasonWord(season: string, ctx: RegionContext): string {
  if (/^fall$/i.test(season)) return ctx.autumn === "fall" ? season : season === "fall" ? "autumn" : "Autumn";
  return season;
}

/** A library (northern-calendar) month read in the reader's hemisphere, and back. */
export const southMonth = (month: number) => ((month + 5) % 12) + 1;

/**
 * The month captions the foraging wheel shows. The library's twelve captions
 * describe a northern temperate year (snow, maple sap, the autumn flush);
 * they are wrong word for word south of the equator and in the tropics, so
 * those readers get one honest line instead of a shifted northern one. The
 * species list under the caption is already filtered to the reader's region
 * and month, and is the part that carries local information.
 */
export function yearCaptions(ctx: RegionContext, northern: string[]): string[] {
  if (!ctx.known) return northern;
  if (ctx.tropical) return Array(12).fill(TROPICAL_CAPTION) as string[];
  if (ctx.hemisphere === "south") return Array(12).fill(SOUTHERN_CAPTION) as string[];
  return northern;
}

const TROPICAL_CAPTION =
  "Frost-free here: the wet and dry seasons, not the cold, decide what is ready. The species shown are the library's wild foods recorded in your region for this month.";
const SOUTHERN_CAPTION =
  "South of the equator the seasons run six months from the northern calendar. The species shown are the library's wild foods recorded in your region for this month, in your own season.";
