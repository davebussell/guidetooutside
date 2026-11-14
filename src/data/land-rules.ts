/**
 * Who says whether you may pick: the land rules printed on a town's foraging page.
 *
 * Added after the audit of 2 November 2026 found that the Ottawa page never said
 * where picking is legal, though most of the land around Ottawa is under a rule
 * that forbids it. Every entry is a regulator's rule for a jurisdiction, with its
 * source and the date it was checked (rule 2 of the accuracy standard); an entry
 * exists only where the wording was read on the regulator's own page. Nothing is
 * inferred: where no rule is loaded the page carries one generic sentence of
 * advice, which names no law and makes no legal claim.
 *
 * Scope: the National Capital Region, taken as a circle of NCR_RADIUS_KM around
 * Ottawa. Other jurisdictions are added by writing another entry here.
 *
 * Wording, checked 2 November 2026 on the pages named in each `source`:
 * // NCC: "the National Capital Act prohibits gathering or picking anything found on NCC lands"; "important not to pick
 * //   mushrooms"; "a fine up to $500, under NCC regulations" (NCC blog, "It's important to leave what you find in the Capital")
 * // City of Ottawa: Parks and Facilities By-law No. 2004-276: "No person shall, in a park, cut, climb, break, injure, deface,
 * //   disturb or remove any property including: a tree, shrub, bush, flower, plant, grass, wood, soil, sand, rock or gravel"
 * // Ontario Parks: "foraging for any plant or fungal species is prohibited in provincial parks"; "removing any natural object
 * //   from a provincial park is prohibited"; the only exception named is Indigenous constitutional harvesting rights
 * // O. Reg. 688/21 s. 4(b): in a conservation area no person shall "cut, remove, injure or destroy a plant, tree, shrub,
 * //   flower or other growing thing"; not applicable to areas "operated or managed by a municipality" or run under an agreement (s. 2)
 * // Quebec: Regulation respecting threatened or vulnerable plant species and their habitats (E-12.01, r. 3) s. 4: personal
 * //   harvest of wild leek up to 200 g of any of its parts, or 50 bulbs or 50 plants, a year; the exemption does not apply in a
 * //   park under the Parks Act and other listed protected areas
 */
import type { Place } from "@/lib/types";
import { REGION_LAND_RULES } from "./region-rules";

/** What a rule needs to know about the place. */
export type LandPlace = Pick<Place, "lat" | "lon"> & Partial<Pick<Place, "admin1" | "admin1Code" | "countryCode">>;

export type LandRule = {
  id: string;
  /** Whether the rule is printed on this place's page. */
  applies: (place: LandPlace) => boolean;
  /** The kind of land it covers. */
  title: string;
  /** What the regulator says, in plain words that stay inside the source. */
  rule: string;
  source: { label: string; url: string };
  /** ISO date the source was last read. */
  checked: string;
};

/** The National Capital Region as a circle: Ottawa's centre, and how far out the rules below are loaded. */
export const NCR_CENTRE = { lat: 45.4209, lon: -75.6901 };
export const NCR_RADIUS_KM = 40;

const km = (a: { lat: number; lon: number }, b: { lat: number; lon: number }) => {
  const r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r;
  const dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};

/** True inside the Ottawa-Gatineau circle. */
export const inNationalCapitalRegion = (p: LandPlace): boolean => km(NCR_CENTRE, p) <= NCR_RADIUS_KM;
const inOntario = (p: LandPlace) => p.admin1Code === "ON" || p.admin1 === "Ontario";

const CHECKED = "2026-11-02";

export const LAND_RULES: LandRule[] = [
  {
    id: "ncc",
    applies: inNationalCapitalRegion,
    title: "National Capital Commission (NCC) lands, including the Greenbelt and Gatineau Park",
    rule: "The NCC says the National Capital Act prohibits gathering or picking anything found on NCC lands, and that it is important not to pick mushrooms. Anyone who breaks the rule may be subject to a fine of up to $500 under NCC regulations.",
    source: { label: "NCC: It's important to leave what you find in the Capital", url: "https://ncc-ccn.gc.ca/blog/its-important-to-leave-what-you-find-in-the-capital" },
    checked: CHECKED,
  },
  {
    id: "city-of-ottawa-parks",
    applies: (p) => inNationalCapitalRegion(p) && inOntario(p),
    title: "City of Ottawa parks",
    rule: "The Parks and Facilities By-law (No. 2004-276) says no person shall, in a park, cut, climb, break, injure, deface, disturb or remove any property, including a tree, shrub, bush, flower, plant, grass, wood, soil, sand, rock or gravel.",
    source: { label: "City of Ottawa: Parks and Facilities By-law No. 2004-276", url: "https://ottawa.ca/en/parks-and-facilities-law-no-2004-276" },
    checked: CHECKED,
  },
  {
    id: "ontario-provincial-parks",
    applies: (p) => inNationalCapitalRegion(p) && inOntario(p),
    title: "Ontario provincial parks",
    rule: "Ontario Parks says foraging for any plant or fungal species is prohibited in provincial parks, and that removing any natural object from a provincial park is prohibited. The only exception it names is Indigenous communities exercising constitutional harvesting rights.",
    source: { label: "Ontario Parks blog: foraging in provincial parks", url: "https://blog.ontarioparks.ca/?p=36243" },
    checked: CHECKED,
  },
  {
    id: "ontario-conservation-areas",
    applies: (p) => inNationalCapitalRegion(p) && inOntario(p),
    title: "Conservation authority land",
    rule: "Ontario Regulation 688/21 (Rules of Conduct in Conservation Areas) says no person shall, in a conservation area, cut, remove, injure or destroy a plant, tree, shrub, flower or other growing thing. It does not apply to conservation areas operated or managed by a municipality, or run under an agreement.",
    source: { label: "O. Reg. 688/21, Rules of Conduct in Conservation Areas (s. 4(b), s. 2)", url: "https://mvca.on.ca/wp-content/uploads/2024/04/Reg-688_21_Conduct-in-CAs.pdf" },
    checked: CHECKED,
  },
  {
    id: "quebec-wild-leek",
    applies: inNationalCapitalRegion,
    title: "Wild leek (ail des bois) in Quebec",
    rule: "Under Quebec's regulation on threatened or vulnerable plant species, wild leek may be harvested for personal use only up to 200 g of any of its parts, or 50 bulbs or 50 plants, a year, and not in a park under the Parks Act or the other protected areas the regulation lists. The NCC ban above covers Gatineau Park.",
    source: { label: "Légis Québec: E-12.01, r. 3, s. 4", url: "https://www.legisquebec.gouv.qc.ca/en/document/cr/E-12.01,%20r.%203" },
    checked: CHECKED,
  },
  // Rules read region by region from the regulators' own pages: src/data/region-rules/.
  ...REGION_LAND_RULES,
];

/**
 * The one line for every place where no rule is loaded. It is advice, not a legal
 * claim, and names no law.
 */
export const GENERIC_LAND_RULE = "Whether you may pick depends on who owns or manages the land; parks and reserves often ban it. Ask the landowner or manager first.";

/** The loaded rules for a place (empty outside the National Capital Region). */
export const landRulesFor = (place: LandPlace): LandRule[] => LAND_RULES.filter((r) => r.applies(place));
