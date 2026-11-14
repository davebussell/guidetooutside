// Restored from client module 1177 (exports: BADGES, SKILLS, earnedBadges, nextBadges, nextSkills, skillsFor)
let t = [
    {
      id: "says-five",
      rung: "two",
      label: "Says the number words to five",
      tell: "They chant one-two-three-four-five, probably too fast and probably skipping four. The chant comes first; the meaning comes later.",
      lessons: ["acorns-in-tens", "seeds-to-a-hundred"],
    },
    {
      id: "points-one",
      rung: "two",
      label: "Touches one thing at a time",
      tell: "Asked for one acorn, they hand you one, not a fistful. This is the seed of everything else on this list.",
      lessons: ["acorns-in-tens", "petal-numbers"],
    },
    {
      id: "sees-two",
      rung: "two",
      label: "Sees that two is two without counting",
      tell: "Show two stones and they say two straight away. Three often follows within months; four almost never does at this age.",
      lessons: ["sort-the-stones", "mushroom-count"],
    },
    {
      id: "sorts-one-way",
      rung: "two",
      label: "Sorts into two piles by one difference",
      tell: "Big ones here, little ones there — and they can keep it up for more than three stones.",
      lessons: ["sort-the-stones", "fold-a-leaf"],
    },
    {
      id: "says-bigger",
      rung: "two",
      label: "Picks the bigger pile when it is obvious",
      tell: "Five against one, they get it. Five against four, they do not, and will not for a while.",
      lessons: ["sort-the-stones", "shadow-clock"],
    },
    {
      id: "counts-ten",
      rung: "four",
      label: "Counts a real group of ten",
      tell: "One number word per object, no double-counting, no skipping. Watch the finger, not the mouth — the mouth is usually ahead.",
      lessons: ["acorns-in-tens", "petal-numbers", "how-many-legs"],
    },
    {
      id: "last-word",
      rung: "four",
      label: "Knows the last number said is how many there were",
      tell: "Ask how many after they have counted. If they count the whole pile again to answer, they are not there yet — and that is the single most important step on this ladder.",
      lessons: ["acorns-in-tens", "five-minute-bird-count"],
    },
    {
      id: "counts-twenty",
      rung: "four",
      label: "Counts past ten to twenty",
      tell: "The teens are where it breaks — eleven and twelve follow no rule, and thirteen sounds like thirty.",
      lessons: ["seeds-to-a-hundred", "five-minute-bird-count"],
    },
    {
      id: "how-many-more",
      rung: "four",
      label: "Says which has more, and how many more",
      tell: "More is easy; how many more is a different question, and most four-year-olds answer it by counting one pile twice.",
      lessons: ["sort-the-stones", "shadow-clock", "how-many-legs"],
    },
    {
      id: "pattern-ab",
      rung: "four",
      label: "Continues a repeating pattern",
      tell: "Stone, cone, stone, cone — and they put a stone next without being told the rule. Saying the pattern out loud is what unlocks it.",
      lessons: ["bark-and-repeats", "fold-a-leaf"],
    },
    {
      id: "writes-ten",
      rung: "four",
      label: "Writes the numerals to ten",
      tell: "Backwards fives and threes are normal well past six and are not worth correcting hard.",
      lessons: ["five-minute-bird-count", "moon-calendar"],
    },
    {
      id: "matches-halves",
      rung: "four",
      label: "Sees when two halves match",
      tell: "They fold a leaf and can say whether the edges met — including saying no when they did not.",
      lessons: ["fold-a-leaf", "petal-numbers"],
    },
    {
      id: "tallies",
      rung: "six",
      label: "Makes and reads tally marks",
      tell: "Four uprights and a line across, then counting the bundles in fives. Reading somebody else's tallies is the harder half.",
      lessons: ["five-minute-bird-count", "frost-chain"],
    },
    {
      id: "skip-two-five-ten",
      rung: "six",
      label: "Counts in twos, fives and tens",
      tell: "Fluently and out of order — starting at thirty and going up in fives is much harder than starting at five.",
      lessons: ["seeds-to-a-hundred", "how-many-legs", "mushroom-count"],
    },
    {
      id: "to-hundred",
      rung: "six",
      label: "Counts to a hundred, and knows ten tens make it",
      tell: "Not the chant — the seeing. Ten full egg-carton hollows and they know what they are looking at before counting.",
      lessons: ["seeds-to-a-hundred", "acorns-in-tens"],
    },
    {
      id: "subtracts-twenty",
      rung: "six",
      label: "Takes one number from another within twenty",
      tell: "Counting back is fine; counting up from the smaller number is better and worth showing them.",
      lessons: ["frost-chain", "shadow-clock", "sort-the-stones"],
    },
    {
      id: "multiplies-small",
      rung: "six",
      label: "Works out groups of equal size",
      tell: "Four spiders at eight legs each, without laying out thirty-two things. Skip counting is the bridge.",
      lessons: ["how-many-legs", "seeds-to-a-hundred"],
    },
    {
      id: "measures-units",
      rung: "six",
      label: "Measures with a repeated unit",
      tell: "Heel-to-toe steps with no gaps, and the understanding that a longer foot gives a smaller number for the same tree.",
      lessons: ["shadow-clock", "sort-the-stones"],
    },
    {
      id: "keeps-record",
      rung: "six",
      label: "Keeps a record over days and reads it back",
      tell: "Not just writing it down — going back to it a week later and saying what changed. This is the skill the whole journal exists for.",
      lessons: ["moon-calendar", "frost-chain", "five-minute-bird-count"],
    },
    {
      id: "spots-sequence",
      rung: "six",
      label: "Finds the rule in a list of numbers",
      tell: "Given 3, 5, 5, 5, 8, 5, 13 they notice five keeps turning up before being asked what they notice.",
      lessons: ["petal-numbers", "bark-and-repeats"],
    },
  ],
  n = (e) => t.filter((t) => t.rung === e),
  s = (e) => new Set(e.map((e) => e.what.trim().toLowerCase()).filter(Boolean)).size,
  a = (e) => new Set(e.map((e) => e.date)).size,
  o = (e) => e.reduce((e, t) => e + (t.count ?? 0), 0),
  r = (e) => e.reduce((e, t) => Math.max(e, t.count ?? 0), 0),
  l = (e, t) => e.filter((e) => t.test(e.what) || t.test(e.what.toLowerCase())),
  i = (e) => new Set(e.map((e) => e.date.slice(5, 7))),
  d = {
    12: "w",
    "01": "w",
    "02": "w",
    "03": "sp",
    "04": "sp",
    "05": "sp",
    "06": "su",
    "07": "su",
    "08": "su",
    "09": "f",
    10: "f",
    11: "f",
  },
  h = [
    {
      id: "first-count",
      name: "First count",
      note: "You counted something and wrote it down.",
      how: "One journal entry.",
      rung: "two",
      earned: (e) => e.length >= 1,
    },
    {
      id: "ten",
      name: "Ten of something",
      note: "You counted ten of one thing, all in one go.",
      how: "A single entry of ten or more.",
      rung: "two",
      earned: (e) => r(e) >= 10,
      progress: (e) => ({
        now: Math.min(r(e), 10),
        need: 10,
      }),
    },
    {
      id: "twenty",
      name: "Past twenty",
      note: "Past both hands and both feet.",
      how: "A single entry of twenty or more.",
      rung: "four",
      earned: (e) => r(e) >= 20,
      progress: (e) => ({
        now: Math.min(r(e), 20),
        need: 20,
      }),
    },
    {
      id: "hundred",
      name: "The hundred",
      note: "A hundred of one thing, counted properly.",
      how: "A single entry of a hundred or more. Counting in tens is the only way anyone manages it.",
      rung: "six",
      earned: (e) => r(e) >= 100,
      progress: (e) => ({
        now: Math.min(r(e), 100),
        need: 100,
      }),
    },
    {
      id: "five-kinds",
      name: "Five different things",
      note: "Five kinds of thing, not five of the same thing.",
      how: "Entries naming five different subjects.",
      rung: "two",
      earned: (e) => s(e) >= 5,
      progress: (e) => ({
        now: Math.min(s(e), 5),
        need: 5,
      }),
    },
    {
      id: "twenty-kinds",
      name: "Twenty different things",
      note: "You have been paying attention for a while now.",
      how: "Entries naming twenty different subjects.",
      rung: "four",
      earned: (e) => s(e) >= 20,
      progress: (e) => ({
        now: Math.min(s(e), 20),
        need: 20,
      }),
    },
    {
      id: "week-of-walks",
      name: "A week of walks",
      note: "Seven different days out, counting something each time.",
      how: "Entries on seven different dates.",
      rung: "four",
      earned: (e) => a(e) >= 7,
      progress: (e) => ({
        now: Math.min(a(e), 7),
        need: 7,
      }),
    },
    {
      id: "month-of-moons",
      name: "A month of moons",
      note: "You watched the moon go all the way round.",
      how: "Twenty entries about the moon, on twenty different nights.",
      rung: "four",
      earned: (e) => a(l(e, /moon/i)) >= 20,
      progress: (e) => ({
        now: Math.min(a(l(e, /moon/i)), 20),
        need: 20,
      }),
    },
    {
      id: "the-tally",
      name: "Five hundred counted",
      note: "Everything you have counted, added together, is five hundred.",
      how: "Five hundred across every entry.",
      rung: "six",
      earned: (e) => o(e) >= 500,
      progress: (e) => ({
        now: Math.min(o(e), 500),
        need: 500,
      }),
    },
    {
      id: "the-thousand",
      name: "The thousand",
      note: "A thousand things, counted one at a time, by you.",
      how: "A thousand across every entry.",
      rung: "six",
      earned: (e) => o(e) >= 1e3,
      progress: (e) => ({
        now: Math.min(o(e), 1e3),
        need: 1e3,
      }),
    },
    {
      id: "four-seasons",
      name: "All four seasons",
      note: "You went out and counted in winter as well as in summer.",
      how: "Entries in all four seasons. This one takes a year, and there is no way to hurry it.",
      rung: "six",
      earned: (e) => new Set([...i(e)].map((e) => d[e])).size >= 4,
      progress: (e) => ({
        now: new Set([...i(e)].map((e) => d[e])).size,
        need: 4,
      }),
    },
    {
      id: "frost-caller",
      name: "Frost caller",
      note: "You were watching on the morning the first frost came.",
      how: "An entry mentioning frost.",
      rung: "six",
      earned: (e) => l(e, /frost|ice|crunch/i).length >= 1,
    },
    {
      id: "bird-watcher",
      name: "The bird count",
      note: "Ten birds in one sit, and you sat still enough to get them.",
      how: "An entry about birds of ten or more.",
      rung: "four",
      earned: (e) => l(e, /bird|crow|jay|chickadee|sparrow|goose|duck|hawk|owl/i).some((e) => (e.count ?? 0) >= 10),
    },
    {
      id: "hands-behind-backs",
      name: "Hands behind backs",
      note: "You counted mushrooms and put none of them anywhere near your mouth.",
      how: "An entry about mushrooms. The rule earns the badge as much as the counting does.",
      rung: "two",
      earned: (e) => l(e, /mushroom|fungus|fungi|toadstool|cap/i).length >= 1,
    },
  ];
export { h as BADGES };
export { t as SKILLS };
export const earnedBadges = function (e) {
  return h.filter((t) => t.earned(e));
};
export const nextBadges = function (e, t = 3) {
  let n = h.filter((t) => !t.earned(e)),
    s = (t) => {
      let n = t.progress?.(e);
      return n ? n.now / n.need : 0;
    };
  return [...n].sort((e, t) => s(t) - s(e)).slice(0, t);
};
export const nextSkills = function (e, t, s = 3) {
  let a = ["two", "four", "six"],
    o = a.indexOf(t),
    r = [...a.slice(o), ...a.slice(0, o)],
    l = [];
  for (let t of r) {
    for (let a of n(t)) !e.includes(a.id) && l.length < s && l.push(a);
    if (l.length >= s) break;
  }
  return l;
};
export { n as skillsFor };
