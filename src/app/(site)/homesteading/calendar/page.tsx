import type { Metadata } from "next";
import Link from "next/link";
import { shareCard } from "@/lib/site";
import { SIGNAL_FAMILIES, TASKS } from "@/data/homestead/calendar";
import { SOURCES } from "@/data/homestead/sources";
import { getTopic } from "@/data/homestead/topics";
import { SignalTable } from "@/components/homestead/SignalTable";
import { HomesteadLocal } from "@/components/homestead/HomesteadLocal";

const title = "The homestead year — tasks by climate signal";
const description =
  "A homestead calendar keyed to what the climate does, not to dates: day length for hens and goats, frost dates for covers and curing, freezing nights for water and rain barrels, bee weather, the heating season and the rains.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/homesteading/calendar" },
  ...shareCard(title, description, "/homesteading/calendar"),
};

export default function HomesteadCalendarPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <p className="eyebrow text-moss">
        <Link href="/homesteading" className="hover:text-ink">
          Homesteading
        </Link>{" "}
        · Calendar
      </p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">The homestead year</h1>
      <p className="mt-4 text-lg text-ink-2 max-w-3xl">
        Every task in the homestead guide, by the climate signal that brings it due rather than by date, so it reads the same in Fairbanks and in Miami. The local guide works out when each signal comes to a
        given town and lists what is due this month.
      </p>
      <div className="mt-6 max-w-2xl">
        <HomesteadLocal note="This month's homestead tasks, worked out for your town." anchor="month" />
      </div>

      <section className="mt-12">
        <p className="eyebrow text-moss">Six towns</p>
        <h2 className="font-display mt-1 text-3xl font-semibold">The same signals, different dates</h2>
        <p className="mt-2 max-w-3xl text-ink-2">
          When each signal arrives in six of the guide&apos;s towns, worked out from their ten-year climate normals and latitude. Miami&apos;s day never reaches 14 hours and it has no heating season;
          Fairbanks has its average first frost in August; Phoenix&apos;s afternoons pass 30 °C in April.
        </p>
        <div className="mt-5 card p-4 sm:p-6">
          <SignalTable />
        </div>
      </section>

      {SIGNAL_FAMILIES.map((f) => {
        const tasks = TASKS.filter((t) => t.family === f.id);
        return (
          <section key={f.id} id={f.id} className="mt-16 scroll-mt-24">
            <p className="eyebrow text-moss">{f.eyebrow}</p>
            <h2 className="font-display mt-1 text-3xl font-semibold">{f.title}</h2>
            <p className="mt-2 max-w-3xl text-ink-2">{f.text}</p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.map((t) => {
                const topic = getTopic(t.topic);
                return (
                  <li key={t.id} className="card p-4 flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-2">{topic?.short ?? t.topic}</span>
                      <span className="text-[11px] text-ink-2">{t.when}</span>
                    </div>
                    <h3 className="font-display mt-1.5 text-lg font-semibold leading-tight">{t.title}</h3>
                    <p className="mt-2 text-sm text-ink-2 flex-1">{t.detail}</p>
                    <Link href={`/homesteading/${t.topic}`} className="mt-3 text-sm font-medium text-moss hover:underline">
                      {topic?.title ?? t.topic} →
                    </Link>
                    <p className="mt-2 text-[10px] text-ink-2">Sources: {t.sources.map((s) => SOURCES[s].publisher.replace(/ \(.*\)$/, "")).join("; ")}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <p className="mt-14 max-w-3xl text-xs text-ink-2">
        Signals are read from averages: single nights freeze earlier than the average night, frost comes earlier or later than its average date in any one year, and a dry year falls short of the average rainfall. Watch the
        weather as well as the calendar.
      </p>
    </div>
  );
}
