/**
 * The children's short films on /resources/<town> ("Videos"): 72 films from
 * parks services, museums and nature organisations.
 *
 * KID_VIDEOS are the VideoCard props captured on the 264 /resources pages
 * (the per-page `why` — "here", "region" or "animal" — removed; it is what
 * kidVideosFor returns), in an order consistent with every page. The live
 * animal ranges behind "Animals that live near you" are not visible; KID_ANIMAL_RANGES was read
 * back from where each animal's films appear (latitude cut-offs are round
 * values inside the observed gap). kidVideosFor reproduces 97 of the 101
 * captured pages that list films (the 163 outside North America list none);
 * the four boreal-north towns (Fairbanks, Whitehorse, Yellowknife, Thompson)
 * live omit "Parka and the Bison" from the animal films for a reason the
 * captures do not show.
 */

export type KidVideo = {
  id: string;
  title: string;
  channel: string;
  minutes?: number;
  ages: string;
  kind: "place" | "nature" | "animal";
  regions: string[];
  animals: string[];
  /** A film about a particular place: "About right here" within `km` of it. */
  near?: { label: string; lat: number; lon: number; km: number };
  /** A live camera. */
  live?: boolean;
  note: string;
};

export const KID_VIDEOS: KidVideo[] = [
 {
  "id": "KZMiPpAMlKI",
  "title": "Welcome to Gatineau Park",
  "channel": "National Capital Commission",
  "ages": "2–8",
  "kind": "place",
  "regions": [
   "great-lakes-st-lawrence"
  ],
  "animals": [],
  "near": {
   "label": "Gatineau Park",
   "lat": 45.6,
   "lon": -75.9,
   "km": 60
  },
  "note": "The NCC's welcome film for Gatineau Park, 15 minutes from downtown Ottawa–Gatineau: lakes, forest trails, beaches and campsites a family can visit this weekend."
 },
 {
  "id": "OF2VTTXsyW0",
  "title": "Fall Rhapsody in Gatineau Park",
  "channel": "National Capital Commission",
  "ages": "2–8",
  "kind": "nature",
  "regions": [
   "great-lakes-st-lawrence"
  ],
  "animals": [],
  "near": {
   "label": "Gatineau Park",
   "lat": 45.6,
   "lon": -75.9,
   "km": 60
  },
  "note": "An NCC naturalist explains why Gatineau Park's leaves turn red and gold and then fall — a real-place answer to the autumn question every preschooler asks."
 },
 {
  "id": "Bp6hGDO_LO4",
  "title": "Rideau Canal: Where History and Nature Flow Together | Parks Canada",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "place",
  "regions": [
   "great-lakes-st-lawrence"
  ],
  "animals": [],
  "near": {
   "label": "Rideau Canal (Ottawa–Kingston)",
   "lat": 44.9,
   "lon": -75.95,
   "km": 120
  },
  "note": "Parks Canada's look at the Rideau Canal, the Ottawa-to-Kingston waterway where locks and history sit alongside lakes, wetlands and wildlife."
 },
 {
  "id": "GRdKYba75Kw",
  "title": "Fall Colors Arrive As Blue Jays And Woodpeckers Forage At Cornell Feeders",
  "channel": "Cornell Lab Bird Cams",
  "ages": "2–8",
  "kind": "nature",
  "regions": [
   "great-lakes-st-lawrence"
  ],
  "animals": [
   "blue-jay",
   "woodpecker"
  ],
  "near": {
   "label": "Ithaca, New York",
   "lat": 42.48,
   "lon": -76.45,
   "km": 80
  },
  "note": "Blue Jays and woodpeckers feed against bright autumn leaves at the Cornell Lab's Sapsucker Woods feeders in Ithaca, New York — easy birds for small children to name."
 },
 {
  "id": "PJ6SSI5cRag",
  "title": "Monarch Migration at Point Pelee",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "great-lakes-st-lawrence"
  ],
  "animals": [
   "monarch"
  ],
  "near": {
   "label": "Point Pelee National Park",
   "lat": 41.96,
   "lon": -82.52,
   "km": 80
  },
  "note": "Monarch butterflies gather at Point Pelee, Canada's southernmost mainland tip, before crossing Lake Erie on their long autumn flight to Mexico."
 },
 {
  "id": "YMEXUDgL4Os",
  "title": "Apprenti garde-parc... sur les traces de l'orignal - Parc national de la Jacques-Cartier - Sépaq",
  "channel": "Réseau Sépaq",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "boreal-forest",
   "great-lakes-st-lawrence"
  ],
  "animals": [
   "moose"
  ],
  "near": {
   "label": "Parc national de la Jacques-Cartier",
   "lat": 47.3,
   "lon": -71.4,
   "km": 80
  },
  "note": "In French: an 'apprenti garde-parc' (apprentice ranger) episode following the tracks of a moose in Parc national de la Jacques-Cartier, north of Québec City."
 },
 {
  "id": "fTGKS1yEJCo",
  "title": "The Common Loon (60 seconds)",
  "channel": "Hinterland Who's Who / Faune et flore du pays",
  "minutes": 1,
  "ages": "2–8",
  "kind": "animal",
  "regions": [],
  "animals": [
   "loon"
  ],
  "note": "The classic one-minute Hinterland Who's Who on the common loon, whose haunting call is the sound of summer evenings on northern lakes."
 },
 {
  "id": "2eVc8VjKWaE",
  "title": "The Beaver",
  "channel": "Hinterland Who's Who / Faune et flore du pays",
  "ages": "2–8",
  "kind": "animal",
  "regions": [],
  "animals": [
   "beaver"
  ],
  "note": "Hinterland Who's Who on the beaver, Canada's national animal and master builder of dams and lodges, in the calm narrated style kids can watch again and again."
 },
 {
  "id": "aHs_3oirtRc",
  "title": "Bald Eagle (Youth)",
  "channel": "Hinterland Who's Who / Faune et flore du pays",
  "ages": "2–8",
  "kind": "animal",
  "regions": [],
  "animals": [
   "bald-eagle"
  ],
  "note": "The youth version of Hinterland Who's Who's bald eagle, made for children: the big white-headed fish-eating bird found along lakes and rivers across Canada."
 },
 {
  "id": "EUd9vtS9yMI",
  "title": "The Canada Goose",
  "channel": "Hinterland Who's Who / Faune et flore du pays",
  "ages": "2–8",
  "kind": "animal",
  "regions": [],
  "animals": [
   "canada-goose"
  ],
  "note": "Hinterland Who's Who on the Canada goose — the honking V overhead every spring and fall, and the geese kids meet in every park."
 },
 {
  "id": "2vGjJUncYPA",
  "title": "The Black-Capped Chickadee (60 seconds)",
  "channel": "Hinterland Who's Who / Faune et flore du pays",
  "minutes": 1,
  "ages": "2–8",
  "kind": "animal",
  "regions": [],
  "animals": [
   "chickadee"
  ],
  "note": "One-minute Hinterland Who's Who on the black-capped chickadee, the friendly 'chick-a-dee-dee-dee' bird that stays all winter at backyard feeders."
 },
 {
  "id": "4bZL1qgfeLM",
  "title": "The Ruby-throated Hummingbird (60 seconds)",
  "channel": "Hinterland Who's Who / Faune et flore du pays",
  "minutes": 1,
  "ages": "2–8",
  "kind": "animal",
  "regions": [],
  "animals": [
   "hummingbird"
  ],
  "note": "One-minute Hinterland Who's Who on the ruby-throated hummingbird, the only hummingbird that nests in eastern Canada — watch for it at summer flowers."
 },
 {
  "id": "wi0yrg4rmP4",
  "title": "Minute Out In It: Bright Angel Creek - Fall",
  "channel": "GrandCanyonNPS",
  "minutes": 1,
  "ages": "2–8",
  "kind": "nature",
  "regions": [
   "deserts"
  ],
  "animals": [],
  "near": {
   "label": "Grand Canyon (Phantom Ranch)",
   "lat": 36.1,
   "lon": -112.09,
   "km": 120
  },
  "note": "One quiet minute beside Bright Angel Creek at the bottom of the Grand Canyon, with golden cottonwood leaves in fall — a restful look at a desert river."
 },
 {
  "id": "LjqtfzeQ0nI",
  "title": "Water and Wind",
  "channel": "White Sands National Park",
  "ages": "2–8",
  "kind": "nature",
  "regions": [
   "deserts"
  ],
  "animals": [],
  "near": {
   "label": "White Sands National Park",
   "lat": 32.78,
   "lon": -106.17,
   "km": 100
  },
  "note": "White Sands National Park explains how water and wind build its brilliant white gypsum dunes in New Mexico's Chihuahuan Desert — geology children can see."
 },
 {
  "id": "TGBFkp_4kHI",
  "title": "The Saguaro, Hub of the Sonoran Desert - Video Series Episode 1",
  "channel": "Tucson Bird Alliance",
  "ages": "2–8",
  "kind": "nature",
  "regions": [
   "deserts"
  ],
  "animals": [],
  "note": "Tucson Bird Alliance's first episode on the giant saguaro cactus and the birds and animals of the Sonoran Desert that depend on it."
 },
 {
  "id": "ZbgrIgSJSOM",
  "title": "Fall Hummingbird Migration In Full Swing In West Texas",
  "channel": "Cornell Lab Bird Cams",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "deserts"
  ],
  "animals": [
   "hummingbird"
  ],
  "near": {
   "label": "West Texas (Fort Davis area)",
   "lat": 30.59,
   "lon": -103.89,
   "km": 150
  },
  "note": "A throwback from the Cornell Lab's West Texas hummingbird feeder cam at fall migration, when up to 12 hummingbird species zip through — count the colours."
 },
 {
  "id": "XBQV6jhmGCQ",
  "title": "Shenandoah Salamander - Part 1",
  "channel": "Shenandoah NPS",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "appalachian"
  ],
  "animals": [
   "salamander"
  ],
  "near": {
   "label": "Shenandoah National Park",
   "lat": 38.53,
   "lon": -78.35,
   "km": 100
  },
  "note": "Part 1 of Shenandoah National Park's series on the Shenandoah salamander, a small endangered salamander found only on a few rocky mountaintops in this Virginia park."
 },
 {
  "id": "plxhB8JOBBU",
  "title": "Shenandoah Salamander - Part 3",
  "channel": "Shenandoah NPS",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "appalachian"
  ],
  "animals": [
   "salamander"
  ],
  "near": {
   "label": "Shenandoah National Park",
   "lat": 38.53,
   "lon": -78.35,
   "km": 100
  },
  "note": "Part 3 of the Shenandoah salamander series: how this tiny mountaintop salamander behaves, competes with the redback salamander and fits into its Blue Ridge forest."
 },
 {
  "id": "1Vo7RzGH0y0",
  "title": "Wilderness Shaped by Water: Congaree National Park",
  "channel": "Harpers Ferry Center NPS",
  "ages": "2–8",
  "kind": "place",
  "regions": [
   "southeastern"
  ],
  "animals": [],
  "near": {
   "label": "Congaree National Park",
   "lat": 33.79,
   "lon": -80.78,
   "km": 80
  },
  "note": "An NPS film on how floodwaters shape South Carolina's Congaree National Park, the largest old-growth bottomland forest left in the southeastern United States."
 },
 {
  "id": "i3agpHHcgn4",
  "title": "Happy sea turtle nesting season!",
  "channel": "South Carolina Aquarium",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "southeastern"
  ],
  "animals": [
   "sea-turtle"
  ],
  "near": {
   "label": "Charleston, South Carolina",
   "lat": 32.79,
   "lon": -79.93,
   "km": 100
  },
  "note": "A short from the South Carolina Aquarium in Charleston marking sea turtle nesting season, when loggerheads come ashore on Carolina beaches from May to August."
 },
 {
  "id": "0-2tuv4B95g",
  "title": "Let's meet our many different resident turtles this #WorldTurtleDay! 🐢 SCDNR MTP 2026-0004",
  "channel": "South Carolina Aquarium",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "southeastern"
  ],
  "animals": [
   "turtle"
  ],
  "near": {
   "label": "Charleston, South Carolina",
   "lat": 32.79,
   "lon": -79.93,
   "km": 100
  },
  "note": "Meet the South Carolina Aquarium's many resident turtles for World Turtle Day — a quick, cheerful Charleston short for learning that turtles come in many shapes."
 },
 {
  "id": "QMkMgpR6hpo",
  "title": "The Leatherback Seaturtle (60 seconds)",
  "channel": "Hinterland Who's Who / Faune et flore du pays",
  "minutes": 1,
  "ages": "2–8",
  "kind": "animal",
  "regions": [],
  "animals": [
   "sea-turtle"
  ],
  "note": "Hinterland Who's Who's one-minute leatherback: the world's biggest sea turtle, which swims north to Canada's Atlantic waters each summer to eat jellyfish."
 },
 {
  "id": "i6jNf7B6Fp4",
  "title": "Grasslands Rising | Climate Crew | Parks Canada",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "nature",
  "regions": [
   "great-plains"
  ],
  "animals": [],
  "near": {
   "label": "Grasslands National Park",
   "lat": 49.2,
   "lon": -107.5,
   "km": 150
  },
  "note": "Parks Canada's Climate Crew in Saskatchewan's Grasslands National Park shows how prairie grasses store carbon deep in the soil and shelter wildlife."
 },
 {
  "id": "f-jhWtY8_NU",
  "title": "Wood Bison -- Elk Island National Park",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "great-plains"
  ],
  "animals": [
   "bison"
  ],
  "near": {
   "label": "Elk Island National Park",
   "lat": 53.6,
   "lon": -112.85,
   "km": 80
  },
  "note": "Wood bison, North America's largest land animals, in Elk Island National Park near Edmonton, whose herd helped bring the threatened species back."
 },
 {
  "id": "ID3q3NxGCcE",
  "title": "Good dog! | Climate Crew | Parks Canada",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "great-plains"
  ],
  "animals": [
   "prairie-dog"
  ],
  "near": {
   "label": "Grasslands National Park",
   "lat": 49.2,
   "lon": -107.5,
   "km": 150
  },
  "note": "Black-tailed prairie dogs live in only one place in Canada — around Grasslands National Park — and their burrows shelter burrowing owls and other wildlife."
 },
 {
  "id": "04K9w3clSpc",
  "title": "Meet the Osprey of Mallows Bay-Potomac River National Marine Sanctuary 🪶 Part 2",
  "channel": "NOAA Sanctuaries",
  "ages": "2–8",
  "kind": "place",
  "regions": [
   "northeast-coast"
  ],
  "animals": [],
  "near": {
   "label": "Mallows Bay, Potomac River, Maryland",
   "lat": 38.47,
   "lon": -77.26,
   "km": 80
  },
  "note": "NOAA's Earth Is Blue short on the fish-catching ospreys of Mallows Bay on the Potomac River, Maryland, and the challenges they have overcome in the Chesapeake."
 },
 {
  "id": "i3aeyWc4usY",
  "title": "American Bison Return to Smithsonian's National Zoo",
  "channel": "Smithsonian's National Zoo",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "northeast-coast"
  ],
  "animals": [
   "bison"
  ],
  "near": {
   "label": "Smithsonian's National Zoo, Washington",
   "lat": 38.93,
   "lon": -77.05,
   "km": 60
  },
  "note": "American bison return to the Smithsonian's National Zoo in Washington, D.C., a zoo founded partly to help save bison from disappearing in the 1880s."
 },
 {
  "id": "Nqqb7ODqbV4",
  "title": "New Study on Humpback Whales Cooperative Hunting in Stellwagen Bank National Marine Sanctuary",
  "channel": "NOAA Sanctuaries",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "northeast-coast"
  ],
  "animals": [
   "whale"
  ],
  "near": {
   "label": "Stellwagen Bank, off Boston",
   "lat": 42.35,
   "lon": -70.35,
   "km": 100
  },
  "note": "Scientists at Stellwagen Bank sanctuary off Massachusetts film humpback whales working together to scoop up tiny fish — big whales, small fish, nothing gory."
 },
 {
  "id": "zy-17qfUPNA",
  "title": "Yellowstone Bison",
  "channel": "YellowstoneNPS",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "western-mountains"
  ],
  "animals": [
   "bison"
  ],
  "near": {
   "label": "Yellowstone National Park",
   "lat": 44.6,
   "lon": -110.5,
   "km": 150
  },
  "note": "Yellowstone National Park's own video on its bison, the herd that has lived in the park continuously since prehistoric times."
 },
 {
  "id": "jbMa0qqCBPw",
  "title": "Minute Out In It: Chorus Frogs",
  "channel": "YellowstoneNPS",
  "minutes": 1,
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "western-mountains"
  ],
  "animals": [
   "frog"
  ],
  "near": {
   "label": "Yellowstone National Park",
   "lat": 44.6,
   "lon": -110.5,
   "km": 150
  },
  "note": "A one-minute 'Minute Out In It' from Yellowstone: tiny chorus frogs calling in a spring wetland — listen for the sound of a thumb running along a comb."
 },
 {
  "id": "-cQXxQdjbZo",
  "title": "Jasper National Park",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "place",
  "regions": [
   "western-mountains"
  ],
  "animals": [],
  "near": {
   "label": "Jasper National Park",
   "lat": 52.87,
   "lon": -118.08,
   "km": 150
  },
  "note": "Parks Canada's short portrait of Jasper National Park, the largest national park in the Canadian Rockies — a preview for a mountain family trip."
 },
 {
  "id": "SzYXOsXGgUg",
  "title": "WHOOP! for Whooping Cranes",
  "channel": "U.S. Fish & Wildlife Service",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "gulf-coast"
  ],
  "animals": [
   "crane"
  ],
  "near": {
   "label": "Aransas National Wildlife Refuge, Texas",
   "lat": 28.25,
   "lon": -96.8,
   "km": 100
  },
  "note": "Made for kids by the U.S. Fish & Wildlife Service: the endangered whooping cranes that spend each winter at Aransas National Wildlife Refuge on the Texas coast."
 },
 {
  "id": "-4yZjojv40g",
  "title": "The Attwater's Prairie Chicken Dance",
  "channel": "Texas Parks and Wildlife Foundation",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "gulf-coast"
  ],
  "animals": [],
  "near": {
   "label": "Attwater Prairie Chicken NWR, Texas",
   "lat": 29.67,
   "lon": -96.27,
   "km": 120
  },
  "note": "Male Attwater's prairie chickens puff up, stamp and boom in their spring dance on the Texas coastal prairie — one of North America's rarest birds."
 },
 {
  "id": "JJVwp1wu7SA",
  "title": "Explore Kejimkujik, Where Memories Abound | Parks Canada",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "place",
  "regions": [
   "acadian-forest"
  ],
  "animals": [],
  "near": {
   "label": "Kejimkujik National Park",
   "lat": 44.4,
   "lon": -65.25,
   "km": 80
  },
  "note": "Parks Canada's invitation to Kejimkujik in southwest Nova Scotia, a park of quiet canoe lakes and old forest — handy for planning a Maritime family trip."
 },
 {
  "id": "Oq-5h_Y5GmM",
  "title": "Wildlife Underpasses of Kouchibouguac",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "nature",
  "regions": [
   "acadian-forest"
  ],
  "animals": [
   "turtle",
   "salamander",
   "frog"
  ],
  "near": {
   "label": "Kouchibouguac National Park",
   "lat": 46.8,
   "lon": -64.97,
   "km": 80
  },
  "note": "Kouchibouguac National Park in New Brunswick built tunnels under its road so wood turtles, salamanders and frogs can cross safely — a clear, kid-sized conservation idea."
 },
 {
  "id": "DO-liP5PA08",
  "title": "Have fun in La Mauricie National Park this winter! | Parks Canada",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "place",
  "regions": [
   "boreal-forest"
  ],
  "animals": [],
  "near": {
   "label": "La Mauricie National Park",
   "lat": 46.8,
   "lon": -72.98,
   "km": 100
  },
  "note": "Parks Canada's invitation to La Mauricie National Park in winter — snowy Laurentian forest and frozen lakes, a preview of a cold-weather family outing in Quebec."
 },
 {
  "id": "3OeQJmmy2Ck",
  "title": "Be inspired by autumn colours in a thousand ways at La Mauricie National Park",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "nature",
  "regions": [
   "boreal-forest"
  ],
  "animals": [],
  "near": {
   "label": "La Mauricie National Park",
   "lat": 46.8,
   "lon": -72.98,
   "km": 100
  },
  "note": "A short Parks Canada film of La Mauricie National Park in full autumn colour — Laurentian lakes and maple-covered hills, a few hours east of Gatineau."
 },
 {
  "id": "iK-kl97xoqI",
  "title": "The Boreal Forest (60 seconds)",
  "channel": "Hinterland Who's Who / Faune et flore du pays",
  "minutes": 1,
  "ages": "2–8",
  "kind": "nature",
  "regions": [
   "boreal-forest"
  ],
  "animals": [],
  "note": "A one-minute Hinterland Who's Who portrait of Canada's boreal forest, the wide northern belt of spruce, lakes and wetlands where loons, moose and caribou live."
 },
 {
  "id": "y6HI_ofCSbk",
  "title": "Winter Finches Crunch Sunflower Seeds As Large Snowflakes Fall In Ontario | Jan. 30, 2026",
  "channel": "Cornell Lab Bird Cams",
  "ages": "2–8",
  "kind": "nature",
  "regions": [
   "boreal-forest"
  ],
  "animals": [],
  "near": {
   "label": "Manitouwadge, Ontario",
   "lat": 49.13,
   "lon": -85.84,
   "km": 100
  },
  "note": "Pine Grosbeaks and redpolls crunch sunflower seeds while big snowflakes fall on the Cornell Lab's northern Ontario feeder cam — a quiet, real-time winter morning."
 },
 {
  "id": "wfkAI--nGYk",
  "title": "A still, cloudy day with autumn colors",
  "channel": "DenaliNPS",
  "minutes": 6,
  "ages": "2–8",
  "kind": "nature",
  "regions": [
   "boreal-north"
  ],
  "animals": [],
  "near": {
   "label": "Denali National Park (Teklanika River)",
   "lat": 63.66,
   "lon": -149.58,
   "km": 150
  },
  "note": "Six quiet minutes of autumn by Denali's Teklanika River: fog-topped mountains, pointed spruce and golden tundra — a calm, wordless screen for winding down."
 },
 {
  "id": "gdCQkNqYIVc",
  "title": "Cape East Camera - Churchill Cam, Wapusk National Park powered by EXPLORE.org",
  "channel": "Explore Bears",
  "minutes": 0,
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "boreal-north"
  ],
  "animals": [
   "polar-bear"
  ],
  "near": {
   "label": "Churchill, Manitoba (Wapusk National Park)",
   "lat": 58.77,
   "lon": -94.17,
   "km": 150
  },
  "live": true,
  "note": "Live camera on the Hudson Bay coast near Churchill, Manitoba, where polar bears wait for sea ice each October–November; outside that season it may show empty tundra."
 },
 {
  "id": "Hf3OUrZmqBM",
  "title": "First Steps - Wood Buffalo National Park",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "boreal-north"
  ],
  "animals": [
   "bison"
  ],
  "near": {
   "label": "Wood Buffalo National Park",
   "lat": 59.6,
   "lon": -112.5,
   "km": 300
  },
  "note": "A newborn wood bison calf, less than 20 minutes old, takes its first wobbly steps in Wood Buffalo National Park — a tender moment toddlers will love."
 },
 {
  "id": "f2FvKiYn1eU",
  "title": "Everglades Mountains and Valleys: Slough",
  "channel": "Everglades National Park",
  "ages": "2–8",
  "kind": "place",
  "regions": [
   "florida-peninsula"
  ],
  "animals": [],
  "near": {
   "label": "Everglades National Park",
   "lat": 25.4,
   "lon": -80.8,
   "km": 120
  },
  "note": "From Everglades National Park's kid-friendly 'Mountains and Valleys' series: a guide explores the slough, the deeper, slow-flowing channel of the River of Grass."
 },
 {
  "id": "FbbHB9ka8Yg",
  "title": "Above Water Manatee-Cam at Blue Spring State Park powered by EXPLORE.org",
  "channel": "Explore Oceans",
  "minutes": 0,
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "florida-peninsula"
  ],
  "animals": [
   "manatee"
  ],
  "near": {
   "label": "Blue Spring State Park, Florida",
   "lat": 28.95,
   "lon": -81.34,
   "km": 80
  },
  "live": true,
  "note": "Live view of Blue Spring State Park near Orlando, where hundreds of manatees shelter in the warm spring run from about November to March."
 },
 {
  "id": "wT8Dfx9CMAA",
  "title": "Cave Week 2021",
  "channel": "Mammoth Cave National Park - National Park Service",
  "ages": "2–8",
  "kind": "nature",
  "regions": [
   "central-hardwoods"
  ],
  "animals": [],
  "near": {
   "label": "Mammoth Cave National Park",
   "lat": 37.19,
   "lon": -86.1,
   "km": 80
  },
  "note": "A Mammoth Cave ranger sets stalactites, stalagmites and other cave formations to a catchy beat — rocks made memorable, from the world's longest known cave in Kentucky."
 },
 {
  "id": "0jt0IYC0cXU",
  "title": "Hellbender babies at Saint Louis Zoo",
  "channel": "Saint Louis Zoo",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "central-hardwoods"
  ],
  "animals": [
   "salamander"
  ],
  "near": {
   "label": "Saint Louis Zoo",
   "lat": 38.64,
   "lon": -90.29,
   "km": 80
  },
  "note": "Baby Ozark hellbenders — giant North American salamanders — at the Saint Louis Zoo, which raises them to return to Missouri's Ozark rivers."
 },
 {
  "id": "zXKxcKIRjts",
  "title": "Otter Release on Film",
  "channel": "Monterey Bay Aquarium",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "mediterranean-california"
  ],
  "animals": [
   "sea-otter"
  ],
  "near": {
   "label": "Monterey Bay",
   "lat": 36.62,
   "lon": -121.9,
   "km": 100
  },
  "note": "Ride along as Monterey Bay Aquarium staff release two rehabilitated southern sea otters back into Monterey Bay; the aquarium has cared for over 1,000 otters since 1984."
 },
 {
  "id": "IOJO0zj55jo",
  "title": "Live Sea Otter Cam - Monterey Bay Aquarium",
  "channel": "Monterey Bay Aquarium",
  "minutes": 0,
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "mediterranean-california"
  ],
  "animals": [
   "sea-otter"
  ],
  "near": {
   "label": "Monterey Bay",
   "lat": 36.62,
   "lon": -121.9,
   "km": 100
  },
  "live": true,
  "note": "Monterey Bay Aquarium's live sea otter cam: rescued southern sea otters groom, float and play in their pool — gentle viewing during aquarium hours."
 },
 {
  "id": "Nu7bJuC1LfA",
  "title": "Killer Whale (30 seconds)",
  "channel": "Hinterland Who's Who / Faune et flore du pays",
  "minutes": 0.5,
  "ages": "2–8",
  "kind": "animal",
  "regions": [],
  "animals": [
   "orca"
  ],
  "note": "A 30-second Hinterland Who's Who on the killer whale — just long enough for a toddler to meet the black-and-white orca of Canada's coasts."
 },
 {
  "id": "YkViQ19JIA4",
  "title": "The Chorus Frogs",
  "channel": "Hinterland Who's Who / Faune et flore du pays",
  "ages": "2–8",
  "kind": "animal",
  "regions": [],
  "animals": [
   "frog"
  ],
  "note": "Hinterland Who's Who on chorus frogs, the thumb-sized frogs whose creaking calls are one of the first sounds of spring in Canadian ditches and ponds."
 },
 {
  "id": "UUO30bwTpds",
  "title": "The Monarch Butterfly (60 Seconds)",
  "channel": "Hinterland Who's Who / Faune et flore du pays",
  "minutes": 1,
  "ages": "2–8",
  "kind": "animal",
  "regions": [],
  "animals": [
   "monarch"
  ],
  "note": "One-minute Hinterland Who's Who on the monarch butterfly and its amazing journey from Canadian milkweed fields to Mexico's mountains."
 },
 {
  "id": "ta154f5Rp5Y",
  "title": "Busy Bees! | Bumblebees and Honeybees | Amazing Animals | SciShow Kids",
  "channel": "SciShow Kids",
  "ages": "2–8",
  "kind": "animal",
  "regions": [],
  "animals": [
   "bee"
  ],
  "note": "SciShow Kids' Jessi explains how bumblebees and honeybees live and work, and why they are always busy visiting flowers — clear and friendly for preschoolers."
 },
 {
  "id": "nOzsxB5Ipc0",
  "title": "The Bald Eagle | Amazing Animals | CBC Kids",
  "channel": "CBC Kids",
  "ages": "2–8",
  "kind": "animal",
  "regions": [],
  "animals": [
   "bald-eagle"
  ],
  "note": "CBC Kids' Amazing Animals short on the bald eagle, the big white-headed bird of Canadian lakes and rivers, told simply for young viewers."
 },
 {
  "id": "fJxvIHuKPBE",
  "title": "Wild Kratts 🐊 Alligators vs. Crocodiles! | Kids Videos",
  "channel": "Wild Kratts",
  "ages": "2–8",
  "kind": "animal",
  "regions": [],
  "animals": [
   "alligator"
  ],
  "note": "The official Wild Kratts channel sorts out alligators versus crocodiles — handy before a trip to see American alligators in Florida or Gulf coast swamps."
 },
 {
  "id": "bUgWy741Nhc",
  "title": "American Robin: Bird In The Spotlight",
  "channel": "Cornell Lab of Ornithology",
  "ages": "2–8",
  "kind": "animal",
  "regions": [],
  "animals": [
   "robin"
  ],
  "note": "The Cornell Lab's 'Bird in the Spotlight' on the American robin, the red-breasted lawn bird whose song is a sure sign of spring."
 },
 {
  "id": "h5ESRtJUVqU",
  "title": "How to Help a Turtle Cross the Road Helptheturtles.ca",
  "channel": "Canadian Wildlife Federation",
  "ages": "2–8",
  "kind": "animal",
  "regions": [],
  "animals": [
   "turtle"
  ],
  "note": "The Canadian Wildlife Federation shows how to safely help a turtle — even a snapping turtle — across the road, a spring skill for families near Ontario and Quebec lakes."
 },
 {
  "id": "pJqP91wr-YM",
  "title": "Capsules originales de 1963 sur le Fou de bassan, le Huard, le Castor et l'Orignal!",
  "channel": "Hinterland Who's Who / Faune et flore du pays",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "boreal-forest",
   "great-lakes-st-lawrence",
   "acadian-forest"
  ],
  "animals": [
   "loon",
   "beaver",
   "moose"
  ],
  "note": "The original 1963 Hinterland Who's Who spots (French-language upload) on the gannet, loon, beaver and moose — the calm classics Canadian parents and grandparents grew up with."
 },
 {
  "id": "5bkDe6LryCo",
  "title": "LIVE Puffin Burrow Exterior View - Seal Island, Maine | explore.org",
  "channel": "Explore Penguin & Puffin Cams",
  "minutes": 0,
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "acadian-forest"
  ],
  "animals": [
   "puffin"
  ],
  "near": {
   "label": "Seal Island, Maine",
   "lat": 43.89,
   "lon": -68.74,
   "km": 150
  },
  "live": true,
  "note": "Live view of Atlantic puffin burrows on Seal Island, Maine, from Audubon's seabird program via explore.org; puffins are ashore roughly May to August."
 },
 {
  "id": "LtCkVfbWcJM",
  "title": "A Loon Mystery | Climate Crew | Parks Canada",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "boreal-forest"
  ],
  "animals": [
   "loon"
  ],
  "near": {
   "label": "La Mauricie National Park",
   "lat": 46.8,
   "lon": -72.98,
   "km": 100
  },
  "note": "La Mauricie National Park, Quebec, has monitored its loons since 1987; this Climate Crew episode shows how healthy loons tell rangers a lake is healthy."
 },
 {
  "id": "8XMbfk66LJE",
  "title": "Protecting the Wood Turtle!",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "boreal-forest"
  ],
  "animals": [
   "turtle"
  ],
  "near": {
   "label": "La Mauricie National Park",
   "lat": 46.8,
   "lon": -72.98,
   "km": 100
  },
  "note": "Rangers at La Mauricie National Park protect wood turtle nests with mesh screens, then carry the tiny hatchlings to a nearby stream — gentle and very small turtles."
 },
 {
  "id": "JtdMKnjBEYE",
  "title": "Northern Saw-whet Owl Vocalizes At The Ontario Feeders | March 24, 2026",
  "channel": "Cornell Lab Bird Cams",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "boreal-forest"
  ],
  "animals": [
   "owl"
  ],
  "near": {
   "label": "Manitouwadge, Ontario",
   "lat": 49.13,
   "lon": -85.84,
   "km": 100
  },
  "note": "Turn the sound up: a tiny Northern Saw-whet Owl gives its too-too-too call at night on the Cornell Lab's feeder cam in Manitouwadge, northern Ontario."
 },
 {
  "id": "CYl_uPm7yto",
  "title": "LIVE Wolf Cam: South – International Wolf Center – Minnesota | explore.org",
  "channel": "Explore Wolf & Bison Cams: North American Wildlife",
  "minutes": 0,
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "boreal-forest"
  ],
  "animals": [
   "wolf"
  ],
  "near": {
   "label": "International Wolf Center, Ely, Minnesota",
   "lat": 47.9,
   "lon": -91.86,
   "km": 100
  },
  "live": true,
  "note": "Live cam of the International Wolf Center's ambassador wolf pack in Ely, Minnesota, at the edge of the Boundary Waters; preview first, as feeding times can show meat."
 },
 {
  "id": "kNgV1g66xpw",
  "title": "The Caribou (60 seconds)",
  "channel": "Hinterland Who's Who / Faune et flore du pays",
  "minutes": 1,
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "boreal-north",
   "boreal-forest"
  ],
  "animals": [
   "caribou"
  ],
  "note": "The classic one-minute Hinterland Who's Who on caribou — Canada's travelling deer of the tundra and boreal forest, the animal on the 25-cent coin."
 },
 {
  "id": "m-u7YtYkyps",
  "title": "Parka and the Bison",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "great-plains"
  ],
  "animals": [
   "bison"
  ],
  "note": "Parks Canada's beaver mascot Parka meets a bison herd and learns what sound bison make and that both males and females have horns — made for preschoolers."
 },
 {
  "id": "BxwHtF3jtIw",
  "title": "The Polar Bear (60 seconds)",
  "channel": "Hinterland Who's Who / Faune et flore du pays",
  "minutes": 1,
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "boreal-north"
  ],
  "animals": [
   "polar-bear"
  ],
  "note": "Hinterland Who's Who's one-minute polar bear portrait: the great white bear of Canada's Arctic coasts, which needs sea ice to hunt."
 },
 {
  "id": "hltNARxQqh4",
  "title": "Pacific Rim National Park Reserve",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "place",
  "regions": [
   "pacific-maritime"
  ],
  "animals": [
   "whale"
  ],
  "near": {
   "label": "Pacific Rim National Park Reserve",
   "lat": 49.05,
   "lon": -125.72,
   "km": 100
  },
  "note": "Parks Canada's tour of Pacific Rim National Park Reserve on Vancouver Island, with rare underwater footage, seabirds and whales off the wild west-coast beaches."
 },
 {
  "id": "cylYjgxJe4A",
  "title": "Restoring Salmon Habitat on Sandhill Creek",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "pacific-maritime"
  ],
  "animals": [
   "salmon"
  ],
  "near": {
   "label": "Pacific Rim National Park Reserve",
   "lat": 49.05,
   "lon": -125.72,
   "km": 100
  },
  "note": "Salmon spawn in new gravel beds in Sandhill Creek, Pacific Rim National Park Reserve, after Parks Canada rebuilt the crossing with a clear-span bridge."
 },
 {
  "id": "VNIx7_w8IoQ",
  "title": "WILD KRATTS | Spirit Bear vs. Black Bear | PBS KIDS",
  "channel": "PBS KIDS",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "pacific-maritime"
  ],
  "animals": [
   "black-bear"
  ],
  "note": "PBS KIDS' Wild Kratts compare the rare white 'spirit bear' of B.C.'s coastal rainforest with an ordinary black bear — they are actually the same species."
 },
 {
  "id": "JPySZF_DdRQ",
  "title": "Snowy Owl (Youth)",
  "channel": "Hinterland Who's Who / Faune et flore du pays",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "boreal-north",
   "boreal-forest",
   "great-lakes-st-lawrence",
   "great-plains",
   "acadian-forest"
  ],
  "animals": [
   "owl"
  ],
  "note": "Hinterland Who's Who's youth version on the snowy owl, the white Arctic owl that sometimes winters in open fields around Ottawa and southern Quebec."
 },
 {
  "id": "4g7QkhNBLlo",
  "title": "Steelhead Eggs Hatching",
  "channel": "U.S. Fish & Wildlife Service",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "pacific-maritime"
  ],
  "animals": [
   "trout"
  ],
  "near": {
   "label": "Quilcene National Fish Hatchery, Washington",
   "lat": 47.82,
   "lon": -122.88,
   "km": 80
  },
  "note": "Close-up of steelhead trout eggs hatching at a U.S. Fish & Wildlife Service hatchery on Washington's Olympic Peninsula — tiny fish wriggling out of their eggs."
 },
 {
  "id": "4Zl9kwPPFrk",
  "title": "Happy #SeaOtter Awareness Week!",
  "channel": "NOAA Sanctuaries",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "mediterranean-california",
   "pacific-maritime"
  ],
  "animals": [
   "sea-otter"
  ],
  "note": "NOAA's Sea Otter Awareness Week short: the northern sea otters of Washington's Olympic Coast and the southern sea otters of central California."
 },
 {
  "id": "cbpRyxmZoKA",
  "title": "Studying Habitat to Better Protect Belugas | Field Notes | Parks Canada",
  "channel": "Parks Canada",
  "ages": "2–8",
  "kind": "animal",
  "regions": [
   "great-lakes-st-lawrence"
  ],
  "animals": [
   "beluga"
  ],
  "near": {
   "label": "Saguenay–St. Lawrence Marine Park (Tadoussac)",
   "lat": 48.14,
   "lon": -69.72,
   "km": 150
  },
  "note": "Parks Canada scientists study the habitat of the St. Lawrence belugas — the white whales seen near Tadoussac — to learn how to protect them better."
 }
];

/** Where each animal a film is about lives: ecoregions, optionally limited by latitude. */
export const KID_ANIMAL_RANGES: Record<string, { regions: string[]; latMin?: number; latMax?: number }> = {
 "alligator": {
  "regions": [
   "florida-peninsula",
   "gulf-coast",
   "southeastern"
  ]
 },
 "bald-eagle": {
  "regions": [
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
 "beaver": {
  "regions": [
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
 "bee": {
  "regions": [
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
 "bison": {
  "regions": [
   "boreal-north",
   "great-plains",
   "western-mountains"
  ]
 },
 "black-bear": {
  "regions": [
   "boreal-north",
   "mediterranean-california",
   "pacific-maritime",
   "western-mountains"
  ]
 },
 "blue-jay": {
  "regions": [
   "great-lakes-st-lawrence"
  ]
 },
 "canada-goose": {
  "regions": [
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
 "caribou": {
  "regions": [
   "boreal-forest",
   "boreal-north",
   "western-mountains"
  ],
  "latMin": 46
 },
 "chickadee": {
  "regions": [
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
 "crane": {
  "regions": [
   "gulf-coast"
  ]
 },
 "frog": {
  "regions": [
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
 "hummingbird": {
  "regions": [
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
 "loon": {
  "regions": [
   "acadian-forest",
   "boreal-forest",
   "boreal-north",
   "florida-peninsula",
   "great-lakes-st-lawrence",
   "gulf-coast",
   "northeast-coast",
   "pacific-maritime",
   "southeastern",
   "western-mountains"
  ]
 },
 "manatee": {
  "regions": [
   "florida-peninsula"
  ]
 },
 "monarch": {
  "regions": [
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
 "moose": {
  "regions": [
   "acadian-forest",
   "boreal-forest",
   "boreal-north",
   "great-lakes-st-lawrence",
   "western-mountains"
  ]
 },
 "orca": {
  "regions": [
   "mediterranean-california",
   "pacific-maritime"
  ]
 },
 "owl": {
  "regions": [
   "acadian-forest",
   "appalachian",
   "boreal-forest",
   "boreal-north",
   "central-hardwoods",
   "deserts",
   "great-lakes-st-lawrence",
   "great-plains",
   "gulf-coast",
   "northeast-coast",
   "pacific-maritime",
   "western-mountains"
  ]
 },
 "polar-bear": {
  "regions": [
   "boreal-north"
  ]
 },
 "prairie-dog": {
  "regions": [
   "great-plains"
  ],
  "latMax": 50
 },
 "puffin": {
  "regions": [
   "acadian-forest"
  ]
 },
 "robin": {
  "regions": [
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
 "salamander": {
  "regions": [
   "acadian-forest",
   "appalachian",
   "central-hardwoods"
  ]
 },
 "salmon": {
  "regions": [
   "pacific-maritime"
  ]
 },
 "sea-otter": {
  "regions": [
   "mediterranean-california",
   "pacific-maritime"
  ]
 },
 "sea-turtle": {
  "regions": [
   "florida-peninsula",
   "gulf-coast",
   "southeastern"
  ]
 },
 "trout": {
  "regions": [
   "pacific-maritime"
  ]
 },
 "turtle": {
  "regions": [
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
 "whale": {
  "regions": [
   "northeast-coast",
   "pacific-maritime"
  ]
 },
 "wolf": {
  "regions": [
   "boreal-forest"
  ]
 },
 "woodpecker": {
  "regions": [
   "great-lakes-st-lawrence"
  ]
 }
};

const KIND_ORDER = { place: 0, nature: 1, animal: 2 } as const;
const km = (a: number, b: number, c: number, d: number) => {
  const r = Math.PI / 180;
  const x = (d - b) * r * Math.cos(((a + c) / 2) * r);
  return Math.hypot(x, (c - a) * r) * 6371;
};
const livesAt = (animal: string, region: string, lat: number) => {
  const g = KID_ANIMAL_RANGES[animal];
  return !!g && g.regions.includes(region) && (g.latMin == null || lat >= g.latMin) && (g.latMax == null || lat <= g.latMax);
};

/**
 * The films for a place, each with why it is shown: films about places within
 * reach ("here"), then films about the region whose animals live here, places
 * before nature before animals ("region"), then films about an animal that
 * lives here ("animal").
 */
export function kidVideosFor(place: { lat: number; lon: number }, regionSlug: string): { video: KidVideo; why: "here" | "region" | "animal" }[] {
  const shown = new Set<string>();
  const lives = (v: KidVideo) => v.animals.every((a) => livesAt(a, regionSlug, place.lat));
  const here = KID_VIDEOS.filter((v) => v.near && km(place.lat, place.lon, v.near.lat, v.near.lon) <= v.near.km);
  here.forEach((v) => shown.add(v.id));
  const order = new Map(KID_VIDEOS.map((v, i) => [v.id, i]));
  const region = KID_VIDEOS.filter((v) => !shown.has(v.id) && v.regions.includes(regionSlug) && lives(v)).sort(
    (a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind] || order.get(a.id)! - order.get(b.id)!,
  );
  region.forEach((v) => shown.add(v.id));
  const animal = KID_VIDEOS.filter((v) => !shown.has(v.id) && !v.near && v.animals.length > 0 && lives(v));
  return [
    ...here.map((video) => ({ video, why: "here" as const })),
    ...region.map((video) => ({ video, why: "region" as const })),
    ...animal.map((video) => ({ video, why: "animal" as const })),
  ];
}
