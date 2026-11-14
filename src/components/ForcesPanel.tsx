/**
 * The week's forces at a place — frost, soil warmth, day length, heat, rain,
 * pollination, the moon, wind, decomposition, and where the rain comes in
 * seasons the rains — as cards with a status, the reading, what it means,
 * and why it matters. Which cards show is decided by the climate
 * (src/lib/forces `forceIdsFor`): no frost card where frost is rare.
 */
import type { LocalData } from "@/lib/types";
import { forcesFor, type ForceId, type ForceSection, type ForceStatus } from "@/lib/forces";

const BORDER: Record<ForceStatus, string> = {
  Favourable: "border-l-moss",
  Monitor: "border-l-gold-fill",
  Limiting: "border-l-rust",
  Inactive: "border-l-line",
};
const DOT: Record<ForceStatus, string> = {
  Favourable: "bg-moss",
  Monitor: "bg-gold-fill",
  Limiting: "bg-rust",
  Inactive: "bg-ink-2/40",
};

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const ICON: Record<ForceId, React.ReactNode> = {
  frost: (
    <>
      <path d="M12 2v20M4 7l16 10M20 7L4 17" {...stroke} />
      <path d="M12 6l-2.2-2.2M12 6l2.2-2.2M12 18l-2.2 2.2M12 18l2.2 2.2" {...stroke} />
    </>
  ),
  soil: (
    <>
      <path d="M3 10h18M3 15h18M3 20h18" {...stroke} />
      <path d="M12 10V3M9.5 6.5C9.5 4.5 12 3 12 3s2.5 1.5 2.5 3.5" {...stroke} />
    </>
  ),
  daylength: (
    <>
      <circle cx="12" cy="13" r="4" {...stroke} />
      <path d="M12 4v2M4.9 7.9l1.4 1.4M19.1 7.9l-1.4 1.4M2 20h20" {...stroke} />
    </>
  ),
  heat: (
    <>
      <path d="M14 14.8V4a2 2 0 1 0-4 0v10.8a4 4 0 1 0 4 0z" {...stroke} />
      <path d="M12 9v6" {...stroke} />
    </>
  ),
  rain: (
    <>
      <path d="M7 15a4 4 0 0 1 .8-7.9 5.5 5.5 0 0 1 10.5 1.6A3.5 3.5 0 0 1 17.5 15z" {...stroke} />
      <path d="M9 18.5l-1 2M13 18.5l-1 2M17 18.5l-1 2" {...stroke} />
    </>
  ),
  pollination: (
    <>
      <circle cx="12" cy="12" r="2" {...stroke} />
      <path d="M12 10c0-3 2-4 3-3s0 3-3 3zM12 14c0 3-2 4-3 3s0-3 3-3zM10 12c-3 0-4-2-3-3s3 0 3 3zM14 12c3 0 4 2 3 3s-3 0-3-3z" {...stroke} />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" {...stroke} />,
  wind: <path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h8" {...stroke} />,
  decomposition: (
    <>
      <path d="M4 18c2-5 5-7 8-7s6 2 8 7z" {...stroke} />
      <path d="M12 11V6M12 6c-2 0-3-1.5-2.5-3C11 3 12 4.5 12 6zM12 6c2 0 3-1.5 2.5-3C13 3 12 4.5 12 6z" {...stroke} />
    </>
  ),
  rains: (
    <>
      <path d="M8 13a4 4 0 0 1 .8-7.9 5.5 5.5 0 0 1 10.5 1.6A3.5 3.5 0 0 1 18.5 13z" {...stroke} />
      <path d="M8 16.5l-1.5 3M12 16.5l-1.5 3M16 16.5l-1.5 3" {...stroke} />
      <path d="M3 21h18" {...stroke} />
    </>
  ),
};

export function ForcesPanel({ data, section = "overview", now = new Date() }: { data: LocalData; section?: ForceSection; now?: Date }) {
  const forces = forcesFor(data, section, now);
  const overview = section === "overview";
  return (
    <section>
      <p className="eyebrow text-moss">This week · {data.place.label}</p>
      <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">{overview ? "This week's conditions" : "Seasonal conditions"}</h2>
      <p className="mt-2 text-ink-2 max-w-2xl">
        {overview
          ? "Soil warmth, rain, wind, day length and the moon, each read from this location's forecast and climate record, and what each means for the garden, the water and the woods."
          : "Each reading is taken from this week's forecast and the local climate record, with what it means for the season."}
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {forces.map((f) => (
          <li key={f.id} className={`card p-5 border-l-4 ${BORDER[f.status]} flex flex-col`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <svg viewBox="0 0 24 24" width="24" height="24" className="text-moss shrink-0" aria-hidden="true">
                  {ICON[f.id]}
                </svg>
                <h3 className="font-display text-lg font-semibold leading-tight truncate">{f.title}</h3>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] text-ink-2 whitespace-nowrap shrink-0" title={f.status}>
                <span className={`h-2 w-2 rounded-full ${DOT[f.status]}`} />
                {f.status}
              </span>
            </div>
            <p className="font-display mt-2 text-xl font-semibold text-ink">{f.value}</p>
            <p className="mt-1.5 text-sm text-ink-2 flex-1">{f.text}</p>
            <p className="mt-3 pt-3 border-t border-line/70 text-xs text-ink-2">{f.why}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
