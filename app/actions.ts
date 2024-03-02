"use server";

import { db } from "@/db";
import {
  State,
  Todo,
  themes,
  User,
  users,
  todos,
  Category,
  Epic,
} from "@/db/schema";
import siteConfig from "@/site-config";
import { select } from "@nextui-org/react";
import { isFuture, isPast, isWithinInterval } from "date-fns";
import { desc } from "drizzle-orm";
import { type Selection } from "react-aria-components";

export type CompleteTodo = Todo & {
  state: State | null;
  users: { user: User }[];
  categories: { category: Category }[];
  epics: { epic: Epic }[];
};

function getRelativeTimeFlags(start: Date | null, end: Date | null) {
  return {
    isActive:
      end && start
        ? isWithinInterval(new Date(), {
            start: start,
            end: end,
          })
        : false,
    isPast: end ? isPast(end) : false,
    isUpcoming: start ? isFuture(start) : false,
  };
}

function getSprintStats(todos: { todo: Todo & { state: State | null } }[]) {
  const stateCounts = todos.reduce((acc, todoRelation) => {
    const todo = todoRelation.todo;
    if (!todo.state) return acc;
    const state = todo.state?.name;
    if (acc[state]) {
      acc[state] += 1;
    } else {
      acc[state] = 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const scope = todos.length;
  const successRate = (stateCounts["Done"] / scope) * 100;
  const activeRate =
    ((stateCounts["In Progress"] + (stateCounts["Review"] || 0)) / scope) * 100;
  return {
    scope,
    successRate,
    activeRate,
  };
}

export async function getThemes(selectedState: Selection) {
  const result = await db.query.themes
    .findMany({
      orderBy: [desc(themes.dateEnd)],
      with: {
        state: true,
        epics: {
          columns: {},
          with: {
            epic: {
              with: {
                state: true,
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
    })
    .then((payload) =>
      payload
        .filter(
          (theme) =>
            selectedState == "all" ||
            selectedState.has("all") ||
            (theme.state?.standardised &&
              (selectedState as Set<string>).has(theme.state.standardised))
        )
        .map((theme) => {
          const timeFlags = getRelativeTimeFlags(
            theme.dateStart,
            theme.dateEnd
          );
          return { ...timeFlags, ...theme };
        })
    );
  return result;
}

export async function getSprints() {
  const result = await db.query.sprints
    .findMany({
      where: (sprints, { ne }) => ne(sprints.name, "Default sprint"),
      with: {
        todos: {
          columns: {},
          with: {
            todo: {
              with: {
                state: true,
              },
            },
          },
        },
      },
    })
    .then((payload) =>
      payload.map((sprint) => {
        const timeFlags = getRelativeTimeFlags(
          sprint.dateStart,
          sprint.dateEnd
        );
        const stats = getSprintStats(sprint.todos);
        return { ...timeFlags, ...stats, ...sprint };
      })
    );
  return result;
}

export async function getSprint(id: string) {
  const result = await db.query.sprints
    .findFirst({
      where: (sprints, { eq }) => eq(sprints.id, id),
      with: {
        todos: {
          with: {
            todo: {
              with: {
                users: {
                  with: {
                    user: true,
                  },
                },
                epics: {
                  with: {
                    epic: true,
                  },
                },
                categories: {
                  with: {
                    category: true,
                  },
                },
                state: true,
              },
            },
          },
        },
      },
    })
    .then((sprint) => {
      if (!sprint) return undefined;
      const timeFlags = getRelativeTimeFlags(sprint.dateStart, sprint.dateEnd);
      const stats = getSprintStats(sprint.todos);
      const todos = sprint.todos.reduce((acc, { todo }) => {
        const state = todo.state?.standardised || "not-started";
        if (acc[state]) {
          acc[state].push(todo);
        } else {
          acc[state] = [todo];
        }
        return acc;
      }, {} as Record<string, CompleteTodo[]>);
      return { ...timeFlags, ...stats, ...sprint, todos };
    });
  return result;
}

export async function getEpic(id: string) {
  const result = await db.query.epics.findFirst({
    where: (epics, { eq }) => eq(epics.id, id),
    with: {
      todos: {
        with: {
          todo: {
            with: {
              state: true,
              users: {
                with: {
                  user: true,
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

export async function getTodos(selectedStates: Selection) {
  const result = await db.query.todos
    .findMany({
      with: {
        state: true,
        users: {
          with: {
            user: true,
          },
        },
        epics: {
          with: {
            epic: true,
          },
        },
        categories: {
          with: {
            category: true,
          },
        },
        sprints: {
          with: {
            sprint: {
              columns: { id: true, name: true },
            },
          },
        },
      },
    })
    .then((todos) =>
      todos.reduce((acc, todo) => {
        const state = todo.state?.standardised || "not-started";
        if (
          selectedStates != "all" &&
          !selectedStates.has(state) &&
          selectedStates.size
        )
          return acc;
        if (acc[state]) {
          acc[state].push(todo);
        } else {
          acc[state] = [todo];
        }
        return acc;
      }, {} as Record<string, CompleteTodo[]>)
    );
  return result;
}
