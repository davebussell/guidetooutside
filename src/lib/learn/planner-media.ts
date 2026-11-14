/**
 * What the day planner (/learn) needs on top of the shared children's library
 * (src/data/books.ts, src/data/kid-videos.ts): the "kind" and the animals of
 * the nineteen books it carries everywhere, and the order of the fifteen films
 * about no place in particular — both exactly as the live planner's props had them.
 */
export const PLANNER_BOOK_TAGS: Record<string, { kind: "nature" | "animal"; animals: string[] }> = {
  "9781338243314": {
    "kind": "nature",
    "animals": []
  },
  "9780517709771": {
    "kind": "animal",
    "animals": [
      "beluga"
    ]
  },
  "9781250076366": {
    "kind": "animal",
    "animals": [
      "wolf"
    ]
  },
  "9781416900856": {
    "kind": "animal",
    "animals": [
      "monarch"
    ]
  },
  "9780385386524": {
    "kind": "animal",
    "animals": [
      "beaver"
    ]
  },
  "9781550746679": {
    "kind": "animal",
    "animals": [
      "deer",
      "moose",
      "caribou"
    ]
  },
  "9781550743555": {
    "kind": "animal",
    "animals": [
      "black-bear",
      "grizzly-bear",
      "polar-bear"
    ]
  },
  "9780316324908": {
    "kind": "animal",
    "animals": [
      "black-bear"
    ]
  },
  "9781771471749": {
    "kind": "animal",
    "animals": [
      "moose",
      "canada-goose",
      "beaver",
      "loon",
      "polar-bear"
    ]
  },
  "9780823442850": {
    "kind": "animal",
    "animals": [
      "bee"
    ]
  },
  "9781536205381": {
    "kind": "animal",
    "animals": [
      "hummingbird"
    ]
  },
  "9781665980517": {
    "kind": "animal",
    "animals": [
      "squirrel"
    ]
  },
  "9781665980531": {
    "kind": "animal",
    "animals": [
      "woodpecker"
    ]
  },
  "9780805071030": {
    "kind": "animal",
    "animals": [
      "canada-goose"
    ]
  },
  "9780544442900": {
    "kind": "animal",
    "animals": [
      "robin"
    ]
  },
  "9781536203240": {
    "kind": "animal",
    "animals": [
      "otter"
    ]
  },
  "9781607276357": {
    "kind": "animal",
    "animals": [
      "chipmunk"
    ]
  },
  "9780689710551": {
    "kind": "animal",
    "animals": [
      "firefly"
    ]
  },
  "9780064451994": {
    "kind": "animal",
    "animals": [
      "earthworm"
    ]
  }
};

export const PLANNER_FILM_ORDER: string[] = [
  "fTGKS1yEJCo",
  "2eVc8VjKWaE",
  "aHs_3oirtRc",
  "EUd9vtS9yMI",
  "2vGjJUncYPA",
  "4bZL1qgfeLM",
  "Nu7bJuC1LfA",
  "QMkMgpR6hpo",
  "YkViQ19JIA4",
  "UUO30bwTpds",
  "ta154f5Rp5Y",
  "nOzsxB5Ipc0",
  "fJxvIHuKPBE",
  "bUgWy741Nhc",
  "h5ESRtJUVqU"
];
