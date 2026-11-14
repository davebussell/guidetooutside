/**
 * "Gifts that give": two kinds, every one checked on the organisation's or the
 * brand's own pages on 2026-10-22.
 *
 * ORG_GIFTS are symbolic adoptions, gift memberships and gift subscriptions
 * from organisations in the conservation library (src/data/conservation), plus
 * the free Roots & Shoots group registration. `org` is a library slug; a gift
 * whose organisation is not in the library yet is left off the shelf (and
 * named in the warning below) until the data agents add it. `countries` is
 * where the gift can be bought or sent, when narrower than or different from
 * where the organisation works.
 *
 * GEAR is 1% for the Planet member brands whose goods suit gardening, fishing,
 * foraging and homesteading. Each was confirmed in the 1% for the Planet
 * directory (a "Whole Company Member" listing, certified within the last year)
 * or on the brand's own 1% page; `source` keeps that page. `urls` gives the
 * brand's own site per country it sells to. `affiliate` is the key for its
 * NEXT_PUBLIC_AFFIL_<KEY> variable in src/lib/affiliate.ts.
 */
import { orgBySlug } from "@/data/conservation";

export type GiftKind = "adoption" | "membership" | "donation-gift" | "subscription";

export type OrgGift = {
  org: string;
  title: string;
  url: string;
  kind: GiftKind;
  /** One plain line on what the gift is or where the money goes, from the organisation's page. */
  note: string;
  countries?: string[];
  /** Costs nothing (a group registration): labelled "Free" rather than by kind. */
  free?: true;
};

export type GearTopic = "gardening" | "fishing" | "foraging" | "homesteading";

export type GearBrand = {
  brand: string;
  /** The brand's site for each country it sells to (ISO alpha-2 → URL). */
  urls: Record<string, string>;
  line: string;
  topics: GearTopic[];
  /** The 1% for the Planet directory listing or the brand's own 1% page. */
  source: string;
  /** How the source shows the membership, as read on the page. */
  membership: string;
  affiliate: string;
};

const EURO_ALPKIT = ["IE", "FR", "DE", "ES", "IT", "NL", "BE", "AT", "PT", "FI", "LU"];

export const ORG_GIFTS: OrgGift[] = [
  // United States
  {
    org: "jane-goodall-institute",
    title: "Become a Chimpanzee Guardian",
    url: "https://shop.janegoodall.org/category/adoptions/chimpanzee-guardian",
    kind: "adoption",
    note: "A symbolic adoption of a chimpanzee that supports the Institute's work in the Republic of the Congo.",
    countries: ["US"],
  },
  {
    org: "wwf-us",
    title: "Adopt a species",
    url: "https://gifts.worldwildlife.org/gift-center/",
    kind: "adoption",
    note: "Adopt an animal as a gift through World Wildlife Fund's gift centre.",
  },
  {
    org: "national-audubon-society",
    title: "Gift membership",
    url: "https://act.audubon.org/a/gift-membership",
    kind: "membership",
    note: "A year of Audubon magazine and access to local birding and community events.",
  },
  {
    org: "national-wildlife-federation",
    title: "Ranger Rick magazine, as a gift",
    url: "https://rangerrick.org/shop/ranger-rick-magazine/",
    kind: "subscription",
    note: "Ten issues a year of the federation's wildlife magazine for children aged 7 to 12.",
  },
  {
    org: "xerces-society",
    title: "Gift membership",
    url: "https://gifts.xerces.org/products/xerces-society-gift-membership",
    kind: "membership",
    note: "A year's membership of the invertebrate conservation society, with its magazine, Wings.",
  },
  {
    org: "roots-and-shoots-usa",
    title: "Register a Roots & Shoots group",
    url: "https://rootsandshoots.org/register/",
    kind: "membership",
    free: true,
    note: "Free: register a family, class or club and choose a project to see through. A gift of time.",
  },
  // Canada
  {
    org: "wwf-canada",
    title: "Adopt a species",
    url: "https://shop.wwf.ca/collections/adoptions",
    kind: "adoption",
    note: "A symbolic adoption as a plush kit, a card or a digital kit.",
  },
  {
    org: "canadian-wildlife-federation",
    title: "Adopt-an-Animal kit",
    url: "https://shopcwf.ca/collections/adopt-an-animal",
    kind: "adoption",
    note: "Each kit helps pay for the federation's research and programmes for the species.",
  },
  {
    org: "ontario-turtle-conservation-centre",
    title: "Adopt-a-Turtle kit",
    url: "https://ontarioturtle.ca/product/adopt-a-turtle-kit/",
    kind: "adoption",
    note: "A certificate of symbolic adoption and the story of a turtle from the centre's hospital, with a tax receipt.",
  },
  {
    org: "nature-canada",
    title: "Become a member",
    url: "https://naturecanada.ca/defend-nature/join/",
    kind: "membership",
    note: "Join Nature Canada's members and supporters across the country.",
  },
  {
    org: "roots-and-shoots-canada",
    title: "Start a Roots & Shoots group",
    url: "https://janegoodall.ca/what-we-do/canada-programs/roots-and-shoots/",
    kind: "membership",
    free: true,
    note: "Free: start and register a group with your class, club or family. A gift of time.",
  },
  // United Kingdom
  {
    org: "rspb",
    title: "Family membership",
    url: "https://www.rspb.org.uk/membership",
    kind: "membership",
    note: "For up to two adults and five children; the RSPB's youth membership can also be given as a gift.",
  },
  {
    org: "the-wildlife-trusts",
    title: "Adopt an animal",
    url: "https://www.wildlifetrusts.org/adopt-animal",
    kind: "adoption",
    note: "The Wildlife Trusts say adoption money goes to local wildlife work such as managing nature reserves.",
  },
  {
    org: "the-wildlife-trusts",
    title: "Gift or family membership",
    url: "https://www.wildlifetrusts.org/get-involved/membership",
    kind: "membership",
    note: "Children become Wildlife Watch members through a family membership.",
  },
  {
    org: "wwf-uk",
    title: "Adopt an animal",
    url: "https://support.wwf.org.uk/adoptions",
    kind: "adoption",
    note: "A symbolic adoption for yourself or as a gift.",
  },
  {
    org: "woodland-trust",
    title: "Gift a tree",
    url: "https://shop.woodlandtrust.org.uk/gift-a-tree-2",
    kind: "donation-gift",
    note: "A tree given to mark a birthday, a new home or a new beginning.",
  },
  {
    org: "national-trust",
    title: "Gift membership",
    url: "https://www.nationaltrust.org.uk/membership/gift-membership",
    kind: "membership",
    note: "Individual, joint, family, young person and junior memberships can all be given.",
  },
  {
    org: "roots-and-shoots-uk",
    title: "Register a Roots & Shoots group",
    url: "https://www.rootsnshoots.org.uk/",
    kind: "membership",
    free: true,
    note: "Free: register a class or group and pick a project. A gift of time.",
  },
  // Europe
  {
    org: "lpo",
    title: "Adhérer à la LPO",
    url: "https://www.lpo.fr/s-engager-a-nos-cotes/adherer-a-l-association",
    kind: "membership",
    note: "Membership of France's bird protection league, its BirdLife partner.",
  },
  {
    org: "wwf-espana",
    title: "Hazte socio",
    url: "https://www.wwf.es/colabora/hazte_socio_a/",
    kind: "membership",
    note: "Membership of WWF España.",
  },
  {
    org: "lipu",
    title: "Iscriviti alla Lipu",
    url: "https://soci.lipu.it/?origine=30",
    kind: "membership",
    note: "Membership of Italy's bird protection league, which funds its projects for nature.",
  },
  {
    org: "wwf-italia",
    title: "Socio famiglia o junior",
    url: "https://sostieni.wwf.it/iscrizioni/",
    kind: "membership",
    note: "Adult, junior and family memberships of WWF Italia.",
  },
  {
    org: "nabu",
    title: "NABU-Mitglied werden",
    url: "https://www.nabu.de/index.html#mitglied",
    kind: "membership",
    note: "Membership of Germany's nature and biodiversity union, which members back for the long term.",
  },
  // Africa
  {
    org: "birdlife-south-africa",
    title: "Membership or gift membership",
    url: "https://birdlife.org.za/support-us/become-a-member/",
    kind: "membership",
    note: "Join, or give a membership, and back BirdLife South Africa's conservation work and science.",
  },
  {
    org: "botanical-society-of-south-africa",
    title: "Become a member",
    url: "https://botanicalsociety.org.za/join-now/",
    kind: "membership",
    note: "Members also get 10% off at the Kirstenbosch Bookshop, whose profits go to SANBI and the society.",
  },
  {
    org: "nature-kenya",
    title: "Become a member",
    url: "https://naturekenya.org/product-category/membership/",
    kind: "membership",
    note: "Individual membership of Nature Kenya, bought through its own shop.",
  },
  // Everywhere else
  {
    org: "roots-and-shoots",
    title: "Start a Roots & Shoots group",
    url: "https://rootsandshoots.org/",
    kind: "membership",
    free: true,
    note: "Free: the Jane Goodall Institute's programme for young people. A gift of time.",
  },
];

export const GEAR: GearBrand[] = [
  {
    brand: "Patagonia",
    urls: {
      US: "https://www.patagonia.com/home/",
      CA: "https://www.patagonia.ca/home/",
      GB: "https://eu.patagonia.com/gb/en/home/",
      IE: "https://eu.patagonia.com/ie/en/home/",
      FR: "https://eu.patagonia.com/fr/fr/home/",
      DE: "https://eu.patagonia.com/de/de/home/",
      ES: "https://eu.patagonia.com/es/es/home/",
      IT: "https://eu.patagonia.com/it/it/home/",
    },
    line: "Outdoor clothing and gear.",
    topics: ["fishing", "foraging", "gardening"],
    source: "https://www.patagonia.com/one-percent-for-the-planet.html",
    membership: "Pledged 1% of sales since 1985 and co-founded 1% for the Planet in 2002 (its own page); listed in the directory as a Whole Company Member certified through Patagonia Works",
    affiliate: "PATAGONIA",
  },
  {
    brand: "Klean Kanteen",
    urls: { US: "https://www.kleankanteen.com/", GB: "https://www.kleankanteen.co.uk/" },
    line: "Steel bottles, cups and food canisters for the field and the kitchen.",
    topics: ["homesteading", "foraging", "fishing"],
    source: "https://directories.onepercentfortheplanet.org/profile/klean-kanteen",
    membership: "Whole Company Member, certified 21 April 2026",
    affiliate: "KLEAN_KANTEEN",
  },
  {
    brand: "Toad&Co",
    urls: { US: "https://www.toadandco.com/", CA: "https://www.toadandco.com/" },
    line: "Everyday outdoor clothing.",
    topics: ["gardening", "homesteading"],
    source: "https://directories.onepercentfortheplanet.org/profile/toadco-dresses",
    membership: "Whole Company Member, certified 19 July 2026",
    affiliate: "TOADANDCO",
  },
  {
    brand: "Loon Outdoors",
    urls: { US: "https://loonoutdoors.com/", CA: "https://loonoutdoors.com/" },
    line: "Fly-tying tools, floatants and streamside tools.",
    topics: ["fishing"],
    source: "https://directories.onepercentfortheplanet.org/profile/loon-outdoors",
    membership: "Whole Company Member, certified 20 July 2026",
    affiliate: "LOON_OUTDOORS",
  },
  {
    brand: "Woodland Tools",
    urls: { US: "https://woodlandtools.com/" },
    line: "Pruners, saws and garden hand tools.",
    topics: ["gardening", "homesteading"],
    source: "https://directories.onepercentfortheplanet.org/profile/woodland-tools",
    membership: "Whole Company Member, certified 21 September 2026",
    affiliate: "WOODLAND_TOOLS",
  },
  {
    brand: "Cheeky Fishing",
    urls: { US: "https://cheekyfishing.com/", CA: "https://cheekyfishing.com/" },
    line: "Fly reels and fly-fishing gear.",
    topics: ["fishing"],
    source: "https://directories.onepercentfortheplanet.org/profile/cheeky-fly-fishing-1",
    membership: "Whole Company Member, certified through North Point Brands (certified 25 June 2026)",
    affiliate: "CHEEKY",
  },
  {
    brand: "RepYourWater",
    urls: { US: "https://www.repyourwater.com/" },
    line: "Fly-fishing caps and clothing.",
    topics: ["fishing"],
    source: "https://directories.onepercentfortheplanet.org/profile/north-point-brands-llc",
    membership: "Certified brand of North Point Brands, a Whole Company Member certified 25 June 2026",
    affiliate: "REPYOURWATER",
  },
  {
    brand: "Alpkit",
    urls: { GB: "https://alpkit.com/", CA: "https://alpkit.com/", ...Object.fromEntries(EURO_ALPKIT.map((c) => [c, "https://eu.alpkit.com/"])) },
    line: "Outdoor clothing and camping gear from a British company.",
    topics: ["foraging", "fishing"],
    source: "https://directories.onepercentfortheplanet.org/profile/alpkit",
    membership: "Whole Company Member, certified 19 January 2026",
    affiliate: "ALPKIT",
  },
  {
    brand: "Composty",
    urls: { GB: "https://www.composty.earth/" },
    line: "Home-compostable sponges and dishcloths for a plastic-free kitchen.",
    topics: ["homesteading"],
    source: "https://directories.onepercentfortheplanet.org/profile/composty",
    membership: "Whole Company Member, certified 29 July 2026",
    affiliate: "COMPOSTY",
  },
  {
    brand: "Gone.",
    urls: { ZA: "https://goneoutdoor.com/" },
    line: "Outdoor clothing and gear from a Cape Town outdoor shop.",
    topics: ["foraging", "fishing"],
    source: "https://directories.onepercentfortheplanet.org/profile/gone",
    membership: "Whole Company Member, certified 24 June 2026",
    affiliate: "GONE",
  },
];

// Every gift's organisation must be in the conservation library; until the data
// agents have added them all a missing one is a warning and the gift stays off
// the shelf (src/lib/gifts.ts skips it). Switch to a throw once complete.
const missing = [...new Set(ORG_GIFTS.map((g) => g.org).filter((slug) => !orgBySlug(slug)))];
if (missing.length) console.warn(`gifts: organisations not yet in the conservation library: ${missing.join(", ")}`);
