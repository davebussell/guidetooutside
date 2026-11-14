"use client";

/**
 * What a reader sees while a town's pages are read: the woodpecker and the blue jay flying over a
 * drifting treeline, and plain words saying what is being gathered and from where (Dave, 5 November
 * 2026: "make it clear that we are collecting regionally accurate data", with a simple moving picture).
 *
 * The birds fly as they really do. The jay rows steadily on even wingbeats; the woodpecker flies in
 * bounds, a burst of flaps that lifts it, then wings folded while it dips. The steps listed are the
 * sources the page actually reads for that topic; nothing here claims a step has finished, since the
 * page does not report progress. With reduced motion, everything holds still.
 *
 * Town names come from src/data/place-names.json (slug to label, built by scripts/build-place-names.mjs),
 * so the full climate table never reaches the browser.
 */
import { useParams } from "next/navigation";
import NAMES from "@/data/place-names.json";

export type LoaderTopic =
  | "guide"
  | "gardening"
  | "fishing"
  | "foraging"
  | "ground"
  | "homesteading"
  | "day"
  | "involved"
  | "plan"
  | "count";

const STEPS: Record<LoaderTopic, [string, string, string, string]> = {
  guide: [
    "This week's forecast",
    "Weather station records near the town",
    "Species recorded near the town",
    "The regulator's rules for its waters and land",
  ],
  gardening: [
    "Average frost dates from weather stations",
    "The hardiness zone for these coordinates",
    "This week's forecast and soil warmth",
    "What can still be sown and harvested",
  ],
  fishing: [
    "This week's forecast",
    "Fish recorded near the town",
    "The regulator's seasons for these waters",
    "Named rivers and lakes nearby",
  ],
  foraging: [
    "Plants and fungi recorded near the town",
    "Who owns the land, and their rules",
    "Look-alikes to watch for",
    "This week's forecast",
  ],
  ground: [
    "The rock under the town",
    "Surface deposits and soil",
    "Where its water drains",
    "Rivers and lakes nearby",
  ],
  homesteading: [
    "Cold nights and hot days from station records",
    "Average frost dates",
    "This week's forecast",
    "Rain and snow through the year",
  ],
  day: [
    "Sun and moon for these coordinates",
    "This week's forecast",
    "What is out at each hour",
    "The light, hour by hour",
  ],
  involved: [
    "Conservation groups working near the town",
    "Invitations they have open",
    "Growers and markets nearby",
    "The waters on the town's pages",
  ],
  plan: [
    "Sun and moon for these coordinates",
    "Average first frost from weather stations",
    "What is in season, week by week",
    "Lessons that fit each week",
  ],
  count: [
    "This week's forecast",
    "Sun and moon for these coordinates",
    "Plants and fungi recorded near the town",
    "Who is awake at this hour",
  ],
};

/** The sentence under the heading: what the page is built from, said plainly. */
const LEAD: Partial<Record<LoaderTopic, (who: string) => string>> = {
  involved: (who) => `We match the groups working near ${who}, the invitations they have open and the growers and markets around it.`,
  // Not "the weather station nearest the town": many towns' frost dates are pooled from several stations, and each
  // page names its own (audit of 10 November 2026).
  plan: (who) => `We work from the sun and moon here, the average frost dates from weather stations near ${who} and what is recorded around it.`,
  count: (who) => `We count from today's forecast, the sun and moon here and the plants and fungi recorded near ${who}.`,
};

const NAME_OF = NAMES as Record<string, string>;

/** The town the route is for, by its label ("Ottawa, Ontario"), or null when the slug is not a town. */
function useTownName(): string | null {
  const params = useParams<{ slug?: string; place?: string }>();
  const slug = params?.slug ?? params?.place;
  return typeof slug === "string" ? (NAME_OF[slug] ?? null) : null;
}

function Jay() {
  return (
    <svg
      viewBox="-34 -30 64 44"
      className="gto-bird-svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="gto-wing gto-wing-far"
        d="M0,-3 C-6,-17 -15,-23 -22,-23 C-15,-14 -9,-7 -2,-1 Z"
        fill="#2c5272"
      />
      <path d="M-12,-2 L-31,-6 L-32,1 L-12,3 Z" fill="#3a6a90" />
      <path
        d="M-29,-5.5 L-29.5,1.2 M-24.5,-4.6 L-24.8,1.9 M-20,-3.8 L-20.2,2.4"
        stroke="#24302a"
        strokeWidth="1"
      />
      <ellipse cx="0" cy="0" rx="15" ry="7" fill="#3a6a90" />
      <ellipse cx="2" cy="3" rx="11" ry="4" fill="#eef1f3" />
      <path d="M9,-8 L3.5,-17.5 L15,-9 Z" fill="#3a6a90" />
      <circle cx="14" cy="-3" r="6" fill="#3a6a90" />
      <circle cx="16" cy="-1.4" r="3.4" fill="#f4f6f7" />
      <circle cx="16.9" cy="-3.7" r="1.1" fill="#24302a" />
      <path d="M19.5,-3 L26,-1.6 L19.5,0 Z" fill="#24302a" />
      <path
        d="M10,1.5 Q15,4.8 19.6,1"
        stroke="#24302a"
        strokeWidth="1.1"
        fill="none"
      />
      <g className="gto-wing">
        <path
          d="M2,-3 C-4,-19 -14,-26 -23,-26 C-16,-17 -10,-8 -1,-1 Z"
          fill="#4f84b4"
        />
        <path
          d="M-15,-22 L-21,-25"
          stroke="#f7f6f0"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M-6,-13 L-10.5,-17 M-10,-17 L-14.5,-20.5"
          stroke="#24302a"
          strokeWidth="0.9"
        />
      </g>
    </svg>
  );
}

function Woodpecker() {
  return (
    <svg
      viewBox="-28 -28 58 40"
      className="gto-bird-svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="gto-wing gto-wing-far"
        d="M0,-3 C-5,-15 -12,-21 -18,-21 C-13,-13 -8,-7 -2,-1 Z"
        fill="#1c2420"
      />
      <path d="M-11,-1 L-24,1 L-11,4 Z" fill="#24302a" />
      <ellipse cx="0" cy="0" rx="13" ry="6.5" fill="#f7f6f0" />
      <path
        d="M-12.5,-0.5 C-6,-7.5 6,-8 12,-4 L12,-1 C4,-3 -4,-2 -12.5,1.5 Z"
        fill="#24302a"
      />
      <circle cx="12" cy="-3" r="5.5" fill="#f7f6f0" />
      <path
        d="M6.6,-5.6 C8.8,-9.6 15.2,-9.6 17.2,-5.8 L12,-5 Z"
        fill="#24302a"
      />
      <path d="M7.4,-8 L3.6,-13.5 L11.2,-9.2 Z" fill="#a3463c" />
      <path d="M7,-1.8 L16,-1" stroke="#24302a" strokeWidth="1.2" />
      <circle cx="14.2" cy="-4" r="1" fill="#24302a" />
      <path d="M17,-3.6 L27.5,-2.4 L17,-1.2 Z" fill="#3b3b33" />
      <g className="gto-wing">
        <path
          d="M2,-3 C-3,-17 -12,-24 -20,-24 C-14,-15 -8,-7 -1,-1 Z"
          fill="#24302a"
        />
        <circle cx="-4" cy="-8" r="1" fill="#f7f6f0" />
        <circle cx="-7.5" cy="-13" r="1" fill="#f7f6f0" />
        <circle cx="-11.5" cy="-17.5" r="0.95" fill="#f7f6f0" />
        <circle cx="-15.5" cy="-21" r="0.85" fill="#f7f6f0" />
      </g>
    </svg>
  );
}

/** The moving picture: sky, a low sun, two drifting treelines and the pair in flight. */
export function FlightScene({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`gto-flight ${compact ? "gto-flight-compact" : ""}`}
      aria-hidden="true"
    >
      <span className="gto-flight-sun" />
      <span className="gto-flight-hills" />
      <span className="gto-flight-trees" />
      <span className="gto-flyer gto-flyer-blue">
        <span className="gto-bob-blue">
          <Jay />
        </span>
      </span>
      <span className="gto-flyer gto-flyer-red">
        <span className="gto-bound">
          <Woodpecker />
        </span>
      </span>
    </div>
  );
}

/**
 * Full loader for a town page (route loading), or `compact` for a section still being read inside a page.
 * `text` replaces the compact line ("Reading plants and fungi recorded near Ottawa, Ontario…").
 */
export function FieldLoader({
  topic = "guide",
  compact = false,
  text,
}: {
  topic?: LoaderTopic;
  compact?: boolean;
  text?: string;
}) {
  const town = useTownName();
  const where = town ?? "this area";
  const steps = STEPS[topic];

  if (compact) {
    return (
      <div className="gto-loader-compact" role="status" aria-live="polite">
        <FlightScene compact />
        <p className="text-sm text-ink-2">
          <span className="font-semibold text-ink">
            Gathering regionally accurate data for {where}.
          </span>{" "}
          {text ?? "Read from sources near the town, not a regional average."}
        </p>
      </div>
    );
  }

  return (
    <section className="card overflow-hidden" role="status" aria-live="polite">
      <FlightScene />
      <div className="p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-moss">
          Reading local records
        </p>
        <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
          Gathering regionally accurate data for {where}
        </h2>
        <p className="mt-2 max-w-2xl text-ink-2">
          {LEAD[topic]
            ? LEAD[topic]!(town ? "the town" : "you")
            : `We read weather station records near ${town ? "the town" : "you"}, the species recorded around it and the regulator's own pages.`}{" "}
          Where a figure is only regional, the page says so.
        </p>
        <ol className="mt-5 grid gap-2 sm:grid-cols-2">
          {steps.map((s, i) => (
            <li
              key={s}
              className="gto-step"
              style={{ animationDelay: `${i * 1.6}s` }}
            >
              <span
                className="gto-step-dot"
                style={{ animationDelay: `${i * 1.6}s` }}
                aria-hidden="true"
              />
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
