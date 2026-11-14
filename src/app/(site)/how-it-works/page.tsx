import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How Guide to Outside turns a postal code into a local, seasonal guide: geocoding, ten years of climate data, this week's forecast, the moon, nearby waters, your ecological region, and an AI field note.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
      <p className="eyebrow text-moss">How it works</p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">From local data to a weekly guide</h1>
      <ol className="mt-10 space-y-8">
        <li className="flex gap-5">
          <span className="shrink-0 w-10 h-10 rounded-full bg-moss text-paper font-display text-lg font-semibold flex items-center justify-center">1</span>
          <div>
            <h2 className="font-display text-2xl font-semibold">Location</h2>
            <p className="mt-2 text-ink-2 leading-relaxed">A town or postal code (a ZIP code in the US), or coordinates shared by the browser through the location button. No personal information is stored with them.</p>
          </div>
        </li>
        <li className="flex gap-5">
          <span className="shrink-0 w-10 h-10 rounded-full bg-moss text-paper font-display text-lg font-semibold flex items-center justify-center">2</span>
          <div>
            <h2 className="font-display text-2xl font-semibold">Classification</h2>
            <p className="mt-2 text-ink-2 leading-relaxed">The location is geocoded; its hardiness zone and average frost dates are estimated from ten years of daily climate reanalysis; and its ecological region is identified, for example boreal forest, prairie, desert or Pacific coast.</p>
          </div>
        </li>
        <li className="flex gap-5">
          <span className="shrink-0 w-10 h-10 rounded-full bg-moss text-paper font-display text-lg font-semibold flex items-center justify-center">3</span>
          <div>
            <h2 className="font-display text-2xl font-semibold">{"This week's data"}</h2>
            <p className="mt-2 text-ink-2 leading-relaxed">{"The week's forecast, today's soil temperature at seed depth, sunrise and sunset, the moon's phase and the solunar rating (a tradition), named lakes and rivers within 20 km, and the relevant fishing regulator."}</p>
          </div>
        </li>
        <li className="flex gap-5">
          <span className="shrink-0 w-10 h-10 rounded-full bg-moss text-paper font-display text-lg font-semibold flex items-center justify-center">4</span>
          <div>
            <h2 className="font-display text-2xl font-semibold">The written guide</h2>
            <p className="mt-2 text-ink-2 leading-relaxed">An AI model writes a practical guide to gardening, fishing and foraging for the week from that data: specific species, varieties, methods and safety notes. It is refreshed weekly and cached, so later visitors from the same area receive it immediately.</p>
          </div>
        </li>
      </ol>
      <h2 className="font-display mt-14 text-2xl font-semibold">Accuracy and limits</h2>
      <div className="mt-3 space-y-3 text-ink-2 leading-relaxed">
        <p>The zone and frost dates are estimates from a climate grid roughly 10–25 km across. They usually land within half a zone and a week or two of official station values, but a lakeshore, a valley bottom or a city rooftop can differ. Treat them as a starting point and adjust from local observation.</p>
        <p>The written guide draws on general regional knowledge; it is good at “what and when” and deliberately vague about anything regulated. Fishing seasons and limits always come from the linked regulator. Foraging identifications must always be confirmed against a regional field guide or by an experienced forager.</p>
        <p>
          {"Data sources: "}
          <a className="underline" href="https://open-meteo.com" target="_blank" rel="noopener">Open-Meteo</a>
          {" (forecast, soil, ERA5 climate), "}
          <a className="underline" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>
          {" (places and water bodies), and the USDA hardiness scale: the official USDA 2023 and Natural Resources Canada maps. Ecological regions follow the CEC/EPA Level I–II framework, simplified."}
        </p>
      </div>
      <p className="mt-10">
        <Link className="rounded-full bg-moss text-paper px-5 py-2.5 font-semibold hover:bg-moss-2" href="/#search">Find my area</Link>
      </p>
    </article>
  );
}
