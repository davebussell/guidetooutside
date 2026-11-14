/**
 * "Who looks after the <region>": the regional guide's guide to the active
 * organisations, from the conservation library. Three groups — in the region,
 * national partners country by country, and the continental and world
 * networks — with a subject-by-subject index above them. A region with few
 * local records leads with its national bodies and says plainly what is not
 * listed yet; one with no national body either leads with the international
 * networks. Server-rendered and static: the region pages are built ahead.
 */
import Link from "next/link";
import { OrgCard } from "@/components/conservation/OrgCard";
import { TOPIC_LABEL, type Organisation, type Topic } from "@/data/conservation";
import { nameList } from "@/lib/regions/format";
import { finders, theCountry, type CountryOrgs, type RegionOrg, type RegionOrgs as Data } from "@/lib/regions/orgs";
import type { TownRow } from "@/lib/regions/types";
import { theRegion } from "@/lib/the-region";

/** How many full cards a group opens with; the rest wait behind a "show all". */
const FEATURED = 6;
const PER_COUNTRY = 3;

/** "the Great Lakes & St. Lawrence Lowlands", "Atlantic Europe" — and "Hawaiʻi & the Tropics", which carries its own article. */
const theName = (name: string) => (/^Hawai/.test(name) ? name : theRegion(name));

/** "one national body", "24 national bodies"; `cap` for the start of a line. */
const plural = (n: number, one: string, many: string) => `${n === 1 ? "one" : n.toLocaleString("en")} ${n === 1 ? one : many}`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** The first card for each subject, then the rest in order, so the opening cards are not six water bodies. */
function featured(list: RegionOrg[], n: number): RegionOrg[] {
  const seen = new Set<Topic>();
  const pick: RegionOrg[] = [];
  for (const r of list) {
    if (pick.length >= n) break;
    if (!seen.has(r.org.topics[0])) {
      seen.add(r.org.topics[0]);
      pick.push(r);
    }
  }
  for (const r of list) {
    if (pick.length >= n) break;
    if (!pick.includes(r)) pick.push(r);
  }
  return list.filter((r) => pick.includes(r));
}

/** Cards on a fixed grid, so one or two cards keep a card's width rather than stretching across the page. */
function Cards({ items, compact, narrow }: { items: { org: Organisation; why: string }[]; compact?: boolean; narrow?: boolean }) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 ${narrow ? "xl:grid-cols-3" : "lg:grid-cols-3"}`}>
      {items.map((x) => (
        <OrgCard key={x.org.slug} org={x.org} why={x.why} compact={compact} />
      ))}
    </div>
  );
}

function More({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="group mt-4">
      <summary className="cursor-pointer text-sm font-medium text-moss hover:underline">{label}</summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}

function Group({ id, eyebrow, title, note, children }: { id: string; eyebrow: string; title: string; note?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t-2 border-ink pt-4">
      <h3 id={id} className="eyebrow text-moss">
        {eyebrow}
      </h3>
      <p className="font-display mt-1 text-2xl font-semibold leading-snug">{title}</p>
      {note && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">{note}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** The BirdLife partner list and the Waterkeeper finder, named and linked from their own records. */
function FinderLinks() {
  const f = finders();
  if (!f.length) return <>the international networks below</>;
  return (
    <>
      {f.map((x, i) => (
        <span key={x.org.slug}>
          {i > 0 && (i === f.length - 1 ? " and " : ", ")}
          <a href={x.href} target="_blank" rel="noopener noreferrer" className="font-medium text-moss underline-offset-2 hover:underline" data-gto-out="org" data-gto-org={x.org.slug} data-gto-way={x.way}>
            {x.org.name}&rsquo;s {x.what}
          </a>
        </span>
      ))}
    </>
  );
}

function InRegion({ data, towns, the }: { data: Data; towns: TownRow[]; the: string }) {
  const list = data.inRegion;
  const n = list.length;
  const anyAdmin1 = list.some((r) => r.how === "admin1");
  const anyRegion = list.some((r) => r.how === "region");
  const first = featured(list, FEATURED);
  const rest = list.filter((r) => !first.includes(r));
  const bySubject = new Map<Topic, RegionOrg[]>();
  for (const r of rest) bySubject.set(r.org.topics[0], [...(bySubject.get(r.org.topics[0]) ?? []), r]);
  const without = data.townsWithout.map((s) => towns.find((t) => t.slug === s)?.name ?? s);
  return (
    <Group
      id="orgs-region"
      eyebrow="In the region"
      title={`${cap(plural(n, "organisation", "organisations"))} with a home in ${the}`}
      note={`Those working on a river, lake or valley here or around one of its towns come first${anyRegion ? ", then those working across the whole region" : ""}${anyAdmin1 ? ", then those working across a province or state that has towns here" : ""}. The line above each name says where.`}
    >
      <Cards items={first} />
      {rest.length > 0 && (
        <More label={`The other ${rest.length} in the region, by subject`}>
          <div className="grid gap-6">
            {[...bySubject.entries()].map(([topic, rs]) => (
              <div key={topic}>
                <p className="eyebrow">
                  {TOPIC_LABEL[topic]} · {rs.length}
                </p>
                <div className="mt-2">
                  <Cards items={rs} compact />
                </div>
              </div>
            ))}
          </div>
        </More>
      )}
      {without.length > 0 && towns.length > 0 && (
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-2">
          No local organisation is in our library yet for {nameList(without, 6)}; the national bodies below cover {without.length === 1 ? "it" : "them"}.
        </p>
      )}
    </Group>
  );
}

function CountryRow({ c }: { c: CountryOrgs }) {
  const first = c.orgs.slice(0, PER_COUNTRY);
  const rest = c.orgs.slice(PER_COUNTRY);
  return (
    <div className="grid gap-4 border-t border-line pt-4 first:border-0 first:pt-0 lg:grid-cols-[11rem_1fr] lg:gap-6">
      <div>
        <p className="font-display text-xl font-semibold leading-snug text-ink">{c.country}</p>
        <p className="mt-0.5 text-xs text-ink-2">
          {plural(c.orgs.length, "national body", "national bodies")}
          {c.towns ? ` · ${plural(c.towns, "town", "towns")} here` : ""}
        </p>
      </div>
      <div className="min-w-0">
        <Cards items={first} compact narrow />
        {rest.length > 0 && (
          <More label={`All ${c.orgs.length} in ${theCountry(c.country)}`}>
            <Cards items={rest} compact narrow />
          </More>
        )}
      </div>
    </div>
  );
}

function National({ data }: { data: Data }) {
  const rows = data.national.filter((c) => c.orgs.length);
  const missing = data.national.filter((c) => !c.orgs.length);
  const total = rows.reduce((a, c) => a + c.orgs.length, 0);
  if (!rows.length) return null;
  return (
    <Group
      id="orgs-national"
      eyebrow="National partners"
      title={`${cap(plural(total, "national body", "national bodies"))} in ${nameList(rows.map((c) => theCountry(c.country)), 5)}`}
      note="They work across the whole country, this region included: the country's BirdLife partner first, then the bodies for water, birds, plants and land, the counts anyone can join, and the programmes for young people."
    >
      <div className="grid gap-6">
        {rows.map((c) => (
          <CountryRow key={c.countryCode} c={c} />
        ))}
      </div>
      {missing.length > 0 && (
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-2">
          National bodies are not yet in our library for {nameList(missing.map((c) => theCountry(c.country)), 8)}.
        </p>
      )}
    </Group>
  );
}

function International({ data, lead }: { data: Data; lead: boolean }) {
  const list = data.international;
  if (!list.length) return null;
  const first = list.slice(0, FEATURED);
  const rest = list.slice(FEATURED);
  return (
    <Group
      id="orgs-world"
      eyebrow="Across the continent and the world"
      title={`${cap(plural(list.length, "network or international body", "networks and international bodies"))} that work here`}
      note="They work here as they do everywhere. The networks' finders lead to their member groups, and the counts and platforms take anyone, anywhere, this week."
    >
      <Cards items={first} compact={!lead} />
      {rest.length > 0 && (
        <More label={`All ${list.length}`}>
          <Cards items={rest} compact />
        </More>
      )}
    </Group>
  );
}

/** Below this many regional and national records the subject index would only repeat the cards beneath it. */
const INDEX_FROM = 6;

function BySubject({ data }: { data: Data }) {
  const listed = data.inRegion.length + data.national.reduce((a, c) => a + c.orgs.length, 0);
  if (!data.byTopic.length || listed < INDEX_FROM) return null;
  return (
    <div className="mt-6 rounded-tile border border-line/80 bg-paper-2/50 px-4 py-3 sm:px-5 sm:py-4">
      <p className="eyebrow">By subject</p>
      <dl className="mt-2 grid gap-x-8 gap-y-1.5 text-sm leading-relaxed lg:grid-cols-2">
        {data.byTopic.map((t) => (
          <div key={t.topic}>
            <dt className="inline font-semibold text-ink">{t.label}: </dt>
            <dd className="inline text-ink">
              {t.orgs.map((o, i) => (
                <span key={o.slug}>
                  {i > 0 && ", "}
                  <Link href={`/conservation/${o.slug}`} className="underline decoration-line underline-offset-2 hover:text-moss">
                    {o.name}
                  </Link>
                </span>
              ))}
              {t.more > 0 && <span className="text-ink-2"> and {t.more} more</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function RegionOrgs({ data, towns, regionName }: { data: Data; towns: TownRow[]; regionName: string }) {
  const the = theName(regionName);
  const n = data.inRegion.length;
  const countries = data.national.filter((c) => c.orgs.length).map((c) => theCountry(c.country));
  const disclosure = "We list registered charities and public bodies only, and we receive nothing from anything you give.";
  const lede =
    data.state === "rich"
      ? `The organisations in our library that work in ${the}: ${n.toLocaleString("en")} with a home in the region${countries.length ? `, the national bodies of ${nameList(countries, 5)}` : ""}, and the international networks behind them. ${disclosure}`
      : data.state === "thin"
        ? `The organisations in our library that work in ${the}, national bodies first. ${disclosure}`
        : `The organisations in our library that work in ${the}. ${disclosure}`;

  return (
    <section aria-labelledby="orgs">
      <p className="eyebrow text-moss">Get involved</p>
      <h2 id="orgs" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
        Who looks after {the}
      </h2>
      <p className="mt-2 max-w-3xl text-ink-2">{lede}</p>

      {data.state !== "rich" && (
        <p className="mt-4 max-w-3xl rounded-tile border border-line/80 bg-paper-2/50 px-4 py-3 text-ink">
          {data.state === "thin" ? (
            <>
              We have not yet listed local groups for every part of {the}
              {n ? `: ${n === 1 ? "one is" : `${n} are`} in our library so far` : ""}. The national bodies below cover all of it; for the group on your own river,
              coast or patch, the next step is <FinderLinks />.
            </>
          ) : (
            <>
              We have not yet listed local groups or national bodies for {the}. The international networks below work here, and for the group on your own river,
              coast or patch the next step is <FinderLinks />.
            </>
          )}
        </p>
      )}

      <BySubject data={data} />

      <div className="mt-10 grid gap-12">
        {data.state === "rich" ? (
          <>
            <InRegion data={data} towns={towns} the={the} />
            <National data={data} />
            <International data={data} lead={false} />
          </>
        ) : data.state === "thin" ? (
          <>
            <National data={data} />
            {n > 0 && <InRegion data={data} towns={towns} the={the} />}
            <International data={data} lead={false} />
          </>
        ) : (
          <>
            {n > 0 && <InRegion data={data} towns={towns} the={the} />}
            <International data={data} lead />
          </>
        )}
      </div>
    </section>
  );
}
