"use client";
// Restored from client module 34426 (exports: useHere)
import * as t from "react";
import * as s from "@/lib/hooks";
import * as r from "@/lib/ecoregions";
let o = new Map(),
  a = {
    zone: null,
    zoneNumber: null,
    soilC: null,
    tempC: null,
    rock: null,
    frost: null,
    lows: [],
    tz: null,
  };
export const useHere = function () {
  let e = (0, s.usePlace)(),
    [n, l] = (0, t.useState)(null),
    [i, u] = (0, t.useState)(0);
  if (
    ((0, t.useEffect)(() => {
      u(new Date().getMonth() + 1);
    }, []),
    (0, t.useEffect)(() => {
      if (!e || o.has(e.slug)) return;
      let t = false,
        s = e.slug;
      return (
        fetch(`/api/here?lat=${e.lat.toFixed(4)}&lon=${e.lon.toFixed(4)}`)
          .then((e) => (e.ok ? e.json() : null))
          .then((e) => {
            let r = e
              ? {
                  zone: e.zone ?? null,
                  zoneNumber: e.zoneNumber ?? null,
                  soilC: e.soilC ?? null,
                  tempC: e.tempC ?? null,
                  rock: e.rock ?? null,
                  frost: e.frost ?? null,
                  lows: e.lows ?? [],
                  tz: e.tz ?? null,
                }
              : a;
            (o.set(s, r),
              t ||
                l({
                  slug: s,
                  value: r,
                }));
          })
          .catch(() => {
            t ||
              l({
                slug: s,
                value: a,
              });
          }),
        () => {
          t = true;
        }
      );
    }, [e]),
    !e)
  )
    return {
      place: null,
      town: null,
      region: null,
      month: i,
      ...a,
      loading: false,
    };
  let d = (0, r.getEcoregion)((0, r.classifyEcoregion)(e.lat, e.lon).slug) ?? null,
    h = o.get(e.slug) ?? (n?.slug === e.slug ? n.value : null);
  return {
    place: e,
    town: e.label.split(",")[0],
    region: d,
    month: i,
    ...(h ?? a),
    loading: !h,
  };
};
