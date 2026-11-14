/** Photo credits in the three forms the site uses (hero caption, photo card, small card line). */
import type { HomesteadImage } from "@/lib/homestead/images";

const ext = { target: "_blank", rel: "noopener nofollow" } as const;

/** Under a large photograph: "Photo by Kai Löhr on iNaturalist · CC BY 4.0". */
export function PhotoBy({ image }: { image: HomesteadImage }) {
  return (
    <p className="px-4 py-3 font-display text-[13px] italic text-ink-2">
      Photo by{" "}
      <a href={image.source} {...ext} className="underline">
        {image.author}
      </a>{" "}
      on {image.via} ·{" "}
      <a href={image.licenseUrl} {...ext} className="underline">
        {image.license}
      </a>
    </p>
  );
}

/** Over the foot of a hero photograph, as on the section landings. */
export function HeroCaption({ image }: { image: HomesteadImage }) {
  return (
    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/75 to-transparent px-4 pb-2.5 pt-8 font-display text-xs italic leading-snug text-on-night/90">
      <span className="font-medium">{image.caption}.</span> Photo{" "}
      <a href={image.source} {...ext} className="underline">
        {image.author}
      </a>{" "}
      on {image.via} ·{" "}
      <a href={image.licenseUrl} {...ext} className="underline">
        {image.license}
      </a>
    </figcaption>
  );
}

/** The small line at the foot of a card. */
export function CardCredit({ image }: { image: HomesteadImage }) {
  return (
    <p className="mt-2 font-display text-xs italic text-ink-2">
      Photo:{" "}
      <a href={image.source} {...ext} className="underline">
        {image.author}
      </a>{" "}
      ·{" "}
      <a href={image.licenseUrl} {...ext} className="underline">
        {image.license}
      </a>
    </p>
  );
}
