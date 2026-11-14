/**
 * Prints, for the twelve audited towns, the October fishing lists water by
 * water with the regulator's closed seasons and the waters to avoid, and the
 * foraging lists for Cape Town, Nairobi and Lagos — once as the region alone
 * decides them ("before": no place) and once with the place's country, box
 * and closed-season rules ("after"). Named waters come from the live cache
 * backup where the town has one.
 *
 * Run (esbuild bundles it and resolves the @/ alias):
 *   npx esbuild scripts/check-fish-seasons.ts --bundle --platform=node --format=esm \
 *     --alias:@=./src --outfile=/tmp/check-fish-seasons.mjs --log-level=warning && node /tmp/check-fish-seasons.mjs [month] [slug ...]
 */
import { readFileSync } from "node:fs";
import KNOWN from "../src/lib/served-places";
import { PLACE_NORMALS } from "../src/lib/climate-fallback";
import { classifyEcoregion } from "../src/lib/ecoregions";
import { fishByWater } from "../src/lib/fishing-waters";
import { closedSeasons, jurisdictionNotes } from "../src/lib/closed-seasons";
import { speciesNow, speciesSoon, monthRange } from "../src/lib/species";
import { waterSetting } from "../src/lib/water-setting";
import type { Place, WaterBody } from "../src/lib/types";

const args = process.argv.slice(2);
const month = Number(args.find((a) => /^\d+$/.test(a)) ?? 10);
const wanted = args.filter((a) => !/^\d+$/.test(a));
// The default towns, less any that are parked (src/lib/scope.ts): KNOWN is the served table.
const TOWNS = (wanted.length
  ? wanted
  : ["london-uk", "warsaw-poland", "toronto-ontario", "denver-colorado", "phoenix-arizona", "asheville-north-carolina", "lisbon-portugal", "munich-germany", "oslo-norway", "cape-town-south-africa", "nairobi-kenya", "lagos-nigeria"]
).filter((s) => (KNOWN as { slug: string }[]).some((p) => p.slug === s));
const FORAGE = ["cape-town-south-africa", "nairobi-kenya", "lagos-nigeria"].filter((s) => (KNOWN as { slug: string }[]).some((p) => p.slug === s));

const places = KNOWN as Place[];
const normals = new Map(PLACE_NORMALS.map((e) => [e.place.slug, e.climate]));

// Named waters from the blobs backup (the live store's content as of the rebuild).
const cached = new Map<string, WaterBody[]>();
try {
  for (const line of readFileSync("/home/claude/rebuild/blobs-guides.jsonl", "utf8").split("\n")) {
    if (!line.startsWith('{"k":"waters:v2:')) continue;
    const o = JSON.parse(line) as { k: string; v: unknown };
    const v = typeof o.v === "string" ? JSON.parse(o.v) : o.v;
    cached.set(o.k, ((v as { value?: WaterBody[] }).value ?? []) as WaterBody[]);
  }
} catch {}
// Towns whose waters are not in the backup, as the dev server read them from the live store (RF-findings §4).
const EXTRA: Record<string, WaterBody[]> = {
  "lisbon-portugal": [
    { name: "Rio da Costa", kind: "river", distanceKm: 6 },
    { name: "Ribeira de Odivelas", kind: "river", distanceKm: 8 },
    { name: "Rio Jamor", kind: "river", distanceKm: 9 },
    { name: "ETAR da Mutela", kind: "lake", distanceKm: 4 },
    { name: "Doca dos Olivais", kind: "lake", distanceKm: 7 },
  ],
};

const today = `2026-${String(month).padStart(2, "0")}-14`;
const names = (xs: { name: string }[]) => xs.map((x) => x.name).join(", ") || "—";

for (const slug of TOWNS) {
  const place = places.find((p) => p.slug === slug);
  if (!place) {
    console.log(`\n## ${slug}: not a known place`);
    continue;
  }
  const climate = normals.get(slug) ?? null;
  const waters = cached.get(`waters:v2:${place.lat.toFixed(2)}:${place.lon.toFixed(2)}`) ?? EXTRA[slug] ?? [];
  const w = waterSetting(place.lat, place.lon, waters, climate);
  const eco = classifyEcoregion(place.lat, place.lon)!;
  console.log(`\n## ${place.label} — ${eco.slug} — month ${month} — waters ${waters.length} (${w.avoid.length} dropped)`);
  if (w.avoid.length) console.log(`  dropped: ${w.avoid.map((x) => `${x.name} [${x.avoid!.kind}]`).join("; ")}`);
  const before = fishByWater(month, eco.slug, w);
  const after = fishByWater(month, eco.slug, w, { place, today });
  for (const s of after) {
    const b = before.find((x) => x.id === s.id);
    const bNames = new Set(b?.fish.map((f) => f.slug) ?? []);
    const aNames = new Set([...s.fish, ...s.closed].map((f) => f.slug));
    const gone = [...bNames].filter((x) => !aNames.has(x));
    console.log(`  [${s.title}] ${s.where}`);
    if (s.avoid) console.log(`    AVOID: ${s.avoid.reason}`);
    console.log(`    before: ${names(b?.fish ?? [])}`);
    console.log(`    after : ${s.fish.map((f) => `${f.name}${f.closure ? ` (${f.closure.label})` : ""}`).join(", ") || "—"}`);
    if (s.closed.length) console.log(`    CLOSED: ${s.closed.map((f) => `${f.name} — ${f.closure!.label}`).join("; ")}`);
    if (gone.length) console.log(`    removed by country/box rules: ${gone.join(", ")}`);
    if (s.notes.length) console.log(`    note: ${s.notes.map((n) => `${n.note} (${n.regulator})`).join(" | ")}`);
  }
  const month_closures = closedSeasons(place, month);
  if (month_closures.length) console.log(`  closedSeasons(place, ${month}): ${month_closures.map((c) => `${c.species} ${c.range.from}→${c.range.to} [${c.rule.id}]`).join("; ")}`);
  const jn = jurisdictionNotes(place);
  if (jn.length) console.log(`  jurisdiction: ${jn.map((n) => n.id).join(", ")}`);

  if (FORAGE.includes(slug) || wanted.length) {
    const zone = climate?.zoneNumber;
    const coast = w.coast !== null;
    const b = speciesNow(month, eco.slug, zone, { coast });
    const a = speciesNow(month, eco.slug, zone, { coast, place });
    const soonA = speciesSoon(month, eco.slug, zone, { coast, place });
    const bs = new Set(b.map((s) => s.slug));
    const as = new Set(a.map((s) => s.slug));
    console.log(`  foraging before (${b.length}): ${b.map((s) => `${s.name} ${monthRange(s.months)}`).join("; ")}`);
    console.log(`  foraging after  (${a.length}): ${a.map((s) => `${s.name} ${monthRange(s.months)}`).join("; ")}`);
    console.log(`    removed: ${[...bs].filter((x) => !as.has(x)).join(", ") || "—"}; added: ${[...as].filter((x) => !bs.has(x)).join(", ") || "—"}`);
    console.log(`  soon after: ${soonA.map((s) => `${s.name} ${monthRange(s.months)}`).join("; ") || "—"}`);
  }
}
