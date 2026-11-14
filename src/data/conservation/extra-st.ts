/**
 * Organisations added for page stories (agent ST): heritage-breed, medicinal
 * plant, fungus and other bodies the most-read pages need but the continent
 * files did not yet carry. Same schema and verification rules.
 *
 * Checked 26 October 2026 against each organisation's own pages and a public
 * register (IRS via ProPublica, CRA, Charity Commission via Find that Charity)
 * or, where none was findable, a second independent source noted above the
 * record.
 */
import type { Organisation } from "./types";

const V = "2026-10-26";
const CRA = (id: string) => ({ body: "CRA", id, url: `https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyQckVw/${id}/0` });
const IRS = (ein: string) => ({ body: "IRS", id: ein, url: `https://projects.propublica.org/nonprofits/organizations/${ein.replace("-", "")}` });
const CC = (id: string) => ({ body: "Charity Commission", id, url: `https://register-of-charities.charitycommission.gov.uk/charity-search/-/charity-details/${id}` });
const FTC = (orgid: string) => `https://findthatcharity.uk/orgid/${orgid}`;

export const EXTRA_ST_ORGS: Organisation[] = [
  // ---- heritage livestock and poultry breeds ----------------------------------------

  {
    slug: "livestock-conservancy",
    name: "The Livestock Conservancy",
    shortName: "Livestock Conservancy",
    scope: "national",
    continent: "north-america",
    countryCode: "US",
    topics: ["soil-seeds"],
    areas: [{ kind: "country", countries: ["US"] }],
    blurb:
      "The Pittsboro, North Carolina charity that keeps the Conservation Priority List of endangered livestock and poultry breeds in the United States, more than 150 breeds from donkeys and cattle to ducks and rabbits, and has not lost a listed breed since it began in 1977. Its breeders directory, breed censuses and classroom hatching project put rare breeds back on farms and homesteads.",
    asks: [
      "Choose a breed from the Conservation Priority List and find stock in its Breeders & Products Directory",
      "Count your heritage rabbits in the 2026 Heritage Rabbit Census",
      "Join as a member",
    ],
    links: {
      home: "https://livestockconservancy.org/",
      join: "https://livestockconservancy.org/get-involved/join/",
      donate: "https://livestockconservancy.org/donate/",
      volunteer: "https://livestockconservancy.org/get-involved/volunteer/",
      events: "https://livestockconservancy.org/get-involved/events-calendar/",
      youth: "https://livestockconservancy.org/heritage-chicken-definition/classroom-heritage-chicken-hatching-project/",
      feed: "https://livestockconservancy.org/feed/",
    },
    registry: IRS("03-0270281"),
    kind: "charity",
    founded: 1977,
    verified: V,
    sources: [
      "https://livestockconservancy.org/",
      "https://livestockconservancy.org/about-us/",
      "https://livestockconservancy.org/heritage-breeds/conservation-priority-list/",
      "https://livestockconservancy.org/heritage-breeds/breeders-directory/",
      "https://livestockconservancy.org/heritage-breeds/breed-registration/",
      "https://livestockconservancy.org/heritage-breeds/2026-rabbit-census/",
      "https://livestockconservancy.org/get-involved/volunteer/",
      "https://projects.propublica.org/nonprofits/organizations/30270281",
    ],
  },
  {
    slug: "heritage-livestock-canada",
    name: "Heritage Livestock Canada",
    shortName: "HLC",
    scope: "national",
    continent: "north-america",
    countryCode: "CA",
    topics: ["soil-seeds"],
    areas: [{ kind: "country", countries: ["CA"] }],
    blurb:
      "The volunteer-run Canadian charity, founded in 1987 and known until 2018 as Rare Breeds Canada, that keeps the conservation list of heritage cattle, sheep, pigs, goats, horses and donkeys in Canada and gives particular attention to Canadian breeds such as the Chantecler chicken and the Canadienne cow. Its breeder directory and gene bank keep rare lines going.",
    asks: [
      "Find heritage stock in its breeder directory",
      "Join, and list your own heritage animals in the directory",
      "Volunteer with fundraising, the store or the website",
    ],
    links: {
      home: "https://heritagelivestockcanada.com/",
      join: "https://heritagelivestockcanada.com/membership",
      donate: "https://heritagelivestockcanada.com/donate",
      volunteer: "https://heritagelivestockcanada.com/volunteer",
    },
    registry: CRA("118975812RR0001"),
    kind: "charity",
    founded: 1987,
    verified: V,
    sources: [
      "https://heritagelivestockcanada.com/",
      "https://heritagelivestockcanada.com/about-us",
      "https://heritagelivestockcanada.com/conservation-list",
      "https://heritagelivestockcanada.com/breederdirectory",
      "https://heritagelivestockcanada.com/membership",
      "https://heritagelivestockcanada.com/volunteer",
      "https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyQckVw/118975812RR0001/0",
    ],
  },
  {
    slug: "rare-breeds-survival-trust",
    name: "Rare Breeds Survival Trust",
    shortName: "RBST",
    scope: "national",
    continent: "europe",
    countryCode: "GB",
    topics: ["soil-seeds", "land"],
    areas: [{ kind: "country", countries: ["GB"] }],
    blurb:
      "The UK charity, based at Stoneleigh Park in Warwickshire, that keeps the Watchlist of the conservation status of every native livestock, equine and poultry breed, runs a gene bank and trains people in conservation grazing. Its Native Breed Marketplace connects keepers with rare-breed stock.",
    asks: ["Find stock through the Native Breed Marketplace", "Become a member", "Represent RBST at a show or host your own event"],
    links: {
      home: "https://www.rbst.org.uk/",
      join: "https://www.rbst.org.uk/members/",
      donate: "https://www.rbst.org.uk/donate/",
      volunteer: "https://www.rbst.org.uk/volunteer-journey/",
      events: "https://www.rbst.org.uk/all-events/",
      shop: "https://www.rbst.org.uk/shop/",
      feed: "https://www.rbst.org.uk/feed/",
    },
    registry: CC("269442"),
    kind: "charity",
    verified: V,
    sources: [
      "https://www.rbst.org.uk/",
      "https://www.rbst.org.uk/about-rbst/",
      "https://www.rbst.org.uk/watchlist/ducks/",
      "https://www.rbst.org.uk/watchlist/chickens/",
      "https://www.rbst.org.uk/watchlist/goats/",
      "https://www.rbst.org.uk/marketplace-items/",
      "https://www.rbst.org.uk/members/",
      "https://www.rbst.org.uk/volunteer-journey/",
      FTC("GB-CHC-269442"),
    ],
  },
  {
    // A foundation under Dutch law (Utrecht) with a Swiss association for its project office; no searchable
    // public register entry was found. Second source: its German Wikipedia article (founded 1993, Stiftung, Netherlands).
    slug: "save-foundation",
    name: "SAVE Foundation",
    network: "SAVE Foundation",
    scope: "international",
    continent: "europe",
    topics: ["soil-seeds"],
    areas: [{ kind: "continent", continent: "europe" }],
    blurb:
      "The pan-European network of organisations that keep rare livestock breeds and old crop varieties alive on farms, 25 partners in 16 countries, with its network office in Wageningen in the Netherlands. Its list of network partners names the rare-breed and seed societies country by country.",
    asks: ["Find your country's rare-breed or seed society on its list of network partners", "Give to its projects in the Alps, the Balkans, the Carpathians and the Mediterranean"],
    links: {
      home: "https://save-foundation.net/",
      join: "https://save-foundation.net/network-partners-in-countries/",
      donate: "https://save-foundation.net/donation/",
    },
    kind: "network",
    verified: V,
    sources: ["https://save-foundation.net/", "https://save-foundation.net/our-mission/", "https://save-foundation.net/network-partners-in-countries/", "https://de.wikipedia.org/wiki/SAVE_Foundation"],
  },
  {
    // A database run by the Food and Agriculture Organization of the United Nations: a public body, own site only.
    slug: "fao-dad-is",
    name: "Domestic Animal Diversity Information System (FAO)",
    shortName: "DAD-IS",
    scope: "international",
    topics: ["soil-seeds"],
    areas: [{ kind: "world" }],
    blurb:
      "The Food and Agriculture Organization of the United Nations' record of the world's livestock breeds, with more than 15,000 national breed populations from 182 countries and the risk of extinction each faces. It also lists every country's National Coordinator for the Management of Animal Genetic Resources.",
    asks: ["Look up how a breed you keep is faring in your own country", "Find your country's National Coordinator for animal genetic resources"],
    links: {
      home: "https://www.fao.org/dad-is/en/",
    },
    kind: "agency",
    verified: V,
    sources: ["https://www.fao.org/dad-is/en/", "https://www.fao.org/dad-is/national-coordinators/en", "https://www.fao.org/dad-is/data/breed-information/en"],
  },
  // ---- medicinal plants -------------------------------------------------------------

  {
    slug: "united-plant-savers",
    name: "United Plant Savers",
    shortName: "UpS",
    scope: "national",
    continent: "north-america",
    countryCode: "US",
    topics: ["plants", "forests"],
    areas: [{ kind: "country", countries: ["US", "CA"] }],
    blurb:
      "The charity for at-risk native medicinal plants and fungi of North America, founded in 1994 and based at its 370-acre botanical sanctuary at Rutland, Ohio, which keeps the Species At-Risk list of wild medicinals that should be grown rather than dug. Its Botanical Sanctuary Network joins more than 300 gardens, woods and prairies restoring habitat for native plants.",
    asks: [
      "Check the Species At-Risk list before you harvest or buy a wild medicinal",
      "Grow goldenseal or ginseng instead of taking it from the wild",
      "Make your land a member of the Botanical Sanctuary Network",
    ],
    links: {
      home: "https://unitedplantsavers.org/",
      join: "https://unitedplantsavers.org/members/join-ups/",
      donate: "https://unitedplantsavers.org/members/make-a-donation/",
      events: "https://unitedplantsavers.org/events/",
      feed: "https://unitedplantsavers.org/feed/",
    },
    registry: IRS("03-0345256"),
    kind: "charity",
    founded: 1994,
    verified: V,
    sources: [
      "https://unitedplantsavers.org/",
      "https://unitedplantsavers.org/species-at-risk-list/",
      "https://unitedplantsavers.org/bsn/",
      "https://unitedplantsavers.org/grow-your-own-goldenseal-ginseng/",
      "https://unitedplantsavers.org/members/join-ups/",
      "https://projects.propublica.org/nonprofits/organizations/30345256",
    ],
  },
  // ---- fungi ------------------------------------------------------------------------

  {
    slug: "fundis",
    name: "Fungal Diversity Survey",
    shortName: "FUNDIS",
    scope: "national",
    continent: "north-america",
    countryCode: "US",
    topics: ["plants"],
    areas: [{ kind: "country", countries: ["US", "CA"] }],
    blurb:
      "The Kalamazoo, Michigan charity that documents and protects North America's fungi through a continent-wide network of community scientists, with DNA sequencing and the Fungal Diversity Database. Its Rare Fungi Challenges and local projects send foragers, hikers and photographers out to record fungi where they live.",
    asks: [
      "Photograph the fungi you find, with their habitat, and add them to its projects on iNaturalist",
      "Look for the target species of a Rare Fungi Challenge in your region",
      "Start or join a FUNDIS Local Project for a park, trail or watershed",
    ],
    links: {
      home: "https://www.fundis.org/",
      volunteer: "https://www.fundis.org/get-involved",
    },
    registry: IRS("82-3721471"),
    kind: "charity",
    verified: V,
    sources: [
      "https://www.fundis.org/",
      "https://www.fundis.org/about-fundis",
      "https://www.fundis.org/get-involved",
      "https://www.fundis.org/rare-fungi-challenges",
      "https://projects.propublica.org/nonprofits/organizations/823721471",
    ],
  },
];
