/**
 * /conservation — the hub: what the library is, the organisations near the
 * visitor's remembered town, and the whole library by continent and country,
 * filtered by topic (chips) and country (a select), with counts in the
 * headings. Above them, the open invitations (the best one featured, a row of
 * cards, the rest listed; filtered by the same topic chips; near the
 * visitor's town when it is known) and the latest articles from the
 * organisations' own sites (near-you first).
 *
 * The filters are query parameters (?topic=water&country=CA), so every view
 * is a plain link that works without script. Reading them makes the route
 * dynamic; nothing here fetches (the library is in memory), and the "near
 * you" block, which reads the place cookie, streams in behind its own
 * Suspense boundary. Netlify's edge caches each view for an hour by URL and
 * place cookie (next.config.ts).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { FOOD_ROLES, FOOD_ROLE_LABEL, ORGANISATIONS, TOPICS, TOPIC_LABEL, type FoodRole, type Organisation, type Topic } from "@/data/conservation";
import { orgsFor } from "@/lib/conservation/match";
import { invitationsFor, toFeature, type FeatureInvitation } from "@/lib/conservation/invitations";
import { latestNews } from "@/lib/conservation/news";
import { withExtras } from "@/lib/conservation/cards";
import { HUB_CONTINENT_LABEL, continentOfCountry, countryLabel, countryWords, hubContinent, scopeLine, type HubContinent } from "@/lib/conservation/geo-words";
import { visitorPlace } from "@/lib/conservation/visitor";
import { shareCard } from "@/lib/site";
import { countryServed } from "@/lib/scope";
import { LocationSearch } from "@/components/LocationSearch";
import { OrgCard } from "@/components/conservation/OrgCard";
import { DISCLOSURE } from "@/components/conservation/OrgsPanel";
import { CountrySelect, type CountryGroup } from "@/components/conservation/CountrySelect";
import { DateChip, InvitationCard, InvitationFeature } from "@/components/conservation/InvitationFeature";
import { OrgNews } from "@/components/conservation/OrgNews";

const TITLE = "Conservation organisations near you";
const DESCRIPTION =
  "The river keepers, bird and pollinator societies, land trusts, botanic gardens and youth programmes that look after the places this guide covers, matched to your town. Registered charities and public bodies only.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/conservation" },
  ...shareCard(TITLE, DESCRIPTION, "/conservation"),
};

type Search = { topic?: string | string[]; country?: string | string[]; all?: string | string[]; role?: string | string[] };

const CONTINENT_ORDER: HubContinent[] = ["north-america", "europe", "africa", "international"];
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** An organisation works in a country when it is registered there or one of its country areas names it. */
const worksIn = (o: Organisation, cc: string) => o.countryCode === cc || o.areas.some((a) => a.kind === "country" && a.countries.includes(cc));

function hubHref(topic?: string, country?: string, role?: string) {
  const q = new URLSearchParams();
  if (topic) q.set("topic", topic);
  if (topic === "food" && role) q.set("role", role);
  if (country) q.set("country", country);
  const qs = q.toString();
  return `/conservation${qs ? `?${qs}` : ""}#library`;
}

async function NearYou() {
  const place = await visitorPlace();
  if (!place) {
    return (
      <div className="card p-6 sm:p-8">
        <p className="eyebrow text-moss">Near you</p>
        <h2 className="font-display mt-1 text-2xl sm:text-3xl tracking-tight">The organisations working where you live</h2>
        <p className="mt-1.5 max-w-2xl text-sm text-ink-2">Enter your town and the organisations nearest to it come first: the keeper of your river, the naturalists&apos; club, the province, state or national body.</p>
        <div className="mt-4 max-w-xl">
          <LocationSearch />
        </div>
      </div>
    );
  }
  const matches = await withExtras(orgsFor(place, { limit: 6 }), place);
  return (
    <div>
      <p className="eyebrow text-moss">Near you</p>
      <h2 className="font-display mt-1 text-2xl sm:text-3xl tracking-tight">The organisations working near {place.name}</h2>
      <p className="mt-1.5 max-w-2xl text-sm text-ink-2">
        Closest first: the bodies that cover {place.name} itself, then the {place.countryCode === "CA" ? "province" : place.countryCode === "US" ? "state" : "region"} and the national ones.{" "}
        <Link href={`/resources/${place.slug}`} className="text-moss underline-offset-2 hover:underline">
          Get involved near {place.name} →
        </Link>
      </p>
      {matches.length ? (
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((m) => (
            <OrgCard key={m.org.slug} org={m.org} why={m.why} compact />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-ink-2">The library has no organisation for {place.name} yet; the national and international bodies are listed below.</p>
      )}
    </div>
  );
}

function invitesHref(topic?: string, all?: boolean) {
  const q = new URLSearchParams();
  if (topic) q.set("topic", topic);
  if (all) q.set("all", "1");
  const qs = q.toString();
  return `/conservation${qs ? `?${qs}` : ""}#invitations`;
}

/** The open invitations: near the remembered town when there is one (or everywhere, on request), else everywhere. */
async function OpenInvitations({ topic, all }: { topic?: Topic; all: boolean }) {
  const place = all ? null : await visitorPlace();
  const pool = invitationsFor(place, { anywhere: !place });
  const topicsWith = TOPICS.filter((t) => pool.some((m) => m.invitation.topics.includes(t)));
  const list: FeatureInvitation[] = (topic ? pool.filter((m) => m.invitation.topics.includes(topic)) : pool).map((m) => toFeature(m, { showWhere: !place }));
  if (!pool.length) return null;
  const [first, ...rest] = list;
  const row = rest.slice(0, 3);
  const more = rest.slice(3, 15);
  return (
    <div>
      <p className="eyebrow text-moss">Open invitations</p>
      <h2 className="font-display mt-1 text-3xl tracking-tight sm:text-4xl">{place ? `Things to do now, near ${place.name}` : "Things to do now"}</h2>
      <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-ink-2 sm:text-base">
        Counts, surveys, cleanups and planting days the organisations in the library are asking people to join, open now or opening soon; each button opens their own page.{" "}
        {place ? (
          <Link href={invitesHref(topic, true)} className="text-moss underline-offset-2 hover:underline">
            Every open invitation, anywhere →
          </Link>
        ) : null}
      </p>
      {topicsWith.length > 1 && (
        <nav aria-label="Invitations by subject" className="mt-5 flex flex-wrap gap-2">
          <Link
            href={invitesHref(undefined, all)}
            aria-current={!topic ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition ${!topic ? "border-moss bg-moss text-on-moss" : "border-edge bg-surface hover:border-moss hover:text-moss"}`}
          >
            All subjects
          </Link>
          {topicsWith.map((t) => {
            const on = t === topic;
            return (
              <Link
                key={t}
                href={invitesHref(on ? undefined : t, all)}
                aria-current={on ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition ${on ? "border-moss bg-moss text-on-moss" : "border-edge bg-surface hover:border-moss hover:text-moss"}`}
              >
                {TOPIC_LABEL[t]}
              </Link>
            );
          })}
        </nav>
      )}
      {!first ? (
        <p className="mt-6 rounded-tile border border-line bg-paper-2/60 p-4 text-sm text-ink-2">
          Nothing open on {topic ? TOPIC_LABEL[topic].toLowerCase() : "this"} {place ? `near ${place.name}` : ""} just now.{" "}
          <Link href={invitesHref(undefined, all)} className="text-moss underline-offset-2 hover:underline">
            Every subject
          </Link>
        </p>
      ) : (
        <>
          <InvitationFeature inv={first} headingLevel="h3" className="mt-6" />
          {row.length > 0 && (
            <div className={`mt-5 grid gap-5 ${row.length > 1 ? "md:grid-cols-2" : "max-w-xl"} ${row.length > 2 ? "lg:grid-cols-3" : ""}`}>
              {row.map((inv) => (
                <InvitationCard key={inv.slug} inv={inv} />
              ))}
            </div>
          )}
          {more.length > 0 && (
            <div className="mt-8 border-t-2 border-ink pt-4">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">Also open · {more.length}</h3>
              <ul className="mt-3 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                {more.map((inv) => (
                  <li key={inv.slug} className="min-w-0">
                    <a
                      href={inv.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-gto-out="org"
                      data-gto-org={inv.org.slug}
                      data-gto-way="invitation"
                      className="font-medium leading-snug underline-offset-2 hover:text-moss hover:underline"
                    >
                      {inv.title}
                      <span aria-hidden="true"> ↗</span>
                    </a>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-2">
                      <DateChip window={inv.window} className="!px-2 !py-0.5 !text-[11px]" />
                      <Link href={`/conservation/${inv.org.slug}`} className="hover:text-moss">
                        {inv.org.name}
                      </Link>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/** The latest articles from the organisations' own sites, the ones near the remembered town first. */
async function LatestFromOrgs() {
  const place = await visitorPlace();
  const prefer = place ? orgsFor(place, { limit: 12 }).map((m) => m.org.slug) : [];
  const { items, near } = await latestNews({ limit: 6, prefer, country: place?.countryCode || undefined });
  return (
    <OrgNews
      items={items}
      max={6}
      headingLevel="h2"
      eyebrow="From their own sites"
      heading={place && near > 0 ? `Latest from the organisations near ${place.name}` : "Latest from the organisations"}
      id="latest-news"
    />
  );
}

function InvitationsSkeleton() {
  return (
    <div aria-busy="true" className="animate-pulse">
      <div className="h-3 w-28 rounded bg-line" />
      <div className="mt-3 h-8 w-1/2 rounded bg-line" />
      <div className="card mt-6 h-80" />
    </div>
  );
}

function NearYouSkeleton() {
  return (
    <div aria-busy="true" className="animate-pulse">
      <div className="h-3 w-20 rounded bg-line" />
      <div className="mt-3 h-7 w-2/3 rounded bg-line" />
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="card h-40" />
        <div className="card h-40" />
        <div className="card h-40" />
      </div>
    </div>
  );
}

export default async function ConservationHub({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const topicParam = one(sp.topic);
  const topic = (TOPICS as string[]).includes(topicParam ?? "") ? (topicParam as Topic) : undefined;
  // The countries the library can be filtered by: the served ones only (src/lib/scope.ts), whatever an international body's record names.
  const allCountries = [...new Set(ORGANISATIONS.flatMap((o) => [o.countryCode, ...o.areas.flatMap((a) => (a.kind === "country" ? a.countries : []))]).filter((c): c is string => !!c))].filter((c) =>
    countryServed(c),
  );
  const countryParam = one(sp.country)?.toUpperCase();
  const country = countryParam && allCountries.includes(countryParam) ? countryParam : undefined;

  // Under "Food and growing", a role narrows it further (?topic=food&role=community-gardens).
  const roleParam = one(sp.role);
  const role = topic === "food" && (FOOD_ROLES as string[]).includes(roleParam ?? "") ? (roleParam as FoodRole) : undefined;
  const hasRole = (o: Organisation) => !role || !!o.foodRoles?.includes(role);

  const byCountry = country ? ORGANISATIONS.filter((o) => worksIn(o, country)) : ORGANISATIONS;
  const shown = topic ? byCountry.filter((o) => o.topics.includes(topic) && hasRole(o)) : byCountry;
  const registeredIn = new Set(ORGANISATIONS.map((o) => o.countryCode).filter(Boolean));

  // continent → country → organisations; a country filter files everything under that country.
  const groups = new Map<HubContinent, Map<string, Organisation[]>>();
  for (const o of shown) {
    const cont = country ? (o.scope === "international" ? "international" : continentOfCountry(country)) : hubContinent(o);
    const cc = cont === "international" ? "INTL" : country ?? o.countryCode!;
    if (!groups.has(cont)) groups.set(cont, new Map());
    const m = groups.get(cont)!;
    m.set(cc, [...(m.get(cc) ?? []), o]);
  }

  // The country select: every country with an organisation registered there or working there.
  const countryGroups: CountryGroup[] = CONTINENT_ORDER.filter((c) => c !== "international")
    .map((cont) => ({
      label: HUB_CONTINENT_LABEL[cont],
      options: allCountries
        .filter((cc) => continentOfCountry(cc) === cont)
        .map((cc) => ({ code: cc, label: countryLabel(cc), count: ORGANISATIONS.filter((o) => worksIn(o, cc) && (!topic || o.topics.includes(topic)) && hasRole(o)).length }))
        .filter((o) => o.count > 0)
        .sort((a, b) => a.label.localeCompare(b.label)),
    }))
    .filter((g) => g.options.length);

  const total = ORGANISATIONS.length;
  const nCountries = registeredIn.size;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <p className="eyebrow text-moss">Get involved</p>
      <h1 className="font-display mt-1 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">The people looking after the places in this guide</h1>
      <div className="mt-4 max-w-3xl space-y-3 text-lg leading-relaxed text-ink-2">
        <p>
          Every river, wood and patch of grassland on these pages has someone looking after it: a keeper on the river, a trust buying and mending land, a society
          counting birds or bees, a botanic garden saving seed, a club taking children out to look. This is our library of them, {total} organisations in {nCountries}{" "}
          countries and the international networks they belong to, matched to the town you are reading about.
        </p>
        <p className="text-base">
          We list registered charities and public bodies only, each checked against its own pages and a public register or its network&apos;s member list, and we
          receive nothing from anything you give. Their names link to a page here; their own websites open in a new tab.
        </p>
      </div>

      <section id="invitations" className="mt-12 scroll-mt-24">
        <Suspense fallback={<InvitationsSkeleton />}>
          <OpenInvitations topic={topic} all={!!one(sp.all)} />
        </Suspense>
      </section>

      <div className="mt-14 scroll-mt-24 empty:hidden">
        <Suspense fallback={null}>
          <LatestFromOrgs />
        </Suspense>
      </div>

      <section id="near-you" className="mt-14 scroll-mt-24">
        <Suspense fallback={<NearYouSkeleton />}>
          <NearYou />
        </Suspense>
      </section>

      <section id="library" className="mt-16 scroll-mt-24">
        <p className="eyebrow">The library</p>
        <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          {role ? `${TOPIC_LABEL.food}: ${FOOD_ROLE_LABEL[role].toLowerCase()}` : topic ? TOPIC_LABEL[topic] : "Every organisation"}
          {country ? ` in ${countryWords(country)}` : ""} <span className="text-ink-2 text-2xl font-normal sm:text-3xl">· {shown.length}</span>
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-2">By continent and country, then by name. Choose a subject or a country to narrow the list. {DISCLOSURE}</p>

        <nav aria-label="Filter by subject" className="mt-6 flex flex-wrap gap-2">
          <Link
            href={hubHref(undefined, country)}
            aria-current={!topic ? "page" : undefined}
            className={`inline-flex min-h-11 items-center gap-1 rounded-full border px-4 text-sm transition ${!topic ? "border-moss bg-moss text-on-moss" : "border-edge bg-surface hover:border-moss hover:text-moss"}`}
          >
            All subjects <span className={`text-xs ${!topic ? "text-on-moss" : "text-ink-2"}`}>{byCountry.length}</span>
          </Link>
          {TOPICS.map((t) => {
            const n = byCountry.filter((o) => o.topics.includes(t)).length;
            if (!n) return null;
            const on = t === topic;
            return (
              <Link
                key={t}
                href={hubHref(on ? undefined : t, country)}
                aria-current={on ? "page" : undefined}
                className={`inline-flex min-h-11 items-center gap-1 rounded-full border px-4 text-sm transition ${on ? "border-moss bg-moss text-on-moss" : "border-edge bg-surface hover:border-moss hover:text-moss"}`}
              >
                {TOPIC_LABEL[t]} <span className={`text-xs ${on ? "text-on-moss" : "text-ink-2"}`}>{n}</span>
              </Link>
            );
          })}
        </nav>
        {topic === "food" && (
          <nav aria-label="Food and growing: filter by what they do" className="mt-3 flex flex-wrap gap-2 border-l-2 border-gold-fill pl-3">
            <Link
              href={hubHref("food", country)}
              aria-current={!role ? "page" : undefined}
              className={`inline-flex min-h-11 items-center gap-1 rounded-full border px-4 text-sm transition ${!role ? "border-gold bg-gold-soft text-ink" : "border-edge bg-surface hover:border-moss hover:text-moss"}`}
            >
              All food and growing <span className="text-xs text-ink-2">{byCountry.filter((o) => o.topics.includes("food")).length}</span>
            </Link>
            {FOOD_ROLES.map((r) => {
              const n = byCountry.filter((o) => o.topics.includes("food") && o.foodRoles?.includes(r)).length;
              if (!n) return null;
              const on = r === role;
              return (
                <Link
                  key={r}
                  href={hubHref("food", country, on ? undefined : r)}
                  aria-current={on ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center gap-1 rounded-full border px-4 text-sm transition ${on ? "border-gold bg-gold-soft text-ink" : "border-edge bg-surface hover:border-moss hover:text-moss"}`}
                >
                  {FOOD_ROLE_LABEL[r]} <span className="text-xs text-ink-2">{n}</span>
                </Link>
              );
            })}
          </nav>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <CountrySelect key={`${country ?? ""}|${topic ?? ""}|${role ?? ""}`} groups={countryGroups} value={country} topic={topic} role={role} />
          {(topic || country) && (
            <Link href="/conservation#library" className="text-sm text-moss underline-offset-2 hover:underline">
              Clear the filters
            </Link>
          )}
        </div>

        {shown.length === 0 && (
          <p className="mt-8 rounded-tile border border-line bg-paper-2/60 p-4 text-sm text-ink-2">
            No organisation in the library works on {role ? FOOD_ROLE_LABEL[role].toLowerCase() : topic ? TOPIC_LABEL[topic].toLowerCase() : "this"}
            {country ? ` in ${countryWords(country)}` : ""} yet.{" "}
            <Link href={hubHref(undefined, country)} className="text-moss underline-offset-2 hover:underline">
              Every subject{country ? ` in ${countryWords(country)}` : ""}
            </Link>
          </p>
        )}

        <div className="mt-10 grid gap-14">
          {CONTINENT_ORDER.filter((c) => groups.has(c)).map((cont) => {
            const countries = [...groups.get(cont)!.entries()].sort((a, b) => countryLabel(a[0]).localeCompare(countryLabel(b[0])));
            const n = countries.reduce((s, [, l]) => s + l.length, 0);
            return (
              <section key={cont} aria-labelledby={`cont-${cont}`}>
                <h2 id={`cont-${cont}`} className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {HUB_CONTINENT_LABEL[cont]} <span className="text-ink-2 text-xl font-normal">· {n}</span>
                </h2>
                <div className="mt-6 grid gap-10">
                  {countries.map(([cc, list]) => (
                    <div key={cc} id={cc === "INTL" ? undefined : `country-${cc}`} className="scroll-mt-24 border-t-2 border-ink pt-4">
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">
                        {cc === "INTL" ? "International networks and bodies" : countryLabel(cc)} · {list.length}
                      </h3>
                      <ul className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                        {list
                          .slice()
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((o) => (
                            <li key={o.slug} className="min-w-0">
                              <Link href={`/conservation/${o.slug}`} className="font-medium leading-snug hover:text-moss">
                                {o.name}
                              </Link>
                              <p className="mt-0.5 line-clamp-2 text-xs text-ink-2">
                                {[o.countryCode && cc !== "INTL" && o.countryCode !== cc ? `From ${countryWords(o.countryCode)}` : null, scopeLine(o), o.network]
                                  .filter(Boolean)
                                  .join(" · ")}
                              </p>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
}
