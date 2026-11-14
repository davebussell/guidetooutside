/**
 * The organisations' latest articles, read from the store the daily
 * background function fills (netlify/functions/org-news-background.mts; see
 * ./news-types.ts for the keys). Reads go through the site's cache
 * (src/lib/cache.ts: the live Blobs store in production, read-only from local
 * development with a token, the local disk tier before it), behind a
 * half-hour in-memory copy for the process. Nothing here throws: no entry, a
 * slow store or an organisation without a feed all come back as no news.
 *
 * Images are never hotlinked: an item's image is drawn through the Netlify
 * Image CDN, and only when its host is on the `remote_images` list in
 * netlify.toml (mirrored in ./news-hosts.ts). Local development has no Image
 * CDN, so cards there carry no image.
 */
import { orgBySlug } from "@/data/conservation";
import { cacheGet } from "@/lib/cache";
import { NEWS_IMAGE_HOSTS } from "./news-hosts";
import { orgDisplayName } from "./invitations";
import { NEWS_DAYS, NEWS_LATEST_KEY, newsKey, type LatestEntry, type NewsCard, type NewsEntry, type NewsItem, type OrgNewsItem } from "./news-types";

export type { NewsCard, NewsItem, OrgNewsItem } from "./news-types";

const MEMO_MS = 30 * 60 * 1000;
const memo = new Map<string, { at: number; value: Promise<NewsEntry | LatestEntry | null> }>();

function read<T extends NewsEntry | LatestEntry>(key: string): Promise<T | null> {
  const hit = memo.get(key);
  if (hit && Date.now() - hit.at < MEMO_MS) return hit.value as Promise<T | null>;
  const value = cacheGet<T>(key, { memory: false })
    .then((v) => (v && Array.isArray(v.items) ? v : null))
    .catch(() => null);
  memo.set(key, { at: Date.now(), value });
  return value;
}

const recent = (date: string, now = Date.now()) => date >= new Date(now - NEWS_DAYS * 86_400_000).toISOString().slice(0, 10);

const DATE_FMT = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
/** "21 October 2026". */
export const newsDate = (iso: string) => {
  const t = Date.parse(`${iso.slice(0, 10)}T12:00:00Z`);
  return Number.isFinite(t) ? DATE_FMT.format(t) : iso;
};

const ALLOWED = new Set(NEWS_IMAGE_HOSTS);
const DEV = process.env.NODE_ENV === "development";

/** The Image CDN address for a feed image (640 × 400, cropped, webp), or undefined when it may not be shown. */
export function newsImageSrc(image: string | undefined): string | undefined {
  if (!image || DEV) return undefined;
  try {
    const u = new URL(image);
    if (u.protocol !== "https:" || !ALLOWED.has(u.hostname.toLowerCase())) return undefined;
  } catch {
    return undefined;
  }
  return `/.netlify/images?url=${encodeURIComponent(image)}&w=640&h=400&fit=cover&fm=webp`;
}

const toCard = (i: OrgNewsItem): NewsCard => ({
  title: i.title,
  url: i.url,
  date: i.date,
  dateLabel: newsDate(i.date),
  ...(newsImageSrc(i.image) ? { imageSrc: newsImageSrc(i.image) } : {}),
  org: i.org,
});

/** Countries whose organisations in the library publish in English (and the international bodies, which do too). */
const ENGLISH_CC = new Set(["CA", "US", "GB", "IE", "ZA", "KE", "NG", "GH", "UG", "TZ", "ZW", "ZM", "BW", "NA", "MW", "MT", "RW", "SL", "LR", "GM", "MU", "SC", "LS", "SZ"]);
/** Quebec's bodies write in French. */
const writesEnglish = (slug: string) => {
  const o = orgBySlug(slug);
  if (!o) return false;
  if (o.scope === "international" || !o.countryCode) return true;
  if (o.countryCode === "CA" && o.areas.some((a) => a.kind === "admin1" && a.admin1Codes.length === 1 && a.admin1Codes[0] === "QC")) return false;
  return ENGLISH_CC.has(o.countryCode);
};

const nameOf = (slug: string) => {
  const o = orgBySlug(slug);
  return o ? orgDisplayName(o) : slug;
};

/**
 * The latest items from these organisations, newest first, at most `perOrg`
 * from any one (so a busy newsroom does not fill the row), `limit` in all.
 * Organisations without a feed are skipped without a read.
 */
export async function orgNews(slugs: string[], opts: { limit?: number; perOrg?: number } = {}): Promise<NewsCard[]> {
  const limit = opts.limit ?? 3;
  const perOrg = opts.perOrg ?? 1;
  const wanted = [...new Set(slugs)].filter((s) => !!orgBySlug(s)?.links.feed);
  if (!wanted.length || limit <= 0) return [];
  try {
    const entries = await Promise.all(wanted.map((s) => read<NewsEntry>(newsKey(s))));
    const items: OrgNewsItem[] = entries.flatMap((e, k) =>
      (e?.items ?? [])
        .filter((i) => i && typeof i.title === "string" && typeof i.url === "string" && typeof i.date === "string" && recent(i.date))
        .slice(0, perOrg)
        .map((i: NewsItem) => ({ ...i, org: { slug: wanted[k], name: nameOf(wanted[k]) } })),
    );
    return items
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : wanted.indexOf(a.org.slug) - wanted.indexOf(b.org.slug)))
      .slice(0, limit)
      .map(toCard);
  } catch {
    return [];
  }
}

/** Each organisation's newest item, for its card's "Latest" line. */
export async function latestByOrg(slugs: string[]): Promise<Map<string, NewsCard>> {
  const cards = await orgNews(slugs, { limit: slugs.length, perOrg: 1 });
  return new Map(cards.map((c) => [c.org.slug, c]));
}

/**
 * The newest items across the whole library (the index the fetcher keeps),
 * with the organisations in `prefer` (the ones near the reader) first, then
 * those registered in the reader's `country`, then the ones that write in
 * English (the site's language), newest first within each. `near` says how
 * many of the items came from `prefer`, so a heading only says "near you"
 * when it is true.
 */
export async function latestNews(opts: { limit?: number; prefer?: string[]; country?: string } = {}): Promise<{ items: NewsCard[]; near: number }> {
  const limit = opts.limit ?? 6;
  try {
    const [index, near] = await Promise.all([read<LatestEntry>(NEWS_LATEST_KEY), opts.prefer?.length ? orgNews(opts.prefer, { limit, perOrg: 1 }) : Promise.resolve([])]);
    const rank = (slug: string) => (opts.country && orgBySlug(slug)?.countryCode === opts.country ? 0 : writesEnglish(slug) ? 1 : 2);
    const rest = (index?.items ?? [])
      .filter((i) => i && typeof i.title === "string" && typeof i.url === "string" && i.org?.slug && orgBySlug(i.org.slug) && recent(i.date))
      .map((i, k) => ({ i, k, r: rank(i.org.slug) }))
      .sort((a, b) => a.r - b.r || a.k - b.k)
      .map(({ i }) => ({ ...i, org: { slug: i.org.slug, name: nameOf(i.org.slug) } }))
      .map(toCard);
    // One per organisation first; a second from the same one only when the row would otherwise be short.
    const pool = [...near, ...rest];
    const out: NewsCard[] = [];
    const urls = new Set<string>();
    const orgs = new Set<string>();
    for (const c of pool) {
      if (out.length >= limit) break;
      if (urls.has(c.url) || orgs.has(c.org.slug)) continue;
      urls.add(c.url);
      orgs.add(c.org.slug);
      out.push(c);
    }
    for (const c of pool) {
      if (out.length >= limit) break;
      if (urls.has(c.url)) continue;
      urls.add(c.url);
      out.push(c);
    }
    const nearUrls = new Set(near.map((c) => c.url));
    return { items: out, near: out.filter((c) => nearUrls.has(c.url)).length };
  } catch {
    return { items: [], near: 0 };
  }
}
