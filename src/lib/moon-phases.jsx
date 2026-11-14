// Restored from client module 50199 (exports: getMoon, phasesBetween, MoonIcon)
let t = Math.PI / 180;
function n(e) {
  let n = e / 1236.85,
    r = n * n,
    i = r * n,
    a = i * n,
    l = 2451550.09766 + 29.530588861 * e + 15437e-8 * r - 15e-8 * i + 73e-11 * a,
    o = 1 - 0.002516 * n - 74e-7 * r,
    s = t * (2.5534 + 29.1053567 * e - 14e-7 * r - 11e-8 * i),
    u = t * (201.5643 + 385.81693528 * e + 0.0107582 * r + 1238e-8 * i - 58e-9 * a),
    c = t * (160.7108 + 390.67050284 * e - 0.0016118 * r - 227e-8 * i + 11e-9 * a),
    d = t * (124.7746 - 1.56375588 * e + 0.0020672 * r + 215e-8 * i),
    f = Math.sin,
    g = Math.cos,
    h = Math.round((((e % 1) + 1) % 1) * 4) % 4;
  if (0 === h || 2 === h) {
    let e = 0 === h;
    l +=
      (e ? -0.4072 : -0.40614) * f(u) +
      (e ? 0.17241 : 0.17302) * o * f(s) +
      (e ? 0.01608 : 0.01614) * f(2 * u) +
      (e ? 0.01039 : 0.01043) * f(2 * c) +
      (e ? 0.00739 : 0.00734) * o * f(u - s) +
      (e ? -0.00514 : -0.00515) * o * f(u + s) +
      (e ? 0.00208 : 0.00209) * o * o * f(2 * s) -
      0.00111 * f(u - 2 * c) -
      57e-5 * f(u + 2 * c) +
      56e-5 * o * f(2 * u + s) -
      42e-5 * f(3 * u) +
      42e-5 * o * f(s + 2 * c) +
      38e-5 * o * f(s - 2 * c) -
      24e-5 * o * f(2 * u - s) -
      17e-5 * f(d) -
      7e-5 * f(u + 2 * s) +
      4e-5 * f(2 * u - 2 * c) +
      4e-5 * f(3 * s) +
      3e-5 * f(u + s - 2 * c) +
      3e-5 * f(2 * u + 2 * c) -
      3e-5 * f(u + s + 2 * c) +
      3e-5 * f(u - s + 2 * c) -
      2e-5 * f(u - s - 2 * c) -
      2e-5 * f(3 * u + s) +
      2e-5 * f(4 * u);
  } else {
    l +=
      -0.62801 * f(u) +
      0.17172 * o * f(s) -
      0.01183 * o * f(u + s) +
      0.00862 * f(2 * u) +
      0.00804 * f(2 * c) +
      0.00454 * o * f(u - s) +
      0.00204 * o * o * f(2 * s) -
      0.0018 * f(u - 2 * c) -
      7e-4 * f(u + 2 * c) -
      4e-4 * f(3 * u) -
      34e-5 * o * f(2 * u - s) +
      32e-5 * o * f(s + 2 * c) +
      32e-5 * o * f(s - 2 * c) -
      28e-5 * o * o * f(u + 2 * s) +
      27e-5 * o * f(2 * u + s) -
      17e-5 * f(d) -
      5e-5 * f(u - s - 2 * c) +
      4e-5 * f(2 * u + 2 * c) -
      4e-5 * f(u + s + 2 * c) +
      4e-5 * f(u - 2 * s) +
      3e-5 * f(u + s - 2 * c) +
      3e-5 * f(3 * s) +
      2e-5 * f(2 * u - 2 * c) +
      2e-5 * f(u - s + 2 * c) -
      2e-5 * f(3 * u + s);
    let e = 0.00306 - 38e-5 * o * g(s) + 26e-5 * g(u) - 2e-5 * g(u - s) + 2e-5 * g(u + s) + 2e-5 * g(2 * c);
    l += 1 === h ? e : -e;
  }
  for (let [n, i] of [
    [299.77 + 0.107408 * e - 0.009173 * r, 325e-6],
    [251.88 + 0.016321 * e, 165e-6],
    [251.83 + 26.651886 * e, 164e-6],
    [349.42 + 36.412478 * e, 126e-6],
    [84.66 + 18.206239 * e, 11e-5],
    [141.74 + 53.303771 * e, 62e-6],
    [207.14 + 2.453732 * e, 6e-5],
    [154.84 + 7.30686 * e, 56e-6],
    [34.52 + 27.261239 * e, 47e-6],
    [207.19 + 0.121824 * e, 42e-6],
    [291.34 + 1.844379 * e, 4e-5],
    [161.72 + 24.198154 * e, 37e-6],
    [239.56 + 25.513099 * e, 35e-6],
    [331.55 + 3.592518 * e, 23e-6],
  ])
    l += i * f(t * n);
  return new Date((l - 2440587.5) * 864e5 - 69e3);
}
function r(e) {
  let t = Math.floor(12.3685 * (e.getUTCFullYear() + (e.getTime() - Date.UTC(e.getUTCFullYear(), 0, 1)) / 315576e5 - 2e3));
  for (; n(t).getTime() > e.getTime();) t -= 1;
  for (; n(t + 1).getTime() <= e.getTime();) t += 1;
  return t;
}
function i(e, t) {
  try {
    let n = new Intl.DateTimeFormat("en-CA", {
        timeZone: t ?? "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).formatToParts(e),
      r = (e) => n.find((t) => t.type === e)?.value ?? "";
    return `${r("year")}-${r("month")}-${r("day")}`;
  } catch {
    return e.toISOString().slice(0, 10);
  }
}
export const getMoon = function (e = new Date(), t) {
  let a,
    l = r(e),
    o = n(l),
    s = n(l + 1),
    u = n(l + 0.5),
    c = u.getTime() >= e.getTime() ? u : n(l + 1.5),
    d = (s.getTime() - o.getTime()) / 864e5,
    f = (e.getTime() - o.getTime()) / 864e5,
    g = f / d,
    h = Math.round((1 - Math.cos(2 * g * Math.PI)) * 50);
  a =
    g < 0.0625
      ? "New Moon"
      : g < 0.1875
        ? "Waxing Crescent"
        : g < 0.3125
          ? "First Quarter"
          : g < 0.4375
            ? "Waxing Gibbous"
            : g < 0.5625
              ? "Full Moon"
              : g < 0.6875
                ? "Waning Gibbous"
                : g < 0.8125
                  ? "Last Quarter"
                  : g < 0.9375
                    ? "Waning Crescent"
                    : "New Moon";
  let m = Math.min(
    (c.getTime() - e.getTime()) / 864e5,
    (s.getTime() - e.getTime()) / 864e5,
    f,
    g >= 0.5 ? (e.getTime() - u.getTime()) / 864e5 : 1 / 0,
  );
  return {
    phaseName: a,
    illumination: h,
    age: Math.round(29.530588853 * g * 10) / 10,
    nextFull: i(c, t),
    nextNew: i(s, t),
    fishingRating: m <= 2 ? "Excellent" : m <= 5 ? "Good" : "Fair",
  };
};
export const phasesBetween = function (e, t) {
  let i = e.getTime() + 864e5 * t,
    a = ["New Moon", "First Quarter", "Full Moon", "Last Quarter"],
    l = [],
    o = r(e) - 1;
  for (;;) {
    let t = false;
    for (let r = 0; r < 4; r++) {
      let s = n(o + r / 4);
      s.getTime() > i
        ? (t = true)
        : s.getTime() >= e.getTime() &&
          l.push({
            kind: a[r],
            date: s,
          });
    }
    if (t) break;
    o += 1;
  }
  return l;
};
export const MoonIcon = function ({ age: e, size: t = 28, className: n = "" }) {
  let r = (e % 29.530588853) / 29.530588853,
    i = (1 - Math.cos(2 * r * Math.PI)) / 2,
    l = 12 * Math.abs(Math.cos(2 * r * Math.PI)),
    o = "#f3e9c9",
    s = "#2a3a30";
  return (
    <svg width={t} height={t} viewBox="0 0 28 28" className={n} aria-hidden="true">
      <circle cx="14" cy="14" r={12} fill={s} />
      <path d={r < 0.5 ? "M14 2 A12 12 0 0 1 14 26 Z" : "M14 2 A12 12 0 0 0 14 26 Z"} fill={o} />
      <ellipse cx="14" cy="14" rx={l} ry={12} fill={i > 0.5 ? o : s} />
      <circle cx="14" cy="14" r={12} fill="none" stroke="var(--ink)" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
};
