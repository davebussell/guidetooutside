/**
 * Builds the station climate files for the pre-built towns, and applies them
 * to src/data/place-normals.json:
 *
 *   src/data/place-frost.json   frost dates from GHCN-Daily stations (1991–2020)
 *   src/data/place-rain.json    monthly rainfall normals from GHCN-Daily stations (1991–2020)
 *
 *   npx tsx scripts/build-place-frost.ts                 # frost, every known place
 *   npx tsx scripts/build-place-frost.ts --rain          # rainfall normals
 *   npx tsx scripts/build-place-frost.ts --apply         # write both into place-normals.json
 *   npx tsx scripts/build-place-frost.ts --grid          # re-read ERA5 daily frost for places with no station (needs archive quota)
 *   npx tsx scripts/build-place-frost.ts --dry london-uk warsaw-poland
 *
 * (The repo has no tsx; the orchestrator runs it through jiti:
 *   node /tmp/.../run.mjs scripts/build-place-frost.ts --rain)
 *
 * Station data is cached under $GHCN_CACHE (default .cache/ghcn) as one JSON
 * per station: daily TMIN, TMAX and PRCP in tenths from 1991-01-01, null where
 * missing. Downloads come from NCEI (ncei.noaa.gov/data/global-historical-
 * climatology-network-daily/access/<id>.csv).
 *
 * Frost method (src/lib/frost.ts `frostFromDaily`): stations with at least 15
 * years of TMIN in 1991–2020 within 20 km of the town (25 km failing that),
 * within 250 m of the town's elevation (a 250 m difference is 1.6 °C at the
 * standard lapse rate), leaving out RAWS fire-weather (USR) and SNOTEL
 * mountain (USS) sites, and leaving out the GSOD-derived "M" series whenever
 * a national-network or ECA&D station is available within the radius (the
 * Heathrow GSOD series in GHCN runs 1–3 °C cold: 5.6 frost days per October
 * on a 6.0 °C mean minimum, against the Met Office's 0.3 days and 8.8 °C;
 * Okęcie's and Blindern's agree with their national records, so an M series
 * is still used where it is the only one).
 *
 * Which station (from 11 November 2026): each station's own first and last
 * frost are read from its own frequency curve at 0 °C and kept in the entry
 * (`readings`), and the town's dates are the ones of the station `townStation`
 * in src/lib/frost.ts picks: the nearest first-order station with 20 complete
 * frost seasons within 15 km, else the nearest such station of any network
 * there, else the nearest such station in the list. The audit of 10 November
 * 2026 found the old pooled frequency over every station within 20 km matched
 * no station (Boston Apr 19 / Oct 24 against Logan's Apr 4 / Nov 9, NOAA
 * 1991–2020 normals). Only where no station has 20 complete seasons are the
 * stations still pooled; the entry then has no `station` and the pages say
 * "pooled from N weather stations". Each run prints every town whose dates
 * move by more than 5 days against the file it replaces.
 *
 * What this needs to run: the GHCN-Daily station list and inventory, and the
 * daily CSV of every station in each town's list (about 600 stations for the
 * 233 towns with stations), from NCEI or from a copy of .cache/ghcn. Then
 * `--apply` writes the dates into src/data/place-normals.json, which is what
 * the pages read for a pre-built town.
 *
 * Calibration behind the constants in src/lib/frost.ts (14 Oct 2026, this
 * script's data):
 *  - CROSSING 1.2: on 324 complete stations (≥ 20 seasons of ≥ 330 days,
 *    ≥ 5 frost days a year) the frequency method reproduces the median-of-
 *    years first/last frost with bias −1/+0 days and sd 7/3 days; at 30 %
 *    random daily coverage the sd is 3 days.
 *  - gridThresholds: the site's old 4.5 °C ERA5 rule against pooled stations
 *    at 46 towns: diurnal range < 6 °C, grid 20 days late in spring and 9
 *    early in autumn (2.2 °C and 0.9 °C over-reading); range ≥ 6 °C, grid
 *    4–6 days late in spring and 8–10 days late in autumn (0.2 °C over,
 *    2.1 °C under).
 *  - normalsFrost T*: on 158 towns with pooled stations within 15 km, the
 *    ERA5 monthly mean minimum on the station's average last-frost date is
 *    2.22 + 0.438 × diurnal range (°C, residual sd 1.5) and on its first-
 *    frost date 4.55 + 0.316 × range (sd 1.5).
 *
 * Rainfall: the station within 15 km with the most complete PRCP record
 * (every calendar month needs ≥ 15 complete months, a month counting when at
 * most 3 days are missing), its 1991–2020 monthly means. First-order (USW,
 * national) stations are preferred over volunteer gauges at equal coverage.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import KNOWN from "../src/lib/known-places.json";
import { doyToLabel } from "../src/lib/climate-fallback";
import { CROSSING, MIN_FROST_DAYS, STATION_RADIUS_FAR_KM, STATION_RADIUS_KM, TOWN_RING_KM, frostFromDaily, frostSeasons, gridFrost, gridThresholds, normalsFrost, townStation, type DailyMin, type Frost, type StationReading } from "../src/lib/frost";
import type { Climate, Place } from "../src/lib/types";

type Known = { slug: string; lat: number; lon: number; name: string };
type Entry = { place: Place; climate: Climate };
type StationFile = { id: string; name: string; lat: string | number | null; lon: string | number | null; tmin: (number | null)[]; tmax: (number | null)[]; prcp: (number | null)[] };
type Cand = { id: string; name: string; km: number; elev: number; tminYears: number; prcpYears: number };

const GHCN = "https://www.ncei.noaa.gov/pub/data/ghcn/daily";
const ACCESS = "https://www.ncei.noaa.gov/data/global-historical-climatology-network-daily/access";
const FROM = 1991;
const TO = 2020;
const MIN_YEARS = 15;
const RAIN_KM = 15;
const ELEV_M = 250;
const ROOT = process.cwd();
const CACHE = process.env.GHCN_CACHE ?? path.join(ROOT, ".cache", "ghcn");
const FROST_OUT = path.join(ROOT, "src/data/place-frost.json");
const RAIN_OUT = path.join(ROOT, "src/data/place-rain.json");
const NORMALS = path.join(ROOT, "src/data/place-normals.json");
const D0 = Date.UTC(1991, 0, 1);
const NDAYS = Math.round((Date.UTC(2020, 11, 31) - D0) / 86400000) + 1;
const UA = { "User-Agent": "guidetooutside.com (+https://guidetooutside.com/about)" };

const km = (a: number, b: number, c: number, d: number) => {
  const r = Math.PI / 180;
  return Math.hypot((d - b) * r * Math.cos(((a + c) / 2) * r), (c - a) * r) * 6371;
};
const isoOf = (i: number) => new Date(D0 + i * 86400000).toISOString().slice(0, 10);

async function text(url: string): Promise<string> {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return res.text();
}

async function cachedText(name: string, url: string): Promise<string> {
  const f = path.join(CACHE, name);
  try {
    return await readFile(f, "utf8");
  } catch {
    const t = await text(url);
    await mkdir(CACHE, { recursive: true });
    await writeFile(f, t);
    return t;
  }
}

/** Parse a GHCN-Daily CSV into the compact daily arrays. */
function parseCsv(csv: string, id: string): StationFile {
  const out: StationFile = { id, name: "", lat: null, lon: null, tmin: new Array(NDAYS).fill(null), tmax: new Array(NDAYS).fill(null), prcp: new Array(NDAYS).fill(null) };
  const lines = csv.split("\n");
  const head = splitCsv(lines[0]);
  const iDate = head.indexOf("DATE");
  const iTmin = head.indexOf("TMIN");
  const iTmax = head.indexOf("TMAX");
  const iPrcp = head.indexOf("PRCP");
  const iName = head.indexOf("NAME");
  const iLat = head.indexOf("LATITUDE");
  const iLon = head.indexOf("LONGITUDE");
  for (const line of lines.slice(1)) {
    if (!line) continue;
    const cells = splitCsv(line);
    const date = cells[iDate];
    if (!date || date < "1991-01-01" || date > "2020-12-31") continue;
    const i = Math.round((Date.UTC(Number(date.slice(0, 4)), Number(date.slice(5, 7)) - 1, Number(date.slice(8, 10))) - D0) / 86400000);
    if (!out.name) {
      out.name = cells[iName] ?? "";
      out.lat = cells[iLat] ?? null;
      out.lon = cells[iLon] ?? null;
    }
    const num = (k: number) => (k >= 0 && cells[k] !== "" && cells[k] != null && Number.isFinite(Number(cells[k])) ? Number(cells[k]) : null);
    out.tmin[i] = num(iTmin);
    out.tmax[i] = num(iTmax);
    out.prcp[i] = num(iPrcp);
  }
  return out;
}

function splitCsv(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    else if (ch === "," && !q) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

async function station(id: string): Promise<StationFile | null> {
  const f = path.join(CACHE, `${id}.json`);
  try {
    return JSON.parse(await readFile(f, "utf8")) as StationFile;
  } catch {
    /* not cached */
  }
  try {
    const csv = await text(`${ACCESS}/${id}.csv`);
    const parsed = parseCsv(csv, id);
    await mkdir(CACHE, { recursive: true });
    await writeFile(f, JSON.stringify(parsed));
    return parsed;
  } catch (e) {
    console.error(`${id}: ${(e as Error).message}`);
    return null;
  }
}

const toDaily = (arr: (number | null)[]): DailyMin[] => arr.map((v, i) => ({ date: isoOf(i), tmin: v == null ? null : v / 10 }));

/** Rank for choosing one rainfall station: national first-order stations first, then coverage, then distance. */
const firstOrder = (id: string) => /^(USW|CAM|CAN|UKM|UKE|FRM|GM0|GME|SPM|SPE|ITM|ITE|PLM|NOM|NOE|SWM|SWE|PO0|SF|KE|NI|GH|MO|EG|TS|AG|ZA)/.test(id);

type Out = Frost & {
  lat: number;
  lon: number;
  /** The station whose own dates these are; absent when the stations were pooled. */
  station?: { id: string; name: string; km: number };
  stations: { id: string; name: string; km: number }[];
  /** Every station's own reading, so the choice can be checked and redone offline. */
  readings?: StationReading[];
  method: string;
};

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry");
  const doRain = args.includes("--rain");
  const doApply = args.includes("--apply");
  const doGrid = args.includes("--grid");
  // Under jiti the script's own path is in argv; only bare slugs select places.
  const only = new Set(args.filter((a) => !a.startsWith("--") && !a.includes("/") && !a.endsWith(".ts")));
  const places = (KNOWN as Known[]).filter((p) => !only.size || only.has(p.slug));
  const normals = JSON.parse(await readFile(NORMALS, "utf8")) as Entry[];
  const bySlug = new Map(normals.map((e) => [e.place.slug, e]));

  if (doApply) return apply(normals, dry);

  console.log("reading the GHCN station list and inventory…");
  const [stationsTxt, inventoryTxt] = await Promise.all([cachedText("stations.txt", `${GHCN}/ghcnd-stations.txt`), cachedText("inventory.txt", `${GHCN}/ghcnd-inventory.txt`)]);
  const meta = new Map<string, { lat: number; lon: number; elev: number; name: string }>();
  for (const l of stationsTxt.split("\n")) if (l.length > 30) meta.set(l.slice(0, 11), { lat: Number(l.slice(12, 20)), lon: Number(l.slice(21, 30)), elev: Number(l.slice(31, 37)), name: l.slice(41, 71).trim() });
  const years = new Map<string, { tmin: number; prcp: number }>();
  for (const l of inventoryTxt.split("\n")) {
    const el = l.slice(31, 35);
    if (el !== "TMIN" && el !== "PRCP") continue;
    const a = Number(l.slice(36, 40));
    const b = Number(l.slice(41, 45));
    const cover = Math.min(b, TO) - Math.max(a, FROM) + 1;
    const id = l.slice(0, 11);
    const y = years.get(id) ?? { tmin: 0, prcp: 0 };
    if (el === "TMIN") y.tmin = cover;
    else y.prcp = cover;
    years.set(id, y);
  }

  const candidates = (p: Known): Cand[] => {
    const out: Cand[] = [];
    for (const [id, m] of meta) {
      const d = km(p.lat, p.lon, m.lat, m.lon);
      if (d > STATION_RADIUS_FAR_KM) continue;
      const y = years.get(id);
      if (!y || (y.tmin < MIN_YEARS && y.prcp < MIN_YEARS)) continue;
      out.push({ id, name: m.name, km: Math.round(d * 10) / 10, elev: m.elev, tminYears: y.tmin, prcpYears: y.prcp });
    }
    return out.sort((a, b) => a.km - b.km);
  };

  if (doRain) {
    const existing = JSON.parse(await readFile(RAIN_OUT, "utf8").catch(() => "{}")) as Record<string, unknown>;
    const out: Record<string, unknown> = only.size ? { ...existing } : {};
    for (const p of places) {
      const cands = candidates(p).filter((c) => c.prcpYears >= MIN_YEARS && c.km <= RAIN_KM);
      let best: { c: Cand; months: number[]; years: number } | null = null;
      for (const c of cands) {
        const s = await station(c.id);
        if (!s) continue;
        const n = rainNormal(s.prcp);
        if (!n) continue;
        const better = !best || Number(firstOrder(c.id)) - Number(firstOrder(best.c.id)) > 0 || (firstOrder(c.id) === firstOrder(best.c.id) && (n.years > best.years + 2 || (Math.abs(n.years - best.years) <= 2 && c.km < best.c.km)));
        if (better) best = { c, months: n.months, years: n.years };
      }
      if (!best) {
        delete out[p.slug];
        console.log(`${p.slug}: no rainfall station within ${RAIN_KM} km`);
        continue;
      }
      const annual = best.months.reduce((a, b) => a + b, 0);
      out[p.slug] = { lat: p.lat, lon: p.lon, station: best.c.name, stationId: best.c.id, km: best.c.km, years: best.years, monthlyRainMm: best.months, annualMm: annual, source: "GHCN-Daily 1991-2020 monthly means, NCEI" };
      const era = bySlug.get(p.slug)?.climate.monthlyRainMm?.reduce((a, b) => a + b, 0);
      console.log(`${p.slug}: ${best.c.name} (${best.c.km} km, ${best.years} yrs) ${annual} mm${era ? ` vs ERA5 ${era} mm (${Math.round(((era - annual) / annual) * 100)} %)` : ""}`);
    }
    if (!dry) await writeFile(RAIN_OUT, JSON.stringify(out, null, 0).replace(/\{"/g, '{\n"').replace(/,"/g, ',\n"'));
    console.log(`${dry ? "would write" : "wrote"} ${Object.keys(out).length} rainfall normals`);
    return;
  }

  // ---- frost -------------------------------------------------------------------
  const existing = JSON.parse(await readFile(FROST_OUT, "utf8").catch(() => "{}")) as Record<string, Out>;
  const out: Record<string, Out> = only.size ? { ...existing } : {};
  /** Towns whose dates move by more than 5 days against the file being replaced. */
  const moved: string[] = [];
  for (const p of places) {
    const south = p.lat < 0;
    const elev = bySlug.get(p.slug)?.climate.elevationM;
    const all = candidates(p).filter((c) => c.tminYears >= MIN_YEARS && !/^US[RS]/.test(c.id) && (elev == null || Math.abs(c.elev - elev) <= ELEV_M));
    const pick = (radius: number) => {
      const within = all.filter((c) => c.km <= radius);
      const national = within.filter((c) => c.id[2] !== "M");
      return national.length ? national : within;
    };
    let use = pick(STATION_RADIUS_KM);
    let far = false;
    if (!use.length) {
      use = pick(STATION_RADIUS_FAR_KM);
      far = true;
    }
    const series: { c: Cand; days: DailyMin[] }[] = [];
    for (const c of use) {
      const s = await station(c.id);
      if (s) series.push({ c, days: toDaily(s.tmin) });
    }
    if (!series.length) {
      delete out[p.slug];
      if (doGrid) {
        const g = await gridFromArchive(p, bySlug.get(p.slug)?.climate ?? null);
        console.log(`${p.slug}: no station within ${STATION_RADIUS_FAR_KM} km; grid ${g ? `${g.lastSpringFrost} – ${g.firstFallFrost}` : "unavailable"}`);
      } else console.log(`${p.slug}: no long-record station within ${STATION_RADIUS_FAR_KM} km (the normals model stands)`);
      continue;
    }
    // Each station's own reading; the spread between their own last frosts, where each has enough frost to date.
    const readings: StationReading[] = [];
    const own = new Map<string, ReturnType<typeof frostFromDaily>>();
    const lasts: number[] = [];
    for (const s of series) {
      const r = frostFromDaily([s.days], south, 0);
      own.set(s.c.id, r);
      if (r.expectedDays >= MIN_FROST_DAYS) lasts.push(r.frost.lastSpringFrostDoy);
      readings.push({
        id: s.c.id,
        name: s.c.name,
        km: s.c.km,
        firstOrder: firstOrder(s.c.id),
        seasons: frostSeasons(s.days, south),
        lastSpringFrost: r.frost.lastSpringFrost,
        firstFallFrost: r.frost.firstFallFrost,
        lastSpringFrostDoy: r.frost.lastSpringFrostDoy,
        firstFallFrostDoy: r.frost.firstFallFrostDoy,
        frostDaysPerYear: Math.round(r.expectedDays * 10) / 10,
      });
    }
    const spread = lasts.length > 1 ? Math.max(...lasts) - Math.min(...lasts) : null;
    // The town's own station where one has a long enough record; the pooled frequency only where none has.
    const chosen = townStation(readings);
    const { frost, expectedDays, days } = chosen
      ? own.get(chosen.id)!
      : frostFromDaily(
          series.map((s) => s.days),
          south,
          0,
        );
    const nearestKm = Math.min(...series.map((s) => s.c.km));
    const confidence: NonNullable<Frost["frostConfidence"]> = chosen
      ? chosen.km <= TOWN_RING_KM && !far
        ? "high"
        : "medium"
      : far || days < 3000
        ? "medium"
        : (spread ?? 0) <= 14 && (series.length > 1 || nearestKm <= 10)
          ? "high"
          : "medium";
    out[p.slug] = {
      ...frost,
      frostSource: "stations",
      frostConfidence: confidence,
      frostSpreadDays: spread,
      frostStations: chosen ? 1 : series.length,
      frostStationKm: chosen ? chosen.km : nearestKm,
      frostDaysPerYear: Math.round(expectedDays * 10) / 10,
      lat: p.lat,
      lon: p.lon,
      ...(chosen ? { station: { id: chosen.id, name: chosen.name, km: chosen.km } } : {}),
      stations: series.map((s) => ({ id: s.c.id, name: s.c.name, km: s.c.km })),
      readings,
      method: chosen
        ? `GHCN-Daily 1991–2020, the town's station (nearest first-order with 20 complete seasons within ${TOWN_RING_KM} km), frequency at 0 °C, crossing ${CROSSING}`
        : `GHCN-Daily 1991–2020, pooled frequency at 0 °C over every station (none has 20 complete seasons), crossing ${CROSSING}`,
    };
    const was = existing[p.slug];
    if (was && (Math.abs(was.lastSpringFrostDoy - frost.lastSpringFrostDoy) > 5 || Math.abs(was.firstFallFrostDoy - frost.firstFallFrostDoy) > 5)) {
      moved.push(`${p.slug}: ${was.lastSpringFrost} – ${was.firstFallFrost} → ${frost.lastSpringFrost} – ${frost.firstFallFrost} (${chosen ? `${chosen.name}, ${chosen.km} km` : `pooled, ${series.length} stations`})`);
    }
    console.log(
      `${p.slug}: ${frost.lastSpringFrost} – ${frost.firstFallFrost} (${frost.frostFreeDays} d, ${expectedDays.toFixed(1)} frost days/yr, ${chosen ? `${chosen.name} ${chosen.km} km, ${chosen.seasons} seasons` : `pooled ${series.length} station${series.length === 1 ? "" : "s"}, nearest ${nearestKm} km`}, ${confidence})${was ? ` was ${was.lastSpringFrost} – ${was.firstFallFrost}` : ""}`,
    );
  }
  console.log(`\n${moved.length} towns move by more than 5 days:\n${moved.map((m) => `  ${m}`).join("\n")}`);
  if (dry) return;
  await writeFile(FROST_OUT, JSON.stringify(out, null, 0).replace(/\{"/g, '{\n"').replace(/,"/g, ',\n"'));
  console.log(`wrote ${Object.keys(out).length} places to ${FROST_OUT}`);
}

/** 1991–2020 monthly rainfall means (mm) from daily tenths; null when a calendar month has fewer than 15 complete months. */
function rainNormal(prcp: (number | null)[]): { months: number[]; years: number } | null {
  const sums = new Map<string, { total: number; n: number; days: number }>();
  for (let i = 0; i < prcp.length; i++) {
    const d = new Date(D0 + i * 86400000);
    const k = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
    const s = sums.get(k) ?? { total: 0, n: 0, days: new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate() };
    const v = prcp[i];
    if (v != null) {
      s.total += v;
      s.n++;
    }
    sums.set(k, s);
  }
  const byMonth: number[][] = Array.from({ length: 12 }, () => []);
  for (const [k, s] of sums) {
    if (s.n >= s.days - 3) byMonth[Number(k.split("-")[1])].push(s.total / 10);
  }
  const years = Math.min(...byMonth.map((m) => m.length));
  if (years < 15) return null;
  return { months: byMonth.map((m) => Math.round(m.reduce((a, b) => a + b, 0) / m.length)), years };
}

/** ERA5 daily minima for a place from the Open-Meteo archive, read against the grid thresholds (needs quota). */
async function gridFromArchive(p: Known, c: Climate | null): Promise<Frost | null> {
  if (!c) return null;
  const endYear = new Date().getUTCFullYear() - 1;
  const url = new URL("https://archive-api.open-meteo.com/v1/archive");
  url.searchParams.set("latitude", p.lat.toFixed(4));
  url.searchParams.set("longitude", p.lon.toFixed(4));
  url.searchParams.set("start_date", `${endYear - 9}-01-01`);
  url.searchParams.set("end_date", `${endYear}-12-31`);
  url.searchParams.set("daily", "temperature_2m_min");
  url.searchParams.set("timezone", "auto");
  const res = await fetch(url);
  if (!res.ok) return null;
  const j = (await res.json()) as { daily?: { time: string[]; temperature_2m_min: (number | null)[] } };
  if (!j.daily) return null;
  const days: DailyMin[] = j.daily.time.map((t, i) => ({ date: t, tmin: j.daily!.temperature_2m_min[i] }));
  return gridFrost(days, c, p.lat < 0);
}

type Grid45 = { lat: number; lon: number; lastSpringFrost: string; firstFallFrost: string; lastSpringFrostDoy: number; firstFallFrostDoy: number; south?: boolean };

/**
 * Frost for a town with no station: its own ERA5 daily dates at the old
 * 4.5 °C threshold (scripts/era5-frost-45.json, kept from the live site's
 * records), corrected by the station-minus-grid offset of the nearest towns
 * that have both (inverse-distance weighted, within 400 km, same hemisphere;
 * one neighbour will do), as RF-findings L0 proposed ("calibrate per-cell
 * against the nearest GHCN station"). Used only for maritime cells (diurnal
 * range of the coldest months under 6 °C), where the grid's error is large
 * and consistent (London −30/+27 days, Cork −39/+45) and the monthly model is
 * weakest; continental and Alpine towns, whose neighbours' offsets do not
 * transfer (Milan's −49 days is an urban station's), get the monthly-normals
 * model, which checks out against their met services (Bern Apr 29 – Oct 11,
 * Riga Apr 24 – Oct 14). Towns whose grid dates were Rare or one-sided, or
 * with no neighbour, get the model too.
 */
function neighbourFrost(slug: string, lat: number, lon: number, grid45: Record<string, Grid45>, frost: Record<string, Out>, c: Climate): Frost | null {
  const own = grid45[slug];
  if (!own || own.lastSpringFrost === "Rare" || own.firstFallFrost === "Rare") return null;
  if (gridThresholds(c).diurnalRange >= 6) return null;
  const south = lat < 0;
  let wSum = 0;
  let dLast = 0;
  let dFirst = 0;
  let n = 0;
  for (const [s, g] of Object.entries(grid45)) {
    const f = frost[s];
    if (s === slug || !f || f.lastSpringFrost === "Rare" || g.lastSpringFrost === "Rare" || g.firstFallFrost === "Rare" || g.lat < 0 !== south) continue;
    const d = km(lat, lon, g.lat, g.lon);
    if (d > 400) continue;
    const w = 1 / Math.max(20, d);
    wSum += w;
    dLast += w * (f.lastSpringFrostDoy - g.lastSpringFrostDoy);
    dFirst += w * (f.firstFallFrostDoy - g.firstFallFrostDoy);
    n++;
  }
  if (n < 1) return null;
  const lastDoy = Math.round(own.lastSpringFrostDoy + dLast / wSum);
  const firstDoy = Math.round(own.firstFallFrostDoy + dFirst / wSum);
  if (firstDoy - lastDoy < 14) return null;
  const label = (doy: number) => doyToLabel(south ? doy + 182 : doy);
  return {
    lastSpringFrost: label(lastDoy),
    firstFallFrost: label(firstDoy),
    lastSpringFrostDoy: lastDoy,
    firstFallFrostDoy: firstDoy,
    frostFreeDays: firstDoy - lastDoy,
    frostSource: "grid",
    frostConfidence: "low",
    frostSpreadDays: null,
    frostStations: null,
    ...(south ? { south: true } : {}),
  };
}

/** Write the station frost and rainfall into place-normals.json; places without a station get the neighbour-corrected grid dates or the normals model. */
async function apply(normals: Entry[], dry: boolean) {
  const frost = JSON.parse(await readFile(FROST_OUT, "utf8")) as Record<string, Out>;
  const rain = JSON.parse(await readFile(RAIN_OUT, "utf8")) as Record<string, { station: string; km: number; monthlyRainMm: number[] }>;
  const grid45 = JSON.parse(await readFile(path.join(ROOT, "scripts/era5-frost-45.json"), "utf8").catch(() => "{}")) as Record<string, Grid45>;
  let nStation = 0;
  let nNeighbour = 0;
  let nModel = 0;
  let nRain = 0;
  for (const e of normals) {
    const c = e.climate;
    const south = e.place.lat < 0;
    const f = frost[e.place.slug];
    const neighbour = f ? null : neighbourFrost(e.place.slug, e.place.lat, e.place.lon, grid45, frost, c);
    const next: Frost = f
      ? {
          lastSpringFrost: f.lastSpringFrost,
          firstFallFrost: f.firstFallFrost,
          lastSpringFrostDoy: f.lastSpringFrostDoy,
          firstFallFrostDoy: f.firstFallFrostDoy,
          frostFreeDays: f.frostFreeDays,
          frostSource: "stations",
          frostConfidence: f.frostConfidence,
          frostSpreadDays: f.frostSpreadDays,
          frostStations: f.frostStations,
          frostStationKm: f.frostStationKm,
          frostDaysPerYear: f.frostDaysPerYear,
        }
      : (neighbour ?? normalsFrost(c, south));
    if (f) nStation++;
    else if (neighbour) nNeighbour++;
    else nModel++;
    const before = `${c.lastSpringFrost} – ${c.firstFallFrost} (${c.frostSource})`;
    Object.assign(c, {
      lastSpringFrost: next.lastSpringFrost,
      firstFallFrost: next.firstFallFrost,
      lastSpringFrostDoy: next.lastSpringFrostDoy,
      firstFallFrostDoy: next.firstFallFrostDoy,
      frostFreeDays: next.frostFreeDays,
      frostSource: next.frostSource,
      frostConfidence: next.frostConfidence,
      frostSpreadDays: next.frostSpreadDays ?? null,
      frostStations: next.frostStations ?? null,
    });
    delete c.frostStationKm;
    delete c.frostDaysPerYear;
    if (next.frostStationKm != null) c.frostStationKm = next.frostStationKm;
    if (next.frostDaysPerYear != null) c.frostDaysPerYear = next.frostDaysPerYear;
    if (south) c.south = true;
    const r = rain[e.place.slug];
    delete c.rainStation;
    delete c.rainStationKm;
    if (r) {
      c.monthlyRainMm = r.monthlyRainMm;
      c.rainSource = "station";
      c.rainStation = r.station;
      c.rainStationKm = r.km;
      nRain++;
    } else c.rainSource = "grid";
    const after = `${c.lastSpringFrost} – ${c.firstFallFrost} (${c.frostSource}, ${c.frostConfidence})`;
    if (before !== after.replace(/, (high|medium|low)\)/, ")")) console.log(`${e.place.slug}: ${before} → ${after}`);
  }
  console.log(`${nStation} places from stations, ${nNeighbour} from neighbour-corrected grid dates, ${nModel} from the normals model, ${nRain} with station rainfall`);
  if (dry) return;
  await writeFile(NORMALS, JSON.stringify(normals));
  console.log(`wrote ${NORMALS}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
