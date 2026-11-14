// Restored from client module 79766 (exports: DEFAULT_FROST, PHASES, frostDatesOf, gardenDayToDate, gardenDoy, gardenMonths, gardenYear, isTropical)
let t = {
  rest: {
    id: "rest",
    name: "Rest and plan",
    doing: "The garden rests: eat from storage, order seed and draw next year’s beds.",
    work: ["Seed order", "Bed plan", "Sharpen tools", "Check stored crops"],
    colour: "#6b7fa3",
    tint: "#e4e9f3",
  },
  start: {
    id: "start",
    name: "Seeds and plans",
    doing: "The first trays are sown under lights; fruit is pruned before bud break.",
    // The crop lists (and the day-by-day versions of these tasks) come from the town's sowing windows: see withSowing.
    work: ["Start the crops whose tray window has opened", "Prune apples and raspberries", "Order seed potatoes"],
    colour: "#8a7bb8",
    tint: "#ece7f5",
  },
  sow: {
    id: "sow",
    name: "Sowing",
    doing: "Hardy crops before the last frost, tender crops after it.",
    work: ["Sow the crops whose window is open", "Harden off transplants"],
    colour: "#5d8a4a",
    tint: "#e4efdc",
  },
  grow: {
    id: "grow",
    name: "Growing",
    doing: "Water, weed and stake; pick the first crops.",
    work: ["Pick the first crops", "Sow what is still in its window", "Check for pests"],
    colour: "#2f8f5b",
    tint: "#dcefe3",
  },
  harvest: {
    id: "harvest",
    name: "Harvest and preserving",
    doing: "The main crop ripens faster than it can be eaten: canning, freezing and cold storage.",
    work: ["Harvest tender crops before frost", "Cure squash, onions, garlic", "Can, freeze, dry, ferment", "Save seed"],
    colour: "#c2742a",
    tint: "#f7e8d6",
  },
  bed: {
    id: "bed",
    name: "Closing the garden",
    doing: "Beds are mulched with leaves and the last roots lifted before the ground freezes.",
    // "Plant garlic" is not listed here: it leads the list only while the town's own garlic window is open (gardenYear's `garlic` option).
    work: ["Lift the last roots", "Mulch beds with leaves", "Drain hoses, store tools"],
    colour: "#9b5e3c",
    tint: "#efe1d8",
  },
};
function s(e) {
  let t = Date.UTC(e.getFullYear(), 0, 1);
  return Math.floor((Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) - t) / 864e5) + 1;
}
function r(e, t) {
  return t ? s(new Date(e.getTime() + 157248e5)) : s(e);
}
let o = (e, t) => (((t - e) % 365) + 365) % 365,
  a = (e) => {
    let t = Math.round(Math.abs(e) / 7);
    return 0 === t ? "this week" : 1 === t ? "about a week" : `about ${t} weeks`;
  },
  // "this week", or "about 2 weeks ago" (the 10 Nov 2026 audit read "The average first frost was this week ago").
  ago = (e) => (0 === Math.round(Math.abs(e) / 7) ? "this week" : `${a(e)} ago`);
/**
 * The phase with the autumn planting task read against the town's garlic window (n.garlic: "open", "closed",
 * "later" or absent, from src/lib/autumn-planting garlicState): "Plant garlic" leads the list only while the
 * window is open; once it has closed the list says so at the end; otherwise garlic is not mentioned.
 */
function withGarlic(p, garlic) {
  if (p.id !== "bed") return p;
  if (garlic === "open") return { ...p, work: ["Plant garlic", ...p.work] };
  if (garlic === "closed") return { ...p, work: [...p.work, "Garlic: planting window closed this year"] };
  return p;
}
/**
 * The seed-sowing tasks of the sowing and growing phases read against the town's own sowing windows (n.sowing,
 * from src/lib/crop-calendar sowNow/nextSowing: {sow, trays, next}, names of the crops whose window includes
 * today). The earlier static lists ("Peas, spinach, onions", "Sow autumn carrots and brassicas") named crops
 * whatever the date; with `sowing` the tasks name only crops that can be sown today, or say that nothing can
 * and when the next window opens (and without it the tasks name no crop).
 */
function withSowing(p, s) {
  if (!s || (p.id !== "start" && p.id !== "sow" && p.id !== "grow")) return p;
  const names = (xs) => xs.slice(0, 4).join(", ");
  const sowTask = s.sow.length ? `Sow now: ${names(s.sow)}` : s.next ? `No sowing window is open today; next: ${s.next}` : "No sowing window is open today";
  const trayTask = s.trays.length ? `Start in trays now: ${names(s.trays)}` : null;
  if (p.id === "start") return { ...p, work: [trayTask ?? "No crop is due in trays this week", "Prune apples and raspberries", "Order seed potatoes"] };
  if (p.id === "sow") return { ...p, work: [sowTask, ...(trayTask ? [trayTask] : []), "Harden off transplants"] };
  return { ...p, work: [sowTask, ...(trayTask ? [trayTask] : []), "Check for pests"] };
}
/**
 * The harvest phase's tasks read against the frost date: "Harvest tender crops before frost" only while the average
 * first frost is still ahead (toFirst > 0). The 10 Nov 2026 audit found it on the strip at Philadelphia, Richmond,
 * Washington, Baltimore, Charlotte and Raleigh after their first frost had passed: the phase runs to 14 days after the
 * frost. Where frost does not date the year (byMonth) there is no frost to harvest before, so it is not listed either.
 */
const BEFORE_FROST = "Harvest tender crops before frost";
function withFrost(p, toFirst) {
  if (p.id !== "harvest" || toFirst > 0) return p;
  return { ...p, work: p.work.filter((w) => w !== BEFORE_FROST) };
}
export const DEFAULT_FROST = {
  lastDoy: 135,
  firstDoy: 275,
  frostFreeDays: 140,
};
export { t as PHASES };
export const frostDatesOf = function (e) {
  return e && null != e.lastSpringFrostDoy && null != e.firstFallFrostDoy
    ? {
        lastDoy: e.lastSpringFrostDoy,
        firstDoy: e.firstFallFrostDoy,
        frostFreeDays: e.frostFreeDays ?? o(e.lastSpringFrostDoy, e.firstFallFrostDoy),
        ...(e.south
          ? {
              south: true,
            }
          : {}),
      }
    : null;
};
export const gardenDayToDate = function (e, t, s = new Date().getFullYear()) {
  return new Date(s, 0, e - 182 * !!t);
};
export { r as gardenDoy };
export const gardenMonths = function (e) {
  let t = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return e ? [...t.slice(6), ...t.slice(0, 6)] : t;
};
export const gardenYear = function (e, s, n = {}) {
  var l;
  let i,
    u,
    d,
    h,
    f,
    c,
    g,
    w = s?.south ?? n.south ?? false,
    b = r(e, w);
  if (n.tropical && (!s || s.frostFreeDays >= 330 || s.frostFreeDays <= 0))
    return {
      phase: {
        ...t.grow,
        name: "Growing all year",
        doing: "Frost-free: the rains set the sowing dates, and the dry season sets the watering.",
        work: ["Sow with the rains", "Mulch and shade seedlings", "Water through the dry season", "Watch for pests"],
      },
      through: 0.5,
      sinceLast: 0,
      toFirst: 0,
      where:
        "There is no frost here: the rains, not the cold, set the garden year. Sow as the rains arrive, and keep a watered bed through the dry season.",
      next: "Plant the main crops with the next rains; mulch and shade seedlings in the heat.",
      byMonth: true,
      tropical: true,
      bands: [],
    };
  if (!s || s.frostFreeDays >= 330 || s.frostFreeDays <= 0) {
    let s = e.getMonth() + 1,
      r =
        (l = w ? ((s + 5) % 12) + 1 : s) <= 1
          ? "rest"
          : 2 === l
            ? "start"
            : l <= 4
              ? "sow"
              : l <= 6
                ? "grow"
                : l <= 10
                  ? "harvest"
                  : 11 === l
                    ? "bed"
                    : "rest";
    return {
      phase: withFrost(t[r], 0),
      through: 0.5,
      sinceLast: 0,
      toFirst: 0,
      where: "Frost rarely decides the year here, so the phases follow the calendar.",
      next: "harvest" === r ? "Cool-season sowing resumes as the heat eases." : "Sowing continues year-round; there is no frost season.",
      byMonth: true,
      bands: [],
    };
  }
  let p =
      ((d = s.lastDoy),
      (h = s.firstDoy),
      (c = {
        start: d - 70,
        sow: d - 21,
        grow: d + 21,
        harvest: h - ((f = s.frostFreeDays > 240) ? 70 : 56),
        bed: h + 14,
        rest: h + (f ? 56 : 42),
      }),
      [
        {
          id: "start",
          from: (g = (e) => ((((e - 1) % 365) + 365) % 365) + 1)(c.start),
          to: g(c.sow),
        },
        {
          id: "sow",
          from: g(c.sow),
          to: g(c.grow),
        },
        {
          id: "grow",
          from: g(c.grow),
          to: g(c.harvest),
        },
        {
          id: "harvest",
          from: g(c.harvest),
          to: g(c.bed),
        },
        {
          id: "bed",
          from: g(c.bed),
          to: g(c.rest),
        },
        {
          id: "rest",
          from: g(c.rest),
          to: g(c.start),
        },
      ]),
    y =
      p.find((e) => {
        let t, s;
        return ((t = e.from), (s = e.to), o(t, b) < o(t, s));
      }) ?? p[0],
    m = o(y.from, y.to) || 1,
    D = o(y.from, b) / m,
    F = 182 >= o(s.lastDoy, b) ? o(s.lastDoy, b) : -o(b, s.lastDoy),
    v = 182 >= o(b, s.firstDoy) ? o(b, s.firstDoy) : -o(s.firstDoy, b),
    k = t[y.id];
  switch (y.id) {
    case "harvest":
      ((i =
        v > 0
          ? `About ${v} days until the average first frost. Tender crops should be harvested before then.`
          : `The average first frost was ${ago(v)}. The tender crops are finished; roots, brassicas and storage crops carry on.`),
        (u =
          v > 0
            ? `First frost ${a(v)} away; tender crops come in before it.`
            : "Garlic goes in about four to six weeks before the ground freezes, and spring bulbs about six weeks before."));
      break;
    case "bed":
      ((i = `The average first frost was ${ago(v)}.`),
        (u = "Lift or mulch anything still in the beds before the ground freezes."));
      break;
    case "rest":
      ((i = F < 0 ? `About ${-F} days until the average last frost.` : `Deep winter: the last frost is ${a(o(b, s.lastDoy))} off.`),
        (u = `The seeds-and-plans phase starts ${a(o(b, y.to))} from now.`));
      break;
    case "start":
      ((i = `About ${-F} days until the average last frost.`),
        (u = `The sowing phase starts ${a(o(b, y.to))} from now, three weeks before the average last frost.`));
      break;
    case "sow":
      ((i =
        F < 0
          ? `About ${-F} days until the average last frost; sow hardy crops only.`
          : `The last frost was ${a(F)} ago; tender crops can go out once nights stay above 10 \xb0C.`),
        (u = `The sowing phase ends ${a(o(b, y.to))} from now; the lists below show what can be sown today.`));
      break;
    default:
      ((i = `${F} days since the last frost, about ${v} until the first.`),
        (u = `The main harvest starts in ${a(o(b, y.to))}.`));
  }
  return {
    phase: withSowing(withGarlic(withFrost(k, v), n.garlic), n.sowing),
    through: D,
    sinceLast: F,
    toFirst: v,
    where: i,
    next: u,
    byMonth: false,
    bands: p,
  };
};
export const isTropical = (e) => 23.5 > Math.abs(e);
