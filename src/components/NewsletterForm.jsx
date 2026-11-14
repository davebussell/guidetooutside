"use client";
// Restored from client module 66639 (exports: NewsletterForm)
import * as t from "react/jsx-runtime";
import * as n from "react";
/** @param {{ source: string, location?: string }} props */
export const NewsletterForm = function ({ source: e, location: r }) {
  let [i, a] = (0, n.useState)(""),
    [l, o] = (0, n.useState)("idle");
  async function s(t) {
    (t.preventDefault(), o("busy"));
    try {
      let t = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: i,
          source: e,
          location: r,
        }),
      });
      o(t.ok ? "done" : "error");
    } catch {
      o("error");
    }
  }
  return "done" === l ? (
    <p className="text-sm font-medium" role="status">
      Subscribed. The first Field Note{r ? ` for ${r}` : ""}
      {" arrives on Sunday."}
    </p>
  ) : (
    <form onSubmit={s} className="flex gap-2 w-full min-w-0">
      <label className="sr-only" htmlFor={`nl-${e}`}>
        Email address
      </label>
      <input
        id={`nl-${e}`}
        type="email"
        required
        value={i}
        onChange={(e) => a(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 w-0 min-w-0 rounded-full border border-edge bg-surface px-4 py-2 text-sm text-ink placeholder:text-ink-2 caret-moss focus:outline-none focus:border-moss focus:ring-2 focus:ring-moss/25"
        style={{ color: "#24302a", backgroundColor: "#fbfaf6" }}
      />
      <button
        type="submit"
        disabled={"busy" === l}
        className="rounded-full bg-azure text-white px-4 py-2 text-sm font-medium hover:bg-azure-2 disabled:opacity-60 transition"
      >
        {"busy" === l ? "…" : "Subscribe"}
      </button>
      {"error" === l && <span className="text-xs font-medium self-center">Not sent. Try again.</span>}
    </form>
  );
};
