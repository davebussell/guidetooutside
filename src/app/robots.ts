import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** AI training crawlers and bulk scrapers are asked to stay out; search engines are welcome. */
const BLOCKED = ["GPTBot", "ChatGPT-User", "CCBot", "ClaudeBot", "anthropic-ai", "Google-Extended", "Bytespider", "Amazonbot", "PerplexityBot", "Applebot-Extended", "meta-externalagent", "Diffbot", "omgili", "ImagesiftBot", "AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "DataForSeoBot", "PetalBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...BLOCKED.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
