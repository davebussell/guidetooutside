/**
 * Source notes: which of an organisation's named waters and towns its own site
 * backs, so that only those print.
 *
 * A `waters` entry prints "Covers <water>" (and "Works on <water>" on the
 * organisation's own page), and a `places` town prints "Works in <town>". The
 * audits of 11 and 13 November 2026 found both printed from the map rather than
 * from the body's pages: Wolf River Conservancy "Covers the Mississippi River"
 * at Memphis, Native Seeds/SEARCH "Works in Phoenix" and "Works in Albuquerque"
 * (its pages name only its farm in Tucson), Save The Bay "Works in San Jose"
 * (its volunteer page names only the Oakland shoreline), and waters such as
 * Coyote Creek and the New River on lists no page of the body names. The rule
 * is the same for every record, whatever the day it was last checked:
 *  - a water prints only when the record's own name or blurb (both written from
 *    its pages) names it, or `waterSources` gives the page that does;
 *  - a town prints "Works in" only with a `placeSources` page naming the body's
 *    centre, office, chapter or programme there. A town the body's own circle or
 *    box reaches, with no such page, reads "Works around <town>" (the matcher
 *    gives that line from the circle); one it does not reach prints nothing.
 * scripts/check-conservation.ts lists every water and town with no source and
 * fails the run for a town that would print nothing true.
 */
import type { Organisation } from "@/data/conservation";

/** Words that say what kind of water it is, not which: "the Potomac and Shenandoah rivers" names the Potomac River. */
const GENERIC_WATER = new Set(["river", "rivers", "creek", "creeks", "run", "brook", "stream", "lake", "lakes", "the", "of", "riviere", "rivieres", "lac", "lacs"]);

/**
 * The words that name a water, padded for whole-word search: "Wolf River" does not name Wolf River Harbor, and
 * "Miami River" is named by "Miami Waterkeeper".
 */
export const waterWords = (s: string) =>
  ` ${s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((w) => w && !GENERIC_WATER.has(w))
    .join(" ")} `;

const OWN_TEXT = new WeakMap<object, string>();
const ownText = (org: Pick<Organisation, "name" | "shortName" | "blurb">) => {
  let t = OWN_TEXT.get(org);
  if (t === undefined) {
    t = waterWords(`${org.name} ${org.shortName ?? ""} ${org.blurb ?? ""}`);
    OWN_TEXT.set(org, t);
  }
  return t;
};

/** Whether the body's own pages back one of its `waters`: named in its name or blurb, or a `waterSources` page. */
export function waterSourced(org: Pick<Organisation, "name" | "shortName" | "blurb" | "waterSources">, water: string): boolean {
  if (org.waterSources?.[water]) return true;
  const w = waterWords(water);
  return !!w.trim() && ownText(org).includes(w);
}

/** The body's `waters` that may print, in the record's order (most prominent first). */
export function sourcedWaters(org: Pick<Organisation, "name" | "shortName" | "blurb" | "waters" | "waterSources">): string[] {
  return (org.waters ?? []).filter((w) => waterSourced(org, w));
}

/** Whether a town in the body's `places` may print "Works in <town>": a page on its own site names its presence there. */
export const placeSourced = (org: Pick<Organisation, "places" | "placeSources">, slug: string | undefined): boolean =>
  !!slug && !!org.places?.includes(slug) && !!org.placeSources?.[slug];
