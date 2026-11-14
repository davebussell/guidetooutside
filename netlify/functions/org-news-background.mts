/**
 * Background (up to 15 minutes), started each day by org-news.mts: reads the
 * RSS or Atom feed of every library organisation that has one (`links.feed`),
 * four at a time with a 15-second timeout, keeps the headline, link, date and
 * first image of the last 180 days' items on the organisation's own domain
 * (five at most, newest first), and writes `news:v1:<slug>` only when the
 * items changed, then the `news:v1:latest` index across the library. Titles
 * only: article bodies are never stored. One line of summary in the log.
 */
import { ORGANISATIONS } from "../../src/data/conservation";
import { cacheGet, cacheSet } from "../../src/lib/cache";
import { runNewsFetch } from "../../src/lib/conservation/news-feed";
import { NEWS_TTL_SECONDS, type NewsEntry } from "../../src/lib/conservation/news-types";

const BUDGET_MS = 13 * 60 * 1000;

const orgNewsBackground = async (req: Request) => {
  if (process.env.WARM_SECRET && req.headers.get("x-warm-secret") !== process.env.WARM_SECRET) return new Response("forbidden", { status: 403 });
  const run = await runNewsFetch(
    ORGANISATIONS,
    {
      read: (key) => cacheGet<NewsEntry>(key, { memory: false }),
      write: (key, entry) => cacheSet(key, entry, NEWS_TTL_SECONDS, { memory: false }),
      log: (line) => console.log(line),
    },
    { budgetMs: BUDGET_MS },
  );
  const failed = run.results.filter((r) => r.status === "failed");
  if (failed.length) console.log(`[org-news] failed: ${failed.map((r) => `${r.slug} (${r.error})`).join("; ")}`);
  return new Response(`fetched ${run.fetched}, written ${run.written}, unchanged ${run.unchanged}, failed ${run.failed}`);
};

export default orgNewsBackground;
