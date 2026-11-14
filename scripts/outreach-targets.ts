/**
 * Outreach list: every organisation with an invitation open now, and the
 * indexed pages on the site that feature it (the "who looks after this"
 * feature and the food band's feature on the town pages, and the written
 * stories on the topic pages). Prints JSON to stdout.
 *
 *   npx tsx scripts/outreach-targets.ts > outreach.json
 */
import { KNOWN_PLACES } from "@/lib/geocode";
import { INVITATIONS, STORIES, orgBySlug } from "@/data/conservation";
import { featureFor, isOpen } from "@/lib/conservation/invitations";
import { SECTION_FOOD, SECTION_TOPICS } from "@/lib/conservation/match";
import { foodFeature } from "@/lib/conservation/food";
import { POPULAR_LOCATIONS } from "@/lib/site";
import { INDEXED_PLACE_SECTIONS } from "@/lib/seo/indexing";

type Hit = { path: string; how: "feature" | "food" | "story"; invitation: string; popular: boolean };
const hits = new Map<string, Hit[]>();
const add = (org: string, h: Hit) => hits.set(org, [...(hits.get(org) ?? []), h]);
const popular = new Set(POPULAR_LOCATIONS.map((l) => l.slug));

const SECTIONS = ["gardening", "fishing", "foraging", "ground"] as const;
for (const place of KNOWN_PLACES) {
  for (const s of SECTIONS) {
    if (!INDEXED_PLACE_SECTIONS.includes(s)) continue;
    const f = featureFor(place, SECTION_TOPICS[s]);
    if (f) add(f.org.slug, { path: `/${s}/${place.slug}`, how: "feature", invitation: f.slug, popular: popular.has(place.slug) });
    const roles = SECTION_FOOD[s];
    if (roles) {
      const ff = foodFeature(place, roles, f ? [f.org.slug] : []);
      if (ff) add(ff.org.slug, { path: `/${s}/${place.slug}`, how: "food", invitation: ff.slug, popular: popular.has(place.slug) });
    }
  }
}
for (const st of STORIES) {
  for (const o of st.orgs) add(o, { path: st.path, how: "story", invitation: (st.invitations ?? []).join(","), popular: true });
}

const open = INVITATIONS.filter((i) => isOpen(i));
const orgs = [...new Set(open.map((i) => i.org))];
const out = orgs.map((slug) => {
  const o = orgBySlug(slug)!;
  const invs = open.filter((i) => i.org === slug);
  const h = hits.get(slug) ?? [];
  return {
    slug,
    name: o.name,
    country: o.countryCode ?? null,
    website: o.links.home,
    invitations: invs.map((i) => ({ slug: i.slug, title: i.title, name: i.name, when: i.when, url: i.url })),
    pages: h.length,
    stories: h.filter((x) => x.how === "story").map((x) => x.path),
    sample: [...new Set(h.filter((x) => x.how !== "story").sort((a, b) => Number(b.popular) - Number(a.popular)).map((x) => x.path))].slice(0, 6),
  };
});
console.log(JSON.stringify({ openInvitations: open.length, orgs: out.length, list: out }, null, 1));
