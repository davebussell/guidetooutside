/**
 * The regulator for a region context: the province or state entry in Canada
 * and the US, the country entry everywhere else, from the 142-entry directory
 * in src/lib/regs.ts. Kept out of region-context.ts so that the directory is
 * only bundled where a regulator is shown.
 */
import { getRegsLink } from "./regs";
import { tidalPageFor, type RegulatorPage } from "@/data/regulator-pages";
import type { RegionContext } from "./region-context";
import type { LocalData, RegsLink } from "./types";

/** The official regulation source for the reader's place, or null when the country has no entry yet. */
export function regsForContext(ctx: RegionContext): RegsLink | null {
  if (!ctx.countryCode) return null;
  return getRegsLink({ countryCode: ctx.countryCode, admin1Code: ctx.admin1Code ?? undefined });
}

/**
 * The regulator of the town's tidal (salt) water, where it is not the province's or state's (regulator-pages
 * TIDAL_PAGES): only at a town with salt water, the sea within about 30 km or an estuary where river and sea mix. Day 5
 * audit (14 November 2026): the Regulations box at Nanaimo, Vancouver and Victoria named only the BC freshwater synopsis,
 * though the main water there is tidal and Fisheries and Oceans Canada sets its rules.
 */
export function tidalRegsFor(d: Pick<LocalData, "place" | "water">): RegulatorPage | null {
  const w = d.water;
  const salt = !!w && (w.coast !== null || w.tidal?.kind === "estuary");
  return salt ? tidalPageFor(d.place) : null;
}

/** "Seasons, limits and licence rules come from …": the agency, and the tidal regulator for tidal water where there is one. */
export function agencyNote(regs: RegsLink, tidal?: RegulatorPage | null): string {
  if (tidal) return `Seasons, limits and licence rules come from ${regs.agency} for fresh water and from ${tidal.name.replace(/ \(tidal waters\)$/, "")} for tidal water. Check both before you go.`;
  return `Seasons, limits and licence rules come from ${regs.agency}. Check before you go.`;
}

/**
 * "Check your province's regulations before you go" — never a North American default for a reader elsewhere. With the
 * tidal regulator (tidalRegsFor), both are named: the province's page is for fresh water only there.
 */
export function regulationsNote(ctx: RegionContext, regs: RegsLink | null, tidal?: RegulatorPage | null): string {
  if (regs) return agencyNote(regs, tidal);
  return `Check ${ctx.regulatorPossessive} fishing regulations before you go; the directory lists the official source for each country, province and state.`;
}
