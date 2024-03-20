import { pgTable, text, uuid, timestamp, char } from "drizzle-orm/pg-core";

export const feedback = pgTable("feedback", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  email: text("email"),
  message: text("message"),
  emoji: char("emoji"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export type Feedback = typeof feedback.$inferSelect;
