import chromium from "@sparticuz/chromium-min";
import playwright from "playwright-core";
import { NextRequest, NextResponse } from "next/server";

// https://gist.github.com/kettanaito/56861aff96e6debc575d522dd03e5725#step-1-install-dependencies
//

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const hasURL = searchParams.has("url");
    const url = hasURL ? searchParams.get("url") : null;
    if (!url) throw new Error("URL to screenshot not set.");
    const browser = await playwright.chromium.launch({
      args: chromium.args,
      headless: true,
    });
    const page = await browser.newPage({
      viewport: {
        width: 1200,
        height: 630,
      },
    });
    await page.goto(url, {
      timeout: 15 * 1000,
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
