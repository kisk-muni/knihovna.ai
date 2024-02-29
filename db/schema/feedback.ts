import { pgTable, text, json, uuid, timestamp } from "drizzle-orm/pg-core";

export const feedback = pgTable("feedback", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  email: text("email"),
  message: text("message"),
  data: json("data"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export type Feedback = typeof feedback.$inferSelect;
