/**
 * Ad slot: renders a Google AdSense unit when NEXT_PUBLIC_ADSENSE_CLIENT is set,
 * a labelled placeholder in development, and nothing in production otherwise.
 */
export function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (client) {
    return (
      <div className={`my-6 ${className}`}>
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script dangerouslySetInnerHTML={{ __html: "(adsbygoogle=window.adsbygoogle||[]).push({});" }} />
      </div>
    );
  }
  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        className={`my-6 rounded-tile border border-dashed border-line text-center text-xs text-ink-2 py-6 ${className}`}
      >
        Ad slot “{slot}” — set NEXT_PUBLIC_ADSENSE_CLIENT to enable
      </div>
    );
  }
  return null;
}
