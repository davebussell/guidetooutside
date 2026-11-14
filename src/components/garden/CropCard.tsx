import Image from "next/image";
import Link from "next/link";
import { GROUP_LABEL, HARDINESS, METHODS, type Crop, type Recipe } from "@/lib/crops";
import { cropImage, cropImageWhere, type CropImage } from "@/lib/crop-images";
import { monthSpans } from "@/lib/regime";

export function CropCredit({ img, className = "" }: { img: CropImage; className?: string }) {
  return (
    <p className={`font-display text-xs italic leading-snug text-ink-2 ${className}`}>
      Photo{" "}
      <a href={img.source} target="_blank" rel="noopener nofollow" className="underline">
        {img.author}
      </a>{" "}
      {cropImageWhere(img)} ·{" "}
      <a href={img.licenseUrl} target="_blank" rel="noopener nofollow" className="underline">
        {img.license}
      </a>
    </p>
  );
}

/** A photograph card for one crop: what it is, how it takes a frost, when it is picked. */
export function CropCard({
  crop,
  note,
  priority = false,
  local,
  why,
}: {
  crop: Crop;
  note?: string;
  priority?: boolean;
  /** For a place where frost does not set the year: its own harvest months, and a badge for how the crop is started rather than how it takes a frost. */
  local?: { harvest: number[]; badge: string };
  /** The calendar's reasons for this crop here (CropFit.why), shown on hover and to screen readers. */
  why?: string[];
}) {
  const img = cropImage(crop.slug);
  const h = HARDINESS[crop.hardiness];
  const months = local ? local.harvest : crop.harvestMonths;
  const season = local
    ? months.length === 12
      ? "year-round"
      : monthSpans(months)
    : months.length
      ? `${monthSpans(months)} (typical, zones 4–6)`
      : "";
  return (
    <li className="card flex flex-col overflow-hidden" title={why?.length ? why.join(" ") : undefined}>
      {why && why.length > 0 && <span className="sr-only">{why.join(" ")}</span>}
      <Link href={`/gardening/crops/${crop.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
          {img ? (
            <Image
              src={img.src}
              alt={crop.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
              className="object-cover transition duration-[900ms] ease-settle motion-safe:group-hover:scale-[1.03]"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-ink-2">No photograph yet</div>
          )}
          <span className="absolute right-2 top-2 rounded-sm bg-surface px-2 py-0.5 text-[11px] font-semibold text-ink-2">{local ? local.badge : h.label}</span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-2">{GROUP_LABEL[crop.group]}</span>
          {season && <span className="text-[11px] text-ink-2">Harvest {season}</span>}
        </div>
        <h3 className="font-display mt-1.5 text-lg font-semibold leading-tight">
          <Link href={`/gardening/crops/${crop.slug}`} className="hover:text-moss">
            {crop.name}
          </Link>
        </h3>
        <p className="mt-1.5 flex-1 text-sm text-ink-2">{note ?? crop.tagline}</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-ink-2">
            {crop.preserve
              .slice(0, 3)
              .map((m) => METHODS[m].name.replace(" canning", ""))
              .join(" · ") || "Eaten fresh"}
          </span>
          <Link href={`/gardening/crops/${crop.slug}`} className="text-sm font-medium text-moss hover:underline">
            Harvest and storage →
          </Link>
        </div>
      </div>
    </li>
  );
}

export function CropGrid({
  crops,
  notes,
  limit,
  local,
  whys,
}: {
  crops: Crop[];
  notes?: Record<string, string>;
  limit?: number;
  local?: Record<string, { harvest: number[]; badge: string }>;
  /** Per crop slug, the calendar's reasons (CropFit.why). */
  whys?: Record<string, string[]>;
}) {
  const list = limit ? crops.slice(0, limit) : crops;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((c, i) => (
        <CropCard key={c.slug} crop={c} note={notes?.[c.slug]} priority={i < 3} local={local?.[c.slug]} why={whys?.[c.slug]} />
      ))}
    </ul>
  );
}

/** A compact card for a putting-up recipe. `brief` (a town page) leaves out the tagline, which the recipe's own page carries. */
export function RecipeCard({ recipe, cropName, brief = false }: { recipe: Recipe; cropName?: string; brief?: boolean }) {
  const m = METHODS[recipe.method];
  return (
    <li className="card flex flex-col p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-2">{m.name}</span>
        {cropName && <span className="text-[11px] text-ink-2">{cropName}</span>}
      </div>
      <h3 className="font-display mt-1.5 text-lg font-semibold leading-tight">
        <Link href={`/gardening/recipes/${recipe.slug}`} className="hover:text-moss">
          {recipe.title}
        </Link>
      </h3>
      {!brief && <p className="mt-1.5 flex-1 text-sm text-ink-2">{recipe.tagline}</p>}
      <p className={`${brief ? "mt-1.5 flex-1" : "mt-3"} text-xs text-ink-2`}>
        {recipe.makes} · {recipe.active} active
      </p>
      <Link href={`/gardening/recipes/${recipe.slug}`} className="mt-2 text-sm font-medium text-moss hover:underline">
        Recipe →
      </Link>
    </li>
  );
}
