/**
 * The menus as the header's mega menu, the mobile menu and the footer show them: src/lib/nav's NAV_MENUS with what
 * belongs to a parked continent (src/lib/scope.ts) taken out. A link to a parked fish is replaced by a served fish of
 * the same kind, so no menu sends a reader to a page that is not there, and the three notes that described the other
 * continents are reworded for Canada and the United States.
 *
 * The lasting fix is to make the same changes in src/lib/nav.jsx; once they are there, this file's two tables match
 * nothing and it can go.
 */
import { NAV_MENUS } from "@/lib/nav";

export type NavHref = string | ((slug: string | null) => string);
export type NavLink = { href: NavHref; label: string; note?: string; icon?: string; local?: boolean };
export type NavMenu = {
  id: string;
  icon: string;
  label: string;
  href: NavHref;
  homeLabel?: string;
  tagline: string;
  intro: { href: string; label: string; note: string };
  lead: NavLink;
  sections: { title: string; links: NavLink[] }[];
};

/** A link to a parked fish, by its href, and the served fish (in FISH, src/lib/nature) that takes its place. */
const SWAP: Record<string, { href: string; label: string }> = {
  "/wildlife/european-sea-bass": { href: "/wildlife/striped-bass", label: "Striped bass" },
  "/wildlife/nile-perch": { href: "/wildlife/largemouth-bass", label: "Largemouth bass" },
};

/** A note that described the other continents, by the link's label, and what it says now. */
const NOTE: Record<string, string> = {
  "Zone map": "The official zones of Canada and the United States",
  "The homestead year": "Tasks by climate signal",
  "Who looks after your water": "Waterkeepers and watershed groups",
};

function served(link: NavLink): NavLink {
  const swap = typeof link.href === "string" ? SWAP[link.href] : undefined;
  const note = link.note && NOTE[link.label];
  return { ...link, ...swap, ...(note ? { note } : {}) };
}

export const SERVED_NAV_MENUS: NavMenu[] = (NAV_MENUS as NavMenu[]).map((m) => ({
  ...m,
  sections: m.sections.map((s) => ({ ...s, links: s.links.map(served) })),
}));
