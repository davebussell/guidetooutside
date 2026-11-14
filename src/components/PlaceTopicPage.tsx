/**
 * A place's gardening, fishing or foraging page (/gardening/<town>,
 * /fishing/<town>, /foraging/<town>): the place, today's four numbers, the
 * section's own lead (the garden year or the climate's calendar, the waters
 * and their fish, what has been found nearby), this week's guide, garden
 * fauna, who looks after the place (the conservation bodies for
 * the section's subject, local first), the conditions, the ground, the sky and
 * the forces, and the sign-up.
 *
 * The ground and the local flora each wait on a store or a slow
 * service, so each streams in behind its own boundary.
 */
import { Suspense } from "react";
import type { LocalData, Place } from "@/lib/types";
import { getLocalData } from "@/lib/local-data";
import { guideId, readGuide } from "@/lib/guide-ai";
import { rulesGuide } from "@/lib/guide-rules";
import { floraEvidence } from "@/lib/local-flora";
import { checkLimit, metaOf, stampProps } from "@/lib/records";
import { regionOf as classifyEcoregion } from "@/lib/region";
import { regionTextAt } from "@/lib/region-text";
import { fishByWater } from "@/lib/fishing-waters";
import { fishFilms } from "@/lib/fish-films";
import { weatherLabel } from "@/lib/forecast";
import { MONTHS } from "@/lib/regime";
import { regionContext } from "@/lib/region-context";
import { seasonLabelFor } from "@/lib/season-label";
import { SITE } from "@/lib/site";
import { placeProfile } from "@/lib/place-profile";
import { PlaceHero } from "./PlaceHero";
import { GuideHeader } from "./GuideHeader";
import { GuideLoader } from "./GuideLoader";
import { GuideBody } from "./GuideSections";
import { AsOf, Freshness } from "./Freshness";
import { DayBand } from "./DayBand";
import { SkyPanel } from "./SkyPanel";
import { ForcesPanel } from "./ForcesPanel";
import { LocalWildlife } from "./LocalWildlife";
import { NoteCTA } from "./PlaceCards";
import { FishByWater } from "./FishByWater";
import { WhoProtects } from "./conservation/WhoProtects";
import { FoodPanel } from "./conservation/FoodPanel";
import { FOOD_RECORD_SLUGS, splitWithPanel } from "@/lib/conservation/food";
import { orgsFor, SECTION_FOOD, SECTION_TOPICS } from "@/lib/conservation/match";
import { pageWaters } from "@/lib/conservation/waters";
import { guideStrips } from "@/lib/conservation/strips";
import { GroundSummary, GroundSummarySkeleton } from "./GroundSummary";
import { LocalFloraSections, LocalFloraSkeleton } from "./LocalFloraSections";
import { GardenNow } from "./garden/GardenNow";
import { GardenByClimate } from "./garden/GardenByClimate";

export type TopicSection = "gardening" | "fishing" | "foraging";

const TOPIC_LABEL: Record<TopicSection, string> = {
  gardening: "Gardening",
  fishing: "Fishing",
  foraging: "Foraging",
};

/** The conservation panel's heading for each section. */
const ORG_TITLE: Record<TopicSection, string> = {
  gardening: "Who looks after the birds, bees and plants here",
  fishing: "Who looks after this water",
  foraging: "Who looks after the wild plants and woods here",
};

const hhmm = (iso: string) => iso.slice(11, 16);

/**
 * The freshness note's season word for this reader: "autumn" outside the US;
 * in the tropics, where the data's four season names mean nothing, the months
 * of the quarter in the place's own hemisphere ("September–November").
 */
function seasonWordFor(data: LocalData): (s: string) => string {
  const ctx = regionContext(data.place);
  const north: Record<string, string> = { Spring: "March–May", Summer: "June–August", Fall: "September–November", Winter: "December–February" };
  const south: Record<string, string> = { Spring: "September–November", Summer: "December–February", Fall: "March–May", Winter: "June–August" };
  return (s) => (ctx.tropical ? ((ctx.hemisphere === "south" ? south : north)[s] ?? s.toLowerCase()) : s === "Fall" ? ctx.autumn : s.toLowerCase());
}

/** The opening line under the section title. */
function standfirst(
  section: TopicSection,
  data: LocalData,
  profileFishing: string | null,
  landscape: string | undefined,
): string | undefined {
  if (section === "gardening") {
    const r = data.regime;
    const c = data.climate;
    if (!r) return undefined;
    // Frost dates only where frost frames the year and both dates exist (a
    // place with one "Rare" has no frost season; RF-findings L0, L15).
    const frost =
      r.frostLed && c && c.lastSpringFrost !== "Rare" && c.firstFallFrost !== "Rare"
        ? ` Here the last spring frost comes about ${c.lastSpringFrost} and the first ${regionContext(data.place).autumn} frost about ${c.firstFallFrost}.`
        : "";
    return `${r.summary}${frost}`;
  }
  if (section === "fishing") return profileFishing || undefined;
  return [landscape, data.forageLaw].filter(Boolean).join(" ") || undefined;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card px-4 py-3">
      <p className="eyebrow">{label}</p>
      <p className="mt-0.5 font-display text-lg font-semibold leading-tight">
        {value}
      </p>
    </div>
  );
}

/** Today's four numbers: the weather now and today, then two for the section. */
function Stats({ section, data }: { section: TopicSection; data: LocalData }) {
  const f = data.forecast;
  const today = f.days[0];
  const c = data.climate;
  const r = data.regime;
  const stats: [string, string][] = [
    [
      "Now",
      `${Math.round(f.current.temp)}°C · ${weatherLabel(f.current.code)}`,
    ],
    [
      "Today",
      today ? `${Math.round(today.tMax)}° / ${Math.round(today.tMin)}°` : "—",
    ],
  ];
  if (section === "gardening") {
    stats.push([
      "Soil 6 cm",
      f.soilTemp6cm != null ? `${Math.round(f.soilTemp6cm)}°C` : "—",
    ]);
    // The frost tile only where frost frames the year; a frost-free or
    // rain-led place gets its month's rain instead (RF-findings L15).
    if ((!r || r.frostLed) && c?.firstFallFrost !== "Rare") {
      stats.push([
        "First frost",
        data.daysToFirstFrost != null
          ? `~${data.daysToFirstFrost} days (${c?.firstFallFrost ?? "—"})`
          : (c?.firstFallFrost ?? "—"),
      ]);
    } else {
      const rain = c?.monthlyRainMm?.[data.month - 1];
      stats.push([
        "Rain, average month",
        rain != null
          ? `${Math.round(rain)} mm in ${MONTHS[data.month - 1]}`
          : "—",
      ]);
    }
  } else if (section === "fishing") {
    stats.push([
      "Sun",
      today ? `${hhmm(today.sunrise)} – ${hhmm(today.sunset)}` : "—",
    ]);
    stats.push([
      "Moon",
      `${data.moon.phaseName} · anglers' solunar: ${data.moon.fishingRating.toLowerCase()}`,
    ]);
  } else {
    const week = f.days.slice(0, 7).reduce((s, d) => s + (d.precip ?? 0), 0);
    stats.push(["Rain, 7 days", `${Math.round(week)} mm`]);
    // The season in the reader's words: "Autumn" outside the US, the regime's
    // own season ("Short rains", "Dry season") in the tropics, and a frost
    // countdown only where frost frames the year (RF-findings L14, L15).
    const frostLed = (!r || r.frostLed) && c?.firstFallFrost !== "Rare";
    stats.push([
      "Season",
      `${seasonLabelFor(data)}${frostLed && data.daysToFirstFrost != null ? ` · frost in ~${data.daysToFirstFrost} d` : ""}`,
    ]);
  }
  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map(([label, value]) => (
        <Stat key={label} label={label} value={value} />
      ))}
    </div>
  );
}

/** Home › Gardening › Toronto, Ontario, for search engines. */
function Breadcrumbs({
  section,
  place,
}: {
  section: TopicSection;
  place: Place;
}) {
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE.url}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: TOPIC_LABEL[section],
            item: `${SITE.url}/${section}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: place.label,
            item: `${SITE.url}/${section}/${place.slug}`,
          },
        ],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(ld).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export async function PlaceTopicPage({
  section,
  place,
}: {
  section: TopicSection;
  place: Place;
}) {
  const [data, stored] = await Promise.all([
    getLocalData(place),
    readGuide(place),
  ]);
  const gate = stored ? await checkLimit("guide", guideId(place)) : null;
  const eco = classifyEcoregion(place.lat, place.lon);
  const now = new Date();
  const profile = placeProfile(data);
  const films =
    section === "fishing" ? fishFilms(eco.slug, data.month) : undefined;
  const coast = data.water ? data.water.coast !== null : undefined;
  // The "who looks after" panel and the food band below it never name the same body twice (see splitWithPanel).
  const panelWaters = section === "fishing" ? pageWaters(data.water) : undefined;
  const panelSlugs = orgsFor(place, { topic: SECTION_TOPICS[section], waters: panelWaters, limit: 3, exclude: FOOD_RECORD_SLUGS }).map((m) => m.org.slug);
  const split = splitWithPanel(panelSlugs, SECTION_FOOD[section]);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <Breadcrumbs section={section} place={place} />
        <PlaceHero
          data={data}
          title={`${TOPIC_LABEL[section]} in ${place.name}`}
          standfirst={standfirst(section, data, profile.fishing, regionTextAt(eco, "landscape", place.lat, place.lon))}
        />
        <GuideHeader
          place={place}
          current={section}
          timeZone={data.forecast.timezone}
        />

        <Stats section={section} data={data} />
        <AsOf
          savedAt={data.fetchedAt}
          what="Weather"
          timeZone={data.forecast.timezone}
        />

        {section === "gardening" && (
          <div className="mt-10">
            {data.regime && !data.regime.frostLed && data.climate ? (
              <GardenByClimate data={data} />
            ) : (
              <GardenNow data={data} />
            )}
          </div>
        )}

        {section === "fishing" && data.water && (
          // The waters this place has, and the fish in each, before anything else.
          <div className="mt-10">
            <FishByWater
              sections={fishByWater(data.month, eco.slug, data.water, { place: data.place, today: data.today })}
              placeName={place.name}
              month={data.month}
            />
          </div>
        )}

        {section === "foraging" && (
          // What is actually recorded in these woods, rather than what the
          // library holds for a sixth of a continent. Streamed: the observation
          // service is never what a visitor waits on.
          <div className="mt-10">
            <Suspense fallback={<LocalFloraSkeleton />}>
              <LocalFloraSections
                place={place}
                month={data.month}
                regionSlug={eco.slug}
                zone={data.climate?.zoneNumber}
                coast={coast}
              />
            </Suspense>
          </div>
        )}

        <div className="mt-10">
          {stored ? (
            // Written once, kept, and served straight from storage — no loading
            // state, and the page says how old it is rather than implying it is new.
            <>
              <GuideBody
                view={section}
                data={data}
                guide={stored.value}
                films={films}
              />
              <Freshness
                kind="guide"
                slug={place.slug}
                label={`the ${section} guide for ${place.name}`}
                timeZone={data.forecast.timezone}
                cooldownSeconds={
                  gate && !gate.ok && gate.reason === "cooldown"
                    ? gate.retryAfterSeconds
                    : 0
                }
                {...stampProps(metaOf(stored), data.season, undefined, seasonWordFor(data))}
              />
            </>
          ) : (
            <GuideLoader
              slug={place.slug}
              lat={place.lat}
              lon={place.lon}
              view={section}
              fallback={{ data, guide: rulesGuide(data, await floraEvidence(data.place, data.month).catch(() => null)) }}
              films={films}
              orgs={guideStrips(place, data.water)}
            />
          )}
        </div>

        {section === "gardening" && (
          <div className="mt-10">
            <LocalWildlife data={data} limit={6} chips />
          </div>
        )}

        <div className="mt-10">
          <WhoProtects
            place={place}
            topic={SECTION_TOPICS[section]}
            waters={panelWaters}
            title={ORG_TITLE[section]}
            exclude={split.panelExclude}
          />
        </div>

        {/* Food and growing: community gardens and seed on gardening pages, codes and gleaning on foraging pages, seafood guides on fishing pages. */}
        <div className="mt-10 empty:hidden">
          <FoodPanel place={place} section={section} exclude={split.bandExclude} />
        </div>

        <div className="mt-14">
          <p className="eyebrow">Conditions</p>
          <h2 className="font-display mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">
            The day, the ground and the sky over {place.name}
          </h2>
        </div>
        <div className="mt-6">
          <DayBand
            data={data}
            section={section === "fishing" ? "water" : "garden"}
            now={now}
          />
        </div>
        <div className="mt-8">
          <Suspense fallback={<GroundSummarySkeleton />}>
            <GroundSummary
              place={place}
              section={section}
              timeZone={data.forecast.timezone}
            />
          </Suspense>
        </div>
        <div className="mt-12">
          <SkyPanel data={data} now={now} />
        </div>
        <div className="mt-12">
          <ForcesPanel data={data} section={section} now={now} />
        </div>

        <NoteCTA
          className="mt-10"
          title={
            <>
              The {section} note for {place.name}, every week
            </>
          }
          body="One email, Sunday evening. Unsubscribe anytime."
          source={`place-${section}`}
          location={place.label}
        />
      </div>
      <Suspense fallback={null}>{null}</Suspense>
    </>
  );
}
