/**
 * Builds src/data/place-extremes.json: for each pre-built town with a stored
 * weather station, how many cold nights and hot days a year it really has,
 * counted from the station's daily record, with the coldest night of an
 * average year and the station's record low and high.
 *
 * Why: monthly averages hide extremes. A town whose average July afternoon is
 * 27 °C still has hot days, and one whose average January night is -13 °C still
 * has nights at -25 °C. The homestead page used to count these from the twelve
 * monthly means spread over 365 days, which can never reach a threshold the
 * means do not reach (Ottawa: "none below -20 °C", "no days above 30 °C"; the
 * station counts 15 and 15). Only a daily record can say.
 *
 * Run (no tsx in this project; esbuild bundles it, as for scripts/check-homestead.ts;
 * Node's fetch needs NODE_USE_ENV_PROXY=1 behind a proxy):
 *   npx esbuild scripts/build-place-extremes.ts --bundle --platform=node --format=esm \
 *     --outfile=/tmp/build-place-extremes.mjs --log-level=warning \
 *   && EXTREMES_CACHE=/some/scratch/dir NODE_USE_ENV_PROXY=1 node /tmp/build-place-extremes.mjs [--dry] [--wide] [slug ...]
 *
 * With slugs it rebuilds only those towns and keeps the rest of the file.
 * With --wide it searches only the towns that have no entry yet, in the wider
 * list described below, and keeps the rest of the file.
 *
 * Stations: the ones already chosen for each town in src/data/place-frost.json
 * (scripts/build-place-frost.ts: GHCN-Daily stations within 20 km, 25 km at
 * most, within 250 m of the town's elevation, nearest first). The nearest one
 * whose record passes the completeness rule below is used; if it does not
 * pass, the next is tried. A town with no stored station, or none that passes,
 * has no entry, and its page says that no daily record was available.
 *
 * Wider list (--wide): for a town left without an entry, the station catalogue
 * and inventory NOAA publishes (ghcnd-stations.txt, ghcnd-inventory.txt, cached
 * under $EXTREMES_CACHE; downloaded once if absent) give every station within
 * 40 km whose inventory shows TMIN and TMAX spanning at least 20 of the years
 * 1991-2020, within 250 m of the town's elevation, leaving out RAWS (USR) and
 * SNOTEL (USS) sites, nearest first, at most 10 tried. The same completeness
 * rule decides; the entry names the station and its distance, so a station
 * 25-40 km off is printed as such ("Counted from St Margaret's Bay, 25.5 km
 * away"). A station beyond the 25 km of the stored list must also read like the
 * town's own climate: its mean annual extreme minimum within 4 °C of the
 * town's ERA5 one for the cold figures, and its mean TMAX in the town's
 * warmest month within 3 °C of ERA5's for the hot figures (the stored stations
 * agree on the cold side to within about 4 °C at the 5th and 95th percentile).
 * The cold test was 6 °C until the audit of 10 November 2026: it let St Margaret's
 * Bay, 25.5 km from Halifax and 5.0 °C colder than the town's ERA5 coldest night,
 * set Halifax's coldest night, USDA-equivalent zone and record low, while the
 * town's own frost stations (McNabs Island, Shearwater, Lake Major) lie 7–11 km
 * away. 4 °C is the stored stations' own 5–95 % agreement.
 * A figure that fails is not given: Thunder Bay's nearest long record 32 km
 * away (Flint) reads 10.6 °C colder than the town's reanalysis, a different
 * climate, so Thunder Bay stays without a count.
 *
 * Data: NOAA GHCN-Daily "access" CSV per station
 * (ncei.noaa.gov/data/global-historical-climatology-network-daily/access/<id>.csv),
 * TMIN and TMAX in tenths of °C. Values that failed NOAA's own quality checks
 * (a quality flag in the attributes column) are dropped, and so is anything
 * outside -90..60 °C. Downloads are cached as compact JSON (daily 1991-2020
 * plus the whole-record low and high) under $EXTREMES_CACHE, outside the repo.
 *
 * Counting (calendar years 1991-2020, the WMO 1991-2020 normals period):
 *  - A year counts for an element (TMIN or TMAX) when it has at least 300
 *    valid days of it. An element needs at least 20 such years (30 are
 *    possible) for its figures to be given; otherwise they are null, never
 *    zero (the cold figures need TMIN, the hot figures TMAX). A station is
 *    used when at least one element passes, and the nearest station passing
 *    both is preferred over a nearer one that passes only one. Missing days
 *    are not filled in, so a year with gaps can only under-count.
 *  - nightsBelowMinus10 / 20 / 25: mean days a year with TMIN <= -10 / -20 / -25 °C.
 *    nightsBelowZero: mean days a year with TMIN < 0 °C (a frost night).
 *  - daysAbove30 / 35: mean days a year with TMAX >= 30 / 35 °C.
 *  - meanAnnualExtremeMinC: mean over the qualifying years of each year's
 *    lowest TMIN. This is the quantity the USDA hardiness zones are defined on
 *    (the average of each winter's single coldest night), here from a station
 *    rather than a grid. Calendar years suit both hemispheres: a northern
 *    winter's coldest night falls in January or February or in December of the
 *    same calendar year, and a southern winter lies wholly inside one.
 *  - recordLowC / recordHighC: the lowest TMIN and highest TMAX anywhere in the
 *    station's file (not only 1991-2020), with the date, and the first and last
 *    years the station reported that element (recordLowSince / recordLowUntil,
 *    recordHighSince / recordHighUntil). Given only where that element passes
 *    the completeness rule above.
 *
 * Split station IDs: ECCC gives a station a new climate ID when it is moved or
 * automated, and GHCN-Daily keeps each ID as its own file, so one airport's
 * record can sit in two or three files, none of them complete. The audit of
 * 10 November 2026 found Fredericton with no count at all (its airport record is
 * split) and Saint John's record high stopping at 34.4 °C in 1976, when ECCC's
 * is 34.5 °C on 20 June 2024 under the newer ID. So each station is joined with
 * its siblings in NOAA's station list: same country and network (the first three
 * characters of the ID), same first word of the name, within 3 km and 30 m of
 * elevation. Missing days of the station are filled from the siblings, nearest
 * first, and the records are taken over all of them; the entry lists the joined
 * IDs (`station.joined`).
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { townStations, type PlaceExtremes } from "../src/lib/extremes";
import { extremesStationRejected } from "../src/lib/extremes-rule";

const ACCESS = "https://www.ncei.noaa.gov/data/global-historical-climatology-network-daily/access";
const FROM = 1991;
const TO = 2020;
/** A year counts for an element when it has at least this many valid days of it. */
const MIN_DAYS = 300;
/** A station needs this many qualifying years. */
const MIN_YEARS = 20;
const ROOT = process.cwd();
const FROST = path.join(ROOT, "src/data/place-frost.json");
const NORMALS = path.join(ROOT, "src/data/place-normals.json");
const OUT = path.join(ROOT, "src/data/place-extremes.json");
const CACHE = process.env.EXTREMES_CACHE ?? path.join(os.tmpdir(), "guidetooutside-extremes-cache");
const DELAY_MS = 500;
/** The wider search (--wide): stations within this distance, at most this many tried per town. */
const WIDE_KM = 40;
const WIDE_TRIES = 10;
const ELEV_M = 250;
/** Stations beyond this (the stored list's own limit) must agree with the town's ERA5 climate; see the header. */
const NEAR_KM = 25;
const COLD_AGREE_C = 4;
/** Split IDs of one station are joined within this distance and elevation (see the header). */
const JOIN_KM = 3;
const JOIN_ELEV_M = 30;
const HOT_AGREE_C = 3;
const GHCN = "https://www.ncei.noaa.gov/pub/data/ghcn/daily";
const UA = { "User-Agent": "guidetooutside.com data build (GHCN-Daily station extremes, sequential, cached)" };

const D0 = Date.UTC(FROM, 0, 1);
const NDAYS = Math.round((Date.UTC(TO, 11, 31) - D0) / 86400000) + 1;
const dayIndex = (iso: string) => Math.round((Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10))) - D0) / 86400000);

type Stored = { id: string; name: string; km: number };
type Record1 = { v: number; d: string } | null;
/** One station's compact record: daily tenths of °C for 1991-2020 (null where missing) and the whole-file extremes. */
type StationFile = {
  id: string;
  name: string;
  tmin: (number | null)[];
  tmax: (number | null)[];
  low: Record1;
  high: Record1;
  lowSince: number | null;
  highSince: number | null;
  /** The last year with a reading (absent in files cached before 11 November 2026). */
  lowUntil?: number | null;
  highUntil?: number | null;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const r1 = (x: number) => Math.round(x * 10) / 10;

function splitCsv(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') q = !q;
    else if (ch === "," && !q) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

/** A value in tenths of °C, or null when it is blank, flagged by NOAA's quality checks, or not credible. */
function tenths(cell: string | undefined, attr: string | undefined, lo: number, hi: number): number | null {
  if (cell == null || cell === "") return null;
  // Attributes are "measurement,quality,source[,time]": a quality flag means the value failed a NOAA check.
  if (attr && (attr.split(",")[1] ?? "") !== "") return null;
  const v = Number(cell);
  if (!Number.isFinite(v) || v / 10 < lo || v / 10 > hi) return null;
  return v;
}

function parseCsv(csv: string, id: string): StationFile {
  const out: StationFile = { id, name: "", tmin: new Array(NDAYS).fill(null), tmax: new Array(NDAYS).fill(null), low: null, high: null, lowSince: null, highSince: null, lowUntil: null, highUntil: null };
  const lines = csv.split("\n");
  const head = splitCsv(lines[0]);
  const col = (n: string) => head.indexOf(n);
  const iDate = col("DATE");
  const iName = col("NAME");
  const iTmin = col("TMIN");
  const iTmax = col("TMAX");
  const iTminA = col("TMIN_ATTRIBUTES");
  const iTmaxA = col("TMAX_ATTRIBUTES");
  if (iDate < 0) throw new Error(`${id}: no DATE column`);
  for (let k = 1; k < lines.length; k++) {
    const line = lines[k];
    if (!line) continue;
    const c = splitCsv(line);
    const date = c[iDate];
    if (!date) continue;
    if (!out.name) out.name = c[iName] ?? "";
    const tn = iTmin >= 0 ? tenths(c[iTmin], c[iTminA], -90, 60) : null;
    const tx = iTmax >= 0 ? tenths(c[iTmax], c[iTmaxA], -90, 60) : null;
    const year = Number(date.slice(0, 4));
    if (tn != null) {
      if (out.lowSince == null || year < out.lowSince) out.lowSince = year;
      if (out.lowUntil == null || year > out.lowUntil) out.lowUntil = year;
      if (!out.low || tn < out.low.v) out.low = { v: tn, d: date };
    }
    if (tx != null) {
      if (out.highSince == null || year < out.highSince) out.highSince = year;
      if (out.highUntil == null || year > out.highUntil) out.highUntil = year;
      if (!out.high || tx > out.high.v) out.high = { v: tx, d: date };
    }
    if (date >= `${FROM}-01-01` && date <= `${TO}-12-31`) {
      const i = dayIndex(date);
      out.tmin[i] = tn;
      out.tmax[i] = tx;
    }
  }
  return out;
}

let lastFetch = 0;

async function station(id: string): Promise<StationFile | null> {
  const f = path.join(CACHE, `${id}.json`);
  try {
    return JSON.parse(await readFile(f, "utf8")) as StationFile;
  } catch {
    /* not cached */
  }
  for (let attempt = 1; attempt <= 3; attempt++) {
    const wait = lastFetch + DELAY_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastFetch = Date.now();
    try {
      const res = await fetch(`${ACCESS}/${id}.csv`, { headers: UA, signal: AbortSignal.timeout(180000) });
      if (res.status === 404) {
        console.error(`  ${id}: not on NCEI (404)`);
        return null;
      }
      // A refusal is reported, not worked around.
      if (res.status === 403 || res.status === 429) throw new Error(`NCEI refused the request (${res.status}); stopping`);
      if (!res.ok) throw new Error(`${res.status}`);
      const parsed = parseCsv(await res.text(), id);
      await mkdir(CACHE, { recursive: true });
      await writeFile(f, JSON.stringify(parsed));
      return parsed;
    } catch (e) {
      const msg = (e as Error).message;
      if (/refused/.test(msg)) throw e;
      console.error(`  ${id}: attempt ${attempt} failed (${msg})`);
      await sleep(2000 * attempt);
    }
  }
  return null;
}

const kmBetween = (a: number, b: number, c: number, d: number) => {
  const r = Math.PI / 180;
  return Math.hypot((d - b) * r * Math.cos(((a + c) / 2) * r), (c - a) * r) * 6371;
};

/** NOAA's station list or inventory, cached under $EXTREMES_CACHE (one polite download if absent). */
async function cachedText(name: string, url: string): Promise<string> {
  const f = path.join(CACHE, name);
  try {
    return await readFile(f, "latin1");
  } catch {
    /* not cached */
  }
  const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(600000) });
  if (res.status === 403 || res.status === 429) throw new Error(`NCEI refused the request (${res.status}); stopping`);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  const t = await res.text();
  await mkdir(CACHE, { recursive: true });
  await writeFile(f, t, "latin1");
  return t;
}

type Catalogue = { meta: Map<string, { lat: number; lon: number; elev: number; name: string }>; span: Map<string, { tmin: number; tmax: number }> };

/** Station positions and, per station, how many of the years 1991-2020 its TMIN and TMAX inventory spans. */
async function catalogue(): Promise<Catalogue> {
  const [stationsTxt, inventoryTxt] = await Promise.all([cachedText("stations.txt", `${GHCN}/ghcnd-stations.txt`), cachedText("inventory.txt", `${GHCN}/ghcnd-inventory.txt`)]);
  const meta: Catalogue["meta"] = new Map();
  for (const l of stationsTxt.split("\n")) if (l.length > 30) meta.set(l.slice(0, 11), { lat: Number(l.slice(12, 20)), lon: Number(l.slice(21, 30)), elev: Number(l.slice(31, 37)), name: l.slice(41, 71).trim() });
  const span: Catalogue["span"] = new Map();
  for (const l of inventoryTxt.split("\n")) {
    const el = l.slice(31, 35);
    if (el !== "TMIN" && el !== "TMAX") continue;
    const cover = Math.min(Number(l.slice(41, 45)), TO) - Math.max(Number(l.slice(36, 40)), FROM) + 1;
    const id = l.slice(0, 11);
    const y = span.get(id) ?? { tmin: 0, tmax: 0 };
    if (el === "TMIN") y.tmin = cover;
    else y.tmax = cover;
    span.set(id, y);
  }
  return { meta, span };
}

/** The wider list for one town: stations within WIDE_KM spanning enough years of both TMIN and TMAX, near its elevation, nearest first. */
function wideStations(cat: Catalogue, lat: number, lon: number, elev: number | undefined): Stored[] {
  const out: Stored[] = [];
  for (const [id, m] of cat.meta) {
    if (Math.abs(m.lat - lat) > 0.5 || Math.abs(m.lon - lon) > 0.8) continue;
    if (/^US[RS]/.test(id)) continue;
    const d = kmBetween(lat, lon, m.lat, m.lon);
    const y = cat.span.get(id);
    if (d > WIDE_KM || !y || y.tmin < MIN_YEARS || y.tmax < MIN_YEARS) continue;
    if (elev != null && Math.abs(m.elev - elev) > ELEV_M) continue;
    out.push({ id, name: m.name, km: Math.round(d * 10) / 10 });
  }
  return out.sort((a, b) => a.km - b.km).slice(0, WIDE_TRIES);
}

/** The other IDs of the same station in NOAA's list (see "Split station IDs" in the header), nearest first. */
function siblings(cat: Catalogue, id: string): string[] {
  const m = cat.meta.get(id);
  if (!m) return [];
  const word = m.name.split(/\s+/)[0];
  const out: { id: string; d: number }[] = [];
  for (const [oid, o] of cat.meta) {
    if (oid === id || oid.slice(0, 3) !== id.slice(0, 3) || Math.abs(o.lat - m.lat) > 0.05 || Math.abs(o.lon - m.lon) > 0.08) continue;
    if (o.name.split(/\s+/)[0] !== word || Math.abs(o.elev - m.elev) > JOIN_ELEV_M) continue;
    const d = kmBetween(m.lat, m.lon, o.lat, o.lon);
    if (d <= JOIN_KM) out.push({ id: oid, d });
  }
  return out.sort((a, b) => a.d - b.d).map((x) => x.id);
}

/** One station's file with its siblings' days filled into its gaps and the records taken over all of them. */
function joinFiles(primary: StationFile, others: StationFile[]): StationFile {
  const tmin = [...primary.tmin];
  const tmax = [...primary.tmax];
  let { low, high, lowSince, highSince } = primary;
  let lowUntil = primary.lowUntil ?? null;
  let highUntil = primary.highUntil ?? null;
  const lo = (a: number | null | undefined, b: number | null | undefined) => (a == null ? (b ?? null) : b == null ? a : Math.min(a, b));
  const hi = (a: number | null | undefined, b: number | null | undefined) => (a == null ? (b ?? null) : b == null ? a : Math.max(a, b));
  for (const o of others) {
    for (let i = 0; i < NDAYS; i++) {
      if (tmin[i] == null && o.tmin[i] != null) tmin[i] = o.tmin[i];
      if (tmax[i] == null && o.tmax[i] != null) tmax[i] = o.tmax[i];
    }
    if (o.low && (!low || o.low.v < low.v)) low = o.low;
    if (o.high && (!high || o.high.v > high.v)) high = o.high;
    lowSince = lo(lowSince, o.lowSince);
    highSince = lo(highSince, o.highSince);
    lowUntil = hi(lowUntil, o.lowUntil);
    highUntil = hi(highUntil, o.highUntil);
  }
  return { ...primary, tmin, tmax, low, high, lowSince, highSince, lowUntil, highUntil };
}

/** The counts for one station; each element's figures are null when it has fewer than MIN_YEARS qualifying years. Null when neither element passes. */
function analyse(s: StationFile): Omit<PlaceExtremes, "station" | "period"> | null {
  type Y = { nMin: number; nMax: number; lo: number; m10: number; m20: number; m25: number; z: number; h30: number; h35: number };
  const years: Y[] = [];
  for (let y = FROM; y <= TO; y++) {
    const a = dayIndex(`${y}-01-01`);
    const b = dayIndex(`${y}-12-31`);
    const e: Y = { nMin: 0, nMax: 0, lo: Infinity, m10: 0, m20: 0, m25: 0, z: 0, h30: 0, h35: 0 };
    for (let i = a; i <= b; i++) {
      const tn = s.tmin[i];
      const tx = s.tmax[i];
      if (tn != null) {
        e.nMin++;
        e.lo = Math.min(e.lo, tn);
        if (tn < 0) e.z++;
        if (tn <= -100) e.m10++;
        if (tn <= -200) e.m20++;
        if (tn <= -250) e.m25++;
      }
      if (tx != null) {
        e.nMax++;
        if (tx >= 300) e.h30++;
        if (tx >= 350) e.h35++;
      }
    }
    years.push(e);
  }
  const cold = years.filter((e) => e.nMin >= MIN_DAYS);
  const hot = years.filter((e) => e.nMax >= MIN_DAYS);
  const hasCold = cold.length >= MIN_YEARS && !!s.low;
  const hasHot = hot.length >= MIN_YEARS && !!s.high;
  if (!hasCold && !hasHot) return null;
  const mean = (xs: Y[], k: keyof Y) => r1(xs.reduce((a, e) => a + (e[k] as number), 0) / xs.length);
  const daysIn = (y: number) => (Date.UTC(y + 1, 0, 1) - Date.UTC(y, 0, 1)) / 86400000;
  const coverage = hasCold ? cold.reduce((a, e) => a + e.nMin / daysIn(FROM + years.indexOf(e)), 0) / cold.length : null;
  return {
    years: cold.length,
    yearsMax: hot.length,
    coverage: coverage == null ? null : Math.round(coverage * 100) / 100,
    nightsBelowMinus10: hasCold ? mean(cold, "m10") : null,
    nightsBelowMinus20: hasCold ? mean(cold, "m20") : null,
    nightsBelowMinus25: hasCold ? mean(cold, "m25") : null,
    nightsBelowZero: hasCold ? mean(cold, "z") : null,
    daysAbove30: hasHot ? mean(hot, "h30") : null,
    daysAbove35: hasHot ? mean(hot, "h35") : null,
    meanAnnualExtremeMinC: hasCold ? r1(cold.reduce((a, e) => a + e.lo, 0) / cold.length / 10) : null,
    recordLowC: hasCold ? s.low!.v / 10 : null,
    recordLowDate: hasCold ? s.low!.d : null,
    recordLowSince: hasCold ? s.lowSince : null,
    recordLowUntil: hasCold ? (s.lowUntil ?? null) : null,
    recordHighC: hasHot ? s.high!.v / 10 : null,
    recordHighDate: hasHot ? s.high!.d : null,
    recordHighSince: hasHot ? s.highSince : null,
    recordHighUntil: hasHot ? (s.highUntil ?? null) : null,
  };
}

/**
 * For a station beyond NEAR_KM, whether its cold and hot figures agree with the town's ERA5 climate: cold by the mean annual extreme minimum, hot by the mean TMAX
 * of the town's warmest month. Returns what to drop and a note for the log.
 */
function disagreement(s: StationFile, a: NonNullable<ReturnType<typeof analyse>>, climate: { meanAnnualExtremeMinC: number; monthlyMeanMax: number[] }): { cold: boolean; hot: boolean; note: string } {
  const notes: string[] = [];
  let cold = false;
  let hot = false;
  if (a.meanAnnualExtremeMinC != null) {
    const d = a.meanAnnualExtremeMinC - climate.meanAnnualExtremeMinC;
    if (Math.abs(d) > COLD_AGREE_C) {
      cold = true;
      notes.push(`coldest night ${a.meanAnnualExtremeMinC} vs ERA5 ${climate.meanAnnualExtremeMinC} (${r1(d)} °C)`);
    }
  }
  if (a.daysAbove30 != null) {
    const warm = climate.monthlyMeanMax.indexOf(Math.max(...climate.monthlyMeanMax));
    let sum = 0;
    let n = 0;
    for (let y = FROM; y <= TO; y++) {
      const a0 = dayIndex(`${y}-${String(warm + 1).padStart(2, "0")}-01`);
      const a1 = dayIndex(warm === 11 ? `${y}-12-31` : `${y}-${String(warm + 2).padStart(2, "0")}-01`) - (warm === 11 ? -1 : 0);
      for (let i = a0; i < a1; i++) if (s.tmax[i] != null) {
        sum += s.tmax[i]!;
        n++;
      }
    }
    if (n > 0) {
      const d = sum / n / 10 - climate.monthlyMeanMax[warm];
      if (Math.abs(d) > HOT_AGREE_C) {
        hot = true;
        notes.push(`warmest-month TMAX ${r1(sum / n / 10)} vs ERA5 ${climate.monthlyMeanMax[warm]} (${r1(d)} °C)`);
      }
    }
  }
  return { cold, hot, note: notes.join(", ") };
}

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry");
  const wide = args.includes("--wide");
  const only = new Set(args.filter((a) => !a.startsWith("--")));
  const frost = JSON.parse(await readFile(FROST, "utf8")) as Record<string, { stations: Stored[] }>;
  const normals = JSON.parse(await readFile(NORMALS, "utf8")) as { place: { slug: string; lat: number; lon: number }; climate: { elevationM?: number; meanAnnualExtremeMinC: number; monthlyMeanMax: number[] } }[];
  const existing = only.size || wide ? (JSON.parse(await readFile(OUT, "utf8").catch(() => "{}")) as Record<string, PlaceExtremes>) : {};
  // --wide retries only the towns that have no entry.
  const slugs = normals.map((e) => e.place.slug).filter((s) => (!only.size || only.has(s)) && (!wide || !existing[s]));
  for (const o of only) if (!normals.some((e) => e.place.slug === o)) console.error(`${o}: not in place-normals.json`);
  const out: Record<string, PlaceExtremes> = { ...existing };
  // The catalogue gives the wider list (--wide) and each station's split IDs to join.
  const cat = await catalogue();
  const byTown = new Map(normals.map((e) => [e.place.slug, e]));
  let done = 0;
  for (const slug of slugs) {
    done++;
    const t = byTown.get(slug)!;
    const list = wide ? wideStations(cat, t.place.lat, t.place.lon, t.climate.elevationM) : (frost[slug]?.stations ?? []);
    delete out[slug];
    if (!list.length) {
      console.log(`[${done}/${slugs.length}] ${slug}: ${wide ? `no station within ${WIDE_KM} km spans ${MIN_YEARS} years of TMIN and TMAX` : "no stored station"} (no daily record within reach)`);
      continue;
    }
    type Pick = { st: Stored & { joined?: string[] }; a: NonNullable<ReturnType<typeof analyse>> };
    let partial: Pick | null = null;
    let chosen: Pick | null = null;
    const why: string[] = [];
    for (const st of list) {
      let s = await station(st.id);
      if (!s) {
        why.push(`${st.id} unavailable`);
        continue;
      }
      // Join the station's split IDs (see the header), one download at a time.
      const joined: string[] = [];
      const files: StationFile[] = [];
      for (const sid of siblings(cat, st.id)) {
        const f = await station(sid);
        if (f) {
          files.push(f);
          joined.push(sid);
        }
      }
      if (files.length) s = joinFiles(s, files);
      const stj = joined.length ? { ...st, joined } : st;
      let a = analyse(s);
      let dropped = false;
      if (a && wide && st.km > NEAR_KM) {
        // A station this far must read like the town's own climate; a figure that does not is dropped.
        const bad = disagreement(s, a, t.climate);
        if (bad.cold || bad.hot) {
          why.push(`${st.id} ${st.name} (${st.km} km): ${bad.note}`);
          dropped = true;
          const cut: Partial<NonNullable<typeof a>> = {
            ...(bad.cold ? { coverage: null, nightsBelowMinus10: null, nightsBelowMinus20: null, nightsBelowMinus25: null, nightsBelowZero: null, meanAnnualExtremeMinC: null, recordLowC: null, recordLowDate: null, recordLowSince: null, recordLowUntil: null } : {}),
            ...(bad.hot ? { daysAbove30: null, daysAbove35: null, recordHighC: null, recordHighDate: null, recordHighSince: null, recordHighUntil: null } : {}),
          };
          a = { ...a, ...cut };
          if (a.nightsBelowZero == null && a.daysAbove30 == null) a = null;
        }
      }
      if (!a) {
        if (!dropped) why.push(`${st.id} ${st.name} (${st.km} km): under ${MIN_YEARS} complete years of TMIN and of TMAX`);
        continue;
      }
      // The station rule (src/lib/extremes-rule.ts; Day 5 audit, 14 November 2026): an offshore station, one beyond 20 km
      // when the town has its own station inside 15 km, or one beyond 15 km that does not read like the town is passed
      // over for the next, however complete its record (Nanaimo's Entrance Island, Whitehorse's Mayo Road, Kingston's
      // Hartington IHD were taken before).
      const rejected = extremesStationRejected(st, a.meanAnnualExtremeMinC, townStations(slug), t.climate.meanAnnualExtremeMinC);
      if (rejected) {
        why.push(`${st.id}: ${rejected}`);
        continue;
      }
      if (a.nightsBelowZero != null && a.daysAbove30 != null) {
        chosen = { st: stj, a };
        break;
      }
      // Only one element passes: keep looking for a station with both, else use this one with the other element's figures null.
      partial ??= { st: stj, a };
      if (!dropped) why.push(`${st.id} ${st.name} (${st.km} km): ${a.nightsBelowZero == null ? "TMIN" : "TMAX"} under ${MIN_YEARS} complete years`);
    }
    chosen ??= partial;
    if (!chosen) {
      console.log(`[${done}/${slugs.length}] ${slug}: no station passes (${why.join("; ")})`);
      continue;
    }
    const { st, a } = chosen;
    out[slug] = { station: { id: st.id, name: st.name, km: st.km, ...(st.joined ? { joined: st.joined } : {}) }, period: `${FROM}-${TO}`, ...a };
    console.log(
      `[${done}/${slugs.length}] ${slug}: ${st.name} ${st.km} km, ${a.years}/${a.yearsMax} yr (TMIN/TMAX) | <=-10 ${a.nightsBelowMinus10} <=-20 ${a.nightsBelowMinus20} <=-25 ${a.nightsBelowMinus25} <0 ${a.nightsBelowZero} | >=30 ${a.daysAbove30} >=35 ${a.daysAbove35} | mean extreme min ${a.meanAnnualExtremeMinC} | record ${a.recordLowC} (${a.recordLowDate}) / ${a.recordHighC} (${a.recordHighDate})${why.length ? ` | skipped: ${why.join("; ")}` : ""}`,
    );
    if (done % 25 === 0) {
      await mkdir(CACHE, { recursive: true });
      await writeFile(path.join(CACHE, "checkpoint.json"), JSON.stringify(out));
    }
  }
  const keys = Object.keys(out).sort();
  console.log(`${keys.length} of ${slugs.length} towns have a station record that passes`);
  if (dry) return;
  const body = keys.map((k) => `${JSON.stringify(k)}:${JSON.stringify(out[k])}`).join(",\n");
  await writeFile(OUT, `{\n${body}\n}\n`);
  console.log(`wrote ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
