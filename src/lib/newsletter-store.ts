/**
 * The subscriber list, kept in Netlify Blobs (store "newsletter") so no sign-up
 * is ever lost while the mailing provider is being set up: every address is
 * written here first and forwarded to the provider second. Keys are the
 * lower-cased address; the value records where and when it was given.
 *
 * Export: `GET /api/newsletter?export=csv` with header `x-warm-secret: $WARM_SECRET`.
 */
import { getStore } from "@netlify/blobs";

export type Subscriber = { email: string; source: string; location: string | null; firstAt: string; lastAt: string; count: number; forwarded?: string };

const STORE = "newsletter";
const DEV = process.env.NODE_ENV === "development";

function store() {
  if (DEV && process.env.NETLIFY_AUTH_TOKEN && process.env.NETLIFY_SITE_ID && process.env.CACHE_WRITE_LIVE !== "1") return null; // never write the live list from a dev box
  try {
    return getStore({ name: STORE, consistency: "strong" });
  } catch {
    return null;
  }
}

export async function saveSubscriber(s: Omit<Subscriber, "firstAt" | "lastAt" | "count">, forwarded?: string): Promise<boolean> {
  const st = store();
  if (!st) return false;
  const key = s.email;
  const now = new Date().toISOString();
  const prev = (await st.get(key, { type: "json" }).catch(() => null)) as Subscriber | null;
  const rec: Subscriber = prev
    ? { ...prev, lastAt: now, count: (prev.count ?? 1) + 1, location: s.location ?? prev.location, forwarded: forwarded ?? prev.forwarded }
    : { ...s, firstAt: now, lastAt: now, count: 1, forwarded };
  await st.setJSON(key, rec);
  return true;
}

export async function listSubscribers(): Promise<Subscriber[]> {
  const st = store();
  if (!st) return [];
  const out: Subscriber[] = [];
  const { blobs } = await st.list();
  for (const b of blobs) {
    const rec = (await st.get(b.key, { type: "json" }).catch(() => null)) as Subscriber | null;
    if (rec) out.push(rec);
  }
  return out.sort((a, b) => a.firstAt.localeCompare(b.firstAt));
}

export function toCsv(rows: Subscriber[]): string {
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return ["email,source,location,first_at,last_at,count,forwarded", ...rows.map((r) => [r.email, r.source, r.location, r.firstAt, r.lastAt, r.count, r.forwarded].map(esc).join(","))].join("\n") + "\n";
}
