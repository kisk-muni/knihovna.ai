import { getSprints } from "@/lib/notion/get-sprints";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const sprints = await getSprints(false, false);
  const deleteSprints = prisma.sprint.deleteMany();
  await prisma.$transaction([deleteSprints]);

  const sprintsWrite = sprints.map((sprint) => {
    /* const epics = theme.epics.map((epic) => ({
      id: epic.id,
      name: epic.name,
      dateStart: epic.dates?.start?.toISOString() || undefined,
      dateEnd: epic.dates?.end?.toISOString() || undefined,
      status: epic.status,
      tasks: {
        connectOrCreate: epic.todos.map((todo) => {
          const task = {
            id: todo.id,
            name: todo.name,
            dateStart: todo.dates?.start || undefined,
            dateEnd: todo.dates?.end || undefined,
            status: todo.status,
          };
          return {
            where: { id: todo.id },
            create: task,
          };
        }),
      }, 
    })); */

    const newSprint = {
      id: sprint.id,
      name: sprint.name,
      dateStart: sprint.dates?.start?.toISOString() || undefined,
      dateEnd: sprint.dates?.end?.toISOString() || undefined,
    };

    return prisma.sprint.upsert({
      where: { id: sprint.id },
      update: { ...newSprint },
      create: { ...newSprint },
    });
  });

  await Promise.all(sprintsWrite);

  return new Response(JSON.stringify(sprints), {
    status: 200,
  });
}
