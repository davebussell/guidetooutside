// Restored from client module 1414 (exports: NAV_MENUS, NAV_SECONDARY, navHref, regionFace, MenuIcon)
import _m1_json from "@/data/landscape-images.json";
const _m1 = { default: _m1_json };
let a,
  s = (e) => (a) => (a ? `${e}/${a}` : e),
  n = [
    {
      id: "gardening",
      icon: "trowel",
      label: "Gardening",
      href: s("/gardening"),
      intro: {
        href: "/gardening",
        label: "Gardening overview",
        note: "The stage of the garden year, crops in season, and how to store them.",
      },
      tagline: "Sowing, harvest and storage, timed to local frost dates.",
      lead: {
        label: "This week's garden guide",
        note: "Stage of the garden year, tonight's frost risk by crop, what is ready and how to store it — from local frost dates and the forecast.",
        href: s("/gardening"),
      },
      sections: [
        {
          title: "Harvest and put up",
          links: [
            {
              href: "/gardening/crops",
              label: "Crops",
              note: "Harvest timing, frost tolerance, storage and preserving for each crop",
              icon: "basket",
            },
            {
              href: "/gardening/preserving",
              label: "Preserving",
              note: "Canning, pickling, fermenting, freezing and drying, with tested recipes",
              icon: "mortar",
            },
            {
              href: "/gardening/seeds",
              label: "Seed saving",
              note: "Which crops come true from seed, which cross, and how to store seed",
              icon: "leaf",
            },
          ],
        },
        {
          title: "Know your climate",
          links: [
            {
              href: "/zones",
              label: "Hardiness zones",
              note: "Zones 2 to 11 and what each will overwinter",
              icon: "thermometer",
            },
            {
              href: "/zones/map",
              label: "Zone map",
              note: "Hardiness zones, and the equivalent elsewhere",
              icon: "map",
            },
            {
              href: "/almanac",
              label: "Almanac",
              note: "Frost dates, day length, moon phase and the annual temperature curve",
              icon: "frost",
            },
          ],
        },
        {
          title: "In the garden",
          links: [
            {
              href: "/wildlife#garden",
              label: "Garden insects and pests",
              note: "Pollinators, predators, soil organisms and the common pests",
              icon: "bee",
            },
          ],
        },
        {
          title: "Get involved",
          links: [
            {
              href: "/conservation?topic=pollinators",
              label: "Who looks after gardens",
              note: "Pollinator, bird and native-plant groups near you",
              icon: "bee",
            },
            {
              href: "/conservation?topic=soil-seeds",
              label: "Seed savers",
              note: "Seed libraries and heritage-seed keepers",
              icon: "sprout",
            },
          ],
        },
      ],
    },
    {
      id: "fishing",
      icon: "fish",
      label: "Fishing",
      href: s("/fishing"),
      intro: {
        href: "/fishing",
        label: "Fishing overview",
        note: "Lake seasons, commonly confused species, and every fish to scale.",
      },
      tagline: "Species, waters, feeding periods and regulations, by place.",
      lead: {
        label: "This week's fishing guide",
        note: "Active species, named waters nearby, and feeding periods by sun and moon.",
        href: s("/fishing"),
      },
      sections: [
        {
          title: "Reference",
          links: [
            {
              href: "/fishing/regulations",
              label: "Regulations",
              note: "Official licensing, season and limit sources by jurisdiction",
              icon: "rules",
            },
            {
              href: "/wildlife#fish",
              label: "Fish species",
              note: "Freshwater and inshore species: habitat, size and behaviour",
              icon: "fish",
            },
          ],
        },
        {
          title: "Common species",
          links: [
            {
              href: "/wildlife/brown-trout",
              label: "Brown trout",
              icon: "fish",
            },
            {
              href: "/wildlife/northern-pike",
              label: "Northern pike",
              icon: "fish",
            },
            {
              href: "/wildlife/walleye",
              label: "Walleye",
              icon: "fish",
            },
            {
              href: "/wildlife/european-sea-bass",
              label: "European sea bass",
              icon: "fish",
            },
            {
              href: "/wildlife/nile-perch",
              label: "Nile perch",
              icon: "fish",
            },
            {
              href: "/wildlife/bluefish",
              // "Elf" is the South African name (Day 4 audit, 13 November 2026: printed on every page's menu, in America too).
              label: "Bluefish",
              icon: "fish",
            },
          ],
        },
        {
          title: "Get involved",
          links: [
            {
              href: "/conservation?topic=water",
              label: "Who looks after your water",
              note: "Waterkeepers, rivers trusts and watershed groups",
              icon: "water",
            },
            {
              href: "/conservation?topic=fish",
              label: "Fish conservation",
              note: "Trout, salmon and angling conservation bodies",
              icon: "fish",
            },
          ],
        },
      ],
    },
    {
      id: "foraging",
      icon: "basket",
      label: "Foraging",
      href: s("/foraging"),
      intro: {
        href: "/foraging",
        label: "Foraging overview",
        note: "The foraging year, poisonous look-alikes, and every wild edible photographed.",
      },
      tagline: "Wild foods in season, how to identify them, and what to avoid.",
      lead: {
        label: "In season near you",
        note: "Ranked by how often each species is recorded within 40 km this month.",
        href: s("/foraging"),
      },
      sections: [
        {
          title: "Species",
          links: [
            {
              href: "/foraging#library",
              label: "Wild edibles A–Z",
              note: "Photographs, season, habitat and identification",
              icon: "leaf",
            },
            {
              href: "/foraging/calendar",
              label: "Foraging calendar",
              note: "What is in season, month by month",
              icon: "calendar",
            },
            {
              href: "/foraging/medicinal",
              label: "Medicinal plants",
              note: "Traditional uses, the evidence, and cautions",
              icon: "mortar",
            },
          ],
        },
        {
          title: "Safety",
          links: [
            {
              href: (e) => (e ? `/foraging/${e}#hazards` : "/guide?section=foraging"),
              label: "Local hazards",
              note: "Poisonous and dangerous species recorded nearby this month",
              local: true,
              icon: "warning",
            },
          ],
        },
        {
          title: "Get involved",
          links: [
            {
              href: "/conservation?topic=plants",
              label: "Who looks after wild plants",
              note: "Botanical, fungus and native-plant societies",
              icon: "leaf",
            },
            {
              href: "/conservation?topic=land",
              label: "Land trusts and reserves",
              note: "The bodies that care for the land you walk on",
              icon: "hills",
            },
          ],
        },
      ],
    },
    {
      id: "homesteading",
      icon: "barn",
      label: "Homesteading",
      href: s("/homesteading"),
      intro: {
        href: "/homesteading",
        label: "Homesteading overview",
        note: "Ten topics, the homestead year by climate signal, and breeds for cold and heat.",
      },
      tagline: "Hens, bees, water, wood and storage, timed to your climate.",
      lead: {
        label: "This week's homestead guide",
        note: "Daylight and laying, cold and heat for the animals, roof water, wood heat, frost dates and bees.",
        href: s("/homesteading"),
      },
      sections: [
        {
          title: "Livestock",
          links: [
            {
              href: "/homesteading/laying-hens",
              label: "Laying hens",
              note: "Daylight and laying, space, heat, cold and breeds",
              icon: "egg",
            },
            {
              href: "/homesteading/ducks",
              label: "Ducks",
              icon: "water",
            },
            {
              href: "/homesteading/honeybees",
              label: "Honeybees",
              icon: "bee",
            },
            {
              href: "/homesteading/dairy-goats",
              label: "Dairy goats",
              icon: "barn",
            },
            {
              href: "/homesteading/meat-rabbits",
              label: "Meat rabbits",
              icon: "barn",
            },
          ],
        },
        {
          title: "Water, wood and soil",
          links: [
            {
              href: "/homesteading/rainwater",
              label: "Rainwater harvesting",
              note: "Roof yield, tank size and safe use",
              icon: "water",
            },
            {
              href: "/homesteading/wood-heat",
              label: "Firewood and wood heat",
              note: "Seasoning, heat by species and safety",
              icon: "flame",
            },
            {
              href: "/homesteading/compost",
              label: "Compost and manure",
              icon: "soil",
            },
            {
              href: "/homesteading/food-storage",
              label: "Root cellars and food storage",
              icon: "basket",
            },
            {
              href: "/homesteading/season-extension",
              label: "Cold frames and tunnels",
              icon: "leaf",
            },
          ],
        },
        {
          title: "The year",
          links: [
            {
              href: "/homesteading/calendar",
              label: "The homestead year",
              note: "Tasks by climate signal, for both hemispheres",
              icon: "calendar",
            },
          ],
        },
      ],
    },
    {
      id: "land",
      icon: "hills",
      label: "The land",
      href: "/regions",
      intro: {
        href: "/regions",
        label: "Start here: the ecological regions",
        note: "The ecological regions of Canada and the United States, and the one your town sits in.",
      },
      homeLabel: "The ground, the regions and the day",
      tagline: "The land and the sky where you live.",
      lead: {
        label: "The ground under you",
        note: "The rock, soil and water under your town, from the maps that show it.",
        href: s("/ground"),
      },
      sections: [
        {
          title: "The land and the sky",
          links: [
            {
              href: s("/ground"),
              label: "The ground under you",
              icon: "soil",
            },
            {
              href: "/ground/rocks",
              label: "Kinds of rock",
              note: "Make magma, squash mud into stone",
              icon: "rock",
            },
            {
              href: "/regions",
              label: "Ecological regions",
              icon: "hills",
            },
            {
              href: s("/the-day"),
              label: "The day, hour by hour",
              icon: "sun",
            },
            {
              href: ((a = "/resources"), (e) => (e ? `${a}/${e}` : `/guide?section=${a.replace(/^\//, "")}`)),
              label: "Get involved and books about where you live",
              local: true,
              icon: "book",
            },
          ],
        },
      ],
    },
    {
      // The conservation library: the hub, the organisations near the reader, by subject, and the youth programme.
      id: "conservation",
      icon: "sprout",
      label: "Get involved",
      href: "/conservation",
      intro: {
        href: "/conservation",
        label: "Get involved: overview",
        note: "Every organisation in the library, by country and subject.",
      },
      homeLabel: "Conservation organisations near you",
      tagline: "The people looking after the water, wildlife and land where you live.",
      lead: {
        label: "Get involved near you",
        note: "The river keepers, trusts and societies working near your town, what they ask of volunteers, and the books they sell.",
        href: (e) => (e ? `/resources/${e}` : "/guide?section=resources"),
      },
      sections: [
        {
          title: "Near you",
          links: [
            {
              href: "/conservation#near-you",
              label: "Near you",
              note: "The organisations nearest your town, closest first",
              icon: "map",
            },
            {
              href: "/conservation/roots-and-shoots",
              label: "Roots & Shoots for young people",
              note: "The Jane Goodall Institute's programme: young people pick a project and see it through",
              icon: "sprout",
            },
          ],
        },
        {
          title: "By subject",
          links: [
            {
              href: "/conservation?topic=water",
              label: "Rivers, lakes and coasts",
              icon: "water",
            },
            {
              href: "/conservation?topic=fish",
              label: "Fish",
              icon: "fish",
            },
            {
              href: "/conservation?topic=birds",
              label: "Birds",
              icon: "bird",
            },
            {
              href: "/conservation?topic=pollinators",
              label: "Pollinators",
              icon: "bee",
            },
            {
              href: "/conservation?topic=plants",
              label: "Plants and fungi",
              icon: "leaf",
            },
            {
              href: "/conservation?topic=land",
              label: "Land and reserves",
              icon: "hills",
            },
          ],
        },
      ],
    },
  ];
export { n as NAV_MENUS };
export const NAV_SECONDARY = [
  {
    href: "/newsletter",
    label: "The Weekly Field Note",
  },
  {
    href: "/about",
    label: "About",
  },
];
export const navHref = function (e, a) {
  return "function" == typeof e ? e(a) : e;
};
let r = _m1.default,
  t = {
    "boreal-north": "tamarack",
    "boreal-forest": "paper-birch",
    "acadian-forest": "balsam-fir",
    "great-lakes-st-lawrence": "sugar-maple",
    "northeast-coast": "beach-grass",
    appalachian: "great-rhododendron",
    "central-hardwoods": "shagbark-hickory",
    southeastern: "longleaf-pine",
    "gulf-coast": "bald-cypress",
    "florida-peninsula": "sabal-palmetto",
    "great-plains": "big-bluestem",
    "western-mountains": "quaking-aspen",
    "pacific-maritime": "western-redcedar",
    "mediterranean-california": "california-poppy",
    deserts: "saguaro",
    "hawaii-tropics": "ohia-lehua",
    "atlantic-europe": "common-heather",
    "continental-europe": "european-beech",
    "boreal-europe": "scots-pine",
    "alpine-europe": "european-larch",
    "mediterranean-europe": "olive-tree",
    "pannonian-steppe": "feather-grass",
    "north-africa-mediterranean": "atlas-cedar",
    "sahara-nile": "date-palm",
    "sahel-savanna": "umbrella-thorn",
    "guinean-forest": "oil-palm",
    "congo-basin": "umbrella-tree",
    "east-african-highlands": "fever-tree",
    "swahili-coast": "coconut-palm",
    "southern-savanna": "mopane",
    "highveld-drakensberg": "red-grass",
    "namib-karoo": "quiver-tree",
    "cape-fynbos": "king-protea",
    "madagascar-islands": "grandidier-baobab",
  };
export const regionFace = function (e) {
  let a = t[e],
    s = a ? r[a] : undefined;
  return s
    ? {
        src: s.src,
        name: s.name,
      }
    : null;
};
let i = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  },
  l = (e) => `shrink-0 ${e ?? ""}`,
  c = {
    trowel: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M14.5 3.5l6 6" />
          <path d="M17.5 6.5l-4 4" />
          <path d="M13.5 10.5l-6.2 6.2a3.6 3.6 0 0 1-2.2 1l-1.6.2.2-1.6a3.6 3.6 0 0 1 1-2.2l6.2-6.2z" />
        </svg>
      );
    },
    fish: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M3 12c3-4 7-5.5 10-5.5S18.5 8 21 12c-2.5 4-5 5.5-8 5.5S6 16 3 12z" />
          <path d="M3 12c1.6-.6 3-.6 4.4 0" />
          <circle cx="16.4" cy="10.8" r="0.9" fill="currentColor" stroke="none" />
          <path d="M11 6.8c.6 3.4.6 6.8 0 10.4" />
        </svg>
      );
    },
    basket: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M3.5 9.5h17l-1.8 8.2a2 2 0 0 1-2 1.6H7.3a2 2 0 0 1-2-1.6z" />
          <path d="M8 9.5c.4-3.2 2-5 4-5s3.6 1.8 4 5" />
          <path d="M9.6 12.6l.7 4.4M14.4 12.6l-.7 4.4" />
        </svg>
      );
    },
    compass: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <circle cx="12" cy="12" r="8.6" />
          <path d="M15.4 8.6l-2 4.8-4.8 2 2-4.8z" />
        </svg>
      );
    },
    soil: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M3 9.5h18M3 14h18M3 18.5h18" />
          <path d="M12 3v7.5M12 6.5c-1.4.6-2.2 1.6-2.4 3M12 7.6c1.2.5 1.9 1.3 2.2 2.4" />
        </svg>
      );
    },
    thermometer: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M14 14.8V5.2a2 2 0 1 0-4 0v9.6a4 4 0 1 0 4 0z" />
          <path d="M12 8.5v6.8" />
        </svg>
      );
    },
    map: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M9 4.5L3.5 6.6v12.9L9 17.4l6 2.1 5.5-2.1V4.5L15 6.6z" />
          <path d="M9 4.5v12.9M15 6.6v12.9" />
        </svg>
      );
    },
    moon: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <circle cx="12" cy="12" r="8.4" />
          <path d="M12 3.6 A8.4 8.4 0 0 1 12 20.4 A3.6 8.4 0 0 0 12 3.6 Z" fill="currentColor" stroke="none" />
        </svg>
      );
    },
    sun: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 3.2v2.2M12 18.6v2.2M3.2 12h2.2M18.6 12h2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6" />
        </svg>
      );
    },
    bee: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <ellipse cx="12" cy="14" rx="3.6" ry="5.2" />
          <path d="M8.5 12.4h7M8.6 15.6h6.8" />
          <path d="M9.4 9.2C7 7.6 4.6 7.8 4 9.2c-.6 1.5 1 3.2 3.6 3.6M14.6 9.2c2.4-1.6 4.8-1.4 5.4 0 .6 1.5-1 3.2-3.6 3.6" />
          <path d="M10.6 6.2L9.6 4.4M13.4 6.2l1-1.8" />
        </svg>
      );
    },
    hills: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M2.5 17.5c2.4-4.6 4.2-6.9 5.4-6.9 1.2 0 2.5 1.8 3.8 5.4" />
          <path d="M9.6 17.5c2.6-5.6 4.6-8.4 6-8.4 1.4 0 3.3 2.8 5.9 8.4" />
          <path d="M2.5 20.2h19" />
        </svg>
      );
    },
    water: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M2.6 8.4c2-1.7 3.4-1.7 5.4 0s3.4 1.7 5.4 0 3.4-1.7 5.4 0" />
          <path d="M2.6 13c2-1.7 3.4-1.7 5.4 0s3.4 1.7 5.4 0 3.4-1.7 5.4 0" />
          <path d="M2.6 17.6c2-1.7 3.4-1.7 5.4 0s3.4 1.7 5.4 0 3.4-1.7 5.4 0" />
        </svg>
      );
    },
    rules: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M5 4.2h9.6L19 8.6V19.8H5z" />
          <path d="M14.2 4.2v4.6H19" />
          <path d="M8.2 12.4h7.2M8.2 15.8h5" />
        </svg>
      );
    },
    leaf: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M20 4c0 8.2-4.2 12.4-9.4 12.4A5 5 0 0 1 5.4 11C7 6.6 12.6 4.6 20 4z" />
          <path d="M4.4 20c2.4-4.6 5.4-7.8 9.4-10.2" />
        </svg>
      );
    },
    calendar: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <rect x="3.6" y="5.4" width="16.8" height="14.4" rx="2" />
          <path d="M3.6 10h16.8M8.4 3.4v3.6M15.6 3.4v3.6" />
          <circle cx="9" cy="14" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="15" cy="14" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    },
    mortar: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M4.2 10.6h15.6c0 4.4-3.5 8-7.8 8s-7.8-3.6-7.8-8z" />
          <path d="M12 18.6v2M8.4 20.6h7.2" />
          <path d="M14.4 10.6L19 4.4l1.8 1.3-3.6 4.9" />
        </svg>
      );
    },
    warning: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M12 4.2l8.4 14.6H3.6z" />
          <path d="M12 9.8v3.6" />
          <circle cx="12" cy="16.2" r="0.95" fill="currentColor" stroke="none" />
        </svg>
      );
    },
    rock: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M4 17.6l4.2-9.4 5.6-3 6.2 6.6-2.8 5.8z" />
          <path d="M8.2 8.2l5.4 3.6M13.8 5.2l-.2 6.6M17.2 17.6l-3.6-5.8" />
        </svg>
      );
    },
    bug: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <ellipse cx="12" cy="13.4" rx="4.4" ry="6" />
          <path d="M12 7.4v12" />
          <circle cx="12" cy="5.6" r="2" />
          <path d="M7.6 10L4 8.2M7.6 13.4H3.6M7.6 16.8L4 18.8M16.4 10L20 8.2M16.4 13.4H20.4M16.4 16.8L20 18.8" />
        </svg>
      );
    },
    barn: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M3.5 10.2L12 4.2l8.5 6v9.6h-17z" />
          <path d="M9.2 19.8v-5.6h5.6v5.6" />
          <path d="M9.2 14.2l5.6 5.6M14.8 14.2l-5.6 5.6" />
        </svg>
      );
    },
    egg: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M12 3.6c3.4 0 6.2 5.4 6.2 9.6a6.2 6.2 0 0 1-12.4 0c0-4.2 2.8-9.6 6.2-9.6z" />
        </svg>
      );
    },
    flame: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M12 3.4c.6 3.2 4.8 5.4 4.8 10a4.8 4.8 0 0 1-9.6 0c0-2.4 1.2-3.8 2.4-5 .2 1.8 1 2.8 2 3.2-.6-3.2-.2-5.8.4-8.2z" />
          <path d="M5.4 20.6h13.2" />
        </svg>
      );
    },
    frost: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
          <path d="M12 6.6l-2 -2M12 6.6l2 -2M12 17.4l-2 2M12 17.4l2 2" />
        </svg>
      );
    },
    book: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M12 6.2c-1.9-1.3-4-1.9-6.2-1.9H4v13.4h1.8c2.2 0 4.3.6 6.2 1.9" />
          <path d="M12 6.2c1.9-1.3 4-1.9 6.2-1.9H20v13.4h-1.8c-2.2 0-4.3.6-6.2 1.9" />
          <path d="M12 6.2v13.4" />
        </svg>
      );
    },
    abacus: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9.3h18M3 14.7h18" />
          <circle cx="7" cy="6.6" r="1.2" />
          <circle cx="10.4" cy="6.6" r="1.2" />
          <circle cx="7" cy="12" r="1.2" />
          <circle cx="17" cy="17.3" r="1.2" />
          <circle cx="13.6" cy="17.3" r="1.2" />
        </svg>
      );
    },
    pencil: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M4 20.2l1-4.2L16.2 4.8a2.1 2.1 0 0 1 3 3L8 19l-4 1.2Z" />
          <path d="M14.6 6.4l3 3" />
          <path d="M5 16l3 3" />
        </svg>
      );
    },
    // sprout and bird: stroke icons after Lucide's (ISC licence), drawn on the same 24-unit grid.
    sprout: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M7 20h10" />
          <path d="M10 20c5.5-2.5.8-6.4 3-10" />
          <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
          <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
        </svg>
      );
    },
    bird: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <path d="M16 7h.01" />
          <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
          <path d="m20 7 2 .5-2 .5" />
          <path d="M10 18v3" />
          <path d="M14 17.75V21" />
          <path d="M7 18a6 6 0 0 0 3.84-10.61" />
        </svg>
      );
    },
    shapes: function ({ className: e }) {
      return (
        <svg {...i} className={l(e)}>
          <circle cx="7.5" cy="8" r="4" />
          <path d="M16.5 4.5l4 7h-8l4-7Z" />
          <rect x="4" y="15" width="7" height="6" rx="1.2" />
          <path d="M15.5 15.5v6" strokeDasharray="1.6 2.2" />
          <path d="M18.2 16.6l2.4 2.4-2.4 2.4" />
        </svg>
      );
    },
  };
export const MenuIcon = function ({ name: e, className: a }) {
  let CS_ = c[e];
  return <CS_ className={a} />;
};
