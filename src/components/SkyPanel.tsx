import Link from "next/link";
import { MoonIcon } from "@/lib/moon-phases";
import { fmtTime, sunTimes } from "@/lib/sun";
import { comingPhases, fmtDate, fmtDateIn, fullMoonName, lunarPlanting, nextSeasonMark } from "@/lib/almanac";
import type { LocalData } from "@/lib/types";

const STARS =
  "radial-gradient(1px 1px at 12% 22%, #fff, transparent), radial-gradient(1px 1px at 28% 68%, #cfe3f2, transparent), radial-gradient(1.4px 1.4px at 46% 18%, #fff, transparent), radial-gradient(1px 1px at 61% 52%, #dbe9f5, transparent), radial-gradient(1px 1px at 78% 30%, #fff, transparent), radial-gradient(1.2px 1.2px at 88% 66%, #cfe3f2, transparent), radial-gradient(1px 1px at 36% 86%, #fff, transparent), radial-gradient(1px 1px at 69% 82%, #bcd6ea, transparent), radial-gradient(1px 1px at 6% 54%, #fff, transparent), radial-gradient(1px 1px at 95% 12%, #fff, transparent)";

const fmtLen = (min: number) => `${Math.floor(min / 60)}h ${String(Math.round(min % 60)).padStart(2, "0")}m`;

/** The sun and the moon over a place: day length and its change, the moon's phase, and what is next in the sky. */
export function SkyPanel({ data, now = new Date() }: { data: LocalData; now?: Date }) {
  const { place, moon, forecast } = data;
  const tz = forecast.timezone;
  const len = (d: Date) => {
    const s = sunTimes(place.lat, place.lon, d);
    return s.sunrise && s.sunset ? (s.sunset.getTime() - s.sunrise.getTime()) / 60000 : (s.dayLengthMin as number);
  };
  const today = len(now);
  const perDay = Math.round(len(new Date(now.getTime() + 86400000)) - today);
  const month = len(new Date(now.getTime() + 30 * 86400000)) - today;
  const sun = sunTimes(place.lat, place.lon, now);
  const d0 = forecast.days[0];
  const nextFull = new Date(moon.nextFull + "T12:00:00Z");
  const nextNew = new Date(moon.nextNew + "T12:00:00Z");
  const todayNoon = new Date(data.today + "T12:00:00Z");
  const daysTo = (d: Date) => Math.max(0, Math.round((d.getTime() - todayNoon.getTime()) / 86400000));
  const mark = nextSeasonMark(now, place.lat < 0);
  const c = data.climate;
  const frostLine = !c
    ? null
    : c.lastSpringFrost === "Rare" || c.firstFallFrost === "Rare"
      ? "Frost is rare here: most years have none, or one or two nights at most."
      : data.daysToFirstFrost != null
        ? `About ${data.daysToFirstFrost} days to the average first frost (${c.firstFallFrost}).`
        : `Average last spring frost here: ${c.lastSpringFrost}.`;
  const waxing = moon.age < 14.77;
  const phases = comingPhases(now);
  const sufficient = today >= 600 ? "Day length is sufficient for steady growth." : "Short days: growth slows to a crawl until the light returns.";
  return (
    <section className="rounded-feature overflow-hidden border border-on-night/10 bg-night text-on-night">
      <div className="relative px-6 sm:px-8 pt-7 pb-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60" style={{ backgroundImage: STARS }} />
        <div className="relative">
          <p className="eyebrow !text-on-night/75">Sky · {place.label}</p>
          <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">Sun and moon</h2>
          <p className="mt-2 text-on-night/80 max-w-2xl text-sm">Day length and the moon, for {place.name}.</p>
          <div className="mt-7 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
            <div className="rounded-tile bg-white/[0.045] border border-white/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-on-night/75">Sun</p>
                  <p className="font-display text-2xl font-semibold mt-0.5">{fmtLen(today)} of daylight</p>
                </div>
                <span className="rounded-full bg-gold-fill/15 text-gold-fill px-3 py-1 text-xs font-semibold whitespace-nowrap">
                  {`${perDay >= 0 ? "+" : ""}${perDay} min/day`}
                </span>
              </div>
              <div className="mt-5 relative h-11">
                <div className="absolute inset-x-0 top-6 h-px bg-white/15" />
                <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-6 w-full" aria-hidden="true">
                  <path d="M0 24 Q 50 -8 100 24" fill="none" stroke="var(--gold-fill)" strokeOpacity="0.5" strokeWidth="0.6" />
                </svg>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <div>
                  <p className="text-on-night/75 text-[11px] uppercase tracking-wider">Sunrise</p>
                  <p className="font-display text-lg">{d0?.sunrise.slice(11, 16) ?? fmtTime(sun.sunrise, tz)}</p>
                </div>
                <div className="text-center">
                  <p className="text-on-night/75 text-[11px] uppercase tracking-wider">Solar noon</p>
                  <p className="font-display text-lg">{fmtTime(sun.solarNoon, tz)}</p>
                </div>
                <div className="text-right">
                  <p className="text-on-night/75 text-[11px] uppercase tracking-wider">Sunset</p>
                  <p className="font-display text-lg">{d0?.sunset.slice(11, 16) ?? fmtTime(sun.sunset, tz)}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-on-night/80">
                {`A month from now the day will be ${fmtLen(Math.abs(month))} ${month >= 0 ? "longer" : "shorter"}.`} {sufficient}
              </p>
            </div>
            <div className="rounded-tile bg-white/[0.045] border border-white/10 p-5">
              <div className="flex items-start gap-4">
                <span className="shrink-0 rounded-full ring-1 ring-white/15 bg-white/[0.06] p-1 leading-none">
                  <MoonIcon age={moon.age} size={60} className="drop-shadow-[0_0_14px_rgba(243,233,201,0.3)]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-on-night/75">Moon</p>
                  <p className="font-display text-2xl font-semibold leading-tight">{moon.phaseName}</p>
                  <p className="text-sm text-on-night/80">
                    {moon.illumination}% lit · {waxing ? "waxing" : "waning"} · day {Math.round(moon.age)} of 29.5
                  </p>
                </div>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-white/[0.05] px-3 py-2">
                  <dt className="text-[11px] uppercase tracking-wider text-on-night/75">Next full</dt>
                  <dd className="font-display text-base">
                    {fmtDate(nextFull)} <span className="text-on-night/80 text-sm">· {daysTo(nextFull)}d</span>
                  </dd>
                  <dd className="text-[11px] text-gold-fill">{fullMoonName(nextFull)}</dd>
                </div>
                <div className="rounded-lg bg-white/[0.05] px-3 py-2">
                  <dt className="text-[11px] uppercase tracking-wider text-on-night/75">Next new</dt>
                  <dd className="font-display text-base">
                    {fmtDate(nextNew)} <span className="text-on-night/80 text-sm">· {daysTo(nextNew)}d</span>
                  </dd>
                  <dd className="text-[11px] text-on-night/75">No moonlight</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-on-night/80">
                <span className="text-on-night font-medium">Lunar planting (traditional):</span> {lunarPlanting(moon.age)}
              </p>
              <p className="mt-2 text-sm text-on-night/80">
                <span className="text-on-night font-medium">Solunar rating (traditional):</span> {moon.fishingRating.toLowerCase()}. The tradition holds that fish
                feed most in the days around new and full moon, and near moonrise and moonset. The evidence is mixed; light and weather have larger effects.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_1.4fr]">
            <div className="rounded-tile bg-white/[0.045] border border-white/10 p-5">
              <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-on-night/75">Next solstice or equinox</p>
              <p className="font-display text-xl font-semibold mt-1">{mark.name}</p>
              <p className="text-sm text-on-night/80">
                {fmtDate(mark.date)} · {mark.days} day{mark.days === 1 ? "" : "s"} away
              </p>
              {frostLine && <p className="mt-3 text-sm text-on-night/80">{frostLine}</p>}
            </div>
            <div className="rounded-tile bg-white/[0.045] border border-white/10 p-5">
              <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-on-night/75">Coming phases</p>
              <ul className="mt-2 grid gap-1.5 text-sm">
                {phases.map((p) => (
                  <li key={p.date.toISOString()} className="flex items-baseline justify-between gap-3">
                    <span className="text-on-night">
                      {p.kind}
                      {p.kind === "Full Moon" && <span className="text-gold-fill"> · {fullMoonName(new Date(fmtDateIso(p.date, tz) + "T12:00:00Z"))}</span>}
                    </span>
                    <span className="text-on-night/80 tabular-nums whitespace-nowrap">{fmtDateIn(p.date, tz)}</span>
                  </li>
                ))}
              </ul>
              <Link href="/almanac" className="mt-3 inline-block text-sm text-on-night/75 hover:text-on-night underline">
                Almanac →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function fmtDateIso(d: Date, timeZone?: string): string {
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
  } catch {
    return d.toISOString().slice(0, 10);
  }
}
