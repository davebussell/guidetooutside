/**
 * The shared cache: Netlify Blobs store "guides", in front of it an
 * in-memory tier for a warm instance, and for local development a disk tier
 * under `.cache/`.
 *
 * Every entry is stored in the same wrapper the live site has always written,
 * `{ "value": …, "expires": <ms epoch> }`, so the rebuilt site reads the
 * climate, forecast, waters and stored guides that already exist.
 *
 *  - Deployed on Netlify: memory → Blobs (read and write).
 *  - Local dev with NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID: memory → disk →
 *    the live Blobs store, read only. Writes go to the disk tier, so testing
 *    can never corrupt production data — unless CACHE_WRITE_LIVE=1.
 *  - Local dev without them: memory → disk.
 *
 * `{ memory: false }` skips the in-memory tier (rate limits and other values
 * that other instances change).
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

export type CacheOpts = { memory?: boolean };
type Wrapped = { value: unknown; expires: number };
type BlobStore = {
  get(key: string, opts: { type: "json" }): Promise<unknown>;
  setJSON(key: string, value: unknown): Promise<unknown>;
  delete(key: string): Promise<unknown>;
};

const STORE = "guides";
const DEV = process.env.NODE_ENV === "development";
const LIVE_TOKEN = process.env.NETLIFY_AUTH_TOKEN;
const LIVE_SITE = process.env.NETLIFY_SITE_ID;
/** Local dev reading the live store with a personal token. */
const REMOTE = DEV && !!LIVE_TOKEN && !!LIVE_SITE;
const WRITE_LIVE = process.env.CACHE_WRITE_LIVE === "1";
const DISK = DEV || process.env.CACHE_DISK === "1";
const DISK_DIR = path.join(process.cwd(), ".cache", "blobs");
const READ_BUDGET_MS = 8000;

// ---- memory ---------------------------------------------------------------

const MEM_MAX = 5000;
const mem = new Map<string, Wrapped>();
function memGet(key: string): Wrapped | null {
  const w = mem.get(key);
  if (!w) return null;
  if (w.expires <= Date.now()) {
    mem.delete(key);
    return null;
  }
  return w;
}
function memSet(key: string, w: Wrapped) {
  mem.delete(key);
  mem.set(key, w);
  if (mem.size > MEM_MAX) {
    const oldest = mem.keys().next().value;
    if (oldest !== undefined) mem.delete(oldest);
  }
}

// ---- blobs ----------------------------------------------------------------

let storePromise: Promise<BlobStore | null> | null = null;
function blobStore(): Promise<BlobStore | null> {
  if (!storePromise) {
    storePromise = (async () => {
      try {
        const { getStore } = await import("@netlify/blobs");
        if (REMOTE) return getStore({ name: STORE, siteID: LIVE_SITE!, token: LIVE_TOKEN! }) as unknown as BlobStore;
        // Development without a token has no store; production finds the
        // Netlify context on its own (and throws without one, e.g. a local build).
        if (DEV) return null;
        return getStore({ name: STORE, consistency: "strong" }) as unknown as BlobStore;
      } catch {
        return null;
      }
    })();
  }
  return storePromise;
}
/** May this process write to the Blobs store? Never from local dev unless asked. */
const blobWritable = () => !REMOTE || WRITE_LIVE;

function withBudget<T>(p: Promise<T>, ms: number): Promise<T | null> {
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve(null), ms);
    p.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      () => {
        clearTimeout(t);
        resolve(null);
      },
    );
  });
}

function asWrapped(raw: unknown): Wrapped | null {
  if (!raw || typeof raw !== "object") return null;
  const w = raw as Partial<Wrapped>;
  if (typeof w.expires !== "number" || !("value" in w)) return null;
  return w as Wrapped;
}

// ---- disk -----------------------------------------------------------------

const diskFile = (key: string) => path.join(DISK_DIR, `${encodeURIComponent(key)}.json`);
async function diskGet(key: string): Promise<Wrapped | null> {
  if (!DISK) return null;
  try {
    return asWrapped(JSON.parse(await readFile(diskFile(key), "utf8")));
  } catch {
    return null;
  }
}
async function diskSet(key: string, w: Wrapped) {
  if (!DISK) return;
  try {
    await mkdir(DISK_DIR, { recursive: true });
    await writeFile(diskFile(key), JSON.stringify(w));
  } catch {
    /* a read-only file system: the memory tier still holds it */
  }
}
async function diskDelete(key: string) {
  if (!DISK) return;
  try {
    await rm(diskFile(key), { force: true });
  } catch {
    /* ignore */
  }
}

// ---- API ------------------------------------------------------------------

export async function cacheGet<T>(key: string, opts: CacheOpts = {}): Promise<T | null> {
  const useMem = opts.memory !== false;
  if (useMem) {
    const hit = memGet(key);
    if (hit) return hit.value as T;
  }
  const now = Date.now();
  const disk = await diskGet(key);
  if (disk) {
    if (disk.expires > now) {
      if (useMem) memSet(key, disk);
      return disk.value as T;
    }
    // A local write that has expired shadows nothing; fall through to the store.
  }
  const store = await blobStore();
  if (store) {
    const w = asWrapped(await withBudget(store.get(key, { type: "json" }), READ_BUDGET_MS));
    if (w && w.expires > now) {
      if (useMem) memSet(key, w);
      return w.value as T;
    }
  }
  return null;
}

export async function cacheSet(key: string, value: unknown, ttlSeconds: number, opts: CacheOpts = {}): Promise<void> {
  const wrapped: Wrapped = { value, expires: Date.now() + ttlSeconds * 1000 };
  if (opts.memory !== false) memSet(key, wrapped);
  else mem.delete(key);
  const store = await blobStore();
  if (store && blobWritable()) {
    try {
      await store.setJSON(key, wrapped);
      return;
    } catch {
      /* fall through to disk in development */
    }
  }
  await diskSet(key, wrapped);
}

export async function cacheDelete(key: string): Promise<void> {
  mem.delete(key);
  await diskDelete(key);
  const store = await blobStore();
  if (store && blobWritable()) {
    try {
      await store.delete(key);
    } catch {
      /* ignore */
    }
  }
}
