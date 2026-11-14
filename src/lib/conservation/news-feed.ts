/**
 * Reading the organisations' own articles: a small RSS 2.0 / Atom parser with
 * no dependencies, the fetch (15 s timeout, the site's own User-Agent, four
 * feeds at a time) and the run that keeps one entry per organisation in the
 * store (`news:v1:<org-slug>`) plus one index of the latest across the library
 * (`news:v1:latest`). Used by the daily background function and by
 * scripts/fetch-org-news.ts; nothing on a page imports it.
 *
 * Titles only: an item is a headline, its link, its date and the first image
 * the feed gives for it. Article bodies and excerpts are never stored or
 * shown. Job adverts, office notices and headlines about elections, votes,
 * petitions and lobbying are left out. Links must be http(s) and on the organisation's own domain or the
 * feed's; an item with no date is left out (the site shows the last 180 days
 * only); at most five items per organisation, newest first.
 */
import type { Organisation } from "@/data/conservation";
import { NEWS_DAYS, NEWS_LATEST_KEY, newsKey, type NewsEntry, type NewsItem, type OrgNewsItem } from "./news-types";

export const NEWS_USER_AGENT = "guidetooutside.com feed reader (+https://guidetooutside.com/conservation)";
const TIMEOUT_MS = 15_000;
const PARALLEL = 4;
const PER_ORG = 5;
const LATEST_MAX = 60;
const LATEST_PER_ORG = 2;
const MAX_BYTES = 4_000_000;

// ---- text ----------------------------------------------------------------------

const NAMED: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
  hellip: "…", eacute: "é", egrave: "è", agrave: "à", ccedil: "ç", ouml: "ö", uuml: "ü", auml: "ä", oacute: "ó", aacute: "á", iacute: "í", ntilde: "ñ",
};

function decodeOnce(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const n = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(n) && n > 0 && n < 0x110000 ? String.fromCodePoint(n) : m;
    }
    return NAMED[e.toLowerCase()] ?? m;
  });
}

/** Entities decoded (twice, for feeds that escape an already-escaped title). */
export const decodeEntities = (s: string) => {
  const once = decodeOnce(s);
  return /&(#x[0-9a-f]+|#\d+|[a-z]+);/i.test(once) ? decodeOnce(once) : once;
};

/** The text of a node's inner XML: CDATA unwrapped, entities decoded. */
function innerText(xml: string): string {
  const cdata = xml.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (_, c: string) => c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
  return decodeEntities(cdata);
}

/** A title as plain text: tags stripped (some feeds put markup in titles), whitespace collapsed. */
export function plainTitle(raw: string): string {
  const once = innerText(raw);
  return decodeEntities(once.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** The inner XML of the first `<tag …>…</tag>` (namespaced names allowed). */
function firstTag(xml: string, tag: string): string | null {
  const re = new RegExp(`<${escapeRe(tag)}(?:\\s[^>]*)?>([\\s\\S]*?)</${escapeRe(tag)}>`, "i");
  return re.exec(xml)?.[1] ?? null;
}

/** Every opening (or self-closing) `<tag …>`'s attributes. */
function tagAttrs(xml: string, tag: string): Record<string, string>[] {
  const re = new RegExp(`<${escapeRe(tag)}(\\s[^>]*?)?/?>`, "gi");
  const out: Record<string, string>[] = [];
  for (const m of xml.matchAll(re)) out.push(attrs(m[1] ?? ""));
  return out;
}

function attrs(s: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of s.matchAll(/([\w:-]+)\s*=\s*("([^"]*)"|'([^']*)')/g)) out[m[1].toLowerCase()] = decodeEntities(m[3] ?? m[4] ?? "");
  return out;
}

// ---- items ---------------------------------------------------------------------

export type RawItem = { title: string; link: string; date: string | null; image: string | null };

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)(\?|#|$)/i;

/** Not a picture of the story: emoji sprites, avatars, social-network CDNs, tracking pixels, vector icons. */
const NOT_A_PHOTO = /(^https?:\/\/(s\.w\.org|[^/]*gravatar\.com|[^/]*fbcdn\.net|[^/]*feedburner\.com|[^/]*doubleclick\.net|pixel\.[^/]+|stats\.[^/]+)\/)|\/emoji\/|\.svg(\?|#|$)|[?&](w|width)=1(&|$)|\/(1x1|spacer|pixel)\.(gif|png)/i;

const photo = (u: string | undefined | null): string | null => (u && !NOT_A_PHOTO.test(u) ? u : null);

function itemImage(xml: string): string | null {
  for (const a of tagAttrs(xml, "media:content")) {
    if (a.url && (a.medium === "image" || (a.type ?? "").startsWith("image/") || (!a.medium && !a.type && IMAGE_EXT.test(a.url))) && photo(a.url)) return a.url;
  }
  for (const a of tagAttrs(xml, "media:thumbnail")) if (photo(a.url)) return a.url;
  for (const a of tagAttrs(xml, "enclosure")) if (a.url && (a.type ?? "").startsWith("image/") && photo(a.url)) return a.url;
  for (const tag of ["content:encoded", "description", "content", "summary"]) {
    const body = firstTag(xml, tag);
    if (!body) continue;
    const html = innerText(body);
    // The first picture in the body that is a photograph (not an emoji sprite or a pixel).
    for (const m of html.matchAll(/<img\b[^>]*?\ssrc\s*=\s*("([^"]+)"|'([^']+)')/gi)) {
      const src = photo(decodeEntities(m[2] ?? m[3]));
      if (src) return src;
    }
  }
  return null;
}

function itemLink(xml: string, atom: boolean): string | null {
  const orig = firstTag(xml, "feedburner:origLink");
  if (orig) return innerText(orig).trim();
  if (atom) {
    const links = tagAttrs(xml, "link").filter((a) => a.href);
    const alt = links.find((a) => !a.rel || a.rel === "alternate") ?? null;
    if (alt) return alt.href;
  }
  const rss = firstTag(xml, "link");
  if (rss && innerText(rss).trim()) return innerText(rss).trim();
  const href = tagAttrs(xml, "link").find((a) => a.href && (!a.rel || a.rel === "alternate"));
  if (href) return href.href;
  const guid = /<guid(\s[^>]*)?>([\s\S]*?)<\/guid>/i.exec(xml);
  if (guid && !/ispermalink\s*=\s*["']false/i.test(guid[1] ?? "")) {
    const g = innerText(guid[2]).trim();
    if (/^https?:\/\//.test(g)) return g;
  }
  return null;
}

function itemDate(xml: string): string | null {
  for (const tag of ["pubDate", "published", "updated", "dc:date", "a10:updated"]) {
    const raw = firstTag(xml, tag);
    if (!raw) continue;
    const t = Date.parse(innerText(raw).trim());
    if (Number.isFinite(t)) return new Date(t).toISOString();
  }
  return null;
}

/** Every `<item>` (RSS) or `<entry>` (Atom) in a feed, as headline, link, date and image. */
export function parseFeed(xml: string): RawItem[] {
  const body = xml.replace(/<!--[\s\S]*?-->/g, "");
  const atom = !/<item[\s>]/i.test(body) && /<entry[\s>]/i.test(body);
  const re = atom ? /<entry[\s>][\s\S]*?<\/entry>/gi : /<item[\s>][\s\S]*?<\/item>/gi;
  const out: RawItem[] = [];
  for (const m of body.matchAll(re)) {
    const x = m[0];
    const rawTitle = firstTag(x, "title");
    const link = itemLink(x, atom);
    if (!rawTitle || !link) continue;
    const title = plainTitle(rawTitle);
    if (!title) continue;
    out.push({ title, link, date: itemDate(x), image: itemImage(x) });
  }
  return out;
}

// ---- domains -------------------------------------------------------------------

const bareHost = (u: string): string | null => {
  try {
    const url = new URL(u);
    return url.protocol === "http:" || url.protocol === "https:" ? url.hostname.toLowerCase().replace(/^www\./, "") : null;
  } catch {
    return null;
  }
};

/** A link host is the organisation's or the feed's when it is that host or a subdomain of it. */
export function onDomain(link: string, bases: string[]): boolean {
  const h = bareHost(link);
  if (!h) return false;
  return bases.some((b) => h === b || h.endsWith(`.${b}`) || b.endsWith(`.${h}`));
}

const absolute = (u: string, base: string): string | null => {
  try {
    const url = new URL(u, base);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
};

/**
 * Not news a reader can do anything with: job and internship adverts, office
 * notices and empty placeholder titles, in the languages the library's feeds
 * are written in.
 */
const NOT_NEWS =
  /\b(vacanc(y|ies)|job (opening|posting|vacancy|offer)|jobs? at\b|we('| a)re hiring|now hiring|(is|are) hiring|join (our|the) team|we('| a)re looking for an? |careers?\b|internships?\b|stellen(angebot|ausschreibung|anzeige)|offre d['’]emploi|offres d['’]emploi|recrutement|nous recrutons|on recrute|cdd\b|cdi\b|oferta de (empleo|trabajo)|ofertas de empleo|vacature|ledig(e)? stilling|nabór na stanowisko|offerta di lavoro|godzin(y)? pracy|office (hours|closure|closed)|bureau fermé)/i;
const EMPTY_TITLE = /^(news( just in)?|latest news|update|updates|newsletter|untitled|home|blog|news & events)$/i;
/**
 * Elections, votes, petitions and lobbying: the site lists stewardship, science and education, never politics,
 * so a headline about a vote or a campaign is left out even when the organisation itself is not partisan.
 */
const POLITICS =
  /\b(elections?|electoral|candidates?|mayoral|votes?|voting|voters?|ballots?|referendum|petitions?|lobby(ing)?|MPs|MEPs?|MPPs|MLAs|parliament(ary)?|senators?|congress(wo)?m[ae]n|legislat(ion|ive|ure|or)s?|public hearings?|speak up|take action|write to your|sign (the|our)|open letter|(prime )?ministers?|ministr[ae]|ministre|legal (victory|challenge|action|case)|lawsuits?|court|sues?|judicial|case against|élections?|wahl(en|kampf)?|elecciones|elezioni|verkiezingen)\b/i;

/** A feed's items for an organisation: on its domains, dated, the last 180 days, five newest first. */
export function itemsFor(raw: RawItem[], org: Pick<Organisation, "links">, feedUrl: string, now = Date.now()): NewsItem[] {
  const bases = [bareHost(org.links.home), bareHost(feedUrl)].filter((b): b is string => !!b);
  const cutoff = now - NEWS_DAYS * 86_400_000;
  const seen = new Set<string>();
  const items: NewsItem[] = [];
  for (const r of raw) {
    if (NOT_NEWS.test(r.title) || EMPTY_TITLE.test(r.title.trim()) || POLITICS.test(r.title)) continue;
    const link = absolute(r.link, feedUrl);
    if (!link || !onDomain(link, bases) || !r.date) continue;
    const t = Date.parse(r.date);
    if (!(t >= cutoff) || t > now + 2 * 86_400_000) continue;
    if (seen.has(link)) continue;
    seen.add(link);
    const image = r.image ? absolute(r.image, link) : null;
    items.push({ title: r.title.slice(0, 220), url: link, date: r.date.slice(0, 10), ...(image ? { image } : {}) });
  }
  return items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)).slice(0, PER_ORG);
}

// ---- fetching ------------------------------------------------------------------

export async function fetchFeed(url: string): Promise<{ ok: true; xml: string; finalUrl: string } | { ok: false; error: string }> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ac.signal,
      redirect: "follow",
      headers: { "User-Agent": NEWS_USER_AGENT, Accept: "application/rss+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.5" },
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const buf = await res.arrayBuffer();
    if (buf.byteLength > MAX_BYTES) return { ok: false, error: `too large (${buf.byteLength} bytes)` };
    const xml = new TextDecoder("utf-8").decode(buf);
    if (!/<(rss|feed|rdf:RDF)[\s>]/i.test(xml)) return { ok: false, error: "not a feed" };
    return { ok: true, xml, finalUrl: res.url || url };
  } catch (e) {
    return { ok: false, error: ac.signal.aborted ? "timed out" : e instanceof Error ? e.message : String(e) };
  } finally {
    clearTimeout(timer);
  }
}

async function pool<T, R>(xs: T[], n: number, f: (x: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(xs.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, xs.length) }, async () => {
      while (next < xs.length) {
        const i = next++;
        out[i] = await f(xs[i]);
      }
    }),
  );
  return out;
}

// ---- the run -------------------------------------------------------------------

export type NewsStoreIO = {
  read: (key: string) => Promise<NewsEntry | null>;
  /** Absent for a dry run. */
  write?: (key: string, entry: NewsEntry) => Promise<void>;
  log?: (line: string) => void;
};

export type OrgResult = { slug: string; feed: string; status: "written" | "unchanged" | "failed"; items: number; images: number; error?: string; parsed?: number };

export type NewsRun = {
  results: OrgResult[];
  fetched: number;
  failed: number;
  unchanged: number;
  written: number;
  items: number;
  withImages: number;
  /** Every image host among the kept items, for the Image CDN's remote_images list. */
  imageHosts: string[];
  latest: OrgNewsItem[];
};

const sameItems = (a: NewsItem[] | undefined, b: NewsItem[]) => JSON.stringify(a ?? []) === JSON.stringify(b);

/** Fetch every feed, keep what is new, rebuild the latest index. Never throws for one feed. */
export async function runNewsFetch(orgs: Organisation[], io: NewsStoreIO, opts: { now?: number; budgetMs?: number } = {}): Promise<NewsRun> {
  const now = opts.now ?? Date.now();
  const started = Date.now();
  const withFeed = orgs.filter((o) => o.links.feed);
  const kept = new Map<string, NewsItem[]>();
  const results = await pool(withFeed, PARALLEL, async (o): Promise<OrgResult> => {
    const feed = o.links.feed!;
    const existing = await io.read(newsKey(o.slug)).catch(() => null);
    if (existing?.items) kept.set(o.slug, existing.items);
    if (opts.budgetMs && Date.now() - started > opts.budgetMs) return { slug: o.slug, feed, status: "failed", items: 0, images: 0, error: "out of time" };
    const got = await fetchFeed(feed);
    if (!got.ok) return { slug: o.slug, feed, status: "failed", items: 0, images: 0, error: got.error };
    const raw = parseFeed(got.xml);
    const items = itemsFor(raw, o, got.finalUrl, now);
    kept.set(o.slug, items);
    const images = items.filter((i) => i.image).length;
    if (sameItems(existing?.items, items)) return { slug: o.slug, feed, status: "unchanged", items: items.length, images, parsed: raw.length };
    if (io.write) await io.write(newsKey(o.slug), { fetchedAt: new Date(now).toISOString(), items });
    return { slug: o.slug, feed, status: "written", items: items.length, images, parsed: raw.length };
  });

  // The latest across the library: two per organisation at most, newest first.
  const byOrg = new Map(withFeed.map((o) => [o.slug, o]));
  const cutoff = new Date(now - NEWS_DAYS * 86_400_000).toISOString().slice(0, 10);
  const latest: OrgNewsItem[] = [...kept.entries()]
    .flatMap(([slug, items]) => items.filter((i) => i.date >= cutoff).slice(0, LATEST_PER_ORG).map((i) => ({ ...i, org: { slug, name: byOrg.get(slug)?.name ?? slug } })))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.org.name.localeCompare(b.org.name)))
    .slice(0, LATEST_MAX);
  const prevLatest = await io.read(NEWS_LATEST_KEY).catch(() => null);
  if (io.write && !sameItems(prevLatest?.items, latest)) await io.write(NEWS_LATEST_KEY, { fetchedAt: new Date(now).toISOString(), items: latest });

  const ok = results.filter((r) => r.status !== "failed");
  const all = ok.flatMap((r) => kept.get(r.slug) ?? []);
  const run: NewsRun = {
    results,
    fetched: ok.length,
    failed: results.length - ok.length,
    unchanged: results.filter((r) => r.status === "unchanged").length,
    written: results.filter((r) => r.status === "written").length,
    items: all.length,
    withImages: all.filter((i) => i.image).length,
    imageHosts: [...new Set(all.map((i) => (i.image ? bareHostExact(i.image) : null)).filter((h): h is string => !!h))].sort(),
    latest,
  };
  io.log?.(`[org-news] ${withFeed.length} feeds: ${run.fetched} fetched (${run.written} ${io.write ? "written" : "changed, not written"}, ${run.unchanged} unchanged), ${run.failed} failed; ${run.items} items, ${run.withImages} with images`);
  return run;
}

/** The exact host of an image URL (with www.), for the remote_images list. */
function bareHostExact(u: string): string | null {
  try {
    return new URL(u).hostname.toLowerCase();
  } catch {
    return null;
  }
}

/** The netlify.toml lines for a host list: one exact-host regex per host, https only. */
export function remoteImagesToml(hosts: string[]): string {
  return `[images]\n  remote_images = [\n${hosts.map((h) => `    'https://${h.replace(/\./g, "\\.")}/.*',`).join("\n")}\n  ]`;
}
