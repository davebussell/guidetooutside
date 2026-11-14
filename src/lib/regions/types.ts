/**
 * The shapes the regional guides are built from. Plain data, safe to hand to
 * client components: no module here reads the water grid or the libraries.
 */
import type { Topic } from "@/data/conservation/types";
import type { RainPattern, RegimeId } from "@/lib/types";

export type WaterKind = "coast" | "near-coast" | "lake" | "river" | "inland";

/** One pre-built town, reduced to what a region compares. Null means the site holds no value for that town. */
export type TownRow = {
  slug: string;
  name: string;
  label: string;
  admin1: string;
  /** "ON", "NY" in Canada and the US. */
  admin1Code: string | null;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
  /** A climate record exists (all 264 towns); it has twelve monthly rain totals (four do not). */
  hasClimate: boolean;
  hasRain: boolean;
  zone: string | null;
  zoneNumber: number | null;
  /** "usda-2023" and "nrcan" are the official maps; "estimated" is from the ERA5 mean annual extreme minimum. */
  zoneSource: "usda-2023" | "nrcan" | "estimated" | null;
  /** South of the equator: the frost year runs from 2 July. */
  south: boolean;
  /** Frost is rare: the record gives no average last or first frost. */
  frostRare: boolean;
  /** "May 12" — the average last spring and first autumn frost, null where frost is rare. */
  lastFrost: string | null;
  firstFrost: string | null;
  /** The same on the calendar (1 = 1 January), whatever the hemisphere. */
  lastFrostDoy: number | null;
  firstFrostDoy: number | null;
  /** 365 where frost is rare. */
  frostFreeDays: number | null;
  /** "stations": GHCN station normals within 15 km; "grid": ERA5 daily minimum at 4.5 °C. */
  frostSource: "stations" | "grid" | null;
  rainMm: number | null;
  rain: RainPattern | null;
  /** Month (1–12) with the most and the least rain. */
  wettest: number | null;
  driest: number | null;
  wetMonths: number[];
  dryMonths: number[];
  /** Mean of the coldest and the warmest month (°C) and which months they are. */
  coldestC: number | null;
  warmestC: number | null;
  coldestMonth: number | null;
  warmestMonth: number | null;
  elevationM: number | null;
  koppen: string | null;
  regime: RegimeId | null;
  regimeName: string | null;
  /** Whether the frost dates frame the garden year (frost closes more than a fifth of it). */
  frostLed: boolean | null;
  water: WaterKind;
  /** The big lake or river Natural Earth puts the town on. */
  waterName: string | null;
  /** On or within about 30 km of the sea — the flag the species lists use. */
  coast: boolean;
};

/** One thing the libraries hold: a wild edible, a fish, a garden creature or a crop. */
export type LibItem = {
  kind: "species" | "fish" | "garden" | "crop";
  slug: string;
  name: string;
  href: string;
  /** Wild edibles: the hardiness zones the library limits them to. */
  zones?: [number, number];
  /** Wild edibles of the shore, and fish of salt water: coast towns only. */
  coastOnly?: boolean;
};

/** The region's library and which of its towns each item is given to, by index into `items`. */
export type RegionLibrary = {
  items: LibItem[];
  /** town slug → indexes of the items that town gets. Crops are left out of a town with no rain record. */
  byTown: Record<string, number[]>;
  /** Towns whose crop list could not be worked out (no rain in the climate record). */
  noCrops: string[];
};

/** One organisation as the town table and the compare widget name it (plain data, client-safe). */
export type OrgRef = {
  slug: string;
  name: string;
  /** The short form for a table cell ("Birds Canada"); the name when there is none. */
  short: string;
  network?: string;
  /** 3 = its named water, home radius or listed town covers the town; 2 = its province, state or ecoregion does. */
  tier: 2 | 3;
  /** For tier 2, what it works across: "Ontario", "the region". */
  across?: string;
};

/** What the conservation library holds for one pre-built town, from `orgsFor` with the town's place and water. */
export type TownOrgs = {
  /** Organisations at tier 2 or 3 for the town: home water, radius, province or state, ecoregion. */
  local: number;
  /** Of those, tier 3 only: the named water, home radius or listed town. */
  nearby: number;
  /** The best tier 2 or 3 organisation for each subject, by the matcher's order. */
  best: Partial<Record<Topic, OrgRef>>;
};
