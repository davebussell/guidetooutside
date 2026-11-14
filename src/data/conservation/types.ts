/**
 * Conservation organisations: the one library every "who protects this"
 * panel, regional guide section, hub page and AI guide draws from. Nothing on
 * the site may name an organisation that is not in this library, so every
 * record is verified against a public register or the organisation's own
 * pages, with the sources kept on the record.
 *
 * Geography is deliberately plain: an organisation serves one or more areas
 * (the world, a continent, countries, provinces or states, our ecoregions, a
 * radius around a point, or a lat/lon box), and `src/lib/conservation/match.ts`
 * ranks organisations for a place by how local the match is, then by topic.
 */

/** The site sections and subjects an organisation connects to. */
export type Topic =
  | "water" // rivers, lakes, coasts, wetlands, water quality
  | "fish" // fisheries, angling conservation, salmon, trout, eels
  | "birds" // bird conservation, counts, habitats
  | "pollinators" // bees, butterflies, moths, pollinator plantings
  | "plants" // native plants, botany, fungi, foraging ethics, invasive plants
  | "forests" // trees, woodland, firewood pests, reforestation
  | "soil-seeds" // soil health, seed saving, heritage crops, regenerative growing
  | "wildlife" // mammals, amphibians, reptiles, insects in general, rescue
  | "land" // land trusts, protected areas, reserves, conservation authorities
  | "ground" // geology, caves, geoparks, dark skies
  | "youth" // programmes for children and young people (Roots & Shoots and kin)
  | "food"; // sustainable food: community gardens, seed libraries, gleaning, sustainable seafood, local food, foraging codes

export const TOPICS: Topic[] = ["water", "fish", "birds", "pollinators", "plants", "forests", "soil-seeds", "wildlife", "land", "ground", "youth", "food"];

/**
 * What a "food" organisation does, so each section can show the right ones:
 * gardening pages the community gardens and seed libraries, fishing pages the
 * seafood guides, foraging pages the codes and the fruit-gleaning groups.
 */
export type FoodRole =
  | "community-gardens" // runs, supports or maps community / allotment gardens
  | "school-gardens" // school and children's food-growing programmes
  | "seed-library" // seed libraries and seed swaps open to the public
  | "gleaning" // urban fruit picking, gleaning, harvest sharing
  | "food-rescue" // surplus food redistribution, food rescue
  | "local-food" // local food networks, food hubs, community food centres
  | "community-farms" // sustainable agriculture with a hands-on community focus: community and urban farms, CSA networks, farm days, agroecology and organic training, regenerative farming networks open to the public
  | "markets" // farmers' market associations and market finders
  | "sustainable-seafood" // seafood guides and certification bodies (what to buy, what to avoid)
  | "foraging-code" // codes of practice and permits guidance for wild harvesting
  | "growing-advice"; // free food-growing advice and courses from charities (organic growing, permaculture)

export const FOOD_ROLES: FoodRole[] = ["community-gardens", "community-farms", "school-gardens", "seed-library", "gleaning", "food-rescue", "local-food", "markets", "sustainable-seafood", "foraging-code", "growing-advice"];

export const FOOD_ROLE_LABEL: Record<FoodRole, string> = {
  "community-gardens": "Community gardens",
  "school-gardens": "School gardens",
  "seed-library": "Seed libraries and swaps",
  gleaning: "Fruit picking and gleaning",
  "food-rescue": "Food rescue",
  "local-food": "Local food",
  "community-farms": "Community farms and sustainable farming",
  markets: "Farmers' markets",
  "sustainable-seafood": "Sustainable seafood",
  "foraging-code": "Foraging codes",
  "growing-advice": "Growing advice",
};

export const TOPIC_LABEL: Record<Topic, string> = {
  water: "Water",
  fish: "Fish",
  birds: "Birds",
  pollinators: "Pollinators",
  plants: "Plants and fungi",
  forests: "Forests",
  "soil-seeds": "Soil and seeds",
  wildlife: "Wildlife",
  land: "Land and reserves",
  ground: "Ground and sky",
  youth: "Young people",
  food: "Food and growing",
};

export type Continent = "north-america" | "europe" | "africa";

/** How wide an organisation's remit is; the matcher prefers local over national over international. */
export type Scope = "local" | "regional" | "national" | "international";

export type ServiceArea =
  | { kind: "world" }
  | { kind: "continent"; continent: Continent }
  /** ISO 3166-1 alpha-2 codes, upper case. */
  | { kind: "country"; countries: string[] }
  /** Provinces or states within one country; codes as `Place.admin1Code` carries them (ON, QC, NY, CA…). */
  | { kind: "admin1"; countryCode: string; admin1Codes: string[] }
  /**
   * Ecoregion slugs from `src/lib/ecoregions.jsx` (e.g. "great-lakes-st-lawrence", "cape-fynbos"). With `corridor`, only
   * the part of the ecoregion within `km` of the line (points as [lat, lon], in order): a long trail or river whose
   * keepers work along it, not across the whole region. The audit of 11 November 2026 found the Appalachian Trail
   * Conservancy's whole-ecoregion area taking in Pittsburgh, 228 km from the trail.
   */
  | { kind: "ecoregion"; ecoregions: string[]; corridor?: { km: number; line: [number, number][] } }
  /** A circle: the organisation's home water, valley or city and the distance it works out to. */
  | { kind: "radius"; lat: number; lon: number; km: number }
  /** A box, for a catchment, coast or range that a circle describes badly. */
  | { kind: "box"; latMin: number; latMax: number; lonMin: number; lonMax: number };

export type OrgLinks = {
  home: string;
  volunteer?: string;
  events?: string;
  join?: string;
  donate?: string;
  shop?: string;
  /** RSS or Atom feed of news or articles; wave two reads it. */
  feed?: string;
  /** The youth or schools programme page, when there is one. */
  youth?: string;
};

export type Registry = {
  /** The register: "CRA" (Canada), "IRS" (US), "Charity Commission" (England and Wales), "OSCR" (Scotland), "NPO Directorate" (South Africa), "NGO Board" (Kenya), "Préfecture/RNA" (France), "Registro Nacional de Asociaciones" (Spain), … */
  body: string;
  /** The number or identifier as the register shows it. */
  id: string;
  /** A page where the registration can be seen, when there is one. */
  url?: string;
};

export type Organisation = {
  /** URL slug, lower-case, hyphenated, unique across the library (e.g. "ottawa-riverkeeper"). */
  slug: string;
  name: string;
  /** A short form for tight spaces, when the name is long ("RSPB", "Birds Canada"). */
  shortName?: string;
  /** The name in its own script, when that is not the Latin alphabet (the site shows `name`, in English). */
  nativeName?: string;
  /** The network it belongs to, when it does: "Waterkeeper Alliance", "BirdLife International", "The Rivers Trust", "Land Trust Alliance", "A Rocha", "Roots & Shoots"… */
  network?: string;
  scope: Scope;
  continent?: Continent;
  /** ISO 3166-1 alpha-2 of the country it is registered in, when national or below. */
  countryCode?: string;
  topics: Topic[];
  areas: ServiceArea[];
  /** Named waters, ranges or places it is known by, matched against the page's named water or landscape ("Ottawa River", "Lake Ontario", "Table Mountain"). */
  waters?: string[];
  /**
   * For each `waters` entry its own name and blurb do not already name: the page on its own site that names that water
   * as one it works on. A match on a water prints "Covers <water>", so the water must come from the body's own pages,
   * not from the map: the audit of 11 November 2026 found Wolf River Conservancy "Covers the Mississippi River" at
   * Memphis and Friends of the Lower Olentangy Watershed listing the Scioto River and Alum Creek, neither named on its
   * site. A water with no source is not printed anywhere (src/lib/conservation/sources.ts, from the 13 Nov 2026 audit);
   * scripts/check-conservation.ts lists each one, and fails a record checked since 12 November 2026.
   */
  waterSources?: Record<string, string>;
  /** Two plain sentences in the site's voice: what it does and where. No marketing words, no superlatives. */
  blurb: string;
  /** What it actually asks of people, in their words made plain: up to three ("Monthly water sampling on your stretch of river", "Spring shoreline cleanups"). */
  asks: string[];
  /**
   * The asks that happen at one site or in one part of the organisation's area, each with where it happens. The ask's
   * own words say the place ("Take a public workshop on the Kutztown farm"), so the organisation's page can list it;
   * a town page shows it only where one of its areas reaches the town (`asksAt` in src/lib/conservation/match.ts).
   * Each `ask` is copied exactly from `asks`. The audit of 10 November 2026 found national bodies printing one site's
   * asks hundreds of kilometres away: Rodale's Kutztown workshops in Savannah, Canadian Organic Growers' Ontario
   * school programme in Halifax, the North American Native Plant Society's Toronto sale in Fredericton. The audit of
   * 13 November 2026 found more (Life Lab's Santa Cruz farm at Los Angeles, Native Seeds/SEARCH's Tucson seed bank at
   * Albuquerque), so scripts/check-conservation.ts now fails any ask that names a place or site outside this list,
   * unless the body's every area is a home patch.
   */
  localAsks?: { ask: string; areas: ServiceArea[] }[];
  links: OrgLinks;
  /** The registered-charity or non-profit entry, when one exists. Government agencies and university programmes carry `registry` undefined and `kind` set. */
  registry?: Registry;
  /** "charity" (registered charity or non-profit), "agency" (a public body such as a conservation authority), "network" (an alliance of member groups), "programme" (a project of a larger body, e.g. Roots & Shoots). */
  kind: "charity" | "agency" | "network" | "programme";
  /** Species slugs from `@/lib/species` or `@/lib/nature` it works on, when specific ("brook-trout", "monarch"). */
  species?: string[];
  /** Pre-built town slugs it is the obvious local organisation for, when known ("ottawa-ontario", "wakefield-quebec"). */
  places?: string[];
  /**
   * For each `places` town outside the body's own circle or box: the page on its own site that names its presence there
   * (a centre, sanctuary, chapter, office or programme in the town). A town in `places` prints "Works in <town>": the
   * audit of 11 November 2026 found Audubon Delta "Works in New Orleans" and Texas Stream Team "Works in Brownsville",
   * with no centre, chapter or project there on their pages. Since the audit of 13 November 2026 this holds for every
   * town in `places`, whatever the record's checked date: "Works in" prints only with this page; a town without one reads
   * "Works around <town>" where the body's own circle or box reaches it, and fails scripts/check-conservation.ts anywhere
   * else (src/lib/conservation/sources.ts).
   */
  placeSources?: Record<string, string>;
  /**
   * Its circles, boxes and ecoregions hold on both sides of a border: an all-island or binational body (the All-Ireland
   * Pollinator Plan, the Great Lakes Fishery Commission). Without it, a circle, box or ecoregion only matches towns in the
   * organisation's own country; `places` and country or province areas carry a cross-border claim on their own.
   */
  acrossBorders?: true;
  /** For `food` organisations: what they do, so each section shows the right ones. */
  foodRoles?: FoodRole[];
  /** The youth programme, when there is one of its own (name as they call it). */
  youthProgramme?: string;
  /** Founded year, when the organisation states it. */
  founded?: number;
  /** ISO date the record was last checked against the sources below. */
  verified: string;
  /** Pages read for this record: the organisation's own pages and the register entry. */
  sources: string[];
};
