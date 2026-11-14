/**
 * The shapes the place pages are built from.
 *
 * `LocalData` is what `getLocalData(place)` (src/lib/local-data.ts) returns for
 * one place on one day: the place, its forecast, climate normals, Köppen
 * regime, water setting, moon, named waters and the official regulation link.
 * It is also what the live site serialises into the GuideLoader fallback, so
 * the field set matches that payload exactly.
 */
import type { WaterSetting } from "./water-setting";

export type Place = {
  name: string; // city/town
  admin1: string; // province / state
  admin1Code?: string; // ON, NY...
  country: string;
  countryCode: "CA" | "US" | string;
  lat: number;
  lon: number;
  slug: string;
  label: string; // "Kingston, Ontario"
};

export type DailyForecast = {
  date: string; // "2026-10-07", local
  tMax: number;
  tMin: number;
  precip: number; // mm
  windMax: number; // km/h
  sunrise: string; // "2026-10-07T07:22", local
  sunset: string;
  code: number; // WMO weather code
};

export type Forecast = {
  timezone: string; // IANA, "America/Toronto"
  current: { temp: number; code: number; wind: number; humidity: number };
  /** Today's mean soil temperature at 6 cm (°C). */
  soilTemp6cm: number | null;
  /** Sea-level pressure now (hPa) and its change over the last three hours. */
  pressure?: number | null;
  pressureTrend?: number | null;
  /** Cloud cover now (%). */
  cloudCover?: number | null;
  days: DailyForecast[];
};

export type Climate = {
  yearsSampled: number;
  meanAnnualExtremeMinC: number;
  /** "station": the coldest night of a typical year is a weather station's (src/data/place-zones-usda.json); "era5": the reanalysis grid's. */
  extremeMinSource?: "station" | "era5";
  zone: string; // "5a"
  zoneNumber: number;
  lastSpringFrost: string; // "May 12" (average) or "Rare"
  firstFallFrost: string; // "Oct 3" or "Rare"
  /** Both dates are "Rare" (0 and 366) or both are dated, never one of each. */
  lastSpringFrostDoy: number;
  /** May exceed 365 where the average first frost falls after New Year (Jacksonville: Dec 30 is 364, a Jan 5 would be 370), so first − last is always the frost-free season. */
  firstFallFrostDoy: number;
  /** South of the equator: the frost season spans the year's middle, and the doys are read on a July-start year. */
  south?: boolean;
  frostFreeDays: number;
  /** "stations": GHCN-Daily stations within 20 km (25 km at most); "grid": the ERA5 reanalysis (daily, or modelled from its monthly means). A frost-free place has both dates "Rare" whatever the source. */
  frostSource?: "stations" | "grid";
  /** "high": stations close by that agree; "medium": one station, a far one, or one that disagree; "low": the reanalysis grid or a model from monthly means. */
  frostConfidence?: "high" | "medium" | "low";
  /** How far the stations disagree (days), and how many there were. */
  frostSpreadDays?: number | null;
  frostStations?: number | null;
  /** Distance to the nearest station used (km). */
  frostStationKm?: number;
  /** Expected nights at or below 0 °C a year (stations), or below the grid threshold. */
  frostDaysPerYear?: number;
  monthlyMeanMax: number[]; // 12, °C
  monthlyMeanMin: number[]; // 12, °C
  /** Average total precipitation each month (mm): rain plus the melted water of snow, hail and ice, not rainfall alone. The name keeps "rain" for the stored field. Missing on climates read before it was recorded. */
  monthlyRainMm?: number[];
  /** "station": a GHCN-Daily 1991–2020 normal within 15 km (named in `rainStation`); "grid": ERA5, which can read 15–25 % off the station record on coasts and in deserts. */
  rainSource?: "station" | "grid";
  rainStation?: string;
  rainStationKm?: number;
  elevationM?: number;
  /**
   * Where the monthly temperatures (monthlyMeanMax, monthlyMeanMin) come from: "station" where a station's normals were
   * read (scripts/build-station-normals.ts; Day 5 audit, 14 November 2026), named in `tempStation`; absent, ten years of
   * the ERA5 grid. Read them through tempStationOf (src/lib/climate-fallback.ts) and tempWords (src/lib/homestead/climate.ts).
   */
  tempSource?: "station";
  tempStation?: string;
  tempStationKm?: number;
  /** "1991-2020", or the years a Canadian station's monthly summaries span ("1991-2014"). */
  tempPeriod?: string;
  /** "noaa-normals": NOAA's 1991–2020 normals; "ghcn-gsom": NOAA's monthly summaries of a station, averaged over tempPeriod. */
  tempBasis?: "noaa-normals" | "ghcn-gsom";
  /** "usda-2023" and "nrcan" are the official maps; "estimated" is a USDA-equivalent zone from the coldest night of an average year (a station's record or the reanalysis). `zoneSystem` in src/lib/zone-label.ts names the system exactly. */
  zoneSource?: "usda-2023" | "nrcan" | "estimated";
  estimated: true;
};

export type Moon = {
  phaseName: string;
  illumination: number; // 0-100
  age: number; // days
  nextFull: string; // ISO date
  nextNew: string;
  fishingRating: "Excellent" | "Good" | "Fair";
};

export type WaterBody = { name: string; kind: string; distanceKm: number };

export type RegsLink = { agency: string; url: string; note?: string };

export type RegimeId =
  | "tropical-humid"
  | "tropical-wet-dry"
  | "tropical-highland"
  | "subtropical-highland"
  | "desert"
  | "semi-arid"
  | "mediterranean"
  | "humid-subtropical"
  | "maritime"
  | "continental"
  | "subarctic";

export type RainPattern = "year-round" | "summer-rain" | "winter-rain" | "two-rainy-seasons" | "little-rain";

/** What sets the year for a place: its Köppen climate, read as a gardener reads it. */
export type Regime = {
  id: RegimeId;
  /** Köppen–Geiger code, "Csb". */
  koppen: string;
  rain: RainPattern;
  /** Months (1–12) wetter and drier than the place's own average. */
  wetMonths: number[];
  dryMonths: number[];
  /** Mean temperature of the coldest and warmest month (°C). */
  coldestC: number;
  warmestC: number;
  annualRainMm: number;
  /** "mild, wet winters and long, dry summers" */
  short: string;
  /** "the winter rains" — what the garden year turns on. */
  runsOn: string;
  /** "Mediterranean" */
  name: string;
  /** "summer drought" — the hard part of the year. */
  limit: string;
  summary: string;
  /** Whether the frost dates frame the garden year. */
  frostLed: boolean;
};

export type LocalData = {
  /** When the live readings (forecast) were taken. */
  fetchedAt: string;
  place: Place;
  forecast: Forecast;
  climate: Climate | null;
  moon: Moon;
  /** Named waters within 20 km (OpenStreetMap), nearest first. */
  waters: WaterBody[];
  regs: RegsLink | null;
  /** The country's rule for picking wild plants and fungi, where we have one. */
  forageLaw: string | null;
  regime: Regime | null;
  water: WaterSetting | null;
  today: string; // ISO date, local
  month: number; // 1-12
  season: "Spring" | "Summer" | "Fall" | "Winter";
  daysToFirstFrost: number | null;
  daysSinceLastFrost: number | null;
};

export type GuideItem = {
  name: string;
  detail: string;
  where?: string;
  lookalikes?: string;
  caution?: string;
};

/** The weekly guide for a place: AI-written (stored as `rec:v1:guide:v2_<lat1>_<lon1>`) or from the rules. */
export type Guide = {
  summary: string;
  gardening: {
    headline: string;
    zoneNotes: string;
    sowOutdoorsNow: GuideItem[];
    startIndoorsNow: GuideItem[];
    harvestNow: GuideItem[];
    tasksThisWeek: string[];
    watchOut: string[];
  };
  fishing: {
    headline: string;
    species: (GuideItem & { where: string })[];
    bestTimes: string;
    waters: string[];
    regulationsNote: string;
  };
  foraging: {
    headline: string;
    inSeasonNow: (GuideItem & { where: string; lookalikes?: string })[];
    comingSoon: GuideItem[];
    safety: string[];
  };
  source: "ai" | "rules";
  generatedAt: string;
};

export type GuideView = "overview" | "gardening" | "fishing" | "foraging";
