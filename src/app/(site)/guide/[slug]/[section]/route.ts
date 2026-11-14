/**
 * The old section URLs, /guide/<town>/<section>, from before each section had
 * its own page: moved for good to /<section>/<town>.
 */
import { NextResponse, type NextRequest } from "next/server";

const SECTIONS = new Set(["gardening", "fishing", "foraging", "ground"]);

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string; section: string }> }) {
  const { slug, section } = await params;
  const url = new URL(SECTIONS.has(section) ? `/${section}/${slug}` : `/guide/${slug}`, req.url);
  url.search = req.nextUrl.search;
  return NextResponse.redirect(url, 301);
}
