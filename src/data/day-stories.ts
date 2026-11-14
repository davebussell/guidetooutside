/**
 * The day, phase by phase (/the-day/<town>, the DayScrubber props): what the
 * sun is doing in each of the eight solar phases, what each region looks like
 * in each phase, and what the fish and garden creatures are doing.
 *
 * Extracted from the DayScrubber props in the RSC payloads of the 264 captured
 * /the-day/<town> pages (one capture per town, all on 7 October 2026):
 * DAY_PHASES `sun` is the same everywhere; REGION_DAY covers the 33 regions (null where the live page had no story for that region)
 * with a captured town (none for hawaii-tropics: its two towns were captured without a day page); DAY_RHYTHMS gives, for
 * the 34 creatures that have one, each phase's `where` and whether it is the
 * creature's peak, or "rest" (named under "resting"). Phases a creature was
 * never captured in are absent (DAY_RHYTHM_GAPS). DAY_CHARACTERS are the
 * weather "characters" of the week that were live on the capture day.
 *
 * Observed selection on the live pages: creatures in season in the place's
 * region (library order, not the in-season sort); in each phase the active
 * ones, peaks first, at most four fish ("water") and four garden creatures;
 * the resting ones, fish then garden, at most six; fish further limited to the
 * place's waters (an inland town with no lake shows no lake trout).
 */

import { piecesText, REPTILE_HIGH_C, type PlaceFacts, type Piece } from "@/lib/where";

export type DayPhase = "first-light" | "sunrise" | "morning" | "midday" | "afternoon" | "golden-hour" | "dusk" | "night";

/**
 * A region story is one string, or pieces joined end to end (spaces and
 * punctuation sit inside the pieces). A piece with conditions holds only where
 * they all hold (src/lib/where.ts `Where`): `lake` near a Great Lake shore or
 * away from one, `leaf` inside the town's leaf-on window, `coast`, `tidal`,
 * `salt`, `near` a named water or range, inside an `area` (the coastal plain, a
 * species' range), a `season`, a `fish` recorded near the town this month,
 * the town's own average high (`highAtLeast`) or rain (`rainBelow`) this month.
 * Pieces whose conditions fail are dropped; nothing is added, except that
 * `{noon}` and `{winterNoon}` are the sun's solstice noon heights at the town
 * and `{dayRange}` this month's average high less its average low there.
 * See `storyText`.
 *
 * Audit of 10 November 2026: the stories were printed under every town of the
 * region with only the lake and leaf switches, so sunrise "out of the sea"
 * reached Philadelphia, Washington and Fredericton, the Bay of Fundy's tide
 * Charlottetown and Halifax, dune plants and beach sand the inland cities, the
 * gopher tortoise and the longleaf floor Atlanta, Charlotte and Raleigh, and
 * summer nights and the daily thunderstorm November. The stories now say
 * where they hold. Deleted, as false anywhere or impossible to place with the
 * site's data:
 *  - Acadian: "earliest sunrise on the continent" (eastern Newfoundland only;
 *    no town there); "the sun comes out of the sea" (a sea to the east cannot
 *    be told from the water grid); "Coastal Nova Scotia can be twelve degrees
 *    cooler" (no source); the Gulf Stream and Labrador Current "meet offshore",
 *    "why this coast has both Arctic char and striped bass" (DFO lists no
 *    Arctic char in NS, NB or PEI; the Gulf Stream lies south of the Grand
 *    Banks); Atlantic salmon "on the evening tide" (inner Bay of Fundy salmon
 *    are endangered and their angling closed).
 *  - Northeast Coast: the sun "still under the Atlantic", "sunrise straight
 *    out of the sea", setting "behind the dunes and the pines", dusk "over a
 *    sea horizon" (an Earth's shadow is seen over any flat horizon: the Great
 *    Plains story says so); sunlight off open water "almost all ... comes
 *    straight back" (water reflects little of a high sun); the Labrador Current
 *    "inshore is most of the difference" (no source read); "The tide has turned"
 *    (the tide's state is not known for the hour); storms building "inland over
 *    the Piedmont" (Boston has none); "Moonlight matters here more than
 *    anywhere" (the tide clause is kept).
 *  - Southeastern: lightning "than anywhere outside Florida" (NWS 2009–18 flash
 *    density ranks Louisiana and Mississippi above every state of the region);
 *    "The daily thunderstorm arrives"; longleaf's "ninety million acres" and
 *    "about three per cent is left" (no source read).
 *  - Gulf Coast: the sun "sets into the water on the western Gulf" (the Texas
 *    coast faces east). Florida: "about two and a half hours between the
 *    solstices" (Miami's day changes by over three hours); "Two thirds of
 *    Florida's rain falls between June and September" (the site's own normals
 *    give 52 to 67 per cent). Deserts: a 25-degree daily swing "is normal" (the
 *    site's normals give at most 14 to 16 °C). Great Plains: cold air "draining
 *    east off the Rockies" at towns 1,000 km from them, prairie chickens,
 *    pronghorn and kangaroo rats (no range data), "This is Tornado Alley".
 *    Central Hardwoods: karst and its caves, "the Ohio, the Wabash and the
 *    Mississippi" (no karst or river data for the towns). Pacific: fog drip
 *    "here" and redwood seedlings (redwoods are Californian). Boreal: "the
 *    orchards are always by the water". Great Lakes: seeds "sown this morning are
 *    germinating" (seeds take days).
 * The sun's summer height is now the town's own ({noon}): "near 72°" was 74 to
 * 76° at Richmond, Washington and Baltimore.
 *
 * Audit of 11 November 2026 (Appalachian, Central Hardwoods and Gulf Coast towns):
 *  - Appalachian: the coves and ridges, valley fog, laurel hells, spruce-fir
 *    peaks, windward rain, "up the mountain" and the "southern Appalachians"
 *    sky were Southern Blue Ridge text printed at Pittsburgh, on the Western
 *    Allegheny Plateau; they now need the Southern Blue Ridge (scope-places
 *    NEAR), the Smokies' synchronous fireflies the Smokies and June, cove frost
 *    the frost season (outside leaf-on), and the bears autumn.
 *  - Central Hardwoods: bats behind shagbark hickory bark now print in summer
 *    only (MDC: Indiana bats roost under peeling bark, shagbark hickory a
 *    favourite, through the summer, and hibernate in caves from mid-October;
 *    https://mdc.mo.gov/discover-nature/field-guide/indiana-myotis-indiana-bat,
 *    read 11 Nov 2026); the summer Milky Way over the corn and the summer squall
 *    lines in summer.
 *  - Gulf Coast: cypress knees, cypress tops and bald cypress need the bald
 *    cypress range (scope-places "bald-cypress-west": not Brownsville); sunrise
 *    "across open water ... with nothing in the way" the open sea within about
 *    10 km (Houston is 36 km from Galveston Bay); the coast lost every hour and a
 *    half needs Louisiana.
 * Deleted, as false anywhere or with no source found: night migration "mostly
 * between midnight and four in the morning" (BirdCast: birds take off 30 to 45
 * minutes after sunset) and the flyway as "the busiest ... on the continent";
 * offshore rigs lighting the western Gulf horizon (no source read; New Orleans
 * is not on the western Gulf); "regrew after the farms were abandoned" (Columbus
 * and Indianapolis are farmland). And every superlative no source was opened
 * for: the oldest mountains on the continent and more tree species than northern
 * Europe, salamanders "more species than anywhere on Earth", the wettest places
 * in the eastern United States, the deepest leaf litter, a bear's thirty
 * kilometres a night, the densest dawn chorus, woodland edge the richest
 * habitat, pawpaw the largest native fruit, the flattest large landscape, the
 * Grand Banks the foggiest place in the world, Fundy's "hundred billion tonnes"
 * (its tourism site gives both one billion and a hundred billion; "the highest
 * tides in the world" is kept from https://www.bayoffundy.com/about/highest-tides/,
 * read 11 Nov 2026), creosote "among the oldest living things", the clearest
 * skies on the continent, the mangrove shadow line's "single most important
 * structure", one of the brightest night skies, the richest soil on Earth, the
 * dryline's "single most important feature", the best light on the continent,
 * the largest gathering of cranes, the Golden Gate the biggest gap, the most
 * reliable fish-finder, the largest temperate rainforest, the clearest case of
 * a range shift, the most species-rich habitat, the largest known aspen clone,
 * no reservoir as important as the snowpack, brown trout "the most nocturnal
 * trout there is", the darkest skies (northern plains, the Sierra's east side,
 * the mountains), the steepest temperature gradient "anywhere", the ground
 * beetle "one of the best predators", and the bumble bee out "earlier and later
 * than any other bee".
 *
 * Audit of 13 November 2026 (Florida Peninsula, Deserts and Mediterranean California towns):
 *  - Deserts: the sky islands and the monsoon towers were printed at Boise; they now need the Madrean sky islands
 *    (scope-places: southern Arizona and south-western New Mexico, Tucson), and the monsoon cell the monsoon's reach
 *    (NWS: Arizona, New Mexico, the Mojave of south-eastern California, Nevada's southern tip). The sky islands line
 *    says what Wikipedia says (forest and woodland above the Sonoran and Chihuahuan deserts, cut off since the ice
 *    ages); "evolving separately ever since" is deleted. Creosote: "evenly spaced rings because it poisons the soil"
 *    and "nearly twelve thousand years" were false; FEIS: old branches die back in drought, new sprouts come from the
 *    outside of the root crown, "clones gradually expand to form rings many meters in diameter", and "The age of the
 *    largest clone in Johnson Valley, California, is estimated at 9,400 years"
 *    (https://www.fs.usda.gov/database/feis/plants/shrub/lartri/all.html, read 13 Nov 2026). Lizards and snakes print
 *    only in months whose average high is at least REPTILE_HIGH_C at the town (Boise's November high is 10 °C,
 *    Albuquerque's 15 °C), not in "autumn"; their 35 °C is the body heat lizards bask to (NPS Joshua Tree, "basking in
 *    the sun until they reach about 95° F", https://www.nps.gov/jotr/learn/nature/lizards.htm, read 13 Nov 2026).
 *    "Bats leave the caves and the mines" is deleted (no source for when they do). "Ten or fifteen degrees in three
 *    hours is ordinary" was more than the whole day's range at every desert town (8 to 16 °C); the dusk now gives the
 *    town's own range for the month.
 *  - Florida: "This whole peninsula is limestone ... every spring in central Florida ... at a constant 22 °C" disagreed
 *    with the ground pages (which name no bedrock under Orlando, Fort Myers, Miami or Fort Lauderdale) and with USGS:
 *    Florida "is underlain by a thick sequence of limestone and dolomite rocks", the Floridan aquifer supplies most of
 *    its drinking water, "Most of Florida's springs are located in the northern half of the state", and spring water
 *    averages about 70 °F in north Florida and 75 °F in central Florida, from 66 to 97 °F (USGS FS-151-95,
 *    https://pubs.usgs.gov/fs/1995/0151/report.pdf, read 13 Nov 2026). The Everglades "eighty kilometres wide": NPS,
 *    "more than 30 miles (almost 50 kilometers) wide", up to a mile a day in summer and 100 feet in winter
 *    (https://www.nps.gov/places/meet-everglades-stop-2-the-flow-of-life.htm, read 13 Nov 2026). "These hammocks are
 *    Caribbean forest" was printed at Orlando, Tampa and Fort Myers; rockland hammock, the tropical one, grows on the
 *    Miami Rock Ridge from downtown Miami south-west, and in the Keys (FNAI,
 *    https://www.fnai.org/PDFs/NC/Rockland_Hammock_Final_2010.pdf, read 13 Nov 2026): the line now says what FNAI says
 *    and prints there (scope-places "rockland-hammock"); "ten degrees cooler" is deleted. The sunrise "over the Everglades
 *    on the other" coast needs the Everglades within reach and the Atlantic shore (Miami, Fort Lauderdale); the sea
 *    turtles "on the Atlantic beaches" the Atlantic shore. Deleted, with no source found: UV "at its continental
 *    maximum", and air plants taking "their entire water supply" from the dew.
 *  - Mediterranean California: the redwoods "sit exactly in" the fog belt was printed at Los Angeles, Santa Barbara, San
 *    Diego and Sacramento; it now says what Silvics says and prints within reach of the redwood belt (scope-places
 *    NEAR, San Jose). Chaparral, its fire-opened seed banks and coast live oak are not printed on the Central Valley
 *    floor (Sacramento). "Almost certainly a cloudless sky ... From May to October, rain here is a genuine surprise"
 *    ran in November and is false by the towns' own normals (October brings 13 to 24 mm): the dry-season line now
 *    prints in months whose average precipitation at the town is under 5 mm. "Inland can be forty degrees while the
 *    coast is at eighteen" is deleted (printed in November; the site has no figure for it). The rattlesnakes hunt at
 *    night only in months with reptiles about (REPTILE_HIGH_C).
 *
 * Audit of 14 November 2026 (Day 5: Boreal North, Pacific Maritime, Western Mountains and Great Lakes towns):
 *  - Great Lakes: "Every east-facing bluff lights up" at golden hour had the geometry backwards (the evening sun is in the
 *    west); the sentence is deleted.
 *  - Boreal North: the winter sunrise "barely south of east" and "half an hour" to rise: worked out from latitude with the
 *    standard sunrise equations (refraction 0.833 degrees), the December sunrise is at an azimuth of 133 degrees at
 *    Thompson, 142 at Whitehorse, 146 at Yellowknife and 155 at Fairbanks (south-east and beyond), and the disc takes 5 to
 *    12 minutes to clear the horizon at the December solstice and 5.5 to 19.5 at the June one, against about 3.5 at
 *    Kingston; scripts/check-day.ts recomputes both. The sphagnum "holding the last of yesterday's warmth, which is why
 *    the permafrost below it survives" had the mechanism inverted: "A layer of peat above the permafrost acts as
 *    insulation by trapping air pockets", which "reduce heat transfer and helps permafrost retention" (phys.org on Nature
 *    Geoscience, https://phys.org/news/2007-09-peat-forests-permafrost.html, read 14 Nov 2026). A spruce stand moving
 *    "more water into the air than the same area of open lake" had no source and is deleted. The tamarack is not at
 *    Whitehorse (no GBIF record of Larix laricina within 100 km; 13 within 100 km of Thompson and 174 of Fairbanks,
 *    https://api.gbif.org/v1/occurrence/search?scientificName=Larix%20laricina&geoDistance=64.84,-147.72,100km&limit=0,
 *    read 14 Nov 2026): the golden-hour line says spruce. The white nights are
 *    scoped (WHITE_NIGHT_ADMIN1), "For much of winter there is nothing else" (Fairbanks has daylight every day) is now
 *    the midwinter night as most of the day, and the long afternoon runs into evening in May to July only.
 *  - Pacific Maritime: the marine layer prints in June to August only (it was printed in November); the
 *    "five-hundred-year canopy" at five cities with no old growth is gone; the nurse log takes "a century or so", not
 *    centuries, from USFS: "The overall decay rate constant (k) for snags and logs in the Cascade Range" was 0.029 a
 *    year, and with k = 0.03 "95% of the CWD was gone 100 yr after the fire" (https://www.fs.usda.gov/media/218022,
 *    read 14 Nov 2026); "the fastest wood decay in temperate North America", which contradicted it, is deleted, and so
 *    is the mycorrhizal network moving carbon and nitrogen between trees (a 2023 review of 26 studies found the evidence
 *    does not show it). The spotted owls hunted "the old growth" with no place, and were printed on Vancouver Island:
 *    COSEWIC puts the Canadian range in "the southwest mainland of British Columbia", "from the international border
 *    north 200 km to Carpenter Lake, west to Howe Sound", and the subspecies "through western Washington, western Oregon
 *    and the coast ranges of California to San Francisco Bay" (https://www.canada.ca/en/environment-climate-change/
 *    services/species-risk-public-registry/cosewic-assessments-status-reports/spotted-owl/chapter-4.html, read 14 Nov
 *    2026); the line now gives that range, and the barred owls (no source read) are deleted.
 *  - Western Mountains: "Frost on the meadow grass at nine thousand feet, in July" was printed at Kelowna and Spokane,
 *    with no such terrain near either; deleted, and the thin-air line is kept to the high towns (HIGH_TOWN_ADMIN1). UV
 *    "roughly half again" at 3,000 m: WHO, "With every 1000 m in altitude, UV levels increase by approximately 10 per
 *    cent", and "Fresh snow ... almost doubles a person's UV exposure" (https://www.who.int/uv/faq/whatisuv/en/index2.html,
 *    read 14 Nov 2026); the line now says that, with no 3,000 m (printed at Kelowna, 345 m). "Afternoon thunderstorms
 *    fire over the peaks nearly every summer day" was printed in November and is false at Spokane (7.4 thunderstorm days
 *    a summer, UW climate office); deleted. Lightning's share of fires is BC Wildfire Service's ("60% are
 *    lightning-caused", 10-year average, https://www2.gov.bc.ca/gov/content/safety/wildfire-status/about-bcws/
 *    wildfire-statistics/wildfire-averages, read 14 Nov 2026) and prints in British Columbia, in summer. "Nowhere else
 *    does temperature run so firmly backwards" had no source (the boreal stories describe the same inversions).
 */
export type StoryPiece = Piece;
export type StoryText = string | StoryPiece[];

export const DAY_PHASES: Record<DayPhase, { label: string; sun: string }> = {
 "first-light": {
  "label": "First light",
  "sun": "The sun is still below the horizon and the sky is lit only by air — light bent over the edge of the world and scattered blue by the atmosphere itself. Nothing is being warmed yet; the ground is at its coldest point of the whole day."
 },
 "sunrise": {
  "label": "Sunrise",
  "sun": "The disc breaks the horizon. Light is arriving at a grazing angle through the thickest slice of atmosphere it will cross all day, which strips the blue out of it and leaves the red — and spreads what heat there is across so much ground that almost none of it lands anywhere."
 },
 "morning": {
  "label": "Morning",
  "sun": "The sun climbs and the angle steepens fast. Every degree of altitude puts more energy on the same square metre, and the ground begins to give back what it lost overnight."
 },
 "midday": {
  "label": "Midday",
  "sun": "The sun is at its highest and the shortest shadow of the day sits under everything. Light is coming through the least atmosphere it will all day, so it is at its whitest and its most intense — and leaves start defending themselves from it."
 },
 "afternoon": {
  "label": "Afternoon",
  "sun": "The angle falls away again, but the ground is still releasing the morning's heat. Air temperature peaks well after the sun does — usually two to four hours late."
 },
 "golden-hour": {
  "label": "Golden hour",
  "sun": "The sun drops back through the low angles and the long atmospheric path returns, warming the colour of everything. Shadows stretch to many times the height of what casts them."
 },
 "dusk": {
  "label": "Dusk",
  "sun": "The sun is under the horizon but still lighting the sky from below. The ground begins to radiate its heat straight up into a clear sky and cools faster than the air above it."
 },
 "night": {
  "label": "Night",
  "sun": "No solar input at all. What happens now runs on stored heat, on the moon, and on the animals that evolved to work while nothing can see them."
 }
};

/**
 * Day 5 audit (14 November 2026): "In June it never properly ends" and "For a few weeks in summer there is no night at
 * all" were printed at Thompson (55.7 N), where the June sun sinks to about 10.8 degrees below the horizon at midnight,
 * past civil twilight. Worked out from latitude (the solstice midnight sun is at latitude + 23.44 - 90 degrees): the sky
 * stays in civil twilight (the sun no more than 6 degrees down) all night only north of about 60.6 N, so at Whitehorse
 * (-5.8 degrees), Yellowknife (-4.1) and Fairbanks (-1.7). The pieces are keyed to those towns' territory or state,
 * the only condition the stories have for it (src/lib/where.ts has no latitude test); scripts/check-day.ts recomputes
 * the sun's depth at every town that prints them.
 */
export const WHITE_NIGHT_ADMIN1 = ["Yukon", "Northwest Territories", "Alaska"];
const whiteNights = (t: string): StoryPiece[] => WHITE_NIGHT_ADMIN1.map((admin1) => ({ t, admin1 }));

/**
 * Day 5 audit (14 November 2026): the Western Mountains' altitude lines ("thin air", frost on the meadows) were printed
 * at Kelowna (345 m) and Spokane (about 560 m). They are keyed to the states of the region's high towns, Laramie (2,184
 * m) and Bozeman (1,461 m); where.ts has no height test. Lightning's share of fires is British Columbia's (BC Wildfire
 * Service), so it prints there only.
 */
export const HIGH_TOWN_ADMIN1 = ["Wyoming", "Montana"];
const highTowns = (t: string): StoryPiece[] => HIGH_TOWN_ADMIN1.map((admin1) => ({ t, admin1 }));

/** Each region in each phase: the light, plants and soil ("micro") and the landscape ("macro"). */
export const REGION_DAY: Record<string, Record<DayPhase, { light: StoryText | null; micro: StoryText | null; macro: StoryText | null }>> = {
 "acadian-forest": {
  "first-light": {
   "light": null,
   "micro": [{ "t": "Salt fog condenses on spruce needles and runs down. Along the coast that fog drip is a serious water supply: a coastal forest can take more water out of fog than it gets from rain.", "coast": "near" }],
   "macro": [{ "t": "The cold Labrador Current sits offshore and the temperature contrast with the land makes fog the moment the air moves.", "coast": "near" }]
  },
  "sunrise": {
   "light": null,
   "micro": [{ "t": "The intertidal zone wakes on the tide, not the sun. Barnacles open, periwinkles start moving, and whatever the ebb left in the pools begins the hottest, saltiest hours of its day.", "coast": "on" }],
   "macro": [{ "t": "The Bay of Fundy's tide is running, the highest in the world, and everything from the mudflats to the striped bass is timed to it rather than to the clock.", "near": "bay-of-fundy" }]
  },
  "morning": {
   "light": "The sun climbs over the ridge and the fog begins to lift off the valleys. The last of it hangs in the river bottoms until mid-morning.",
   "micro": [{ "t": "Sugar maple leaves open their stomata and start to move sap. In spring, before the leaves, that same pressure difference between cold nights and warm days is what makes the sap run at all.", "leaf": true }],
   "macro": [{ "t": "The Fundy fog burns back and the sea breeze sets up.", "near": "bay-of-fundy", "coast": "on" }]
  },
  "midday": {
   "light": "The sun tops out near {noon}° in summer. Under a mixed canopy of spruce, fir, maple and birch, the light on the ground is patchier than under either pure hardwood or pure conifer.",
   "micro": "Red spruce holds its needles for up to a decade, so it photosynthesises whenever it is above freezing — including in February. It does not have to build a new roof every year the way the maples do.",
   "macro": "That mix is what makes this forest distinct: the last of the northern conifers and the first of the eastern hardwoods share the same slope, sorted by aspect and elevation rather than by latitude."
  },
  "afternoon": {
   "light": [{ "t": "The sun swings west and the coastal fog often comes back in with the afternoon sea breeze, arriving as a wall you can watch cross the harbour.", "coast": "on" }],
   "micro": "The forest floor is at its driest, but under a spruce the moss is still damp — the canopy has held the humidity in all day.",
   "macro": null
  },
  "golden-hour": {
   "light": "The sun sets into the land here, not the sea, and the hills go copper while the water is already in shadow.",
   "micro": [{ "t": "The tide is turning somewhere in the bay, and in the estuary the salt wedge slides back upstream along the bottom while fresh water runs out over the top of it.", "tidal": true }],
   "macro": null
  },
  "dusk": {
   "light": "Long northern dusk. In June there is still light in the north-west sky at eleven at night.",
   "micro": [{ "t": "The intertidal cools fast and the pools that were baking at noon are back to sea temperature. Everything in them has survived a thirty-degree swing in twelve hours.", "coast": "on" }],
   "macro": [{ "t": "Fog forms over the cold water offshore and drifts in overnight. By morning it will be sitting in every cove on the coast.", "coast": "near" }]
  },
  "night": {
   "light": "Clear nights here are cold even in summer, because the same clear sky that let the sun in all day lets the heat straight back out.",
   "micro": "Under the moss the soil is acid, cold and slow. Decay in an Acadian forest takes years, not months, which is why the duff layer is so deep and holds so much water.",
   "macro": [{ "t": "The whole coast is lit by the tide's turning, not by any clock. Bioluminescent plankton flare in the wake of anything that moves through the water on a warm late-summer night.", "coast": "on" }]
  }
 },
 "alpine-europe": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "appalachian": {
  "first-light": {
   "light": [{ "t": "Light reaches the ridges long before the coves. In these mountains the difference between the top and the bottom of a slope can be an hour of sun.", "near": "southern-blue-ridge" }],
   "micro": [{ "t": "Cold air has drained down the hollows all night and pooled at the bottom.", "near": "southern-blue-ridge" }, { "t": " Frost sits in the cove and misses the ridge above it — an inversion so reliable that the plant communities sort themselves by it.", "near": "southern-blue-ridge", "leaf": false }],
   "macro": [{ "t": "Fog fills every valley to a level line, so from a ridge at dawn the mountains are islands.", "near": "southern-blue-ridge" }, { "t": " The Cherokee called these mountains Shaconage, the place of blue smoke, and the smoke is real: it is the forest's own volatile compounds hazing the air.", "near": "great-smoky-mountains" }]
  },
  "sunrise": {
   "light": [{ "t": "The sun comes over the eastern ridge and lights the opposite slope first. An east-facing cove and a west-facing one are running two different days.", "near": "southern-blue-ridge" }],
   "micro": [{ "t": "On the forest floor the spring ephemerals — trillium, trout lily, ramps — are racing. They have about six weeks between the ground thawing and the canopy closing, and they must do a year's growing in it.", "season": "spring" }],
   "macro": null
  },
  "morning": {
   "light": "The sun climbs and the fog lifts out of the valleys in a single hour, rising as a sheet.",
   "micro": [{ "t": "In a cove hardwood forest the humidity stays high all day. Salamanders can stay near the surface here.", "near": "southern-blue-ridge" }],
   "macro": [{ "t": "Aspect is everything. A north-facing slope carries northern hardwoods and hemlock; the south-facing slope opposite carries oak and pine. Same mountain, four hundred metres apart, two different forests.", "near": "southern-blue-ridge" }]
  },
  "midday": {
   "light": "The sun tops out near {noon}° in summer, but on a steep north-facing slope the effective angle is far lower and the ground never really warms.",
   "micro": [{ "t": "Under a rhododendron thicket almost no light reaches the ground at all — under two per cent. Nothing grows there, and the laurel hells are as close to impassable as eastern forest gets.", "near": "southern-blue-ridge" }],
   "macro": [{ "t": "Elevation does the work latitude does elsewhere: climbing a thousand metres here is the ecological equivalent of driving a thousand kilometres north. The spruce-fir on the highest peaks is a piece of Canada left behind by the ice.", "near": "southern-blue-ridge" }]
  },
  "afternoon": {
   "light": "The sun swings west and the valleys warm. Heat and moisture rise off the forest and start to build.",
   "micro": [{ "t": "The forest is transpiring at full rate and the air above it is visibly hazy. Those volatile organic compounds released by the trees are what scatter blue light and give the Blue Ridge its name.", "leaf": true, "near": "southern-blue-ridge" }],
   "macro": [{ "t": "Orographic lifting: moist air pushed up the western slopes cools and dumps.", "near": "southern-blue-ridge" }]
  },
  "golden-hour": {
   "light": [{ "t": "The sun drops behind the western ridge early — a cove can lose the sun two hours before the ridge above it does.", "near": "southern-blue-ridge" }],
   "micro": [{ "t": "In early June, on a handful of nights in the Smokies, thousands of synchronous fireflies flash together. They are keyed to a light level, and they start within minutes of the same darkness each night.", "near": "great-smoky-mountains", "months": [6] }],
   "macro": [{ "t": "Cool air begins its nightly slide down the hollows again. The whole range breathes downhill after dark.", "near": "southern-blue-ridge" }]
  },
  "dusk": {
   "light": [{ "t": "Dusk comes up the mountain rather than down it — the valley is dark while the summit is still in sun.", "near": "southern-blue-ridge" }],
   "micro": [{ "t": "Moths take over from butterflies within about twenty minutes, and the flowers change with them: white, heavily scented, night-open blooms replace the coloured day flowers.", "leaf": true }],
   "macro": [{ "t": "Whip-poor-wills call from the ridges. They time their whole breeding cycle to moonlight, so they can hunt moths on bright nights and feed their young.", "leaf": true, "season": ["spring", "summer"], "near": "southern-blue-ridge" }]
  },
  "night": {
   "light": [{ "t": "On a moonless night in the southern Appalachians the sky is still dark enough to matter, and the Milky Way stands over the ridgelines.", "near": "southern-blue-ridge" }],
   "micro": "The leaf litter is where this forest keeps its wealth. Millipedes, springtails and fungi work through it all night.",
   "macro": [{ "t": "Black bears are moving, following the acorn mast. A good mast year decides how many cubs are born that winter.", "season": "autumn" }]
  }
 },
 "atlantic-europe": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "boreal-europe": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "boreal-forest": {
  "first-light": {
   "light": "First light comes up through the trees rather than over them — the sun is still below the horizon and the forest floor gets only what the sky scatters down.",
   "micro": [{ "t": "Dew has been condensing on every needle and leaf since midnight. On a good morning a mature spruce sheds litres of it, and that drip is a real part of what waters the forest floor.", "leaf": true }],
   "macro": [{ "t": "Mist sits on every lake in the drainage. It is the water giving back heat it stored yesterday, and it will burn off from the shallow bays first.", "leaf": true }]
  },
  "sunrise": {
   "light": "The sun clears the treeline and cuts across the water in a flat band. Anything east-facing gets light half an hour before anything west-facing does.",
   "micro": [{ "t": "In that first band of light the water surface film warms by a degree or two and the insects trapped in it start to move. Everything that eats them knows this.", "leaf": true }],
   "macro": [{ "t": "The dawn chorus peaks. Birds sing hardest now because still cold air carries sound furthest, and there is not yet enough light to feed by.", "leaf": true, "season": ["spring", "summer"] }]
  },
  "morning": {
   "light": "The sun climbs through the canopy gaps and the forest floor goes from even shade to a shifting mosaic of sunflecks.",
   "micro": "Those sunflecks are how the understorey lives. A wood sorrel or a young fir gets most of its annual carbon from a handful of minutes of direct sun per day, and it can switch on its photosynthesis within seconds to catch them.",
   "macro": [{ "t": "The lake stratifies again as the surface warms. By late morning there is a distinct warm layer sitting on the cold, and the fish sort themselves by temperature within it.", "leaf": true }]
  },
  "midday": {
   "light": "The sun tops out between about 58° at the region’s northern edge and 67° at its southern one, and much lower the rest of the year. Straight down through the canopy, only two to five per cent of it reaches the ground.",
   "micro": [{ "t": "Under a closed canopy it is several degrees cooler and much more humid than in the clearing thirty metres away. That gradient is why the chanterelles are in the shade and the blueberries are in the open.", "leaf": true }],
   "macro": [{ "t": "Convection builds towering cumulus. From above, the lakes stay clear and the forest grows cloud — the pattern is visible from orbit.", "season": "summer" }]
  },
  "afternoon": {
   "light": "The sun works round to the west and the light lengthens again. The forest's own temperature peaks now, an hour or two behind the sun.",
   "micro": [{ "t": "The forest floor is at its driest and its warmest. Fungal mycelium in the duff has slowed right down and will not fruit until the ground cools and wets again.", "leaf": true }],
   "macro": [{ "t": "The afternoon breeze is the lake breathing — cool air off the water pushing inland under the rising warm air over the forest, reliably, every clear day.", "bigLake": true, "leaf": true }]
  },
  "golden-hour": {
   "light": "The sun drops back into the trees and the light comes sideways through the trunks in long bars. Every horizontal surface catches it and the water turns to metal.",
   "micro": [{ "t": "Insects rise into the warm air column above the water as the surface starts giving up its heat. This is the hatch, and it is why fish come up.", "leaf": true }],
   "macro": [{ "t": "The whole lake turns over its activity in about forty minutes: perch settle, walleye lift off the break, bats leave the shoreline trees.", "leaf": true, "fish": "walleye" }]
  },
  "dusk": {
   "light": "The sun is gone but the sky above the treeline is still bright. Down at ground level it is already night.",
   "micro": [{ "t": "Ground-level air cools faster than the air a metre up and the whole forest floor becomes a shallow pool of cold. Moths and mosquitoes lift out of it into the warmer layer above.", "leaf": true }],
   "macro": "Cold air drains off the ridges into the valleys and river bottoms. On a still clear night the frost will land in the low ground and miss the slope entirely."
  },
  "night": {
   "light": "With no moon the shield is properly dark — dark enough that the Milky Way casts a shadow on snow. The aurora sits over it thirty or forty nights a year.",
   "micro": [{ "t": "Under the leaf litter the soil is still warm from the afternoon and the decomposers keep working. Most of the year's decay happens on nights like this.", "leaf": true }],
   "macro": [{ "t": "The lake, having stored more heat than the land, is now the warmest thing in the landscape, and it holds the frost off its own shoreline for weeks each autumn.", "bigLake": true }]
  }
 },
 "boreal-north": {
  "first-light": {
   "light": ["At this latitude the sun does not so much rise as slide along under the horizon, and first light can last two hours.", ...whiteNights(" In June it never properly ends."), " In December it is most of what the day offers."],
   "micro": "Frost needles stand on the muskeg moss, each one grown overnight out of water vapour rather than dew. Under them the moss and the peat beneath it insulate the ground: their trapped air slows the summer's heat on its way down, which helps the permafrost below survive.",
   "macro": "Cold air has drained off the higher ground all night and pooled in the valleys, so the low places are colder than the hills above them — the inversion that puts frost in the hollow and not on the ridge."
  },
  "sunrise": {
   "light": "The sun comes up far round to the north-east in summer and well round to the south-east in the depths of winter, and it climbs at a shallow angle: at the solstices the whole disc takes five minutes or more to clear the horizon, against about three around the Great Lakes.",
   "micro": "The first light hits the black spruce trunks side-on and the lichen on them starts to soften: it has been brittle all night and it rehydrates from the air before the sun can dry it again.",
   "macro": [{ "t": "A hundred kilometres of lake surface, flat and steaming, begins to move. The cold air above it starts to lift and the day's first wind arrives on shore.", "bigLake": true, "leaf": true }]
  },
  "morning": {
   "light": "The sun climbs slowly and never gets very high — even at midsummer it tops out near {noon}°, and the light stays raking rather than overhead.",
   "micro": [{ "t": "Spruce needles open their stomata and start losing water to the air.", "leaf": true }],
   "macro": [{ "t": "Cumulus builds over the forest and not over the water, because the land heats faster. The clouds map the shoreline for you from the air.", "leaf": true }]
  },
  "midday": {
   "light": "Even at its highest the sun here is well short of overhead, so shadows are long all day and the north side of everything stays cold.",
   "micro": "On the ground the difference between a sunlit patch of moss and a shaded one can be fifteen degrees. Insects commute between them all day rather than regulating their own heat.",
   "macro": [{ "t": "The permafrost boundary is a real line across the continent and it moves with these summer days. Each warm one thaws a few more centimetres of the active layer, and each one releases carbon that has been locked away since the ice.", "leaf": true }]
  },
  "afternoon": {
   "light": ["The sun swings far round to the west and stays low", { "t": ", and the long afternoon runs on into evening without much changing", "months": [5, 6, 7] }, "."],
   "micro": [{ "t": "The lake surface has taken all day to warm the top half-metre. Below that it is still a few degrees above freezing, which is why the lake trout never came up.", "leaf": true, "fish": "lake-trout" }],
   "macro": [{ "t": "Thunderstorms fire over the burns and the rock barrens where the ground gets hottest, and lightning starts more fires. Half the boreal forest's renewal runs on exactly this.", "season": "summer" }]
  },
  "golden-hour": {
   "light": "Golden hour in the taiga is not an hour. In June it stretches across most of the evening, and the low sun turns the spruce and the water to copper.",
   "micro": [{ "t": "Mosquitoes and blackflies come off the water as the wind drops — they need still air, and the evening calm delivers it.", "leaf": true }],
   "macro": [{ "t": "The whole northern flyway is moving. Millions of waterfowl use these lakes as the staging ground, and the evening flights between roost and feed are the loudest hour of the day.", "leaf": true, "season": ["spring", "autumn"] }]
  },
  "dusk": {
   "light": "The sun sets round to the north-west in summer and the sky never fully darkens; there is only a long blue hour that hands over to the next morning.",
   "micro": "Heat radiates straight up off the open muskeg into a clear sky and the surface drops below the air temperature within minutes. Frost is possible here in any month of the year.",
   "macro": [{ "t": "Loons call across the lakes — a sound that carries kilometres over cold flat water because the temperature inversion bends it back down instead of letting it escape upward.", "leaf": true }]
  },
  "night": {
   "light": [...whiteNights("For a few weeks in summer there is no night at all. "), "In midwinter the night is most of the day, and the aurora over this latitude is the sun still reaching you, by another route entirely."],
   "micro": "Under the snow in winter it is a steady handful of degrees below freezing while the air above is at minus forty. Voles and shrews live their whole winter in that gap, and lynx hunt them by sound through it.",
   "macro": "Cold air settles over the whole shield and the pressure rises. It is these enormous stable domes of Arctic high pressure that break out south and become the cold snaps in Toronto and Chicago a week later."
  }
 },
 "cape-fynbos": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "central-hardwoods": {
  "first-light": {
   "light": "The sun is still under the horizon and light comes level across the fields before it ever gets into the woodlots.",
   "micro": "Dew forms heaviest in the open and least under the canopy. In an oak-hickory woodland the ground is dry at dawn while the pasture beside it is soaked.",
   "macro": "River valleys hold fog until the sun gets on them."
  },
  "sunrise": {
   "light": "The sun clears the treeline and floods the field edges.",
   "micro": [{ "t": "A shagbark hickory's plates lift away from the trunk, and bats roost in that gap. They are just now coming back to it.", "season": "summer" }],
   "macro": null
  },
  "morning": {
   "light": ["The sun climbs steeply.", { "t": " By mid-morning the canopy has closed and the understorey is back in green shade.", "leaf": true }],
   "micro": [{ "t": "A mature white oak moves several hundred litres of water a day up through wood that is mostly dead. Only the outer rings are alive; the rest is plumbing and scaffold.", "leaf": true }],
   "macro": null
  },
  "midday": {
   "light": ["The sun tops out near {noon}° in summer.", { "t": " In a closed oak canopy, one to five per cent reaches the ground.", "leaf": true }],
   "micro": [{ "t": "Pawpaw grows in that deep shade and is the only host plant the zebra swallowtail will use.", "leaf": true }],
   "macro": null
  },
  "afternoon": {
   "light": [{ "t": "Heat peaks and the humidity with it. This is where continental air meets Gulf moisture and the afternoon usually shows it.", "season": "summer" }],
   "micro": [{ "t": "Leaf surfaces are at their hottest and stomata start closing to save water, which stops photosynthesis. The tree loses the middle of the day to heat.", "leaf": true }],
   "macro": [{ "t": "Squall lines march east across the region on a summer afternoon, organised into lines a hundred kilometres long by the wind shear ahead of them.", "season": "summer" }]
  },
  "golden-hour": {
   "light": "The sun sets across open farmland with nothing to stop it, and the long light picks out every fencerow and woodlot.",
   "micro": [{ "t": "Fireflies come out of the grass at a specific light level, not a specific time, and each species has its own flash pattern and its own preferred height above the ground.", "season": "summer" }],
   "macro": "Deer move to the field edges. The whole landscape's wildlife is edge-adapted, because for two centuries this landscape has been almost entirely edge."
  },
  "dusk": {
   "light": "The sky holds light over the flat country long after the sun is down.",
   "micro": [{ "t": "Nocturnal moths take over the pollination shift and the evening primrose and datura open for them, timed to the dark rather than to any hour.", "leaf": true }],
   "macro": null
  },
  "night": {
   "light": ["Farm country is dark between the towns.", { "t": " The summer Milky Way stands up over the corn.", "season": "summer" }],
   "micro": "In the litter, morel mycelium is doing its work. It fruits in spring after the soil passes about ten degrees, and it fruits hardest where something died — a burn, an old orchard, a dying elm.",
   "macro": "The Mississippi flyway runs overhead."
  }
 },
 "congo-basin": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "continental-europe": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "deserts": {
  "first-light": {
   "light": "The coldest moment of the day arrives right before the sun does. Clear dry air means the desert loses everything it gained, every single night.",
   "micro": "Dew or even frost on the cactus spines. Those spines are modified leaves, and one of their jobs is to condense moisture and drip it to the roots — as well as to shade the plant and to keep animals off it.",
   "macro": null
  },
  "sunrise": {
   "light": "The sun comes over the range and the light goes straight from cold blue to hot orange in about ten minutes. There is no soft transition in a dry atmosphere.",
   "micro": [{ "t": "This is the window. Lizards come out and press themselves flat against east-facing rock, basking until their bodies reach about 35 °C.", "highAtLeast": REPTILE_HIGH_C }],
   "macro": [{ "t": "Sky islands: small mountain ranges standing out of the Sonoran and Chihuahuan deserts, with forest and woodland on top. The warming and drying since the ice ages has cut each one off from the others and from the Sierra Madre to the south.", "area": "madrean-sky-islands" }]
  },
  "morning": {
   "light": "The sun climbs fast and the shade shrinks. By nine in summer the useful part of the day is nearly over.",
   "micro": [{ "t": "A saguaro's pleats expand and contract like an accordion. After a good rain it can take up several hundred litres in a day and swell visibly, then live off it for a year.", "area": "saguaro-range" }],
   "macro": [{ "t": "Desert rain is intense and local. A summer monsoon cell can drop twenty millimetres on one wash and nothing at all a kilometre away, and the flood that arrives down that wash may come from a storm you never saw.", "area": "north-american-monsoon" }]
  },
  "midday": {
   "light": [{ "t": "Merciless. Ground surface temperatures on desert pavement can pass seventy degrees, well above what any mammal can survive contact with.", "season": "summer" }],
   "micro": [{ "t": "Almost nothing is above ground. The entire visible fauna of the desert at noon in July is a few lizards and some ants, and everything else is in a burrow where it is thirty degrees cooler and much more humid.", "season": "summer" }],
   "macro": [{ "t": "Creosote spreads by cloning. In a hard drought its old branches die back, and when the rain returns new shoots come from the outside of the crown, so a clone slowly widens into a ring many metres across. The largest clone in Johnson Valley, in the Mojave, is estimated at 9,400 years old.", "area": "hot-deserts" }]
  },
  "afternoon": {
   "light": "The heat peaks in mid-afternoon and the thermals rise off the flats hard enough to see.",
   "micro": "Cactus keeps its stomata shut all day and opens them only after dark — CAM photosynthesis, storing carbon dioxide overnight as an acid and using it in the light. It is the single adaptation that makes a cactus possible.",
   "macro": [{ "t": "In monsoon season the towers build over the sky islands and drift out over the flats.", "area": "madrean-sky-islands" }, { "t": " The smell before a desert rain is real: creosote's oils releasing as the humidity rises, minutes before the first drop.", "area": "hot-deserts" }]
  },
  "golden-hour": {
   "light": ["The desert's hour. Low sun across red rock", { "t": ", the shadows of the saguaro running fifty metres,", "area": "saguaro-range" }, " and the whole range lit from the side."],
   "micro": [{ "t": "Lizards get a second working shift as the rock gives back its heat. Snakes come out onto the still-warm sand and stay there.", "highAtLeast": REPTILE_HIGH_C }],
   "macro": [{ "t": "Lesser long-nosed bats pollinate the saguaro and the agave — the flowers open at night, smell of rotting fruit, and are shaped for a bat's face.", "area": "saguaro-range", "season": "summer" }]
  },
  "dusk": {
   "light": "With the sun gone the temperature falls all night. On an average day this month the low is {dayRange} °C below the high.",
   "micro": [{ "t": "Night-blooming cereus opens for one night only, once or twice a year, always after dark, and is finished by morning. The whole plant is an unremarkable stick for the other three hundred and sixty-four days.", "area": "saguaro-range" }],
   "macro": "The desert's activity peaks now and will stay high until first light. In a hot desert, ninety per cent of the mammal life is nocturnal, and the daytime is the aberration."
  },
  "night": {
   "light": null,
   "micro": "Kangaroo rats never drink. They get their water from metabolising dry seeds, they do not sweat, and their nasal passages recapture moisture from their own breath before they exhale it.",
   "macro": "The ground releases the day's heat all night and the plants take it. Many desert species do most of their year's growing in the dark, on stored carbon and stored water, entirely out of sight."
  }
 },
 "east-african-highlands": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "florida-peninsula": {
  "first-light": {
   "light": null,
   "micro": "Dew on the sawgrass and condensation on every leaf.",
   "macro": [{ "t": "The Everglades is a slow, shallow river that can spread almost fifty kilometres wide. In summer it moves up to a kilometre and a half a day; in winter it slows to about thirty metres. At dawn you can see the sheet of it catching the light.", "near": "everglades" }]
  },
  "sunrise": {
   "light": [{ "t": "The sun comes up out of the Atlantic on one coast and over the Everglades on the other, and the peninsula is narrow enough that both happen within a few minutes.", "near": "everglades", "coast": "on", "area": "florida-atlantic-coast" }],
   "micro": [{ "t": "In the mangroves, prop roots are exposed by the tide and covered in oysters and barnacles. The tree is excluding salt at the root — filtering out ninety per cent of it before the water ever gets in.", "salt": true }],
   "macro": [{ "t": "Snook slide out of the shadow lines they hunted all night. Tarpon roll in the passes on the tide. The night shift on both coasts ends at almost exactly the same light level.", "salt": true, "fish": "snook" }]
  },
  "morning": {
   "light": "The sun climbs fast and steep. Even in December it gets to nearly 40°; in June it goes almost overhead.",
   "micro": "Sabal palm has no growth rings and no true wood — it is a monocot, closer to grass than to oak, and its trunk is a bundle of fibres that lets it bend ninety degrees in a hurricane and stand back up.",
   "macro": "Florida is underlain by a thick sequence of limestone and dolomite, and the Floridan aquifer in it supplies most of the state's drinking water. Most of Florida's springs are in the northern half of the state; their water averages about 24 °C in central Florida and about 21 °C in the north."
  },
  "midday": {
   "light": "In midsummer the sun passes within a few degrees of directly overhead, and shadows shrink to almost nothing.",
   "micro": [{ "t": "In a rockland hammock, a dense tropical hardwood forest on high limestone, the closed canopy evens out the heat of the day and the chill of the night. Gumbo limbo, pigeon plum and strangler fig grow in it. Many of the hammock's species reach the northern edge of their range in Florida, and forests like it grow in the Bahamas and the West Indies.", "area": "rockland-hammock" }],
   "macro": [{ "t": "Convection is building over the interior. The two sea breezes, one from each coast, push inland and collide over the middle of the peninsula, which is why central Florida is the lightning capital of North America.", "season": "summer" }]
  },
  "afternoon": {
   "light": [{ "t": "The sun swings west and the sea-breeze collision fires. The storm is often visible from thirty kilometres away as a wall.", "season": "summer" }],
   "micro": [{ "t": "In the shallow water of the glades the temperature and oxygen swing hard. Fish concentrate in the deeper gator holes — which the alligators themselves dig and maintain, and which carry the whole system through the dry season.", "near": "everglades" }],
   "macro": null
  },
  "golden-hour": {
   "light": "The sun sets into the Gulf on the west coast and behind the state on the east. Sanibel and Naples get the postcard; Miami gets the afterglow.",
   "micro": [{ "t": "The mangrove shadow line is the sharp edge between shaded and lit water. Snook sit in the dark side and eat what swims through the light.", "salt": true, "fish": "snook" }],
   "macro": "Wading birds head to their roosts in the thousands. In the dry season, when the water concentrates the fish, the rookeries here are among the great wildlife spectacles of the continent."
  },
  "dusk": {
   "light": "Quick tropical dusk — about half an hour from sunset to full dark, against an hour and a half in the far north.",
   "micro": "The land breeze has not started yet and the air goes completely still. Mosquitoes and no-see-ums take exactly this window.",
   "macro": [{ "t": "Sea turtles come ashore on the Atlantic beaches to nest after dark, guided by the brightness of the horizon over the water. Artificial light on the beach breaks that cue and the hatchlings go the wrong way.", "coast": "on", "area": "florida-atlantic-coast", "months": [3, 4, 5, 6, 7, 8, 9, 10] }]
  },
  "night": {
   "light": [{ "t": "Warm and loud.", "season": "summer" }, { "t": " The moon over the flats is bright enough to fish by, and many people do.", "salt": true }],
   "micro": [{ "t": "Bioluminescent plankton in the lagoons flare on a moonless summer night — every fish that moves leaves a green streak.", "salt": true }],
   "macro": "The peninsula funnels migrating birds south to its tip and holds them there waiting for a wind to cross the Gulf. On the right April night, radar shows the whole state departing at once."
  }
 },
 "great-lakes-st-lawrence": {
  "first-light": {
   "light": ["The sun is still under the horizon", { "t": " and the light comes up over the lake first — on the north shore of Ontario or Erie, water brightens before land", "lake": true }, "."],
   "micro": [{ "t": "Dew is heaviest on the mown grass and lightest under the trees, because the canopy has been radiating heat back down all night. You can read where the frost will land by where the dew is.", "leaf": true }],
   "macro": [{ "t": "Lake-effect: the water is warmer than the air for most of autumn, so the mist rises off it in columns and the whole basin exhales at once.", "lake": true }]
  },
  "sunrise": {
   "light": [{ "t": "The sun clears the far shore and lays a path across the water. It", "lake": true }, { "t": "The sun", "lake": false }, " rises well north of east in June and well south of it in December — a swing of about seventy degrees across the year."],
   "micro": [{ "t": "In the first minutes of direct light the surface film warms and midges and mayflies start to move in it.", "leaf": true }, { "t": " Smallmouth come up onto the rock for exactly this window.", "leaf": true, "fish": "smallmouth-bass" }],
   "macro": "The whole basin's dawn chorus rolls west with the terminator — Kingston is singing while Windsor is still dark."
  },
  "morning": {
   "light": ["The sun climbs steeply", { "t": ", and by mid-morning the maple canopy has closed over the forest floor for the day", "leaf": true }, "."],
   "micro": [{ "t": "A sugar maple leaf is now at full stomatal opening and moving water hard. A big maple can put through hundreds of litres in a day, and it is that pull, not any pump, that lifts water twenty metres.", "leaf": true }],
   "macro": [{ "t": "Cumulus starts to build inland but not over the lakes — the water stays cool and suppresses convection. That gap in the cloud is the shape of the lake, drawn on the sky.", "lake": true }]
  },
  "midday": {
   "light": "The sun peaks near {noon}° at midsummer and near {winterNoon}° at the winter solstice. That forty-seven-degree swing — the same everywhere, because it is just twice the tilt of the planet — is the whole reason this region has four real seasons.",
   "micro": [{ "t": "On the forest floor it is cool and green-lit — the canopy has filtered out the red and blue that the leaves above used, leaving light that is nearly useless to anything trying to grow underneath.", "leaf": true }],
   "macro": [{ "t": "Out on the lake the thermocline is set for the day: a warm layer on top, a sharp drop, and cold water below. Every fish in the lake has chosen its side of that line.", "lake": true }]
  },
  "afternoon": {
   "light": "The sun works west and the day's heat peaks now. On the water the wind usually peaks with it.",
   "micro": [{ "t": "The soil surface is at its warmest and driest.", "leaf": true }],
   "macro": [{ "t": "The lake breeze front pushes inland — sometimes fifty kilometres — and where it collides with the warm inland air it triggers a line of thunderstorms that follows the shoreline's shape.", "lake": true }]
  },
  "golden-hour": {
   "light": [{ "t": "The light goes long and warm across the water and the whole basin turns amber.", "lake": true }],
   "micro": "Mayflies come off the surface in their millions on a June evening. It is the shortest adult life in fresh water — a day at most, no mouth, one purpose.",
   "macro": [{ "t": "Walleye lift off the breaks all across the basin at the same relative moment: not a clock time, but a light level. Sunset moves an hour and a half between Quebec City and Thunder Bay and the fish move with it.", "fish": "walleye" }]
  },
  "dusk": {
   "light": [{ "t": "The sun drops behind the far shore and the sky above the lake holds light for another half hour, because there is nothing between you and the horizon.", "lake": true }],
   "micro": "Ground cools fast in the open and slowly under the trees. In a frost-prone valley the difference between a bed under an apple tree and a bed in the open can be the whole harvest.",
   "macro": [{ "t": "The lakes now start to give back the heat they took all summer. That stored warmth is why the Niagara peninsula grows peaches at the same latitude as southern Maine.", "lake": true }]
  },
  "night": {
   "light": "The basin glows from below with city light, and most of the stars are gone from it.",
   "micro": [{ "t": "Slugs, earthworms and ground beetles work the same square metre in shifts. The soil surface is more alive at two in the morning than at two in the afternoon.", "leaf": true }],
   "macro": [{ "t": "In autumn the lakes are warm and the air is cold, and the difference drives the snow machine: cold air crosses forty kilometres of open water, picks up heat and moisture, and unloads it on the far shore in metres.", "lake": true }]
  }
 },
 "great-plains": {
  "first-light": {
   "light": "There is nothing in the way. First light on the plains starts as a thin band across the whole eastern horizon and rises as a wall.",
   "micro": "Dew and frost settle heavily on the grass because the sky is clear and there is nothing to radiate heat back down. On the shortgrass prairie the ground can be freezing while the air a metre up is not.",
   "macro": null
  },
  "sunrise": {
   "light": "The sun clears a horizon that is genuinely flat, so sunrise is fast — no ridge to wait for. The whole grassland lights at once.",
   "micro": "Big bluestem stems catch light along their whole length. This grass puts two thirds of itself underground: root systems two metres deep, which is why prairie survives both fire and drought.",
   "macro": null
  },
  "morning": {
   "light": "The sun climbs into a big empty sky. On a clear plains morning visibility can run to a hundred kilometres.",
   "micro": [{ "t": "Grass leaves roll up as the day heats, closing their stomata inward to cut water loss. You can read the day's water stress by how tightly the blades are rolled.", "leaf": true }],
   "macro": "The land warms fast and the wind starts. On the plains the wind is the default state — a still day here is the remarkable one."
  },
  "midday": {
   "light": "The sun tops out near {noon}° in summer, and with no shade anywhere it is unmediated. Surface temperatures on bare prairie soil can hit sixty degrees.",
   "micro": "Below ground it is a different world. Half a metre down the soil holds a steady, cool temperature.",
   "macro": [{ "t": "The dryline sits somewhere in the western plains — a sharp boundary between dry desert air and humid Gulf air.", "season": ["spring", "summer"] }]
  },
  "afternoon": {
   "light": [{ "t": "The sun swings west and the towers go up. On the high plains you can watch a storm build for two hours before it reaches you.", "season": "summer" }],
   "micro": [{ "t": "The prairie is transpiring hard and the humidity right at grass level is far higher than in the air above. That thin humid layer is where the insects are, and where the grassland birds hunt.", "leaf": true }],
   "macro": [{ "t": "Supercells fire along the dryline.", "season": ["spring", "summer"] }]
  },
  "golden-hour": {
   "light": [{ "t": "Low sun across grass with a hundred kilometres of sky behind it, and the storm anvils lit orange from underneath.", "season": "summer" }],
   "micro": [{ "t": "Grass seed heads glow from behind. The whole prairie turns the colour of the species that dominates it — bluestem copper, grama bronze, needlegrass silver.", "leaf": true }],
   "macro": null
  },
  "dusk": {
   "light": "Dusk runs long across the flat, and the sky in the east goes purple with the Earth's shadow while the west is still burning.",
   "micro": [{ "t": "Heat pours off the ground into the clear sky and the surface temperature falls fifteen degrees in an hour. Grass insects drop into the litter to stay in the warmth.", "leaf": true }],
   "macro": [{ "t": "The nocturnal low-level jet spins up — a ribbon of fast wind a few hundred metres above the plains that only exists at night. It moves Gulf moisture north and it is why so many plains thunderstorms happen in the small hours.", "season": "summer" }]
  },
  "night": {
   "light": "Away from the towns the Milky Way is bright enough to read the ground by.",
   "micro": null,
   "macro": "Sandhill cranes on the Platte in March: half a million birds on sixty kilometres of river, roosting in the shallows overnight and lifting off at dawn."
  }
 },
 "guinean-forest": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "gulf-coast": {
  "first-light": {
   "light": [{ "t": "First light on the bayou is grey and flat. There is so much water vapour in the air that the sky lightens evenly rather than in bands.", "near": "gulf-coast-belt" }],
   "micro": [{ "t": "Every cypress knee and every Spanish moss beard is dripping. Spanish moss is not a parasite and has no roots — it takes everything it needs from exactly this, the water and dust in the air.", "near": "gulf-coast-belt", "area": "bald-cypress-west" }],
   "macro": [{ "t": "Fog sits on the water and the marsh.", "near": "gulf-coast-belt" }]
  },
  "sunrise": {
   "light": [{ "t": "The sun comes up across open water and marsh with nothing in the way, and lights the top third of the cypress before anything else.", "near": "gulf-coast-belt", "coast": "on", "area": "bald-cypress-west" }],
   "micro": [{ "t": "In the shallow water the temperature is already climbing. A bayou can gain five degrees in the surface half-metre before the morning is out, and the oxygen falls as it does.", "near": "gulf-coast-belt", "season": "summer" }],
   "macro": [{ "t": "Redfish are up on the flats with the tide. The Gulf's tide is small — often under half a metre — so wind does as much as the moon here, and a hard south wind can flood a marsh the tide alone never would.", "salt": true, "fish": "redfish" }]
  },
  "morning": {
   "light": "The sun climbs quickly through a humid sky. Direct light is strong but diffuse — the haze scatters it in every direction.",
   "micro": [{ "t": "Bald cypress does something no other conifer here does: it drops its needles for winter and grows knees up out of the water. Nobody is entirely sure what the knees are for, and the honest answer is still that we do not know.", "area": "bald-cypress-west" }],
   "macro": [{ "t": "This is the drain for forty per cent of the continental United States. Everything the Mississippi basin does — every field, every city — arrives here.", "near": "gulf-coast-belt", "river": "Mississippi" }]
  },
  "midday": {
   "light": ["The sun goes near {noon}° in summer.", { "t": " There is effectively no shadow at noon and the heat index runs far above the air temperature because the humidity stops sweat working.", "season": "summer" }],
   "micro": [{ "t": "In the water column the thermocline sets up in even a shallow bayou, and the oxygen below it can hit zero by afternoon. Fish stack above that line and nowhere else.", "near": "gulf-coast-belt", "season": "summer" }],
   "macro": [{ "t": "Out in the Gulf, the dead zone: a low-oxygen area the size of a small state, driven by nutrient runoff from the whole basin, appearing every summer and gone by autumn.", "near": "gulf-coast-belt" }]
  },
  "afternoon": {
   "light": [{ "t": "Heat and humidity peak, and the sky starts to go dark in the south-west.", "season": "summer" }],
   "micro": [{ "t": "The marsh grass is at its most stressed. Salt is concentrating in the sediment as water evaporates, and the plants are excreting it through glands on their leaves — you can taste it.", "salt": true, "season": "summer" }],
   "macro": [{ "t": "The afternoon storm builds and breaks. On the Gulf Coast this is not weather, it is schedule; you can set your day by it from June to September.", "near": "gulf-coast-belt", "months": [6, 7, 8, 9] }]
  },
  "golden-hour": {
   "light": null,
   "micro": [{ "t": "The water surface begins to give back its heat and the oxygen creeps up with it. Fish that have been deep and sullen all afternoon come up onto the flats.", "salt": true, "season": "summer" }],
   "macro": [{ "t": "Shrimp move on the tide at dusk, and everything follows the shrimp. The whole Gulf food web is timed to that migration.", "salt": true }]
  },
  "dusk": {
   "light": [{ "t": "Dusk is short and warm. The heat does not leave with the light.", "season": "summer" }],
   "micro": [{ "t": "Mosquitoes lift out of the marsh in clouds. The salt-marsh mosquito lays in mud rather than water and can wait years for a flood tide to hatch.", "salt": true, "leaf": true }],
   "macro": [{ "t": "In late summer the whole coast watches the Gulf. Sea-surface temperature above about 26 °C is fuel, and the hurricane season is that number written across a whole ocean basin.", "near": "gulf-coast-belt" }]
  },
  "night": {
   "light": [{ "t": "Warm and heavy.", "season": "summer" }],
   "micro": [{ "t": "Alligators are hunting by the pressure sensors dotted along their jaws as much as by sight. Their eyes shine back red in a torch beam across a hundred metres of black water.", "near": "gulf-coast-belt" }],
   "macro": [{ "t": "Marsh grass decays into the sediment and builds the land — or fails to.", "near": "gulf-coast-belt", "salt": true }, { "t": " Where the sediment supply is cut off by levees, Louisiana loses a football field of coast roughly every hour and a half.", "near": "gulf-coast-belt", "salt": true, "admin1": "Louisiana" }]
  }
 },
 "highveld-drakensberg": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "madagascar-islands": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "mediterranean-california": {
  "first-light": {
   "light": "Cool, often foggy near the coast, clear inland. The Central Valley gets tule fog in winter that can sit for days without lifting at all.",
   "micro": [{ "t": "Dew on the chaparral is precious. Many of these shrubs have leaves angled edge-on to the midday sun and waxy surfaces that shed heat — every feature is about surviving a rainless summer.", "outside": "central-valley" }],
   "macro": "This is one of only five Mediterranean climates on Earth. Wet winters, bone-dry summers, and a plant community found in this combination almost nowhere else."
  },
  "sunrise": {
   "light": "The sun comes over the Sierra or the coast ranges, and the inland valleys light before the fog-bound coast does.",
   "micro": "California poppies open with the sun and close again at dusk and in cloud. That opening is a temperature and light response, and on a cold overcast day they simply never open at all.",
   "macro": "In a wet spring the desert and foothill wildflower bloom can be visible from orbit. It happens when the rain comes at the right time and in the right sequence, which is roughly one year in ten."
  },
  "morning": {
   "light": ["The sun climbs.", { "t": " This is the dry season: in an average year this month brings less than 5 mm of rain here.", "rainBelow": 5 }],
   "micro": [{ "t": "Coast live oak leaves are small, thick and cupped, holding a still layer of humid air against the underside where the stomata are. It is a design for a place that will not rain again for five months.", "season": "summer", "outside": "central-valley" }],
   "macro": [{ "t": "Redwoods grow wild only where heavy summer fog comes in off the ocean: a coastal strip 8 to 56 kilometres wide, from the far south-west corner of Oregon to southern Monterey County.", "near": "redwood-belt" }]
  },
  "midday": {
   "light": [{ "t": "Strong, clear and dry. Inland the Central Valley bakes; on the coast the fog may still not have lifted ten kilometres away.", "season": "summer" }],
   "micro": [{ "t": "Chaparral shrubs are in summer dormancy — not dead, just shut down, waiting. Many will not put on growth again until the first rains of November.", "season": "summer", "outside": "central-valley" }],
   "macro": [{ "t": "The fire ecology is not a malfunction. Many of these plants need fire: manzanita and ceanothus seed banks are cracked open by heat, and some cones need it to open at all. The problem is frequency and where people have built, not fire itself.", "outside": "central-valley" }]
  },
  "afternoon": {
   "light": "The hottest hours.",
   "micro": [{ "t": "The chaparral's oils volatilise in the heat and you can smell the hillside from a distance. Those same oils are why it burns the way it does.", "season": "summer", "outside": "central-valley" }],
   "macro": [{ "t": "That inland heat draws the marine air through every gap in the coast ranges.", "season": "summer" }]
  },
  "golden-hour": {
   "light": [{ "t": "The famous light. Dry clear air, low sun, golden hills — the state's name for its summer colour is not a coincidence.", "season": "summer" }],
   "micro": [{ "t": "The hills are gold because the annual grasses have finished. Most of them are European invaders that arrived with the Spanish, and they die back by June where the native perennial bunchgrasses stayed green.", "season": "summer" }],
   "macro": [{ "t": "Steelhead and salmon wait in the estuaries and lagoons for the first rains to open the river mouths. Some years the bar never breaks and the run does not happen.", "coast": "near", "fish": "chinook-salmon" }]
  },
  "dusk": {
   "light": "Quick clean dusk inland, long and grey on the fog coast.",
   "micro": "The land cools and the offshore flow begins. In autumn, when a high builds over the Great Basin, that flow becomes the Santa Ana or the Diablo — hot, bone-dry, and downslope.",
   "macro": "Those winds are when the worst fires run. The fuel has had five months without rain and the wind can push a fire faster than anything can move ahead of it."
  },
  "night": {
   "light": "Clear and cooling fast inland; damp and grey on the coast.",
   "micro": ["Kangaroo rats and pocket mice forage the dry ground", { "t": ", and rattlesnakes hunt them by heat", "highAtLeast": REPTILE_HIGH_C }, ". Almost all desert and chaparral mammal activity is nocturnal, for the simple reason that water is cheaper at night."],
   "macro": "Winter is when this landscape lives. Everything green, everything growing and almost all the year's rain happens between November and March, and the rest of the year is spent waiting."
  }
 },
 "mediterranean-europe": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "namib-karoo": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "north-africa-mediterranean": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "northeast-coast": {
  "first-light": {
   "light": null,
   "micro": [{ "t": "Salt crystals left by last night's spray sit on the beach grass. They are hygroscopic — they pull moisture out of the dawn air, which is part of how a dune plant drinks.", "coast": "on" }],
   "macro": [{ "t": "The land is colder than the sea at this hour, so the breeze runs offshore. It will reverse by mid-morning and reverse again tonight, every clear day, all summer.", "coast": "on" }]
  },
  "sunrise": {
   "light": null,
   "micro": [{ "t": "In the salt marsh the cordgrass stems are wet to the tide line and dry above it, and the ribbed mussels between them open the moment the water reaches them — tide first, sun second.", "salt": true }],
   "macro": [{ "t": "Striped bass that hunted the bars all night are dropping back into the channels. The whole night shift on this coast ends within about twenty minutes of the sun clearing the water.", "coast": "on", "fish": "striped-bass" }]
  },
  "morning": {
   "light": [{ "t": "The sun climbs quickly at this latitude and by mid-morning it is high enough to start heating the sand hard.", "coast": "on", "season": "summer" }],
   "micro": [{ "t": "Dry beach sand can reach fifty degrees by late morning while damp sand a centimetre down stays at twenty. Everything that lives here lives in that centimetre.", "coast": "on" }],
   "macro": [{ "t": "The sea breeze sets in as the land outruns the water. It arrives as a distinct front — you can feel the temperature drop as it crosses the beach.", "coast": "on", "leaf": true }]
  },
  "midday": {
   "light": "The sun tops out near {noon}° in summer.",
   "micro": [{ "t": "Pitch pine and beach plum have small, waxy, often rolled leaves. Every one of those adaptations is about salt and water loss, not about cold.", "coast": "on" }],
   "macro": null
  },
  "afternoon": {
   "light": [{ "t": "The sun swings inland and the sea breeze is at its strongest. The beach is now cooler than the town three kilometres back from it.", "coast": "on", "leaf": true }],
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": [{ "t": "The dune face releases the day's heat and a thin warm layer sits over the sand. Insects rise into it, and the swallows and terns work that layer until dark.", "coast": "on", "leaf": true }],
   "macro": [{ "t": "Bait balls up on the evening tide and the birds find it before you do.", "coast": "on", "leaf": true }]
  },
  "dusk": {
   "light": null,
   "micro": [{ "t": "Above the high-tide line, sand fleas and beach hoppers come out of the wrack by the million. They have been buried since dawn.", "coast": "on", "leaf": true }],
   "macro": [{ "t": "The land cools faster than the sea and the breeze reverses again, running offshore all night and carrying the smell of the pines out over the water.", "coast": "on" }]
  },
  "night": {
   "light": [{ "t": "The tide is the moon made visible, and the spring tides at new and full run highest and lowest.", "tidal": true }],
   "micro": [{ "t": "Horseshoe crabs — a design essentially unchanged for four hundred and fifty million years — come ashore to spawn on the high spring tides of the May and June new and full moons, and at almost no other time.", "coast": "on" }],
   "macro": "The whole Atlantic flyway is overhead. Most songbird migration happens at night, and on a good May night the radar out of Boston lights up with birds rather than rain."
  }
 },
 "pacific-maritime": {
  "first-light": {
   "light": ["Grey first, often.", { "t": " In summer marine layer cloud sits over the coast most mornings and the light comes up through it rather than under it.", "months": [6, 7, 8] }],
   "micro": "Every needle, every frond of sword fern, every metre of moss is loaded with water. In this forest the moss is a reservoir — it can hold many times its own weight and it releases it slowly all summer.",
   "macro": null
  },
  "sunrise": {
   "light": "The sun comes up behind the Cascades or the Coast Range and takes its time getting over. On the outer coast the sea stays dark while the peaks light.",
   "micro": [{ "t": "In the intertidal, the tide is what matters, not the sun. Sea stars, anemones and chitons are working a clock set by the moon, and the lowest tides of the year — the ones that expose the good stuff — come in early summer mornings.", "coast": "on" }],
   "macro": null
  },
  "morning": {
   "light": [{ "t": "The marine layer burns back from the inland edge first. Inland valleys clear by mid-morning; the outer coast may stay in fog all day.", "months": [6, 7, 8] }],
   "micro": "Under the canopy the light is green and dim — one to two per cent of full sun. Sword fern and salal are built for it, and they will grow in light that would kill almost anything from a drier place.",
   "macro": "The rain shadow is absolute. The Olympic Peninsula's west side gets three and a half metres a year; Sequim, sixty kilometres to the north-east, gets four hundred millimetres and grows lavender."
  },
  "midday": {
   "light": "Even at midsummer the sun only reaches about {noon}° here, low compared to the south.",
   "micro": "Nurse logs: a big fallen tree takes a century or so to decay, and in the meantime it is the nursery. Hemlock seedlings grow along it in a straight line, and when it finally rots away they are left standing on stilt roots.",
   "macro": "This forest's soil is thin and the nutrients are in the wood and the fungi."
  },
  "afternoon": {
   "light": ["The afternoon is the warm part of the day", { "t": ", and in summer the marine layer waits offshore to come back in", "months": [6, 7, 8] }, "."],
   "micro": [{ "t": "Salmon in the river are holding in the deepest, coolest water they can find and moving at dawn and dusk. Above about 21 °C they stop moving upstream at all.", "season": "summer", "fish": "chinook-salmon" }],
   "macro": "Every salmon that dies upstream is nitrogen carried in from the Pacific. You can measure marine nitrogen in the growth rings of a streamside cedar — the trees are, in a real sense, made partly of fish."
  },
  "golden-hour": {
   "light": [{ "t": "When the marine layer holds off, the light", "months": [6, 7, 8] }, { "t": "The light", "months": [1, 2, 3, 4, 5, 9, 10, 11, 12] }, " comes in flat under the canopy from the west and the whole forest floor lights up sideways for twenty minutes."],
   "micro": "Banana slugs come out onto the trail as the humidity climbs. They are decomposers and seed dispersers.",
   "macro": [{ "t": "Coho and chinook stage in the estuaries on the evening tide, waiting for rain to raise the river enough to run it.", "salt": true, "fish": "coho-salmon" }]
  },
  "dusk": {
   "light": "Dusk under old growth arrives an hour before it does in the open. The canopy takes the last of the light early.",
   "micro": "Northern flying squirrels come out. They eat truffles — the fruiting bodies of the mycorrhizal fungi — and spread the spores through the forest in their droppings. The forest depends on them for it.",
   "macro": [{ "t": "The marine layer pushes back inland overnight, up the valleys, and by morning it will be sitting in the same place it was yesterday.", "months": [6, 7, 8] }]
  },
  "night": {
   "light": "Overcast most nights. When it does clear, the mountains block half the sky.",
   "micro": "The decomposers work all night in the wet: fungi, bacteria, springtails, and the enormous invertebrate biomass of the litter.",
   "macro": "Northern spotted owls hunt by night from the south-western mainland of British Columbia, north to Carpenter Lake and west to Howe Sound, through western Washington and Oregon to San Francisco Bay."
  }
 },
 "pannonian-steppe": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "sahara-nile": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "sahel-savanna": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "southeastern": {
  "first-light": {
   "light": "First light comes up humid and grey. This far south the day changes length far less across the year, so dawn moves by only a couple of hours between June and December.",
   "micro": ["Dew is total. Everything is soaked", { "t": ", and spider orbs across the longleaf understorey are suddenly visible — hundreds of them in a hectare that you could not see yesterday", "area": "atlantic-coastal-plain" }, "."],
   "macro": "Fog sits in the bottomland along every creek and river, and lifts off the uplands first."
  },
  "sunrise": {
   "light": ["The sun comes up through the pines in long bars.", { "t": " In an open longleaf stand the light reaches the ground almost immediately — this is a forest with a grass floor.", "area": "atlantic-coastal-plain" }],
   "micro": [{ "t": "Wiregrass and the young longleaf in their grass stage are wet with dew. A longleaf seedling spends up to seven years looking like a tussock of grass, putting everything into a taproot and waiting out the fires.", "area": "atlantic-coastal-plain" }],
   "macro": [{ "t": "Longleaf pine savanna once ran from Virginia to Texas.", "area": "atlantic-coastal-plain" }]
  },
  "morning": {
   "light": [{ "t": "The sun climbs fast and high and the humidity rises with it. By mid-morning it is already the kind of heat that dictates the rest of the day.", "season": "summer" }],
   "micro": [{ "t": "Longleaf's needles are long and clustered at the branch tips, which lets light through to the grass below and lets fire run underneath without reaching the crown. Everything about this tree is built around burning.", "area": "atlantic-coastal-plain" }],
   "macro": [{ "t": "Fire is the keystone here, not rain. Lightning-set fires every two or three years keep the hardwoods out and the savanna open. Suppress fire for a decade and the whole system converts to something else.", "area": "atlantic-coastal-plain" }]
  },
  "midday": {
   "light": "The sun goes near {noon}° in summer — close enough to overhead that shadows almost disappear at noon.",
   "micro": [{ "t": "Gopher tortoise burrows run ten metres back and three metres down, and inside them it is cool and stable. Over three hundred other species use those burrows, which is why the tortoise is the animal this whole system depends on.", "area": "gopher-tortoise-range" }],
   "macro": [{ "t": "Afternoon convection is building.", "season": "summer" }]
  },
  "afternoon": {
   "light": [{ "t": "The sun swings west through a haze of its own making — humidity, pine volatiles and heat shimmer.", "season": "summer" }],
   "micro": [{ "t": "Leaves have closed down. Carbon fixing has largely stopped and will not restart properly until the temperature drops this evening.", "season": "summer" }],
   "macro": null
  },
  "golden-hour": {
   "light": ["The light goes long and gold through the pine trunks", { "t": " and the wiregrass lights up from behind", "area": "atlantic-coastal-plain" }, "."],
   "micro": [{ "t": "The heat comes off the sand and the insects lift. Nighthawks and chimney swifts work the column, and bats come in behind them.", "area": "atlantic-coastal-plain", "season": "summer" }],
   "macro": [{ "t": "This is when the woods sound like themselves: chuck-will's-widow starts up, and the whole insect chorus of a southern summer night comes on within about fifteen minutes.", "season": "summer" }]
  },
  "dusk": {
   "light": "Dusk is quick here compared to the north — the sun drops at a steeper angle and the light goes in about forty minutes.",
   "micro": [{ "t": "The sand releases its heat and the surface temperature falls faster than the air. Reptiles that have been in the burrows all afternoon come out onto the warm sand now.", "area": "atlantic-coastal-plain", "season": "summer" }],
   "macro": [{ "t": "Humidity does not fall with the sun. The night stays warm and heavy, and decay continues at close to daytime rates — one reason the litter layer here is so much thinner than in the north.", "season": "summer" }]
  },
  "night": {
   "light": [{ "t": "Warm, close and loud. On a summer night the insect noise is continuous enough to make conversation difficult.", "season": "summer" }],
   "micro": [{ "t": "Fungal and bacterial decay runs all night at these temperatures. Nutrients cycle fast here — the soil is poor precisely because nothing stays in it long.", "season": "summer" }],
   "macro": [{ "t": "Fire ants, mosquitoes and the whole southern night shift are working. So are the flying squirrels, which are far more abundant in these woods than the daytime greys and which almost nobody sees.", "season": "summer" }]
  }
 },
 "southern-savanna": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "swahili-coast": {
  "first-light": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "sunrise": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "morning": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "midday": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "afternoon": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "golden-hour": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "dusk": {
   "light": null,
   "micro": null,
   "macro": null
  },
  "night": {
   "light": null,
   "micro": null,
   "macro": null
  }
 },
 "western-mountains": {
  "first-light": {
   "light": "Alpenglow: the high peaks light pink while the valleys are still fully dark, because at altitude the sun clears the horizon a good half hour earlier than it does at the bottom.",
   "micro": highTowns("At altitude the thin air holds little heat overnight and the ground radiates straight out to space."),
   "macro": "Cold air has drained off every peak into every valley all night, and it pools deepest in the flat-bottomed parks. That is why the valley floor grows sagebrush and the slope above it grows aspen."
  },
  "sunrise": {
   "light": "The sun comes over the ridge and moves down the opposite slope like a tide. A campsite can watch the light arrive for twenty minutes before it gets there.",
   "micro": "Aspen bark is green under its white powder — it photosynthesises through the trunk, which lets it work on any warm winter day when it has no leaves at all.",
   "macro": "A grove of aspen is usually one organism. The trunks are stems off a single root system, and they leaf out and turn colour in unison."
  },
  "morning": {
   "light": "The sun climbs and the difference between aspects becomes extreme. A south-facing slope is already warm; the north-facing slope opposite may hold snow into July.",
   "micro": [{ "t": "Snowmelt is running under the snowpack, not over it. The meltwater trickles down through the pack and out at the bottom, which is why a mountain stream rises through the afternoon and drops again overnight.", "months": [3, 4, 5, 6] }],
   "macro": "The whole West's water supply is this: snow banked at altitude through winter, released slowly through spring and summer."
  },
  "midday": {
   "light": "The sun is at its highest and so is the UV. It rises with height, about ten per cent for every thousand metres climbed, and fresh snow almost doubles what reaches you by reflection.",
   "micro": [{ "t": "Pika are working the talus, cutting vegetation and stacking haypiles for winter. They cannot tolerate heat — a few hours above about 25 °C kills them — so they work the cool hours and shelter in the rock through the middle of the day.", "months": [7, 8, 9] }],
   "macro": "Treeline is a line drawn by temperature and wind. Above it, the growing season is too short for a tree to build and harden new wood before the freeze, and everything stays low and matted."
  },
  "afternoon": {
   "light": "The sun swings west and the valley heats. Air rises up the slopes — the anabatic flow, exactly the reverse of the night's drainage.",
   "micro": "That upslope wind carries insects and pollen with it, and swifts and swallows work the ridgeline lift. Golden eagles use the same lift for nothing at all, because it is free.",
   "macro": [{ "t": "In British Columbia lightning starts about six wildfires in ten.", "admin1": "British Columbia", "months": [6, 7, 8] }]
  },
  "golden-hour": {
   "light": "The sun drops behind the western range and the valley loses it early, while the eastern peaks stay lit and glowing for another half hour.",
   "micro": [{ "t": "Trout come up in the pools as the surface cools and the caddis come off. A mountain stream's best hour is nearly always this one.", "leaf": true }],
   "macro": "Elk move out of the timber into the meadows. In September the bulls bugle at exactly this hour — a sound that carries kilometres up a cold valley."
  },
  "dusk": {
   "light": "Dusk is long at altitude because the sun is still lighting the atmosphere far above you long after it has left the ground.",
   "micro": "The temperature drops fast — ten degrees in two hours is ordinary on a clear high-country evening. Alpine flowers close and many of them are shaped as parabolic dishes to hold what warmth they can.",
   "macro": "Katabatic wind starts: cold dense air pouring down every drainage, following the valleys like water. In big terrain it can run at gale force all night."
  },
  "night": {
   "light": null,
   "micro": "Under the snow in winter the subnivean layer stays near freezing while the air above hits minus thirty. Voles tunnel through it all winter and owls hunt them through it by sound alone.",
   "macro": "Cold air ponds in the basins and inverts: on a January night the valley floor can be twenty degrees colder than the ridge two thousand metres above it."
  }
 }
};

/**
 * A creature in a phase: `where` it is and whether this is its peak, or "rest". `where` is printed wherever the
 * creature is shown (the Day page, the guide's day band). A line that names a kind of water is kept in `at`, with the
 * water it needs (src/lib/where.ts `fishIn`), and the Day page prints it instead of `where` only where the fishing page
 * lists the fish in that water today (src/lib/day-page.ts). `at` holds alternatives: the first whose conditions all
 * hold is printed (striped bass's tide: listed in the sea or an estuary, or in the rivers where the river is tidal at the
 * town, as the Delaware at Philadelphia). Audit of 11 November 2026: walleye "on the shoals and weed
 * edges in two to four metres" at Pittsburgh, Columbus and St. Louis, whose pages list walleye only in rivers; striped
 * bass "through the dark and the tide change" at Little Rock, on a dammed river far above tidewater. The same split
 * keeps current seams and tailouts (rainbow and brown trout, steelhead) to rivers, and deep points (muskellunge) and
 * "the top thirty metres of the lake" (chinook) to lakes. `where` is the same line with the water-bound words taken
 * out, nothing added.
 */
/*
 * Day 5 audit (14 November 2026), fish lines that ignored the date: rainbow trout "rising freely to a hatch" at Fairbanks in
 * October beside the frost; bluegill "on the beds" at Austin and San Antonio in October (bluegill beds are spawning beds, a
 * season, and no line here knows the month); Chinook and coho "Inactive in this phase" at Victoria at midday while the
 * fishing page lists them, on a "rest" written for no particular water or season. The hatch is now said only as a
 * condition ("when there is a hatch"), the beds are gone (the weed edges and flats are left), and the salmon have no
 * "rest" phases: a phase with no entry lists the fish neither active nor inactive, which claims nothing.
 */
export type RhythmEntry = { where: string; peak: boolean; at?: StoryPiece[] } | "rest";

/** What a creature is doing in each phase. */
export const DAY_RHYTHMS: Record<string, Partial<Record<DayPhase, RhythmEntry>>> = {
 "walleye": {
  "first-light": {
   "where": "Hunting into the shallows as the light goes.",
   "at": [{ "t": "Up on the shoals and weed edges in two to four metres, hunting into the shallows as the light goes.", "fishIn": { "fish": "walleye", "waters": ["lakes"] } }],
   "peak": false
  },
  "sunrise": {
   "where": "Hunting into the shallows as the light goes.",
   "at": [{ "t": "Up on the shoals and weed edges in two to four metres, hunting into the shallows as the light goes.", "fishIn": { "fish": "walleye", "waters": ["lakes"] } }],
   "peak": false
  },
  "morning": "rest",
  "midday": "rest",
  "afternoon": "rest",
  "golden-hour": {
   "where": "Hunting into the shallows as the light goes.",
   "at": [{ "t": "Up on the shoals and weed edges in two to four metres, hunting into the shallows as the light goes.", "fishIn": { "fish": "walleye", "waters": ["lakes"] } }],
   "peak": true
  },
  "dusk": {
   "where": "Hunting into the shallows as the light goes.",
   "at": [{ "t": "Up on the shoals and weed edges in two to four metres, hunting into the shallows as the light goes.", "fishIn": { "fish": "walleye", "waters": ["lakes"] } }],
   "peak": true
  },
  "night": {
   "where": "Hunting into the shallows as the light goes.",
   "at": [{ "t": "Up on the shoals and weed edges in two to four metres, hunting into the shallows as the light goes.", "fishIn": { "fish": "walleye", "waters": ["lakes"] } }],
   "peak": false
  }
 },
 "smallmouth-bass": {
  "first-light": {
   "where": "Rock points and current seams; up on top at first and last light, and willing to chase a surface lure then.",
   "peak": true
  },
  "sunrise": {
   "where": "Rock points and current seams; up on top at first and last light, and willing to chase a surface lure then.",
   "peak": false
  },
  "morning": {
   "where": "Rock points and current seams; up on top at first and last light, and willing to chase a surface lure then.",
   "peak": false
  },
  "midday": {
   "where": "Rock points and current seams; up on top at first and last light, and willing to chase a surface lure then.",
   "peak": false
  },
  "afternoon": {
   "where": "Rock points and current seams; up on top at first and last light, and willing to chase a surface lure then.",
   "peak": false
  },
  "golden-hour": {
   "where": "Rock points and current seams; up on top at first and last light, and willing to chase a surface lure then.",
   "peak": true
  },
  "dusk": {
   "where": "Rock points and current seams; up on top at first and last light, and willing to chase a surface lure then.",
   "peak": false
  },
  "night": "rest"
 },
 "largemouth-bass": {
  "first-light": {
   "where": "Cruising the weed edges, pads and shallow flats, ambushing anything that moves across the top.",
   "peak": true
  },
  "sunrise": {
   "where": "Cruising the weed edges, pads and shallow flats, ambushing anything that moves across the top.",
   "peak": false
  },
  "morning": {
   "where": "Cruising the weed edges, pads and shallow flats, ambushing anything that moves across the top.",
   "peak": false
  },
  "midday": {
   "where": "Cruising the weed edges, pads and shallow flats, ambushing anything that moves across the top.",
   "peak": false
  },
  "afternoon": {
   "where": "Cruising the weed edges, pads and shallow flats, ambushing anything that moves across the top.",
   "peak": false
  },
  "golden-hour": {
   "where": "Cruising the weed edges, pads and shallow flats, ambushing anything that moves across the top.",
   "peak": false
  },
  "dusk": {
   "where": "Cruising the weed edges, pads and shallow flats, ambushing anything that moves across the top.",
   "peak": true
  },
  "night": "rest"
 },
 "northern-pike": {
  "first-light": "rest",
  "sunrise": {
   "where": "Sitting still in the weeds in one to three metres, facing out, waiting. Pike hunt by sight and prefer daylight to dark.",
   "peak": false
  },
  "morning": {
   "where": "Sitting still in the weeds in one to three metres, facing out, waiting. Pike hunt by sight and prefer daylight to dark.",
   "peak": true
  },
  "midday": {
   "where": "Sitting still in the weeds in one to three metres, facing out, waiting. Pike hunt by sight and prefer daylight to dark.",
   "peak": false
  },
  "afternoon": {
   "where": "Sitting still in the weeds in one to three metres, facing out, waiting. Pike hunt by sight and prefer daylight to dark.",
   "peak": true
  },
  "golden-hour": {
   "where": "Sitting still in the weeds in one to three metres, facing out, waiting. Pike hunt by sight and prefer daylight to dark.",
   "peak": false
  },
  "dusk": "rest",
  "night": "rest"
 },
 "muskellunge": {
  "first-light": "rest",
  "sunrise": {
   "where": "Moving along weed edges, often following without taking. The last hour of light is the famous one.",
   "at": [{ "t": "Moving along weed edges and over deep points, often following without taking. The last hour of light is the famous one.", "fishIn": { "fish": "muskellunge", "waters": ["lakes"] } }],
   "peak": false
  },
  "morning": {
   "where": "Moving along weed edges, often following without taking. The last hour of light is the famous one.",
   "at": [{ "t": "Moving along weed edges and over deep points, often following without taking. The last hour of light is the famous one.", "fishIn": { "fish": "muskellunge", "waters": ["lakes"] } }],
   "peak": false
  },
  "midday": {
   "where": "Moving along weed edges, often following without taking. The last hour of light is the famous one.",
   "at": [{ "t": "Moving along weed edges and over deep points, often following without taking. The last hour of light is the famous one.", "fishIn": { "fish": "muskellunge", "waters": ["lakes"] } }],
   "peak": false
  },
  "afternoon": {
   "where": "Moving along weed edges, often following without taking. The last hour of light is the famous one.",
   "at": [{ "t": "Moving along weed edges and over deep points, often following without taking. The last hour of light is the famous one.", "fishIn": { "fish": "muskellunge", "waters": ["lakes"] } }],
   "peak": false
  },
  "golden-hour": {
   "where": "Moving along weed edges, often following without taking. The last hour of light is the famous one.",
   "at": [{ "t": "Moving along weed edges and over deep points, often following without taking. The last hour of light is the famous one.", "fishIn": { "fish": "muskellunge", "waters": ["lakes"] } }],
   "peak": true
  },
  "dusk": {
   "where": "Moving along weed edges, often following without taking. The last hour of light is the famous one.",
   "at": [{ "t": "Moving along weed edges and over deep points, often following without taking. The last hour of light is the famous one.", "fishIn": { "fish": "muskellunge", "waters": ["lakes"] } }],
   "peak": true
  },
  "night": "rest"
 },
 "lake-trout": {
  "first-light": {
   "where": "Shallow in spring and fall — right up on the rock in a few metres at first light, before the sun gets on the water.",
   "peak": true
  },
  "sunrise": {
   "where": "Shallow in spring and fall — right up on the rock in a few metres at first light, before the sun gets on the water.",
   "peak": true
  },
  "morning": "rest",
  "midday": "rest",
  "afternoon": "rest",
  "golden-hour": {
   "where": "Shallow in spring and fall — right up on the rock in a few metres at first light, before the sun gets on the water.",
   "peak": false
  },
  "dusk": {
   "where": "Shallow in spring and fall — right up on the rock in a few metres at first light, before the sun gets on the water.",
   "peak": false
  },
  "night": "rest"
 },
 "rainbow-trout": {
  "first-light": {
   "where": "Feeding, and rising to insects when there is a hatch.",
   "at": [{ "t": "Working the seams and feeding lanes where current delivers food, and rising to insects when there is a hatch.", "fishIn": { "fish": "rainbow-trout", "waters": ["rivers"] } }],
   "peak": false
  },
  "sunrise": {
   "where": "Feeding, and rising to insects when there is a hatch.",
   "at": [{ "t": "Working the seams and feeding lanes where current delivers food, and rising to insects when there is a hatch.", "fishIn": { "fish": "rainbow-trout", "waters": ["rivers"] } }],
   "peak": true
  },
  "morning": {
   "where": "Feeding, and rising to insects when there is a hatch.",
   "at": [{ "t": "Working the seams and feeding lanes where current delivers food, and rising to insects when there is a hatch.", "fishIn": { "fish": "rainbow-trout", "waters": ["rivers"] } }],
   "peak": false
  },
  "midday": "rest",
  "afternoon": {
   "where": "Feeding, and rising to insects when there is a hatch.",
   "at": [{ "t": "Working the seams and feeding lanes where current delivers food, and rising to insects when there is a hatch.", "fishIn": { "fish": "rainbow-trout", "waters": ["rivers"] } }],
   "peak": false
  },
  "golden-hour": {
   "where": "Feeding, and rising to insects when there is a hatch.",
   "at": [{ "t": "Working the seams and feeding lanes where current delivers food, and rising to insects when there is a hatch.", "fishIn": { "fish": "rainbow-trout", "waters": ["rivers"] } }],
   "peak": true
  },
  "dusk": {
   "where": "Feeding, and rising to insects when there is a hatch.",
   "at": [{ "t": "Working the seams and feeding lanes where current delivers food, and rising to insects when there is a hatch.", "fishIn": { "fish": "rainbow-trout", "waters": ["rivers"] } }],
   "peak": false
  },
  "night": "rest"
 },
 "brown-trout": {
  "first-light": {
   "where": "After dark the big ones leave cover and hunt the shallows.",
   "at": [{ "t": "After dark the big ones leave cover and hunt the shallows and the tailouts.", "fishIn": { "fish": "brown-trout", "waters": ["rivers"] } }],
   "peak": false
  },
  "sunrise": "rest",
  "morning": "rest",
  "midday": "rest",
  "afternoon": "rest",
  "golden-hour": {
   "where": "After dark the big ones leave cover and hunt the shallows.",
   "at": [{ "t": "After dark the big ones leave cover and hunt the shallows and the tailouts.", "fishIn": { "fish": "brown-trout", "waters": ["rivers"] } }],
   "peak": false
  },
  "dusk": {
   "where": "After dark the big ones leave cover and hunt the shallows.",
   "at": [{ "t": "After dark the big ones leave cover and hunt the shallows and the tailouts.", "fishIn": { "fish": "brown-trout", "waters": ["rivers"] } }],
   "peak": true
  },
  "night": {
   "where": "After dark the big ones leave cover and hunt the shallows.",
   "at": [{ "t": "After dark the big ones leave cover and hunt the shallows and the tailouts.", "fishIn": { "fish": "brown-trout", "waters": ["rivers"] } }],
   "peak": true
  }
 },
 "yellow-perch": {
  "first-light": "rest",
  "sunrise": {
   "where": "Roaming in schools over sand and weed in three to eight metres, feeding steadily all day.",
   "peak": false
  },
  "morning": {
   "where": "Roaming in schools over sand and weed in three to eight metres, feeding steadily all day.",
   "peak": true
  },
  "midday": {
   "where": "Roaming in schools over sand and weed in three to eight metres, feeding steadily all day.",
   "peak": false
  },
  "afternoon": {
   "where": "Roaming in schools over sand and weed in three to eight metres, feeding steadily all day.",
   "peak": true
  },
  "golden-hour": {
   "where": "Roaming in schools over sand and weed in three to eight metres, feeding steadily all day.",
   "peak": false
  },
  "dusk": "rest",
  "night": "rest"
 },
 "black-crappie": {
  "first-light": {
   "where": "Suspended over brush and around lit docks after dark, looking upward for anything silhouetted.",
   "peak": false
  },
  "sunrise": {
   "where": "Suspended over brush and around lit docks after dark, looking upward for anything silhouetted.",
   "peak": false
  },
  "morning": "rest",
  "midday": "rest",
  "afternoon": "rest",
  "golden-hour": {
   "where": "Suspended over brush and around lit docks after dark, looking upward for anything silhouetted.",
   "peak": false
  },
  "dusk": {
   "where": "Suspended over brush and around lit docks after dark, looking upward for anything silhouetted.",
   "peak": true
  },
  "night": {
   "where": "Suspended over brush and around lit docks after dark, looking upward for anything silhouetted.",
   "peak": true
  }
 },
 "bluegill": {
  "first-light": "rest",
  "sunrise": {
   "where": "Along the weed edges and the shallow flats.",
   "peak": false
  },
  "morning": {
   "where": "Along the weed edges and the shallow flats.",
   "peak": true
  },
  "midday": {
   "where": "Along the weed edges and the shallow flats.",
   "peak": false
  },
  "afternoon": {
   "where": "Along the weed edges and the shallow flats.",
   "peak": true
  },
  "golden-hour": {
   "where": "Along the weed edges and the shallow flats.",
   "peak": false
  },
  "dusk": "rest",
  "night": "rest"
 },
 "channel-catfish": {
  "first-light": {
   "where": "Out on the flats and up in the shallows, hunting by smell and by the lateral line, not by sight.",
   "peak": false
  },
  "sunrise": "rest",
  "morning": "rest",
  "midday": "rest",
  "afternoon": "rest",
  "golden-hour": {
   "where": "Out on the flats and up in the shallows, hunting by smell and by the lateral line, not by sight.",
   "peak": false
  },
  "dusk": {
   "where": "Out on the flats and up in the shallows, hunting by smell and by the lateral line, not by sight.",
   "peak": false
  },
  "night": {
   "where": "Out on the flats and up in the shallows, hunting by smell and by the lateral line, not by sight.",
   "peak": true
  }
 },
 "chinook-salmon": {
  "first-light": {
   "where": "Moving up through the low light.",
   "at": [{ "t": "Moving up through the low light — river mouths at dawn, or the top thirty metres of the lake before the sun hits.", "fishIn": { "fish": "chinook-salmon", "waters": ["lakes"] } }],
   "peak": true
  },
  "dusk": {
   "where": "Moving up through the low light.",
   "at": [{ "t": "Moving up through the low light — river mouths at dawn, or the top thirty metres of the lake before the sun hits.", "fishIn": { "fish": "chinook-salmon", "waters": ["lakes"] } }],
   "peak": true
  }
 },
 "coho-salmon": {
  "sunrise": {
   "where": "Near the surface and aggressive in low light, chasing bait right on top.",
   "peak": true
  },
  "morning": {
   "where": "Near the surface and aggressive in low light, chasing bait right on top.",
   "peak": false
  },
  "dusk": {
   "where": "Near the surface and aggressive in low light, chasing bait right on top.",
   "peak": false
  }
 },
 "steelhead": {
  "first-light": {
   "where": "Moving in low light.",
   "at": [{ "t": "Moving between pools in low light, and holding in the tailouts and the soft seams to rest.", "fishIn": { "fish": "steelhead", "waters": ["rivers"] } }],
   "peak": true
  },
  "morning": {
   "where": "Moving in low light.",
   "at": [{ "t": "Moving between pools in low light, and holding in the tailouts and the soft seams to rest.", "fishIn": { "fish": "steelhead", "waters": ["rivers"] } }],
   "peak": false
  },
  "midday": "rest",
  "afternoon": {
   "where": "Moving in low light.",
   "at": [{ "t": "Moving between pools in low light, and holding in the tailouts and the soft seams to rest.", "fishIn": { "fish": "steelhead", "waters": ["rivers"] } }],
   "peak": false
  },
  "golden-hour": {
   "where": "Moving in low light.",
   "at": [{ "t": "Moving between pools in low light, and holding in the tailouts and the soft seams to rest.", "fishIn": { "fish": "steelhead", "waters": ["rivers"] } }],
   "peak": true
  },
  "night": "rest"
 },
 "striped-bass": {
  "sunrise": {
   "where": "Up in the shallows and on the bars, hunting hard through the dark.",
   "at": [{ "t": "Up in the shallows, on the bars and in the rips, hunting hard through the dark and the tide change.", "fishIn": { "fish": "striped-bass", "waters": ["sea", "estuary"] } }, { "t": "Up in the shallows, on the bars and in the rips, hunting hard through the dark and the tide change.", "fishIn": { "fish": "striped-bass", "waters": ["rivers"] }, "tidal": true }],
   "peak": false
  },
  "morning": "rest",
  "midday": "rest",
  "afternoon": "rest",
  "dusk": {
   "where": "Up in the shallows and on the bars, hunting hard through the dark.",
   "at": [{ "t": "Up in the shallows, on the bars and in the rips, hunting hard through the dark and the tide change.", "fishIn": { "fish": "striped-bass", "waters": ["sea", "estuary"] } }, { "t": "Up in the shallows, on the bars and in the rips, hunting hard through the dark and the tide change.", "fishIn": { "fish": "striped-bass", "waters": ["rivers"] }, "tidal": true }],
   "peak": true
  },
  "night": {
   "where": "Up in the shallows and on the bars, hunting hard through the dark.",
   "at": [{ "t": "Up in the shallows, on the bars and in the rips, hunting hard through the dark and the tide change.", "fishIn": { "fish": "striped-bass", "waters": ["sea", "estuary"] } }, { "t": "Up in the shallows, on the bars and in the rips, hunting hard through the dark and the tide change.", "fishIn": { "fish": "striped-bass", "waters": ["rivers"] }, "tidal": true }],
   "peak": true
  }
 },
 "redfish": {
  "first-light": "rest",
  "sunrise": {
   "where": "Tailing on the shallow flats on a rising tide, backs out of the water, rooting in the grass.",
   "peak": false
  },
  "morning": {
   "where": "Tailing on the shallow flats on a rising tide, backs out of the water, rooting in the grass.",
   "peak": true
  },
  "midday": {
   "where": "Tailing on the shallow flats on a rising tide, backs out of the water, rooting in the grass.",
   "peak": false
  },
  "afternoon": {
   "where": "Tailing on the shallow flats on a rising tide, backs out of the water, rooting in the grass.",
   "peak": false
  },
  "golden-hour": {
   "where": "Tailing on the shallow flats on a rising tide, backs out of the water, rooting in the grass.",
   "peak": true
  },
  "dusk": "rest",
  "night": "rest"
 },
 "speckled-trout": {
  "first-light": {
   "where": "Over grass beds and along drop-offs in low light, and around lights after dark.",
   "peak": true
  },
  "sunrise": {
   "where": "Over grass beds and along drop-offs in low light, and around lights after dark.",
   "peak": false
  },
  "morning": "rest",
  "midday": "rest",
  "afternoon": "rest",
  "golden-hour": {
   "where": "Over grass beds and along drop-offs in low light, and around lights after dark.",
   "peak": false
  },
  "dusk": {
   "where": "Over grass beds and along drop-offs in low light, and around lights after dark.",
   "peak": true
  },
  "night": {
   "where": "Over grass beds and along drop-offs in low light, and around lights after dark.",
   "peak": false
  }
 },
 "snook": {
  "first-light": {
   "where": "Sitting in the shadow line of a lit dock or bridge, facing the current, taking anything the light delivers.",
   "peak": false
  },
  "sunrise": "rest",
  "morning": "rest",
  "midday": "rest",
  "afternoon": "rest",
  "golden-hour": {
   "where": "Sitting in the shadow line of a lit dock or bridge, facing the current, taking anything the light delivers.",
   "peak": false
  },
  "dusk": {
   "where": "Sitting in the shadow line of a lit dock or bridge, facing the current, taking anything the light delivers.",
   "peak": false
  },
  "night": {
   "where": "Sitting in the shadow line of a lit dock or bridge, facing the current, taking anything the light delivers.",
   "peak": true
  }
 },
 "lingcod": {
  "first-light": "rest",
  "morning": {
   "where": "On rocky reefs and pinnacles, ambushing from cover on a moving tide.",
   "peak": true
  },
  "midday": {
   "where": "On rocky reefs and pinnacles, ambushing from cover on a moving tide.",
   "peak": false
  },
  "afternoon": {
   "where": "On rocky reefs and pinnacles, ambushing from cover on a moving tide.",
   "peak": false
  },
  "dusk": "rest",
  "night": "rest"
 },
 "honey-bee": {
  "first-light": "rest",
  "sunrise": "rest",
  "morning": {
   "where": "Working flowers from about 13 °C upward, most heavily mid-morning when nectar has risen and the dew has gone.",
   "peak": true
  },
  "midday": {
   "where": "Working flowers from about 13 °C upward, most heavily mid-morning when nectar has risen and the dew has gone.",
   "peak": true
  },
  "afternoon": {
   "where": "Working flowers from about 13 °C upward, most heavily mid-morning when nectar has risen and the dew has gone.",
   "peak": false
  },
  "golden-hour": "rest",
  "dusk": "rest",
  "night": "rest"
 },
 "bumble-bee": {
  "first-light": {
   "where": "Out early and late — a bumble bee can shiver its flight muscles warm and fly at 5 °C, in drizzle, in wind.",
   "peak": true
  },
  "sunrise": {
   "where": "Out early and late — a bumble bee can shiver its flight muscles warm and fly at 5 °C, in drizzle, in wind.",
   "peak": false
  },
  "morning": {
   "where": "Out early and late — a bumble bee can shiver its flight muscles warm and fly at 5 °C, in drizzle, in wind.",
   "peak": true
  },
  "midday": {
   "where": "Out early and late — a bumble bee can shiver its flight muscles warm and fly at 5 °C, in drizzle, in wind.",
   "peak": false
  },
  "afternoon": {
   "where": "Out early and late — a bumble bee can shiver its flight muscles warm and fly at 5 °C, in drizzle, in wind.",
   "peak": false
  },
  "golden-hour": {
   "where": "Out early and late — a bumble bee can shiver its flight muscles warm and fly at 5 °C, in drizzle, in wind.",
   "peak": false
  },
  "dusk": "rest",
  "night": "rest"
 },
 "hoverfly": {
  "first-light": "rest",
  "sunrise": "rest",
  "morning": {
   "where": "Hanging motionless in a sunbeam, then darting — hoverflies use warm still air and are strongest in the middle of the day.",
   "peak": false
  },
  "midday": {
   "where": "Hanging motionless in a sunbeam, then darting — hoverflies use warm still air and are strongest in the middle of the day.",
   "peak": true
  },
  "afternoon": {
   "where": "Hanging motionless in a sunbeam, then darting — hoverflies use warm still air and are strongest in the middle of the day.",
   "peak": true
  },
  "golden-hour": "rest",
  "dusk": "rest",
  "night": "rest"
 },
 "monarch": {
  "first-light": "rest",
  "sunrise": "rest",
  "morning": {
   "where": "Nectaring in full sun. A butterfly cannot fly until its flight muscles are warm — at least 13 °C, and it flies well only much warmer — so it waits for the sun to do it.",
   "peak": false
  },
  "midday": {
   "where": "Nectaring in full sun. A butterfly cannot fly until its flight muscles are warm — at least 13 °C, and it flies well only much warmer — so it waits for the sun to do it.",
   "peak": true
  },
  "afternoon": {
   "where": "Nectaring in full sun. A butterfly cannot fly until its flight muscles are warm — at least 13 °C, and it flies well only much warmer — so it waits for the sun to do it.",
   "peak": false
  },
  "golden-hour": "rest",
  "dusk": "rest",
  "night": "rest"
 },
 "ladybug": {
  "first-light": "rest",
  "sunrise": "rest",
  "morning": {
   "where": "Walking the growing tips and the undersides of leaves, eating aphids in warm sun.",
   "peak": false
  },
  "midday": {
   "where": "Walking the growing tips and the undersides of leaves, eating aphids in warm sun.",
   "peak": true
  },
  "afternoon": {
   "where": "Walking the growing tips and the undersides of leaves, eating aphids in warm sun.",
   "peak": false
  },
  "golden-hour": "rest",
  "dusk": "rest",
  "night": "rest"
 },
 "praying-mantis": {
  "first-light": "rest",
  "sunrise": {
   "where": "Motionless on a flower head or stem, waiting. A mantis hunts by sight and needs the light.",
   "peak": false
  },
  "morning": {
   "where": "Motionless on a flower head or stem, waiting. A mantis hunts by sight and needs the light.",
   "peak": true
  },
  "afternoon": {
   "where": "Motionless on a flower head or stem, waiting. A mantis hunts by sight and needs the light.",
   "peak": true
  },
  "golden-hour": {
   "where": "Motionless on a flower head or stem, waiting. A mantis hunts by sight and needs the light.",
   "peak": false
  },
  "dusk": "rest",
  "night": "rest"
 },
 "ground-beetle": {
  "first-light": {
   "where": "Running the soil surface after dark, taking slugs, cutworms and larvae.",
   "peak": false
  },
  "sunrise": "rest",
  "morning": "rest",
  "midday": "rest",
  "afternoon": "rest",
  "golden-hour": "rest",
  "dusk": {
   "where": "Running the soil surface after dark, taking slugs, cutworms and larvae.",
   "peak": false
  },
  "night": {
   "where": "Running the soil surface after dark, taking slugs, cutworms and larvae.",
   "peak": true
  }
 },
 "garden-spider": {
  "first-light": "rest",
  "sunrise": {
   "where": "Sitting head-down at the hub of the web. Many rebuild the whole orb at dawn, eating the old silk.",
   "peak": false
  },
  "morning": {
   "where": "Sitting head-down at the hub of the web. Many rebuild the whole orb at dawn, eating the old silk.",
   "peak": true
  },
  "afternoon": {
   "where": "Sitting head-down at the hub of the web. Many rebuild the whole orb at dawn, eating the old silk.",
   "peak": false
  },
  "golden-hour": {
   "where": "Sitting head-down at the hub of the web. Many rebuild the whole orb at dawn, eating the old silk.",
   "peak": false
  },
  "dusk": "rest",
  "night": "rest"
 },
 "earthworm": {
  "first-light": {
   "where": "At the surface after dark and in wet weather, pulling leaves down into the burrow.",
   "peak": false
  },
  "sunrise": "rest",
  "morning": "rest",
  "midday": "rest",
  "afternoon": "rest",
  "golden-hour": "rest",
  "dusk": {
   "where": "At the surface after dark and in wet weather, pulling leaves down into the burrow.",
   "peak": false
  },
  "night": {
   "where": "At the surface after dark and in wet weather, pulling leaves down into the burrow.",
   "peak": true
  }
 },
 "aphid": {
  "first-light": "rest",
  "sunrise": {
   "where": "On the newest growth and the undersides of leaves, reproducing steadily through warm daylight.",
   "peak": false
  },
  "morning": {
   "where": "On the newest growth and the undersides of leaves, reproducing steadily through warm daylight.",
   "peak": true
  },
  "afternoon": {
   "where": "On the newest growth and the undersides of leaves, reproducing steadily through warm daylight.",
   "peak": true
  },
  "golden-hour": {
   "where": "On the newest growth and the undersides of leaves, reproducing steadily through warm daylight.",
   "peak": false
  },
  "dusk": "rest",
  "night": "rest"
 },
 "cabbage-white": {
  "first-light": "rest",
  "sunrise": "rest",
  "morning": {
   "where": "Flying the brassica bed in full sun, laying single yellow eggs on leaf undersides.",
   "peak": false
  },
  "midday": {
   "where": "Flying the brassica bed in full sun, laying single yellow eggs on leaf undersides.",
   "peak": true
  },
  "afternoon": {
   "where": "Flying the brassica bed in full sun, laying single yellow eggs on leaf undersides.",
   "peak": false
  },
  "golden-hour": "rest",
  "dusk": "rest"
 },
 "slug": {
  "first-light": {
   "where": "Out on everything, feeding hardest between midnight and first light, and all day when it is wet.",
   "peak": false
  },
  "sunrise": "rest",
  "morning": "rest",
  "midday": "rest",
  "afternoon": "rest",
  "golden-hour": "rest",
  "dusk": {
   "where": "Out on everything, feeding hardest between midnight and first light, and all day when it is wet.",
   "peak": false
  },
  "night": {
   "where": "Out on everything, feeding hardest between midnight and first light, and all day when it is wet.",
   "peak": true
  }
 },
 "flea-beetle": {
  "first-light": "rest",
  "midday": {
   "where": "Shot-holing leaves on hot bright afternoons — their worst behaviour is in exactly the conditions they like most.",
   "peak": true
  },
  "afternoon": {
   "where": "Shot-holing leaves on hot bright afternoons — their worst behaviour is in exactly the conditions they like most.",
   "peak": true
  },
  "dusk": "rest",
  "night": "rest"
 },
 "cutworm": {
  "first-light": {
   "where": "At the surface after dark, cutting seedlings off at soil level. That is the whole method.",
   "peak": false
  },
  "morning": "rest",
  "midday": "rest",
  "afternoon": "rest",
  "dusk": {
   "where": "At the surface after dark, cutting seedlings off at soil level. That is the whole method.",
   "peak": false
  },
  "night": {
   "where": "At the surface after dark, cutting seedlings off at soil level. That is the whole method.",
   "peak": true
  }
 }
};

/** Phases whose rhythm was never captured. */
export const DAY_RHYTHM_GAPS: Record<string, DayPhase[]> = {
 "chinook-salmon": [
  "sunrise",
  "golden-hour"
 ],
 "coho-salmon": [
  "first-light",
  "golden-hour"
 ],
 "steelhead": [
  "sunrise",
  "dusk"
 ],
 "striped-bass": [
  "first-light",
  "golden-hour"
 ],
 "lingcod": [
  "sunrise",
  "golden-hour"
 ],
 "praying-mantis": [
  "midday"
 ],
 "garden-spider": [
  "midday"
 ],
 "aphid": [
  "midday"
 ],
 "cabbage-white": [
  "night"
 ],
 "flea-beetle": [
  "sunrise",
  "morning",
  "golden-hour"
 ],
 "cutworm": [
  "sunrise",
  "golden-hour"
 ]
};

/** The week's weather character: label, summary, advice, and what it means on the water and on land. */
export const DAY_CHARACTERS: Record<string, { label: string; summary: string; advice: string; water: string; land: string }> = {
 "wet": {
  "label": "Rain",
  "summary": "Intermittent rain. Earthworms surface, slugs are active, mushrooms begin to fruit within two to seven days, and rivers become turbid.",
  "advice": "Check mushroom sites two to seven days from now. Keep off wet beds to avoid compacting them.",
  "water": "Run-off colours the water and washes in food. Fish the inflows and current seams.",
  "land": "Slugs feed through the day as well as at night, and blight spreads in warm, wet air."
 },
 "overcast": {
  "label": "Overcast",
  "summary": "Full cloud cover. Light is flat and diffuse, and the day behaves like an extended dawn: fish range into shallow water, and leafy crops that would bolt in sun hold.",
  "advice": "The whole day is usable: a good day for covering water and for transplanting.",
  "water": "Flat light disperses fish and keeps them in shallow water through the middle of the day.",
  "land": "Good conditions for transplanting and sowing: low light and low water loss."
 },
 "front": {
  "label": "Front passing",
  "summary": "Pressure is changing. The hours before a falling barometer often bring the most active feeding of the week; the bright, cold, high-pressure day after it is usually the least.",
  "advice": "Go before the front arrives. Allow a day afterwards for conditions to settle.",
  "water": "Fish feed actively as pressure falls and stop after the front passes. The two days after a front are usually the slowest.",
  "land": "Expect a wind shift and falling pressure. Stake and tie in plants, and harvest ripe crops before it arrives."
 },
 "bluebird": {
  "label": "Clear and calm",
  "summary": "Clear, bright and still. Pleasant conditions, but difficult fishing: without cloud cover, fish move deep or under cover and feed mainly at dawn and dusk.",
  "advice": "Go out at first light or in the last hours before sunset; midday is least productive.",
  "water": "Bright, still conditions push fish deep, into shade and under cover. Fish early and late.",
  "land": "Maximum photosynthesis and water loss. Beds dry quickly and transplants wilt."
 },
 "heat": {
  "label": "Hot",
  "summary": "Hot. Plant growth is fast but stressed, trout and salmon move to springs and deep water, and early morning and evening are the productive hours.",
  "advice": "Water deeply at dusk rather than at noon. Fish near springs, in shade and in deep water.",
  "water": "Warm water holds less oxygen. Fish near springs, inflows and deep water, and release fish quickly.",
  "land": "Above about 32 °C tomatoes drop their flowers and lettuce turns bitter."
 },
 "frost": {
  "label": "Frost",
  "summary": "After a cold night. The ground is coldest just before dawn and tender plants are at risk; parsnips, kale and sloes improve in flavour after frost.",
  "advice": "Cover tender crops tonight. Leave root crops in the ground; cold improves their flavour.",
  "water": "Cold water slows fish activity. Late morning, after the sun has warmed the shallows, is better than first light.",
  "land": "Frost ruptures the cells of tender plants. Cover or harvest them."
 },
 "windy": {
  "label": "Windy",
  "summary": "Wind dominates the day. It concentrates plankton and baitfish on the windward shore, and the fish follow; it dries beds quickly and damages unstaked tall plants.",
  "advice": "Fish the shore the wind is blowing onto. Stake tomatoes and other tall crops.",
  "water": "Baitfish gather on the windward shore and predators follow. Fish the shore the wind is blowing onto.",
  "land": "Wind dries leaves faster than sun and depletes soil moisture."
 }
};

export type CaptionKind = "land" | "water";

/**
 * The land and water lines above are the whole day's, and were printed under
 * every phase: a clear day's "Maximum photosynthesis and water loss. Beds dry
 * quickly and transplants wilt." is a midday line, and sat under First light,
 * Sunrise and Morning (Ottawa, 2 November 2026). A character whose line holds
 * only at some hours has one entry per phase here, `null` where nothing in the
 * site's own text fits the phase (the panel then shows no line). Every line
 * is the character's own or, for a phase it does not fit, a sentence or clause
 * of that phase's own text in DAY_PHASES above, or the character's line with
 * its midday clause taken out; nothing is new.
 */
export const DAY_CHARACTER_PHASES: Record<string, Partial<Record<CaptionKind, Record<DayPhase, string | null>>>> = {
 "bluebird": {
  "land": {
   "first-light": "The ground is at its coldest point of the whole day.",
   "sunrise": null,
   "morning": "The ground begins to give back what it lost overnight.",
   "midday": "Maximum photosynthesis and water loss. Beds dry quickly and transplants wilt.",
   "afternoon": "The ground is still releasing the morning's heat.",
   "golden-hour": null,
   "dusk": "The ground begins to radiate its heat straight up into a clear sky and cools faster than the air above it.",
   "night": null
  },
  "water": {
   "first-light": "Fish early and late.",
   "sunrise": "Fish early and late.",
   "morning": "Bright, still conditions push fish deep, into shade and under cover. Fish early and late.",
   "midday": "Bright, still conditions push fish deep, into shade and under cover. Fish early and late.",
   "afternoon": "Bright, still conditions push fish deep, into shade and under cover. Fish early and late.",
   "golden-hour": "Fish early and late.",
   "dusk": "Fish early and late.",
   "night": null
  }
 },
 "overcast": {
  "water": {
   "first-light": "Flat light disperses fish and keeps them in shallow water.",
   "sunrise": "Flat light disperses fish and keeps them in shallow water.",
   "morning": "Flat light disperses fish and keeps them in shallow water.",
   "midday": "Flat light disperses fish and keeps them in shallow water through the middle of the day.",
   "afternoon": "Flat light disperses fish and keeps them in shallow water.",
   "golden-hour": "Flat light disperses fish and keeps them in shallow water.",
   "dusk": "Flat light disperses fish and keeps them in shallow water.",
   "night": null
  }
 }
};

/** The key of the line a character shows under a phase: one per phase where the character has per-phase lines, else the one line. */
export function captionKey(character: string, kind: CaptionKind, phase: DayPhase): string {
  return DAY_CHARACTER_PHASES[character]?.[kind] ? `${character}.${kind}.${phase}` : `${character}.${kind}`;
}

/**
 * Weather-character lines that hold only where a crop is in its sowing window at the town today (src/lib/soil-sowing).
 * Audit of 10 November 2026: an overcast day printed "Good conditions for transplanting and sowing" and "a good day
 * ... for transplanting" at Charlottetown, Fredericton, Moncton, Halifax and Portland, on pages whose soil panel said
 * no crop was in its sowing window. The land line is shown (in every phase but Night, as the water line) only when
 * the caller says a window is open; otherwise, and wherever the caller does not know (`sowing` left out), there is no
 * land line and the advice drops its transplanting clause.
 */
export const DAY_CHARACTER_SOWING: Record<string, { land: string; adviceClosed: string }> = {
 "overcast": {
  "land": "Good conditions for transplanting and sowing: low light and low water loss.",
  "adviceClosed": "The whole day is usable: a good day for covering water."
 }
};

/**
 * The land or water line of a weather character for a phase of the day; null when there is none to show. `sowing`:
 * whether a crop is in its sowing window at the town today (unknown when left out, and a sowing line is then not shown).
 */
export function characterCaption(character: string, kind: CaptionKind, phase: DayPhase, opts: { sowing?: boolean } = {}): string | null {
  const gated = kind === "land" ? DAY_CHARACTER_SOWING[character] : undefined;
  if (gated) return opts.sowing === true && phase !== "night" ? gated.land : null;
  const perPhase = DAY_CHARACTER_PHASES[character]?.[kind];
  if (perPhase) return perPhase[phase];
  return DAY_CHARACTERS[character]?.[kind] ?? null;
}

/** A weather character's advice at a town: without its sowing clause unless a crop is in its sowing window there today. */
export function characterAdvice(character: string, opts: { sowing?: boolean } = {}): string {
  const gated = DAY_CHARACTER_SOWING[character];
  return gated && opts.sowing !== true ? gated.adviceClosed : (DAY_CHARACTERS[character]?.advice ?? "");
}

/** What a town is, for the stories' conditions (src/lib/where.ts; worked out by src/lib/place-scope.ts). */
export type StoryShow = PlaceFacts;

/**
 * A region story as a town reads it: its pieces whose conditions hold, joined
 * end to end; null when nothing is left. A plain string is shown as it is
 * (with the town's own figures for `{noon}` and `{winterNoon}`).
 */
export function storyText(text: StoryText | null | undefined, show: StoryShow): string | null {
  return piecesText(text, show);
}
