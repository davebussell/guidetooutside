// Restored from client module 90542 (exports: ECOREGIONS, classifyEcoregion, getEcoregion, libraryMonth, withRegions)
import { continentServed } from "./scope";
let a = [
    {
      slug: "boreal-north",
      name: "Boreal North & Taiga",
      level1: "Taiga / Tundra / Boreal Cordillera",
      zones: "Zones 1–3",
      summary: "Spruce, permafrost and enormous cold lakes. A short, bright season and a very long winter.",
      landscape: "Open black-spruce and tamarack forest, muskeg, tundra beyond the treeline, and huge clear lakes and rivers.",
      gardening: "Raised beds, cold frames and greenhouses; potatoes, brassicas, greens and haskap under 20-hour days.",
      fishing: "Lake trout, northern pike, Arctic grayling, whitefish and Arctic char; ice fishing half the year.",
      foraging: "Blueberries, cloudberries, lingonberries, cranberries, fireweed, spruce tips, Labrador tea and burn-site morels.",
      examples: ["Yellowknife, NT", "Whitehorse, YT", "Thompson, MB", "Fairbanks, AK"],
    },
    {
      slug: "boreal-forest",
      name: "Boreal Forest & Shield",
      level1: "Northern Forests",
      zones: "Zones 2–4",
      summary: "The great northern forest: mixed spruce, pine, birch and aspen over Shield rock and boreal plains, laced with lakes.",
      landscape:
        "Coniferous and mixed forest, granite outcrops, bogs and thousands of lakes — the classic canoe country and northern mining-town landscape.",
      gardening:
        "Short but productive: potatoes, peas, brassicas, roots, haskap and saskatoons; tomatoes and squash from transplants in warm sites.",
      fishing:
        "Walleye, northern pike, lake trout, smallmouth bass (south edge), brook trout in cold streams and whitefish; superb ice fishing.",
      foraging:
        "Wild blueberries, raspberries, chanterelles, boletes, lobster mushrooms, fiddleheads, morels after fire, highbush cranberries and hazelnuts.",
      examples: [
        "Thunder Bay, ON",
        "Sudbury, ON",
        "Timmins, ON",
        "Val-d'Or, QC",
        "Saguenay, QC",
        "Prince George, BC",
        "Fort McMurray, AB",
        "Duluth, MN",
      ],
    },
    {
      slug: "acadian-forest",
      name: "Acadian Forest & Atlantic Coast",
      level1: "Northern Forests (Atlantic Highlands) / Atlantic Maritime",
      zones: "Zones 4–6",
      summary: "Red spruce, sugar maple and yellow birch meet the cold North Atlantic. Fog, long falls and a tidal coastline.",
      landscape: "Mixed Acadian forest, rocky headlands, salt marshes, bogs and the Bay of Fundy tides.",
      gardening:
        "Cool, maritime seasons: brassicas, roots, peas and berries excel; tomatoes and squash want the warmest spot; late springs, long mild falls.",
      fishing:
        "Striped bass, mackerel, Atlantic salmon (catch-and-release rivers), brook trout, smallmouth bass and cod, pollock and haddock offshore.",
      foraging: "Fiddleheads, wild blueberries, chanterelles, sea vegetables (dulse, sea lettuce), rose hips, cranberries and beach peas.",
      examples: ["Halifax, NS", "Fredericton, NB", "Moncton, NB", "Saint John, NB", "Charlottetown, PE", "Portland, ME", "Bangor, ME"],
    },
    {
      slug: "great-lakes-st-lawrence",
      name: "Great Lakes & St. Lawrence Lowlands",
      level1: "Eastern Temperate Forests (Mixed Wood Plains)",
      zones: "Zones 4–7",
      summary:
        "The mixed hardwood heartland of Ontario, Quebec, the Great Lakes states and northern New England. Four real seasons and rich soils.",
      landscape: "Maple-beech-oak forests, farmland and lake-effect weather around the largest freshwater system on Earth.",
      gardening:
        "Everything temperate: tomatoes, corn, squash, apples, grapes and a strong fall garden; lake moderation lengthens fall near the water.",
      fishing: "Great Lakes salmon and steelhead, trophy smallmouth, walleye and perch, pike and muskellunge, brook trout inland.",
      foraging: "Ramps, fiddleheads, morels, wild leeks, berries, black walnuts, hickory nuts, hen of the woods and chicken of the woods.",
      examples: [
        "Toronto, ON",
        "Ottawa, ON",
        "Montréal, QC",
        "Sherbrooke, QC",
        "Kingston, ON",
        "Buffalo, NY",
        "Detroit, MI",
        "Chicago, IL",
        "Milwaukee, WI",
        "Burlington, VT",
      ],
    },
    {
      slug: "northeast-coast",
      name: "Northeast Atlantic Coast & Piedmont",
      level1: "Eastern Temperate Forests",
      zones: "Zones 6–8",
      summary: "The urban Atlantic seaboard from Boston to Richmond: oak-hickory forests, estuaries and a long, humid growing season.",
      landscape: "Coastal plain and rolling Piedmont, tidal rivers, the Chesapeake and Long Island Sound.",
      gardening: "Long season with hot summers: peaches, figs, peppers, sweet potatoes, plus spring and fall cool-season gardens.",
      fishing: "Striped bass, bluefish, fluke and blackfish inshore; largemouth and smallmouth bass, shad runs and trout in the rivers.",
      foraging: "Pawpaws, persimmons, black walnuts, mulberries, wineberries, ramps in the uplands, chanterelles and oyster mushrooms.",
      examples: ["Boston, MA", "New York, NY", "Philadelphia, PA", "Baltimore, MD", "Washington, DC", "Richmond, VA"],
    },
    {
      slug: "appalachian",
      name: "Appalachian Highlands",
      level1: "Eastern Temperate Forests",
      zones: "Zones 5–7",
      // Audit of 11 November 2026: "The oldest mountains on the continent and the most diverse temperate forest" had no
      // source (older belts exist on the continent). The region's own words are kept: its forests, coves, ridges and streams.
      summary: "Mixed mesophytic and oak forest: coves, ridges and cold headwater streams.",
      landscape: "Mixed mesophytic and oak forests, rhododendron hollows, high balds and clear mountain streams.",
      gardening:
        "Elevation sets the season: valleys grow peaches and tomatoes, ridgetops garden like zone 5; superb apples and heirloom beans.",
      fishing: "Wild brook trout, brown and rainbow trout, smallmouth bass in the larger rivers, musky in a few, walleye in reservoirs.",
      foraging: "Ramps, morels, chanterelles, hen of the woods, pawpaws, black walnuts, hickory nuts, chestnuts (Chinese) and wild ginger.",
      examples: ["Asheville, NC", "Pittsburgh, PA", "Roanoke, VA", "Knoxville, TN", "Charleston, WV"],
    },
    {
      slug: "central-hardwoods",
      name: "Central Hardwoods & Interior Plateaus",
      level1: "Eastern Temperate Forests",
      zones: "Zones 5–7",
      summary:
        "The Ohio Valley, Kentucky and Tennessee plateaus, the Ozarks and Missouri: oak-hickory forest broken by farmland and big rivers.",
      landscape: "Rolling hardwood forest, limestone and karst, big warm rivers and reservoirs.",
      gardening:
        "Hot humid summers and cold-enough winters for apples: tomatoes, sweet corn, peppers, okra, plus strong spring and fall gardens.",
      fishing: "Largemouth, smallmouth and spotted bass, crappie, catfish, sauger and walleye in the rivers, trout in tailwaters.",
      foraging: "Morels, chanterelles, pawpaws, persimmons, black walnuts, hickories, wild plums, elderberries and blackberries.",
      examples: ["Columbus, OH", "Indianapolis, IN", "St. Louis, MO", "Nashville, TN", "Louisville, KY", "Springfield, MO"],
    },
    {
      slug: "southeastern",
      name: "Southeastern Piedmont & Coastal Plain",
      level1: "Eastern Temperate Forests",
      zones: "Zones 7–9",
      summary: "Pine and hardwood country from the Carolinas to Georgia and north Florida: long hot summers, short mild winters.",
      landscape: "Longleaf and loblolly pine, oak-hickory uplands, blackwater rivers, swamps and barrier-island coast.",
      gardening:
        "Two full seasons — a heat garden of okra, peppers, sweet potatoes and southern peas, and a winter garden of greens, roots and brassicas.",
      fishing:
        "Largemouth bass, crappie and bream in ponds and reservoirs; redfish, speckled trout and flounder on the coast; stripers in the big rivers.",
      foraging: "Pecans, muscadines, persimmons, chanterelles in summer, blackberries and dewberries, pawpaws and elderberries.",
      examples: ["Atlanta, GA", "Charlotte, NC", "Raleigh, NC", "Savannah, GA", "Jacksonville, FL", "Columbia, SC"],
    },
    {
      slug: "gulf-coast",
      name: "Gulf Coast & Mississippi Lowlands",
      level1: "Eastern Temperate Forests (Coastal Plain)",
      zones: "Zones 8–10",
      summary: "Bottomland hardwoods, bayous, the Mississippi delta and the Gulf shore: humid, rainy and nearly frost-free.",
      landscape: "Cypress-tupelo swamps, coastal marsh, prairie remnants and the Gulf of Mexico.",
      gardening: "A winter vegetable garden and a spring garden bracketing a brutal summer; citrus, figs, pecans and muscadines.",
      fishing: "Redfish, speckled trout, flounder and tarpon inshore; largemouth bass, crappie and catfish in the bayous and reservoirs.",
      foraging: "Pecans, mayhaws, dewberries, muscadines, persimmons, chanterelles after rain and cattail and palmetto hearts.",
      examples: ["Houston, TX", "New Orleans, LA", "Memphis, TN", "Little Rock, AR", "Mobile, AL", "Brownsville, TX"],
    },
    {
      slug: "florida-peninsula",
      name: "Florida Peninsula",
      level1: "Tropical Wet Forests / Southeastern Coastal Plain",
      zones: "Zones 9–11",
      summary: "Subtropical to tropical: flatwoods, wetlands, springs and two coasts. Gardening runs October to May.",
      landscape: "Pine flatwoods, hammocks, the Everglades, spring-fed rivers and thousands of lakes.",
      gardening:
        "Reverse calendar: vegetables in the cool season, tropical fruit (mango, avocado, citrus, papaya) year-round, summer for cover crops and heat lovers.",
      fishing:
        "Largemouth bass, peacock bass and crappie; snook, tarpon, redfish, sea trout and permit inshore; grouper and mahi offshore.",
      foraging: "Sea grapes, cocoplum, saw palmetto, feral citrus and mango, chanterelles and oyster mushrooms in summer.",
      examples: ["Orlando, FL", "Tampa, FL", "Miami, FL", "Fort Myers, FL", "Fort Lauderdale, FL"],
    },
    {
      slug: "great-plains",
      name: "Prairies & Great Plains",
      level1: "Great Plains",
      zones: "Zones 3–9",
      summary: "From the aspen parkland of Alberta to the Texas Hill Country: grassland, big sky, wind, and extremes of cold and heat.",
      landscape: "Tall-, mixed- and shortgrass prairie, river valleys and coulees, potholes and reservoirs, farmland almost everywhere.",
      gardening:
        "Wind and drought management: shelterbelts, mulch and drip; fast-maturing vegetables in the north, two seasons in the south; superb tomatoes and melons with water.",
      fishing:
        "Walleye, sauger, pike and perch in the north; largemouth bass, crappie, white bass, catfish and stripers in southern reservoirs; trout in tailwaters.",
      foraging:
        "Saskatoons, chokecherries, wild plums, sand cherries, buffaloberries, prickly pear (south), morels in river bottoms and pecans in Texas.",
      examples: [
        "Calgary, AB",
        "Edmonton, AB",
        "Saskatoon, SK",
        "Regina, SK",
        "Winnipeg, MB",
        "Fargo, ND",
        "Omaha, NE",
        "Des Moines, IA",
        "Kansas City, MO",
        "Oklahoma City, OK",
        "Dallas, TX",
        "Austin, TX",
        "San Antonio, TX",
        "Denver, CO",
      ],
    },
    {
      slug: "western-mountains",
      name: "Western Mountains & Interior Plateaus",
      level1: "Northwestern Forested Mountains",
      zones: "Zones 3–7",
      summary: "The Rockies, Cascades and BC interior: conifer forest, alpine meadows, dry valleys and cold fast rivers.",
      landscape:
        "Ponderosa and lodgepole pine, Douglas-fir and spruce-fir forest by elevation, sagebrush valleys, glacial lakes and famous trout rivers.",
      gardening:
        "Elevation and frost pockets rule: short seasons and cold nights at altitude, orchards and vineyards in the warm valleys (Okanagan, Bitterroot, Wenatchee).",
      fishing:
        "Cutthroat, rainbow, brown and bull trout, kokanee and lake trout, mountain whitefish; steelhead and salmon in the Snake and Columbia tributaries.",
      foraging:
        "Huckleberries, morels after fire, king boletes and chanterelles, saskatoons, chokecherries, pine nuts (south) and wild onions.",
      examples: ["Kelowna, BC", "Kamloops, BC", "Spokane, WA", "Bozeman, MT", "Missoula, MT", "Salt Lake City, UT", "Flagstaff, AZ"],
    },
    {
      slug: "pacific-maritime",
      name: "Pacific Maritime",
      level1: "Marine West Coast Forest",
      zones: "Zones 7–9",
      summary:
        "Temperate rainforest from Alaska to Oregon: mild wet winters, dry summers and the richest mushroom country on the continent.",
      landscape: "Douglas-fir, western red cedar, hemlock and Sitka spruce, salmon rivers, fjords, tidal flats and the Salish Sea.",
      gardening:
        "Year-round vegetables: winter greens and leeks outdoors, superb berries and brassicas, tomatoes against a warm wall; late cool springs.",
      fishing:
        "Chinook, coho and pink salmon, steelhead, sea-run cutthroat, halibut, lingcod and rockfish; trout and kokanee in the lakes.",
      foraging:
        "Chanterelles, king boletes, matsutake, hedgehogs and morels; salmonberries, huckleberries, salal; nettles, miner's lettuce and seaweed.",
      examples: ["Vancouver, BC", "Victoria, BC", "Nanaimo, BC", "Seattle, WA", "Portland, OR", "Eugene, OR", "Juneau, AK"],
    },
    {
      slug: "mediterranean-california",
      name: "Mediterranean California",
      level1: "Mediterranean California",
      zones: "Zones 8–10",
      summary: "Oak savanna, chaparral and the Central Valley: rain in winter, drought in summer, and something in season every month.",
      landscape: "Coast live oak and valley oak woodlands, chaparral hills, redwood canyons on the coast and irrigated valleys inland.",
      gardening:
        "Plant in fall to ride the rains; cool-season vegetables all winter, heat lovers in summer with irrigation; citrus, figs, avocados, olives and stone fruit.",
      fishing:
        "Striped bass, largemouth bass and sturgeon in the Delta; surfperch, halibut and rockfish on the coast; trout in the Sierra foothills.",
      foraging:
        "Miner's lettuce, wild fennel, mustard, acorns, walnuts, bay nuts, chanterelles and candy caps in winter, elderberries and manzanita berries.",
      examples: ["Sacramento, CA", "San Jose, CA", "San Francisco, CA", "Los Angeles, CA", "Santa Barbara, CA", "San Diego, CA"],
    },
    {
      slug: "deserts",
      name: "Deserts & Dry Basins",
      level1: "North American Deserts",
      zones: "Zones 5–10",
      summary:
        "The Great Basin, Mojave, Sonoran and Chihuahuan deserts and the Columbia and Snake River plateaus: sun, low humidity and cold nights.",
      landscape: "Sagebrush steppe, creosote and saguaro flats, canyon country, ephemeral washes and a few big reservoirs and tailwaters.",
      gardening:
        "Shade cloth, deep mulch and drip; a winter vegetable garden in the low desert, a short intense summer season in the high desert; dates, figs, pomegranates and citrus in the south.",
      fishing:
        "Largemouth and striped bass in the reservoirs (Mead, Powell, Roosevelt), trout in tailwaters and mountain streams, catfish and crappie.",
      foraging:
        "Prickly pear fruit and pads, mesquite pods, cholla buds, saguaro fruit (with permission), piñon nuts, wild grapes in canyons and desert chia.",
      examples: ["Phoenix, AZ", "Tucson, AZ", "Las Vegas, NV", "Albuquerque, NM", "El Paso, TX", "Boise, ID", "Reno, NV"],
    },
    {
      slug: "hawaii-tropics",
      name: "Hawaiʻi & the Tropics",
      level1: "Tropical Wet Forests",
      zones: "Zones 11–13",
      summary:
        "No frost at low elevations — though the high summits of Mauna Kea and Haleakalā see frost and even snow. Elevation and rainfall, not temperature, decide what grows.",
      landscape: "Rainforest, dry leeward slopes, volcanic soils and reef-fringed coast.",
      gardening: "Year-round tropical fruit and vegetables; temperate crops only at elevation; pests and rain, not cold, set the calendar.",
      fishing: "Reef and pelagic saltwater fishing; peacock bass and tilapia in reservoirs.",
      foraging: "Guava, passionfruit, mountain apple and coconut; strict rules on public and private land — ask first.",
      examples: ["Honolulu, HI", "Hilo, HI"],
    },
    {
      slug: "atlantic-europe",
      name: "Atlantic Europe",
      continent: "europe",
      level1: "Atlantic biogeographical region",
      zones: "Zones 7–9",
      summary:
        "Mild, wet and windy: the Gulf Stream keeps winters soft and summers cool from Ireland and Britain to Brittany, the Low Countries and Denmark.",
      landscape: "Hedged fields, oak and beech woods, heath and moor, chalk downs, long estuaries and a rocky, tidal Atlantic coast.",
      gardening:
        "A long, cool season: brassicas, leeks, roots, peas, beans and soft fruit thrive; tomatoes want a greenhouse or a sunny wall in the north; slugs are the main enemy.",
      fishing:
        "Brown trout and sea trout, Atlantic salmon in clean rivers, pike, perch and roach in lakes and canals, carp in still waters; bass, mackerel and pollack from the shore.",
      foraging:
        "Wild garlic, nettles, elderflower and elderberries, blackberries, sloes, hazelnuts, chanterelles and ceps, samphire and seaweeds on the shore.",
      examples: [
        "London, UK",
        "Dublin, Ireland",
        "Edinburgh, UK",
        "Amsterdam, Netherlands",
        "Brussels, Belgium",
        "Paris, France",
        "Bordeaux, France",
        "Copenhagen, Denmark",
      ],
    },
    {
      slug: "continental-europe",
      name: "Continental Europe",
      continent: "europe",
      level1: "Continental biogeographical region",
      zones: "Zones 6–8",
      summary:
        "The heart of Europe: warm summers, real winters, and great beech, oak and pine forests between the farmland and the rivers.",
      landscape:
        "Mixed beech and oak forest, pine heath on sand, river valleys of the Rhine, Elbe, Danube and Vistula, lakes left by the ice in the north.",
      gardening:
        "A proper summer and a frost window like the northern US: tomatoes, beans, squash and cucumbers outdoors after the Ice Saints in mid-May; apples, plums and cherries everywhere.",
      fishing:
        "Pike, perch and zander in lakes and rivers, carp and tench in ponds, brown trout and grayling in cold streams, catfish (wels) in the big rivers.",
      foraging:
        "Ceps, chanterelles and birch boletes in the forests, bilberries, wild strawberries and raspberries, wild garlic in spring, elder, hazelnuts and sweet chestnuts.",
      examples: [
        "Berlin, Germany",
        "Munich, Germany",
        "Warsaw, Poland",
        "Prague, Czechia",
        "Vienna, Austria",
        "Lyon, France",
        "Strasbourg, France",
      ],
    },
    {
      slug: "boreal-europe",
      name: "Nordic & Baltic Boreal",
      continent: "europe",
      level1: "Boreal and Arctic biogeographical regions",
      zones: "Zones 3–6",
      summary: "Spruce, pine and birch, a hundred thousand lakes, a short bright summer and a long dark winter.",
      landscape:
        "Coniferous forest over granite, bogs and mires, fjords in Norway, skerries along the Baltic, fells and tundra in the far north.",
      gardening:
        "Short and intense under the midnight sun: potatoes, peas, cabbages, roots, rhubarb and berries; tomatoes in greenhouses; frost can come in any month in the north.",
      fishing:
        "Pike and perch everywhere, Atlantic salmon and sea trout in the rivers, brown trout, grayling and Arctic char in cold lakes, whitefish and burbot through the ice.",
      foraging:
        "Bilberries, lingonberries and cloudberries, chanterelles and ceps in huge numbers, birch sap in spring, sea buckthorn and rowan on the coasts. Everyman's right lets you pick almost anywhere.",
      examples: ["Stockholm, Sweden", "Helsinki, Finland", "Oslo, Norway", "Tallinn, Estonia", "Riga, Latvia", "Reykjavík, Iceland"],
    },
    {
      slug: "alpine-europe",
      name: "Alps, Pyrenees & Carpathians",
      continent: "europe",
      level1: "Alpine biogeographical region",
      zones: "Zones 4–7",
      summary: "Europe's high country: snowy winters, steep green summers, and the climate changing with every hundred metres you climb.",
      landscape:
        "Larch, spruce and stone pine forest, high meadows and pastures, glaciers, cold lakes and fast rivers falling out of the mountains.",
      gardening:
        "Altitude is everything: valley gardens grow apples, beans and tomatoes; above 1,000 m it is potatoes, cabbages, herbs and berries in a short season.",
      fishing:
        "Brown trout and grayling in rivers, Arctic char and lake trout (in lakes such as Geneva and Constance), pike and perch in the valley lakes.",
      foraging:
        "Bilberries, wild raspberries, ceps, chanterelles and larch boletes, wild thyme, juniper, elderflower and gentian country — where picking alpine plants is often protected.",
      examples: [
        "Innsbruck, Austria",
        "Bern, Switzerland",
        "Zurich, Switzerland",
        "Geneva, Switzerland",
        "Grenoble, France",
        "Ljubljana, Slovenia",
      ],
    },
    {
      slug: "mediterranean-europe",
      name: "Mediterranean Europe",
      continent: "europe",
      level1: "Mediterranean biogeographical region",
      zones: "Zones 8–11",
      summary:
        "Hot dry summers and mild wet winters: olive, vine, citrus and holm oak from Portugal and Spain through southern France, Italy and Greece.",
      landscape:
        "Olive groves and vineyards, cork and holm oak woods, scented scrub (maquis and garrigue), dry hills, and a warm, clear, almost tideless sea.",
      gardening:
        "Two seasons, not one: tomatoes, peppers, aubergines and melons in summer, with water; greens, broad beans, peas and brassicas through the mild winter. Frost is rare near the coast.",
      fishing:
        "Sea bass, gilt-head bream and mullet from the shore, carp, barbel and black bass in reservoirs, brown trout in mountain streams, and tuna and dentex offshore.",
      foraging:
        "Wild asparagus, fennel, rocket and greens in winter and spring, figs, carobs, prickly pears, wild herbs (thyme, rosemary, oregano), chestnuts and saffron milk caps in autumn.",
      examples: [
        "Madrid, Spain",
        "Lisbon, Portugal",
        "Barcelona, Spain",
        "Rome, Italy",
        "Athens, Greece",
        "Marseille, France",
        "Valletta, Malta",
      ],
    },
    {
      slug: "pannonian-steppe",
      name: "Pannonian Basin & Eastern Plains",
      continent: "europe",
      level1: "Pannonian, Steppic and Black Sea biogeographical regions",
      zones: "Zones 5–7",
      summary:
        "Hot summers, cold winters and big skies: the Danube plain, the Hungarian puszta and the black-earth steppe running east into Ukraine.",
      landscape:
        "Open farmland on deep black soil, river floodplains and oxbows, loess hills, oak and lime woods, salt steppe and the Danube delta.",
      gardening:
        "Superb summer gardens on rich soil: peppers, tomatoes, melons, sunflowers and paprika; apricots, cherries and grapes; winters are hard, so plant after mid-May.",
      fishing:
        "Carp, zander, pike, catfish (wels) and bream in the Danube, the Tisza and their oxbow lakes; sturgeon in the delta, now protected.",
      foraging:
        "Elder, walnuts, blackberries, rose hips, wild cherries, sea buckthorn, field mushrooms and St George's mushroom in spring.",
      examples: ["Budapest, Hungary", "Bucharest, Romania", "Belgrade, Serbia", "Kyiv, Ukraine", "Sofia, Bulgaria", "Chișinău, Moldova"],
    },
    {
      slug: "north-africa-mediterranean",
      name: "Mediterranean North Africa & Atlas",
      continent: "africa",
      level1: "Mediterranean forests, woodlands and scrub",
      zones: "Zones 8–11",
      summary: "The Maghreb coast and the Atlas mountains: hot dry summers, mild rainy winters, olive, argan and cedar.",
      landscape:
        "Olive and citrus groves on the coastal plains, cork oak and Atlas cedar on the mountains, terraced valleys, and the desert beginning beyond the last ridge.",
      gardening:
        "Winter is the main growing season: broad beans, peas, greens, onions and brassicas from autumn to spring; tomatoes, peppers and melons with irrigation in summer.",
      fishing:
        "Sea bass, bream and mullet from the coast; brown and rainbow trout in Atlas streams and lakes; carp, pike and black bass in the dams.",
      foraging: "Wild asparagus, fennel and mallow greens, prickly pear, wild thyme and oregano, carob, and capers from old walls.",
      examples: ["Rabat, Morocco", "Casablanca, Morocco", "Fez, Morocco", "Algiers, Algeria", "Tunis, Tunisia", "Tripoli, Libya"],
    },
    {
      slug: "sahara-nile",
      name: "Sahara, Nile & Horn",
      continent: "africa",
      frostFree: true,
      level1: "Deserts and xeric shrublands",
      zones: "Zones 10–12",
      // Audit of 11 November 2026: superlatives no source was opened for are cut from the region cards ("The world's largest").
      summary: "Hot desert, crossed by the Nile's green ribbon and edged by the dry Horn of Africa.",
      landscape: "Sand seas, stony plains, oases and date palms, the irrigated Nile valley and delta, and the Red Sea coast.",
      gardening:
        "Everything depends on water: the cool season (October to April) is for vegetables — tomatoes, onions, beans, greens; dates, figs, citrus and mangoes where there is irrigation.",
      fishing:
        "Nile perch and tilapia in Lake Nasser and the Nile, catfish in the delta, and reef fish, groupers and trevally along the Red Sea.",
      foraging: "Dates, doum palm fruit, and the herbs of the oases. Desert plants are scarce and slow-growing: take little.",
      examples: ["Cairo, Egypt", "Alexandria, Egypt", "Aswan, Egypt", "Khartoum, Sudan", "Nouakchott, Mauritania", "Djibouti, Djibouti"],
    },
    {
      slug: "sahel-savanna",
      name: "Sahel & Sudanian Savanna",
      continent: "africa",
      frostFree: true,
      level1: "Tropical grasslands, savannas and shrublands (dry)",
      zones: "Zones 11–13",
      summary: "The band of dry savanna south of the Sahara, from Senegal to Sudan: a long hot dry season and one short rainy season.",
      landscape:
        "Acacia and baobab savanna, millet and sorghum fields, seasonal rivers and wetlands — the Niger's inland delta and Lake Chad.",
      gardening:
        "Plant with the first rains (June–July): millet, sorghum, cowpeas, groundnuts, okra, hibiscus (bissap) and squash; dry-season gardens along rivers grow onions and tomatoes.",
      fishing: "Nile perch, tilapia, catfish and tigerfish in the Niger, the Senegal and Lake Chad; fishing follows the floods.",
      foraging: "Baobab fruit and leaves, shea nuts, tamarind, jujube, hibiscus calyces and wild leafy greens in the rains.",
      examples: ["Dakar, Senegal", "Bamako, Mali", "Niamey, Niger", "Ouagadougou, Burkina Faso", "Kano, Nigeria", "N'Djamena, Chad"],
    },
    {
      slug: "guinean-forest",
      name: "West African Coast & Guinean Forest",
      continent: "africa",
      frostFree: true,
      level1: "Tropical moist broadleaf forest",
      zones: "Zones 12–13",
      summary:
        "Hot, humid and green: the rainforest and farm-forest mosaic along the Gulf of Guinea, with two rainy seasons in much of it.",
      landscape: "Rainforest and cocoa farms, oil palms, mangrove lagoons, river estuaries and long sandy beaches.",
      gardening:
        "Year-round growing timed to the rains: cassava, yams, plantain, maize, okra, peppers, garden eggs, leafy greens; cocoa, oil palm and fruit trees.",
      fishing: "Tilapia and catfish in lagoons and rivers, tarpon in the estuaries, barracuda, snapper and jacks along the coast.",
      foraging:
        "Bush mango, African star apple, wild leafy greens, oil palm fruit and snails in the rains — know your plants, as many are not edible raw.",
      examples: [
        "Lagos, Nigeria",
        "Accra, Ghana",
        "Abidjan, Côte d'Ivoire",
        "Freetown, Sierra Leone",
        "Monrovia, Liberia",
        "Douala, Cameroon",
      ],
    },
    {
      slug: "congo-basin",
      name: "Congo Basin Rainforest",
      continent: "africa",
      frostFree: true,
      level1: "Tropical moist broadleaf forest",
      zones: "Zone 13",
      // Audit of 11 November 2026: "The second-largest rainforest on Earth" cut (no source opened).
      summary: "Rainforest drained by the Congo River: warm, wet and green all year.",
      landscape: "Unbroken lowland rainforest, swamp forest, huge rivers and rapids, and savanna at the edges.",
      gardening:
        "No winter and little dry season: cassava, plantain, maize, groundnuts, amaranth and other leafy greens, and fruit trees around every village.",
      fishing: "Goliath tigerfish, catfish, tilapia and hundreds of other species in the Congo and its tributaries.",
      foraging:
        "Wild leafy greens (gnetum, or fumbwa), forest fruits, mushrooms in the rains and wild yams — local knowledge is essential.",
      examples: [
        "Kinshasa, DR Congo",
        "Brazzaville, Republic of the Congo",
        "Kisangani, DR Congo",
        "Bangui, Central African Republic",
        "Libreville, Gabon",
      ],
    },
    {
      slug: "east-african-highlands",
      name: "East African Highlands & Great Lakes",
      continent: "africa",
      frostFree: true,
      level1: "Montane grasslands, forests and tropical savannas",
      zones: "Zones 10–12",
      summary:
        "High, cool and green on the equator: the Ethiopian and Kenyan highlands, the Rift Valley and the great lakes Victoria, Tanganyika and Malawi.",
      landscape: "Highland farms and tea estates, montane forest, Rift Valley escarpments and soda lakes, volcanoes, and the great lakes.",
      gardening:
        "Two rainy seasons (the long rains March–May, the short rains October–December): maize, beans, potatoes, kale (sukuma wiki), cabbages, carrots and tomatoes; coffee and tea.",
      fishing:
        "Tilapia and Nile perch in Lake Victoria, rainbow and brown trout in the cold highland streams of Kenya and Ethiopia, and cichlids in the Rift lakes.",
      foraging:
        "Wild amaranth and nightshade greens, tree tomatoes and passion fruit gone wild, wild berries in the forest, and mushrooms after the rains.",
      examples: ["Nairobi, Kenya", "Addis Ababa, Ethiopia", "Kampala, Uganda", "Kigali, Rwanda", "Arusha, Tanzania", "Mwanza, Tanzania"],
    },
    {
      slug: "swahili-coast",
      name: "East African Coast",
      continent: "africa",
      frostFree: true,
      level1: "Tropical coastal forests and savannas",
      zones: "Zone 13",
      summary: "The Swahili coast from Somalia to Mozambique: hot, humid, palm-fringed, with coral reefs offshore and the monsoon winds.",
      landscape: "Coconut palms, mangroves, coastal forest, baobabs, coral islands and reefs, and dry savanna inland.",
      gardening:
        "Planting follows the long and short rains: cassava, maize, cowpeas, sweet potatoes, okra, amaranth; coconuts, mangoes, cashews and citrus.",
      fishing:
        "Reef and pelagic fishing: kingfish, giant trevally, snapper, sailfish and marlin offshore; mullet and milkfish in the creeks.",
      foraging: "Baobab fruit, tamarind, wild mangoes and cashew apples, sea purslane and coconuts — and the beach at low tide.",
      examples: ["Mombasa, Kenya", "Dar es Salaam, Tanzania", "Zanzibar City, Tanzania", "Mogadishu, Somalia", "Pemba, Mozambique"],
    },
    {
      slug: "southern-savanna",
      name: "Southern Savanna & Subtropical Coast",
      continent: "africa",
      south: true,
      level1: "Tropical and subtropical savannas and woodlands",
      zones: "Zones 9–12",
      summary:
        "Miombo and mopane woodland, bushveld and big-game savanna from Angola and Zambia to Mozambique and South Africa's warm east coast — summer rain, dry winters.",
      landscape:
        "Open woodland and savanna, granite kopjes, big rivers (the Zambezi, the Limpopo), Lake Malawi and Kariba, and a lush subtropical coast in KwaZulu-Natal.",
      gardening:
        "Plant with the summer rains (November–March): maize, beans, groundnuts, pumpkins, sweet potatoes and greens; winter (May–August) is dry and cool, frosty on the plateau.",
      fishing:
        "Tigerfish, bream (tilapia) and catfish in the Zambezi, Kariba and the Okavango; largemouth bass in dams; kob, shad and garrick along the coast.",
      foraging:
        "Marula, baobab and monkey orange fruit, mopane worms, wild figs, amaranth (morogo) greens and termite-mound mushrooms after the first rains.",
      examples: [
        "Lusaka, Zambia",
        "Harare, Zimbabwe",
        "Lilongwe, Malawi",
        "Maputo, Mozambique",
        "Pretoria, South Africa",
        "Durban, South Africa",
      ],
    },
    {
      slug: "highveld-drakensberg",
      name: "Highveld & Drakensberg",
      continent: "africa",
      south: true,
      level1: "Montane grasslands",
      zones: "Zones 7–9",
      summary: "South Africa's high grassland plateau and its mountain edge: hot summer thunderstorms and cold, dry, frosty winters.",
      landscape:
        "Rolling grassland, sandstone and basalt mountains, the Drakensberg and Maluti escarpments, dams and clear mountain streams.",
      gardening:
        "A frost garden in the southern hemisphere: plant summer crops after the last frost in September–October; tomatoes, beans, squash and maize through summer; winter for brassicas, peas and onions.",
      fishing:
        "Yellowfish, largemouth bass, carp and catfish in the Vaal and the dams; rainbow and brown trout in the Drakensberg and Mpumalanga highlands.",
      foraging:
        "Wild garlic (Tulbaghia), num-num, wild peach and the grassland's edible bulbs and greens — many plants are protected in the reserves.",
      examples: ["Johannesburg, South Africa", "Bloemfontein, South Africa", "Maseru, Lesotho", "Pietermaritzburg, South Africa"],
    },
    {
      slug: "namib-karoo",
      name: "Namib, Kalahari & Karoo",
      continent: "africa",
      south: true,
      level1: "Deserts and xeric shrublands",
      zones: "Zones 8–11",
      summary: "The dry west of southern Africa: the fog desert of the Namib, the red sands of the Kalahari and the vast, quiet Karoo.",
      landscape: "Dunes and gravel plains, succulent shrubland, quiver trees and welwitschia, salt pans, and farms around every windpump.",
      gardening:
        "Water decides everything: shaded, mulched beds and drip lines; summer crops after frost on the inland plateau, hardy greens and onions in winter.",
      fishing: "Kob, galjoen and steenbras from the Atlantic beaches; catfish, carp and bass in the Orange River and the dams.",
      foraging:
        "Kalahari truffles after good rain, wild melons (tsamma), and succulent veld foods known to San and Nama tradition — many are protected.",
      examples: ["Windhoek, Namibia", "Walvis Bay, Namibia", "Gaborone, Botswana", "Upington, South Africa"],
    },
    {
      slug: "cape-fynbos",
      name: "Cape Fynbos & Winter-Rain Coast",
      continent: "africa",
      south: true,
      level1: "Mediterranean forests, woodlands and scrub",
      zones: "Zones 9–10",
      summary:
        "The Cape Floral Kingdom: winter rain, dry windy summers, and more plant species per square kilometre than almost anywhere on Earth.",
      landscape:
        "Fynbos heath on sandstone mountains, proteas and restios, vineyards in the valleys, and a cold Atlantic and warmer Indian Ocean coast meeting at Cape Point.",
      gardening:
        "Mediterranean in reverse: winter (May–August) is the wet growing season for greens, peas, brassicas and onions; summer crops need water; frost is rare by the sea.",
      fishing: "Kob, galjoen, yellowtail and snoek from the shore and boats; trout in the mountain streams; bass and carp in farm dams.",
      foraging:
        "Waterblommetjies (Cape pondweed), num-num, sour figs, mussels and seaweeds on the shore — fynbos is protected, so pick only where it is allowed.",
      examples: ["Cape Town, South Africa", "Stellenbosch, South Africa", "George, South Africa", "Gqeberha, South Africa"],
    },
    {
      slug: "madagascar-islands",
      name: "Madagascar & Indian Ocean Islands",
      continent: "africa",
      south: true,
      frostFree: true,
      level1: "Tropical moist and dry forests",
      zones: "Zones 10–13",
      summary:
        "Madagascar, Mauritius, Réunion, the Comoros and Seychelles: islands of rainforest, dry spiny forest and reef found nowhere else.",
      landscape:
        "Rainforest on the eastern escarpment, rice terraces on the central plateau, baobab avenues and spiny forest in the west and south, coral reefs and lagoons.",
      gardening:
        "Rice, cassava, maize, beans and greens with the summer rains (November–April); vanilla, cloves, lychees and mangoes; the plateau is cool in winter.",
      fishing: "Reef fish, trevally and tuna from the coasts; tilapia and black bass in the plateau lakes.",
      foraging:
        "Lychees, mangoes and guavas gone wild, wild greens (brèdes), and the forest's fruits — much of the native flora is endemic and protected.",
      examples: [
        "Antananarivo, Madagascar",
        "Toamasina, Madagascar",
        "Port Louis, Mauritius",
        "Saint-Denis, Réunion",
        "Victoria, Seychelles",
      ],
    },
  ],
  n = new Map(a.map((e) => [e.slug, e]));
export { a as ECOREGIONS };
/**
 * The regions the site lists and serves: the table less the parked continents (src/lib/scope.ts). ECOREGIONS stays
 * whole because a species or fish record names the regions it was written for, parked ones included, and
 * getEcoregion must still know which continent each belongs to.
 */
export const SERVED_ECOREGIONS = a.filter((r) => continentServed(r.continent));
export const classifyEcoregion = function (e, a) {
  let r = (function (e, a) {
    if ((a <= -50 && e >= 14 && e <= 84) || (a < -150 && e > 15 && e < 30)) return "north-america";
    if (a > -32 && a < 66) {
      if (e >= 27 && e < 30 && a < -13) return "europe";
      // The Mediterranean's southern shore: the latitude below which a point is Africa, by longitude (same values as restored).
      let n = a < -5.6 ? 35.95 : a < -1 ? 35.9 + (a + 5.6) * 0.1 : a < 3 ? 36.5 + (a + 1) * 0.1 : a < 11.5 ? 37.6 : 33.6;
      let r = e < 12.5 ? 52 : e >= 27.7 ? 34.25 + 0.36 * Math.max(0, 31.3 - e) : 32.55 + (29.97 - e) * 0.619;
      if ((e < n && e > -36 && a < r) || (e < -3 && e > -27 && a >= 43 && a < 66)) return "africa";
      if (e >= 34.5 && e < 35.8 && a >= 32 && a < 34.7) return "europe";
      if ((e < 41.2 && a > 26.2 && !(e >= 40.9 && a < 29.2)) || (a > 40 && e < 46)) return null;
      if (e >= 34 && e < 72 && a < 45) return "europe";
    }
    return null;
  })(e, a);
  if ("europe" === r)
    return (function (e, a) {
      if (e >= 59 || (e >= 56 && a >= 20) || (a < -12 && e >= 60)) return n.get("boreal-europe");
      if (e >= 42.9 && e < 43.8 && a < -1.6) return n.get("atlantic-europe");
      if ((e >= 45.8 && e < 47.9 && a >= 5.8 && a <= 15.2) || (e >= 44.4 && e < 45.8 && a >= 5.6 && a < 7.5)) return n.get("alpine-europe");
      if (e >= 53 && a < 11) return n.get("atlantic-europe");
      if (e >= 42.4 && e < 43.1 && a >= -1.6 && a <= 2.8) return n.get("alpine-europe");
      if (e < 43.3 && a < -7.2 && e >= 41.8) return n.get("atlantic-europe");
      if (
        (e < 43.2 && a < 3.3) ||
        e < 30 ||
        (e < 44.2 && a >= 2.5 && a < 13.8) ||
        // Liguria and the Apennine edge stay Mediterranean; the Po plain north of 44.6° (Turin, Milan, Verona,
        // Venice) is the EEA's Continental biogeographical region and falls through to continental-europe.
        (e < 44.6 && a >= 6.8 && a < 13.8) ||
        (e < 45.9 && a >= 13.8 && a < 19.5 && e > 42 && a - 13.8 < (45.9 - e) * 1.6) ||
        e < 41.6 ||
        (e < 42.2 && a < 20.2)
      )
        return n.get("mediterranean-europe");
      if ((e >= 44 && e < 48.7 && a >= 16.4 && a < 23) || (a >= 22 && e < 52.5) || (e < 44.5 && a >= 19.5))
        return n.get("pannonian-steppe");
      if ((a < 2 && e >= 49.5) || (a < 4.5 && e >= 43.2) || (e >= 50.7 && a < 9) || (e >= 54.4 && a < 13)) return n.get("atlantic-europe");
      return n.get("continental-europe");
    })(e, a);
  if ("africa" === r)
    return (function (e, a) {
      if (a >= 43 && e < -3) return n.get("madagascar-islands");
      if ((e >= 30 && a < 12) || (e >= 31.5 && a < 23)) return n.get("north-africa-mediterranean");
      // The Nile valley at Khartoum (15.5° N) belongs with Egypt's Nile, not the Sahel.
      if (e >= 16.5 || (e >= 5 && a >= 42) || (e >= 11 && a >= 41) || (e >= 15 && a >= 31 && a < 34.5)) return n.get("sahara-nile");
      if (e <= -32.5 && a < 26.6 && (e <= -33.3 || a < 19.6)) return n.get("cape-fynbos");
      if (e <= -25.9 && e > -31.2 && a >= 25 && a < 30.6) return n.get("highveld-drakensberg");
      // The Kalahari of eastern Botswana (Gaborone) is the dry west, with Windhoek and Upington.
      if ((e <= -17 && a < 24.6) || (e <= -27 && a < 27) || (e <= -22 && a < 26.5)) return n.get("namib-karoo");
      if (a >= 38.4 && e < 5 && e > -16) return n.get("swahili-coast");
      // The Eritrean and Tigray highlands (Asmara 2,300 m, Mekelle) continue the Ethiopian highlands north of 15°.
      if (
        (e >= -10 && e < 15 && a >= 29 && a < 42.5 && !(e >= 9.5 && a < 34)) ||
        (e >= 15 && e < 16 && a >= 37.5 && a < 39.3) ||
        (e >= 13 && e < 15 && a >= 37 && a < 40)
      )
        return n.get("east-african-highlands");
      if (e >= 10.5) return n.get("sahel-savanna");
      // The Congolian coastal forests of Gabon, Equatorial Guinea's mainland and the Congo coast (Libreville,
      // Port-Gentil, Pointe-Noire) belong with the basin; Douala and the Bight of Biafra stay Guinean.
      if ((e >= -6 && e < 5.5 && a >= 14.5 && a < 29) || (e >= -6 && e < 2.5 && a >= 8.5 && a < 14.5)) return n.get("congo-basin");
      if (e >= -1.5 && a < 14.5) return n.get("guinean-forest");
      return n.get("southern-savanna");
    })(e, a);
  if (e < 23 && a < -150) return n.get("hawaii-tropics");
  if ((e >= 60 && !(a < -140 && e <= 62)) || (e >= 58 && a < -125) || (e >= 55 && a >= -105 && a <= -88)) return n.get("boreal-north");
  // The Pacific maritime belt narrows to the Coast Mountains north of 50°: Vancouver, Nanaimo, Powell River and
  // Bella Coola, not Prince George or Williams Lake on the interior plateau.
  if (e >= 39 && e <= 62 && a <= -121.5 - Math.max(0, e - 50) * 1.5) return n.get("pacific-maritime");
  if (e > 32.4 && e < 40.5 && a <= -117 && !(e < 35 && a > -116)) return n.get("mediterranean-california");
  let t = e > 36 ? -106 : -103;
  if (e > 31 && e < 44 && a > -121.5 && a < t) return n.get("deserts");
  // The western mountains end at the Rocky Mountain front: Billings, Lethbridge, Calgary, Edmonton, Saskatoon and
  // Grande Prairie are plains, Bozeman, Cranbrook, Banff, Hinton and Kelowna are mountains; above 52.5° the
  // interior plateau west of 121° (Prince George, Quesnel) is boreal forest.
  let front = e < 49 ? -109.5 : e < 51.5 ? -114.4 : e < 54 ? -115.5 - (e - 51.5) * 0.6 : -118 - (e - 54);
  let west = e >= 52.5 ? -121 : -125;
  if ((e >= 44 && e < 58 && a >= west && a <= front) || (e >= 36 && e < 44 && a >= -112.5 && a <= -105.2)) return n.get("western-mountains");
  if (e >= 25.5 && e < 31.5 && a > -97.2 && a <= -93.5) return n.get("gulf-coast");
  // The prairie reaches Des Moines (93.6° W) but not Springfield, Missouri, in the Ozarks.
  let s = e >= 44 ? -96.5 : e >= 40.5 ? -93 : -94.5;
  if (e >= 26 && e < 56 && a >= -115 && a <= s) return n.get("great-plains");
  if (e >= 43 && e < 49 && a > -70.8 && (a > -69 || e < 45.5)) return n.get("acadian-forest");
  if ((e >= 46.4 && a > -96.5 && a < -52) || e >= 50) return n.get("boreal-forest");
  if (e < 29.5 && a > -83) return n.get("florida-peninsula");
  if (e >= 41.3 && e < 46.4 && a >= -94.5 && a <= -71.5) return n.get("great-lakes-st-lawrence");
  if (e >= 36.5 && e < 43.5 && a > -78 && a <= -69.5) return n.get("northeast-coast");
  // The Appalachians between the Till Plains and Bluegrass to the west (Columbus, Lexington are central hardwoods)
  // and the Piedmont to the east (Charlotte, Raleigh, Winston-Salem are southeastern); Roanoke sits in the Valley.
  let appWest = e >= 38 ? -82.4 : -85;
  let appEast = e >= 39 ? -78 : e >= 37 ? -79.4 : -81.6 + (e - 35) * 0.5;
  if (e >= 34 && e < 42 && a >= appWest && a <= appEast) return n.get("appalachian");
  // Central hardwoods end at the Blue Ridge foot: the North Carolina Piedmont (Winston-Salem, Greensboro) is southeastern.
  if (e >= 35.5 && e < 41.3 && a >= -95 && a < (e < 37.5 ? -81.6 : -80)) return n.get("central-hardwoods");
  if (e >= 30 && e < 37 && a >= -85 && a <= -75) return n.get("southeastern");
  if (e >= 25 && e < 35.5 && a >= -100 && a < -85) return n.get("gulf-coast");
  if (e >= 29.5 && e < 36.5 && a >= -85 && a <= -75) return n.get("southeastern");
  if (e >= 44) return n.get("great-lakes-st-lawrence");
  if (e >= 36) return n.get("central-hardwoods");
  return n.get("southeastern");
};
export const getEcoregion = (e) => n.get(e);
/**
 * A region's own text with the clauses that hold only near a Great Lake taken
 * out, for a place more than NEAR_GREAT_LAKE_KM (50) from a shore
 * (src/lib/great-lakes.ts, used through src/lib/region-text.ts). Only words of
 * the original text, nothing added: "lake-effect weather around the largest
 * freshwater system on Earth" is true at a lakeshore and not 143 km inland
 * at Ottawa; "lake moderation lengthens fall near the water" is the same.
 */
/**
 * A region's landscape line as printed under a town's name (src/lib/region-text.ts), as a list of the region's own
 * items, each kept only where it holds (the conditions are src/lib/where.ts `Where`; the facts
 * src/lib/place-scope.ts). The region's page keeps the full line above.
 *
 * Audit of 10 November 2026: the full line was printed as the town's own, so the Bay of Fundy tides landed on
 * Charlottetown, Halifax, Portland and Fredericton; the Chesapeake and Long Island Sound on Boston, Philadelphia,
 * Richmond and Washington; blackwater rivers, swamps and the barrier-island coast on Atlanta, Charlotte and Raleigh.
 * Only the Great Lakes' lake-effect clause had a switch. Now:
 *  - a coast, sea, estuary or tidal item needs the open sea or tidal water at the town (water-setting);
 *  - a named water or range needs the town within its reach (scope-places NEAR);
 *  - coastal-plain items (longleaf, blackwater rivers, swamps) need the town on the Atlantic coastal plain,
 *    south-east of the fall line; Piedmont items need the fall line within 25 km;
 *  - a plant's or a desert's items need the town inside its range (scope-places BOXES);
 *  - an item that names a feature the site cannot place (chalk downs, karst, granite outcrops, the Danube delta,
 *    Lake Chad, the Red Sea coast, Rift Valley soda lakes, the Drakensberg, welwitschia, high balds, redwood
 *    canyons, potholes, the great rivers of Europe and southern Africa by name) is left out of the town's line.
 * Audit of 11 November 2026 (Appalachian, Central Hardwoods and Gulf Coast towns):
 *  - "rhododendron hollows" and "clear mountain streams" need the Southern Blue Ridge (scope-places NEAR): Asheville,
 *    not Pittsburgh on the Western Allegheny Plateau, whose rivers carry acid mine drainage;
 *  - "rolling hardwood forest" is left out: no source places it at the Central Hardwoods towns (Columbus and
 *    Indianapolis stand on corn-belt till plains);
 *  - "prairie remnants" need the coastal prairie of south-western Louisiana and south-central Texas (USGS): Houston, not
 *    New Orleans, Memphis, Little Rock or Brownsville;
 *  - `summary` is the region card's line under a town's name (src/components/PlaceCards.tsx): "nearly frost-free" only
 *    where the town's own stations count frost on fewer than FEW_FROST_NIGHTS nights a year (Brownsville, Houston, New
 *    Orleans; not Memphis or Little Rock), and "rainy" not at all (Brownsville measures 680 mm a year).
 * Audit of 13 November 2026 (Florida Peninsula, Deserts and Mediterranean California towns), sources in
 * src/data/scope-places.ts:
 *  - Florida: "spring-fed rivers" need the northern half of the state, where USGS puts most of its springs (Orlando,
 *    Tampa), and "thousands of lakes" central Florida's lake district (USGS: 35 per cent of the state's 7,800 lakes in
 *    Lake, Orange, Osceola and Polk counties; Orlando); neither is printed at Miami, Fort Lauderdale or Fort Myers;
 *  - California: valley oak only inside its range (FEIS: Shasta County to Los Angeles County; not San Diego), coast live
 *    oak and the chaparral hills not on the Central Valley floor (Sacramento);
 *  - Deserts: "sagebrush steppe" only on the Snake River Plain (Boise; it was printed at Albuquerque, whose basin is
 *    sand scrub and desert grassland), and "a few big reservoirs and tailwaters" only within reach of one (Las Vegas,
 *    Phoenix, Boise; not Tucson or Albuquerque).
 * Items that say where they are ("fjords in Norway", "tundra beyond the treeline", "a lush subtropical coast in
 * KwaZulu-Natal") are kept: they describe the region, not the town. `last` is the region's own joining word before
 * the last item. Nothing here is new wording: every item is a phrase of the region's line.
 *
 * Audit of 14 November 2026 (Day 5):
 *  - "tamarack" was printed at Whitehorse, where GBIF holds no record of Larix laricina within 100 km (52 at
 *    Yellowknife, 13 at Thompson, 174 at Fairbanks; GBIF occurrence search, read 14 Nov 2026). The town line cannot be
 *    keyed to a territory (src/lib/region-text.ts does not pass the town's province or state to placeFacts), so the item
 *    says less everywhere: "open black-spruce forest", the region's own words without the tamarack;
 *  - "tall-, mixed- and shortgrass prairie" and "coulees" were printed at Austin and San Antonio: Texas Parks and
 *    Wildlife puts shortgrass on the High Plains, tallgrass on the Blackland Prairie and juniper-oak and live-oak or
 *    mesquite savanna on the Edwards Plateau (https://tpwd.texas.gov/education/hunter-education/online-course/
 *    wildlife-conservation/texas-ecoregions, as the audit read it), and no source places coulees in Texas; "tall-" at
 *    Saskatoon had none either. For the same reason the line says less at every Great Plains town: "prairie" and "river
 *    valleys", which hold at all fifteen; the region's page keeps the three grasslands and the coulees;
 *  - "fjords" was printed at Nanaimo, with no fjord within reach (the condition tested only the open coast, which the
 *    Salish Sea towns all pass): it is left out of the town lines; the region's page keeps it.
 */
export const TOWN_TEXT = {
  "boreal-north": { landscape: { last: ", and ", items: ["open black-spruce forest", "muskeg", "tundra beyond the treeline", "huge clear lakes and rivers"] } },
  "boreal-forest": { landscape: { items: ["coniferous and mixed forest", "bogs", "thousands of lakes"] } },
  "acadian-forest": {
    landscape: {
      items: [
        "mixed Acadian forest",
        { t: "rocky headlands", coast: "on" },
        { t: "salt marshes", salt: true },
        "bogs",
        { t: "the Bay of Fundy tides", near: "bay-of-fundy" },
      ],
    },
  },
  "great-lakes-st-lawrence": {
    landscape: { items: ["maple-beech-oak forests", "farmland", { t: "lake-effect weather around the largest freshwater system on Earth", lake: true }] },
    gardening: ["Everything temperate: tomatoes, corn, squash, apples, grapes and a strong fall garden", { t: "; lake moderation lengthens fall near the water", lake: true }, "."],
  },
  "northeast-coast": {
    landscape: {
      items: [
        { t: "coastal plain", area: "fall-line" },
        { t: "rolling Piedmont", area: "fall-line" },
        { t: "tidal rivers", tidal: true },
        { t: "the Chesapeake", near: "chesapeake-bay" },
        { t: "Long Island Sound", near: "long-island-sound" },
      ],
    },
  },
  appalachian: {
    landscape: {
      items: ["mixed mesophytic and oak forests", { t: "rhododendron hollows", near: "southern-blue-ridge" }, { t: "clear mountain streams", near: "southern-blue-ridge" }],
    },
  },
  "central-hardwoods": { landscape: { last: ", ", items: ["big warm rivers and reservoirs"] } },
  southeastern: {
    landscape: {
      items: [
        { t: "longleaf and loblolly pine", area: "atlantic-coastal-plain" },
        { t: "loblolly pine", outside: "atlantic-coastal-plain" },
        { t: "oak-hickory uplands", outside: "atlantic-coastal-plain" },
        { t: "blackwater rivers", area: "atlantic-coastal-plain" },
        { t: "swamps", area: "atlantic-coastal-plain" },
        { t: "barrier-island coast", coast: "near" },
      ],
    },
  },
  "gulf-coast": {
    landscape: {
      items: [
        { t: "cypress-tupelo swamps", area: "water-tupelo-range" },
        { t: "coastal marsh", salt: true },
        { t: "prairie remnants", area: "coastal-prairie" },
        { t: "the Gulf of Mexico", coast: "near", near: "gulf-coast-belt" },
      ],
    },
    summary: ["Bottomland hardwoods, bayous, the Mississippi delta and the Gulf shore: humid", { t: " and nearly frost-free", fewFrosts: true }, "."],
  },
  "florida-peninsula": {
    landscape: {
      items: [
        "pine flatwoods",
        "hammocks",
        { t: "the Everglades", near: "everglades" },
        { t: "spring-fed rivers", area: "florida-northern-half" },
        { t: "thousands of lakes", near: "central-florida-lakes" },
      ],
    },
  },
  "great-plains": { landscape: { last: ", ", items: ["prairie", "river valleys", "farmland almost everywhere"] } },
  "western-mountains": {
    landscape: { items: ["ponderosa and lodgepole pine, Douglas-fir and spruce-fir forest by elevation", "sagebrush valleys", "glacial lakes", "famous trout rivers"] },
  },
  "pacific-maritime": {
    landscape: {
      items: [
        "Douglas-fir, western red cedar, hemlock and Sitka spruce",
        "salmon rivers",
        { t: "tidal flats", tidal: true },
        { t: "the Salish Sea", near: "salish-sea" },
      ],
    },
  },
  "mediterranean-california": {
    landscape: {
      items: [
        // Both oaks off the valley floor and inside valley oak's range; valley oak alone on the floor; neither named
        // south of Los Angeles County, where the region's oak is coast live oak (scope-places "valley-oak-range").
        { t: "coast live oak and valley oak woodlands", area: "valley-oak-range", outside: "central-valley" },
        { t: "valley oak woodlands", area: "central-valley" },
        { t: "oak woodlands", outside: "valley-oak-range" },
        { t: "chaparral hills", outside: "central-valley" },
        "irrigated valleys inland",
      ],
    },
  },
  deserts: {
    landscape: {
      items: [
        { t: "sagebrush steppe", area: "snake-river-plain" },
        { t: "creosote and saguaro flats", area: "saguaro-range" },
        "canyon country",
        "ephemeral washes",
        { t: "a few big reservoirs and tailwaters", near: "desert-reservoirs" },
      ],
    },
  },
  "atlantic-europe": { landscape: { last: ", ", items: ["hedged fields", "oak and beech woods", "heath and moor", { t: "long estuaries", tidal: true }] } },
  "continental-europe": { landscape: { last: ", ", items: ["mixed beech and oak forest", "pine heath on sand", "lakes left by the ice in the north"] } },
  "boreal-europe": { landscape: { last: ", ", items: ["bogs and mires", "fjords in Norway", "skerries along the Baltic", "fells and tundra in the far north"] } },
  "alpine-europe": {
    landscape: { last: ", ", items: ["larch, spruce and stone pine forest", "high meadows and pastures", "glaciers", "cold lakes and fast rivers falling out of the mountains"] },
  },
  "mediterranean-europe": {
    landscape: {
      last: ", and ",
      items: [
        "olive groves and vineyards",
        "cork and holm oak woods",
        "scented scrub (maquis and garrigue)",
        "dry hills",
        { t: "a warm, clear, almost tideless sea", coast: "near", area: "microtidal-seas" },
      ],
    },
  },
  "pannonian-steppe": { landscape: { items: ["open farmland on deep black soil", "river floodplains and oxbows", "loess hills", "oak and lime woods", "salt steppe"] } },
  "north-africa-mediterranean": {
    landscape: {
      last: ", and ",
      items: ["olive and citrus groves on the coastal plains", "cork oak and Atlas cedar on the mountains", "terraced valleys", "the desert beginning beyond the last ridge"],
    },
  },
  "sahara-nile": {
    landscape: { last: ", and ", items: ["sand seas", "stony plains", "oases and date palms", { t: "the irrigated Nile valley and delta", near: "nile-valley" }] },
  },
  "sahel-savanna": { landscape: { last: ", ", items: ["acacia and baobab savanna", "millet and sorghum fields", "seasonal rivers and wetlands"] } },
  "guinean-forest": {
    landscape: {
      items: [
        "rainforest and cocoa farms",
        "oil palms",
        { t: "mangrove lagoons", salt: true },
        { t: "river estuaries", salt: true },
        { t: "long sandy beaches", coast: "on" },
      ],
    },
  },
  "congo-basin": { landscape: { last: ", and ", items: ["swamp forest", "huge rivers and rapids", "savanna at the edges"] } },
  "east-african-highlands": {
    landscape: { last: ", and ", items: ["highland farms and tea estates", "montane forest", { t: "the great lakes", near: "lake-victoria" }] },
  },
  "swahili-coast": {
    landscape: {
      last: ", and ",
      items: [
        "coconut palms",
        { t: "mangroves", salt: true },
        "coastal forest",
        "baobabs",
        { t: "coral islands and reefs", coast: "on" },
        "dry savanna inland",
      ],
    },
  },
  "southern-savanna": { landscape: { last: ", and ", items: ["open woodland and savanna", "a lush subtropical coast in KwaZulu-Natal"] } },
  "namib-karoo": { landscape: { last: ", and ", items: ["dunes and gravel plains", "succulent shrubland", "salt pans", "farms around every windpump"] } },
  "highveld-drakensberg": { landscape: { last: ", ", items: ["rolling grassland", "dams and clear mountain streams"] } },
  "cape-fynbos": {
    landscape: {
      last: ", and ",
      items: ["fynbos heath on sandstone mountains", "proteas and restios", "vineyards in the valleys", "a cold Atlantic and warmer Indian Ocean coast meeting at Cape Point"],
    },
  },
  "hawaii-tropics": { landscape: { items: ["rainforest", "dry leeward slopes", "volcanic soils", { t: "reef-fringed coast", coast: "on" }] } },
  "madagascar-islands": {
    landscape: {
      last: ", ",
      items: [
        "rainforest on the eastern escarpment",
        "rice terraces on the central plateau",
        "baobab avenues and spiny forest in the west and south",
        { t: "coral reefs and lagoons", coast: "on" },
      ],
    },
  },
};
export const libraryMonth = function (e, a, r) {
  return a && n.get(a)?.south && ("all" === r || r.some((e) => !n.get(e)?.south)) ? ((e + 5) % 12) + 1 : e;
};
export const withRegions = function (e, ...a) {
  return e.map((e) => {
    if ("all" === e.regions) return e;
    let n = a.flatMap((a) => a[e.slug] ?? []);
    return n.length
      ? {
          ...e,
          regions: [...new Set([...e.regions, ...n])],
        }
      : e;
  });
};
