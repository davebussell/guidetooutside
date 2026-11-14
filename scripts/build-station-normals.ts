/**
 * Applies the station monthly normals in src/data/place-station-normals.json to the pre-built towns:
 *
 *   src/data/place-normals.json   monthly mean highs and lows and monthly precipitation, with where they come from
 *                                 (tempSource, tempStation, tempStationKm, tempPeriod, tempBasis; rainSource, rainStation,
 *                                 rainStationKm), and, for NOAA stations, the frost dates
 *   src/data/place-rain.json      the town's station precipitation normal (what stationRain() gives a point near the town)
 *   src/data/place-frost.json     NOAA's own 1991–2020 frost dates for the town's station (US towns)
 *   src/data/place-normals-era5.json   written once, before anything is replaced: the ERA5 months and the frost and rain
 *                                 fields each town had, so the change can be undone and the grid compared with the station
 *
 * Run (no tsx in this project; esbuild bundles it as for the checks; it reads and writes files only, no network):
 *   npx esbuild scripts/build-station-normals.ts --bundle --platform=node --format=esm --alias:@=./src \
 *     --outfile=/tmp/build-station-normals.mjs --log-level=warning && node /tmp/build-station-normals.mjs [--dry]
 *
 * Why (Day 5 audit, 14 November 2026): every monthly temperature on the pages was ten years of the ERA5 reanalysis
 * grid, a 30 km average, and it drove the homestead freezing dates 1 to 5 weeks late (Kelowna 33 days, Thompson 19,
 * Val-d'Or 18, Niagara-on-the-Lake 16), counted roof water in months that are frozen at the station (Grand Forks and
 * International Falls in November, Fairbanks in October, Laramie in March and November), read heating degree days 17 to
 * 33 % low in Texas and gave the wrong Köppen class at Kelowna, Thompson, Kingston, Spokane and Grand Forks. The pooled
 * frost dates sat far from the town's own station (Portland pooled Mar 30 – Nov 3 against Portland International's
 * Mar 13 – Nov 19), and the pooled-frequency method ran 5–6 days early in the autumn against NOAA's own 50 % dates at
 * the same station (Grand Rapids Oct 14 against NOAA's Oct 20). So where a station normal was read, it replaces the grid,
 * and the frost dates of US towns are NOAA's own for one named station. Towns with no station normal keep ERA5, and the
 * pages keep saying so (tempSource absent).
 *
 * Frost dates (NOAA): the 50 % probability dates of the last spring and first autumn night at or below 32 °F (0 °C),
 * NOAA's published 1991–2020 normals. A first frost after New Year (Jacksonville NAS: Jan 5) is 365 + its January day,
 * as src/lib/frost.ts keeps it. A station with fewer than MIN_FROST_DAYS nights a year at or below 32 °F, or with no
 * published date, is frost-free on the site's rule: both dates "Rare".
 */
import { readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { doyToLabel, dateToDoy } from "../src/lib/climate-fallback";
import { MIN_FROST_DAYS } from "../src/lib/frost";

const ROOT = process.cwd();
const F = (f: string) => path.join(ROOT, "src/data", f);
const dry = process.argv.includes("--dry");

export type StationNormal = {
  station: { id: string; name: string; km: number };
  source: "noaa-normals" | "ghcn-gsom";
  /** "1991-2020", or the span of a GSOM station's temperature years ("1991-2014"). */
  period: string;
  /** GSOM: the fewest years behind any month's temperatures, and behind any month's precipitation. */
  years?: number;
  prcpYears?: number;
  monthlyMeanMaxC: number[];
  monthlyMeanMinC: number[];
  monthlyPrcpMm: number[];
  /** NOAA only: "MM-DD" dates (null when NOAA publishes none) and nights a year at or below 32 °F. */
  frost?: { lastSpring: string | null; firstFall: string | null; nightsAtOrBelow0C: number };
  read: string;
  urls: string[];
};

type Climate = Record<string, unknown> & { monthlyMeanMax: number[]; monthlyMeanMin: number[]; monthlyRainMm?: number[] };
type Entry = { place: { slug: string; lat: number; lon: number }; climate: Climate };

const GRID_KEYS = ["monthlyMeanMax", "monthlyMeanMin", "monthlyRainMm", "rainSource", "rainStation", "rainStationKm", "lastSpringFrost", "firstFallFrost", "lastSpringFrostDoy", "firstFallFrostDoy", "frostFreeDays", "frostSource", "frostConfidence", "frostSpreadDays", "frostStations", "frostStationKm", "frostDaysPerYear"] as const;

/** place-frost.json and place-rain.json: a newline after every "{" or "," that opens a key or a string (the files' own layout). */
const fmtLines = (o: unknown) => JSON.stringify(o).replace(/([{,])(?=")/g, "$1\n");

/** The site's frost doys from NOAA's MM-DD dates: calendar days on a 365-day year, a first frost after New Year carried past 365. */
export function noaaFrost(f: NonNullable<StationNormal["frost"]>) {
  if (!f.lastSpring || !f.firstFall || f.nightsAtOrBelow0C < MIN_FROST_DAYS)
    return { lastSpringFrost: "Rare", firstFallFrost: "Rare", lastSpringFrostDoy: 0, firstFallFrostDoy: 366, frostFreeDays: 366 };
  const last = dateToDoy(`2025-${f.lastSpring}`);
  let first = dateToDoy(`2025-${f.firstFall}`);
  if (first < last) first += 365;
  // 366 is the site's "no autumn frost" sentinel (src/lib/frost.ts seasonToOutput), so a first frost on 1 January is kept a day early.
  if (first === 366) first = 365;
  return { lastSpringFrost: doyToLabel(last), firstFallFrost: doyToLabel(first > 365 ? first - 365 : first), lastSpringFrostDoy: last, firstFallFrostDoy: first, frostFreeDays: first - last };
}

async function exists(f: string) {
  try {
    await access(f);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const table = JSON.parse(await readFile(F("place-station-normals.json"), "utf8")).towns as Record<string, StationNormal>;
  const normals = JSON.parse(await readFile(F("place-normals.json"), "utf8")) as Entry[];
  const rain = JSON.parse(await readFile(F("place-rain.json"), "utf8")) as Record<string, Record<string, unknown>>;
  const frost = JSON.parse(await readFile(F("place-frost.json"), "utf8")) as Record<string, Record<string, unknown>>;

  // The grid's own values, kept once before the first replacement (later runs read them back, so a rerun starts from ERA5).
  const era5File = F("place-normals-era5.json");
  const era5: Record<string, Record<string, unknown>> = (await exists(era5File)) ? JSON.parse(await readFile(era5File, "utf8")).towns : {};
  const firstRun = !Object.keys(era5).length;

  const lines: string[] = [];
  for (const e of normals) {
    const slug = e.place.slug;
    const s = table[slug];
    if (!s) continue;
    const c = e.climate;
    if (firstRun) era5[slug] = Object.fromEntries(GRID_KEYS.filter((k) => c[k] !== undefined).map((k) => [k, c[k]]));
    const prcp = s.monthlyPrcpMm.map((x) => Math.round(x));
    const temp = (a: number[]) => a.map((x) => Math.round(x * 10) / 10);
    const was = { max: (era5[slug]?.monthlyMeanMax ?? c.monthlyMeanMax) as number[], min: (era5[slug]?.monthlyMeanMin ?? c.monthlyMeanMin) as number[] };
    c.monthlyMeanMax = temp(s.monthlyMeanMaxC);
    c.monthlyMeanMin = temp(s.monthlyMeanMinC);
    c.monthlyRainMm = prcp;
    c.rainSource = "station";
    c.rainStation = s.station.name;
    c.rainStationKm = s.station.km;
    c.tempSource = "station";
    c.tempStation = s.station.name;
    c.tempStationKm = s.station.km;
    c.tempPeriod = s.period;
    c.tempBasis = s.source;
    const dMin = c.monthlyMeanMin.map((x, i) => x - was.min[i]);
    lines.push(`${slug.padEnd(36)} ${s.station.name.padEnd(30)} ${String(s.station.km).padStart(5)} km  mean lows ${dMin.map((x) => (x >= 0 ? "+" : "") + x.toFixed(1)).join(" ")}`);

    rain[slug] = {
      lat: e.place.lat,
      lon: e.place.lon,
      station: s.station.name,
      stationId: s.station.id,
      km: s.station.km,
      years: s.source === "noaa-normals" ? 30 : (s.prcpYears ?? s.years ?? 0),
      monthlyRainMm: prcp,
      annualMm: prcp.reduce((a, b) => a + b, 0),
      source: s.source === "noaa-normals" ? "NOAA NCEI 1991-2020 normals (MLY-PRCP-NORMAL)" : "NOAA GHCN Global Summary of the Month, 1991-2020 means",
    };

    if (s.frost) {
      const f = noaaFrost(s.frost);
      const old = frost[slug] ?? {};
      const entry = {
        ...f,
        frostSource: "stations",
        frostConfidence: "high",
        frostSpreadDays: null,
        frostStations: 1,
        frostDaysPerYear: s.frost.nightsAtOrBelow0C,
        frostStationKm: s.station.km,
        lat: e.place.lat,
        lon: e.place.lon,
        station: s.station,
        stations: old.stations ?? [s.station],
        method: "NOAA NCEI 1991–2020 normals: 50 % dates of the last spring and first autumn night at or below 32 °F (0 °C)",
      };
      lines.push(`${"".padEnd(36)} frost ${String(old.lastSpringFrost)} – ${String(old.firstFallFrost)} -> ${f.lastSpringFrost} – ${f.firstFallFrost}`);
      frost[slug] = entry;
      for (const k of ["lastSpringFrost", "firstFallFrost", "lastSpringFrostDoy", "firstFallFrostDoy", "frostFreeDays", "frostSource", "frostConfidence", "frostSpreadDays", "frostStations", "frostStationKm", "frostDaysPerYear"] as const) c[k] = entry[k];
    }
  }
  console.log(lines.join("\n"));
  if (dry) return;
  if (firstRun) {
    const about =
      "The ERA5 monthly means, precipitation and frost fields each town had in src/data/place-normals.json before scripts/build-station-normals.ts put station normals in their place (14 November 2026). Kept so the change can be undone and the grid compared with the stations.";
    await writeFile(era5File, `{\n"_about":${JSON.stringify(about)},\n"towns":{\n${Object.entries(era5).map(([k, v]) => `${JSON.stringify(k)}:${JSON.stringify(v)}`).join(",\n")}\n}\n}\n`);
  }
  await writeFile(F("place-normals.json"), JSON.stringify(normals));
  await writeFile(F("place-rain.json"), fmtLines(rain));
  await writeFile(F("place-frost.json"), fmtLines(frost));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
