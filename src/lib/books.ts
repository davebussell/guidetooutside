/**
 * Which books a place's /resources page shows, and where to buy them.
 *
 * First shelf, "Buying these supports an organisation": books sold by
 * conservation organisations in the library (`supports` in src/data/books.ts),
 * shown only where that organisation's shop reaches the reader, the ones about
 * right here first, then this part of the country, then animals that live
 * here, then the rest. Then the four picture-book shelves reconstructed from
 * the 264 captured pages, all of which they reproduce: "About right here",
 * up to twelve "About this part of the country", "Animals that live near
 * you", "Loved everywhere"; a book appears once, in the first tier it
 * qualifies for, in BOOKS order.
 *
 * Storefronts: a book sold by an organisation links to its page in the
 * organisation's own shop first. Then the independent bookshop: Canadian
 * places get "Find a Canadian indie" (indiebookstores.ca), everywhere else
 * Bookshop.org, whose profits go to independent bookshops; no other bookseller.
 */

import { BOOKS, hasIsbn, type Book } from "@/data/books";
import { orgBySlug, type Organisation } from "@/data/conservation";
import { orgsFor, type MatchPlace } from "@/lib/conservation/match";
import { bookshopEarns, bookshopUrl } from "@/lib/affiliate";

export type { Book } from "@/data/books";
export { BOOKS, hasIsbn } from "@/data/books";

export type BookTier = "supports" | "here" | "region" | "animals" | "everywhere";

export const BOOK_TIER_LABEL: Record<BookTier, string> = {
  supports: "Buying these supports an organisation",
  here: "About right here",
  region: "About this part of the country",
  animals: "Animals that live near you",
  everywhere: "Loved everywhere",
};

/** The most "About this part of the country" books a page lists. */
export const REGION_BOOK_LIMIT = 12;
/** The most books on the "supports an organisation" shelf. */
export const SUPPORT_BOOK_LIMIT = 10;

const inRange = (b: Book, lat: number) => (b.latMin == null || lat >= b.latMin) && (b.latMax == null || lat <= b.latMax);

/** The organisation that sells a book, when it is in the library. */
export const sellerOf = (b: Pick<Book, "supports">): Organisation | undefined => (b.supports ? orgBySlug(b.supports.org) : undefined);

/** The name to print for an organisation in tight spaces. */
export const orgShort = (o: Organisation) => o.shortName ?? o.name;

export type BookPlace = { slug: string; lat: number; lon?: number; countryCode?: string; admin1Code?: string; name?: string; country?: string };

/**
 * The books on sale from organisations whose shops reach this place, ordered
 * place → region → animals → everywhere. A book whose `supports.countries` is
 * set shows only in those countries; otherwise only where its organisation
 * works (the library's own service areas).
 */
export function supportedBooksFor(place: BookPlace, regionSlug: string): Book[] {
  if (place.lon == null || !place.countryCode) return [];
  const served = new Set(orgsFor(place as MatchPlace).map((m) => m.org.slug));
  const cc = place.countryCode;
  const eligible = BOOKS.filter((b) => {
    if (!b.supports || !sellerOf(b)) return false;
    return b.supports.countries ? b.supports.countries.includes(cc) : served.has(b.supports.org);
  });
  const rank = (b: Book) =>
    b.places?.includes(place.slug) ? 0 : b.regions?.includes(regionSlug) && inRange(b, place.lat) ? 1 : b.animals?.includes(regionSlug) && inRange(b, place.lat) ? 2 : b.everywhere ? 3 : 4;
  return eligible
    .map((b, i) => ({ b, r: rank(b), i }))
    .filter((x) => x.r < 4)
    .sort((a, z) => a.r - z.r || a.i - z.i)
    .slice(0, SUPPORT_BOOK_LIMIT)
    .map((x) => x.b);
}

/** The book shelves for a place, tier by tier (empty tiers left out). */
export function booksFor(place: BookPlace, regionSlug: string): { tier: BookTier; label: string; books: Book[] }[] {
  const shown = new Set<string>();
  const take = (books: Book[]) => {
    books.forEach((b) => shown.add(b.isbn));
    return books;
  };
  const supports = take(supportedBooksFor(place, regionSlug));
  // The picture-book shelves never carry a book sold by an organisation.
  const pictures = BOOKS.filter((b) => !b.supports);
  const here = take(pictures.filter((b) => b.places?.includes(place.slug)));
  const region = take(pictures.filter((b) => !shown.has(b.isbn) && b.regions?.includes(regionSlug) && inRange(b, place.lat)).slice(0, REGION_BOOK_LIMIT));
  const animals = take(pictures.filter((b) => !shown.has(b.isbn) && b.animals?.includes(regionSlug) && inRange(b, place.lat)));
  const everywhere = pictures.filter((b) => b.everywhere);
  const tiers: [BookTier, Book[]][] = [["supports", supports], ["here", here], ["region", region], ["animals", animals], ["everywhere", everywhere]];
  return tiers.filter(([, books]) => books.length).map(([tier, books]) => ({ tier, label: BOOK_TIER_LABEL[tier], books }));
}

export type BookLink = {
  label: string;
  url: string;
  title: string;
  /** An independent bookshop. */
  indie: boolean;
  affiliate: boolean;
  /** Set on the link to a selling organisation's shop: its library slug. */
  org?: string;
};

/** Where to buy a book from a place in `countryCode`: the selling organisation first, then the independent shop. */
export function bookLinks(book: Pick<Book, "isbn" | "supports" | "bookshop">, countryCode?: string): BookLink[] {
  const links: BookLink[] = [];
  const seller = sellerOf(book);
  if (book.supports && seller) {
    links.push({ label: `Buy from ${orgShort(seller)}`, url: book.supports.url, title: `Proceeds support ${seller.name}'s work`, indie: false, affiliate: false, org: seller.slug });
  }
  if (!hasIsbn(book)) return links;
  if (countryCode === "CA")
    links.push({ label: "Find a Canadian indie", url: `https://www.indiebookstores.ca/book/${book.isbn}/`, title: "Enter a postal code and it names the nearest independent bookshop that can order it.", indie: true, affiliate: false });
  else if (book.bookshop !== false)
    links.push({ label: "Bookshop.org", url: bookshopUrl(book.isbn), title: "Profits go to independent American bookshops.", indie: true, affiliate: bookshopEarns() });
  return links;
}

/** "ages 4–8", or the seller's words ("grown-ups", "children", "all ages"). */
export const agesLabel = (ages: string) => (/^\d/.test(ages) ? `ages ${ages}` : ages.toLowerCase());

/** The cover image, if the book has one. */
export const bookCover = (b: Book) => (b.cover === false || !hasIsbn(b) ? null : `/books/${b.isbn}.webp`);
