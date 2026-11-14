"use client";
// Restored from client module 92218 (exports: FilmRow, SpeciesVideos, VideoCard)
import * as t from "react/jsx-runtime";
import * as s from "react";
let a = {
  fish: {
    eyebrow: "Video",
    heading: (e) => `Fishing for ${e}`,
    note: "Videos from guides, fishing programmes and fisheries agencies: habitat, seasons and methods. Check the regulations for the water before fishing.",
  },
  garden: {
    eyebrow: "Video",
    heading: (e) => `${e}: identification and role`,
    note: "Videos from university extension services, museums and naturalists: identification, role in the garden, and control where needed.",
  },
  forage: {
    eyebrow: "Video · identification",
    heading: (e) => `Identifying ${e}`,
    note: "Videos selected for careful identification and the look-alikes to rule out. A video, like a photograph, is not an identification: confirm it in person with an experienced forager before anyone eats it.",
  },
};
function CR_({ v: e, tag: a }) {
  let [n, o] = (0, s.useState)(false),
    i = e.date ? e.date.slice(0, 4) : null;
  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="relative aspect-video bg-ink/90">
        {n ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${e.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={e.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button type="button" onClick={() => o(true)} className="group absolute inset-0 block w-full" aria-label={`Play: ${e.title}`}>
            <img
              src={`https://i.ytimg.com/vi/${e.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-[900ms] ease-settle motion-safe:group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface/92 text-moss transition group-hover:bg-surface">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
            {e.minutes && (
              <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                {e.minutes < 1 ? "<1" : Math.round(e.minutes)}
                {" min"}
              </span>
            )}
          </button>
        )}
      </div>
      <div className="p-3.5">
        {a && <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-azure">{a}</p>}
        <p className="font-display text-[15px] font-semibold leading-snug">{e.title}</p>
        <p className="mt-0.5 text-xs text-ink-2">
          {e.channel}
          {i ? ` \xb7 ${i}` : ""}
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2">{e.why}</p>
      </div>
    </div>
  );
}
export const FilmRow = function ({ v: e, label: a, tag: r }) {
  let [n, o] = (0, s.useState)(false);
  return n ? (
    <div className="mt-2 overflow-hidden rounded-lg bg-ink/90">
      <div className="relative aspect-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${e.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={e.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  ) : (
    <button
      type="button"
      onClick={() => o(true)}
      className="group mt-2 flex w-full items-center gap-3 rounded-lg border border-line/70 bg-paper-2/50 p-1.5 pr-3 text-left transition hover:border-azure/40 hover:bg-azure/5"
      aria-label={`Play: ${e.title}`}
    >
      <span className="relative block aspect-video w-28 shrink-0 overflow-hidden rounded-md bg-ink/90 sm:w-32">
        <img
          src={`https://i.ytimg.com/vi/${e.id}/mqdefault.jpg`}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface/92 text-moss transition group-hover:bg-surface">
          <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
        {e.minutes ? (
          <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[10px] font-semibold text-white">
            {Math.round(e.minutes)}
            {" min"}
          </span>
        ) : null}
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-azure">{a}</span>
        <span className="mt-0.5 line-clamp-2 block text-[13px] font-medium leading-snug text-ink">{e.title}</span>
        <span className="mt-0.5 line-clamp-1 block break-all text-[11px] text-ink-2">
          {e.channel}
          {r ? ` \xb7 ${r}` : ""}
        </span>
      </span>
    </button>
  );
};
export const SpeciesVideos = function ({ kind: e, name: s, videos: n, heading: o }) {
  if (!n.length) return null;
  let i = a[e];
  return (
    <section className="mt-12" id="videos">
      <p className="eyebrow text-azure">{i.eyebrow}</p>
      <h2 className="font-display mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">{o ?? i.heading(s)}</h2>
      <p className="mt-1.5 max-w-3xl text-sm text-ink-2">{i.note}</p>
      <div className={`mt-5 grid gap-5 sm:grid-cols-2 ${n.length >= 3 ? "lg:grid-cols-3" : ""} ${n.length >= 4 ? "xl:grid-cols-4" : ""}`}>
        {n.map((e) => (
          <CR_ key={e.id} v={e} />
        ))}
      </div>
      <p className="mt-3 text-xs text-ink-2">
        Videos play from YouTube in its privacy-enhanced mode and load only when you press play. They are chosen by hand from their titles
        and makers; if one is wrong for this page, tell us.
      </p>
    </section>
  );
};
export { CR_ as VideoCard };
