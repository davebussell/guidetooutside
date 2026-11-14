/**
 * A place's homestead page (/homesteading/<town>): the place, today's weather,
 * then the homestead numbers worked out from its climate normals, frost dates
 * and latitude — this month's tasks, daylight and laying, cold nights and hot
 * days, roof water, wood heat, season extension and bees — each with the
 * method under the number and a link to its topic. Built like the gardening,
 * fishing and foraging place pages.
 */
import Link from "next/link";
import type { LocalData, Place } from "@/lib/types";
import { getLocalData } from "@/lib/local-data";
import { getExtremes } from "@/lib/extremes";
import { frostProvenance, frostSourceWords } from "@/lib/frost";
import { stationName } from "@/lib/zone-label";
import { weatherLabel } from "@/lib/forecast";
import { SITE } from "@/lib/site";
import { MONTHS } from "@/lib/regime";
import { BREEDS, type Animal, type Breed } from "@/data/homestead/breeds";
import { FIREWOOD } from "@/data/homestead/firewood";
import {
  homesteadNumbers,
  extremeFigures,
  dayLabel,
  hoursMinutes,
  daylightYear,
  monthStart,
  wrapDoy,
  SHORT_MONTHS,
  MONTH_DAYS,
  LAYING_HOURS,
  MAX_LIGHT_HOURS,
  BEE_FORAGE_C,
  BEE_FULL_C,
  BEE_FLIGHT_MIN_C,
  RUNOFF,
  HDD_BASE_C,
  tempWords,
  tempsFromStation,
  degC,
  type HomesteadNumbers,
  type HomesteadInput,
  type Span,
} from "@/lib/homestead/climate";
import { signalDates, stationWords, tasksInMonth, windowLabel, type DueTask } from "@/lib/homestead/signals";
import { getTopic } from "@/data/homestead/topics";
import { PlaceHero } from "@/components/PlaceHero";
import { GuideHeader } from "@/components/GuideHeader";
import { AsOf } from "@/components/Freshness";
import { NoteCTA } from "@/components/PlaceCards";
import { OrgLine } from "@/components/conservation/OrgLine";
import { WhoProtects } from "@/components/conservation/WhoProtects";
import { FoodPanel } from "@/components/conservation/FoodPanel";
import { orgsFor, SECTION_FOOD, SECTION_TOPICS } from "@/lib/conservation/match";
import { FOOD_RECORD_SLUGS, splitWithPanel } from "@/lib/conservation/food";
import { pageWaters } from "@/lib/conservation/waters";
import { ClimateYear } from "@/components/garden/ClimateYear";
import { MonthBars } from "./MonthBars";
import { CheckBox } from "./Blocks";

const n0 = (x: number) => (Math.round(x) + 0).toLocaleString("en");
/** Round litres to something honest: two significant figures. */
const litres = (x: number) => {
  if (x < 100) return n0(x);
  const p = Math.pow(10, Math.floor(Math.log10(x)) - 1);
  return n0(Math.round(x / p) * p);
};
const monthRange = (from: number, to: number) => (from === to ? MONTHS[from - 1] : `${MONTHS[from - 1]} to ${MONTHS[to - 1]}`);
const spanText = (s: Span, what: string) =>
  s.days === 0 ? `No ${what} on average` : s.days >= 365 ? "All year" : s.main ? `${s.days} days, ${dayLabel(s.main.start)} to ${dayLabel(s.main.end)}` : `${s.days} days`;

// ---- small pieces --------------------------------------------------------------

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card px-4 py-3">
      <p className="eyebrow">{label}</p>
      <p className="mt-0.5 font-display text-lg font-semibold leading-tight">{value}</p>
    </div>
  );
}

/** A number, what it means, and how it was worked out. */
function Figure({ label, value, children, method }: { label: string; value: string; children?: React.ReactNode; method: string }) {
  return (
    <div className="rounded-tile border border-line/80 bg-paper-2/50 px-4 py-3">
      <p className="eyebrow">{label}</p>
      <p className="font-display mt-1 text-xl font-semibold leading-tight text-ink">{value}</p>
      {children && <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{children}</p>}
      <p className="mt-2 border-t border-line/70 pt-2 text-xs leading-relaxed text-ink-2">{method}</p>
    </div>
  );
}

function Panel({ id, eyebrow, title, lead, topic, children }: { id: string; eyebrow: string; title: string; lead?: React.ReactNode; topic: string | string[]; children: React.ReactNode }) {
  const topics = (Array.isArray(topic) ? topic : [topic]).map((s) => getTopic(s)).filter(Boolean);
  return (
    <section id={id} className="card scroll-mt-24 p-5 sm:p-7">
      <p className="eyebrow text-moss">{eyebrow}</p>
      <h2 className="font-display mt-1 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{title}</h2>
      {lead && <p className="mt-2 max-w-3xl text-ink-2 leading-relaxed">{lead}</p>}
      <div className="mt-5">{children}</div>
      {topics.length > 0 && (
      <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {topics.map((t) => (
          <Link key={t!.slug} href={`/homesteading/${t!.slug}`} className="font-medium text-moss hover:underline">
            {t!.title} →
          </Link>
        ))}
      </p>
      )}
    </section>
  );
}

const grid = "grid gap-3 sm:grid-cols-2 lg:grid-cols-4";

// ---- the panels -------------------------------------------------------------------

function ThisMonth({ due, next, month, placeName }: { due: DueTask[]; next: DueTask[]; month: number; placeName: string }) {
  const Item = ({ d }: { d: DueTask }) => {
    const topic = getTopic(d.task.topic);
    return (
      <li className="card px-4 py-3 flex flex-col">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-2">
          <Link href={`/homesteading/${d.task.topic}`} className="hover:text-moss">
            {topic?.short ?? d.task.topic}
          </Link>
        </p>
        <p className="mt-1 font-semibold text-ink">{d.task.title}</p>
        <p className="mt-1 text-sm text-ink-2 flex-1">{d.task.detail}</p>
        <p className="mt-2 border-t border-line/70 pt-2 text-xs text-ink-2">
          {d.trigger} Due {windowLabel(d.window)}.
        </p>
      </li>
    );
  };
  const nextOnly = next.filter((n) => !due.some((d) => d.task.id === n.task.id));
  return (
    <Panel
      id="month"
      eyebrow={`${MONTHS[month - 1]} · the homestead calendar`}
      title={`This month on the homestead in ${placeName}`}
      lead="Tasks come due when their climate signal arrives here: the day length, the frost dates, the first freezing nights, the bees' flying weather, the heating season and the rains."
      topic={[]}
    >
      {due.length ? (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {due.map((d) => (
            <Item key={d.task.id} d={d} />
          ))}
        </ul>
      ) : (
        <p className="text-ink-2">No task in the calendar comes due here this month.</p>
      )}
      {nextOnly.length > 0 && (
        <div className="mt-6">
          <p className="eyebrow">Coming in {MONTHS[month % 12]}</p>
          <ul className="mt-2 grid gap-x-8 border-t border-line sm:grid-cols-2">
            {nextOnly.map((d) => (
              <li key={d.task.id} className="border-b border-line py-2.5 text-sm">
                <Link href={`/homesteading/${d.task.topic}`} className="font-medium text-ink hover:text-moss">
                  {d.task.title}
                </Link>
                <span className="block text-xs text-ink-2">{d.trigger}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="mt-5 text-sm">
        <Link href="/homesteading/calendar" className="font-medium text-moss hover:underline">
          The whole homestead year →
        </Link>
      </p>
    </Panel>
  );
}

function DaylightPanel({ n, input, month, placeName }: { n: HomesteadNumbers; input: HomesteadInput; month: number; placeName: string }) {
  const d = n.daylight;
  const year = Number(input.today.slice(0, 4)) || 2026;
  const series = daylightYear(input.lat, input.lon, year);
  const monthly = MONTH_DAYS.map((_, i) => series[monthStart(i + 1) + 14 - 1] / 60);
  const method = `Worked out with NOAA's solar equations for ${placeName}'s latitude and longitude, sunrise to sunset.`;
  const below = (b: Daylight14, h: number) =>
    b.days === 0 ? `Never: the shortest day is ${hoursMinutes(d.shortestMin)}` : b.days >= 365 ? `All year: the longest day is ${hoursMinutes(d.longestMin)}` : `${dayLabel(b.down!)} to ${dayLabel(wrapDoy(b.up! - 1))}, ${b.days} days`;
  const change = d.weekChangeMin === 0 ? "about the same a week from now" : `${Math.abs(d.weekChangeMin)} minute${Math.abs(d.weekChangeMin) === 1 ? "" : "s"} ${d.weekChangeMin > 0 ? "longer" : "shorter"} a week from now`;
  return (
    <Panel
      id="daylight"
      eyebrow="Daylight and laying"
      title={`How long the day is in ${placeName}, and what it means for laying`}
      lead="Hens lay by the length of the day: about 14 hours keeps them laying, and below 12 hours laying falls and often stops (Virginia Cooperative Extension)."
      topic="laying-hens"
    >
      <div className={grid}>
        <Figure label="Daylight today" value={hoursMinutes(d.todayMin)} method={method}>
          {change[0].toUpperCase() + change.slice(1)}.
        </Figure>
        <Figure label="Shorter than 14 hours" value={below(d.below14, 14)} method={method}>
          {d.below14.days >= 365 ? "The day never reaches the 14 hours that keep hens laying on daylight alone." : d.below14.days === 0 ? "Natural daylight alone keeps hens laying all year." : "Hens laying on daylight alone slow down through these days."}
        </Figure>
        <Figure label="Shorter than 12 hours" value={below(d.below12, 12)} method={method}>
          {d.below12.days === 0 ? "The day never falls below 12 hours." : "The span when laying often stops without added light."}
        </Figure>
        <Figure
          label="Shortest day"
          value={d.polarNight ? `No sunrise for ${d.polarNightDays} days` : `${hoursMinutes(d.shortestMin)} (${dayLabel(d.shortestDoy)})`}
          method={`${method} Light limits: Virginia Cooperative Extension, University of Arizona.`}
        >
          {d.polarNight
            ? `Polar night runs from ${dayLabel(d.polarNight.start)} to ${dayLabel(d.polarNight.end)}: a 14-hour day would be lamp light only.`
            : d.addOnShortestMin > 0
              ? `Holding a ${LAYING_HOURS}-hour day would take ${hoursMinutes(d.addOnShortestMin)} of light added before dawn, and never more than ${MAX_LIGHT_HOURS} hours in all.`
              : "Even the shortest day gives 14 hours of light."}
        </Figure>
      </div>
      <MonthBars
        values={monthly}
        month={month}
        label={`Day length in the middle of each month at ${placeName}`}
        strong={monthly.map((h, i) => (h >= LAYING_HOURS ? i + 1 : 0)).filter(Boolean)}
        lines={[
          { value: 14, label: "14 h" },
          { value: 12, label: "12 h" },
        ]}
        format={(h) => h.toFixed(1)}
        unit="h"
        tone="gold"
      />
      <p className="mt-2 text-xs leading-relaxed text-ink-2">
        Bars: hours of daylight on the 15th of each month; darker where the day passes 14 hours. Dashed lines at 14 and 12 hours.
      </p>
    </Panel>
  );
}
type Daylight14 = HomesteadNumbers["daylight"]["below14"];

/** Breeds whose sources mark them for the cold or the heat that a place has (the flags come from `extremeFigures`). */
function breedAdvice(longFreeze: boolean, hot: boolean): { animal: Animal; label: string; good: Breed[]; care: Breed[]; cool: Breed[] }[] {
  const animals: { animal: Animal; label: string }[] = [
    { animal: "hen", label: "Hens" },
    { animal: "duck", label: "Ducks" },
    { animal: "goat", label: "Dairy goats" },
  ];
  return animals.map(({ animal, label }) => {
    const list = BREEDS.filter((b) => b.animal === animal);
    const good = list.filter((b) => (longFreeze ? b.cold === "suited" : true) && (hot ? b.heat === "suited" : true) && (longFreeze || hot));
    const care = list.filter((b) => (hot && b.heat === "poor") || (longFreeze && b.cold === "poor"));
    const cool = longFreeze && !hot ? list.filter((b) => b.cold === "cool") : [];
    return { animal, label, good, care, cool };
  });
}

function ColdHeatPanel({ n, placeName, climate }: { n: HomesteadNumbers; placeName: string; climate: NonNullable<LocalData["climate"]> }) {
  const f = extremeFigures(placeName, climate, n.extremes);
  const advice = breedAdvice(f.longFreeze, f.hot);
  return (
    <Panel
      id="climate"
      eyebrow="Cold nights and hot days"
      title={`What the animals face in ${placeName}`}
      lead="Heat hurts homestead animals more than cold. Hens' body temperature rises above 27 °C and laying may fall above 32–35 °C (Ontario Ministry of Agriculture); rabbits stretch out to shed heat above 25–30 °C and suffer heat prostration at 35 °C (FAO). Cold matters most through frozen water."
      topic={["laying-hens", "ducks", "dairy-goats", "meat-rabbits"]}
    >
      <div className={grid}>
        {f.figures.map((x) => (
          <Figure key={x.id} label={x.label} value={x.value} method={x.method}>
            {x.note}
          </Figure>
        ))}
      </div>
      {f.records && <p className="mt-3 text-sm leading-relaxed text-ink-2">{f.records}</p>}
      <p className="mt-2 text-xs leading-relaxed text-ink-2">{f.footnote}</p>
      <div className="mt-6">
        <p className="eyebrow">Breeds for this climate</p>
        {f.longFreeze || f.hot ? (
          <>
            <p className="mt-1 text-sm text-ink-2">{f.breedIntro}</p>
            <ul className="mt-2 grid gap-x-8 border-t border-line sm:grid-cols-3">
              {advice.map((a) => (
                <li key={a.animal} className="border-b border-line py-2.5 text-sm">
                  <span className="font-medium text-ink">{a.label}: </span>
                  {a.good.length ? `${a.good.map((b) => b.name).join(", ")}.` : "none marked in our sources."}
                  {a.cool.length > 0 && <span className="block text-xs text-ink-2">Best in cool climates: {a.cool.map((b) => b.name).join(", ")}.</span>}
                  {a.care.length > 0 && <span className="block text-xs text-ink-2">Need extra care here: {a.care.map((b) => b.name).join(", ")}.</span>}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-1 text-sm text-ink-2">{f.breedIntro}</p>
        )}
        <p className="mt-2 text-xs text-ink-2">
          Listed where the breed&apos;s source (the Livestock Conservancy, Oklahoma State University, the American Dairy Goat Association) says it suits the cold or the heat; {f.breedRule}.
        </p>
      </div>
    </Panel>
  );
}

function RoofPanel({ n, data, month, placeName }: { n: HomesteadNumbers; data: LocalData; month: number; placeName: string }) {
  const r = n.roof!;
  const dry = data.regime?.dryMonths ?? [];
  const tiny = r.annualRainMm < 100;
  // A month is left out as frozen only when it averages more than a degree below 0 °C in the town's means; one within a degree of
  // freezing is counted and named (src/lib/homestead/climate FROZEN_MARGIN_C; Day 4 audit, 13 Nov 2026: Boise's January,
  // −0.05 °C on the grid and +0.1 °C at the airport, was dropped on that knife edge).
  const near = r.nearFreezing;
  const nearL = near.reduce((a, x) => a + x.litres, 0);
  // Day 5 audit, 14 November 2026: these lines said "on the ERA5 weather-model grid" at the 74 towns whose monthly
  // temperatures are now a station's normals (scripts/build-station-normals.ts); they name the source the means come from.
  const temps = tempWords(data.climate);
  const onGrid = !tempsFromStation(data.climate);
  const nearNote = near.length
    ? ` ${near.map((x) => `${MONTHS[x.month - 1]} (${degC(x.meanC)})`).join(", ")} ${near.length === 1 ? "averages" : "average"} within a degree of freezing on ${temps}, too close to call from monthly averages${onGrid ? " over a 30 km grid" : ""}: ${near.length === 1 ? "it is" : "they are"} counted, about ${litres(nearL)} litres (${Math.round((nearL / Math.max(1, r.annualL)) * 100)} % of the year's catch), which a cold winter leaves on the roof as snow.`
    : "";
  const frozenNote =
    (r.frozenMonths > 0
      ? ` The ${r.frozenMonths === 1 ? "month" : `${r.frozenMonths} months`} averaging more than a degree below 0 °C on ${temps} ${r.frozenMonths === 1 ? "is" : "are"} left out: snow sits on the roof and the system is drained.`
      : "") + nearNote;
  const method = `Worked out from ${placeName}'s average monthly precipitation (rain and melted snow) × 100 m² of roof footprint × ${Math.round(RUNOFF.mid * 100)} % collection efficiency (Texas Water Development Board).${frozenNote}`;
  const st = r.storage;
  // The tank is drained for the winter and starts each spring empty: name the months a full draw cannot be met.
  const shortNote = st.short.length
    ? ` In ${st.short.map((m) => SHORT_MONTHS[m - 1]).join(", ")} the roof catches less than that and the tank has nothing in hand, so the full draw cannot be kept up.`
    : "";
  const freeze = n.coldHeat?.below0.main;
  // The figure is total precipitation (GHCN-Daily PRCP, or ERA5 precipitation_sum): rain plus the melted water of snow, hail and ice.
  const c = data.climate;
  const precipSource =
    c?.rainSource === "station" && c.rainStation
      ? `Total precipitation (rain plus melted snow) from ${stationName(c.rainStation)}${c.rainStationKm != null && c.rainStationKm >= 3 ? `, ${Math.round(c.rainStationKm)} km away` : ""}, 1991–2020 monthly means.`
      : "Total precipitation (rain plus melted snow) averaged over ten years of ERA5 reanalysis; no weather station record was within reach.";
  return (
    <Panel
      id="water"
      eyebrow="Roof water"
      title={`What 100 m² of roof collects in ${placeName}`}
      lead="One millimetre of rain on one square metre of roof is one litre; a roof delivers 75–90 % of it. Collected roof water is not drinking water without filtration, disinfection and testing (CDC; Texas Water Development Board)."
      topic="rainwater"
    >
      <div className={grid}>
        <Figure label={r.frozenMonths > 0 ? "Precipitation in the open months" : "Precipitation a year"} value={`${n0(r.annualRainMm)} mm`} method={`${precipSource}${frozenNote}`}>
          {data.regime ? `${data.regime.name} climate${dry.length && dry.length < 12 ? `; dry months ${dry.map((m) => SHORT_MONTHS[m - 1]).join(", ")}` : ""}.` : null}
        </Figure>
        <Figure label="From 100 m² of roof" value={`${litres(r.annualL)} litres a year`} method={method}>
          Between {litres(r.annualRangeL[0])} and {litres(r.annualRangeL[1])} litres at the 75–90 % efficiencies installers assume
          {r.frozenMonths > 0 ? `, over the ${12 - r.frozenMonths} months above freezing` : ""}.
        </Figure>
        <Figure
          label={dry.length && dry.length < 12 ? "Storage for the dry months" : "Storage to even out the year"}
          value={tiny ? "Too little rain to store" : st.litres > 0 ? `${litres(st.litres)} litres` : "Hardly any"}
          method={`The Texas manual's monthly water balance: each month's catch in, an even daily draw out, run through an average year${r.frozenMonths > 0 ? ", with the frozen months drained" : ""}.`}
        >
          {tiny
            ? "So little rain and snow falls here that a roof cannot be a water supply."
            : st.from && st.to
              ? `To draw ${litres(st.dailyL)} litres every day${r.frozenMonths > 0 ? " of the open season" : ""}, the roof's own average, a tank this size carries the water from the wetter months through ${monthRange(st.from, st.to)}, when the tank runs down.${shortNote}`
              : `Rain and melted snow arrive evenly enough through the year that the tank barely runs down.${shortNote}`}
        </Figure>
        <Figure label="First flush per storm" value={`${n0(r.firstFlushL[0])}–${n0(r.firstFlushL[1])} litres`} method="1–2 US gallons per 100 sq ft of roof, the Texas manual's figure, for 100 m².">
          The first rain off the roof carries the most dirt and droppings; divert it away from the tank (CDC).
        </Figure>
      </div>
      <MonthBars
        values={r.monthlyL}
        month={month}
        label={`Litres collected each month from 100 m² of roof at ${placeName}`}
        strong={st.from && st.to ? monthsBetween(st.from, st.to) : []}
        format={(v) => (v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k` : String(Math.round(v) + 0))}
        unit="L"
        tone="azure"
      />
      <p className="mt-2 text-xs leading-relaxed text-ink-2">
        Bars: litres collected in an average month from 100 m² of roof at 85 %{st.from && st.to ? `; darker, the months the tank runs down (${monthRange(st.from, st.to)})` : ""}{r.frozenMonths > 0 ? "; nothing in the months averaging below freezing" : ""}.
        {freeze
          ? ` On ${temps}${onGrid ? ", a 30 km average and not a weather station," : ""} average nights freeze from ${dayLabel(freeze.start)}${n.frost && !n.frost.rare && n.frost.source === "stations" ? `; ${stationWords(c)}, the average first frost is ${n.frost.firstFallLabel}` : ""}. Drain and disconnect barrels before the first hard freeze (Penn State Extension).`
          : ""}
      </p>
      <OrgLine place={data.place} topic="water" waters={pageWaters(data.water)} label="Who looks after the water here" className="mt-5" />
    </Panel>
  );
}
function monthsBetween(from: number, to: number): number[] {
  const out: number[] = [];
  let m = from;
  for (let k = 0; k < 12; k++) {
    out.push(m);
    if (m === to) break;
    m = (m % 12) + 1;
  }
  return out;
}

function WoodPanel({ n, month, placeName, climate }: { n: HomesteadNumbers; month: number; placeName: string; climate: LocalData["climate"] }) {
  const h = n.heating!;
  const s = h.season;
  const coldestIdx = h.monthly.indexOf(Math.max(...h.monthly));
  const allYear = s && ((s.to - s.from + 12) % 12) + 1 >= 12;
  const splitFrom = s && !allYear ? wrapDoy(monthStart(s.from) - 213) : null;
  const splitTo = s && !allYear ? wrapDoy(monthStart(s.from) - 152) : null;
  const method = `Heating degree days to base ${HDD_BASE_C} °C from each month's mean temperature on ${tempWords(climate)}, by Erbs, Klein and Beckman's method (ASHRAE Journal, 1983), which allows for days colder and warmer than the month's average.`;
  const beechStere = FIREWOOD.find((w) => w.latin === "Fagus sylvatica")?.kwhStere ?? 0;
  return (
    <Panel
      id="wood"
      eyebrow="Wood heat"
      title={`How much heating ${placeName} needs`}
      lead="A heating degree day counts how far a day falls below 18 °C; a year's total measures how much heating a place needs. Burn wood below 20 % moisture, seasoned for at least six months (US EPA)."
      topic="wood-heat"
    >
      <div className={grid}>
        <Figure label="Heating degree days" value={`${n0(h.annual)} °C-days a year`} method={method}>
          {h.annual < 100 ? "Almost no heating need on average." : `The coldest month, ${MONTHS[coldestIdx]}, carries ${n0(h.monthly[coldestIdx])}.`}
        </Figure>
        <Figure label="Heating season" value={!s ? "None to speak of" : allYear ? "Spread through the year" : monthRange(s.from, s.to)} method="The longest run of months that each carry at least 5 % of the year's heating degree days.">
          {!s ? "Average days rarely fall far enough below 18 °C to need heat." : allYear ? "The need is small and spread evenly over the months." : "Most of the year's heating falls in these months."}
        </Figure>
        <Figure
          label="Split next winter's wood"
          value={splitFrom && splitTo ? `${dayLabel(splitFrom).split(" ")[0]} to ${dayLabel(splitTo).split(" ")[0]}` : "Any time, six months ahead"}
          method="At least six months before the heating season, the US EPA's seasoning time; beech and spruce dry within a year (Bavarian State Institute of Forestry)."
        >
          Stack it off the ground in sun and wind, top covered and sides open.
        </Figure>
        {/* European beech is the Bavarian State Institute of Forestry's reference wood, not a fuel of this town: the Day 4 audit (13
            Nov 2026) found "A stacked cubic metre of beech" on every town's page, Phoenix and Miami among them, with no word of
            what the figure stands for. It is labelled as the reference, with the leaflet's own figure beside the table's. */}
        <Figure
          label="Reference wood: European beech"
          value={`About ${n0(Math.round(beechStere / 100) * 100)} kWh a stacked m³`}
          method="Net heat at 20 % water content of a stacked cubic metre of European beech (Fagus sylvatica), worked out by the Bavarian State Institute of Forestry's method (Merkblatt 20) from the Global Wood Density Database; the leaflet's own figure is 1,885 kWh."
        >
          A yardstick from German forestry, not a measure of the trees near {placeName}; the species table gives the heat of other woods.
        </Figure>
      </div>
      <MonthBars values={h.monthly} month={month} label={`Heating degree days each month at ${placeName}`} strong={s && !allYear ? monthsBetween(s.from, s.to) : []} unit="°C·d" tone="rust" />
      <p className="mt-2 text-xs leading-relaxed text-ink-2">
        Bars: heating degree days each month (base 18 °C){s && !allYear ? `; darker, the heating season` : ""}. Fit carbon-monoxide alarms on every level and outside sleeping areas (CPSC), and have the chimney cleaned and inspected every year (BC Office of the Fire Commissioner).
      </p>
    </Panel>
  );
}

function SeasonPanel({ n, data, placeName }: { n: HomesteadNumbers; data: LocalData; placeName: string }) {
  const f = n.frost!;
  // The audit of 10 November 2026 found "weather stations within 15 km" printed where the stations reach 20 km or
  // there is one: the line names the station(s) and distances from the frost file, or says the dates are estimated.
  const c = data.climate;
  const provenance =
    f.source === "stations"
      ? (frostProvenance(data.place.slug) ?? (c ? `Average frost dates ${frostSourceWords(c)}, 1991–2020.` : "Average frost dates from weather stations, 1991–2020."))
      : "Average frost dates estimated from the ERA5 climate reanalysis, not measured at a weather station.";
  if (f.rare) {
    return (
      <Panel id="season" eyebrow="Season extension" title={`Frost is rare in ${placeName}`} topic="season-extension" lead="Covers and tunnels are for keeping off frost and holding warmth; where frost is rare their job is mostly over. Under covers, heat is the risk: open them before it passes 32 °C underneath (NC State Extension).">
        <div className={grid}>
          <Figure label="Frost" value="Rare" method="From the place's climate normals: the average year has no frost season.">
            {data.climate ? `On ${tempWords(data.climate)}, the coldest month averages ${n.coldHeat?.coldest.minC.toFixed(1)} °C at night.` : null}
          </Figure>
        </div>
      </Panel>
    );
  }
  const method = `${provenance} Covers add as much as 2–4 weeks at each end (WSU Extension).`;
  return (
    <Panel
      id="season"
      eyebrow="Season extension"
      title={`Stretching the season in ${placeName}`}
      lead="Row covers and low tunnels give 2–3 °C of frost protection (NC State Extension) and can add as much as two to four weeks at each end of the season (WSU Extension)."
      topic="season-extension"
    >
      <div className={grid}>
        <Figure label="Frost-free season" value={`${f.frostFreeDays} days`} method={provenance}>
          Last spring frost about {f.lastSpringLabel}; first autumn frost about {f.firstFallLabel}.
        </Figure>
        <Figure label="Covers on in spring" value={`${dayLabel(f.coverFrom![0])} to ${dayLabel(f.coverFrom![1])}`} method={method}>
          Two to four weeks before the last spring frost: cold frames and low tunnels in place, vented on sunny days.
        </Figure>
        <Figure label="Covers in autumn" value={`Until ${dayLabel(f.coverUntil![0])} to ${dayLabel(f.coverUntil![1])}`} method={method}>
          Two to four weeks past the first autumn frost, with covers on before it.
        </Figure>
        {/* Capped at the year (src/lib/homestead/climate.ts frostSeason): Houston's covers reach right across its frost season. */}
        <Figure
          label="Season with covers"
          value={f.extendedDays![0] >= 365 ? "All year" : f.extendedDays![1] >= 365 ? `${f.extendedDays![0]} days to all year` : `${f.extendedDays![0]} to ${f.extendedDays![1]} days`}
          method={method}
        >
          Against {f.frostFreeDays} days in the open.{f.extendedDays![1] >= 365 ? " The frost season here is short enough for covers to carry crops through all of it." : ""} Frost comes earlier or later than average in any one year.
        </Figure>
      </div>
    </Panel>
  );
}

function BeesPanel({ n, month, placeName, climate, place }: { n: HomesteadNumbers; month: number; placeName: string; climate: NonNullable<LocalData["climate"]>; place: Place }) {
  const b = n.bees!;
  const method = `From the average afternoon highs, spread day by day, against the bees' thresholds: rarely flying below ${BEE_FORAGE_C} °C and foraging most from ${BEE_FULL_C} °C (Pacific Northwest Extension).`;
  const longCluster = b.confined.days >= 90;
  return (
    <Panel
      id="bees"
      eyebrow="Bees"
      title={`The bee season in ${placeName}`}
      lead="Honeybees rarely fly below 13 °C, forage more from 16 °C and most from about 18–21 °C (Pacific Northwest Extension). Stings come with keeping bees: anyone who reacts badly to them should see an allergist first (AAAAI)."
      topic="honeybees"
    >
      <div className={grid}>
        <Figure label={`Afternoons of ${BEE_FORAGE_C} °C or more`} value={spanText(b.forage, "foraging days")} method={method}>
          {b.forageMonths.length === 12 ? "Bees can forage in every month here." : b.forageMonths.length ? `Months: ${b.forageMonths.map((m) => SHORT_MONTHS[m - 1]).join(", ")}.` : "The average afternoon never reaches 13 °C."}
        </Figure>
        <Figure label={`Afternoons of ${BEE_FULL_C} °C or more`} value={spanText(b.full, "days of full foraging")} method={method}>
          The weather for the most foraging.
        </Figure>
        <Figure label={`Afternoons below ${BEE_FLIGHT_MIN_C} °C`} value={spanText(b.confined, "days this cold")} method={`From the average afternoon highs. Flights were recorded only above 9.3 °C in winter (Kang and Jung 2024); open hives only above 10 °C (UF/IFAS).`}>
          {b.confined.days ? "The colony keeps to its cluster on its stores." : "No long winter cluster on average."}
        </Figure>
        <Figure label="Winter stores" value={longCluster ? "Heavy" : b.confined.days ? "Moderate" : "Light"} method="University of Florida IFAS: about 41 kg (90 lb) of honey for a colony in the far north; colonies under 15,000 bees rarely survive a freezing winter.">
          {longCluster ? `A cluster of ${b.confined.days} days: plan for the heavy stores of a northern winter, and heft the hive in autumn.` : "A short or no cluster; heft the hive in autumn all the same."}
        </Figure>
      </div>
      <MonthBars
        values={climate.monthlyMeanMax}
        month={month}
        label={`Average afternoon high each month at ${placeName}`}
        strong={b.forageMonths}
        lines={[
          { value: BEE_FULL_C, label: `${BEE_FULL_C}°` },
          { value: BEE_FORAGE_C, label: `${BEE_FORAGE_C}°` },
        ]}
        min={Math.min(0, Math.floor(Math.min(...climate.monthlyMeanMax) / 5) * 5)}
        format={(v) => v.toFixed(0)}
        unit="°C"
        tone="moss"
      />
      <p className="mt-2 text-xs leading-relaxed text-ink-2">Bars: average afternoon high each month; darker where it reaches 13 °C. Dashed lines at 13 °C and 18 °C.</p>
      <OrgLine place={place} topic="pollinators" label="Who looks after the bees here" className="mt-5" />
    </Panel>
  );
}

// ---- the page --------------------------------------------------------------------

function Breadcrumbs({ place }: { place: Place }) {
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "Homesteading", item: `${SITE.url}/homesteading` },
          { "@type": "ListItem", position: 3, name: place.label, item: `${SITE.url}/homesteading/${place.slug}` },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />;
}

/** The opening line under the title. */
function standfirst(data: LocalData, n: HomesteadNumbers): string | undefined {
  const r = data.regime;
  if (!r) return undefined;
  const parts = [r.summary];
  const f = n.frost;
  if (f && !f.rare) parts.push(`Here the frost-free season runs about ${f.frostFreeDays} days, from ${f.lastSpringLabel} to ${f.firstFallLabel}.`);
  return parts.join(" ");
}

export async function HomesteadPlacePage({ place }: { place: Place }) {
  const data = await getLocalData(place);
  const input: HomesteadInput = { lat: place.lat, lon: place.lon, climate: data.climate, regime: data.regime, today: data.today, extremes: getExtremes(place.slug) };
  const n = homesteadNumbers(input);
  const sd = signalDates(input);
  const due = tasksInMonth(sd, data.month);
  const next = tasksInMonth(sd, (data.month % 12) + 1);
  const f = data.forecast;
  const today = f.days[0];
  const frostStat =
    n.frost && !n.frost.rare
      ? data.daysToFirstFrost != null
        ? `~${data.daysToFirstFrost} days (${n.frost.firstFallLabel})`
        : (n.frost.firstFallLabel ?? "—")
      : "Rare";
  // The "who looks after" panel and the food band below it never name the same body twice (see splitWithPanel).
  const waters = pageWaters(data.water);
  const split = splitWithPanel(
    orgsFor(place, { topic: SECTION_TOPICS.homesteading, waters, limit: 3, exclude: FOOD_RECORD_SLUGS }).map((m) => m.org.slug),
    SECTION_FOOD.homesteading,
  );

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <Breadcrumbs place={place} />
        <PlaceHero data={data} title={`Homesteading in ${place.name}`} standfirst={standfirst(data, n)} />
        <GuideHeader place={place} current="homesteading" timeZone={f.timezone} />

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat label="Now" value={`${Math.round(f.current.temp) + 0}°C · ${weatherLabel(f.current.code)}`} />
          <Stat label="Today" value={today ? `${Math.round(today.tMax) + 0}° / ${Math.round(today.tMin) + 0}°` : "—"} />
          <Stat label="Daylight" value={hoursMinutes(n.daylight.todayMin)} />
          <Stat label="First frost" value={frostStat} />
        </div>
        <AsOf savedAt={data.fetchedAt} what="Weather" timeZone={f.timezone} />

        <div className="mt-10 grid gap-10">
          <ThisMonth due={due} next={next} month={data.month} placeName={place.name} />
          {data.climate && data.regime && <ClimateYear climate={data.climate} regime={data.regime} month={data.month} placeName={place.name} />}
          <DaylightPanel n={n} input={input} month={data.month} placeName={place.name} />
          {n.coldHeat && data.climate && <ColdHeatPanel n={n} placeName={place.name} climate={data.climate} />}
          {n.roof && <RoofPanel n={n} data={data} month={data.month} placeName={place.name} />}
          {n.heating && <WoodPanel n={n} month={data.month} placeName={place.name} climate={data.climate} />}
          {n.frost && <SeasonPanel n={n} data={data} placeName={place.name} />}
          {n.bees && data.climate && <BeesPanel n={n} month={data.month} placeName={place.name} climate={data.climate} place={place} />}
          {!data.climate && (
            <p className="rounded-tile border border-line bg-paper-2/60 p-4 text-sm text-ink-2">
              The climate normals for {place.name} could not be read just now, so only the daylight figures are shown. Try again later.
            </p>
          )}
        </div>

        <div className="mt-12 max-w-4xl">
          <CheckBox
            title={`Before you start in ${place.name}: what to check, and with whom`}
            items={[
              { what: "Whether hens, ducks, goats, rabbits or bees are allowed on your lot, how many, and how far from the boundary", who: "your municipality's by-law, zoning or planning office" },
              { what: "Registering poultry flocks, hives and goats", who: "your national animal-health agency, and for bees the provincial, state or national bee inspector" },
              { what: "Collecting rainwater and connecting it to the house", who: "the water-resources or environment department, and the building and health departments" },
              { what: "Burning rules and permits for a stove or chimney", who: "your municipality, the environment agency and the building department" },
              { what: "Selling eggs, milk, honey or meat", who: "the food-safety authority" },
            ]}
          />
        </div>

        <div className="mt-10">
          <WhoProtects place={place} topic={SECTION_TOPICS.homesteading} waters={waters} exclude={split.panelExclude} title="Who looks after the soil, seed, water and trees here" />
        </div>

        {/* Community farms, local food and markets, seed to swap near the town. */}
        <FoodPanel place={place} section="homesteading" exclude={split.bandExclude} className="mt-10" />

        <NoteCTA
          className="mt-10"
          title={<>The homesteading note for {place.name}, every week</>}
          body="One email, Sunday evening. Unsubscribe anytime."
          source="place-homesteading"
          location={place.label}
        />
      </div>
    </>
  );
}
