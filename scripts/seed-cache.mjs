#!/usr/bin/env node
/**
 * Fills a Netlify project's "guides" store (src/lib/cache.ts) from a backup of stored records, so a new project
 * starts with the species, ground, soil, river and climate records the pages and the audit were read against
 * instead of rebuilding each one on a reader's first visit.
 *
 * The backup is one JSON object per line, plain or gzipped:
 *   { "k": "<cache key>", "v": "<the stored wrapper as a JSON string: { value, expires (ms) }>" }
 *
 *   NETLIFY_SITE_ID=<project id> NETLIFY_AUTH_TOKEN=<token> node scripts/seed-cache.mjs <backup.jsonl[.gz]> [--dry-run]
 *
 * Rules:
 *  - An entry is written exactly as it was stored, wrapper and all, under the same key.
 *  - An entry with less than a day left is skipped: the site would not read it.
 *  - A key the store already holds is left alone (onlyIfNew), so a record the live site has written since is never
 *    replaced by an older one, and the script can be run again after a failure.
 *  - The token is read from the environment and never printed.
 *
 * Exit code 0 when every entry was written or already there; 1 when the store refused the sign-in, could not be
 * reached at all (the first dozen writes all failed), or any write failed after three tries (the counts say how
 * many; run it again to finish).
 */
import { createReadStream } from "node:fs";
import { createGunzip } from "node:zlib";
import { createInterface } from "node:readline";
import { getStore } from "@netlify/blobs";

const STORE = "guides";
const CONCURRENCY = 6;
const DAY = 86_400_000;

const args = process.argv.slice(2);
const dry = args.includes("--dry-run");
const file = args.find((a) => !a.startsWith("--"));
const siteID = process.env.NETLIFY_SITE_ID;
const token = process.env.NETLIFY_AUTH_TOKEN;

if (!file) {
  console.error("usage: node scripts/seed-cache.mjs <backup.jsonl[.gz]> [--dry-run]");
  process.exit(2);
}
if (!dry && (!siteID || !token)) {
  console.error("NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN must be set (or pass --dry-run to read the backup only).");
  process.exit(2);
}

const store = dry ? null : getStore({ name: STORE, siteID, token });
const family = (k) => (k.startsWith("rec:v1:") ? k.split(":").slice(0, 3).join(":") : k.split(":").slice(0, 2).join(":"));
const counts = { read: 0, written: 0, present: 0, expired: 0, malformed: 0, failed: 0 };
const byFamily = new Map();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Writes one entry; three tries. A refused sign-in stops the run at once: every later write would fail the same way. */
async function put(key, wrapper) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await store.setJSON(key, wrapper, { onlyIfNew: true });
      return res && res.modified === false ? "present" : "written";
    } catch (err) {
      const msg = String(err?.message ?? err);
      if (/\b(401|403)\b/.test(msg)) {
        console.error("\nThe store refused the sign-in (401/403). Check the project id and the token. Nothing more was written.");
        process.exit(1);
      }
      if (attempt >= 3) {
        if (counts.failed < 5) console.error(`\n  failed: ${key}: ${msg.slice(0, 160)}`);
        // Nothing has got through and a dozen have failed: the store cannot be reached from here (no network, a
        // proxy, a wrong project id). Stop instead of trying four thousand more.
        if (counts.failed + 1 >= 12 && counts.written + counts.present === 0) {
          console.error("\nThe store could not be reached: the first dozen writes all failed and none succeeded. Nothing was written.");
          process.exit(1);
        }
        return "failed";
      }
      await sleep(500 * attempt * attempt);
    }
  }
}

const input = createReadStream(file);
const lines = createInterface({ input: file.endsWith(".gz") ? input.pipe(createGunzip()) : input, crlfDelay: Infinity });
const running = new Set();
const now = Date.now();
let lastShown = 0;

for await (const line of lines) {
  if (!line.trim()) continue;
  counts.read++;
  let key, wrapper;
  try {
    const row = JSON.parse(line);
    key = row.k;
    wrapper = typeof row.v === "string" ? JSON.parse(row.v) : row.v;
  } catch {
    counts.malformed++;
    continue;
  }
  if (typeof key !== "string" || !wrapper || typeof wrapper.expires !== "number" || !("value" in wrapper)) {
    counts.malformed++;
    continue;
  }
  if (wrapper.expires < now + DAY) {
    counts.expired++;
    continue;
  }
  const fam = family(key);
  byFamily.set(fam, (byFamily.get(fam) ?? 0) + 1);
  if (dry) {
    counts.written++;
    continue;
  }
  const job = put(key, wrapper).then((outcome) => {
    counts[outcome]++;
    running.delete(job);
  });
  running.add(job);
  if (running.size >= CONCURRENCY) await Promise.race(running);
  const done = counts.written + counts.present + counts.failed;
  if (done - lastShown >= 250) {
    lastShown = done;
    console.log(`  ${done} done (${counts.written} written, ${counts.present} already there, ${counts.failed} failed)`);
  }
}
await Promise.all(running);

console.log(`\n${dry ? "Dry run: would write" : "Written"}: ${counts.written}. Already there: ${counts.present}. Skipped as expired: ${counts.expired}. Unreadable lines: ${counts.malformed}. Failed: ${counts.failed}. Lines read: ${counts.read}.`);
console.log([...byFamily.entries()].sort((a, b) => b[1] - a[1]).map(([f, n]) => `  ${f} ${n}`).join("\n"));
process.exit(counts.failed ? 1 : 0);
