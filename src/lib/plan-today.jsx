"use client";
// Restored from client module 8002 (exports: EMPTY_DAY, TODAY_EVENT, TODAY_KEY, addToToday, isoToday, readToday, removeFromToday)
let e = "gto:today:v1",
  r = "gto:today",
  n = {
    date: "",
    picks: [],
    skip: [],
    done: [],
    extra: [],
  },
  a = () => {
    let t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  };
function o() {
  try {
    let t = localStorage.getItem(e);
    return t ? JSON.parse(t) : {};
  } catch {
    return {};
  }
}
function i() {
  let t = a(),
    e = o().day;
  return e?.date === t
    ? {
        ...n,
        ...e,
        picks: e.picks ?? [],
        skip: e.skip ?? [],
        done: e.done ?? [],
        extra: e.extra ?? [],
      }
    : {
        ...n,
        date: t,
      };
}
function s(t) {
  try {
    let r = o();
    localStorage.setItem(
      e,
      JSON.stringify({
        ...r,
        day: t,
      }),
    );
  } catch {}
  window.dispatchEvent(new CustomEvent(r));
}
export { n as EMPTY_DAY };
export { r as TODAY_EVENT };
export { e as TODAY_KEY };
export const addToToday = function (t) {
  let e = i();
  if (e.extra.includes(t) || e.picks.includes(t))
    return {
      day: e,
      added: false,
    };
  let r = {
    ...e,
    extra: [...e.extra, t],
    skip: e.skip.filter((e) => e !== t),
  };
  return (
    s(r),
    {
      day: r,
      added: true,
    }
  );
};
export { a as isoToday };
export { i as readToday };
export const removeFromToday = function (t) {
  let e = i(),
    r = {
      ...e,
      extra: e.extra.filter((e) => e !== t),
    };
  return (s(r), r);
};
