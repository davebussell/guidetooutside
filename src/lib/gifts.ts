/**
 * The "Gifts that give" shelf for a place: symbolic adoptions and gift
 * memberships from the organisations that work there (closest first, one per
 * organisation), and 1% for the Planet brands that sell in the place's
 * country, spread across the site's topics. Four to six items when the place
 * has enough; nothing is padded in from elsewhere.
 */
import { GEAR, ORG_GIFTS, type GearBrand, type GearTopic, type OrgGift } from "@/data/gifts";
import { orgBySlug, type Organisation } from "@/data/conservation";
import { orgsFor, type MatchPlace } from "@/lib/conservation/match";
import { brandUrl } from "@/lib/affiliate";

export type { GearTopic } from "@/data/gifts";

export type GiftItem =
  | { type: "org"; gift: OrgGift; org: Organisation }
  | { type: "gear"; brand: GearBrand; url: string; earns: boolean };

export const GIFT_KIND_LABEL: Record<OrgGift["kind"], string> = {
  adoption: "Symbolic adoption",
  membership: "Membership",
  "donation-gift": "Gift in someone's name",
  subscription: "Gift subscription",
};

/** Organisation gifts that can be bought or sent from this place, closest organisation first. */
export function orgGiftsFor(place: MatchPlace): { gift: OrgGift; org: Organisation }[] {
  const matches = orgsFor(place);
  const tierOf = new Map(matches.map((m) => [m.org.slug, m.tier]));
  const out = ORG_GIFTS.map((gift, i) => ({ gift, org: orgBySlug(gift.org), i }))
    .filter((x): x is { gift: OrgGift; org: Organisation; i: number } => !!x.org)
    .filter(({ gift, org }) => (gift.countries ? gift.countries.includes(place.countryCode) : tierOf.has(org.slug)));
  // The international Roots & Shoots entry is only for places without a national programme on the list.
  const national = out.some((x) => x.gift.org.startsWith("roots-and-shoots-"));
  return out
    .filter((x) => !(national && x.gift.org === "roots-and-shoots"))
    .sort((a, b) => (tierOf.get(b.org.slug) ?? 1) - (tierOf.get(a.org.slug) ?? 1) || a.i - b.i)
    .map(({ gift, org }) => ({ gift, org }));
}

/** 1% for the Planet brands that sell in this country, the page's topics first. */
export function gearFor(countryCode: string, topics: GearTopic[] = []): { brand: GearBrand; url: string; earns: boolean }[] {
  const here = GEAR.filter((g) => g.urls[countryCode]);
  const order: GearTopic[] = [...topics, ...(["gardening", "fishing", "foraging", "homesteading"] as GearTopic[]).filter((t) => !topics.includes(t))];
  // Round-robin across topics so a shelf is not four fishing brands.
  const picked: GearBrand[] = [];
  for (let round = 0; picked.length < here.length && round < here.length; round++) {
    for (const t of order) {
      const next = here.find((g) => !picked.includes(g) && g.topics.includes(t));
      if (next) picked.push(next);
    }
  }
  return picked.map((brand) => ({ brand, ...brandUrl(brand.urls[countryCode], brand.affiliate) }));
}

/** The shelf: up to three organisation gifts and up to three brands, each side filling in for the other up to `limit`. */
export function giftsFor(place: MatchPlace, opts: { topics?: GearTopic[]; limit?: number } = {}): GiftItem[] {
  const limit = opts.limit ?? 6;
  const seen = new Set<string>();
  const all = orgGiftsFor(place);
  // One gift per organisation first, then second gifts if there is room.
  const firsts = all.filter((x) => (seen.has(x.org.slug) ? false : (seen.add(x.org.slug), true)));
  const seconds = all.filter((x) => !firsts.includes(x));
  const gear = gearFor(place.countryCode, opts.topics);
  const half = Math.ceil(limit / 2);
  const nOrg = Math.min(all.length, Math.max(half, limit - gear.length));
  const orgItems = [...firsts, ...seconds].slice(0, nOrg).map((x): GiftItem => ({ type: "org", ...x }));
  const gearItems = gear.slice(0, limit - orgItems.length).map((g): GiftItem => ({ type: "gear", ...g }));
  return [...orgItems, ...gearItems];
}
