"use client";
// Restored from client module 48723 (exports: useMinuteNow, useMounted, usePlace)
import * as n from "react";
import * as r from "@/lib/place-cookie";
let a;
let t = null;
function s() {
  let e = null;
  try {
    e = localStorage.getItem(r.PLACE_KEY);
  } catch {
    e = null;
  }
  if (e !== a) {
    a = e;
    try {
      t = e ? JSON.parse(e) : null;
    } catch {
      t = null;
    }
  }
  return t;
}
function i(e) {
  return (
    window.addEventListener("gto:place", e),
    window.addEventListener("storage", e),
    () => {
      (window.removeEventListener("gto:place", e), window.removeEventListener("storage", e));
    }
  );
}
export const useMinuteNow = function () {
  let e = (0, n.useSyncExternalStore)(
    (e) => {
      let a = setInterval(e, 6e4);
      return () => clearInterval(a);
    },
    () => 6e4 * Math.floor(Date.now() / 6e4),
    () => 0,
  );
  return e ? new Date(e) : null;
};
export const useMounted = function () {
  return (0, n.useSyncExternalStore)(
    () => () => {},
    () => true,
    () => false,
  );
};
export const usePlace = function () {
  return (0, n.useSyncExternalStore)(i, s, () => null);
};
