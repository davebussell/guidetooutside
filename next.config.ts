import type { NextConfig } from "next";

/**
 * Edge caching on Netlify (cost control, October 2026). Every rendered page is
 * cached at Netlify's edge and in its durable cache, varied by the place
 * cookie, so a page costs one server render per place per cache window
 * instead of one per visitor. Live readings ("Weather read …") can therefore
 * be up to 15 minutes old on place pages and an hour on reference pages.
 * API routes are never cached.
 */
const PLACE_SECTIONS = ["guide", "gardening", "fishing", "foraging", "ground", "homesteading", "resources", "the-day"];

const nextConfig: NextConfig = {
  async headers() {
    const vary = { key: "Netlify-Vary", value: "cookie=gto_place" };
    return [
      {
        source: `/:section(${PLACE_SECTIONS.join("|")})/:slug`,
        headers: [{ key: "Netlify-CDN-Cache-Control", value: "public, s-maxage=900, stale-while-revalidate=86400, durable" }, vary],
      },
      {
        source: `/((?!api/|_next/|kids/|guide$|(?:${PLACE_SECTIONS.join("|")})/).*)`,
        headers: [{ key: "Netlify-CDN-Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=604800, durable" }, vary],
      },
      {
        source: "/kids/:path*",
        headers: [{ key: "Netlify-CDN-Cache-Control", value: "public, s-maxage=86400, stale-while-revalidate=604800, durable" }, vary],
      },
    ];
  },
};

export default nextConfig;
