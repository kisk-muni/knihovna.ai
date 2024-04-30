"use server";

import { db } from "@/db";
import crypto from "crypto";
import { cookies } from "next/headers";
import {
  State,
  Todo,
  themes,
  User,
  Category,
  Epic,
  frameworkSubmissions,
  feedback,
} from "@/db/schema";
import { isFuture, isPast, isWithinInterval } from "date-fns";
import { id } from "date-fns/locale";
import { and, desc, eq, inArray } from "drizzle-orm";
import { type Selection } from "react-aria-components";
import { z } from "zod";
import { Tsukimi_Rounded } from "next/font/google";
import {
  FrameworkSubmissionAnswer,
  frameworkSubmissionsAnswers,
} from "@/db/schema/framework-submission-answers";
import { questions } from "@/framework";
import { SubmissionOld } from "@/lib/types";

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

type KnownJsonAnswer = Omit<FrameworkSubmissionAnswer, "data"> & {
  data: { value: boolean | null };
};

export async function getFrameworkSubmission(
  id: string
): Promise<SubmissionOld> {
  // given Id get submission
  const submissions = await db
    .select()
    .from(frameworkSubmissions)
    .where(eq(frameworkSubmissions.id, id));
  const submission = submissions.length ? submissions[0] : null;
  if (!submission) return null;

  // get answers for current questions in framework.ts
  const requestedQuestions = questions.map((q) => q.id);
  const answers = (await db
    .select()
    .from(frameworkSubmissionsAnswers)
    .where(
      and(
        eq(frameworkSubmissionsAnswers.submissionId, id),
        inArray(frameworkSubmissionsAnswers.questionId, requestedQuestions)
      )
    )) as KnownJsonAnswer[];

  // get only latest answer for each unique question
  const latestAnswerByQuestionId = answers.reduce((acc, answer) => {
    const existing = acc[answer.questionId];
    if (!existing || existing.dateCreated < answer.dateCreated) {
      acc[answer.questionId] = answer;
    }
    return acc;
  }, {} as Record<string, KnownJsonAnswer>);

  const frameworkquestionsAnswers = questions.map((question) => {
    const answer = latestAnswerByQuestionId[question.id];
    return {
      questionId: question.id,
      answer: answer ? answer.data.value : null,
    };
  });

  return { ...submission, answers: frameworkquestionsAnswers };
}

const answerSchema = z.object({
  questionId: z.string(),
  questionVersion: z.string().optional(),
  value: z.boolean().nullable(),
});

export type Answer = z.infer<typeof answerSchema>;

const answerOldSchema = z.object({
  questionId: z.string(),
  answer: z.boolean().nullable(),
});

export type AnswerOld = z.infer<typeof answerOldSchema>;

const submissionSchema = z.object({
  id: z.string(),
  answer: answerSchema,
  // dateCreated: z.string().datetime(),
  // dateLastEdited: z.string().datetime(),
});

type Submission = z.infer<typeof submissionSchema>;

export async function upsertFrameworkSubmission(
  data: Submission,
  secret: string | null
) {
  const userId = cookies().get("kaia-cid")?.value;

  if (!userId) {
    throw new Error("User not found");
  }
  if (!secret) return Error("Secret not provided");
  const submission = submissionSchema.parse(data);

  const newHash = crypto
    .pbkdf2Sync(
      secret,
      process.env.FRAMEWORK_SALT as unknown as string,
      1000,
      64,
      "sha512"
    )
    .toString("hex");

  // check if submission exist
  const result = await db
    .select({ secretHash: frameworkSubmissions.secretHash })
    .from(frameworkSubmissions)
    .where(eq(frameworkSubmissions.id, submission.id));

  const existing = (result.length ? result[0] : null) as {
    secretHash: string;
  } | null;

  // if submission already exists, check
  if (existing && existing.secretHash !== newHash)
    return Error("Invalid secret");

  // validate secret
  if (!existing && secret.length < 32) return Error("Invalid secret");

  await db.transaction(async (tx) => {
    await tx
      .insert(frameworkSubmissions)
      .values({ id: submission.id, secretHash: newHash, cid: userId })
      .onConflictDoUpdate({
        target: frameworkSubmissions.id,
        set: { dateLastEdited: new Date() },
      });
    await tx.insert(frameworkSubmissionsAnswers).values({
      submissionId: submission.id,
      cid: userId,
      questionId: submission.answer.questionId,
      data: { value: submission.answer.value },
    });
  });
}

export async function submitFeedback(args: { message: string }) {
  const userId = cookies().get("kaia-cid")?.value;

  if (!userId) {
    throw new Error("User not found");
  }

  const result = await db
    .insert(feedback)
    .values({
      cid: userId,
      message: args.message,
    })
    .returning();

  return result[0];
}
