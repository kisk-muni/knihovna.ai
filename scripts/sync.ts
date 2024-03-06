// first get all data from notion to one
// import { db } from "@/db";
import dotenv from "dotenv";
dotenv.config({ path: [".env.local"] });
import { RoadmapSchema, SprintSchema, TodoSchema } from "../lib/notion/schema";
import { getPaginatedData } from "../lib/notion/get-data";
import siteConfig from "../site-config";
import { db } from "../db";
import {
  states,
  categories,
  users,
  todos,
  usersToTodos,
  todosToCategories,
  todosToSubTodos,
  sprints,
  themes,
  todosToSprints,
  epics,
  themesToEpics,
  todosToEpics,
} from "../db/schema";

const usersAvatars = siteConfig.team.reduce((acc, user) => {
  if (user.avatar !== undefined) {
    acc[user.notionId] = user.avatar;
  }
  return acc;
}, {} as Record<string, string>);

const download = async () => {
  const start = Date.now();

  const sprintsPromise = getPaginatedData<SprintSchema>(
    siteConfig.notion.databases.sprints
  );
  const todosPromise = getPaginatedData<TodoSchema>(
    siteConfig.notion.databases.todos,
    {
      withBlocks: true,
      blocksAs: ["markdown"],
    }
  );
  const roadmapPromise = getPaginatedData<RoadmapSchema>(
    siteConfig.notion.databases.roadmap
  );
  const result = await Promise.all([
    sprintsPromise,
    todosPromise,
    roadmapPromise,
  ]);
  console.log(result[1].length, "todos");
  const end = Date.now();
  const time = end - start;
  console.log(`Downloaded in ${time}ms`);
  return result;
};

const sync = async () => {
  const start = Date.now();
  const [sprintL, tasks, roadmap] = await download();
  const end = Date.now();
  const time = end - start;

  const allUsers = tasks
    .map((t) => {
      const assignees = t.properties.Assignee.people.map((p) => {
        return {
          notionId: p.id,
          username: p.name,
          name: p.name,
        };
      });
      return assignees;
    })
    .flat();

  const standardiseState = (state: string) => {
    if (state === "Backlog") return "not-started";
    if (state === "Not started") return "not-started";
    if (state === "Not Started") return "not-started";
    if (state === "In Progress") return "in-progress";
    if (state === "In progress") return "in-progress";
    if (state === "Canceled") return "canceled";
    if (state === "Backlog") return "backlog";
    if (state === "Review") return "review";
    if (state === "Done") return "done";
    return "unknown";
  };

  const uniqueStates = [
    ...tasks.map((t) => {
      return {
        notionId: t.properties.Status.status.id,
        name: t.properties.Status.status.name,
        color: t.properties.Status.status.color,
        standardised: standardiseState(t.properties.Status.status.name),
      };
    }),
    ...roadmap.map((t) => {
      return {
        notionId: t.properties.Status.status.id,
        name: t.properties.Status.status.name,
        color: t.properties.Status.status.color,
        standardised: standardiseState(t.properties.Status.status.name),
      };
    }),
  ].filter((s) => !!s);
  await db
    .insert(users)
    .values(
      allUsers.map((user) => ({
        notionId: user.notionId,
        avatar: usersAvatars[user.notionId] || null,
        name: user.name,
        username: user.username,
      }))
    )
    .onConflictDoNothing({});
  const uniqueCategories = Array.from(
    tasks
      .map((t) =>
        t.properties.Category.multi_select.map((c) => {
          return {
            notionId: c.id,
            name: c.name,
            color: c.color,
          };
        })
      )
      .flat()
  );
  await db.insert(categories).values(uniqueCategories).onConflictDoNothing({});
  await db.insert(states).values(uniqueStates).onConflictDoNothing({});
  const usersFromDb = await db.select().from(users);
  const categoriesFromDb = await db.select().from(categories);
  const statesFromDb = await db.select().from(states);
  const usersIdByNotionId = createLookupTable(usersFromDb);
  const categoriesIdByNotionId = createLookupTable(categoriesFromDb);
  const statesIdByNotionId = createLookupTable(statesFromDb);

  await db
    .insert(todos)
    .values(
      tasks.map((t) => {
        const value = {
          notionId: t.id,
          notionUrl: t.public_url,
          isPrivate: t.properties.Private.checkbox,
          content: t.markdownContents || null,
          storyPoints:
            parseInt(t.properties["Story Points"].select?.name) || null,
          name: t.properties.Name.title.length
            ? t.properties.Name.title[0]?.plain_text
            : "",
          stateId: statesIdByNotionId[t.properties.Status.status.id],
          dateCreated: t.created_time ? new Date(t.created_time) : null,
          dateLastEdited: t.last_edited_time
            ? new Date(t.last_edited_time)
            : null,
          dateStart: t.properties.Dates.date?.start
            ? new Date(t.properties.Dates.date.start)
            : null,
          dateEnd: t.properties.Dates.date?.end
            ? new Date(t.properties.Dates.date.end)
            : null,
        };
        return value;
      })
    )
    .onConflictDoNothing();
  const dbTodos = await db.select().from(todos);
  const todosIdByNotionId = createLookupTable(dbTodos);
  const usersToTodosInsert = tasks
    .map((t) => {
      return t.properties.Assignee.people.map((p) => {
        return {
          userId: usersIdByNotionId[p.id],
          todoId: todosIdByNotionId[t.id],
        };
      });
    })
    .flat()
    .filter((r) => !!r.todoId);
  if (usersToTodosInsert.length)
    await db
      .insert(usersToTodos)
      .values(usersToTodosInsert)
      .onConflictDoNothing({});
  const todosToCategoriesInsert = tasks
    .map((t) => {
      return t.properties.Category.multi_select.map((c) => {
        return {
          todoId: todosIdByNotionId[t.id],
          categoryId: categoriesIdByNotionId[c.id],
        };
      });
    })
    .flat()
    .filter((r) => !!r.todoId);
  if (todosToCategoriesInsert.length)
    await db
      .insert(todosToCategories)
      .values(todosToCategoriesInsert)
      .onConflictDoNothing({});

  const todosToSubTodosInsert = tasks
    .map((t) => {
      return t.properties["Sub-item"].relation.map((s) => {
        return {
          todoId: todosIdByNotionId[t.id],
          subTodoId: todosIdByNotionId[s.id],
        };
      });
    })
    .flat()
    .filter((r) => !!r.todoId);
  if (todosToSubTodosInsert.length)
    await db
      .insert(todosToSubTodos)
      .values(todosToSubTodosInsert)
      .onConflictDoNothing({});
  // sprints
  await db
    .insert(sprints)
    .values(
      sprintL.map((s) => {
        const sprintName = s.properties.Name.title[0]?.plain_text
          .split(" (")[0]
          .split(".")
          .join("");
        return {
          notionId: s.id,
          name: sprintName || "Untitled sprint",
          //content: s.properties.Content.rich_text[0]?.plain_text,
          dateStart: s.properties.Dates.date?.start
            ? new Date(s.properties.Dates.date.start)
            : null,
          dateEnd: s.properties.Dates.date?.end
            ? new Date(s.properties.Dates.date.end)
            : null,
        };
      })
    )
    .onConflictDoNothing({});
  const dbSprints = await db.select().from(sprints);
  const sprintsIdbyNotionId = createLookupTable(dbSprints);
  const todosToSprintsInsert = tasks
    .map((t) => {
      return t.properties.Sprint.relation.map((s) => {
        return {
          todoId: todosIdByNotionId[t.id],
          sprintId: sprintsIdbyNotionId[s.id],
        };
      });
    })
    .flat()
    .filter((r) => !!r.todoId);
  if (todosToSprintsInsert.length)
    await db
      .insert(todosToSprints)
      .values(todosToSprintsInsert)
      .onConflictDoNothing({});
  // themes
  //console.log(roadmap.slice(0, 10).map((r) => r.properties));
  const themesToInsert = roadmap.filter(
    (r) => r.properties.Type?.select?.name === "Theme"
  );
  if (themesToInsert.length)
    await db
      .insert(themes)
      .values(
        themesToInsert.map((t) => {
          return {
            notionId: t.id,
            name: t.properties.Name?.title[0]?.plain_text || "Untitled theme",
            stateId: statesIdByNotionId[t.properties.Status.status.id],
            dateStart: t.properties.Dates.date?.start
              ? new Date(t.properties.Dates.date.start)
              : null,
            dateEnd: t.properties.Dates.date?.end
              ? new Date(t.properties.Dates.date.end)
              : null,
          };
        })
      )
      .onConflictDoNothing({});
  const dbThemes = await db.select().from(themes);
  const themesIdbyNotionId = createLookupTable(dbThemes);
  // epics
  const epicsToInsert = roadmap.filter(
    (r) => r.properties?.Type?.select?.name === "Epic"
  );
  if (epicsToInsert.length)
    await db
      .insert(epics)
      .values(
        epicsToInsert.map((t) => {
          return {
            notionId: t.id,
            name: t.properties.Name.title[0]?.plain_text || "Untitled epic",
            stateId: statesIdByNotionId[t.properties.Status.status.id],
            dateStart: t.properties.Dates.date?.start
              ? new Date(t.properties.Dates.date.start)
              : null,
            dateEnd: t.properties.Dates.date?.end
              ? new Date(t.properties.Dates.date.end)
              : null,
          };
        })
      )
      .onConflictDoNothing({});
  const dbEpics = await db.select().from(epics);
  const epicsIdbyNotionId = createLookupTable(dbEpics);
  // themes to epics
  const themesToEpicsInsert = themesToInsert
    .map((t) => {
      const epics = t.properties.Epics.relation.map((e) => {
        return {
          themeId: themesIdbyNotionId[t.id],
          epicId: epicsIdbyNotionId[e.id],
        };
      });
      return epics;
    })
    .flat()
    .filter((r) => !!r.themeId);
  if (themesToEpicsInsert.length)
    await db
      .insert(themesToEpics)
      .values(themesToEpicsInsert)
      .onConflictDoNothing();
  // todos to epics
  const todosToEpicsInsert = epicsToInsert
    .filter((e) => e.properties["To-dos"].relation.length > 0)
    .map((e) => {
      const todos = e.properties["To-dos"].relation.map((t) => {
        return {
          epicId: epicsIdbyNotionId[e.id],
          todoId: todosIdByNotionId[t.id],
        };
      });
      return todos;
    })
    .flat()
    .filter((r) => !!r.epicId && !!r.todoId);
  if (todosToEpicsInsert)
    await db
      .insert(todosToEpics)
      .values(todosToEpicsInsert)
      .onConflictDoNothing({});

  console.log(`Synced in ${time}ms`);
  process.exit();
};

(async () => {
  await sync();
})();

function createLookupTable<T extends { notionId: string | null; id: string }>(
  items: T[]
) {
  return items.reduce((acc, user) => {
    if (!user.notionId) return acc;
    acc[user.notionId] = user.id;
    return acc;
  }, {} as Record<string, string>);
}
