/**
 * The food band, drawn from plain props (`FoodBandData`, built on the server
 * by src/lib/conservation/food.ts): a gold-tinted band in the same frame as
 * the "Get involved" panels — eyebrow, display heading, lede — then the one
 * featured food invitation, the community gardens near the town (gardening
 * and resources pages), the seafood guides' look-up links (fish pages), the
 * food organisations grouped by role, and their latest articles.
 *
 * No library import, so the server `FoodPanel` and the client `NearbyFood`
 * draw the same band. One primary button per card.
 */
import Link from "next/link";
import type { FoodBandData, GardensBlock } from "@/lib/conservation/food";
import { OSM_ATTRIBUTION, OSM_COPYRIGHT_URL } from "@/lib/conservation/gardens-words";
import { InvitationFeature, OutboundButton } from "./InvitationFeature";
import { OrgCard, primaryWay } from "./OrgCard";
import { OrgNews } from "./OrgNews";

/** The band: the panels' frame, in the food subject's gold. */
export const FOOD_BAND = "gto-band rounded-feature bg-gold-soft px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12";

const DATE_FMT = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const dateWords = (iso: string | null) => {
  if (!iso) return null;
  const t = Date.parse(`${iso}T12:00:00Z`);
  return Number.isFinite(t) ? DATE_FMT.format(t) : null;
};

const NUM = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

function MapLink({ href, className = "", children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" data-gto-out="garden" data-gto-garden="map" data-gto-way="map" className={className}>
      {children}
      <span className="sr-only"> (opens OpenStreetMap in a new tab)</span>
    </a>
  );
}

export function GardensCard({ g, className = "" }: { g: GardensBlock; className?: string }) {
  const p = g.body ? primaryWay(g.body.org) : null;
  const read = dateWords(g.fetched);
  const word = (k: number) => NUM[k] ?? String(k);
  const count =
    g.total > g.items.length
      ? `The ${word(g.items.length)} nearest of ${g.total >= 10 ? "ten or more" : word(g.total)} named within ${g.radiusKm} km`
      : `${word(g.total).replace(/^./, (c) => c.toUpperCase())} named within ${g.radiusKm} km`;
  return (
    <article className={`card p-5 sm:p-6 lg:p-8 ${className}`} aria-labelledby="gardens-near">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 id="gardens-near" className="font-display text-2xl leading-snug tracking-tight sm:text-[1.65rem]">
          Community gardens near {g.town}
        </h3>
        <p className="text-sm text-ink-2">{count}</p>
      </div>
      <ul className="mt-4 grid gap-x-8 md:grid-cols-2">
        {g.items.map((i) => (
          <li key={i.osm} className="min-w-0 border-t border-line/70">
            <a
              href={i.href}
              target="_blank"
              rel="noopener noreferrer"
              data-gto-out="garden"
              data-gto-garden={i.osm}
              data-gto-way={i.onOsm ? "osm" : "website"}
              className="group flex min-h-11 flex-col justify-center py-2.5"
            >
              <span className="font-medium leading-snug text-ink underline decoration-line underline-offset-2 group-hover:text-moss">{i.name}</span>
              <span className="mt-0.5 text-sm text-ink-2">
                {i.kind} · {i.distance}
                {i.onOsm ? " · on OpenStreetMap" : ""}
              </span>
              <span className="sr-only"> (opens {i.onOsm ? "its OpenStreetMap page" : "its website"} in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        {g.body && p ? (
          <>
            <OutboundButton href={p.href} org={g.body.org.slug} way={p.way}>
              {p.label}
            </OutboundButton>
            <p className="min-w-0 text-sm leading-snug text-ink-2">
              For a plot or a place in a garden:{" "}
              <Link href={`/conservation/${g.body.org.slug}`} className="font-medium text-ink underline decoration-line underline-offset-2 hover:text-moss">
                {g.body.org.name}
              </Link>
              {g.body.why ? ` · ${g.body.why}` : ""}
            </p>
          </>
        ) : (
          <MapLink
            href={g.mapUrl}
            className="inline-flex min-h-11 max-w-full items-center justify-center rounded-full bg-moss px-5 py-2.5 text-center text-[15px] font-semibold leading-tight text-on-moss transition hover:bg-moss-2"
          >
            See them on the map<span aria-hidden="true">&nbsp;↗</span>
          </MapLink>
        )}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-ink-2">
        {g.body && (
          <>
            <MapLink href={g.mapUrl} className="font-medium text-moss underline-offset-2 hover:underline">
              See them on the map
            </MapLink>{" "}
            ·{" "}
          </>
        )}
        Named community gardens and allotments from{" "}
        <a href={OSM_COPYRIGHT_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-2 hover:text-ink">
          {OSM_ATTRIBUTION}
        </a>
        {read ? `, read ${read}` : ""}. A garden with no website of its own opens its OpenStreetMap page.
      </p>
    </article>
  );
}

export function FoodBandView({ data, children, footer, className = "" }: { data: FoodBandData; children?: React.ReactNode; footer?: React.ReactNode; className?: string }) {
  const { id, eyebrow, heading, lede, feature, gardens, groups, news, lookups, compact } = data;
  const total = groups.reduce((n, g) => n + g.cards.length, 0);
  const two = groups.filter((g) => g.cards.length).length > 1;
  return (
    <section className={`${FOOD_BAND} ${className}`} aria-labelledby={id}>
      <p className="eyebrow text-gold">{eyebrow}</p>
      <h2 id={id} className="font-display mt-2 max-w-3xl text-3xl leading-[1.1] tracking-tight sm:text-4xl">
        {heading}
      </h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-2 sm:text-base">{lede}</p>
      {children}
      {feature && <InvitationFeature inv={feature} className="mt-8" />}
      {gardens && <GardensCard g={gardens} className="mt-8" />}
      {lookups.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {lookups.map((l) => (
            <OutboundButton key={l.href} href={l.href} org={l.org} way="lookup" variant="outline">
              {l.label}
            </OutboundButton>
          ))}
        </div>
      )}
      {total > 0 && (
        <div className={`mt-8 grid gap-x-5 gap-y-8 ${two ? (total === 2 ? "md:grid-cols-2" : "lg:grid-cols-3") : ""}`}>
          {groups.map((g) => {
            const n = g.cards.length;
            // One role: its cards in a row. Two roles: the pair side by side, or the role with two cards over two columns of three.
            const span = two && total > 2 && n === 2 ? "lg:col-span-2" : "";
            const inner = !two ? (n === 1 ? "max-w-xl" : n === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3") : total === 2 ? "" : n === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-1";
            return (
              <div key={g.role} className={`min-w-0 ${span}`}>
                <h3 className="border-t-2 border-ink pt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">{g.label}</h3>
                <div className={`mt-4 grid gap-5 ${inner}`}>
                  {g.cards.map((c) => (
                    <OrgCard key={c.org.slug} org={c.org} why={c.why} compact={compact} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {news.length > 0 && <OrgNews items={news} heading="Latest from these groups" className="mt-10" />}
      {footer}
    </section>
  );
}

export function FoodLibraryLink({ countryCode }: { countryCode?: string | null }) {
  return (
    <p className="mt-6 text-[15px]">
      <Link href={`/conservation?topic=food${countryCode ? `&country=${countryCode}` : ""}#library`} className="font-medium text-moss underline-offset-2 hover:underline">
        Every food and growing organisation in our library →
      </Link>
    </p>
  );
}
