/**
 * Types for the crop library (src/lib/crops.ts).
 *
 * Field names are the ones the live code read: they are the keys of the crop
 * records recovered from client module 54475 (data-recovered/54475.json `__x0`,
 * `r`) and the properties the recovered CropCard / PutItUp / GardenHere read.
 */

/** The eight preserving methods, in the order /gardening/preserving lists them. */
export type PreserveMethodId = "freeze" | "water-bath" | "pickle" | "pressure" | "ferment" | "dry" | "cold-store" | "cure";

export type Hardiness = "tender" | "half-hardy" | "hardy" | "very-hardy";

export type CropGroup =
  | "fruiting"
  | "squash"
  | "root"
  | "allium"
  | "brassica"
  | "leafy"
  | "legume"
  | "grain"
  | "tree-fruit"
  | "perennial"
  | "berry"
  | "herb";

export type SeedKind = "easy" | "not-seed" | "biennial" | "cross-prone" | "hybrid-common";

/**
 * How a crop grows, for the climate calendar (crop-calendar.ts): CROP_GROW, merged onto each crop as `grow`.
 * The fields after `chill` were added in round 2 of the regional-accuracy audit; src/data/crop-grow.json
 * carries the source for every value (`fieldSources` → `sources`).
 */
export type CropGrow = {
  /** Minimum, optimum low, optimum high and maximum mean temperature, °C. */
  temp: [number, number, number, number];
  /** Days from sowing (or planting out) to first harvest. */
  days: number;
  start: "direct" | "transplant" | "perennial" | "cutting";
  /** Weeks in a seedbed or tray before planting out, for transplanted crops. */
  nurseryWeeks?: number;
  water: "low" | "medium" | "high";
  /** Winter chill a perennial needs to fruit: months below a mean temperature. */
  chill?: { months: number; belowC: number };
  /**
   * An annual that can be sown to stand through winter and finish in spring or summer
   * (garlic, broad beans, overwintering peas and onion sets, spinach, rocket). Only these
   * crops are allowed a dormant spell; every other sowing must finish before the first
   * month under the crop's minimum.
   */
  overwinter?: boolean;
  /** The mean annual extreme minimum (°C) a standing overwinter crop takes. */
  overwinterMinC?: number;
  /** Minimum soil temperature for germination (°C), read against the late-month mean. */
  sowMinSoilC?: number;
  /**
   * Perennials: the mean annual extreme minimum (°C) the dormant plant takes — its
   * zone-style hardiness, tested against the place's meanAnnualExtremeMinC.
   */
  winterMinC?: number;
  /** Perennials that need a cool season: the coldest month's mean may not exceed this (°C). */
  coolestMonthMaxC?: number;
  /** Tropical perennials: the coldest month's mean must reach this (°C) to keep growing and fruit. */
  coldestMonthMinC?: number;
  /** Heat ceiling for a perennial: the warmest month's mean may not exceed this (°C). Default: temp[3] + 3. */
  maxWarmestMonthC?: number;
  /**
   * Left standing after it is ready and lifted at leisure, through frost, until the ground freezes
   * (carrot, parsnip, cabbage, kale, sprouts, leek ...): its harvest bar runs on to the last month
   * with unfrozen ground. Sources: `fieldSources` → the site's crop records.
   */
  stands?: boolean;
  /** Not worth picking before it has been frosted (Brussels sprouts, parsnip): the harvest bar starts no earlier than the average first fall frost. */
  harvestAfterFrost?: boolean;
};

export type CropStore = {
  where: string;
  tempC: [number, number];
  humidity: "high" | "moderate" | "dry";
  keeps: string;
  how: string;
};

export type Crop = {
  slug: string;
  name: string;
  latin: string;
  group: CropGroup;
  tagline: string;
  /** Northern-hemisphere harvest months, typical for zones 4–6. */
  harvestMonths: number[];
  hardiness: Hardiness;
  frostNote: string;
  /** Overrides HARDINESS[hardiness] minC/deadC for the frost call. */
  frostLimits?: { damageC: number; deadC: number };
  ready: string;
  pick: string;
  cure?: string;
  store: CropStore[];
  preserve: PreserveMethodId[];
  preserveNote: string;
  seeds: { kind: SeedKind; how: string; viability: string };
  nextYear: string;
  sow: { indoorsWeeksBeforeLastFrost?: number; outdoors: string };
  /** Merged from CROP_GROW (temperate crops) or written on the crop (world crops). */
  grow?: CropGrow;
  /** Climate regimes (src/lib/regime ids) where the crop is a staple. */
  staple?: string[];
  faqs: { q: string; a: string }[];
  sources: { label: string; url: string }[];
};

/** CROP_GROW entries also carry the regimes where the crop is a staple; withGrow moves it to `crop.staple`. */
export type CropGrowEntry = CropGrow & { staple?: string[] };

export type PreserveMethod = {
  /** "Water-bath canning" */
  name: string;
  /** The one-line description under the name on /gardening/preserving and the crop pages. */
  short: string;
  equipment: string;
  /** "Suitable for" */
  goodFor: string;
  /** "Never use for" */
  never: string;
};

/**
 * A tested preserving recipe (/gardening/recipes/<slug>).
 * The "Before you start" box is titled "Safety requirements" when the recipe has
 * a `process` (it is canned) and "Key points" when it does not.
 */
export type Recipe = {
  slug: string;
  title: string;
  /** The crop the recipe is filed under (breadcrumb, photograph, "More for …"). */
  crop: string;
  /** Other crops it uses, tagged after the main one. */
  also?: string[];
  method: PreserveMethodId;
  tagline: string;
  makes: string;
  /** "1½ hours" — shown as "1½ hours active". */
  active: string;
  total: string;
  safety: string[];
  /** The tested source the quantities and times are copied from. */
  source: { label: string; url: string };
  ingredients: string[];
  /** Canning only: the processing card. */
  process?: {
    jars: string;
    headspace: string;
    /** Minutes at 0–300 m (0–1,000 ft). */
    minutes: number;
    /** Text after the time, e.g. "at 10 psi (weighted gauge)". */
    note?: string;
    /** "Above 300 m" */
    altitude: string;
  };
  steps: string[];
  keeps: string;
  variations: string;
  /** "October 2026" */
  checked: string;
};
