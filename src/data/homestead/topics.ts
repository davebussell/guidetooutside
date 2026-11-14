/**
 * The ten Homesteading topics: small-scale self-reliance on a house lot or
 * smallholding in North America, Europe and Africa. Every figure here is taken
 * from a source listed in src/data/homestead/SOURCES.md and named on the page
 * (the `sources` of each topic). Where sources disagree the range is given and
 * the disagreement said. Local rules are never stated: `check` says what to
 * check and with whom. No veterinary dosing, no treatment advice.
 */
import type { SourceId } from "./sources";
import type { Animal } from "./breeds";

export type TopicSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  /** A short list under the paragraphs. */
  list?: string[];
};

export type HomesteadTopic = {
  slug: string;
  /** The page's h1 and card title. */
  title: string;
  /** Short name for menus and lists. */
  short: string;
  eyebrow: "Livestock" | "Water" | "Heat" | "Soil" | "Storage" | "Growing";
  /** One line for menus and cards. */
  note: string;
  lede: string;
  /** <title> and description. */
  seoTitle: string;
  description: string;
  /** Key into src/data/homestead/images.json. */
  image: string;
  /** The key facts beside the photograph. */
  facts: { label: string; value: string }[];
  /** The "at a glance" card. */
  glance: { label: string; value: string }[];
  /** A safety note shown in its own box before the sections. */
  safety?: { title: string; body: string[] };
  sections: TopicSection[];
  /** Breeds to list, for the animal topics. */
  breeds?: Animal;
  /** What to check, and with whom. */
  check: { what: string; who: string }[];
  /** What the place page works out for this topic. */
  local: string;
  /** Anchor of this topic's panel on the place page. */
  panel: string;
  sources: SourceId[];
};

export const TOPICS: HomesteadTopic[] = [
  {
    slug: "laying-hens",
    title: "Laying hens",
    short: "Laying hens",
    eyebrow: "Livestock",
    note: "Daylight and laying, space, heat, cold and breeds",
    lede: "A small flock lays well through the long days and slows as they shorten. What hens need is mostly space, shelter from wind and wet, water that does not freeze, shade in the heat and protection from predators.",
    seoTitle: "Laying hens: daylight and laying, space, heat, cold and breeds",
    description:
      "Keeping laying hens on a house lot: the 14-hour day that keeps hens laying, coop and run space, heat and cold limits, breeds for cold winters and hot summers, and what to check before you start.",
    image: "hen",
    facts: [
      { label: "Day length", value: "Hens need about 14 hours of light to keep laying. Below 12 hours laying falls and often stops (Virginia Cooperative Extension)." },
      {
        label: "Space",
        value: "At least 0.3 m² (3 sq ft) of coop floor per bird where they also have a run, and 0.7–0.9 m² (8–10 sq ft) where they do not (Oregon State University Extension).",
      },
      {
        label: "Heat",
        value: "Comfortable at 21–25 °C. Above 27 °C a hen's body temperature rises and she eats less; laying may fall above 32–35 °C (Ontario Ministry of Agriculture).",
      },
      { label: "Cold", value: "Adult hens sheltered from wind and wet need no added heat, but they cannot break ice to drink (University of Maryland Extension)." },
    ],
    glance: [
      { label: "Perches", value: "13–25 cm (5–10 in) of perch per bird, 60 cm (2 ft) off the floor, with 25 cm (10 in) between perches (Oregon State)." },
      { label: "Nest boxes", value: "One for about every four hens, 30 × 30 × 30 cm (12 in each way), no lower than the perches (Oregon State)." },
      { label: "Run", value: "25 × 50 mm (1 × 2 in) mesh, buried 15–30 cm (6 in to 1 ft), with netting or wire over the top (Oregon State)." },
      { label: "Added light", value: "Before dawn, to hold a 14- to 16-hour day; never more than 16 hours, and at least 6 hours of darkness (Virginia Cooperative Extension, University of Arizona)." },
      { label: "Eggs", value: "Collect often, throw away cracked eggs, do not wash warm eggs, refrigerate, and cook until yolk and white are firm, 71 °C (160 °F) (CDC)." },
      { label: "Hygiene", value: "Wash hands with soap after touching birds, keep poultry out of the house, and do not let children under five handle chicks (CDC)." },
    ],
    sections: [
      {
        id: "light",
        heading: "Day length and laying",
        paragraphs: [
          "Laying follows the length of the day, not the cold. Hens need about 14 hours of light to keep laying; once the day falls below 12 hours, laying decreases and often stops, which in the north happens naturally from October to February. Some keepers hold the day at 16 hours (Virginia Cooperative Extension).",
          "Added light is optional. Where it is used, it goes on before dawn so that the hens still go to roost at the natural sunset, it is adjusted every couple of weeks as sunrise moves, and it stops once natural daylight passes 14 hours. More than 16 hours gives no more eggs, and lights left on around the clock disrupt the birds; leave at least 6 hours of continuous darkness. A 4–5 W LED (a 40 W incandescent equivalent) lights about 9 m² (100 sq ft) of coop (Virginia Cooperative Extension, University of Arizona).",
          "Near the equator the day stays close to 12 hours all year, so it never reaches 14 hours on its own. The place pages give the day length for your town, the dates it crosses 14 and 12 hours, and how much light the shortest day lacks.",
        ],
      },
      {
        id: "housing",
        heading: "Housing: dry and airy, never draughty",
        paragraphs: [
          "A coop does not need insulation. It needs as much ventilation as possible without draughts on the birds or openings a predator can use; passive vents are enough for most backyard coops. Raise it at least 30 cm (1 ft) off the ground, and fit nest boxes with a roof sloped at 45 degrees so birds do not roost on them (Oregon State University Extension).",
          "In winter, fresh air carries off moisture: a damp coop builds up ammonia. Fix leaks and draughts before the cold, and block any hole that lets wind blow straight onto the birds. Deep litter insulates the birds from the ground and gives off a little heat as it breaks down. Perches of metal or plastic pipe chill the feet; a flat wooden perch such as a 2 × 4 lets a bird cover its toes with its feathers (University of Maryland Extension).",
        ],
      },
      {
        id: "heat",
        heading: "Heat",
        paragraphs: [
          "Heat does more harm than cold. Hens shed heat easily at 21–25 °C; above 27 °C their body temperature rises and they eat much less; between 28 and 35 °C they have to work to lose heat, and laying may fall above 32–35 °C, with smaller eggs and thinner shells. Panting works well on a hot dry day and poorly on a humid one (Ontario Ministry of Agriculture). Oklahoma State University Extension puts the start of heat stress at about 29 °C (85 °F).",
          "In hot weather put shade on the west side of the run or across its middle, where it covers the afternoon; keep several shaded waterers and add ice; feed in the early morning or the evening; and collect eggs as soon as they are laid (University of Arizona Extension). Cool drinking water, about 10 °C (50 °F), lowers a bird's body temperature (Oklahoma State).",
        ],
        list: [
          "Mild heat stress: light panting, otherwise normal.",
          "Moderate: heavier panting, wings held away from the body, a slight crouch.",
          "Danger: heavy panting, wings held out, a pale comb and wattles, limpness. Move the hen somewhere cool and stand her in cool, not icy, water up to the neck, never over the head (University of Arizona Extension). Call a vet if she does not recover.",
        ],
      },
      {
        id: "cold",
        heading: "Cold",
        paragraphs: [
          "Adult birds protected from wind and wet weather do not need added heat even in the coldest months; chicks do. Water use falls in winter but hens still need it, and frozen water is no water: check it several times a day, or keep it open with a heater under the waterer (University of Maryland Extension). Large single combs are prone to frostbite; small combs (rose, pea, cushion) resist it, which is why cold-country breeds have them (Livestock Conservancy).",
        ],
      },
      {
        id: "predators",
        heading: "Keeping predators out",
        paragraphs: [
          "Predators are kept out by the building, not dealt with afterwards. Use 25 × 50 mm mesh on the run, bury it 15 cm to 30 cm, put netting or wire over the top, raise the coop and give it a secure floor, add a motion-sensor light, and keep dense planting away from the coop (Oregon State University Extension).",
        ],
      },
    ],
    breeds: "hen",
    check: [
      { what: "Whether hens are allowed on your lot, how many, how far the coop must sit from the property line, and whether a rooster is allowed", who: "your municipality's by-law, zoning or planning office" },
      {
        what: "Whether your flock has to be registered, and what to do if avian influenza is reported nearby",
        who: "your national animal-health agency, for example USDA APHIS in the United States or the Animal and Plant Health Agency in Great Britain",
      },
      { what: "Rules on selling eggs: grading, washing, labelling and storage", who: "the food-safety authority where you live" },
    ],
    local: "Daylight today and the dates it falls below 14 and 12 hours, the light the shortest day lacks, and the days and nights that bring heat and frost.",
    panel: "daylight",
    sources: ["vtLaying", "azLighting", "osuCoop", "omafraHeat", "okstateWater", "azHeat", "umdWinter", "cdcPoultry", "lcChantecler", "lcBrahma", "lcWyandotte", "lcPlymouthRock", "lcSussex", "lcRir", "lcAustralorp", "lcLeghorn", "nakedNeck"],
  },
  {
    slug: "ducks",
    title: "Ducks",
    short: "Ducks",
    eyebrow: "Livestock",
    note: "Laying breeds, water, space and company",
    lede: "Laying ducks such as Khaki Campbells and Runners lay as many eggs as good laying hens, forage hard for slugs and insects, and cope with both cold and heat. What they need that hens do not is water deep enough to put the whole head under.",
    seoTitle: "Ducks: laying breeds, water, space and keeping them well",
    description: "Keeping laying ducks: Khaki Campbell and Runner breeds, the water ducks need, space by day and night, fencing against foxes, feeding and when to call a vet.",
    image: "runner-ducks",
    facts: [
      { label: "Eggs", value: "Khaki Campbells average 250–340 eggs a year and start laying at 5–7 months; good Runner strains lay more than 250 (Livestock Conservancy)." },
      { label: "Water", value: "Deep enough to submerge the whole head and cover the body, with an easy way in and out. A children's paddling pool works (Royal Veterinary College)." },
      { label: "Space", value: "1.5–2 m² per duck where they are housed by day; 0.5–1 m² per duck in overnight housing (Royal Veterinary College)." },
      { label: "Company", value: "Highly social: keep them in a group, with four to six ducks to each drake in a mixed flock (Royal Veterinary College)." },
    ],
    glance: [
      { label: "Lifespan", value: "Up to 10 years (Royal Veterinary College)." },
      { label: "Fencing", value: "Sturdy wire with a 1 m (3 ft) apron laid along the ground and an overhang at the top against foxes and dogs (Royal Veterinary College)." },
      { label: "Floors", value: "Cover concrete with bedding: hard floors cause bumblefoot, a swelling under the foot (Royal Veterinary College)." },
      { label: "Wild birds", value: "Keep contact to a minimum: they carry parasites and avian influenza (Royal Veterinary College)." },
      { label: "Climate", value: "Khaki Campbells and Runners both do well in hot and in cold climates (Livestock Conservancy)." },
    ],
    sections: [
      {
        id: "water",
        heading: "Water",
        paragraphs: [
          "Ducks use water to preen and to keep their eyes, bills and feet in good condition, so they need fresh water every day that is deep enough to dip the whole head and cover the body, with a shallow side or a ramp so they can get in and out. A pond is not needed; a children's paddling pool does the job (Royal Veterinary College).",
          "Their water freezes as readily as hens' does. On freezing nights it has to be checked and opened like any other (University of Maryland Extension).",
        ],
      },
      {
        id: "housing",
        heading: "Housing and fencing",
        paragraphs: [
          "Allow 1.5–2 m² per duck where they are kept in by day and 0.5–1 m² in the house at night, with shade and shelter from wind and bad weather at all times. Concrete floors must be covered with bedding. Against foxes and dogs, run sturdy wire with a 1 m apron laid along the ground and an overhang at the top; keep feed in vermin-proof feeders (Royal Veterinary College).",
        ],
      },
      {
        id: "feeding",
        heading: "Feeding",
        paragraphs: [
          "Ducklings take duck starter crumb (18–20 % protein) to three weeks, grower feed (15 %) from three to 20 weeks, and adults layer or breeder pellets (14–16 %, rising to 16–18 % when laying), with extra calcium such as oyster shell. Avoid bread and citrus fruit, and do not give young ducks chicken feed (Royal Veterinary College).",
        ],
      },
      {
        id: "vet",
        heading: "When to call a vet",
        paragraphs: ["Call a vet when a duck shows any of these (Royal Veterinary College):"],
        list: [
          "Discharge from the eyes or nostrils",
          "Lethargy or not wanting to move",
          "Weight loss",
          "Dull or missing feathers",
          "Keeping apart from the flock, or being bullied",
          "A dirty vent",
          "Feathers held fluffed up",
          "Lameness",
        ],
      },
    ],
    breeds: "duck",
    check: [
      { what: "Whether ducks are allowed on your lot, and how many", who: "your municipality's by-law, zoning or planning office" },
      { what: "Whether poultry flocks, including ducks, must be registered", who: "your national animal-health agency" },
      { what: "Rules on selling duck eggs", who: "the food-safety authority where you live" },
    ],
    local: "Freezing nights that ice the water over, and the hot days.",
    panel: "climate",
    sources: ["lcCampbell", "lcRunner", "rvcDuck", "umdWinter"],
  },
  {
    slug: "honeybees",
    title: "Honeybees",
    short: "Honeybees",
    eyebrow: "Livestock",
    note: "Flying weather, the bee season, winter stores and stings",
    lede: "A colony forages when afternoons are warm enough to fly, raises brood through the season and spends the cold months clustered on its stores. How long the cold lasts sets how much honey a colony has to keep for itself.",
    seoTitle: "Honeybees: flying weather, the bee season and winter stores",
    description: "Keeping honeybees: the temperatures bees fly and forage at, the length of the bee season where you live, the honey a colony needs for winter, stings and allergy, and what to check before keeping hives.",
    image: "honeybee",
    facts: [
      {
        label: "Flying weather",
        value: "Honeybees rarely fly below 13 °C (55 °F). There is some foraging from 13 °C, a fair amount from 16 °C and the most from about 18–21 °C (Pacific Northwest Extension).",
      },
      { label: "Winter flights", value: "In a 2024 study, bees flew outside in winter only above 9.3 °C (Kang and Jung)." },
      { label: "Winter stores", value: "About 41 kg (90 lb) of honey for a colony wintering in the far north (University of Florida IFAS)." },
      { label: "Colony size", value: "25,000–30,000 bees go into winter well; colonies of fewer than 15,000 are unlikely to survive a freezing winter (University of Florida IFAS)." },
    ],
    glance: [
      { label: "Brood nest", value: "Kept near 35 °C (95 °F) once there is brood (University of Florida IFAS)." },
      { label: "Inspections", value: "Only on warm days above 10 °C (50 °F), and in winter only if you must (University of Florida IFAS)." },
      { label: "Stores check", value: "Lift the back of the hive: one that lifts easily probably needs food (University of Florida IFAS)." },
      { label: "Autumn feeding", value: "Where stores are short, sugar syrup of two parts sugar to one part water by volume (University of Florida IFAS)." },
      { label: "Strong colonies", value: "Start foraging at lower temperatures than weak ones (Pacific Northwest Extension)." },
    ],
    safety: {
      title: "Stings and allergy",
      body: [
        "Stings come with keeping bees, for you and for anyone near the hives. Anyone with a known reaction to stings should see an allergist before keeping bees.",
        "Itching and hives spreading over the body, swelling of the throat or tongue, trouble breathing, dizziness, stomach cramps or vomiting after a sting are anaphylaxis, a medical emergency that can be fatal: call emergency services at once (American Academy of Allergy, Asthma & Immunology).",
      ],
    },
    sections: [
      {
        id: "season",
        heading: "Flying weather and the bee season",
        paragraphs: [
          "Bees fly in the warm part of the day. Below 13 °C they only rarely fly; from 13 to 16 °C there is some foraging, from 16 to 18 °C a moderate amount, and from about 18–21 °C upwards the most. Strong colonies start at lower temperatures than weak ones, and in midsummer the same colonies may not start until it reaches 21 °C. A spell of poor weather can keep them in for two or three days (Pacific Northwest Extension).",
          "Some flights happen on cooler days: a 2024 study of overwintering colonies recorded flights only above 9.3 °C (Kang and Jung). The place pages read the bee season from the average afternoon high: the months it reaches 13 °C, and those it stays below 10 °C, when the colony keeps to its cluster.",
        ],
      },
      {
        id: "winter",
        heading: "Winter",
        paragraphs: [
          "Through winter the colony clusters around the queen; once she starts laying again, the bees hold the middle of the cluster near 35 °C. A colony of 25,000–30,000 bees goes into winter well; one of fewer than 15,000 is unlikely to survive freezing temperatures, though it may come through a mild winter. In the far north a colony needs about 41 kg (90 lb) of honey to last until spring, and preparation starts in August or September (University of Florida IFAS).",
          "Judge the stores by lifting the back of the hive: one that lifts easily probably needs feeding. Short stores can be made up in autumn with sugar syrup, two parts sugar to one part water by volume, which the bees store in place of honey (University of Florida IFAS).",
        ],
      },
      {
        id: "health",
        heading: "Pests and disease",
        paragraphs: [
          "This guide gives no treatment advice. Your provincial, state or national bee inspector publishes the pests and diseases to watch for where you live and how to check a colony for them.",
        ],
      },
    ],
    check: [
      { what: "Whether hives must be registered, and whether they can be inspected", who: "the provincial or state apiarist, or the national bee inspectorate" },
      { what: "Whether hives are allowed in your garden, how many, and how far from the boundary", who: "your municipality" },
      { what: "Rules on selling or labelling honey", who: "the food-labelling authority where you live" },
    ],
    local: "The months bees can forage, the months of full foraging, and the months the colony keeps to its cluster.",
    panel: "bees",
    sources: ["pnwBees", "kangJung", "ufBees", "aaaaiStings"],
  },
  {
    slug: "dairy-goats",
    title: "Dairy goats",
    short: "Dairy goats",
    eyebrow: "Livestock",
    note: "Milk, the breeding year, housing, fencing and breeds",
    lede: "A doe milks for about nine months after kidding and has to be bred again each year to keep milking. Goats are herd animals that take dry cold well, suffer in rain and draughts, and test every fence.",
    seoTitle: "Dairy goats: milk, the breeding year, housing and breeds",
    description: "Keeping dairy goats: milk yields and lactation, the autumn breeding season and 150-day gestation, housing, fencing, breeds for hot and cool climates, milk safety and what to check.",
    image: "goat",
    facts: [
      {
        label: "Milk",
        value: "Well-managed does give 540–1,180 kg (1,200–2,600 lb) of milk a year, over a lactation that averages 284 days (Iowa State University Extension).",
      },
      {
        label: "Breeding",
        value: "Seasonal breeders: in the north, does come into season from late August to mid-March, mostly September to January. Gestation is 145–155 days, and twins are usual (Iowa State).",
      },
      {
        label: "Space",
        value: "0.9–1.4 m² (10–15 sq ft) of bedded floor per adult plus 2.3 m² (25 sq ft) to exercise (New Mexico State); Iowa State gives 1.4–1.9 m² (15–20 sq ft) per doe, and the British Goat Society 2.5 m² for a doe in a single pen.",
      },
      { label: "Fencing", value: "At least 1.2 m (4 ft) of woven wire, with a board, barbed or electric wire along the top (New Mexico State; the UK welfare code also asks for at least 1.2 m)." },
    ],
    glance: [
      { label: "Company", value: "Goats are gregarious and prefer to live in groups; one kept alone needs more of your time (UK welfare code)." },
      { label: "Weather", value: "They suffer badly in wind, constant rain, hot sun and flies, and a goat soaked to the skin risks pneumonia (British Goat Society)." },
      { label: "Shed", value: "Three closed sides, the open side facing south or away from the prevailing wind (New Mexico State)." },
      { label: "Milking", value: "At least once a day, and twice for the first six weeks after kidding (British Goat Society)." },
      { label: "Water", value: "Fresh, clean water at all times (UK welfare code), warmed in cold weather (New Mexico State)." },
      { label: "First breeding", value: "At 32–36 kg (70–80 lb) or 7–10 months old (Iowa State)." },
    ],
    sections: [
      {
        id: "milk",
        heading: "Milk and the breeding year",
        paragraphs: [
          "A doe milks after she kids, for an average of 284 days, and is bred again to milk the next year. Yields in well-managed herds run from 540 to 1,180 kg a year; Iowa State's breed averages put Saanens and Alpines highest (about 970 kg), then Toggenburgs (920 kg), LaManchas (830 kg) and Nubians (815 kg). Does are first bred at 32–36 kg or 7–10 months old (Iowa State University Extension).",
          "Goats breed by the season: in the north, does come into season from late August to mid-March, mostly from September to January, and kid 145 to 155 days later, usually twins (Iowa State). Anglo-Nubians have a much longer breeding season than the Swiss breeds, which makes milk possible all year (Oklahoma State University).",
        ],
      },
      {
        id: "housing",
        heading: "Housing and weather",
        paragraphs: [
          "Goats handle a good deal of dry cold if they are out of draughts, but wet, draughty housing brings respiratory infection and hypothermia. Housing should be dry, well ventilated and free of draughts, especially at kidding. An open shed with three closed sides faces south or away from the prevailing wind, with panels to close it in bad weather; shade matters in extreme heat. Allow 0.9–1.4 m² of bedded floor per adult, 2.3 m² to exercise, and a kidding pen of at least 1.2 × 1.5 m (4 × 5 ft) (New Mexico State University).",
          "The British Goat Society notes that goats suffer badly in wind, constant rain, hot sun and flies, and that a goat soaked to the skin risks pneumonia. The UK welfare code asks for a covered, dry lying area and regular foot trimming where needed, with the floor kept dry underfoot.",
        ],
      },
      {
        id: "fencing",
        heading: "Fencing",
        paragraphs: [
          "Use woven wire at least 1.2 m high with a board, barbed wire or an electric wire on top; an overhang inside the fence helps (New Mexico State University). Electric mesh fencing is unsuitable for horned goats and for kids, which can get caught in it (UK welfare code).",
        ],
      },
      {
        id: "milk-safety",
        heading: "Milk safety",
        paragraphs: [
          "Raw milk can carry Campylobacter, Cryptosporidium, E. coli, Listeria, Brucella and Salmonella. Children under five, adults over 65, pregnant women and people with weakened immune systems are the most at risk of serious illness. Pasteurisation, heating milk to kill these germs, is what makes milk safe (CDC).",
        ],
      },
    ],
    breeds: "goat",
    check: [
      { what: "Whether goats are allowed on your lot at all, and how many", who: "your municipality's zoning or planning office" },
      { what: "Whether goats must carry ear tags or be registered, and the rules for moving them", who: "your national agriculture department" },
      { what: "Whether you may sell or give away milk, and on what terms", who: "the food-safety authority where you live" },
    ],
    local: "When the days shorten towards the breeding season, freezing nights and hot days.",
    panel: "climate",
    sources: ["isuGoats", "nmsuGoats", "adga", "osuSaanen", "osuToggenburg", "osuNubian", "defraGoats", "bgsGoats", "cdcRawMilk"],
  },
  {
    slug: "meat-rabbits",
    title: "Meat rabbits",
    short: "Meat rabbits",
    eyebrow: "Livestock",
    note: "The breeding cycle, heat, the nest box and hutches",
    lede: "Meat rabbits breed quickly, need little space and are hurt far more by heat than by cold. Shade and moving air in summer, and a deep, well-bedded nest box for newborn kits in winter, are most of the work.",
    seoTitle: "Meat rabbits: breeding, heat, the nest box and housing",
    description: "Keeping meat rabbits: New Zealand White and Californian breeds, gestation and weaning, the temperatures rabbits stand, nest boxes for winter litters, hutch sizes and what to check.",
    image: "rabbit",
    facts: [
      { label: "Breeding", value: "Gestation runs 28 to 35 days, averaging 31 (Oregon State University Extension); productive strains average about eight young a litter (USDA)." },
      { label: "Weaning", value: "At about two months old (USDA, Oregon State); Utah State's guide weans between 42 and 55 days." },
      {
        label: "Heat",
        value: "Above 25–30 °C rabbits stretch out to lose heat; at 35 °C and above they can no longer control their temperature (FAO). Above 29 °C (85 °F) heat stress also cuts bucks' fertility for a time (Utah State).",
      },
      { label: "Hutch", value: "No deeper than 75 cm (2.5 ft), 60 cm (2 ft) high, and 90–120 cm (3–4 ft) long for the medium breeds (USDA)." },
    ],
    glance: [
      { label: "Breeds", value: "New Zealand White and Californian, the standard white meat breeds; Californians weigh 3.6–4.8 kg (8–10.5 lb) grown (USDA)." },
      { label: "First breeding", value: "Medium breeds at 5–6 months (USDA)." },
      { label: "Newborn kits", value: "Need at least 28 °C; a good nest holds its middle at 30–35 °C (FAO)." },
      { label: "Water", value: "A doe with seven eight-week-old young drinks about 3.8 L (1 US gal) a day, more in summer (USDA). Keep the water tank in the shade (FAO)." },
      { label: "Air", value: "Ammonia of 20–30 ppm damages the airways; the limit is 5 ppm. Very dry air, below 55 % humidity, is hard on rabbits (FAO)." },
    ],
    sections: [
      {
        id: "breeding",
        heading: "The breeding cycle",
        paragraphs: [
          "Medium breeds are first mated at five to six months. Gestation lasts 31 days on average (28 to 35), nearly all litters arrive between days 30 and 33, and productive strains average about eight young. Kits are weaned at about two months (USDA; Oregon State University Extension). Utah State University's guide weans between days 42 and 55, taking the largest young first at two-day intervals, and advises a 35-day interval between litters.",
          "Where extreme heat makes kindling unwise for two or three months of the year, does can be bred again 42 days after kindling and still raise four litters a year (USDA).",
        ],
      },
      {
        id: "heat",
        heading: "Heat",
        paragraphs: [
          "Rabbits control their temperature well between 0 and 30 °C. Above 25–30 °C they stretch out, pant and send blood to their ears; at 35 °C and above heat prostration sets in. Very hot spells with humidity near 100 % are especially dangerous, and so is air that is both hot and dry (FAO). Above 29 °C heat stress can also make bucks temporarily less fertile (Utah State University Extension).",
          "Keep hutches out of direct sun, which does serious harm, give them shade and open air, and in hot climates add sprinklers or foggers (USDA). In hot weather let the doe scatter the nest so the kits can cool, and keep the drinking-water tank shaded so the water stays cool (FAO; Oregon State).",
        ],
      },
      {
        id: "cold",
        heading: "Cold and the nest box",
        paragraphs: [
          "Grown rabbits curl up in the cold and cope well. Newborn kits do not: they need at least 28 °C, ideally 30–32 °C, and littermates to huddle against, and a kit can die of cold 10 cm from the rest of the litter (FAO). In the USDA's experience, winter litters survived −26 to −29 °C (−15 to −20 °F) when the doe built a good fur nest in a well-insulated nest box. Check winter nest boxes daily for the first three or four days after kindling (USDA).",
        ],
      },
      {
        id: "housing",
        heading: "Housing",
        paragraphs: [
          "A hutch for the medium breeds is no deeper than 75 cm, so you can reach the back, 60 cm high and 90–120 cm long (USDA). Clean it often and keep air moving: ammonia builds up in a dirty rabbitry and damages rabbits' airways, and wire floors at high temperatures bring sore hocks (FAO).",
          "Home slaughter and the sale of rabbit meat are regulated. Extension services publish step-by-step processing guides.",
        ],
      },
    ],
    breeds: "rabbit",
    check: [
      { what: "Whether rabbits kept for meat are allowed on your lot, and how many", who: "your municipality's by-law or zoning office" },
      { what: "Rules on slaughtering at home and on selling rabbit meat", who: "the food-safety authority where you live" },
    ],
    local: "Days above 30 and 35 °C, and the freezing nights when litters need a deep nest box.",
    panel: "climate",
    sources: ["osuRabbits", "usuRabbits", "usdaRabbits", "faoRabbits"],
  },
  {
    slug: "rainwater",
    title: "Rainwater harvesting",
    short: "Rainwater",
    eyebrow: "Water",
    note: "How much a roof gives, tank size, first flush and safety",
    lede: "Every millimetre of rain on a square metre of roof is a litre of water. A roof catches most of it; the size of the tank decides how much of the year that water lasts.",
    seoTitle: "Rainwater harvesting: roof yield, tank size and safe use",
    description: "Collecting rainwater from a roof: litres per millimetre of rain, collection efficiency, the first-flush diverter, sizing a tank by the monthly water balance, winter care, and why roof water is not drinking water without treatment.",
    image: "rain-tank",
    facts: [
      { label: "Yield", value: "1 mm of rain on 1 m² of roof is 1 litre (0.62 US gal per sq ft per inch). Installers count on getting 75–90 % of it (Texas Water Development Board)." },
      { label: "Roof area", value: "The roof's footprint, measured eave to eave, not the sloping surface (Texas Water Development Board)." },
      { label: "First flush", value: "Divert the first 0.4–0.8 L per m² of roof (1–2 US gal per 100 sq ft) from each storm (Texas Water Development Board)." },
      { label: "Tank size", value: "Enough to carry you through the longest expected spell without rain (Texas Water Development Board)." },
    ],
    glance: [
      { label: "Mosquitoes", value: "Screen every opening where water enters, or empty barrels at least every 10 days (CDC)." },
      { label: "Roofs", value: "Asphalt and composite shingles leach compounds and suit garden water only; lead solder has no place in a drinking-water system (Texas Water Development Board)." },
      { label: "After dry spells", value: "Bird droppings on the roof wash in with the first rain (CDC)." },
      { label: "Winter", value: "Drain and disconnect barrels before the first hard freeze: water expands about 9 % as it freezes (Penn State Extension)." },
      { label: "Upkeep", value: "Watch tank levels, clean gutters and first-flush devices, and repair leaks (Texas Water Development Board)." },
    ],
    safety: {
      title: "Roof water is not drinking water",
      body: [
        "Rainwater can pick up germs and chemicals from the air, the roof, the gutters and the tank, even when it looks clean. The CDC advises using it in ways that limit the chance of swallowing it, and using tap or bottled water for drinking, cooking, brushing teeth, rinsing fruit and vegetables and watering food plants. Do not let it into drinking-water pipes.",
        "Making roof water drinkable takes filtration and disinfection in series: the most common set-up in Texas is a 5-micron sediment filter, then a 3-micron activated-carbon filter, then ultraviolet light. Filters must be changed regularly or they harbour bacteria, UV lamps replaced, and the water tested regularly; ask your health department which tests to run (Texas Water Development Board, CDC).",
      ],
    },
    sections: [
      {
        id: "yield",
        heading: "How much a roof gives",
        paragraphs: [
          "One millimetre of rain on one square metre is one litre. Measure the roof's footprint, the length and width from eave to eave, whatever its pitch, and only the part that drains into guttering you collect from (Texas Water Development Board).",
          "Not all of it reaches the tank: some goes to the first flush, evaporation, splash-out and overshoot from gutters in heavy rain, leaks, and overflow once the tank is full. Rough roofs lose more; clay and concrete tiles and composite shingles lose around 10 %. Most installers assume a roof delivers 75–90 % of the rain that falls on it, and the Texas manual's worked example uses 85 % (Texas Water Development Board). The place pages use 85 % and give the 75–90 % range.",
        ],
      },
      {
        id: "storage",
        heading: "Sizing the tank: the monthly balance",
        paragraphs: [
          "Rain comes in seasons, so the tank has to store the wet months' water for the dry ones. The Texas manual's method works like a chequebook: start with what is in the tank, add each month's catch, take away each month's use, and size the tank so it never runs dry. It also notes that monthly medians run below monthly averages (Dallas: 889 mm average against 744 mm from the sum of the monthly medians), so average figures overstate a dry year (Texas Water Development Board).",
          "The place pages run that balance for 100 m² of roof, drawing the roof's own average yield evenly every day of the year. The result is the smallest tank that carries an average year's water from the wet months through the dry ones, and the months the tank runs down.",
        ],
      },
      {
        id: "clean",
        heading: "Keeping the water clean",
        paragraphs: [
          "The first rain off a roof carries the most dust, droppings and debris, so a first-flush diverter sends it away from the tank. Opinions vary on how much to divert; the Texas manual gives 1–2 US gallons per 100 sq ft of roof (0.4–0.8 L per m²), or at least 10 gallons per 1,000 sq ft, more after long dry spells or under trees (Texas Water Development Board; CDC).",
          "Screen every opening against mosquitoes, or empty open barrels at least every 10 days (CDC). Keep tanks covered.",
        ],
      },
      {
        id: "winter",
        heading: "Winter",
        paragraphs: [
          "Where it freezes hard, drain and detach rain barrels before the first hard freeze, which Penn State defines as below −2 °C (28 °F) for an extended time: water expands about 9 % as it freezes, enough to crack a wooden or plastic barrel. Store them under cover or upside down, strapped against the wind, fit a downspout extension to carry roof water away from the house, and reconnect after the last hard freeze (Penn State Extension).",
        ],
      },
    ],
    check: [
      { what: "Whether you may collect rainwater, and how much: water rights differ by state, province and country", who: "the environmental-quality, water-resources or health department" },
      { what: "Any connection between a rain tank and the house plumbing", who: "the building department and the health department" },
      { what: "Permits for large tanks and their foundations", who: "the building department" },
    ],
    local: "Litres a year and a month from 100 m² of roof, and the storage the dry months need.",
    panel: "water",
    sources: ["twdbRain", "cdcRain", "psuRainBarrel"],
  },
  {
    slug: "wood-heat",
    title: "Firewood and wood heat",
    short: "Wood heat",
    eyebrow: "Heat",
    note: "Seasoning, heat by species, heating degree days and safety",
    lede: "Dry wood is most of the craft: air-dried wood gives about twice the heat of fresh-cut wood per kilogram and burns far cleaner. Dense hardwoods pack the most heat into a stacked cubic metre.",
    seoTitle: "Firewood and wood heat: seasoning, heat by species and safety",
    description: "Heating with wood: drying firewood below 20 % moisture, heat in a stacked cubic metre for 43 species across North America, Europe and Africa, heating degree days, and carbon-monoxide and chimney-fire safety.",
    image: "woodpile",
    facts: [
      { label: "Dryness", value: "Burn wood below 20 % moisture; season split wood for at least six months (US EPA)." },
      { label: "Drying time", value: "Beech and spruce dry below 20 % within a year if stored well; unsplit rounds can take up to two years (Bavarian State Institute of Forestry)." },
      { label: "Heat per kilogram", value: "About 4 kWh per kg at 15–20 % water content, against 2 kWh per kg for fresh-cut wood (Bavarian State Institute of Forestry)." },
      { label: "Heat per stacked m³", value: "Beech about 1,900 kWh, spruce about 1,300 kWh, at 20 % water content (Bavarian State Institute of Forestry)." },
    ],
    glance: [
      { label: "Storage", value: "Outdoors, off the ground, with only the top covered: covering the sides traps moisture (US EPA)." },
      { label: "Testing", value: "Use a moisture meter. Seasoned wood is darker, lighter and sounds hollow when knocked together (US EPA)." },
      { label: "Never burn", value: "Rubbish, cardboard, plastics, painted, coated or pressure-treated wood, or wet, rotten or mouldy wood (US EPA)." },
      { label: "Ashes", value: "In a metal container with a tight lid, outdoors, at least 3 m (10 ft) from any building (BC Office of the Fire Commissioner)." },
      { label: "Clearance", value: "Anything that can burn at least 1 m from the stove (BC Office of the Fire Commissioner)." },
      { label: "Moving wood", value: "Buy firewood where you burn it, or buy heat-treated wood: firewood spreads tree pests such as the emerald ash borer (USDA)." },
    ],
    safety: {
      title: "Carbon monoxide and chimney fires",
      body: [
        "Wood stoves and fireplaces produce carbon monoxide, and a blocked or badly vented flue lets it into the house; it can affect you before you notice it (Health Canada). Fit carbon-monoxide alarms on every level of the house and outside sleeping areas (CPSC) and test them every month (BC Office of the Fire Commissioner). Headache, dizziness, weakness, nausea, vomiting, sleepiness and confusion are the signs: get outside into fresh air at once and call emergency services (CPSC). Leave immediately if an alarm sounds (Health Canada).",
        "Have a licensed professional clean and inspect the chimney every year (BC Office of the Fire Commissioner); Scotland's fire service advises sweeping a wood-burning chimney every three months while it is in use. Signs of a chimney fire: a roaring sound in the chimney, burning soot falling into the fireplace, sparks or flames from the chimney top, a chimney breast too hot to touch. If it is safe, close the air vents; then get everyone out of the room, close the door, and call the fire service (Scottish Fire and Rescue Service).",
      ],
    },
    sections: [
      {
        id: "dry",
        heading: "Why dry wood matters",
        paragraphs: [
          "A kilogram of air-dried wood (15–20 % water) gives about 4 kWh of heat; a kilogram of fresh-cut wood (50 % water and more) about 2 kWh, because the rest goes into boiling off the water. Wet wood also gives off more smoke and leaves corrosive deposits in the stove and chimney (Bavarian State Institute of Forestry). Wood burns best below 20 % moisture (US EPA), and properly installed, correctly used stoves should make very little smoke: smoke you regularly see or smell means something is wrong (US EPA).",
          "Avoid running a stove at low output for long spells, such as overnight; after one, burn it hot for at least 30 minutes to dry out any creosote (Scottish Fire and Rescue Service).",
        ],
      },
      {
        id: "seasoning",
        heading: "Seasoning and storage",
        paragraphs: [
          "Fell firewood in winter and split it soon after: split wood dries faster and fresh wood splits more easily. Unsplit rounds can take two years to dry, and many hardwoods left to dry too slowly are taken over by rot and lose much of their heat. Cut and split to the length and thickness your stove takes and the wood dries faster still; beech and spruce or pine then reach 20 % within a year (Bavarian State Institute of Forestry). The US EPA asks for at least six months of seasoning.",
          "Stack on a sunny, windy spot on a dry base such as pallets, crossed at the ends or in crates; cover the top after the summer's drying, leave 10 cm between the stack and any wall, and never wrap fresh wood in plastic or store it indoors, where it cannot dry and rots (Bavarian State Institute of Forestry; US EPA).",
        ],
      },
      {
        id: "species",
        heading: "Heat by species",
        paragraphs: [
          "Every kilogram of dry wood holds much the same heat (conifers a little more, from their resin and lignin), so a stacked cubic metre of dense wood holds the most. The table gives each species' heat in a stacked cubic metre (a stere) and a cord at 20 % water content, worked out by the Bavarian State Institute of Forestry's method from the species' density in the Global Wood Density Database. The figures are net heat: tables of gross heat, such as the University of Kentucky's, run higher (it gives white oak 27.9 million BTU a cord against 26.3 here), and the institute's own figure for beech, 1,885 kWh, sits a little below the 1,980 kWh here because it uses a different density.",
          "Oak burns long and hot; ash, maple, hornbeam and cherry burn much like beech; birch burns cleanly without spitting; poplar and willow burn fast and suit milder days; pine and spruce light easily and make good kindling but spit from their resin (Bavarian State Institute of Forestry).",
        ],
      },
      {
        // Day 5 audit, 14 November 2026: this said every page's monthly means were ERA5's; 74 towns now read a station's
        // normals (scripts/build-station-normals.ts, src/data/place-station-normals.json).
        id: "degree-days",
        heading: "Heating degree days",
        paragraphs: [
          "A heating degree day counts how far a day's temperature falls below a base, here 18 °C; a year's total is a measure of how much heating a place needs. The place pages work it out from each month's mean temperature by Erbs, Klein and Beckman's method (ASHRAE Journal, 1983), which allows for days colder and warmer than the month's average; run on NOAA's 1991–2020 monthly normals it comes within 1 % of NOAA's own heating degree days at most US stations. Where we have read a nearby weather station's monthly normals (NOAA's 1991–2020 normals for most US towns, NOAA's monthly summaries of an Environment Canada station for a few Canadian ones), the pages use them and name the station. Elsewhere the monthly means are ten years of ERA5 reanalysis, a weather model's grid, which runs mild in some towns, so a page can still read low: for Ottawa it gives about 4,220 °C-days, against about 4,500 from Canada's ClimateData.ca.",
        ],
      },
    ],
    check: [
      { what: "Burning rules: burn bans, smoke-control areas, approved stoves and what may be burned", who: "your municipality and the provincial, state or national environment agency" },
      { what: "A permit and inspection for a new stove or chimney", who: "the building department, and your home insurer" },
      { what: "Quarantines on moving firewood", who: "the national plant-health agency (USDA APHIS works with the states on firewood quarantines)" },
    ],
    local: "Heating degree days, the heating season, and when to split next winter's wood.",
    panel: "wood",
    sources: ["epaBurn", "lwfFirewood", "gwdd", "ukyFirewood", "sfrsChimney", "bcHeating", "cpscCo", "hcCo", "usdaFirewood", "noaaNormals", "munalula", "wattleEthiopia"],
  },
  {
    slug: "compost",
    title: "Compost and manure",
    short: "Compost and manure",
    eyebrow: "Soil",
    note: "A hot pile, the mix, and using manure safely",
    lede: "A hot pile turns manure, bedding and kitchen scraps into compost that is safe to spread. Heat is what makes it safe: 55 °C or more, held long enough, with the pile turned so every part of it spends time in the middle.",
    seoTitle: "Compost and manure: building a hot pile and using manure safely",
    description: "Making compost on a homestead: the carbon-to-nitrogen mix, moisture, the temperatures and turning that make compost safe, what not to compost, and how long raw manure must be in the soil before harvest.",
    image: "compost",
    facts: [
      { label: "The mix", value: "A carbon-to-nitrogen ratio of 25:1 to 30:1 (University of Rhode Island); in practice two to three times as much brown material as green, by volume (US EPA)." },
      { label: "Moisture", value: "40–60 %, damp like a wrung-out sponge (University of Rhode Island; US EPA)." },
      {
        label: "Heat",
        value: "55–77 °C (131–170 °F) for 3 days in a bin or aerated pile, or for 15 days in a windrow turned at least five times (the US organic standard, USDA).",
      },
      // Raw manure: the audit of 10 November 2026 found the USDA rule printed for Canadian towns as if it were theirs.
      // Canada's organic standard, CAN/CGSB-32.310 clause 5.5.2.5, sets the same 120 and 90 days (2015 edition amended
      // 2018, and 2020: Organic Federation of Canada's comparison of the two, section 5, read 11 November 2026).
      { label: "Raw manure", value: "In the soil at least 120 days before harvest where the crop touches the soil, and 90 days before other food crops: the same in the US organic standard (USDA) and Canada's (CAN/CGSB-32.310)." },
    ],
    glance: [
      { label: "Greens", value: "Fruit and vegetable scraps, grass clippings, coffee grounds, tea bags, crushed eggshells (US EPA)." },
      { label: "Browns", value: "Dry leaves, stalks and twigs, plain shredded paper and cardboard, untreated wood chips (US EPA)." },
      { label: "Leave out", value: "Meat, fish, bones, dairy, fats and cooked food, which draw animals; pet waste and cat litter; diseased plants; weeds in seed; treated wood (US EPA)." },
      { label: "Start", value: "A 10–15 cm (4–6 in) layer of bulky browns, then greens and browns in layers (US EPA)." },
      { label: "Finished", value: "When the pile stops heating and no scraps show, cure it for at least four weeks; a well-kept pile is ready in three to five months (US EPA)." },
    ],
    sections: [
      {
        id: "pile",
        heading: "Building a hot pile",
        paragraphs: [
          "Aim for a carbon-to-nitrogen ratio of 25:1 to 30:1 (20:1 to 40:1 works), moisture of 40–60 % and a pile that heats to 54–66 °C (130–150 °F); done well, the result is free of pathogens and weed seeds. Air keeps it working: turn it, or run perforated pipe through it (University of Rhode Island). In practice, that ratio is at least two to three times as much brown material as green by volume, with food scraps buried under 10–20 cm of leaves to keep animals out (US EPA).",
          "Choose a spot that drains well, close to water, not against a fence. Start with 10–15 cm of bulky browns such as twigs and wood chips, which soak up liquid and let air in, then layer greens and browns. Add water only if the pile dries out, and turn it now and then (US EPA).",
        ],
      },
      {
        id: "manure",
        heading: "Manure from the animals",
        paragraphs: [
          "Manure goes in with its bedding. Straw bedding helps the mix; a lot of wood bedding pushes the carbon-to-nitrogen ratio up (University of Rhode Island). Site and run a manure compost pile as you would a manure store: covered or roofed, on a firm base, with runoff led onto a grassed strip rather than into a ditch (University of Rhode Island).",
          "Under the USDA's organic standard, compost from manure has to reach 55–77 °C and stay there for 3 days in a bin or aerated pile, or for 15 days in a windrow turned at least five times, from a starting mix between 25:1 and 40:1 (USDA). Other countries set their own rules; the standard is a useful measure of what a safe pile looks like.",
        ],
      },
      {
        id: "raw",
        heading: "Raw manure on food crops",
        paragraphs: [
          "Raw manure carries germs that compost heat kills. The US organic standard requires raw manure to be worked into the soil at least 120 days before harvesting a crop whose edible part touches the soil, and at least 90 days before harvesting any other food crop (USDA); Canada's organic standard sets the same 120 and 90 days (CAN/CGSB-32.310, clause 5.5.2.5). Spread on beds cleared in autumn, it has the winter to break down.",
        ],
      },
    ],
    check: [
      { what: "How far manure stores and compost piles must sit from wells, streams and property lines", who: "your municipality, conservation district or environment agency" },
      { what: "Rules for certified organic growing", who: "your organic certification body" },
    ],
    local: "When the first autumn frost clears the beds for spreading manure.",
    panel: "month",
    sources: ["uriCompost", "usdaManure", "cgsbOrganic", "epaCompost"],
  },
  {
    slug: "food-storage",
    title: "Root cellars and food storage",
    short: "Food storage",
    eyebrow: "Storage",
    note: "Cold and moist, cold and dry, cool and dry; curing",
    lede: "A root cellar keeps roots and cabbages through winter by holding them cold and damp, while onions, garlic and squash want drier air. Most of the craft is matching each crop to the right corner and curing it first.",
    seoTitle: "Root cellars and food storage: temperatures, humidity and curing",
    description: "Storing the harvest without power: the three storage conditions, building or partitioning a root cellar, ventilation, curing potatoes and onions, and keeping apples away from vegetables. Canning, drying and fermenting are covered under preserving.",
    image: "root-cellar",
    facts: [
      { label: "Cold and moist", value: "0–4 °C (32–40 °F) at about 95 % humidity: carrots (8 months), beets and cabbage (5 months) (University of Minnesota Extension)." },
      { label: "Cold and dry", value: "0–4 °C at about 65 % humidity: onions (University of Minnesota); Purdue gives 0 °C at 65–70 % for onions and garlic." },
      { label: "Cool and dry", value: "10–16 °C (50–60 °F) at about 60 %: winter squash and pumpkins (University of Minnesota); Purdue gives squash 10–13 °C at 50–75 %." },
      { label: "Potatoes", value: "Sources differ: 0–4 °C at 95 % (University of Minnesota) or 4–7 °C (40–45 °F) at 90 % (Purdue). Cure them first at 10–16 °C for 14 days (University of Minnesota)." },
    ],
    glance: [
      { label: "Apples and pears", value: "Store them away from vegetables: their ethylene gas damages them (Purdue)." },
      { label: "Thermometers", value: "One in the coldest spot of the cellar and one outdoors (Purdue)." },
      { label: "Humidity", value: "Perforated plastic bags with several 6–10 mm (¼–⅜ in) holes hold it better than wet floors or pans of water (Purdue)." },
      { label: "Venting", value: "Open the vents when outdoor air is colder than the cellar; close them whenever it is warmer (Purdue)." },
      { label: "Onions", value: "Cure at room temperature for two to four weeks before storing (University of Minnesota)." },
      { label: "Rodents", value: "Line buried storage with 13 mm (½ in) hardware cloth (Purdue)." },
    ],
    sections: [
      {
        id: "conditions",
        heading: "Three kinds of storage",
        paragraphs: [
          "Long storage comes in three conditions: cool and dry, at 10–16 °C and 60 % humidity; cold and dry, at 0–4 °C and 65 %; and cold and moist, at 0–4 °C and 95 % (University of Minnesota Extension). Roots and cabbages want cold and moist; onions and garlic cold and dry; squash and pumpkins cool and dry, and pumpkins suffer below 7 °C (45 °F).",
          "The sources disagree on potatoes: Minnesota stores them at 0–4 °C and 95 % for six months, Purdue at 4–7 °C and 90 % for two to nine months. Either way, cure them first at 10–16 °C for 14 days (University of Minnesota; Purdue).",
        ],
      },
      {
        id: "cellar",
        heading: "Building or partitioning a cellar",
        paragraphs: [
          "A basement with a furnace is too warm. Partition off a north or east corner with no heating pipes or ducts and at least one window for cooling, blacked out against light; an unheated basement with a dirt floor is ideal, and an outdoor door or window helps the air move. Keep one thermometer in the coldest spot and one outdoors, and a humidity gauge (Purdue).",
          "Cooling comes from the night air: open the vents when it is colder outside than in, and close them tightly whenever it is warmer outside. It takes outdoor temperatures well below freezing to bring a cellar down to 0 °C. Damp floors and pans of water raise the humidity a little, but not enough for roots; perforated polyethylene bags do it best (Purdue).",
        ],
      },
      {
        id: "preserving",
        heading: "Canning, drying and fermenting",
        paragraphs: [
          "What a cellar cannot keep can be preserved. The gardening section covers the preserving methods and tested recipes, and the storage, harvest timing and frost tolerance of each crop.",
        ],
      },
    ],
    check: [
      { what: "A permit for digging a cellar or building a storage outbuilding", who: "the building department" },
      { what: "Buried cables and pipes before you dig", who: "your local call-before-you-dig service" },
    ],
    local: "When to harvest and cure before the first frost, and when night air can cool the cellar.",
    panel: "month",
    sources: ["umnStorage", "purdueStorage"],
  },
  {
    slug: "season-extension",
    title: "Cold frames, tunnels and hoop houses",
    short: "Season extension",
    eyebrow: "Growing",
    note: "Weeks gained at each end, frost protection and venting",
    lede: "Covers, cold frames, low tunnels and hoop houses hold the day's warmth and keep off frost, stretching the growing season by weeks at both ends. The frost dates are where the planning starts.",
    seoTitle: "Cold frames, low tunnels and hoop houses: extending the season",
    description: "Season extension on a homestead: how many weeks covers and tunnels add, how much frost protection row covers give, venting, materials, and the cover dates for your town worked out from its frost dates.",
    image: "season",
    facts: [
      { label: "Weeks gained", value: "As much as two to four weeks in both spring and autumn (WSU Extension); warm-season crops can get up to a month's start or last a month longer (NC State Extension)." },
      { label: "Frost protection", value: "Row covers and low tunnels give 2–3 °C (4–5 °F) (NC State). Medium covers protect to about −2 °C (28 °F) and heavy ones to −4 °C (24 °F); light covers give none (WSU)." },
      { label: "Heat", value: "Open covers when it would stay above 32 °C (90 °F) underneath for hours, and cut vents in tunnels before the heat comes (NC State)." },
      { label: "Film", value: "Greenhouse-grade polyethylene lasts 12–18 months, utility film about a year, copolymer film two to three years (NC State)." },
    ],
    glance: [
      { label: "Light", value: "Medium covers pass about 85 % of the light, heavy covers 35–50 % (WSU)." },
      { label: "Cold frames", value: "Wood (cedar resists rot) or block; never wood treated with CCA, creosote or pentachlorophenol (NC State)." },
      { label: "Shelter", value: "A wall or hedge to the north shelters a cold frame from winter wind (NC State)." },
      { label: "Venting", value: "Open cold frames on sunny days in late winter, spring and early autumn, and close them early enough to hold the evening's heat (NC State)." },
      { label: "Wind", value: "Pin covers down with staples or soil pins (WSU)." },
      { label: "Hoop houses", value: "One or two layers of 6-mil greenhouse polyethylene over bows on posts driven about 60 cm (2 ft) into the ground (NC State)." },
    ],
    sections: [
      {
        id: "structures",
        heading: "What each structure does",
        paragraphs: [
          "Row covers of spun-bonded fabric lie on the crop or over hoops; low tunnels are hoops 60–90 cm high over a row or bed. Light covers pass 80–90 % of the light but give no frost protection; medium covers protect to about −2 °C and pass about 85 %; heavy covers protect to about −4 °C but pass only 35–50 % (WSU Extension). NC State puts the frost protection of row covers and low tunnels at 2–3 °C.",
          "Cold frames are bottomless boxes with a glazed lid; cloches cover single plants, and water-filled tomato collars protect down to about −9 °C (16 °F) (WSU). High tunnels, or hoop houses, are tall enough to walk in: they give some frost protection, but their main work is raising the temperature a few degrees each day over several weeks (NC State Extension).",
        ],
      },
      {
        id: "timing",
        heading: "Timing from your frost dates",
        paragraphs: [
          "Covers and tunnels add as much as two to four weeks at both ends of the season (WSU), so they go on two to four weeks before the average last spring frost and keep crops going two to four weeks past the first autumn frost. NC State puts the gain for warm-season crops such as tomatoes and cucumbers at up to a month each end. The place pages work out those dates from the town's average frost dates.",
          "Average frost dates are averages: in any one year frost comes earlier or later, so keep covers to hand for a week or two either side.",
        ],
      },
      {
        id: "heat",
        heading: "Heat and ventilation",
        paragraphs: [
          "Covers overheat on sunny days. Open them in the day if it will stay above 32 °C underneath for several hours, and cut slits in low tunnels before the heat arrives, not after. In hoop houses keep wind-pollinated crops below 32 °C for all but a few hours while they flower, and uncover bee-pollinated crops when the first female flowers open so bees can reach them. Close cloches at night (NC State Extension).",
        ],
      },
      {
        id: "building",
        heading: "Building",
        paragraphs: [
          "Plastic pipe is generally not strong enough for snow and wind loads on a greenhouse; glass needs a frame strong enough to carry it. Anchor cloches and covers so they do not blow away (NC State Extension; WSU).",
        ],
      },
    ],
    check: [{ what: "Whether a hoop house or greenhouse needs a permit, how far it must sit from the boundary, and the snow and wind loads it must carry", who: "the building department" }],
    local: "The frost-free season, the cover dates in spring and autumn, and the season with covers.",
    panel: "season",
    sources: ["ncsuSeason", "wsuSeason"],
  },
];

export const getTopic = (slug: string) => TOPICS.find((t) => t.slug === slug);
