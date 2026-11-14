import type { Metadata } from "next";
import Link from "next/link";
import { ZoneMap } from "@/components/ZoneMap";
import { ZoneContext } from "@/components/zones/ZoneContext";

export const metadata: Metadata = {
  title: "Interactive hardiness zone map — Canada and the US",
  description:
    "Click anywhere on the map to see the plant hardiness zone (USDA 2023 and Natural Resources Canada), the ecological region, and jump to this week's local guide.",
};

export default function ZoneMapPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow text-moss">
            <Link href="/zones" className="hover:text-ink">
              Zones
            </Link>{" "}
            · Map
          </p>
          <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">Zone map</h1>
          <p className="mt-3 text-ink-2 max-w-2xl">
            Official hardiness zones for the United States (USDA, 2023) and Canada (Natural Resources Canada), on one map: these are the only two official zone maps there are.
            Select any point for its zone, ecological region and a link to this week&apos;s local guide. White dots mark places with pre-built guides.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <ZoneContext variant="map" />
      </div>
      <div className="mt-6">
        <ZoneMap initial={undefined} />
      </div>
      <p className="mt-4 text-xs text-ink-2 max-w-3xl">
        Zone polygons: USDA Agricultural Research Service / Oregon State University PRISM Climate Group (2023) and Natural Resources Canada (Open Government Licence – Canada),
        simplified for the web. Outside those polygons, and in every local guide, the zone is a separate estimate from ten years of ERA5 reanalysis (the average of each
        winter&apos;s coldest night, on the USDA rule) and can differ from an official map by a half-zone.
      </p>
    </div>
  );
}
