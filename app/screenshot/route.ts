import chromium from "@sparticuz/chromium-min";
import playwright from "playwright-core";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const hasURL = searchParams.has("url");
    const url = hasURL ? searchParams.get("url") : null;
    if (!url) throw new Error("URL to screenshot not set.");
    // thanks https://github.com/stefanjudis/tiny-helpers/blob/primary/api/screenshot.js
    const browser = await playwright.chromium.launch({
      args: [
        ...chromium.args,
        "--hide-scrollbars",
        "--disable-web-security",
        "--proxy-server='direct://'",
        "--proxy-bypass-list=*",
      ],
      executablePath: await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar"
      ),
      headless: true,
    });
    const page = await browser.newPage({
      viewport: {
        width: 1200,
        height: 630,
      },
    });
    await page.goto(url, {
      waitUntil: "load",
    });
    const data = await page.screenshot({
      type: "png",
    });
    await browser.close();
    return new Response(data, {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=31536000, stale-while-revalidate",
        "Content-Type": "image/png",
      },
    });
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
