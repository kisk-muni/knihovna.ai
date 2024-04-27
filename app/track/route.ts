import { z } from "zod";
import { cookies } from "next/headers";
import { db } from "@/db";
import { Event, events } from "@/db/schema";
import { type NextRequest, userAgent } from "next/server";

function calculateScreenSize(w: number) {
  if (w < 576) return "mobile";
  else if (w < 992) return "tablet";
  else if (w < 1440) return "laptop";
  return "desktop";
}

const EventHandlerInputSchema = z.object({
  v: z.string(), // version
  c: z.string().optional().nullable(), // client id
  u: z.string(), // url
  d: z.string(), // domain
  p: z.string().optional().nullable(), // pathname
  b: z.string().optional().nullable().nullable(), // product identifier
  r: z.string().optional().nullable(), // referrer
  w: z.string().optional().nullable(), // width
  utm_medium: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  utm_content: z.string().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  en: z.string(), // event name
  ec: z.string().optional().nullable(), // event category
  em: z.string().optional().nullable(), // event method
  ev: z.string().optional().nullable(), // event value
});

export async function GET(request: NextRequest) {
  const { isBot, os, browser } = userAgent(request);
  if (isBot) {
    return new Response(`Tracked pageview`, {
      status: 200,
    });
  }

  const cookieStore = cookies();
  const cid = cookieStore.get("kaia-cid")?.value || null;
  const searchParams = request.nextUrl.searchParams;

  const query = EventHandlerInputSchema.parse({
    v: searchParams.get("v"),
    c: searchParams.get("c"),
    u: searchParams.get("u"),
    d: searchParams.get("d"),
    p: searchParams.get("p") || null,
    b: searchParams.get("b") || null,
    r: searchParams.get("r") || null,
    w: searchParams.get("w"),
    utm_medium: searchParams.get("utm_medium") || null,
    utm_source: searchParams.get("utm_source") || null,
    utm_campaign: searchParams.get("utm_campaign") || null,
    utm_content: searchParams.get("utm_content") || null,
    utm_term: searchParams.get("utm_term") || null,
    en: searchParams.get("en"),
    ec: searchParams.get("ec") || null,
    em: searchParams.get("em") || null,
    ev: searchParams.get("ev") || null,
  });

  const event: Omit<Event, "dateCreated"> = {
    clientId: query.c || cid,
    domain: query.d,
    url: query.u,
    pathname: query.p || null,
    product: query.b || null,
    referrer: query.r || null,
    utmMedium: query.utm_medium || null,
    utmSource: query.utm_source || null,
    utmCampaign: query.utm_campaign || null,
    utmContent: query.utm_content || null,
    utmTerm: query.utm_term || null,
    category: query.ec || null,
    name: query.en || null,
    method: query.em || null,
    value: query.ev || null,
    operatingSystem: os.name || null,
    operatingSystemVersion: os.version || null,
    browser: browser.name || null,
    browserVersion: browser.version || null,
    screenSize: (query.w && calculateScreenSize(parseInt(query.w))) || null,
  };

  await db.insert(events).values(event);

  console.log("GET /track");

  return new Response(`Tracked pageview`, {
    status: 200,
  });
}
