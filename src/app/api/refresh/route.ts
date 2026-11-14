/**
 * POST /api/refresh { kind, slug }: rebuild one stored block for a place —
 * this week's guide, the ground, or what has been found nearby this month —
 * at most once an hour per place and block, and 400 times a day across the
 * site (src/lib/records). The Freshness stamp calls it, then refreshes the page.
 *
 * 200 { ok: true, retryAfterSeconds } when rebuilt; 429 { retryAfterSeconds,
 * message } when the place's hour or the day's allowance is used;
 * 4xx/5xx { message } otherwise, with the previous version left in place.
 *
 * Admin path: `POST /api/refresh?force=1` with the `x-warm-secret` header
 * equal to WARM_SECRET skips the hour gate and the daily count, so the
 * orchestrator can regenerate the stored guides the audit found worst right
 * after a deploy (scripts/regenerate-guides.ts). It answers with which
 * sections the model wrote and which fell back to the rules guide. Refused
 * (403) when WARM_SECRET is unset or wrong; never open to the page.
 *
 * kind "waters" (11 November 2026): asks OpenStreetMap for the town's named
 * waters (src/lib/waters getNearbyWaters) with a 60-second budget instead of a
 * page render's 12, so the waters cache (`waters:v3:<lat>:<lon>`) can be filled
 * for every town after a deploy rather than only by the visits that happen to
 * get an answer (audit of 10 November 2026: the 17 big cities read had no
 * named water at all, because a city's query ran out of the page's budget). A
 * list already cached is answered from the cache. A failed or half answer is
 * not stored as a whole one (waters.ts), so the call returns 502 and can simply
 * be run again. Its gate is the same as the other kinds': once an hour per
 * place and the daily count, or `?force=1` with the warm secret. To warm all
 * 264 towns, POST once per slug in src/data/place-normals.json, one at a time
 * (Overpass is a shared service), reading the secret from the environment so
 * it never appears in a command line or a log:
 *
 *   curl -sS -X POST "$SITE/api/refresh?force=1" -H "x-warm-secret: $WARM_SECRET" \
 *     -H "Content-Type: application/json" -d '{"kind":"waters","slug":"<slug>"}'
 *
 * The forced answer carries the slug and the number of named waters listed;
 * a town that answers 502 (the map service did not answer) is tried again later.
 */
import { NextResponse } from "next/server";
import { placeFromSlug } from "@/lib/geocode";
import { getLocalData } from "@/lib/local-data";
import { guideId, readGuide, writeGuide, aiEnabled } from "@/lib/guide-ai";
import { REFRESH_COOLDOWN_SECONDS, readRecord, releaseLimit, takeLimit, writeRecord } from "@/lib/records";
import { groundId, readGround, writeGround } from "@/lib/ground";
import { FLORA_FRESH_SECONDS, floraId, floraNearby, type LocalFlora } from "@/lib/local-flora";
import { getNearbyWaters, watersUnavailable } from "@/lib/waters";
import type { Place } from "@/lib/types";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

type Kind = "guide" | "ground" | "flora" | "waters";
const KINDS = new Set<Kind>(["guide", "ground", "flora", "waters"]);

/** The waters warm-up's budget: Overpass gives up a second before it (waters.ts), well inside maxDuration. */
const WATERS_BUDGET_MS = 60_000;

const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/** The record id a block is kept under for a place (this month, for the flora). */
async function idFor(kind: Kind, place: Place): Promise<string> {
  if (kind === "guide") return guideId(place);
  if (kind === "ground") return groundId(place);
  // The waters cache is kept per point to two decimals (waters.ts), so the gate is too.
  if (kind === "waters") return `${place.lat.toFixed(2)}_${place.lon.toFixed(2)}`;
  const d = await getLocalData(place);
  return floraId(place.lat, place.lon, d.month);
}

type Rebuilt = { ok: boolean; written?: string[]; fallback?: string[]; savedAt?: string; waters?: number };

async function rebuild(kind: Kind, place: Place, id: string): Promise<Rebuilt> {
  if (kind === "waters") {
    // getNearbyWaters stores a whole answer for a year and half of one for an hour, and never stores a failure.
    const waters = await getNearbyWaters(place.lat, place.lon, { budgetMs: WATERS_BUDGET_MS });
    if (watersUnavailable(waters)) return { ok: false };
    return { ok: true, waters: waters.length };
  }
  if (kind === "guide") {
    if (!aiEnabled()) return { ok: false };
    const d = await getLocalData(place);
    const previous = await readGuide(place);
    const record = await writeGuide(d, previous);
    if (!record) return { ok: false };
    const fallback = record.value.fallback ?? [];
    return { ok: true, written: ["gardening", "fishing", "foraging"].filter((x) => !fallback.includes(x as "gardening")), fallback, savedAt: record.savedAt };
  }
  if (kind === "ground") {
    const previous = await readGround(place);
    await writeGround(place, previous);
    return { ok: true };
  }
  const month = Number(id.split("_").pop());
  const flora = await floraNearby(place.lat, place.lon, month);
  // A failed look-up is not stored over a good one.
  if (!flora.live) return { ok: false };
  const previous = await readRecord<LocalFlora>("flora", id);
  await writeRecord("flora", id, flora, { source: "live", freshFor: FLORA_FRESH_SECONDS, previous });
  return { ok: true };
}

/** The admin override: `?force=1` and the warm secret, both required. */
function forced(req: Request): boolean | "forbidden" {
  const force = new URL(req.url).searchParams.get("force") === "1";
  if (!force) return false;
  const secret = process.env.WARM_SECRET;
  if (!secret || req.headers.get("x-warm-secret") !== secret) return "forbidden";
  return true;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { kind?: string; slug?: string };
  const kind = body.kind as Kind;
  if (!KINDS.has(kind) || !body.slug) return json({ message: "Unknown request." }, 400);
  const place = await placeFromSlug(body.slug);
  if (!place) return json({ message: "Place not found." }, 404);

  const force = forced(req);
  if (force === "forbidden") return json({ message: "Forbidden." }, 403);

  const id = await idFor(kind, place);
  if (!force) {
    const gate = await takeLimit(kind, id);
    if (!gate.ok) return json({ retryAfterSeconds: gate.retryAfterSeconds, message: gate.message }, 429);
  }

  try {
    const r = await rebuild(kind, place, id);
    if (!r.ok) {
      if (!force) await releaseLimit(kind, id);
      return json({ message: aiEnabled() || kind !== "guide" ? "The source did not answer. The previous version is shown." : "No model key in this environment." }, 502);
    }
    return json({
      ok: true,
      retryAfterSeconds: force ? 0 : REFRESH_COOLDOWN_SECONDS,
      ...(force ? { slug: place.slug, written: r.written, fallback: r.fallback, savedAt: r.savedAt, ...(r.waters != null ? { waters: r.waters } : {}) } : {}),
    });
  } catch (e) {
    if (!force) await releaseLimit(kind, id);
    return json({ message: force ? `Refresh failed: ${e instanceof Error ? e.message : String(e)}` : "Refresh failed. The previous version is shown." }, 502);
  }
}
