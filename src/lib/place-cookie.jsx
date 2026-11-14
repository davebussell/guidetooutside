"use client";
// Restored from client module 91247 (exports: PLACE_COOKIE, PLACE_KEY, RememberPlace, clearPlace, readPlace)
import * as a from "react";
let n = "gto:place",
  r = "gto_place";
export { r as PLACE_COOKIE };
export { n as PLACE_KEY };
export const RememberPlace = function (e) {
  let { slug: t, label: s, lat: i, lon: o, tz: l } = e;
  return (
    (0, a.useEffect)(() => {
      let e = JSON.stringify({
        slug: t,
        label: s,
        lat: i,
        lon: o,
        tz: l,
      });
      try {
        (localStorage.setItem(n, e), window.dispatchEvent(new Event("gto:place")));
      } catch {}
      try {
        document.cookie = `${r}=${encodeURIComponent(e)}; path=/; max-age=31536000; samesite=lax`;
      } catch {}
    }, [t, s, i, o, l]),
    null
  );
};
export const clearPlace = function () {
  try {
    (localStorage.removeItem(n), window.dispatchEvent(new Event("gto:place")));
  } catch {}
  try {
    document.cookie = `${r}=; path=/; max-age=0; samesite=lax`;
  } catch {}
};
export const readPlace = function () {
  try {
    let e = localStorage.getItem(n);
    return e ? JSON.parse(e) : null;
  } catch {
    return null;
  }
};
