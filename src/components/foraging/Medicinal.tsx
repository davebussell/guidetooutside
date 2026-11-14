/**
 * The medicinal-plant record as the foraging pages show it: the full
 * "Traditional medicinal use" panel on a species page (#medicinal), and the
 * card for each plant on /foraging/medicinal. Plant-first, evidence rated
 * studied / mixed / traditional-only, cautions always shown.
 */
import Image from "next/image";
import Link from "next/link";
import { EVIDENCE, MEDICINAL_USES, type Evidence, type MedicinalPlant } from "@/data/medicinal";
import type { Species } from "@/lib/species";
import { speciesImage } from "@/lib/species-images";

/** Badge colours by evidence rating. */
const BADGE: Record<Evidence, { fill: string; border: string }> = {
  studied: { fill: "bg-moss-soft text-moss", border: "border-moss/30" },
  mixed: { fill: "bg-gold-fill/25 text-ink-2", border: "border-gold-fill/40" },
  traditional: { fill: "bg-paper-2 text-ink-2", border: "border-line" },
};

const USE_LABEL = Object.fromEntries(MEDICINAL_USES.map((u) => [u.id, u.label]));

/** The line under every medicinal panel, and the warning box on /foraging/medicinal. */
export const MEDICAL_DISCLAIMER =
  "This is a record of traditional use, not medical advice, and nothing here is a treatment for any condition. Wild plants interact with prescription medicines and several are unsafe in pregnancy or with kidney, liver or heart conditions. Talk to a doctor or pharmacist before using any of them — especially if you take regular medication — and never delay real medical care.";

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-rust" />
      <span>{children}</span>
    </li>
  );
}

/** "Traditional medicinal use": what the plant has been used for, how, what has been tested, the cautions and its use categories. */
export function MedicinalPanel({ plant: m, name }: { plant: MedicinalPlant; name: string }) {
  const ev = EVIDENCE[m.evidence];
  return (
    <div id="medicinal" className="scroll-mt-24">
      <section className="mt-12 card p-6 sm:p-8 border-l-4 border-l-moss">
        <div className="flex flex-wrap items-center gap-2">
          <p className="eyebrow text-moss">Traditional medicinal use</p>
          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${BADGE[m.evidence].fill} ${BADGE[m.evidence].border}`}>{ev.label}</span>
        </div>
        <h2 className="font-display mt-1 text-2xl font-semibold">
          {"What "}
          {name}
          {" has been used for"}
        </h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="grid gap-5 content-start">
            <div>
              <p className="eyebrow">Traditional use</p>
              <p className="mt-1 text-ink-2">{m.use}</p>
            </div>
            <div>
              <p className="eyebrow">Part used, and how</p>
              <p className="mt-1 text-ink-2">{m.part}</p>
            </div>
            <div>
              <p className="eyebrow">Evidence</p>
              <p className="mt-1 text-ink-2">{m.evidenceNote}</p>
              <p className="mt-1 text-sm text-ink-2">{ev.note}</p>
            </div>
          </div>
          <div className="rounded-tile bg-rust-soft p-5">
            <p className="eyebrow text-rust">Cautions</p>
            <ul className="mt-2 space-y-2 text-sm text-ink-2">
              {m.cautions.map((c) => (
                <Bullet key={c}>{c}</Bullet>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {m.uses.map((u) => (
            <Link
              key={u}
              href={`/foraging/medicinal#${u}`}
              className="rounded-full bg-surface border border-edge px-3 py-1 text-xs hover:border-moss hover:text-moss transition"
            >
              {USE_LABEL[u]}
            </Link>
          ))}
        </div>
      </section>
      <p className="mt-3 text-xs text-ink-2 max-w-3xl">{MEDICAL_DISCLAIMER}</p>
    </div>
  );
}

/** A plant's card on /foraging/medicinal: photograph, evidence, the traditional use and its first caution. */
export function MedicinalCard({ plant: m, species: s }: { plant: MedicinalPlant; species: Species }) {
  const href = `/foraging/${s.slug}#medicinal`;
  const photo = speciesImage(s.slug);
  return (
    <li className="card overflow-hidden flex flex-col">
      <Link href={href} className="group block">
        <div className="relative aspect-[16/9] bg-paper-2 overflow-hidden">
          {photo && (
            <Image
              src={photo.src}
              alt={`${s.name} (${s.latin})`}
              fill
              sizes="(max-width: 640px) 100vw, 380px"
              className="object-cover motion-safe:group-hover:scale-[1.03] transition duration-[900ms] ease-settle"
            />
          )}
          {s.deadlyDouble && (
            <span className="absolute top-2 right-2 rounded-full bg-rust text-white text-[11px] font-semibold px-2.5 py-1">
              Has a dangerous look-alike
            </span>
          )}
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${BADGE[m.evidence].fill}`}>{EVIDENCE[m.evidence].label}</span>
        </div>
        <h3 className="font-display mt-1.5 text-lg font-semibold leading-tight">
          <Link href={href} className="hover:text-moss">
            {s.name}
          </Link>
        </h3>
        <p className="text-xs italic text-ink-2">{s.latin}</p>
        <p className="mt-2 text-sm text-ink-2 flex-1">{m.use}</p>
        <p className="mt-3 text-xs text-rust">
          <span className="font-semibold">Caution:</span> {m.cautions[0]}
        </p>
        <Link href={href} className="mt-3 text-sm font-medium text-moss hover:underline">
          Full entry and all cautions →
        </Link>
      </div>
    </li>
  );
}

export { Bullet as CautionBullet };
