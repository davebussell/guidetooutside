/** "Checked against these sources · last reviewed October 2026" at the foot of a crop page. */
export function SourcesBox({
  sources,
  note,
  reviewed = "2026-10-02",
  reviewedLabel = "October 2026",
}: {
  sources: { label: string; url: string }[];
  note?: string;
  reviewed?: string;
  reviewedLabel?: string;
}) {
  return (
    <section className="rounded-tile border border-line bg-paper-2/60 p-5 text-sm text-ink-2">
      <p className="font-semibold text-ink">
        Checked against these sources · <time dateTime={reviewed}>last reviewed {reviewedLabel}</time>
      </p>
      <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
        {sources.map((s) => (
          <li key={s.url} className="min-w-0">
            <a href={s.url} target="_blank" rel="noopener nofollow" className="break-words underline decoration-line underline-offset-2 hover:text-ink">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      {note && <p className="mt-3 text-xs text-ink-2">{note}</p>}
    </section>
  );
}
