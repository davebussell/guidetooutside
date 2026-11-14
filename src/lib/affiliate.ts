/**
 * Shop links that may earn the site a commission, in one place. Every ID
 * comes from an environment variable set in Netlify, so a link earns as soon
 * as its ID is set and is a plain shop link until then:
 *
 *   NEXT_PUBLIC_BOOKSHOP_ID          Bookshop.org affiliate number (US store)
 *   NEXT_PUBLIC_AFFIL_<BRAND>        a 1% for the Planet brand's affiliate parameters, as the
 *                                    query string its programme gives (e.g. "avad=123456_abc"),
 *                                    appended to that brand's links on the gifts shelf. Brand keys
 *                                    are listed in AFFIL_BY_BRAND below and on each gear record
 *                                    in src/data/gifts.ts.
 *
 * Books sold by an organisation link to the organisation's own shop and never
 * carry an ID. IndieBookstores.ca has no affiliate program, so Canadian indie
 * links never carry one either. Book links go only to those three kinds of shop.
 */

const BOOKSHOP_ID = process.env.NEXT_PUBLIC_BOOKSHOP_ID || undefined;

/** A Bookshop.org link for an ISBN: the affiliate form when the ID is set. */
export const bookshopUrl = (isbn: string) => (BOOKSHOP_ID ? `https://bookshop.org/a/${BOOKSHOP_ID}/${isbn}` : `https://bookshop.org/book/${isbn}`);

/** Whether a Bookshop.org link earns. */
export const bookshopEarns = () => !!BOOKSHOP_ID;

/**
 * Affiliate parameters per brand. Each entry is read with a literal
 * `process.env.NEXT_PUBLIC_…` so Next inlines it in client bundles as well.
 */
const AFFIL_BY_BRAND: Record<string, string | undefined> = {
  PATAGONIA: process.env.NEXT_PUBLIC_AFFIL_PATAGONIA || undefined,
  KLEAN_KANTEEN: process.env.NEXT_PUBLIC_AFFIL_KLEAN_KANTEEN || undefined,
  TOADANDCO: process.env.NEXT_PUBLIC_AFFIL_TOADANDCO || undefined,
  LOON_OUTDOORS: process.env.NEXT_PUBLIC_AFFIL_LOON_OUTDOORS || undefined,
  WOODLAND_TOOLS: process.env.NEXT_PUBLIC_AFFIL_WOODLAND_TOOLS || undefined,
  CHEEKY: process.env.NEXT_PUBLIC_AFFIL_CHEEKY || undefined,
  REPYOURWATER: process.env.NEXT_PUBLIC_AFFIL_REPYOURWATER || undefined,
  ALPKIT: process.env.NEXT_PUBLIC_AFFIL_ALPKIT || undefined,
  COMPOSTY: process.env.NEXT_PUBLIC_AFFIL_COMPOSTY || undefined,
  GONE: process.env.NEXT_PUBLIC_AFFIL_GONE || undefined,
};

/** A brand link with its affiliate parameters appended, when they are set; the plain link otherwise. */
export function brandUrl(url: string, brandKey: string): { url: string; earns: boolean } {
  const params = AFFIL_BY_BRAND[brandKey];
  if (!params) return { url, earns: false };
  const u = new URL(url);
  for (const [k, v] of new URLSearchParams(params.replace(/^[?&]/, ""))) u.searchParams.set(k, v);
  return { url: u.toString(), earns: true };
}

/** Whether any brand on the gifts shelf earns (drives the disclosure line). */
export const anyBrandAffiliate = () => Object.values(AFFIL_BY_BRAND).some(Boolean);

/** Whether any affiliate ID is set at all. */
export const anyAffiliate = () => !!BOOKSHOP_ID || anyBrandAffiliate();

/** The line under the book shelf. */
export const AFFILIATE_DISCLOSURE =
  "Books marked as supporting an organisation are sold by that organisation; some other shop links are affiliate links that may earn the site a small commission, at no extra cost to you.";

/** The line under the gifts shelf. */
export const GEAR_DISCLOSURE =
  "Every brand here is a 1% for the Planet member: at least one per cent of its sales goes to environmental organisations. Some of these links may become affiliate links that earn the site a small commission.";
