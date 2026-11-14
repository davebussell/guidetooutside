import Link from "next/link";
import { dayShape, fmtLeft } from "@/lib/daypart";
import { regionOf as classifyEcoregion } from "@/lib/region";
import { CHARACTER, characterOf, creaturesInPhase } from "@/lib/rhythm";
import { characterCaption, type DayPhase } from "@/data/day-stories";
import { sowingOpen } from "@/lib/day-page";
import type { LocalData } from "@/lib/types";

const LABEL: Record<DayPhase, string> = {
  "first-light": "First light",
  sunrise: "Sunrise",
  morning: "Morning",
  midday: "Midday",
  afternoon: "Afternoon",
  "golden-hour": "Golden hour",
  dusk: "Dusk",
  night: "Night",
};

const BORDER: Record<DayPhase, string> = {
  "first-light": "border-l-[#4a6280]",
  sunrise: "border-l-[#b8763f]",
  morning: "border-l-moss",
  midday: "border-l-azure",
  afternoon: "border-l-[#7a8a3a]",
  "golden-hour": "border-l-gold-fill",
  dusk: "border-l-[#5a5a86]",
  night: "border-l-[#2c3444]",
};

/**
 * Now, at this place: the phase of the sun, the day's weather character and
 * what it means for the garden or the water, and the creatures most active.
 */
export function DayBand({ data, section = "garden", now = new Date() }: { data: LocalData; section?: "garden" | "water"; now?: Date }) {
  const shape = dayShape(data.place.lat, data.place.lon, now);
  const cur = shape.current;
  if (!cur) return null;
  const phase = cur.phase as DayPhase;
  const left = Math.max(0, Math.round((cur.end.getTime() - now.getTime()) / 60000));
  const alt = Math.round(shape.position.altitude);
  const character = characterOf(data.forecast);
  const ch = CHARACTER[character];
  // The weather character's line for this phase of the day (a clear day's "maximum photosynthesis" is a midday line).
  // The overcast "good for transplanting and sowing" line only while a crop's sowing window is open here (audit, 10 Nov 2026).
  const caption = characterCaption(character, section === "water" ? "water" : "land", phase, { sowing: sowingOpen(data, data.today) });
  const eco = classifyEcoregion(data.place.lat, data.place.lon);
  const who = creaturesInPhase(phase, data.month, eco.slug, data.water, data.place, data.today);
  const items = (section === "water" ? who.water : who.garden).slice(0, 2);
  return (
    <section className={`card p-5 border-l-4 ${BORDER[phase]}`}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="eyebrow">Now</p>
        <p className="font-display text-xl font-semibold">{LABEL[phase]}</p>
        <p className="text-sm text-ink-2">
          {fmtLeft(left)} left · {alt > 0 ? "sun " : "sun "}
          {alt > 0 ? `${alt}° up` : "below the horizon"} in the {shape.position.compass} · {ch.label.toLowerCase()}
        </p>
        <Link href="/the-day" className="ml-auto text-sm font-medium text-moss hover:underline whitespace-nowrap">
          Hour by hour →
        </Link>
      </div>
      {caption && <p className="mt-2 text-sm text-ink-2">{caption}</p>}
      {items.length > 0 && (
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {items.map((c) => (
            <li key={c.slug} className="text-sm">
              <Link href={`/wildlife/${c.slug}`} className="font-semibold hover:text-moss">
                {c.name}
              </Link>
              {c.peaking && <span className="ml-1.5 text-[11px] font-semibold text-ink-2">peak activity</span>}
              <span className="text-ink-2"> — {c.where}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
