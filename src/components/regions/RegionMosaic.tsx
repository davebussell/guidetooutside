/**
 * A region's three photographs: its landscape plant large on the left, a fish
 * and a wild edible stacked on the right, each captioned. Unlinked on the
 * /regions cards (the whole card is a link); on the region page the fish and
 * the edible link to their own pages and the photographs are credited below.
 */
import Image from "next/image";
import Link from "next/link";
import { REGION_TILES, type RegionTile } from "@/data/region-extras";
import { landscapeImage } from "@/lib/region-images";
import { creatureImage } from "@/lib/creature-images";
import { speciesImage } from "@/lib/species-images";
import { getCreature } from "@/lib/nature";
import { getSpecies } from "@/lib/species";

type Photo = { src: string; alt: string; author: string; license: string; licenseUrl: string; source: string };

function photoOf(t: RegionTile): Photo | null {
  if (t.kind === "landscape") {
    const img = landscapeImage(t.slug);
    return img && { ...img, alt: `${img.name} (${img.taxon})` };
  }
  if (t.kind === "fish") {
    const img = creatureImage(t.slug);
    const c = getCreature(t.slug);
    return img && { ...img, alt: c ? `${c.name} (${c.latin})` : t.label };
  }
  const img = speciesImage(t.slug);
  const s = getSpecies(t.slug);
  return img && { ...img, alt: s ? `${s.name} (${s.latin})` : t.label };
}

const hrefOf = (t: RegionTile) => (t.kind === "fish" ? `/wildlife/${t.slug}` : t.kind === "species" ? `/foraging/${t.slug}` : null);

function Tile({ tile, sizes, priority, linked, className = "" }: { tile: RegionTile; sizes: string; priority?: boolean; linked?: boolean; className?: string }) {
  const photo = photoOf(tile);
  const href = linked ? hrefOf(tile) : null;
  const inner = (
    <>
      {photo && <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" priority={priority} />}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 pt-7 pb-1.5">
        <span className="block text-[11px] font-medium text-white/95 leading-[1.15] line-clamp-2">{tile.label}</span>
      </span>
    </>
  );
  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`}>
      {href ? (
        <Link href={href} className="absolute inset-0 group">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </div>
  );
}

export function RegionMosaic({
  slug,
  aspect,
  sizes,
  priority,
  linked,
  className = "",
}: {
  slug: string;
  /** "aspect-[16/8]" on the cards, "aspect-[16/9]" on the region page. */
  aspect: string;
  /** The large tile's sizes. */
  sizes: string;
  priority?: boolean;
  linked?: boolean;
  className?: string;
}) {
  const [big, ...small] = REGION_TILES[slug] ?? [];
  if (!big) return null;
  return (
    <div className={`grid grid-cols-3 gap-0.5 ${aspect} ${className}`}>
      <Tile tile={big} sizes={sizes} priority={priority} className="col-span-2 row-span-2" />
      <div className="row-span-2 grid grid-rows-2 gap-0.5">
        {small.map((t) => (
          <Tile key={t.slug} tile={t} sizes="200px" linked={linked} />
        ))}
      </div>
    </div>
  );
}

/** "Photos: Quinn (CC BY 4.0) · … on iNaturalist." under the region page's mosaic. */
export function RegionPhotoCredits({ slug }: { slug: string }) {
  const photos = (REGION_TILES[slug] ?? []).map(photoOf).filter((p): p is Photo => !!p);
  if (!photos.length) return null;
  return (
    <p className="font-display text-xs italic text-ink-2 mt-2">
      Photos:{" "}
      {photos.map((p, i) => (
        <span key={p.src}>
          {i > 0 && " · "}
          <a href={p.source} target="_blank" rel="noopener nofollow" className="underline">
            {p.author}
          </a>{" "}
          (
          <a href={p.licenseUrl} target="_blank" rel="noopener nofollow" className="underline">
            {p.license.replace(/ \(.*\)$/, "")}
          </a>
          )
        </span>
      ))}{" "}
      on iNaturalist.
    </p>
  );
}
