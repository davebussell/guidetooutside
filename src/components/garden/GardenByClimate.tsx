/**
 * The gardening page for a place where frost is not what sets the year —
 * Cape Town, Nairobi, Lagos, Lisbon, and the mild maritime towns (London,
 * Vancouver) where frost is a few nights a winter rather than the frame of
 * the season. It opens on the climate itself, then what can go in this
 * month, then the whole year's calendar.
 */
import type { LocalData } from "@/lib/types";
import type { Crop } from "@/lib/crops";
import { localCrops } from "@/lib/crops";
import { cropCalendar, doyLabel, doyOfIso, nextSowing, sowNow, type CropFit } from "@/lib/crop-calendar";
import { MONTHS, monthSpans, type RegimeId } from "@/lib/regime";
import { seasonLine } from "@/lib/garden-season";
import { ClimateYear } from "./ClimateYear";
import { CropGrid } from "./CropCard";
import { CropLinks, SowingCalendar } from "./SowingCalendar";

/** What the garden year runs on, by regime. */
const RUNS_ON: Partial<Record<RegimeId, string>> = {
  "tropical-humid": "heat and rain",
  "tropical-wet-dry": "the rainy season",
  "tropical-highland": "the rains",
  desert: "the cool months and the hose",
  mediterranean: "the winter rains",
  "subtropical-highland": "the summer rains",
  "semi-arid": "scarce rain",
  maritime: "a long, cool season",
  "humid-subtropical": "the gentle seasons either side of summer",
};

// The line on where the month stands reads the town's calendar, the month's averages and the week's forecast
// (src/lib/garden-season; Day 4 audit, 13 Nov 2026: Tucson's "tender crops are out and growing" in November, "The rains are
// due next month" beside a wet week in California).

const Names = ({ fits }: { fits: CropFit[] }) => <CropLinks fits={fits} lower />;

export function GardenByClimate({ data, fits: given }: { data: LocalData; fits?: CropFit[] }) {
  const c = data.climate!;
  const r = data.regime!;
  const fits = given ?? cropCalendar(c, r, localCrops(data.place.countryCode), { lat: data.place.lat });
  // The lists below hold only crops whose sowing window includes today (the place's own date), not the whole month.
  const calDoy = doyOfIso(data.today);
  const now = sowNow(fits, data.month, calDoy);
  const upNext = [...now.sow, ...now.plant, ...now.sowWatered].length ? null : nextSowing(fits, calDoy);
  const comingIn = fits.filter((f) => !f.perennial && f.harvest.includes(data.month)).slice(0, 8);
  const leadFits = [...now.sow, ...now.plant].slice(0, 6);
  const lead: Crop[] = leadFits.map((f) => f.crop);
  const planted = new Set(now.plant.map((f) => f.crop.slug));
  const BADGE = { direct: "Sow direct", transplant: "From seedlings", cutting: "From cuttings", perennial: "Perennial" } as const;
  const STARTS: Record<string, string> = {
    potato: "Seed potatoes",
    garlic: "From cloves",
    "sweet-potato": "From slips",
    cassava: "From stem cuttings",
    taro: "From corms",
    banana: "From suckers",
  };
  const local = Object.fromEntries(
    leadFits.map((f) => [f.crop.slug, { harvest: f.harvest, badge: STARTS[f.crop.slug] ?? (f.crop.grow ? BADGE[f.crop.grow.start] : "Sow now") }]),
  );
  const notes = Object.fromEntries(
    leadFits.map((f) => {
      const how = planted.has(f.crop.slug) ? "Plant out now" : f.crop.grow?.start === "transplant" ? "Sow now, in a seedbed or trays" : "Sow now, where it is to grow";
      // Taglines written for a northern garden ("eat them in February") are left off.
      const tag = /frost|snow|freez|winter|cellar|january|february|march|april|may\b|june|july|august|september|october|november|december|spring|autumn|fall\b/i.test(
        f.crop.tagline,
      )
        ? ""
        : ` ${f.crop.tagline}`;
      return [f.crop.slug, `${how}.${tag}`];
    }),
  );
  return (
    <div className="grid gap-12">
      <section>
        <p className="eyebrow text-moss">
          {r.name} climate · {MONTHS[data.month - 1]}
        </p>
        <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Gardening in {data.place.name} runs on {RUNS_ON[r.id] ?? r.runsOn}
        </h2>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-2">{r.summary}</p>
        <p className="mt-3 max-w-3xl leading-relaxed">{seasonLine(data, fits)}</p>
      </section>
      <ClimateYear climate={c} regime={r} month={data.month} placeName={data.place.name} lat={data.place.lat} />
      <section aria-labelledby="sow-now">
        <p className="eyebrow">Today · {MONTHS[data.month - 1]}</p>
        <h2 id="sow-now" className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          What to sow and plant in {data.place.name} today
        </h2>
        {lead.length ? (
          <div className="mt-6">
            <CropGrid crops={lead} limit={6} local={local} notes={notes} />
          </div>
        ) : (
          <p className="mt-3 text-ink-2">
            No crop is in its sowing window today.
            {upNext && (
              <>
                {" "}
                Next to open: <Names fits={upNext.fits.slice(0, 4)} /> from {doyLabel(upNext.doy)}.
              </>
            )}
          </p>
        )}
        <div className="mt-6 grid gap-3 text-[15px] leading-relaxed sm:grid-cols-2">
          {now.sow.length > 6 && (
            <p>
              <span className="font-semibold">Also sow now: </span>
              <Names fits={now.sow.slice(6, 16)} />.
            </p>
          )}
          {now.sowWatered.length > 0 && (
            <p>
              <span className="font-semibold">With regular watering: </span>
              <Names fits={now.sowWatered.slice(0, 10)} /> — they would grow into the dry months.
            </p>
          )}
          {now.trays.length > 0 && (
            <p>
              <span className="font-semibold">Start in trays: </span>
              <Names fits={now.trays.slice(0, 8)} />, to plant out in a month or two.
            </p>
          )}
          {comingIn.length > 0 && (
            <p>
              <span className="font-semibold">Coming in now: </span>
              <Names fits={comingIn} />.
            </p>
          )}
          {r.dryMonths.length > 0 && r.dryMonths.length < 12 && (
            <p className="text-ink-2">
              <span className="font-semibold text-ink">Dry months: </span>
              {monthSpans(r.dryMonths, false)}. Plan the thirsty crops around them, or around the tap.
            </p>
          )}
        </div>
      </section>
      <SowingCalendar fits={fits} month={data.month} placeName={data.place.name} />
    </div>
  );
}
