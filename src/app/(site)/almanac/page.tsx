import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { FULL_MOON_NAMES } from "@/lib/almanac";
import { MoonIcon } from "@/lib/moon-phases";
import { NewsletterForm } from "@/components/NewsletterForm";
import { AlmanacTemps, AlmanacTempsLoading } from "@/components/almanac/AlmanacTemps";
import { almanacAt, dayOfYear } from "@/components/almanac/almanac-data";
import { regionFromCookie } from "@/lib/region-cookie";

export const metadata: Metadata = {
  title: "Almanac — moon phase, full moon names, sunrise and the season",
  description:
    "Today's moon phase and illumination, the next full and new moons with their traditional names, planting by the moon, sunrise and sunset for your area, and the days to the next solstice or equinox.",
  alternates: { canonical: "/almanac" },
};

/**
 * Moon phase times are given in the remembered place's time zone (the cookie
 * carries it), and in UTC, said so, before a place is known. The live page
 * gave every reader Toronto time without saying so.
 */
const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const utcDay = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });
const localDay = (d: Date, tz: string) => d.toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric", timeZone: tz });
const localTime = (d: Date, tz: string) => d.toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit", timeZone: tz });
/** A time zone the runtime accepts, else UTC. */
function safeZone(tz: string | null | undefined): string {
  if (!tz) return "UTC";
  try {
    new Intl.DateTimeFormat("en-CA", { timeZone: tz });
    return tz;
  } catch {
    return "UTC";
  }
}
/** "Europe/Lisbon" → "Lisbon time"; "UTC" → "UTC". */
const zoneLabel = (tz: string, town: string | null) => (tz === "UTC" ? "UTC" : town ? `${town} time` : tz.split("/").pop()!.replace(/_/g, " ") + " time");

/** Development only: `?at=<ISO time>` renders the almanac for another moment (to compare with a capture). */
function moment(at?: string): Date {
  if (process.env.NODE_ENV === "development" && at && !Number.isNaN(Date.parse(at))) return new Date(at);
  return new Date();
}

export default async function AlmanacPage({ searchParams }: { searchParams: Promise<{ at?: string }> }) {
  const now = moment((await searchParams).at);
  const { place, ctx } = await regionFromCookie();
  const TZ = safeZone(place?.tz);
  const town = place ? place.label.split(",")[0] : null;
  const a = almanacAt(now, { south: ctx.hemisphere === "south" });
  const m = a.moon;
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <p className="eyebrow text-moss">Almanac</p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">Moon, sun and season</h1>
      <p className="mt-4 text-lg text-ink-2 max-w-3xl">
        Moon phase, sunrise and sunset, day length and the next solstice or equinox. Updated hourly; sun and temperature figures, the season&apos;s name and the clock times use
        the last place looked up{town ? ` (${town})` : ""}.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="card p-6 flex items-center gap-5">
          <MoonIcon age={m.age} size={88} />
          <div>
            <p className="eyebrow">Moon tonight</p>
            <p className="font-display text-2xl font-semibold mt-1">{m.phaseName}</p>
            <p className="text-sm text-ink-2">
              {m.illumination}% illuminated · {a.waxing ? "waxing" : "waning"} · day {Math.floor(m.age)} of 29
            </p>
            <p className="text-sm text-ink-2 mt-1">
              Solunar rating: {m.fishingRating.toLowerCase()} <span className="text-ink-2">(a tradition, not established)</span>
            </p>
          </div>
        </div>
        <div className="card p-6">
          <p className="eyebrow">Next full moon</p>
          <p className="font-display text-2xl font-semibold mt-1">{a.fullMoonName}</p>
          <p className="text-sm text-ink-2">
            {utcDay(a.full)} · in {a.daysToFull} days
          </p>
          <p className="eyebrow mt-4">Next new moon</p>
          <p className="text-sm text-ink-2">
            {utcDay(a.nextNew)} · in {a.daysToNew} days
          </p>
        </div>
        <div className="card p-6">
          <p className="eyebrow">Season</p>
          <p className="font-display text-2xl font-semibold mt-1">{a.season.name}</p>
          <p className="text-sm text-ink-2">
            {utcDay(a.season.date)} · in {a.season.daysAway} days
          </p>
          <p className="text-sm text-ink-2 mt-3">
            Day {dayOfYear(now, TZ)} of the year{ctx.hemisphere === "south" ? " · southern-hemisphere seasons" : ""}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <section className="card p-6">
          <p className="eyebrow">Lunar planting (traditional)</p>
          <p className="mt-2 text-ink-2">{a.plantingHint}</p>
          <p className="mt-3 text-xs text-ink-2">A tradition without good experimental support. Its practical effect is to spread sowings across the month.</p>
        </section>
      </div>
      <div className="mt-14">
        <Suspense fallback={<AlmanacTempsLoading />}>
          <AlmanacTemps month={now.getMonth() + 1} />
        </Suspense>
      </div>
      <section className="mt-14">
        <p className="eyebrow">Coming phases</p>
        <h2 className="font-display mt-1 text-2xl font-semibold">Moon phases, next six weeks</h2>
        <p className="mt-1 text-sm text-ink-2">
          {"Times in "}
          {zoneLabel(TZ, town)}
          {TZ === "UTC" ? "; set a place for its own clock." : "."}
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {a.events.map((e) => {
            const age = e.kind === "New Moon" ? 0 : e.kind === "First Quarter" ? 7.38 : e.kind === "Full Moon" ? 14.77 : 22.15;
            return (
              <li key={e.date.toISOString()} className="card p-4 flex items-center gap-3">
                <MoonIcon age={age} size={36} />
                <div>
                  <p className="font-semibold">{e.name ?? e.kind}</p>
                  <p className="text-sm text-ink-2">
                    {e.name ? `${e.kind} · ` : ""}
                    {localDay(e.date, TZ)} · {localTime(e.date, TZ)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold">The full moons of the year</h2>
          <p className="mt-2 text-ink-2 text-sm">
            Traditional North American names, each associated with a seasonal event of its month in the northern temperate year. In the tropics there is no snow moon,
            so read them as a calendar, not a forecast.
          </p>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {FULL_MOON_NAMES.map((n, i) => (
              <li key={n} className={`border-b border-line px-1 py-2 text-sm ${n === a.fullMoonName ? "font-semibold text-moss" : ""}`}>
                <span className="opacity-70">{SHORT[i]}</span> {n}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold">The moon and fishing</h2>
          <p className="mt-2 text-ink-2 leading-relaxed">
            Many anglers follow the solunar theory: that fish and game feed most when the moon is overhead or underfoot, and most actively around the new and full moons, when the
            sun and moon are aligned. The theory dates from the 1930s, and studies that have tested it are mixed; the rating is best used to choose between otherwise similar days,
            not as a forecast. Low light at dawn and dusk, and the weather trend, are more reliable indicators. The{" "}
            <Link href="/fishing" className="underline">
              local fishing guide
            </Link>{" "}
            folds the day&apos;s rating into its advice.
          </p>
        </div>
      </section>
      <section className="mt-12 card p-8 grid gap-6 md:grid-cols-[1.3fr_1fr] items-center bg-moss text-paper border-moss min-w-0 [&>*]:min-w-0">
        <div>
          <h2 className="font-display text-2xl font-semibold">The Weekly Field Note</h2>
          <p className="mt-1 text-paper/90 text-sm">Moon, frost and what is in season in your area. One email, Sunday evening.</p>
        </div>
        <NewsletterForm source="almanac" />
      </section>
    </div>
  );
}
