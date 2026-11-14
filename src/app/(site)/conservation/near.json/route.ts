/**
 * The organisations near a remembered place, as JSON, for the panels on
 * static pages (wildlife and zone pages are pre-rendered, so they cannot read
 * the place cookie on the server; `NearbyOrgs` asks here from the browser).
 *
 * GET /conservation/near.json?slug=ottawa-ontario&lat=45.42&lon=-75.7&label=Ottawa,%20Ontario
 *     &topic=fish,water&species=walleye&limit=3
 *     [&only=place]  → just the resolved place
 *     [&invites=3&family=1&fromHome=1&openOnly=1]  → the place's open invitations for the topics
 *
 * The place is resolved without the network (the pre-built towns, the
 * geocode cache, else the point and the label); nothing here geocodes. The
 * answer carries the best open invitation for the place and topics, and each
 * organisation's own invitation and newest article, as the panel draws them.
 */
import type { NextRequest } from "next/server";
import { TOPICS, type Topic } from "@/data/conservation";
import { panelFor } from "@/lib/conservation/cards";
import { ecoGuideFor } from "@/lib/conservation/eco-guide";
import { invitationsFor, toFeature } from "@/lib/conservation/invitations";
import { orgsFor } from "@/lib/conservation/match";
import type { NearAnswer } from "@/lib/conservation/near";
import { resolveVisitor } from "@/lib/conservation/visitor";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams;
  const slug = q.get("slug") ?? "";
  const lat = Number(q.get("lat"));
  const lon = Number(q.get("lon"));
  if (!/^[a-z0-9-]{2,120}$/.test(slug) || !q.has("lat") || !q.has("lon") || !Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return Response.json({ error: "slug, lat and lon are required" }, { status: 400 });
  }
  const label = (q.get("label") ?? "").slice(0, 120);
  const topic = (q.get("topic") ?? "").split(",").filter((t): t is Topic => (TOPICS as string[]).includes(t));
  const species = (q.get("species") ?? "").split(",").filter((s) => /^[a-z0-9-]{2,60}$/.test(s)).slice(0, 8);
  const limit = Math.min(6, Math.max(1, Number(q.get("limit")) || 3));

  const place = await resolveVisitor({ slug, label, lat, lon });
  // `invites=3` (with `fromHome`, `family`, `openOnly`): the town's open invitations for the topics, for the season band.
  const invites = Math.min(6, Math.max(0, Number(q.get("invites")) || 0));
  if (invites) {
    const list = invitationsFor(place, {
      topics: topic.length ? topic : undefined,
      fromHome: q.get("fromHome") === "1",
      family: q.get("family") === "1",
      openOnly: q.get("openOnly") === "1",
      limit: invites,
    }).map((m) => toFeature(m));
    return Response.json({ place: { name: place.name, label: place.label, countryCode: place.countryCode }, invitations: list }, { headers: { "Cache-Control": "public, max-age=600" } });
  }
  // `only=place`: just the resolved place (its country), for the story steps on static pages.
  if (q.get("only") === "place") {
    return Response.json({ place: { name: place.name, label: place.label, countryCode: place.countryCode } }, { headers: { "Cache-Control": "public, max-age=600" } });
  }
  const matches = orgsFor(place, { topic: topic.length ? topic : undefined, species, limit });
  const ecoGuide = topic.includes("pollinators") ? ecoGuideFor(place) : null;
  // A lede that names the planting guide's publisher should find it among the cards: it takes
  // the place after the closest body (the national partner, when there is one, stays last).
  if (ecoGuide && !matches.some((m) => m.org.slug === ecoGuide.slug)) {
    const theirs = orgsFor(place, { topic, species }).find((m) => m.org.slug === ecoGuide.slug);
    if (theirs) {
      const keepLast = matches.length >= limit && matches[matches.length - 1].tier <= 1;
      const pool = keepLast ? matches.slice(0, -1) : matches.slice();
      const merged = [...pool.slice(0, 1), theirs, ...pool.slice(1)].slice(0, keepLast ? limit - 1 : limit);
      matches.splice(0, matches.length, ...merged, ...(keepLast ? [matches[matches.length - 1]] : []));
    }
  }
  // The featured invitation and each card's own invitation and newest article.
  const panel = await panelFor(matches, place, topic.length ? topic : undefined);
  const body: NearAnswer = {
    place: { name: place.name, label: place.label, countryCode: place.countryCode },
    matches: matches.map((m, i) => ({
      org: {
        slug: m.org.slug,
        name: m.org.name,
        ...(m.org.shortName ? { shortName: m.org.shortName } : {}),
        network: m.org.network,
        blurb: m.org.blurb,
        asks: m.org.asks.slice(0, 3),
        links: m.org.links,
        invitation: panel.cards[i]?.org.invitation ?? null,
        news: panel.cards[i]?.org.news ?? null,
      },
      tier: m.tier,
      why: m.why,
    })),
    ecoGuide,
    feature: panel.feature,
  };
  return Response.json(body, { headers: { "Cache-Control": "public, max-age=600" } });
}
