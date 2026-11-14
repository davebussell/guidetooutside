/**
 * The overview page's four-up panel: for each part of the site (water and
 * fish, gardens, wild plants and land, young people), the best two
 * organisations for the place, no organisation twice, each with the reason it
 * is shown, its first ask, its one way in and the others; above the columns,
 * the best open invitation for the place. With `food`, a compact "Food and
 * growing" strip under the columns: up to three food bodies for the place
 * (community gardens, farms, seed, gleaning, food rescue, markets …), one per
 * role first, none repeated from the columns. Renders nothing when the
 * library has nothing for the place.
 */
import Link from "next/link";
import { featureFor } from "@/lib/conservation/invitations";
import { foodRoleOf, orgsFor, orgsForSections, SECTION_FOOD, SECTION_TOPICS, type MatchPlace, type OrgMatch, type SectionKey } from "@/lib/conservation/match";
import { foodWayFor } from "@/lib/conservation/food-ways";
import { withExtras } from "@/lib/conservation/cards";
import { FOOD_ROLE_LABEL, type FoodRole, type Topic } from "@/data/conservation";
import { NewsLine, OrgWays, primaryWay } from "./OrgCard";
import { InvitationFeature, OutboundButton } from "./InvitationFeature";
import { BAND, DISCLOSURE } from "./OrgsPanel";

/** Up to three food bodies at national level or nearer, one per role first (in the overview's role order), none from the columns. */
function foodStrip(place: MatchPlace, used: string[]): { m: OrgMatch; role: FoodRole }[] {
  const roles = SECTION_FOOD.resources;
  const ranked = orgsFor(place, { foodRoles: roles, exclude: used }).filter((m) => m.tier >= 1);
  const out: { m: OrgMatch; role: FoodRole }[] = [];
  const seen = new Set<FoodRole>();
  for (const m of ranked) {
    const role = foodRoleOf(m.org, roles);
    if (!role || seen.has(role) || out.length >= 3) continue;
    seen.add(role);
    out.push({ m, role });
  }
  for (const m of ranked) {
    if (out.length >= 3) break;
    if (out.some((x) => x.m.org.slug === m.org.slug)) continue;
    out.push({ m, role: foodRoleOf(m.org, roles)! });
  }
  return out;
}

export async function OrgSections({
  place,
  title,
  waters,
  sections,
  id = "who-looks-after",
  more,
  food = false,
}: {
  place: MatchPlace;
  title: string;
  waters?: string[];
  sections?: SectionKey[];
  id?: string;
  /** A closing link, e.g. to the place's get-involved page. */
  more?: { href: string; label: string };
  /** Add the "Food and growing" strip under the columns. */
  food?: boolean;
}) {
  const cols = orgsForSections(place, { sections, waters, per: 2 });
  if (!cols.length) return null;
  const strip = food ? foodStrip(place, cols.flatMap((c) => c.matches.map((m) => m.org.slug))) : [];
  const topics = [...new Set(cols.flatMap((c) => SECTION_TOPICS[c.section]))] as Topic[];
  const feature = featureFor(place, topics);
  const cards = await withExtras(
    [...cols.flatMap((c) => c.matches), ...strip.map((x) => x.m)],
    place,
    feature,
  );
  const extra = new Map(cards.map((c) => [c.org.slug, c.org]));
  return (
    <section className={BAND} aria-labelledby={id}>
      <p className="eyebrow text-moss">Get involved</p>
      <h2 id={id} className="font-display mt-2 max-w-3xl text-3xl leading-[1.1] tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-2 sm:text-base">The organisations working here, closest first, for each part of the outdoors this guide covers. {DISCLOSURE}</p>
      {feature && <InvitationFeature inv={feature} className="mt-8" />}
      <div className={`mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 ${cols.length >= 4 ? "lg:grid-cols-4" : cols.length === 3 ? "lg:grid-cols-3" : ""}`}>
        {cols.map((c) => (
          <div key={c.section} className="min-w-0 border-t-2 border-ink pt-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">{c.title}</h3>
            <ul className="mt-4 grid gap-7">
              {c.matches.map((m) => {
                const org = extra.get(m.org.slug) ?? m.org;
                const p = primaryWay(org, { brief: true });
                return (
                  <li key={m.org.slug} className="min-w-0">
                    <p className="font-display text-xl font-medium leading-snug">
                      <Link href={`/conservation/${m.org.slug}`} className="hover:text-moss">
                        {m.org.name}
                      </Link>
                    </p>
                    <p className="mt-1 text-xs text-ink-2">
                      {m.why}
                      {m.org.network && !m.why.includes(m.org.network.replace(/ International$/, "")) ? ` · ${m.org.network}` : ""}
                    </p>
                    {m.org.asks[0] && <p className="mt-2 text-sm leading-relaxed">{m.org.asks[0]}</p>}
                    {"news" in org && org.news && <NewsLine org={org} news={org.news} className="mt-2" />}
                    <OutboundButton href={p.href} org={m.org.slug} way={p.way} variant="outline" className="mt-3">
                      {p.label}
                    </OutboundButton>
                    <OrgWays org={m.org} skip={p.way} className="mt-2.5" />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {strip.length > 0 && (
        <div className="mt-10 border-t-2 border-ink pt-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">Food and growing</h3>
          <ul className="mt-4 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {strip.map(({ m, role }) => {
              const base = extra.get(m.org.slug) ?? m.org;
              const way = foodWayFor(m.org.slug, role);
              const org = way ? { ...base, primary: { href: way.href, label: way.label, way: "food" } } : base;
              const p = primaryWay(org, { brief: true });
              const ask = way?.hideAsks ? undefined : m.org.asks[0];
              return (
                <li key={m.org.slug} className="min-w-0">
                  <p className="font-display text-xl font-medium leading-snug">
                    <Link href={`/conservation/${m.org.slug}`} className="hover:text-moss">
                      {m.org.name}
                    </Link>
                  </p>
                  <p className="mt-1 text-xs text-ink-2">
                    {m.why} · {FOOD_ROLE_LABEL[role]}
                  </p>
                  {ask && <p className="mt-2 text-sm leading-relaxed">{ask}</p>}
                  <OutboundButton href={p.href} org={m.org.slug} way={p.way} variant="outline" className="mt-3">
                    {p.label}
                  </OutboundButton>
                  <OrgWays org={m.org} skip={p.way} className="mt-2.5" />
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <p className="mt-8 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
        {more && (
          <Link href={more.href} className="font-medium text-moss underline-offset-2 hover:underline">
            {more.label} →
          </Link>
        )}
        <Link href={`/conservation${place.countryCode ? `?country=${place.countryCode}` : ""}`} className="text-moss underline-offset-2 hover:underline">
          All organisations in your region →
        </Link>
      </p>
    </section>
  );
}
