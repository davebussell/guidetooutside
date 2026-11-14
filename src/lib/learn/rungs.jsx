// Restored from client module 8798 (exports: LOOK_ONLY, RUNGS, rung)
let t = [
  {
    id: "two",
    age: 2,
    label: "Point and name",
    skill: "One, two, three. Pointing at one thing at a time.",
    building:
      "Subitising — seeing that a group is two without counting it — and the idea that a number word belongs to a thing you are touching.",
    ceiling: 3,
  },
  {
    id: "four",
    age: 4,
    label: "Count and compare",
    skill: "Counting a real group to ten or twenty, and saying which is more.",
    building:
      "One-to-one correspondence: one number word per object, the last word you said is how many there were. Then more, fewer, and the same.",
    ceiling: 20,
  },
  {
    id: "six",
    age: 6,
    label: "Tally and figure",
    skill: "Tally marks, counting in twos and fives, and taking one number from another.",
    building:
      "Grouping as a way of counting past what fingers hold, and subtraction as the distance between two numbers rather than a taking-away.",
    ceiling: 100,
  },
];
export const LOOK_ONLY =
  "We look, we count and we put it back. Nothing goes in a mouth — not a berry, not a mushroom, not a leaf. That is the whole rule, and it is the same rule every time.";
export { t as RUNGS };
export const rung = (e) => t.find((t) => t.id === e);
