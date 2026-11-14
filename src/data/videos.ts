/**
 * The hand-picked YouTube videos on species and creature pages.
 *
 * Extracted from the client props in the captured pages' RSC payloads:
 * SPECIES_VIDEOS from SpeciesVideos on /foraging/<slug> (kind "forage",
 * heading "Identifying <name>"), CREATURE_VIDEOS from SpeciesVideos on
 * /wildlife/<slug> (kind "fish" or "garden"; fish with fishing films carry the
 * heading "Further videos: fishing for <name>"), and FISH_FILMS from FishFilms
 * on /wildlife/<slug> (each tagged with the regions and seasons it shows).
 * Species and creatures with no videos have no entry (the live pages passed
 * an empty list).
 */

export type Video = { id: string; title: string; channel: string; why: string; minutes?: number; date?: string };
export type FishFilm = Video & { regions: string[]; seasons: ("spring" | "summer" | "fall" | "winter")[] };

export const SPECIES_VIDEOS: Record<string, Video[]> = {
 "ramps": [
  {
   "id": "iXeSU1H5VVk",
   "title": "Ramps (Wild Leeks) and Toxic Lookalikes in Georgia: Veratrum parviflorum vs. Allium tricoccum",
   "channel": "The Monkey's Apothecary",
   "why": "Made for the Georgia Poison Center: compares ramps with toxic false hellebore and garden lily-of-the-valley, the two plants most often mistaken for them.",
   "minutes": 5,
   "date": "2021-03-21"
  },
  {
   "id": "DASlpmMpJpk",
   "title": "Poisoned from Foraging: Wild Ramp or False Hellebore?",
   "channel": "University of Vermont Health Network",
   "why": "Poison-centre warning from Vermont: emergency cases from people who ate toxic false hellebore believing it was ramps.",
   "minutes": 1,
   "date": "2020-05-20"
  },
  {
   "id": "bu8CpDQvJXE",
   "title": "EDIBLE MOUNTAIN -  How to Sustainably Harvest Ramps",
   "channel": "West Virginia Public Broadcasting",
   "why": "Appalachian experts on over-harvesting pressure and how to harvest ramps sustainably so patches recover.",
   "minutes": 4,
   "date": "2020-03-26"
  },
  {
   "id": "fRswlNIBhq0",
   "title": "Foraging for Wild Leeks with Chef Shawn Adler",
   "channel": "CBC Life",
   "why": "Canadian chef-forager on identifying wild leeks in spring woods and sourcing them sustainably.",
   "minutes": 6,
   "date": "2020-04-23"
  }
 ],
 "fiddleheads": [
  {
   "id": "cKx00sIo_GA",
   "title": "Identifying and Harvesting Fiddleheads",
   "channel": "The University of Maine",
   "why": "University of Maine Extension specialist shows how to identify true ostrich-fern fiddleheads and harvest them properly.",
   "minutes": 3,
   "date": "2012-05-17"
  },
  {
   "id": "9Hj1GqhwdQY",
   "title": "Common Fiddlehead Ostrich Fern Look Alikes - DON'T make this mistake - Some are toxic",
   "channel": "Eating Outside",
   "why": "Compares ostrich fern with look-alike fiddleheads: cinnamon fern, bracken, lady fern and toothed wood fern, some of them toxic.",
   "minutes": 6,
   "date": "2020-05-24"
  },
  {
   "id": "k7D44nFhzLQ",
   "title": "A safe and easy way to prepare fiddleheads.",
   "channel": "Nova Scotia Health",
   "why": "Public-health guide to cleaning and thoroughly cooking fiddleheads, since undercooked or raw fiddleheads can cause food-borne illness.",
   "minutes": 5,
   "date": "2015-07-24"
  },
  {
   "id": "PE2T49sckwM",
   "title": "Foraging for Fiddleheads~Ostrich Fern (How to Find, Identify & Harvest  them sustainably!)",
   "channel": "Alana Cawker-the Rustic wife",
   "why": "Canadian walk-through of where and when to find ostrich fern, its identifying features, sustainable picking, warnings and preparation (links Health Canada advice).",
   "minutes": 12,
   "date": "2022-05-10"
  }
 ],
 "morel": [
  {
   "id": "6auMOCYOVks",
   "title": "Morel and False Morel Mushrooms",
   "channel": "Georgia Poison Center",
   "why": "Poison-centre physician explains how to tell true morels from toxic false morels (Gyromitra) and why true morels must also be cooked.",
   "minutes": 9,
   "date": "2025-08-08"
  },
  {
   "id": "nGkLq_cFBrM",
   "title": "Morels #1:  Where to Find them, How to ID, Types of Morels",
   "channel": "OhioDNR",
   "why": "Ohio state park naturalist on where morels grow, how to identify them and the different types you may find.",
   "minutes": 2,
   "date": "2015-04-06"
  },
  {
   "id": "OXePLfjCUeI",
   "title": "How To Identify a Real Morel From a False Morel",
   "channel": "How to Alaska",
   "why": "Side-by-side comparison of a true morel and a false morel found on the same hunt, with a clear do-not-eat message on false morels.",
   "minutes": 5,
   "date": "2019-05-25"
  },
  {
   "id": "B35snqUtpFU",
   "title": "Morel Mushroom Advice You've Heard But Probably Need To Hear Again",
   "channel": "Learn Your Land",
   "why": "Adam Haritan revisits the core morel-hunting advice beginners most need.",
   "minutes": 11,
   "date": "2024-04-18"
  }
 ],
 "nettle": [
  {
   "id": "xy9g07F1Qfw",
   "title": "Nettle Identification",
   "channel": "Four Season Foraging",
   "why": "Tells stinging nettle from wood nettle, and both from look-alikes such as clearweed and false nettle.",
   "minutes": 14,
   "date": "2020-04-06"
  },
  {
   "id": "-2OtByvwg50",
   "title": "Wood Nettle and Stinging Nettle",
   "channel": "Mountain Gardens",
   "why": "Mountain Gardens (a North Carolina botanical garden) compares wood nettle and stinging nettle in the field.",
   "minutes": 13,
   "date": "2018-10-31"
  },
  {
   "id": "b5ulH6x65DY",
   "title": "EatTheWeeds: Episode 63: Stinging Nettles, Urtica",
   "channel": "EatTheWeeds",
   "why": "Green Deane on identifying stinging nettle and how to handle and prepare it without getting stung.",
   "minutes": 10,
   "date": "2009-01-14"
  }
 ],
 "dandelion": [
  {
   "id": "Gh7Fd5vXdNg",
   "title": "PLANT ID | I Am Not A Dandelion | EARTHSEED DETROIT",
   "channel": "Earthseed Detroit | Herbalism & Homesteading Magic",
   "why": "Dandelion ID checklist (ground-level rosette, smooth leafless stalk, one flower per stalk) shown against look-alikes: wild lettuce, sow thistle and hawkweed.",
   "minutes": 6,
   "date": "2018-06-21"
  },
  {
   "id": "CW0yFeKN1Pw",
   "title": "EatTheWeeds: Episode 62: Dandelions",
   "channel": "EatTheWeeds",
   "why": "Green Deane on recognising true dandelion and which parts are eaten.",
   "minutes": 9,
   "date": "2009-01-08"
  },
  {
   "id": "vIjUElGDEjs",
   "title": "The Complete Guide to Foraging, Processing and Cooking Dandelions",
   "channel": "Homegrown Handgathered",
   "why": "How to identify dandelion, where and when to find it, how to harvest it sustainably and prepare leaves, roots and flowers.",
   "minutes": 17,
   "date": "2023-04-24"
  }
 ],
 "wild-asparagus": [
  {
   "id": "XDxB9ZaZJfw",
   "title": "Where to Find Wild Asparagus & How to Find it",
   "channel": "MIgardener",
   "why": "Where wild asparagus grows (roadside ditches, sandy well-drained ground) and how to spot the spears in the grass.",
   "minutes": 6,
   "date": "2015-05-21"
  },
  {
   "id": "3OE3UTDipGY",
   "title": "FORAGING - for wild Asparagus",
   "channel": "Canadian Permaculture Legacy",
   "why": "Canadian forager's short asparagus hunt with a firm message: be certain, get multiple confirmations before eating anything.",
   "minutes": 4,
   "date": "2018-12-20"
  },
  {
   "id": "1T4CUWepFio",
   "title": "How To Find Wild Asparagus",
   "channel": "LT Outdoors",
   "why": "How to recognise asparagus once it has gone to fern and seed, so you can mark patches to pick the next spring.",
   "minutes": 8,
   "date": "2023-07-01"
  }
 ],
 "spruce-tips": [
  {
   "id": "aAb6143WuD0",
   "title": "Spruce Tips Crash Course",
   "channel": "Forager Chef",
   "why": "How and when Alan Bergo harvests spruce tips, and how he preserves and uses them.",
   "minutes": 5,
   "date": "2021-03-09"
  },
  {
   "id": "TR_-pCzYamE",
   "title": "Maine Balsam Fir Tips: A Sustainable Harvest",
   "channel": "The University of Maine",
   "why": "University of Maine Extension on properly identifying balsam fir and harvesting its tips sustainably.",
   "minutes": 4,
   "date": "2010-11-24"
  },
  {
   "id": "khx9nE-VuPY",
   "title": "Conifer Identification: Spruce, Fir and Hemlock",
   "channel": "EdibleWildFood.com",
   "why": "Ontario-based guide to telling spruce, fir and hemlock apart.",
   "minutes": 11,
   "date": "2024-05-04"
  },
  {
   "id": "tUvMkbabklI",
   "title": "Identifying yew",
   "channel": "Tree Husker",
   "why": "University dendrology clip on identifying yew, the highly toxic conifer that must never be confused with spruce or fir.",
   "minutes": 3,
   "date": "2020-07-07"
  }
 ],
 "cattail-shoots": [
  {
   "id": "IyYBidq5syY",
   "title": "Cattails or Irises: How to Tell the Difference",
   "channel": "EdibleWildFood.com",
   "why": "Tells cattails from toxic irises (and sweet flag), which grow in the same wetlands.",
   "minutes": 11,
   "date": "2023-06-23"
  },
  {
   "id": "NAXuLXqkFqA",
   "title": "Toxic Look a Likes - Cattail",
   "channel": "Trillium: Wild Edibles",
   "why": "How to separate young cattail shoots from toxic iris when there are no flowers to go by.",
   "minutes": 4,
   "date": "2015-06-13"
  },
  {
   "id": "nF_l_uJ_ZaM",
   "title": "Yellow Flag Iris vs Cattail Identification",
   "channel": "CKISS - Central Kootenay Invasive Species Society",
   "why": "BC invasive-species society shows yellow flag iris vs native cattail identification.",
   "minutes": 3,
   "date": "2021-08-10"
  },
  {
   "id": "KY6F8Iob2Ac",
   "title": "Edible Parts of Cattails",
   "channel": "Forager Chef",
   "why": "Every edible part of cattail (hearts/shoots, flower spikes, pollen, rhizomes) and when each is harvested.",
   "minutes": 8,
   "date": "2025-06-21"
  }
 ],
 "wild-violet": [
  {
   "id": "kSybcSyz3a0",
   "title": "Foraging Violets: Identifying, Harvesting, Drying and Uses 🌸",
   "channel": "Insteading",
   "why": "Identifying violets, which look-alikes to watch for, and how to harvest leaves and flowers.",
   "minutes": 7,
   "date": "2023-04-27"
  },
  {
   "id": "Ukzxrl2dvg4",
   "title": "EatTheWeeds: Episode 60: Violets, Violas",
   "channel": "EatTheWeeds",
   "why": "Green Deane on identifying violets (Viola) and their edible leaves and flowers.",
   "minutes": 7,
   "date": "2008-12-21"
  },
  {
   "id": "7hyJIZ5bWS0",
   "title": "Lookalikes: How to ID Invasive Lesser Celandine vs. Marsh Marigold & more",
   "channel": "Forgotten Flora",
   "why": "Separates invasive, toxic lesser celandine from smooth yellow violet, marsh marigold and kidneyleaf buttercup.",
   "minutes": 4,
   "date": "2026-04-07"
  }
 ],
 "wild-strawberry": [
  {
   "id": "ARD3xj5Ewvo",
   "title": "3 Native Strawberries and an Invasive Imposter!",
   "channel": "Backyard Ecology",
   "why": "Eastern North America's native wild strawberries and how to tell them from the invasive mock strawberry.",
   "minutes": 9,
   "date": "2024-04-18"
  },
  {
   "id": "folQz2nUS1Q",
   "title": "How to Identify Wild Strawberry vs. Mock Strawberry",
   "channel": "Some Room to Grow",
   "why": "Side-by-side identification of wild strawberry vs mock strawberry.",
   "minutes": 4,
   "date": "2019-06-24"
  },
  {
   "id": "a4Go05YYS7s",
   "title": "Foraging for Wild Strawberries 🍓",
   "channel": "Insteading",
   "why": "Finding, identifying and picking wild strawberries.",
   "minutes": 9,
   "date": "2021-07-08"
  }
 ],
 "serviceberry": [
  {
   "id": "XC_Eh-yOfS8",
   "title": "Juneberries: How to Identify, Harvest, and Eat",
   "channel": "Four Season Foraging",
   "why": "How to identify, harvest and prepare juneberries (serviceberry, saskatoon, Amelanchier).",
   "minutes": 7,
   "date": "2021-07-11"
  },
  {
   "id": "y0IeJ7dzUnU",
   "title": "Identifying serviceberry",
   "channel": "Tree Husker",
   "why": "University dendrology clip on the key identifying features of serviceberry.",
   "minutes": 3,
   "date": "2020-07-05"
  },
  {
   "id": "H_62WfMXdJw",
   "title": "Foraging and Cooking with Serviceberries / Saskatoons /Juneberries / Shadbush",
   "channel": "Forager Chef",
   "why": "Alan Bergo on serviceberry background, harvest timing and tools, common pests and diseases, and cooking.",
   "minutes": 10,
   "date": "2026-06-27"
  }
 ],
 "mulberry": [
  {
   "id": "8zSa0MNFis4",
   "title": "Foraging and Cooking Mulberries",
   "channel": "Forager Chef",
   "why": "Mulberry leaf ID (very variable shapes), harvesting tips, and the 'are mulberries poisonous?' question about unripe fruit and leaves.",
   "minutes": 7,
   "date": "2024-06-01"
  },
  {
   "id": "zRXFtlNEjPg",
   "title": "ID That Tree: Invasive White Mulberry",
   "channel": "Purdue Extension - Forestry and Natural Resources",
   "why": "Purdue Extension forester shows how to tell invasive white mulberry from native red mulberry.",
   "minutes": 2,
   "date": "2021-09-10"
  },
  {
   "id": "9JAwC5VMToI",
   "title": "Eat The Weeds: Episode 117: The Mulberry",
   "channel": "EatTheWeeds",
   "why": "Green Deane on identifying mulberry trees and their edible fruit.",
   "minutes": 8,
   "date": "2010-04-23"
  }
 ],
 "elderflower": [
  {
   "id": "xStZJ0Xv_Ro",
   "title": "Poison Water Hemlock vs Elderberry (Side-by-Side Detailed Comparison)",
   "channel": "Legacy Wilderness Academy",
   "why": "Side-by-side comparison of elderflower/elderberry with deadly water hemlock, which grows in the same wet places.",
   "minutes": 8,
   "date": "2024-06-06"
  },
  {
   "id": "TiaTrbVcDB0",
   "title": "Elderberry Flowers: How to pick and use elder flowers",
   "channel": "Haphazard Homestead",
   "why": "Identifying common elder (a multi-stemmed shrub), choosing and picking the flower heads, and preparing them.",
   "minutes": 4,
   "date": "2015-08-06"
  },
  {
   "id": "xUOx7Gmt0bI",
   "title": "All about Red Elder: Flowers, berries, toxicity and uses",
   "channel": "The Backcountry Herbalist",
   "why": "Identifying red elder and using its flowers, plus the toxicity of the different elder species and plant parts.",
   "minutes": 6,
   "date": "2022-12-01"
  }
 ],
 "chanterelle": [
  {
   "id": "9aOwgaIFKMY",
   "title": "Chanterelle & Jack O'Lantern — Mushroom ID",
   "channel": "Learn Your Land",
   "why": "Adam Haritan compares edible chanterelles with toxic jack-o'-lanterns, feature by feature.",
   "minutes": 13,
   "date": "2018-08-02"
  },
  {
   "id": "AA7qR0Rwoj8",
   "title": "Chanterelles And False Chanterelles And How To Spot The Differences",
   "channel": "Found You Foraging",
   "why": "Michigan forager finds chanterelles and shows how to spot false chanterelles.",
   "minutes": 11,
   "date": "2022-07-25"
  },
  {
   "id": "KSLiHkKF8no",
   "title": "Chantrelle 101! - All you need to know.",
   "channel": "Mushroom Wonderland",
   "why": "Mycological society member's in-depth guide to golden and white chanterelles and the look-alikes to be aware of.",
   "minutes": 13,
   "date": "2021-10-08"
  },
  {
   "id": "66B6aUUWNac",
   "title": "How To Identify Chanterelles and Poisonous Look-Alikes.",
   "channel": "Rain & Ridge",
   "why": "Oregon walk-through of golden and white chanterelle identification and their poisonous look-alikes.",
   "minutes": 8,
   "date": "2021-11-19"
  }
 ],
 "raspberry": [
  {
   "id": "kbzOs1ab_T8",
   "title": "How to Identify Wild Raspberry & Wild Blackberry",
   "channel": "Give it a Grow",
   "why": "Tells wild red raspberry, black raspberry and blackberry apart by their canes, thorns and fruit.",
   "minutes": 8,
   "date": "2017-09-28"
  },
  {
   "id": "1P0VWERBLSE",
   "title": "Raspberry vs. Blackberry: How to Tell the Difference Between Wild Raspberry and Blackberry Plants",
   "channel": "Ethan Tapper",
   "why": "Vermont forester shows how to tell wild raspberry plants from blackberry, with notes on their ecology.",
   "minutes": 3,
   "date": "2023-10-17"
  },
  {
   "id": "Ucc_FqklYrI",
   "title": "Black Raspberries: Reasons to Go Wild for Black Raspberries",
   "channel": "EdibleWildFood.com",
   "why": "Ontario guide to wild black raspberry and how it differs from blackberry.",
   "minutes": 7,
   "date": "2021-07-12"
  }
 ],
 "salmonberry": [
  {
   "id": "AZM6rgyDP-M",
   "title": "salmonberry - Rubus spectabilis. Identification and characteristics",
   "channel": "Coastal Plants of BC - UBC Forestry",
   "why": "UBC Faculty of Forestry identification clip for salmonberry (Rubus spectabilis).",
   "minutes": 2,
   "date": "2018-01-17"
  },
  {
   "id": "HfzhG_V7k74",
   "title": "Salmonberry - how to ID them! || Nerdy About Nature Flora Guide",
   "channel": "Nerdy About Nature",
   "why": "Short BC field guide to recognising salmonberry.",
   "minutes": 2,
   "date": "2024-06-10"
  },
  {
   "id": "nG3wfxDtwCg",
   "title": "Salmonberry or Thimbleberry",
   "channel": "Ed Dominguez",
   "why": "Compares salmonberry with thimbleberry, the two Northwest native Rubus most often confused.",
   "minutes": 7,
   "date": "2020-05-06"
  }
 ],
 "blueberry": [
  {
   "id": "ySotCePY3yw",
   "title": "EatTheWeeds: Episode 136: Blueberries and huckleberries",
   "channel": "EatTheWeeds",
   "why": "Green Deane on what to look for to identify blueberries and their huckleberry relatives.",
   "minutes": 15,
   "date": "2012-07-04"
  },
  {
   "id": "LsqEnOFqY3E",
   "title": "Foraging Wild Blueberries",
   "channel": "Forager Chef",
   "why": "Alan Bergo's walkthrough of how he finds and harvests wild blueberries.",
   "minutes": 4,
   "date": "2023-08-05"
  }
 ],
 "huckleberry": [
  {
   "id": "GMNLDklTkWE",
   "title": "Black Huckleberry - Vaccinium membranaceum. Identification and characteristics",
   "channel": "Coastal Plants of BC - UBC Forestry",
   "why": "UBC Faculty of Forestry identification clip for black huckleberry (Vaccinium membranaceum).",
   "minutes": 2,
   "date": "2020-02-17"
  },
  {
   "id": "1et66s82qNU",
   "title": "Plant ID: red huckleberry (Vaccinium parvifolium)",
   "channel": "Interviews With Plants",
   "why": "Field identification of red huckleberry in a BC provincial park.",
   "minutes": 3,
   "date": "2021-03-19"
  },
  {
   "id": "OGV4WwWzUCY",
   "title": "How to Identify Huckleberry in Winter | Distinguishing from Toxic Lookalikes!",
   "channel": "Feral Foraging",
   "why": "Recognising huckleberry/Vaccinium in winter and telling it from toxic look-alikes growing tangled in the same thickets.",
   "minutes": 3,
   "date": "2020-12-09"
  },
  {
   "id": "btgNUHycaKU",
   "title": "The Harvest: Mountain Huckleberry",
   "channel": "Tulalip TV",
   "why": "Tulalip tribal members and a Native environmental scientist harvest mountain huckleberry in the Cascades.",
   "minutes": 4,
   "date": "2021-09-03"
  }
 ],
 "thimbleberry": [
  {
   "id": "ALW_fpe2FqI",
   "title": "thimbleberry - Rubus parviflorus. Identification and characteristics",
   "channel": "Coastal Plants of BC - UBC Forestry",
   "why": "UBC Faculty of Forestry identification clip for thimbleberry (Rubus parviflorus).",
   "minutes": 2,
   "date": "2018-01-17"
  },
  {
   "id": "YfNiERICvWo",
   "title": "Thimbleberry - How to Identify Them!  || Nerdy About Nature Flora Guide",
   "channel": "Nerdy About Nature",
   "why": "Short BC guide to thimbleberry's big fuzzy maple-shaped leaves and shallow raspberry-like fruit.",
   "minutes": 3,
   "date": "2020-09-09"
  },
  {
   "id": "22zt5fyyG8Q",
   "title": "What are THIMBLEBERRIES? (Rubus parviflorus) - Weird Fruit Explorer Ep. 340",
   "channel": "Weird Explorer",
   "why": "Thimbleberry found in Vermont: the plant, the fruit and what it tastes like.",
   "minutes": 6,
   "date": "2019-02-03"
  }
 ],
 "prickly-pear": [
  {
   "id": "lluXyvzB7l4",
   "title": "Prickly Pear Cactus and Preparing Nopales",
   "channel": "New Mexico Historic Sites",
   "why": "New Mexico Historic Sites educator introduces prickly pear and shows how to prepare the pads (nopales) as a vegetable.",
   "minutes": 9,
   "date": "2020-06-22"
  },
  {
   "id": "jma9dmiSg3g",
   "title": "EatTheWeeds: Episode 16: Cactus, Opuntia",
   "channel": "EatTheWeeds",
   "why": "Green Deane on recognising edible Opuntia cactus and using its pads and fruit.",
   "minutes": 8,
   "date": "2008-03-22"
  },
  {
   "id": "TT01xi1gBCU",
   "title": "Foraging Prickly Pear Cactus Fruits (Tunas)! Desert Survival Food",
   "channel": "Junkyard Fox Outdoor Adventures",
   "why": "Harvesting and processing ripe prickly pear fruit (tunas) in the desert after the summer rains.",
   "minutes": 12,
   "date": "2025-08-28"
  }
 ],
 "blackberry": [
  {
   "id": "I6xXGevM9HM",
   "title": "EatTheWeeds: Episode 87: Blackberries, Dewberries, Rubus",
   "channel": "EatTheWeeds",
   "why": "Green Deane on recognising blackberries and dewberries (Rubus).",
   "minutes": 10,
   "date": "2009-06-21"
  },
  {
   "id": "bCFiqJFolcE",
   "title": "Identifying and Foraging Bramble Berries 🤤 🥧",
   "channel": "Insteading",
   "why": "Finding and identifying bramble berries, look-alikes to watch for, and how to harvest.",
   "minutes": 11,
   "date": "2022-09-10"
  },
  {
   "id": "6q0yGC-oGCI",
   "title": "Blackberry Identification",
   "channel": "ISCMV",
   "why": "Metro Vancouver invasive-species council shows how to tell three blackberry species apart.",
   "minutes": 5,
   "date": "2020-06-10"
  }
 ],
 "chicken-of-the-woods": [
  {
   "id": "OiXX-SG0uBk",
   "title": "7 Species of Chicken of the Woods & 12 Look-a-Likes (U.S. Guide)",
   "channel": "Mushroom Journeys",
   "why": "U.S. guide to seven Laetiporus (chicken of the woods) species and twelve look-alikes.",
   "minutes": 19,
   "date": "2026-09-19"
  },
  {
   "id": "ZTaFYdfuaLE",
   "title": "It's Not Chicken Of The Woods... But What Is It?",
   "channel": "Learn Your Land",
   "why": "Adam Haritan examines a rare mushroom that can be mistaken for chicken of the woods.",
   "minutes": 17,
   "date": "2019-08-26"
  },
  {
   "id": "QSt9t9dphos",
   "title": "Chicken Of The Woods On Conifer — Toxic?",
   "channel": "Learn Your Land",
   "why": "Whether chicken of the woods growing on conifers is safe to eat, and why the host tree matters.",
   "minutes": 5,
   "date": "2023-05-18"
  }
 ],
 "hen-of-the-woods": [
  {
   "id": "joCKGjCi5PA",
   "title": "Foraging Maitake Mushrooms",
   "channel": "Learn Your Land",
   "why": "Adam Haritan forages maitake (hen of the woods) and shows what to look for.",
   "minutes": 9,
   "date": "2020-10-05"
  },
  {
   "id": "VfhhOO7_e_Q",
   "title": "No — This Mushroom Is NOT Hen Of The Woods",
   "channel": "Learn Your Land",
   "why": "Key differences between hen of the woods and the black-staining polypore (Meripilus sumstinei), which many people mistake for it.",
   "minutes": 7,
   "date": "2017-07-06"
  },
  {
   "id": "ExP-Zp-SlvU",
   "title": "Hen of the woods lookalikes: Edible black-staining polypore & Berkeley’s polypore",
   "channel": "Anna McHugh",
   "why": "Hen of the woods vs its two look-alikes, black-staining polypore and Berkeley's polypore.",
   "minutes": 7,
   "date": "2023-10-04"
  }
 ],
 "giant-puffball": [
  {
   "id": "BjWh0ezthts",
   "title": "Giant Puffball Mushroom Identification",
   "channel": "EdibleWildFood.com",
   "why": "Ontario guide to identifying giant puffball: appearance, habitat and season.",
   "minutes": 3,
   "date": "2017-09-27"
  },
  {
   "id": "Gvt-a43CIJQ",
   "title": "Amanita Eggs vs. Puffballs",
   "channel": "Mountain Misery",
   "why": "Shows a young Amanita 'egg' beside a puffball and what to look for to tell them apart, the reason every puffball must be sliced in half before eating.",
   "minutes": 1,
   "date": "2019-04-25"
  },
  {
   "id": "lzF_0olsGFM",
   "title": "Giant Puffballs! How to Tell if You Should Take em Home for Grillin, or Leave em Chillin.",
   "channel": "Renegade Mushrooms",
   "why": "How to tell whether a giant puffball is still good to eat or too far gone.",
   "minutes": 5,
   "date": "2021-10-17"
  },
  {
   "id": "UQQ5qkvMn3s",
   "title": "Lots Of Giant Puffball Mushrooms",
   "channel": "Learn Your Land",
   "why": "Adam Haritan finds a flush of giant puffballs in Pennsylvania.",
   "minutes": 5,
   "date": "2017-10-26"
  }
 ],
 "king-bolete": [
  {
   "id": "OdCRjOJcXuk",
   "title": "Identifying the King Bolete",
   "channel": "N8UR NURD",
   "why": "Identifying the king bolete (porcini) and how it differs from its many bolete relatives.",
   "minutes": 13,
   "date": "2017-09-29"
  },
  {
   "id": "G88MME7CBU4",
   "title": "Bolete & Suillus Mushroom Identification with Adam Haritan",
   "channel": "Learn Your Land",
   "why": "Adam Haritan on basic bolete identification, plus two edible Suillus species.",
   "minutes": 10,
   "date": "2016-07-25"
  },
  {
   "id": "Ur7Wll7NjIE",
   "title": "Porcini Mushrooms- Boletus edulis Forage and Cook",
   "channel": "Mushroom Wonderland",
   "why": "Kitsap Mycological Society's Aaron Hilliard on Boletus edulis: where and how it grows, identification and cleaning.",
   "minutes": 12,
   "date": "2023-10-07"
  },
  {
   "id": "bv0KnXjV_po",
   "title": "Bitter Bolete ID Features",
   "channel": "MiWilderness",
   "why": "Identifying features of the bitter bolete, the king bolete's most common look-alike.",
   "minutes": 3,
   "date": "2010-08-10"
  }
 ],
 "lobster-mushroom": [
  {
   "id": "PNdK39DrlRk",
   "title": "How to find lobster mushrooms, Hypomyces lactifluorum",
   "channel": "Anna McHugh",
   "why": "Identification features of the lobster mushroom (a mold parasitising Russula and milk caps) and tips for finding it.",
   "minutes": 6,
   "date": "2021-08-22"
  },
  {
   "id": "fIZxQ98TFlw",
   "title": "Lobster Mushroom Identification & Ecology (Hypomyces lactifluorum)",
   "channel": "stevie_funfur",
   "why": "Ontario outdoor educator on lobster mushroom ID, habitat, tree associations, potential look-alikes and harvesting practices.",
   "minutes": 18,
   "date": "2026-09-10"
  },
  {
   "id": "dTnR3opIyB4",
   "title": "Lobster Mushroom Forage, ID, and Cook!",
   "channel": "Mushroom Wonderland",
   "why": "Where and how to find and identify lobster mushrooms in Washington forests, then cooking them.",
   "minutes": 18,
   "date": "2025-07-18"
  }
 ],
 "matsutake": [
  {
   "id": "bhyS4kk9jsY",
   "title": "Find and Identify the Matsutake Mushroom - Pine Mushroom -  S2E8",
   "channel": "Yellow Elanor",
   "why": "Finding and identifying the western white matsutake, including its toxic look-alike species.",
   "minutes": 26,
   "date": "2019-11-12"
  },
  {
   "id": "_o3993UDbZM",
   "title": "How to find Matsutake (Pine) mushrooms in BC Forests?",
   "channel": "Swallow Tail Culinary Adventures",
   "why": "BC chef-forager on finding pine mushrooms and the danger of the poisonous look-alike Amanita smithiana.",
   "minutes": 2,
   "date": "2013-10-27"
  },
  {
   "id": "-Jm4WcsnpqM",
   "title": "Matsutake Identification",
   "channel": "Mushroom Wonderland",
   "why": "Close look at the identifying features of the Pacific Northwest matsutake (Tricholoma murrillianum).",
   "minutes": 12,
   "date": "2021-11-17"
  }
 ],
 "oyster-mushroom": [
  {
   "id": "-ZGJeUILY7g",
   "title": "Oyster Mushroom (Pleurotus ostreatus) Identification with Adam Haritan",
   "channel": "Learn Your Land",
   "why": "Adam Haritan's tips for accurately identifying oyster mushrooms (Pleurotus ostreatus).",
   "minutes": 5,
   "date": "2015-12-22"
  },
  {
   "id": "AeuXhopm2oc",
   "title": "How to ID oyster mushrooms, Pleurotus ostreatus",
   "channel": "Anna McHugh",
   "why": "Identification features, habitat and hunting tips for oyster mushrooms.",
   "minutes": 8,
   "date": "2020-11-11"
  },
  {
   "id": "_yD89oNOgxw",
   "title": "Angel Wing Mushroom — Deadly Or Not?",
   "channel": "Learn Your Land",
   "why": "The angel wing mushroom, a look-alike often confused with oysters, and the controversy over its toxicity.",
   "minutes": 12,
   "date": "2018-10-30"
  }
 ],
 "lions-mane": [
  {
   "id": "LOuT_nxqfW0",
   "title": "Hericium Mushroom Identification, Foraging & Look-Alikes  - Lion's Mane and other Hericiums",
   "channel": "stevie_funfur",
   "why": "Ontario outdoor educator on identifying lion's mane, bear's head and comb tooth Hericium, their habitat and potential look-alikes.",
   "minutes": 25,
   "date": "2026-09-17"
  },
  {
   "id": "M_BtBur-AuM",
   "title": "Identifying Lion's Mane & Asian Beauty Mushrooms",
   "channel": "DNRT - Dartmouth Natural Resources Trust",
   "why": "Massachusetts land-trust steward teaches how to identify lion's mane and the toothed look-alike Asian beauty mushroom.",
   "minutes": 20,
   "date": "2021-01-12"
  },
  {
   "id": "4GbMzgCCkBc",
   "title": "Bear's Head - Hericium abietis (Sister species to Lion's Mane)",
   "channel": "Yellow Elanor",
   "why": "Bear's head tooth, the conifer-growing sister species of lion's mane, and how to recognise it.",
   "minutes": 15,
   "date": "2015-05-08"
  }
 ],
 "hazelnut": [
  {
   "id": "-LX5bLoXqkU",
   "title": "Beaked hazelnut: habitat, ID, harvesting and processing this delicious nut",
   "channel": "The Backcountry Herbalist",
   "why": "Beaked hazelnut habitat, identification, harvesting and processing.",
   "minutes": 8,
   "date": "2024-09-11"
  },
  {
   "id": "PZJUPH8kGi0",
   "title": "Harvesting Edible Nuts - Ethical Foraging of Beaked Hazel - Wildcrafting - Wild Muskoka Botanicals",
   "channel": "Wild Muskoka ~ Wild Foraged Food & Drink Recipes",
   "why": "Ontario (Muskoka) guide to harvesting beaked hazelnuts ethically.",
   "minutes": 4,
   "date": "2017-09-02"
  },
  {
   "id": "0rCRIVVBQi0",
   "title": "American Hazelnut Trees",
   "channel": "OhioDNR",
   "why": "Ohio state park naturalist gives a close look at American hazelnut and its distinctive husked nuts.",
   "minutes": 4,
   "date": "2020-11-18"
  }
 ],
 "black-walnut": [
  {
   "id": "Fz-YpXGP9D4",
   "title": "ID That Tree: Black Walnut",
   "channel": "Purdue Extension - Forestry and Natural Resources",
   "why": "Purdue Extension forester on identifying black walnut: paired leaflets, ridged bark and round nuts.",
   "minutes": 2,
   "date": "2020-09-25"
  },
  {
   "id": "D8j6qh2g8Ys",
   "title": "How to Identify and Harvest Black Walnuts in the Wild: Forage and Grow",
   "channel": "Fox Run Environmental Education Center",
   "why": "Environmental education centre on identifying black walnut trees and when and how to harvest the nuts.",
   "minutes": 7,
   "date": "2023-11-08"
  },
  {
   "id": "Fi3UQnel_Fk",
   "title": "How to Harvest and Process Black Walnut (don’t wash them!)",
   "channel": "The Chaos Gardener - Paint the World with Plants",
   "why": "Harvesting and hulling black walnuts, with the emphasis on gloves and sleeves because the hull juice stains skin.",
   "minutes": 5,
   "date": "2022-10-04"
  },
  {
   "id": "U3WcVQ_4fCU",
   "title": "Processing Black Walnuts",
   "channel": "Nature-based Enterprises",
   "why": "Agroforestry video (USDA National Agroforestry Center support) on removing black walnut hulls and curing the nuts.",
   "minutes": 12,
   "date": "2023-08-19"
  }
 ],
 "pawpaw": [
  {
   "id": "W428qNDacag",
   "title": "How To Find Pawpaws In The Wild",
   "channel": "Learn Your Land",
   "why": "Adam Haritan on how to find pawpaw patches in the wild.",
   "minutes": 10,
   "date": "2022-06-30"
  },
  {
   "id": "LIU37TwLWzo",
   "title": "Identifying pawpaw",
   "channel": "Tree Husker",
   "why": "University dendrology clip on the key identifying features of pawpaw.",
   "minutes": 4,
   "date": "2020-06-23"
  },
  {
   "id": "5_qS4YGA3CM",
   "title": "EatTheWeeds: Episode 86: Papaws, Pawpaws",
   "channel": "EatTheWeeds",
   "why": "Green Deane on the pawpaw, a native fruit that can be hard to find in the wild.",
   "minutes": 9,
   "date": "2009-06-12"
  },
  {
   "id": "6oKEMxojLTo",
   "title": "How to clean a paw paw",
   "channel": "Forager Chef",
   "why": "Alan Bergo shows how to clean and prepare a pawpaw for eating.",
   "minutes": 5,
   "date": "2013-09-25"
  }
 ],
 "persimmon": [
  {
   "id": "sSNg-b-v7Ek",
   "title": "Everything You Need to Know About American Persimmon!",
   "channel": "Backyard Ecology",
   "why": "Backyard Ecology overview of American persimmon: recognizing the tree and its fruit, where it grows and its value to wildlife.",
   "minutes": 6,
   "date": "2023-01-17"
  },
  {
   "id": "PNJUKc7G2N4",
   "title": "EatTheWeeds: Episode 151: Persimmon Revisited",
   "channel": "EatTheWeeds",
   "why": "Green Deane revisits American persimmon and traces how wrong nutrition claims spread through foraging books, which shows why sources need checking.",
   "minutes": 22,
   "date": "2021-10-20"
  },
  {
   "id": "3Or_ij420ps",
   "title": "Identifying persimmon",
   "channel": "Tree Husker",
   "why": "University of Nebraska dendrology clip on identifying persimmon (Diospyros virginiana) by bark, leaves and fruit.",
   "minutes": 3,
   "date": "2020-08-26"
  }
 ],
 "elderberry": [
  {
   "id": "v3N3iL_OI6E",
   "title": "Blooming in Bloomington: Elderberry vs Pokeberry",
   "channel": "Bloomington Parks and Recreation",
   "why": "City parks naturalist compares elderberry with pokeweed, whose look-alike dark berries are toxic, and explains how to tell the two plants apart.",
   "minutes": 4,
   "date": "2020-09-24"
  },
  {
   "id": "xStZJ0Xv_Ro",
   "title": "Poison Water Hemlock vs Elderberry (Side-by-Side Detailed Comparison)",
   "channel": "Legacy Wilderness Academy",
   "why": "Side-by-side comparison of elder and deadly water hemlock, which also has white umbrella-shaped flower clusters, focusing on the key ID features.",
   "minutes": 8,
   "date": "2024-06-06"
  },
  {
   "id": "MiHZqt7oUYw",
   "title": "Tree ID: American elderberry",
   "channel": "The Ohio State University South Centers",
   "why": "Ohio State Extension natural-resources specialist on the features used to identify American elderberry.",
   "minutes": 4,
   "date": "2022-08-11"
  },
  {
   "id": "lypgoX3K5DA",
   "title": "How To Identify Common Elderberry, Sambucus canadensis",
   "channel": "Trillium: Wild Edibles",
   "why": "Identification of common elderberry: opposite compound leaves with 5–11 finely toothed leaflets, a hollow pithy stem, flower clusters and fruit.",
   "minutes": 4,
   "date": "2022-07-13"
  }
 ],
 "rose-hips": [
  {
   "id": "uWoCGeQ_1CM",
   "title": "Rosehips: How to Identify, Harvest, and Eat",
   "channel": "Four Season Foraging",
   "why": "What rose hips are, how to identify wild roses (Rosa spp.) and how to harvest and eat the hips. It covers wild species only.",
   "minutes": 13,
   "date": "2020-10-07"
  },
  {
   "id": "iDD1xJTv0-M",
   "title": "Rose Hips -- How to identify, harvest, and eat",
   "channel": "Flannel Acres",
   "why": "Short guide to identifying, harvesting and preparing wild rose hips.",
   "minutes": 4,
   "date": "2013-12-01"
  },
  {
   "id": "YTJvr30FV3Q",
   "title": "Cleaning rose hips for cooking or jam",
   "channel": "Forager Chef",
   "why": "Forager Chef walks through cleaning Rosa rugosa hips (removing the seedy, hairy core) before cooking or making jam.",
   "minutes": 2,
   "date": "2017-08-29"
  },
  {
   "id": "Z3Y3zyR7MtI",
   "title": "Wild Harvest Foraging Tip | Episode 24 | Alberta Rosehips",
   "channel": "Survivorman - Les Stroud",
   "why": "Les Stroud's short foraging tip on wild rose hips in Alberta.",
   "minutes": 3,
   "date": "2021-12-10"
  }
 ],
 "staghorn-sumac": [
  {
   "id": "4SsAaoMYoCA",
   "title": "Edible vs. Poison Sumac — Learn The Difference",
   "channel": "Learn Your Land",
   "why": "Adam Haritan on telling edible red-fruited sumacs from poison sumac, a wetland shrub with pale berries.",
   "minutes": 7,
   "date": "2023-07-28"
  },
  {
   "id": "vBXPneJBtUM",
   "title": "Sumac - Poison or Not? | Outdoor Elements",
   "channel": "PBS Michiana - WNIT",
   "why": "PBS Michiana short on staghorn vs poison sumac, with ID tips and the reminder that poison sumac grows only in wet places.",
   "minutes": 4,
   "date": "2022-07-20"
  },
  {
   "id": "UfbSbN2sBgQ",
   "title": "Tree of Heaven vs Sumac - Easy Identification!",
   "channel": "Backyard Ecology",
   "why": "How to tell native sumacs from invasive tree of heaven, a common lookalike.",
   "minutes": 4,
   "date": "2023-11-07"
  },
  {
   "id": "IXdMjI3GHvI",
   "title": "Foraging for Sumac with Chef Shawn Adler",
   "channel": "CBC Life",
   "why": "Canadian chef shows how to identify and harvest staghorn sumac and make a cold-steeped sun tea.",
   "minutes": 3,
   "date": "2020-07-24"
  }
 ],
 "wild-grape": [
  {
   "id": "BfkeyxuPBCk",
   "title": "Identifying Wild Grapes",
   "channel": "EdibleWildFood.com",
   "why": "Ontario forager compares two edible wild grape vines with two lookalike vines whose fruit should not be eaten.",
   "minutes": 10,
   "date": "2021-08-11"
  },
  {
   "id": "bL8Zfr2hAHo",
   "title": "Toxic Look Alikes - Comparing Wild Grape with Canadian Moonseed",
   "channel": "Wolf in the Wilds Survival",
   "why": "Side-by-side of wild grape and poisonous Canada moonseed, whose fruit looks very similar.",
   "minutes": 3,
   "date": "2018-07-12"
  },
  {
   "id": "3Mc0tk3cDZA",
   "title": "EatTheWeeds: Episode 32: Wild Grapes",
   "channel": "EatTheWeeds",
   "why": "Green Deane on identifying native wild grapes and grapes that have escaped from cultivation.",
   "minutes": 10,
   "date": "2008-08-01"
  }
 ],
 "highbush-cranberry": [
  {
   "id": "iEDbFPoEqcE",
   "title": "How to Make Highbush Cranberry Juice and Coulis",
   "channel": "Forager Chef",
   "why": "Explains how native highbush cranberry (Viburnum trilobum) differs from the bitter European guelder rose (V. opulus), then processes the fruit into juice.",
   "minutes": 7,
   "date": "2025-09-20"
  },
  {
   "id": "raI_39of1q0",
   "title": "High & Low Bush Cranberry Identification #cranberry #foraging",
   "channel": "UNDERSTORY",
   "why": "Naturalist's identification of highbush and lowbush cranberry, two unrelated shrubs with similar-looking berries.",
   "minutes": 8,
   "date": "2019-09-15"
  },
  {
   "id": "duonUkMu1PQ",
   "title": "High Bush Cranberry",
   "channel": "Wolf in the Wilds Survival",
   "why": "Field identification of wild highbush cranberry and how to find it.",
   "minutes": 9,
   "date": "2020-09-20"
  }
 ],
 "cranberry": [
  {
   "id": "VYg_TVWl6pE",
   "title": "Harvesting Wild Cranberries with Adam Haritan",
   "channel": "Adam Haritan",
   "why": "Adam Haritan harvests wild cranberry (Vaccinium macrocarpon) in its bog habitat and shares harvesting tips.",
   "minutes": 5,
   "date": "2014-11-21"
  },
  {
   "id": "tiHkbBSzUUw",
   "title": "How To Identify Small Cranberry For Thanksgiving",
   "channel": "Larkins Wild Edibles",
   "why": "How to identify and harvest small cranberry (Vaccinium oxycoccos) in a bog.",
   "minutes": 6,
   "date": "2019-11-23"
  },
  {
   "id": "QFC-rYhiGFc",
   "title": "bog-rosemary (Andromeda polifolia) and bog-laurel (Kalmia microphylla ssp. occidentalis)",
   "channel": "British Columbia Plant and Tree Identification",
   "why": "BC plant-ID clip on bog-rosemary and bog-laurel. Both are toxic heath shrubs that share bogs with cranberries, so learn them before picking.",
   "minutes": 3,
   "date": "2022-08-04"
  }
 ],
 "chokecherry": [
  {
   "id": "P2_H07SiuBc",
   "title": "ID That Tree: Chokecherry",
   "channel": "Purdue Extension - Forestry and Natural Resources",
   "why": "Purdue Extension forester on identifying chokecherry: alternate, finely toothed leaves, short leaf stalks and gray stems with prominent lenticels.",
   "minutes": 2,
   "date": "2023-07-28"
  },
  {
   "id": "GjVFHHuo7T4",
   "title": "Chokecherry - Wild Edible Berry Identification and Description",
   "channel": "Okanagan Gardener and Forager",
   "why": "Chokecherry identification across Canada. It stresses that only the fruit flesh is edible and that other parts, including the pits, can be poisonous.",
   "minutes": 5,
   "date": "2020-08-17"
  },
  {
   "id": "AdjuICul_t0",
   "title": "Foraging for Wild Chokecherries with Chef Shawn Adler",
   "channel": "CBC Life",
   "why": "Canadian chef demonstrates how to harvest wild chokecherries safely and sustainably.",
   "minutes": 4,
   "date": "2020-09-10"
  },
  {
   "id": "NnLPpjEKP-k",
   "title": "Chokecherries - Identification, How to Preserve,  and Recipe Ideas",
   "channel": "EdibleWildFood.com",
   "why": "Ontario forager's detailed chokecherry identification (distinguishing features and habitat) and how to preserve the fruit.",
   "minutes": 21,
   "date": "2023-08-08"
  }
 ],
 "wild-apple": [
  {
   "id": "3aWkpfRtUcM",
   "title": "Eat The Weeds: Episode 96: Wild Apples",
   "channel": "EatTheWeeds",
   "why": "Green Deane on wild apples and crabapples, an often-overlooked common food: how to recognize them and use the fruit.",
   "minutes": 7,
   "date": "2009-07-18"
  },
  {
   "id": "lxuoJztIKcQ",
   "title": "Foraging for Crabapples with Chef Shawn Adler",
   "channel": "CBC Life",
   "why": "Canadian chef explains why wild apples make a good first forage and how to source them sustainably.",
   "minutes": 4,
   "date": "2019-10-07"
  },
  {
   "id": "hIqZzV05PO8",
   "title": "WILD HARVEST | CRAB APPLES | LES STROUD | PAUL ROGALSKI",
   "channel": "Survivorman - Les Stroud",
   "why": "Les Stroud finds old crab apple trees at an abandoned homestead, and a chef shows how to harvest and use the fruit.",
   "minutes": 26,
   "date": "2024-12-20"
  }
 ],
 "acorn": [
  {
   "id": "-qO1sCYj1B0",
   "title": "How to harvest acorns for FOOD",
   "channel": "Feral Foraging",
   "why": "Part 1 of an acorn series: how to harvest acorns and sort out the bad ones before processing, because acorns can't be eaten straight off the ground.",
   "minutes": 6,
   "date": "2021-01-03"
  },
  {
   "id": "QtLtRqWAe7o",
   "title": "How to make FLOUR from ACORNS",
   "channel": "Feral Foraging",
   "why": "Explains why acorns must be leached of bitter tannins, then demonstrates leaching (including a hot method) and grinding flour.",
   "minutes": 6,
   "date": "2021-11-03"
  },
  {
   "id": "28yYMb_RwBo",
   "title": "EatTheWeeds: Episode 50: Acorns",
   "channel": "EatTheWeeds",
   "why": "Green Deane on acorns as a worldwide wild food and the processing they need before they are edible.",
   "minutes": 7,
   "date": "2008-11-03"
  },
  {
   "id": "LHF71Y9kd9M",
   "title": "HOW TO EAT ACORNS - A COMPILATION 🐿",
   "channel": "BlackForager",
   "why": "Alexis Nikole Nelson shows how to cold-process (leach) acorns and cook with them, and notes they are still an important Indigenous food.",
   "minutes": 3,
   "date": "2021-01-13"
  }
 ],
 "pecan": [
  {
   "id": "OJ_q49Lk6tM",
   "title": "ID That Tree: Pecan",
   "channel": "Purdue Extension - Forestry and Natural Resources",
   "why": "Purdue Extension forester on identifying native pecan, one of the hickories, by more than just its nuts.",
   "minutes": 2,
   "date": "2020-08-28"
  },
  {
   "id": "c58fnE2dyA4",
   "title": "Identifying pecan",
   "channel": "Tree Husker",
   "why": "University of Nebraska dendrology clip on identifying pecan (Carya illinoinensis) and telling it from similar trees.",
   "minutes": 3,
   "date": "2020-07-16"
  },
  {
   "id": "lvXUwQHMNAs",
   "title": "Harvesting and Storing Pecans",
   "channel": "OklahomaGardening",
   "why": "Oklahoma research-station staff demonstrate tools and tips for harvesting pecans and storing them properly.",
   "minutes": 9,
   "date": "2014-11-10"
  }
 ],
 "hickory-nut": [
  {
   "id": "vfyYiEbT8OQ",
   "title": "Tree ID Clip: shagbark hickory",
   "channel": "The Ohio State University South Centers",
   "why": "Ohio State Extension specialist on the features used to identify shagbark hickory.",
   "minutes": 5,
   "date": "2022-08-30"
  },
  {
   "id": "b5-MxtbSWS4",
   "title": "How To Identify 4 Common Hickories",
   "channel": "Plant Daddy",
   "why": "How to tell four common hickory species apart, so you are sure you have shagbark rather than a bitter-nutted hickory.",
   "minutes": 8,
   "date": "2023-02-18"
  },
  {
   "id": "3yJvOsgt14c",
   "title": "How to Harvest and Process Shagbark Hickory Nuts",
   "channel": "Forager Chef",
   "why": "Forager Chef's quick run-through of harvesting and processing shagbark hickory nuts.",
   "minutes": 4,
   "date": "2023-09-15"
  },
  {
   "id": "Xk3jgq5XZ6Q",
   "title": "EatTheWeeds: Episode 54: Hickories",
   "channel": "EatTheWeeds",
   "why": "Green Deane on the hickory genus, including pecans and walnuts, and using their nuts.",
   "minutes": 10,
   "date": "2008-11-21"
  }
 ],
 "hawthorn": [
  {
   "id": "nkQo_VfPa2M",
   "title": "Hawthorn: The Edible Hedgerow",
   "channel": "Four Season Foraging",
   "why": "Detailed guide to identifying hawthorn (Crataegus spp.), its edible qualities and common ways to prepare the fruit.",
   "minutes": 20,
   "date": "2019-12-04"
  },
  {
   "id": "ahQc24ILacY",
   "title": "ID That Tree Spring Bloom Edition: Hawthorn",
   "channel": "Purdue Extension - Forestry and Natural Resources",
   "why": "Purdue Extension forester introduces native hawthorns and explains why the species are hard to tell apart.",
   "minutes": 3,
   "date": "2021-06-25"
  },
  {
   "id": "29T693tLoD0",
   "title": "Crataegus spp., Rosaceae (hawthorn)",
   "channel": "MHCC Dendrology",
   "why": "Mt. Hood Community College dendrology lesson on recognizing the hawthorn genus.",
   "minutes": 3,
   "date": "2020-09-24"
  }
 ],
 "wintergreen": [
  {
   "id": "wTnDZNmEA_A",
   "title": "Teaberry or American  Wintergreen (inspiration for Teaberry gum)",
   "channel": "Nature at Your Door Frank Taylor",
   "why": "Naturalist identifies teaberry by its habitat, leathery leaves and red berries, and warns that concentrated wintergreen oil is toxic and unsafe for anyone allergic to aspirin.",
   "minutes": 7,
   "date": "2022-04-05"
  },
  {
   "id": "uqF-yANrRZ4",
   "title": "How to find, harvest and prepare wintergreen",
   "channel": "Ho-Chunk Lifeskills",
   "why": "Ho-Chunk Lifeskills shows how to find, harvest and prepare wintergreen.",
   "minutes": 11,
   "date": "2021-06-29"
  },
  {
   "id": "wELYhVzGo40",
   "title": "Wintergreen Plant Identification",
   "channel": "MiWilderness",
   "why": "Short close-up identification of wintergreen (teaberry).",
   "minutes": 2,
   "date": "2020-05-15"
  }
 ],
 "salal": [
  {
   "id": "Y8mRUAYgi3U",
   "title": "salal - Gaultheria shallon. Identification and characteristics",
   "channel": "Coastal Plants of BC - UBC Forestry",
   "why": "UBC Forestry clip on salal's identifying characteristics as a coastal BC indicator plant.",
   "minutes": 2,
   "date": "2018-01-17"
  },
  {
   "id": "gDTXZFQPRAI",
   "title": "Harvesting Salal Berries",
   "channel": "Ken Kortge",
   "why": "Botanist Madrona Murphy of the Kwiaht conservation lab shows how to harvest ripe salal berries.",
   "minutes": 5,
   "date": "2020-09-23"
  },
  {
   "id": "WafZwAAlYkk",
   "title": "Moon of the Salal Berry",
   "channel": "Setting Sun Circle",
   "why": "From a 13 Moons video series made with the Swinomish people: salal berries in their season and in Coast Salish tradition.",
   "minutes": 8,
   "date": "2023-06-08"
  }
 ],
 "sea-grape": [
  {
   "id": "MUvt0E2ufPc",
   "title": "EatTheWeeds: Episode 156: Sea Grapes",
   "channel": "EatTheWeeds",
   "why": "Green Deane on sea grape (Coccoloba uvifera), a tropical fruit that has naturalized along warm shores.",
   "minutes": 10,
   "date": "2021-11-14"
  },
  {
   "id": "_TGqLikONYA",
   "title": "Facts About Seagrapes",
   "channel": "Earth Works Jax",
   "why": "Explains that sea grapes are protected on Florida beach dunes because they hold back erosion, and that the berries are edible.",
   "minutes": 3,
   "date": "2021-04-10"
  },
  {
   "id": "X87aZBPx8r0",
   "title": "Florida East Coast Dune Edibles - Part 1 - Sea Grapes Are Everywhere!",
   "channel": "EatYourBackyard",
   "why": "Florida dune-edibles walk showing wild sea grape plants and their fruit along the coast.",
   "minutes": 4,
   "date": "2016-11-24"
  }
 ],
 "beach-plum": [
  {
   "id": "y_Kz9KOVfbg",
   "title": "Beach Plum (Prunus maritima) Harvesting",
   "channel": "Steve Brill",
   "why": "'Wildman' Steve Brill shows how to recognize and harvest beach plums near the shore, and how to cook them and strain out the pits.",
   "minutes": 2,
   "date": "2025-09-26"
  },
  {
   "id": "yAqjZJYIVKs",
   "title": "Beach Plum: This Plant Defends the Shore",
   "channel": "Rooted Plant Videos",
   "why": "A botanist shows how beach plum holds barrier-island dunes together, a reason to harvest without trampling them.",
   "minutes": 5,
   "date": "2024-11-15"
  },
  {
   "id": "7QwU8B2tdhw",
   "title": "Beach Plum Foraging",
   "channel": "Maine Primitive",
   "why": "A Maine herbalism school forages late-summer beach plums on the coast, with an emphasis on sustainable harvest.",
   "minutes": 3,
   "date": "2016-08-02"
  }
 ],
 "juniper-berries": [
  {
   "id": "V8INWpisYQE",
   "title": "EatTheWeeds: Episode 138: Junipers",
   "channel": "EatTheWeeds",
   "why": "Green Deane explains that not all junipers can be used and how to identify the ones that are used as a spice.",
   "minutes": 15,
   "date": "2013-01-16"
  },
  {
   "id": "hpSfTZGnN-E",
   "title": "Common Juniper Berry Uses",
   "channel": "EdibleWildFood.com",
   "why": "Ontario forager on identifying common juniper (Juniperus communis) and using only its fully ripe berries.",
   "minutes": 3,
   "date": "2026-09-25"
  },
  {
   "id": "leqLevT8yms",
   "title": "How to Identify Juniper | How to Forage Juniper | Foraging For Juniper | Juniper Berries | Foraging",
   "channel": "Herbal Meadows Botanicals",
   "why": "Winter walk in Michigan showing how to identify juniper shrubs and their berries.",
   "minutes": 4,
   "date": "2021-02-06"
  }
 ],
 "chaga": [
  {
   "id": "OufpYbiSWWk",
   "title": "Chaga Picking & Identification with Mark Eshkawkogan",
   "channel": "FirstTeltv5",
   "why": "Elder Mark Eshkawkogan of Wiikwemkoong Unceded Territory shows how to identify and pick chaga.",
   "minutes": 10,
   "date": "2020-05-27"
  },
  {
   "id": "2heNYVDpqoA",
   "title": "How to Make Chaga Tea: A Skeptics View",
   "channel": "Forager Chef",
   "why": "Forager Chef's deliberately skeptical look at chaga: how he harvests it, why its health claims are unproven, and its high oxalate content.",
   "minutes": 9,
   "date": "2024-02-03"
  },
  {
   "id": "rYYhvljziJw",
   "title": "Harvest Chaga Mushrooms Responsibly: How to Use Chaga Mushrooms, Ecology & Sustainable Foraging",
   "channel": "Wild Muskoka ~ Wild Foraged Food & Drink Recipes",
   "why": "Ontario foragers on harvesting chaga sustainably and the fungus's ecological role.",
   "minutes": 4,
   "date": "2023-06-07"
  }
 ],
 "miners-lettuce": [
  {
   "id": "Jl4XQycjhms",
   "title": "Identifying Miners Lettuce / Spring Beauty, Claytonia perfoliata",
   "channel": "Wild Food in the UK Ltd",
   "why": "Foraging instructor on identifying miner's lettuce (Claytonia perfoliata), an easy salad plant that often grows in abundance.",
   "minutes": 4,
   "date": "2024-03-14"
  },
  {
   "id": "QFUrcgSyeiE",
   "title": "miner's lettuce - delicious small plant, from western North & Central America",
   "channel": "Ioana Talk Plants",
   "why": "Plant educator at Washington's Pacific Rim Institute introduces miner's lettuce in its native range and advises eating it in small amounts.",
   "minutes": 5,
   "date": "2023-03-03"
  },
  {
   "id": "n4lcdSfiQuM",
   "title": "Species profile: Claytonia perfoliata (Miner's Lettuce)",
   "channel": "Ashitaka 7500",
   "why": "Species profile covering the distribution, identification, foraging and taxonomy of miner's lettuce in the western US.",
   "minutes": 7,
   "date": "2024-05-17"
  }
 ],
 "wild-fennel": [
  {
   "id": "qYjTu_PtR1I",
   "title": "How to tell Fennel (an edible plant) apart from Hemlock (a very poisonous plant).",
   "channel": "William Broen",
   "why": "How to tell edible fennel apart from poison hemlock, and why 'when in doubt, don't risk it'.",
   "minutes": 6,
   "date": "2020-11-15"
  },
  {
   "id": "UstKtW_jhSY",
   "title": "💀 Poison hemlock - The Deadly Lookalike",
   "channel": "The Chestnut School of Herbal Medicine",
   "why": "Chestnut School of Herbal Medicine primer on poison hemlock, the deadly carrot-family lookalike to learn before picking any feathery-leaved plant.",
   "minutes": 7,
   "date": "2026-03-16"
  },
  {
   "id": "WVJWuiNAVGE",
   "title": "How to identify and control young poison hemlock",
   "channel": "Skagit County Clean Water",
   "why": "County noxious-weed coordinator shows young poison hemlock plants up close. Rule this carrot-family lookalike out before picking fennel.",
   "minutes": 2,
   "date": "2023-06-30"
  },
  {
   "id": "64p7NV27utM",
   "title": "Fennel (Foeniculum vulgare)",
   "channel": "Mountain Gardens",
   "why": "Herbalist Joe Hollis on the fennel plant itself: how it grows and how its parts are used.",
   "minutes": 3,
   "date": "2017-12-26"
  }
 ],
 "plantain-leaf": [
  {
   "id": "v1Lle66vLWc",
   "title": "BROADLEAF PLANTAIN (Plantago major)",
   "channel": "BYUI Applied Plant Science Department",
   "why": "BYU-Idaho plant science clip on identifying broadleaf plantain: a ground-hugging rosette of leaves and a long flowering season.",
   "minutes": 1,
   "date": "2019-11-01"
  },
  {
   "id": "lQ0Mw1uGqL8",
   "title": "Broadleaf Plantain: How to Identify, Harvest, and Cook",
   "channel": "Four Season Foraging",
   "why": "Thorough guide with timestamps to identifying, harvesting and cooking broadleaf plantain.",
   "minutes": 21,
   "date": "2019-06-02"
  },
  {
   "id": "uBeI3tc6Xdo",
   "title": "EatTheWeeds: Episode 13: Plantagos, Plantains",
   "channel": "EatTheWeeds",
   "why": "Green Deane on the plantains (Plantago) as a spring and summer green.",
   "minutes": 7,
   "date": "2008-03-09"
  }
 ],
 "yarrow": [
  {
   "id": "2crsRwitTNQ",
   "title": "Poison Hemlock Identification and Yarrow Comparison",
   "channel": "Trillium: Wild Edibles",
   "why": "Compares yarrow, Queen Anne's lace and deadly poison hemlock by leaves, stems (hemlock's purple mottling) and height.",
   "minutes": 3,
   "date": "2016-05-29"
  },
  {
   "id": "DH0WvKeK9Qk",
   "title": "How to identify Poison Hemlock, Queen Anne's Lace and Yarrow.",
   "channel": "Piked Antler Wilderness School",
   "why": "Wilderness school instructor on how to tell yarrow and wild carrot from poison hemlock.",
   "minutes": 7,
   "date": "2022-07-05"
  },
  {
   "id": "Uv_Zs5y5VzU",
   "title": "COMMON YARROW (Achillea millefolium)",
   "channel": "BYUI Applied Plant Science Department",
   "why": "BYU-Idaho plant science clip on identifying common yarrow: woolly stem, finely divided leaves and flower clusters.",
   "minutes": 2,
   "date": "2019-09-13"
  }
 ],
 "sheep-sorrel": [
  {
   "id": "MoqO0ZVdxLI",
   "title": "Foraging and Cooking with Sheep Sorrel",
   "channel": "Forager Chef",
   "why": "Forager Chef on the key identification points of sheep sorrel and how to use it.",
   "minutes": 6,
   "date": "2023-06-30"
  },
  {
   "id": "JkVVBtYchJ4",
   "title": "Identifying Sheep's Sorrel / Red Sorrel, Rumex acetosella",
   "channel": "Wild Food in the UK Ltd",
   "why": "Professional foraging-course instructor on identifying sheep's sorrel (Rumex acetosella).",
   "minutes": 5,
   "date": "2024-03-18"
  },
  {
   "id": "LrkX48HZ_sc",
   "title": "EatTheWeeds: Episode 10: Rumex (Sorrel)",
   "channel": "EatTheWeeds",
   "why": "Green Deane on identifying and preparing the Rumex sorrels.",
   "minutes": 9,
   "date": "2008-02-25"
  }
 ],
 "lambs-quarters": [
  {
   "id": "YgiTvCnTtZM",
   "title": "How to Identify Lamb's Quarters",
   "channel": "Trillium: Wild Edibles",
   "why": "Identifying lamb's quarters from young plant to 7 ft tall, and telling it from its toxic lookalike, nightshade.",
   "minutes": 8,
   "date": "2015-07-03"
  },
  {
   "id": "RixfFOUrpJw",
   "title": "Lamb's Quarters Identification At Different Stages of Growth",
   "channel": "EdibleWildFood.com",
   "why": "Ontario forager shows lamb's quarters at its different growth stages so you can recognize it at each one.",
   "minutes": 6,
   "date": "2021-05-26"
  },
  {
   "id": "4oL49PBsCP0",
   "title": "EatTheWeeds: Episode 84: Lambsquarters, pigweed, fat hen",
   "channel": "EatTheWeeds",
   "why": "Green Deane on Chenopodium album, a salad green and pot herb found around the world.",
   "minutes": 9,
   "date": "2009-05-23"
  }
 ],
 "purslane": [
  {
   "id": "TCi49CRgKyU",
   "title": "Identifying Purslane and Hairy-Stemmed Spurge",
   "channel": "EdibleWildFood.com",
   "why": "Side-by-side of purslane and toxic hairy-stemmed spurge, which often grows right beside it.",
   "minutes": 4,
   "date": "2019-08-01"
  },
  {
   "id": "o5FMMcLpdMA",
   "title": "Purslane: A Nutrient-Packed Weed",
   "channel": "Four Season Foraging",
   "why": "Identifying, harvesting and preparing purslane, ending with a side-by-side comparison with toxic spurge (Euphorbia).",
   "minutes": 12,
   "date": "2021-09-17"
  },
  {
   "id": "8tw8DcGAGmo",
   "title": "Eat The Weeds: Episode 91: Purslane",
   "channel": "EatTheWeeds",
   "why": "Green Deane on identifying and eating purslane.",
   "minutes": 9,
   "date": "2009-07-11"
  }
 ],
 "burdock-root": [
  {
   "id": "G7orxZNAej8",
   "title": "Identifying Burdock",
   "channel": "Will Forage for Food",
   "why": "How to identify burdock at its edible stage and tell it from potential lookalikes.",
   "minutes": 6,
   "date": "2017-06-03"
  },
  {
   "id": "w08ku2bYA3s",
   "title": "FORAGING 101: Wild Burdock, Deadly Foxglove Lookalike -- How to Spot the Difference",
   "channel": "Forager Dad",
   "why": "How to tell wild burdock from deadly foxglove, then how to pick and process burdock.",
   "minutes": 9,
   "date": "2021-06-30"
  },
  {
   "id": "qXiqq66fgow",
   "title": "How to Identify Common Burdock; Arctium minus - Wild Edible and Medicinal Plant Identification",
   "channel": "Trillium: Wild Edibles",
   "why": "Common burdock ID: rosette leaves, grooved stems with red striations and burs, plus a warning not to confuse the leaves with rhubarb.",
   "minutes": 7,
   "date": "2018-07-15"
  },
  {
   "id": "ukjaCRdhu58",
   "title": "How to Dig a Burdock Root (and Cook with Other Parts of the Plant)",
   "channel": "Forager Chef",
   "why": "Forager Chef on digging burdock root and using the leaf stalks and flower stalks.",
   "minutes": 8,
   "date": "2025-05-24"
  }
 ],
 "maple-sap": [
  {
   "id": "a5jUYx8xObE",
   "title": "Identifying Maple & Birch Trees For Sap & Syrup Production",
   "channel": "Learn Your Land",
   "why": "Adam Haritan on correctly identifying maple and birch trees in late winter before tapping them for sap and syrup.",
   "minutes": 24,
   "date": "2017-02-13"
  },
  {
   "id": "K-QSD7z8tzc",
   "title": "Maple Syrup Production for Beginners: From Sap to Syrup",
   "channel": "UW-Madison Extension Forestry",
   "why": "University of Wisconsin Extension on boiling sap down to syrup, then filtering and bottling a shelf-stable product.",
   "minutes": 3,
   "date": "2025-09-16"
  },
  {
   "id": "pVuyoDmFFGM",
   "title": "Gathering maple sugar the traditional Anishinaabe way",
   "channel": "CBC News",
   "why": "Caleb Musgrave demonstrates gathering maple sugar the traditional Anishinaabe way (CBC News).",
   "minutes": 4,
   "date": "2018-04-15"
  },
  {
   "id": "6TeAtQ0uE4o",
   "title": "Anishinaabe-Zhiiwaagamizigan (Maple Syrup)",
   "channel": "City Of Mississauga",
   "why": "Elder Mark Sault of the Mississaugas of the Credit First Nation taps trees and cooks sap into syrup while sharing teachings.",
   "minutes": 12,
   "date": "2022-09-28"
  }
 ],
 "wood-sorrel": [
  {
   "id": "obpyh4eQk8Q",
   "title": "Wood Sorrel Identification And Uses",
   "channel": "Trillium: Wild Edibles",
   "why": "Identifying yellow wood sorrel by its heart-shaped leaflets and yellow flowers, telling it from clover, and a note on its oxalic acid.",
   "minutes": 6,
   "date": "2017-06-17"
  },
  {
   "id": "zqxZhbIzUlI",
   "title": "EatTheWeeds: Episode 67: Oxalis, Wood Sorrel",
   "channel": "EatTheWeeds",
   "why": "Green Deane on Oxalis (wood sorrel), a tart plant found around the world.",
   "minutes": 5,
   "date": "2009-02-12"
  },
  {
   "id": "06N9UtdA3Zw",
   "title": "How to find, identify and use Wood Sorrel and what to be aware of before eating it!",
   "channel": "The Forager Within",
   "why": "Foraging instructor covers identification, habitat and what to watch for: high oxalic acid, so avoid it with kidney stones, gout or rheumatoid arthritis.",
   "minutes": 3,
   "date": "2024-06-15"
  }
 ],
 "chickweed": [
  {
   "id": "GJnp-lqdofM",
   "title": "How To Identify Chickweed Plants",
   "channel": "Trillium: Wild Edibles",
   "why": "Identifying common chickweed (Stellaria media) and two related chickweeds.",
   "minutes": 6,
   "date": "2017-04-14"
  },
  {
   "id": "OMz0qLPC2as",
   "title": "How to Identify Chickweed vs Poison Lookalike",
   "channel": "Healing Ecosystems",
   "why": "Side-by-side of chickweed and its lookalike scarlet pimpernel, which is toxic.",
   "minutes": 4,
   "date": "2020-04-06"
  },
  {
   "id": "d7HNWYDmD-0",
   "title": "Chickweed (Stellaria media) 5 ways to 100% accurate ID: a \"weed\" on par with spinach nutritionally.",
   "channel": "Nature at Your Door Frank Taylor",
   "why": "Five checks for a certain chickweed ID, plus the similar mouse-ear chickweed and toxic scarlet pimpernel.",
   "minutes": 11,
   "date": "2021-05-14"
  }
 ],
 "dulse": [
  {
   "id": "0HTQHl7zFeQ",
   "title": "How to find and pick dulse",
   "channel": "Farm Forage",
   "why": "Maritimes guide to finding dulse around low tide and breaking it off above the holdfast so it can regrow, then drying it.",
   "minutes": 2,
   "date": "2014-05-24"
  },
  {
   "id": "MCbO6tI2uGg",
   "title": "Dulsing we will go with Fundy Adventures in the UNESCO Southwest Nova Biosphere Reserve",
   "channel": "UNESCO Souwest Nova Biosphere Reserve",
   "why": "Bay of Fundy sea-vegetable harvester in a UNESCO biosphere reserve shows sustainable dulse harvesting between some of the world's biggest tides.",
   "minutes": 2,
   "date": "2012-12-10"
  },
  {
   "id": "1dv8JAPJ_Ac",
   "title": "What The Heck is Dulse, and Why Should Canadians Try It?",
   "channel": "The Weather Network",
   "why": "Short Canadian explainer on what dulse is and where and how it is picked.",
   "minutes": 2,
   "date": "2022-08-13"
  }
 ],
 "wild-rice": [
  {
   "id": "6eOz8CPW0m0",
   "title": "Manoomin: Food That Grows on the Water | The Ways",
   "channel": "PBS Wisconsin Education",
   "why": "Fred Ackley Jr. of the Sokaogon Chippewa Community on harvesting and processing manoomin and the relationship with nature behind it.",
   "minutes": 4,
   "date": "2020-02-12"
  },
  {
   "id": "iYc73eQbq6o",
   "title": "Wild Rice Harvesting",
   "channel": "Minnesota Historical Society",
   "why": "Pat and Gage Kruse (Red Cliff Band of Lake Superior Chippewa) go ricing and share harvest techniques and knowledge.",
   "minutes": 3,
   "date": "2020-10-21"
  },
  {
   "id": "Zs8UyGlL3iU",
   "title": "White Earth Wild Rice Harvest- Manoominikewag",
   "channel": "White Earth Land Recovery Project",
   "why": "White Earth Land Recovery Project on the Anishinaabe manoomin harvest and its age-old traditions.",
   "minutes": 3,
   "date": "2013-09-14"
  },
  {
   "id": "xls7_voRbWg",
   "title": "WILD RICE -  From LAKE to TABLE",
   "channel": "BlackForager",
   "why": "Alexis Nikole Nelson goes ricing with Samuel Thayer and covers the history and traditional processing of wild rice, from lake to pantry.",
   "minutes": 6,
   "date": "2025-01-17"
  }
 ]
};

export const CREATURE_VIDEOS: Record<string, { kind: "fish" | "garden"; heading?: string; videos: Video[] }> = {
 "walleye": {
  "kind": "fish",
  "videos": [
   {
    "id": "ThhTvG86JCE",
    "title": "How James & Al Lindner Find Walleyes on Lakes They've Never Fished Before",
    "channel": "Lindner's Angling Edge",
    "why": "Al and James Lindner show how to break down a lake you've never fished and locate walleyes fast.",
    "minutes": 22,
    "date": "2026-06-13"
   },
   {
    "id": "QGj2XQDfx0k",
    "title": "Top Jigging Techniques To Catch Walleyes",
    "channel": "Lindner's Angling Edge",
    "why": "Lindner's top jigging techniques for walleyes, useful for beginners and experienced anglers alike.",
    "minutes": 22,
    "date": "2024-05-20"
   },
   {
    "id": "w7bjuE23e0o",
    "title": "In-Fisherman Classics: Walleye Location Secrets",
    "channel": "In-Fisherman",
    "why": "Classic In-Fisherman lesson on where walleyes really hold beyond deep rocks, through the seasons.",
    "minutes": 8.8,
    "date": "2024-05-06"
   },
   {
    "id": "7sUF2cV-Hwc",
    "title": "All About Walleye - (In just 7 MINUTES)",
    "channel": "Fish Along with the OFAH",
    "why": "Ontario anglers' federation primer: walleye ID, habitat, spawning, diet and growth, plus fishing tips.",
    "minutes": 7.6,
    "date": "2021-11-19"
   }
  ],
  "heading": "Further videos: fishing for walleye"
 },
 "smallmouth-bass": {
  "kind": "fish",
  "videos": [
   {
    "id": "adFOfIbjzGQ",
    "title": "Breaking Down River Eddies for Smallmouth Bass",
    "channel": "Wired2Fish",
    "why": "Reading river eddies and current seams from shore to find and catch river smallmouth.",
    "minutes": 6.5,
    "date": "2017-07-31"
   },
   {
    "id": "XRiRpRSgdKs",
    "title": "In-Fisherman TV (Season 46) E:4 - Timeless Smallmouth Bass Tactics",
    "channel": "In-Fisherman",
    "why": "Time-tested smallmouth tactics for lakes and rivers from In-Fisherman TV.",
    "minutes": 6.5,
    "date": "2023-03-08"
   },
   {
    "id": "wBdsyBgN_R8",
    "title": "Smallmouth Bass Tips with Tom Rosenbauer",
    "channel": "The New Fly Fisher",
    "why": "Tom Rosenbauer on flies, patterns and approach for early-season smallmouth on the fly.",
    "minutes": 3.1,
    "date": "2020-01-28"
   },
   {
    "id": "nwKE-44BPCU",
    "title": "Life of the Smallmouth Bass and How to Catch a Smallie",
    "channel": "Fishing with Nat",
    "why": "Smallmouth life cycle, habitat and behaviour explained, with how that shapes the way you fish for them.",
    "minutes": 3.4,
    "date": "2024-07-19"
   }
  ],
  "heading": "Further videos: fishing for smallmouth bass"
 },
 "largemouth-bass": {
  "kind": "fish",
  "videos": [
   {
    "id": "xm0xyt8QBgM",
    "title": "Bass Fishing Tips: 9 Basics All Anglers Need To Know | Bass Fishing Tutorial",
    "channel": "Bassresource - The Ultimate Bass Fishing Resource",
    "why": "Nine bass-fishing fundamentals (cover, weather, lure speed and more) every angler should know.",
    "minutes": 10.5,
    "date": "2019-07-02"
   },
   {
    "id": "0dcU-xTWO8Q",
    "title": "How to Quickly Find Bass on New Water",
    "channel": "Wired2Fish",
    "why": "How to quickly pattern largemouth on an unfamiliar lake with limited time on the water.",
    "minutes": 2.9,
    "date": "2015-09-08"
   },
   {
    "id": "dNG8z_IxlJ0",
    "title": "Life of the Largemouth Bass and How to Catch a Bass",
    "channel": "Fishing with Nat",
    "why": "Largemouth biology, spawning and seasonal habits, and how to catch them.",
    "minutes": 4.1,
    "date": "2024-06-20"
   }
  ],
  "heading": "Further videos: fishing for largemouth bass"
 },
 "northern-pike": {
  "kind": "fish",
  "videos": [
   {
    "id": "s_EAULKidUY",
    "title": "In-Fisherman Classics: Understanding Northern Pike Behavior in Warming Water",
    "channel": "In-Fisherman",
    "why": "Al Lindner and Dave Csanda on how pike behaviour and location shift as water warms.",
    "minutes": 10.1,
    "date": "2024-09-03"
   },
   {
    "id": "GB8iqrOMMK4",
    "title": "The Griz Shares His Secrets for Catching Summer Pike",
    "channel": "Outdoor Life",
    "why": "Finding and catching pike in late summer when fish leave the shoreline weeds.",
    "minutes": 15.2,
    "date": "2026-08-14"
   },
   {
    "id": "IiEXDF0dJ3c",
    "title": "All About Northern Pike - Identification, Habitat, Spawning, Diet, Age & Size, Fishing Tips",
    "channel": "Fish Along with the OFAH",
    "why": "Northern pike ID, habitat, spawning, diet and growth, with fishing tips (OFAH).",
    "minutes": 4.8,
    "date": "2021-10-07"
   },
   {
    "id": "iK2D93FlbjA",
    "title": "Life of a Northern Pike and How to Fish for Pike",
    "channel": "Fishing with Nat",
    "why": "Pike life history and spawning explained, plus lures and techniques that work.",
    "minutes": 4.4,
    "date": "2024-03-14"
   }
  ],
  "heading": "Further videos: fishing for northern pike"
 },
 "muskellunge": {
  "kind": "fish",
  "videos": [
   {
    "id": "eR2lVSrEI2o",
    "title": "Muskie Fishing Tips: How To Catch \"The Fish of 10,000 Casts\"",
    "channel": "Mystery Tackle Box",
    "why": "Why muskies are the 'fish of 10,000 casts', and top tips for finding and catching them.",
    "minutes": 17.3,
    "date": "2019-10-16"
   },
   {
    "id": "JpVRre8dbQ4",
    "title": "Starting Musky Fishing! The Beginners Guide!",
    "channel": "The Musky Shop",
    "why": "A musky tackle shop's beginner's guide to getting started: the gear and approach you need.",
    "minutes": 17.2,
    "date": "2021-11-09"
   },
   {
    "id": "aORPWsZ2eTw",
    "title": "All About Muskie - Identification, Habitat, Spawning, Diet, Age & Size, Fishing Tips",
    "channel": "Fish Along with the OFAH",
    "why": "Muskie identification, habitat, spawning, diet and growth, with fishing tips (OFAH).",
    "minutes": 7.9,
    "date": "2021-12-09"
   },
   {
    "id": "fK7lxFz3V28",
    "title": "The Life of the Muskellunge and How to Catch a Musky",
    "channel": "Fishing with Nat",
    "why": "Musky life cycle and biology in plain terms, and how to catch one.",
    "minutes": 4,
    "date": "2025-08-30"
   }
  ],
  "heading": "Further videos: fishing for muskellunge"
 },
 "lake-trout": {
  "kind": "fish",
  "videos": [
   {
    "id": "xqQNYPmFTT0",
    "title": "James Lindner's Simple Tactics for Lake Trout",
    "channel": "Ontario's Sunset Country",
    "why": "James Lindner's simple, proven lake trout tactics on Canadian Shield lakes in Northwest Ontario.",
    "minutes": 5.8,
    "date": "2021-06-04"
   },
   {
    "id": "lc3OkaVm3i0",
    "title": "Lake Trout Location Basics",
    "channel": "Manitoba Wildlife Federation",
    "why": "Lake trout location basics for anglers new to the species (Manitoba Wildlife Federation).",
    "minutes": 2.9,
    "date": "2019-07-25"
   },
   {
    "id": "eQzSa_ghLLQ",
    "title": "Vertical Jiggin' Summer Lake Trout",
    "channel": "Lindner's Angling Edge",
    "why": "Vertical jigging deep summer lake trout on northern lakes.",
    "minutes": 3.9,
    "date": "2019-08-27"
   },
   {
    "id": "kRIZ2Fqzdto",
    "title": "\"Casting Super Shallow Lake Trout\" Full Length (TV Show 8) - Uncut Angling - April 1, 2013",
    "channel": "Uncut Angling",
    "why": "Manitoba lake trout guide Tim Matheson shares expert advice on casting for shallow lakers (Uncut Angling TV).",
    "minutes": 22.3,
    "date": "2013-04-01"
   }
  ],
  "heading": "Further videos: fishing for lake trout"
 },
 "brook-trout": {
  "kind": "fish",
  "videos": [
   {
    "id": "n8ENBwDnM7o",
    "title": "Brook Trout Basics",
    "channel": "The New Fly Fisher",
    "why": "Brook trout in depth: their geographic range, genetics and what drives their size.",
    "minutes": 24.3,
    "date": "2020-04-10"
   },
   {
    "id": "ixXt9szddNY",
    "title": "Small Stream Fishing - What You Need to Know",
    "channel": "Orvis Guide to Fly Fishing",
    "why": "Tom Rosenbauer goes in-depth on fishing small trout streams, classic brook trout water.",
    "minutes": 24.7,
    "date": "2023-12-23"
   },
   {
    "id": "HaXBl5SXKy0",
    "title": "Connected Conservation - A Future for Adirondack Brook Trout",
    "channel": "Trout Unlimited",
    "why": "Trout Unlimited and NY DEC on reconnecting habitat to protect Adirondack brook trout.",
    "minutes": 9.8,
    "date": "2025-02-07"
   }
  ],
  "heading": "Further videos: fishing for brook trout"
 },
 "rainbow-trout": {
  "kind": "fish",
  "videos": [
   {
    "id": "oXRHQhcijVc",
    "title": "TOP 3 Trout Fishing Tactics For Creeks & Rivers (IN DEPTH HOW TO)",
    "channel": "Addicted Fishing",
    "why": "Three proven spin-fishing rigs for trout in creeks and rivers, and where to fish them.",
    "minutes": 21.2,
    "date": "2023-08-15"
   },
   {
    "id": "TXBesQ0jJU0",
    "title": "Indicator Fishing & Preventing Drag with Tom Rosenbauer",
    "channel": "The New Fly Fisher",
    "why": "Tom Rosenbauer on nymphing under an indicator and avoiding drag for river trout.",
    "minutes": 7.6,
    "date": "2021-06-17"
   },
   {
    "id": "xICfLNSvq_I",
    "title": "Catching Rainbow trout - Tips from a Fisheries Biologist",
    "channel": "Texas Parks and Wildlife",
    "why": "A fisheries biologist's quick tips for catching stocked rainbow trout (Texas Parks and Wildlife).",
    "minutes": 2.3,
    "date": "2019-11-25"
   },
   {
    "id": "1PP7oIwtuE8",
    "title": "All About Rainbow Trout!",
    "channel": "Fish Along with the OFAH",
    "why": "Rainbow trout ID, habitat, spawning, diet and growth in Ontario waters (OFAH).",
    "minutes": 3.9,
    "date": "2023-11-19"
   }
  ],
  "heading": "Further videos: fishing for rainbow trout"
 },
 "brown-trout": {
  "kind": "fish",
  "videos": [
   {
    "id": "TxD4deOR1LQ",
    "title": "How To Find Trout In A River Part 1",
    "channel": "Orvis Guide to Fly Fishing",
    "why": "Tom Rosenbauer on locating trout in rivers, from ruling out unproductive water to where fish hold.",
    "minutes": 33.7,
    "date": "2020-05-16"
   },
   {
    "id": "SllRAmLsvaU",
    "title": "October Mice for Brown Trout",
    "channel": "The New Fly Fisher",
    "why": "Fishing mouse patterns in October to bring big brown trout to the surface.",
    "minutes": 11.8,
    "date": "2021-04-01"
   },
   {
    "id": "9AJfRThOqpg",
    "title": "How to CATCH BIG Brown Trout on Jerkbaits",
    "channel": "Mountain State Angler",
    "why": "Targeting big fall brown trout on jerkbaits in lakes and rivers with spinning gear.",
    "minutes": 23.2,
    "date": "2020-11-10"
   }
  ],
  "heading": "Further videos: fishing for brown trout"
 },
 "yellow-perch": {
  "kind": "fish",
  "videos": [
   {
    "id": "lfPt4NL2nmk",
    "title": "How to Catch Perch | Open Water Perch Tricks | Destination Fish TV with Jon Thelen",
    "channel": "Jon Thelen's Destination-Fish",
    "why": "Finding and catching open-water perch schools, with rigs and presentations.",
    "minutes": 10.9,
    "date": "2025-09-19"
   },
   {
    "id": "Pt9W4CMb9vQ",
    "title": "How to Fish for Yellow Perch During the Spring Perch Run",
    "channel": "FishTalk Magazine",
    "why": "How to catch yellow perch during the spring spawning run.",
    "minutes": 3.2,
    "date": "2019-03-12"
   },
   {
    "id": "VtoeTaCvbVw",
    "title": "All About Yellow Perch: Identification, Fishing Tips, Habitat and Diet",
    "channel": "Fish Along with the OFAH",
    "why": "Yellow perch identification, habitat, diet and fishing tips (OFAH).",
    "minutes": 11.3,
    "date": "2021-01-26"
   },
   {
    "id": "GnB9I07x_eo",
    "title": "Life of the Yellow Perch and How to Fish for Perch",
    "channel": "Fishing with Nat",
    "why": "Perch life history and behaviour, and simple ways to catch them.",
    "minutes": 3.9,
    "date": "2024-04-23"
   }
  ],
  "heading": "Further videos: fishing for yellow perch"
 },
 "black-crappie": {
  "kind": "fish",
  "videos": [
   {
    "id": "iLnHYRGYmjE",
    "title": "Crappie Techniques that Work | Bill Dance Outdoors",
    "channel": "billdancefishing",
    "why": "Bill Dance walks through several proven crappie techniques and when to use them.",
    "minutes": 22.1,
    "date": "2024-01-31"
   },
   {
    "id": "iVY9O947zzA",
    "title": "In-Fisherman TV (Season 46) E:2 - How to Target Shallow Springtime Crappies",
    "channel": "In-Fisherman",
    "why": "Finding shallow spring crappies around spawning habitat (black and white).",
    "minutes": 6.4,
    "date": "2023-03-08"
   },
   {
    "id": "asH6c_P4ESw",
    "title": "In-Fisherman Classics: Location Secrets for Fall Crappies",
    "channel": "In-Fisherman",
    "why": "Al Lindner and Tom Neustrom on locating and staying on fall crappies.",
    "minutes": 5.6,
    "date": "2024-07-15"
   },
   {
    "id": "OUgAJY03mWk",
    "title": "Life of the Crappie and How to Catch One Fishing",
    "channel": "Fishing with Nat",
    "why": "Black and white crappie biology and how to catch them.",
    "minutes": 3.6,
    "date": "2025-11-01"
   }
  ],
  "heading": "Further videos: fishing for black crappie"
 },
 "bluegill": {
  "kind": "fish",
  "videos": [
   {
    "id": "KZHlNT_qvoI",
    "title": "Bluegill Fishing Tips with Bobbers and Plastic Lures",
    "channel": "Wired2Fish",
    "why": "Catching spring bluegills in the shallows with bobbers and small soft plastics.",
    "minutes": 8.9,
    "date": "2020-05-22"
   },
   {
    "id": "NgE93gfqg44",
    "title": "Bluegill Fishing Tips",
    "channel": "In-Fisherman",
    "why": "In-Fisherman crew targets bluegills around flooded timber.",
    "minutes": 4.8,
    "date": "2018-10-23"
   },
   {
    "id": "0KAFU0Bc2V8",
    "title": "All About Bluegill & Pumpkinseed Sunfish - Identification, Habitat, Spawning, Diet, Age & Size, Tips",
    "channel": "Fish Along with the OFAH",
    "why": "Telling bluegill from pumpkinseed, plus habitat, spawning, diet and tips (OFAH).",
    "minutes": 10.6,
    "date": "2021-08-25"
   },
   {
    "id": "iTCFdkTL0VE",
    "title": "Life of the Bluegill and How to Fish for Bluegill",
    "channel": "Fishing with Nat",
    "why": "Bluegill life history, and easy ways for beginners to catch them.",
    "minutes": 3.9,
    "date": "2024-05-21"
   }
  ],
  "heading": "Further videos: fishing for bluegill"
 },
 "channel-catfish": {
  "kind": "fish",
  "videos": [
   {
    "id": "r_OBC3Anvn8",
    "title": "In-Fisherman Classics: Big Cat Safari - Finding Spring Channel Catfish",
    "channel": "In-Fisherman",
    "why": "Finding big spring channel catfish as rivers warm (In-Fisherman classic).",
    "minutes": 9.7,
    "date": "2024-05-06"
   },
   {
    "id": "7Q8rLTj-9rI",
    "title": "Channel Catfish In Streams",
    "channel": "In-Fisherman",
    "why": "Wading small rivers and streams for channel cats at low flow, no boat needed.",
    "minutes": 6.1,
    "date": "2020-02-11"
   },
   {
    "id": "hgXD1NOASnA",
    "title": "How to catch channel catfish - How I fish for catfish: Bait, Rigs, Net",
    "channel": "Catfish and Carp",
    "why": "A complete channel catfish setup: bait, rigs, rods and landing net.",
    "minutes": 17.5,
    "date": "2016-03-23"
   },
   {
    "id": "8W-PaoiqZLc",
    "title": "Life of the Channel Catfish and How to Catch One",
    "channel": "Fishing with Nat",
    "why": "Channel catfish biology and habits, and how to catch one.",
    "minutes": 4,
    "date": "2025-06-18"
   }
  ],
  "heading": "Further videos: fishing for channel catfish"
 },
 "chinook-salmon": {
  "kind": "fish",
  "videos": [
   {
    "id": "yFBuDc6GvzU",
    "title": "\"How To\" Bank Fishing For Spring Chinook Salmon | Big River Tactics",
    "channel": "Addicted Fishing",
    "why": "Plunking from the bank for spring Chinook on big rivers, an effective no-boat method.",
    "minutes": 9,
    "date": "2019-03-25"
   },
   {
    "id": "gWAUNn4a2uQ",
    "title": "INCREDIBLE Lake Ontario Salmon Fishing - Salmon Trolling Tips & Tricks",
    "channel": "FishUSA",
    "why": "Trolling tips and tricks for Lake Ontario king salmon with a charter captain.",
    "minutes": 33.9,
    "date": "2024-09-07"
   },
   {
    "id": "_z2F-zZ5SS4",
    "title": "Salmon Fishing Tip Making Adjustments",
    "channel": "Jay Peck Guides & Lost Rivers Fishing",
    "why": "Jay Peck on adapting flies and approach as conditions change during the Salmon River (NY) run.",
    "minutes": 8.3,
    "date": "2023-10-19"
   },
   {
    "id": "cScIQDiWFKk",
    "title": "Life of the Chinook and Coho Salmon and How to Catch One Fishing",
    "channel": "Fishing with Nat",
    "why": "Chinook and coho life history in the ocean and Great Lakes, and how to catch them.",
    "minutes": 4.5,
    "date": "2024-11-02"
   }
  ],
  "heading": "Further videos: fishing for chinook salmon"
 },
 "coho-salmon": {
  "kind": "fish",
  "videos": [
   {
    "id": "Y1t0_7w2AQ8",
    "title": "\"How-To\" Find Fall Chinook & Coho Salmon in Rivers or Creeks",
    "channel": "Addicted Fishing",
    "why": "Reading river water to find fall coho (and Chinook): runs, holes and tailouts.",
    "minutes": 7.3,
    "date": "2018-10-03"
   },
   {
    "id": "WTHUPyOQR0M",
    "title": "Coho Salmon Fishing Tips | Twitching Jig Setup For Coho Fishing 🎣",
    "channel": "Addicted Fishing",
    "why": "Setting up and twitching jigs for aggressive river coho.",
    "minutes": 4.6,
    "date": "2018-10-22"
   },
   {
    "id": "iYn-Wp7LGWI",
    "title": "Bill Herzog Spoon Fishing for Coho Salmon Tutorial",
    "channel": "Salmon Trout Steelheader Magazine",
    "why": "Bill Herzog's spoon technique for river coho on Washington's Quinault River.",
    "minutes": 3.8,
    "date": "2021-10-13"
   },
   {
    "id": "P_ROqvC59D4",
    "title": "Salmon's life cycle and their incredible impact on our ecosystem",
    "channel": "Ocean Wise",
    "why": "The Pacific salmon life cycle and its role in coastal ecosystems (Ocean Wise).",
    "minutes": 3.8,
    "date": "2021-10-29"
   }
  ],
  "heading": "Further videos: fishing for coho salmon"
 },
 "steelhead": {
  "kind": "fish",
  "videos": [
   {
    "id": "kTdAl6ZDnvM",
    "title": "FLOAT FISHING For Steelhead - IN Depth HOW TO! (Sliding & Fixed Setups)",
    "channel": "Addicted Fishing",
    "why": "In-depth guide to float fishing for steelhead with sliding and fixed float setups.",
    "minutes": 31,
    "date": "2020-12-24"
   },
   {
    "id": "caJLzOux9LE",
    "title": "Swinging Flies for Great Lakes Steelhead",
    "channel": "The New Fly Fisher",
    "why": "Swinging flies for Great Lakes steelhead: flies, presentations and water to target.",
    "minutes": 23,
    "date": "2022-10-08"
   },
   {
    "id": "8i7DMnwYjjU",
    "title": "Fly Fishing Tip - Drifting Egg Flies",
    "channel": "Jay Peck Guides & Lost Rivers Fishing",
    "why": "Jay Peck on drifting egg flies for steelhead during the fall egg bite.",
    "minutes": 16.4,
    "date": "2023-11-12"
   },
   {
    "id": "Ra71Sj8dPUw",
    "title": "Steelhead in the Classroom: Steelhead Trout vs. Rainbow Trout",
    "channel": "California Department of Fish and Wildlife",
    "why": "How steelhead and rainbow trout are the same species with different life histories (California DFW).",
    "minutes": 11.9,
    "date": "2020-09-16"
   }
  ],
  "heading": "Further videos: fishing for steelhead"
 },
 "atlantic-salmon": {
  "kind": "fish",
  "videos": [
   {
    "id": "NXcT4njP738",
    "title": "Locating Atlantic Salmon in a River | How To",
    "channel": "The New Fly Fisher",
    "why": "Reading a salmon river: where Atlantic salmon lie and why."
   },
   {
    "id": "amUEmRL7oYc",
    "title": "Atlantic Salmon Fishing Basics | How To",
    "channel": "The New Fly Fisher",
    "why": "The basics of fly fishing for Atlantic salmon, filmed in Newfoundland.",
    "minutes": 22,
    "date": "2019-07-20"
   },
   {
    "id": "oCiaeIAPUtQ",
    "title": "Swinging Flies for Salmon",
    "channel": "The New Fly Fisher",
    "why": "Swinging wet flies on the Gander River, Newfoundland.",
    "minutes": 38.6,
    "date": "2022-02-12"
   },
   {
    "id": "xCtkRGlTH40",
    "title": "ASF - St. Mary's Atlantic Salmon Nova Scotia",
    "channel": "Atlantic Salmon Federation",
    "why": "Conservation: bringing salmon back to Nova Scotia's St. Mary's River."
   }
  ],
  "heading": "Further videos: fishing for atlantic salmon"
 },
 "striped-bass": {
  "kind": "fish",
  "videos": [
   {
    "id": "71Wpq6ZHClA",
    "title": "Striped Bass Tactics – Catching Stripers from Shore",
    "channel": "MA MarineFisheries",
    "why": "Surfcasting for striped bass from shore (Massachusetts Division of Marine Fisheries).",
    "minutes": 13.2,
    "date": "2025-03-27"
   },
   {
    "id": "2ed2j6yN0h0",
    "title": "Striped Bass Fishing with Capt. Brian Coombs | Boston, MA | S21 Ep.5",
    "channel": "On The Water Media",
    "why": "Finding Boston Harbor stripers with a charter captain, from chasing blitzes to switching to live bait.",
    "minutes": 23.4,
    "date": "2024-02-26"
   },
   {
    "id": "YmGGrRqOJQM",
    "title": "How to Fish for Freshwater Striped Bass",
    "channel": "Mercury Marine",
    "why": "How to find and catch landlocked freshwater striped bass in lakes and reservoirs.",
    "minutes": 3.4,
    "date": "2022-09-26"
   }
  ],
  "heading": "Further videos: fishing for striped bass"
 },
 "arctic-grayling": {
  "kind": "fish",
  "videos": [
   {
    "id": "GTZo1iKZR5g",
    "title": "How to Fish for Arctic Grayling",
    "channel": "Alaska Department of Fish and Game",
    "why": "An Alaska Department of Fish and Game biologist shows how and where to catch grayling.",
    "minutes": 7.9,
    "date": "2014-05-22"
   },
   {
    "id": "gv1Z8OYJaAA",
    "title": "How to catch grayling - Fishing for arctic grayling - fly fishing and spinning",
    "channel": "Catfish and Carp",
    "why": "Catching grayling on dry flies and small spinners, with gear and technique.",
    "minutes": 10.2,
    "date": "2017-09-30"
   },
   {
    "id": "MU6ZJJih8kU",
    "title": "Arctic Grayling Fishing in Northern Manitoba | Epic Dry Fly Fishing",
    "channel": "The New Fly Fisher",
    "why": "Dry-fly fishing for Arctic grayling in northern Manitoba.",
    "minutes": 6.6,
    "date": "2022-09-28"
   }
  ],
  "heading": "Further videos: fishing for arctic grayling"
 },
 "lake-whitefish": {
  "kind": "fish",
  "videos": [
   {
    "id": "GUePHs5Lal4",
    "title": "Catching Whitefish 101",
    "channel": "Lindner's Angling Edge",
    "why": "James Lindner covers what you need to know to get started catching whitefish.",
    "minutes": 9,
    "date": "2018-12-04"
   },
   {
    "id": "d705su6oSbA",
    "title": "Ice Fishing Whitefish (The Complete Guide)",
    "channel": "AnglingBuzz",
    "why": "Complete guide to ice fishing lake whitefish: location, jigging and gear.",
    "minutes": 23.9,
    "date": "2020-01-19"
   },
   {
    "id": "4XM4STFvxzs",
    "title": "Fishing for Summertime Lake Whitefish in Washington",
    "channel": "TheWDFW",
    "why": "A simple method for summertime lake whitefish (Washington Department of Fish and Wildlife).",
    "minutes": 7.2,
    "date": "2019-08-06"
   },
   {
    "id": "l9dGCP6txXQ",
    "title": "Whitefish Tips and Techniques",
    "channel": "john whyte",
    "why": "Through-the-ice whitefish tips and jigging techniques from Lake Simcoe, Ontario.",
    "minutes": 4.5,
    "date": "2016-02-14"
   }
  ],
  "heading": "Further videos: fishing for lake whitefish"
 },
 "burbot": {
  "kind": "fish",
  "videos": [
   {
    "id": "w26msbijPks",
    "title": "Fishing for Burbot in Washington",
    "channel": "TheWDFW",
    "why": "Burbot biology, habitat and gear for catching them (Washington Department of Fish and Wildlife).",
    "minutes": 8.5,
    "date": "2014-12-22"
   },
   {
    "id": "ot-Lt33FYVI",
    "title": "Ice fishing for BURBOT (best spots, baits, technique and gear)",
    "channel": "Target Walleye",
    "why": "Everything for ice fishing burbot: best spots, baits, jigging and timing.",
    "minutes": 35.8,
    "date": "2019-09-12"
   },
   {
    "id": "OPYnXrgKFhw",
    "title": "How To Catch Burbot",
    "channel": "Wyoming Game and Fish Department",
    "why": "Quick lure and timing tips for night-feeding burbot (Wyoming Game and Fish).",
    "minutes": 1.6,
    "date": "2018-02-20"
   },
   {
    "id": "9mGKHAaZuhE",
    "title": "All About Burbot - Identification, Habitat, Spawning, Diet, Age & Size, Fishing Tips",
    "channel": "Fish Along with the OFAH",
    "why": "Burbot ID, habitat, spawning, diet and growth (OFAH).",
    "minutes": 4.9,
    "date": "2023-03-16"
   }
  ],
  "heading": "Further videos: fishing for burbot"
 },
 "redfish": {
  "kind": "fish",
  "videos": [
   {
    "id": "GMAROlUsAEY",
    "title": "3 Tips To Catch Shallow Water Redfish",
    "channel": "Salt Strong",
    "why": "Three tips for finding and catching redfish in shallow water on the flats.",
    "minutes": 7.6,
    "date": "2020-11-12"
   },
   {
    "id": "GHUGMKAO0Us",
    "title": "HOW TO CATCH REDFISH - The Ultimate Tutorial and Instructional",
    "channel": "1Fish2Fish",
    "why": "A complete, step-by-step tutorial on how to catch redfish inshore.",
    "minutes": 20.1,
    "date": "2020-01-07"
   },
   {
    "id": "LrENmwLNuHQ",
    "title": "Florida Sportsman Watermen - Mosquito Lagoon Reds with Flip Pallot",
    "channel": "Florida Sportsman",
    "why": "Fishing Mosquito Lagoon's famous redfish with Flip Pallot (Florida Sportsman).",
    "minutes": 23,
    "date": "2019-04-05"
   }
  ],
  "heading": "Further videos: fishing for redfish (red drum)"
 },
 "speckled-trout": {
  "kind": "fish",
  "videos": [
   {
    "id": "qlM8pYHcQnw",
    "title": "HOW TO CATCH SPECKLED TROUT (Sea Trout) - TUTORIAL and EVERYTHING TO KNOW",
    "channel": "1Fish2Fish",
    "why": "A complete tutorial on catching speckled trout (spotted seatrout).",
    "minutes": 19.9,
    "date": "2020-01-05"
   },
   {
    "id": "FKhBKZYiLjg",
    "title": "Speckled Trout Pro Tips | Episode 1 | Capt. Bud Bishop | Giving up Secrets",
    "channel": "HaltySalty",
    "why": "Charter captain Bud Bishop shares winter speckled trout tips while catching big 'gator' trout.",
    "minutes": 15.2,
    "date": "2022-11-20"
   },
   {
    "id": "A3P_SmunB6k",
    "title": "Top 3 Spring Lures For Speckled Trout [Plus A BONUS Secret Lure]",
    "channel": "Salt Strong",
    "why": "Top spring lures for speckled trout and how to fish them.",
    "minutes": 8.1,
    "date": "2022-03-08"
   }
  ],
  "heading": "Further videos: fishing for speckled trout (spotted seatrout)"
 },
 "snook": {
  "kind": "fish",
  "videos": [
   {
    "id": "TLt7urEhj3k",
    "title": "Best Live Bait Rigs for Snook & How To Use Them",
    "channel": "Florida Sportsman",
    "why": "The best live-bait rigs for snook and how to fish them (Florida Sportsman).",
    "minutes": 3.6,
    "date": "2023-09-01"
   },
   {
    "id": "JIUgyM5RU6k",
    "title": "SNOOK FISHING: How To Catch Snook From The Beach (Wade Fishing)",
    "channel": "Salt Strong",
    "why": "Wade-fishing the beach for summer snook: where they cruise and what to throw.",
    "minutes": 11,
    "date": "2019-07-15"
   },
   {
    "id": "sr0ypvgXtqM",
    "title": "10 Best Snook Lures Right Now: Catch More Snook with These Artificial Baits",
    "channel": "Florida Sportsman",
    "why": "Ten proven artificial lures for snook and where to use each (Florida Sportsman).",
    "minutes": 6,
    "date": "2022-09-02"
   },
   {
    "id": "jKImLXfxBsE",
    "title": "MASSIVE Topwater Snook Fishing",
    "channel": "BlacktipH",
    "why": "Sight-casting topwater lures to big snook in the backcountry mangroves.",
    "minutes": 10.5,
    "date": "2019-07-30"
   }
  ],
  "heading": "Further videos: fishing for snook"
 },
 "halibut": {
  "kind": "fish",
  "videos": [
   {
    "id": "VFmmdF4xEr4",
    "title": "How to Target Halibut",
    "channel": "BCOSF TV",
    "why": "A BC marine pro's tips on where to find halibut (BC Outdoors Sport Fishing).",
    "minutes": 1.8,
    "date": "2012-05-30"
   },
   {
    "id": "tCSWonA6wJo",
    "title": "Five Halibut Fishing PRO Tips | Northwest Fishing Tips",
    "channel": "Northwest Fishing",
    "why": "A British Columbia guide's top five tips for a more successful halibut trip.",
    "minutes": 4.9,
    "date": "2025-04-28"
   },
   {
    "id": "i2rSP5kdsLU",
    "title": "Pacific Halibut in the Ocean Ecosystem",
    "channel": "International Pacific Halibut Commission Youtube",
    "why": "Pacific halibut biology and their place in the ocean ecosystem (International Pacific Halibut Commission).",
    "minutes": 11.1,
    "date": "2011-10-12"
   }
  ],
  "heading": "Further videos: fishing for pacific halibut"
 },
 "lingcod": {
  "kind": "fish",
  "videos": [
   {
    "id": "7fI5hPQ4s94",
    "title": "Jigging for Big Lingcod! \"Angler's Xperience Episode 24\"",
    "channel": "AnglersXperience",
    "why": "Techniques for jigging big lingcod on Pacific rock piles.",
    "minutes": 22.4,
    "date": "2013-07-20"
   },
   {
    "id": "vKubTnjRwR4",
    "title": "Lingcod Fishing Tips for Beginners",
    "channel": "BC Fishing Journal",
    "why": "Lingcod habitat, gear, lures and techniques for beginners in BC.",
    "minutes": 6.7,
    "date": "2026-05-27"
   },
   {
    "id": "8_-EryydIRM",
    "title": "How To Catch Ling Cod On a Metal Jig | SPORT FISHING",
    "channel": "sport-fishing.com",
    "why": "How to work a metal jig to trigger lingcod strikes.",
    "minutes": 3.5,
    "date": "2018-06-05"
   },
   {
    "id": "WSDP6TdKwZo",
    "title": "How to Catch Gigantic Fat Lingcod off Vancouver Island",
    "channel": "Wild Angles TV",
    "why": "Hooking and landing a huge lingcod off the west coast of Vancouver Island.",
    "minutes": 11.1,
    "date": "2024-04-01"
   }
  ],
  "heading": "Further videos: fishing for lingcod"
 },
 "kokanee": {
  "kind": "fish",
  "videos": [
   {
    "id": "CG6_0T4XxwM",
    "title": "Kokanee Fishing Tips from an Idaho Angler",
    "channel": "Idaho Fish and Game",
    "why": "A veteran kokanee angler shares his fishing secrets (Idaho Fish and Game).",
    "minutes": 7.7,
    "date": "2011-03-14"
   },
   {
    "id": "_A9FwHCKjig",
    "title": "KOKANEE TROLLING SETUP EXPLAINED | Fishing with Rod",
    "channel": "Fishing with Rod",
    "why": "The terminal tackle setups commonly used for trolling kokanee, explained.",
    "minutes": 4.1,
    "date": "2016-06-23"
   },
   {
    "id": "ptRZo8kgCfo",
    "title": "In DEPTH How To Fish For Kokanee & Trout DEEP Without Downriggers.",
    "channel": "Addicted Fishing",
    "why": "Reaching deep kokanee and trout without downriggers.",
    "minutes": 10.2,
    "date": "2019-06-25"
   },
   {
    "id": "h2LIdcQd1Vo",
    "title": "Colorado's Kokanee Salmon Spawn",
    "channel": "Colorado Parks and Wildlife",
    "why": "Colorado's fall kokanee spawning run up to a state fish hatchery (Colorado Parks and Wildlife).",
    "minutes": 6.6,
    "date": "2021-11-24"
   }
  ],
  "heading": "Further videos: fishing for kokanee"
 },
 "honey-bee": {
  "kind": "garden",
  "videos": [
   {
    "id": "sAKkjD3nEv0",
    "title": "Honey Bees Make Honey ... and Bread? | Deep Look",
    "channel": "Deep Look",
    "why": "How workers turn nectar into honey and pack pollen into \"bee bread\" to feed the colony.",
    "minutes": 4,
    "date": "2019-05-07"
   },
   {
    "id": "9ePic3dtykk",
    "title": "How Do Honeybees Get Their Jobs? | National Geographic",
    "channel": "National Geographic",
    "why": "How a worker honey bee's job changes with age, from nurse bee to forager.",
    "minutes": 3,
    "date": "2019-03-26"
   },
   {
    "id": "f6mJ7e5YmnE",
    "title": "Amazing Time-Lapse: Bees Hatch Before Your Eyes | National Geographic",
    "channel": "National Geographic",
    "why": "Time-lapse of honey bee development from egg to adult inside the comb.",
    "minutes": 1,
    "date": "2015-05-20"
   },
   {
    "id": "BJ0LiyZeaUA",
    "title": "Creating a Pollinator Friendly Habitat",
    "channel": "Royal Botanical Gardens",
    "why": "Ontario's Royal Botanical Gardens on easy ways to make a yard a pollinator haven beyond planting flowers.",
    "minutes": 4,
    "date": "2020-06-25"
   }
  ]
 },
 "bumble-bee": {
  "kind": "garden",
  "videos": [
   {
    "id": "4Q_kdk00sFk",
    "title": "Clever Queen Bumble Bees | Life In The Undergrowth | BBC Earth",
    "channel": "BBC Earth",
    "why": "David Attenborough on how a queen bumble bee starts and tends her colony on her own.",
    "minutes": 2,
    "date": "2012-06-05"
   },
   {
    "id": "SZrTndD1H10",
    "title": "This Vibrating Bumblebee Unlocks a Flower's Hidden Treasure |  Deep Look",
    "channel": "Deep Look",
    "why": "Buzz pollination: how bumble bees vibrate stubborn flowers (tomatoes are one) to shake loose their pollen.",
    "minutes": 4,
    "date": "2016-07-19"
   },
   {
    "id": "FsAOv5vrqoI",
    "title": "WPC's Native Pollinator Initiative Episode 6 - Bumble Bee Identification",
    "channel": "Wildlife Preservation Canada",
    "why": "Wildlife Preservation Canada explains bumble bee anatomy and color-pattern groups for identifying Canadian species.",
    "minutes": 7,
    "date": "2020-06-17"
   },
   {
    "id": "jowk_A71-EU",
    "title": "Why Bumble Bees Are the Fuzzy Heroes We Need",
    "channel": "PBS Terra",
    "why": "Why native bumble bees are vulnerable and how community-science surveys help protect them.",
    "minutes": 11,
    "date": "2024-04-08"
   }
  ]
 },
 "mason-bee": {
  "kind": "garden",
  "videos": [
   {
    "id": "2nDZh-S_2kw",
    "title": "Mason Bees Are A Gardener’s Best Friend | Oregon Field Guide",
    "channel": "Oregon Public Broadcasting",
    "why": "Why native mason bees are such efficient spring pollinators and how they nest in tubes.",
    "minutes": 7,
    "date": "2019-04-11"
   },
   {
    "id": "HNKDI2AWSl0",
    "title": "Welcome Orchard Mason Bees into Your Backyard Orchard",
    "channel": "UC Master Gardeners of Sacramento County",
    "why": "Master Gardeners on attracting orchard mason bees with their favorite plants and nesting sites.",
    "minutes": 5,
    "date": "2023-07-24"
   },
   {
    "id": "t5HtsikuvAU",
    "title": "How to Care For Your Mason Bees All Year Long",
    "channel": "WSU Bee Program",
    "why": "WSU bee program on the year-round care a mason bee house needs to keep the bees healthy.",
    "minutes": 18,
    "date": "2024-08-19"
   }
  ]
 },
 "hoverfly": {
  "kind": "garden",
  "videos": [
   {
    "id": "E3nLuK7D7LY",
    "title": "How Hoverflies Spawn Maggots that Sweeten Your Oranges | Deep Look",
    "channel": "Deep Look",
    "why": "Hoverfly life cycle: bee-mimicking adults pollinate while their larvae devour aphids.",
    "minutes": 4,
    "date": "2022-11-22"
   },
   {
    "id": "N-g-1Qyrk2I",
    "title": "Identifying Syrphid Fly Larvae",
    "channel": "eOrganic",
    "why": "How to recognize syrphid (hover) fly larvae on plants so you do not mistake them for pests.",
    "minutes": 4,
    "date": "2017-07-03"
   },
   {
    "id": "ycaP8isaw7o",
    "title": "Insect of the Week: Syrphid Fly",
    "channel": "UGA Extension Forsyth County",
    "why": "Extension overview of the syrphid fly, a harmless bee mimic worth a second look before you swat.",
    "minutes": 4,
    "date": "2022-10-25"
   }
  ]
 },
 "monarch": {
  "kind": "garden",
  "videos": [
   {
    "id": "NlJpxGBMwMc",
    "title": "Monarch Butterfly Life Cycle",
    "channel": "Royal Ontario Museum",
    "why": "Royal Ontario Museum walks through the egg, caterpillar, chrysalis and adult stages.",
    "minutes": 4,
    "date": "2020-08-19"
   },
   {
    "id": "bZdIyCeahXk",
    "title": "Monarch Migration and Metamorphosis | Incredible Animal Journeys | National Geographic",
    "channel": "National Geographic",
    "why": "Follows a monarch to milkweed, where her eggs hatch and transform into the next generation of butterflies.",
    "minutes": 5,
    "date": "2024-01-16"
   },
   {
    "id": "JH6UIIDWY4s",
    "title": "The 2 Best Milkweeds for Your Butterfly Garden!",
    "channel": "Backyard Ecology",
    "why": "Swamp milkweed and butterfly milkweed: the two best native milkweeds for an eastern butterfly garden.",
    "minutes": 4,
    "date": "2023-02-07"
   }
  ]
 },
 "swallowtail": {
  "kind": "garden",
  "videos": [
   {
    "id": "vl_WX8RZ4Mk",
    "title": "Swallowtail Butterfly - Insect Spotlight",
    "channel": "UMDHGIC",
    "why": "University of Maryland Extension on swallowtail caterpillars found munching garden herbs.",
    "minutes": 1,
    "date": "2018-10-02"
   },
   {
    "id": "w0pGEd2zI-E",
    "title": "Raising Black Swallowtail Butterflies",
    "channel": "WFSU Ecology",
    "why": "Black swallowtails growing from tiny caterpillars on dill, fennel and parsley to adult butterflies.",
    "minutes": 2,
    "date": "2019-01-31"
   },
   {
    "id": "5Z08-VUXICQ",
    "title": "Species Spotlight: Eastern Tiger Swallowtail",
    "channel": "Burlington County Parks",
    "why": "A park naturalist profiles the eastern tiger swallowtail's behavior and natural history.",
    "minutes": 3,
    "date": "2021-06-09"
   },
   {
    "id": "xDjaEoBTaFg",
    "title": "Attracting the Black Swallowtail Butterfly to your Garden",
    "channel": "Dave The Butterfly Guy",
    "why": "Parsley-family host plants that bring black swallowtails into the garden, plus their life cycle.",
    "minutes": 6,
    "date": "2021-07-07"
   }
  ]
 },
 "hummingbird": {
  "kind": "garden",
  "videos": [
   {
    "id": "Hqj-vQ1mpeE",
    "title": "Get To Know The Ruby-Throated Hummingbird",
    "channel": "Forest Preserve District of Will County",
    "why": "A quick profile of the ruby-throated hummingbird, the only hummingbird that breeds in eastern North America.",
    "minutes": 2,
    "date": "2024-08-24"
   },
   {
    "id": "uMdBToFqJNA",
    "title": "Male Ruby-throated Hummingbird",
    "channel": "Cornell Lab of Ornithology",
    "why": "Cornell Lab footage of a male ruby-throat's red gorget, useful for identification.",
    "minutes": 1,
    "date": "2015-06-05"
   },
   {
    "id": "W6csf8M_Su8",
    "title": "How Hummingbirds Raise Young",
    "channel": "Cornell Lab of Ornithology",
    "why": "Cornell Lab on how hummingbirds court, build tiny nests, lay eggs and raise their young.",
    "minutes": 5,
    "date": "2024-06-07"
   },
   {
    "id": "U32kA1bLhWA",
    "title": "Get It Growing: Attract hummingbirds with beautiful native plants",
    "channel": "LSU AgCenter",
    "why": "LSU AgCenter on native flowering plants that attract hummingbirds to the garden.",
    "minutes": 2,
    "date": "2023-09-21"
   }
  ]
 },
 "ladybug": {
  "kind": "garden",
  "videos": [
   {
    "id": "FCFUk4f3zXw",
    "title": "Watch Ladybugs Go From Goth to Glam | Deep Look",
    "channel": "Deep Look",
    "why": "Ladybug metamorphosis: from spiky larva to pupa to spotted adult.",
    "minutes": 5,
    "date": "2023-10-05"
   },
   {
    "id": "MzNJPSy5LkI",
    "title": "Lady Beetles Are Voracious Predators",
    "channel": "UMDHGIC",
    "why": "University of Maryland Extension on lady beetle larvae and adults as voracious aphid predators.",
    "minutes": 3,
    "date": "2023-06-08"
   },
   {
    "id": "NQQFT2xgOvU",
    "title": "Make Your Garden a Ladybug Paradise",
    "channel": "GrowVeg",
    "why": "Plants, shelter and habits that attract ladybugs and keep them in the garden.",
    "minutes": 5,
    "date": "2020-05-22"
   }
  ]
 },
 "green-lacewing": {
  "kind": "garden",
  "videos": [
   {
    "id": "0TGewDrf_EM",
    "title": "Lacewing Bachelors Vibrate to Find a Valentine | Deep Look",
    "channel": "Deep Look",
    "why": "Lacewing courtship by vibration and the aphid-eating larvae prized for pest control.",
    "minutes": 4,
    "date": "2024-11-19"
   },
   {
    "id": "1ifCLRK-H84",
    "title": "Beneficial Insect of the Week: Lacewings",
    "channel": "UGA Extension Forsyth County",
    "why": "Extension overview of lacewing eggs, larvae (\"aphid lions\") and adults as garden allies.",
    "minutes": 3,
    "date": "2021-10-19"
   },
   {
    "id": "uY5ZCgwCR18",
    "title": "Why We Love Lacewings",
    "channel": "Fruition Seeds",
    "why": "An organic seed farm in New York explains why lacewings are so valuable to growers.",
    "minutes": 2,
    "date": "2018-07-12"
   }
  ]
 },
 "praying-mantis": {
  "kind": "garden",
  "videos": [
   {
    "id": "lypnBxUETcM",
    "title": "Praying Mantis Egg Cases",
    "channel": "backyardfarmer",
    "why": "Nebraska Extension educator on mantis egg cases and the two main mantis species found there.",
    "minutes": 2,
    "date": "2020-05-01"
   },
   {
    "id": "RdYRtAHphmE",
    "title": "How to Find a Praying Mantis Egg Case 🐛 | Easy Field Guide",
    "channel": "Larry's Animal Safari",
    "why": "Where to look for Chinese and European mantis egg cases on an early-spring walk.",
    "minutes": 2,
    "date": "2020-05-09"
   },
   {
    "id": "AyEs6lpsq8A",
    "title": "Praying Mantis Hatching Timelapse",
    "channel": "Pablo Ignacio",
    "why": "Time-lapse of Chinese mantis nymphs hatching from an egg case.",
    "minutes": 2,
    "date": "2021-04-19"
   }
  ]
 },
 "ground-beetle": {
  "kind": "garden",
  "videos": [
   {
    "id": "HjY2cnfaaTA",
    "title": "Beneficial Insect of the Week: Ground Beetles",
    "channel": "UGA Extension Forsyth County",
    "why": "Extension overview of ground beetles as voracious night-time predators of garden pests.",
    "minutes": 3,
    "date": "2021-10-19"
   },
   {
    "id": "L7XOvOH2Hfc",
    "title": "Wheat School: Get by with a little help from ground beetles",
    "channel": "RealAgriculture",
    "why": "A University of Manitoba entomologist on how abundant, mostly nocturnal ground beetles control crop pests.",
    "minutes": 4,
    "date": "2023-07-27"
   },
   {
    "id": "1YtD5zvN71A",
    "title": "Caterpillar Hunter Ground Beetle",
    "channel": "Nature Forward",
    "why": "A naturalist shows the caterpillar hunter, a large ground beetle that preys on caterpillars.",
    "minutes": 1,
    "date": "2013-06-11"
   }
  ]
 },
 "braconid-wasp": {
  "kind": "garden",
  "videos": [
   {
    "id": "nZZyJQNmOV8",
    "title": "Hornworm Meets Alien",
    "channel": "PurdueExtensionEntm",
    "why": "Purdue time-lapse of braconid larvae emerging from a hornworm and spinning the white cocoons gardeners find.",
    "minutes": 2,
    "date": "2011-12-20"
   },
   {
    "id": "YlP9Udj8DhE",
    "title": "Beneficial Insect of the Week: Braconid Wasp",
    "channel": "UGA Extension Forsyth County",
    "why": "Extension overview of braconid wasps and how they parasitize caterpillars and aphids.",
    "minutes": 4,
    "date": "2021-10-20"
   },
   {
    "id": "5hD0S09p_LE",
    "title": "Aphidius wasp stings aphid (aphid mummies)",
    "channel": "Bug of the Week",
    "why": "Close-up of a tiny Aphidius (braconid) wasp stinging an aphid, the source of papery \"aphid mummies\".",
    "minutes": 2,
    "date": "2020-05-25"
   }
  ]
 },
 "garden-spider": {
  "kind": "garden",
  "videos": [
   {
    "id": "sejxps5cMm4",
    "title": "An Eight-Legged Flower in Your Garden – Argiope aurantia",
    "channel": "Backyard Ecology",
    "why": "Meet the black-and-yellow garden spider (Argiope aurantia), its zigzag web and life cycle.",
    "minutes": 4,
    "date": "2023-10-05"
   },
   {
    "id": "epczfv-EV4I",
    "title": "This Spider Will CURE Your Arachnophobia - The Garden Spider",
    "channel": "MyWildBackyard",
    "why": "A kid-friendly, up-close look at the harmless garden orb weaver and how it hunts.",
    "minutes": 7,
    "date": "2023-09-09"
   },
   {
    "id": "zNtSAQHNONo",
    "title": "Beautiful Spider Web Build Time-lapse | BBC Earth",
    "channel": "BBC Earth",
    "why": "Time-lapse of an orb spider building its web strand by strand.",
    "minutes": 5,
    "date": "2017-08-07"
   }
  ]
 },
 "earthworm": {
  "kind": "garden",
  "videos": [
   {
    "id": "gGSe1OeyAkk",
    "title": "How to Attract More Earthworms To Your Garden (& Why They Matter)",
    "channel": "Epic Gardening",
    "why": "Why earthworms matter for garden soil and simple ways to attract more of them.",
    "minutes": 10,
    "date": "2020-04-15"
   },
   {
    "id": "9ZHTerOJYMA",
    "title": "The Amazing World Of Earthworms In The UK - Springwatch - BBC",
    "channel": "BBC",
    "why": "A Natural History Museum worm curator explains why earthworms are the planet's recyclers.",
    "minutes": 5,
    "date": "2012-06-06"
   },
   {
    "id": "sx4Ssk8IpaE",
    "title": "North America’s Destructive, Invasive… Earthworms",
    "channel": "SciShow",
    "why": "Most earthworms in Canada and the northern US are introduced, and why that matters for forests.",
    "minutes": 6,
    "date": "2020-12-14"
   },
   {
    "id": "C8m119EmdDQ",
    "title": "Asian Jumping Worms – Another Forest Foe",
    "channel": "Penn State Extension",
    "why": "Penn State Extension on recognizing invasive jumping worms and avoiding spreading them.",
    "minutes": 5,
    "date": "2022-12-12"
   }
  ]
 },
 "aphid": {
  "kind": "garden",
  "videos": [
   {
    "id": "vrzalLssomg",
    "title": "Born Pregnant: Aphids Invade With an Onslaught of Clones | Deep Look",
    "channel": "Deep Look",
    "why": "How aphids give birth to live clones and multiply so quickly.",
    "minutes": 5,
    "date": "2021-03-09"
   },
   {
    "id": "RhzliamCHAI",
    "title": "Aphids and Natural Pest Control on Coral Honeysuckle",
    "channel": "UMDHGIC",
    "why": "University of Maryland Extension on letting natural enemies control an aphid outbreak.",
    "minutes": 2,
    "date": "2024-05-03"
   },
   {
    "id": "mVdou1MJCAE",
    "title": "Foolproof Aphid Control and Prevention",
    "channel": "Epic Gardening",
    "why": "Practical aphid control and prevention for home gardeners without harsh chemicals.",
    "minutes": 10,
    "date": "2022-03-17"
   }
  ]
 },
 "tomato-hornworm": {
  "kind": "garden",
  "videos": [
   {
    "id": "q9mz-wKfylI",
    "title": "Tomato Hornworms: ID the moth and caterpillar eating my tomatoes",
    "channel": "UMDHGIC",
    "why": "University of Maryland Extension on identifying the hornworm caterpillar, its damage and the sphinx moth.",
    "minutes": 5,
    "date": "2020-07-31"
   },
   {
    "id": "bHUnFFtuJEU",
    "title": "Tomato & Tobacco Hornworm",
    "channel": "Integrated Pest Management",
    "why": "Iowa State Extension entomologist on telling tomato and tobacco hornworms apart and managing them.",
    "minutes": 9,
    "date": "2020-04-22"
   },
   {
    "id": "GiwEnAi95RU",
    "title": "The Life Cycle Of A Hornworm…and my unexpected friendship with a moth",
    "channel": "growithjessie",
    "why": "A gentle, family-friendly look at the full hornworm life cycle, raised through to the sphinx moth.",
    "minutes": 7,
    "date": "2024-05-31"
   }
  ]
 },
 "cabbage-white": {
  "kind": "garden",
  "videos": [
   {
    "id": "XYBWpQtU0zQ",
    "title": "Imported Cabbageworm Management",
    "channel": "Utah State University Extension",
    "why": "Utah State Extension on identifying and managing imported cabbageworm on brassicas.",
    "minutes": 5,
    "date": "2024-01-25"
   },
   {
    "id": "nFNCga4oHS8",
    "title": "Imported Cabbageworm",
    "channel": "UC Master Gardener Program of Sonoma County",
    "why": "Master Gardener ID of cabbageworm larvae and the white adult butterfly, with UC IPM tips.",
    "minutes": 4,
    "date": "2021-11-17"
   },
   {
    "id": "lkZL0ZD4tXY",
    "title": "Imported cabbageworm - insect pests",
    "channel": "Seattle Urban Farm Co",
    "why": "Scouting broccoli and other brassicas for cabbageworm damage before it gets out of hand.",
    "minutes": 4,
    "date": "2021-05-16"
   }
  ]
 },
 "colorado-potato-beetle": {
  "kind": "garden",
  "videos": [
   {
    "id": "-vAOIE4z6JQ",
    "title": "Colorado Potato Beetle: munching your garden away",
    "channel": "UMDHGIC",
    "why": "University of Maryland Extension on identifying Colorado potato beetles and limiting their damage.",
    "minutes": 5,
    "date": "2020-06-04"
   },
   {
    "id": "h8ioz6FWeZA",
    "title": "Non-chemical methods for managing Colorado Potato Beetle",
    "channel": "U of M Extension Small Farms",
    "why": "University of Minnesota Extension trial of five non-chemical strategies for Colorado potato beetle.",
    "minutes": 11,
    "date": "2022-01-11"
   },
   {
    "id": "pikRwjallUE",
    "title": "Garden Insects: Colorado Potato Beetle (ID and Organic Management)",
    "channel": "Fruition Seeds",
    "why": "Identification and organic management of Colorado potato beetle in a vegetable garden.",
    "minutes": 4,
    "date": "2017-06-29"
   }
  ]
 },
 "squash-bug": {
  "kind": "garden",
  "videos": [
   {
    "id": "68ZwcRr9J78",
    "title": "Squash Bug Management",
    "channel": "Utah State University Extension",
    "why": "Utah State Extension on squash bug biology and integrated management.",
    "minutes": 6,
    "date": "2021-06-28"
   },
   {
    "id": "fO0dBlhz8ko",
    "title": "Identifying the Squash Bug & Eggs 100%: Start Looking Now! - Prevention & Treatment Link",
    "channel": "Gary Pilarchik (The Rusted Garden)",
    "why": "How to spot squash bug eggs, nymphs and adults early, before numbers build.",
    "minutes": 3,
    "date": "2017-07-01"
   },
   {
    "id": "3MZ_4R5GDC4",
    "title": "How to Prevent and Kill SQUASH BUGS",
    "channel": "Next Level Gardening",
    "why": "Prevention and organic control tactics for squash bugs in the home garden.",
    "minutes": 7,
    "date": "2021-06-19"
   }
  ]
 },
 "squash-vine-borer": {
  "kind": "garden",
  "videos": [
   {
    "id": "KIHeMtkF98Y",
    "title": "Managing Squash Vine Borer in Cucurbit Crops",
    "channel": "The Ohio State University IPM Program",
    "why": "Ohio State IPM on squash vine borer life cycle, monitoring and management in cucurbits.",
    "minutes": 6,
    "date": "2021-05-29"
   },
   {
    "id": "ZuEaqKa6nJ4",
    "title": "Squash Vine Borer",
    "channel": "MU Extension Integrated Pest Management",
    "why": "University of Missouri Extension garden-hour segment on squash vine borer biology and management.",
    "minutes": 3,
    "date": "2023-09-13"
   },
   {
    "id": "Fq4hPQTjPYo",
    "title": "Get Rid Of Squash Vine Borers For Good!",
    "channel": "Epic Gardening",
    "why": "Finding vine borer eggs, \"squash surgery\" to remove larvae, and other ways to protect squash.",
    "minutes": 13,
    "date": "2024-07-18"
   }
  ]
 },
 "japanese-beetle": {
  "kind": "garden",
  "videos": [
   {
    "id": "yc6MFToD-zU",
    "title": "Japanese Beetle Life Cycle",
    "channel": "Penn State Extension",
    "why": "Penn State Extension on the Japanese beetle life cycle, from lawn grub to adult.",
    "minutes": 5,
    "date": "2017-08-29"
   },
   {
    "id": "aEUfoW1Yrz8",
    "title": "How to Get Rid of Japanese Beetles",
    "channel": "The University of Maine",
    "why": "University of Maine Cooperative Extension on managing Japanese beetles in the home garden.",
    "minutes": 6,
    "date": "2010-07-29"
   },
   {
    "id": "kKDil9WoEgg",
    "title": "Best Way to Control Japanese Beetles",
    "channel": "Garden Fundamentals",
    "why": "Ontario garden educator Robert Pavlis compares five common control methods and how to identify the beetles.",
    "minutes": 14,
    "date": "2024-07-20"
   }
  ]
 },
 "slug": {
  "kind": "garden",
  "videos": [
   {
    "id": "1zpCoaG73MM",
    "title": "Get Slugs out of your Garden!",
    "channel": "Oregon State University Extension Service",
    "why": "Oregon State Extension tips for getting slugs out of the garden.",
    "minutes": 2,
    "date": "2020-06-30"
   },
   {
    "id": "7yNuKiqhjco",
    "title": "Slugs in the Garden | Integrated Pest Management",
    "channel": "UWyoExtension",
    "why": "University of Wyoming Extension on an integrated pest management approach to garden slugs.",
    "minutes": 2,
    "date": "2015-09-23"
   },
   {
    "id": "VJvUwkFZeOM",
    "title": "How to Stop Slugs Eating Your Plants (100% Organic)",
    "channel": "GrowVeg",
    "why": "Organic slug control: barriers, traps, encouraging predators and garden timing.",
    "minutes": 13,
    "date": "2022-05-28"
   }
  ]
 },
 "cucumber-beetle": {
  "kind": "garden",
  "videos": [
   {
    "id": "RSzTT_gbma4",
    "title": "Early season management of cucumber beetles and bacterial wilt on pumpkin and squash",
    "channel": "The Ohio State University IPM Program",
    "why": "Ohio State IPM on early-season cucumber beetle management to prevent bacterial wilt.",
    "minutes": 5,
    "date": "2021-05-04"
   },
   {
    "id": "NzMqok1xySY",
    "title": "Cucumber Beetles",
    "channel": "Integrated Pest Management",
    "why": "Iowa State Extension on striped and spotted cucumber beetles, their damage and management.",
    "minutes": 12,
    "date": "2020-04-27"
   },
   {
    "id": "PfzG_mWxWRo",
    "title": "Cucumber Bacterial Wilt Time-Lapse",
    "channel": "PurdueExtensionEntm",
    "why": "Purdue time-lapse of bacterial wilt, the disease cucumber beetles spread to cucurbits.",
    "minutes": 1,
    "date": "2019-10-15"
   }
  ]
 },
 "flea-beetle": {
  "kind": "garden",
  "videos": [
   {
    "id": "11LNyfQnCB4",
    "title": "Better Know a Pest: Flea Beetles",
    "channel": "CCE Cornell Vegetable Program",
    "why": "Cornell Cooperative Extension quick guide to flea beetles and their shot-hole damage.",
    "minutes": 2,
    "date": "2017-05-24"
   },
   {
    "id": "Ck3IFFUlF2Q",
    "title": "How to Spot and Control Flea Beetles",
    "channel": "Utah State University Extension",
    "why": "Utah State Extension on spotting flea beetle damage and controlling it.",
    "minutes": 3,
    "date": "2020-09-16"
   },
   {
    "id": "bhB82zKAO1Y",
    "title": "How to Get Rid of Flea Beetles (Natural Flea Beetle Control)",
    "channel": "Seedtime",
    "why": "Natural, low-input flea beetle control for home vegetable gardens.",
    "minutes": 4,
    "date": "2018-08-13"
   }
  ]
 },
 "spider-mite": {
  "kind": "garden",
  "videos": [
   {
    "id": "jG5L0lHlh08",
    "title": "Managing Spider Mite Mayhem with the Purdue Plant Doctor",
    "channel": "PurdueExtensionEntm",
    "why": "The Purdue Plant Doctor on diagnosing and managing spider mites.",
    "minutes": 6,
    "date": "2023-09-03"
   },
   {
    "id": "31ktEhMkzKU",
    "title": "Spider Mites",
    "channel": "K-State Extension",
    "why": "K-State Extension on recognizing spider mites and their damage on tomato plants.",
    "minutes": 2,
    "date": "2009-10-14"
   },
   {
    "id": "bqCBIP9TmcY",
    "title": "Super Simple Spider Mite Control and Prevention",
    "channel": "Epic Gardening",
    "why": "Simple spider mite control and prevention for garden and container plants.",
    "minutes": 9,
    "date": "2022-06-02"
   }
  ]
 },
 "cutworm": {
  "kind": "garden",
  "videos": [
   {
    "id": "9YDkPbz3vd4",
    "title": "Grow It Green: Cutworms",
    "channel": "WMUR-TV",
    "why": "A New Hampshire TV gardening segment on recognizing cutworms and dealing with them.",
    "minutes": 3,
    "date": "2021-06-15"
   },
   {
    "id": "kMe73lC2eZM",
    "title": "Ways To Deal With Cutworms And 2 DIY Ways To Make Cutworm Collars",
    "channel": "Midwest Gardener",
    "why": "How to make cutworm collars two ways, plus other simple tactics to protect transplants.",
    "minutes": 5,
    "date": "2020-05-09"
   },
   {
    "id": "pHyV7hu5wSA",
    "title": "How to Control Cutworms in the Garden",
    "channel": "Rescue My Plant with Dr. D",
    "why": "Diagnosing mysterious night-time chewing damage and finding the cutworms hiding in the soil.",
    "minutes": 4,
    "date": "2023-01-05"
   }
  ]
 },
 "earwig": {
  "kind": "garden",
  "videos": [
   {
    "id": "TPQdGOHeYQk",
    "title": "Beneficial Insect of the Week: Earwigs",
    "channel": "UGA Extension Forsyth County",
    "why": "Extension look at earwigs as helpful predators that can also nibble plants.",
    "minutes": 6,
    "date": "2021-10-15"
   },
   {
    "id": "tlgpfCT0wYo",
    "title": "How to Trap Earwigs",
    "channel": "Utah State University Extension",
    "why": "Utah State Extension demonstrates simple traps for monitoring and reducing earwigs.",
    "minutes": 7,
    "date": "2011-08-12"
   },
   {
    "id": "px83Yalh2Us",
    "title": "Get Rid of Earwigs With These 2 Traps!",
    "channel": "Epic Gardening",
    "why": "Two easy homemade earwig traps for the vegetable garden.",
    "minutes": 7,
    "date": "2020-05-13"
   },
   {
    "id": "to9XCRSHRV0",
    "title": "Do earwigs climb into your ears and lay eggs?",
    "channel": "OkState Ag",
    "why": "An Oklahoma State entomology professor busts the myth that earwigs crawl into ears.",
    "minutes": 1,
    "date": "2020-01-28"
   }
  ]
 }
};

export const FISH_FILMS: Record<string, FishFilm[]> = {
 "walleye": [
  {
   "id": "Xs6IpW5HpDA",
   "title": "NWT Fall Walleye on Great Slave Lake! | Whack and stack | Yellowknife Walleye Fishing",
   "channel": "Vincent But",
   "why": "A Yellowknife angler shows fall walleye coming out of cover to feed on Great Slave Lake, NWT.",
   "minutes": 23.9,
   "date": "2026-09-28",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "UacM9iRho5Y",
   "title": "September on Lake Winnebago Is DIFFERENT! | Walleye Fishing",
   "channel": "DanKirkOutdoors",
   "why": "A Lake Winnebago, Wisconsin, angler shows how the walleye bite changes in September and where to find fish.",
   "minutes": 17.6,
   "date": "2026-09-15",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "enWFBW5MOQM",
   "title": "Fall Walleye MAP BREAKDOWN | Devils Lake ",
   "channel": "Jason Mitchell Outdoors",
   "why": "Jason Mitchell marks a Devils Lake, ND map for fall walleyes, covering current, rock and green weeds from early to late fall.",
   "minutes": 20.6,
   "date": "2026-09-11",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "gySL2Qwn1sM",
   "title": "🔥 Walleye & Sauger ATTACK!! 💥 Allegheny River (Summer)",
   "channel": "Your Fishing Adventure",
   "why": "Summer jig fishing for walleye and sauger in the Pittsburgh pool of the Allegheny River.",
   "minutes": 8.1,
   "date": "2026-07-14",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "f0zq1sZPVoA",
   "title": "Finding Summer Walleye On Lake St. Clair (Livescope Bottom Bouncers)",
   "channel": "Thereeljbake",
   "why": "How to find summer walleye on Lake St. Clair by locating weed beds quickly, with live-scope footage and bottom bouncers.",
   "minutes": 12.6,
   "date": "2026-07-10",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "W5NWFmPKsa4",
   "title": "Bottom Bouncer and Spinner Walleye | Lake Sakakawea",
   "channel": "Jason Mitchell Outdoors",
   "why": "Bottom bouncer and spinner harness walleye trolling on North Dakota's big reservoir Lake Sakakawea.",
   "minutes": 6.2,
   "date": "2026-06-27",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "bb26RSAA9Ck",
   "title": "Targeting Springtime Walleye in Green Bay, WI 🧀",
   "channel": "Nick Lindner",
   "why": "Nick Lindner targets spring walleyes in Green Bay, Wisconsin, with jigs and live bait.",
   "minutes": 18.4,
   "date": "2026-04-16",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "JKovEbronys",
   "title": "Spring Walleyes on 🔥 in this Montana Reservoir!",
   "channel": "Montana Walleye Angler",
   "why": "Spring walleyes in shallow Montana reservoir water: trolling cranks and spinners or pitching jigs as water warms.",
   "minutes": 12.6,
   "date": "2026-04-14",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "lFIiS6WeCvI",
   "title": "Location, Lures, Trolling Program. Full walleye report from April 2026 on Lake Erie.",
   "channel": "George “DirschOnTheWater” Dirscherl",
   "why": "A Lake Erie guide breaks down the location, lures, trolling program and conditions for April walleye.",
   "minutes": 10.3,
   "date": "2026-04-12",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "EBvIBphVcfA",
   "title": "Insane Walleye Bite On Lake Nipissing | Tips to Find More Fish (Ice Fishing)",
   "channel": "KVG Fishing",
   "why": "An early-ice outing on Lake Nipissing, Ontario, with tips for finding walleye using a spoon tipped with a minnow head.",
   "minutes": 15.4,
   "date": "2026-01-18",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "ZEhnePHoNp0",
   "title": "Jerkbait DEMOLISHED by Monster Ohio River Walleye! (Winter Walleye Fishing)",
   "channel": "5050 Fishing",
   "why": "Shore fishing winter walleye on the Ohio River with swimmers and jerkbaits along current seams and eddies.",
   "minutes": 14,
   "date": "2025-12-12",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "mwTdJXYF9fM",
   "title": "ALLEGHENY RIVER! Walleye, Sauger & Smallmth (Fall)",
   "channel": "Your Fishing Adventure",
   "why": "Jigging fall walleye, sauger and smallmouth on the Allegheny River within Pittsburgh using a moon eye jig and Gulp.",
   "minutes": 8.8,
   "date": "2025-11-25",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Why6U7L2SJU",
   "title": "The Most Incredible Fall Walleye Fishing ",
   "channel": "Jason Mitchell Outdoors",
   "why": "Jason Mitchell breaks down fall walleye patterns and locations at Lake Winnipeg's Hecla bottleneck in Manitoba.",
   "minutes": 20.5,
   "date": "2025-10-25",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "_NHXXHuEY1I",
   "title": "Catching MONSTER Tennessee Walleye in September!",
   "channel": "Suburbanhunt365",
   "why": "Late-September walleye fishing below Cordell Hull Dam on Tennessee's Cumberland River.",
   "minutes": 12.7,
   "date": "2025-10-20",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "yyQi24so2ms",
   "title": "Aggressive Late Ice Walleye (Lake Winnipeg) with BIG Plastics and Active Baits",
   "channel": "Justin Jenken Assorted Meats",
   "why": "Late-ice walleye on Lake Winnipeg with big plastics and active baits just before the Manitoba ice season closes.",
   "minutes": 25.1,
   "date": "2025-03-27",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "DCgwtUyYUzE",
   "title": "Ice Fishing Saginaw Bay For Walleye",
   "channel": "Reel Obsession",
   "why": "Ice fishing Saginaw Bay for walleye and jumbo perch in 18-21 feet using spoons, jigging raps and minnows.",
   "minutes": 12,
   "date": "2025-02-05",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "0kKpRHVoR34",
   "title": "Ice Fishing for Giant Walleyes on the Bay of Quinte",
   "channel": "Cast and Conquer",
   "why": "First-ice walleye fishing on Ontario's Bay of Quinte, where big fish roam open water.",
   "minutes": 26.6,
   "date": "2025-01-14",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "ntRmjbncDSU",
   "title": "Jigging Fall Walleye (Lake of the Woods N/W Angle)",
   "channel": "Johnny Goodrich",
   "why": "Jigging fall walleyes at Lake of the Woods' Northwest Angle in late September as the leaves turn.",
   "minutes": 21.1,
   "date": "2024-09-15",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "bJx-_03nW4Q",
   "title": "Banks Lake Post Spawn Walleye (4K)",
   "channel": "Angler West TV",
   "why": "Guides explain post-spawn walleye on Banks Lake, Washington, in early summer using Smile Blades, Hot Wings and SD Hitches.",
   "minutes": 22.7,
   "date": "2024-07-04",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "b_l2vSOZz8U",
   "title": "Early Spring Walleyes at Mobridge (Lake Oahe)",
   "channel": "Bloemendaal Fishing",
   "why": "Pre-spawn walleyes at Mobridge on Lake Oahe, South Dakota, in early spring.",
   "minutes": 17.7,
   "date": "2024-04-16",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "xeQ4iJUWLjg",
   "title": "Rainy River Spring Walleye How To",
   "channel": "Jason Mitchell Outdoors",
   "why": "Jason Mitchell explains spring walleye on the Rainy River, spot-locking current seams and casting jigs with paddle shads.",
   "minutes": 22.5,
   "date": "2024-04-12",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "7An63J_XRkA",
   "title": "Winning Walleye Strategy on the Bay of Quinte",
   "channel": "WhetterFishing",
   "why": "A Quinte charter captain explains how to troll for the big walleyes that move in from Lake Ontario as water cools.",
   "minutes": 8,
   "date": "2023-12-23",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "loJfwY2bp1E",
   "title": "OHIO RIVER FISHING - Spring Walleye, Sauger, and Smallmouth!",
   "channel": "5050 Fishing",
   "why": "Spring Ohio River walleye, sauger and smallmouth with a local who grew up fishing the river.",
   "minutes": 12.8,
   "date": "2023-04-16",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "qVeJg1gHI58",
   "title": "SPRING WALLEYE PATTERNS BREAKDOWN | Stockton Lake",
   "channel": "In Depth Angling",
   "why": "A breakdown of spring walleye patterns, holding locations and baits on Stockton Lake in Missouri.",
   "minutes": 17,
   "date": "2023-02-25",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "gjEkYOOo2LQ",
   "title": "Washington Ice Walleye",
   "channel": "WA Fish Quest",
   "why": "An ice-fishing look at catching walleye through the ice in Washington.",
   "minutes": 6.5,
   "date": "2022-02-02",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "dm2LgxrvtQA",
   "title": "Early Ice Walleyes in Mobridge, SD (Lake Oahe)",
   "channel": "Flatty Outdoors",
   "why": "Early-ice walleyes at Mobridge, South Dakota, on Lake Oahe.",
   "minutes": 22.4,
   "date": "2022-01-09",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "-INckyPX5TA",
   "title": "Cranking Summer Walleye on the Bay of Quinte",
   "channel": "The Fish'n Canada Show",
   "why": "Fish'n Canada shows how to cast crankbaits for mid-summer walleye around weeds on the Bay of Quinte.",
   "minutes": 21.1,
   "date": "2022-01-08",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "ejOSe5ritbU",
   "title": "Rainy Lake Mid Summer Walleye",
   "channel": "OutdoorBoundTV",
   "why": "Rainy Lake guides target mid-summer walleyes moving from post-spawn shallows to deeper humps with jigs and Lindy Rigs.",
   "minutes": 21.3,
   "date": "2021-04-19",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "glDkzDWCArA",
   "title": "How To Fish For Spring Walleye On Allegheny River",
   "channel": "STEP OUTDOORS",
   "why": "Bucktail jigs and paddle tails for spring walleye on the Allegheny River in Pennsylvania.",
   "minutes": 8.6,
   "date": "2021-04-13",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "l28uExmGzf0",
   "title": "How To Fish For Winter Walleye On Allegheny River",
   "channel": "STEP OUTDOORS",
   "why": "Fishing bucktail jigs for winter walleye on the Allegheny River in western Pennsylvania.",
   "minutes": 6.8,
   "date": "2020-12-11",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "RzMXDXH6POw",
   "title": "Fall Walleye Fishing Lake Roosevelt (4-8 lbers))",
   "channel": "Matt Trudgeon",
   "why": "Fishing blade baits for heavily feeding fall walleyes on Lake Roosevelt in Washington.",
   "minutes": 7,
   "date": "2019-12-22",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  }
 ],
 "smallmouth-bass": [
  {
   "id": "QQoSXtXm0QU",
   "title": "The fall smallmouth bite IS HERE! (Mille Lacs Lake)",
   "channel": "Sam Rardin Fishing",
   "why": "Explains the October fall transition of smallmouth on Mille Lacs as water cools and baitfish move.",
   "minutes": 15.5,
   "date": "2026-10-01",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "ULkM9SLLeuE",
   "title": "Hammering Fall Lake Oahe Smallmouth Bass",
   "channel": "Nick Harrington",
   "why": "Catching quality smallmouth on Lake Oahe, South Dakota, in fall with Rapala Jigging Raps.",
   "minutes": 17.4,
   "date": "2026-09-21",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "lcEfBK6e-r8",
   "title": "How to Catch BIG Summer Smallmouth in Door County! (Full Day Breakdown)",
   "channel": "CThuss Fishing",
   "why": "A full-day breakdown of locating and adjusting to catch summer smallmouth on Sturgeon Bay in Door County, Wisconsin.",
   "minutes": 20.4,
   "date": "2026-07-12",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "N_4IAyi6pi0",
   "title": "How to Find & Catch Maine Bass (Full 2-Day Summer Guide!)",
   "channel": "Hobbyist Fishing",
   "why": "A two-day July guide to the summer patterns for smallmouth and largemouth in Maine, including deep rocky structure.",
   "minutes": 29.9,
   "date": "2026-07-08",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "KftSLX0puhE",
   "title": "Juniata River Smallmouth from the Kayak",
   "channel": "Everyman Angling ",
   "why": "Searching out post-spawn smallmouth on Pennsylvania's Juniata River from a kayak in June.",
   "minutes": 20.7,
   "date": "2026-06-19",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "BXsAl_iULxM",
   "title": "Le meilleur spot à achigan sur la Rivière des Mille-Îles ?",
   "channel": "Charles Duguay",
   "why": "Opening-day bass fishing on Quebec's Rivière des Mille-Îles: finding weeds, structure and shallow edges from a kayak.",
   "minutes": 14.4,
   "date": "2026-06-16",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "SypxY82wi-M",
   "title": "Mille Lacs Fishing Report (April 2026, Ice Out Smallmouth Bass)",
   "channel": "Lagoona Guide Service / Capt. Ryan Kelly",
   "why": "A Mille Lacs, Minnesota, guide reports April ice-out techniques and patterns for smallmouth.",
   "minutes": 7.2,
   "date": "2026-04-23",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "FqFbiYnrfzg",
   "title": "Smallies Smashfest on Texoma",
   "channel": "Nai's Guide Service ",
   "why": "A spring outing for smallmouth on Lake Texoma with a 16.5-pound best five.",
   "minutes": 28.8,
   "date": "2026-04-09",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "Z3XW7bEwe_E",
   "title": "Fall on Lake Erie = GIANT SMALLMOUTH- Dave Mercer's Facts of Fishing THE SHOW Season 18 EP#8",
   "channel": "Dave Mercer",
   "why": "Dave Mercer chases big fall smallmouth on Lake Erie as the bait moves and the wind picks up.",
   "minutes": 22.4,
   "date": "2026-02-10",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "7Sp2Jq9ajuQ",
   "title": "Fall Smallmouth Bass Fishing (Jerkbaits on the Upper Potomac River)",
   "channel": "YouTubeFISHINGVIDS",
   "why": "Fall smallmouth on the upper Potomac River using jerkbaits after Ned rigs and drop shots failed.",
   "minutes": 8.7,
   "date": "2025-11-10",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Rm1UJaPVT68",
   "title": "NONSTOP ACTION! Fall Smallmouth Fishing the Ohio River!",
   "channel": "5050 Fishing",
   "why": "October smallmouth fishing on the Ohio River, finding schools of aggressive bronzebacks.",
   "minutes": 14.6,
   "date": "2025-10-23",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Gwz84aGbprw",
   "title": "Lake Simcoe Fall GIANTS! Round 2 – Chasing Monster Smallmouth Bass",
   "channel": "NorthernHookSets",
   "why": "Chasing giant fall smallmouth on Lake Simcoe, Ontario, with local guide Fish Crazy Pete.",
   "minutes": 8.6,
   "date": "2025-10-09",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "6GkEoFsjqxo",
   "title": "Dropshotting Kawartha Lakes Smallmouth Bass",
   "channel": "2B Fishing Guiding Service",
   "why": "Dropshotting for Kawartha Lakes smallmouth in Ontario with a variety of soft baits in late summer.",
   "minutes": 12.2,
   "date": "2025-08-27",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "UtlP2AeuQaE",
   "title": "Understanding the spring to summer transition on Mille Lacs (SMALLMOUTHBASS)",
   "channel": "Sam Rardin Fishing",
   "why": "How Mille Lacs smallmouth shift from shallow spring spots to mid-depth and deeper areas as water hits the mid-70s.",
   "minutes": 5.7,
   "date": "2025-07-12",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "kMJpucJGfco",
   "title": "Potomac River Smallmouth Bass - Spring Fishing in Wild & Wonderful WV!",
   "channel": "Double D Fishing Adventures",
   "why": "Wade fishing the Potomac River in West Virginia for spring smallmouth with an X-Rap jerkbait.",
   "minutes": 11.5,
   "date": "2025-06-16",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "lgxwP12VS1M",
   "title": "How to Catch Big Smallmouth Bass Wading PA Creeks in the Summer!",
   "channel": "Everyman Angling ",
   "why": "How to wade Pennsylvania creeks and rivers like the Susquehanna for big summer smallmouth.",
   "minutes": 23.1,
   "date": "2025-06-08",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "xHhN5-Yb940",
   "title": "Catching BIG Smallmouth Bass! - Spring River Fishing in West Virginia",
   "channel": "Double D Fishing Adventures",
   "why": "Spring river smallmouth on the Shenandoah in West Virginia using Ned rigs and a Battle Bug.",
   "minutes": 18.1,
   "date": "2025-05-27",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "EdqQ3ZI4qQ0",
   "title": "Lake Erie Summer Smallmouth Bass Fishing",
   "channel": "Pautzke Bait",
   "why": "A Lake Erie guide service shows how it catches quality smallmouth bass on the border waters in summer.",
   "minutes": 8.5,
   "date": "2024-08-22",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "oDoZo_9s-dM",
   "title": "Fishing the BEST Smallmouth River in West Virginia!! (New River)",
   "channel": "Wv.Bassin",
   "why": "Camping and floating West Virginia's New River for smallmouth, using Ned rigs, topwater and a white spinnerbait.",
   "minutes": 11.9,
   "date": "2024-08-19",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "jvU5TV4oG1g",
   "title": "Knife Lake Smallmouth Bass Fishing - BWCA Canoe Trip and Fishing Tips",
   "channel": "Lure of the Wild",
   "why": "A three-day Boundary Waters canoe trip on Knife Lake with topwater smallmouth and fishing tips.",
   "minutes": 11.3,
   "date": "2024-07-30",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "vYK5QDrnghk",
   "title": "Battling the WIND for Summer SMALLMOUTH Bass | Lewis & Clark Lake",
   "channel": "Midwest Bass Hunter",
   "why": "Summer smallmouth on Lewis & Clark Lake, South Dakota, on a windy morning.",
   "minutes": 15,
   "date": "2024-07-06",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "bluY5I-BXOQ",
   "title": "How to Catch Trophy Smallmouth Bass In Sturgeon Bay | Spring and Beyond",
   "channel": "Wired2Fish",
   "why": "A Sturgeon Bay, Wisconsin, guide explains step by step how to find and catch trophy smallmouth through the spring.",
   "minutes": 12.4,
   "date": "2024-06-04",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "6LCLZoDJ6Vo",
   "title": "St Lawrence River/Lake Ontario Spring fishing baits.",
   "channel": "Ditch Fishing ",
   "why": "Spring jerkbait and swimbait patterns for smallmouth on the St. Lawrence River and Lake Ontario, and finding the warmest flats.",
   "minutes": 13.2,
   "date": "2024-05-03",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "gw2S7s6WBxs",
   "title": "Dale Hollow Winter Smallmouth Fishing | Float N Fly",
   "channel": "eFishin'",
   "why": "Fishing Dale Hollow in December with the Float N Fly, an East Tennessee winter smallmouth tradition.",
   "minutes": 12.2,
   "date": "2023-12-18",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "swiFoQyn060",
   "title": "Fall Transition Bass Fishing on Lake Champlain!",
   "channel": "ReelNorthernBass",
   "why": "Explains how and why to fish specific areas for fall-transition bass on Lake Champlain.",
   "minutes": 19.1,
   "date": "2023-10-20",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "rTIDKVxU11s",
   "title": "Smallmouth bass fishing on Susquehanna River. Spring 2023.",
   "channel": "Fishy Angler",
   "why": "A spring day of smallmouth fishing on the Susquehanna River in clear water.",
   "minutes": 30.3,
   "date": "2023-04-23",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "_MniuNs6jzw",
   "title": "Pulling Late Fall Smallmouth from Great Pond, Belgrade Lakes Region, Maine",
   "channel": "SteveChen Fishing",
   "why": "Pulling late-fall smallmouth on a swimbait from Great Pond in Maine's Belgrade Lakes region.",
   "minutes": 6.1,
   "date": "2022-10-28",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "V864Nc57WeM",
   "title": "You're Missing These Fish | Fall Pattern River Smallmouth on the Susquehanna River",
   "channel": "Riverman",
   "why": "Fall-pattern river smallmouth on the Susquehanna River, including jerkbait setup and lessons on missed fish.",
   "minutes": 19.3,
   "date": "2022-10-23",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "8pdm2hFh0pM",
   "title": "Fall Smallmouth Fishing With Jeff Gustafson (A-Rig, Flutter Spoon, Minnow)",
   "channel": "Lake of The Woods Sports Headquarters",
   "why": "Jeff Gustafson shows how to catch fall smallmouth on deep Lake of the Woods reefs with an A-rig, flutter spoon and minnow.",
   "minutes": 17.7,
   "date": "2022-10-16",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Pr-g-KSvv9g",
   "title": "This Southern Missouri Stream holds MASSIVE Smallmouth (Summertime Wade Fishing)",
   "channel": "Tyler Bartlett",
   "why": "Wade fishing a southern Missouri Ozark stream for big summer smallmouth, with tips on exploring new water.",
   "minutes": 14.7,
   "date": "2022-07-24",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "ajzgcpJ2Gtc",
   "title": "How to Catch BIG SMALLMOUTH BASS on Lake St. Clair in the Spring!",
   "channel": "Reel Obsession",
   "why": "A Lake St. Clair trip in late April shows how to find and catch big spring smallmouth bass.",
   "minutes": 13.8,
   "date": "2022-04-23",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "aNBzHzUQ0Yg",
   "title": "Looking for Big Pre-Spawn Smallmouth Bass | Nova Scotia Fishing",
   "channel": "Maritime Pursuit",
   "why": "Fishing pre-spawn smallmouth in Nova Scotia from a jon boat.",
   "minutes": 11.9,
   "date": "2021-05-31",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "do9Wq1N8vPw",
   "title": "Catching Big Pre-Spawn Smallmouth on Dale Hollow Lake with Guide and Author Bobby Gentry",
   "channel": "Kentucky Afield",
   "why": "Kentucky Afield fishes Dale Hollow Lake with a guide for big pre-spawn smallmouth.",
   "minutes": 7.6,
   "date": "2021-04-20",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "P-6XRORzUR0",
   "title": "Spring SMALLMOUTH Bass FISHING Massachusetts!",
   "channel": "Bassin' Mass",
   "why": "Spring smallmouth fishing in Massachusetts with a Rapala Shadow Rap.",
   "minutes": 5.7,
   "date": "2021-04-14",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "P3agl0Js_qc",
   "title": "Late Fall Smallmouth Fishing on Lake Ontario with Epic Eric!",
   "channel": "SmallmouthCrush",
   "why": "Late-fall smallmouth on Lake Ontario and the St. Lawrence River, where the bigger fish came shallow.",
   "minutes": 14.1,
   "date": "2020-11-15",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "w6OrMfPJBEc",
   "title": "October Swimbait Smallies On Dale Hollow",
   "channel": "Old B Fishing",
   "why": "Throwing a swimbait for early-October smallmouth on Dale Hollow, finding a point holding several fish.",
   "minutes": 13.3,
   "date": "2020-10-15",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "3c-pIYlnYaA",
   "title": "Lake of the Woods Smallmouth Bass Whackfest - COLD-WATER SECRETS REVEALED!!",
   "channel": "Jamie Bruce Fishing",
   "why": "Cold-water tactics for smallmouth on just-thawed Lake of the Woods in northwestern Ontario in early May.",
   "minutes": 6.5,
   "date": "2020-05-06",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "_NKc496wOEA",
   "title": "BEST Technique for Winter Smallmouth at Dale Hollow",
   "channel": "Kentucky Afield",
   "why": "Kentucky Afield visits Dale Hollow Lake to show the best technique for catching winter smallmouth.",
   "minutes": 7.9,
   "date": "2018-11-20",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "winter"
   ]
  }
 ],
 "largemouth-bass": [
  {
   "id": "ytxjyxbt7Nw",
   "title": "Catching largemouth bass in Utah lake on a Texas rig (Tips on what to use to catch Utah lake Bass)",
   "channel": "Fish-N-Fairways ",
   "why": "Tips on baits for Utah Lake largemouth, mostly a Texas-rigged craw plus a ChatterBait, in late September.",
   "minutes": 13.6,
   "date": "2026-09-30",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "45ptZOkWhug",
   "title": "Getting FROGGY for Canadian Largemouth Bass",
   "channel": "Uncut Angling",
   "why": "Kayak frog fishing for rare Manitoba largemouth.",
   "minutes": 12.3,
   "date": "2026-09-30",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "ZG3FgbLZZBg",
   "title": "The Reel John Pearl Guide Service & Gcj Baits Tips & Tricks Fall Fishing on Clearlake",
   "channel": "G-Ratt Baits",
   "why": "A Clear Lake, California, guide shares fall lure selection and techniques for bass.",
   "minutes": 17.9,
   "date": "2026-09-18",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "ldwWIqYo-1U",
   "title": "Early September at Roosevelt Lake, AZ - Time for a Buzz Bait?",
   "channel": "Fishing with Johnny Johnson",
   "why": "Early September buzzbait fishing at Arizona's Roosevelt Lake.",
   "minutes": 21.5,
   "date": "2026-09-07",
   "regions": [
    "deserts"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "kL0UySOXUxo",
   "title": "Ho To Catch Bigger Bass This Summer!",
   "channel": "In Deep on the Delta with Steve Cooper",
   "why": "How to catch bigger California Delta bass in summer when numbers are good but sizes disappoint.",
   "minutes": 20.5,
   "date": "2026-08-25",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Y63E3IptyMU",
   "title": "Norris Lake Summer Bass Giants That Will Blow Your Mind",
   "channel": "Jesse",
   "why": "Where to find and how to catch Norris Lake's biggest summer bass, with the lures that are working.",
   "minutes": 20.7,
   "date": "2026-08-23",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "sCcPVH1aVVI",
   "title": "Catching BIG BASS • The Secret to Lake Mead Bass Fishing in Summer!",
   "channel": "Noah Sanford",
   "why": "Lake Mead summer bass: the grass types to target, where to look and why shallow grass holds fish.",
   "minutes": 27.6,
   "date": "2026-08-08",
   "regions": [
    "deserts"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "3DI4jiHXfSk",
   "title": "BCOSF Season 16 Ep 4 | Osoyoos Bass | Early-Season Largemouth Action on Canada's Warmest Lake",
   "channel": "BCOSF TV",
   "why": "Early-season largemouth action on Osoyoos Lake in British Columbia's South Okanagan, one of Canada's warmest lakes.",
   "minutes": 22.1,
   "date": "2026-07-26",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "N_4IAyi6pi0",
   "title": "How to Find & Catch Maine Bass (Full 2-Day Summer Guide!)",
   "channel": "Hobbyist Fishing",
   "why": "A two-day July guide to the summer patterns for largemouth and smallmouth in Maine.",
   "minutes": 29.9,
   "date": "2026-07-08",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "kbN3q1pqVzw",
   "title": "THE SHOWDOWN | Lake of the Ozarks Summer Bass Fishing",
   "channel": "BigBassNation",
   "why": "Summer bass on Missouri's Lake of the Ozarks: main-lake points with a jig, deep crankbait and ribbon-tail worm.",
   "minutes": 21,
   "date": "2026-07-03",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "JAVCdl2CAg0",
   "title": "BASS Fishing NORRIS LAKE For BIG PRE-SPAWNERS, April 2026",
   "channel": "Champion Jigs Outdoors",
   "why": "Norris Lake, Tennessee, in April: topwater and an Alabama rig for big pre-spawn bass.",
   "minutes": 14.6,
   "date": "2026-04-16",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "rZkwYU120wo",
   "title": "How To Fish New Lakes for Spring Prespawn Largemouth Bass (Wisconsin)",
   "channel": "CThuss Fishing",
   "why": "How to fish new Wisconsin glacial lakes for prespawn largemouth: where to find them and what to throw.",
   "minutes": 7.6,
   "date": "2026-04-16",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "5KEH7WGzpZY",
   "title": "Lake Toho Bass Fishing THIS WEEK | How To fish Lake Toho when it’s WINDY ",
   "channel": "Capt. Erik Tilson ",
   "why": "A Lake Toho guide shows his favorite technique for catching Florida bass when the wind is up in March.",
   "minutes": 14.2,
   "date": "2026-03-20",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "QEcg3IpUrFY",
   "title": "Cracking Kentucky Lake's Winter Bass Pattern",
   "channel": "The Tin Horse Monty Fishing",
   "why": "Kentucky Lake's winter bass pattern: finding current breaks and fishing them with an A-rig.",
   "minutes": 20.5,
   "date": "2026-01-23",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "ln2jVZaqCrY",
   "title": "Florida Cold Weather Bass Fishing | Winter Bass Fishing Tips That WORK",
   "channel": "Beyond Headwaters",
   "why": "A Florida guide explains how largemouth react to cold fronts and falling water temperatures, and the winter tactics that still catch fish.",
   "minutes": 8.4,
   "date": "2026-01-09",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "We2CCmE-cAg",
   "title": "Top 5 Arizona Winter Bass Fishing Lakes",
   "channel": "Josh Bertrand Fishing",
   "why": "A ranked list of the top Arizona winter bass lakes, from Saguaro and Roosevelt to Havasu and Pleasant.",
   "minutes": 10,
   "date": "2025-11-25",
   "regions": [
    "deserts"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "yECWamUNj_A",
   "title": "Key Baits For Fishing The Fall Transition + Fishing On Lake Guntersville!",
   "channel": "TacticalBassin",
   "why": "Key baits for the fall transition, fished on a day on Alabama's Lake Guntersville.",
   "minutes": 31.4,
   "date": "2025-09-17",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "_LLananxgPo",
   "title": "Kentucky Lake Bass Fishing Report | September 12, 2025",
   "channel": "BRANDON HUNTER FISHING ",
   "why": "A detailed September bass report for Kentucky Lake with where and how the fish are biting.",
   "minutes": 13.1,
   "date": "2025-09-12",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "j77Y_CDfHWE",
   "title": "RICE LAKE BASS IN THICK WEEDS- Great bass lakes",
   "channel": "Extreme Angler Media",
   "why": "Weed-dunking for bass on Ontario's Rice Lake, covering baits, rods and hotspots in thick summer weeds.",
   "minutes": 19.4,
   "date": "2025-08-31",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Zsvt6GRjukQ",
   "title": "LAKE of the WOODS /// Sioux Narrows (Largemouth Bass | Northern Pike)",
   "channel": "Different Fins",
   "why": "Kayak fishing for largemouth bass near Sioux Narrows on Lake of the Woods, Ontario, in August.",
   "minutes": 17.5,
   "date": "2025-08-12",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "xmgkOes1v0w",
   "title": "Summer Bass on Guntersville – Here’s Where I Always Find Them",
   "channel": "HuntXcoop",
   "why": "Where to find summer bass on Alabama's Lake Guntersville on a hot, calm day.",
   "minutes": 12.3,
   "date": "2025-06-19",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "ZbOIsCLkogM",
   "title": "Top 3 Baits and Techniques for June on Toledo Bend and Sam Rayburn (Catch More Summer Bass!)''",
   "channel": "CG Whack Em'",
   "why": "The top three June techniques on Toledo Bend and Sam Rayburn: Carolina rig, drop shot and spoon.",
   "minutes": 9.2,
   "date": "2025-06-16",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "NQKLojjtO54",
   "title": "Nobody Talks About This CRAZY Vancouver Island Fishery… Here’s How We Caught Them",
   "channel": "WhetterFishing",
   "why": "Fishing for largemouth bass on Vancouver Island, a fishery few expect, and how they were caught in May.",
   "minutes": 6,
   "date": "2025-05-30",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "Xl9rjElvUTA",
   "title": "Spring Potomac River Bass Fishing",
   "channel": "SautterFishing",
   "why": "Spring bass on the tidal Potomac River, where finding the better grass was key, using chatterbaits and spinnerbaits.",
   "minutes": 13.4,
   "date": "2025-05-01",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "LweoSK61L3o",
   "title": "BIG Michigan Largemouth Bass In The Spring | Fishing Tips & Tricks",
   "channel": "Reel Obsession",
   "why": "Locating and catching Michigan largemouth in spring with swimbaits, jerkbaits, tubes and chatterbaits.",
   "minutes": 10.9,
   "date": "2025-04-15",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "KcVxMzkFsrs",
   "title": "Catching Largemouth Bass in the Winter?? (Boundary Dam, Saskatchewan)",
   "channel": "TTang Outdoors",
   "why": "Targeting largemouth in early March on Saskatchewan's Boundary Dam reservoir, kept open by a power plant's warm water.",
   "minutes": 24,
   "date": "2025-03-14",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "IdGr4AmmAB4",
   "title": "The BEST WAY To Catch BASS (Fishing The Florida Spawn)",
   "channel": "Mark Daniels Jr.",
   "why": "Mark Daniels Jr. breaks down how he'd work a Florida lake during the spawn, cycling baits before settling on flipping.",
   "minutes": 26.1,
   "date": "2025-03-02",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "cfU6UCqcEQk",
   "title": "Tenkiller Wintertime Bass",
   "channel": "Outdoor Oklahoma",
   "why": "Pro Fred Roumbanis fishes Oklahoma's Lake Tenkiller in January with an umbrella rig and jerkbaits.",
   "minutes": 12.5,
   "date": "2025-02-10",
   "regions": [
    "central-hardwoods",
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "qXblKxz2OSE",
   "title": "Late Fall/Winter Bass Fishing - Western Washington - Tips & Tricks to catch BIG bass Fall - Winter",
   "channel": "BassFeed TV",
   "why": "Tips for catching big bass in Western Washington in late fall and winter.",
   "minutes": 20.8,
   "date": "2024-11-27",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "fall",
    "winter"
   ]
  },
  {
   "id": "Ragbrv3YMI4",
   "title": "CENTRAL ST. JOHNS RIVER BASS: Simple Summer Tactics!!!!",
   "channel": "Camp & Cast Outdoors",
   "why": "Flipping, cranking and worming for summer bass on the central St. Johns River in Florida.",
   "minutes": 11.7,
   "date": "2024-06-13",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "onFRUwoOBdk",
   "title": "CRUSHING prespawn bass on BIG swimbaits in MASSACHUSETTS",
   "channel": "Graham Hallman",
   "why": "Big swimbaits for pre-spawn largemouth on a small western Massachusetts lake in mid-April.",
   "minutes": 29.1,
   "date": "2024-04-20",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "9SmLNPqcIlw",
   "title": "Springtime Bass Fishing Secrets for Lake Fork with Lee Livesay",
   "channel": "FishermansHandbook",
   "why": "Pro Lee Livesay shares his springtime bass fishing secrets for Texas' Lake Fork.",
   "minutes": 4.7,
   "date": "2024-01-15",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "LWVemtf6hHw",
   "title": "Lake Fork Winter Jig Fishing Tips: The Secret 90% Of Us Don't Use To Get Big Winter Bass To Bite!!!",
   "channel": "YourLakeForkGuide",
   "why": "A Lake Fork guide shares winter jig tips for getting big cold-water bass to bite in East Texas.",
   "minutes": 19.4,
   "date": "2024-01-03",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "1lNk-FjB_bo",
   "title": "Winter Fishing Lake Hartwell!",
   "channel": "Brandon Cobb Fishing",
   "why": "Winter bass fishing on Lake Hartwell, with a few tips for cold-water conditions.",
   "minutes": 8.1,
   "date": "2023-12-04",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "0jqx4RpNlZM",
   "title": "Fall Top Water Frog Blow Ups for Big Largemouth Bass | Leech Lake MN",
   "channel": "Jason Mitchell Outdoors",
   "why": "Jason Mitchell and a Northland rep throw topwater frogs in rice and pads for big Leech Lake, Minnesota, bass in late September.",
   "minutes": 20.6,
   "date": "2023-10-12",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Ew2bG5LFxEM",
   "title": "HOW to catch GIANT Harris chain BASS in the SUMMER! *93 degree water!*",
   "channel": "Captain Drews Guide Service",
   "why": "How to catch big Harris Chain bass in central Florida's hot-tub-warm water in August.",
   "minutes": 11.9,
   "date": "2023-09-22",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "NZyXaXuRG0o",
   "title": "Lake St Clair Summer Bass Fishing Tips And Techniques",
   "channel": "Live 2 Fish",
   "why": "Summer tips for Lake St. Clair largemouth seeking dark, cool cover and ambush points in the heat.",
   "minutes": 11.2,
   "date": "2023-07-21",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "lnobjpFbTrw",
   "title": "My Favorite Lake to Fish for Large Mouth Bass in Utah.",
   "channel": "Bait'n Bullets",
   "why": "A summer day fishing Utah's Pelican Lake for largemouth bass.",
   "minutes": 21.6,
   "date": "2023-07-14",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "MWotJpQj5f0",
   "title": "The Three Best Springtime Baits for the Cal Delta",
   "channel": "Bass Angler Magazine",
   "why": "Mark Lassagne shares his three go-to springtime baits for the California Delta.",
   "minutes": 4,
   "date": "2023-05-16",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "1E3gDLjtq1s",
   "title": "How To- Springtime Crankin Lake Tapps",
   "channel": "bassnquack",
   "why": "Springtime crankbait fishing on Western Washington's Lake Tapps, with a breakdown of what worked.",
   "minutes": 22.4,
   "date": "2023-04-11",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "zi26Vnh9ZzU",
   "title": "The Best Baits to Throw on Toledo Bend During The Fall",
   "channel": "Lance Duff",
   "why": "Lance Duff covers the lures that have caught him the most largemouth in the fall on Toledo Bend.",
   "minutes": 8.1,
   "date": "2022-11-13",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "qMpP6jRFhhI",
   "title": "BIG Michigan BASS are LOADED in the Lake - Fall Bass FIshing Tips",
   "channel": "Extreme.Outdoorsmen",
   "why": "Michigan fall largemouth tips from an inland lake, throwing a click bait and punch bait.",
   "minutes": 10.2,
   "date": "2022-10-24",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "rjkHqllQdVw",
   "title": "Long Lake Summer Largemouth 2021",
   "channel": "Northeast Fishing Adventures",
   "why": "Finding summer largemouth on Long Lake in Maine, where stick worms around shallow docks beat boat traffic.",
   "minutes": 18.4,
   "date": "2022-07-07",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "VDMuM_EgP-A",
   "title": "Beautiful BC Bass Fishing | All you need to know!",
   "channel": "Reel West Coast",
   "why": "A guide to bass fishing in British Columbia, a relatively new fishery, with a crash course for beginners.",
   "minutes": 20.8,
   "date": "2022-07-05",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "8zl5drhP1n0",
   "title": "I Caught my PB Largemouth Bass!!",
   "channel": "Manitoba Fishing Adventures",
   "why": "Prefishing Manitoba's Shoal Lake in July for largemouth, hooking over a dozen.",
   "minutes": 17.4,
   "date": "2022-07-05",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "SSoTs0H-jdI",
   "title": "Lake Fork Summer Bass Fishing Tips: Top Secret Offshore Technique That 90% Of Anglers Don't Use!!!",
   "channel": "YourLakeForkGuide",
   "why": "A Lake Fork guide demonstrates an offshore technique for catching summer bass in East Texas.",
   "minutes": 15.2,
   "date": "2022-06-20",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "gJzjyZUtIoM",
   "title": "Summer TOPWATER Fishing for Bass - Bass Fishing Lake Havasu, Arizona",
   "channel": "Matt Luna Fishing",
   "why": "Summer topwater and jig fishing for bass on Lake Havasu, Arizona.",
   "minutes": 14,
   "date": "2022-06-08",
   "regions": [
    "deserts"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "zd9xR8N2nNU",
   "title": "5 Spring Patterns That Work (Table Rock Lake)",
   "channel": "The Tin Horse Monty Fishing",
   "why": "Five spring patterns for locating bass in Ozark lakes such as Table Rock and Bull Shoals.",
   "minutes": 22.1,
   "date": "2022-04-08",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "sa_eBwXjo3M",
   "title": "Winter Bass Fishing on the California Delta",
   "channel": "Greg Blanchard",
   "why": "Winter bass on the California Delta: crankbait and jig choices for the cooler months.",
   "minutes": 20.6,
   "date": "2021-12-09",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "tJWpg6rdFbE",
   "title": "Fall Bass Breakdown | Lake of the Ozarks",
   "channel": "In Depth Angling",
   "why": "A section-by-section breakdown of fall bass patterns, baits and techniques on Missouri's Lake of the Ozarks.",
   "minutes": 18.5,
   "date": "2021-10-19",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "A3VSFCvhna0",
   "title": "Easy Potomac River Bass fishing pattern low tide for bass",
   "channel": "GTX Outdoors",
   "why": "A tidal Potomac River jig pattern for bass at low tide, with full gear details.",
   "minutes": 8,
   "date": "2021-10-13",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "356-GGfHg0s",
   "title": "HOW TO FISH FOR FALL LARGEMOUTH BASS- New episode!",
   "channel": "Extreme Angler Media",
   "why": "How to fish late-season largemouth on Northern Ontario lakes with heavy power gear, heavy line and bug baits.",
   "minutes": 27.8,
   "date": "2021-10-01",
   "regions": [
    "boreal-forest",
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "aP35zCctqQ8",
   "title": "How to catch Guntersville BASS in the spring time!",
   "channel": "JacobWallFishing",
   "why": "How to locate and catch Lake Guntersville, Alabama, bass around the spring spawn, including frogs.",
   "minutes": 14.2,
   "date": "2021-04-27",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "A1A6bmRPVLI",
   "title": "Catching Spring Bass at Lake Pleasant (Episode 25)",
   "channel": "Dlaw Fishing",
   "why": "An April afternoon on Lake Pleasant, Arizona, graphing and catching spawning largemouth on Senkos.",
   "minutes": 24,
   "date": "2021-04-14",
   "regions": [
    "deserts"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "a14J0xtWihk",
   "title": "Ultimate Guide to California Delta Bass Fishing Spring Strategies for Largemouth Success",
   "channel": "Bass Angler Magazine",
   "why": "Strategies, gear and techniques for catching California Delta largemouth in spring.",
   "minutes": 23,
   "date": "2021-03-23",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "olIgLSFJOxk",
   "title": "Prespawn Bass at Lake Pleasant? (Episode 17)",
   "channel": "Dlaw Fishing",
   "why": "Checking whether the prespawn has started at Arizona's Lake Pleasant after a snowstorm.",
   "minutes": 18.3,
   "date": "2021-02-04",
   "regions": [
    "deserts"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "gCtq9rr3WHg",
   "title": "DOUGLAS LAKE: Fishing Flats for Fall Largemouth Bass",
   "channel": "Ryan Epps Fishing",
   "why": "Targeting flats for fall largemouth on East Tennessee's Douglas Lake in mid-October with crankbaits.",
   "minutes": 23.4,
   "date": "2019-11-01",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "WNUpN285M_c",
   "title": "Locating and Catching Colorado Summer Largemouth Bass",
   "channel": "Mountain State Angler",
   "why": "Where to locate Colorado summer largemouth and which lures work in the heat.",
   "minutes": 12.6,
   "date": "2019-08-16",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "uS-8KfkqkZA",
   "title": "How to catch bass in the heat of summer in the grass - Bass Fishing the Chesapeake Bay Flats!",
   "channel": "SmallmouthCrush",
   "why": "How to catch bass in summer heat in the grass on the Chesapeake Bay and Susquehanna Flats.",
   "minutes": 17.3,
   "date": "2018-07-06",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "summer"
   ]
  }
 ],
 "northern-pike": [
  {
   "id": "r6qh4ieU1PE",
   "title": "3 Days Pike Fishing, Camping, and Exploring Fort Peck Montana! SWO",
   "channel": "Scott Went Outside",
   "why": "Three days of pike fishing and camping on Montana's Fort Peck in June.",
   "minutes": 24.3,
   "date": "2026-06-13",
   "regions": [
    "western-mountains",
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "5iuxZ8i_2u4",
   "title": "Lake Pend Oreille Pike: Dead Baiting for \"WATER WOLVES\" on Idaho's Largest Lake + CATCH AND COOK",
   "channel": "Weekend Viking Outdoors",
   "why": "Dead-baiting early-spring pike in the shallow bays of Idaho's Lake Pend Oreille, with a catch and cook.",
   "minutes": 16.4,
   "date": "2026-03-13",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "1CKrkhMPvJA",
   "title": "Ice fishing Quinte | Northern pike on SMALL BAITS!!",
   "channel": "The Next Pool Up",
   "why": "Ice fishing the Bay of Quinte in Ontario, where small baits drew a northern pike bite.",
   "minutes": 5.7,
   "date": "2026-02-02",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "dCe90WRZMxY",
   "title": "Ice Fishing for Pike on a Michigan No Size Limit Pike Lake",
   "channel": "Brunner Fishing Posse",
   "why": "Ice fishing for pike on one of Michigan's no-size-limit pike lakes.",
   "minutes": 13.6,
   "date": "2026-01-04",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "a7Hgpn9BDBA",
   "title": "Jeff Gustafson Chases Fall Pike on Lake of the Woods | Lund Boats",
   "channel": "Lund Boats",
   "why": "Pro Jeff Gustafson shares his top strategies and baits for fall trophy pike on Lake of the Woods.",
   "minutes": 7.3,
   "date": "2025-09-03",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "erT2E0LG_n4",
   "title": "Absolute Pike Smash fest! | 150+ pike on Great Slave Lake",
   "channel": "Vincent But",
   "why": "Tossing soft plastics low and slow for summer pike on Great Slave Lake near Yellowknife.",
   "minutes": 20.1,
   "date": "2025-07-20",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "P1vZ40HGjz8",
   "title": "St. Lawrence River Fishing: Targeting Walleye & Northern Pike",
   "channel": "Ieuan Harrison fishing ",
   "why": "A guide service targets walleye and pike on the St. Lawrence River in June.",
   "minutes": 17.6,
   "date": "2025-06-19",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "vqvWW1xvPdc",
   "title": "Lake Simcoe Perch & Georgian Bay Pike | Early Spring 2025 Fishing",
   "channel": "Citybassboy",
   "why": "Throwing jerkbaits and glidebaits for pike at Honey Harbour on Georgian Bay in early spring.",
   "minutes": 14.3,
   "date": "2025-05-08",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "hZk6VeCazeY",
   "title": "Fall Pike Fishing Jerk Baits & Live Bait / Northern Pike, Largemouth Bass & Smallmouth Bass Fishing",
   "channel": "Reel Michigan Anglers",
   "why": "Fall pike fishing in Michigan with jerkbaits and live bait while the crowds chase king salmon.",
   "minutes": 17.5,
   "date": "2024-10-08",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Uolun0WqgM4",
   "title": "Fall Pike Fishing in Northern Ontario Back Lake",
   "channel": "Scott McLeod",
   "why": "Trolling the shoreline of a northern Ontario back lake for fall pike and bass.",
   "minutes": 11.9,
   "date": "2024-09-22",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "bnMFUKF1pMA",
   "title": "Topwater & Swimbait Pike Fishing [CATCH & COOK]",
   "channel": "Northwest Outdoors",
   "why": "Topwater and swimbait pike fishing on Idaho's Lake Pend Oreille, with the steps to catch, clean and cook.",
   "minutes": 12.1,
   "date": "2024-08-22",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "CU3AHW_2Jd8",
   "title": "CRUSHING IT on the St. Lawrence River!!!  - Pike, Bass, Perch, and some UNEXPECTED Catches!!!",
   "channel": "Water & Woods Family Videos",
   "why": "A four-day spring trip for northern pike and perch on New York's St. Lawrence River.",
   "minutes": 22.6,
   "date": "2024-05-25",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "MigeNaoH_JI",
   "title": "Tip Up Pike Fishing | Fort Peck, Montana",
   "channel": "Jason Mitchell Outdoors",
   "why": "Jason Mitchell explains tip-up fishing for big pike on Montana's Fort Peck Reservoir.",
   "minutes": 11.9,
   "date": "2024-01-10",
   "regions": [
    "western-mountains",
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "X9PjDghXDiM",
   "title": "Fishing Northern Pike Heaven in Saskatchewan Canada",
   "channel": "Lu Ran Outdoors",
   "why": "Fishing from shore for spring pike on opening day at Buffalo Pound Lake, Saskatchewan.",
   "minutes": 23.4,
   "date": "2023-05-24",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "mo8irAxT7tM",
   "title": "Ice Fishing for Big Pike | Everything you need to know!",
   "channel": "Clayton Schick Outdoors",
   "why": "Everything you need to know to catch pike and big pike through the ice, from a Manitoba ice angler.",
   "minutes": 25.2,
   "date": "2023-02-06",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "jHk4G63GbpY",
   "title": "Ice Fishing and Slamming Pike in VERY Shallow Water!",
   "channel": "Clayton Schick Outdoors",
   "why": "Ice fishing very shallow water for pike on rod and reel with artificial baits at Neso Lake Lodge, Manitoba.",
   "minutes": 40.6,
   "date": "2022-01-10",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "mJa4BK_YzKg",
   "title": "Fishing Long Point Bay Northern Pike (Post Spawn Gators)",
   "channel": "Averie Rose",
   "why": "Fishing post-spawn northern pike in Long Point Bay on Lake Erie in May.",
   "minutes": 10.4,
   "date": "2021-05-21",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "YZeLAjvFePY",
   "title": "Ice Fishing for giant Northern Pike on Lake Diefenbaker Saskatchewan",
   "channel": "Daryl Gilbert Outdoors",
   "why": "Ice fishing for giant northern pike on Lake Diefenbaker, Saskatchewan, in March.",
   "minutes": 16.4,
   "date": "2021-03-18",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "Q0SVT4ZPdsY",
   "title": "Fall Northern Pike Fishing on Great Slave Lake, Northwest Territories - Fish'N The Arctic S1Ep2",
   "channel": "Ryan Gregory",
   "why": "Fall northern pike on Great Slave Lake in the Northwest Territories, at the end of summer or start of winter.",
   "minutes": 21.9,
   "date": "2020-12-18",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "tCHgigUXNUI",
   "title": "Northern Ontario Spring Pike Fishing Guide",
   "channel": "True North Angling",
   "why": "Late May and early June spring pike tips and footage from the Timmins area of northern Ontario.",
   "minutes": 16.3,
   "date": "2019-06-10",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "Llo2BZ-uVYY",
   "title": "FISH'N THE ARCTIC - Ep.1 - GREAT SLAVE LAKE - SPRING PIKE",
   "channel": "Ryan Gregory",
   "why": "Hunting big spring pike on Great Slave Lake, NWT, just after ice-out on Yellowknife Bay.",
   "minutes": 27.7,
   "date": "2019-05-01",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "TT1W7kBdQHM",
   "title": "Tip Ups and Big PIKE (Ice Fishing Devils Lake, North Dakota) #bigpike #tipuppike",
   "channel": "Jason Mitchell Outdoors",
   "why": "Jason Mitchell shares tricks for finding and catching trophy pike on tip-ups at Devils Lake, North Dakota.",
   "minutes": 20.7,
   "date": "2019-01-16",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "KtZwmnyEbAo",
   "title": "Lake Ontario Pike thru the ICE",
   "channel": "BFSC Fishing",
   "why": "A rare chance to ice fish for northern pike on Lake Ontario when the lake freezes.",
   "minutes": 12,
   "date": "2018-01-23",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  }
 ],
 "muskellunge": [
  {
   "id": "_eEVXTpL-6I",
   "title": "Muskies were Chewing!! - Northern Wisconsin Musky Fishing!!",
   "channel": "Todays Angler",
   "why": "A fast July afternoon of musky fishing in northern Wisconsin with big topwater and swimming baits.",
   "minutes": 22.1,
   "date": "2026-08-09",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Cgs4CgB1yqs",
   "title": "Summer River Musky Fishing in PA!! (Monster Surprise Catch)",
   "channel": "Absolute Unit Media",
   "why": "Summer river musky fishing in Pennsylvania with a surprise catch.",
   "minutes": 9.1,
   "date": "2026-07-20",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Z6pSBiBZUSQ",
   "title": "Leech Lake Muskie Fishing: Finding Fish in the Weeds",
   "channel": "AnglingBuzz",
   "why": "Pete Maina explains how to find Leech Lake, Minnesota, muskies in weeds, weedline transitions and thicker cover.",
   "minutes": 3.3,
   "date": "2026-07-01",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "10bAYeL0nsE",
   "title": "I CAUGHT A GIANT!! Lake St. Clair Musky Opener 2026",
   "channel": "The Outdoor Conquest",
   "why": "Opening the 2026 Lake St. Clair musky season in June, regrouping after a tough first day to find action.",
   "minutes": 13.1,
   "date": "2026-06-13",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "XkSKEQzoDOc",
   "title": "SPRING MUSKY FISHING NORTHERN WISCONSIN!! - River Muskies in a Small Boat",
   "channel": "Angling Anarchy",
   "why": "Spring river muskies in northern Wisconsin from a small boat, with the swimbait and bucktail that fooled 38-44 inch fish.",
   "minutes": 20,
   "date": "2026-06-06",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "sX8Ir3epvhA",
   "title": "Fishing the Potomac River for GIANT Musky | Dam #5 (Clear Spring, Maryland)",
   "channel": "drewsscientific_sidequests",
   "why": "Working the water below Dam #5 on Maryland's Potomac River for a giant spring musky.",
   "minutes": 6.3,
   "date": "2026-05-24",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "R4eQa-izNjM",
   "title": "This Musky Came Out of NOWHERE! (Cave Run, KY)",
   "channel": "Aqua Beasts RJ",
   "why": "Two days at Cave Run Lake, Kentucky, grinding for southern muskies in late October.",
   "minutes": 16.9,
   "date": "2025-10-30",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "aelbC9rfK74",
   "title": "Early Fall River Fishing in PENNSYLVANIA for MUSKY!! (Allegheny River)",
   "channel": "DemonOutdoors",
   "why": "An early-fall trip for muskies on Pennsylvania's Allegheny River that paid off with a nice fish.",
   "minutes": 6.2,
   "date": "2025-10-14",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "-BsIeW1ntV0",
   "title": "This Ohio Spillway was Filled with TROPHY Muskie!! (New PB)",
   "channel": "Peresie Outdoors",
   "why": "Trophy muskies at a well-known Ohio spillway in October, including one that struck four times.",
   "minutes": 13.3,
   "date": "2025-10-03",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "go_glF7Alw4",
   "title": "Season 3 Episode 7: Muskie Moon Over Mille Lacs",
   "channel": "The Next Bite",
   "why": "The Next Bite fishes a night bite for trophy muskies on Minnesota's Mille Lacs under the moon.",
   "minutes": 17.6,
   "date": "2025-07-31",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "LwUAuZIUN68",
   "title": "Fishing in a Four day Musky Competition",
   "channel": "Cast and Conquer",
   "why": "Four days of fall musky tournament fishing on Ontario's Ottawa and St. Lawrence rivers.",
   "minutes": 38.9,
   "date": "2024-11-09",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "cYMLaWvgxKs",
   "title": "Come LEARN Insane LAKE OF THE WOODS (musky ed.)",
   "channel": "Pascaloutdoors",
   "why": "A two-week musky film on Lake of the Woods in late September with in-depth information and live captures.",
   "minutes": 31,
   "date": "2024-09-28",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Tnip2gtm0Q8",
   "title": "Musky Fishing With Ohio's Best Guide  -  Casting To a Giant",
   "channel": "Dark 30 Outdoors",
   "why": "A day casting for Ohio muskies with a guide, who calls out fish to present to.",
   "minutes": 12.3,
   "date": "2024-06-13",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "IAPQpu5RXaU",
   "title": "MONSTER MUSKY: how to catch them!",
   "channel": "GOFISHJIM",
   "why": "A longtime guide shares techniques for monster muskies on the Niagara River and Lake Erie, filmed in fall.",
   "minutes": 15.1,
   "date": "2023-11-06",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "vUTnjAmFvXU",
   "title": "Fall Musky fishing Lake St. Clair",
   "channel": "Blue Collar Angling",
   "why": "Fall musky fishing on Lake St. Clair during the last days of the season.",
   "minutes": 11.2,
   "date": "2023-10-28",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "8QXcpgglgBA",
   "title": "All Muskies, All the Time - Lake Chautauqua, NY",
   "channel": "The Fresh Angle",
   "why": "A Chautauqua Lake, NY, all-day musky charter captain explains what it takes to boat hundreds of muskies a year.",
   "minutes": 12.3,
   "date": "2023-08-04",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "18KINlsv1MM",
   "title": "EARLY SPRING MUSKY HUNT!! - Early Season Ohio Muskie Fishing",
   "channel": "Angling Anarchy",
   "why": "Early-season spring musky fishing in Ohio in March.",
   "minutes": 10.2,
   "date": "2023-03-25",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "iCngWfDQ7GY",
   "title": "Secret Muskies of The Appalachian Wilderness",
   "channel": "Absolute Unit Media",
   "why": "Late-winter musky fishing on a free-flowing Appalachian river at 40 degrees, finding fish in slower pools.",
   "minutes": 8.4,
   "date": "2023-02-14",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "Rxrrt0SCJ44",
   "title": "ST. CLAIR MUSKYS IN THE MIDDLE OF THE LAKE!!!",
   "channel": "Todays Angler",
   "why": "A guide shows how to find Lake St. Clair muskies in the middle of the lake in September.",
   "minutes": 19.2,
   "date": "2022-09-18",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "oC6qLIWJ_68",
   "title": "Fall musky locations! WHITEBOARD BREAKDOWN for shield lakes!",
   "channel": "54 or Bust / Musky Fishing ",
   "why": "Four October spots to find fall muskies on Northwestern Ontario shield lakes, as fish leave their summer areas.",
   "minutes": 12.4,
   "date": "2022-04-24",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "mAD8MECKut4",
   "title": "SPRING TO SUMMER MUSKY FISHNG TACTICS! Whiteboard breakdown of shield lake spring and summer areas!",
   "channel": "54 or Bust / Musky Fishing ",
   "why": "Whiteboard breakdown of adjacent spring and summer musky areas on Canadian Shield lakes, with baits and reasons.",
   "minutes": 22.6,
   "date": "2022-04-10",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring",
    "summer"
   ]
  },
  {
   "id": "PrvRQdg5mig",
   "title": "West Virginia MUSKY Fishing is EPIC!!! (ft. SG Angling)",
   "channel": "Absolute Unit Media",
   "why": "Early-spring musky fishing on a West Virginia mountain river, hiking in to fish cold water.",
   "minutes": 13.7,
   "date": "2022-04-03",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "tctnZO6wlSA",
   "title": "Bank Fishing MUSKIES in Late WINTER with GLIDE BAITS",
   "channel": "Absolute Unit Media",
   "why": "Bank fishing western Pennsylvania creek muskies in late winter with glide baits near fallen trees.",
   "minutes": 10.9,
   "date": "2022-02-28",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "4dVMZuONaw8",
   "title": "GIANT FALL MUSKY | Minnesota Muskie Fishing | INTENSE FIGHT!!!",
   "channel": "Sota Scouting",
   "why": "A fat 49-inch fall musky on a Phantom Ghost-Tail in Minnesota, with notes on fall musky fishing.",
   "minutes": 11.4,
   "date": "2019-10-04",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "fall"
   ]
  }
 ],
 "lake-trout": [
  {
   "id": "yG-jZxDdkf0",
   "title": "Lake Trout in MN are Slept On...",
   "channel": "Fish Frostbite",
   "why": "Late-summer lake trout fishing on a northern Minnesota lake with tungsten jigs, before the September 30 close.",
   "minutes": 13.7,
   "date": "2026-09-01",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "blYBOy6FRso",
   "title": "Great Bear Lake Fishing: 33-Pound Lake Trout, Arctic Grayling & Char",
   "channel": "Lure of the Wild",
   "why": "Great Bear Lake lodge trip showing how big arctic lake trout are targeted in summer, with grayling and char.",
   "minutes": 32.9,
   "date": "2026-08-24",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "4IP7CGQUU0M",
   "title": "Kayak Fishing for Lake Trout | Lake Champlain 2026",
   "channel": "TMO Fishing",
   "why": "Kayak jigging Lake Champlain lake trout in July, using spot lock to hold over fish.",
   "minutes": 13.1,
   "date": "2026-07-16",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "MulA_jxcaE4",
   "title": "Searching for Giant East Arm Lake Trout | Great Slave Lake Ice fishing | Multi Species",
   "channel": "Vincent But",
   "why": "Ice fishing Great Slave Lake's East Arm for giant lake trout, with spots and presentations for the far north.",
   "minutes": 25.5,
   "date": "2026-03-08",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "mFcbOa3enR0",
   "title": "Ice Fishing Lake Trout in New York’s Finger Lakes (On-Ice Tactics That Work!)",
   "channel": "Pautzke Bait",
   "why": "Pautzke covers on-ice tactics for lake trout in New York's Finger Lakes.",
   "minutes": 8.8,
   "date": "2026-02-18",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "R4vIq-zdmks",
   "title": "Ice Fishing Lake Champlain for INSANE LAKE TROUT BITE (Vertical Jigging in -13) ",
   "channel": "FishupNorth",
   "why": "Vertical jigging Lake Champlain lake trout through the ice in subzero cold.",
   "minutes": 12.5,
   "date": "2026-02-15",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "Ota8RHT3WwE",
   "title": "We Went to Colorado Ice  Fishing For Giant Lake Trout (Part 1)#icefishing #bluemesa ",
   "channel": "Filemon Outdoor Adventures",
   "why": "Ice fishing giant lake trout on Colorado's Blue Mesa with a local ice specialist showing the ropes.",
   "minutes": 17.5,
   "date": "2026-01-22",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "NEF-i85V4Es",
   "title": "Early Winter Lake Trout Jigging! Southern Lake Michigan 1/8/2025",
   "channel": "Big Lake - Little Boat",
   "why": "Jigging southern Lake Michigan lake trout in early winter, showing how the crew finds and catches them.",
   "minutes": 19,
   "date": "2026-01-13",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "pl9Gp4o5SIc",
   "title": "Southern Lake Michigan Lake Trout Jigging!! Water Temps Finally Cold! 11/22/2025",
   "channel": "Big Lake - Little Boat",
   "why": "Jigging southern Lake Michigan lake trout in late November as the water cools to the mid-40s and fish stage to spawn.",
   "minutes": 24.2,
   "date": "2025-11-26",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "5fYemHiD6PM",
   "title": "North Idaho Fall Lake Trout",
   "channel": "Witte On The Water",
   "why": "Lake trout move nearshore as water cools: a November trip on Priest Lake, Idaho, for mackinaw.",
   "minutes": 13.2,
   "date": "2025-11-24",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "i8vsjZzKcfc",
   "title": "Better Late Than Never -- Jigging Lake Trout October 28, 2025",
   "channel": "Don Allphin",
   "why": "Don Allphin jigs staging lake trout with Pout Bombs in Lucerne Bay for the Flaming Gorge fall spawn.",
   "minutes": 11.8,
   "date": "2025-10-29",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "HhD63gwxlCg",
   "title": "How to Find and Catch Fall Lake Trout",
   "channel": "Bend It Fishing",
   "why": "How to find and catch pre-spawn fall lake trout, episode 1 of the Bend It Fishing fall series.",
   "minutes": 13.3,
   "date": "2025-09-07",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "VdtnlvisqlM",
   "title": "Insane Pre-Spawn Lake Trout Fishing - Most Fish Caught in One Spot!  #laketrout #prespawn",
   "channel": "Northern Angle",
   "why": "Timing pre-spawn lake trout jigging in Saskatchewan, with the pattern that produced close to 100 fish from one spot.",
   "minutes": 17.9,
   "date": "2025-09-05",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "xr_LAKz0Tpg",
   "title": "Flaming Gorge How To Catch - Summer Lake Trout Pups - Episode 9",
   "channel": "Flaming Gorge",
   "why": "Late-summer and early-fall lake trout pup tactics at Flaming Gorge, Utah and Wyoming, with gear and technique.",
   "minutes": 18.6,
   "date": "2025-08-26",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer",
    "fall"
   ]
  },
  {
   "id": "U9PZRF-dGMI",
   "title": "SPRING TROLLING on MOOSEHEAD Lake | Salmon, Lake Trout & Brook Trout",
   "channel": "Take ME Outside 207",
   "why": "Spring trolling Moosehead Lake from Gray Ghost Camps for salmon, togue and brook trout, with the lures used.",
   "minutes": 34,
   "date": "2025-06-20",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "5yL8VjhxNKg",
   "title": "We found Big Lake Trout in a STUNNING Clear Lake!",
   "channel": "Jay Siemens",
   "why": "Spring lake trout and bass on Crow Lake and Lake of the Woods in Northwestern Ontario, with the rod and line used.",
   "minutes": 30.3,
   "date": "2025-06-02",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "oBuhH2SuQzY",
   "title": "Spring Lake Trout Fishing In Ontario (Jigging)",
   "channel": "KVG Fishing",
   "why": "Spring jigging for Ontario lake trout with a small Cleo spoon and a minnow-style jig head.",
   "minutes": 13.9,
   "date": "2025-05-15",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "239e98rMQCI",
   "title": "Maine Ice Out Kayak Trolling for Brook Trout and Lake Trout. 2025. Old Town Predator PDL.",
   "channel": "Precision Angling",
   "why": "Ice-out kayak trolling in Maine for brook trout and lake trout, with the rods and lures used.",
   "minutes": 9.5,
   "date": "2025-05-05",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "drUbxDt05Wk",
   "title": "MOOSEHEAD LAKE - Spring Fishing! TROLLING for Salmon, Lake Trout, & Brook Trout!",
   "channel": "Take ME Outside 207",
   "why": "Spring trolling Moosehead Lake, Maine, for landlocked salmon, lake trout and brook trout.",
   "minutes": 34.4,
   "date": "2025-04-21",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "3nHq9EyPeJ0",
   "title": "How to Find the BEST SPRING Lake Trout Spots! - Bonus Spot!",
   "channel": "Bend It Fishing",
   "why": "How to eliminate water and find the best spring lake trout spots, from the Bend It Fishing spring series.",
   "minutes": 12.7,
   "date": "2025-04-09",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "cabQWiK4lFk",
   "title": "SPRING LAKE TROUT OPENER 2025 - LAKE CHAMPLAIN",
   "channel": "Bend It Fishing",
   "why": "The spring lake trout opener on Lake Champlain, casting to lakers once the ice is off.",
   "minutes": 10.3,
   "date": "2025-04-01",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "NkZpLE1Ojwc",
   "title": "Casting for SHALLOW Springtime Lake Trout with lightweight gear!",
   "channel": "Superior Angling",
   "why": "Casting jigs and plastics with light walleye gear for shallow springtime lake trout on Lake Superior.",
   "minutes": 31.2,
   "date": "2025-02-27",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "FRsuoAeTL2Q",
   "title": "MAINE ICE FISHING: Jigging for Lake Trout! My FIRST catch on a JIG ROD!",
   "channel": "Take ME Outside 207",
   "why": "A Maine angler learns to jig for lake trout through the ice, with the gear and technique explained.",
   "minutes": 19.2,
   "date": "2025-02-12",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "SGXx0S3GwPQ",
   "title": "Ice Fishing MOOSEHEAD LAKE Maine, Lake Trout & Brookies",
   "channel": "Fishing With Boyt",
   "why": "Ice fishing Moosehead Lake, Maine, for lake trout and brook trout.",
   "minutes": 10.7,
   "date": "2025-02-11",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "DKn40Ul0TZk",
   "title": "Lake Trout Ice Fishing for Beginners",
   "channel": "Bend It Fishing",
   "why": "Bend It Fishing's beginner guide to ice fishing lake trout, with gear and presentations.",
   "minutes": 15,
   "date": "2025-01-19",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "RNhCSZVVEfA",
   "title": "How to Jig for Lakers on SMELT Lakes- Lake Willoughby Vermont",
   "channel": "Bend It Fishing",
   "why": "How to jig lake trout on smelt-forage lakes, filmed on Lake Willoughby, Vermont, in summer.",
   "minutes": 14.5,
   "date": "2024-08-25",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "9L_sn1wxtNM",
   "title": "How to Find the BEST SUMMER Lake Trout Spots! - Bonus Spot!",
   "channel": "Bend It Fishing",
   "why": "How to eliminate water and find summer lake trout spots, from the Bend It Fishing summer series.",
   "minutes": 19.2,
   "date": "2024-06-16",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "QBPQIArIT3E",
   "title": "Casting to SHALLOW Spring Lake Trout - Tips and Tricks - Episode 3",
   "channel": "Bend It Fishing",
   "why": "How to cast to shallow spring lake trout on Lake Champlain, with rods, line and leader choices.",
   "minutes": 19.3,
   "date": "2024-03-24",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "eXLHIAXsSdc",
   "title": "Late fall lake trout fishing on Flathead Lake near Kalispell, Montana. iFish Chronicles - Episode 23",
   "channel": "iFish Chronicles",
   "why": "Late fall lake trout fishing on Flathead Lake near Kalispell, Montana.",
   "minutes": 21.2,
   "date": "2023-10-26",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "_ASFrG7nwWI",
   "title": "Flathead Lake Summer Lake Trout Fishing",
   "channel": "Pautzke Bait",
   "why": "Summer lake trout fishing on Flathead Lake, Montana, with Big Sky Charters.",
   "minutes": 9.6,
   "date": "2023-08-30",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Z4-YhVJ3ZVM",
   "title": "How To: Lake Trout Trolling Basics on Lake Superior (You Don’t Need a Big Boat!)",
   "channel": "hookedupwi",
   "why": "Trolling basics for Lake Superior lake trout from a small boat: downriggers, planer boards and leadcore.",
   "minutes": 17.2,
   "date": "2023-08-07",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "7qQMhC6TZQQ",
   "title": "Lake Ontario trolling Spring Lake Trout.",
   "channel": "ItaloLabignan",
   "why": "A Kingston charter captain explains how to troll spoons on wire line for early-season lake trout on Lake Ontario.",
   "minutes": 14.5,
   "date": "2023-05-18",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "fxZsjC11XqQ",
   "title": "GIANT Ice Out Lake Trout - In Depth Outdoors TV S16 E23",
   "channel": "InDepthOutdoorsTV",
   "why": "In-Depth Outdoors fishes ice-out lake trout in Saginaw Bay, Lake Huron, using Rapala Rippin Raps.",
   "minutes": 28.1,
   "date": "2022-04-24",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "_umVJ3WAMxU",
   "title": "Lake Trout Jigging Techniques Ice Fishing",
   "channel": "Daryl Gilbert Outdoors",
   "why": "Daryl Gilbert at Bakers Narrows, Manitoba, shows how to jig lake trout through the ice with a tube rig.",
   "minutes": 12.2,
   "date": "2022-03-19",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "Ph7lWNUHOrg",
   "title": "Ice Fishing for Lake Trout | Sebago Lake, Maine | S19 E02",
   "channel": "On The Water Media",
   "why": "On The Water ice fishes big lake trout (togue) on Maine's Sebago Lake with local guides, over 100 feet deep.",
   "minutes": 24,
   "date": "2022-02-09",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "Uo5Y97GwjYg",
   "title": "Vertical Jigging Big Lake Trout",
   "channel": "Ryan Gregory",
   "why": "Ryan Gregory vertical jigs giant East Arm lake trout on Great Slave Lake during a summer expedition.",
   "minutes": 22.8,
   "date": "2021-09-09",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "4BXWFqe0TXA",
   "title": "Trolling for Spring Lake Trout on Cold Lake with Downriggers",
   "channel": "weaversbentrods",
   "why": "Trolling downriggers in early June on Cold Lake, Alberta, to map structure and find lake trout.",
   "minutes": 12.8,
   "date": "2021-06-28",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "rL0p1qD0GY8",
   "title": "Jigging lake trout on isolated Lake Superior Structure",
   "channel": "Superior Angling",
   "why": "Jigging lake trout on isolated Lake Superior structure in late April, with the rods, braid and leader used.",
   "minutes": 22.6,
   "date": "2021-04-27",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "hMAWrjf8V8A",
   "title": "Lake Trout Jigging Techniques That Guides Don't Want You to Know!",
   "channel": "Daryl Gilbert Outdoors",
   "why": "Daryl Gilbert shows a unique tube-jig rig for jigging lake trout on Great Slave Lake, open water or hardwater.",
   "minutes": 8.8,
   "date": "2021-03-29",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "summer",
    "winter"
   ]
  },
  {
   "id": "RNXJVVHl9wU",
   "title": "Downrigging and using XL planer boards to catch August Lake Trout!",
   "channel": "Superior Angling",
   "why": "Downrigging and XL planer boards to catch August lake trout, from the Superior Angling offseason series.",
   "minutes": 16.6,
   "date": "2020-08-26",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "7NoD5rqh2nU",
   "title": "How to Catch Flathead Lake Lake Trout",
   "channel": "Pautzke Bait",
   "why": "Pautzke explains how to catch lake trout on Flathead Lake, Montana.",
   "minutes": 7.5,
   "date": "2020-08-05",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "GfyqYeHn0lM",
   "title": "Quickly Locating and Catching Big Lake Trout from Shore",
   "channel": "Mountain State Angler",
   "why": "How to find and catch shallow lake trout from shore in Colorado during fall pre-ice and spring post-ice.",
   "minutes": 6.6,
   "date": "2019-11-30",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring",
    "fall"
   ]
  },
  {
   "id": "A0oZVO0hLVQ",
   "title": "Trolling for Lake Huron Lake Trout!",
   "channel": "Superior Angling",
   "why": "Superior Angling trolls Lake Huron in July for hard-fighting lake trout in an unexplored fishery.",
   "minutes": 22.7,
   "date": "2019-07-10",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "-iEeWyxCvJc",
   "title": "Ice fishing Flaming Gorge for Lake Trout",
   "channel": "Fishin' Utah",
   "why": "Ice fishing Flaming Gorge, Utah, for lake trout on safe ice, with a 20 pound fish landed.",
   "minutes": 10,
   "date": "2019-03-20",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  }
 ],
 "brook-trout": [
  {
   "id": "uJTyAHOqA_4",
   "title": "AGGRESSIVE Fall Brook Trout!",
   "channel": "The Average Joes Fishing Show",
   "why": "Backcountry Ontario brook trout fishing as the water cools in fall, with the fish turning on once it warms up.",
   "minutes": 13.4,
   "date": "2026-08-25",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "fuFI5JSHocQ",
   "title": "Hidden Native Brook Trout of CAPE COD! Fly Fishing a Forgotten Stream!",
   "channel": "UpstateTroutOnTheFly",
   "why": "Hiking and fishing tiny pockets and undercut banks for native brook trout on Cape Cod, Massachusetts.",
   "minutes": 16.6,
   "date": "2026-07-22",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "4Y8hieb4GW4",
   "title": "This New Hampshire River is LOADED with Brook Trout!",
   "channel": "Pautzke Bait",
   "why": "Pautzke fishes a New Hampshire Lakes Region river for aggressive brook trout and shows the baits used.",
   "minutes": 8.1,
   "date": "2026-07-19",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "sPLzn2J7oAQ",
   "title": "Native Brook Trout | North Central, PA",
   "channel": "Dead Drift Outdoors",
   "why": "Summer dry-fly fishing for native brook trout in the cool mountain streams of north-central Pennsylvania.",
   "minutes": 15.5,
   "date": "2026-07-16",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "IwhgbxScUGg",
   "title": "New Hampshire's Great North Woods Brook Trout | East Inlet Flowage",
   "channel": "Pautzke Bait",
   "why": "How to catch stocked brook trout from the bank at New Hampshire's East Inlet Flowage in the Great North Woods.",
   "minutes": 7.7,
   "date": "2026-07-10",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "P2G7emZ7ElQ",
   "title": "Remote Appalachian Trout Stream | Monongahela National Forest, West Virginia",
   "channel": "Dead Drift Outdoors",
   "why": "Exploring a remote blueline stream for native brook trout in West Virginia's Monongahela National Forest in May.",
   "minutes": 14.5,
   "date": "2026-05-18",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "MkRZb352two",
   "title": "New Brunswick Brook Trout Fishing - Opening Day 2026",
   "channel": "Joseph English",
   "why": "New Brunswick trout opening day: fishing a remote stream for brook trout in mid April.",
   "minutes": 10.2,
   "date": "2026-04-16",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "XazLD_fyUfk",
   "title": "Catching some Big Brookies at Maine’s Largest Lake (Under the Ice Footage)",
   "channel": "Maine Freshwater Exploration Going Deep",
   "why": "Ice fishing big brook trout on Moosehead Lake, Maine, with under-ice footage of the fish.",
   "minutes": 11.6,
   "date": "2026-01-11",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "nvq2ajnCIQQ",
   "title": "Wisconsin FIRST ICE Trophy Brook TROUT!",
   "channel": "Wisconsin Fisherman",
   "why": "First-ice trophy brook trout in Wisconsin, with ice safety gear and how the fish were caught.",
   "minutes": 20.3,
   "date": "2025-12-05",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "HQSMc78-wLI",
   "title": "Backcountry Brook Trout | Ice Fishing in Eastern Manitoba",
   "channel": "Fishing Prairie and Shield TV",
   "why": "Hiking into the backcountry of eastern Manitoba to ice fish brook trout.",
   "minutes": 10.9,
   "date": "2025-11-27",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "AmI9qiTEQ7c",
   "title": "Fishing The CLEAREST Water In Massachusetts for GIANT Brook trout!!! ",
   "channel": "Masscast Fishing ",
   "why": "Fall fishing for big brook trout in clear Massachusetts water.",
   "minutes": 16,
   "date": "2025-11-22",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "jddyIUX5Ev0",
   "title": "Chasing Wild Native Brook Trout in Early Fall | Pennsylvania Fly Fishing",
   "channel": "Dead Drift Outdoors",
   "why": "Early-fall dry-fly fishing for wild native brook trout in a cold Pennsylvania mountain stream.",
   "minutes": 21,
   "date": "2025-10-14",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "7nxtFJWBc0A",
   "title": "River Fishing Brook Trout in Nova Scotia",
   "channel": "The Average Joes Fishing Show",
   "why": "Fishing Nova Scotia brook trout in rivers with a simple spinning rod and reel.",
   "minutes": 14.6,
   "date": "2025-08-19",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "lHXfUeF_b7A",
   "title": "Brook Trout Fishing Can Be Non-Stop in Wyoming's Snowy Range",
   "channel": "Pautzke Bait",
   "why": "Pautzke fishes Wyoming's Snowy Range alpine streams, where small brook trout bite fast with ultralight tackle.",
   "minutes": 6.6,
   "date": "2025-08-08",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Hlg5lu7N7Ag",
   "title": "4-Day Solo Ice-Out | Canoe Camping & Brook Trout in Algonquin",
   "channel": "North on the Fly",
   "why": "Solo canoe camping and brook trout fishing in Algonquin right after ice-out, with lakes to the north still frozen.",
   "minutes": 37.1,
   "date": "2025-06-22",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "StKYp8fnklg",
   "title": "MAINE Spring BROOK TROUT Fishing! Hike, Catch, Cook!",
   "channel": "Take ME Outside 207",
   "why": "Hiking into a remote Maine pond in spring for native brook trout, then a catch and cook.",
   "minutes": 12.8,
   "date": "2025-06-06",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "tzAGKJVjEuk",
   "title": "Ice Fishing for Native Brook Trout in Northern Maine",
   "channel": "A Girl From Maine",
   "why": "Ice fishing native brook trout at a remote northern Maine pond, camp to flag.",
   "minutes": 15.4,
   "date": "2025-02-15",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "H-6Xc5HJtLc",
   "title": "Ice Fishing for Big Colorado Brook Trout",
   "channel": "Fishing Colorado",
   "why": "Ice fishing for big Colorado brook trout in December.",
   "minutes": 10,
   "date": "2024-12-16",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "0cZDh9TgF4Q",
   "title": "Backcountry Fly Fishing in NEW HAMPSHIRE. Native brook trout and their fall colors.",
   "channel": "Chris Caulder",
   "why": "Backcountry fly fishing for brook trout in fall colours in New Hampshire's White Mountains.",
   "minutes": 24.9,
   "date": "2024-09-10",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "4tncLN47llo",
   "title": "INCREDIBLE Day of Fly Fishing for NATIVE BROOK TROUT! || Western North Carolina",
   "channel": "Carlile Fly & Fowl",
   "why": "Hiking into a remote Western North Carolina stream for native southern Appalachian brook trout.",
   "minutes": 19.4,
   "date": "2024-08-13",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "eSUBAVs6CCs",
   "title": "Maine Brook Trout: Fly Fishing in the Rangeley Region",
   "channel": "Dark Skies Fly Fishing",
   "why": "June brook trout trip in Maine's Rangeley region: dry flies in the morning, dry-dropper in the afternoon.",
   "minutes": 10.6,
   "date": "2024-06-25",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Sa6h0qLP9IY",
   "title": "Sun, Snow and Southern Brook Trout: Fly Fishing East Tennessee in Early Spring for Native Brookies",
   "channel": "Tellico Outfitters",
   "why": "Fly fishing East Tennessee's high-elevation streams for native brookies in early spring snow.",
   "minutes": 15.2,
   "date": "2024-05-01",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "tfaoBkwwKKE",
   "title": "4 Day Backcountry Algonquin Park Fishing Trip - Spring Brook Trout",
   "channel": "The Average Joes Fishing Show",
   "why": "A four-day backcountry canoe trip for spring brook trout in Algonquin Park, Ontario.",
   "minutes": 21.8,
   "date": "2024-04-30",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "QbAwv14XnEo",
   "title": "Pennsylvania CLASS A Wild Brook Trout Stream (An Amazing Spring Day Fly Fishing Northern PA)",
   "channel": "Dead Drift Outdoors",
   "why": "First fly rod trip of the season on a northern Pennsylvania Class A wild brook trout stream.",
   "minutes": 14.3,
   "date": "2024-04-30",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "ubUbw6E5Dcs",
   "title": "Key Tips for Ice Fishing Stocked Brook Trout!",
   "channel": "The Big Fish Energy",
   "why": "Key tips for ice fishing stocked brook trout on new lakes in the Eastern Ontario backcountry.",
   "minutes": 7.6,
   "date": "2024-01-20",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "9tmAnkI90rI",
   "title": "Off-the-Grid Ice Fishing at a Secret New Hampshire NATIVE TROUT POND Bend It Fishing",
   "channel": "Bend It Fishing",
   "why": "Scouting a New Hampshire beaver pond on Google Earth and ice fishing it for wild native brook trout.",
   "minutes": 11.4,
   "date": "2023-12-25",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "Ls8ki99AK1Y",
   "title": "Chasing Giants: Massive Brook Trout Caught Ice Fishing! New Hampshire",
   "channel": "Bend It Fishing",
   "why": "Ice fishing for giant New Hampshire brook trout, with a quick morning on the ice.",
   "minutes": 13.7,
   "date": "2023-12-17",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "Q3j3Lt_ai10",
   "title": "late summer brook trout fishing",
   "channel": "ontario Outdoorsman ",
   "why": "Late-summer brook trout fishing on a Northern Ontario river.",
   "minutes": 7,
   "date": "2023-09-17",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "U5DRvA1jdrk",
   "title": "TROUT FISHING Local Creeks in DULUTH, MN, (How to catch Native brook Trout) NORTH SHORE",
   "channel": "NolenPfishing",
   "why": "Fall brook trout in Duluth, Minnesota North Shore creeks, where cooling water makes the fish aggressive.",
   "minutes": 6.6,
   "date": "2023-09-07",
   "regions": [
    "boreal-forest",
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "rn-tA23f4Y4",
   "title": "Fly Fishing a High Country Stream Loaded with Wild Brook Trout! | FLY FISHING COLORADO",
   "channel": "Trout Addiction",
   "why": "Dry-fly fishing a Colorado high-country stream for wild brook trout after a heavy winter.",
   "minutes": 10.3,
   "date": "2023-08-18",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "CR1aibPbmlA",
   "title": "Taking a Trout Expert Fishing in Algonquin Park - Brook Trout Tips",
   "channel": "The Average Joes Fishing Show",
   "why": "An Algonquin Park trout expert shows how he finds and catches brook trout in summer.",
   "minutes": 15.8,
   "date": "2023-07-20",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "0MzZN769VaM",
   "title": "Early Spring BROOK TROUT Fishing! | Northern Ontario",
   "channel": "Brydon B",
   "why": "Early spring brook trout on a Northern Ontario lake with spinners and spoons.",
   "minutes": 7.3,
   "date": "2023-05-09",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "sZGlKL9_j0M",
   "title": "Spring brook trout in the  Rocky Mountain foothills",
   "channel": "Fly Fishing and Bow Hunting Alberta",
   "why": "Spring brook trout on a small lake in the Rocky Mountain foothills near Hinton, Alberta.",
   "minutes": 8.9,
   "date": "2023-02-26",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "npZFRYOjN4g",
   "title": "SNOW TROUT - Native Brook Trout Fly Fishing in a Snowstorm",
   "channel": "Wild Trout Man",
   "why": "Native brook trout fly fishing in a Pennsylvania snowstorm, with winter tips along the way.",
   "minutes": 41.1,
   "date": "2022-12-24",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "roIMJKI0kAA",
   "title": "Rocky Mountain Brook Trout Fishing (Colorado)",
   "channel": "Fishing Colorado",
   "why": "Heading to Colorado's high country with fly rods for brook trout in August.",
   "minutes": 16.9,
   "date": "2022-08-18",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "2MtGrGmh7gk",
   "title": "Fly Fishing The Remote Ponds of Maine",
   "channel": "Maine Outdoor Enthusiast",
   "why": "Dry fly fishing remote northern Maine ponds in the third week of June, the peak of the hatch.",
   "minutes": 13.8,
   "date": "2022-06-22",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "sQqojhcKdc0",
   "title": "Sea Run Brook Trout / Nanuk Polar Bear Lodge - Northern Manitoba",
   "channel": "The New Fly Fisher",
   "why": "Chasing big sea-run brook trout entering northern Manitoba rivers on the September full moon, with fly tactics.",
   "minutes": 25.3,
   "date": "2022-05-22",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "5-tj2Ik0kiY",
   "title": "Questing for Wild Brookies in Eastern Connecticut",
   "channel": "Connecticut Angler",
   "why": "Prospecting small eastern Connecticut streams on a 3 weight for wild brook trout in May.",
   "minutes": 18.2,
   "date": "2022-05-12",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "cof7i5-ofG4",
   "title": "Maine Fishing 2022 | Ice-Out Is Here...Let's Talk Trolling!",
   "channel": "Maine Outdoor Enthusiast",
   "why": "Trolling tandem streamers with a fly rod right after Maine ice-out for trout and landlocked salmon.",
   "minutes": 7.8,
   "date": "2022-05-04",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "VbrDABolxng",
   "title": "Early Season Brook Trout",
   "channel": "The New Fly Fisher",
   "why": "Fly fishing Algoma Country, Northern Ontario, in early May for brook trout and lake trout.",
   "minutes": 24.3,
   "date": "2022-03-13",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "h-iqRKARnuI",
   "title": "Ice Fishing Brook Trout in an Ontario Back Lake - Eric's New PB",
   "channel": "The Average Joes Fishing Show",
   "why": "Hiking to an Ontario back lake to ice fish brook trout, with how they were found and caught.",
   "minutes": 13.2,
   "date": "2022-01-27",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "-5BAHfecEuY",
   "title": "Stocked Brook Trout Ice Fishing",
   "channel": "Maine Trout Whisperer",
   "why": "Maine Trout Whisperer ice fishes stocked brook trout in Maine.",
   "minutes": 11.9,
   "date": "2022-01-18",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "-gcxvTMtGBw",
   "title": "Fall Fly Fishing Fall River [RMNP] | Vlog #33",
   "channel": "Front Range Fishing",
   "why": "Fall fly fishing for brook trout on Fall River in Colorado's Rocky Mountain National Park.",
   "minutes": 7.3,
   "date": "2021-10-28",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "ngK1dg3qCtw",
   "title": "BIG RUN Brookies - Shenandoah National Park",
   "channel": "Traveling Trout Co.",
   "why": "Hiking into Virginia's Big Run in Shenandoah National Park to fish native brook trout in October.",
   "minutes": 18.1,
   "date": "2021-10-25",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "AJ4DJesY0j0",
   "title": "Montana Brook Trout | 2021 | Backcountry",
   "channel": "Fish the 406 ",
   "why": "A fall backcountry brook trout trip in Montana where two anglers caught 30 to 40 fish each.",
   "minutes": 8.2,
   "date": "2021-10-04",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "jLb9NPUeKzY",
   "title": "This River Was FULL of Native BROOK TROUT!!! (Western Maine)",
   "channel": "MainelyOutDoors",
   "why": "Fall fly fishing for native Maine brook trout on a river in the Rangeley region.",
   "minutes": 8.7,
   "date": "2021-09-20",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "EpciuznzRRs",
   "title": "Fishing for WILD New England Trout in TINY Streams",
   "channel": "Connecticut Angler",
   "why": "Moving from spring stocked-trout streams to small Connecticut hill streams for native brook trout and wild browns.",
   "minutes": 19.2,
   "date": "2021-05-20",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "YR9Kjfa7aMI",
   "title": "CATCHING EARLY SPRING BROOK TROUT | Northern Ontario",
   "channel": "Brydon B",
   "why": "Setting up on a Northern Ontario brook trout lake in early spring, fished from shore and boat.",
   "minutes": 22.5,
   "date": "2021-04-30",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "Mjk3uqk8Bds",
   "title": "Fall Brook Trout",
   "channel": "The New Fly Fisher",
   "why": "September is prime time for big, colourful pre-spawn brook trout; fly fishing Blue Fox Camp in Algoma, Ontario.",
   "minutes": 30,
   "date": "2021-04-25",
   "regions": [
    "boreal-forest",
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "huQNN4f6n2o",
   "title": "Mice Fishing for Giant Brook Trout",
   "channel": "Orvis Guide to Fly Fishing",
   "why": "Tom Rosenbauer fishes mouse patterns for huge Labrador brook trout at Three Rivers Lodge.",
   "minutes": 7.2,
   "date": "2021-03-10",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "AMK0zkBK7_U",
   "title": "Fly Fishing the East Outlet, Maine | Landlocked Salmon and Brook Trout Fishing",
   "channel": "MainelyOutDoors",
   "why": "Fall brook trout and landlocked salmon on Maine's East Outlet, with the flies used as fish run upriver.",
   "minutes": 11.9,
   "date": "2020-10-26",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "K3eT2K2q3go",
   "title": "West Virginia Brook Trout",
   "channel": "Pautzke Bait",
   "why": "Pautzke tracks down West Virginia streams stocked with brook trout each winter and spring, and how to catch them.",
   "minutes": 6.7,
   "date": "2020-02-11",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "winter",
    "spring"
   ]
  },
  {
   "id": "tHnSNlA5bmg",
   "title": "Casting for Lake Superior COASTER BROOK TROUT!",
   "channel": "Superior Angling",
   "why": "How to pick high-percentage shoreline spots to cast for Lake Superior coaster brook trout.",
   "minutes": 12.6,
   "date": "2019-07-16",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  }
 ],
 "rainbow-trout": [
  {
   "id": "cjKQ3jYy8Y8",
   "title": "Tank Trout on a Size 26 Trico Spinner | Pueblo Tailwater Dry Fly Strategy",
   "channel": "Ian Karcher | Miles and Mayflies",
   "why": "Dry-fly strategy on the Pueblo tailwater, Colorado, during a size 26 trico spinner fall for big rainbows and browns.",
   "minutes": 16.4,
   "date": "2026-09-19",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "0GYdRMxaGKo",
   "title": "Trolling for Trout and coho at Riffe Lake |  Washington",
   "channel": "The Piscatorian",
   "why": "Summer trolling for trout and landlocked coho on Riffe Lake, Washington.",
   "minutes": 10.5,
   "date": "2026-08-25",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "ZRVGimnqics",
   "title": "Dry Fly Fishing At Henry’s Fork | Home Waters with Todd Lanning",
   "channel": "hardyfishing",
   "why": "Todd Lanning on dry-fly fishing the Henry's Fork in Idaho, where picky trout demand precision.",
   "minutes": 4,
   "date": "2026-08-21",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "WRs12qoQUb4",
   "title": "We Finally Cracked the Code on BIG Early Spring Rainbow Trout!",
   "channel": "Reel BC adventures",
   "why": "Finding big early-spring rainbows after ice-off in the British Columbia interior, with the chironomid hatch.",
   "minutes": 14.1,
   "date": "2026-08-06",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "YUgTtLgMcN8",
   "title": "Arkansas Fishing 🎣 - White River Trout Fishing - July 2026",
   "channel": "Southeastern Outdoors",
   "why": "Mid-July trout fishing on Arkansas' White River below Bull Shoals, catching rainbows, cutthroat and browns.",
   "minutes": 14.4,
   "date": "2026-07-23",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "lTwd86AQTrc",
   "title": "Opening day trout fishing North Lake Washington State",
   "channel": "ADS  Outdoors",
   "why": "Washington's lowland lake trout opener at North Lake, Federal Way, in April.",
   "minutes": 15.8,
   "date": "2026-04-28",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "PGfjRHuG5OQ",
   "title": "Catch Rainbow Trout Near Gatlinburg, Tennessee Without the Crowds",
   "channel": "Pautzke Bait",
   "why": "How to catch rainbow trout on Little River near Gatlinburg, Tennessee, outside the national park crowds.",
   "minutes": 12.5,
   "date": "2026-04-24",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "Wpa1EHzw3b4",
   "title": "Top 3 Trout Rigs for the Eastern Sierra Opener (2026 Guide)",
   "channel": "SeaSpanker Outdoors",
   "why": "Top three trout rigs for the Eastern Sierra opener, for bank fishing stocked and wild trout in lakes and streams.",
   "minutes": 20.1,
   "date": "2026-04-13",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "FTqnaGRktGE",
   "title": "Trout Fishing Hills Creek WV (Easy Stocked Trout Tips for Beginners)",
   "channel": "Pautzke Bait",
   "why": "Easy stocked-trout tips for beginners at Hills Creek, West Virginia, in April.",
   "minutes": 11,
   "date": "2026-04-12",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "SuBrj-9-R0c",
   "title": "How to Catch Early Season Trout in Massachusetts (Insane Bite)",
   "channel": "Bon Fishes ",
   "why": "How to catch early-season stocked trout in Massachusetts with a PowerBait rig.",
   "minutes": 11.1,
   "date": "2026-03-27",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "igPPiGjsKBc",
   "title": "Urban Trout in Denver?! Winter South Platte Fly Fishing",
   "channel": "Mile High Fish Guy",
   "why": "Winter fly fishing the South Platte through Denver, with conditions checked on the Front Range.",
   "minutes": 7.7,
   "date": "2026-03-02",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "5jBcUopy8Yo",
   "title": "Techniques For Lake Pend Orielle Kokanee and Kamloops Rainbow Trout",
   "channel": "Mack's Lure",
   "why": "Trolling wedding rings and Double Whammys for Lake Pend Oreille's giant rainbows in Idaho, spring and fall.",
   "minutes": 19.1,
   "date": "2026-02-16",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring",
    "fall"
   ]
  },
  {
   "id": "CLpcCOauCks",
   "title": "Great Lakes Tributary Fishing – Fall Steelhead and Brown Trout",
   "channel": "Seeking Solitude ",
   "why": "Fall steelhead and brown trout in Great Lakes tributaries, with fly tactics for the autumn run.",
   "minutes": 27.1,
   "date": "2025-12-07",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "irdb6mCAn6w",
   "title": "How to EASILY Catch Stocked Rainbow Trout in BC! Lafarge Lake & Como Lake Fishing",
   "channel": "Outdoor Bruce",
   "why": "How to catch stocked rainbows in Metro Vancouver at Lafarge and Como Lakes in November.",
   "minutes": 9.6,
   "date": "2025-11-06",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "1ebJMjONKrw",
   "title": "Trout Fishing for AGGRESSIVE Black Hills Rainbows (Catch & Cook)",
   "channel": "West O Angling",
   "why": "Camping and trout fishing in South Dakota's Black Hills for aggressive rainbows in October.",
   "minutes": 25.8,
   "date": "2025-10-18",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "HjWmRp4s4LA",
   "title": "June Lake Summer Trout Fishing",
   "channel": "SuperDuper Outdoors",
   "why": "Summer ultralight spoon fishing for rainbow trout at June Lake in the Eastern Sierra.",
   "minutes": 11.4,
   "date": "2025-08-08",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "2WtDG7hEvYg",
   "title": "West Virginia Trout Fishing",
   "channel": "Pautzke Bait",
   "why": "West Virginia trout season: catching several species of trout in the mountains with Pautzke.",
   "minutes": 11,
   "date": "2025-05-06",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "IwVxD651ZNk",
   "title": "Spey Fishing For Wild Winter Steelhead On Washington's Olympic Peninsula - Ice Out Edition!",
   "channel": "Gig Harbor Fly Shop",
   "why": "Spey fishing for wild winter steelhead on Washington's Olympic Peninsula after an ice-out cold snap.",
   "minutes": 18.1,
   "date": "2025-02-19",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "3O6b8q9Oi4s",
   "title": "Euro Drifting Sacramento River Rainbow Trout",
   "channel": "Angler West TV",
   "why": "Euro drifting beads for wild rainbows on the Sacramento River in Redding, with two guides.",
   "minutes": 22.5,
   "date": "2025-01-30",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "MyO7zrv9iJM",
   "title": "Olympic Peninsula Steelhead Fishing | Hoh River Drift Boat Steelhead | (Part 1 of 2)",
   "channel": "Day One Outdoors",
   "why": "Drift boat steelhead fishing on the Hoh River on the Olympic Peninsula in January, with tech tips.",
   "minutes": 25.4,
   "date": "2025-01-24",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "MNDSd7U6boc",
   "title": "Fly Fishing Ice Filled Creeks for Huge Fish! (Erie Steelhead Pt 2)",
   "channel": "Hardman Fishing Adventures",
   "why": "Fly fishing ice-filled Erie, Pennsylvania, creeks for steelhead after a lake-effect snowstorm.",
   "minutes": 18.6,
   "date": "2025-01-21",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "ptld28WOJLU",
   "title": "WInter Fly Fishing for Wild Brown Trout and Rainbow Trout on one of our favorite local creeks!",
   "channel": "Mop Fly Productions",
   "why": "December fly fishing for wild rainbows and browns on a Colorado creek, with techniques for cold water.",
   "minutes": 8,
   "date": "2024-12-30",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "jQbl5CAia6s",
   "title": "Learning How to Catch Winter STEELHEAD on the Salmon River in Pulaski NY with Professional Guide!!",
   "channel": "FishupNorth",
   "why": "A guide shows plug and float fishing for winter steelhead on New York's Salmon River in Pulaski.",
   "minutes": 8.3,
   "date": "2024-12-17",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "cN3v9l97w7g",
   "title": "The Frying Pan River - Fly Fishing Tips & Tricks",
   "channel": "Guideline",
   "why": "Dry-fly tips for rising trout on the Frying Pan in Colorado when snow and freezing temperatures arrive.",
   "minutes": 4.1,
   "date": "2024-11-11",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "jvAB2toZXFE",
   "title": "How To Catch Your FIRST Fish On The Brule River!  (Fall Fishing)",
   "channel": "hookedupwi",
   "why": "Tips for steelhead, coho and brown trout on the Brule River in northern Wisconsin in autumn, aimed at first-timers.",
   "minutes": 14.4,
   "date": "2024-10-29",
   "regions": [
    "boreal-forest",
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "ur3p6colmx4",
   "title": "How To Catch TROUT In the Eastern Sierra: What Color Should I Use? - Crowley Lake",
   "channel": "SeaSpanker Outdoors",
   "why": "How to pick jig colors and set up mini jigs for Eastern Sierra trout at Crowley Lake.",
   "minutes": 23.6,
   "date": "2024-10-28",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "CFit4pM9baY",
   "title": "Fall Rainbow Trout Fishing at Crowley Lake.",
   "channel": "SuperDuper Outdoors",
   "why": "Fall rainbow trout fishing at Crowley Lake in the Eastern Sierra with small spoons.",
   "minutes": 26,
   "date": "2024-10-09",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "EAFGwj1vL6g",
   "title": "Trout Fishing South Dakota's Northern Black Hills",
   "channel": "Pautzke Bait",
   "why": "Where to fish for trout in South Dakota's Northern Black Hills in July.",
   "minutes": 8.1,
   "date": "2024-07-25",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "RU9rKWzg9rM",
   "title": "Trout Fishing Rapid Creek South Dakota",
   "channel": "Pautzke Bait",
   "why": "How to catch trout on Rapid Creek inside Rapid City, South Dakota, in June.",
   "minutes": 9.3,
   "date": "2024-06-16",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "_Q1v-wDDU4c",
   "title": "Roaring River Spring Trout Fishing",
   "channel": "Pautzke Bait",
   "why": "How to beat the crowds and catch a limit at Missouri's Roaring River State Park this spring.",
   "minutes": 10.5,
   "date": "2024-04-18",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "qINvo5z6d8w",
   "title": "Fishing for Rainbow Trout (WILD BITE!) at Local Lake! I Oregon Spring Trout Fishing I 2 Trips in One",
   "channel": "Northwest Weekenders",
   "why": "Spring trout fishing for rainbows at a local Oregon lake with a wild afternoon bite.",
   "minutes": 15.7,
   "date": "2024-04-18",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "zXdJOHWxvtU",
   "title": "GATLINBURG SECRETS to Catch Big Trout",
   "channel": "Lelands Lures - Trout Magnet - Crappie Magnet",
   "why": "Tips from Jeff Smith and Jim Habera on catching trout in the Gatlinburg, Tennessee, delayed harvest waters.",
   "minutes": 12.3,
   "date": "2024-03-07",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "winter",
    "spring"
   ]
  },
  {
   "id": "bDeW1TPsFGo",
   "title": "Winter Fly Fishing in NC for BIG Trout (NC Trout Fishing)",
   "channel": "Slab Dynasty",
   "why": "Winter fly fishing a North Carolina mountain river with small nymphs for big rainbows, browns and brook trout.",
   "minutes": 20.8,
   "date": "2024-01-10",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "c21jmRwJbAU",
   "title": "Fall Fly Fishing at Roaring River | Missouri Trout on the Fly #flyfishing #ozarks #rainbowtrout",
   "channel": "CASTAFLY",
   "why": "Fall fly fishing for rainbows at Roaring River State Park, Missouri.",
   "minutes": 10.9,
   "date": "2023-10-31",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "8WcVpSOEnFc",
   "title": "Skamania Summer Steelhead Fishing & Skamania Fishing Tips / How To Catch Summer Run Rainbow Trout",
   "channel": "Reel Michigan Anglers",
   "why": "Skamania summer-run steelhead fishing tips on Michigan rivers, including how to catch summer-run rainbow trout.",
   "minutes": 18.5,
   "date": "2023-07-16",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "wuBMmO_oqoc",
   "title": "Steelhead of Minnesota's North Shore",
   "channel": "Superior Angling",
   "why": "Superior Angling fishes rivers and streams in Lake County, Minnesota, for spring-run North Shore steelhead.",
   "minutes": 16.5,
   "date": "2023-05-31",
   "regions": [
    "boreal-forest",
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "d4kordhOBHQ",
   "title": "How To Catch Roaring River Trout Zone 1",
   "channel": "Pautzke Bait",
   "why": "How to catch trout in Roaring River's heavily pressured Zone 1 in May.",
   "minutes": 16.6,
   "date": "2023-05-11",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "S3DgosCgmZQ",
   "title": "4 Days of Winter Steelhead || Trinity River || Confluence Outfitters",
   "channel": "Confluence Outfitters",
   "why": "Four days guiding winter steelhead on California's Trinity River.",
   "minutes": 11,
   "date": "2023-02-11",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "wuLlQnx-oa0",
   "title": "MONSTER Winter Steelhead on the Olympic Peninsula",
   "channel": "JD Ray’s Guide Service",
   "why": "A guide takes clients after winter steelhead on the Olympic Peninsula.",
   "minutes": 6.1,
   "date": "2023-02-09",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "8oxgivlWBEk",
   "title": "Lake Erie Tributary Winter Steelhead - Steelhead Alley Doesn't Disappoint",
   "channel": "Willsworldoutdoors",
   "why": "Winter steelhead on a Lake Erie tributary in Pennsylvania's Steelhead Alley, using beads, jigs and egg sacks in cold, clear water.",
   "minutes": 11.6,
   "date": "2023-01-04",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "rnfBmAOJjdk",
   "title": "Big Mountain Trout - Pemigewasset River, NH",
   "channel": "Reel & Ridge Expeditions",
   "why": "Summer fishing for mountain brookies and rainbows on New Hampshire's Pemigewasset River.",
   "minutes": 7.1,
   "date": "2022-08-19",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "X1skp_QFmqw",
   "title": "How to Catch Rainbow Trout on Lake Taneycomo 2022 - Branson Landing Docks",
   "channel": "Primal Survival",
   "why": "How to catch rainbow trout from the Branson Landing docks on Lake Taneycomo, Missouri, in July.",
   "minutes": 6.2,
   "date": "2022-07-10",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "HNSU68odKSI",
   "title": "Trout Fishing High Water For Browns And Bows | Roaring Fork Colorado",
   "channel": "Trout West ",
   "why": "Fishing high water for browns and rainbows on Colorado's Roaring Fork in July.",
   "minutes": 21.5,
   "date": "2022-07-07",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "W63yINpKmF4",
   "title": "How To Fish A Roadside Trout Filled River | Cache La Poudre Colorado",
   "channel": "Trout West ",
   "why": "How to fish a roadside trout river on Colorado's Cache la Poudre in early July.",
   "minutes": 11.8,
   "date": "2022-07-04",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "G0C5Yech4Jk",
   "title": "The Danger Zone - Small Stream Lake Superior Steelhead",
   "channel": "Superior Wilds",
   "why": "Fishing a small stream on Lake Superior's northeast shore for spring-run steelhead.",
   "minutes": 15.6,
   "date": "2022-05-22",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "8yFVtAXbOE4",
   "title": "Catching Connecticut Stocked Rainbow Trout",
   "channel": "Blue Line Fishing",
   "why": "Early April trip for freshly stocked rainbow trout in Connecticut, now that the state has no closed trout season.",
   "minutes": 7.6,
   "date": "2022-04-03",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "ctUV6HGp6qQ",
   "title": "Catching BIG rainbows for Montana’s ice off! (Montana Flyfishing)",
   "channel": "Dinksonly",
   "why": "Fly fishing for big rainbows as the ice comes off in Montana in late March.",
   "minutes": 15.6,
   "date": "2022-03-29",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "-LHWJNB2CW0",
   "title": "Steelhead Fishing Tips.  Featuring All Seasons Sports (Dec. 2021) - Pulaski, NY.",
   "channel": "OswegoCountyTourism",
   "why": "A Pulaski, New York, tackle shop explains float fishing the Salmon River for steelhead in December, spinning and centerpin.",
   "minutes": 4.8,
   "date": "2021-12-13",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "vVsciLUOd8Y",
   "title": "Lake Ontario Tributary Fall Steelhead Float Fishing.  Did I finally land a trout on my own roe bag?",
   "channel": "Toothy Wally",
   "why": "Float fishing a Lake Ontario tributary for fall steelhead with a homemade roe bag.",
   "minutes": 16.1,
   "date": "2021-11-24",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "swRtN-REnFE",
   "title": "TOP 5 Winter TROUT Spots | Southern California TROUT Fishing In The Winter | 4K",
   "channel": "Huck Outdoors",
   "why": "Top five spots for winter trout fishing in Southern California.",
   "minutes": 4.8,
   "date": "2021-11-22",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "SU5y-7PuRcA",
   "title": "Superior Steelhead & Sasquatch In Lake Superior Provincial Park",
   "channel": "Superior Wilds",
   "why": "A day trekking a Lake Superior Provincial Park river for spring steelhead, from an angler who fishes it each spring and fall.",
   "minutes": 18.1,
   "date": "2021-05-14",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "yXVnS-mELJE",
   "title": "Small Creek Steelhead Fishing Ontario",
   "channel": "Average Ontario Anglers",
   "why": "Ten tips for steelhead in cold, spring-fed small creeks in Ontario that hold fish long into spring.",
   "minutes": 11.8,
   "date": "2021-05-10",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "wgC0BvDX0W4",
   "title": "Where to FISH | Eastern SIERRA Trout Opener 2026 |  Top 5 Spots",
   "channel": "Huck Outdoors",
   "why": "A preview of the top five spots for the Eastern Sierra trout opener in April.",
   "minutes": 6.5,
   "date": "2021-04-14",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "kFrZ9EG0xOo",
   "title": "Spring STEELHEAD Fishing Lake Ontario Tributaries!",
   "channel": "FOX FISHING 4K (SUB FOR 4K VIDEOS!)",
   "why": "Spring steelhead on Lake Ontario tributaries, with the gear and lures used and 12 trout landed in four hours.",
   "minutes": 12.6,
   "date": "2021-03-21",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "xV3VOgQoPrc",
   "title": "Ice Fishing STOCKED Rainbow TROUT in Massachusetts!",
   "channel": "Bassin' Mass",
   "why": "Ice fishing stocked rainbow trout in Massachusetts with tip-ups and a tungsten jig.",
   "minutes": 8.3,
   "date": "2021-03-18",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "K-EmIpgm3yU",
   "title": "Ice Fishing for Stocked Trout - Tips & Tricks",
   "channel": "Kansas Angling Experience",
   "why": "Tips and tricks for ice fishing stocked trout in Kansas.",
   "minutes": 14.2,
   "date": "2021-02-14",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "ntYLE08fJ2w",
   "title": "Fly Fishing A TOP 50 Tailwater in the Winter - Home to some of the Most Beautiful Rainbow Trout!",
   "channel": "Drew LooknFishy",
   "why": "Fly fishing an Arkansas tailwater for winter rainbows, and why generation schedules make winter a favorite time.",
   "minutes": 12.5,
   "date": "2021-01-26",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "d6tQKdmeat8",
   "title": "Big Montana Rainbows Through the Ice",
   "channel": "Tomahawk Pursuits",
   "why": "Ice fishing big rainbows in a scud-filled Montana lake.",
   "minutes": 9.6,
   "date": "2021-01-05",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "ODze7a17HoQ",
   "title": "How to Catch Fall Run Steelhead, Cohos and Browns (Brule River, WI)",
   "channel": "hookedupwi",
   "why": "How to fish fall-run steelhead, cohos and browns on Wisconsin's Brule River, from early fall low water to late-fall high water.",
   "minutes": 18.6,
   "date": "2020-10-30",
   "regions": [
    "boreal-forest",
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "E_8SmPDgtlM",
   "title": "Trophy Brown & Rainbow Trout Ice Fishing tips/tricks",
   "channel": "Darren's Northern Life",
   "why": "Ice fishing Patterson Lake in southwestern Manitoba for trophy brown and rainbow trout with a jawjacker.",
   "minutes": 10.4,
   "date": "2020-10-19",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "Ofe0_p70K-Q",
   "title": "Best LURE for Trout Fishing DELAYED HARVEST Waters! (Sore Lip 'Em All!)",
   "channel": "NRV Outdoors",
   "why": "Best lure for catching trout in Virginia delayed harvest waters, with stocking and regulation notes.",
   "minutes": 25,
   "date": "2020-10-07",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "sJm03FmPD_A",
   "title": "Summertime Skamania Steelhead FRENZY on Lake Michigan",
   "channel": "ChiCityYaker",
   "why": "Kayak fishing summertime Skamania steelhead on Lake Michigan off Chicago.",
   "minutes": 12.8,
   "date": "2020-07-01",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "H4QCDPkZ1wE",
   "title": "Tiny Water Giant Fish - In Line Spinners For Rainbows - Miracle Mile",
   "channel": "Jimmy In The Wild",
   "why": "Mid-spring in-line spinner fishing for rainbows on Wyoming's Miracle Mile of the North Platte in high runoff water.",
   "minutes": 10.4,
   "date": "2020-06-08",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "TPzCOy__7Ho",
   "title": "Pennsylvania Trout Fishing Tips",
   "channel": "Pautzke Bait",
   "why": "Pautzke's tips for catching Pennsylvania stocked trout as the season opens.",
   "minutes": 10.1,
   "date": "2020-04-07",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "NblgJnHj3Z0",
   "title": "Can It get any better than this? - Winter on the Lower Mountain Fork(Ep. 5)",
   "channel": "Outdoor Highlife",
   "why": "Winter fly fishing on Oklahoma's Lower Mountain Fork at Beavers Bend, with a spillway creek and the evening hole.",
   "minutes": 10.9,
   "date": "2020-03-11",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "yqFaPnhYdok",
   "title": "Awesome Trout Fishing Minutes from Gatlinburg Without the Crowds",
   "channel": "Pautzke Bait",
   "why": "Where and how to catch trout minutes from Gatlinburg, Tennessee, without the crowds.",
   "minutes": 7,
   "date": "2019-06-26",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "summer"
   ]
  }
 ],
 "brown-trout": [
  {
   "id": "dp1S9uAtix4",
   "title": "White River - Easy DIY Fly Fishing for Brown Trout",
   "channel": "Angling Archaeology ",
   "why": "Easy DIY fly fishing for White River, Arkansas, brown trout with flies, leader, tippet and gear.",
   "minutes": 27.2,
   "date": "2026-09-28",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "UEVBsXHoAgA",
   "title": "I Found an AMAZING Stream Full of Wild Brown Trout! (Late Summer Fly Fishing in Pennsylvania) ",
   "channel": "MP Fishing",
   "why": "Finding wild brown trout in a Pennsylvania stream in late summer after rain and cooler temperatures.",
   "minutes": 20.9,
   "date": "2026-08-21",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "VM8iI0Zt0u0",
   "title": "48 Hour Trout Fishing Adventure - Black Hills, Camping & Brown Trout",
   "channel": "North Star Fishing",
   "why": "Solo 48 hours in South Dakota's Black Hills searching streams and lakes for brown, rainbow and brook trout.",
   "minutes": 23.5,
   "date": "2026-08-07",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "WTP7W-GWNd0",
   "title": "Hopper Season is ON FIRE at Deckers! Trout Smashing Chubby Chernobyls on the South Platte",
   "channel": "Ian Karcher | Miles and Mayflies",
   "why": "Hopper season at Deckers on Colorado's South Platte, with trout smashing a Chubby Chernobyl.",
   "minutes": 8,
   "date": "2026-07-30",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "qzPM5Kdq9qk",
   "title": "INSANE Day of Streamer Fishing for BIG BROWN TROUT (Summer Fly Fishing in Pennsylvania)",
   "channel": "MP Fishing",
   "why": "Streamer fishing wild Pennsylvania browns when summer rain cools the water enough to turn the fish on.",
   "minutes": 16.6,
   "date": "2026-07-17",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Gls6lhfXulQ",
   "title": "West Branch Delaware River Trout Fishing",
   "channel": "Fishin bugs",
   "why": "Catching big wild browns on New York's West Branch Delaware River in July.",
   "minutes": 13.5,
   "date": "2026-07-03",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "fNMr0YZDN5I",
   "title": "Trout Fishing New Hampshire's Baker River",
   "channel": "Pautzke Bait",
   "why": "Bait setups and techniques for trout on New Hampshire's Baker River in the White Mountains in June.",
   "minutes": 8.3,
   "date": "2026-06-09",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "7iVsKysp9r8",
   "title": "2026 Wisconsin Driftless Trout Fishing | Brown and Brook Trout | Filmed on GoPro HERO10 Black",
   "channel": "Cunningham Outdoors",
   "why": "Spring trout fishing in Wisconsin's Driftless streams in May, targeting wild brown and brook trout.",
   "minutes": 23,
   "date": "2026-06-08",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "hlFTEQ1EHWs",
   "title": "Spring Fly Fishing for WILD BROWN TROUT in Central Pennsylvania (Sulphur Hatch)",
   "channel": "MP Fishing",
   "why": "An evening sulphur hatch on a central Pennsylvania river, with high flows and big wild browns.",
   "minutes": 21.2,
   "date": "2026-05-29",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "2ArT7tFgrLc",
   "title": "Spring Fly Fishing Central Pennsylvania for BIG WILD BROWN TROUT (Grannom Hatch)",
   "channel": "MP Fishing",
   "why": "Spring fly fishing a famous central Pennsylvania river for big wild browns during the grannom caddis hatch.",
   "minutes": 14.4,
   "date": "2026-04-11",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "kVos3_O4vjw",
   "title": "Lake Ontario Brown Trout Fishing Report | March 15th | Monroe County ",
   "channel": "Captain Richard Hajecki",
   "why": "A mid-March Lake Ontario brown trout report from Monroe County with the lures and spoons being used.",
   "minutes": 5.9,
   "date": "2026-03-15",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "GikeOeF1Wus",
   "title": "Farmington River Trout Fishing",
   "channel": "Pautzke Bait",
   "why": "How to catch trout on Connecticut's heavily stocked Farmington River with a local guide, as the spring season starts.",
   "minutes": 10.9,
   "date": "2026-03-08",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "39mfIBZFOEI",
   "title": "Guide to Winter Trout Fishing the Driftless",
   "channel": "Midwest Fly fishing",
   "why": "A guide to winter trout fishing in the Driftless region of Wisconsin and Minnesota.",
   "minutes": 18.9,
   "date": "2026-02-04",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "AQwzp7zbVng",
   "title": "Lake Ontario Fall Brown Trout with Kings mixed in",
   "channel": "Vision Quest Sport Fishing",
   "why": "Targeting fall brown trout on Lake Ontario when kings are not around, filmed in September.",
   "minutes": 7.3,
   "date": "2026-01-31",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "sSqXcctPDe0",
   "title": "Euro Nymphing the Farmington River CT | Big Brown Trout",
   "channel": "Diabolical Drifts",
   "why": "Euro nymphing Connecticut's Farmington River in winter conditions, working depth, weight and drift for a big brown.",
   "minutes": 14.7,
   "date": "2026-01-11",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "9wAn2_CRwvs",
   "title": "Winter fly fishing for wild brown trout ( Pennsylvania)",
   "channel": "Keystone natives",
   "why": "Winter fly fishing for wild brown trout in Pennsylvania with small pheasant tail nymphs.",
   "minutes": 9.8,
   "date": "2025-12-22",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "Zm8mrynpIDQ",
   "title": "The Hunt - for Large Wild Brown Trout (A Pennsylvania Fall Fly Fishing Story)",
   "channel": "Trout Owl",
   "why": "Hunting a large wild brown trout in Pennsylvania in the fall.",
   "minutes": 12.5,
   "date": "2025-11-06",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "deO9fSFWYbQ",
   "title": "*NEW RECORD* Giant Brown Trout Caught In Low Water | Catskill Fly Fishing",
   "channel": "Downstream & Downrange",
   "why": "Fishing low water in the Catskills in October, where a record brown trout was caught.",
   "minutes": 14.5,
   "date": "2025-10-22",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "c4yHBYarZsU",
   "title": "I Discovered the Holy Grail Stream for Monster Brown Trout",
   "channel": "Saskatchewan Fisher",
   "why": "Hiking miles up a Saskatchewan creek in late summer for wild brown trout.",
   "minutes": 16.6,
   "date": "2025-08-30",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "SBxeLPqqFvE",
   "title": "This Minnesota Driftless stream has SO MANY BROWN TROUT! Hopper Dropper time is here",
   "channel": "Driftless Brook Trout Fishing",
   "why": "Hopper-dropper fishing a Minnesota Driftless stream in July, using a hopper, caddis and wooly bugger.",
   "minutes": 21.4,
   "date": "2025-07-25",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Qr2_m5UgRJg",
   "title": "10+ MASSIVE BROWN TROUT (PB!!) | STREAMER FISHING SOUTHERN ALBERTA",
   "channel": "Torin",
   "why": "A full streamer float on the Bow River from Policeman's Flats to McKinnon Flats for big brown trout.",
   "minutes": 16.7,
   "date": "2025-07-12",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "rs6bmEEnnsc",
   "title": "Trout Fishing in South Ontario 2025 - Fly Fishing / Nymphing the Upper Credit River",
   "channel": "Fishing with TJ",
   "why": "Nymphing the Upper Credit River near Toronto in June for resident brown trout.",
   "minutes": 14.3,
   "date": "2025-06-19",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "pkAH8uEdLag",
   "title": "SPRING LAKE ONTARIO Brown Trout (ft. Fishin Clinician)",
   "channel": "Guided +",
   "why": "Early-season Lake Ontario brown trout fishing around the Southern and Niagara Bar area with a charter captain.",
   "minutes": 12,
   "date": "2025-02-04",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "NZPvGCvDCs4",
   "title": "TROUT FISHING Pennsylvania For Big Winter Brown Trout #trout #fishing #troutfishing",
   "channel": "Chasing The Wild with Dusty Rhoads",
   "why": "Fishing a small Pennsylvania stream for big winter brown trout with Mepps spinners.",
   "minutes": 29.3,
   "date": "2025-01-30",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "1S0FL2o550U",
   "title": "Fishing for World-Class Trout on Lake Michigan (Wisconsin Harbors)",
   "channel": "BDBassin",
   "why": "Fishing Wisconsin's Lake Michigan harbors in December for giant brown trout and steelhead.",
   "minutes": 18,
   "date": "2024-12-20",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "kFhoV_Ce_HY",
   "title": "STREAMER FLY FISHING FOR GIANT BROWN TROUT!! (Colorado Pt. 1)",
   "channel": "Hardman Fishing Adventures",
   "why": "Streamer fishing for giant fall brown trout in Colorado, and why big browns are so cautious.",
   "minutes": 25.4,
   "date": "2024-10-05",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "TFlzrNucsLU",
   "title": "Wisconsin Brown Trout fishing { Driftless region fly fishing }",
   "channel": "Midwest Fly fishing",
   "why": "Streamer fishing Wisconsin Driftless brown trout in early October with a sonar sink tip line.",
   "minutes": 6.9,
   "date": "2024-10-03",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "sR1P_5ACuWk",
   "title": "Dry Fly Fishing the Deerfield River",
   "channel": "North Pier Angling ",
   "why": "A day of dry fly fishing on the Deerfield River, one of southern New England's best trout fisheries, in early October.",
   "minutes": 19.9,
   "date": "2024-10-02",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "g4rLYRJ_Jes",
   "title": "M37 Trout Routes Tour Ep. 4 | Hopper and Streamer Fishing the Pere Marquette River |",
   "channel": "Christian Gradowski Fishing",
   "why": "Hopper and streamer fishing for wild brown trout on Michigan's Pere Marquette during a summer heatwave.",
   "minutes": 13.5,
   "date": "2024-08-14",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "z6wMBX55VV8",
   "title": "Lake Fishing Brown Trout - (Fly fishing for Brown Trout in Nova Scotia)",
   "channel": "FINS N’ TALES",
   "why": "Fly fishing a Nova Scotia lake for brown trout, with a simple day on the water.",
   "minutes": 29.2,
   "date": "2024-07-16",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "ldMULVP4u3k",
   "title": "Fishing the Bow River in Springtime. Here's what you need to know.",
   "channel": "Bow River Troutfitters",
   "why": "Fishing Alberta's Bow River for big browns in spring with local guides, and what to know before you go.",
   "minutes": 6.5,
   "date": "2024-06-12",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "SVs6TC-2wpk",
   "title": "Streamer Fishing for BROWN Trout { Driftless Fly Fishing series }",
   "channel": "Midwest Fly fishing",
   "why": "Early May streamer fishing for Driftless brown trout with a sink tip line and the flies used.",
   "minutes": 6.3,
   "date": "2023-06-18",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "5hvxMpZ5s4M",
   "title": "Missouri Ozark Brown Trout on Dry Flies - Current River",
   "channel": "FishFearMe",
   "why": "Catching Ozark brown trout on dry flies on Missouri's Current River, walking farther to find open water.",
   "minutes": 6.3,
   "date": "2023-06-17",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "FHuBJ1vnzzA",
   "title": "How To Fish Streamers During Runoff From The Bank | Fly Fishing The Missouri River",
   "channel": "House Of Fly",
   "why": "How to fish streamers from the bank for trout on Montana's Missouri River during high-water runoff.",
   "minutes": 4.5,
   "date": "2023-05-31",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "d2Xyu3__tlM",
   "title": "Spring Brown Trout on Lake Ontario! Trolling Michigan Stinger Spoons Along the Shoreline ~",
   "channel": "Treestand Man Outdoors",
   "why": "Trolling Michigan Stinger spoons at varying depths along the Lake Ontario shoreline for spring brown trout.",
   "minutes": 14.6,
   "date": "2023-04-28",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "d70d70TIMxQ",
   "title": "Streamer Fishing for Brown Trout! (Pennsylvania Fly Fishing)",
   "channel": "Hardman Fishing Adventures",
   "why": "Streamer fishing for Pennsylvania brown trout in early April.",
   "minutes": 10.3,
   "date": "2023-04-04",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "j_HckHnqY5U",
   "title": "Top 3 Stickbaits for Spring Brown Trout Fishing Lake Ontario",
   "channel": "Captain Richard Hajecki",
   "why": "Captain Richard Hajecki's top three stickbaits for spring brown trout on Lake Ontario.",
   "minutes": 4.2,
   "date": "2023-04-03",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "MDLjgcP_GrM",
   "title": "Lake Michigan Brown Trout in Spring, Trolling for Early Spring Brown Trout!",
   "channel": "Red Bearded Predators",
   "why": "Trolling for early-spring brown trout on Lake Michigan, with ice, waves and access challenges.",
   "minutes": 11.8,
   "date": "2023-03-16",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "g5C1TyxQQm0",
   "title": "Fall 2022 Streamer Fishing the Missouri River - Part 1",
   "channel": "Gig Harbor Fly Shop",
   "why": "Fall streamer fishing on Montana's Missouri River with the gear used on a hosted trip.",
   "minutes": 11.9,
   "date": "2022-10-21",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "yI8TDAZxdOA",
   "title": "Fly Fishing with Streamers for Fall Trout",
   "channel": "Vermont Fish & Wildlife Department",
   "why": "Vermont Fish and Wildlife shows how to fish big streamers for fall trout as water cools and flows rise before the spawn.",
   "minutes": 6.3,
   "date": "2022-09-29",
   "regions": [
    "acadian-forest",
    "northeast-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "u6E2h0JsfYE",
   "title": "Summertime Brown Trout",
   "channel": "Combat Fly Fishing",
   "why": "Fishing a remote Colorado canyon for summer brown trout.",
   "minutes": 22.3,
   "date": "2022-08-17",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "2fyeP9vwB_Y",
   "title": "Fishing at Night for Brown Trout - MOUSING!",
   "channel": "Chiefz",
   "why": "Fly fishing mouse patterns at night for trophy brown trout on a northern Michigan tributary, with a guide.",
   "minutes": 11.1,
   "date": "2022-06-16",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "dcCRuZZs0sU",
   "title": "This River is LOADED with WILD Brown Trout! (North Georgia Pt 2 of 2)",
   "channel": "Hardman Fishing Adventures",
   "why": "Fly fishing North Georgia's southern Appalachian streams for wild brown trout.",
   "minutes": 18.3,
   "date": "2022-06-03",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "7Slg-k85L6c",
   "title": "Spring Brown Trout [Milwaukee Harbor] + Garmin LiveScope Test!",
   "channel": "Greg Satina",
   "why": "Spring brown trout in Milwaukee Harbor, Lake Michigan, with electronics used to find fish.",
   "minutes": 7.5,
   "date": "2022-03-30",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "rQuxtiSCfY4",
   "title": "Fly Fishing Lake Ontario Brown Trout (10-29-2020)",
   "channel": "WNY_Fly_Guy",
   "why": "Fly fishing Lake Ontario brown trout in late October as the browns move in after the salmon run.",
   "minutes": 5.1,
   "date": "2020-10-31",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "x616eOhRans",
   "title": "Catskills Fly Fishing Adventure - Targeting Brown Trout with Streamers",
   "channel": "Uncle Larry Outdoors",
   "why": "Hiking two miles into a remote Catskills stream on Easter to target brown trout with streamers.",
   "minutes": 10.3,
   "date": "2020-04-21",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "24EKaEmqYp4",
   "title": "Lake Ontario Spring Brown Trout Fishing | Casting Little Cleos and Moonshine Spoons From the Pier",
   "channel": "Fishin Folks",
   "why": "Casting Little Cleos and Moonshine spoons from a pier for shallow-water spring brown trout on Lake Ontario.",
   "minutes": 22.4,
   "date": "2020-04-10",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  }
 ],
 "yellow-perch": [
  {
   "id": "FFZvVPJ-bkA",
   "title": "Stillwaters 2026 Day 7: Perch Fishing in the Okanagan",
   "channel": "Bobtista",
   "why": "Ultralight spinning gear for abundant perch on an Okanagan lake over the May long weekend.",
   "minutes": 25.4,
   "date": "2026-07-20",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "b2slepwK4Tg",
   "title": "40 Perch in 30 Minutes?! How to Find & Catch Jumbo Green Bay Perch",
   "channel": "MidWest Outdoors",
   "why": "Green Bay guide explains how to find roaming perch schools in summer and why a drop shot beats a slip float.",
   "minutes": 9.1,
   "date": "2026-06-11",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "rwRLQeSmdwI",
   "title": "Walleye & Yellow Perch Attack!! Epic Western PA River (January)",
   "channel": "Your Fishing Adventure",
   "why": "January boat fishing on the Monongahela River in western Pennsylvania for walleye and yellow perch in freezing temps.",
   "minutes": 8.3,
   "date": "2026-01-20",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "wr8MW74z0tc",
   "title": "Finding MEGA Schools of PERCH - Ice Fishing in Massachusetts",
   "channel": "Bay State Bass",
   "why": "Ice fishing a Massachusetts pond: chasing roaming yellow perch schools with a jig and tip-ups in January.",
   "minutes": 12.3,
   "date": "2026-01-17",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "2SMLATZu9BI",
   "title": "How to Keep Perch Fired Up And Aggressive When Ice Fishing!",
   "channel": "hookedupwi",
   "why": "Northern Minnesota ice fishing: how to stay on roaming perch schools using sonar, set lines and a tag-team approach.",
   "minutes": 12.1,
   "date": "2026-01-14",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "eHNbtLe8j9c",
   "title": "First Ice Trophy Yellow Perch, Ice Fishing in Maine",
   "channel": "Fishing With Boyt",
   "why": "First-ice trophy yellow perch fishing in Maine, with notes from a tournament day.",
   "minutes": 13.6,
   "date": "2025-11-28",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "UBRc8iDCSzM",
   "title": "How-to: Ice fish Lake Simcoe Perch (catch the BIGGEST PERCH of your life!) #lakesimcoe #jumboperch",
   "channel": "True North Baits",
   "why": "A guide shows where the Lake Simcoe perch grounds are and the baits he uses to land 14-inch-plus jumbo perch through the ice.",
   "minutes": 9.9,
   "date": "2025-11-20",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "vF9px0qIhAw",
   "title": "We found a CRAZY School of Perch!",
   "channel": "Jay Siemens",
   "why": "Hunting big schools of Lake of the Woods perch in Ontario through the ice with Frostbite spoons.",
   "minutes": 15.1,
   "date": "2025-11-14",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "vrtWwHjjnEE",
   "title": "CRAZY Perch Fishing on Shoal Lake Manitoba!",
   "channel": "Kingsland Outfitting",
   "why": "April perch fishing on Manitoba's Shoal Lake: where big perch were found right after ice-out.",
   "minutes": 13,
   "date": "2025-11-08",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "hWaXgD3UEYo",
   "title": "Where to Fish for Yellow Perch in Chicago | A Guide to Where and When",
   "channel": "Fish.Chicago",
   "why": "Five go-to Chicago-area Lake Michigan spots and when to fish them for fall yellow perch.",
   "minutes": 9.8,
   "date": "2025-11-02",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "mZIvtS9tLbc",
   "title": "Lake Erie Perch: Spots and Techniques",
   "channel": "Shetler's Angling",
   "why": "Where to find Lake Erie perch around the reefs and islands in late September and the techniques to catch them.",
   "minutes": 10.1,
   "date": "2025-09-27",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "xi2vGHP5yFY",
   "title": "LAKE CASCADE Jumbo Perch (and a few Trout and Bass) Early Fall Scouting Mission",
   "channel": "Chris Weber",
   "why": "Early-fall scouting trip for jumbo yellow perch on Idaho's Lake Cascade with two guides.",
   "minutes": 12.4,
   "date": "2025-08-31",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "B82aZtshels",
   "title": "Lake Erie Perch Fishing (Spring Tips)",
   "channel": "JK Fishing",
   "why": "Lake Erie angler walks through the basics of finding and catching spring perch, from rigs to locations.",
   "minutes": 5,
   "date": "2025-06-17",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "4KD7CFOqjmc",
   "title": "Lake Simcoe Jumbo Perch - with Wood Angling",
   "channel": "2B Fishing Guiding Service",
   "why": "A Lake Simcoe guide catches jumbo perch on ned rigs and small swimbaits in early May.",
   "minutes": 10.2,
   "date": "2025-05-02",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "FyVF7UlfHrc",
   "title": "Finding JUMBO Lake Erie Perch in the COLD (Spring 2025 on Long Point Bay)",
   "channel": "Averie Rose",
   "why": "Finding jumbo Long Point Bay (Lake Erie) perch in cold, windy April conditions and how to adjust.",
   "minutes": 22.3,
   "date": "2025-04-11",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "l2M0sv1ru6o",
   "title": "Ice Fishing Lake St. Clair for JUMBO Perch!!",
   "channel": "BassBros",
   "why": "Ice fishing Lake St. Clair in Michigan for jumbo perch, showing how to search for schools on the flats in February.",
   "minutes": 10,
   "date": "2025-02-08",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "JlQvbYYXqEA",
   "title": "This lake is FULL of perch! | Ice Fishing Nimasilla Reservoir Ohio 2025",
   "channel": "Blue Hour Outdoorsman",
   "why": "Ice fishing yellow perch on Nimisila Reservoir in northeast Ohio in February.",
   "minutes": 8.2,
   "date": "2025-02-04",
   "regions": [
    "central-hardwoods",
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "HFGZxozRB3U",
   "title": "Moses Lake Fall Yellow Perch Fishing",
   "channel": "Witte On The Water",
   "why": "Where yellow perch congregate in the fall around Moses Lake, Washington, for boat and bank anglers.",
   "minutes": 7.9,
   "date": "2024-12-04",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "rqVnsQgxJ20",
   "title": "Lake Michigan PERCH FISHING!!!...Finding Perch in the SUMMER!",
   "channel": "OutDoor Believin",
   "why": "Finding Lake Michigan perch in July: where schools hold on the open lake and the simple rigs to catch them.",
   "minutes": 15.2,
   "date": "2024-07-14",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "6EywQikNa6k",
   "title": "How and Where to Catch Big Lake Cascade Perch in the Spring",
   "channel": "OLD HAT OUTDOORS",
   "why": "How and where to catch Lake Cascade, Idaho perch in spring with open water tactics.",
   "minutes": 20.6,
   "date": "2024-05-21",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "Z_4HkUpMlfM",
   "title": "Bank Fishing For Nebraska Yellow Perch",
   "channel": "nFISHn Nation",
   "why": "Bank fishing for yellow perch at a Nebraska reservoir in October, and how to find shore-accessible fish.",
   "minutes": 15.4,
   "date": "2023-10-27",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "5G-zvvB9HxE",
   "title": "Spring jumbo yellow perch fishing from the bank with bobber | Perch fishing at west Washington State",
   "channel": "Bashi Fishing",
   "why": "Bank fishing with a bobber for spring jumbo yellow perch in western Washington.",
   "minutes": 8.8,
   "date": "2023-05-16",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "3LuueTrZ5ZU",
   "title": "The Search For Perch; Tennessee Edition",
   "channel": "Sharing The Outdoors",
   "why": "Searching for yellow perch in Tennessee in spring and how to find where they hold.",
   "minutes": 7.5,
   "date": "2023-05-12",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "8BnTGfFph8w",
   "title": "Jigging for Yellow Perch. Maine Ice Fishing",
   "channel": "Maine Ice Fishing Enthusiast",
   "why": "Ice jigging for yellow perch on a central Maine pond in March, with a look at how the panfish bite topside.",
   "minutes": 21.4,
   "date": "2023-03-11",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "MtnJqFfMzAc",
   "title": "Catching JUMBO Yellow Perch out of Portage, Indiana on open Lake Michigan in February!! 2/25/2023",
   "channel": "Big Lake - Little Boat",
   "why": "Fishing open-water Lake Michigan out of Portage, Indiana in February: where the yellow perch school up and what they bite.",
   "minutes": 24.4,
   "date": "2023-03-01",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "go39OoZrEs0",
   "title": "11 TIPS for Yellow Perch Fishing Fishing the Spring Spawning Run in Maryland; Kayak Perch Fishing",
   "channel": "Kambotrout Fishing",
   "why": "Eleven tips for timing and fishing the spring yellow perch spawning run in Maryland tidal creeks, from gear to lures.",
   "minutes": 21.8,
   "date": "2023-02-27",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "5z_kAJH68j0",
   "title": "Jumbo Perch on Devils Lake",
   "channel": "Jason Mitchell Outdoors",
   "why": "Jason Mitchell and Devils Lake perch guides explain how to find and catch jumbo perch through the ice in December.",
   "minutes": 21.4,
   "date": "2022-12-24",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "UyEVksG_TRw",
   "title": "Lake Sammamish Perch a Palooza",
   "channel": "Moore Sporting",
   "why": "A mid-November day catching eater-size perch on Lake Sammamish, and why finding the big ones is the challenge.",
   "minutes": 19.6,
   "date": "2022-11-20",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "1yNUJP0Mt5U",
   "title": "Lake Simcoe Fall Perch Fishing",
   "channel": "Blue Collar Angling",
   "why": "A fall trip on Lake Simcoe targeting jumbo perch in October, showing where the schools sit and how to fish them.",
   "minutes": 16.2,
   "date": "2022-10-23",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "R2Se4EjS41Q",
   "title": "How To Catch Perch (Location/Lures/Technique)",
   "channel": "Jay Siemens",
   "why": "A Devils Lake, North Dakota guide teaches perch location, lures and technique through the ice from A to Z.",
   "minutes": 21.4,
   "date": "2022-02-01",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "sRu9xWBYWjI",
   "title": "Catching Yellow Perch at Lake Sammamish, Washington | Tri Nguyen",
   "channel": "Tri Nguyen",
   "why": "Catching yellow perch from Lake Sammamish, Washington, in September.",
   "minutes": 4.4,
   "date": "2021-09-08",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Gpa5GD4qI-E",
   "title": "Spring jumbo yellow perch fishing in west WA state | Fishing at Lake Sammamish",
   "channel": "Bashi Fishing",
   "why": "Late spring jumbo yellow perch at Lake Sammamish in western Washington.",
   "minutes": 6.4,
   "date": "2021-05-15",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "ZLACGtleuSw",
   "title": "Lake Washington winter perch fishing",
   "channel": "WAnglingTV",
   "why": "Lake Washington winter perch fishing on a December day.",
   "minutes": 7.2,
   "date": "2020-12-25",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "N-S5X7blYPQ",
   "title": "Ice Fishing the BIGGEST PERCH In North America",
   "channel": "Northwoods Angling",
   "why": "Ice fishing Cascade Lake in Idaho for some of North America's biggest perch.",
   "minutes": 10.3,
   "date": "2020-11-01",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "X6-3fRyhCsE",
   "title": "Lake Washington Winter Perch Fishing Tips - Extended Cut",
   "channel": "Northwest Fishing",
   "why": "Winter perch on Lake Washington, where lakes do not freeze, with tackle and locations.",
   "minutes": 19.5,
   "date": "2020-01-26",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "-3jm4MIdcc8",
   "title": "How to catch Mid-Summer JUMBO PERCH!!!",
   "channel": "Larry Smith Outdoors",
   "why": "Larry Smith breaks down his mid-summer Lake Winnebago jumbo perch spots, lures and rigs.",
   "minutes": 8.8,
   "date": "2019-07-11",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "OyjAEE6GZnE",
   "title": "Perch Fishing Fundamentals in South Dakota",
   "channel": "MidWest Outdoors",
   "why": "Fishing fundamentals for jumbo perch on South Dakota's Lake Poinsette in July.",
   "minutes": 6,
   "date": "2019-07-08",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Pt9W4CMb9vQ",
   "title": "How to Fish for Yellow Perch During the Spring Perch Run",
   "channel": "FishTalk Magazine",
   "why": "How to fish a Chesapeake Bay tributary during the March spring perch run for plentiful yellow perch.",
   "minutes": 3.2,
   "date": "2019-03-12",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "kRPxXRl6VbE",
   "title": "Fall Perch Fishing (Big Stone Lake)",
   "channel": "Jason Mitchell Outdoors",
   "why": "Top late-summer and fall perch tactics on Big Stone Lake on the Minnesota-South Dakota border.",
   "minutes": 10.8,
   "date": "2018-03-30",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer",
    "fall"
   ]
  }
 ],
 "black-crappie": [
  {
   "id": "4Paxgeu_3PI",
   "title": "OCTOBER 1st CRAPPIE - LAKE EUFAULA ALABAMA",
   "channel": "BACK 40 BELIEVERS",
   "why": "Early-October crappie on Lake Eufaula, Alabama, as the water cools and fish begin to change patterns.",
   "minutes": 12.1,
   "date": "2026-10-02",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "m3RXxdKVdvs",
   "title": "LAKE EUFAULA OKLAHOMA CRAPPIE FISHING- APRIL 2026",
   "channel": "Kolten Humphrey Outdoors",
   "why": "Finding crappie near the dam at Oklahoma's Lake Eufaula in spring.",
   "minutes": 18.1,
   "date": "2026-07-24",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "jT-ImTYbmvU",
   "title": "Summer Crappie Fishing Lake Hartwell ",
   "channel": "Carolina Crappie",
   "why": "Summer crappie on drought-low Lake Hartwell: how electronics help find fish.",
   "minutes": 25.2,
   "date": "2026-06-01",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "WEqodQwNjKc",
   "title": "Spring Crappie Fishing with BFS Tackle (Lake Berryessa)",
   "channel": "ZeroHeroFishing",
   "why": "Kayak fishing Lake Berryessa in March to see how far crappie have moved up for the spring.",
   "minutes": 11.3,
   "date": "2026-03-17",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "0WTRHQMSr9I",
   "title": "Best Strategies for Arcadia Lake Crappie Fishing",
   "channel": "Outdoor Oklahoma",
   "why": "Strategies for finding and catching slab crappie at Arcadia Lake in Oklahoma, banks and deeper structure.",
   "minutes": 9.1,
   "date": "2026-01-31",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "ziJaNNxlmjI",
   "title": "Clear Lake Crappie Fishing | Winter Slabs",
   "channel": "Keep It BENT Outdoors ",
   "why": "A winter trip to Clear Lake, California for big crappie and the trick that turned finicky fish on.",
   "minutes": 14.1,
   "date": "2026-01-11",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "53E5wG7OZYQ",
   "title": "Locate & Catch QUICK & EASY Limits of Winter Crappie in Kansas",
   "channel": "Kansas Angling Experience",
   "why": "Locating and catching winter crappie in Kansas reservoirs and the baits and presentations to use.",
   "minutes": 39.2,
   "date": "2025-12-28",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "YzVs4PAAuiU",
   "title": "Winter Crappie Fishing Lake Hartwell ",
   "channel": "Carolina Crappie",
   "why": "Winter crappie on Lake Hartwell: finding the baitfish that lead you to a hot cold-water bite.",
   "minutes": 10.2,
   "date": "2025-12-19",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "gl5mdIz0yqs",
   "title": "Bank Fishing for Giant Crappie in the Winter. Catch and Cook by the Creek.",
   "channel": "East Tennessee Whiskers",
   "why": "Bank fishing East Tennessee creek edges with light tackle for active winter crappie.",
   "minutes": 12.3,
   "date": "2025-12-12",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "7tbFYZWSd_o",
   "title": " Lake Berryessa Crappie Fishing – Fall Action You Don’t Want to Miss!",
   "channel": "Ypv Adventures",
   "why": "Fall crappie on Lake Berryessa, California: finding big deep schools around structure as the water cools.",
   "minutes": 30.6,
   "date": "2025-11-19",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "j8eJ-HwDBDQ",
   "title": "Fall Crappie on Lake Barkley they are biting!!!",
   "channel": "Toby Lillard Fishing ",
   "why": "Fall crappie on Lake Barkley in Kentucky: where they are biting in November and how to catch them.",
   "minutes": 14.9,
   "date": "2025-11-13",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "zNr-juMl93U",
   "title": "How We Found & Caught BIG Fall Crappie on Kerr Lake",
   "channel": "Wild Life Adventures",
   "why": "Where and how big fall crappie were found on Virginia's Kerr Lake: structure, brush and the lures that worked.",
   "minutes": 11.7,
   "date": "2025-10-17",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "fvBMP6KaNbI",
   "title": "How to Catch Southern Lake Champlain White Crappie",
   "channel": "Vermont Master Anglers",
   "why": "A Vermont guide shows where trophy white crappie hold in southern Lake Champlain in October and how to catch them.",
   "minutes": 10.2,
   "date": "2025-10-08",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "nrw7ihebxPs",
   "title": "Crappie Fishing at Truman Lake with Pro Guide Mark Huey | Summer Fishing Tips",
   "channel": "Sportsman's Outfitter and Marine",
   "why": "A Missouri guide pulls crappie on Truman Lake in summer, showing how he finds and presents to fish.",
   "minutes": 9.7,
   "date": "2025-08-18",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "tLuP5Gasg58",
   "title": "HOT Summer Crappie Fishing Under Bridges at Kerr Lake (Buggs Island) July Slab Action in the Shade!",
   "channel": "Wild Life Adventures",
   "why": "Beating the July heat by fishing shaded bridge pilings for crappie on Virginia's Kerr Lake.",
   "minutes": 10.8,
   "date": "2025-07-22",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "R_StKZ0pvj8",
   "title": "Kentucky Lake Crappie Fishing (Spawn 2025)",
   "channel": "3 Pound Crappie Fishing",
   "why": "Kentucky Lake spawn-time crappie fishing in late April, showing how to find and catch shallow fish.",
   "minutes": 8.5,
   "date": "2025-05-01",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "cDehI1EYPbI",
   "title": "HOW TO CATCH SPAWNING CRAPPIE SHALLOW‼️TEXAS CRAPPIE SPAWN 2025‼️",
   "channel": "903 Fishing",
   "why": "Wading muddy-water buck brush for spawning crappie in Texas with a guide, spawn 2025.",
   "minutes": 24.6,
   "date": "2025-04-15",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "fNHox54mRDc",
   "title": "The Best Crappie Fishing Technique at Kentucky Lake",
   "channel": "Lee Meeks: 21_Outdoors",
   "why": "Long-line trolling for crappie on Kentucky Lake in late March, a technique that covers water fast.",
   "minutes": 7.3,
   "date": "2025-04-05",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "W7atjt0k4Xs",
   "title": "February Crappie Fishing in Virginia is Easy Using this Simple Method!",
   "channel": "Mid-Atlantic Outdoorsman ",
   "why": "February crappie on a Virginia pond with a simple bobber and jig, and how to read where fish are holding.",
   "minutes": 20.2,
   "date": "2025-02-26",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "ss1vShIQim0",
   "title": "ALABAMA CRAPPIE IN SPRING - Pickwick & Weiss Lakes",
   "channel": "Karl's Crappie Life",
   "why": "Springtime crappie on Alabama's Pickwick and Weiss lakes with guides casting and trolling jigs.",
   "minutes": 28.2,
   "date": "2025-02-22",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "3luH1ctaEg4",
   "title": "Winter Mississippi Crappie   Sardis Lake 2025",
   "channel": "3 Pound Crappie Fishing",
   "why": "Winter crappie fishing on Mississippi's Sardis Lake with long-pole tactics in January.",
   "minutes": 10.9,
   "date": "2025-01-19",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "oSTtGL2K484",
   "title": "FALL CRAPPIE fishing in North Carolina | #arrigooutdooradventures",
   "channel": "Arrigo Outdoor Adventures",
   "why": "Finding and catching fall crappie on North Carolina's Jordan Lake with a locating technique learned from a local expert.",
   "minutes": 15.8,
   "date": "2024-11-15",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "gyGPrEPDcq8",
   "title": "Catching Crappie on the Bridge!  (Hot Summer Day)",
   "channel": "Jimmy Houston Outdoors Fishing",
   "why": "Bridge fishing for crappie on Toledo Bend in the heat of a Louisiana summer day with a local guide.",
   "minutes": 19.9,
   "date": "2024-09-05",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "_1vxGeEPWBY",
   "title": "LAKE FORK CRAPPIE GET CRUSHED- New full length episode!",
   "channel": "Extreme Angler Media",
   "why": "Vertical jigging hair jigs for summer crappie on Texas' Lake Fork with a local guide.",
   "minutes": 21.2,
   "date": "2024-07-03",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "zz1-Rxhxcvs",
   "title": "Crappie Fishing Brush Piles In Toledo Bend With The KFRED Float Popper Rods & Jigs (Catch & Cook)",
   "channel": "Kendall Frederick",
   "why": "Fishing Toledo Bend brush piles in May with jigs and float rods with a Louisiana guide.",
   "minutes": 26.6,
   "date": "2024-05-16",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "RClHJN9G4Z0",
   "title": "SPRING Crappie Fishing @ Smith Mountain Lake, Va",
   "channel": "Bassin_With_BigMalone",
   "why": "Spring crappie fishing on Virginia's Smith Mountain Lake with light jigs in April.",
   "minutes": 14.6,
   "date": "2024-04-16",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "6YMBcOCD5vU",
   "title": "Catching Winter Crappie EAST TENNESSEE (Bank Fishing)",
   "channel": "TN Bank Fishing",
   "why": "Bank fishing for big winter crappie on Fort Loudoun Lake in East Tennessee: where to walk and what to throw.",
   "minutes": 17.1,
   "date": "2024-01-29",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "K63b-JEDve0",
   "title": "Fishing Fall Crappies and Walleyes on Structure",
   "channel": "Wisconsin Fisherman",
   "why": "Fishing small jigs around a sunken log for fall crappies in Wisconsin, with walleyes mixed in.",
   "minutes": 12.3,
   "date": "2023-10-02",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "9EVhI4--Ku4",
   "title": "How I Catch Spring Pond Crappie in Ontario",
   "channel": "Fishin' with Didz",
   "why": "How an Ontario angler catches spring pond crappie from shore in April, with the lures and spots that worked.",
   "minutes": 21.4,
   "date": "2023-09-02",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "V6RRONTl9-w",
   "title": "Summertime crappie fishing near brush piles on Lake of the Ozarks.",
   "channel": "Travis Lepley",
   "why": "Jigging shallow brush piles for summer crappie on Missouri's Lake of the Ozarks.",
   "minutes": 16.3,
   "date": "2023-07-26",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "2y3blWgaw4s",
   "title": "Minnesota Mid Summer Crappie Fishing",
   "channel": "Zach Michaelson",
   "why": "Chasing mid-summer black crappie on a Minnesota lake, and where they sit after the spawn.",
   "minutes": 11.3,
   "date": "2023-07-19",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "4vvTs-VbLBc",
   "title": "Biggest Crappie of My Life! | Massive School Shallow | Clear Lake Oaks, Ca",
   "channel": "VL Fishing",
   "why": "Finding a shallow school of big crappie at Clear Lake Oaks in February once the pattern clicked.",
   "minutes": 12.6,
   "date": "2023-02-24",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "OluXx_kjES8",
   "title": "Late Ice Crappies in Northern Minnesota",
   "channel": "MidWest Outdoors",
   "why": "Two Minnesota ice anglers talk late-ice tactics for catching crappies in northern Minnesota.",
   "minutes": 5.9,
   "date": "2023-02-20",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "hlTUT-3WzKU",
   "title": "Wade Fishing for Crappie at Grenada Lake",
   "channel": "Mississippi Outdoors",
   "why": "Wade fishing for crappie at Grenada Lake in November in Mississippi.",
   "minutes": 11.9,
   "date": "2022-11-09",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "rMws81BX8h8",
   "title": "Found The Crappies In Post Spawn!",
   "channel": "Fishing Addict",
   "why": "Locating post-spawn crappie on Clear Lake in Northern California in May.",
   "minutes": 15.5,
   "date": "2022-05-27",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "nYQ5GNMKMCA",
   "title": "Crappie in the Santee swamp with Whitey Outlaw",
   "channel": "Chasin The Wild Outdoors tv",
   "why": "Jigging grass and treetops for summertime crappie on Santee Cooper with a local guide.",
   "minutes": 25.9,
   "date": "2021-07-06",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "xiN0Hj6s-mw",
   "title": "Texoma Crappie fishing Part two (2021)",
   "channel": "Macfishing",
   "why": "Catching post-spawn crappie on Lake Texoma in early June with jigs.",
   "minutes": 12.3,
   "date": "2021-06-06",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "kovbo8m73P8",
   "title": "Massive Michigan Crappie! (Spring Crappie Fishing)",
   "channel": "ZACKYOUNGFILMS",
   "why": "Trolling for big spring black crappie on a Michigan lake and how to set up the spread.",
   "minutes": 13.9,
   "date": "2021-05-15",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "XM_wLozCviQ",
   "title": "LATE ICE Slamming MONSTER CRAPPIE!",
   "channel": "Wisconsin Fisherman",
   "why": "Finding roaming late-ice crappie on northern Wisconsin lakes through the ice.",
   "minutes": 14.4,
   "date": "2021-03-16",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "xFzq7QLcZkw",
   "title": "How To Find EARLY Spring Crappies",
   "channel": "Jay Siemens",
   "why": "Using electronics and vertical jigging to find school-up early spring crappies on an Ontario lake.",
   "minutes": 10.3,
   "date": "2020-05-16",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "CG0qslyTwzk",
   "title": "South Carolina Crappie Fishing",
   "channel": "Pautzke Bait",
   "why": "A South Carolina guide shows how he chases slab crappie on Santee Cooper in the Low Country in April.",
   "minutes": 10.9,
   "date": "2020-04-21",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "9n4gKCawhPE",
   "title": "\"Not So Crappy Fall Crappie\"- Virginia Trophy Panfish| Episode 8",
   "channel": "Have Rods Will Travel",
   "why": "Fall black crappie fishing for Virginia trophy panfish, with the patterns that produced big fish.",
   "minutes": 15.4,
   "date": "2020-03-17",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Ajaf_h8Sjmc",
   "title": "How to Find and Catch Crappies when Ice Fishing",
   "channel": "Tom Boley",
   "why": "Ice fishing crappies around Hayward, Wisconsin: the two most likely winter locations and how to fish them.",
   "minutes": 14,
   "date": "2020-02-10",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "uZmk6V3_qRc",
   "title": "How To Catch Winter Cold Water Crappie",
   "channel": "WOODS & WATERS WITH WOODWARD",
   "why": "Scouting deep water for cold-water crappie on Toledo Bend in winter.",
   "minutes": 24.7,
   "date": "2020-02-06",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "iut7mGKLE0g",
   "title": "Alabama River Winter Crappie Fishing",
   "channel": "Pautzke Bait",
   "why": "Alabama River guides show how winter crappie bite stays strong while pressure drops.",
   "minutes": 8.8,
   "date": "2019-12-11",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "ip9AkracHG4",
   "title": "Vertical Jigging Big Winter Crappie Deep with Tubes",
   "channel": "Wired2Fish",
   "why": "Vertical jigging tubes for deep winter crappie on Kentucky Lake out of Paris, Tennessee, in January.",
   "minutes": 8.4,
   "date": "2019-01-28",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "lxllKZ0mBhU",
   "title": "How to Catch Tidal Crappie on Maryland's Eastern Shore",
   "channel": "Shawn Kimbro",
   "why": "Locating and catching pre-spawn crappie in a tidal stream on Maryland's Eastern Shore with artificials.",
   "minutes": 4.6,
   "date": "2018-03-25",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  }
 ],
 "bluegill": [
  {
   "id": "JnP9MIZicd4",
   "title": "Monster Fall Bluegills in North Dakota!",
   "channel": "Peterson adventures",
   "why": "North Dakota fall bluegill trip with big fish caught on simple tackle.",
   "minutes": 14.8,
   "date": "2026-09-20",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "zRhjbfCZn4w",
   "title": "Bluegill Summer Slam | Northern Wisconsin Panfishing | Filmed on GoPro Hero 7",
   "channel": "Cunningham Outdoors",
   "why": "A long summer day of panfishing in northern Wisconsin, reeling in quality bluegill after bluegill.",
   "minutes": 8.9,
   "date": "2026-09-10",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "XaJkDhikh60",
   "title": "Late summer bluegill from the bank",
   "channel": "J&S Outdoors",
   "why": "Bank fishing for bluegill in Oklahoma in late summer.",
   "minutes": 22.4,
   "date": "2026-08-27",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "ZuTqGvqQpOQ",
   "title": "Wisconsin Bluegill Fishing",
   "channel": "Pautzke Bait",
   "why": "A Wisconsin guide shows summer bluegill tips and tactics on a Pautzke Outdoors panfish trip.",
   "minutes": 7.3,
   "date": "2026-08-25",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "2J6tat_TCqY",
   "title": "DWR Fishing Report: How to Catch Bluegill in Virginia",
   "channel": "Virginia Department of Wildlife Resources",
   "why": "The Virginia DWR shows how to find and catch bluegill and redear on a public fishing lake in late summer.",
   "minutes": 6.2,
   "date": "2026-08-12",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "v3v16JffJqQ",
   "title": "Lake Okeechobee Bluegill Fishing",
   "channel": "JP on the Water",
   "why": "Catching Lake Okeechobee bluegill with grass shrimp in late June.",
   "minutes": 24.9,
   "date": "2026-06-28",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "G_OK-lCXaGg",
   "title": "Utah’s BIGGEST Bluegill? Mantua Slabs & Kids Outfishing Adam",
   "channel": "Outdoors with Adam Eakle",
   "why": "Chasing giant bluegill at Utah's Mantua Reservoir in late June.",
   "minutes": 13.7,
   "date": "2026-06-28",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "PVk8RgmRaVU",
   "title": "SECRET EAST TEXAS LAKE HOLDS GIANT BLUEGILL!! BLUEGILL FISHING 2026!!",
   "channel": "903 Fishing",
   "why": "Sight-fishing spawning bluegill beds for giant coppernose bluegill on an East Texas lake in June.",
   "minutes": 28.3,
   "date": "2026-06-18",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "spring",
    "summer"
   ]
  },
  {
   "id": "lzqVpLeWsls",
   "title": "This Bait is the Best for BULL BREAM | Atchafalaya Basin Swamp",
   "channel": "LA Yak Fishing",
   "why": "Choosing crickets for big Atchafalaya Basin bull bream on a late-afternoon June trip.",
   "minutes": 17.7,
   "date": "2026-06-13",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Kg5Auve6Uxs",
   "title": "Catching BIG Bream with My Wife Vi in South Carolina! (Crickets & Red Worms WORK!)",
   "channel": "Drowning Creek Outdoors ",
   "why": "Catching big bream in 4-5 feet of water in a South Carolina pond with red worms and crickets under a cork.",
   "minutes": 15.5,
   "date": "2026-06-03",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "c7pXMJYqTBE",
   "title": "2026 Spring Bluegill Fishing | Panfishing in Northern WI | Bluegill | Filmed on GoPro HERO7",
   "channel": "Cunningham Outdoors",
   "why": "A spring panfishing trip on Northwoods waters of northern Wisconsin targeting aggressive bluegill and pumpkinseeds.",
   "minutes": 12.5,
   "date": "2026-05-29",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "R-Y3hhh1u9A",
   "title": "Fishing for Big Bluegills in CA",
   "channel": "CALL OF THE OUTDOORS",
   "why": "Fishing for big bluegills around Sacramento in late spring with local baits.",
   "minutes": 12.8,
   "date": "2026-05-25",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "pRj4VnRYbY0",
   "title": "Fishing for Bream and Shellcracker in the Swamps of South Carolina",
   "channel": "Local Life Outdoors",
   "why": "Fishing South Carolina swamps for bream and shellcrackers in spring spawning season.",
   "minutes": 17.6,
   "date": "2026-04-14",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "17mw4HbxV98",
   "title": "Yellow Perch & Bluegill Under the Ice | Marsh Creek Lake PA | ASMR ",
   "channel": "Quiet Fishing",
   "why": "Ice fishing Pennsylvania's Marsh Creek Lake for bluegill and yellow perch, with underwater footage of reactions.",
   "minutes": 4.5,
   "date": "2026-02-11",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "nt77cokidXI",
   "title": "Catching BIG Bluegill in Texas Winter (They Still Bite!)",
   "channel": " Temori Outdoors",
   "why": "Catching bluegill in a Texas winter with corn bait and a slow presentation.",
   "minutes": 9.4,
   "date": "2026-01-17",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "1wcb82yED7U",
   "title": "California Delta Bluegill & Panfish | Finding Massive School Around Deep Docks",
   "channel": "The Frey Experience",
   "why": "Finding a massive bluegill and panfish school around deep docks in the California Delta in January.",
   "minutes": 11.8,
   "date": "2026-01-16",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "nRqhzDk6FkA",
   "title": "EARLY ICE BLUEGILLS-Michigan Ice Fishing 2025",
   "channel": "Moss Outdoors",
   "why": "Finding early ice on a Michigan Lower Peninsula lake and getting on a strong bluegill bite.",
   "minutes": 22.9,
   "date": "2025-12-23",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "Wt6SugFonEw",
   "title": "Bluegill Fishing on Potholes Reservoir ",
   "channel": "Dave Graybill",
   "why": "Tying a simple rig for big Potholes Reservoir bluegill in eastern Washington in August.",
   "minutes": 7.5,
   "date": "2025-08-24",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Fc1Jog-TvK0",
   "title": "This Lake is LOADED with Monster Bluegills!",
   "channel": "Larry Smith Outdoors",
   "why": "Larry Smith and a guide on Wisconsin's Madison chain of lakes share tips for locating trophy bluegills in shallow spring water.",
   "minutes": 22.6,
   "date": "2025-06-20",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "m92zs1X26TA",
   "title": "How and When to catch Big Bluegill on Okeechobee",
   "channel": "Roland Martin Outdoors",
   "why": "Using May full-moon spawning beds on Lake Okeechobee to catch big bluegill on crickets and small lures.",
   "minutes": 17.3,
   "date": "2025-05-26",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "06J3MeqYPes",
   "title": "Red Ear & Bluegill The Perfect Panfish Combination",
   "channel": "Lee Meeks: 21_Outdoors",
   "why": "Kentucky Lake's redear and bluegill fishery in May and how to find both species.",
   "minutes": 9.2,
   "date": "2025-05-21",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "T0-eYq3V_J8",
   "title": "How To Find Bluegill Beds Easily Without Electronics",
   "channel": "Lee Meeks: 21_Outdoors",
   "why": "Casting a drop shot to find Kentucky Lake bluegill beds about a week before peak spawn in early May.",
   "minutes": 6,
   "date": "2025-05-08",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "WlezwA6hgfQ",
   "title": "FIRST ICE Bluegill Fishing! | Jigging Bluegills on TIMBER!",
   "channel": "Red Bearded Predators",
   "why": "First-ice bluegills on a southern Wisconsin lake by jigging near downed timber.",
   "minutes": 6,
   "date": "2024-12-09",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "F9p_YWmXgkQ",
   "title": "This spot was loaded with bedding BULL BREAM | Louisiana Swamp",
   "channel": "LA Yak Fishing",
   "why": "Fishing crickets under an ultralight slip cork for bedding bull bream in Louisiana's Atchafalaya Basin in June.",
   "minutes": 22.4,
   "date": "2024-06-18",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "g_5FwsVyoFw",
   "title": "Fly-Fishing Colorado: World Class Panfishing",
   "channel": "Cutthroat Casters",
   "why": "Fly-fishing Colorado reservoirs for bluegill and crappie in May.",
   "minutes": 14.6,
   "date": "2024-05-29",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "vTQDDMUNa94",
   "title": "Big Stone Lake Seasonal Ice Fishing Patterns (Perch and Big Bluegill)",
   "channel": "Lagoona Guide Service / Capt. Ryan Kelly",
   "why": "A Big Stone Lake guide explains seasonal ice-fishing patterns for perch and big bluegills across the ice season.",
   "minutes": 30,
   "date": "2023-12-27",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "iwymFxi-VQo",
   "title": "CATCHING HUGE SHELLCRACKER & BLUEGILL! LAKE KISSIMMEE #fishing",
   "channel": "WG Outdoors",
   "why": "Slip-bobber fishing for shellcracker and bluegill on Lake Kissimmee right before the June full moon.",
   "minutes": 21.9,
   "date": "2023-06-03",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "spring",
    "summer"
   ]
  },
  {
   "id": "Zan6e7CbgZc",
   "title": "Bluegill and bass through Ohio ice",
   "channel": "Ohio Bass Assassin",
   "why": "Ice fishing Ohio for bluegills, plus a few bass, in February.",
   "minutes": 10,
   "date": "2023-02-19",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "iGz1A1WdPOQ",
   "title": "Cold Water Bluegills",
   "channel": "Louisiana Blackwater Fly Fishing",
   "why": "Fly-fishing cold bayou water in Louisiana for bluegills that have dropped below the thermal line.",
   "minutes": 22.8,
   "date": "2022-11-25",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "sK1K6Gy-Sp8",
   "title": "Bedding Bluegill Bonanza at a NJ Park Pond",
   "channel": "Fishing With LardAlmighty",
   "why": "Sight-fishing bedding bluegill at a New Jersey park pond in June.",
   "minutes": 14.1,
   "date": "2022-06-29",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring",
    "summer"
   ]
  },
  {
   "id": "5tKDMXcXGxs",
   "title": "Bluegill and Shellcracker Fishing on Kentucky Lake",
   "channel": "Cumberland Outdoorsman",
   "why": "Late-spring bluegill and shellcracker fishing on Kentucky Lake at a favorite sunfish spot.",
   "minutes": 19.2,
   "date": "2022-06-05",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring",
    "summer"
   ]
  },
  {
   "id": "kzThVE3XEVs",
   "title": "Coppernose Bluegill Fishing on Lake Perris California",
   "channel": "BigBassDreams",
   "why": "Targeting Florida-strain coppernose bluegill in spring at Lake Perris in Southern California.",
   "minutes": 11.9,
   "date": "2022-04-05",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "Fd00pvedOmk",
   "title": "SUMMERTIME BEDDING BREAM ON SANTEE COOPER",
   "channel": "Chasin The Wild Outdoors tv",
   "why": "Chasing summertime bedding bream with a Santee Cooper guide.",
   "minutes": 26,
   "date": "2022-01-26",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Tyd_Z5iSQfY",
   "title": "Ice Fishing Minnesota for Trophy Bluegills - In Depth Outdoors TV S16 E4",
   "channel": "InDepthOutdoorsTV",
   "why": "Ice anglers target big bluegills on a special-regulation central Minnesota lake and break down the pattern.",
   "minutes": 28.5,
   "date": "2021-12-12",
   "regions": [
    "great-lakes-st-lawrence",
    "boreal-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "CKQO9-E7wq4",
   "title": "Fall Pond Fishing for Wisconsin Bluegill",
   "channel": "Pautzke Bait",
   "why": "A Wisconsin guide shows his favorite methods for catching bluegill in ponds during the fall.",
   "minutes": 7.2,
   "date": "2021-11-02",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Dy2E7n_oQ2A",
   "title": "Fall Kayak Fishing Lake Allatoona for Bream Bluegill!",
   "channel": "Fishing Is Therapy",
   "why": "Fall kayak fishing Lake Allatoona, Georgia, for bream and bluegill on red worms with ultralight gear.",
   "minutes": 14.4,
   "date": "2020-10-27",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "dhypZzQ57NM",
   "title": "Fall fishing for panfish at Hunters Lake in Pennsylvania. Live bait & lures.  Giant Bluegill!",
   "channel": "PhishTacos Fishing and Stuff",
   "why": "Fall panfishing on a northeastern Pennsylvania lake using worms and small jigs for big bluegills.",
   "minutes": 18.5,
   "date": "2020-10-09",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "QII2rBzIELU",
   "title": "How to Locate/Catch Bluegill On the California Delta",
   "channel": "Vincent Lor",
   "why": "A quick lesson on locating and catching bluegill on the California Delta with a fly.",
   "minutes": 6,
   "date": "2020-06-23",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "c3E6HUgCh-c",
   "title": "Bluegill Fishing In The Fall",
   "channel": "330 MaNiaC",
   "why": "Minnesota fall bluegill fishing when big fish feed heavily before winter.",
   "minutes": 10.6,
   "date": "2019-10-02",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  }
 ],
 "channel-catfish": [
  {
   "id": "_B6EU8DfSm8",
   "title": "We Filled the Truck with Atchafalaya Swamp Catfish!",
   "channel": "Bonded by the Land",
   "why": "Running dead pole lines for catfish in Louisiana's Atchafalaya Spillway in July.",
   "minutes": 17.6,
   "date": "2026-07-04",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "lK2skRt7sYU",
   "title": "Fishing for Channel Catfish in Lockport, MB",
   "channel": "Roam With J+A",
   "why": "Shore fishing for channel catfish on the Red River at Lockport, Manitoba during the spring bite.",
   "minutes": 7.2,
   "date": "2026-05-22",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "H_LwFraMZkY",
   "title": "Giant Channel Catfish on the Red River of the North — North Dakota's Best Kept Fishing Secret",
   "channel": "MidWest Outdoors",
   "why": "A Red River guide explains how to catch giant channel cats on the North Dakota-Minnesota border in May.",
   "minutes": 9.2,
   "date": "2026-05-19",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "GytzIk-wD6o",
   "title": "Catching Big Channel Catfish on the St. Lawrence River",
   "channel": "JT Fishing Dot TV",
   "why": "Chasing big channel cats on the St. Lawrence River in late April with a new bait approach.",
   "minutes": 5.9,
   "date": "2026-04-28",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "Tif11_tCqXw",
   "title": "CATFISHING THE SUSQEUHANNA RIVER IN EARLY SPRING (Devils Den) Pt. 1",
   "channel": "S&GFishing",
   "why": "Night fishing for catfish on the Susquehanna and Juniata rivers in early spring.",
   "minutes": 14.2,
   "date": "2026-04-11",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "ww21mC2Jvr8",
   "title": "Sacramento River CHANNEL CATS fishing",
   "channel": "ReelSlowFishing",
   "why": "Fishing a park on the Sacramento River for channel cats in January.",
   "minutes": 14.7,
   "date": "2026-01-13",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "533vb8poFjE",
   "title": "Rio Grande Low Water Catfishing New Mexico ",
   "channel": "Catfish Cameron",
   "why": "Cut bait on the low-water Rio Grande in New Mexico as the biggest catfish feed up before winter.",
   "minutes": 6,
   "date": "2025-11-02",
   "regions": [
    "deserts"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "aK3GBlf0bxw",
   "title": "HOT Morning Targeting Big Fall Channel Catfish (Red River of the North, North Dakota)",
   "channel": "The River Addict",
   "why": "Targeting big fall channel cats on the Red River of the North in North Dakota.",
   "minutes": 10.4,
   "date": "2025-09-29",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "7uAbX_MqCrs",
   "title": "Fishing a Summer Catfish Holding Ground from the Bank (Lake Camanche)",
   "channel": "ZeroHeroFishing",
   "why": "Fishing a summer catfish holding area from the bank at Lake Camanche, with rig and bait details.",
   "minutes": 12.6,
   "date": "2025-07-03",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "CG8vMKCorXs",
   "title": "How to Catch Catfish Using Jugs Eufaula AL Lake",
   "channel": "Outdoors With Darryl",
   "why": "A tutorial on catching catfish with jugs on Lake Eufaula, Alabama in June.",
   "minutes": 5.3,
   "date": "2025-06-10",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "u9Q2Zpnv2fs",
   "title": "(PREMIER) CAPE FEAR COLD WATER CATS!",
   "channel": "Carolina ALL OUT",
   "why": "Cold-water cats on North Carolina's Cape Fear River with a guide explaining his strategies for big catfish.",
   "minutes": 25.1,
   "date": "2024-08-11",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "-LQ3COlB0Bk",
   "title": "CATFISH Honey Hole For Easy LIMIT In California DELTA‼️ #catfish #fishing #fish #funny #delta #new",
   "channel": "Bank Fishing",
   "why": "A California Delta bank spot where catfish bit all day in July when bluegill would not.",
   "minutes": 10.9,
   "date": "2024-07-24",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "H60LeL1NkxI",
   "title": "The Ultimate Guide to Catching Stocked Catfish in Urban AZ",
   "channel": "TheFishinMagician2.0",
   "why": "A guide to catching stocked catfish in Arizona urban ponds and how the stocking schedule works.",
   "minutes": 16.2,
   "date": "2023-10-18",
   "regions": [
    "deserts"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "HAs45qNQYo8",
   "title": "I'm Hooked on Night Fishing for Catfish in New Mexico!",
   "channel": "Wildhook Adventures",
   "why": "Night fishing a drainage ditch next to the river in New Mexico for catfish in early September.",
   "minutes": 5,
   "date": "2023-09-06",
   "regions": [
    "deserts"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "iCPvcQctRn8",
   "title": "The Kitties Come Out At Night - Thames River Southern Ontario Fishing For Catfish",
   "channel": "Heavy2handsoutdoors",
   "why": "Night fishing for channel catfish on Southern Ontario's Thames River in August.",
   "minutes": 10.1,
   "date": "2023-08-08",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "yXIIN7hlsOo",
   "title": "Spring River Catfishing - Pre-spawn Blue and Channel Catfish. Live Crappie, Bluegill, and cut bait.",
   "channel": "Half Fast Outdoors",
   "why": "Cut and live bait for pre-spawn blue and channel catfish on Indiana's White River in April.",
   "minutes": 10.5,
   "date": "2023-04-23",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "aq2v7TcaTtI",
   "title": "The Catfish Stock Has Begun! Arizona Pond Channel Catfishing",
   "channel": "TheFishinMagician2.0",
   "why": "Arizona urban ponds are stocked every three weeks until June, with tips for catching the channel cats.",
   "minutes": 9.2,
   "date": "2023-04-05",
   "regions": [
    "deserts"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "_dvKqVO3ivE",
   "title": "Late Winter Catfishing - Southern Arizona",
   "channel": "Desert Dweller Fishing",
   "why": "Late-winter catfishing in southern Arizona as the water starts to warm and the bite begins.",
   "minutes": 7.2,
   "date": "2023-03-13",
   "regions": [
    "deserts"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "ViIdISkl0GQ",
   "title": "Camping for BIG Winter Catfish",
   "channel": "East Texas Angler Jordan",
   "why": "Winter channel catfish camping trip in East Texas.",
   "minutes": 20.8,
   "date": "2023-01-31",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "5BSgxNY533U",
   "title": "FALL CATFISH PATTERNS | Lake of the Ozarks",
   "channel": "In Depth Angling",
   "why": "A breakdown of fall catfish patterns, locations and baits on Missouri's Lake of the Ozarks.",
   "minutes": 13.1,
   "date": "2022-10-24",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "kYcs0Zhmdzo",
   "title": "Lake Erie Catfish with captain Shane",
   "channel": "WingDinger Outdoors",
   "why": "A Lake Erie charter captain adjusts to put catfish in the boat on a September day.",
   "minutes": 12.8,
   "date": "2022-09-21",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Um7N6Hn2Hu4",
   "title": "How to catch GIANT Channel Catfish- Red River",
   "channel": "FishOnLuke",
   "why": "How to catch giant channel catfish on the Red River of the North in September.",
   "minutes": 13,
   "date": "2022-09-21",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "0EdGZmpkWzg",
   "title": "Summer Channel Cats Lake Fork",
   "channel": "armadillo outdoor adventures",
   "why": "Catching eater-size channel cats on Texas' Lake Fork in a few hours before the July heat gets unbearable.",
   "minutes": 13.7,
   "date": "2022-07-26",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "uxSF_7XFjks",
   "title": "South Dakota Channel Catfishing (Biggest of the year!)",
   "channel": "Webbsquest",
   "why": "A South Dakota channel catfish day in July using a secret bait.",
   "minutes": 15.9,
   "date": "2022-07-10",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "nsfi5Vk9pds",
   "title": "Spring Channel Catfish on the Grand River! Awesome Day of Fishing!",
   "channel": "She Loves To Fish",
   "why": "A spring day of channel cat fishing on Ontario's Grand River near Dunnville, one of Canada's best channel catfish rivers.",
   "minutes": 20.6,
   "date": "2022-05-19",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "AawRTjIw7bg",
   "title": "Lake Havasu April Fishing Report - Catfish - Techniques and Spots",
   "channel": "In Season Nevada",
   "why": "April report on catfish techniques and spots at Lake Havasu.",
   "minutes": 3.8,
   "date": "2022-04-27",
   "regions": [
    "deserts"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "XKIXZPRHj5Q",
   "title": "SANTEE COOPER Shallow Water for BIG Catfish",
   "channel": "Jim's Catfishing and Gear",
   "why": "Catching lots of catfish in shallow water on Santee Cooper's Lake Moultrie in early spring.",
   "minutes": 19.9,
   "date": "2022-03-01",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "-H2yX6v_Uts",
   "title": "WINTER CATFISHING IN GEORGIA",
   "channel": "Eve's Vlog",
   "why": "Winter catfishing in Georgia for channel and blue cats with live bait in cold water.",
   "minutes": 12.9,
   "date": "2021-12-01",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "bQ6BoPqBoSs",
   "title": "CHANNEL CAT FISHING ON OTTAWA RIVER",
   "channel": "Fishing WTB",
   "why": "A summer day channel cat fishing on the Ottawa River from a cottage.",
   "minutes": 13.7,
   "date": "2021-08-01",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "78AkRKKlvGQ",
   "title": "Allegheny River Catfish Fishing",
   "channel": "PA Backwoods",
   "why": "Fishing the Allegheny River for flathead and channel catfish in early July.",
   "minutes": 4.9,
   "date": "2021-07-05",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "w5U3Ifn0UB0",
   "title": "Channel CATFISH On The OTTAWA RIVER - FILM (Catfish Fishing Tips)",
   "channel": "Tough Country",
   "why": "Ottawa River anglers test spring channel catfish when little else is open and share what worked.",
   "minutes": 13,
   "date": "2021-05-30",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "zOBwf0CkzZQ",
   "title": "BIG Channel Catfish on the Delaware River",
   "channel": "FinFurFeather",
   "why": "Catfishing the Delaware River on the PA/NJ border with bluegill bait for a 10-pound-plus channel cat in April.",
   "minutes": 5.1,
   "date": "2021-04-26",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "TJ6XC1ti5ic",
   "title": "How We Catch Winter Catfish in KY",
   "channel": "3 Plus 1 Outdoors",
   "why": "Winter catfishing on Kentucky's Barren River Lake and how this crew catches cold-water cats.",
   "minutes": 6.7,
   "date": "2021-02-01",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "Xlnl7IiQHY4",
   "title": "Winter Catfishing, Susquehanna River Channel Catfish",
   "channel": "Ralph Barton",
   "why": "Winter channel catfish on the Susquehanna River with cut bait when the river is too muddy for walleye.",
   "minutes": 7.8,
   "date": "2021-01-04",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "JWauWUJrCms",
   "title": "How to catch channel catfish in early fall on Lake Rhodhiss.",
   "channel": "The Catfish King",
   "why": "Early-fall channel cats on North Carolina's Lake Rhodhiss: shad bait and deep scour holes and bridge pillars in 9-20 feet.",
   "minutes": 16.6,
   "date": "2020-10-06",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "_vmVJj7xM_U",
   "title": "CHANNEL CATFISH, SMALLMOUTH, and MORE! SHENANDOAH RIVER FISHING",
   "channel": "TheFishinMagician2.0",
   "why": "Camping and fishing the Shenandoah River in September for channel catfish, smallmouth and sunfish.",
   "minutes": 13.5,
   "date": "2020-09-25",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "dNMknruXRng",
   "title": "'PRE-WINTER'... BIG DELTA CHANNEL CATFISH!",
   "channel": "YOUR BACKYARD FISH'N VIDEOS",
   "why": "California Delta channel cats move to deep wintering holes in late summer and fall, and how to find them.",
   "minutes": 17.3,
   "date": "2020-09-08",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "83tvXRIm3lM",
   "title": "Channel Cat Fishing on the Connecticut River",
   "channel": "New England Sportsmen Outdoors",
   "why": "Fishing for channel cats on the Connecticut River, where the fishery has exploded.",
   "minutes": 5.8,
   "date": "2020-09-04",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "summer",
    "fall"
   ]
  },
  {
   "id": "sYBj_4JhGeI",
   "title": "SUMMERTIME CHANNEL CATFISH! Let's Fish #20-2020 SouthWEST Lake Whitney, Texas",
   "channel": "Let's Fish",
   "why": "A summertime channel catfish trip on Lake Whitney, Texas with a Let's Fish guest anchor.",
   "minutes": 25,
   "date": "2020-07-18",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "q_4YEXeep4U",
   "title": "DELTA CATFISH ... IT'S A SPRING THING!",
   "channel": "YOUR BACKYARD FISH'N VIDEOS",
   "why": "Spring is a great time to catfish the California Delta: baiting canals and fishing them.",
   "minutes": 9.4,
   "date": "2020-05-16",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "U_JsK8a_48Q",
   "title": "How to catch CHANNEL CATFISH in the Detroit River- Chicken liver",
   "channel": "Win City Outdoors",
   "why": "How to add chicken liver to your catfish arsenal for channel cats on the Detroit River in late September.",
   "minutes": 10.1,
   "date": "2019-09-30",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "YXUGuJj99YM",
   "title": "Allegheny River Catfish",
   "channel": "All In Outdoors",
   "why": "Two anglers catfish the Allegheny River in western Pennsylvania in May, covering where and how they fish for cats.",
   "minutes": 8.3,
   "date": "2019-05-30",
   "regions": [
    "appalachian"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "yABmLoT3SJE",
   "title": "Chattanooga Catfish Fishing",
   "channel": "Pautzke Bait",
   "why": "Downtown Chattanooga's stretch of the Tennessee River as one of the best places to catch catfish in the Southeast, in May.",
   "minutes": 12,
   "date": "2019-05-20",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "DO3Qeo1NNFY",
   "title": "Santee Cooper Summer Catfishing",
   "channel": "Pautzke Bait",
   "why": "Cut herring soaked in catfish nectar to catch midday Santee Cooper catfish in summer heat.",
   "minutes": 12.1,
   "date": "2018-08-21",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Xy8CvcqSCLc",
   "title": "BEST BAIT FOR DELTA 'CHANNEL CATFISH' ...PERIOD !",
   "channel": "YOUR BACKYARD FISH'N VIDEOS",
   "why": "Why crayfish are the go-to bait for California Delta channel catfish in spring and summer.",
   "minutes": 6.7,
   "date": "2018-05-12",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring",
    "summer"
   ]
  },
  {
   "id": "GRJW1kDfbMY",
   "title": "Ice Fishing for Nebraska Channel Catfish",
   "channel": "FISH365",
   "why": "Why catfish school up under the ice and how to find them on the deepest parts of Nebraska lakes.",
   "minutes": 4.5,
   "date": "2017-01-19",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  }
 ],
 "chinook-salmon": [
  {
   "id": "m0wU_ZnavIg",
   "title": "Feather River Salmon Fishing: Setups, Rigs & Live Action (Capt. Brett Brady)",
   "channel": "Catch America",
   "why": "A guide's setups, rigs and tactics for king salmon on California's Feather River during the September run.",
   "minutes": 26,
   "date": "2026-09-30",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "-j6AVGKTLAU",
   "title": "How to Catch Fall King Salmon From Shore | Lake Michigan Guide",
   "channel": " PS Outdoors ",
   "why": "A Lake Michigan guide explains the stages of the fall run and where to find shore-staging king salmon at piers and harbors.",
   "minutes": 10.7,
   "date": "2026-09-21",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "4NOCs2v981s",
   "title": "2026 Fishing For Salmon On The American River (The Report)",
   "channel": "HangNFish",
   "why": "A September check on the American River to see whether the fall king salmon run has begun.",
   "minutes": 11.9,
   "date": "2026-09-10",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "ba1Uhf7i2AI",
   "title": "Sacramento River Barge Hole Salmon Opener",
   "channel": "Angler West TV",
   "why": "The Aug 1 opener on the Sacramento River at the Barge Hole and Red Bluff with a local guide.",
   "minutes": 22.5,
   "date": "2026-09-10",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "carLecO7eSU",
   "title": "Lake Ontario Salmon Fishing Report | August 30th | Oak Orchard Creek in Orleans County, NY ",
   "channel": "Captain Richard Hajecki",
   "why": "A Lake Ontario captain's late-August report off Oak Orchard Creek, New York, on where kings are and what they take.",
   "minutes": 4.9,
   "date": "2026-08-30",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer",
    "fall"
   ]
  },
  {
   "id": "Tx187Vz-GGw",
   "title": "Everything YOU Need to Know for Sacramento River King Salmon Bank Fishing (2026)",
   "channel": "Vincent Lor",
   "why": "Everything needed to bank fish Sacramento River king salmon when the season returned in July 2026.",
   "minutes": 14.9,
   "date": "2026-07-18",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "3CliHanFNmc",
   "title": "Chinook and Coho Fishing Westport WA",
   "channel": "Northwest Fishing Fanatics ",
   "why": "Westport, Washington ocean kings and silvers taking brined herring in July, with a look at the setup.",
   "minutes": 14.3,
   "date": "2026-07-11",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "AG8-iTPCO7g",
   "title": "How to Fish Meat Rigs for Lake Ontario Salmon | Trolling with Divers, Downriggers & Wire Line",
   "channel": "FishUSA",
   "why": "A captain explains meat rigs for Lake Ontario king salmon with divers, downriggers and wire line.",
   "minutes": 4.7,
   "date": "2026-06-18",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "hiSgcDAkPCE",
   "title": "Epic Spring King Salmon Action on Lake Ontario! (South Shore Trolling)",
   "channel": "JK Fishing",
   "why": "Trolling the Niagara Bar on Lake Ontario's south shore for spring kings, covering gear, depths and speeds.",
   "minutes": 9.7,
   "date": "2026-05-21",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "sBR7CnKlRQU",
   "title": "CALIFORNIA KING SALMON LIMIT 2026 - First Trip a SUCCESS",
   "channel": "Die Hard Fishing",
   "why": "A first trip of the 2026 season catching a limit of California ocean king salmon in May.",
   "minutes": 13.8,
   "date": "2026-05-06",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "7cCLrWcQR44",
   "title": "Spring Chinook Tips for Fishing - Lower Columbia and Willamette Rivers",
   "channel": "BRIDE OUTDOORS ",
   "why": "Eight tips for spring chinook on the lower Columbia and Willamette rivers when you only get a few chances a day.",
   "minutes": 14.8,
   "date": "2026-04-03",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "lXR4OWDlqRE",
   "title": "The Ultimate Guide: Plunking for Spring Chinook (Columbia River) #SpringChinook #salmonfishing",
   "channel": "Outdoors with Unc.",
   "why": "How to plunk for spring chinook from the sandy beaches of the Columbia River in Washington.",
   "minutes": 7,
   "date": "2026-03-29",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "J79UtvXPoRU",
   "title": "Washington Coast Salmon Fishing",
   "channel": "Angler West TV",
   "why": "Trolling deep water off the southern Washington coast near Ilwaco for bright upriver kings and coho in August.",
   "minutes": 22.5,
   "date": "2025-08-14",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "QnFEDYXaxaQ",
   "title": "Columbia River Hanford Reach Salmon Fishing",
   "channel": "Mack's Lure",
   "why": "Fall-run chinook on the Hanford Reach with a guide using flashers and spinners.",
   "minutes": 19.2,
   "date": "2025-08-07",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer",
    "fall"
   ]
  },
  {
   "id": "02MO7KNDB24",
   "title": "CLEARWATER River Spring Chinook in Idaho! | Techniques for Success | Eggs & Spin N Fish for Salmon!",
   "channel": "Day One Outdoors",
   "why": "Techniques for Idaho's Clearwater River spring chinook using eggs and spin-n-glos, with rigging tips.",
   "minutes": 27.2,
   "date": "2025-06-13",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "gOPfgHtIx4E",
   "title": "Spring CHINOOK salmon!! | Snake River!!",
   "channel": "Reflection Fishing ",
   "why": "A day plugging Kwikfish for spring chinook on the Snake River, covering the plugs and approach.",
   "minutes": 7.2,
   "date": "2025-06-04",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "drkObBuswQI",
   "title": "Tips For Catching Salmon When The Fishing Is Tough!",
   "channel": "Lake Michigan Angler",
   "why": "Lake Michigan guides share adjustments for catching salmon when the bite is tough in early summer.",
   "minutes": 20.6,
   "date": "2025-06-03",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "TriVLteObI8",
   "title": "How to catch spring King Salmon on Lake Michigan",
   "channel": "Hooked On Michigan",
   "why": "Trolling 40-60 feet of water in May on Lake Michigan for spring kings with spoons and flies.",
   "minutes": 14,
   "date": "2025-05-06",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "dk-oSgHQ7s0",
   "title": "How To Crush Blackmouth (Chinook) In The Puget Sound 2025",
   "channel": "Zach Stocking Adventures",
   "why": "How to crush blackmouth chinook in Puget Sound in late winter and early spring.",
   "minutes": 14.3,
   "date": "2025-04-08",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "winter",
    "spring"
   ]
  },
  {
   "id": "jmG5h85GlbA",
   "title": "June SALMON BITE on LAKE ONTARIO",
   "channel": "Guided +",
   "why": "A guided day trolling Lake Ontario out of Port Dalhousie, Ontario, for chinook in June, showing where fish were found.",
   "minutes": 16,
   "date": "2024-08-31",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "P-q8jMLvkdQ",
   "title": "How To Salmon Fish - Fraser River Mouth Chinook Top Producing Flashers & Teaser Heads",
   "channel": "Pacific Angler TV",
   "why": "Flashers, bait and teaser heads for the Fraser River mouth chinook opening in September in southern BC.",
   "minutes": 6,
   "date": "2024-08-28",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "ZglJtUjwKM4",
   "title": "Basic Salmon Fishing Rig - Fall Salmon River Fishing",
   "channel": "Fish Along with the OFAH",
   "why": "A basic salmon rig for fall river fishing on New York's Salmon River from a provincial angling group.",
   "minutes": 5.7,
   "date": "2022-09-22",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "LPH_ZeyMVjY",
   "title": "Columbia River (Astoria/B10) Fall Salmon",
   "channel": "Angler West TV",
   "why": "The Buoy 10 fishery out of Astoria, finding the right depths, lures and tides for fall chinook.",
   "minutes": 22.5,
   "date": "2022-07-16",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer",
    "fall"
   ]
  },
  {
   "id": "tY_kU7EOf0Y",
   "title": "Summer Salmon in Idaho | Everyone Tagged Out!",
   "channel": "Dinko Bosnjak",
   "why": "A summer chinook trip on an Idaho river where Fish and Game recycled hatchery salmon so more anglers could fish.",
   "minutes": 15,
   "date": "2022-01-04",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "3vzW9ZOT7NY",
   "title": "Hanford Reach Columbia River Salmon Fishing",
   "channel": "Plughoff Outfitters",
   "why": "Chinook fishing the Hanford Reach of the Columbia near Vernita Bridge in October, Washington's free-flowing upper river.",
   "minutes": 5.7,
   "date": "2021-10-19",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "7DcK1RYuF6c",
   "title": "Tips & Tricks | San Francisco Area King Salmon Fishing",
   "channel": "ChrisPfish",
   "why": "A how-to for San Francisco area ocean king salmon fishing as the season is about to open.",
   "minutes": 13.5,
   "date": "2020-04-02",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "9wb7ErcAhXk",
   "title": "BLACKMOUTH | Washington's Winter Salmon!",
   "channel": "NW Fishing Secrets",
   "why": "How to catch blackmouth salmon in Puget Sound in winter by trolling from a small boat.",
   "minutes": 18.9,
   "date": "2020-02-13",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "winter"
   ]
  }
 ],
 "coho-salmon": [
  {
   "id": "5GtxgClBqN4",
   "title": "Salmon River | Huge Coho| Great Times and Great Friends",
   "channel": "The Buck Ups",
   "why": "A camping and fishing trip to the Salmon River at Pulaski, NY, catching huge coho in September.",
   "minutes": 25.1,
   "date": "2026-09-12",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Yi4mhbRbhDA",
   "title": "Alaska Kenai River Silver Salmon Fishing 2026! (CATCH CLEAN COOK)",
   "channel": "MinnDak Outdoors",
   "why": "A four-man limit of Kenai River silver salmon on August 2 with a guide, with catch and cook.",
   "minutes": 19.6,
   "date": "2026-08-09",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "SAvfUJYyLns",
   "title": "Newport Oregon Nonstop Ocean COHO Action! #fishing #salmon",
   "channel": "The Reef Robber",
   "why": "Nonstop ocean coho off Newport, Oregon with pink hoochies and Brad's baits when ocean salmon season opened.",
   "minutes": 12.7,
   "date": "2026-07-27",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "R_-cw72c1oE",
   "title": "Spring Steelhead & Coho Salmon Fishing Lake Michigan Tributaries",
   "channel": "Will",
   "why": "Chasing spring-run steelhead and coho in southeast Wisconsin creeks and rivers off Lake Michigan.",
   "minutes": 18.9,
   "date": "2026-03-15",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "yDoqo9fwjeM",
   "title": "Early Summer Salmon Fishing on Lake Michigan! Coho & Kings ALL Morning!",
   "channel": "Cody S.",
   "why": "Early-summer Lake Michigan trolling showing where and how to find coho and kings in June.",
   "minutes": 16.6,
   "date": "2025-06-03",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "sEBVA-K6hzo",
   "title": "How to: SPRING COHO - 5 keys to success  - Lake Michigan",
   "channel": "Jordan Ziegler",
   "why": "Five keys to catching spring coho on Lake Michigan, from where they hold to presentations.",
   "minutes": 8.1,
   "date": "2025-04-13",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "XImBalXi4bQ",
   "title": "How to Catch Coho Salmon Limit in 30 minutes! Shore Fishing Lake Michigan | Milwaukee Harbor",
   "channel": "Fish Tails",
   "why": "Shore fishing Milwaukee Harbor for a coho limit in 30 minutes on Lake Michigan with inline spinners.",
   "minutes": 13.7,
   "date": "2024-05-13",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "u7XytFVcKAA",
   "title": "Coho salmon fishing in horrible windy conditions | Lake Michigan Tributaries | Wisconsin",
   "channel": "Plee To Be Outdoors",
   "why": "A family trip to Lake Michigan's Wisconsin tributaries in December to catch coho in windy conditions.",
   "minutes": 19.4,
   "date": "2022-12-11",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "vSSn4n2Nxw4",
   "title": "Lake Michigan Tributary Coho Salmon Run Fly Fishing | We Found the Pod | First Coho Salmon Ever!",
   "channel": "Wild Urban Adventures",
   "why": "Fly fishing a Lake Michigan tributary for the fall coho run, finding the pod and landing a first coho.",
   "minutes": 13.3,
   "date": "2022-10-22",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "9UpsQKoapwQ",
   "title": "Tillamook Bay Salmon Fishing",
   "channel": "Pautzke Bait",
   "why": "A guide's tips for succeeding at Tillamook Bay, Oregon's popular salmon fishery, in late September.",
   "minutes": 9.4,
   "date": "2021-09-28",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "R-_Pwfs32Oo",
   "title": "First December Northwest Oregon Steelhead, Coho, Jacks, Searun Cutthroats",
   "channel": "Fontana Outdoors",
   "why": "December northwest Oregon river trip finding late coho alongside winter steelhead and sea-run cutthroat.",
   "minutes": 16,
   "date": "2020-12-13",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "AXyhWL1B8-U",
   "title": "Crazy Shore ACTION for Winter STEELHEAD and COHO-- Lake Michigan Fishing 2020",
   "channel": "Fish Sleep Repeat",
   "why": "Winter shore fishing on Lake Michigan for steelhead and coho in December.",
   "minutes": 9.1,
   "date": "2020-12-12",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "MmIJ3lQn6is",
   "title": "Olympic Peninsula Coho Salmon Fishing",
   "channel": "Pautzke Bait",
   "why": "Drifting a Washington Olympic Peninsula river with a guide for bright November coho and how they are caught.",
   "minutes": 11.1,
   "date": "2020-11-01",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "auLStSBK4S8",
   "title": "WINTER Salmon Fishing | Jigging for Coho | Washington 4K",
   "channel": "NW Fishing Secrets",
   "why": "Washington river guide shows how he learned to jig for late-season winter coho when the salmon season is winding down.",
   "minutes": 15.7,
   "date": "2019-12-05",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "8i5Lc0faa9w",
   "title": "Late Fall Lake Superior Coho Salmon",
   "channel": "Bait Rigs",
   "why": "Late-fall Lake Superior coho: tips and techniques for patterning salmon and trolling crankbaits.",
   "minutes": 12.6,
   "date": "2019-09-22",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "SQEDIk6bS54",
   "title": "How to Fish for Delta Clearwater River Coho Salmon",
   "channel": "Alaska Department of Fish and Game",
   "why": "ADF&G biologist shows how to fish Delta Clearwater River silvers in interior Alaska, late Sept to October.",
   "minutes": 7.6,
   "date": "2018-09-14",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "fall"
   ]
  }
 ],
 "steelhead": [
  {
   "id": "8thHoMIe7RU",
   "title": "Washington's HOTTEST Summer Steelhead Fishing!",
   "channel": "Salmon Trout Steelheader Magazine",
   "why": "Guide Dave Mallahan shows summer steelhead fishing on a productive Washington river.",
   "minutes": 10.8,
   "date": "2026-07-27",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "FF8l1MJsKQA",
   "title": "Late March STEELHEAD Fishing in Lake Ontario Tributaries!!",
   "channel": "Shore Fishing Ontario",
   "why": "Late-March float fishing for the first steelhead of the year in a Lake Ontario tributary in Ontario.",
   "minutes": 14.5,
   "date": "2026-03-29",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "AIyJJ1rIvhg",
   "title": "Spring Steelhead Fishing on Idaho’s Salmon River | Nonstop Action, Huge Fish, Unreal Scenery",
   "channel": "Outdoors with Adam Eakle",
   "why": "Spring steelhead on Idaho's Salmon River out of Riggins with an outfitter.",
   "minutes": 9.9,
   "date": "2026-03-25",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "YgPn3UPh_KY",
   "title": "Spring Steelhead on the Muskegon River | First Chrome of the Season & DNR Check",
   "channel": "Jackpine Savage Outdoors",
   "why": "Spring steelhead on Michigan's Muskegon River, including the first chrome of the season and a DNR check.",
   "minutes": 17.7,
   "date": "2026-03-08",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "5EbxPBSzyUg",
   "title": "Grande Ronde River Steelhead | Jigs, Beads & Eggs!!",
   "channel": "Reflection Fishing ",
   "why": "Float down Washington's Grande Ronde in winter light, fishing jigs, beads and eggs for steelhead.",
   "minutes": 17.8,
   "date": "2026-02-18",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "1r2ZOUy9qno",
   "title": "Eel River Winter Steelhead Fishing",
   "channel": "Angler West TV",
   "why": "Eel River winter steelhead in northern California with an Angler West guide, on a river on the rebound.",
   "minutes": 22.5,
   "date": "2026-02-12",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "aPkiMOzrZ3Q",
   "title": "Clearwater and Snake Fall Chinook and Steelhead Report 9/24/25: Keep Fishing Hard! ",
   "channel": "Jones Sport Fishing",
   "why": "Clearwater and Snake weekly report in late September on fall chinook and steelhead conditions and spots.",
   "minutes": 6.3,
   "date": "2025-09-24",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "JcQ6d71_3LE",
   "title": "Skagit River Tributary Summer Run Steelhead Fishing!!!",
   "channel": "Bourbon Forage Fishing",
   "why": "Fishing a Skagit River tributary for summer-run steelhead in Washington in June.",
   "minutes": 6.5,
   "date": "2025-06-26",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "9uSeKEv2qHQ",
   "title": "Spring Steelhead Fishing in Michigan | Catching Big River Chrome",
   "channel": "Lure of the Wild",
   "why": "Spring steelhead fishing on Michigan rivers, covering where to find big chrome fish.",
   "minutes": 16.1,
   "date": "2025-04-15",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "7vjOfrXL29Q",
   "title": "In Search Of Trinity River Fall Steelhead",
   "channel": "Angler West TV",
   "why": "Fall steelhead on a remote Trinity River stretch loaded with half-pounders and brown trout.",
   "minutes": 22.5,
   "date": "2025-03-14",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "FJVZgUFY-HA",
   "title": "Drift Boat Fishing The Nestucca River For Late Oregon Winter Steelhead - March 2nd 2025",
   "channel": "In And On The Net Fishing",
   "why": "Drift-boat fishing the Nestucca River in early March for late Oregon winter steelhead.",
   "minutes": 15.1,
   "date": "2025-03-04",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "winter",
    "spring"
   ]
  },
  {
   "id": "IwVxD651ZNk",
   "title": "Spey Fishing For Wild Winter Steelhead On Washington's Olympic Peninsula - Ice Out Edition!",
   "channel": "Gig Harbor Fly Shop",
   "why": "Spey-casting for wild winter steelhead on Washington's Olympic Peninsula in February.",
   "minutes": 18.1,
   "date": "2025-02-19",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "0TWgYGgoVb4",
   "title": "Fall Steelhead on the St. Joe River!",
   "channel": "MidWest Outdoors",
   "why": "Fall steelhead on Michigan's St. Joseph River, with tips from a guide on the river.",
   "minutes": 6.2,
   "date": "2024-10-29",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "xjyDl3S6Op8",
   "title": "Trinity River Steelhead || When is the Season? || Confluence Outfitters",
   "channel": "Confluence Outfitters",
   "why": "Trinity River guide explains when the steelhead season runs, filmed in October.",
   "minutes": 4.8,
   "date": "2024-10-14",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "h0cO6hX_Xgk",
   "title": "Fly Fishing for Spring Steelhead in Idaho",
   "channel": "Firefly Fishing",
   "why": "Fly fishing the spring steelhead run in Idaho, including how the run was finally nailed after lost fish.",
   "minutes": 17.7,
   "date": "2024-02-26",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "eTR_ErzqjBA",
   "title": "WINTER Steelhead in Idaho- BOBBER DOWN!",
   "channel": "Dinko Bosnjak",
   "why": "Bobber-down winter steelhead day in Idaho, early-winter fishing that was new to the anglers.",
   "minutes": 11.7,
   "date": "2024-01-05",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "8WcVpSOEnFc",
   "title": "Skamania Summer Steelhead Fishing & Skamania Fishing Tips / How To Catch Summer Run Rainbow Trout",
   "channel": "Reel Michigan Anglers",
   "why": "Michigan river fishing for Skamania summer-run steelhead with tips on where and how to catch them in July.",
   "minutes": 18.5,
   "date": "2023-07-16",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "bnl-9YwqePg",
   "title": "Summer Steelhead Fishing in Indiana",
   "channel": "Pautzke Bait",
   "why": "Pautzke hikes into small Indiana streams for summer steelhead as the Great Lakes bite goes on and off.",
   "minutes": 8.1,
   "date": "2023-07-10",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "S3DgosCgmZQ",
   "title": "4 Days of Winter Steelhead || Trinity River || Confluence Outfitters",
   "channel": "Confluence Outfitters",
   "why": "Guided four days of winter steelhead on California's Trinity River, with adult fish and browns.",
   "minutes": 11,
   "date": "2023-02-11",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "ymWTy3mwvXE",
   "title": "Steelhead Fishing Ohio's Grand River",
   "channel": "Pautzke Bait",
   "why": "Pautzke visits Ohio's Grand River, a stocked Lake Erie steelhead fishery near Cleveland, in December.",
   "minutes": 19.7,
   "date": "2022-12-08",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "SNdpDH0rJOQ",
   "title": "Lake Erie Tributary Steelhead Fishing Fall 2022 (Tips on color/jig head size)",
   "channel": "Kumbo Fishing USA",
   "why": "Lake Erie tributary fall steelhead tips on lure color and jig head size when fish are tough to catch.",
   "minutes": 7.5,
   "date": "2022-11-03",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "SmeO_ybJDmk",
   "title": "How To Fish Michigan City Indiana Pier For Summer Steelhead Skamania! + Runcl Titan 2 3000 Reel!",
   "channel": "The Fisher Brad",
   "why": "How to fish the Michigan City, Indiana pier for summer-run Skamania steelhead in June.",
   "minutes": 8.4,
   "date": "2022-06-09",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "wzKGAEHLuxA",
   "title": "Winter Steelhead Fishing at a Lake Ontario Tributary",
   "channel": "David Teee",
   "why": "Winter Lake Ontario tributary steelhead the day after rain, with full float/centerpin setup listed.",
   "minutes": 8.4,
   "date": "2021-12-14",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "d33D9_3UosA",
   "title": "STELHEAD APRIL CHOME, Oregon coastal fishing",
   "channel": "Fontana Outdoors",
   "why": "April chrome steelhead fishing on an Oregon coastal river.",
   "minutes": 16.8,
   "date": "2021-04-19",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "0rPI842wzBk",
   "title": "Quinault River Broodstock Winter Steelhead",
   "channel": "Angler West TV",
   "why": "Guide Rich Underwood on Washington's Quinault River for winter steelhead with mag lips, soft beads and yarnies.",
   "minutes": 22.5,
   "date": "2021-01-21",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "MmniUSl_XU0",
   "title": "Fly Fishing Oregon FWL Classic Deschutes River Steelhead October",
   "channel": "FLY FISHING WITH LADIN",
   "why": "Swinging traditional flies for Deschutes River steelhead in October with an outfitter guide.",
   "minutes": 19.9,
   "date": "2020-03-14",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "9881dlJlvjs",
   "title": "Michigan Fall Steelhead Fishing",
   "channel": "Pautzke Bait",
   "why": "Guide Mark Chiappini hosts fall Manistee River steelhead in early-snow conditions in northern Michigan.",
   "minutes": 13.9,
   "date": "2019-11-20",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "TmeKllYSj0A",
   "title": "Rogue River Half-Pounder Steelhead!",
   "channel": "Age of Anderson",
   "why": "Annual Rogue River trip for fall half-pounder steelhead in southern Oregon.",
   "minutes": 11.4,
   "date": "2019-11-04",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "QknfeWpM1Eg",
   "title": "Steelhead Fishing in Ohio (lots of ICE)",
   "channel": "5050 Fishing",
   "why": "First-time steelhead trip on an icy Ohio tributary in December, showing cold-weather tactics.",
   "minutes": 12.8,
   "date": "2018-12-11",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  }
 ],
 "atlantic-salmon": [
  {
   "id": "SXeygyK6SC8",
   "title": "CHASING MAINE SALMON - West Branch Penobscot River",
   "channel": "New England Fly Company",
   "why": "Guide swings flies for midseason landlocked salmon on the West Branch Penobscot in Maine, with patterns.",
   "minutes": 6.3,
   "date": "2026-07-11",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "TM38PkeZX8Y",
   "title": "Québec 2024 – Salmon Adventures on Classic Waters",
   "channel": "Frödinflies",
   "why": "Fishing Gaspe's Matapedia and Bonaventure rivers in low water and heat, and the tactics that worked.",
   "minutes": 22,
   "date": "2025-08-24",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "0r1GgNQcqJs",
   "title": "2024 Spring Atlantic Salmon Fishing New Brunswick",
   "channel": "MacPherson outdoors",
   "why": "April trip for black salmon on New Brunswick's Miramichi, guided from a sporting camp in Ludlow.",
   "minutes": 14,
   "date": "2024-04-25",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "fISCGNvPqP8",
   "title": "Landlocked Salmon - Ice Fishing From Camp!",
   "channel": "Maine Trout Whisperer",
   "why": "Ice fishing for Maine landlocked salmon from a camp with live bait and tip-up style setups.",
   "minutes": 23.7,
   "date": "2024-02-01",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "MpiJE1C-eFI",
   "title": "Landlocked Salmon Fishing! [Mission Accomplished!]",
   "channel": "Outdoorsman Channel",
   "why": "Early-July Lake Champlain trip using dipsy divers and downriggers for landlocked salmon and lake trout.",
   "minutes": 9,
   "date": "2023-07-28",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "6oaxCas8Usw",
   "title": "Personal Best Landlocked Salmon, by 6-7 inches. Jigging Lake Trout. Maine Ice Fishing 2023.",
   "channel": "Precision Angling",
   "why": "Maine ice fishing for landlocked salmon and lake trout, with the setup that produced a personal-best salmon.",
   "minutes": 12.1,
   "date": "2023-02-14",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "SQLYWhz46jY",
   "title": "Large Salmon on Muddler Minnow - MSW Miramichi, Oct.1, 2022",
   "channel": "C-Muddler",
   "why": "Large Atlantic salmon taken on a muddler minnow on the Main Southwest Miramichi on October 1.",
   "minutes": 5.3,
   "date": "2022-10-09",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "pb46pvbMayM",
   "title": "Early spring landlocked salmon  | Trolling Maine Ep 1",
   "channel": "Pine State Hunter",
   "why": "Early-spring Maine landlocked salmon trolling with dodgers and smelts, with tackle and lake choice explained.",
   "minutes": 13.2,
   "date": "2022-04-17",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "C9Jwp-qy36w",
   "title": "OUTDOOR PASSION, LAKE CHAMPLAIN MONSTER SUMMER LANDLOCKED SALMON !!!",
   "channel": "OUTDOOR PASSION",
   "why": "Summer downrigger fishing for big landlocked salmon on Lake Champlain with local guides.",
   "minutes": 31.4,
   "date": "2022-03-20",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "_MULqDPf5dA",
   "title": "Catching BIG Salmon: Trolling Shiners on Lake Winnipesaukee, NH",
   "channel": "Explore New England",
   "why": "Trolling live shiners on downriggers for spring landlocked salmon on New Hampshire's Lake Winnipesaukee after ice-out.",
   "minutes": 7.3,
   "date": "2022-03-17",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "dX23T1Jevgw",
   "title": "Gordon Meadow Fall Atlantic Salmon fishing on the Nepisiguit River, New Brunswick.",
   "channel": "The Fishing Musicians",
   "why": "Fall Atlantic salmon fishing on the Nepisiguit River in New Brunswick at Gordon Meadow.",
   "minutes": 4.2,
   "date": "2021-11-14",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "mh-TNVro_oI",
   "title": "Trolling Landlocked Salmon During The Winter Months",
   "channel": "FishHawkElectronics",
   "why": "Angler explains trolling for landlocked salmon on Lake Champlain after most people put their boats away.",
   "minutes": 28.4,
   "date": "2021-10-27",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  }
 ],
 "striped-bass": [
  {
   "id": "xKvzmo6gywM",
   "title": "Striped Bass Migration: Are You Ready for the Fall Run?",
   "channel": "AmericanCatfish",
   "why": "Explains how the fall striped bass migration unfolds by month, starting with the September New England run.",
   "minutes": 23.2,
   "date": "2026-08-28",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Tdb4IHMKBWM",
   "title": "DWR Fishing Report: Spring Striped Bass Fishing in Virginia",
   "channel": "Virginia Department of Wildlife Resources",
   "why": "Virginia DWR report on spring striper fishing in the state's tidal rivers, with where they school.",
   "minutes": 7.5,
   "date": "2026-05-13",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "2cJ-8SVYeY8",
   "title": "CRAZIEST striper fishing in my life! (Herring spawn Lake Murray 3/25/2026 with Mitchell)",
   "channel": "The Fishy Pharmacist",
   "why": "Blueback herring spawn on Lake Murray, South Carolina, on March 25 and the striper bite it creates.",
   "minutes": 22.5,
   "date": "2026-03-26",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "aVV4Eor689U",
   "title": "WINTER Striped Bass FISHING! We Found A FEEDING FRENZY! Chesapeake Bay And Potomac River!",
   "channel": "The Waters Edge",
   "why": "Winter striped bass feeding frenzy on the Chesapeake Bay and Potomac River in January.",
   "minutes": 19.7,
   "date": "2026-01-26",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "NtO5mMpeOl8",
   "title": "Big Stripers At Lake Lanier! Gulls Go Wild!",
   "channel": "FCP Fishing",
   "why": "Cold January Lake Lanier day following seagulls to big stripers after catching spotted bass.",
   "minutes": 20.8,
   "date": "2026-01-22",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "E_-4AEMi5So",
   "title": "Lake Murray Striper Fishing 12/17/25",
   "channel": "John Hughes",
   "why": "December Lake Murray striper day on chrome jigging spoons and Alabama rigs.",
   "minutes": 17.8,
   "date": "2025-12-18",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "4SyQr0VFo5Q",
   "title": "October 2025 Lake Murray Fishing Report",
   "channel": "Chris Blanchette",
   "why": "October Lake Murray fishing report from a striper guide on conditions, where and what is working.",
   "minutes": 19.6,
   "date": "2025-10-17",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "49Ij2fZFq_E",
   "title": "Striped Bass Fishing the MAINE Fall Run. 20 fish over 40\"",
   "channel": "Fishing With Boyt",
   "why": "Maine fall run striper fishing with a guide's season recap and 40-inch-plus fish.",
   "minutes": 33.5,
   "date": "2025-09-16",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "CFfg6IDx8BY",
   "title": "How to Catch Striped Bass in Summer & Fall with Spoons (Rock Creek Striper Guide Service)",
   "channel": "Michael Kaal",
   "why": "Smith Mountain Lake, Virginia guide shows how he jigs spoons for big summer and early-fall stripers.",
   "minutes": 11.1,
   "date": "2025-09-04",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "summer",
    "fall"
   ]
  },
  {
   "id": "mhYqscfqUXg",
   "title": "Monster stripers in May , Nova Scotia Canada.",
   "channel": "EAST COAST FISHING",
   "why": "Nova Scotia guide targets monster May stripers, schoolies and a big fish.",
   "minutes": 8.4,
   "date": "2025-06-17",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "H8m0LcEQ_yM",
   "title": "Nova Scotia's Hidden Fishing Gem! | Bay of fundy Striped Bass",
   "channel": "The Cast Around Crew ",
   "why": "First striped bass trip of the season on Nova Scotia's Bay of Fundy on an early-spring high tide.",
   "minutes": 9.5,
   "date": "2025-05-21",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "KD3znfct8Xg",
   "title": "Spring Striped Bass Fishing Cherokee lake",
   "channel": "DoubleG Bassin",
   "why": "Spring striped bass on Cherokee Lake in East Tennessee, with big fish caught repeatedly.",
   "minutes": 12.6,
   "date": "2025-04-30",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "f3_a9FFVtCM",
   "title": "Sacramento River Spring Striper Fishing from the Bank with Sardines",
   "channel": "ZeroHeroFishing",
   "why": "Bank fishing sardines for spring stripers on the Sacramento River.",
   "minutes": 14.2,
   "date": "2025-04-24",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "UTccMmBiqZ4",
   "title": "Locating Spring Stripers And Bass At Lake Lanier",
   "channel": "FCP Fishing",
   "why": "April Lake Lanier trip locating inactive pre-spawn stripers and bass.",
   "minutes": 17.7,
   "date": "2025-04-06",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "khDop67lNwQ",
   "title": "Lake Cumberland Striper, March 2025 -- From catching shad to catching a limit!",
   "channel": "Miller's Monstrosity",
   "why": "March Lake Cumberland, Kentucky, striper start: catching shad for bait to land a limit.",
   "minutes": 15.6,
   "date": "2025-04-03",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "YIxVpB_0eRE",
   "title": "Catching Striped Bass in BOSTON Harbor | S22 E09",
   "channel": "On The Water Media",
   "why": "Late-summer Boston Harbor blitz where bunker schools bring big stripers, with the gear used.",
   "minutes": 22.1,
   "date": "2025-03-25",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "U0TnUkCYiss",
   "title": "How to Catch Spring Back Bay Striper: A Beginners Guide",
   "channel": "Salty Sam",
   "why": "Beginner's guide to March back-bay striper fishing in New Jersey after winter.",
   "minutes": 11,
   "date": "2025-03-03",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "yZOfFqP2hEw",
   "title": "Catching Stripers in the Snow on the Chesapeake Bay | Blizzards and Stripes",
   "channel": "Fishing Holler",
   "why": "February snowstorm trip for Chesapeake Bay rockfish, a look at winter striper fishing.",
   "minutes": 25.1,
   "date": "2025-02-25",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "fSuvt8OxjGA",
   "title": "California Delta Winter Striped Bass Fishing",
   "channel": "D&D Fishing Co.",
   "why": "California Delta winter striper trip, noting that stripers move slower in winter.",
   "minutes": 6.7,
   "date": "2025-01-10",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "xN8PmtMQyzQ",
   "title": "Sacramento River Spring Stripers (4K)",
   "channel": "Angler West TV",
   "why": "Trolling stained spring runoff on the Sacramento River with a guide using minnow plugs and umbrella rigs.",
   "minutes": 22.5,
   "date": "2024-05-03",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "rE1rOB32or8",
   "title": "Stripers Migration - Where & When Do They Come (CA Delta)?",
   "channel": "Alan Fong Outdoors",
   "why": "Explains where California Delta stripers go and when they arrive, making the Delta their home in fall through winter.",
   "minutes": 8.4,
   "date": "2023-12-11",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "fall",
    "winter"
   ]
  },
  {
   "id": "igU0FQgULiw",
   "title": "Lake Cumberland Summer Striper Fishing!!!",
   "channel": "Aaron Outdoors",
   "why": "Summertime striped bass fishing on Lake Cumberland, Kentucky, with the Aaron Outdoors team.",
   "minutes": 14.6,
   "date": "2023-06-19",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "UdggPP-eClU",
   "title": "Lake Whitney Texas Chasing Topwater Striper and Sand Bass",
   "channel": "J Cox Fishing",
   "why": "Midday topwater stripers and sand bass on Lake Whitney, Texas, in 95-degree summer heat.",
   "minutes": 13.9,
   "date": "2023-06-14",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "2Z_iwWLoMvk",
   "title": "Deadstick Fishing for Stripers on Lake Texoma | How to Deadstick Fish",
   "channel": "Boone Boys",
   "why": "Winter drift-sock and deadstick techniques on Lake Texoma, with bait and jighead choices.",
   "minutes": 13.6,
   "date": "2023-03-11",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "hzIAA_buhbs",
   "title": "5 Man Limit - Winter Striper Deadstick Fishing Lake Texoma | Tips, Techniques & our FISHING SPOT",
   "channel": "Boone Boys",
   "why": "Winter deadstick striper fishing on Lake Texoma with tips on where they are being caught.",
   "minutes": 16.4,
   "date": "2023-02-21",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "CrgJSgwfigk",
   "title": "Catching striped bass in the winter (Boone Lake)",
   "channel": "Michael Kaal",
   "why": "Finding a school of bait for winter striped bass on Boone Lake, Tennessee.",
   "minutes": 13.4,
   "date": "2023-02-17",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "diUW2Fa34nI",
   "title": "Striped bass winter fishing (Boone Lake, TN)",
   "channel": "Michael Kaal",
   "why": "Kayak striped bass fishing in winter on Boone Lake in East Tennessee.",
   "minutes": 14.6,
   "date": "2023-01-16",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "IXYAyE0AmhM",
   "title": "Lake Texoma Striper Fishing Tips-November Seagulls-Striper Express Guide Service",
   "channel": "Striper Express",
   "why": "November seagull action on Lake Texoma and how to approach birds without spooking fish.",
   "minutes": 3.3,
   "date": "2022-11-03",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "jClKibE228g",
   "title": "Fall Striped Bass Fishing the CA Delta [3 Day Trip]",
   "channel": "D&D Fishing Co.",
   "why": "Three-day fall striper trip on the California Delta, working out the pattern.",
   "minutes": 25.6,
   "date": "2022-11-03",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "WLSyFFXntN8",
   "title": "Lake Texoma Stiper Fishing!  Catching Fish Under Birds in the Summer!",
   "channel": "Thump’em up Fishing channel",
   "why": "Late-summer Texoma stripers under birds with a guide, explaining where fish go in summer.",
   "minutes": 10.5,
   "date": "2022-10-23",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "pnP27_jePJ8",
   "title": "Fall Striper Fishing the Holston River in East Tennessee (Trolling Big Swimbaits on Leadcore Line)",
   "channel": "Relic Arms and Custom Engraving",
   "why": "Trolling large swimbaits on leadcore for fall stripers on the Holston River in East Tennessee.",
   "minutes": 31.6,
   "date": "2022-09-30",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "bjFSNXNpJ88",
   "title": "Stripers at the Canal | Pyramid Lake CA | Summer Bite 2022 | @valley_angler #thosezebras #losrayados",
   "channel": "Valley Angler",
   "why": "Summer striper bite at Pyramid Lake near the canal, noting the early-morning bite and midday slowdown.",
   "minutes": 9.1,
   "date": "2022-07-17",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "VoxYR12ej9k",
   "title": "October Seagulls-Topwater Plugs-Lake Texoma Striper Fishing with Striper Express",
   "channel": "Striper Express",
   "why": "October seagulls and topwater plugs on Lake Texoma with a guide service.",
   "minutes": 4.5,
   "date": "2021-10-28",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "zl5S7kUMiZs",
   "title": "Summer Striper Fishing on Lake Murray | Columbia, South Carolina",
   "channel": "Chad Hoover",
   "why": "Summer striper trip on Lake Murray in Columbia, SC, using live bait with a local guide.",
   "minutes": 13.8,
   "date": "2021-08-10",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "uRELzbCsams",
   "title": "Summer SALTWATER Fishing for striped bass (Bay of Fundy)",
   "channel": "FishingisLife",
   "why": "Summer saltwater striper fishing on Nova Scotia's Bay of Fundy, with tides and where fish hold.",
   "minutes": 4.3,
   "date": "2021-06-11",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "HYF-lVU5K6M",
   "title": "Texoma striper fishing --Spring",
   "channel": "Macfishing",
   "why": "Spring Lake Texoma striper trip on metal spoons.",
   "minutes": 12.2,
   "date": "2021-05-26",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "zF8PaV3KNBw",
   "title": "[4K] Norris Lake Fall Striper Fishing",
   "channel": "CityBilly Adventures",
   "why": "Fall striper charter on Norris Lake, Tennessee, with a guide, highlights.",
   "minutes": 8,
   "date": "2021-02-22",
   "regions": [
    "central-hardwoods"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "bw--NfYNEOU",
   "title": "How To Troll for Fall Chesapeake Bay Rockfish and Bluefish",
   "channel": "FishTalk Magazine",
   "why": "How to troll for fall Chesapeake Bay striped bass and bluefish with FishTalk's Lenny Rudow.",
   "minutes": 5.5,
   "date": "2020-10-08",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "RLtAc7yl5JE",
   "title": "Five Guide Tips for Lake Texoma Striper Fishing with Topwater Plugs",
   "channel": "Striper Express",
   "why": "Texoma guides give five tips for topwater plugs as the May topwater season starts.",
   "minutes": 3.2,
   "date": "2020-05-11",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "g8UL-mtm7T0",
   "title": "How to Find Summer Stripers (Pt 1)",
   "channel": "The Original Capt Jack",
   "why": "How to find summer stripers on Lake Lanier, Georgia, where blueback herring and warm water set the pattern.",
   "minutes": 13.2,
   "date": "2019-07-28",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "TUnfXW67pzI",
   "title": "Lake Buchanan Fishing 105 Striper, Hybrids, & Whitebass using deadstick method in January 2018",
   "channel": "skunked again",
   "why": "January deadstick method on Lake Buchanan, Texas, for stripers, hybrids and white bass.",
   "minutes": 10.7,
   "date": "2018-02-05",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "winter"
   ]
  }
 ],
 "arctic-grayling": [
  {
   "id": "Fv782CzV6ng",
   "title": "ALASKA GRAYLING FISHING IN THE SNOW! ❄️🎣 Brown Bear Nearby!",
   "channel": "SurgeWorld",
   "why": "Mid-September Alaska grayling fishing with snow on the ground; what cold early-fall fishing looks like.",
   "minutes": 5.7,
   "date": "2026-09-21",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "RjjiPnl2GFI",
   "title": "The Great Alaskan Adventure - Catching Arctic Grayling Near Fairbanks",
   "channel": "Michilanders Troutdoor Adventures",
   "why": "Four days of September (3rd to 10th) grayling fishing near Fairbanks, Alaska, with 130+ fish landed.",
   "minutes": 42.8,
   "date": "2026-09-16",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Odz5Mve8Gag",
   "title": "DIY Alaska Grayling Fishing",
   "channel": "Matt Sailors",
   "why": "DIY fly trip near Fairbanks, Alaska; dry patterns (mosquito, Adams parachute) for trophies and numbers.",
   "minutes": 27.5,
   "date": "2026-08-24",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "_RngB4Q5DGQ",
   "title": "The Forgotten Fish of Northern BC | Chasing Arctic Grayling on Dry Flies | S3 Ep.7",
   "channel": "Angling North",
   "why": "Chasing Arctic grayling on dry flies in northern British Columbia (Angling North).",
   "minutes": 18,
   "date": "2026-08-22",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "p3w7AMtAtLI",
   "title": "Arctic Grayling Catch and Cook! | Redemption | Yellowknife fishing",
   "channel": "Vincent But",
   "why": "Yellowknife, NWT: grayling push into town at ice-off, with a catch-and-cook of the fish.",
   "minutes": 23.6,
   "date": "2026-06-28",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "K-rr1NDBjW0",
   "title": "Fly Fishing for Arctic Grayling in Alaska",
   "channel": "Matt Riordan",
   "why": "Fly fishing interior Alaska for Arctic grayling as summer arrives.",
   "minutes": 20.1,
   "date": "2026-06-07",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "APK0iG6kvKk",
   "title": "Arctic Grayling Through the Ice | Montana Ice Fishing",
   "channel": "SPKGear",
   "why": "First-ice grayling in Montana: finding fish with LiveScope and fishing jaw jackers.",
   "minutes": 18.5,
   "date": "2025-12-18",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "G5dkyD3kSRw",
   "title": "Epic Arctic Grayling Fishing | East Arm of Great Slave Lake, Northwest Territories",
   "channel": "Frontier Fishing with Ryan MacDonald",
   "why": "Arctic grayling on the Stark River at the East Arm of Great Slave Lake, Northwest Territories.",
   "minutes": 7.8,
   "date": "2025-08-09",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "nI_MkWGgoRI",
   "title": "Montana Arctic Grayling | Alpine lake fishing",
   "channel": "Chance Stack",
   "why": "Fly fishing Arctic grayling in a Montana alpine lake.",
   "minutes": 3.8,
   "date": "2024-07-14",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "1wbV0fLtF1A",
   "title": "Dry Flies for Grayling on Chena River, Alaska",
   "channel": "Wicked Alaska",
   "why": "Dry flies for grayling on the Chena River in northern Alaska.",
   "minutes": 4,
   "date": "2023-08-08",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "8-qOpuprfE8",
   "title": "Fishing for Arctic Grayling in Alaska | Summer Boating Delta Clearwater River",
   "channel": "Simple Living Alaska",
   "why": "Summer day boating Alaska's Delta Clearwater River for grayling and how the river fishes.",
   "minutes": 24.1,
   "date": "2023-08-04",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "TQIGi8L0vX4",
   "title": "WA Fish Quest EP 54: Arctic Grayling",
   "channel": "WA Fish Quest",
   "why": "WA Fish Quest: hiking to Upper Granite Lake, the only water in Washington that holds Arctic grayling.",
   "minutes": 23.7,
   "date": "2023-07-18",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "3pM4uNDU0fQ",
   "title": "SPRING TIME ARCTIC GRAYLING FISHING ALASKA",
   "channel": "Cory L.",
   "why": "Spring float of a public Alaska river for Arctic grayling, drifting and walking over 7 miles of water.",
   "minutes": 4.7,
   "date": "2023-05-18",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "Vm7ybSbhM5g",
   "title": "Catching Grayling in a Montana Mountain Lake! (Tenkara Fly Fishing)",
   "channel": "Tenkara Addict",
   "why": "Tenkara fly fishing a high Montana mountain lake for grayling; filmed in October 2020.",
   "minutes": 13.3,
   "date": "2021-04-10",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "xIR9B4qdtFg",
   "title": "Ice Fishing Backcountry Artic Grayling",
   "channel": "All of the Above Outdoors",
   "why": "Sledding into Montana's backcountry to ice fish Arctic grayling through clear ice.",
   "minutes": 17.4,
   "date": "2020-12-31",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "einqkygHofg",
   "title": "Ice Fishing for Grayling",
   "channel": "Outdoors with Adam Eakle",
   "why": "Ice fishing grayling on the north slope of Utah's Uinta Mountains; lures to use and how to fish them.",
   "minutes": 12.1,
   "date": "2020-12-14",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  }
 ],
 "lake-whitefish": [
  {
   "id": "GEpAtOxiMNc",
   "title": "Flathead River Run Lake Whitefish",
   "channel": "Spilt Milt Productions",
   "why": "Fall whitefish run on the Flathead River, Montana; introduced lake whitefish moving upriver.",
   "minutes": 10.8,
   "date": "2025-10-28",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "94_a2tPawT4",
   "title": "Nobody Fishes for These on Lake Champlain… But I Did",
   "channel": "Woods N Weeds Outdoors.",
   "why": "Lake Champlain whitefish: dialing in depth, presentation and bite to target them on purpose.",
   "minutes": 12.2,
   "date": "2025-10-22",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "5gP8AwoTQbs",
   "title": "Fishing for lake whitefish at Flathead lake MT",
   "channel": "TMF Outdoors",
   "why": "Summer lake whitefish bite on Flathead Lake, Montana: finding the school and fishing it.",
   "minutes": 18.8,
   "date": "2025-08-23",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Uu6VI7d_84s",
   "title": "This Lure Finally Paid Off! Fishing for Whitefish on the Bay of Green Bay | Ice Fishing Wisconsin",
   "channel": "Plee To Be Outdoors",
   "why": "Ice fishing whitefish on the Bay of Green Bay, Wisconsin, and the jig that finally worked.",
   "minutes": 25.1,
   "date": "2025-02-05",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "wre0JJpW6A4",
   "title": "How To Catch Deep Winter Simcoe Whitefish (Minus The Ice)",
   "channel": "Informative Angling",
   "why": "Targeting deep-water Simcoe whitefish at the winter opener: cadences and go-to baits.",
   "minutes": 28.4,
   "date": "2025-01-03",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "b-iXq-n5OgU",
   "title": "River Fishing Fall spawning Lake Whitefish Late November (Flathead River)",
   "channel": "Im Hooked",
   "why": "River fishing fall-spawning lake whitefish on Montana's Flathead River in late November.",
   "minutes": 12.5,
   "date": "2024-11-25",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "ZCZfLnBEtt8",
   "title": "White Fish, At Banks Lake Washington +Set Up",
   "channel": "Pavlus Adventures",
   "why": "Downrigger gear and setup for lake whitefish at Banks Lake, Washington.",
   "minutes": 24.8,
   "date": "2024-08-24",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "m0dVFwsxS8k",
   "title": "ICE FISHING WHITEFISH and LAKE TROUT ON FLATHEAD LAKE MONTANA",
   "channel": "The Fishing Doctors Adventures",
   "why": "Ice fishing whitefish and lake trout on Flathead Lake, Montana, in March.",
   "minutes": 8.2,
   "date": "2023-04-20",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "ff7CdxhmhFk",
   "title": "How to Catch Lake Simcoe WHITEFISH Ice Fishing. (Part 1) Knots and Jigging Patterns.",
   "channel": "FOX FISHING 4K (SUB FOR 4K VIDEOS!)",
   "why": "Lake Simcoe ice whitefish: knots and jigging patterns (part 1).",
   "minutes": 5.6,
   "date": "2023-02-24",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "FnzebxYzBwQ",
   "title": "Lake Superior Whitefish with amazing underwater video!",
   "channel": "Superior Angling",
   "why": "Lake Superior whitefish through the ice with underwater video of the bite.",
   "minutes": 23.5,
   "date": "2023-01-08",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "tkrQvx5CnXw",
   "title": "Lake Michigan Ice Fishing Whitefish || Door County / Green Bay Wisconsin [Underwater Camera]",
   "channel": "The Northwoods Family",
   "why": "Ice fishing whitefish off Door County on Green Bay (Lake Michigan) with an underwater camera.",
   "minutes": 24,
   "date": "2022-03-03",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "VSKVOOZoj7o",
   "title": "Fishing Lake of the Woods Ice Roads - Big Lake Trout & GIANT 27\" Whitefish",
   "channel": "Fish Frostbite",
   "why": "Lake of the Woods ice roads near Kenora, Ontario: a lake trout outing that turns up a 27-inch whitefish.",
   "minutes": 14.6,
   "date": "2022-01-24",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "G8y8Y9Y0HLU",
   "title": "WHITEFISH Ice Fishing! | with more grouse | EP 2of2 | Northern Alberta, Canada",
   "channel": "Wild Food Pursued",
   "why": "Early-December ice fishing for lake whitefish on a northern Alberta lake (with grouse hunting on the side).",
   "minutes": 11.8,
   "date": "2021-12-31",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "4XM4STFvxzs",
   "title": "Fishing for Summertime Lake Whitefish in Washington",
   "channel": "TheWDFW",
   "why": "WDFW short: simple bottom-bait method (gear, line, hooks, weight) for summer lake whitefish at Banks Lake, Washington.",
   "minutes": 7.2,
   "date": "2019-08-06",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "OvMFoaWY_B8",
   "title": "How To Target Spring Whitefish On Lake Simcoe!",
   "channel": "Justin Girard Fishing",
   "why": "How to target spring whitefish on Lake Simcoe, Ontario.",
   "minutes": 18.7,
   "date": "2019-05-28",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "V36Uo4yMKhY",
   "title": "How to Catch Whitefish on Lake Simcoe - Ice fishing",
   "channel": "Seabass Outdoors",
   "why": "Ice fishing Lake Simcoe, Ontario for lake whitefish from 20 to 120 feet; jig and drifter setup.",
   "minutes": 9.6,
   "date": "2019-01-17",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  }
 ],
 "burbot": [
  {
   "id": "fr71C8YGxNA",
   "title": "Ice fishing for BURBOT (underwater footage and debunking myths)",
   "channel": "Target Walleye",
   "why": "Minnesota burbot season: ice fishing with underwater footage and myths debunked.",
   "minutes": 30.4,
   "date": "2026-03-12",
   "regions": [
    "boreal-forest",
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "z3zM4Trt5mI",
   "title": "Kootenai River Burbot: \"Poor Man's Lobster\" CATCH AND COOK",
   "channel": "Weekend Viking Outdoors",
   "why": "Kootenai River (Idaho) burbot catch and cook; harvest reopened in 2019 after the population rebounded.",
   "minutes": 16.1,
   "date": "2026-02-25",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "kO_o6PdyUX8",
   "title": "Locate MORE Burbot W/ WORLD-RECORD Holder!",
   "channel": "Fish Frostbite",
   "why": "World-record holder Sean Konrad on locating and catching more burbot through the ice on Lake Diefenbaker, Saskatchewan.",
   "minutes": 26.9,
   "date": "2026-02-12",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "sqPVy_hcvDs",
   "title": "The Poor Man's Lobster!!!(burbot) Hooking Okanagan Lakes Deep Water Ghosts ",
   "channel": "FBTWILD",
   "why": "Evening burbot on Okanagan Lake, BC: tips for targeting them in late summer as the sun sets.",
   "minutes": 10.2,
   "date": "2025-09-28",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "-G2x56XIvFg",
   "title": "Flaming Gorge  - How To Catch Summer Burbot- Episode 7",
   "channel": "Flaming Gorge",
   "why": "Summer burbot at Flaming Gorge, Wyoming: tactics, finding fish and lures.",
   "minutes": 15.2,
   "date": "2025-07-31",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "1bdlwu0Gq1c",
   "title": "Does BURBOT Really Taste Like LOBSTER?! Final Day ICE FISHING 2025 | Catch & Cook!",
   "channel": "Woods North",
   "why": "Catching and cooking burbot at the end of Vermont's 2025 ice-fishing season.",
   "minutes": 20.7,
   "date": "2025-03-27",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "winter",
    "spring"
   ]
  },
  {
   "id": "Q5-dPBo2ZkE",
   "title": "Ice Fishing for Burbot on Lake Superior 3-2-2025",
   "channel": "Jimmy Jeb Outdoors",
   "why": "Annual early-March burbot trip through the ice on Lake Superior (March 2nd, 2025).",
   "minutes": 10.2,
   "date": "2025-03-12",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "Cs-RIYgxAnY",
   "title": "Ice Fishing Grand Lake For Burbot (New Brunswick, Canada)",
   "channel": "Campfires & Coastlines",
   "why": "Ice fishing Grand Lake, New Brunswick for burbot.",
   "minutes": 14.9,
   "date": "2025-02-18",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "qd8LVxdMXzo",
   "title": "Pier Fishing for Great Lakes BURBOT! | HOW-TO",
   "channel": "PierMichiganFishing",
   "why": "In-depth how-to for catching burbot from Great Lakes piers and harbors: gear, rigging, bait and night tactics.",
   "minutes": 18.7,
   "date": "2024-11-17",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "MPm9ohLNYD0",
   "title": "Riverside Camping & Summer Burbot Fishing",
   "channel": "Simple Living Alaska",
   "why": "Summer burbot fishing in silty Alaska river water, camping under the midnight sun.",
   "minutes": 38.9,
   "date": "2024-06-21",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "ERxHqEuiERY",
   "title": "Burbot Catch & Cook on Lake Sakakawea!",
   "channel": "Ripping Lips Adventures",
   "why": "Catch and cook burbot on Lake Sakakawea, North Dakota (an ice-fishing catch).",
   "minutes": 10.7,
   "date": "2023-04-07",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "EqFqfTnQ_jI",
   "title": "Burbot Fishing & Ice Camping on Lake Diefenbaker Saskatchewan Canada",
   "channel": "Lu Ran Outdoors",
   "why": "Overnight ice-camping burbot trip on Lake Diefenbaker, Saskatchewan; shows the night bite.",
   "minutes": 12.1,
   "date": "2023-03-24",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "JJh3QRMDpEg",
   "title": "Episode 5: Moosehead Cusk Mission",
   "channel": "Ice Fishing Maine",
   "why": "Ice fishing cusk (burbot) on Moosehead Lake, Maine, during a cusk derby.",
   "minutes": 19.3,
   "date": "2023-03-05",
   "regions": [
    "acadian-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "j_ctcxvVq9I",
   "title": "Ice Fishing for Burbot | The Canadian Angle",
   "channel": "MeatEater",
   "why": "MeatEater Canadian Angle ice fishing burbot on Lake of the Woods and why they are underrated sport and table fare.",
   "minutes": 30.2,
   "date": "2023-01-10",
   "regions": [
    "boreal-forest"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "CDeQVmLZ6UA",
   "title": "Pacific Northwest Burbot Fishing",
   "channel": "Spilt Milt Productions",
   "why": "Camping in the Selkirks (WA/ID/MT) and fishing burbot in the evenings; burbot are catchable year-round.",
   "minutes": 14.7,
   "date": "2022-08-19",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "oMaU6RBEK7Q",
   "title": "My Best Day Of Ice Fishing Yet! (Jigging For Champlain Lake Trout and Burbot.)",
   "channel": "AnglingWithAlex",
   "why": "Ice fishing Lake Champlain, Vermont, for lake trout and burbot.",
   "minutes": 22.8,
   "date": "2022-05-03",
   "regions": [
    "northeast-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "-wnZ0-RpjpY",
   "title": "Ice Fishing LAKE SIMCOE BURBOT!",
   "channel": "FOX FISHING 4K (SUB FOR 4K VIDEOS!)",
   "why": "Ice fishing burbot on Lake Simcoe, Ontario: covering water by ATV and where they hold.",
   "minutes": 6.5,
   "date": "2022-03-03",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "2IL_kdlLBME",
   "title": "ICE FISHING a SPILLWAY Full of BURBOT in WYOMING",
   "channel": "Mountain State Angler",
   "why": "Ice fishing a Wyoming spillway for burbot at low light: 20+ fish and the best lures.",
   "minutes": 16.4,
   "date": "2022-03-01",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "D3A4UiJ7jzM",
   "title": "3 Days Ice Fishing in Alaska - Burbot Catch and Cook.",
   "channel": "Outdoor Boys",
   "why": "Three days ice fishing burbot in Alaska with a guide, then catch and cook.",
   "minutes": 25.2,
   "date": "2022-02-05",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "KDiB3w3rhRs",
   "title": "How to Fish for Burbot from Shore",
   "channel": "T Fish",
   "why": "How to fish burbot from shore in Great Lakes harbors in late fall and early winter: rod, line, rig.",
   "minutes": 5.7,
   "date": "2021-11-28",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "fall",
    "winter"
   ]
  },
  {
   "id": "itP4Gxte6fo",
   "title": "How To Catch OPEN WATER BURBOT | Burbot Showdown | Late Fall Fishing Saskatchewan | MONSTER ANGLING",
   "channel": "Monster Angling",
   "why": "Open-water burbot in late fall just before freeze-up in Saskatchewan: spots and techniques.",
   "minutes": 18.5,
   "date": "2021-11-13",
   "regions": [
    "great-plains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "umL9CYUzG9Y",
   "title": "How To Fish MASSIVE Cold Water BURBOT (Lake Michigan)",
   "channel": "Greg Satina",
   "why": "Cold-water burbot off Milwaukee, Lake Michigan: set lines with cut shiners plus jigging in 35 feet.",
   "minutes": 15.7,
   "date": "2020-12-19",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "z3YWHvm7lmo",
   "title": "Catching a RARE Fish (BURBOT) in LAKE ERIE (Catch and Cook) (EELPOUT)",
   "channel": "Vaughn Holderman",
   "why": "Burbot on Lake Erie, Pennsylvania: they move into the shallow bay in winter to stage for spawning; catch and cook.",
   "minutes": 27.9,
   "date": "2020-12-12",
   "regions": [
    "great-lakes-st-lawrence"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "uf4ZrD_CX34",
   "title": "How to Fish for Burbot at Flaming Gorge",
   "channel": "Outdoors with Adam Eakle",
   "why": "Utah DWR biologist shows where to set up on the ice and what depth to fish burbot at Flaming Gorge.",
   "minutes": 8.1,
   "date": "2019-12-11",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "pnBVvSN3ut4",
   "title": "MeatEater Goes Burbot Fishing in Alaska",
   "channel": "MeatEater",
   "why": "MeatEater in Alaska: handheld jigging and tip-ups for burbot through the ice.",
   "minutes": 5.4,
   "date": "2018-12-13",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "winter"
   ]
  }
 ],
 "redfish": [
  {
   "id": "yIRhhkiSF28",
   "title": "Redfish and Black Drum Fishing in Mosquito Lagoon",
   "channel": "Carson Prichard",
   "why": "Sight fishing Mosquito Lagoon redfish and black drum on an early-September day with poor visibility.",
   "minutes": 22.8,
   "date": "2026-09-13",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "q61iuHV1rFw",
   "title": "Where Big Redfish Go In The Summer",
   "channel": "Salt Strong",
   "why": "Where big redfish go in summer: edges, current points, funnels and structure near deeper water.",
   "minutes": 3.6,
   "date": "2026-06-21",
   "regions": [
    "gulf-coast",
    "southeastern",
    "florida-peninsula"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "6C1lzZZdC20",
   "title": "Spring Inshore Fishing Guide (Snook, Redfish, Tarpon)",
   "channel": "HookedWithHunter",
   "why": "Florida spring inshore guide: where redfish, snook and tarpon are and how to adjust.",
   "minutes": 8.4,
   "date": "2026-04-10",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "6Lj2vG7uVD4",
   "title": "Springtime Wade Fishing Texas Flats!",
   "channel": "Eric C.",
   "why": "Springtime wade fishing on Texas flats as mullet arrive and redfish and trout follow.",
   "minutes": 12.1,
   "date": "2026-03-23",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "IlloOs7eNKU",
   "title": "Best Seasons to Fish in Mosquito Lagoon | Trout Fishing, Snook Fishing, Redfish Fishing",
   "channel": "Florida Fishing - Oak Hill Fish Camp",
   "why": "Season-by-season guide to fishing Mosquito Lagoon, Florida, for redfish, trout and snook.",
   "minutes": 8.1,
   "date": "2026-03-22",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "spring",
    "summer",
    "fall",
    "winter"
   ]
  },
  {
   "id": "7-kuq0fhUuo",
   "title": "Spring Redfishing-My Go-To Tactics for More Bites (Find Them FAST)",
   "channel": "Unashamed Adventures",
   "why": "Spring redfish tactics for South Carolina as the water warms.",
   "minutes": 18.1,
   "date": "2026-03-16",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "SH0H_XPyEjU",
   "title": "Wade Fishing the Fall transition for REDFISH! (Corpus Christi, TX)",
   "channel": "FishSlimeTV ",
   "why": "Wade fishing the summer-to-fall transition for redfish near Corpus Christi, Texas as baitfish leave the bays.",
   "minutes": 16.2,
   "date": "2025-11-12",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Zgecb-vDjwY",
   "title": "Why Winter Redfish Abandon the Flats (Charlotte Harbor)",
   "channel": "Charlotte Harbor Fisherman",
   "why": "Charlotte Harbor, Florida: where winter redfish go when they leave the flats.",
   "minutes": 26.9,
   "date": "2025-01-04",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "zNEjz_t5MK4",
   "title": "The Key To Winter Fishing In Crystal River, FL. (Reds, Trout, Sheepshead)",
   "channel": "Hang'em High Sport Fishing",
   "why": "Crystal River, Florida winter fishing for reds, trout and sheepshead: a guide's setup and strategy.",
   "minutes": 21.2,
   "date": "2024-12-19",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "2cu44S1qkP4",
   "title": "How To FIND And CATCH Springtime REDFISH! **Catch, Clean, Cook**",
   "channel": "Forgotten Coast Fishing",
   "why": "Florida's Forgotten Coast: springtime redfish leaving winter creeks for the flats, lures and presentations.",
   "minutes": 25.8,
   "date": "2024-04-04",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "Q_6LaGiOZe4",
   "title": "EARLY FALL REDFISHING in the MARSH! (Grand Isle, LA)",
   "channel": "PFD_TV",
   "why": "Early-fall marsh redfishing at Grand Isle, Louisiana as white shrimp start to move in.",
   "minutes": 7,
   "date": "2023-09-26",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "eCbo99edjEE",
   "title": "How To Find Big Schools Of Redfish In The Spring",
   "channel": "Salt Strong",
   "why": "Everglades trip to find big spring schools of redfish chasing bait.",
   "minutes": 7.8,
   "date": "2023-03-30",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "A0fSRPS6i04",
   "title": "Wintertime In Charleston - Winter Redfish - \"The Sportsman Experience\" - Episode 2",
   "channel": "Sportsman Boats",
   "why": "Wintertime Charleston, SC: finding big winter schools of redfish (Sportsman Boats episode).",
   "minutes": 20.8,
   "date": "2023-02-28",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "gu6uuSfTDyA",
   "title": "Winter Fishing Patterns Redfish Trout & Drum Port Aransas Aransas Pass Rockport Charter",
   "channel": "Clean Fun Fishing",
   "why": "Port Aransas/Rockport, Texas winter patterns for redfish, trout and drum: tracking water temps and where to go.",
   "minutes": 12.7,
   "date": "2021-12-07",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "COmvmb1VJ0Q",
   "title": "How To Catch Redfish In The Summer (Coastal Marsh & Creek Tips)",
   "channel": "Salt Strong",
   "why": "Capt. Jud Brock on summer redfish in marshes and creeks (Texas to Virginia): tides, locations, lures.",
   "minutes": 14.9,
   "date": "2020-06-24",
   "regions": [
    "gulf-coast",
    "southeastern",
    "florida-peninsula"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "l2HAZMjsAnU",
   "title": "The Secret to Catching Winter Redfish and Speckled Trout",
   "channel": "sportsmantv",
   "why": "Louisiana captain's plan for locating winter redfish when a cold front drops water levels.",
   "minutes": 6.4,
   "date": "2019-01-02",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "vPQCIR02a6g",
   "title": "How to catch Bull Reds: Galveston Texas",
   "channel": "David Anderson",
   "why": "Galveston, Texas bull reds fire up at the first fall cold front.",
   "minutes": 4.2,
   "date": "2018-10-17",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "fall"
   ]
  }
 ],
 "speckled-trout": [
  {
   "id": "SA5-0S1rJvs",
   "title": "The Tampa Bay Summer Trout Bite Did NOT Disappoint",
   "channel": "Tryin' With Ryan Fishing",
   "why": "Tampa Bay summer trout bite by kayak: finding stacked schools on flats and current seams.",
   "minutes": 19.1,
   "date": "2026-09-16",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "T-MSlLBXJ3c",
   "title": "September changes everything for speckled trout",
   "channel": "Captain Devin Fishing",
   "why": "How speckled trout and redfish patterns change in September on Louisiana's coast.",
   "minutes": 4.5,
   "date": "2026-08-31",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "6Lj2vG7uVD4",
   "title": "Springtime Wade Fishing Texas Flats!",
   "channel": "Eric C.",
   "why": "Springtime wading on Texas flats for trout and redfish with hard baits as mullet fill the flats.",
   "minutes": 12.1,
   "date": "2026-03-23",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "IlloOs7eNKU",
   "title": "Best Seasons to Fish in Mosquito Lagoon | Trout Fishing, Snook Fishing, Redfish Fishing",
   "channel": "Florida Fishing - Oak Hill Fish Camp",
   "why": "Season-by-season guide to fishing Mosquito Lagoon, Florida, for trout, snook and redfish.",
   "minutes": 8.1,
   "date": "2026-03-22",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "spring",
    "summer",
    "fall",
    "winter"
   ]
  },
  {
   "id": "jqKgi2TFBjU",
   "title": "Fall Speckled Trout Fishing in Mobile Bay | Found Them Up the River!",
   "channel": "GULF2BAY",
   "why": "Fall speckled trout in Mobile Bay, Alabama, during the shrimp run: following bait up the rivers.",
   "minutes": 11.3,
   "date": "2025-10-15",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "w5IoCXTZYok",
   "title": "August Speckled Trout Fishing On the Mississippi Gulf Coast",
   "channel": "Gulf Coast Fishing Adventures",
   "why": "August speckled trout on the Mississippi Gulf Coast: walking topwater baits in summer.",
   "minutes": 31,
   "date": "2025-08-20",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "CXBO6suf4rs",
   "title": "Summer Speckled Trout LOVE These Spots (Here’s How to Find Them)",
   "channel": "Salt Strong",
   "why": "Summer speckled trout spots: bait, potholes and grass near deep water, lure and rod setup (TX, FL, Carolinas).",
   "minutes": 12.7,
   "date": "2025-07-10",
   "regions": [
    "gulf-coast",
    "southeastern",
    "florida-peninsula"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "UULAZA_QR1I",
   "title": "Patterning Springtime Speckled Trout on the Pamlico & Neuse Rivers",
   "channel": "Blind Hog Adventures - with: Cory Furlough",
   "why": "Patterning springtime speckled trout on North Carolina's Pamlico and Neuse Rivers.",
   "minutes": 13.1,
   "date": "2025-04-17",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "zNEjz_t5MK4",
   "title": "The Key To Winter Fishing In Crystal River, FL. (Reds, Trout, Sheepshead)",
   "channel": "Hang'em High Sport Fishing",
   "why": "Crystal River, Florida winter fishing for reds, trout and sheepshead with a guide's setup.",
   "minutes": 21.2,
   "date": "2024-12-19",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "NE4LAmYHgyE",
   "title": "Winter Speckled Trout at Mississippi Artificial Reefs!!",
   "channel": "Tommy Vidrine",
   "why": "Winter speckled trout on Mississippi artificial reefs; popping shrimp where they hold in the sound.",
   "minutes": 8.3,
   "date": "2024-12-18",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "UadfjKcwn5w",
   "title": "Fall Speckled Trout On Georgia Coast",
   "channel": "NICHOLS RETIREMENT EMPIRE",
   "why": "Fall speckled trout on the Georgia coast: big schools on live shrimp under floats and jigs.",
   "minutes": 19.9,
   "date": "2024-10-20",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "ewoI2ilwNf8",
   "title": "How to Catch Speckled Trout During Summer in Panama City, Florida | Beginners Guide",
   "channel": "Greyson’s Garage",
   "why": "Beginner's guide to speckled trout on the flats in summer at Panama City, Florida.",
   "minutes": 18.3,
   "date": "2024-10-16",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "urk2I5ZrF_g",
   "title": "Where Speckled Trout Feed During Winter In Louisiana",
   "channel": "Captain Devin Fishing",
   "why": "Where speckled trout feed in winter on Louisiana's coast once fall spots stop producing.",
   "minutes": 6,
   "date": "2024-02-04",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "KyFo2X__PIA",
   "title": "How To Catch Fish Late Winter & Early Spring (Florida Inshore Fishing Tips)",
   "channel": "See Ya Dude",
   "why": "Late winter and early spring inshore tactics for trout, redfish and snook around Tampa Bay, Florida.",
   "minutes": 18.1,
   "date": "2023-02-14",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "winter",
    "spring"
   ]
  },
  {
   "id": "5NdQzbPLTeE",
   "title": "Quickest & Easiest Way To Find Speckled Trout In Winter",
   "channel": "Salt Strong",
   "why": "Salt Strong: quickest way to find winter speckled trout, fishing south of Savannah, Georgia.",
   "minutes": 15.7,
   "date": "2022-12-31",
   "regions": [
    "southeastern"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "-S0IzpSAJXQ",
   "title": "speckled trout fishing in the fall (Galveston, Texas)",
   "channel": "fishing with Brian McPherson",
   "why": "Fall speckled trout at Galveston, Texas: early high-tide bite in the shallows and lure colors.",
   "minutes": 14.9,
   "date": "2022-10-23",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "R3Xw5GCZXpw",
   "title": "SMASHED Fall Speckled Trout In Biloxi Marsh | Louisiana Fall Fishing",
   "channel": "Louisiana Fishing Blog",
   "why": "Fall speckled trout in Louisiana's Biloxi Marsh: tips for finding and catching them.",
   "minutes": 18.6,
   "date": "2021-10-05",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "fall"
   ]
  }
 ],
 "snook": [
  {
   "id": "Ff9U1_mdf-Q",
   "title": "Beach Snook Fishing - Summer Nights in SWFL",
   "channel": "TanksOnly_Fishing",
   "why": "Night surf fishing Southwest Florida beaches for snook in summer with pinfish and ladyfish.",
   "minutes": 29.6,
   "date": "2026-06-17",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "6C1lzZZdC20",
   "title": "Spring Inshore Fishing Guide (Snook, Redfish, Tarpon)",
   "channel": "HookedWithHunter",
   "why": "Florida spring inshore guide: where snook, redfish and tarpon are and how to adjust.",
   "minutes": 8.4,
   "date": "2026-04-10",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "IlloOs7eNKU",
   "title": "Best Seasons to Fish in Mosquito Lagoon | Trout Fishing, Snook Fishing, Redfish Fishing",
   "channel": "Florida Fishing - Oak Hill Fish Camp",
   "why": "Season-by-season guide to fishing Mosquito Lagoon, Florida, for snook, trout and redfish.",
   "minutes": 8.1,
   "date": "2026-03-22",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "spring",
    "summer",
    "fall",
    "winter"
   ]
  },
  {
   "id": "0T42Xhy6lUo",
   "title": "Catching Snook on Lures in the Brownsville Ship Channel | South Padre TX",
   "channel": "SaltyGillz",
   "why": "Catching snook on lures in the Brownsville Ship Channel near South Padre Island, Texas.",
   "minutes": 11.4,
   "date": "2026-01-05",
   "regions": [
    "gulf-coast"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "NkJJr0vvsPA",
   "title": "HOW TO Catch MORE Winter Snook! - Fishing Tips",
   "channel": "HookedWithHunter",
   "why": "Winter snook routine: reading tides and finding warm-water pockets when the water cools.",
   "minutes": 11,
   "date": "2025-10-14",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "am-iqAB9avQ",
   "title": "The TRUTH About Giant Winter Snook...",
   "channel": "Suns Out Fishing",
   "why": "Why giant snook are still catchable in Florida winters: where to find them and how to catch them when temps plummet.",
   "minutes": 33,
   "date": "2025-01-13",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "K1wqQL40ZT0",
   "title": "How Long Do Snook Stay on The Beach?",
   "channel": "Charlotte Harbor Fisherman",
   "why": "Charlotte Harbor: how long snook stay on the beach as fall arrives and where they go when it gets cold.",
   "minutes": 11.4,
   "date": "2023-09-30",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "jijTZuh_Nzg",
   "title": "Florida Mullet Run Fishing | Tarpon & Snook with Capt. Alex Hughey",
   "channel": "Blair Wiggins Outdoors",
   "why": "Fishing Florida's mullet run off Cape Canaveral for snook and tarpon: tactics and locations.",
   "minutes": 20.7,
   "date": "2023-09-21",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "IsQslWBouho",
   "title": "Winter Snook Fishing East Everglades Key Largo, FL",
   "channel": "Fishing Black Water Sound",
   "why": "Key Largo and East Everglades snook after the winter's first cold front.",
   "minutes": 10.2,
   "date": "2022-12-12",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "c_kIAU7lq6A",
   "title": "Finding WARM water in the WINTER- SNOOK SECRETS",
   "channel": "Head First Fishing",
   "why": "Tampa Bay charter captain on finding warm water in winter, where snook and other fish concentrate.",
   "minutes": 5.5,
   "date": "2022-01-28",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "CsqOO-yKbyg",
   "title": "Lines in the Sand: Fly Fishing for Snook in the Summertime",
   "channel": "Deep See Visuals",
   "why": "Fly fishing snook along Florida's sandy shorelines in the summer heat as they travel toward the inlets.",
   "minutes": 8.9,
   "date": "2021-02-19",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "S2Bb5eM5fSs",
   "title": "How To Catch MASSIVE Snook During the Fall Mullet Run",
   "channel": "Captain Rick Murphy",
   "why": "Capt. Mike Holliday on rigs and baits for big fall snook at Stuart, Florida inlets, docks and jetties during the mullet run.",
   "minutes": 4.5,
   "date": "2020-10-05",
   "regions": [
    "florida-peninsula"
   ],
   "seasons": [
    "fall"
   ]
  }
 ],
 "halibut": [
  {
   "id": "S5m2A7H2aQI",
   "title": "September Halibut Are Still Chewing!!!  🎣🔥🐟 Alaskan Halibut Fishing - Juneau, Alaska! SEP 2026",
   "channel": "Captain Zac",
   "why": "Late-season September Juneau halibut: backtrolling 7 oz glow jigs in 300 feet at the low-tide turn.",
   "minutes": 23.2,
   "date": "2026-09-27",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "IgLQQeJqUdw",
   "title": "We LIMITED OUT on BIG Alaska Halibut! | Elfin Cove Fishing Adventure",
   "channel": "Outdoors with Adam Eakle",
   "why": "Self-guided summer halibut limit out of Elfin Cove, Alaska, with Adam Eakle.",
   "minutes": 14.8,
   "date": "2026-08-09",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "xzOFPgeFGAo",
   "title": "A Day At Olis (Winter Harbour Lingcod, Halibut & Salmon)",
   "channel": "Angler West TV",
   "why": "Winter Harbour, Vancouver Island, in mid-June: early-season lingcod, halibut and salmon bite.",
   "minutes": 22.5,
   "date": "2026-07-16",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "mL8ZCEmm2uI",
   "title": "Ninilchik Alaska Halibut Fishing Cook Inlet May 8, 2026",
   "channel": "Angela in Alaska ",
   "why": "First halibut trip of the season (May 8, 2026) out of Deep Creek, Ninilchik, in Cook Inlet.",
   "minutes": 31.5,
   "date": "2026-05-21",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "PMyqSRTbyRI",
   "title": "Halibut Fishing Alaska, Deep Creek - Cook Inlet 7/25 - Part 2",
   "channel": "Cali Dev Outdoors",
   "why": "Launching from Deep Creek beach into Cook Inlet in July 2025 for halibut (part 2).",
   "minutes": 30.2,
   "date": "2026-03-09",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "lPWXtQxp2Gk",
   "title": "25 Halibut in 4 Hours! Halibut Stampede! Alaskan Halibut Fishing - Juneau, Alaska! MAY 2025",
   "channel": "Captain Zac",
   "why": "Early-season Juneau halibut: jigging 16 oz glow jigs for 25 halibut in 4 hours.",
   "minutes": 43.1,
   "date": "2025-05-17",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "0u5CgM2gs5s",
   "title": "Anyone can catch halibut Surf Fishing cook-inlet Alaska Kenai peninsula 2025",
   "channel": "B Outdoors Alaska",
   "why": "Surf fishing halibut from Kenai Peninsula beaches on Cook Inlet; shows anyone can catch halibut from shore.",
   "minutes": 6.3,
   "date": "2025-05-16",
   "regions": [
    "boreal-north"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "l9tTslyc_SA",
   "title": "From Skunks to Success- Washington State Puget Sound Halibut Fishing",
   "channel": "Northwest Untamed",
   "why": "Strait of Juan de Fuca halibut in Washington, with a detailed rig tutorial.",
   "minutes": 31.9,
   "date": "2025-04-06",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "NNvk4wrO1FY",
   "title": "Homer Alaska Fishing 9 -14- 2024 Kachemak Bay Big Halibut on light tackle",
   "channel": "Gulfhake",
   "why": "Mid-September Kachemak Bay halibut on light tackle out of Homer, Alaska, including the Seldovia area.",
   "minutes": 21.8,
   "date": "2024-10-15",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "olJCZBh1rn8",
   "title": "Late September Homer, Alaska Halibut Fishing. The halibut capital of the world!",
   "channel": "Kenai Riverside Resort",
   "why": "Late-September halibut fishing out of Homer, Alaska.",
   "minutes": 5.5,
   "date": "2024-09-30",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "s-LA7j3BYP4",
   "title": "THIS is Halibut fishing in Homer, Alaska!",
   "channel": "Semi-Wild Alaska",
   "why": "What a halibut charter out of Homer, Alaska, looks like, from the halibut capital.",
   "minutes": 17,
   "date": "2024-07-07",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "nA_-xV8TZJk",
   "title": "Washington Sablefish and Halibut fishing Neah Bay to Swiftsure!",
   "channel": "Peeling Line",
   "why": "Neah Bay to Swiftsure, Washington: halibut and sablefish with the bait and lures used.",
   "minutes": 19.9,
   "date": "2024-06-30",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "tY92NWsWRx0",
   "title": "Halibut on Jigs and Spoons! Alaskan Halibut Fishing - Juneau, Alaska! JUNE 2023 #halibutfishing",
   "channel": "Captain Zac",
   "why": "Halibut on jigs and spoons near Juneau, Alaska, in June.",
   "minutes": 22.5,
   "date": "2023-08-08",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "UCk61y5opto",
   "title": "EASY Halibut Fishing HOW TO - FAST limits in SHALLOW water",
   "channel": "PNW Best Life",
   "why": "Rigging and technique for a halibut limit in under 200 feet on the Washington coast during an opener.",
   "minutes": 12.4,
   "date": "2023-05-14",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "TSiyf3CvBJ0",
   "title": "162lbs of Westport Halibut on Opening Day. We Like Big Butts & We Cannot Lie. How To Catch & Fillet.",
   "channel": "Northwest Fishing Fanatics ",
   "why": "Westport, Washington opening-day halibut: electric reels in 600+ feet and the gear used.",
   "minutes": 30.7,
   "date": "2023-05-06",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "_SSyk8JYK54",
   "title": "Tofino Fishing For Halibut with Island Fisherman magazine, March 2018",
   "channel": "Island Fisherman Magazine",
   "why": "Tofino, BC halibut with Island Fisherman magazine in March 2018.",
   "minutes": 7.2,
   "date": "2018-04-10",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  }
 ],
 "lingcod": [
  {
   "id": "xzOFPgeFGAo",
   "title": "A Day At Olis (Winter Harbour Lingcod, Halibut & Salmon)",
   "channel": "Angler West TV",
   "why": "Winter Harbour, Vancouver Island, in mid-June: early-season lingcod, halibut and salmon bite.",
   "minutes": 22.5,
   "date": "2026-07-16",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "w2hsF6ghs94",
   "title": "How to Catch Alaska Lingcod | Fishing the Gulf of Alaska",
   "channel": "Pautzke Bait",
   "why": "How to catch Alaska lingcod in the Gulf of Alaska (Pautzke Outdoors).",
   "minutes": 9.8,
   "date": "2026-07-07",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "qkebH47jnac",
   "title": "Neah Bay 2026 Bottomfishing (Lingcod, Rockfish, Cabezon)",
   "channel": "UrbanAngler",
   "why": "Late-April 2026 bottomfishing out of Neah Bay, Washington, for lingcod, rockfish and cabezon.",
   "minutes": 20.2,
   "date": "2026-04-27",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "VJw9wWJO6CM",
   "title": "Lights-Out Lingcod Fishing on Opening Day | Santa Cruz",
   "channel": "Ducky2o Fishing",
   "why": "Santa Cruz lingcod fishing on opening day.",
   "minutes": 18.1,
   "date": "2026-04-11",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "V2fnXcK6XWE",
   "title": "December Kayak Fishing for Lingcod on the CALIFORNIA CENTRAL COAST",
   "channel": "Tip of the Spear Fishing",
   "why": "December kayak fishing for lingcod on California's Central Coast in cold-water winter conditions.",
   "minutes": 22.2,
   "date": "2026-01-01",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "GX7_DF-Jfus",
   "title": "Kayak Fishing For BIG LINGCOD At Sonoma Coast On My Stealth Fusion 480",
   "channel": "MooMoo Outdoors",
   "why": "Kayak fishing for big lingcod off the Sonoma Coast, California.",
   "minutes": 23.3,
   "date": "2025-07-21",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "Qtk6WIbgJKo",
   "title": "San Juan Islands Lingcod Fishing (Puget Sound Opening Day 2025)",
   "channel": "Boyko Outdoors",
   "why": "San Juan Islands lingcod with bait and jigs on Puget Sound opening day 2025.",
   "minutes": 11.8,
   "date": "2025-05-03",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "m1xNbwAY2uQ",
   "title": "Rock Fishing From SHORE: Lingcod, Rockfish & Cabezon – California Cliffs",
   "channel": "California Surf Fishing",
   "why": "Shore rock fishing Central California cliffs for lingcod and rockfish with a float-hook sardine or squid presentation.",
   "minutes": 12.6,
   "date": "2025-04-12",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "umO2U_S6d9I",
   "title": "CATCHING LINGCOD ON SLOW PITCH JIG IN CALIFORNIA",
   "channel": "RickCFish",
   "why": "Slow-pitch jigging lingcod at Big Sur's \"Jurassic Park\" from Morro Bay with gear list.",
   "minutes": 13.3,
   "date": "2024-10-24",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "Iv-K7dQoHFI",
   "title": "Puget Sound Lingcod Fishing, May 4th 2024",
   "channel": "Pavlus Adventures",
   "why": "Puget Sound lingcod trip on May 4, 2024, including downrigger setup.",
   "minutes": 21.8,
   "date": "2024-05-05",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "pK87y_41GfU",
   "title": "Puget Sound Lingcod Fishing Set Up (How to)",
   "channel": "Pavlus Adventures",
   "why": "Puget Sound lingcod gear setup: rod, reel, line, leader length, hooks, jigs and a live-bait rig.",
   "minutes": 4.2,
   "date": "2024-05-05",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "vHUH32Tyqbg",
   "title": "SANTA CRUZ LIVE BAIT drifting for GIANT LINGCOD !!!",
   "channel": "leftcoast outdoors",
   "why": "Live-bait drifting from a rental skiff out of Santa Cruz (Monterey Bay) for giant lingcod.",
   "minutes": 23.1,
   "date": "2023-08-31",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "ziQRCaS0-MM",
   "title": "Brookings Lingcod Fishing",
   "channel": "Pautzke Bait",
   "why": "Arch Rock off Brookings on the southern Oregon coast: lingcod when the ocean settled down.",
   "minutes": 11.2,
   "date": "2022-08-07",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "hL7JHHaeF7g",
   "title": "Jetty Fishing in WA - When, Where and How | Rockfish, Lingcod, Greenling, Perch in Washington State",
   "channel": "Bashi Fishing",
   "why": "Washington jetty fishing for lingcod and rockfish: season opens late March and fish turn on as water warms.",
   "minutes": 13.1,
   "date": "2022-04-11",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "8bXlq3GCNFM",
   "title": "How to Catch LINGCOD and ROCKFISH From SHORE! (Northern California Rock Fishing)",
   "channel": "Pacific Fishing",
   "why": "How to catch lingcod and rockfish from shore on the Northern California coast.",
   "minutes": 4.3,
   "date": "2021-02-02",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "x4tEwgDii5s",
   "title": "Lingcod Doubles - Santa Cruz, CA 10.10.20",
   "channel": "Foggy Mountain Studios",
   "why": "Santa Cruz lingcod doubles, launching from the harbor on October 10, 2020.",
   "minutes": 21.8,
   "date": "2020-10-12",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "pW8GC5FEy0U",
   "title": "Rock Fishing The Oregon Coast, Lingcod FISHING HEAVEN!!",
   "channel": "Angling Addicts PNW",
   "why": "Rock fishing the Oregon coast from jetties and cliffs for a first shore lingcod.",
   "minutes": 26.4,
   "date": "2020-03-23",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  }
 ],
 "kokanee": [
  {
   "id": "XrNfYt7zNhA",
   "title": "Lake Berryessa Kokanee Fishing Report For September 20, 2026",
   "channel": "Dustin",
   "why": "Lake Berryessa kokanee fishing report for September 20, 2026.",
   "minutes": 12.1,
   "date": "2026-09-22",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "0tt-XX2Rfdo",
   "title": "The Kokanee are Running at Strawberry Reservoir",
   "channel": "Utah Mountains Fishing",
   "why": "Strawberry Reservoir kokanee staging to spawn in mid-September, with viewing at the Strawberry River.",
   "minutes": 6.6,
   "date": "2026-09-20",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "g5Uq21pxekc",
   "title": "The Deadliest Setup for Lake Pend Oreille Kokanee.",
   "channel": "North 40 Fish",
   "why": "Spring trolling setup for Lake Pend Oreille, Idaho, kokanee: gear and lure selection.",
   "minutes": 4.2,
   "date": "2026-05-19",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "G6h7sCU0eR0",
   "title": "How to Catch Kokanee at Lake Berryessa: Trolling & Gear Setup | Blind Squirrel Channel ",
   "channel": "Blind Squirrel Channel",
   "why": "How to catch kokanee on Lake Berryessa, California: trolling and gear setup.",
   "minutes": 8.6,
   "date": "2026-04-27",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "zpO47AyvaHc",
   "title": "How to Catch Kokanee Ice Fishing | Bridge Lake BC Tips & Tactics",
   "channel": "The Fishing Doctors Adventures",
   "why": "Ice fishing kokanee at Bridge Lake, BC: gear, sonar setup, jigging technique and depths.",
   "minutes": 28.8,
   "date": "2026-03-10",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "kgWxTPREq2U",
   "title": "Kokanee Tips for Western Washington Lakes",
   "channel": "John's Sporting Goods",
   "why": "Western Washington kokanee podcast: trolling techniques, gear setups, seasonal movements and lake strategies.",
   "minutes": 22.7,
   "date": "2026-02-05",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring",
    "summer",
    "fall",
    "winter"
   ]
  },
  {
   "id": "bYJrKrxEvZY",
   "title": "No Ice? No Problem! Pro Tips for Winter Kokanee Fishing at Jordanelle Reservoir",
   "channel": "Outdoors with Adam Eakle",
   "why": "Winter kokanee at Jordanelle Reservoir, Utah, with no ice: open-water tips with LiveScope.",
   "minutes": 12.4,
   "date": "2026-01-04",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "6givY4XaXCI",
   "title": "Fall Kokanee Salmon - Flaming Gorge How To - Episode 8",
   "channel": "Flaming Gorge",
   "why": "Fall kokanee tutorial at Flaming Gorge fishing the open hills section on the Wyoming side.",
   "minutes": 16.3,
   "date": "2025-08-18",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "fall"
   ]
  },
  {
   "id": "a1yZn3GqoeE",
   "title": "How To Catch Kokanee, Kings & Rainbows At Lake Berryessa Now",
   "channel": "Catch America",
   "why": "Lake Berryessa kokanee, kings and trout with Catch America's Big Nate.",
   "minutes": 14.4,
   "date": "2025-07-13",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "ZoM8VNOZezI",
   "title": "Flaming Gorge - How To Catch Summer Kokanee -  Episode 5",
   "channel": "Flaming Gorge",
   "why": "Summer kokanee tutorial at Flaming Gorge (Utah/Wyoming) fishing the canyon section.",
   "minutes": 17.1,
   "date": "2025-06-18",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "bIsyKGaKl80",
   "title": "LAKE CUSHMAN KOKANEE  AND MONSTER SURPRISE",
   "channel": "WILD WEST BOYS",
   "why": "Trolling for kokanee on Lake Cushman, Washington, in May.",
   "minutes": 13.1,
   "date": "2025-01-30",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "oTSUWe4UhI0",
   "title": "Kokanee Fishing Lake Chelan Washington | June 2024",
   "channel": "The Piscatorian",
   "why": "Lake Chelan, Washington, kokanee trip in June 2024.",
   "minutes": 11.3,
   "date": "2024-06-17",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "1Pv4YEvDMrg",
   "title": "Hot summer Kokanee Tactics Kalamalka Lake BC",
   "channel": "Real It In Fishing",
   "why": "Mid-August heat-wave kokanee tactics on Kalamalka Lake, BC, adjusting the setup through the day.",
   "minutes": 10.5,
   "date": "2023-08-16",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "summer"
   ]
  },
  {
   "id": "DUyOodWn1a8",
   "title": "EPIC FISHING DAY! WINTER KOKANEE                                                      Зимняя Рыбалка",
   "channel": "_NOLIMITS_",
   "why": "Winter kokanee fishing on Lake Merwin, Washington.",
   "minutes": 8.2,
   "date": "2023-01-27",
   "regions": [
    "pacific-maritime"
   ],
   "seasons": [
    "winter"
   ]
  },
  {
   "id": "Cnue-QnA_t4",
   "title": "5 LIMITS OF KOKANEE! - EP8 2022 Kokanee Tour of Utah - Strawberry",
   "channel": "Kokanee Addict Fishing",
   "why": "Strawberry Reservoir, Utah, filmed May 2022: five limits of kokanee in cold wind.",
   "minutes": 18.9,
   "date": "2022-05-29",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "sW4nPVVnH0Y",
   "title": "Whiskeytown Kokanee Fishing on Fire! - May 2022",
   "channel": "HiTechKoke",
   "why": "Whiskeytown Lake kokanee limits in May 2022 at 40 to 70 feet.",
   "minutes": 4.5,
   "date": "2022-05-10",
   "regions": [
    "mediterranean-california"
   ],
   "seasons": [
    "spring"
   ]
  },
  {
   "id": "X-OcL5aOaoc",
   "title": "Lake Roosevelt Spring Kokanee Fishing",
   "channel": "DIY Fishing with Todd",
   "why": "Spring kokanee fishing at Lake Roosevelt near Grand Coulee Dam, Washington.",
   "minutes": 11.3,
   "date": "2021-06-18",
   "regions": [
    "western-mountains"
   ],
   "seasons": [
    "spring"
   ]
  }
 ]
};
