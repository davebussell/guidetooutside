/**
 * Short season labels for the foraging lists ("Aug–Nov", "Nov–Apr", "All
 * year"): the wild-edibles index on /foraging prints one beside each name.
 *
 * A season that runs through the new year is labelled from the start of its
 * run to the end ("Nov–Apr"); any other season from its first month to its
 * last, gaps included ("Mar–Oct" for March–May and September–October), as
 * the live index does.
 */

const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const prev = (m: number) => ((m + 10) % 12) + 1;
const next = (m: number) => (m % 12) + 1;

export function shortSpan(months: number[]): string {
  const set = new Set(months);
  if (set.size >= 12) return "All year";
  let first: number;
  let last: number;
  if (set.has(12) && set.has(1)) {
    // a winter season: from the month whose predecessor is out of season to the month whose successor is
    const sorted = [...set].sort((a, b) => a - b);
    first = sorted.filter((m) => !set.has(prev(m))).pop() ?? sorted[0];
    last = sorted.find((m) => !set.has(next(m))) ?? sorted[sorted.length - 1];
  } else {
    first = Math.min(...set);
    last = Math.max(...set);
  }
  return first === last ? SHORT[first - 1] : `${SHORT[first - 1]}–${SHORT[last - 1]}`;
}
