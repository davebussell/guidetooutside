/**
 * A crop record's text held to the town it is shown in. The library's notes are written for every reader, and some of their
 * sentences hold only in the hardiness zones they name: the Day 3 audit (11 Nov 2026) found the "Leave in the ground" tags at
 * Asheville, Pittsburgh and Columbus (zones 6b–7b) telling readers to dig rutabagas "usually early to mid-November in zones
 * 4–5" and that "gardeners in zone 3" leave parsnips in all winter. On a town's page a sentence that names zones the town is
 * not in is left out. A sentence that rates a plant's hardiness by zone ("hardy only to about zone 8a", "overwinter in zone 3")
 * is kept: a plant hardy in a colder zone is hardy in a milder one, and one that is not hardy beyond a zone says so for all.
 * The crop pages, which serve every zone, print the records in full.
 */

/** Zone numbers a sentence names ("zone 3", "zones 4–5", "zones 3 to 5", "zone 8a"): each range as [from, to]. */
function zonesNamed(sentence: string): [number, number][] {
  const out: [number, number][] = [];
  for (const m of sentence.matchAll(/\bzones?\s+(\d{1,2})[ab]?(?:\s*(?:–|-|to|and|or)\s*(\d{1,2})[ab]?)?/gi)) {
    const a = Number(m[1]);
    const b = m[2] ? Number(m[2]) : a;
    out.push([Math.min(a, b), Math.max(a, b)]);
  }
  return out;
}

const HARDINESS_WORDS = /\b(?:hardy|hardiest|hardiness|overwinters?|overwintered)\b/i;

/** Split into sentences, keeping each sentence's closing punctuation. */
const sentences = (text: string): string[] =>
  text
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"'‘“(])/)
    .map((s) => s.trim())
    .filter(Boolean);

/**
 * The text with every sentence left out that names hardiness zones the town (USDA zone number `zone`) is not in, unless it
 * rates hardiness. Without a zone the text is returned whole.
 */
export function zoneScoped(text: string, zone: number | null | undefined): string {
  if (zone == null || !Number.isFinite(zone) || !/\bzones?\s+\d/i.test(text)) return text;
  return sentences(text)
    .filter((s) => {
      const named = zonesNamed(s);
      if (!named.length || HARDINESS_WORDS.test(s)) return true;
      return named.some(([a, b]) => zone >= a && zone <= b);
    })
    .join(" ");
}
