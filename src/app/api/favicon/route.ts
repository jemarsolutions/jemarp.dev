import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json({ error: "domain required" }, { status: 400 });
  }

  try {
    // Fetch the site's HTML to find the real icon link tag
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`https://${domain}`, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    clearTimeout(timeout);

    const html = await res.text();

    // Look for <link rel="icon"> or <link rel="shortcut icon"> or apple-touch-icon
    const iconMatch = html.match(
      /<link[^>]+rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*href=["']([^"']+)["']/i
    ) || html.match(
      /<link[^>]+href=["']([^"']+)["'][^>]*rel=["'](?:icon|shortcut icon|apple-touch-icon)["']/i
    );

    if (iconMatch && iconMatch[1]) {
      let iconUrl = iconMatch[1];
      // Handle relative URLs
      if (iconUrl.startsWith("/")) {
        iconUrl = `https://${domain}${iconUrl}`;
      } else if (!iconUrl.startsWith("http")) {
        iconUrl = `https://${domain}/${iconUrl}`;
      }
      return NextResponse.json({ iconUrl });
    }

    // Fallback to standard favicon.ico
    return NextResponse.json({ iconUrl: `https://${domain}/favicon.ico` });
  } catch {
    // If fetch fails, return google fallback
    return NextResponse.json({
      iconUrl: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
    });
  }
}
