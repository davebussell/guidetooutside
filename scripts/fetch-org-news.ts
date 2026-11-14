/**
 * Does from here what the daily org-news background function does on
 * Netlify: reads every library organisation's feed and writes the items to
 * the live "guides" Blobs store (`news:v1:<slug>`, `news:v1:latest`), so the
 * first deploy has news before the schedule first runs.
 *
 * Run (no tsx in this project; esbuild bundles it):
 *   npx esbuild scripts/fetch-org-news.ts --bundle --platform=node --format=esm --alias:@=./src \
 *     --outfile=/tmp/fetch-org-news.mjs --log-level=warning
 *   NETLIFY_AUTH_TOKEN=… NETLIFY_SITE_ID=… node /tmp/fetch-org-news.mjs [flags]
 *
 * Flags:
 *   --dry-run     fetch and parse, read the live store to compare, write nothing
 *   --dev-cache   write the entries to the local dev cache (.cache/blobs) instead of the live store,
 *                 so `next dev` shows them; the live store is only read
 *   --only a,b    just these organisation slugs
 *   --verbose     one line per feed
 * Always prints the summary and the `[images] remote_images` block for netlify.toml
 * (and the same host list for src/lib/conservation/news-hosts.ts).
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { ORGANISATIONS } from "@/data/conservation";
import { remoteImagesToml, runNewsFetch, type NewsStoreIO } from "@/lib/conservation/news-feed";
import { NEWS_TTL_SECONDS, type NewsEntry } from "@/lib/conservation/news-types";

type Store = { get(key: string, opts: { type: "json" }): Promise<unknown>; setJSON(key: string, value: unknown): Promise<unknown> };

const args = process.argv.slice(2);
const dry = args.includes("--dry-run");
const devCache = args.includes("--dev-cache");
const verbose = args.includes("--verbose");
const onlyArg = args.find((a, i) => args[i - 1] === "--only");
const only = onlyArg ? new Set(onlyArg.split(",")) : null;

async function liveStore(): Promise<Store | null> {
  const token = process.env.NETLIFY_AUTH_TOKEN;
  const siteID = process.env.NETLIFY_SITE_ID;
  if (!token || !siteID) return null;
  const { getStore } = await import("@netlify/blobs");
  return getStore({ name: "guides", siteID, token }) as unknown as Store;
}

const unwrap = (raw: unknown): NewsEntry | null => {
  const w = raw as { value?: NewsEntry; expires?: number } | null;
  return w && typeof w.expires === "number" && w.expires > Date.now() && w.value && Array.isArray(w.value.items) ? w.value : null;
};

async function main() {
  const store = await liveStore();
  if (!store && !dry && !devCache) {
    console.error("NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID are needed to write the live store (or pass --dry-run / --dev-cache).");
    process.exit(2);
  }
  if (!store) console.log("(no store credentials: comparing against nothing)");
  const diskDir = path.join(process.cwd(), ".cache", "blobs");
  const io: NewsStoreIO = {
    read: async (key) => (store ? unwrap(await store.get(key, { type: "json" }).catch(() => null)) : null),
    write: dry
      ? undefined
      : devCache
        ? async (key, entry) => {
            await mkdir(diskDir, { recursive: true });
            await writeFile(path.join(diskDir, `${encodeURIComponent(key)}.json`), JSON.stringify({ value: entry, expires: Date.now() + NEWS_TTL_SECONDS * 1000 }));
          }
        : async (key, entry) => {
            await store!.setJSON(key, { value: entry, expires: Date.now() + NEWS_TTL_SECONDS * 1000 });
          },
    log: (line) => console.log(line),
  };
  const orgs = only ? ORGANISATIONS.filter((o) => only.has(o.slug)) : ORGANISATIONS;
  const t0 = Date.now();
  const run = await runNewsFetch(orgs, io);
  if (verbose) {
    for (const r of run.results) console.log(`${r.status === "failed" ? "✗" : r.status === "written" ? "+" : "="} ${r.slug}: ${r.status === "failed" ? r.error : `${r.items} items (${r.images} with images) of ${r.parsed} parsed`}  ${r.feed}`);
  }
  const failed = run.results.filter((r) => r.status === "failed");
  const parsedSome = run.results.filter((r) => r.status !== "failed" && (r.parsed ?? 0) > 0).length;
  console.log(`\n${run.results.length} feeds in ${Math.round((Date.now() - t0) / 1000)} s: ${run.fetched} fetched (${parsedSome} with items parsed), ${run.failed} failed; ${run.items} recent items kept, ${run.withImages} with an image; ${run.latest.length} in the latest index.`);
  console.log(dry ? "Dry run: nothing written." : devCache ? `${run.written} entries written to the local dev cache.` : `${run.written} entries written to the live store.`);
  if (failed.length) console.log(`Failed: ${failed.map((r) => `${r.slug} (${r.error})`).join("; ")}`);
  console.log(`\nImage hosts (${run.imageHosts.length}):\n${JSON.stringify(run.imageHosts)}\n\n${remoteImagesToml(run.imageHosts)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
