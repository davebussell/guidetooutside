import type { Metadata } from "next";
import { Fragment } from "react";
import { REGS_AFRICA, REGS_CA, REGS_EUROPE, REGS_US, type CountryRegs, type RegsEntry } from "@/lib/regs";
import { continentServed } from "@/lib/scope";
import { YourRegsCard } from "@/components/here/LocalBits";
import { FoodPanel } from "@/components/conservation/FoodPanel";

const TITLE = "Fishing regulations directory — Canada and the United States";
const DESCRIPTION = "Official fishing regulation and licensing sources for every Canadian province and territory and every US state.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/fishing/regulations" },
};

/** The country tables of a parked continent are not listed (src/lib/scope.ts); they come back when it is served again. */
const COUNTRY_TABLES = continentServed("europe") || continentServed("africa");
const GROUPS: [string, (RegsEntry | CountryRegs)[]][] = [
  ["Canada", REGS_CA],
  ["United States", REGS_US],
  ...(continentServed("europe") ? ([["Europe", REGS_EUROPE]] as [string, CountryRegs[]][]) : []),
  ...(continentServed("africa") ? ([["Africa", REGS_AFRICA]] as [string, CountryRegs[]][]) : []),
];

function RegsList({ items }: { items: (RegsEntry | CountryRegs)[] }) {
  return (
    <ul className="divide-y divide-line/70 card px-5">
      {items.map((r) => (
        <li key={r.code} className="py-3 flex items-baseline gap-4">
          <span className="w-10 shrink-0 font-mono text-sm text-ink-2">{r.code}</span>
          <div className="min-w-0">
            {"country" in r && r.country ? <p className="text-sm font-semibold text-ink">{r.country}</p> : undefined}
            <a href={r.url} target="_blank" rel="noopener" className="font-medium hover:text-azure break-words">
              {r.agency} <span className="text-ink-2 font-normal">↗</span>
            </a>
            {r.note ? <p className="mt-0.5 text-sm text-ink-2">{r.note}</p> : undefined}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function RegulationsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
      <p className="eyebrow text-azure">Fishing</p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">Regulations directory</h1>
      <p className="mt-4 text-lg text-ink-2">
        The official source for licences, seasons, size and bag limits in every Canadian province and territory and every US state. Rules change
        yearly and often by individual water; check them before fishing.
      </p>
      <div className="mt-6">
        <YourRegsCard />
      </div>
      {GROUPS.map(([name, items]) => (
        <Fragment key={name}>
          <h2 className="font-display mt-10 text-2xl font-semibold">{name}</h2>
          <div className="mt-3">
            <RegsList items={items} />
          </div>
        </Fragment>
      ))}
      {COUNTRY_TABLES && (
        <p className="mt-3 text-sm text-ink-2">
          Countries without a reliable official page online are omitted. For those, ask at the park office, the district fisheries office or the lodge.
        </p>
      )}
      <p className="mt-6 text-xs text-ink-2">
        Tidal and ocean fisheries in Canada are federally managed by Fisheries and Oceans Canada; many US coastal states split freshwater and saltwater
        licences. Report broken or outdated links to hello@guidetooutside.com.
      </p>
      {/* The seafood guide for the reader's country, and local food. */}
      <FoodPanel place={null} section="fishing" nearby className="mt-14" />
    </div>
  );
}
