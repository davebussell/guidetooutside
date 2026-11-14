/**
 * The shape of the organisations' news in the store, shared by the reader
 * (./news.ts), the fetcher (./news-feed.ts) and the components. Types and
 * key names only.
 *
 * Keys in the "guides" Blobs store, in the store's usual wrapper
 * (`{ value, expires }`):
 *   news:v1:<org-slug>  → { fetchedAt, items: NewsItem[] }   (≤ 5, newest first)
 *   news:v1:latest      → { fetchedAt, items: OrgNewsItem[] } (≤ 60 across the library, ≤ 2 per organisation)
 */
export type NewsItem = {
  title: string;
  url: string;
  /** ISO date, "2026-10-21". */
  date: string;
  /** The feed's own image URL for the item, when it gives one (shown only through the Image CDN). */
  image?: string;
};

export type OrgNewsItem = NewsItem & { org: { slug: string; name: string } };

export type NewsEntry = { fetchedAt: string; items: NewsItem[] };
export type LatestEntry = { fetchedAt: string; items: OrgNewsItem[] };

/** An item ready to draw: the image (when there is one) already as an Image CDN address. */
export type NewsCard = { title: string; url: string; date: string; dateLabel: string; imageSrc?: string; org: { slug: string; name: string } };

export const NEWS_DAYS = 180;
export const NEWS_LATEST_KEY = "news:v1:latest";
export const newsKey = (slug: string) => `news:v1:${slug}`;
/** Entries outlive a quiet feed: items age out by date (180 days) when read, not by the wrapper. */
export const NEWS_TTL_SECONDS = 400 * 86_400;
