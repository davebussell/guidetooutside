/**
 * Twelve monthly values as bars, in the drawing style of the place pages'
 * climate figure: this month boxed, chosen months darker, optional level
 * lines (12 and 14 hours of daylight, 13 °C for bees) and the value printed
 * over each bar.
 */
const LETTERS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const X0 = 34;
const COL = 532 / 12;
const BASE = 132;
const H = 108;

export type BarLine = { value: number; label: string };

export function MonthBars({
  values,
  month,
  label,
  strong = [],
  lines = [],
  format = (v: number) => String(Math.round(v) + 0),
  unit,
  tone = "azure",
  min = 0,
}: {
  values: number[];
  /** This month (1–12), boxed. */
  month: number;
  /** Accessible name of the figure. */
  label: string;
  /** Months (1–12) drawn darker. */
  strong?: number[];
  lines?: BarLine[];
  format?: (v: number) => string;
  /** Printed at the top of the axis ("L", "h", "°C"). */
  unit?: string;
  tone?: "azure" | "moss" | "rust" | "gold";
  /** The value at the baseline. */
  min?: number;
}) {
  const top = Math.max(...values, ...lines.map((l) => l.value), min + 1) * 1.08;
  const y = (v: number) => BASE - ((Math.max(min, v) - min) * H) / (top - min);
  const cx = (i: number) => X0 + (i + 0.5) * COL;
  const set = new Set(strong);
  const fill = { azure: ["fill-azure/70", "fill-azure/30"], moss: ["fill-moss/70", "fill-moss/30"], rust: ["fill-rust/70", "fill-rust/30"], gold: ["fill-gold-fill", "fill-gold-fill/40"] }[tone];
  return (
    <svg viewBox="0 0 600 154" className="mt-3 w-full" role="img" aria-label={label}>
      <rect x={X0 + (month - 1) * COL} y={10} width={COL} height={122} fill="none" stroke="currentColor" className="text-ink/40" strokeDasharray="2 3" />
      {values.map((v, i) => (
        <g key={i}>
          <rect x={cx(i) - COL * 0.3} y={y(v)} width={COL * 0.6} height={BASE - y(v)} className={set.has(i + 1) ? fill[0] : fill[1]} />
          <text x={cx(i)} y={y(v) - 4} textAnchor="middle" className="fill-ink-2 text-[9px]">
            {format(v)}
          </text>
        </g>
      ))}
      {lines.map((l) => (
        <g key={l.label}>
          <line x1={X0} x2={566} y1={y(l.value)} y2={y(l.value)} stroke="currentColor" strokeDasharray="4 3" className="text-ink/50" />
          <text x={570} y={y(l.value) + 3} className="fill-ink-2 text-[10px]">
            {l.label}
          </text>
        </g>
      ))}
      <line x1={X0} x2={566} y1={BASE} y2={BASE} stroke="currentColor" className="text-line" />
      {unit && (
        <text x={30} y={20} textAnchor="end" className="fill-ink-2 text-[9px]">
          {unit}
        </text>
      )}
      {LETTERS.map((l, i) => (
        <text key={`m${i}`} x={cx(i)} y={148} textAnchor="middle" className={i + 1 === month ? "text-[11px] fill-ink font-semibold" : "text-[11px] fill-ink-2"}>
          {l}
        </text>
      ))}
    </svg>
  );
}
