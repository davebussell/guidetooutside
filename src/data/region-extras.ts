/**
 * What /regions and /regions/<slug> show beyond ECOREGIONS: the three-photo
 * mosaic of each region — its landscape plant (src/data/landscape-images.json),
 * a fish (/wildlife) and a wild edible (/foraging) — with the captions printed
 * on the tiles. The hero photograph of each region is src/data/hero-images.json.
 *
 * Extracted from the captured /regions/<slug> pages (the same tiles head each
 * region card on /regions).
 */

export type RegionTile = { kind: "landscape" | "fish" | "species"; slug: string; label: string };

/** The mosaic tiles of each region: the landscape plant (the large tile), a fish, a wild edible. */
export const REGION_TILES: Record<string, RegionTile[]> = {
 "acadian-forest": [
  {
   "kind": "landscape",
   "slug": "balsam-fir",
   "label": "Balsam fir"
  },
  {
   "kind": "fish",
   "slug": "brook-trout",
   "label": "Brook trout"
  },
  {
   "kind": "species",
   "slug": "fiddleheads",
   "label": "Fiddleheads"
  }
 ],
 "alpine-europe": [
  {
   "kind": "landscape",
   "slug": "european-larch",
   "label": "European larch"
  },
  {
   "kind": "fish",
   "slug": "european-grayling",
   "label": "European grayling"
  },
  {
   "kind": "species",
   "slug": "wood-strawberry",
   "label": "Woodland strawberry"
  }
 ],
 "appalachian": [
  {
   "kind": "landscape",
   "slug": "eastern-hemlock",
   "label": "Eastern hemlock"
  },
  {
   "kind": "fish",
   "slug": "rainbow-trout",
   "label": "Rainbow trout"
  },
  {
   "kind": "species",
   "slug": "ramps",
   "label": "Ramps"
  }
 ],
 "atlantic-europe": [
  {
   "kind": "landscape",
   "slug": "common-heather",
   "label": "Heather"
  },
  {
   "kind": "fish",
   "slug": "atlantic-salmon",
   "label": "Atlantic salmon"
  },
  {
   "kind": "species",
   "slug": "wild-garlic",
   "label": "Wild garlic"
  }
 ],
 "boreal-europe": [
  {
   "kind": "landscape",
   "slug": "scots-pine",
   "label": "Scots pine"
  },
  {
   "kind": "fish",
   "slug": "european-perch",
   "label": "European perch"
  },
  {
   "kind": "species",
   "slug": "bilberry",
   "label": "Bilberry"
  }
 ],
 "boreal-forest": [
  {
   "kind": "landscape",
   "slug": "paper-birch",
   "label": "Paper birch"
  },
  {
   "kind": "fish",
   "slug": "walleye",
   "label": "Walleye"
  },
  {
   "kind": "species",
   "slug": "chanterelle",
   "label": "Golden chanterelle"
  }
 ],
 "boreal-north": [
  {
   "kind": "landscape",
   "slug": "tamarack",
   "label": "Tamarack"
  },
  {
   "kind": "fish",
   "slug": "arctic-grayling",
   "label": "Arctic grayling"
  },
  {
   "kind": "species",
   "slug": "blueberry",
   "label": "Wild blueberries"
  }
 ],
 "cape-fynbos": [
  {
   "kind": "landscape",
   "slug": "king-protea",
   "label": "King protea"
  },
  {
   "kind": "fish",
   "slug": "galjoen",
   "label": "Galjoen"
  },
  {
   "kind": "species",
   "slug": "waterblommetjie",
   "label": "Waterblommetjie"
  }
 ],
 "central-hardwoods": [
  {
   "kind": "landscape",
   "slug": "shagbark-hickory",
   "label": "Shagbark hickory"
  },
  {
   "kind": "fish",
   "slug": "largemouth-bass",
   "label": "Largemouth bass"
  },
  {
   "kind": "species",
   "slug": "pawpaw",
   "label": "Pawpaw"
  }
 ],
 "congo-basin": [
  {
   "kind": "landscape",
   "slug": "umbrella-tree",
   "label": "Umbrella tree"
  },
  {
   "kind": "fish",
   "slug": "goliath-tigerfish",
   "label": "Goliath tigerfish"
  },
  {
   "kind": "species",
   "slug": "termite-mushroom",
   "label": "Termite mushrooms"
  }
 ],
 "continental-europe": [
  {
   "kind": "landscape",
   "slug": "european-beech",
   "label": "European beech"
  },
  {
   "kind": "fish",
   "slug": "zander",
   "label": "Zander"
  },
  {
   "kind": "species",
   "slug": "girolle",
   "label": "Chanterelle"
  }
 ],
 "deserts": [
  {
   "kind": "landscape",
   "slug": "joshua-tree",
   "label": "Joshua tree"
  },
  {
   "kind": "fish",
   "slug": "largemouth-bass",
   "label": "Largemouth bass"
  },
  {
   "kind": "species",
   "slug": "prickly-pear",
   "label": "Prickly pear"
  }
 ],
 "east-african-highlands": [
  {
   "kind": "landscape",
   "slug": "fever-tree",
   "label": "Fever tree"
  },
  {
   "kind": "fish",
   "slug": "nile-perch",
   "label": "Nile perch"
  },
  {
   "kind": "species",
   "slug": "amaranth-greens",
   "label": "Amaranth greens"
  }
 ],
 "florida-peninsula": [
  {
   "kind": "landscape",
   "slug": "sabal-palmetto",
   "label": "Cabbage palm"
  },
  {
   "kind": "fish",
   "slug": "snook",
   "label": "Snook"
  },
  {
   "kind": "species",
   "slug": "sea-grape",
   "label": "Sea grape"
  }
 ],
 "great-lakes-st-lawrence": [
  {
   "kind": "landscape",
   "slug": "sugar-maple",
   "label": "Sugar maple"
  },
  {
   "kind": "fish",
   "slug": "smallmouth-bass",
   "label": "Smallmouth bass"
  },
  {
   "kind": "species",
   "slug": "morel",
   "label": "Morels"
  }
 ],
 "great-plains": [
  {
   "kind": "landscape",
   "slug": "big-bluestem",
   "label": "Big bluestem"
  },
  {
   "kind": "fish",
   "slug": "northern-pike",
   "label": "Northern pike"
  },
  {
   "kind": "species",
   "slug": "chokecherry",
   "label": "Chokecherry"
  }
 ],
 "guinean-forest": [
  {
   "kind": "landscape",
   "slug": "oil-palm",
   "label": "Oil palm"
  },
  {
   "kind": "fish",
   "slug": "nile-tilapia",
   "label": "Nile tilapia"
  },
  {
   "kind": "species",
   "slug": "shea",
   "label": "Shea fruit"
  }
 ],
 "gulf-coast": [
  {
   "kind": "landscape",
   "slug": "bald-cypress",
   "label": "Bald cypress"
  },
  {
   "kind": "fish",
   "slug": "redfish",
   "label": "Redfish"
  },
  {
   "kind": "species",
   "slug": "pecan",
   "label": "Wild pecans"
  }
 ],
 "hawaii-tropics": [
  {
   "kind": "landscape",
   "slug": "ohia-lehua",
   "label": "ʻŌhiʻa lehua"
  },
  {
   "kind": "fish",
   "slug": "bluegill",
   "label": "Bluegill"
  },
  {
   "kind": "species",
   "slug": "wood-sorrel",
   "label": "Wood sorrel"
  }
 ],
 "highveld-drakensberg": [
  {
   "kind": "landscape",
   "slug": "red-grass",
   "label": "Red grass"
  },
  {
   "kind": "fish",
   "slug": "smallmouth-yellowfish",
   "label": "Smallmouth yellowfish"
  },
  {
   "kind": "species",
   "slug": "tulbaghia",
   "label": "Wild garlic"
  }
 ],
 "madagascar-islands": [
  {
   "kind": "landscape",
   "slug": "grandidier-baobab",
   "label": "Grandidier's baobab"
  },
  {
   "kind": "fish",
   "slug": "giant-trevally",
   "label": "Giant trevally"
  },
  {
   "kind": "species",
   "slug": "tamarind",
   "label": "Tamarind"
  }
 ],
 "mediterranean-california": [
  {
   "kind": "landscape",
   "slug": "california-poppy",
   "label": "California poppy"
  },
  {
   "kind": "fish",
   "slug": "steelhead",
   "label": "Steelhead"
  },
  {
   "kind": "species",
   "slug": "miners-lettuce",
   "label": "Miner's lettuce"
  }
 ],
 "mediterranean-europe": [
  {
   "kind": "landscape",
   "slug": "olive-tree",
   "label": "Olive"
  },
  {
   "kind": "fish",
   "slug": "gilthead-seabream",
   "label": "Gilthead seabream"
  },
  {
   "kind": "species",
   "slug": "mediterranean-asparagus",
   "label": "Mediterranean wild asparagus"
  }
 ],
 "namib-karoo": [
  {
   "kind": "landscape",
   "slug": "quiver-tree",
   "label": "Quiver tree"
  },
  {
   "kind": "fish",
   "slug": "sharptooth-catfish",
   "label": "Sharptooth catfish"
  },
  {
   "kind": "species",
   "slug": "sour-fig",
   "label": "Sour fig"
  }
 ],
 "north-africa-mediterranean": [
  {
   "kind": "landscape",
   "slug": "atlas-cedar",
   "label": "Atlas cedar"
  },
  {
   "kind": "fish",
   "slug": "european-sea-bass",
   "label": "European sea bass"
  },
  {
   "kind": "species",
   "slug": "prickly-pear",
   "label": "Prickly pear"
  }
 ],
 "northeast-coast": [
  {
   "kind": "landscape",
   "slug": "beach-grass",
   "label": "American beachgrass"
  },
  {
   "kind": "fish",
   "slug": "striped-bass",
   "label": "Striped bass"
  },
  {
   "kind": "species",
   "slug": "beach-plum",
   "label": "Beach plum"
  }
 ],
 "pacific-maritime": [
  {
   "kind": "landscape",
   "slug": "western-redcedar",
   "label": "Western redcedar"
  },
  {
   "kind": "fish",
   "slug": "coho-salmon",
   "label": "Coho salmon"
  },
  {
   "kind": "species",
   "slug": "salal",
   "label": "Salal"
  }
 ],
 "pannonian-steppe": [
  {
   "kind": "landscape",
   "slug": "feather-grass",
   "label": "Feather grass"
  },
  {
   "kind": "fish",
   "slug": "wels-catfish",
   "label": "Wels catfish"
  },
  {
   "kind": "species",
   "slug": "european-elderberry",
   "label": "Elderberries"
  }
 ],
 "sahara-nile": [
  {
   "kind": "landscape",
   "slug": "date-palm",
   "label": "Date palm"
  },
  {
   "kind": "fish",
   "slug": "nile-perch",
   "label": "Nile perch"
  },
  {
   "kind": "species",
   "slug": "desert-date",
   "label": "Desert date"
  }
 ],
 "sahel-savanna": [
  {
   "kind": "landscape",
   "slug": "umbrella-thorn",
   "label": "Umbrella thorn"
  },
  {
   "kind": "fish",
   "slug": "nile-tilapia",
   "label": "Nile tilapia"
  },
  {
   "kind": "species",
   "slug": "baobab",
   "label": "Baobab"
  }
 ],
 "southeastern": [
  {
   "kind": "landscape",
   "slug": "longleaf-pine",
   "label": "Longleaf pine"
  },
  {
   "kind": "fish",
   "slug": "channel-catfish",
   "label": "Channel catfish"
  },
  {
   "kind": "species",
   "slug": "persimmon",
   "label": "American persimmon"
  }
 ],
 "southern-savanna": [
  {
   "kind": "landscape",
   "slug": "mopane",
   "label": "Mopane"
  },
  {
   "kind": "fish",
   "slug": "tigerfish",
   "label": "Tigerfish"
  },
  {
   "kind": "species",
   "slug": "marula",
   "label": "Marula"
  }
 ],
 "swahili-coast": [
  {
   "kind": "landscape",
   "slug": "coconut-palm",
   "label": "Coconut palm"
  },
  {
   "kind": "fish",
   "slug": "giant-trevally",
   "label": "Giant trevally"
  },
  {
   "kind": "species",
   "slug": "tamarind",
   "label": "Tamarind"
  }
 ],
 "western-mountains": [
  {
   "kind": "landscape",
   "slug": "quaking-aspen",
   "label": "Quaking aspen"
  },
  {
   "kind": "fish",
   "slug": "kokanee",
   "label": "Kokanee"
  },
  {
   "kind": "species",
   "slug": "huckleberry",
   "label": "Huckleberries"
  }
 ]
};
