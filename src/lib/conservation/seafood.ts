/**
 * "Look up Atlantic cod in the Good Fish Guide": a link from a fish page to a
 * seafood guide's own page for that fish. Only for a guide in the library,
 * only to a page on its own site that was opened and read on the date given,
 * and never a rating of ours: the guide's page says what it says; this only
 * takes the reader there.
 *
 * A guide covers sea fish, sea-run fish and the farmed and commercially
 * caught freshwater fish, so the link is offered for those only: a guide has
 * nothing to say about a tigerfish or a bluegill.
 */
import type { Organisation } from "@/data/conservation";

export type SeafoodLookup = { org: string; label: string; href: string };

type Guide = {
  /** The guide's own name, as it calls it, mid-sentence. */
  guide: string;
  /** Our fish slug → the guide's own page for that species (same species by its Latin name, page opened and read). */
  pages: Record<string, string>;
  /** When the pages were opened and read. */
  checked: string;
};

const GFG = (s: string) => `https://www.mcsuk.org/goodfishguide/species/${s}/`;

/**
 * Organisation slug → its guide's species pages. Only a species the guide
 * names by the same Latin name as ours: its free-text search misses common
 * spellings ("Atlantic mackerel" finds nothing; the guide says "Mackerel"),
 * so the links go to the species pages themselves. Ocean Wise has no species
 * search of its own (only a site search), so it has none.
 */
export const SEAFOOD_GUIDES: Record<string, Guide> = {
  "marine-conservation-society": {
    guide: "the Good Fish Guide",
    checked: "2026-10-26",
    pages: {
      "atlantic-salmon": GFG("atlantic-salmon"), // Salmo salar
      "european-sea-bass": GFG("seabass"), // Dicentrarchus labrax
      "gilthead-seabream": GFG("gilthead-bream"), // Sparus aurata
      "atlantic-mackerel": GFG("mackerel"), // Scomber scombrus
      pollack: GFG("pollack"), // Pollachius pollachius
      "atlantic-cod": GFG("atlantic-cod"), // Gadus morhua
      "european-eel": GFG("european-eel"), // Anguilla anguilla
      "nile-tilapia": GFG("tilapia"), // Oreochromis niloticus
      "yellowtail-amberjack": GFG("yellowtail"), // Seriola lalandi
      "ballan-wrasse": GFG("ballan-wrasse"), // Labrus bergylta
      "black-seabream": GFG("black-bream"), // Spondyliosoma cantharus
      "european-flounder": GFG("flounder"), // Platichthys flesus
      "rainbow-trout": GFG("rainbow-trout"), // Oncorhynchus mykiss
      "arctic-char": GFG("arctic-char"), // Salvelinus alpinus
    },
  },
};

/** Freshwater fish the guides list (farmed, or caught commercially and sold). */
const SOLD_FRESH = new Set(["rainbow-trout", "arctic-char", "channel-catfish", "nile-tilapia", "mozambique-tilapia", "lake-whitefish", "yellow-perch", "walleye", "common-carp", "zander", "nile-perch", "european-perch"]);

/** Whether a seafood guide would list this fish at all. */
export const inSeafoodGuides = (fish: { slug: string; water?: string }) => fish.water === "salt" || fish.water === "both" || SOLD_FRESH.has(fish.slug);

/** The search term: the everyday name without its bracketed part ("Redfish (red drum)" → "Redfish"). */
const term = (name: string) => name.replace(/\s*\([^)]*\)\s*$/, "").trim();

/** Mid-sentence: "walleye", "rainbow trout", but "Atlantic cod", "Nile perch". */
const PROPER = /^(Atlantic|Pacific|European|Nile|Mozambique|Chinook|Coho|African|West|Cape|Spanish|Hottentot|Galjoen)\b/;
const inSentence = (name: string) => (PROPER.test(name) ? name : name.charAt(0).toLowerCase() + name.slice(1));

const hostOf = (u: string) => {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

/** The look-up links for a fish, from the guides shown on the page that have its species page on their own site. */
export function seafoodLookups(fish: { slug: string; name: string; water?: string }, orgs: Pick<Organisation, "slug" | "links">[]): SeafoodLookup[] {
  if (!inSeafoodGuides(fish)) return [];
  const out: SeafoodLookup[] = [];
  for (const o of orgs) {
    const g = SEAFOOD_GUIDES[o.slug];
    const href = g?.pages[fish.slug];
    if (!g || !href) continue;
    // On the guide's own site: the same host as the organisation's home, or a subdomain of it.
    const home = hostOf(o.links.home);
    const h = hostOf(href);
    if (!home || !(h === home || h.endsWith(`.${home}`))) continue;
    out.push({ org: o.slug, label: `Look up ${inSentence(term(fish.name))} in ${g.guide}`, href });
  }
  return out;
}
