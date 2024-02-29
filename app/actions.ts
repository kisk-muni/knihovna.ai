"use server";

import { db } from "@/db";
import { sprints, todosToSprints } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getThemes() {
  const result = await db.query.themes.findMany({
    with: {
      epics: {
        columns: {},
        with: {
          epic: {
            with: {
              todos: {
                columns: {},
                with: {
                  todo: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return result;
}

export async function getSprints() {
  const result = await db
    .select()
    .from(sprints)
    .leftJoin(todosToSprints, eq(sprints.id, todosToSprints.sprintId));
  return result;
}
