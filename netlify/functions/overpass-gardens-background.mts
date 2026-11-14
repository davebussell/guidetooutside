/**
 * One-off helper for the community-gardens list (src/data/place-gardens.json):
 * runs the same OpenStreetMap query as scripts/fetch-place-gardens.ts from
 * Netlify's servers, which the public Overpass service answers, and keeps
 * each town's raw answer in the records store (`gardens-raw:v1:<slug>`). The
 * script then reads those (`--from-blobs`), applies its own filtering and
 * writes the static file that the pages use. Nothing here is read by a page.
 *
 * POST with the warm secret and `{ "slugs": [...] }` (at most ~90 per call:
 * a background function has fifteen minutes). One request at a time, a
 * pause between towns, polite User-Agent, retries on 429/5xx.
 */
import { getStore } from "@netlify/blobs";
import KNOWN from "../../src/lib/served-places";

type Town = { slug: string; lat: number; lon: number };

const ENDPOINT = "https://overpass-api.de/api/interpreter";
const UA = "guidetooutside.com (+https://guidetooutside.com; community gardens list)";
const RADIUS_M = 15000;
const PAUSE_MS = 3000;
const BUDGET_MS = 13 * 60 * 1000;

function query(lat: number, lon: number): string {
  const dLat = RADIUS_M / 111_320;
  const dLon = RADIUS_M / (111_320 * Math.cos((lat * Math.PI) / 180));
  const bb = [lat - dLat, lon - dLon, lat + dLat, lon + dLon].map((x) => x.toFixed(5)).join(",");
  return `[out:json][timeout:60][bbox:${bb}];
(
  nwr["leisure"="garden"]["garden:type"="community"]["name"];
  nwr["leisure"="garden"]["community_garden"]["community_garden"!="no"]["name"];
  nwr["landuse"="allotments"]["name"];
  nwr["leisure"="garden"]["garden:type"="allotments"]["name"];
);
out tags center;`;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchRaw(t: Town): Promise<unknown[]> {
  const waits = [20, 40, 80];
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "User-Agent": UA, "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: new URLSearchParams({ data: query(t.lat, t.lon) }),
      signal: AbortSignal.timeout(90_000),
    }).catch(() => null);
    if (res?.ok) {
      const j = (await res.json()) as { elements?: unknown[]; remark?: string };
      if (j.remark && /runtime error|timed out|out of memory/i.test(j.remark)) throw new Error(`overpass remark: ${j.remark}`);
      return j.elements ?? [];
    }
    const status = res?.status ?? 0;
    if (attempt >= waits.length || (status && status < 500 && status !== 429)) throw new Error(`overpass ${status}`);
    await sleep(waits[attempt] * 1000);
  }
}

export default async (req: Request) => {
  if (req.headers.get("x-warm-secret") !== process.env.WARM_SECRET || !process.env.WARM_SECRET) return new Response("forbidden", { status: 403 });
  const body = (await req.json().catch(() => ({}))) as { slugs?: string[] };
  const want = new Set(body.slugs ?? []);
  const towns = (KNOWN as Town[]).filter((t) => want.has(t.slug));
  const store = getStore({ name: "guides", consistency: "strong" });
  const started = Date.now();
  let ok = 0;
  const failed: string[] = [];
  for (const t of towns) {
    if (Date.now() - started > BUDGET_MS) break;
    try {
      const elements = await fetchRaw(t);
      await store.setJSON(`gardens-raw:v1:${t.slug}`, { fetchedAt: new Date().toISOString(), elements });
      ok++;
    } catch (e) {
      failed.push(t.slug);
      console.log(`gardens ${t.slug}: ${(e as Error).message}`);
    }
    await sleep(PAUSE_MS);
  }
  console.log(`gardens: ${ok} stored, ${failed.length} failed${failed.length ? ` (${failed.join(", ")})` : ""}`);
  return new Response("done");
};
