/**
 * International organisations and networks: the ones that appear on every
 * continent's pages behind the local groups. Networks (Waterkeeper Alliance,
 * BirdLife International, IUCN, A Rocha) are listed because their member
 * finders are the fastest way for a reader to reach a group we don't list yet;
 * the counts and platforms (eBird, iNaturalist, the Great Backyard Bird Count,
 * the City Nature Challenge) because anyone, anywhere, can join them this week.
 *
 * Checked 21 October 2026 against each organisation's own pages and, where one
 * exists, a public register (Charity Commission for England and Wales, IRS via
 * ProPublica). Swiss, Dutch and Italian foundations without a searchable public
 * register carry a `//` note and a second source instead.
 */
import type { Organisation } from "./types";

const V = "2026-10-21";

export const GLOBAL_ORGS: Organisation[] = [
  {
    slug: "roots-and-shoots",
    name: "Roots & Shoots (Jane Goodall Institute)",
    shortName: "Roots & Shoots",
    network: "Jane Goodall Institute",
    scope: "international",
    topics: ["youth", "wildlife", "forests"],
    areas: [{ kind: "world" }],
    blurb:
      "The Jane Goodall Institute's programme for young people, from kindergarten to university, who run their own projects for people, animals and the environment. It began in Dar es Salaam in 1991 and is active in 75 countries with more than 11,300 groups.",
    asks: ["Start a group with your family, class or club and pick a project you can see through", "Join the No Waste November and ForeverWild campaigns", "Plant trees, clean up a shoreline or map what lives near you, then share it"],
    links: {
      home: "https://rootsandshoots.org/",
      youth: "https://rootsandshoots.org/",
      donate: "https://janegoodall.org/",
      shop: "https://shop.janegoodall.org/",
    },
    kind: "programme",
    youthProgramme: "Roots & Shoots",
    founded: 1991,
    verified: V,
    sources: ["https://janegoodall.org/wp-content/uploads/2026/03/Roots-Shoots-Global-Fact-Sheet-1.pdf", "https://shop.janegoodall.org/Good-For-All-Goods/About-Us", "https://rootsandshoots.org/"],
  },
  {
    slug: "jane-goodall-institute",
    name: "Jane Goodall Institute",
    shortName: "JGI",
    scope: "international",
    topics: ["wildlife", "forests", "youth"],
    areas: [{ kind: "world" }],
    blurb:
      "The community-led conservation charity that carries on Jane Goodall's work, with its headquarters in Washington: the longest-running study of wild chimpanzees at Gombe, the Tchimpounga sanctuary for rescued chimpanzees, the Tacare approach that puts villages at the centre of forest conservation, and Roots & Shoots for young people in more than 75 countries. Its shop's proceeds fund that work.",
    asks: ["Become a Chimp Guardian", "Buy from the shop that funds its projects", "Start a Roots & Shoots group"],
    links: {
      home: "https://janegoodall.org/",
      youth: "https://rootsandshoots.org/",
      donate: "https://janegoodall.org/",
      shop: "https://shop.janegoodall.org/",
    },
    registry: { body: "IRS", id: "94-2474731", url: "https://projects.propublica.org/nonprofits/organizations/942474731" },
    kind: "charity",
    youthProgramme: "Roots & Shoots",
    verified: V,
    sources: ["https://janegoodall.org/", "https://shop.janegoodall.org/Good-For-All-Goods/About-Us", "https://projects.propublica.org/nonprofits/organizations/942474731"],
  },
  {
    slug: "waterkeeper-alliance",
    name: "Waterkeeper Alliance",
    scope: "international",
    topics: ["water", "fish"],
    areas: [{ kind: "world" }],
    blurb:
      "A network of hundreds of Waterkeeper groups on six continents, each named for the river, lake, bay or coast it patrols and each answerable to the people who live on it. Its finder names the group for your water.",
    asks: ["Find the Waterkeeper for your river or coast and join a sampling or cleanup day", "Report a pollution sighting to the local group"],
    links: {
      home: "https://waterkeeper.org/",
      volunteer: "https://waterkeeper.org/findyourwaterkeeper/",
      donate: "https://waterkeeper.org/",
    },
    kind: "network",
    verified: V,
    sources: ["https://waterkeeper.org/about-us/", "https://waterkeeper.org/findyourwaterkeeper/", "https://services5.arcgis.com/hEkStteCvWjRBrR0/arcgis/rest/services/WaterkeeperWebsite_Boundaries/FeatureServer/0"],
  },
  {
    slug: "birdlife-international",
    name: "BirdLife International",
    scope: "international",
    topics: ["birds", "land"],
    areas: [{ kind: "world" }],
    blurb:
      "The partnership of national bird and nature organisations, 124 partners in 119 countries and territories, that identifies and defends the world's Important Bird and Key Biodiversity Areas. Its partner in your country is usually the oldest conservation body there.",
    asks: ["Join your country's BirdLife partner", "Take part in a national bird count"],
    links: {
      home: "https://www.birdlife.org/",
      join: "https://www.birdlife.org/partnership/",
      donate: "https://www.birdlife.org/donate/",
    },
    kind: "network",
    founded: 1922,
    verified: V,
    sources: ["https://en.wikipedia.org/wiki/List_of_BirdLife_International_national_partner_organisations", "https://www.birdlife.org/partnership/"],
  },
  {
    // A Swiss-registered union of states and organisations; no searchable public charity register. Second source: its own membership directory.
    slug: "iucn",
    name: "International Union for Conservation of Nature",
    shortName: "IUCN",
    scope: "international",
    topics: ["wildlife", "land", "plants"],
    areas: [{ kind: "world" }],
    blurb:
      "The union of governments and non-governmental organisations, including Indigenous peoples' organisations, in more than 160 countries, based at Gland in Switzerland, that keeps the IUCN Red List of Threatened Species and convenes the expert commissions and the World Conservation Congress. Its member directory lists the conservation bodies of every country.",
    asks: ["Look up a species on the Red List before you decide it is common", "Find your country's IUCN members"],
    links: {
      home: "https://iucn.org/",
      join: "https://iucn.org/our-union/members",
    },
    kind: "network",
    verified: V,
    sources: ["https://iucn.org/", "https://iucn.org/about-iucn", "https://iucn.org/our-union/members", "https://www.iucnredlist.org/"],
  },
  {
    // The Swiss foundation at the head of the WWF network; the national offices (WWF-Canada, WWF-US) carry the register entries.
    slug: "wwf-international",
    name: "WWF International",
    shortName: "WWF",
    network: "WWF",
    scope: "international",
    topics: ["wildlife", "forests", "water"],
    areas: [{ kind: "world" }],
    blurb:
      "The international secretariat of the WWF network, whose national offices work on nature loss, climate and plastic pollution and whose Living Planet Report tracks the world's wildlife populations. The office for your country runs the adoptions, memberships and local projects.",
    asks: ["Find your national WWF office and join it", "Adopt a species through the national office's gift centre"],
    links: {
      home: "https://wwf.panda.org/",
    },
    kind: "network",
    verified: V,
    sources: ["https://wwf.panda.org/", "https://wwf.panda.org/discover/our_focus/", "https://wwf.ca/take-action/volunteer/"],
  },
  {
    slug: "a-rocha-international",
    name: "A Rocha International",
    shortName: "A Rocha",
    network: "A Rocha",
    scope: "international",
    topics: ["wildlife", "birds", "land", "youth"],
    areas: [{ kind: "world" }],
    blurb:
      "The international family of Christian conservation organisations, 22 national bodies including Canada, the United States, the United Kingdom, France, Kenya and South Africa, with residential field study centres that monitor wildlife, site-based habitat projects, church engagement and environmental education. Its list of national organisations is the way in.",
    asks: ["Find the A Rocha organisation in your country", "Volunteer at a field study centre", "Give"],
    links: {
      home: "https://arocha.org/",
      volunteer: "https://arocha.org/get-involved/",
      donate: "https://arocha.org/en/give/",
      feed: "https://arocha.org/feed/",
    },
    registry: { body: "Charity Commission", id: "1136041" },
    kind: "network",
    verified: V,
    sources: ["https://arocha.org/", "https://arocha.org/get-involved/"],
  },
  {
    // A Dutch foundation; no searchable public charity register. Second source: the International Waterbird Census it runs.
    slug: "wetlands-international",
    name: "Wetlands International",
    scope: "international",
    topics: ["water", "birds"],
    areas: [{ kind: "world" }],
    blurb:
      "A global network with offices in 18 countries, from Argentina to Japan, whose predecessors began protecting wetlands in 1937 and which became one organisation with its headquarters in the Netherlands in 1996. It safeguards and restores freshwater and coastal wetlands with communities and runs the International Waterbird Census that volunteers count for each January.",
    asks: ["Count waterbirds for the International Waterbird Census in January", "Find its office for your region"],
    links: {
      home: "https://www.wetlands.org/",
      volunteer: "https://iwc.wetlands.org/",
      donate: "https://www.wetlands.org/donate-to-save-wetlands/",
    },
    kind: "charity",
    verified: V,
    sources: ["https://www.wetlands.org/", "https://www.wetlands.org/about-us/", "https://iwc.wetlands.org/"],
  },
  {
    slug: "fauna-and-flora",
    name: "Fauna & Flora",
    scope: "international",
    topics: ["wildlife", "plants", "land"],
    areas: [{ kind: "world" }],
    blurb:
      "The Cambridge conservation charity, registered in England and Wales, that works with local partners in more than 40 countries to protect the diversity of life on Earth, from its base in the David Attenborough Building.",
    asks: ["Become a member", "Give"],
    links: {
      home: "https://www.fauna-flora.org/",
      join: "https://www.fauna-flora.org/support/membership/",
      donate: "https://www.fauna-flora.org/support/",
      shop: "https://fficlothing.co.uk/",
    },
    registry: { body: "Charity Commission", id: "1011102", url: "https://register-of-charities.charitycommission.gov.uk/charity-search/-/charity-details/1011102" },
    kind: "charity",
    verified: V,
    sources: ["https://www.fauna-flora.org/", "https://www.fauna-flora.org/about/"],
  },
  {
    slug: "darksky-international",
    name: "DarkSky International",
    shortName: "DarkSky",
    scope: "international",
    topics: ["ground", "wildlife"],
    areas: [{ kind: "world" }],
    blurb:
      "The organisation, registered as the International Dark-Sky Association in Tucson, that works against light pollution for people and wildlife through outreach, advocacy and education, with more than 5,000 volunteer advocates, delegates in over 20 countries and 65 chapters. Its International Dark Sky Places programme certifies the parks, reserves and communities where the night sky is protected.",
    asks: ["Visit a certified Dark Sky Place near you", "Join your local chapter", "Shield the outdoor lights at home"],
    links: {
      home: "https://darksky.org/",
      volunteer: "https://darksky.org/get-involved/",
      join: "https://darksky.org/chapters/",
      donate: "https://darksky.org/ways-to-give/",
    },
    registry: { body: "IRS", id: "74-2493011", url: "https://projects.propublica.org/nonprofits/organizations/742493011" },
    kind: "charity",
    verified: V,
    sources: ["https://darksky.org/", "https://darksky.org/what-we-do/international-dark-sky-places/all-places/", "https://projects.propublica.org/nonprofits/organizations/742493011"],
  },
  {
    slug: "inaturalist",
    name: "iNaturalist",
    scope: "international",
    topics: ["wildlife", "plants", "birds", "pollinators", "youth"],
    areas: [{ kind: "world" }],
    blurb:
      "The free, non-profit platform on which more than 300 million observations of plants, animals and fungi have been recorded and 550,000 species documented, each photograph identified by the community and shared with science. Its Seek app is for children under 13, with badges and challenges for the species they find.",
    asks: ["Photograph what you find and upload it", "Help identify other people's observations", "Give children the Seek app"],
    links: {
      home: "https://www.inaturalist.org/",
      join: "https://www.inaturalist.org/signup",
      youth: "https://www.inaturalist.org/pages/seek_app",
      donate: "https://www.inaturalist.org/donate",
    },
    registry: { body: "IRS", id: "92-1296468", url: "https://projects.propublica.org/nonprofits/organizations/921296468" },
    kind: "charity",
    youthProgramme: "Seek",
    verified: V,
    sources: ["https://www.inaturalist.org/", "https://www.inaturalist.org/pages/about", "https://projects.propublica.org/nonprofits/organizations/921296468"],
  },
  {
    slug: "city-nature-challenge",
    name: "City Nature Challenge",
    network: "iNaturalist",
    scope: "international",
    topics: ["wildlife", "plants", "birds", "pollinators", "youth"],
    areas: [{ kind: "world" }],
    blurb:
      "The four-day global bioblitz at the end of April in which cities document their wild plants and animals on iNaturalist, begun in 2016 as a contest between Los Angeles and San Francisco and run by the California Academy of Sciences and the Natural History Museum of Los Angeles County. The 2026 challenge logged more than three million observations from 106,000 people; the next runs 30 April to 3 May 2027.",
    asks: ["Record everything wild you can find in your city over the four days", "Help identify the observations in the two weeks after", "Ask a local organisation to sign your city up"],
    links: {
      home: "https://www.citynaturechallenge.org/",
      volunteer: "https://www.citynaturechallenge.org/participate",
      join: "https://www.citynaturechallenge.org/organizers",
    },
    kind: "programme",
    founded: 2016,
    verified: V,
    sources: ["https://www.citynaturechallenge.org/", "https://www.citynaturechallenge.org/participate"],
  },
  {
    slug: "great-backyard-bird-count",
    name: "Great Backyard Bird Count",
    shortName: "GBBC",
    network: "Cornell Lab of Ornithology",
    scope: "international",
    topics: ["birds", "youth"],
    areas: [{ kind: "world" }],
    blurb:
      "Four days in February when anyone, anywhere, counts birds for as little as fifteen minutes and submits the list through eBird or the Merlin app, run by the Cornell Lab of Ornithology, the National Audubon Society and Birds Canada. The next count is 12 to 15 February 2027.",
    asks: ["Count birds for fifteen minutes on any of the four days in February", "Enter your list on eBird or Merlin", "Find a community event on its map"],
    links: {
      home: "https://www.birdcount.org/",
      volunteer: "https://www.birdcount.org/participate/",
      events: "https://www.birdcount.org/community-map/",
    },
    kind: "programme",
    verified: V,
    sources: ["https://www.birdcount.org/", "https://www.birdcount.org/participate/", "https://www.birdcount.org/about/"],
  },
  {
    // ebird.org refuses plain GETs from this network; its pages open in a browser.
    slug: "ebird",
    name: "eBird",
    network: "Cornell Lab of Ornithology",
    scope: "international",
    topics: ["birds"],
    areas: [{ kind: "world" }],
    blurb:
      "The Cornell Lab of Ornithology's free global birding platform, to which more than 100 million sightings are added each year by hundreds of thousands of users who record when, where and how they went birding and every bird they saw or heard. The app works offline in 27 languages.",
    asks: ["Keep a checklist every time you go out", "Use the app offline in the field", "Explore what has been seen near you this week"],
    links: {
      home: "https://ebird.org/home",
      join: "https://ebird.org/about",
    },
    kind: "programme",
    verified: V,
    sources: ["https://ebird.org/about", "https://ebird.org/home", "https://www.birds.cornell.edu/home/"],
  },
  {
    // An Italian association; no searchable public charity register. Second source: its US affiliate's Ark of Taste pages.
    slug: "slow-food-international",
    name: "Slow Food International",
    shortName: "Slow Food",
    network: "Slow Food",
    scope: "international",
    topics: ["soil-seeds"],
    areas: [{ kind: "world" }],
    blurb:
      "The global movement for good, clean and fair food, with more than 4,500 agroecological gardens and 6,000 producers in its network, whose Ark of Taste has catalogued more than 6,100 foods, breeds and varieties at risk of extinction so that people grow, cook and eat them back into use. Its national associations run the local chapters.",
    asks: ["Grow or cook an Ark of Taste variety from your region", "Join your national Slow Food association"],
    links: {
      home: "https://www.slowfood.com/",
    },
    kind: "network",
    verified: V,
    sources: ["https://www.slowfood.com/", "https://slowfoodusa.org/ark-of-taste/"],
  },
  {
    // A charity based at Kew; the register entry was not confirmed this session, so it stays off the record.
    slug: "bgci",
    name: "Botanic Gardens Conservation International",
    shortName: "BGCI",
    scope: "international",
    topics: ["plants", "forests"],
    areas: [{ kind: "world" }],
    blurb:
      "The network of the world's botanic gardens, which leads the Global Tree Assessment and keeps the PlantSearch and GardenSearch databases. GardenSearch finds the botanic garden nearest you, usually the best place to learn the wild plants of a region.",
    asks: ["Find your nearest botanic garden on GardenSearch and visit it", "Join as a supporter"],
    links: {
      home: "https://www.bgci.org/",
      join: "https://www.bgci.org/membership/",
      volunteer: "https://www.bgci.org/resources/bgci-databases/gardensearch/",
      feed: "https://www.bgci.org/feed/",
    },
    kind: "network",
    verified: V,
    sources: ["https://www.bgci.org/", "https://www.bgci.org/about/", "https://www.bgci.org/resources/bgci-databases/gardensearch/"],
  },
];
