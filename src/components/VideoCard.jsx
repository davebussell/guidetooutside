"use client";
// Restored from client module 44734 (exports: VideoCard)
import * as t from "react/jsx-runtime";
import * as s from "react";
export const VideoCard = function ({ video: e, compact: n = false }) {
  let [a, i] = (0, s.useState)(false),
    r = e.live ? "Live" : e.minutes ? `${e.minutes < 1 ? "<1" : Math.round(e.minutes)} min` : null;
  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="relative aspect-video bg-ink/90">
        {a ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${e.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={e.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button type="button" onClick={() => i(true)} className="group absolute inset-0 block w-full" aria-label={`Play: ${e.title}`}>
            <img
              src={`https://i.ytimg.com/vi/${e.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-[900ms] ease-settle motion-safe:group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface/92 text-moss transition group-hover:bg-surface">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
            {r && (
              <span
                className={`absolute bottom-2 right-2 rounded-md px-1.5 py-0.5 text-[11px] font-semibold text-white ${e.live ? "bg-rust" : "bg-black/70"}`}
              >
                {r}
              </span>
            )}
          </button>
        )}
      </div>
      <div className={n ? "p-3.5" : "p-4"}>
        <p className={`font-display font-semibold leading-snug ${n ? "text-[15px]" : "text-base"}`}>{e.title}</p>
        <p className="mt-0.5 text-xs text-ink-2">{e.channel}</p>
        {!n && <p className="mt-2 text-sm leading-relaxed text-ink-2">{e.note}</p>}
      </div>
    </div>
  );
};
