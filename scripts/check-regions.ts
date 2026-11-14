/**
 * Prints what each of the 34 regional guides computes from the pre-built
 * towns — the at-a-glance figures, the town table, the season ribbon counts,
 * the shared/differing split and the neighbour contrasts — so the numbers can
 * be eyeballed against the town pages before they go on the region pages.
 *
 * Run (no tsx in this project; esbuild bundles it and resolves the @/ alias):
 *   npx esbuild scripts/check-regions.ts --bundle --platform=node --format=esm \
 *     --alias:@=./src --outfile=/tmp/check-regions.mjs --log-level=warning && node /tmp/check-regions.mjs [slug ...] [--towns] [--library]
 *
 * With no slugs, every region is printed. --towns adds the town table,
 * --library the full shared/differing lists; the data gaps are always listed.
 */
import { PLACE_NORMALS } from "../src/lib/climate-fallback";
import { ECOREGIONS } from "../src/lib/ecoregions";
import { continentIntro } from "../src/lib/regions/continents";
import { SHORT, frostFreeText, frostText, waterLabel } from "../src/lib/regions/format";
import { sharedAndDiffering } from "../src/lib/regions/library";
import { neighboursOf } from "../src/lib/regions/neighbours";
import { regionSeason } from "../src/lib/regions/season";
import { regionStats } from "../src/lib/regions/stats";
import { allTownRows, regionOfTown, townsInRegion } from "../src/lib/regions/towns";

type Region = { slug: string; name: string; continent?: string; south?: boolean; examples: string[] };
const REGIONS = ECOREGIONS as Region[];
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const slugs = args.filter((a) => !a.startsWith("--"));
const wanted = slugs.length ? REGIONS.filter((r) => slugs.includes(r.slug)) : REGIONS;

const pad = (s: string | number | null, n: number) => String(s ?? "—").padEnd(n);
const m = (x: number | null) => (x == null ? "—" : SHORT[x - 1]);

for (const r of wanted) {
  const stats = regionStats(r.slug);
  const season = regionSeason(r.slug);
  const split = sharedAndDiffering(r.slug);
  console.log(`\n=== ${r.name} (${r.slug}) · ${r.continent ?? "north-america"}${r.south ? " · south" : ""} · ${stats.towns.length} towns`);
  for (const f of stats.figures) console.log(`  ${pad(f.label, 18)} ${f.value}${f.note ? `  — ${f.note}` : ""}\n  ${"".padEnd(18)} [${f.method}]`);
  if (flags.has("--towns") && stats.towns.length) {
    console.log(`  ${pad("town", 24)} ${pad("zone", 5)} ${pad("frost", 18)} ${pad("free", 10)} ${pad("rain", 8)} ${pad("pattern", 17)} ${pad("wet/dry", 8)} ${pad("cold", 6)} ${pad("hot", 6)} ${pad("elev", 6)} water`);
    for (const t of stats.towns)
      console.log(
        `  ${pad(t.name, 24)} ${pad(t.zone, 5)} ${pad(frostText(t), 18)} ${pad(frostFreeText(t), 10)} ${pad(t.rainMm, 8)} ${pad(t.rain, 17)} ${pad(`${m(t.wettest)}/${m(t.driest)}`, 8)} ${pad(t.coldestC, 6)} ${pad(t.warmestC, 6)} ${pad(t.elevationM, 6)} ${waterLabel(t)}`,
      );
  }
  const row = (label: string, v: (x: (typeof season.months)[number]) => number) => `  ${pad(label, 12)} ${season.order.map((mm) => pad(v(season.months[mm - 1]), 4)).join("")}`;
  console.log(`  season (${season.south ? "July first" : "January first"}; ${season.frostTowns} towns with frost, ${season.frostRareTowns} frost rare, ${season.rainTowns} with rain)`);
  console.log(`  ${pad("", 12)} ${season.order.map((mm) => pad(SHORT[mm - 1], 4)).join("")}`);
  console.log(row("frost-free", (x) => x.frostFree));
  console.log(row("wet", (x) => x.wet));
  console.log(row("dry", (x) => x.dry));
  console.log(row("species", (x) => x.species));
  console.log(row("fish", (x) => x.fish));
  if (season.lastFrost) console.log(`  last frost ${m(season.lastFrost.earliest)} (${season.lastFrost.earliestTown}) – ${m(season.lastFrost.latest)} (${season.lastFrost.latestTown}); first frost ${m(season.firstFrost!.earliest)} (${season.firstFrost!.earliestTown}) – ${m(season.firstFrost!.latest)} (${season.firstFrost!.latestTown})`);
  for (const kind of ["species", "fish", "garden", "crops"] as const) {
    const s = split[kind];
    console.log(`  ${pad(kind, 8)} everywhere ${s.everywhere.length}, differs ${s.partial.length}, nowhere ${s.nowhere.length}${s.nowhere.length ? `: ${s.nowhere.map((i) => i.slug).join(", ")}` : ""}`);
    if (flags.has("--library")) {
      console.log(`           everywhere: ${s.everywhere.map((i) => i.slug).join(", ")}`);
      for (const p of s.partial) console.log(`           ${p.item.slug}: ${p.inTowns.length}/${p.inTowns.length + p.outTowns.length} — ${p.reason}`);
    }
  }
  if (split.noCrops.length) console.log(`  crops unknown for ${split.noCrops.join(", ")} (no rain record)`);
  for (const n of neighboursOf(r.slug)) console.log(`  → ${n.name}: ${n.contrast || "(no contrast: a side has no towns)"}`);
}

if (!slugs.length) {
  console.log("\n=== Continent intros");
  for (const c of ["north-america", "europe", "africa"]) console.log(`  ${c}: ${continentIntro(REGIONS.filter((r) => (r.continent ?? "north-america") === c))}`);

  console.log("\n=== Data gaps");
  const rows = allTownRows();
  console.log(`  towns without a climate record: ${rows.filter((t) => !t.hasClimate).map((t) => t.slug).join(", ") || "none"}`);
  console.log(`  towns without rain in the record (no regime, no crops): ${rows.filter((t) => t.hasClimate && !t.hasRain).map((t) => t.slug).join(", ") || "none"}`);
  console.log(`  towns without elevation: ${rows.filter((t) => t.hasClimate && t.elevationM == null).map((t) => t.slug).join(", ") || "none"}`);
  console.log(`  regions with 2 or fewer towns: ${REGIONS.filter((r) => townsInRegion(r.slug).length <= 2).map((r) => `${r.slug} (${townsInRegion(r.slug).length})`).join(", ")}`);
  const SHORT_COUNTRY: Record<string, string> = { UK: "United Kingdom", "DR Congo": "Democratic Republic of the Congo" };
  const listed = REGIONS.flatMap((r) =>
    r.examples
      .map((e) => {
        const name = e.slice(0, e.lastIndexOf(", ")).trim();
        const tail = e.slice(e.lastIndexOf(", ") + 2).trim();
        const t = rows.find((x) => x.name === name && (x.admin1Code === tail || x.country === tail || x.country === SHORT_COUNTRY[tail]));
        return t && regionOfTown(t) !== r.slug ? `${t.slug} (listed under ${r.slug}, classified ${regionOfTown(t)})` : null;
      })
      .filter(Boolean),
  );
  console.log(`  example towns the classifier puts in another region:\n    ${listed.join("\n    ")}`);
  const oneSided = rows.filter((t) => t.hasClimate && t.frostRare).map((t) => t.slug);
  const half = PLACE_NORMALS.filter((e) => (e.climate.lastSpringFrost === "Rare") !== (e.climate.firstFallFrost === "Rare"));
  console.log(`  towns with frost 'Rare' on one side only (shown as frost rare, like their own pages): ${half.map((e) => `${e.place.slug} ${e.climate.lastSpringFrost}–${e.climate.firstFallFrost}`).join(", ")}`);
  console.log(`  towns shown as frost rare: ${oneSided.length}`);
  const spurious = rows.filter((t) => t.hasClimate && !t.frostRare && t.frostFreeDays! >= 340);
  console.log(`  towns with a frost date but 340+ frost-free days (a grid 'frost' that is really a cool night): ${spurious.map((t) => `${t.slug} ${t.lastFrost}–${t.firstFrost}`).join(", ")}`);
}
