// Restored from client module 27155 (exports: compassName, dayShape, fmtLeft, solarPosition)
import * as t from "@/lib/sun";
let r = Math.PI / 180,
  n = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
function s(e) {
  return n[Math.round((((e % 360) + 360) % 360) / 45) % 8];
}
function i(e, n, a = new Date()) {
  let o = (a.getTime() / 864e5 + 2440587.5 - 2451545) / 36525,
    l = (280.46646 + o * (36000.76983 + 3032e-7 * o)) % 360,
    c = 357.52911 + o * (35999.05029 - 1537e-7 * o),
    d = 0.016708634 - o * (42037e-9 + 1267e-10 * o),
    f =
      Math.sin(c * r) * (1.914602 - o * (0.004817 + 14e-6 * o)) +
      Math.sin(2 * c * r) * (0.019993 - 101e-6 * o) +
      289e-6 * Math.sin(3 * c * r),
    h = 125.04 - 1934.136 * o,
    u = l + f - 0.00569 - 0.00478 * Math.sin(h * r),
    p = 23 + (26 + (21.448 - o * (46.815 + o * (59e-5 - 0.001813 * o))) / 60) / 60 + 0.00256 * Math.cos(h * r),
    x = Math.asin(Math.sin(p * r) * Math.sin(u * r)) / r,
    $ = Math.tan((p / 2) * r) ** 2,
    y =
      (4 *
        ($ * Math.sin(2 * l * r) -
          2 * d * Math.sin(c * r) +
          4 * d * $ * Math.sin(c * r) * Math.cos(2 * l * r) -
          0.5 * $ * $ * Math.sin(4 * l * r) -
          1.25 * d * d * Math.sin(2 * c * r))) /
      r,
    g = (60 * a.getUTCHours() + a.getUTCMinutes() + a.getUTCSeconds() / 60 + y + 4 * n) / 4 - 180;
  (g < -180 && (g += 360), g > 180 && (g -= 360));
  let m = Math.asin(Math.max(-1, Math.min(1, Math.sin(e * r) * Math.sin(x * r) + Math.cos(e * r) * Math.cos(x * r) * Math.cos(g * r)))) / r,
    j =
      Math.acos(Math.max(-1, Math.min(1, (Math.sin(x * r) - Math.sin(m * r) * Math.sin(e * r)) / (Math.cos(m * r) * Math.cos(e * r))))) / r;
  g > 0 && (j = 360 - j);
  let M = (0, t.sunTimes)(e, n, a),
    k = null;
  return (
    M.sunrise &&
      M.sunset &&
      a >= M.sunrise &&
      a <= M.sunset &&
      (k = (a.getTime() - M.sunrise.getTime()) / (M.sunset.getTime() - M.sunrise.getTime())),
    {
      altitude: m,
      azimuth: j,
      compass: s(j),
      arc: k,
    }
  );
}
export { s as compassName };
export const dayShape = function (e, r, n = new Date()) {
  let a = new Date(n.getTime() - 54e6),
    o = n.getTime() + 1332e5,
    l = [];
  for (let t = a.getTime(); t <= o; t += 12e4) {
    let n = new Date(t),
      s = i(e, r, n);
    l.push({
      at: n,
      alt: s.altitude,
      az: s.azimuth,
    });
  }
  let c = Math.max(...l.map((e) => e.alt)),
    d = Math.min(...l.map((e) => e.alt)) > -0.833 ? "midnight-sun" : c < -0.833 ? "polar-night" : null,
    f = l.map((e, t) => {
      var r;
      let n = 0 === t ? l[1].alt >= e.alt : e.alt >= l[t - 1].alt;
      return {
        ...e,
        phase:
          ((r = e.alt),
          r < -12
            ? "night"
            : r < -0.833
              ? n
                ? "first-light"
                : "dusk"
              : r < 6
                ? n
                  ? "sunrise"
                  : "golden-hour"
                : c >= 12 && r >= 0.86 * c
                  ? "midday"
                  : n
                    ? "morning"
                    : "afternoon"),
      };
    }),
    h = [],
    u = [],
    p = () => {
      if (!u.length) return;
      let e = u[0].at,
        t = new Date(u[u.length - 1].at.getTime() + 12e4),
        r = u[Math.floor(u.length / 2)];
      (h.push({
        phase: u[0].phase,
        start: e,
        end: t,
        midAltitude: r.alt,
        midAzimuth: r.az,
        midCompass: s(r.az),
        minutes: Math.round((t.getTime() - e.getTime()) / 6e4),
      }),
        (u = []));
    };
  for (let e of f) (u.length && e.phase !== u[0].phase && p(), u.push(e));
  p();
  let x = h.find((e) => n >= e.start && n < e.end) ?? null,
    $ = (0, t.sunTimes)(e, r, n);
  return {
    windows: h,
    current: x,
    now: n,
    position: i(e, r, n),
    peakAltitude: c,
    dayLengthMin: $.dayLengthMin,
    polar: d,
  };
};
export const fmtLeft = function (e) {
  if (e < 60) return `${e} min`;
  let t = Math.floor(e / 60),
    r = e % 60;
  return r ? `${t}h ${r}m` : `${t}h`;
};
export { i as solarPosition };
