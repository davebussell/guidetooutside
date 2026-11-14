/**
 * Moves the fish library's alternative names out of `name` into `localNames`, each with the regions where anglers use it
 * (audit of 10 November 2026). The bracketed names were printed on every page that showed the fish, so North American
 * pages read "Bluefish (elf, shad)": elf and shad are South African names, and in the eastern United States "shad" is
 * American shad, a different fish (VA DWR lists American and hickory shad at Richmond). src/lib/fishing-waters.ts
 * `localName` puts back only the names used in the page's region.
 *
 * Where each name is used is taken from the library's own text, which says so; a name with no place given stays everywhere:
 *  - elf, shad (bluefish): "South Africa's elf" (note), "In South Africa elf…" (caution) — the three South African regions
 *    that already carry bluefish's South African months (monthsByRegion).
 *  - blue kurper (Mozambique tilapia): "South Africa's blue kurper" (note) — not Madagascar.
 *  - barbel (sharptooth catfish): "South Africa's 'barbel'" (note) — the southern African regions only.
 *  - garrick (leerfish): the South African adults and rules (note, caution) — not the Mediterranean or West Africa.
 *  - blacktail (white seabream): the South African rock anglers' fish (note) — not Europe.
 *  - couta (narrow-barred Spanish mackerel): "couta or katonkel of South Africa and the kingfish of East Africa" (note) —
 *    South Africa's coast in the site's regions is southern-savanna; the name led the record, so the species' own English
 *    name now leads and couta is added there.
 *  - river snapper (mangrove red snapper): "of South African estuary anglers" (note).
 *  - striped mullet (flathead grey mullet), jack crevalle (crevalle jack): the American names (the IGFA record for mullet is
 *    entered "as striped mullet" from Texas, src/data/fish-facts.ts; the jack's caution names the United States) — the
 *    North American regions only.
 *  - red drum, spotted seatrout, Cape yellowtail, kabeljou, pignose grunter, Cape bream, brusher: the fish is listed only in
 *    the regions where the name is used, so they stay wherever the fish is shown.
 *  - GT, bagrid catfish, largemouth queenfish: no place is given (a shorthand, a family name, an English name), so "all".
 *
 * Idempotent. Run from the project root: node scripts/fix-fish-local-names.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const FILE = "src/data/creatures.json";
const SA = ["cape-fynbos", "southern-savanna", "namib-karoo"];
const SA_INLAND = ["southern-savanna", "highveld-drakensberg", "namib-karoo", "cape-fynbos"];
const NA_SEA = ["northeast-coast", "southeastern", "gulf-coast", "florida-peninsula", "mediterranean-california", "hawaii-tropics"];

/** slug: [the name to lead with, [alternative name, regions where it is used ("all": every region the fish is listed in)]...] */
const NAMES = {
  redfish: ["Redfish", [["red drum", "all"]]],
  "speckled-trout": ["Speckled trout", [["spotted seatrout", "all"]]],
  "mozambique-tilapia": ["Mozambique tilapia", [["blue kurper", SA]]],
  "sharptooth-catfish": ["Sharptooth catfish", [["barbel", SA_INLAND]]],
  "dusky-kob": ["Dusky kob", [["kabeljou", "all"]]],
  "yellowtail-amberjack": ["Yellowtail", [["Cape yellowtail", "all"]]],
  "giant-trevally": ["Giant trevally", [["GT", "all"]]],
  bluefish: ["Bluefish", [["elf", SA], ["shad", SA]]],
  "white-steenbras": ["White steenbras", [["pignose grunter", "all"]]],
  "hottentot-seabream": ["Hottentot seabream", [["Cape bream", "all"]]],
  "white-musselcracker": ["White musselcracker", [["brusher", "all"]]],
  leerfish: ["Leerfish", [["garrick", SA]]],
  "white-seabream": ["White seabream", [["blacktail", SA]]],
  "flathead-grey-mullet": ["Flathead grey mullet", [["striped mullet", NA_SEA]]],
  "narrow-barred-spanish-mackerel": ["Narrow-barred Spanish mackerel", [["couta", ["southern-savanna"]]]],
  "crevalle-jack": ["Crevalle jack", [["jack crevalle", ["southeastern", "gulf-coast", "florida-peninsula"]]]],
  "silver-catfish": ["Silver catfish", [["bagrid catfish", "all"]]],
  "mangrove-red-snapper": ["Mangrove red snapper", [["river snapper", ["southern-savanna"]]]],
  "talang-queenfish": ["Talang queenfish", [["largemouth queenfish", "all"]]],
};

const text = readFileSync(FILE, "utf8");
const data = JSON.parse(text);
const changes = [];
for (const list of [data.fish, data.garden]) {
  for (const c of list) {
    const spec = NAMES[c.slug];
    if (!spec) {
      if (/\(/.test(c.name)) throw new Error(`${c.slug}: "${c.name}" has bracketed names with no rule in NAMES`);
      continue;
    }
    const [lead, alts] = spec;
    const localNames = alts.map(([name, regions]) => ({ name, regions: regions === "all" ? "all" : regions }));
    for (const ln of localNames) {
      if (ln.regions === "all") continue;
      const listed = Array.isArray(c.regions) ? c.regions : [];
      const stray = ln.regions.filter((r) => !listed.includes(r));
      if (stray.length) throw new Error(`${c.slug}: "${ln.name}" is given for ${stray.join(", ")}, where the fish is not listed`);
    }
    if (c.name === lead && JSON.stringify(c.localNames) === JSON.stringify(localNames)) continue;
    changes.push({ slug: c.slug, field: "name", before: c.name, after: lead });
    changes.push({ slug: c.slug, field: "localNames", before: c.localNames ?? null, after: localNames });
    c.name = lead;
    c.localNames = localNames;
  }
}
if (!changes.length) {
  console.log("creatures.json: names already split; nothing to do.");
  process.exit(0);
}
data.sources = [
  ...(data.sources ?? []),
  {
    note: "Audit of 10 November 2026 (fish package): alternative names moved from `name` to `localNames`, each with the regions where it is used; src/lib/fishing-waters.ts localName prints only those. Reasons in scripts/fix-fish-local-names.mjs.",
    changes,
  },
];
// The file is written with one-space indentation and no final newline, as it was.
writeFileSync(FILE, JSON.stringify(data, null, 1));
console.log(`creatures.json: ${changes.length / 2} fish renamed: ${changes.filter((c) => c.field === "name").map((c) => `${c.before} -> ${c.after}`).join("; ")}`);
