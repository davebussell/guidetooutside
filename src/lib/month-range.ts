/**
 * Months as runs of short names, for the fishing page's words (Day 5 audit, 14 November 2026).
 *
 * The same function as src/components/NatureCard.tsx `shortMonthRange`, here in a library module so that
 * src/lib/fishing-waters.ts (`typicalLine`, `laterWords`) and the check scripts can use it without bundling a React
 * component. NatureCard can import it from here; until then the two must stay the same.
 */
const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Mar–Jun, Sep–Nov"; "Year-round" for all twelve. */
export function shortMonthRange(months: number[]): string {
  const set = new Set(months);
  if (set.size >= 12) return "Year-round";
  const runs: string[] = [];
  for (let m = 1; m <= 12; m++) {
    if (!set.has(m) || set.has(((m + 10) % 12) + 1)) continue;
    let end = m;
    while (set.has((end % 12) + 1) && (end % 12) + 1 !== m) end = (end % 12) + 1;
    runs.push(end === m ? SHORT[m - 1] : `${SHORT[m - 1]}–${SHORT[end - 1]}`);
  }
  return runs.join(", ");
}
