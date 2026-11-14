/**
 * The gardening page for a place where frost sets the year: the garden year
 * and today's place in it, the week's frost forecast and what it means crop by
 * crop, what is ready, what to put up, what to plant before the ground
 * freezes, the year's climate and the sowing calendar.
 */
import Link from "next/link";
import type { LocalData } from "@/lib/types";
import { CROPS, HARDINESS, RECIPES, cropFrostCall, cropName, cropsInMonth, frostCall, localCrops, recipesInSeason, type Crop, type FrostAction, type Recipe } from "@/lib/crops";
import { monthSpans } from "@/lib/regime";
import { cropCalendar, doyLabel, doyOfIso, inGround, nextSowing, sowNow, type CropFit } from "@/lib/crop-calendar";
import { zoneScoped } from "@/lib/zone-scope";
import { OATS_DAYS_BEFORE_FIRST_FROST, autumnPlantings, bulbsOpen, garlicState, type AutumnId, type GarlicState } from "@/lib/autumn-planting";
import { fitsFor, sowingTasks } from "@/lib/soil-sowing";
import { frostDatesOf, gardenDoy, gardenYear, isTropical } from "@/lib/garden-year";
import { ClimateYear } from "./ClimateYear";
import { CropGrid, RecipeCard } from "./CropCard";
import { GardenYearStrip, type FrostDates, type GardenYear } from "./GardenYearStrip";
import { SowingCalendar } from "./SowingCalendar";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekday = (date: string) => new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });

/** The frost-night chips; each tooltip is the crop's frost note held to the town's hardiness zone (src/lib/zone-scope). */
function Chips({ crops, tone, cc, zone }: { crops: Crop[]; tone: "pick" | "cover" | "fine"; cc?: string; zone?: number | null }) {
  const cls =
    tone === "pick"
      ? "border-rust/40 bg-rust-soft text-rust hover:bg-rust/20"
      : tone === "cover"
        ? "border-gold-fill/60 bg-gold-fill/20 text-ink hover:bg-gold-fill/30"
        : "border-moss/40 bg-moss-soft text-moss hover:bg-moss/20";
  if (!crops.length) return <p className="text-sm text-ink-2">None in the ground now.</p>;
  return (
    <ul className="mt-1.5 flex flex-wrap gap-1.5">
      {crops.map((c) => (
        <li key={c.slug}>
          <Link href={`/gardening/crops/${c.slug}`} className={`inline-block rounded-full border px-3 py-1 text-sm font-medium transition ${cls}`} title={zoneScoped(c.frostNote, zone)}>
            {cropName(c, cc)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Tonight (and the week) against every crop still in the ground. */
export function FrostNight({ data }: { data: LocalData }) {
  const days = data.forecast.days.slice(0, 7);
  const frosty = days.filter((d) => d.tMin <= 2);
  if (!frosty.length) {
    const coldest = days.length ? Math.round(Math.min(...days.map((d) => d.tMin))) : null;
    return (
      <div id="frost" className="scroll-mt-24 rounded-tile bg-moss-soft px-5 py-4">
        <p className="eyebrow text-moss">Frost forecast · {data.place.name}</p>
        <p className="mt-1 text-ink">
          No frost in the next seven days; the coldest night is {coldest} °C.
          {data.daysToFirstFrost != null
            ? ` The average first frost is about ${data.daysToFirstFrost} days away; harvest tender crops before then.`
            : " Hardy crops continue; tender crops still in the ground are past their usual season."}
        </p>
      </div>
    );
  }
  const first = frosty[0];
  const coldest = frosty.reduce((a, b) => (b.tMin < a.tMin ? b : a));
  const when = first.date === days[0].date ? "tonight" : `${weekday(first.date)} night`;
  // The crops in the ground today by the town's own calendar (annuals from a sowing to its last picking, perennials in
  // their harvest months), not the library's northern months: the 10 Nov 2026 audit found the week's frost advice
  // naming crops whose season had ended weeks before. The library's months only where the calendar cannot be worked out.
  const fits = fitsFor(data);
  const doy = doyOfIso(data.today);
  const here = fits.filter((f) => (f.perennial ? f.harvest.includes(data.month) : inGround(f, doy))).map((f) => f.crop);
  const call = fits.length
    ? here.reduce<Record<FrostAction, Crop[]>>((acc, c) => (acc[cropFrostCall(c, coldest.tMin)].push(c), acc), { harvest: [], cover: [], leave: [] })
    : frostCall(coldest.tMin, data.place.lat < 0 ? ((data.month + 5) % 12) + 1 : data.month);
  const cc = data.place.countryCode;
  return (
    <div id="frost" className="scroll-mt-24 rounded-tile bg-rust-soft p-5 sm:p-6">
      <p className="eyebrow text-rust">Frost forecast · {data.place.name}</p>
      <h3 className="font-display mt-1 text-2xl font-semibold leading-tight">
        {coldest.tMin > 0 ? "Frost risk" : "Frost"} {when}: down to {Math.round(coldest.tMin)} °C{coldest.date !== first.date ? ` by ${weekday(coldest.date)}` : ""}
      </h3>
      <p className="mt-1 text-sm text-ink-2">
        Forecast lows are measured at head height; at bed level on a still, clear night it is usually one or two degrees colder. The effect of that low on
        crops in the ground now:
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-rust">Harvest before dark</p>
          <Chips crops={call.harvest} tone="pick" cc={cc} zone={data.climate?.zoneNumber} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">Cover overnight</p>
          <Chips crops={call.cover} tone="cover" cc={cc} zone={data.climate?.zoneNumber} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-moss">Leave in the ground</p>
          <Chips crops={call.leave} tone="fine" cc={cc} zone={data.climate?.zoneNumber} />
        </div>
      </div>
      <p className="mt-3 text-xs text-ink-2">
        Select a crop for storage and preserving. Cover with fabric sheeting rather than plastic, held off the leaves on stakes; put it on before sunset and
        remove it in the morning.
      </p>
    </div>
  );
}

type PhaseId = "rest" | "start" | "sow" | "grow" | "harvest" | "bed";

/** What the phase adds: the autumn plantings, or spring's sowing list. */
/** Crops as small links to their pages' "next year" section. */
function Pills({ crops, cc, hash = "#next-year" }: { crops: Crop[]; cc?: string; hash?: string }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {crops.map((c) => (
        <li key={c.slug}>
          <Link
            href={`/gardening/crops/${c.slug}${hash}`}
            className="inline-block rounded-full border border-edge bg-surface px-3 py-1 text-sm hover:border-moss hover:text-moss"
          >
            {cropName(c, cc)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

type PhaseExtrasProps = {
  phase: PhaseId;
  lastFrostDoy: number | null;
  today: number;
  cc?: string;
  fits: CropFit[];
  month: number;
  /** Day of the year (calendar) in the place's own date. */
  calToday: number;
  garlic: GarlicState;
  /** Is the ground diggable this month (the month's mean daytime high is 0 °C or more)? */
  groundOpen: boolean;
  /** Is the oats window open (more than three weeks before the average first frost)? Null where frost dates are not measured. */
  coverOpen: boolean | null;
};

const list = (xs: string[]) => (xs.length <= 1 ? (xs[0] ?? "") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/**
 * One autumn planting, as a card. Open ones say what to do; ones whose window has closed (or has not opened)
 * say so. Garlic's window is this town's calendar (the two months before the soil goes cold); no date for the
 * ground freezing is printed, since none is measured here. Oats follow OMAFRA's date for Ontario, labelled as one
 * region's rule (see src/lib/autumn-planting).
 */
function AutumnCard({ id, open, garlic, garlicMonths }: { id: AutumnId; open: boolean; garlic: GarlicState; garlicMonths: string }) {
  if (id === "garlic") {
    return (
      <li className={`card p-4 ${open ? "" : "opacity-80"}`}>
        <p className="font-display text-lg font-semibold">{cropName({ slug: "garlic", name: "Garlic" })}</p>
        {open && (
          <p className="mt-1 text-sm text-ink-2">
            Cloves go in about four to six weeks before the ground freezes, pointy end up, 5 cm deep, under a thick mulch of leaves. This town&apos;s calendar puts
            planting in {garlicMonths}.
          </p>
        )}
        {!open && garlic === "closed" && (
          <p className="mt-1 text-sm text-ink-2">
            Window closed for this year: this town&apos;s calendar puts planting in {garlicMonths}, the weeks before the soil goes cold. Plant in {garlicMonths} next
            year.
          </p>
        )}
        {!open && garlic === "later" && (
          <p className="mt-1 text-sm text-ink-2">Not yet: this town&apos;s calendar puts planting in {garlicMonths}, about four to six weeks before the ground freezes.</p>
        )}
        <Link href="/gardening/crops/garlic" className="mt-2 inline-block text-sm font-medium text-moss hover:underline">
          Garlic: planting and storage →
        </Link>
      </li>
    );
  }
  if (id === "bulbs") {
    return (
      <li className={`card p-4 ${open ? "" : "opacity-80"}`}>
        <p className="font-display text-lg font-semibold">Spring bulbs</p>
        <p className="mt-1 text-sm text-ink-2">
          {open
            ? "Tulips, daffodils, alliums and crocus need about six weeks in cool soil before the ground freezes. Plant at three times the bulb's height, while the soil can still be dug."
            : "Window closed for this year: daytime highs average below 0 °C this month, so the ground is frozen. Plant bulbs next autumn, about six weeks before it freezes."}
        </p>
      </li>
    );
  }
  return (
    <li className={`card p-4 ${open ? "" : "opacity-80"}`}>
      <p className="font-display text-lg font-semibold">Cover crop</p>
      {open ? (
        <p className="mt-1 text-sm text-ink-2">
          Oats sown on cleared beds are killed by winter cold, so there is nothing to dig in. Ontario&apos;s agriculture ministry (OMAFRA) sows oats in early to mid-September,
          about three weeks before the average first frost; that is one region&apos;s rule, so check your local extension office.
        </p>
      ) : (
        <p className="mt-1 text-sm text-ink-2">
          Oats: window closed. Ontario&apos;s agriculture ministry (OMAFRA) sows oats in early to mid-September, about three weeks before the average first frost, and after
          mid-September switches to winter wheat, cereal rye or triticale. Rye sown late is marginal: University of Vermont trials found rye sown after about mid-October
          lost 57% of its ground cover and 44% of its biomass. These are Ontario and Vermont figures; check your local extension office.
        </p>
      )}
    </li>
  );
}

/** What the phase adds: the autumn plantings read against their windows, or spring's sowing read against today. */
function PhaseExtras({ phase, lastFrostDoy, today, cc, fits, month, calToday, garlic, groundOpen, coverOpen }: PhaseExtrasProps) {
  if (phase === "harvest" || phase === "bed") {
    const g = fits.find((f) => f.crop.slug === "garlic");
    const garlicMonths = g ? monthSpans([...new Set([...g.sow, ...g.watered])].sort((a, b) => a - b)) : "";
    const { open, notOpen } = autumnPlantings({ garlic, bulbsOpen: bulbsOpen(garlic, groundOpen, phase), coverOpen: coverOpen === true });
    // Garlic is left out where the town's calendar grows none; the cover crop where the first frost is not measured.
    const shown = (id: AutumnId) => !(id === "garlic" && garlic === "none") && !(id === "cover" && coverOpen === null);
    const cards = [...open, ...notOpen].filter(shown);
    if (!cards.length) return null;
    const anyOpen = open.some(shown);
    return (
      <section>
        <p className="eyebrow text-moss">Autumn planting</p>
        <h3 className="font-display mt-1 text-2xl font-semibold tracking-tight">
          {anyOpen ? "Still to plant before the ground freezes" : "The autumn planting windows have closed for this year"}
        </h3>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {cards.map((id) => (
            <AutumnCard key={id} id={id} open={open.includes(id)} garlic={garlic} garlicMonths={garlicMonths} />
          ))}
        </ul>
      </section>
    );
  }
  if (phase === "sow" || phase === "start") {
    const now = sowNow(fits, month, calToday);
    const sowToday = [...now.sow, ...now.sowWatered].sort((a, b) => Number(b.staple) - Number(a.staple)).map((f) => f.crop);
    const next = sowToday.length ? null : nextSowing(fits, calToday);
    // Trays are read from the same windows (the days each planting-out window opens, less the nursery weeks); the library's weeks-before-last-frost only where the town's calendar cannot be worked out.
    const days = lastFrostDoy != null ? lastFrostDoy - today : 0;
    const weeks = Math.round(days / 7);
    const indoors = fits.length
      ? now.trays.map((f) => f.crop)
      : CROPS.filter((c) => {
          const w = c.sow.indoorsWeeksBeforeLastFrost;
          return w != null && c.grow?.start !== "perennial" && days > 0 && (w === weeks || w === weeks + 1);
        });
    if (!fits.length && days <= 0) return null;
    return (
      <section className="grid gap-6 md:grid-cols-2">
        {indoors.length > 0 && (
          <div className="card p-5">
            <p className="eyebrow text-moss">{days > 0 ? `${weeks} week${weeks === 1 ? "" : "s"} to the last frost` : "Trays"}</p>
            <h3 className="font-display mt-1 text-xl font-semibold">Start in trays now</h3>
            <Pills crops={indoors} cc={cc} />
          </div>
        )}
        {fits.length > 0 && (
          <div className="card p-5">
            <p className="eyebrow text-moss">Outdoors</p>
            <h3 className="font-display mt-1 text-xl font-semibold">{sowToday.length ? "In their sowing window today" : "No crop is in its sowing window today"}</h3>
            {sowToday.length > 0 ? (
              <>
                <Pills crops={sowToday.slice(0, 14)} cc={cc} hash="" />
                {sowToday.length > 14 && <p className="mt-2 text-sm text-ink-2">and {sowToday.length - 14} more in the sowing calendar below.</p>}
              </>
            ) : (
              next && (
                <p className="mt-2 text-sm text-ink-2">
                  Next to open: {list(next.fits.slice(0, 4).map((f) => f.crop.name.toLowerCase()))} from {doyLabel(next.doy)}.
                </p>
              )
            )}
          </div>
        )}
      </section>
    );
  }
  return null;
}

/** The crops this town's calendar has coming in this month: staples first, then the most seasonal. */
function readyHere(fits: CropFit[], month: number): CropFit[] {
  return fits
    .filter((f) => f.harvest.includes(month) && f.harvest.length < 12)
    .sort((a, b) => Number(b.staple) - Number(a.staple) || a.harvest.length - b.harvest.length || a.crop.name.localeCompare(b.crop.name));
}

/** A crop card's line for this town: its own sowing and picking months. */
function localNote(f: CropFit, placeName: string): string {
  const sown = [...new Set([...f.sow, ...f.watered, ...f.trays])].sort((a, b) => a - b);
  const pick = `Picked ${monthSpans(f.harvest)} in ${placeName}`;
  if (f.perennial) return `${pick}; a perennial that does well here.`;
  if (!sown.length) return `${pick}.`;
  return `${pick}, from sowings ${f.trays.length && !f.sow.length ? "started in trays " : ""}${monthSpans(sown)}.`;
}

/** One putting-up recipe for each of these crops, in their order. */
function recipesFor(crops: Crop[], n: number): Recipe[] {
  const out: Recipe[] = [];
  for (const c of crops) {
    const r = RECIPES.find((x) => x.crop === c.slug);
    if (r) out.push(r);
    if (out.length >= n) break;
  }
  return out;
}

export function GardenNow({ data }: { data: LocalData }) {
  const fits = data.regime && data.climate?.monthlyRainMm ? cropCalendar(data.climate, data.regime, localCrops(data.place.countryCode), { lat: data.place.lat }) : [];
  const frost = frostDatesOf(data.climate) as FrostDates | null;
  const now = new Date(`${data.today}T12:00:00`);
  const south = frost?.south ?? data.place.lat < 0;
  const month = data.month;
  // Today in the place's own calendar, read against the sowing windows of the same calendar: the strip's tasks,
  // the autumn cards and the sowing list all come from these.
  const calToday = doyOfIso(data.today);
  const garlic = garlicState(fits, calToday);
  const sowing = fits.length ? sowingTasks(fits, month, calToday) : undefined;
  const year = gardenYear(now, frost, { south, tropical: isTropical(data.place.lat), garlic, sowing }) as GardenYear;
  const today: number = gardenDoy(now, south);
  const phase = year.phase.id as PhaseId;
  const groundOpen = (data.climate?.monthlyMeanMax?.[month - 1] ?? 1) >= 0;
  // Oats close three weeks before the average first frost (OMAFRA, see src/lib/autumn-planting); the frost day is in the frost calendar like `today`.
  // The oats rule is OMAFRA's (Ontario): in the rest of Canada no source was read, so the card is not shown there
  // (audit of 14 November 2026: "Oats: window closed" at Kelowna, Saskatoon, Thompson, Yellowknife, Saguenay, Val-d'Or).
  const ontarioRuleHolds = data.place.countryCode !== "CA" || /^(ON|Ontario)$/.test(data.place.admin1Code ?? data.place.admin1 ?? "");
  const coverOpen = frost && !year.byMonth && ontarioRuleHolds ? frost.firstDoy - today >= OATS_DAYS_BEFORE_FIRST_FROST : null;
  // The crop library's months are northern; south of the equator they are read half a year on.
  const cropMonth = data.place.lat < 0 ? ((month + 5) % 12) + 1 : month;
  // What is ready is read from this town's own calendar (its temperatures, frost record and day
  // length), so each town shows its own crops and its own months; the library's northern months
  // are the fallback only where the calendar cannot be worked out (and are then labelled as typical for zones 4-6);
  // where it can, an empty month is an empty month.
  const localReady = readyHere(fits, month);
  const ready = fits.length ? localReady.map((f) => f.crop) : cropsInMonth(cropMonth);
  const tender = ready.filter((c) => c.hardiness === "tender" || c.hardiness === "half-hardy").slice(0, 6);
  const hardy = ready.filter((c) => c.hardiness === "hardy" || c.hardiness === "very-hardy").slice(0, 6);
  const local = localReady.length ? Object.fromEntries(localReady.map((f) => [f.crop.slug, { harvest: f.harvest, badge: HARDINESS[f.crop.hardiness].label }])) : undefined;
  const notes = localReady.length ? Object.fromEntries(localReady.map((f) => [f.crop.slug, localNote(f, data.place.name)])) : undefined;
  const recipes = fits.length ? recipesFor(ready, 6) : recipesInSeason(cropMonth, 6);
  const showHarvest = phase !== "sow" && phase !== "start" && phase !== "rest" && ready.length > 0;
  const autumn = phase === "harvest" || phase === "bed";

  return (
    <div className="grid gap-10">
      <GardenYearStrip year={year} frost={frost} today={today} placeName={data.place.name} />
      <FrostNight data={data} />
      {showHarvest && (
        <section>
          <p className="eyebrow text-moss">Harvest</p>
          <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Crops ready in {data.place.name} in {MONTHS[month - 1]}
          </h2>
          <p className="mt-2 max-w-2xl text-ink-2">
            {autumn
              ? "Tender crops first, which a hard frost will kill, then hardy crops that can stay in the ground and sweeten with cold."
              : "The first pickings."}
          </p>
          {!fits.length && (
            <p className="mt-2 max-w-2xl text-sm text-ink-2">
              No crop calendar could be worked out for {data.place.name}, so these are the library&apos;s typical harvest months for zones 4–6, not this town&apos;s own.
            </p>
          )}
          {tender.length > 0 && hardy.length > 0 ? (
            <>
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-ink">Tender crops: harvest before frost</p>
                <CropGrid crops={tender} local={local} notes={notes} />
              </div>
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-ink">Hardy crops: improved by light frost</p>
                <CropGrid crops={hardy} local={local} notes={notes} />
              </div>
            </>
          ) : (
            <div className="mt-6">
              <CropGrid crops={[...tender, ...hardy]} local={local} notes={notes} />
            </div>
          )}
          <p className="mt-4">
            <Link href="/gardening/crops" className="text-sm font-medium text-moss hover:underline">
              All {CROPS.length} crops: harvest, storage and preserving →
            </Link>
          </p>
        </section>
      )}
      {recipes.length > 0 && showHarvest && (
        <section>
          <p className="eyebrow text-gold">Preserving</p>
          <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Canning, freezing and storage for crops in season</h2>
          <p className="mt-2 max-w-2xl text-ink-2">Tested recipes with processing times and the safety limits that apply.</p>
          <div className="mt-6">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((r) => (
                <RecipeCard key={r.slug} recipe={r} cropName={r.crop.replace(/-/g, " ")} brief />
              ))}
            </ul>
          </div>
          <p className="mt-4">
            <Link href="/gardening/preserving" className="text-sm font-medium text-moss hover:underline">
              Preserving methods compared →
            </Link>
          </p>
        </section>
      )}
      <PhaseExtras
        phase={phase}
        lastFrostDoy={frost?.lastDoy ?? null}
        today={today}
        cc={data.place.countryCode}
        fits={fits}
        month={month}
        calToday={calToday}
        garlic={garlic}
        groundOpen={groundOpen}
        coverOpen={coverOpen}
      />
      {data.regime && data.climate?.monthlyRainMm && <ClimateYear climate={data.climate} regime={data.regime} month={month} placeName={data.place.name} lat={data.place.lat} />}
      {fits.length > 0 && <SowingCalendar fits={fits} month={month} placeName={data.place.name} />}
    </div>
  );
}
