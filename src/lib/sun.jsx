// Restored from client module 74956 (exports: fmtDayLength, fmtTime, sunTimes)
let t = Math.PI / 180;
export const fmtDayLength = function (e) {
  return null == e ? "—" : `${Math.floor(e / 60)}h ${String(e % 60).padStart(2, "0")}m`;
};
export const fmtTime = function (e, t) {
  if (!e) return "—";
  try {
    return e.toLocaleTimeString("en-CA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: t,
    });
  } catch {
    return e.toLocaleTimeString("en-CA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
};
export const sunTimes = function (e, r, n = new Date()) {
  let s = (new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), 12)).getTime() / 864e5 + 2440587.5 - 2451545) / 36525,
    i = (280.46646 + s * (36000.76983 + 3032e-7 * s)) % 360,
    a = 357.52911 + s * (35999.05029 - 1537e-7 * s),
    o = 0.016708634 - s * (42037e-9 + 1267e-10 * s),
    l =
      Math.sin(a * t) * (1.914602 - s * (0.004817 + 14e-6 * s)) +
      Math.sin(2 * a * t) * (0.019993 - 101e-6 * s) +
      289e-6 * Math.sin(3 * a * t),
    c = 125.04 - 1934.136 * s,
    d = i + l - 0.00569 - 0.00478 * Math.sin(c * t),
    f = 23 + (26 + (21.448 - s * (46.815 + s * (59e-5 - 0.001813 * s))) / 60) / 60 + 0.00256 * Math.cos(c * t),
    h = Math.asin(Math.sin(f * t) * Math.sin(d * t)) / t,
    u = Math.tan((f / 2) * t) ** 2,
    p =
      (4 *
        (u * Math.sin(2 * i * t) -
          2 * o * Math.sin(a * t) +
          4 * o * u * Math.sin(a * t) * Math.cos(2 * i * t) -
          0.5 * u * u * Math.sin(4 * i * t) -
          1.25 * o * o * Math.sin(2 * a * t))) /
      t,
    x = Math.cos(90.833 * t) / (Math.cos(e * t) * Math.cos(h * t)) - Math.tan(e * t) * Math.tan(h * t),
    $ = 720 - 4 * r - p,
    y = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()),
    g = new Date(y + 6e4 * $);
  if (x > 1 || x < -1)
    return {
      sunrise: null,
      sunset: null,
      dayLengthMin: 1440 * (x < -1),
      solarNoon: g,
    };
  let m = Math.acos(x) / t;
  return {
    sunrise: new Date(y + ($ - 4 * m) * 6e4),
    sunset: new Date(y + ($ + 4 * m) * 6e4),
    dayLengthMin: Math.round(8 * m),
    solarNoon: g,
  };
};
