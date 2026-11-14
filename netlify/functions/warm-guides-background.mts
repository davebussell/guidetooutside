/**
 * Background (up to 15 minutes), started by the weekly warm-guides schedule:
 * rewrites the stored AI guides that are past their week, the stalest first,
 * for the places with a pre-built guide, so the Sunday email and Monday's
 * visitors read this week's. Stops a minute before the limit; anything left
 * is written by its next visitor or next week's run. Never runs without the
 * model key, and never from a local build (it writes the live store).
 *
 * Regeneration list (round two of the regional-accuracy work, 14 October
 * 2026): a guide written before the fact-sheet prompt shipped
 * (`PROMPT_VERSION` in src/lib/guide-ai) is due whatever its age, and the
 * places the audit found worst (`GUIDE_REGENERATE_FIRST`: Cape Town, Nairobi,
 * Lagos, Lisbon, Toronto, Oslo) go first. A POST with a JSON body
 * `{ "slugs": [...] }` (and the secret) rewrites just those places, at once.
 */
import KNOWN from "../../src/lib/served-places";
import { getLocalData } from "../../src/lib/local-data";
import { aiEnabled, readGuide, writeGuide, GUIDE_FRESH_SECONDS, GUIDE_REGENERATE_FIRST, PROMPT_VERSION_MS, seenKey } from "../../src/lib/guide-ai";
import { cacheGet } from "../../src/lib/cache";
import { POPULAR_LOCATIONS, SELECTED_PLACES } from "../../src/lib/site";
import type { Place } from "../../src/lib/types";

const BUDGET_MS = 14 * 60 * 1000;

const warmGuidesBackground = async (req: Request) => {
  if (process.env.WARM_SECRET && req.headers.get("x-warm-secret") !== process.env.WARM_SECRET) return new Response("forbidden", { status: 403 });
  if (!aiEnabled()) return new Response("no model key");
  const start = Date.now();
  const body = (await req.json().catch(() => ({}))) as { slugs?: string[] };
  const only = Array.isArray(body.slugs) ? new Set(body.slugs) : null;
  // Cost control (Oct 2026): rewrite only towns somebody has read in the last 30 days, the
  // popular/selected towns and the audit list, and at most WARM_MAX (default 40) a run.
  const WARM_MAX = Math.max(1, Number(process.env.WARM_MAX) || 40);
  const always = new Set<string>([...POPULAR_LOCATIONS.map((p) => p.slug), ...SELECTED_PLACES.flatMap((g) => g.places.map((p) => p.slug)), ...GUIDE_REGENERATE_FIRST]);
  const candidates = (KNOWN as Place[]).filter((p) => !only || only.has(p.slug));
  const seenFlags = only ? candidates.map(() => true) : await Promise.all(candidates.map((p) => (always.has(p.slug) ? Promise.resolve(true) : cacheGet<number>(seenKey(p.slug)).then((v) => !!v).catch(() => false))));
  const places = candidates.filter((_, i) => seenFlags[i]);
  const priority = (p: Place) => {
    const i = GUIDE_REGENERATE_FIRST.indexOf(p.slug);
    return i < 0 ? GUIDE_REGENERATE_FIRST.length : i;
  };
  // Oldest stored guide first; places with none come after the stale ones;
  // the audit's list ahead of everything; a pre-fact-sheet guide is always due.
  const ages = await Promise.all(
    places.map(async (p) => {
      const g = await readGuide(p).catch(() => null);
      const savedMs = g ? new Date(g.savedAt).getTime() : 0;
      return { p, g, age: g ? (Date.now() - savedMs) / 1000 : Infinity, old: !g || savedMs < PROMPT_VERSION_MS };
    }),
  );
  const due = ages
    .filter((x) => only || x.old || x.age > GUIDE_FRESH_SECONDS * 0.9)
    .sort((a, b) => priority(a.p) - priority(b.p) || (a.g ? 0 : 1) - (b.g ? 0 : 1) || b.age - a.age);
  let written = 0;
  const fellBack: string[] = [];
  for (const { p, g } of due.slice(0, only ? due.length : WARM_MAX)) {
    if (Date.now() - start > BUDGET_MS) break;
    try {
      const d = await getLocalData(p);
      const r = await writeGuide(d, g);
      if (r) {
        written++;
        if (r.value.fallback?.length) fellBack.push(`${p.slug}: ${r.value.fallback.join(", ")}`);
      }
    } catch (e) {
      console.error(`[warm-guides] ${p.slug}:`, e);
    }
  }
  console.log(`[warm-guides] ${written} of ${due.length} due guides written (${places.length} of ${candidates.length} towns eligible, cap ${WARM_MAX})${fellBack.length ? `; sections from the rules guide: ${fellBack.join("; ")}` : ""}`);
  return new Response(`written ${written} of ${due.length}${fellBack.length ? `\nfallback: ${fellBack.join("; ")}` : ""}`);
};

export default warmGuidesBackground;
