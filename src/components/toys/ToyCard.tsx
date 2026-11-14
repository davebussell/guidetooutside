/**
 * The card a toy sits in on the reference pages: either "Try it" with a
 * little picture (the rock pages' Volcano, Layers, Squeeze and RockTester) or
 * "Interactive" with none (the regions' BiomeDial), the toy's title, a line on
 * how to use it, then the toy itself.
 */
import { ActivityArt } from "@/components/learn/ActivityArt";

type Props = {
  id?: string;
  /** An ActivityArt picture; with one the eyebrow reads "Try it", without one "Interactive". */
  art?: string;
  title: string;
  intro: string;
  children: React.ReactNode;
};

export function ToyCard({ id, art, title, intro, children }: Props) {
  return (
    <section id={id} className="card scroll-mt-24 p-4 sm:p-6">
      {art ? (
        <div className="flex items-center gap-3">
          <ActivityArt art={art} className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
          <div className="min-w-0">
            <p className="eyebrow text-moss">Try it</p>
            <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{title}</h2>
          </div>
        </div>
      ) : (
        <>
          <p className="eyebrow">Interactive</p>
          <h2 className="font-display mt-1 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{title}</h2>
        </>
      )}
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">{intro}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}
