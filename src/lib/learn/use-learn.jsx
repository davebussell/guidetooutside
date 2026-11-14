"use client";
// Restored from client module 23752 (exports: countedFor, rungForAge, useLearn)
import * as t from "react";
let s = "gto:learn:v2",
  a = {
    v: 2,
    learners: [],
    journal: [],
    done: {},
  };
function r(e) {
  return e <= 3 ? "two" : e <= 5 ? "four" : "six";
}
let n = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
  i = a,
  o = false,
  l = new Set();
function d() {
  try {
    let e = localStorage.getItem(s);
    if (e) {
      let t = JSON.parse(e);
      if (t && Array.isArray(t.learners) && Array.isArray(t.journal))
        return {
          v: 2,
          learners: t.learners,
          journal: t.journal,
          done: t.done ?? {},
        };
    }
    let t = localStorage.getItem("gto:journal:v1");
    if (t) {
      let e = JSON.parse(t);
      if (Array.isArray(e))
        return {
          v: 2,
          learners: [],
          journal: e.map((e) => ({
            id: e.id ?? n(),
            date: e.date,
            what: e.what,
            count: e.count ?? null,
            learner: "all",
            where: e.where ?? "",
            note: e.note ?? "",
          })),
          done: {},
        };
    }
  } catch {}
  return a;
}
function h(e) {
  i = e;
  try {
    localStorage.setItem(s, JSON.stringify(e));
  } catch {}
  for (let e of l) e();
}
function c(e) {
  l.add(e);
  let t = (t) => {
    t.key === s && ((i = d()), e());
  };
  return (
    window.addEventListener("storage", t),
    () => {
      (l.delete(e), window.removeEventListener("storage", t));
    }
  );
}
function u() {
  return (o || ((i = d()), (o = true)), i);
}
let p = () => a;
export const countedFor = function (e, t) {
  return (t ? e.filter((e) => e.learner === t || "all" === e.learner) : e).map((e) => ({
    date: e.date,
    what: e.what,
    count: e.count,
    learner: e.learner,
  }));
};
export { r as rungForAge };
export const useLearn = function () {
  let e = (0, t.useSyncExternalStore)(c, u, p),
    s = (0, t.useCallback)((e, t, s = {}) => {
      let a = {
        id: s.id ?? n(),
        name: e.trim(),
        age: t,
        rung: r(t),
        skills: [],
        likes: s.likes ?? [],
        here: s.here ?? true,
      };
      return (
        h({
          ...i,
          learners: [...i.learners, a],
        }),
        a
      );
    }, []),
    a = (0, t.useCallback)((e, t) => {
      h({
        ...i,
        learners: i.learners.map((s) =>
          s.id === e
            ? {
                ...s,
                ...t,
              }
            : s,
        ),
      });
    }, []),
    o = (0, t.useCallback)((e) => {
      h({
        ...i,
        learners: i.learners.filter((t) => t.id !== e),
        journal: i.journal.map((t) =>
          t.learner === e
            ? {
                ...t,
                learner: "all",
              }
            : t,
        ),
      });
    }, []),
    l = (0, t.useCallback)((e, t) => {
      h({
        ...i,
        learners: i.learners.map((s) =>
          s.id === e
            ? {
                ...s,
                skills: s.skills.includes(t) ? s.skills.filter((e) => e !== t) : [...s.skills, t],
              }
            : s,
        ),
      });
    }, []),
    d = (0, t.useCallback)((e) => {
      h({
        ...i,
        journal: [
          {
            ...e,
            id: n(),
          },
          ...i.journal,
        ],
      });
    }, []),
    m = (0, t.useCallback)((e) => {
      h({
        ...i,
        journal: i.journal.filter((t) => t.id !== e),
      });
    }, []),
    f = (0, t.useCallback)(
      () =>
        h({
          ...i,
          journal: [],
        }),
      [],
    ),
    g = (0, t.useCallback)((e, t) => {
      let s = {
        ...i.done,
      };
      (s[e] && !t ? delete s[e] : (s[e] = t ?? new Date().toISOString().slice(0, 10)),
        h({
          ...i,
          done: s,
        }));
    }, []),
    w = (0, t.useCallback)((e) => h(e), []);
  return {
    ...e,
    addLearner: s,
    updateLearner: a,
    removeLearner: o,
    toggleSkill: l,
    addEntry: d,
    removeEntry: m,
    clearJournal: f,
    markDone: g,
    replaceAll: w,
  };
};
