/**
 * Indexing and brand check (14 November 2026, the move to guidetooutside.com).
 *
 * 1. The launch scope: only audited Canadian towns are indexed. Every other town page carries `noindex, follow` and
 *    is absent from the sitemap; a region is listed only while it holds an indexed town; the kids' books are held back.
 * 2. Nothing in the source names the site's former brand, domain or identifiers.
 *
 * Run: npx esbuild scripts/check-indexing.ts --bundle --platform=node --format=esm --alias:@=./src --outfile=<scratch>/x.mjs && node <scratch>/x.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { ALL_KNOWN_PLACES, COVERED_COUNTRIES, KNOWN_PLACES, knownPlace } from "@/lib/geocode";
import { continentServed, countryServed } from "@/lib/scope";
import SERVED_PLACES from "@/lib/served-places";
import { PLACE_NORMALS } from "@/lib/climate-fallback";
import { REGIONS, getRegion } from "@/components/regions/region-bits";
import { ALL_SPECIES, getSpecies, recordServed } from "@/lib/species";
import { ALL_FISH, getCreature } from "@/lib/nature";
import { ALL_ORGANISATIONS, INVITATIONS, ORGANISATIONS, STORIES, orgBySlug, orgServed } from "@/data/conservation";
import { POPULAR_LOCATIONS, SELECTED_PLACES } from "@/lib/site";
import { classifyEcoregion, ECOREGIONS } from "@/lib/ecoregions";
import { HELD_BACK, INDEXED_COUNTRIES, INDEXED_PLACE_SECTIONS, NOINDEX, indexedTowns, placeIndexed, placeRobots, regionIndexed, townIndexed, type PlaceSection } from "@/lib/seo/indexing";
import { SITE } from "@/lib/site";

let failures = 0;
let checks = 0;
const ok = (cond: boolean, what: string) => {
  checks++;
  if (!cond) {
    failures++;
    if (failures <= 60) console.log(`FAIL ${what}`);
  }
};

const SECTIONS: PlaceSection[] = ["guide", "gardening", "fishing", "foraging", "ground", "the-day", "resources", "homesteading"];
const urls = sitemap().map((e) => e.url);
const paths = new Set(urls.map((u) => u.replace(SITE.url, "")));

// ---- 1. the launch scope ------------------------------------------------------------------------------------------
ok(SITE.url === "https://guidetooutside.com" || !!process.env.NEXT_PUBLIC_SITE_URL, `site url is ${SITE.url}`);
ok(urls.every((u) => u.startsWith(SITE.url)), "every sitemap url is on the site's own address");
for (const slug of HELD_BACK) {
  const p = KNOWN_PLACES.find((k) => k.slug === slug);
  ok(!!p, `held-back town ${slug} is a pre-built town`);
  ok(!!p && INDEXED_COUNTRIES.includes((p.countryCode ?? "").toUpperCase()), `held-back town ${slug} is in an indexed country (otherwise the entry does nothing)`);
}
for (const p of KNOWN_PLACES) {
  const inCountry = INDEXED_COUNTRIES.includes((p.countryCode ?? "").toUpperCase());
  const want = inCountry && !HELD_BACK.includes(p.slug);
  ok(townIndexed(p.slug) === want, `${p.slug}: townIndexed is ${townIndexed(p.slug)}, the scope says ${want}`);
  for (const s of SECTIONS) {
    const indexed = want && INDEXED_PLACE_SECTIONS.includes(s);
    ok(placeIndexed(s, p.slug) === indexed, `${s}/${p.slug}: placeIndexed`);
    const r = placeRobots(s, p.slug);
    ok(indexed ? r.robots === undefined : r.robots === NOINDEX, `${s}/${p.slug}: robots line`);
    ok(paths.has(`/${s}/${p.slug}`) === indexed, `${s}/${p.slug}: ${indexed ? "missing from" : "present in"} the sitemap`);
  }
}
ok(!placeIndexed("guide", "a-town-somebody-typed"), "a town outside the pre-built list is never indexed");
const towns = indexedTowns();
ok(towns.length > 0, "at least one town is indexed");
ok(towns.every((p) => (p.countryCode ?? "").toUpperCase() === "CA"), "every indexed town is Canadian (launch scope)");
for (const r of ECOREGIONS as { slug: string }[]) {
  const has = towns.some((p) => (classifyEcoregion(p.lat, p.lon) as { slug: string } | null)?.slug === r.slug);
  ok(regionIndexed(r.slug) === has, `region ${r.slug}: indexed only with an indexed town`);
  ok(paths.has(`/regions/${r.slug}`) === has, `region ${r.slug}: sitemap`);
}
ok(![...paths].some((p) => p === "/kids" || p.startsWith("/kids/")), "the kids' books are not in the sitemap");
// The games moved to a separate site (Dave, 14 November 2026): no route, no link and no sitemap line here.
ok(!fs.existsSync("src/app/(kids)") && !fs.existsSync("src/app/(site)/games") && !fs.existsSync("public/kids.webmanifest"), "the games are not part of this site");
ok(![...paths].some((p) => p === "/games" || p.startsWith("/games/")), "no game page is in the sitemap");
// The teaching-at-home pages (/learn) moved to the games site too (Dave, 18 November 2026): no route, no sitemap line,
// no link, and no "For Kids" label left on the guide.
ok(!fs.existsSync("src/app/(site)/learn"), "the teaching-at-home pages are not part of this site");
ok(![...paths].some((p) => p === "/learn" || p.startsWith("/learn/")), "no teaching-at-home page is in the sitemap");
for (const f of ["src/app", "src/components", "src/lib"].flatMap((d) => walk(d)).filter((x) => /\.(tsx|ts|jsx)$/.test(x))) {
  const text = fs.readFileSync(f, "utf8");
  const m = /["'`]\/(?:kids|games|learn)(?:[/"'`$?#])/.exec(text);
  ok(!m, `${f}: links to a page that moved to the games site ("${m?.[0]}")`);
  const k = /For Kids/.exec(text);
  ok(!k, `${f}: still labels a page "For Kids"`);
}
const rb = robots();
ok(String(rb.sitemap) === `${SITE.url}/sitemap.xml`, "robots.txt names the site's own sitemap");
// Pinned for the launch: Ottawa and Halifax in, Vancouver held back, Boston and Paris out.
ok(placeIndexed("fishing", "ottawa-ontario") && placeIndexed("gardening", "halifax-nova-scotia"), "pin: Ottawa and Halifax are indexed");
ok(townIndexed("vancouver-british-columbia") && townIndexed("whitehorse-yukon") && !townIndexed("boston-massachusetts") && !townIndexed("paris-france"), "pin: all of Canada (Vancouver, Whitehorse) is indexed; Boston and Paris are not");

// ---- 1b. only North America is served (src/lib/scope.ts) ---------------------------------------------------------
// Dave, 14 November 2026: "narrow the site down to just North America to start. Don't let Europe or Africa find
// pages." A parked town, region, species, fish or organisation is in no list the pages read, has no lookup that
// answers, and is not in the sitemap; the geocoder accepts served countries only; no page says the site covers
// Europe or Africa.
{
  const parkedTowns = ALL_KNOWN_PLACES.filter((p) => !countryServed(p.countryCode));
  ok(KNOWN_PLACES.length + parkedTowns.length === ALL_KNOWN_PLACES.length && KNOWN_PLACES.every((p) => countryServed(p.countryCode)), "the served town list holds served countries only");
  ok(KNOWN_PLACES.length === 101, `101 towns served (got ${KNOWN_PLACES.length})`);
  for (const p of parkedTowns) {
    ok(knownPlace(p.slug) === undefined, `parked town ${p.slug} answers a lookup`);
    ok(![...paths].some((u) => u.endsWith("/" + p.slug)), `parked town ${p.slug} is in the sitemap`);
    ok(!SERVED_PLACES.some((k) => k.slug === p.slug), `parked town ${p.slug} is in the served table`);
    ok(!(PLACE_NORMALS as { place: { slug: string } }[]).some((e) => e.place.slug === p.slug), `parked town ${p.slug} is in the list of normals the pages read`);
  }
  ok([...COVERED_COUNTRIES].every((c) => countryServed(c)) && COVERED_COUNTRIES.has("CA") && COVERED_COUNTRIES.has("US"), "the geocoder accepts served countries only");
  const allRegions = ECOREGIONS as { slug: string; continent?: string }[];
  for (const r of allRegions) {
    const servedRegion = continentServed(r.continent);
    ok(REGIONS.some((x) => x.slug === r.slug) === servedRegion, `region ${r.slug}: ${servedRegion ? "served but not listed" : "parked but listed"}`);
    ok((getRegion(r.slug) !== undefined) === servedRegion, `region ${r.slug}: lookup ${servedRegion ? "fails" : "answers for a parked region"}`);
    if (!servedRegion) ok(!paths.has(`/regions/${r.slug}`), `parked region ${r.slug} is in the sitemap`);
  }
  for (const sp of ALL_SPECIES) {
    const on = recordServed(sp.regions);
    ok((getSpecies(sp.slug) !== undefined) === on, `species ${sp.slug}: ${on ? "served but no lookup" : "parked but answers"}`);
    if (!on) ok(!paths.has(`/foraging/${sp.slug}`), `parked species ${sp.slug} is in the sitemap`);
  }
  for (const f of ALL_FISH) {
    const on = recordServed(f.regions);
    ok((getCreature(f.slug) !== undefined) === on, `fish ${f.slug}: ${on ? "served but no lookup" : "parked but answers"}`);
    if (!on) ok(!paths.has(`/wildlife/${f.slug}`), `parked fish ${f.slug} is in the sitemap`);
  }
  for (const o of ALL_ORGANISATIONS) ok((orgBySlug(o.slug) !== undefined) === orgServed(o), `organisation ${o.slug}: served and lookup disagree`);
  ok(ORGANISATIONS.every((o) => !o.countryCode || o.scope === "international" || countryServed(o.countryCode)), "no organisation of a parked country is listed");
  ok(INVITATIONS.every((i) => orgBySlug(i.org) && (i.partners ?? []).every((p2) => orgBySlug(p2))), "every invitation names served organisations only");
  ok(STORIES.every((st) => st.orgs.length > 0 && st.orgs.every((o) => orgBySlug(o)) && st.steps.every((x) => !x.org || orgBySlug(x.org))), "every story names served organisations only");
  ok(SELECTED_PLACES.every((g) => g.places.every((pl) => knownPlace(pl.slug))), "the front page's places are served towns");
  ok(POPULAR_LOCATIONS.every((pl) => knownPlace(pl.slug)), "the popular places are served towns");
  // Pins.
  ok(knownPlace("paris-france") === undefined && knownPlace("cape-town-south-africa") === undefined && knownPlace("boston-massachusetts") !== undefined, "pin: Paris and Cape Town are parked, Boston is served");
  ok(getRegion("atlantic-europe") === undefined && getRegion("great-lakes-st-lawrence") !== undefined, "pin: Atlantic Europe is parked, the Great Lakes region is served");
  ok(getSpecies("baobab") === undefined && getCreature("nile-perch") === undefined && getCreature("walleye") !== undefined, "pin: baobab and Nile perch are parked, walleye is served");
  // No page claims the parked continents: the coverage phrases, outside comments, in the pages and components.
  const CLAIMS = [/North America, Europe/, /Europe (?:and|or) Africa/, /three continents/];
  for (const f of ["src/app/(site)", "src/components", "src/lib/site.ts", "src/lib/nav.jsx"].flatMap(walk).filter((x) => /\.(tsx|ts|jsx)$/.test(x) && !x.includes("src/components/kids/"))) {
    const lines = fs.readFileSync(f, "utf8").split("\n");
    // A block rendered only when a parked continent is served again keeps its words in the source. It opens on a line
    // that asks the scope (continentServed, countryServed), tests the towns of a parked continent (abroad.europe,
    // abroad.africa) or declares the component that shows them (AbroadByZone), and runs to the next line indented no
    // deeper than that one.
    const GATE = /continentServed\(|countryServed\(|abroad\.(?:europe|africa)\b|function AbroadByZone\b/;
    let gateIndent = -1;
    lines.forEach((line, i) => {
      const indent = line.length - line.trimStart().length;
      if (gateIndent >= 0 && line.trim() && indent <= gateIndent && !GATE.test(line)) gateIndent = -1;
      if (gateIndent < 0 && GATE.test(line)) gateIndent = indent;
      if (gateIndent >= 0) return;
      const code = line.replace(/\/\/.*$/, "").replace(/\{\/\*.*?\*\/\}/g, "");
      if (/^\s*(\/\*|\*)/.test(line)) return;
      for (const re of CLAIMS) ok(!re.test(code), `${f}:${i + 1} claims a parked continent: ${line.trim().slice(0, 90)}`);
    });
  }
}

// ---- 2. nothing names the former brand ----------------------------------------------------------------------------
// Every tracked folder and every file at the top of the repository (the lock file and a stray script once kept the
// old name and the old project's id where this check did not look).
const ROOTS = ["src", "public", "netlify", "scripts", ...fs.readdirSync(".").filter((n) => fs.statSync(n).isFile() && !n.endsWith(".tsbuildinfo") && n !== "next-env.d.ts")];
const TEXT = /\.(ts|tsx|js|jsx|mjs|cjs|mts|css|json|svg|webmanifest|md|toml|py|html|txt|example|gitignore)$/;
// The former name and ids, spelled in pieces so that this file does not hold them either (it is scanned like the rest).
const A = ["pec", "ker"].join("");
const B = "jay";
const AB = `${A}and${B}`;
const FORMER = [
  new RegExp(`(?<![a-z])${A}\\s*(?:&|&amp;|and)\\s*${B}`, "i"),
  new RegExp(AB, "i"),
  /(?<![A-Za-z0-9])pj[-_:]/,
  new RegExp(`(?<![A-Za-z0-9-])(?:text|bg|border|fill|ring|outline)-(?:${A}|${B})(?![A-Za-z0-9])`),
  new RegExp(`--(?:color-)?(?:${A}|${B})(?![A-Za-z0-9])`),
  /ca-pub-\d+/,
  /google[0-9a-f]{16}\.html/,
  new RegExp(["b1eb", "f6b4-", "77bc"].join("")),
  new RegExp(["dave", "bussell"].join(""), "i"),
];
const FORMER_FILE = new RegExp(`${A}[-_]?${B}|${AB}`, "i");
function walk(p: string): string[] {
  if (!fs.existsSync(p)) return [];
  const st = fs.statSync(p);
  if (st.isFile()) return [p];
  return fs.readdirSync(p).flatMap((n) => (n === "node_modules" || n.startsWith(".next") ? [] : walk(path.join(p, n))));
}
let scanned = 0;
for (const f of ROOTS.flatMap(walk)) {
  ok(!FORMER_FILE.test(path.basename(f)), `file name ${f}`);
  if (!TEXT.test(f)) continue;
  scanned++;
  const text = fs.readFileSync(f, "utf8");
  for (const re of FORMER) {
    const m = re.exec(text);
    ok(!m, `${f}: former brand string "${m?.[0]}"`);
  }
}

console.log(`\nIndexed: ${towns.length} towns (${towns.map((p) => p.slug.split("-").slice(0, -1).join("-") || p.slug).join(", ")})`);
console.log(`Held back in ${INDEXED_COUNTRIES.join(", ")}: ${HELD_BACK.length}. Sitemap: ${urls.length} urls, ${[...paths].filter((p) => /^\/(guide|gardening|fishing|foraging|ground)\/[a-z-]+-[a-z-]+$/.test(p) && KNOWN_PLACES.some((k) => p.endsWith("/" + k.slug))).length} town pages, ${(ECOREGIONS as { slug: string }[]).filter((r) => regionIndexed(r.slug)).length} regions.`);
console.log(`${scanned} source files scanned for the former brand.`);
// The children's books once named the woodpecker after the former brand. It is Tapper now; the blue jay keeps the name
// of its own call. Neither the old name nor the old pairing returns.
const OLD_BIRD = ["Pe", "ck"].join("");
const OLD_BIRD_RE = new RegExp(`\\b${OLD_BIRD}\\b|\\b${OLD_BIRD.toUpperCase()}_|\\bbo-${OLD_BIRD.toLowerCase()}\\b`);
const OLD_PAIR_RE = new RegExp(`\\b${OLD_BIRD}\\s*(?:&|and)\\s*Jay\\b|\\b${OLD_BIRD} the woodpecker\\b`);
const KIDS = ["src/components/kids", "src/app/(kids)", "src/lib/kids", "public/kids.webmanifest"];
for (const f of KIDS.flatMap(walk).filter((f) => TEXT.test(f))) {
  const m = OLD_BIRD_RE.exec(fs.readFileSync(f, "utf8"));
  ok(!m, `${f}: the children's woodpecker still carries its old name "${m?.[0]}"`);
}
for (const f of ROOTS.flatMap(walk).filter((f) => TEXT.test(f))) {
  const m = OLD_PAIR_RE.exec(fs.readFileSync(f, "utf8"));
  ok(!m, `${f}: former pairing "${m?.[0]}"`);
}
console.log(failures ? `\n${failures} failure(s) of ${checks} checks` : `\nall ${checks} checks passed`);
process.exit(failures ? 1 : 0);
