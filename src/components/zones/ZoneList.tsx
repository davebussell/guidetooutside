/** A bulleted list under a small heading, as the zone pages' gardening, fishing and foraging panels show them. */
export function ZoneList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="eyebrow mb-1">{title}</h3>
      <ul className="space-y-1.5 text-sm text-ink-2">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
