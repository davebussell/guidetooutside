#!/usr/bin/env node
/**
 * Runs every accuracy check over all 264 towns and exits non-zero if any fails.
 *
 *   node scripts/check-accuracy.mjs [--require-complete] [--only extremes,fish,...]
 *
 * Each check is its own script (scripts/check-*.ts), bundled with esbuild (this project has no
 * tsx; see scripts/check-homestead.ts) and run with node. What each one guards, from the Ottawa
 * audit of 2 November 2026 (the rule: a printed claim must be measured near the town, a
 * regulator's rule with its source and date, or labelled regional context):
 *
 *   extremes   cold-night and hot-day counts never read zero when the station record says
 *              otherwise; every zone names its system and matches the minimum printed beside it
 *   fish       only fish recorded near the town are listed as in season; no closed fish is "in
 *              season"; "in the salt" only on sea water; "as read on" only where a rule row applies
 *   foraging   no species is "ready now" without a record and a record in the month; no observed-only
 *              taxon under a food heading; every town has a land-rules line
 *   ground     bedrock is never a Quaternary surface unit; surface and bedrock are separate layers;
 *              ages are ranges
 *   day        plan full moons equal the almanac; weekly daylight change equals the sun tables;
 *              lake wording only within 25 km of a Great Lake; leaf wording only in leaf-on season;
 *              each day phase has its own caption
 *   crops      no harvest before sowing plus days to maturity; "sow now" lists only crops sowable today
 *   indexing   only audited Canadian towns are indexed and in the sitemap (launch scope); nothing in the
 *              source names the site's former brand, domain or identifiers
 *   water      tidal rivers and estuaries are not the open sea; "open sea" wording only on the open coast; a
 *              failed map look-up never prints "no named water"
 *
 * --require-complete makes the presence checks (fish, foraging) fail when the GBIF presence tables do
 * not cover all 264 towns yet. Use it before any release.
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const args = process.argv.slice(2);
const strict = args.includes("--require-complete");
const onlyArg = args.find((a) => a.startsWith("--only="))?.slice(7) ?? args[args.indexOf("--only") + 1];
const only = args.includes("--only") || onlyArg ? new Set((onlyArg ?? "").split(",").filter(Boolean)) : null;

const CHECKS = [
  { name: "extremes", extra: [] },
  { name: "fish", extra: strict ? ["--require-complete"] : [] },
  { name: "foraging", extra: strict ? ["--require-complete"] : [] },
  { name: "ground", extra: [] },
  { name: "day", extra: [] },
  { name: "crops", extra: [] },
  { name: "water", extra: [] },
  { name: "indexing", extra: [] },
];

const out = mkdtempSync(path.join(tmpdir(), "check-accuracy-"));
const results = [];

for (const c of CHECKS) {
  if (only && !only.has(c.name)) continue;
  const bundle = path.join(out, `check-${c.name}.mjs`);
  const build = spawnSync(
    "npx",
    ["esbuild", `scripts/check-${c.name}.ts`, "--bundle", "--platform=node", "--format=esm", "--alias:@=./src", `--outfile=${bundle}`, "--log-level=warning"],
    { stdio: "inherit" },
  );
  if (build.status !== 0) {
    results.push({ name: c.name, ok: false, note: "bundle failed" });
    continue;
  }
  console.log(`\n=== ${c.name} ===`);
  const run = spawnSync("node", [bundle, ...c.extra], { stdio: "inherit" });
  results.push({ name: c.name, ok: run.status === 0, note: run.status === 0 ? "" : `exit ${run.status}` });
}

console.log("\n=== summary ===");
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.note ? `  (${r.note})` : ""}`);
process.exit(results.every((r) => r.ok) ? 0 : 1);
