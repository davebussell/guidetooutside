/**
 * Builds the hardiness zone files for the pre-built towns:
 *
 *   src/data/place-zones.json        the official map zone of every town that has one (Canada: NRCan;
 *                                    US: USDA 2023), read in the browser by src/components/here/ZoneHere
 *                                    { "ottawa-ontario": { "zone": "5b", "source": "nrcan" }, ... }
 *   src/data/place-zones-usda.json   the USDA-scale zone worked out for every town from its coldest
 *                                    night of an average year (station record where there is one,
 *                                    ERA5 otherwise): the zone itself for towns with no official map,
 *                                    and the figure printed beside it (src/lib/climate-fallback.ts
 *                                    lays both over the climate normals)
 *
 *   npx esbuild scripts/build-place-zones.ts --bundle --platform=node --format=esm \
 *     --outfile=/tmp/build-place-zones.mjs --log-level=warning \
 *   && ZONES_CACHE=/some/scratch/dir NODE_USE_ENV_PROXY=1 node /tmp/build-place-zones.mjs [--dry] [--report]
 *
 * (No tsx in this project; see scripts/check-homestead.ts. Run scripts/build-place-extremes.ts first:
 * the station coldest nights come from src/data/place-extremes.json.)
 *
 * Which zone a town gets, in order:
 *  1. Canadian towns: Natural Resources Canada's official map, looked up by the town's
 *     coordinates. NRCan's "Plant Hardiness Zones of Canada" (4th edition, 1991-2020 climate,
 *     published 26 March 2026, Open Government Licence - Canada; dataset
 *     adda404d-93e4-48e9-b6bf-5d1d3952ff22 on open.canada.ca) is served as an ArcGIS REST
 *     layer:
 *       https://maps-cartes.services.geo.ca/server_serveur/rest/services/NRCan/PlantHardiness_en/MapServer/0/query
 *     A point query returns the polygon's `zone`. If the coordinates fall outside every polygon
 *     (a harbour, say) the query is repeated with a 5 km buffer, and used only if every polygon
 *     it touches has the same zone. Answers are cached under $ZONES_CACHE so a rerun is offline.
 *     This is NRCan's own scale (seven climate variables), not the USDA's: the label always says so.
 *  2. US towns: the USDA 2023 Plant Hardiness Zone Map, carried by hand into
 *     src/data/place-zones-usda2023.json (planthardiness.ars.usda.gov). The map's data host
 *     (prism.oregonstate.edu) did not pass TLS verification from the build machine and the USDA
 *     site offers no documented lookup by coordinates, so these 67 values are not fetched by this
 *     script; they are cross-checked against the station record below and any town more than a
 *     half zone apart is listed in the report.
 *  3. Any other town with a weather station that passes the completeness rule in
 *     scripts/build-place-extremes.ts: the USDA rule applied to the station's mean annual
 *     extreme minimum (the average of each year's coldest night, 1991-2020):
 *     source "usda-station", labelled "USDA-equivalent zone ... from the station record".
 *  4. Every other town: the USDA rule applied to ten years of ERA5 reanalysis (the
 *     meanAnnualExtremeMinC in place-normals.json): source "usda-era5", labelled an estimate.
 *
 * The USDA rule (src/lib/zone-label.ts zoneFromExtremeMin): zone 1 starts at -60 °F; each zone is
 * 10 °F wide and each half zone 5 °F.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { zoneFromExtremeMin, usdaBandC, type ZoneSource } from "../src/lib/zone-label";
import { townStations, type PlaceExtremes } from "../src/lib/extremes";
import { extremesStationRejected } from "../src/lib/extremes-rule";

const ROOT = process.cwd();
const NORMALS = path.join(ROOT, "src/data/place-normals.json");
const EXTREMES = path.join(ROOT, "src/data/place-extremes.json");
const USDA2023 = path.join(ROOT, "src/data/place-zones-usda2023.json");
const OUT = path.join(ROOT, "src/data/place-zones.json");
const OUT_USDA = path.join(ROOT, "src/data/place-zones-usda.json");
const CACHE = process.env.ZONES_CACHE ?? path.join(os.tmpdir(), "guidetooutside-zones-cache");
const NRCAN = "https://maps-cartes.services.geo.ca/server_serveur/rest/services/NRCan/PlantHardiness_en/MapServer/0/query";
const UA = { "User-Agent": "guidetooutside.com data build (NRCan plant hardiness lookup by coordinates, cached)" };

type Entry = { place: { slug: string; name: string; countryCode: string; lat: number; lon: number }; climate: { meanAnnualExtremeMinC: number; zone: string; zoneSource?: string } };
export type PlaceZoneRow = { zone: string; source: ZoneSource };
export type UsdaRow = { zone: string; minC: number; basis: "station" | "era5"; station?: { name: string; km: number; years: number; period: string } };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function nrcanQuery(params: Record<string, string>): Promise<string[] | null> {
  const u = new URL(NRCAN);
  for (const [k, v] of Object.entries({ inSR: "4326", geometryType: "esriGeometryPoint", spatialRel: "esriSpatialRelIntersects", outFields: "zone", returnGeometry: "false", f: "json", ...params })) u.searchParams.set(k, v);
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(u, { headers: UA, signal: AbortSignal.timeout(60000) });
      if (res.status === 403 || res.status === 429) throw new Error(`NRCan refused the request (${res.status}); stopping`);
      if (!res.ok) throw new Error(String(res.status));
      const j = (await res.json()) as { features?: { attributes: { zone: string } }[]; error?: { message: string } };
      if (j.error) throw new Error(j.error.message);
      return (j.features ?? []).map((f) => f.attributes.zone);
    } catch (e) {
      const msg = (e as Error).message;
      if (/refused/.test(msg)) throw e;
      console.error(`  NRCan lookup attempt ${attempt} failed (${msg})`);
      await sleep(1500 * attempt);
    }
  }
  return null;
}

/** NRCan's zone at a town's coordinates (cached), or null when the layer gives none or is ambiguous. */
async function nrcanZone(slug: string, lat: number, lon: number): Promise<{ zone: string; via: "point" | "buffer" } | null> {
  const f = path.join(CACHE, `nrcan-${slug}.json`);
  try {
    return JSON.parse(await readFile(f, "utf8")) as { zone: string; via: "point" | "buffer" } | null;
  } catch {
    /* not cached */
  }
  const geometry = `${lon},${lat}`;
  let found: { zone: string; via: "point" | "buffer" } | null = null;
  const at = await nrcanQuery({ geometry });
  if (at === null) return null; // lookup failed: do not cache, let a rerun try again
  if (at.length) found = { zone: at[0], via: "point" };
  else {
    const near = await nrcanQuery({ geometry, distance: "5000", units: "esriSRUnit_Meter" });
    const zones = [...new Set(near ?? [])];
    if (zones.length === 1) found = { zone: zones[0], via: "buffer" };
  }
  await mkdir(CACHE, { recursive: true });
  await writeFile(f, JSON.stringify(found));
  await sleep(300);
  return found;
}

/** Half zones between two zone labels (3a to 3b is 1). */
const halves = (a: string, b: string) => parseInt(a) * 2 + (a.endsWith("b") ? 1 : 0) - (parseInt(b) * 2 + (b.endsWith("b") ? 1 : 0));

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry");
  const report = args.includes("--report");
  const normals = JSON.parse(await readFile(NORMALS, "utf8")) as Entry[];
  const extremes = JSON.parse(await readFile(EXTREMES, "utf8")) as Record<string, PlaceExtremes>;
  const usda2023 = JSON.parse(await readFile(USDA2023, "utf8")) as Record<string, string>;
  const zones: Record<string, PlaceZoneRow> = {};
  const usda: Record<string, UsdaRow> = {};
  const lines: string[] = [];
  const flags: string[] = [];
  let nNrcan = 0;
  let nUsda = 0;
  let nStation = 0;
  let nEra5 = 0;

  for (const e of normals) {
    const { slug, name, countryCode, lat, lon } = e.place;
    // A station the station rule sets aside (src/lib/extremes-rule.ts; Day 5 audit, 14 November 2026: Nanaimo's 9b came
    // from the Entrance Island lighthouse) gives no coldest night here; the town is read on ERA5 until a station stands.
    const stored = extremes[slug];
    const ex = stored && !extremesStationRejected(stored.station, stored.meanAnnualExtremeMinC, townStations(slug), e.climate.meanAnnualExtremeMinC) ? stored : undefined;
    // The USDA-scale zone from the coldest night of an average year: the station's where there is one, else ERA5's.
    const stationMin = ex?.meanAnnualExtremeMinC ?? null;
    const minC = stationMin ?? e.climate.meanAnnualExtremeMinC;
    const basis: UsdaRow["basis"] = stationMin != null ? "station" : "era5";
    const eq = zoneFromExtremeMin(minC);
    usda[slug] = { zone: eq.zone, minC, basis, ...(basis === "station" ? { station: { name: ex!.station.name, km: ex!.station.km, years: ex!.years, period: ex!.period } } : {}) };

    let row: PlaceZoneRow;
    let note = "";
    if (countryCode === "CA") {
      const n = await nrcanZone(slug, lat, lon);
      if (n) {
        row = { zone: n.zone, source: "nrcan" };
        note = n.via === "buffer" ? "NRCan (5 km buffer)" : "NRCan";
        nNrcan++;
      } else {
        row = { zone: eq.zone, source: basis === "station" ? "usda-station" : "usda-era5" };
        note = "NRCan lookup gave nothing; USDA-equivalent";
        flags.push(`${slug}: no NRCan zone at ${lat},${lon}`);
      }
    } else if (usda2023[slug]) {
      row = { zone: usda2023[slug], source: "usda-2023" };
      nUsda++;
      const gap = halves(usda2023[slug], eq.zone);
      note = `USDA 2023 map${gap !== 0 ? `, ${basis} gives ${eq.zone} (${gap > 0 ? "+" : ""}${gap} half zone${Math.abs(gap) === 1 ? "" : "s"})` : ""}`;
      if (Math.abs(gap) >= 2) flags.push(`${slug}: USDA 2023 map ${usda2023[slug]} but ${basis} ${minC} °C gives ${eq.zone}`);
    } else {
      row = { zone: eq.zone, source: basis === "station" ? "usda-station" : "usda-era5" };
      if (basis === "station") nStation++;
      else nEra5++;
      note = `USDA-equivalent from ${basis}`;
    }
    zones[slug] = row;
    const before = e.climate.zone;
    lines.push(`${slug.padEnd(36)} ${row.zone.padEnd(3)} ${row.source.padEnd(13)} was ${before.padEnd(3)} ${(e.climate.zoneSource ?? "?").padEnd(9)} min ${String(minC).padStart(6)} (${basis}) -> USDA ${eq.zone}  ${note}`);
  }

  console.log(lines.join("\n"));
  console.log(`\n${nNrcan} NRCan, ${nUsda} USDA 2023 map, ${nStation} USDA-equivalent from a station, ${nEra5} USDA-equivalent from ERA5 (${normals.length} towns)`);
  if (flags.length) console.log(`\nCheck:\n${flags.map((f) => "  " + f).join("\n")}`);
  // Self-check: every USDA-equivalent zone matches the band of the minimum it was derived from.
  for (const [slug, z] of Object.entries(zones)) {
    if (z.source !== "usda-station" && z.source !== "usda-era5") continue;
    const u = usda[slug];
    const band = usdaBandC(z.zone)!;
    if (u.minC < band.lo - 0.06 || u.minC >= band.hi + 0.06) throw new Error(`${slug}: ${z.zone} does not hold ${u.minC} °C`);
  }
  if (report || dry) return;
  // place-zones.json keeps to official map zones, as it always has: the browser reads it directly.
  const official = Object.fromEntries(Object.entries(zones).filter(([, z]) => z.source === "nrcan" || z.source === "usda-2023"));
  const body = (o: Record<string, unknown>) =>
    `{\n${Object.keys(o)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${JSON.stringify(o[k])}`)
      .join(",\n")}\n}\n`;
  await writeFile(OUT, body(official));
  await writeFile(OUT_USDA, body(usda));
  console.log(`wrote ${OUT} and ${OUT_USDA}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
