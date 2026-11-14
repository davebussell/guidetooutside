/**
 * The library's wild edibles in season at a place this month, as photograph
 * cards, then what is coming into season in the next month or two.
 *
 * Round 2 (agent C): given `place`, the list honours each record's country
 * and box rules (no baobab in Nairobi, no persimmon in Denver) and the
 * region's own months where a record has them (pine rings in the Cape's
 * winter, termite mushrooms with each of Nairobi's rains); a record with no
 * fixed season in the region (the Cape's shellfish) shows "No fixed season"
 * and its caution.
 *
 * Accuracy audit, 2 November 2026 (agent F): a list under a town's name may
 * call a species "in season" or "coming into season" only where public
 * observations (GBIF, mostly iNaturalist) hold a record of it within about 50 km
 * of the town, in the month (src/lib/plant-presence.ts). A species the library
 * lists for the region but nobody has recorded near the town is not shown. Where
 * the town cannot be checked (too few observations near it, or not a place the
 * presence table covers) the library's regional list is shown under its own
 * label, "Regional list - not checked near here", with no "in season" wording.
 * Only species of the curated library appear in either list: a taxon merely
 * observed nearby is named and counted elsewhere, never under a food heading.
 *
 * Audit of 10 November 2026: a food a regulator bans taking here (src/data/harvest-bans.ts: mussels on the Bay of
 * Fundy) is in neither list; it is named under the lists with the regulator, the rule, the page and the date it was
 * read. A regulator's rule that is not a ban (a daily limit, closures to check) is printed under a food that is listed.
 *
 * Audit of 10 November 2026 (Day 4): a town's own records keep a tree on its checked list even outside the tree's
 * published native range (the range rule of 11 November), as the live panel does; both now say that such trees are
 * likely planted (black walnut at Montreal, pecans at Sacramento on the panel).
 */
import Link from "next/link";
import type { Place } from "@/lib/types";
import { getEcoregion } from "@/lib/ecoregions";
import { theRegion } from "@/lib/the-region";
import { OUTSIDE_RANGE_NOTE, inRange, monthName, monthRange, noFixedSeason } from "@/lib/species";
import { foragingNow, foragingSoon, PRESENCE_BOX_KM, PRESENCE_FROM_YEAR, type Gated } from "@/lib/plant-presence";
import { harvestNotesOn, readOn, type HarvestRule } from "@/data/harvest-bans";
import { Chips, SpeciesCard } from "./NatureCard";

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

const andList = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/**
 * What the regional list is narrowed by at the place, as a clause: the hardiness zone (when the page gives one) and the
 * published native ranges the library holds (Species `range`), naming what they leave out. Audit of 11 November 2026:
 * Brownsville's list (lion's mane, rose hips, wapato) had no records near the town, and the Gulf Coast list runs from
 * Memphis to Brownsville; the label says how little of it is fitted to the town, and the region's own example towns
 * show how wide it is.
 */
function narrowedBy(placeLabel: string | undefined, zone: number | undefined, outOfRange: Gated["outOfRange"]): string {
  if (!placeLabel) return "";
  const left = [...new Set(outOfRange.map((s) => s.name.toLowerCase()))];
  const range = `each species' published native range where the guide holds one${left.length ? ` (${andList(left)} left out here)` : ""}`;
  return zone != null ? `, kept to the hardiness zone here and to ${range}` : `, kept to ${range}`;
}

/** Why a list is only regional, in a sentence. */
function whyRegional(why: Gated["why"], label?: string): string {
  const here = label ?? "this place";
  if (why === "data-poor") return `Too few plant and fungus observations have been logged near ${here} to check these against what grows there.`;
  if (why === "no-table") return `${here} is not one of the places we have checked against local observations.`;
  return "No place is set, so these cannot be checked against local observations.";
}

/** "Fisheries and Oceans Canada (Maritimes): …, page modified 2026-07-02, read 11 November 2026." */
function RuleSource({ r }: { r: HarvestRule }) {
  return (
    <>
      <a href={r.source.url} target="_blank" rel="noopener nofollow" className="underline decoration-line underline-offset-2 hover:text-moss">
        {r.source.label}
      </a>
      {r.source.modified ? `, page modified ${r.source.modified}` : null}, read {readOn(r.checked)}.
      {r.check && (
        <>
          {" "}
          <a href={r.check.url} target="_blank" rel="noopener nofollow" className="underline decoration-line underline-offset-2 hover:text-moss">
            {r.check.label}
          </a>
          .
        </>
      )}
    </>
  );
}

/** The foods a regulator bans taking here, with the ban, and the rules for the foods that are listed. */
function RegulatorRules({ banned, notes }: { banned: Gated["banned"]; notes: { name: string; rule: HarvestRule }[] }) {
  if (!banned.length && !notes.length) return null;
  return (
    <div className="mt-6 grid max-w-3xl gap-3 text-sm">
      {banned.length > 0 && (
        <div className="rounded-tile border border-rust/40 bg-paper-2 px-4 py-3">
          <p className="font-medium text-rust">Not listed as in season here: a regulator bans taking {banned.length === 1 ? "it" : "them"}</p>
          {banned.flatMap(({ species, bans }) =>
            bans.map((r) => (
              <p key={`${species.slug}-${r.id}`} className="mt-1.5 text-ink-2">
                <span className="font-medium text-ink">{species.name}.</span> {r.regulator}: {r.rule} <RuleSource r={r} />
              </p>
            )),
          )}
        </div>
      )}
      {notes.map(({ name, rule: r }) => (
        <p key={`${name}-${r.id}`} className="text-ink-2">
          <span className="font-medium text-ink">{name}:</span> {r.regulator} for {r.scope.label}. {r.rule} <RuleSource r={r} />
        </p>
      ))}
    </div>
  );
}

/** Recorded near the place, but outside the published native range: the records are likely of planted trees. */
function Planted({ list, regionSlug, place }: { list: Gated["checked"]; regionSlug?: string; place?: Parameters<typeof inRange>[2] }) {
  const planted = list.filter((s) => !inRange(s, regionSlug, place));
  if (!planted.length) return null;
  return (
    <div className="mt-4 max-w-3xl text-sm text-ink-2">
      {planted.map((s) => (
        <p key={s.slug}>
          <span className="font-medium text-ink">{s.name}:</span> {OUTSIDE_RANGE_NOTE}
        </p>
      ))}
    </div>
  );
}

export function SeasonalForaging({
  month,
  regionSlug,
  zone,
  placeLabel,
  limit = 9,
  showSoon = true,
  showNow = true,
  heading,
  coast,
  place,
  showBans = true,
}: {
  month: number;
  regionSlug?: string;
  zone?: number;
  placeLabel?: string;
  limit?: number;
  showSoon?: boolean;
  /** Off where the live local list already answers "what's ready now" better. */
  showNow?: boolean;
  heading?: string;
  /** False for a place with no sea within reach: no mussels or seaweed. */
  coast?: boolean;
  /** The place itself, for the records' country and box rules, the presence check, the regulators' bans and the text for its province or state; without it, only the region decides and nothing is checked. */
  place?: (Pick<Place, "countryCode" | "lat" | "lon"> & { slug?: string; admin1?: string; admin1Code?: string }) | null;
  /** Print the regulators' bans and rules for this month's and the coming months' foods; off where another block on the page already prints them. */
  showBans?: boolean;
}) {
  const now = showNow ? foragingNow(month, regionSlug, zone, { coast, place }) : null;
  const soon = showSoon ? foragingSoon(month, regionSlug, zone, { coast, place }) : null;
  // A ban is printed even where the "now" cards are left to the live panel: the food is out of every list either way.
  const nowForBans = now ?? (showBans && place ? foragingNow(month, regionSlug, zone, { coast, place }) : null);
  const banned: Gated["banned"] = [];
  if (showBans) for (const b of [...(nowForBans?.banned ?? []), ...(soon?.banned ?? [])]) if (!banned.some((x) => x.species.slug === b.species.slug)) banned.push(b);
  const listed = [...(now ? (now.why === "none" ? now.checked : now.regional) : []), ...(soon ? [...soon.checked, ...soon.regional] : [])];
  const notes = showBans
    ? listed
        .filter((s, i) => listed.findIndex((x) => x.slug === s.slug) === i)
        .flatMap((s) => harvestNotesOn(s.slug, place, month).map((rule) => ({ name: s.name, rule })))
    : [];
  const rules = <RegulatorRules banned={banned} notes={notes} />;
  const region = regionSlug ? getEcoregion(regionSlug) : null;
  const where = placeLabel ? ` near ${placeLabel}` : region ? ` in ${theRegion(region.name)}` : " across Canada and the United States";
  const month_ = monthName(month);
  const chips = (list: { slug: string; name: string; months: number[] }[]) => list.map((s) => ({ href: `/foraging/${s.slug}`, label: s.name, note: monthRange(s.months) }));

  // ---- what is coming into season: checked near the place, and the regional remainder ----
  const soonBlock = soon && (soon.checked.length > 0 || soon.regional.length > 0) && (
    <div className={showNow ? "mt-8" : "mt-5"}>
      {soon.checked.length > 0 && (
        <>
          {showNow && <p className="eyebrow">Expected in the next one to two months</p>}
          <p className="mt-1 max-w-2xl text-sm text-ink-2">
            Recorded within about {PRESENCE_BOX_KM} km of {placeLabel ?? "here"} in those months (GBIF records since {PRESENCE_FROM_YEAR}). Timing moves a week or two either way with the weather; treat these as indications, not dates.
          </p>
          <Chips items={chips(soon.checked)} className="mt-3" />
          <Planted list={soon.checked} regionSlug={regionSlug} place={place} />
        </>
      )}
      {soon.regional.length > 0 && (
        <div className={soon.checked.length > 0 ? "mt-6" : ""}>
          {(showNow || soon.checked.length > 0) && <p className="eyebrow">Regional list - not checked near here</p>}
          <p className="mt-1 max-w-2xl text-sm text-ink-2">
            The guide gives these for the region in the next one to two months. {whyRegional(soon.why, placeLabel)} This is regional context, not a statement
            that any of them grows or is ready near you.
          </p>
          <Chips items={chips(soon.regional)} className="mt-3" />
        </div>
      )}
    </div>
  );

  if (!showNow || !now) {
    // Nothing recorded for the coming months: no heading over an empty list (a ban is still printed).
    if (!soonBlock) return banned.length || notes.length ? <section>{rules}</section> : null;
    const checked = !!soon && soon.checked.length > 0;
    return (
      <section>
        <div>
          <p className="eyebrow text-moss">{checked ? "Coming into season" : "Regional list"}</p>
          <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">
            {checked ? "Expected in the next one to two months" : "Regional list - not checked near here"}
          </h2>
          {checked && (
            <p className="mt-2 max-w-2xl text-ink-2">
              Wild foods coming into season{where}, from the guide&apos;s calendar and local observations. Timing moves a week or two either way with the weather; treat these as
              indications, not dates.
            </p>
          )}
        </div>
        {soonBlock}
        {rules}
      </section>
    );
  }

  const checkedNow = now.why === "none";
  const list = (checkedNow ? now.checked : now.regional).slice(0, limit);
  const total = (checkedNow ? now.checked : now.regional).length;
  const more = total - list.length;
  // The Cape's shellfish: no month, a red-tide alert. Say so under the cards rather than leave "No fixed season" unexplained.
  const byAlert = list.filter((s) => noFixedSeason(s, regionSlug));
  const firstSentence = (t?: string) => (t ? t.split(/(?<=\.)\s/)[0] : "");
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-moss">{checkedNow ? `In season now · ${month_}` : `Regional list · ${month_}`}</p>
          <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">
            {checkedNow ? (heading ?? "Wild foods in season") : "Regional list - not checked near here"}
          </h2>
          {checkedNow ? (
            <p className="mt-2 text-ink-2 max-w-2xl">
              {total > 0
                ? `${plural(total, "wild edible", "wild edibles")} in the guide's season for ${month_} ${total === 1 ? "has" : "have"} been recorded within about ${PRESENCE_BOX_KM} km of ${placeLabel ?? "here"} in ${month_}, in public observations (GBIF, mostly iNaturalist) since ${PRESENCE_FROM_YEAR}. Seasons shift a week or two with the weather — check each one before you go.`
                : `None of the guide's wild edibles for ${month_} has a record within about ${PRESENCE_BOX_KM} km of ${placeLabel ?? "here"} in ${month_}, in public observations (GBIF, mostly iNaturalist) since ${PRESENCE_FROM_YEAR}.`}
            </p>
          ) : (
            <p className="mt-2 text-ink-2 max-w-2xl">
              Wild edibles the guide gives for {month_}
              {region ? ` across ${theRegion(region.name)}${region.examples?.length ? ` (${andList(region.examples.map((x: string) => x.replace(/,\s*[A-Z]{2}$/, "")))})` : ""}` : ""}
              {narrowedBy(placeLabel, zone, now.outOfRange)}. {whyRegional(now.why, placeLabel)} This is regional context only: it does not say any of them is in season, growing or legal to pick near{" "}
              {placeLabel ?? "you"}.
            </p>
          )}
        </div>
        {region && (
          <Link href={`/regions/${region.slug}`} className="text-sm text-ink-2 hover:text-ink underline decoration-line">
            {region.name} →
          </Link>
        )}
      </div>
      {list.length > 0 && (
        <div className="mt-6">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s, i) => (
              <SpeciesCard key={s.slug} species={s} priority={i < 3} />
            ))}
          </ul>
        </div>
      )}
      {byAlert.length > 0 && (
        <div className="mt-4 max-w-3xl rounded-tile border border-rust/40 bg-paper-2 px-4 py-3 text-sm">
          {byAlert.map((s) => (
            <p key={s.slug}>
              <span className="font-medium text-rust">{s.name}: no fixed season here.</span> Collecting goes by the current alerts, not the calendar.{" "}
              {firstSentence(s.caution)} Check this coast&apos;s red-tide warnings before every trip, and carry the permit where one is required —{" "}
              <Link href={`/foraging/${s.slug}`} className="underline decoration-line underline-offset-2 hover:text-moss">
                read the caution
              </Link>
              .
            </p>
          ))}
        </div>
      )}
      {checkedNow && <Planted list={list} regionSlug={regionSlug} place={place} />}
      {more > 0 && (
        <p className="mt-4 text-sm">
          <Link href="/foraging/calendar" className="font-medium text-moss hover:underline">
            {checkedNow ? `${more} more recorded nearby this month: foraging calendar →` : `${more} more on the regional list: foraging calendar →`}
          </Link>
        </p>
      )}
      {soonBlock}
      {rules}
      <p className="mt-6 text-xs text-ink-2 max-w-3xl">
        Photographs are research-grade observations from iNaturalist, each credited to its photographer. They show a typical specimen, not every
        variation — never identify from a photo alone. Confirm with a regional field guide or an experienced forager before you eat anything wild.
      </p>
    </section>
  );
}
