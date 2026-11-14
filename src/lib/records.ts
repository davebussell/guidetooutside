/**
 * Stored records: generated content (the AI guide, the ground, the local
 * flora) written once per place and then served straight from storage
 * with a freshness stamp, until someone asks for a refresh.
 *
 * Key `rec:v1:<block>:<id>`; the stored value is
 * `{ value, savedAt, source, freshFor, revision, season? }` inside the usual
 * cache wrapper, kept for ten years. The id is the caller's — the guide uses
 * `<lat1>_<lon1>`, the ground `<lat2>_<lon2>`, the flora `<lat2>_<lon2>_<month>`.
 *
 * Refreshing is rate limited: one hour per place per block
 * (`refresh:gate:<block>:<id>`, value = the ms time the gate opens) and 400 a
 * day across the site (`refresh:day:<yyyy-mm-dd>`, value = the count).
 */
import { cacheGet, cacheSet } from "./cache";

export type RecordSource = "ai" | "rules" | "live";

export type RecordMeta = {
  savedAt: string;
  source: RecordSource;
  /** Seconds the record counts as fresh. */
  freshFor: number;
  revision: number;
  /** The season it was written in ("Fall"), for content that turns with the year. */
  season?: string;
};

export type StoredRecord<T> = RecordMeta & {
  value: T;
  /** The version this one replaced, when the writer chose to keep it. */
  previous?: RecordMeta & { value: T };
};

export type WriteMeta<T> = {
  source: RecordSource;
  freshFor: number;
  season?: string;
  /** Keep the replaced version alongside (null or omitted: don't). */
  previous?: StoredRecord<T> | null;
};

const RECORD_TTL = 10 * 365 * 24 * 3600;
const recordKey = (block: string, id: string) => `rec:v1:${block}:${id}`;

/** The stored record, or null. Always read from the store, so a refresh on another instance shows at once. */
export async function readRecord<T>(block: string, id: string): Promise<StoredRecord<T> | null> {
  const r = await cacheGet<StoredRecord<T>>(recordKey(block, id), { memory: false });
  return r && typeof r === "object" && "savedAt" in r ? r : null;
}

/** Store a new version, one revision on from whatever was there. Returns what was stored. */
export async function writeRecord<T>(block: string, id: string, value: T, meta: WriteMeta<T>): Promise<StoredRecord<T>> {
  const key = recordKey(block, id);
  const before = meta.previous ?? (await cacheGet<StoredRecord<T>>(key, { memory: false }));
  const record: StoredRecord<T> = {
    value,
    savedAt: new Date().toISOString(),
    source: meta.source,
    freshFor: meta.freshFor,
    revision: (before?.revision ?? 0) + 1,
    ...(meta.season ? { season: meta.season } : {}),
    ...(meta.previous ? { previous: stripPrevious(meta.previous) } : {}),
  };
  await cacheSet(key, record, RECORD_TTL, { memory: false });
  return record;
}

function stripPrevious<T>(r: StoredRecord<T>): RecordMeta & { value: T } {
  const { previous: _drop, ...rest } = r;
  void _drop;
  return rest;
}

/** The stamp half of a record, without its value. */
export function metaOf(record: RecordMeta): RecordMeta {
  return {
    savedAt: record.savedAt,
    source: record.source,
    freshFor: record.freshFor,
    revision: record.revision,
    ...(record.season ? { season: record.season } : {}),
  };
}

export type FreshState = "fresh" | "due" | "stale" | "out-of-season";

const STATE_NOTE: Record<FreshState, string | null> = {
  fresh: null,
  due: "Due for a refresh.",
  stale: "Out of date.",
  "out-of-season": null,
};
const SOURCE_LABEL: Record<string, string> = {
  ai: "written from live local data",
  rules: "from the built-in rules, not written for this place",
  live: "read from live sources",
};

/**
 * Props for the <Freshness> stamp (src/components/Freshness.jsx), worked out
 * on the server. Same rules as the client copy there: fresh within `freshFor`,
 * due within four times that, stale after; a record written in another season
 * is out of season whatever its age.
 */
export function stampProps(
  meta: Pick<RecordMeta, "savedAt" | "source" | "freshFor" | "season">,
  season?: string,
  now = Date.now(),
  // The season word in the reader's words: "autumn" outside the US (the data's
  // names are North American), the months of the quarter in the tropics, where
  // there is no autumn or spring. Callers pass src/lib/region-context's word;
  // the default is the neutral one.
  seasonWord: (s: string) => string = (s) => (s === "Fall" ? "autumn" : s.toLowerCase()),
) {
  const age = (now - new Date(meta.savedAt).getTime()) / 1000;
  const offSeason = !!(meta.season && season && meta.season !== season);
  const state: FreshState = offSeason ? "out-of-season" : age <= meta.freshFor ? "fresh" : age <= 4 * meta.freshFor ? "due" : "stale";
  return {
    savedAt: meta.savedAt,
    sourceLabel: SOURCE_LABEL[meta.source] ?? undefined,
    state,
    note: (offSeason ? `Written in ${seasonWord(meta.season!)}; the season is now ${seasonWord(season!)}.` : null) ?? STATE_NOTE[state],
  };
}

// ---- refresh rate limit ---------------------------------------------------

export const REFRESH_COOLDOWN_SECONDS = 3600;
export const REFRESH_DAILY_LIMIT = 400;
const DAY_TTL = 2 * 24 * 3600;

export type LimitCheck =
  | { ok: true; retryAfterSeconds: 0 }
  | { ok: false; reason: "cooldown" | "daily"; retryAfterSeconds: number; message: string };

const gateKey = (block: string, id: string) => `refresh:gate:${block}:${id}`;
const dayKey = (now = new Date()) => `refresh:day:${now.toISOString().slice(0, 10)}`;

/** May this place's block be refreshed now? Reads only; nothing is reserved. */
export async function checkLimit(block: string, id: string): Promise<LimitCheck> {
  const now = Date.now();
  const [until, used] = await Promise.all([
    cacheGet<number>(gateKey(block, id), { memory: false }),
    cacheGet<number>(dayKey(new Date(now)), { memory: false }),
  ]);
  if (typeof until === "number" && until > now) {
    const retryAfterSeconds = Math.ceil((until - now) / 1000);
    return {
      ok: false,
      reason: "cooldown",
      retryAfterSeconds,
      message: `Refreshed recently; available again in ${Math.ceil(retryAfterSeconds / 60)} minutes.`,
    };
  }
  if ((used ?? 0) >= REFRESH_DAILY_LIMIT) {
    const midnight = new Date(now);
    midnight.setUTCHours(24, 0, 0, 0);
    return {
      ok: false,
      reason: "daily",
      retryAfterSeconds: Math.ceil((midnight.getTime() - now) / 1000),
      message: "Today's refreshes are used up. Try again tomorrow; the previous version is shown.",
    };
  }
  return { ok: true, retryAfterSeconds: 0 };
}

/**
 * Reserve a refresh: closes this place's gate for an hour and counts one
 * against the day. Returns the check that refused it when it may not go ahead.
 */
export async function takeLimit(block: string, id: string): Promise<LimitCheck> {
  const check = await checkLimit(block, id);
  if (!check.ok) return check;
  const now = Date.now();
  const day = dayKey(new Date(now));
  const used = (await cacheGet<number>(day, { memory: false })) ?? 0;
  await Promise.all([
    cacheSet(gateKey(block, id), now + REFRESH_COOLDOWN_SECONDS * 1000, REFRESH_COOLDOWN_SECONDS, { memory: false }),
    cacheSet(day, used + 1, DAY_TTL, { memory: false }),
  ]);
  return check;
}

/** A refresh that failed opens the gate again, so the visitor can retry. The day's count stands. */
export async function releaseLimit(block: string, id: string): Promise<void> {
  await cacheSet(gateKey(block, id), 0, 0, { memory: false });
}
