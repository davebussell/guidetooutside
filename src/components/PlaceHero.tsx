// RECOVERED 2026-10-08 (full file as of 2026-10-07, with the tropical-season edit applied).
import Image from "next/image";
import Link from "next/link";
import type { LocalData } from "@/lib/types";
import { regionOf as classifyEcoregion } from "@/lib/region";
import { heroFor } from "@/lib/hero-images";
import { placeProfile } from "@/lib/place-profile";

/**
 * The opening of every place page: the landscape, the name, and the two
 * sentences that say what kind of place it is. Full width, photograph first,
 * the way a field guide or a magazine opens on a place.
 */
export function PlaceHero({
  data,
  title,
  eyebrow,
  standfirst,
  titleAs = "h1",
}: {
  data: LocalData;
  /** Defaults to the place name. */
  title?: string;
  eyebrow?: string;
  /** Defaults to the place profile. */
  standfirst?: string;
  titleAs?: "h1" | "p";
}) {
  const { place } = data;
  const eco = classifyEcoregion(place.lat, place.lon);
  const hero = heroFor(eco.slug);
  const profile = placeProfile(data);
  const Title = titleAs;
  const date = new Date(data.today + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  // Spring and autumn mean nothing at Lagos or Nairobi; the rains are the seasons there.
  const r = data.regime;
  const season =
    Math.abs(place.lat) < 23.5 && r
      ? r.wetMonths.includes(data.month)
        ? "Rainy season"
        : r.dryMonths.includes(data.month)
          ? "Dry season"
          : "Between the rains"
      : data.season === "Fall"
        ? "Autumn"
        : data.season;

  return (
    <section className="relative left-1/2 -mt-8 w-screen -translate-x-1/2 overflow-hidden bg-night text-on-night sm:-mt-12">
      {hero && (
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${hero.wide ? "" : "scale-110 blur-[1px]"}`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/60 via-55% to-night/25 sm:from-night/80 sm:via-night/40 sm:via-50% sm:to-night/0" />
      <div className="relative mx-auto max-w-6xl px-4 pb-9 pt-36 [text-shadow:0_1px_14px_rgb(29_42_38/0.55),0_0_2px_rgb(29_42_38/0.3)] sm:px-6 sm:pb-12 sm:pt-56">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-on-night">
          {eyebrow ?? (
            <>
              <Link href={`/regions/${eco.slug}`} className="transition hover:text-on-night">
                {eco.name}
              </Link>{" "}
              · {season} · {date}
            </>
          )}
        </p>
        <Title className="gto-hero-title font-display mt-3 max-w-4xl text-[2.6rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          {title ?? (
            <>
              {place.name}
              {/* A city that is its own region (Nairobi, Lagos, Lisbon, Oslo) is not "Nairobi · Nairobi, Kenya". */}
              <span className="block text-2xl font-normal text-on-night/80 sm:text-3xl">
                {[place.admin1 && place.admin1 !== place.name ? place.admin1 : null, place.country].filter(Boolean).join(", ")}
              </span>
            </>
          )}
        </Title>
        <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-on-night sm:text-xl">{standfirst ?? `${profile.setting} ${profile.turnsOn}`}</p>
        {profile.facts.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-on-night/30 pt-4 text-sm text-on-night/85">
            {profile.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}
      </div>
      {hero && (
        <p className="absolute bottom-1.5 right-3 max-w-[60%] truncate font-display text-xs italic text-on-night/70">
          Photograph:{" "}
          <a href={hero.source} target="_blank" rel="noopener nofollow" className="transition hover:text-on-night">
            {hero.author}
          </a>{" "}
          ·{" "}
          <a href={hero.licenseUrl} target="_blank" rel="noopener nofollow" className="transition hover:text-on-night">
            {hero.license}
          </a>
        </p>
      )}
    </section>
  );
}
