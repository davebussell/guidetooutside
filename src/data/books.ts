/**
 * The children's picture books on /resources/<town> ("Books and videos about
 * <town>"): 106 books, each about a real place or a real animal.
 *
 * Extracted from every captured /resources/<town> page (264). The array is in
 * the order the live pages list books within each tier (one order fits every
 * page). The tags were read back from where each book appears:
 * `places` — the towns it is "About right here" for; `regions` — the
 * ecological regions it is "About this part of the country" for; `animals` —
 * the regions whose wildlife it is about ("Animals that live near you");
 * `everywhere` — "Loved everywhere". `latMin`/`latMax` limit a book to part of
 * a region (an animal's range); the live cut-offs are not visible, so each is
 * a round latitude inside the gap between the captured towns that show the
 * book and those that do not. Covers are /books/<isbn>.webp unless
 * `cover` is false. Selection and storefront links: src/lib/books.ts.
 *
 * After them, SUPPORTED: books sold by conservation organisations in the
 * library (src/data/conservation), so that buying the book funds the work.
 * Each was checked on the organisation's own shop page on 2026-10-22; `note`
 * is what the shop says about where the money goes, when it says so. These
 * books appear only in the first shelf ("Buying these supports an
 * organisation") and only where the organisation's shop reaches the reader.
 */
import { orgBySlug } from "@/data/conservation";

export type Book = {
  /**
   * ISBN-13. For a title an organisation sells without a published ISBN, its
   * shop reference as "<org-slug>:<product>" (such a book has no cover image
   * and no bookshop link; see `hasIsbn`).
   */
  isbn: string;
  title: string;
  author: string;
  /** "4–8" — shown as "ages 4–8"; or words ("Grown-ups", "Children", "All ages") when the seller gives no range. */
  ages: string;
  blurb: string;
  /** False when there is no cover image. */
  cover?: false;
  everywhere?: true;
  /** Town slugs it is "About right here" for. */
  places?: string[];
  /** Ecoregions it is "About this part of the country" for. */
  regions?: string[];
  /** Ecoregions where the animal it is about lives. */
  animals?: string[];
  latMin?: number;
  latMax?: number;
  /**
   * Sold by a conservation organisation: `org` is its library slug, `url` the
   * title's page in the organisation's own shop, `note` the shop's own words on
   * where proceeds go. `countries` (ISO alpha-2) limits the book to where the
   * shop delivers when that differs from where the organisation works.
   */
  supports?: { org: string; url: string; note?: string; countries?: string[] };
  /** False when Bookshop.org does not list the ISBN (checked 2026-10-22), so no bookshop link is offered outside Canada. */
  bookshop?: false;
};

/** A real ISBN-13, as opposed to an organisation's shop reference. */
export const hasIsbn = (b: Pick<Book, "isbn">) => /^97[89]\d{10}$/.test(b.isbn);

const PICTURE_BOOKS: Book[] = [
 {
  "isbn": "9781338243314",
  "title": "Over and Under the Pond",
  "author": "Kate Messner",
  "ages": "4–8",
  "blurb": "A boy and his mother canoe across a still pond and discover the busy world beneath it — fish, frogs, nesting birds — from morning to dusk.",
  "everywhere": true
 },
 {
  "isbn": "9780395292037",
  "title": "Paddle-to-the-Sea",
  "author": "Holling Clancy Holling",
  "ages": "6–10",
  "blurb": "A carved canoe travels from Lake Nipigon through all five Great Lakes, over Niagara Falls and down the St. Lawrence to the sea. Caldecott Honor geography classic.",
  "regions": [
   "boreal-forest",
   "great-lakes-st-lawrence"
  ]
 },
 {
  "isbn": "9781550415964",
  "title": "The Sugaring-Off Party",
  "author": "Jonathan London",
  "ages": "4–8",
  "blurb": "A French-Canadian grand-mère tells her grandson about her first sugaring-off party in Quebec — maple sap, the sugar shack, music, dancing and food. Illustrated by Quebec artist Gilles Pelletier.",
  "regions": [
   "great-lakes-st-lawrence"
  ]
 },
 {
  "isbn": "9781772601008",
  "title": "The Water Walker",
  "author": "Joanne Robertson",
  "ages": "4–8",
  "blurb": "The true story of Anishinaabe grandmother Josephine Mandamin, who walked around all five Great Lakes carrying a pail of water to call for protecting it.",
  "regions": [
   "great-lakes-st-lawrence"
  ]
 },
 {
  "isbn": "9780547530833",
  "title": "Snowflake Bentley",
  "author": "Jacqueline Briggs Martin",
  "ages": "5–9",
  "blurb": "Caldecott Medal biography of the Vermont farmer who first photographed snowflakes. Perfect before a snowy walk with a magnifying glass.",
  "places": [
   "burlington-vermont"
  ],
  "regions": [
   "great-lakes-st-lawrence"
  ]
 },
 {
  "isbn": "9780689829581",
  "title": "The Big Rock",
  "author": "Bruce Hiscock",
  "ages": "6–9",
  "blurb": "The life story of one granite boulder in the Adirondacks, from molten rock to glacier-carried erratic in a forest. Geology for kids who climb every rock.",
  "places": [
   "burlington-vermont"
  ],
  "regions": [
   "great-lakes-st-lawrence"
  ]
 },
 {
  "isbn": "9780140548754",
  "title": "When I Was Young in the Mountains",
  "author": "Cynthia Rylant",
  "ages": "4–8",
  "blurb": "Cynthia Rylant's memory of growing up with her grandparents in the West Virginia mountains — swimming holes, cornbread, the country store. Caldecott Honor.",
  "regions": [
   "appalachian"
  ]
 },
 {
  "isbn": "9781938700507",
  "title": "Hello, Smokies!",
  "author": "Martha Zschock",
  "ages": "1–4",
  "blurb": "Board book introducing the Great Smoky Mountains to toddlers — misty ridges, waterfalls and the animals of the park.",
  "cover": false,
  "places": [
   "asheville-north-carolina"
  ],
  "regions": [
   "appalachian"
  ]
 },
 {
  "isbn": "9780937207413",
  "title": "Smoky Mountain Wee Ones",
  "author": "Lisa Horstman",
  "ages": "1–4",
  "blurb": "Board book from the Great Smoky Mountains Association introducing the park's wildlife to the youngest readers.",
  "cover": false,
  "places": [
   "asheville-north-carolina"
  ],
  "regions": [
   "appalachian"
  ]
 },
 {
  "isbn": "9781452112411",
  "title": "Follow the Moon Home",
  "author": "Philippe Cousteau",
  "ages": "5–9",
  "blurb": "A new girl in a South Carolina coastal town rallies her class to turn off beachfront lights so loggerhead hatchlings can find the sea.",
  "cover": false,
  "regions": [
   "southeastern"
  ]
 },
 {
  "isbn": "9798217006441",
  "title": "The Buffalo Are Back",
  "author": "Jean Craighead George",
  "ages": "5–9",
  "blurb": "How bison and the tallgrass prairie nearly vanished together and are coming back together, painted by Wendell Minor.",
  "regions": [
   "great-plains"
  ]
 },
 {
  "isbn": "9781895714661",
  "title": "If You're Not from the Prairie...",
  "author": "David Bouchard",
  "ages": "4–8",
  "blurb": "A Canadian prairie childhood of wind, sky, snow and flat horizons, told as a poem. For any kid who knows the land is not 'boring'.",
  "cover": false,
  "regions": [
   "great-plains"
  ]
 },
 {
  "isbn": "9780887762925",
  "title": "A Prairie Alphabet",
  "author": "Jo Bannatyne-Cugnet",
  "ages": "3–7",
  "blurb": "Yvette Moore's detailed paintings of Saskatchewan farm and prairie life, one letter at a time, with notes on each scene.",
  "regions": [
   "great-plains"
  ]
 },
 {
  "isbn": "9781101997956",
  "title": "Make Way for Ducklings",
  "author": "Robert McCloskey",
  "ages": "2–6",
  "blurb": "Mr. and Mrs. Mallard raise eight ducklings on Boston's Charles River and march them to the Public Garden. Caldecott Medal; the bronze ducklings are still there.",
  "places": [
   "boston-massachusetts"
  ],
  "regions": [
   "northeast-coast"
  ]
 },
 {
  "isbn": "9780152163723",
  "title": "A River Ran Wild",
  "author": "Lynne Cherry",
  "ages": "5–9",
  "blurb": "Environmental history of the Nashua River in Massachusetts and New Hampshire: polluted by mills until people cleaned it and the wildlife came back.",
  "places": [
   "boston-massachusetts"
  ],
  "regions": [
   "northeast-coast"
  ]
 },
 {
  "isbn": "9780761451150",
  "title": "Horseshoe Crabs and Shorebirds: The Story of a Food Web",
  "author": "Victoria Crenson",
  "ages": "5–9",
  "blurb": "Each May on Delaware Bay, horseshoe crabs lay millions of eggs just as migrating shorebirds arrive to feast. A clear first food-web book.",
  "places": [
   "philadelphia-pennsylvania"
  ],
  "regions": [
   "northeast-coast"
  ]
 },
 {
  "isbn": "9781590782538",
  "title": "Frog Heaven: Ecology of a Vernal Pool",
  "author": "Doug Wechsler",
  "ages": "6–10",
  "blurb": "Photo essay on a woodland vernal pool through the year — wood frogs, spring peepers, salamander eggs — the puddle worth checking every April.",
  "regions": [
   "northeast-coast"
  ]
 },
 {
  "isbn": "9780887769405",
  "title": "A Mountain Alphabet",
  "author": "Margriet Ruurs",
  "ages": "4–8",
  "blurb": "The Canadian Rockies letter by letter, with plenty to search for in Andrew Kiss's detailed paintings of peaks, lakes and wildlife.",
  "regions": [
   "western-mountains"
  ]
 },
 {
  "isbn": "9780802796868",
  "title": "When the Wolves Returned: Restoring Nature's Balance in Yellowstone",
  "author": "Dorothy Hinshaw Patent",
  "ages": "6–10",
  "blurb": "Photo book on what changed after wolves came back to Yellowstone in 1995 — elk, willows, beavers and songbirds all responded.",
  "places": [
   "bozeman-montana"
  ],
  "regions": [
   "western-mountains"
  ]
 },
 {
  "isbn": "9781596437272",
  "title": "Sequoia",
  "author": "Tony Johnston",
  "ages": "4–8",
  "blurb": "A giant sequoia in the Sierra Nevada speaks in a poem about centuries of seasons, fire and snow, with Wendell Minor paintings.",
  "cover": false,
  "regions": [
   "mediterranean-california",
   "western-mountains"
  ]
 },
 {
  "isbn": "9781596439504",
  "title": "Grand Canyon",
  "author": "Jason Chin",
  "ages": "6–10",
  "blurb": "A father and daughter hike down the Grand Canyon through two billion years of rock, fossils and habitats. Caldecott and Sibert Honor.",
  "regions": [
   "deserts",
   "western-mountains"
  ]
 },
 {
  "isbn": "9780689711053",
  "title": "The Desert Is Theirs",
  "author": "Byrd Baylor",
  "ages": "5–9",
  "blurb": "How the Tohono O'odham people, animals and plants share the Sonoran Desert. Caldecott Honor for Peter Parnall's line art.",
  "regions": [
   "deserts"
  ]
 },
 {
  "isbn": "9780689806209",
  "title": "I'm in Charge of Celebrations",
  "author": "Byrd Baylor",
  "ages": "5–9",
  "blurb": "A girl in the Southwest desert keeps her own holidays: a triple rainbow, dust devils, a coyote looking back at her. Teaches noticing.",
  "regions": [
   "deserts"
  ]
 },
 {
  "isbn": "9780805082289",
  "title": "Cactus Hotel",
  "author": "Brenda Z. Guiberson",
  "ages": "4–8",
  "blurb": "A saguaro grows for 200 years in the Sonoran Desert; a Gila woodpecker, elf owl and many others move into its 'hotel' rooms.",
  "regions": [
   "deserts"
  ]
 },
 {
  "isbn": "9781584690528",
  "title": "Around One Cactus: Owls, Bats and Leaping Rats",
  "author": "Anthony D. Fredericks",
  "ages": "4–8",
  "blurb": "Who visits one saguaro cactus after dark? Owls, bats, kangaroo rats and more, in cumulative rhyme with field notes.",
  "regions": [
   "deserts"
  ]
 },
 {
  "isbn": "9780689869501",
  "title": "The Mighty Mississippi",
  "author": "Marion Dane Bauer",
  "ages": "4–7",
  "blurb": "An easy reader following the Mississippi from a trickle in Minnesota to the Gulf of Mexico — a first look at how rivers work.",
  "regions": [
   "central-hardwoods",
   "gulf-coast"
  ]
 },
 {
  "isbn": "9780142414637",
  "title": "Babies in the Bayou",
  "author": "Jim Arnosky",
  "ages": "2–5",
  "blurb": "Alligator, raccoon, turtle and duck mothers keep their babies close in the bayou. Simple, true and calm for toddlers.",
  "regions": [
   "gulf-coast"
  ]
 },
 {
  "isbn": "9780449810170",
  "title": "Over in the Wetlands: A Hurricane-on-the-Bayou Story",
  "author": "Caroline Starr Rose",
  "ages": "4–8",
  "blurb": "Louisiana wetland animals sense a hurricane coming, take shelter through the storm and come out to a changed bayou. Reassuring rather than scary.",
  "regions": [
   "gulf-coast"
  ]
 },
 {
  "isbn": "9780140501742",
  "title": "One Morning in Maine",
  "author": "Robert McCloskey",
  "ages": "3–7",
  "blurb": "Sal's first loose tooth on a Penobscot Bay morning: digging clams, showing a seal and a loon, the boat ride to Buck's Harbor. Caldecott Honor.",
  "regions": [
   "acadian-forest"
  ]
 },
 {
  "isbn": "9780140502015",
  "title": "Time of Wonder",
  "author": "Robert McCloskey",
  "ages": "4–8",
  "blurb": "A summer on an island in Penobscot Bay, from foggy mornings to a hurricane and the quiet after. Caldecott Medal.",
  "regions": [
   "acadian-forest"
  ]
 },
 {
  "isbn": "9780140505399",
  "title": "Miss Rumphius",
  "author": "Barbara Cooney",
  "ages": "4–8",
  "blurb": "The Lupine Lady scatters lupine seeds along the Maine coast to make the world more beautiful. Try it with a packet of seeds.",
  "regions": [
   "acadian-forest"
  ]
 },
 {
  "isbn": "9781608933013",
  "title": "Lobsterman",
  "author": "Dahlov Ipcar",
  "ages": "3–7",
  "blurb": "A Maine boy goes out with his father to haul lobster traps — buoys, bait, the harbour and the working coast, by a beloved Maine artist.",
  "regions": [
   "acadian-forest"
  ]
 },
 {
  "isbn": "9780884481713",
  "title": "Project Puffin: How We Brought Puffins Back to Egg Rock",
  "author": "Stephen W. Kress",
  "ages": "7–10",
  "blurb": "How a biologist brought Atlantic puffins back to a Maine island they had vanished from, using decoys and chicks from Newfoundland. A read-aloud for older kids.",
  "places": [
   "portland-maine"
  ],
  "regions": [
   "acadian-forest"
  ]
 },
 {
  "isbn": "9781771088886",
  "title": "The Snow Knows",
  "author": "Jennifer McGrath",
  "ages": "3–8",
  "blurb": "A night poem of winter woods by a New Brunswick author: follow footprints to rabbits, owls, lynx, coyotes and pheasants. Marilyn Baillie Picture Book Award winner.",
  "regions": [
   "acadian-forest"
  ]
 },
 {
  "isbn": "9780517709771",
  "title": "Baby Beluga",
  "author": "Raffi",
  "ages": "1–4",
  "blurb": "Raffi's song as a picture book: a beluga calf swimming with its mother through northern seas. For singing with the littlest ones.",
  "animals": [
   "boreal-forest",
   "boreal-north"
  ]
 },
 {
  "isbn": "9781250076366",
  "title": "Wolf in the Snow",
  "author": "Matthew Cordell",
  "ages": "3–7",
  "blurb": "A girl lost in a snowstorm carries a lost wolf pup back to its pack, and the wolves help her home. Nearly wordless; Caldecott Medal.",
  "animals": [
   "boreal-forest",
   "boreal-north",
   "great-lakes-st-lawrence",
   "pacific-maritime",
   "western-mountains"
  ]
 },
 {
  "isbn": "9781416900856",
  "title": "Monarch and Milkweed",
  "author": "Helen Frost",
  "ages": "3–7",
  "blurb": "A monarch and the milkweed it depends on, in alternating voices, from egg to migration. Plant milkweed afterwards.",
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "central-hardwoods",
   "deserts",
   "florida-peninsula",
   "great-lakes-st-lawrence",
   "great-plains",
   "gulf-coast",
   "mediterranean-california",
   "northeast-coast",
   "pacific-maritime",
   "southeastern",
   "western-mountains"
  ]
 },
 {
  "isbn": "9780385386524",
  "title": "Beaver Is Lost",
  "author": "Elisha Cooper",
  "ages": "2–5",
  "blurb": "A beaver drifts downriver on a log into a city and finds its way home to the pond. Almost wordless — great for toddlers to narrate.",
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "boreal-north",
   "central-hardwoods",
   "deserts",
   "great-lakes-st-lawrence",
   "great-plains",
   "gulf-coast",
   "mediterranean-california",
   "northeast-coast",
   "pacific-maritime",
   "southeastern",
   "western-mountains"
  ]
 },
 {
  "isbn": "9781550746679",
  "title": "Deer, Moose, Elk and Caribou",
  "author": "Deborah Hodge",
  "ages": "5–9",
  "blurb": "Kids Can Press wildlife book comparing North America's deer family — antlers, calves, food, where each lives — with clear illustrations.",
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "boreal-north",
   "central-hardwoods",
   "deserts",
   "florida-peninsula",
   "great-lakes-st-lawrence",
   "great-plains",
   "gulf-coast",
   "mediterranean-california",
   "northeast-coast",
   "pacific-maritime",
   "southeastern",
   "western-mountains"
  ]
 },
 {
  "isbn": "9781550743555",
  "title": "Bears: Polar Bears, Black Bears and Grizzly Bears",
  "author": "Deborah Hodge",
  "ages": "5–9",
  "blurb": "Canadian nonfiction comparing North America's three bears: size, food, dens, cubs and how to tell a black bear from a grizzly.",
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "boreal-north",
   "central-hardwoods",
   "florida-peninsula",
   "great-lakes-st-lawrence",
   "gulf-coast",
   "mediterranean-california",
   "northeast-coast",
   "pacific-maritime",
   "southeastern",
   "western-mountains"
  ]
 },
 {
  "isbn": "9780316324908",
  "title": "Finding Winnie: The True Story of the World's Most Famous Bear",
  "author": "Lindsay Mattick",
  "ages": "4–8",
  "blurb": "A Canadian vet buys a black bear cub at White River, Ontario, names her Winnipeg, and she inspires Winnie-the-Pooh. Caldecott Medal.",
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "boreal-north",
   "central-hardwoods",
   "florida-peninsula",
   "great-lakes-st-lawrence",
   "gulf-coast",
   "mediterranean-california",
   "northeast-coast",
   "pacific-maritime",
   "southeastern",
   "western-mountains"
  ]
 },
 {
  "isbn": "9781771471749",
  "title": "Moose, Goose, Animals on the Loose!",
  "author": "Geraldo Valério",
  "ages": "2–5",
  "blurb": "A Canadian wildlife ABC in bold collage, coast to coast to coast. Perfect first animal book for a two-year-old.",
  "cover": false,
  "animals": [
   "acadian-forest",
   "boreal-forest",
   "boreal-north",
   "great-lakes-st-lawrence",
   "great-plains",
   "western-mountains"
  ],
  "latMin": 40
 },
 {
  "isbn": "9780823442850",
  "title": "Honeybee: The Busy Life of Apis Mellifera",
  "author": "Candace Fleming",
  "ages": "4–8",
  "blurb": "One honeybee's whole life, job by job, from nurse to forager, with Eric Rohmann's huge close-up paintings and a fold-out spread.",
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "boreal-north",
   "central-hardwoods",
   "deserts",
   "florida-peninsula",
   "great-lakes-st-lawrence",
   "great-plains",
   "gulf-coast",
   "mediterranean-california",
   "northeast-coast",
   "pacific-maritime",
   "southeastern",
   "western-mountains"
  ]
 },
 {
  "isbn": "9781536205381",
  "title": "Hummingbird",
  "author": "Nicola Davies",
  "ages": "4–8",
  "blurb": "A grandmother and granddaughter follow a ruby-throated hummingbird's migration from Central America north to its summer home in Canada.",
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "central-hardwoods",
   "deserts",
   "florida-peninsula",
   "great-lakes-st-lawrence",
   "great-plains",
   "gulf-coast",
   "mediterranean-california",
   "northeast-coast",
   "pacific-maritime",
   "southeastern",
   "western-mountains"
  ]
 },
 {
  "isbn": "9781665980517",
  "title": "Squirrels Leap, Squirrels Sleep",
  "author": "April Pulley Sayre",
  "ages": "2–6",
  "blurb": "Grey, red, fox and flying squirrels through the year, in bouncy rhyme with Steve Jenkins's collages.",
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "boreal-north",
   "central-hardwoods",
   "deserts",
   "florida-peninsula",
   "great-lakes-st-lawrence",
   "great-plains",
   "gulf-coast",
   "mediterranean-california",
   "northeast-coast",
   "pacific-maritime",
   "southeastern",
   "western-mountains"
  ]
 },
 {
  "isbn": "9781665980531",
  "title": "Woodpecker Wham!",
  "author": "April Pulley Sayre",
  "ages": "2–6",
  "blurb": "North American woodpeckers drumming, drilling, feeding and nesting, in short rhyming lines with Steve Jenkins's cut paper.",
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "boreal-north",
   "central-hardwoods",
   "deserts",
   "florida-peninsula",
   "great-lakes-st-lawrence",
   "great-plains",
   "gulf-coast",
   "mediterranean-california",
   "northeast-coast",
   "pacific-maritime",
   "southeastern",
   "western-mountains"
  ]
 },
 {
  "isbn": "9780805071030",
  "title": "Honk, Honk, Goose! Canada Geese Start a Family",
  "author": "April Pulley Sayre",
  "ages": "3–7",
  "blurb": "A Canada goose pair chooses a nest site, incubates eggs and raises goslings. Take it to the nearest park pond in spring.",
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "boreal-north",
   "central-hardwoods",
   "deserts",
   "florida-peninsula",
   "great-lakes-st-lawrence",
   "great-plains",
   "gulf-coast",
   "mediterranean-california",
   "northeast-coast",
   "pacific-maritime",
   "southeastern",
   "western-mountains"
  ]
 },
 {
  "isbn": "9780544442900",
  "title": "Robins: How They Grow Up",
  "author": "Eileen Christelow",
  "ages": "4–8",
  "blurb": "Two robin nestlings from egg to independence, told in comic-style panels with real facts about nests, food and flying.",
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "boreal-north",
   "central-hardwoods",
   "deserts",
   "florida-peninsula",
   "great-lakes-st-lawrence",
   "great-plains",
   "gulf-coast",
   "mediterranean-california",
   "northeast-coast",
   "pacific-maritime",
   "southeastern",
   "western-mountains"
  ]
 },
 {
  "isbn": "9781536203240",
  "title": "Otters Love to Play",
  "author": "Jonathan London",
  "ages": "3–7",
  "blurb": "A river otter family digs a den, the pups learn to swim, and they slide down muddy and snowy banks. Painted by Meilo So.",
  "cover": false,
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "boreal-north",
   "central-hardwoods",
   "deserts",
   "florida-peninsula",
   "great-lakes-st-lawrence",
   "great-plains",
   "gulf-coast",
   "mediterranean-california",
   "northeast-coast",
   "pacific-maritime",
   "southeastern",
   "western-mountains"
  ]
 },
 {
  "isbn": "9781607276357",
  "title": "Chipmunk at Hollow Tree Lane",
  "author": "Victoria Sherrow",
  "ages": "3–6",
  "blurb": "A chipmunk gathers food and prepares her burrow for her babies. Smithsonian Backyard series, accurate and gentle.",
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "boreal-north",
   "central-hardwoods",
   "deserts",
   "great-lakes-st-lawrence",
   "great-plains",
   "mediterranean-california",
   "northeast-coast",
   "pacific-maritime",
   "southeastern",
   "western-mountains"
  ]
 },
 {
  "isbn": "9780689710551",
  "title": "Fireflies!",
  "author": "Julie Brinckloe",
  "ages": "3–7",
  "blurb": "A boy catches a jar of fireflies on a summer night, watches their light fade, and lets them go. A first lesson in watching without keeping.",
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "central-hardwoods",
   "florida-peninsula",
   "great-lakes-st-lawrence",
   "great-plains",
   "gulf-coast",
   "northeast-coast",
   "southeastern"
  ]
 },
 {
  "isbn": "9780064451994",
  "title": "Wiggling Worms at Work",
  "author": "Wendy Pfeffer",
  "ages": "4–7",
  "blurb": "How earthworms tunnel, eat and build garden soil, with a simple worm-farm activity. Let's-Read-and-Find-Out Science.",
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "boreal-north",
   "central-hardwoods",
   "deserts",
   "florida-peninsula",
   "great-lakes-st-lawrence",
   "great-plains",
   "gulf-coast",
   "mediterranean-california",
   "northeast-coast",
   "pacific-maritime",
   "southeastern",
   "western-mountains"
  ]
 },
 {
  "isbn": "9781772271850",
  "title": "A Walk on the Tundra",
  "author": "Rebecca Hainnu",
  "ages": "5–8",
  "blurb": "An Inuit girl walks the summer tundra with her grandmother learning Arctic plants and their uses, with a photo field guide at the back.",
  "regions": [
   "boreal-north"
  ]
 },
 {
  "isbn": "9780802796363",
  "title": "Arctic Lights, Arctic Nights",
  "author": "Debbie S. Miller",
  "ages": "5–9",
  "blurb": "Month by month around Fairbanks: how many hours of daylight, the temperature, and what the animals are doing, from midnight sun to deep-winter dark.",
  "places": [
   "fairbanks-alaska"
  ],
  "regions": [
   "boreal-north"
  ]
 },
 {
  "isbn": "9781101918968",
  "title": "A Northern Alphabet",
  "author": "Ted Harrison",
  "ages": "3–7",
  "blurb": "Ted Harrison's bold Yukon paintings, one letter per page, each naming real northern places and the people, animals and things found there.",
  "regions": [
   "boreal-north"
  ]
 },
 {
  "isbn": "9781927083499",
  "title": "Caribou Song",
  "author": "Tomson Highway",
  "ages": "4–8",
  "blurb": "Two Cree brothers follow the caribou herd across northern Manitoba, playing accordion and dancing to call them in. Bilingual Cree and English.",
  "regions": [
   "boreal-forest",
   "boreal-north"
  ]
 },
 {
  "isbn": "9781554988471",
  "title": "Me and You and the Red Canoe",
  "author": "Jean E. Pendziwol",
  "ages": "3–7",
  "blurb": "Two siblings paddle out from their campsite at dawn: a moose in the shallows, a beaver swimming home, an eagle's nest, and a trout for breakfast.",
  "regions": [
   "boreal-forest",
   "great-lakes-st-lawrence"
  ]
 },
 {
  "isbn": "9781554981380",
  "title": "Once Upon a Northern Night",
  "author": "Jean E. Pendziwol",
  "ages": "2–6",
  "blurb": "A lullaby for a snowy northern night: a deer and fawn, a great grey owl, snowshoe hares, a fox and a tiny mouse outside a sleeping child's window.",
  "regions": [
   "boreal-forest"
  ]
 },
 {
  "isbn": "9781554981243",
  "title": "Last Leaf First Snowflake to Fall",
  "author": "Leo Yerxa",
  "ages": "4–8",
  "blurb": "Ojibway artist Leo Yerxa follows a parent and child through the northern forest and across a pond as fall turns to winter, in layered paper collage.",
  "regions": [
   "boreal-forest"
  ]
 },
 {
  "isbn": "9781550745887",
  "title": "Morning on the Lake",
  "author": "Jan Bourdeau Waboose",
  "ages": "5–9",
  "blurb": "An Ojibway boy spends a day with his grandfather: loons on the lake at dawn, an eagle on the cliff at noon, a wolf pack passing at night.",
  "regions": [
   "boreal-forest"
  ]
 },
 {
  "isbn": "9781550746990",
  "title": "SkySisters",
  "author": "Jan Bourdeau Waboose",
  "ages": "5–8",
  "blurb": "Two Ojibway sisters walk across frozen northern Ontario on a winter night to see the northern lights, meeting a rabbit, a deer and howling coyotes.",
  "regions": [
   "boreal-forest"
  ]
 },
 {
  "isbn": "9781452136462",
  "title": "Over and Under the Snow",
  "author": "Kate Messner",
  "ages": "3–7",
  "blurb": "Skiing through the winter woods with her dad, a girl learns who lives in the hidden world under the snow — squirrels, snowshoe hares, sleeping bears, bullfrogs.",
  "regions": [
   "boreal-forest",
   "great-lakes-st-lawrence"
  ]
 },
 {
  "isbn": "9780544465077",
  "title": "Winter Bees & Other Poems of the Cold",
  "author": "Joyce Sidman",
  "ages": "5–9",
  "blurb": "Poems with linocuts about how northern animals get through winter — beavers in their lodge, a moose, honeybees clustering — each paired with a paragraph of real science.",
  "regions": [
   "boreal-forest",
   "great-lakes-st-lawrence"
  ]
 },
 {
  "isbn": "9780688149086",
  "title": "Sugarbush Spring",
  "author": "Marsha Wilson Chall",
  "ages": "4–8",
  "blurb": "A girl and her family tap maples, haul sap and boil it down during the late-winter thaw — sugaring season step by step.",
  "regions": [
   "great-lakes-st-lawrence"
  ]
 },
 {
  "isbn": "9781773062365",
  "title": "Loon",
  "author": "Susan Vande Griek",
  "ages": "3–7",
  "blurb": "Quiet, accurate nonfiction poem following a loon family on a northern Canadian lake, from spring arrival and nesting to the fall flight south.",
  "regions": [
   "boreal-forest",
   "great-lakes-st-lawrence"
  ],
  "animals": [
   "acadian-forest",
   "boreal-north",
   "northeast-coast",
   "western-mountains"
  ]
 },
 {
  "isbn": "9781772290158",
  "title": "Looking for Loons",
  "author": "Jennifer Lloyd",
  "ages": "3–6",
  "blurb": "At sunrise a boy takes binoculars onto the cottage porch to scan the misty lake for loons — a beaver slaps its tail, a canoe glides by.",
  "regions": [
   "boreal-forest",
   "great-lakes-st-lawrence"
  ],
  "animals": [
   "acadian-forest",
   "boreal-north",
   "northeast-coast",
   "western-mountains"
  ]
 },
 {
  "isbn": "9780802723611",
  "title": "Survival at 40 Below",
  "author": "Debbie S. Miller",
  "ages": "6–9",
  "blurb": "How animals get through an Alaskan Arctic winter — including the wood frog that freezes solid and thaws out in spring.",
  "regions": [
   "boreal-north"
  ]
 },
 {
  "isbn": "9781772271201",
  "title": "The Owl and the Lemming",
  "author": "Roselynn Akulukjuk",
  "ages": "3–7",
  "blurb": "An Inuit fable from Nunavut: a quick-thinking lemming talks its way out of a snowy owl's clutches. Talking animals, but real tundra predator and prey.",
  "regions": [
   "boreal-north"
  ],
  "animals": [
   "boreal-forest",
   "pacific-maritime",
   "western-mountains"
  ]
 },
 {
  "isbn": "9780142416433",
  "title": "Blueberries for Sal",
  "author": "Robert McCloskey",
  "ages": "2–6",
  "blurb": "On Blueberry Hill in Maine, Sal and a bear cub each wander off and follow the wrong mother. A gentle first look at black bears.",
  "cover": false,
  "regions": [
   "acadian-forest"
  ],
  "animals": [
   "boreal-forest",
   "great-lakes-st-lawrence",
   "northeast-coast"
  ]
 },
 {
  "isbn": "9781580894050",
  "title": "Here Come the Humpbacks!",
  "author": "April Pulley Sayre",
  "ages": "3–7",
  "blurb": "A humpback mother and calf migrate from the Caribbean to feeding grounds in the Gulf of Maine. Big-type story plus smaller facts per page.",
  "regions": [
   "acadian-forest",
   "northeast-coast"
  ]
 },
 {
  "isbn": "9780375845581",
  "title": "Pale Male: Citizen Hawk of New York City",
  "author": "Janet Schulman",
  "ages": "5–9",
  "blurb": "True story of the red-tailed hawk who nested on a Fifth Avenue building above Central Park — proof that wild things live in the biggest city.",
  "places": [
   "new-york-new-york"
  ],
  "regions": [
   "northeast-coast"
  ]
 },
 {
  "isbn": "9780399247996",
  "title": "Owl Moon",
  "author": "Jane Yolen",
  "ages": "3–7",
  "blurb": "A child and Pa go owling on a snowy winter night and call up a great horned owl. Caldecott Medal; teaches kids to be quiet in the woods.",
  "regions": [
   "great-lakes-st-lawrence",
   "northeast-coast"
  ],
  "animals": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "central-hardwoods",
   "great-plains",
   "southeastern"
  ]
 },
 {
  "isbn": "9781926569086",
  "title": "Uumajut: Learn About Arctic Wildlife!",
  "author": "Simon Awa",
  "ages": "4–8",
  "blurb": "Bilingual English–Inuktitut introduction to Arctic animals: siksik, ermine, wolf, muskox, eider duck, ringed and harp seals, and walrus.",
  "regions": [
   "boreal-north"
  ],
  "latMin": 60
 },
 {
  "isbn": "9781728242378",
  "title": "Over in the Arctic",
  "author": "Marianne Berkes",
  "ages": "2–6",
  "blurb": "A counting rhyme to the tune of 'Over in the Meadow' with Arctic mothers and babies, plus hidden animals and fact pages for older siblings.",
  "regions": [
   "boreal-north"
  ]
 },
 {
  "isbn": "9780763627591",
  "title": "Ice Bear: In the Steps of the Polar Bear",
  "author": "Nicola Davies",
  "ages": "4–8",
  "blurb": "A polar bear's year on the sea ice and tundra, told in two voices: a lyrical story and small-print facts. Hunting is shown without gore.",
  "regions": [
   "boreal-north"
  ]
 },
 {
  "isbn": "9781665952217",
  "title": "Eat Like a Bear",
  "author": "April Pulley Sayre",
  "ages": "3–7",
  "blurb": "A brown bear's year of eating, month by month, from spring dandelions to autumn berries, in Steve Jenkins's collage. Hunting happens off the page.",
  "cover": false,
  "regions": [
   "boreal-north",
   "western-mountains"
  ],
  "animals": [
   "pacific-maritime"
  ]
 },
 {
  "isbn": "9780824819613",
  "title": "Kōlea: The Story of the Pacific Golden Plover",
  "author": "Marion Coste",
  "ages": "5–9",
  "blurb": "The kōlea flies nonstop between its Alaskan nesting grounds and Hawaiian lawns and beaches every year — migration made local.",
  "regions": [
   "boreal-north"
  ]
 },
 {
  "isbn": "9780060212292",
  "title": "Everglades",
  "author": "Jean Craighead George",
  "ages": "5–9",
  "blurb": "A storyteller poles five children through the Everglades and tells how the river of grass formed and filled with life. Paintings by Wendell Minor.",
  "places": [
   "fort-lauderdale-florida",
   "miami-florida"
  ],
  "regions": [
   "florida-peninsula"
  ]
 },
 {
  "isbn": "9781584694700",
  "title": "The Swamp Where Gator Hides",
  "author": "Marianne Berkes",
  "ages": "3–7",
  "blurb": "A cumulative rhyme through an Everglades swamp — bobcat, egret, deer, bullfrog, turtle, duck — and an alligator whose lunch escapes.",
  "cover": false,
  "places": [
   "fort-lauderdale-florida",
   "miami-florida"
  ],
  "regions": [
   "florida-peninsula"
  ]
 },
 {
  "isbn": "9780816698028",
  "title": "Creekfinding: A True Story",
  "author": "Jacqueline Briggs Martin",
  "ages": "4–8",
  "blurb": "A man digs a buried creek back out of an Iowa farm field, and the plants, insects and brook trout return. Restoration kids can understand.",
  "regions": [
   "central-hardwoods"
  ]
 },
 {
  "isbn": "9781635926774",
  "title": "Cicadas! Strange and Wonderful",
  "author": "Laurence Pringle",
  "ages": "5–9",
  "blurb": "Everything about cicadas, including the periodical broods that emerge by the million every 13 or 17 years across the eastern states.",
  "cover": false,
  "regions": [
   "appalachian",
   "central-hardwoods",
   "northeast-coast"
  ]
 },
 {
  "isbn": "9780395175781",
  "title": "Minn of the Mississippi",
  "author": "Holling Clancy Holling",
  "ages": "7–10",
  "blurb": "A snapping turtle's journey from the Mississippi's source in Minnesota to the Gulf, with maps and margin drawings. Newbery Honor chapter-length read-aloud.",
  "regions": [
   "boreal-forest",
   "central-hardwoods",
   "gulf-coast"
  ],
  "animals": [
   "acadian-forest",
   "appalachian",
   "florida-peninsula",
   "great-lakes-st-lawrence",
   "great-plains",
   "southeastern",
   "western-mountains"
  ]
 },
 {
  "isbn": "9781590784631",
  "title": "Armadillo Trail",
  "author": "Stephen R. Swinburne",
  "ages": "5–9",
  "blurb": "A nine-banded armadillo's first year in Texas, and how the species has spread north and east across the southern states.",
  "cover": false,
  "regions": [
   "central-hardwoods",
   "great-plains",
   "gulf-coast"
  ],
  "animals": [
   "florida-peninsula",
   "southeastern"
  ],
  "latMax": 39
 },
 {
  "isbn": "9780977742356",
  "title": "Turtle Summer: A Journal for My Daughter",
  "author": "Mary Alice Monroe",
  "ages": "4–8",
  "blurb": "A photo journal of one summer on a South Carolina beach following loggerhead sea turtles from nest to hatchlings' dash to the ocean.",
  "regions": [
   "southeastern"
  ],
  "animals": [
   "florida-peninsula",
   "gulf-coast"
  ]
 },
 {
  "isbn": "9780976494300",
  "title": "Carolina's Story: Sea Turtles Get Sick Too!",
  "author": "Donna Rathmell",
  "ages": "4–8",
  "blurb": "True photo story of a sick loggerhead treated at the South Carolina Aquarium's sea turtle hospital and released back to the ocean.",
  "places": [
   "savannah-georgia"
  ],
  "regions": [
   "southeastern"
  ]
 },
 {
  "isbn": "9780977753956",
  "title": "At Home with the Gopher Tortoise",
  "author": "Madeleine Dunphy",
  "ages": "4–8",
  "blurb": "How one gopher tortoise's burrow in the southern longleaf pine woods shelters hundreds of other animals — the idea of a keystone species.",
  "regions": [
   "florida-peninsula",
   "gulf-coast",
   "southeastern"
  ],
  "animals": [
   "appalachian",
   "central-hardwoods",
   "great-plains",
   "northeast-coast"
  ]
 },
 {
  "isbn": "9781620143254",
  "title": "Prairie Dog Song: The Key to Saving North America's Grasslands",
  "author": "Susan L. Roth",
  "ages": "6–10",
  "blurb": "A cumulative song plus a nonfiction track explain how prairie dog towns hold the grassland together for bison, owls and ferrets. Collage art.",
  "regions": [
   "great-plains"
  ],
  "animals": [
   "western-mountains"
  ],
  "latMax": 50
 },
 {
  "isbn": "9780060082024",
  "title": "Luck: The Story of a Sandhill Crane",
  "author": "Jean Craighead George",
  "ages": "5–9",
  "blurb": "A young sandhill crane joins the huge spring gathering of cranes on Nebraska's Platte River. Paintings by Wendell Minor.",
  "regions": [
   "great-plains"
  ]
 },
 {
  "isbn": "9780618723416",
  "title": "Buffalo Music",
  "author": "Tracey Fern",
  "ages": "5–9",
  "blurb": "Based on Mary Ann Goodnight, who raised orphaned calves after hunters emptied the Texas plains of buffalo and helped save the herds.",
  "regions": [
   "great-plains"
  ],
  "animals": [
   "western-mountains"
  ]
 },
 {
  "isbn": "9781568990798",
  "title": "Manatee Winter",
  "author": "Kathleen Weidner Zoehfeld",
  "ages": "3–7",
  "blurb": "A manatee mother leads her calf from the Gulf of Mexico to a warm Florida spring for winter, past busy boat traffic. Smithsonian series.",
  "regions": [
   "florida-peninsula",
   "gulf-coast"
  ],
  "animals": [
   "southeastern"
  ],
  "latMax": 31
 },
 {
  "isbn": "9780590467896",
  "title": "All About Alligators",
  "author": "Jim Arnosky",
  "ages": "4–8",
  "blurb": "Naturalist Jim Arnosky answers kids' questions about American alligators — nests, babies, basking, teeth — with close-up paintings.",
  "regions": [
   "florida-peninsula",
   "gulf-coast",
   "southeastern"
  ]
 },
 {
  "isbn": "9781553651635",
  "title": "Salmon Forest",
  "author": "David Suzuki",
  "ages": "5–9",
  "blurb": "Walking a BC coastal rainforest with her father, Kate learns how spawning salmon feed the bears, eagles and giant trees.",
  "regions": [
   "pacific-maritime"
  ]
 },
 {
  "isbn": "9781552855218",
  "title": "A Pacific Alphabet",
  "author": "Margriet Ruurs",
  "ages": "3–7",
  "blurb": "The British Columbia coast from A to Z — tide pools, rainforest, marine life and harbours — in bright, busy paintings.",
  "regions": [
   "pacific-maritime"
  ]
 },
 {
  "isbn": "9781250062697",
  "title": "Redwoods",
  "author": "Jason Chin",
  "ages": "5–9",
  "blurb": "A boy opens a book about redwoods on the subway and finds himself in a real coast-redwood forest, climbing into the canopy. Solid facts inside a gentle story.",
  "regions": [
   "mediterranean-california",
   "pacific-maritime"
  ]
 },
 {
  "isbn": "9780689711404",
  "title": "Song of the Swallows",
  "author": "Leo Politi",
  "ages": "4–8",
  "blurb": "Juan and the old gardener wait for the swallows to return to Mission San Juan Capistrano each spring. Caldecott Medal.",
  "regions": [
   "mediterranean-california"
  ]
 },
 {
  "isbn": "9781584690382",
  "title": "In One Tidepool: Crabs, Snails and Salty Tails",
  "author": "Anthony D. Fredericks",
  "ages": "4–8",
  "blurb": "A cumulative rhyme about the animals living in one Pacific tide pool, with field notes for the next low-tide visit.",
  "regions": [
   "mediterranean-california",
   "pacific-maritime"
  ]
 },
 {
  "isbn": "9781553797760",
  "title": "The Grizzly Mother",
  "author": "Brett D. Huson",
  "ages": "7–10",
  "blurb": "A grizzly mother's year raising cubs in Gitxsan territory, tied to the Gitxsan seasonal calendar and the salmon runs. From the Mothers of Xsan series.",
  "regions": [
   "pacific-maritime",
   "western-mountains"
  ]
 },
 {
  "isbn": "9781797206219",
  "title": "Over and Under the Waves",
  "author": "Kate Messner",
  "ages": "4–9",
  "blurb": "Paddleboarding on Monterey Bay, a child sees humpbacks, pelicans and sea otters above, and the kelp forest below.",
  "places": [
   "san-jose-california"
  ],
  "regions": [
   "mediterranean-california"
  ]
 },
 {
  "isbn": "9781611720174",
  "title": "Humphrey the Lost Whale: A True Story",
  "author": "Wendy Tokuda",
  "ages": "4–8",
  "blurb": "In 1985 a humpback swam through San Francisco Bay and up the Sacramento River; people guided him back to the Pacific.",
  "places": [
   "sacramento-california",
   "san-jose-california"
  ],
  "regions": [
   "mediterranean-california"
  ]
 },
 {
  "isbn": "9781550176940",
  "title": "Orca Chief",
  "author": "Roy Henry Vickers",
  "ages": "5–9",
  "blurb": "A Ts'msyen story from the BC coast: hunters who disrespect the sea are taught by Orca Chief. A legend, but rooted in real coastal ecology.",
  "regions": [
   "pacific-maritime"
  ],
  "animals": [
   "mediterranean-california"
  ]
 },
 {
  "isbn": "9781554983926",
  "title": "A Salmon for Simon",
  "author": "Betty Waterton",
  "ages": "3–7",
  "blurb": "On the BC coast, an eagle drops a salmon into Simon's clam hole, and he digs a channel to the sea to set it free. A Canadian classic.",
  "regions": [
   "pacific-maritime"
  ],
  "animals": [
   "boreal-north",
   "western-mountains"
  ]
 },
 {
  "isbn": "9780152023256",
  "title": "Hummingbird Nest: A Journal of Poems",
  "author": "Kristine O'Connell George",
  "ages": "5–9",
  "blurb": "Poems from the spring a hummingbird built her nest in a potted tree on the author's California patio, from egg to fledgling. Barry Moser paintings.",
  "regions": [
   "mediterranean-california"
  ],
  "animals": [
   "deserts",
   "pacific-maritime",
   "western-mountains"
  ]
 },
 {
  "isbn": "9781512426311",
  "title": "Sea Otter Heroes: The Predators That Saved an Ecosystem",
  "author": "Patricia Newman",
  "ages": "7–10",
  "blurb": "A scientist discovers why seagrass is thriving in California's Elkhorn Slough: sea otters. Sibert Honor photo-nonfiction for older kids.",
  "places": [
   "san-jose-california"
  ],
  "regions": [
   "mediterranean-california"
  ]
 },
 {
  "isbn": "9781553797395",
  "title": "The Sockeye Mother",
  "author": "Brett D. Huson",
  "ages": "7–10",
  "blurb": "A sockeye salmon's life cycle in the Skeena River watershed, and how its return feeds the land and the Gitxsan people through the seasons.",
  "regions": [
   "pacific-maritime"
  ]
 },
 {
  "isbn": "9780439560672",
  "title": "Whales Passing",
  "author": "Eve Bunting",
  "ages": "3–7",
  "blurb": "A boy and his father watch a pod of orcas pass along the Pacific shore and imagine what the whales say to each other.",
  "regions": [
   "pacific-maritime"
  ],
  "animals": [
   "mediterranean-california"
  ]
 },
 {
  "isbn": "9780688166144",
  "title": "Dig, Wait, Listen: A Desert Toad's Tale",
  "author": "April Pulley Sayre",
  "ages": "3–7",
  "blurb": "A spadefoot toad waits underground through the dry season and digs out when summer rain finally drums on the desert.",
  "regions": [
   "deserts"
  ],
  "animals": [
   "great-plains",
   "mediterranean-california",
   "western-mountains"
  ]
 }
];

// What each shop says about where its money goes (its own words, shortened).
const JGI_NOTE = "The Institute's shop says its proceeds fund the Jane Goodall Institute's wildlife conservation, community-led conservation and Roots & Shoots education work.";
const JANE_AND_ME_NOTE = "The shop says a portion of the proceeds from this book goes to the Jane Goodall Institute.";
const XERCES_NOTE = "Sent as the thank-you for a donation to the Xerces Society, which also brings a year of member benefits.";
const RSPB_NOTE = "All distributable profits from the RSPB's trading company are paid to the RSPB.";
const WOODLAND_NOTE = "Every purchase helps the Woodland Trust protect, restore and create woodland habitats.";
const WWF_UK_NOTE = "WWF says 100% of its shop's profits go to WWF.";
const NT_NOTE = "The National Trust says every sale helps it care for nature and the places in its care.";
const NABU_NOTE = "The NABU shop says every purchase supports NABU.";
const BIRDLIFE_ZA_NOTE = "The shop says every purchase helps BirdLife South Africa conserve the country's birds and their habitats.";

// The Jane Goodall Institute's US shop cannot ship to the UK, and adoptions only within the US.
const JGI_SHOP = ["US", "CA"];

/** Books sold by the organisations themselves, checked on their shop pages on 2026-10-22. */
const SUPPORTED: Book[] = [
  // Jane Goodall Institute (USA): Good for All Goods
  {
    isbn: "9780316045469",
    title: "Me . . . Jane",
    author: "Patrick McDonnell",
    ages: "4–8",
    blurb: "The young Jane Goodall watches the birds and animals around her home with her toy chimpanzee, Jubilee, and dreams of living with animals in Africa. A Caldecott Honor book.",
    cover: false,
    everywhere: true,
    supports: { org: "jane-goodall-institute", url: "https://shop.janegoodall.org/product/Me-Jane/JGI101", note: JGI_NOTE, countries: JGI_SHOP },
  },
  {
    isbn: "9780671562717",
    title: "My Life with the Chimpanzees",
    author: "Jane Goodall",
    ages: "8–12",
    blurb: "Jane Goodall's own account, written for young readers, of going into the forest at Gombe in Tanzania at twenty-six and coming to know a community of wild chimpanzees.",
    cover: false,
    everywhere: true,
    supports: { org: "jane-goodall-institute", url: "https://shop.janegoodall.org/product/My-Life-With-The-Chipanzees/JGI111", note: JGI_NOTE, countries: JGI_SHOP },
  },
  {
    isbn: "9781684811779",
    title: "Jane's Endangered Animal Guide",
    author: "J.J. Johnson",
    ages: "7–10",
    blurb: "Ten endangered animals: how each lives and what it eats, what threatens it, what is being done to help it, and what readers can do.",
    cover: false,
    everywhere: true,
    supports: { org: "jane-goodall-institute", url: "https://shop.janegoodall.org/product/janes-endangered-animal-guide/jgi478", note: JGI_NOTE, countries: JGI_SHOP },
  },
  {
    isbn: "9781646380763",
    title: "Jane & Me: Where's Jane?",
    author: "Jaye Garnett",
    ages: "2–5",
    blurb: "A search-and-find board book set in the forest at Gombe: find Jane's camp and her chimpanzees, then the leopards, baboons, monkeys and hippos she met there, counting as you go.",
    cover: false,
    everywhere: true,
    supports: { org: "jane-goodall-institute", url: "https://shop.janegoodall.org/product/jane-and-me-wheres-jane/jgi301", note: JANE_AND_ME_NOTE, countries: JGI_SHOP },
  },
  {
    isbn: "9781646380732",
    title: "Jane & Me: Chimpanzees",
    author: "Jaye Garnett",
    ages: "0–3",
    blurb: "A lift-the-flap board book that follows Flo and Fifi, two of the Gombe chimpanzees Jane Goodall knew: what they eat, how they groom and how they raise their babies.",
    cover: false,
    everywhere: true,
    supports: { org: "jane-goodall-institute", url: "https://shop.janegoodall.org/product/jane-and-me-chimpanzees/jgi299", note: JANE_AND_ME_NOTE, countries: JGI_SHOP },
  },
  {
    isbn: "9781646380701",
    title: "Jane & Me: Care",
    author: "Jaye Garnett",
    ages: "0–3",
    blurb: "A board book of the ways African animals look after their young, from giraffes and elephants to cheetahs, zebras and meerkats.",
    cover: false,
    everywhere: true,
    supports: { org: "jane-goodall-institute", url: "https://shop.janegoodall.org/product/jane-and-me-care-/jgi297", note: JANE_AND_ME_NOTE, countries: JGI_SHOP },
  },
  // Xerces Society: books are the thank-you for a donation at its Gift Center
  {
    isbn: "9781612127019",
    title: "100 Plants to Feed the Bees",
    author: "The Xerces Society",
    ages: "Grown-ups",
    blurb: "Profiles of a hundred flowers, herbs, shrubs and trees that feed bees, butterflies, moths and hummingbirds, for anyone with a yard, a field edge or a window box.",
    cover: false,
    everywhere: true,
    supports: { org: "xerces-society", url: "https://gifts.xerces.org/collections/books/products/100-plants-to-feed-the-bees-donation", note: XERCES_NOTE },
  },
  {
    isbn: "9781635862744",
    title: "100 Plants to Feed the Monarch",
    author: "The Xerces Society",
    ages: "Grown-ups",
    blurb: "The monarch's life cycle, its migration and its need for milkweed, with profiles of the milkweeds and nectar plants that carry it through the year and plans for a monarch garden.",
    cover: false,
    everywhere: true,
    supports: { org: "xerces-society", url: "https://gifts.xerces.org/products/100-plants-to-feed-the-monarch", note: XERCES_NOTE },
  },
  // Ontario Turtle Conservation Centre
  {
    isbn: "9780228105176",
    title: "Saving Turtles: A Kid's Guide to Helping Endangered Creatures",
    author: "Sue Carstairs",
    ages: "9–12",
    blurb: "Inside Ontario's turtle hospital with its medical director: how injured turtles are found, their shells mended and the animals released, and what to do if you find one hurt.",
    cover: false,
    regions: ["great-lakes-st-lawrence", "boreal-forest"],
    everywhere: true,
    supports: { org: "ontario-turtle-conservation-centre", url: "https://ontarioturtle.ca/product/saving-turtles-2nd-ed/" },
  },
  // RSPB
  {
    isbn: "9780713676785",
    title: "My First Book of Garden Birds",
    author: "Mike Unwin and Sarah Whittley",
    ages: "4–8",
    blurb: "Twenty of the commonest garden birds in Britain, painted large, so that children can learn to tell them apart from the window.",
    cover: false,
    everywhere: true,
    bookshop: false,
    supports: { org: "rspb", url: "https://shopping.rspb.org.uk/books-stationery/children-books/my-first-book-of-garden-birds.html", note: RSPB_NOTE },
  },
  {
    isbn: "9781838742065",
    title: "What Makes a Bird?",
    author: "Nadeem Perera",
    ages: "5–9",
    blurb: "Beaks, feathers, nests and migration, with birds from all over the world, ending with how to start watching birds yourself.",
    cover: false,
    everywhere: true,
    supports: { org: "rspb", url: "https://shopping.rspb.org.uk/books-stationery/children-books/what-makes-a-bird-illustrated-guide.html", note: RSPB_NOTE },
  },
  {
    isbn: "9781526671219",
    title: "RSPB Birdie Loves Colours",
    author: "RSPB",
    ages: "0–3",
    blurb: "A lift-the-flap board book in rhyme: follow Birdie and spot a red squirrel, a green frog and a grey seal.",
    cover: false,
    everywhere: true,
    bookshop: false,
    supports: { org: "rspb", url: "https://shopping.rspb.org.uk/books-stationery/children-books/rspb-birdie-loves-colours.html", note: RSPB_NOTE },
  },
  // Woodland Trust
  {
    isbn: "woodland-trust:the-oak-tree-paperback",
    title: "The Oak Tree",
    author: "Julia Donaldson",
    ages: "2–6",
    blurb: "A thousand years in the life of one oak, told in rhyme, with the people and animals around it as the seasons turn, and facts about oaks at the back.",
    cover: false,
    everywhere: true,
    supports: { org: "woodland-trust", url: "https://shop.woodlandtrust.org.uk/the-oak-tree-paperback", note: WOODLAND_NOTE },
  },
  {
    isbn: "9780500652701",
    title: "Mouse's Wood",
    author: "Alice Melvin",
    ages: "2–5",
    blurb: "Mouse visits his woodland friends through the year, and each visit shows how the wood and its animals change with the seasons.",
    cover: false,
    everywhere: true,
    supports: { org: "woodland-trust", url: "https://shop.woodlandtrust.org.uk/mouses-wood-board", note: WOODLAND_NOTE },
  },
  {
    isbn: "9780711280526",
    title: "21 Things to Do with a Tree",
    author: "Jane Wilsher",
    ages: "5+",
    blurb: "Twenty-one outdoor games and activities for getting to know the trees in your local wood.",
    cover: false,
    everywhere: true,
    bookshop: false,
    supports: { org: "woodland-trust", url: "https://shop.woodlandtrust.org.uk/21-things-to-do-with-a-tree-paperback", note: WOODLAND_NOTE },
  },
  {
    isbn: "9781915569738",
    title: "How to Grow a Garden",
    author: "Frances Tophill and Charlotte Ager",
    ages: "7+",
    blurb: "Activities for every season from a horticulturalist and television presenter: growing vegetables, making room for wildlife and looking after the planet from your own patch.",
    cover: false,
    everywhere: true,
    bookshop: false,
    supports: { org: "woodland-trust", url: "https://shop.woodlandtrust.org.uk/how-to-grow-a-garden-hardback", note: WOODLAND_NOTE },
  },
  {
    isbn: "9781838365189",
    title: "My Nature Trail",
    author: "Rachel and Paul Lawston",
    ages: "3+",
    blurb: "Nature activities for every season: a hedgehog feeding station, a close look at leaves and clouds, a dam in a stream.",
    cover: false,
    everywhere: true,
    supports: { org: "woodland-trust", url: "https://shop.woodlandtrust.org.uk/my-nature-trail", note: WOODLAND_NOTE },
  },
  // WWF-UK
  {
    isbn: "9781405299886",
    title: "Where's the Tiger?",
    author: "Farshore, with WWF",
    ages: "All ages",
    blurb: "Find twelve endangered animals hidden in their homes, from the tiger in the rainforests of Sumatra to the blue whale in the Antarctic, and read why each needs help.",
    cover: false,
    everywhere: true,
    supports: { org: "wwf-uk", url: "https://shop.wwf.org.uk/products/wheres-the-tiger-search-and-find-book", note: WWF_UK_NOTE },
  },
  // National Trust
  {
    isbn: "9781839941757",
    title: "Ben Plants a Butterfly Garden",
    author: "Kate Petty and Axel Scheffler",
    ages: "2–5",
    blurb: "With help from Worm and Ladybird, Ben grows a garden for butterflies; flaps and pop-ups show how the plants and the butterflies grow.",
    cover: false,
    everywhere: true,
    bookshop: false,
    supports: { org: "national-trust", url: "https://shop.nationaltrust.org.uk/ben-plants-a-butterfly-garden-hardback.html", note: NT_NOTE },
  },
  // LPO (France): the shop gives no ISBNs, so these carry its product references
  {
    isbn: "lpo:EN1720",
    title: "Les p'tits renards",
    author: "Claire Lecœuvre and Chloé du Colombier",
    ages: "3+",
    blurb: "A picture book in French about the red fox: how it hunts by ear and by nose, what it eats, and how its cubs grow up through the year.",
    cover: false,
    everywhere: true,
    supports: { org: "lpo", url: "https://boutique.lpo.fr/produit/EN1720" },
  },
  {
    isbn: "lpo:EN1722",
    title: "Les p'tits voyageurs",
    author: "Chloé du Colombier",
    ages: "3+",
    blurb: "A picture book in French about migrating birds: swallows in their thousands, greylag geese in a V and the cuckoo alone, south in autumn and home in spring.",
    cover: false,
    everywhere: true,
    supports: { org: "lpo", url: "https://boutique.lpo.fr/produit/EN1722" },
  },
  {
    isbn: "lpo:EN1699",
    title: "Corvidés",
    author: "Timothée Cantard and Louise Gouet",
    ages: "6+",
    blurb: "A book in French about crows, magpies, jays and jackdaws, and the things they can do: solve problems, nest in buildings and recognise human faces.",
    cover: false,
    everywhere: true,
    supports: { org: "lpo", url: "https://boutique.lpo.fr/produit/EN1699" },
  },
  // NABU (Germany)
  {
    isbn: "9783440175750",
    title: "Was lebt im Wald? Kindernaturführer",
    author: "Holger Haag",
    ages: "Children",
    blurb: "A children's field guide in German to 85 animals and plants of the forest, grouped as birds, insects, mammals, trees, flowers and fungi, with things to make and try.",
    cover: false,
    everywhere: true,
    bookshop: false,
    supports: { org: "nabu", url: "https://www.nabu-shop.de/was-lebt-im-wald-kindernaturfuhrer-3-auflage", note: NABU_NOTE },
  },
  {
    isbn: "9783866592940",
    title: "Finns Abenteuer mit dem Stieglitz",
    author: "Klaus Ruge",
    ages: "Children",
    blurb: "A story in German, written with NABU: two children find songbird traps in the undergrowth and set out to save an injured goldfinch.",
    cover: false,
    everywhere: true,
    bookshop: false,
    supports: { org: "nabu", url: "https://www.nabu-shop.de/finns-abenteuer-mit-dem-stieglitz", note: NABU_NOTE },
  },
  // BirdLife South Africa: the shop gives no ISBNs, so these carry its product references
  {
    isbn: "birdlife-south-africa:run-until-you-can-fly",
    title: "Run Until You Can Fly",
    author: "Brenda Daniels",
    ages: "5–8",
    blurb: "Saro, a Critically Endangered White-winged Flufftail, sets out across his wetland to learn to fly, with an otter and a crane for company, and children learn what they can do for wetlands.",
    cover: false,
    everywhere: true,
    supports: { org: "birdlife-south-africa", url: "https://shop.birdlife.org.za/product/run-until-you-can-fly/", note: BIRDLIFE_ZA_NOTE },
  },
  {
    isbn: "birdlife-south-africa:the-twins-south-african-bird-tour",
    title: "The Twins' South African Bird Tour",
    author: "Andrew de Blocq",
    ages: "6–10",
    blurb: "Twins Nandipha and Andile travel from Johannesburg to the Drakensberg and beyond, meeting birds and the stories South Africa's peoples tell about them, from the lightning bird to the Blue Crane.",
    cover: false,
    everywhere: true,
    supports: { org: "birdlife-south-africa", url: "https://shop.birdlife.org.za/product/the-twins-south-african-bird-tour/", note: BIRDLIFE_ZA_NOTE },
  },
  {
    isbn: "birdlife-south-africa:piffy-and-zenzy-go-birding",
    title: "Piffy and Zenzy Go Birding",
    author: "Kirsty Kyle",
    ages: "9–12",
    blurb: "Two poodles go along on a birding day and learn how wetlands form, how they clean water and which birds live in them, on the trail of a threatened bird few people have seen.",
    cover: false,
    everywhere: true,
    supports: { org: "birdlife-south-africa", url: "https://shop.birdlife.org.za/product/piffy-and-zenzy-go-birding/", note: BIRDLIFE_ZA_NOTE },
  },
  // Nature Kenya
  {
    isbn: "9781485900344",
    title: "How Cheetah Got His Tears",
    author: "Avril van der Merwe",
    ages: "3–5",
    blurb: "Cheetah boasts that he is fast enough to outrun the wind, and loses; the dark tear marks on his face have reminded him ever since.",
    cover: false,
    everywhere: true,
    supports: { org: "nature-kenya", url: "https://naturekenya.org/shop/how-cheetah-got-his-tears/" },
  },
];

// Every selling organisation must be in the conservation library. Until the data
// agents have added them all, a missing one is a warning and its books stay off
// the shelves (src/lib/books.ts skips them); switch this to a throw once complete.
const missing = [...new Set(SUPPORTED.map((b) => b.supports!.org).filter((slug) => !orgBySlug(slug)))];
if (missing.length) console.warn(`books: selling organisations not yet in the conservation library: ${missing.join(", ")}`);

const seenIsbn = new Set<string>();
for (const b of [...PICTURE_BOOKS, ...SUPPORTED]) {
  if (seenIsbn.has(b.isbn)) throw new Error(`books: duplicate isbn "${b.isbn}"`);
  seenIsbn.add(b.isbn);
}

/** Every book: the picture books, then the ones sold by organisations. */
export const BOOKS: Book[] = [...PICTURE_BOOKS, ...SUPPORTED];
