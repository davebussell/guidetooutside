/**
 * The garden year as a strip: the phases across the months, the average
 * frost dates, and today. Server-side twin of the strip in the restored
 * src/components/here/GardenHere.jsx (same markup).
 */
import Link from "next/link";
import { PHASES, gardenMonths } from "@/lib/garden-year";

type Band = { id: string; from: number; to: number };
type Phase = { id: string; name: string; doing: string; work: string[]; colour: string; tint: string };
export type GardenYear = { phase: Phase; tropical?: boolean; byMonth?: boolean; bands: Band[]; where: string; next: string };
export type FrostDates = { lastDoy: number; firstDoy: number; frostFreeDays?: number; south?: boolean };

const pct = (doy: number) => `${Math.round(((doy - 1) / 365) * 1e3) / 10}%`;
const labelPct = (doy: number) => `${Math.min(94, Math.max(6, Math.round(((doy - 1) / 365) * 1e3) / 10))}%`;

/** The calendar months as phases, for a place without frost dates. */
const BY_MONTH: Band[] = [
  { id: "rest", from: 1, to: 32 },
  { id: "start", from: 32, to: 60 },
  { id: "sow", from: 60, to: 121 },
  { id: "grow", from: 121, to: 182 },
  { id: "harvest", from: 182, to: 305 },
  { id: "bed", from: 305, to: 335 },
  { id: "rest", from: 335, to: 366 },
];

export function GardenYearStrip({
  year,
  frost,
  today,
  placeName,
  compact = false,
  links = true,
}: {
  year: GardenYear;
  frost: FrostDates | null;
  today: number;
  placeName?: string;
  compact?: boolean;
  links?: boolean;
}) {
  const phase = year.phase;
  const months: string[] = gardenMonths(frost?.south);
  const bands = (year.tropical ? [{ id: "grow", from: 1, to: 366 }] : year.byMonth ? BY_MONTH : year.bands).flatMap((b) =>
    b.from <= b.to ? [{ ...b }] : [{ ...b, to: 366 }, { ...b, from: 1 }],
  );
  const marks = frost && !year.byMonth ? [{ doy: frost.lastDoy, label: "last frost" }, { doy: frost.firstDoy, label: "first frost" }] : [];
  const P = PHASES as Record<string, Phase>;
  return (
    <section className="rounded-card border p-5 sm:p-6" style={{ borderColor: `${phase.colour}66`, background: `linear-gradient(180deg, ${phase.tint} 0%, var(--surface) 70%)` }}>
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div className="min-w-0">
          <p className="eyebrow" style={{ color: `color-mix(in srgb, ${phase.colour} 65%, var(--ink))` }}>
            The garden year{placeName ? ` · ${placeName}` : ""}
          </p>
          <h2 className={`font-display mt-1 font-semibold tracking-tight ${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}`}>{phase.name}</h2>
          <p className={`mt-1 max-w-2xl text-ink-2 ${compact ? "text-sm" : ""}`}>{phase.doing}</p>
        </div>
        {!compact && <p className="max-w-md text-sm text-ink">{phase.work.join(" · ")}</p>}
      </div>
      <div className="mt-5" role="img" aria-label={`The garden year: today is in the ${phase.name.toLowerCase()} phase`}>
        <div className="relative">
          <div className="relative h-10 w-full overflow-hidden rounded-md bg-paper-2 sm:h-14">
            {bands.map((b, i) => (
              <div
                key={`${b.id}-${i}`}
                className="absolute inset-y-0"
                style={{ left: pct(b.from), width: `calc(${pct(b.to)} - ${pct(b.from)})`, background: P[b.id].colour, opacity: b.id === phase.id ? 0.95 : 0.35 }}
              />
            ))}
            {months.map((_, i) => (
              <div key={i} className="absolute inset-y-0 w-px bg-surface/70" style={{ left: pct(1 + Math.round((365 * i) / 12)) }} />
            ))}
            {marks.map((m) => (
              <div key={m.label} className="absolute inset-y-0 w-0 border-l-2 border-dashed border-ink" style={{ left: pct(m.doy) }} />
            ))}
            <div className="absolute inset-y-0 w-[3px] -translate-x-1/2 bg-ink" style={{ left: pct(today) }} />
            <div
              className="absolute -top-px h-0 w-0 -translate-x-1/2 border-x-[7px] border-t-[8px] border-x-transparent border-t-ink"
              style={{ left: pct(today) }}
            />
          </div>
          <div className="mt-1 grid grid-cols-12 text-[11px] text-ink-2 sm:text-xs">
            {months.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
          <div className="relative mt-0.5 h-5 text-[11px] sm:text-xs">
            <span className="absolute -translate-x-1/2 whitespace-nowrap font-bold text-ink" style={{ left: labelPct(today) }}>
              today
            </span>
            {marks.map((m) => {
              const d = (((today - m.doy) % 365) + 365) % 365;
              const near = Math.abs(d <= 182 ? d : d - 365) < 45;
              return (
                <span key={m.label} className={`absolute -translate-x-1/2 whitespace-nowrap text-ink ${near ? "top-4" : ""}`} style={{ left: labelPct(m.doy) }}>
                  {"❄ "}
                  {m.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className={`mt-2 grid gap-1 text-ink ${compact ? "text-sm" : ""}`}>
        <p>{year.where}</p>
        <p className="text-ink-2">{year.next}</p>
      </div>
      {links && !compact && (
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {(phase.id === "harvest" || phase.id === "bed") && (
            <>
              <Link href="/gardening/crops" className="rounded-full bg-moss px-4 py-2 font-semibold text-on-moss transition hover:bg-moss-2">
                Crops in season →
              </Link>
              <Link
                href="/gardening/preserving"
                className="rounded-full border border-edge bg-surface px-4 py-2 font-medium text-ink hover:border-moss hover:text-moss"
              >
                Preserving methods
              </Link>
            </>
          )}
          {(phase.id === "rest" || phase.id === "start") && (
            <>
              <Link href="/gardening/seeds" className="rounded-full bg-moss px-4 py-2 font-semibold text-on-moss transition hover:bg-moss-2">
                Seed saving and ordering →
              </Link>
              <Link href="/gardening/crops" className="rounded-full border border-edge bg-surface px-4 py-2 font-medium text-ink hover:border-moss hover:text-moss">
                Crops and bed planning
              </Link>
            </>
          )}
          {(phase.id === "sow" || phase.id === "grow") && (
            <>
              <Link href="/gardening/crops" className="rounded-full bg-moss px-4 py-2 font-semibold text-on-moss transition hover:bg-moss-2">
                Crops and sowing times →
              </Link>
              <Link href="/zones" className="rounded-full border border-edge bg-surface px-4 py-2 font-medium text-ink hover:border-moss hover:text-moss">
                Hardiness zones
              </Link>
            </>
          )}
        </div>
      )}
    </section>
  );
}
