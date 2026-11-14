/**
 * The shape of `/conservation/near.json` (the organisations near a remembered
 * place, for panels on static pages) and the URL the client asks. Types and a
 * URL builder only, so the client bundle carries none of the library.
 */
import type { FeatureInvitation } from "./invitations";

export type NearOrg = {
  org: {
    slug: string;
    name: string;
    shortName?: string;
    network?: string;
    blurb: string;
    asks: string[];
    links: { home: string } & Record<string, string | undefined>;
    /** Its own open invitation near the place (the card's button). */
    invitation?: { slug: string; title: string; url: string; cta: string } | null;
    /** Its newest article (the card's "Latest" line). */
    news?: { title: string; url: string; dateLabel: string } | null;
  };
  tier: number;
  why: string;
};

export type NearAnswer = {
  place: { name: string; label: string; countryCode: string };
  matches: NearOrg[];
  /** When the visitor's ecoregion has a pollinator planting guide from a body in the library. */
  ecoGuide?: { slug: string; name: string; region: string } | null;
  /** The best open invitation for the place and the topics, featured above the cards. */
  feature?: FeatureInvitation | null;
};

export type NearPlace = { slug: string; label?: string | null; lat: number; lon: number };

export function nearUrl(p: NearPlace, opts: { topic?: string[]; species?: string[]; limit?: number }): string {
  const q = new URLSearchParams({ slug: p.slug, lat: p.lat.toFixed(4), lon: p.lon.toFixed(4) });
  if (p.label) q.set("label", p.label);
  if (opts.topic?.length) q.set("topic", opts.topic.join(","));
  if (opts.species?.length) q.set("species", opts.species.join(","));
  if (opts.limit) q.set("limit", String(opts.limit));
  return `/conservation/near.json?${q.toString()}`;
}
