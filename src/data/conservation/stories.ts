/**
 * Stories: the conservation thread written into the site's most-read pages.
 *
 * Where a reader is already deep in a subject — keeping ducks, foraging
 * waterblommetjie, learning medicinal plants — a story tells them, in a few
 * plain paragraphs, who is working on that very thing and why it matters,
 * then gives three ways in sized by effort (a few minutes, an afternoon,
 * all season), each landing on an organisation in the library or one of its
 * open invitations. It is the site's own writing, in its voice, built only
 * from facts on the organisations' own pages (listed in `sources`): no
 * invented numbers, no quotes put in anyone's mouth.
 *
 * A story is keyed by the page path it belongs to; the page renders it with
 * `StoryBlock` (src/components/conservation/StoryBlock.tsx) above or in
 * place of its plain "who looks after this" panel.
 */
import type { Photo } from "./invitations";
import type { Topic } from "./types";

export type StoryStep = {
  effort: "A few minutes" | "An afternoon" | "All season" | "With children";
  /** What to do, in the imperative: "Count the ducks on your local pond for the Christmas Bird Count". */
  text: string;
  /** A library organisation slug, or an invitation slug with `invitation: true`. */
  org?: string;
  invitation?: string;
  /** The organisation's own page for this step, when it is not the org's home or the invitation's url. */
  url?: string;
  /** ISO codes of the countries this step applies to; omit for everywhere. A reader whose country is known sees only steps for it (and the untagged ones). */
  countries?: string[];
};

export type Story = {
  /** The page it belongs to, exactly as routed: "/homesteading/ducks". */
  path: string;
  /** Eyebrow over the heading: "Heritage breeds", "Medicinal plants". */
  eyebrow: string;
  heading: string;
  /** Two to four short paragraphs, plain text; the first is the hook. */
  paragraphs: string[];
  /** The organisations the story is about, most important first (library slugs). */
  orgs: string[];
  /** Invitations to feature with it (invitation slugs), when any are open. */
  invitations?: string[];
  steps: StoryStep[];
  topics: Topic[];
  photo?: Photo;
  /** When a page is regional (a South African plant), the countries it is told for; others see the plain panel. */
  countries?: string[];
  verified: string;
  sources: string[];
};

/** Our European countries other than the United Kingdom, for steps that run through a continental network. */
const EUROPE_NOT_GB = ["AL", "AT", "BE", "BG", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR", "HR", "HU", "IE", "IS", "IT", "LT", "LU", "LV", "ME", "MK", "MT", "NL", "NO", "PL", "PT", "RO", "RS", "SE", "SI", "SK", "UA"];

/** Our African countries, for steps that run through an Africa-wide network. */
const AFRICA = ["BF", "BW", "CD", "CG", "CI", "CM", "DJ", "EG", "ET", "GH", "KE", "LR", "LY", "MA", "MG", "ML", "MR", "MU", "MW", "MZ", "NA", "NE", "NG", "RW", "SL", "SN", "SO", "TN", "TZ", "UG", "ZA", "ZM", "ZW"];

const V = "2026-10-26";

/** Pages read for the soil and seed stories (compost, food storage). */
const SEEDS = {
  sfSoil: "https://www.fondazioneslowfood.com/wp-content/uploads/2015/04/EN_SHEET3_soil.pdf",
  sfGardens: "https://www.fondazioneslowfood.com/en/what-we-do/10-000-gardens-in-africa-2/",
  sfGardensHow: "https://www.fondazioneslowfood.com/en/what-we-do/10-000-gardens-in-africa-2/how-a-slow-food-garden-in-africa-is-planned-created-and-managed/",
  sfGardensMap: "https://www.fondazioneslowfood.com/en/what-we-do/10-000-gardens-in-africa-2/gardens-in-africa-map/",
  goVolunteer: "https://www.gardenorganic.org.uk/get-involved/volunteer-with-us",
  goHsl: "https://www.gardenorganic.org.uk/what-we-do/hsl",
  sodLibrary: "https://seeds.ca/diversity/seed-library/",
  sodGrowouts: "https://seeds.ca/growouts/",
  ssePreservation: "https://seedsavers.org/preservation/",
  sseMembership: "https://seedsavers.org/give/membership/",
  sseExchange: "https://exchange.seedsavers.org/",
  iss: "https://irishseedsavers.ie/",
  issShop: "https://irishseedsavers.ie/shop",
};

/** Pages read for the heritage-breed stories (ducks, hens, goats, rabbits). */
const BREEDS = {
  lcList: "https://livestockconservancy.org/heritage-breeds/conservation-priority-list/",
  lcAbout: "https://livestockconservancy.org/about-us/",
  lcRegistration: "https://livestockconservancy.org/heritage-breeds/breed-registration/",
  lcDirectory: "https://livestockconservancy.org/heritage-breeds/breeders-directory/",
  hlcAbout: "https://heritagelivestockcanada.com/about-us",
  hlcList: "https://heritagelivestockcanada.com/conservation-list",
  hlcDirectory: "https://heritagelivestockcanada.com/breederdirectory",
  rbstMarket: "https://www.rbst.org.uk/marketplace-items/",
  savePartners: "https://save-foundation.net/network-partners-in-countries/",
  dadis: "https://www.fao.org/dad-is/en/",
  dadisBreeds: "https://www.fao.org/dad-is/data/breed-information/en",
  ark: "https://www.fondazioneslowfood.com/en/what-we-do/the-ark-of-taste/",
  arkNominate: "https://www.fondazioneslowfood.com/en/what-we-do/the-ark-of-taste/nominations-from-around-the-world/nominate-a-product/",
};

export const STORIES: Story[] = [
  // Written by agent ST.

  // ---- heritage breeds ----------------------------------------------------------------

  {
    path: "/homesteading/ducks",
    eyebrow: "Heritage breeds",
    heading: "The Campbell and the Runner are still on the watch lists",
    paragraphs: [
      "The two laying breeds on this page are on rare-breed lists. The Livestock Conservancy's Conservation Priority List for the United States puts the Campbell at Watch and the Runner at Recovering: a breed that has passed the Watch numbers but is still monitored. In the United Kingdom every native duck breed, the Campbell among them, is a Priority Breed on the Rare Breeds Survival Trust's Watchlist.",
      "Watch, for poultry, means fewer than 5,000 breeding birds in the United States, in ten or fewer main flocks. Since it began in 1977 the Conservancy has not lost a breed on its list. In Canada, Heritage Livestock Canada, a volunteer-run charity known until 2018 as Rare Breeds Canada, counts Campbells, Cayugas, Welsh Harlequins and Runners among its heritage waterfowl and lists their breeders.",
      "A breed lasts as long as people keep, hatch and sell it. Choosing ducks of a listed breed from a breeder in one of these networks, and mating them only within the breed, is the conservation work itself; the Conservancy calls the alternative crossbreeding out of existence. Registered birds are how the lists know a breed is still there: breed registries are the Conservancy's main source for setting its priorities.",
    ],
    orgs: ["livestock-conservancy", "heritage-livestock-canada", "rare-breeds-survival-trust", "save-foundation", "fao-dad-is", "slow-food-international"],
    steps: [
      {
        effort: "A few minutes",
        text: "Look up how your breed of duck is faring in your own country in DAD-IS, the UN Food and Agriculture Organization's record of the world's livestock breeds",
        org: "fao-dad-is",
        url: BREEDS.dadisBreeds,
      },
      {
        effort: "An afternoon",
        text: "Nominate a local duck, hen or other breed that is disappearing to Slow Food's Ark of Taste, which catalogues breeds as well as foods",
        org: "slow-food-international",
        url: BREEDS.arkNominate,
      },
      {
        effort: "All season",
        text: "Keep a listed breed: find Campbell, Cayuga or Welsh Harlequin stock in The Livestock Conservancy's Breeders & Products Directory and breed them pure",
        org: "livestock-conservancy",
        url: BREEDS.lcDirectory,
        countries: ["US"],
      },
      {
        effort: "All season",
        text: "Keep a heritage breed: find Campbell, Cayuga, Welsh Harlequin or Runner ducks in Heritage Livestock Canada's breeder directory",
        org: "heritage-livestock-canada",
        url: BREEDS.hlcDirectory,
        countries: ["CA"],
      },
      {
        effort: "All season",
        text: "Keep a Priority Breed: look for native-breed ducks on the Rare Breeds Survival Trust's Native Breed Marketplace",
        org: "rare-breeds-survival-trust",
        url: BREEDS.rbstMarket,
        countries: ["GB"],
      },
      {
        effort: "All season",
        text: "Find the rare-breed society for your country on the SAVE Foundation's list of network partners, and keep a breed it is saving",
        org: "save-foundation",
        url: BREEDS.savePartners,
        countries: EUROPE_NOT_GB,
      },
    ],
    topics: ["soil-seeds"],
    photo: {
      src: "/conservation/story-ducks.webp",
      alt: "A Cayuga duck, a black heritage breed with a green sheen, splashing across a pond",
      author: "jonesor",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      source: "https://www.inaturalist.org/observations/148790164",
    },
    verified: V,
    sources: [
      BREEDS.lcList,
      BREEDS.lcAbout,
      BREEDS.lcRegistration,
      BREEDS.lcDirectory,
      "https://heritagelivestockcanada.com/heritagepoultry",
      BREEDS.hlcAbout,
      BREEDS.hlcDirectory,
      "https://www.rbst.org.uk/watchlist/ducks/",
      BREEDS.rbstMarket,
      BREEDS.savePartners,
      BREEDS.dadis,
      BREEDS.dadisBreeds,
      BREEDS.ark,
      BREEDS.arkNominate,
    ],
  },
  {
    path: "/homesteading/laying-hens",
    eyebrow: "Heritage breeds",
    heading: "The Chantecler, bred for Quebec winters, is still a rare breed",
    paragraphs: [
      "The Chantecler at the head of this page's breed list is counted as the first Canadian chicken breed, begun in 1908 at the Cistercian abbey at Oka, Quebec, to give a hen that could stand Canadian winters. It is still rare. The Livestock Conservancy's Conservation Priority List for the United States puts it at Watch, and Heritage Livestock Canada names it among the Canadian breeds it gives particular attention.",
      "The Sussex, and the Leghorn in its non-industrial strains, are on the Conservancy's list as well, at Recovering. In the United Kingdom the Rare Breeds Survival Trust has, since April 2024, counted every native chicken breed as a Priority Breed on its Watchlist, the Sussex, the Dorking and the Scots Dumpy among them.",
      "Watch means fewer than 5,000 breeding birds in the United States, in ten or fewer main flocks, so a small flock bred pure, with its chicks passed on to other keepers, is part of the count that decides a breed's place. Since 2013 the Conservancy's Chicks in the Classroom project has sent rare-breed hatching eggs to elementary schools; the chicks go back to the farms that sent them.",
    ],
    orgs: ["livestock-conservancy", "heritage-livestock-canada", "rare-breeds-survival-trust", "save-foundation", "fao-dad-is", "slow-food-international"],
    steps: [
      {
        effort: "A few minutes",
        text: "Look up how your hens' breed is faring in your own country in DAD-IS, the UN Food and Agriculture Organization's record of the world's livestock breeds",
        org: "fao-dad-is",
        url: BREEDS.dadisBreeds,
      },
      {
        effort: "With children",
        text: "Ask your school to hatch heritage-breed eggs with Chicks in the Classroom, starting with a 4-H leader at your local Extension office",
        org: "livestock-conservancy",
        url: "https://livestockconservancy.org/heritage-chicken-definition/classroom-heritage-chicken-hatching-project/",
        countries: ["US"],
      },
      {
        effort: "An afternoon",
        text: "Nominate a local hen or other breed that is disappearing to Slow Food's Ark of Taste, which catalogues breeds as well as foods",
        org: "slow-food-international",
        url: BREEDS.arkNominate,
      },
      {
        effort: "All season",
        text: "Keep a listed breed: find Chantecler, Dominique or Buckeye stock in The Livestock Conservancy's Breeders & Products Directory and breed them pure",
        org: "livestock-conservancy",
        url: BREEDS.lcDirectory,
        countries: ["US"],
      },
      {
        effort: "All season",
        text: "Keep Chanteclers: find White or Partridge birds in Heritage Livestock Canada's breeder directory",
        org: "heritage-livestock-canada",
        url: BREEDS.hlcDirectory,
        countries: ["CA"],
      },
      {
        effort: "All season",
        text: "Keep a Priority Breed such as the Sussex or the Dorking: look for stock on the Rare Breeds Survival Trust's Native Breed Marketplace",
        org: "rare-breeds-survival-trust",
        url: BREEDS.rbstMarket,
        countries: ["GB"],
      },
      {
        effort: "All season",
        text: "Find the rare-breed society for your country on the SAVE Foundation's list of network partners, and keep a breed it is saving",
        org: "save-foundation",
        url: BREEDS.savePartners,
        countries: EUROPE_NOT_GB,
      },
    ],
    topics: ["soil-seeds"],
    photo: {
      src: "/conservation/story-laying-hens.webp",
      alt: "A Light Sussex cockerel, white with a black-striped neck and black tail, in a dirt run",
      author: "Lek Khauv",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      source: "https://www.inaturalist.org/observations/239072732",
    },
    verified: V,
    sources: [
      "https://livestockconservancy.org/heritage-breeds/heritage-breeds-list/chantecler-chicken/",
      BREEDS.lcList,
      BREEDS.lcAbout,
      "https://livestockconservancy.org/heritage-chicken-definition/classroom-heritage-chicken-hatching-project/",
      BREEDS.lcDirectory,
      BREEDS.hlcAbout,
      "https://heritagelivestockcanada.com/heritagepoultry",
      BREEDS.hlcDirectory,
      "https://www.rbst.org.uk/watchlist/chickens/",
      BREEDS.rbstMarket,
      BREEDS.savePartners,
      BREEDS.dadis,
      BREEDS.dadisBreeds,
      BREEDS.ark,
      BREEDS.arkNominate,
    ],
  },
  {
    path: "/homesteading/dairy-goats",
    eyebrow: "Heritage breeds",
    heading: "In Canada, five of this page's six dairy breeds are on the heritage list",
    paragraphs: [
      "Heritage Livestock Canada sorts goat breeds by how many purebred females are registered in a year, and five of the six breeds on this page are on its list. The Toggenburg and the LaMancha are Endangered, at 36 to 115 a year; the Nubian, once called the Anglo-Nubian in Canada, the Alpine and the Saanen are At Risk. The Oberhasli is Critical, at 35 or fewer.",
      "Because the list counts registered purebred females, a breed can be familiar at every fair and still be thinly recorded. The charity says the Toggenburg, the world's first recognised dairy goat breed, could benefit from a rise in registered animals. In the United States The Livestock Conservancy lists the Oberhasli as Recovering and the San Clemente Island goat as Critical.",
      "In the United Kingdom the Rare Breeds Survival Trust's Watchlist names the English and the Old English goat as Priority Breeds and the Bagot and the Royal Golden Guernsey as At Risk. In Canada and the United States, registrations are how a breed is seen to be still there, so registering kids from purebred does is part of keeping the breed.",
    ],
    orgs: ["heritage-livestock-canada", "livestock-conservancy", "rare-breeds-survival-trust", "save-foundation", "fao-dad-is", "slow-food-international"],
    steps: [
      {
        effort: "A few minutes",
        text: "Look up how your goats' breed is faring in your own country in DAD-IS, the UN Food and Agriculture Organization's record of the world's livestock breeds",
        org: "fao-dad-is",
        url: BREEDS.dadisBreeds,
      },
      {
        effort: "An afternoon",
        text: "Nominate a local goat breed that is disappearing to Slow Food's Ark of Taste, which catalogues breeds as well as foods",
        org: "slow-food-international",
        url: BREEDS.arkNominate,
      },
      {
        effort: "All season",
        text: "Keep and register a listed breed: find Oberhasli, Toggenburg, Saanen or Nubian stock in Heritage Livestock Canada's breeder directory",
        org: "heritage-livestock-canada",
        url: BREEDS.hlcDirectory,
        countries: ["CA"],
      },
      {
        effort: "All season",
        text: "Keep a listed breed: find Oberhasli or San Clemente Island goats in The Livestock Conservancy's Breeders & Products Directory",
        org: "livestock-conservancy",
        url: BREEDS.lcDirectory,
        countries: ["US"],
      },
      {
        effort: "All season",
        text: "Keep an English, Old English, Bagot or Royal Golden Guernsey goat: look for stock on the Rare Breeds Survival Trust's Native Breed Marketplace",
        org: "rare-breeds-survival-trust",
        url: BREEDS.rbstMarket,
        countries: ["GB"],
      },
      {
        effort: "All season",
        text: "Find the rare-breed society for your country on the SAVE Foundation's list of network partners, and keep a breed it is saving",
        org: "save-foundation",
        url: BREEDS.savePartners,
        countries: EUROPE_NOT_GB,
      },
    ],
    topics: ["soil-seeds"],
    verified: V,
    sources: [
      BREEDS.hlcList,
      "https://heritagelivestockcanada.com/heritagegoats",
      BREEDS.hlcDirectory,
      BREEDS.lcList,
      BREEDS.lcRegistration,
      BREEDS.lcDirectory,
      "https://www.rbst.org.uk/watchlist/goats/",
      BREEDS.rbstMarket,
      BREEDS.savePartners,
      BREEDS.dadis,
      BREEDS.dadisBreeds,
      BREEDS.ark,
      BREEDS.arkNominate,
    ],
  },
  {
    path: "/homesteading/meat-rabbits",
    eyebrow: "Heritage breeds",
    heading: "White rabbits took over the meat trade; the coloured breeds are on watch",
    paragraphs: [
      "The New Zealand White and the Californian on this page are the standard meat breeds. The Livestock Conservancy puts the American Chinchilla, a large, fast-growing meat and fur rabbit, at Watch on its Conservation Priority List: its numbers fell with the end of the rabbit fur trade in the late 1940s, and despite its meat, producers today prefer an all-white rabbit.",
      "The Champagne d'Argent on this page is not on the list, but the Crème d'Argent and the Argente Brun are, at Watch, as are the American and the Silver. For rabbits, Watch means fewer than 200 registrations a year in the United States and 31 to 60 breeders. Heritage Livestock Canada counts many of the same breeds, the Silver Fox and the American Chinchilla among them, as heritage in Canada.",
      "Registrations miss many of these rabbits, because many breeding animals are never registered or shown. So the Conservancy is running its first full census of breeding rabbits of every listed breed, open to any breeder, member or not, through late winter 2026–27. Answers are anonymous unless you choose to share your contact details, which helps it find herds of high conservation value.",
    ],
    orgs: ["livestock-conservancy", "heritage-livestock-canada", "save-foundation", "fao-dad-is", "slow-food-international"],
    invitations: ["heritage-rabbit-census-2026"],
    steps: [
      {
        effort: "A few minutes",
        text: "If you breed a listed rabbit, fill in the 2026 Heritage Rabbit Census",
        invitation: "heritage-rabbit-census-2026",
        countries: ["US", "CA"],
      },
      {
        effort: "A few minutes",
        text: "Look up how your rabbits' breed is faring in your own country in DAD-IS, the UN Food and Agriculture Organization's record of the world's livestock breeds",
        org: "fao-dad-is",
        url: BREEDS.dadisBreeds,
      },
      {
        effort: "An afternoon",
        text: "Nominate a local rabbit breed that is disappearing to Slow Food's Ark of Taste, which catalogues breeds as well as foods",
        org: "slow-food-international",
        url: BREEDS.arkNominate,
      },
      {
        effort: "All season",
        text: "Keep a listed breed: find American Chinchilla, Crème d'Argent or other heritage stock in The Livestock Conservancy's Breeders & Products Directory",
        org: "livestock-conservancy",
        url: BREEDS.lcDirectory,
        countries: ["US"],
      },
      {
        effort: "All season",
        text: "Keep a heritage breed such as the Standard Chinchilla or the Canadian-bred Satin Angora: find a breeder in Heritage Livestock Canada's directory",
        org: "heritage-livestock-canada",
        url: BREEDS.hlcDirectory,
        countries: ["CA"],
      },
      {
        effort: "All season",
        text: "Find the rare-breed society for your country on the SAVE Foundation's list of network partners, and keep a breed it is saving",
        org: "save-foundation",
        url: BREEDS.savePartners,
        countries: ["GB", ...EUROPE_NOT_GB],
      },
    ],
    topics: ["soil-seeds"],
    verified: V,
    sources: [
      "https://livestockconservancy.org/heritage-breeds/heritage-breeds-list/american-chinchilla-rabbit/",
      BREEDS.lcList,
      "https://livestockconservancy.org/heritage-breeds/2026-rabbit-census/",
      BREEDS.lcDirectory,
      "https://heritagelivestockcanada.com/heritagerabbits",
      BREEDS.hlcDirectory,
      BREEDS.savePartners,
      BREEDS.dadis,
      BREEDS.dadisBreeds,
      BREEDS.ark,
      BREEDS.arkNominate,
    ],
  },
  // ---- wild bees -----------------------------------------------------------------------

  {
    path: "/homesteading/honeybees",
    eyebrow: "Wild bees",
    heading: "Your hives share the flowers with bees nobody keeps",
    paragraphs: [
      "Honeybees are livestock: a colony is housed, fed and wintered by its keeper, as this page sets out. The bees foraging beside them are not. Bumble bees, mason bees and leafcutter bees find their own nest sites and winter on their own, and the Xerces Society, the American charity for insects and other invertebrates, names habitat loss, pesticides and introduced diseases as the risks to pollination.",
      "What a wild bee needs is mostly what a tidy garden takes away. By the Xerces Society's figures, 30 per cent of native bees nest in narrow tunnels in dead wood, hollow stems and brush piles, and mated bumble bee queens winter only 2 to 5 cm (an inch or two) under the soil, where a thick layer of fallen leaves protects them.",
      "A beekeeper already watches the flowers. Native flowers, hollow stems left standing, leaves raked onto beds instead of bagged and no pesticides serve both kinds of bee. Towns can commit too: Xerces runs Bee City USA, and Pollinator Partnership Canada's Bee City Canada had more than 180 members in 2025. In Britain, Bumblebee Conservation Trust volunteers count bumblebees on a fixed walk once a month from March to October.",
    ],
    orgs: ["xerces-society", "pollinator-partnership-canada", "bumblebee-conservation-trust", "buglife", "inaturalist"],
    invitations: ["leave-the-leaves-2026", "inaturalist-observations"],
    steps: [
      {
        effort: "A few minutes",
        text: "Photograph the wild bees working your colonies' flowers and share them on iNaturalist, where others help name them",
        invitation: "inaturalist-observations",
      },
      {
        effort: "An afternoon",
        text: "Rake this autumn's leaves onto beds and under shrubs instead of bagging them, for the queen bumble bees wintering beneath",
        invitation: "leave-the-leaves-2026",
        countries: ["US", "CA"],
      },
      {
        effort: "An afternoon",
        text: "Take the Xerces Society's Pollinator Protection Pledge: grow pollinator flowers, give nest sites, avoid pesticides and spread the word",
        org: "xerces-society",
        url: "https://xerces.org/bring-back-the-pollinators/pollinator-protection-pledge",
      },
      {
        effort: "All season",
        text: "Ask your town or campus to become a Bee City USA or Bee Campus USA affiliate",
        org: "xerces-society",
        url: "https://beecityusa.org/",
        countries: ["US"],
      },
      {
        effort: "All season",
        text: "Ask your town, school or campus to join Bee City Canada",
        org: "pollinator-partnership-canada",
        url: "https://pollinatorpartnership.ca/en/bee-city-canada",
        countries: ["CA"],
      },
      {
        effort: "All season",
        text: "Become a BeeWalker: walk a fixed route once a month from March to October and count the bumblebees you see",
        org: "bumblebee-conservation-trust",
        url: "https://www.bumblebeeconservation.org/what-we-do/our-projects/current-projects/trust-led-projects/beewalk/",
        countries: ["GB"],
      },
      {
        effort: "An afternoon",
        text: "Plant wildflowers on a B-Line, Buglife's map of insect pathways, and add your patch to the map",
        org: "buglife",
        url: "https://www.buglife.org.uk/our-work/b-lines/",
        countries: ["GB"],
      },
    ],
    topics: ["pollinators"],
    photo: {
      src: "/conservation/story-honeybees.webp",
      alt: "A Kluane bumble bee, black and yellow, clinging to a pink flower with red-tipped stamens",
      author: "Thompson Hyggen",
      license: "CC0 (public domain)",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      source: "https://www.inaturalist.org/observations/185347184",
    },
    verified: V,
    sources: [
      "https://xerces.org/pollinator-conservation",
      "https://xerces.org/leave-the-leaves",
      "https://xerces.org/bring-back-the-pollinators/pollinator-protection-pledge",
      "https://beecityusa.org/",
      "https://pollinatorpartnership.ca/en/bee-city-canada",
      "https://www.bumblebeeconservation.org/what-we-do/our-projects/current-projects/trust-led-projects/beewalk/",
      "https://www.buglife.org.uk/our-work/b-lines/",
    ],
  },
  // ---- soil and seed --------------------------------------------------------------------

  {
    path: "/homesteading/compost",
    eyebrow: "Soil life",
    heading: "A compost heap is a small copy of the forest floor",
    paragraphs: [
      "A hot pile works because it is alive. In the Slow Food Foundation's guide for its gardens in Africa, a hectare of fertile soil holds more than seven tonnes of living decomposers in its top 30 cm, from bacteria and fungi to worms and insects, and composting is how a garden copies the forest floor, giving back to the soil what each harvest takes away.",
      "Those gardens, about a third of them in schools, grow traditional vegetables, fruits and herbs with sustainable techniques and the knowledge of older people. In Britain, Garden Organic, the organic growing charity that keeps the Heritage Seed Library, trains volunteer Master Composters who teach home composting in their counties; Leicestershire's have done so since 2008.",
      "Not every leaf has to go on the heap. The Xerces Society asks gardeners to rake some fallen leaves whole onto beds and under shrubs, where queen bumble bees, caterpillars and other invertebrates spend the winter, and not to shred them with a mower: whole leaves give the best cover. A heap and a leafy bed side by side serve the soil and the insects both.",
    ],
    orgs: ["slow-food-international", "garden-organic", "xerces-society", "seeds-of-diversity", "seed-savers-exchange", "save-foundation"],
    invitations: ["leave-the-leaves-2026"],
    steps: [
      {
        effort: "A few minutes",
        text: "Find a vegetable, fruit or breed from your own region in Slow Food's Ark of Taste, and grow it in your compost-fed beds",
        org: "slow-food-international",
        url: BREEDS.ark,
      },
      {
        effort: "An afternoon",
        text: "Rake some of this autumn's leaves whole onto beds instead of shredding them all for the heap",
        invitation: "leave-the-leaves-2026",
        countries: ["US", "CA"],
      },
      {
        effort: "All season",
        text: "Grow seed for others: join a Seeds of Diversity grow-out, with seed sent in March or April to grow, save and share back",
        org: "seeds-of-diversity",
        url: SEEDS.sodGrowouts,
        countries: ["CA"],
      },
      {
        effort: "All season",
        text: "Join Seed Savers Exchange and its Member Growing Club, which sends members seed from its seed bank to grow at home",
        org: "seed-savers-exchange",
        url: SEEDS.sseMembership,
        countries: ["US"],
      },
      {
        effort: "All season",
        text: "Volunteer with Garden Organic as a Master Composter, helping your county compost at home",
        org: "garden-organic",
        url: SEEDS.goVolunteer,
        countries: ["GB"],
      },
      {
        effort: "An afternoon",
        text: "Find a Slow Food garden in your country on the map of the Slow Food Gardens in Africa network, and offer a hand",
        org: "slow-food-international",
        url: SEEDS.sfGardensMap,
        countries: AFRICA,
      },
      {
        effort: "All season",
        text: "Find the seed-saving society for your country on the SAVE Foundation's list of network partners",
        org: "save-foundation",
        url: BREEDS.savePartners,
        countries: EUROPE_NOT_GB,
      },
    ],
    topics: ["soil-seeds"],
    photo: {
      src: "/conservation/story-compost.webp",
      alt: "A red compost worm stretched across dark, half-rotted compost",
      author: "Cricket Raspet",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      source: "https://www.inaturalist.org/observations/69543474",
    },
    verified: V,
    sources: [
      SEEDS.sfSoil,
      SEEDS.sfGardens,
      SEEDS.sfGardensHow,
      SEEDS.goVolunteer,
      SEEDS.goHsl,
      "https://xerces.org/leave-the-leaves",
      SEEDS.sodGrowouts,
      SEEDS.sseMembership,
      BREEDS.ark,
      BREEDS.savePartners,
    ],
  },
  {
    path: "/homesteading/food-storage",
    eyebrow: "Heritage varieties",
    heading: "Old storage varieties are kept by the people who grow them",
    paragraphs: [
      "The seed savers' root cellar is a freezer. Seeds of Diversity Canada keeps more than 2,900 regionally adapted and rare varieties in its Canadian Seed Library, 157.77 kg of seed dried and sealed in jars in a big freezer. Seed Savers Exchange has collected heirloom fruits, vegetables, herbs and flowers since 1975 and keeps them in a seed bank and historic apple orchards on its farm near Decorah, Iowa.",
      "Stored seed has to be grown out again when its germination falls, which is where gardeners come in. Seeds of Diversity sends seed to volunteer growers across Canada to multiply and return, aiming to get rare seed into as many gardens as possible. On the Seed Savers Exchange, gardeners swap seed they have grown themselves, along with potato tubers and garlic bulbs.",
      "In Britain, Garden Organic's Heritage Seed Library holds more than 800 varieties, some no longer for sale, and asks home growers to grow seed for it as seed guardians. In Ireland, Irish Seed Savers keeps a seed bank and the national collection of heritage Irish apple trees. A storage onion, squash or apple chosen from one of these collections, grown and saved, stays in use.",
    ],
    orgs: ["seeds-of-diversity", "seed-savers-exchange", "garden-organic", "irish-seed-savers", "slow-food-international", "save-foundation"],
    invitations: ["seedy-saturdays-2027"],
    steps: [
      {
        effort: "A few minutes",
        text: "Find a vegetable or fruit from your own region in Slow Food's Ark of Taste, and grow it for the cellar",
        org: "slow-food-international",
        url: BREEDS.ark,
      },
      {
        effort: "An afternoon",
        text: "Request heirloom seed, seed potatoes or garlic grown by other gardeners on the Seed Savers Exchange; a free account is all it takes",
        org: "seed-savers-exchange",
        url: SEEDS.sseExchange,
        countries: ["US"],
      },
      {
        effort: "An afternoon",
        text: "Swap storage-crop seed at a Seedy Saturday near you this winter",
        invitation: "seedy-saturdays-2027",
        countries: ["CA"],
      },
      {
        effort: "A few minutes",
        text: "Adopt a variety into the Canadian Seed Library, or volunteer to grow one out",
        org: "seeds-of-diversity",
        url: SEEDS.sodLibrary,
        countries: ["CA"],
      },
      {
        effort: "All season",
        text: "Become a seed guardian for Garden Organic's Heritage Seed Library and grow a rare variety's seed for it",
        org: "garden-organic",
        url: SEEDS.goHsl,
        countries: ["GB"],
      },
      {
        effort: "An afternoon",
        text: "Plant a heritage Irish apple tree or grow a rare vegetable from Irish Seed Savers",
        org: "irish-seed-savers",
        url: SEEDS.issShop,
        countries: ["IE"],
      },
      {
        effort: "All season",
        text: "Find the seed-saving society for your country on the SAVE Foundation's list of network partners",
        org: "save-foundation",
        url: BREEDS.savePartners,
        countries: EUROPE_NOT_GB.filter((c) => c !== "IE"),
      },
      {
        effort: "An afternoon",
        text: "Find a Slow Food garden growing traditional varieties in your country, on the map of the Slow Food Gardens in Africa network",
        org: "slow-food-international",
        url: SEEDS.sfGardensMap,
        countries: AFRICA,
      },
    ],
    topics: ["soil-seeds"],
    photo: {
      src: "/conservation/story-food-storage.webp",
      alt: "Green apples ripening among the leaves of an old apple tree",
      author: "zebedeugalinha",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      source: "https://www.inaturalist.org/observations/400320485",
    },
    verified: V,
    sources: [
      SEEDS.sodLibrary,
      "https://seeds.ca/",
      SEEDS.ssePreservation,
      SEEDS.sseExchange,
      SEEDS.goHsl,
      SEEDS.iss,
      SEEDS.issShop,
      BREEDS.ark,
      BREEDS.savePartners,
      SEEDS.sfGardens,
    ],
  },
  // ---- water ---------------------------------------------------------------------------

  {
    path: "/homesteading/rainwater",
    eyebrow: "Your watershed",
    heading: "The rain on your roof was on its way to a river",
    paragraphs: [
      "Rain that is not caught runs off, and takes the street with it. Heavy rain, Ottawa Riverkeeper explains, washes streets, lawns and parks into the nearest creek and can overwhelm combined sewers. After the storm of 1 July 2026 the City of Ottawa reported 219 million litres of combined sewer overflow, and nine of the ten swim sites tested within 48 hours were over the recommended bacteria levels.",
      "A tank holds some of that back, and where its overflow goes matters as much. Watershed Management Group, a Tucson non-profit that teaches rainwater harvesting, works by slow it, spread it, sink it: downspouts led into rain gardens and earthen basins, where soil and roots filter out pollutants and the water soaks in to recharge the ground instead of flooding the street.",
      "Harvested rain also does things tap water cannot. Freshwater Habitats Trust tells pond-makers to fill a wildlife pond with rain or water from a butt, because most tap water carries nutrients that harm pond life. Among the school and community gardens of the Slow Food network in Africa, two-thirds of those surveyed harvest rainwater, and more than one in five waters crops from buried clay jars.",
      "Watershed groups also need to know what is in the water. Water Rangers, an Ottawa-area non-profit, makes test kits and runs a free open platform for community water data; in Canada, it says, more than three-quarters of sub-watersheds are data-poor. In the United States the Izaak Walton League sends free Salt Watch kits for testing local streams for road salt pollution.",
    ],
    orgs: ["ottawa-riverkeeper", "watershed-management-group", "water-rangers", "freshwater-habitats-trust", "izaak-walton-league", "slow-food-international"],
    invitations: ["ottawa-riverkeeper-riverwatchers"],
    steps: [
      {
        effort: "A few minutes",
        text: "Look up the community water tests near you on Water Rangers' free open data platform",
        org: "water-rangers",
        url: "https://data.waterrangers.com/",
      },
      {
        effort: "An afternoon",
        text: "Test the creek or pond your downpipes drain to with a Water Rangers kit, and add your results to the platform",
        org: "water-rangers",
        url: "https://waterrangers.com/shop/",
        countries: ["CA", "US", "GB"],
      },
      {
        effort: "An afternoon",
        text: "Request a free Salt Watch kit and test your local stream for road salt this winter",
        org: "izaak-walton-league",
        url: "https://iwla.org/salt-watch/",
        countries: ["US"],
      },
      {
        effort: "An afternoon",
        text: "Dig a small wildlife pond and fill it from your water butt, following Freshwater Habitats Trust's garden pond guide",
        org: "freshwater-habitats-trust",
        url: "https://freshwaterhabitats.org.uk/advice-resources/garden-pond-advice-hub/",
        countries: ["GB", ...EUROPE_NOT_GB],
      },
      {
        effort: "An afternoon",
        text: "Find a Slow Food garden in your country on the map of the Slow Food Gardens in Africa network, and learn its ways with rain",
        org: "slow-food-international",
        url: SEEDS.sfGardensMap,
        countries: AFRICA,
      },
    ],
    topics: ["water"],
    photo: {
      src: "/conservation/story-rainwater.webp",
      alt: "A common frog with only its head above the water of a garden pond dotted with small white flowers",
      author: "pearcefamily",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      source: "https://www.inaturalist.org/observations/81598992",
    },
    verified: V,
    sources: [
      "https://ottawariverkeeper.ca/when-heavy-rain-changes-water-quality-what-swimmers-need-to-know/",
      "https://watershedmg.org/",
      "https://watershedmg.org/green-stormwater-infrastructure",
      "https://freshwaterhabitats.org.uk/advice-resources/garden-pond-advice-hub/",
      "https://www.fondazioneslowfood.com/en/slow-food-gardens-in-africa-sustainable-water-management-techniques-with-terracotta-jars/",
      "https://waterrangers.com/",
      "https://waterrangers.com/shop/",
      "https://data.waterrangers.com/",
      "https://iwla.org/salt-watch/",
      SEEDS.sfGardens,
    ],
  },
  // ---- forests -------------------------------------------------------------------------

  {
    path: "/homesteading/wood-heat",
    eyebrow: "Firewood and forests",
    heading: "Firewood can carry the pests that kill the trees it came from",
    paragraphs: [
      "Tree-killing insects and diseases cannot travel far on their own, but in a load of firewood they can jump hundreds of miles. That is the case made by Don't Move Firewood, the campaign launched in 2008 and managed by The Nature Conservancy, and it adds that even experts cannot always see a few pin-head insect eggs or fungus spores in a woodpile.",
      "Its rule of thumb: 16 km (10 miles) or less is best and 80 km (50 miles) is too far; past that, buy certified heat-treated wood, which is not the same as wood labelled kiln-dried. Wood from your own trees is safe to burn at home if you do not move it far, which is why this page says to buy firewood where you burn it.",
      "The stakes are wider than one ash tree. Botanic Gardens Conservation International's Global Tree Assessment, the work of about 1,000 experts, found 38 per cent of the world's tree species at risk of extinction. In Britain, the Tree Council's National Tree Week opens the planting season, this year from 21 to 29 November, and the Woodland Trust gives free trees to schools and community groups.",
    ],
    orgs: ["dont-move-firewood", "the-nature-conservancy", "bgci", "the-tree-council", "woodland-trust", "inaturalist"],
    invitations: ["national-tree-week-2026", "woodland-trust-free-trees-2027"],
    steps: [
      {
        effort: "A few minutes",
        text: "Look up the trees you burn on BGCI's GlobalTree Portal, which lists the conservation status of nearly 60,000 tree species country by country",
        org: "bgci",
        url: "https://www.bgci.org/resources/bgci-databases/globaltree-portal/",
      },
      {
        effort: "A few minutes",
        text: "Check the firewood rules and pests of concern for your state or province on the Don't Move Firewood map",
        org: "dont-move-firewood",
        url: "https://www.dontmovefirewood.org/map/",
        countries: ["US", "CA"],
      },
      {
        effort: "A few minutes",
        text: "Found a strange beetle, or trees sickening in a way you have not seen? Report it through the pest lines Don't Move Firewood lists",
        org: "dont-move-firewood",
        url: "https://www.dontmovefirewood.org/report-a-pest/",
        countries: ["US", "CA"],
      },
      {
        effort: "A few minutes",
        text: "Photograph unfamiliar beetles, holes or galleries in your woodpile and share them on iNaturalist, where others help name them",
        invitation: "inaturalist-observations",
      },
      {
        effort: "An afternoon",
        text: "Plant a tree at a National Tree Week event, 21 to 29 November",
        invitation: "national-tree-week-2026",
        countries: ["GB"],
      },
      {
        effort: "All season",
        text: "Apply for a free pack of native saplings for your school or community group",
        invitation: "woodland-trust-free-trees-2027",
        countries: ["GB"],
      },
    ],
    topics: ["forests"],
    photo: {
      src: "/conservation/story-wood-heat.webp",
      alt: "The trunk of a dead ash tree, its bark gone, covered in the winding feeding galleries of emerald ash borer larvae",
      author: "T. J. Samojedny",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      source: "https://www.inaturalist.org/observations/125158421",
    },
    verified: V,
    sources: [
      "https://www.dontmovefirewood.org/",
      "https://www.dontmovefirewood.org/about/",
      "https://www.dontmovefirewood.org/how-to-help/f-a-q/",
      "https://www.dontmovefirewood.org/how-to-help/firewood-finder/",
      "https://www.dontmovefirewood.org/map/",
      "https://www.dontmovefirewood.org/report-a-pest/",
      "https://www.bgci.org/",
      "https://www.bgci.org/resources/bgci-databases/globaltree-portal/",
      "https://treecouncil.org.uk/seasonal-campaigns/national-tree-week/",
      "https://www.woodlandtrust.org.uk/plant-trees/schools-and-communities/",
    ],
  },
  // ---- medicinal plants -------------------------------------------------------------

  {
    path: "/foraging/medicinal",
    eyebrow: "Medicinal plants at risk",
    heading: "One entry on this page is already being watched",
    paragraphs: [
      "United Plant Savers, the American charity for at-risk native medicinal plants and fungi, keeps a Species At-Risk list for North America. Chaga, on this page, is on its In Review list of species being considered for it, and meanwhile it advises caution and careful thought before using them. The At-Risk list itself names American ginseng, goldenseal, black cohosh, bloodroot, slippery elm and ramps, among others.",
      "These are plants in decline, it says, from expanding popularity and shrinking habitat. For At-Risk plants it asks for cultivated forms wherever possible and very limited wild harvest; for its Critical list, among them lady's slipper orchids, trillium and sundews, none at all, except for research that helps the plant or Indigenous use with a traditional connection to it. It is not asking for a ban.",
      "What a forager can do is mostly grow rather than dig. United Plant Savers runs seasonal sales of goldenseal rhizomes and ginseng seed for planting in shaded woodland, and its Botanical Sanctuary Network joins more than 300 gardens, woods and prairies restoring habitat for native plants. Goldenseal is also on Appendix II of CITES, the treaty that monitors trade in threatened species.",
      "In South Africa, CREW, a SANBI programme supported by the Botanical Society, has had more than 900 volunteers in 35 groups monitoring threatened plants; in Mpumalanga its team found a hotspot of threatened medicinal plants and worked with village councils and tribal authorities to protect them. In Britain, Plantlife's National Plant Monitoring Scheme sends volunteers to survey the same squares every year.",
    ],
    orgs: ["united-plant-savers", "crew-south-africa", "botanical-society-of-south-africa", "sanbi", "plantlife", "inaturalist"],
    invitations: ["crew-rare-plant-monitoring", "inaturalist-observations"],
    steps: [
      {
        effort: "A few minutes",
        text: "Record the rare plants you find on iNaturalist, so botanists know where they still grow, and leave them in the ground",
        invitation: "inaturalist-observations",
      },
      {
        effort: "All season",
        text: "Make your garden, woodlot or field a member of United Plant Savers' Botanical Sanctuary Network, restoring habitat for native plants",
        org: "united-plant-savers",
        url: "https://unitedplantsavers.org/bsn/",
      },
      {
        effort: "An afternoon",
        text: "Plant goldenseal rhizomes or ginseng seed in shaded woodland instead of harvesting wild roots; United Plant Savers ships within the US",
        org: "united-plant-savers",
        url: "https://unitedplantsavers.org/grow-your-own-goldenseal-ginseng/",
        countries: ["US"],
      },
      {
        effort: "All season",
        text: "Join a CREW group and help find and monitor South Africa's threatened plants",
        invitation: "crew-rare-plant-monitoring",
        countries: ["ZA"],
      },
      {
        effort: "All season",
        text: "Take on a square for the National Plant Monitoring Scheme and survey its plants each year",
        org: "plantlife",
        url: "https://www.plantlife.org.uk/our-work/npms-national-plant-monitoring-scheme/",
        countries: ["GB"],
      },
    ],
    topics: ["plants"],
    photo: {
      src: "/conservation/story-medicinal.webp",
      alt: "A goldenseal plant in woodland, a cluster of red berries resting on its broad, lobed leaf",
      author: "Zihao Wang",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      source: "https://www.inaturalist.org/observations/59157755",
    },
    verified: V,
    sources: [
      "https://unitedplantsavers.org/species-at-risk-list/",
      "https://unitedplantsavers.org/grow-your-own-goldenseal-ginseng/",
      "https://unitedplantsavers.org/bsn/",
      "https://unitedplantsavers.org/",
      "https://botanicalsociety.org.za/crew-programme/",
      "https://www.plantlife.org.uk/our-work/npms-national-plant-monitoring-scheme/",
    ],
  },
  // ---- South African coast and wetlands (told for South African readers) -----------------

  {
    path: "/foraging/waterblommetjie",
    eyebrow: "Cape vleis",
    heading: "The waterblommetjie is common; the clean vleis it needs are the thing to watch",
    paragraphs: [
      "The waterblommetjie is not threatened. SANBI calls it widespread and common, CapeNature knows it from at least 100 places in the Western Cape, and many commercial plantings have been made in farm ponds. Two things are less certain: CapeNature notes that nobody knows what wild harvesting does to the plant, and that it is sensitive to herbicides and pesticides.",
      "So the wild plant's health follows the health of its vleis, pools 1 to 2 m deep that fill with the winter rain and often dry out in summer. It is also an easy plant to grow at home. SANBI's PlantZAfrica calls it an excellent plant for a garden pond, raised from seedlings or divided tubers, and says dormant tubers are sometimes sold by Cape nurseries.",
      "The vleis have their watchers. In the Coordinated Waterbird Counts, begun in 1992 and curated by the University of Cape Town's FitzPatrick Institute, volunteers count the waterbirds on registered wetlands twice a year. And volunteers organised by the Botanical Society and CREW record wild species on iNaturalist for the Great Southern BioBlitz, from 27 to 30 November.",
    ],
    orgs: ["sanbi", "capenature", "cwac", "botanical-society-of-south-africa", "crew-south-africa"],
    invitations: ["great-southern-bioblitz-2026", "cwac-summer-count-2027"],
    steps: [
      {
        effort: "A few minutes",
        text: "Before you pick anything wild in the Western Cape, check with CapeNature which plants need a permit, and pick only with the landowner's permission",
        org: "capenature",
        url: "https://www.capenature.co.za/permits/protected-and-endangered-plants",
      },
      {
        effort: "An afternoon",
        text: "Record the plants and animals of a vlei near you for the Great Southern BioBlitz, 27 to 30 November",
        invitation: "great-southern-bioblitz-2026",
      },
      {
        effort: "An afternoon",
        text: "Count the waterbirds on a registered vlei or dam once between 15 January and 15 February",
        invitation: "cwac-summer-count-2027",
      },
      {
        effort: "All season",
        text: "Grow waterblommetjies in a garden pond from tubers or seedlings, following SANBI's PlantZAfrica guide",
        org: "sanbi",
        url: "https://pza.sanbi.org/aponogeton-distachyos",
      },
    ],
    topics: ["plants", "water"],
    countries: ["ZA"],
    photo: {
      src: "/conservation/story-waterblommetjie.webp",
      alt: "Waterblommetjie leaves floating on a dark vlei, with forked white flower spikes standing above them",
      author: "Tony Rebelo",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      source: "https://www.inaturalist.org/observations/9114381",
    },
    verified: V,
    sources: [
      "https://pza.sanbi.org/aponogeton-distachyos",
      "https://www.capenature.co.za/news/2023/aponogeton-distachyos-the-waterblommetjie",
      "https://www.capenature.co.za/permits/protected-and-endangered-plants",
      "https://cwac.birdmap.africa/",
      "https://botanicalsociety.org.za/crew-programme/",
      "https://www.greatsouthernbioblitz.org/about-1",
    ],
  },
  {
    path: "/foraging/dune-spinach",
    eyebrow: "Cape dunes",
    heading: "Dune spinach is one of the plants that hold the dune together",
    paragraphs: [
      "Dune spinach is among the first plants on moist, moving foredunes, and SANBI explains why that matters: it traps seed and adds organic matter, so other plants can follow and the sand can settle into a stable dune behind. It is widespread, from southern Namibia to the Eastern Cape, but SANBI notes that trampling damages it. Take the soft tips and leave the plant rooted.",
      "On some of that coast, local people look after the dunes themselves. At WESSA's Green Coast sites, communities monitor the shore: at Blaauwberg Nature Reserve, whose sandy shores and lower dunes are covered, there are monthly beach clean-ups, and at Kei Mouth people have been clearing invasive alien plants from the dune habitat. Nature's Valley Trust runs the Green Coast site at Nature's Valley.",
      "Records help too. Volunteers organised by the Botanical Society and CREW log wild species on iNaturalist for the Great Southern BioBlitz, 27 to 30 November, adding to the monitoring data used for conservation. A photograph of a patch of dune spinach and the plants around it is a record of a dune at work.",
    ],
    orgs: ["sanbi", "wessa", "natures-valley-trust", "botanical-society-of-south-africa", "capenature"],
    invitations: ["great-southern-bioblitz-2026"],
    steps: [
      {
        effort: "A few minutes",
        text: "Before you pick anything wild in the Western Cape, check with CapeNature which plants need a permit; on reserve and national-park beaches, pick nothing",
        org: "capenature",
        url: "https://www.capenature.co.za/permits/protected-and-endangered-plants",
      },
      {
        effort: "An afternoon",
        text: "Photograph the plants of a dune near you for the Great Southern BioBlitz, 27 to 30 November",
        invitation: "great-southern-bioblitz-2026",
      },
      {
        effort: "An afternoon",
        text: "Join the beach clean-ups and monitoring at a WESSA Green Coast site near you",
        org: "wessa",
        url: "https://www.wessa.org.za/green-coast/",
      },
    ],
    topics: ["plants", "land"],
    countries: ["ZA"],
    photo: {
      src: "/conservation/story-dune-spinach.webp",
      alt: "Mats of grey-green dune spinach spreading over white sand above a sheltered beach",
      author: "Tony Rebelo",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      source: "https://www.inaturalist.org/observations/202882414",
    },
    verified: V,
    sources: [
      "https://pza.sanbi.org/tetragonia-decumbens",
      "https://www.wessa.org.za/green-coast/",
      "https://www.capenature.co.za/permits/protected-and-endangered-plants",
      "https://botanicalsociety.org.za/crew-programme/",
      "https://www.greatsouthernbioblitz.org/about-1",
    ],
  },
  {
    path: "/foraging/sea-bamboo",
    eyebrow: "Kelp forests",
    heading: "The kelp on the beach comes from a forest, and so do other finds",
    paragraphs: [
      "Sea bamboo is South Africa's largest kelp, and in the water it is a forest: the Two Oceans Aquarium describes it as food and a hiding place for some marine animals, most common on the West Coast and in Namibia. The aquarium names pollution, climate change and overharvesting in certain areas as the pressures on it.",
      "A beach walk after a storm, when kelp washes up, can turn up something else. Loggerhead and leatherback hatchlings from the KwaZulu-Natal nesting beaches are carried off by the Agulhas Current, and some wash up on Western Cape beaches, weak, cold and dehydrated. The Two Oceans Aquarium Foundation's Turtle Rescue Network brings them to its Turtle Conservation Centre, which reports an 85 per cent release rate.",
      "If you find a turtle on the sand, do not put it back in the water: an injured, shocked or dehydrated turtle cannot swim away. Call the Turtle Rescue Hotline on 083 300 1663, which arranges its rescue. And what the tide brings in can be recorded: photographs uploaded to iNaturalist for the Great Southern BioBlitz, 27 to 30 November, add to the record of the coast.",
    ],
    orgs: ["two-oceans-aquarium-foundation", "inaturalist", "botanical-society-of-south-africa"],
    invitations: ["great-southern-bioblitz-2026"],
    steps: [
      {
        effort: "A few minutes",
        text: "Save the Turtle Rescue Hotline, 083 300 1663, in your phone before a beach walk; if you find a turtle, keep it out of the water and call",
        org: "two-oceans-aquarium-foundation",
        url: "https://www.aquarium.co.za/foundation/conservation/turtle-conservation-centre",
      },
      {
        effort: "An afternoon",
        text: "Photograph the kelp and shore life of a beach after a storm for the Great Southern BioBlitz, 27 to 30 November",
        invitation: "great-southern-bioblitz-2026",
      },
      {
        effort: "All season",
        text: "Learn the seaweeds and rocky-shore life of the Cape Peninsula on the Two Oceans Aquarium's six-day volunteer course, then guide visitors",
        org: "two-oceans-aquarium-foundation",
        url: "https://www.aquarium.co.za/foundation/education/adult-volunteer-course",
      },
    ],
    topics: ["water", "plants"],
    countries: ["ZA"],
    photo: {
      src: "/conservation/story-sea-bamboo.webp",
      alt: "A golden-brown sea bamboo frond underwater, lit by the sun from above",
      author: "Peter Southwood",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      source: "https://www.inaturalist.org/observations/11155468",
    },
    verified: V,
    sources: [
      "https://www.aquarium.co.za/animals/sea-bamboo",
      "https://www.aquarium.co.za/foundation",
      "https://www.aquarium.co.za/foundation/conservation/turtle-conservation-centre",
      "https://www.aquarium.co.za/foundation/education/adult-volunteer-course",
      "https://www.greatsouthernbioblitz.org/about-1",
    ],
  },
  // ---- fungi ---------------------------------------------------------------------------

  {
    path: "/foraging/yellowfoot",
    eyebrow: "Fungi are counted too",
    heading: "A forager's eye for yellowfoot is what fungus recording needs",
    paragraphs: [
      "Conservation has long focused on plants and animals and left fungi overlooked, the British Mycological Society says, and it now backs a global strategy to bring them into conservation plans. It cites a 2025 study estimating that fewer than 10 per cent of the predicted hotspots for mycorrhizal fungi, the kind that partner with plant roots, lie inside protected areas.",
      "Protecting fungi starts with knowing where they fruit, and much of that knowledge comes from volunteers. The Fungal Records Database of Britain and Ireland holds more than 2.5 million records from four centuries, many sent in by local fungus groups, and those records have helped draw up Red Data Lists. In North America, FUNDIS, the Fungal Diversity Survey, gathers community scientists' finds into its Fungal Diversity Database.",
      "Someone picking yellowfoot is already in the right woods at the right time. A photograph of each find with its habitat, the trees and moss around it, makes a basket into a record, and in North America the FUNDIS database's expert identifiers will help confirm it. In France, the Société Mycologique de France has explored the diversity of fungi since 1884 through field outings, exhibitions and its member societies.",
    ],
    orgs: ["british-mycological-society", "fundis", "societe-mycologique-de-france", "inaturalist"],
    invitations: ["inaturalist-observations", "city-nature-challenge-2027"],
    steps: [
      {
        effort: "A few minutes",
        text: "Photograph your finds, with the trees and ground around them, and share them on iNaturalist",
        invitation: "inaturalist-observations",
      },
      {
        effort: "An afternoon",
        text: "Add your fungus observations to the FUNDIS Fungal Diversity Database, where expert identifiers review them",
        org: "fundis",
        url: "https://www.fundis.org/fungal-diversity-database",
        countries: ["US", "CA"],
      },
      {
        effort: "All season",
        text: "Look for the target species of a FUNDIS Rare Fungi Challenge in your region, with the landowner's permission",
        org: "fundis",
        url: "https://www.fundis.org/rare-fungi-challenges",
        countries: ["US", "CA"],
      },
      {
        effort: "All season",
        text: "Join a local fungus group in the British Mycological Society's Recording Network and send in your records",
        org: "british-mycological-society",
        url: "https://www.britmycolsoc.org.uk/recording-network.html",
        countries: ["GB", "IE"],
      },
      {
        effort: "An afternoon",
        text: "Find the mycological society for your département on the Société Mycologique de France's list and go on a foray",
        org: "societe-mycologique-de-france",
        url: "https://www.mycofrance.fr/les-societes-adherentes-a-la-smf/",
        countries: ["FR"],
      },
      {
        effort: "An afternoon",
        text: "Count the fungi as well as the plants and animals in your town for the City Nature Challenge, 30 April to 3 May",
        invitation: "city-nature-challenge-2027",
      },
    ],
    topics: ["plants"],
    photo: {
      src: "/conservation/story-yellowfoot.webp",
      alt: "A cluster of yellowfoot, brown caps on hollow yellow stems, among conifer needles and moss",
      author: "Erin Springinotic",
      license: "CC0 (public domain)",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      source: "https://www.inaturalist.org/observations/98817790",
    },
    verified: V,
    sources: [
      "https://www.britmycolsoc.org.uk/global_fungal_conservation.html",
      "https://www.britmycolsoc.org.uk/recording-fungi.html",
      "https://www.britmycolsoc.org.uk/recording-network.html",
      "https://www.fundis.org/",
      "https://www.fundis.org/get-involved",
      "https://www.fundis.org/fungal-diversity-database",
      "https://www.fundis.org/rare-fungi-challenges",
      "https://www.mycofrance.fr/",
      "https://www.mycofrance.fr/les-societes-adherentes-a-la-smf/",
    ],
  },
  {
    path: "/foraging/parasol-mushroom",
    eyebrow: "Fungi are counted too",
    heading: "Parasol country is grassland, and grassland fungi are in trouble",
    paragraphs: [
      "Parasols come up in pastures, road verges and grassy clearings. Such old grassland is also home to fungi the Société Mycologique de France counts among Europe's most endangered: the waxcaps, fairy clubs and earth tongues of unimproved turf. Fertiliser and chemicals drive them out for many years, it says, and 90 per cent of the grassland suited to them has gone from western Europe in 75 years.",
      "With Réserves Naturelles de France and the fungus-recording association ADONIF, the society has drawn up a survey method so that grassland managers can judge a site by its fungi. In Britain, Plantlife's Waxcap Watch asks anyone visiting grassland between September and late November, lawns, parks and churchyards included, to record the colours of the waxcaps they see in a phone app; the records point to surviving fragments of ancient meadow.",
      "Someone who hunts parasols is walking this kind of ground in this season already. A photograph of the other fungi in the same field, waxcaps above all, with a note of where it is, is a record conservationists can use.",
    ],
    orgs: ["societe-mycologique-de-france", "plantlife", "british-mycological-society", "inaturalist"],
    invitations: ["inaturalist-observations", "city-nature-challenge-2027"],
    steps: [
      {
        effort: "A few minutes",
        text: "Photograph the other fungi of the field where you find parasols and share them on iNaturalist",
        invitation: "inaturalist-observations",
      },
      {
        effort: "An afternoon",
        text: "Survey a lawn, park or churchyard for Waxcap Watch before the end of November, with the free survey app",
        org: "plantlife",
        url: "https://www.plantlife.org.uk/waxcapwatch/",
        countries: ["GB"],
      },
      {
        effort: "All season",
        text: "Join a local fungus group in the British Mycological Society's Recording Network",
        org: "british-mycological-society",
        url: "https://www.britmycolsoc.org.uk/recording-network.html",
        countries: ["GB", "IE"],
      },
      {
        effort: "An afternoon",
        text: "Find the mycological society for your département on the Société Mycologique de France's list and go on a foray",
        org: "societe-mycologique-de-france",
        url: "https://www.mycofrance.fr/les-societes-adherentes-a-la-smf/",
        countries: ["FR"],
      },
      {
        effort: "An afternoon",
        text: "Count the fungi as well as the plants and animals in your town for the City Nature Challenge, 30 April to 3 May",
        invitation: "city-nature-challenge-2027",
      },
    ],
    topics: ["plants", "land"],
    photo: {
      src: "/conservation/story-parasol-mushroom.webp",
      alt: "An open parasol mushroom, its scaly cap lifted on a banded stem with a loose ring, in rough grass and moss",
      author: "Nils",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      source: "https://www.inaturalist.org/observations/93609935",
    },
    verified: V,
    sources: [
      "https://www.mycofrance.fr/champignons-des-pelouses-et-prairies-maigres-chegd/",
      "https://www.mycofrance.fr/les-societes-adherentes-a-la-smf/",
      "https://www.plantlife.org.uk/waxcapwatch/",
      "https://www.britmycolsoc.org.uk/recording-network.html",
    ],
  },

  // ---- learning --------------------------------------------------------------------------

  {
    path: "/learn/ecology",
    eyebrow: "Learning ecology by doing it",
    heading: "Children can do the same counting ecologists do",
    paragraphs: [
      "The ideas on this page are the ones ecologists work with, and much of what they know about real places comes from counting: which birds are here this winter, which are not, and how that changes. Project FeederWatch, run by the Cornell Lab of Ornithology and Birds Canada, has people across North America count the birds at their window from November to April.",
      "Children take part as easily as adults. FeederWatch counts come from families and classrooms, you do not even need a feeder, and its data show where birds are as well as where they are not. Britain's Big Garden Birdwatch began in 1979 when the children's programme Blue Peter asked viewers to post in their sightings; in 2026 more than 650,000 people took part and counted 9.4 million birds.",
      "For a child who wants to do more, Roots & Shoots, the Jane Goodall Institute's movement for young people from kindergarten to university, began in Dar es Salaam in 1991 with 12 secondary-school students and is active in more than 75 countries; younger members work on projects with a parent or teacher to guide them. In South Africa, WESSA has brought more than 4,500 schools into Eco-Schools since 2003.",
    ],
    orgs: ["roots-and-shoots", "project-feederwatch", "cornell-lab-of-ornithology", "birds-canada", "rspb", "wessa", "inaturalist"],
    invitations: ["project-feederwatch-2026-27", "big-garden-birdwatch-2027", "christmas-bird-count-2026-27-us", "christmas-bird-count-2026-27-canada"],
    steps: [
      {
        effort: "With children",
        text: "Start a Roots & Shoots group with your family or class, and choose a project for people, animals or the place you live",
        org: "roots-and-shoots",
        url: "https://rootsandshoots.org/",
      },
      {
        effort: "With children",
        text: "Name the plants, insects and birds around you together with the Seek app",
        invitation: "seek-by-inaturalist",
      },
      {
        effort: "With children",
        text: "Count the birds at your window together for Project FeederWatch, any week from 1 November to 30 April",
        invitation: "project-feederwatch-2026-27",
        countries: ["US", "CA"],
      },
      {
        effort: "With children",
        text: "Join a Christmas Bird Count near you, between 14 December and 5 January",
        invitation: "christmas-bird-count-2026-27-us",
        countries: ["US"],
      },
      {
        effort: "With children",
        text: "Join a Christmas Bird Count circle near you, between 14 December and 5 January",
        invitation: "christmas-bird-count-2026-27-canada",
        countries: ["CA"],
      },
      {
        effort: "With children",
        text: "Count your garden birds for an hour in the Big Garden Birdwatch; registration opens on 9 December",
        invitation: "big-garden-birdwatch-2027",
        countries: ["GB"],
      },
      {
        effort: "With children",
        text: "Ask your child's school to join the RSPB's Big Schools Birdwatch this winter",
        invitation: "big-schools-birdwatch-2027",
        countries: ["GB"],
      },
      {
        effort: "With children",
        text: "Ask your child's school to register for Eco-Schools, which it can do at any time",
        invitation: "eco-schools-south-africa",
        countries: ["ZA"],
      },
      {
        effort: "With children",
        text: "Bring a child on Nature Kenya's Wednesday morning bird walk in and around Nairobi",
        invitation: "nature-kenya-wednesday-birdwalk",
        countries: ["KE"],
      },
    ],
    topics: ["youth", "birds"],
    photo: {
      src: "/conservation/story-ecology.webp",
      alt: "A black-capped chickadee clinging to a wire suet feeder among bare winter branches",
      author: "Hunter Hickok",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      source: "https://www.inaturalist.org/observations/65303424",
    },
    verified: V,
    sources: [
      "https://feederwatch.org/about/project-overview/",
      "https://feederwatch.org/join-or-renew/",
      "https://www.rspb.org.uk/whats-happening/big-garden-birdwatch",
      "https://rootsandshoots.org/",
      "https://janegoodall.org/wp-content/uploads/2026/03/Roots-Shoots-Global-Fact-Sheet-1.pdf",
      "https://www.wessa.org.za/eco-schools/",
      "https://naturekenya.org/about/wednesday-birdwalk/",
    ],
  },
  // ---- the ground and the sky -------------------------------------------------------------

  {
    path: "/ground/rocks",
    eyebrow: "The ground and the sky",
    heading: "A trip to see real rock can take in a protected night sky",
    paragraphs: [
      "Since Flagstaff, Arizona, became the first in 2001, DarkSky International has certified more than 200 International Dark Sky Places, many of them state or national parks, that together cover more than 160,000 square kilometres in 22 countries on six continents; South Africa's !Ae!Hai Kalahari Heritage Park is one.",
      "Light pollution, DarkSky says, disrupts wildlife, harms people's well-being and wastes energy as well as hiding the stars, and it can be reversed. Its home outdoor lighting assessment takes a household through four steps to cut the light pollution from its own front door, with suggestions for people in flats and rented homes who cannot change their lights.",
    ],
    orgs: ["darksky-international"],
    steps: [
      {
        effort: "With children",
        text: "Find the nearest International Dark Sky Place on DarkSky's map and plan an evening there to look at the rocks by day and the stars by night",
        org: "darksky-international",
        url: "https://darksky.org/what-we-do/international-dark-sky-places/all-places/",
      },
      {
        effort: "An afternoon",
        text: "Work through DarkSky's four-step home outdoor lighting assessment",
        org: "darksky-international",
        url: "https://darksky.org/get-involved/home-lighting-assessment/",
      },
      {
        effort: "All season",
        text: "Find a DarkSky chapter near you; more than 70 run events and education on six continents",
        org: "darksky-international",
        url: "https://darksky.org/who-we-are/chapters/",
      },
    ],
    topics: ["ground", "youth"],
    verified: V,
    sources: [
      "https://darksky.org/",
      "https://darksky.org/what-we-do/international-dark-sky-places/",
      "https://darksky.org/what-we-do/international-dark-sky-places/all-places/",
      "https://darksky.org/get-involved/",
      "https://darksky.org/get-involved/home-lighting-assessment/",
      "https://darksky.org/who-we-are/chapters/",
    ],
  },
];
