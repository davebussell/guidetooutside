import { DayPlanner } from "@/components/learn/DayPlanner";
import { bookshopEarns, bookshopUrl } from "@/lib/affiliate";
import { BOOKS, bookCover, booksFor, hasIsbn, orgShort, sellerOf, type Book } from "@/lib/books";
import { KID_VIDEOS, kidVideosFor, type KidVideo } from "@/data/kid-videos";
import { PLANNER_BOOK_TAGS, PLANNER_FILM_ORDER } from "@/lib/learn/planner-media";
import { cookiePlace, shortName } from "@/lib/kids/here";
import { forecastAt, monthIn, seasonOf, skyOf, type Season, type Sky } from "@/lib/kids/world";
import { classifyEcoregion } from "@/lib/ecoregions";
import { placeFromSlug } from "@/lib/geocode";

export type PlannerBookLink = { label: string; url: string; title: string; affiliate: boolean; org?: string };
export type PlannerBook = {
  isbn: string;
  title: string;
  author: string;
  ages: string;
  kind: string;
  animals: string[];
  cover: boolean;
  /** The first of `links`: where the card itself points. */
  href: string;
  affiliate: boolean;
  /** Where to buy it: the selling organisation's shop first for a book that supports one, then Bookshop.org. */
  links: PlannerBookLink[];
  /** Set when the book is sold by a conservation organisation: its slug and short name. */
  supports?: { org: string; name: string };
};
export type PlannerFilm = { id: string; title: string; channel: string; minutes?: number; live?: boolean; kind: string; animals: string[] };

export type PlannerInfo = {
  placeName: string | null;
  slug: string | null;
  country: string | null;
  season: Season;
  sky: Sky;
  tempC: number | null;
  hiC: number | null;
  loC: number | null;
  books: PlannerBook[];
  videos: PlannerFilm[];
};

/** Bookshop.org for any book it lists; a book sold by an organisation links to that organisation's shop first. */
function plannerLinks(b: Book): PlannerBookLink[] {
  const links: PlannerBookLink[] = [];
  const seller = sellerOf(b);
  if (b.supports && seller) links.push({ label: `Buy from ${orgShort(seller)}`, url: b.supports.url, title: `Proceeds support ${seller.name}'s work`, affiliate: false, org: seller.slug });
  if (hasIsbn(b) && b.bookshop !== false) links.push({ label: "Bookshop.org", url: bookshopUrl(b.isbn), title: "Profits go to independent American bookshops.", affiliate: bookshopEarns() });
  return links;
}

/** The planner's animal tags for books sold by organisations, so an activity about that animal picks the book. */
const SUPPORTED_TAGS: Record<string, { kind: "animal"; animals: string[] }> = {
  "9780228105176": { kind: "animal", animals: ["turtle"] }, // Saving Turtles (OTCC)
  "9780713676785": { kind: "animal", animals: ["robin"] }, // My First Book of Garden Birds (RSPB)
  "lpo:EN1720": { kind: "animal", animals: ["fox"] }, // Les p'tits renards (LPO)
  "lpo:EN1722": { kind: "animal", animals: ["geese-migration"] }, // Les p'tits voyageurs (LPO)
  "lpo:EN1699": { kind: "animal", animals: ["raven"] }, // Corvidés (LPO)
};
const tagsOf = (isbn: string) => PLANNER_BOOK_TAGS[isbn] ?? SUPPORTED_TAGS[isbn];

const bookCard = (b: Book, kind = tagsOf(b.isbn)?.kind ?? "place", animals = tagsOf(b.isbn)?.animals ?? []): PlannerBook => {
  const links = plannerLinks(b);
  const seller = sellerOf(b);
  return {
    isbn: b.isbn,
    title: b.title,
    author: b.author,
    ages: b.ages,
    kind,
    animals,
    cover: bookCover(b) !== null,
    href: links[0]?.url ?? bookshopUrl(b.isbn),
    affiliate: links[0]?.affiliate ?? bookshopEarns(),
    links,
    ...(seller ? { supports: { org: seller.slug, name: orgShort(seller) } } : {}),
  };
};
/** The planner is for children: books for grown-ups stay on the /resources shelves. */
const forChildren = (b: Book) => b.ages !== "Grown-ups";
const filmCard = (v: KidVideo): PlannerFilm => ({ id: v.id, title: v.title, channel: v.channel, minutes: v.minutes, live: v.live, kind: v.kind, animals: v.animals });

/** The books the planner carries everywhere, in the planner's order. */
const generalBooks = () => BOOKS.filter((b) => PLANNER_BOOK_TAGS[b.isbn]).map((b) => bookCard(b));
/** The films about no place in particular, in the planner's order. */
const generalFilms = () => PLANNER_FILM_ORDER.map((id) => KID_VIDEOS.find((v) => v.id === id)).filter((v): v is KidVideo => !!v).map(filmCard);

/** What the day planner starts from: the remembered place, today's weather there, and the books and films that suit it. */
export async function plannerInfo(now = new Date()): Promise<PlannerInfo> {
  const here = await cookiePlace();
  if (!here) {
    return {
      placeName: null,
      slug: null,
      country: null,
      season: seasonOf(monthIn(null, now)),
      sky: "partly",
      tempC: null,
      hiC: null,
      loC: null,
      books: generalBooks(),
      videos: generalFilms(),
    };
  }
  const [fc, place] = await Promise.all([forecastAt(here.lat, here.lon), placeFromSlug(here.slug).catch(() => null)]);
  const region = (classifyEcoregion(here.lat, here.lon) as { slug: string } | null)?.slug ?? "";
  const today = fc?.days[0];
  // The place's own shelves first (books sold by organisations that work here, about right here, this part of the country, animals that live here), then the general ones.
  const local = booksFor({ slug: here.slug, lat: here.lat, lon: here.lon, countryCode: place?.countryCode, admin1Code: place?.admin1Code }, region)
    .filter((t) => t.tier !== "everywhere")
    .flatMap((t) => t.books.filter(forChildren).map((b) => bookCard(b, tagsOf(b.isbn)?.kind ?? (t.tier === "animals" ? "animal" : "place"))));
  const books = [...local, ...generalBooks().filter((b) => !local.some((l) => l.isbn === b.isbn))];
  const localFilms = kidVideosFor({ lat: here.lat, lon: here.lon }, region).map((x) => filmCard(x.video));
  const videos = [...localFilms, ...generalFilms().filter((v) => !localFilms.some((l) => l.id === v.id))];
  return {
    placeName: shortName(here.label),
    slug: here.slug,
    country: place?.countryCode ?? null,
    season: seasonOf(monthIn(here.tz ?? fc?.timezone ?? null, now), here.lat),
    sky: fc ? skyOf(fc.current.code) : "partly",
    tempC: fc ? Math.round(fc.current.temp) : null,
    hiC: today ? Math.round(today.tMax) : null,
    loC: today ? Math.round(today.tMin) : null,
    books,
    videos,
  };
}

export async function TodayPlanner() {
  return <DayPlanner info={await plannerInfo()} />;
}
