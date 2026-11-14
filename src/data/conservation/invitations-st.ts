/**
 * Invitations added for page stories (agent ST), when a story needs one that
 * agent IV's list (./invitations.ts) does not carry. Same schema and rules.
 */
import type { Invitation } from "./invitations";

export const INVITATIONS_ST: Invitation[] = [
  {
    slug: "heritage-rabbit-census-2026",
    org: "livestock-conservancy",
    title: "Count your heritage rabbits in the 2026 census",
    name: "2026 Heritage Rabbit Census",
    summary:
      "If you breed any rabbit breed on The Livestock Conservancy's Conservation Priority List, fill in its census survey; answers are anonymous and you need not be a member. It is the first full count of the breeding populations of these breeds, because many breeding rabbits are never registered or shown.",
    kind: "count",
    effort: "minutes",
    family: false,
    fromHome: true,
    free: true,
    // The Conservancy gives no closing date, only "through late winter 2026–27": re-check in March 2027.
    when: { kind: "ongoing", note: "Open through late winter 2026–27" },
    areas: [{ kind: "country", countries: ["US", "CA"] }],
    topics: ["soil-seeds"],
    url: "https://livestockconservancy.org/heritage-breeds/2026-rabbit-census/",
    cta: "Take part in the census",
    verified: "2026-10-26",
    sources: ["https://livestockconservancy.org/heritage-breeds/2026-rabbit-census/", "https://livestockconservancy.org/rc2026/"],
  },
];
