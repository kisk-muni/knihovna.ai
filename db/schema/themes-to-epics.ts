import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { themes } from "./themes";
import { epics } from "./epics";

export const themesToEpics = pgTable(
  "themes_to_epics",
  {
    themeId: uuid("theme_id")
      .notNull()
      .references(() => themes.id),
    epicId: uuid("epic_id")
      .notNull()
      .references(() => epics.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.themeId, t.epicId] }),
  })
);

export const themesToEpicsRelations = relations(themesToEpics, ({ one }) => ({
  theme: one(themes, {
    fields: [themesToEpics.themeId],
    references: [themes.id],
    relationName: "theme",
  }),
  epic: one(epics, {
    fields: [themesToEpics.epicId],
    references: [epics.id],
    relationName: "epic",
  }),
}));
