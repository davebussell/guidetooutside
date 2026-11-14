/**
 * Regenerates stored AI guides in production through the admin path on
 * /api/refresh (`?force=1`, guarded by WARM_SECRET), one place at a time, and
 * prints which sections the model wrote and which fell back to the rules
 * guide. Made for the step after the round-two deploy: the audit's six worst
 * stored guides (Cape Town, Nairobi, Lagos, Lisbon, Toronto, Oslo) are the
 * default list; pass slugs to do others.
 *
 * It never calls the model itself and never touches the store from here: the
 * deployed site does the writing, with its own key, through the same vetting
 * gate every guide passes.
 *
 * Run (no tsx in this project; esbuild bundles it):
 *   SITE_URL=https://guidetooutside.com WARM_SECRET=… \
 *   npx esbuild scripts/regenerate-guides.ts --bundle --platform=node --format=esm \
 *     --outfile=/tmp/regenerate-guides.mjs --log-level=warning && node /tmp/regenerate-guides.mjs [slug ...] [--dry]
 *
 * --dry prints the requests without sending them. Exit code 1 when any place
 * failed, so a deploy step can notice.
 */
const DEFAULT_SLUGS = ["cape-town-south-africa", "nairobi-kenya", "lagos-nigeria", "lisbon-portugal", "toronto-ontario", "oslo-norway"];

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const slugs = args.filter((a) => !a.startsWith("--"));
const list = slugs.length ? slugs : DEFAULT_SLUGS;
const base = (process.env.SITE_URL ?? "https://guidetooutside.com").replace(/\/$/, "");
const secret = process.env.WARM_SECRET ?? "";

type Answer = { ok?: boolean; message?: string; slug?: string; written?: string[]; fallback?: string[]; savedAt?: string };

async function regenerate(slug: string): Promise<boolean> {
  const url = `${base}/api/refresh?force=1`;
  if (dry) {
    console.log(`would POST ${url} {kind: "guide", slug: "${slug}"}`);
    return true;
  }
  const t0 = Date.now();
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", "x-warm-secret": secret },
      body: JSON.stringify({ kind: "guide", slug }),
      signal: AbortSignal.timeout(120_000),
    });
    const j = (await res.json().catch(() => ({}))) as Answer;
    const secs = Math.round((Date.now() - t0) / 1000);
    if (!res.ok || !j.ok) {
      console.log(`✗ ${slug}: ${res.status} ${j.message ?? ""} (${secs}s)`);
      return false;
    }
    const fb = j.fallback?.length ? `; from the rules guide: ${j.fallback.join(", ")}` : "";
    console.log(`✓ ${slug}: written ${j.written?.join(", ") ?? "?"}${fb} (${secs}s, saved ${j.savedAt ?? "?"})`);
    return true;
  } catch (e) {
    console.log(`✗ ${slug}: ${e instanceof Error ? e.message : String(e)}`);
    return false;
  }
}

async function main() {
  if (!dry && !secret) {
    console.error("WARM_SECRET is not set; the admin path refuses without it.");
    process.exit(2);
  }
  console.log(`Regenerating ${list.length} guide${list.length === 1 ? "" : "s"} at ${base}${dry ? " (dry run)" : ""}`);
  let failed = 0;
  for (const slug of list) {
    // One at a time: each is three model calls on the site's side.
    if (!(await regenerate(slug))) failed++;
  }
  console.log(failed ? `${failed} failed` : "all written");
  process.exit(failed ? 1 : 0);
}

main();
