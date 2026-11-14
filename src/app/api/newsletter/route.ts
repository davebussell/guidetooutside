import { NextResponse } from "next/server";
import { listSubscribers, saveSubscriber, toCsv } from "@/lib/newsletter-store";

/**
 * Newsletter capture. Every address is saved to the site's own subscriber list
 * (Netlify Blobs, store "newsletter") and then forwarded to whichever provider
 * is configured:
 *  - NEWSLETTER_WEBHOOK_URL  → any webhook (Zapier, Make, n8n, Beehiiv/ConvertKit inbound)
 *  - BUTTONDOWN_API_KEY      → Buttondown subscribers API
 * With neither set the address is still kept, so nothing is lost during setup.
 *
 * Export the list: GET /api/newsletter?export=csv with `x-warm-secret: $WARM_SECRET`.
 */
export async function POST(req: Request) {
  let body: { email?: string; source?: string; location?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }
  const email = (body.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid email" }, { status: 400 });
  }
  const payload = {
    email,
    source: body.source ?? "unknown",
    location: body.location ?? null,
    site: "guidetooutside.com",
    at: new Date().toISOString(),
  };

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  const buttondown = process.env.BUTTONDOWN_API_KEY;
  let forwarded: string | undefined;
  let forwardError: string | undefined;
  try {
    if (webhook) {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
      forwarded = "webhook";
    } else if (buttondown) {
      const r = await fetch("https://api.buttondown.com/v1/subscribers", {
        method: "POST",
        headers: { Authorization: `Token ${buttondown}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          email_address: email,
          tags: [payload.source, payload.location].filter(Boolean),
          metadata: { location: payload.location ?? "" },
        }),
        signal: AbortSignal.timeout(8000),
      });
      // 400 = already subscribed; treat as success for the visitor.
      if (!r.ok && r.status !== 400) throw new Error(`buttondown ${r.status}`);
      forwarded = "buttondown";
    }
  } catch (err) {
    forwardError = err instanceof Error ? err.message : String(err);
    console.error("[newsletter] forward failed", forwardError);
  }

  const kept = await saveSubscriber({ email, source: payload.source, location: payload.location }, forwarded ?? (forwardError ? `failed: ${forwardError}` : "list only")).catch((err) => {
    console.error("[newsletter] store failed", err);
    return false;
  });
  if (!kept && !forwarded) {
    console.log("[newsletter] neither stored nor forwarded:", payload);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = process.env.WARM_SECRET;
  if (!secret || req.headers.get("x-warm-secret") !== secret) return new NextResponse("Forbidden", { status: 403 });
  const rows = await listSubscribers();
  if (url.searchParams.get("export") === "csv") {
    return new NextResponse(toCsv(rows), { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": "attachment; filename=guidetooutside-subscribers.csv" } });
  }
  return NextResponse.json({ count: rows.length, subscribers: rows });
}
