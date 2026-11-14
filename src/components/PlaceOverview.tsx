// RECOVERED 2026-10-08 (full file as of 2026-10-07, later edits applied).
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LocalData } from "@/lib/types";
import { regionOf as classifyEcoregion } from "@/lib/region";
import { regionTextAt } from "@/lib/region-text";
import { cropCalendar, doyLabel, doyOfIso, nextSowing } from "@/lib/crop-calendar";
import { localCrops } from "@/lib/crops";
import { fishByWater } from "@/lib/fishing-waters";
import { foragingNow } from "@/lib/plant-presence";
import { cropImage } from "@/lib/crop-images";
import { creatureImage } from "@/lib/creature-images";
import { speciesImage } from "@/lib/species-images";
import { rainWords } from "@/lib/regime";
import { climateMonthRows, overviewSowing } from "@/lib/garden-season";
import { waterLines, waterTitle } from "@/lib/place-profile";
import { ClimateYear } from "./garden/ClimateYear";
import { OrgSections } from "./conservation/OrgSections";
import { pageWaters } from "@/lib/conservation/waters";
import { celsius, countedFrom, getExtremes } from "@/lib/extremes";
import { tempsFromStation, tempWords } from "@/lib/homestead/climate";

/**
 * A whole-degree temperature with no "−0 °C": Boise's January, −0.05 °C on the grid, printed as "January −0 °C" (Day 4
 * audit, 13 Nov 2026), because the sign was read before the rounding.
 */
const deg0 = (x: number) => celsius(Math.round(x) || 0, 0);

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** A sentence-style list: "galjoen, yellowtail and kob". */
const join = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/**
 * The place itself, before any advice: its climate, its waters and its land,
 * set out in three columns the way an atlas describes a place.
 */
export function PlaceSetting({ data }: { data: LocalData }) {
  const eco = classifyEcoregion(data.place.lat, data.place.lon);
  const r = data.regime;
  const c = data.climate;
  const w = data.water;
  const sections = w ? fishByWater(data.month, eco.slug, w, { place: data.place, today: data.today }) : [];
  const ex = getExtremes(data.place.slug);
  const means = c ? c.monthlyMeanMax.map((mx, i) => (mx + c.monthlyMeanMin[i]) / 2) : [];
  const monthMeans = means.length === 12 ? { cold: means.indexOf(Math.min(...means)), warm: means.indexOf(Math.max(...means)) } : null;
  // The Water column, worded in src/lib/place-profile.ts so it agrees with the climate line and the fishing line (audit,
  // 10 November 2026: tidal rivers read as "the open sea"; a failed map look-up read as "no named water").
  const waterItems = waterLines(w, data.place);

  return (
    <section aria-labelledby="setting" className="grid gap-10">
      <div>
        <p className="eyebrow">The setting</p>
        <h2 id="setting" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          What kind of place {data.place.name} is
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3 md:gap-10">
        <div className="border-t-2 border-ink pt-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">Climate</h3>
          {r ? (
            <>
              <p className="font-display mt-2 text-2xl font-semibold leading-snug">{r.name}</p>
              <p className="mt-2 leading-relaxed text-ink-2">{r.summary}</p>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <dt className="text-ink-2">Precipitation</dt>
                <dd>
                  {[`${r.annualRainMm} mm a year`, rainWords(r.rain, false, r.dryMonths)].filter(Boolean).join(", ")}
                </dd>
                {/* Wet and dry month rows (src/lib/garden-season climateMonthRows): "Rainiest months" in a dry climate. */}
                {climateMonthRows(r).map((row) => (
                  <Fragment key={row.label}>
                    <dt className="text-ink-2">{row.label}</dt>
                    <dd>{row.value}</dd>
                  </Fragment>
                ))}
                {/* regime.coldestC and warmestC are means of a month's daily highs and lows, not extremes. They come from ten
                    years of the ERA5 reanalysis (climate.estimated), or a station's normals (tempSource): the audit of 10 November 2026 found them
                    printed unlabelled beside the station-counted coldest night, with Saint John's January 3.9 °C milder than
                    the station normal. Labelled as the frost dates label the same source (src/lib/frost.ts). */}
                <dt className="text-ink-2">Monthly averages</dt>
                <dd>
                  {monthMeans ? `${MONTHS[monthMeans.cold]} ${deg0(r.coldestC)}, ${MONTHS[monthMeans.warm]} ${deg0(r.warmestC)}` : `${deg0(r.coldestC)} in the coldest month, ${deg0(r.warmestC)} in the warmest`}
                  {/* Day 5 audit, 14 November 2026: 74 towns' monthly means are now a station's normals (tempWords names it). */}
                  {c && (
                    <span className="block text-xs text-ink-2">
                      {tempsFromStation(c) ? `From ${tempWords(c)}` : "Estimated from the reanalysis grid (ten years of ERA5), not a weather station"}
                    </span>
                  )}
                </dd>
                {ex?.meanAnnualExtremeMinC != null && (
                  <>
                    <dt className="text-ink-2">Coldest night</dt>
                    <dd>
                      {celsius(ex.meanAnnualExtremeMinC)} in an average year
                      <span className="block text-xs text-ink-2">{countedFrom(ex)}</span>
                    </dd>
                  </>
                )}
                {/* The span from the last spring frost to the first autumn one is the frost-free season: the Day 3 audit (11 Nov
                    2026) found it labelled "Frost" at Little Rock, Memphis, Houston and New Orleans, the other way round from the
                    frost cards on the same page. */}
                {c && (
                  <>
                    <dt className="text-ink-2">{c.firstFallFrost === "Rare" || c.lastSpringFrost === "Rare" ? "Frost" : "Frost-free"}</dt>
                    <dd>{c.firstFallFrost === "Rare" || c.lastSpringFrost === "Rare" ? "Rare" : `${c.lastSpringFrost} – ${c.firstFallFrost}`}</dd>
                  </>
                )}
              </dl>
            </>
          ) : (
            <p className="mt-2 text-ink-2">The ten-year climate record for this spot is still being read.</p>
          )}
        </div>
        <div className="border-t-2 border-ink pt-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">Water</h3>
          <p className="font-display mt-2 text-2xl font-semibold leading-snug">
            {waterTitle(w)}
          </p>
          <ul className="mt-2 grid gap-1.5 leading-relaxed text-ink-2">
            {waterItems.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          {sections.length > 0 && (
            <p className="mt-4 text-sm">
              <Link href={`/fishing/${data.place.slug}`} className="font-medium text-moss hover:underline">
                The fish of each water →
              </Link>
            </p>
          )}
        </div>
        <div className="border-t-2 border-ink pt-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">Land</h3>
          <p className="font-display mt-2 text-2xl font-semibold leading-snug">
            <Link href={`/regions/${eco.slug}`} className="hover:text-moss">
              {eco.name}
            </Link>
          </p>
          <p className="mt-2 leading-relaxed text-ink-2">{regionTextAt(eco, "landscape", data.place.lat, data.place.lon)}</p>
          <p className="mt-4 text-sm">
            <Link href={`/ground/${data.place.slug}`} className="font-medium text-moss hover:underline">
              The rock, the soil and the rivers under {data.place.name} →
            </Link>
          </p>
        </div>
      </div>
      {r && c?.monthlyRainMm && <ClimateYear climate={c} regime={r} month={data.month} placeName={data.place.name} />}
    </section>
  );
}

function Card({ href, img, eyebrow, title, items, extra, more }: { href: string; img: { src: string; alt: string } | null; eyebrow: string; title: string; items: string[]; extra?: string | null; more: string }) {
  return (
    <article className="group flex flex-col">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden rounded-card bg-paper-2">
        {img && <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-[900ms] ease-settle motion-safe:group-hover:scale-[1.03]" />}
      </Link>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">{eyebrow}</p>
      <h3 className="font-display mt-1 text-2xl font-semibold leading-tight">
        <Link href={href} className="hover:text-moss">
          {title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 leading-relaxed text-ink-2">
        {join(items)}.{extra ? ` ${extra}.` : ""}
      </p>
      <Link href={href} className="mt-3 text-sm font-medium text-moss hover:underline">
        {more} →
      </Link>
    </article>
  );
}

/** This month's garden, water and wild food for the place, each a door to its own page. */
export function ThisMonth({ data }: { data: LocalData }) {
  const eco = classifyEcoregion(data.place.lat, data.place.lon);
  const month = MONTHS[data.month - 1];
  const fits = data.climate?.monthlyRainMm && data.regime ? cropCalendar(data.climate, data.regime, localCrops(data.place.countryCode), { lat: data.place.lat }) : [];
  // Only crops whose sowing window includes today (the place's own date); when none does, what opens next and when.
  const calDoy = doyOfIso(data.today);
  // Crops open "with watering" are listed and said to be (src/lib/garden-season overviewSowing): the Day 4 audit (13 Nov
  // 2026) found Tampa's card reading "Sow and plant now: dill and passion fruit" over some fifteen cool crops open with
  // watering that the gardening page listed.
  const sowing = overviewSowing(fits, data.month, calDoy);
  const sow = sowing?.named ?? [];
  const upNext = sowing || !fits.length ? null : nextSowing(fits, calDoy);
  // The main water (listed first) leads with two; then round-robin across the
  // rest, so a coastal town with one water still lists five fish.
  const secs = data.water ? fishByWater(data.month, eco.slug, data.water, { place: data.place, today: data.today }) : [];
  const rounds = Array.from({ length: Math.max(0, ...secs.map((s) => s.fish.length)) }, (_, i) => secs.map((s) => s.fish[i]).filter(Boolean)).flat();
  const fish = [...(secs[0]?.fish.slice(0, 2) ?? []), ...rounds];
  const fishUniq = [...new Map(fish.map((f) => [f.slug, f])).values()].slice(0, 5);
  // "Ready to pick" only for what has been recorded within about 50 km this month (plant-presence); where the
  // place cannot be checked the card is a labelled regional list, with no "ready" wording.
  const gated = foragingNow(data.month, eco.slug, data.climate?.zoneNumber, { coast: data.water ? data.water.coast !== null : undefined, place: data.place });
  const wildChecked = gated.why === "none";
  const wild = (wildChecked ? gated.checked : gated.regional).slice(0, 5);

  const cropPic = sow.map((f) => cropImage(f.crop.slug)).find(Boolean);
  const fishPic = fishUniq.map((f) => creatureImage(f.slug)).find(Boolean);
  const wildPic = wild.map((s) => speciesImage(s.slug)).find(Boolean);

  return (
    <section aria-labelledby="this-month">
      <p className="eyebrow">{month}</p>
      <h2 id="this-month" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
        {data.place.name} this month
      </h2>
      <div className="mt-8 grid gap-10 md:grid-cols-3">
        <Card
          href={`/gardening/${data.place.slug}`}
          img={cropPic ? { src: cropPic.src, alt: sow[0]?.crop.name ?? "" } : null}
          eyebrow="The garden"
          title={sowing ? sowing.title : "No sowing window is open today"}
          extra={sowing?.extra}
          items={
            sowing
              ? sowing.items
              : upNext
                ? [`Next to open: ${join(upNext.fits.slice(0, 4).map((f) => f.crop.name.toLowerCase()))} from ${doyLabel(upNext.doy)}`]
                : ["The sowing calendar is not worked out for this town"]
          }
          more="The full sowing calendar"
        />
        <Card
          href={`/fishing/${data.place.slug}`}
          img={fishPic ? { src: fishPic.src, alt: fishUniq[0]?.name ?? "" } : null}
          eyebrow="On the water"
          title="In season now"
          items={fishUniq.length ? fishUniq.map((f) => f.name.replace(/\s*\(.*\)/, "")) : ["Check the regional fishing guide"]}
          more="Fishing, water by water"
        />
        <Card
          href={`/foraging/${data.place.slug}`}
          img={wildPic ? { src: wildPic.src, alt: wild[0]?.name ?? "" } : null}
          eyebrow="Wild food"
          title={wildChecked ? "Ready to pick" : "Regional list, not checked near here"}
          items={wild.length ? wild.map((s) => s.name.replace(/\s*\(.*\)/, "").toLowerCase()) : ["A quiet month: learn the plants before their season"]}
          more="What grows here, and its look-alikes"
        />
      </div>
    </section>
  );
}

/** Who looks after the place's water, gardens, wild plants and young naturalists: the conservation bodies, four sections across. */
export function PlaceOrgs({ data }: { data: LocalData }) {
  const p = data.place;
  return (
    <OrgSections
      place={p}
      title={`Who looks after ${p.name}’s wild places`}
      waters={pageWaters(data.water)}
      more={{ href: `/resources/${p.slug}`, label: `Get involved near ${p.name}` }}
      food
    />
  );
}
