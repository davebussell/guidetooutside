/**
 * The way in for a food role, for organisations tagged as food bodies whose
 * round-one record is about other work (the Marine Conservation Society's
 * card in a seafood band opens its Good Fish Guide, not a beach clean), and
 * for a food record whose own links have no fitting first button. Each
 * page was opened in a browser and read on the date given. In a food band the
 * card's button becomes this way (after an open food invitation of its own);
 * with `hideAsks` its round-one asks (about the other work) are left off.
 */
import type { FoodRole } from "@/data/conservation";

export type FoodWay = {
  href: string;
  label: string;
  checked: string;
  hideAsks?: boolean;
  /** The card's blurb in a food band, when the record's own blurb is about its other work. */
  blurb?: string;
};

export const FOOD_WAYS: Record<string, Partial<Record<FoodRole, FoodWay>>> = {
  "marine-stewardship-council": {
    // "Eating MSC certified sustainable seafood": choose the blue ecolabel, labelled brands and shops, sustainable species.
    "sustainable-seafood": { href: "https://www.msc.org/uk/what-you-can-do", label: "How to choose MSC seafood", checked: "2026-10-27" },
  },
  "ocean-wise": {
    // "Ocean Wise Seafood — The happy fish tells you it's sustainable" (seafood.ocean.org redirects here).
    "sustainable-seafood": {
      href: "https://ocean.org/overfishing/sustainable-seafood/",
      label: "See Ocean Wise Seafood",
      checked: "2026-10-27",
      hideAsks: true,
      blurb:
        "Ocean Wise Seafood is the charity's seafood programme: its scientists and fisheries experts mark sustainable choices as Ocean Wise Recommended, more than 1,400 of them, from current data. Its Seafood Search looks up a fish before you buy it.",
    },
  },
  "marine-conservation-society": {
    // "Good Fish Guide · Explore seafood ratings".
    "sustainable-seafood": { href: "https://www.mcsuk.org/goodfishguide/", label: "Open the Good Fish Guide", checked: "2026-10-26", hideAsks: true },
  },
  "woodland-trust": {
    // "Responsible foraging guidelines".
    "foraging-code": { href: "https://www.woodlandtrust.org.uk/visiting-woods/things-to-do/foraging/foraging-guidelines/", label: "Read the foraging guidelines", checked: "2026-10-26", hideAsks: true },
  },
  "avon-wildlife-trust": {
    // "Grow Wilder urban nature hub and wildflower nursery".
    "community-farms": { href: "https://www.avonwildlifetrust.org.uk/grow-wilder", label: "See Grow Wilder in Bristol", checked: "2026-10-26", hideAsks: true },
    "growing-advice": { href: "https://www.avonwildlifetrust.org.uk/grow-wilder", label: "See Grow Wilder in Bristol", checked: "2026-10-26", hideAsks: true },
  },
  "wwf-south-africa": {
    // "The Southern African Sustainable Seafood Initiative · Download the WWF-SASSI app".
    "sustainable-seafood": { href: "https://wwfsassi.co.za/", label: "See WWF-SASSI", checked: "2026-10-26", hideAsks: true },
  },
  "metsahallitus-luontopalvelut": {
    // luontoon.fi, its outdoor site: "Everyman's rights mean that you can … · do not give you a right to … · in nature reserves".
    "foraging-code": { href: "https://www.luontoon.fi/en/articles/everymans-rights", label: "Read about everyman's rights", checked: "2026-10-26", hideAsks: true },
  },
  "slow-food-usa": {
    // "School Garden Program · The Slow Food USA School Garden Network · School Garden Curriculum".
    "school-gardens": { href: "https://slowfoodusa.org/school-gardens/", label: "See the School Garden Program", checked: "2026-10-26", hideAsks: true },
  },
  "seafood-watch": {
    // "Recommendations · Know how your seafood rates · Search seafood recommendations". Its record files the consumer guides page under `events`,
    // which a card would label "See upcoming events"; the search is the way in. No per-fish link: its search keeps no query in the address.
    "sustainable-seafood": { href: "https://www.seafoodwatch.org/recommendations", label: "Search Seafood Watch", checked: "2026-10-26" },
  },
  "seed-savers-exchange": {
    // "Welcome to The Exchange! … sharing and swapping unique varieties".
    "seed-library": { href: "https://exchange.seedsavers.org/", label: "Find seed on the Exchange", checked: "2026-10-26" },
  },
};

export const foodWayFor = (slug: string, role: FoodRole): FoodWay | undefined => FOOD_WAYS[slug]?.[role];
