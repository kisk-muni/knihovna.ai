"use server";

import { db } from "@/db";
import crypto from "crypto";
import {
  State,
  Todo,
  themes,
  User,
  users,
  todos,
  Category,
  Epic,
  frameworkSubmissions,
} from "@/db/schema";
import { isFuture, isPast, isWithinInterval } from "date-fns";
import { id } from "date-fns/locale";
import { and, desc, eq } from "drizzle-orm";
import { type Selection } from "react-aria-components";
import { z } from "zod";

export type EpicTodos = {
  doneTodosCount?: number;
  todos?: {
    todo: Todo & {
      state: {
        standardised: string;
      } | null;
    };
  }[];
};

export type CompleteTodo<S = {}> = Todo & {
  state: State | null;
  users: { user: User }[];
  categories: { category: Category }[];
  epics: {
    epic: Epic & S;
  }[];
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

function aggEpicProgress(epic: {
  epic: Epic & {
    todos: {
      todo: Todo & { state: ({ standardised: string } & State) | null };
    }[];
  };
  todoId: string;
  epicId: string;
}) {
  const todos = epic.epic.todos.map((todoRelation) => todoRelation.todo);
  const newEpic = {
    ...epic.epic,
    doneTodosCount: todos.filter((todo) => todo.state?.standardised === "done")
      .length,
  };
  return { ...epic, epic: newEpic };
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
            selectedState.size == 0 ||
            selectedState.has("all") ||
            (theme.state?.standardised &&
              (selectedState as Set<string>).has(theme.state.standardised)) ||
            ((theme.state?.standardised == "in-progress" ||
              theme.state?.standardised == "review") &&
              (selectedState as Set<string>).has("active"))
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

export async function getSprint(id: string, selectedStates: Selection) {
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
      const todos = sprint.todos
        .map((todo) => {
          if (todo.todo?.isPrivate)
            return {
              ...todo,
              todo: {
                ...todo.todo,
                name: "Soukromá položka",
                content: "Tato položka je soukromá a nemůže být zobrazena",
              },
            };
          return todo;
        })
        .reduce((acc, { todo }) => {
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
        }, {} as Record<string, CompleteTodo[]>);
      return { ...timeFlags, ...stats, ...sprint, todos };
    });
  return result;
}

export async function getEpic(id: string, selectedStates: Selection) {
  const result = await db.query.epics
    .findFirst({
      where: (epics, { eq }) => eq(epics.id, id),
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
    .then((epic) => {
      if (!epic) return undefined;
      const todos = epic.todos
        .map((todo) => {
          if (todo.todo?.isPrivate)
            return {
              ...todo,
              todo: {
                ...todo.todo,
                name: "Soukromá položka",
                content: "Tato položka je soukromá a nemůže být zobrazena",
              },
            };
          return todo;
        })
        .reduce((acc, { todo }) => {
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
        }, {} as Record<string, CompleteTodo[]>);
      return { ...epic, todos };
    });
  return result;
}

export async function getTodos(selectedStates: Selection) {
  const result = await db.query.todos
    .findMany({
      where: (todos, { ne }) => ne(todos.name, ""),
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
      todos
        .map((todo) => {
          if (todo?.isPrivate)
            return {
              ...todo,
              name: "Soukromá položka",
              content: "Tato položka je soukromá a nemůže být zobrazena",
            };
          return todo;
        })
        .reduce((acc, todo) => {
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

export async function getTodo(id: string) {
  const result = await db.query.todos
    .findFirst({
      where: (todos, { eq }) => eq(todos.id, id),
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
        sprints: {
          with: {
            sprint: true,
          },
        },
        state: true,
      },
    })
    .then((todo) => {
      if (todo?.isPrivate)
        return {
          ...todo,
          name: "Soukromá položka",
          content: "Tato položka je soukromá a nemůže být zobrazena",
        };
      return todo;
    });
  return result;
}

export async function getMembers() {
  const result = await db.query.users.findMany();
  return result;
}

export async function getFrameworkSubmission(id: string) {
  return await db
    .select()
    .from(frameworkSubmissions)
    .where(eq(frameworkSubmissions.id, id));
}

const answerSchema = z.object({
  questionId: z.string(),
  questionVersion: z.string(),
  answer: z.boolean().nullable(),
});

export type Answer = z.infer<typeof answerSchema>;

const submissionSchema = z.object({
  id: z.string(),
  answers: z.array(answerSchema),
  // dateCreated: z.string().datetime(),
  // dateLastEdited: z.string().datetime(),
});

type Submission = z.infer<typeof submissionSchema>;

export async function upsertFrameworkSubmission(
  data: Submission,
  secret?: string
) {
  const submission = submissionSchema.parse(data);
  /*   const newHash = crypto
    .pbkdf2Sync(
      secret,
      process.env.FRAMEWORK_SALT as unknown as string,
      1000,
      64,
      "sha512"
    )
    .toString("hex");

  const result = await db
    .select({ secretHash: frameworkSubmissions.secretHash })
    .from(frameworkSubmissions)
    .where(eq(frameworkSubmissions.id, submission.id));
  const current = result.length ? result[0] : null;
  if (!current) return Error("Submission not found");
  if (current.secretHash !== newHash) return Error("Invalid secret"); */
  await db
    .insert(frameworkSubmissions)
    .values(submission)
    .onConflictDoUpdate({
      target: frameworkSubmissions.id,
      set: { answers: data.answers, dateLastEdited: new Date() },
    });
}
