import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable(
  "events",
  {
    clientId: text("client_id"),
    dateCreated: timestamp("date_created", { mode: "date" }).defaultNow(),
    domain: text("domain"),
    url: text("url"),
    pathname: text("pathname"),
    product: text("product"),
    referrer: text("referrer"),
    utmMedium: text("utm_medium"),
    utmSource: text("utm_source"),
    utmCampaign: text("utm_campaign"),
    utmContent: text("utm_content"),
    utmTerm: text("utm_term"),
    category: text("category"),
    name: text("name"),
    method: text("method"),
    value: text("value"),
    operatingSystem: text("operating_system"),
    operatingSystemVersion: text("operating_system_version"),
    browser: text("browser"),
    browserVersion: text("browser_version"),
    screenSize: text("screen_size"),
  },
  (table) => {
    return {
      nameIdx: index("events_date_idx").on(table.dateCreated),
    };
  }
);

export type EventsTable = typeof events;

export type Event = typeof events.$inferSelect;
