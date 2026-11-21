"use client";
// Restored from client module 15348 (exports: LandSkyEyebrow, LandSkyNav)
import * as s from "@/lib/hooks";
import * as n from "@/components/learn/family";
export const LandSkyEyebrow = function ({ children: e }) {
  return (
    <p className="eyebrow text-moss">
      {"The land and the sky · "}
      {e}
    </p>
  );
};
// The ground tile's note says "to the bedrock" only where the maps name a rock under the town (`rockNamed`, from
// src/lib/ground-layers `digStopsAtCover`, false where the dig stops in the cover). Audit of 11 November 2026: Houston,
// New Orleans, Memphis and Brownsville stand on hundreds to thousands of metres of loose sediment and their dig names no
// rock, but the tile promised a dig down to the bedrock. With no ground data (most pages) the note names no rock.
export const LandSkyNav = function ({ current: e, rockNamed = false }) {
  let a,
    i = (0, s.usePlace)(),
    r = [
      {
        id: "ground",
        art: "mud",
        title: "The ground under you",
        note: rockNamed ? "Dig down to the bedrock" : "Dig down through the layers",
        href: i ? `/ground/${i.slug}/dig` : "/ground/rocks",
      },
      {
        id: "rocks",
        art: "stone",
        title: "Kinds of rock",
        note: "Make magma, squash mud",
        href: "/ground/rocks",
      },
      {
        id: "regions",
        art: "leaf",
        title: "Living regions",
        note: "Warmth and rain decide",
        href: "/regions",
      },
      {
        id: "day",
        art: "sun",
        title: "The day, hour by hour",
        note: "Spin the Earth",
        href: ((a = "/the-day"), i ? `${a}/${i.slug}` : a),
      },
      {
        id: "books",
        art: "book",
        title: "Books and videos",
        note: i ? "About where you live" : "Set your place first",
        href: i ? `/resources/${i.slug}` : "/guide?section=resources",
      },
    ];
  return (
    <nav aria-label="The land and the sky" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {r.map((s) => (
        <n.Tile key={s.id} art={s.art} title={s.title} note={s.note} href={s.href} on={s.id === e} size="sm" />
      ))}
    </nav>
  );
};
