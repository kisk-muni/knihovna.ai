import getData from "@/lib/notion/get-data";
import { TodoSchema } from "@/lib/notion/schema";
import prisma from "@/lib/prisma";
import siteConfig from "@/site-config";

export async function GET(request: Request) {
  const data = await getData<TodoSchema>(siteConfig.notion.databases.todos, {
    withRelations: false,
    // withBlocks: true,
  });
  const deleteTasks = prisma.task.deleteMany();
  await prisma.$transaction([deleteTasks]);

  const tasksWrite = data.map((item) => {
    const { Name, Status, Category, Dates, Assignee, Sprint } = item.properties;

    const newTask = {
      // public_url: item.public_url,
      // url: item.url,
      // created_time: item.created_time,
      // last_edited_time: item.last_edited_time,
      // created_by: item.created_by,
      // last_edited_by: item.last_edited_by,
      dateStart: Dates.date?.start ? new Date(Dates.date.start) : undefined,
      dateEnd: Dates.date?.end ? new Date(Dates.date.end) : undefined,
      name: Name?.title[0]?.plain_text,
      categories: {
        connectOrCreate: Category?.multi_select.map((category) => ({
          where: { name: category.name },
          create: {
            name: category.name,
            color: category.color,
          },
        })),
      },
      /* status: {
        connectOrCreate: {
          where: { id: Status?.status.id },
          create: {
            id: Status?.status.id,
            name: Status?.status.name,
            color: Status?.status.color,
          },
        },
      }, */
      //dates: Dates?.date,
      // authors: mapAuthors(Assignee),
      // blocks: item?.blocks,
      //markdownContent: item.markdownContents,
      // toc: item.toc,
      sprints: {
        connect: item.properties.Sprint.relation.map((sprint) => ({
          id: sprint.id,
        })),
      },
    };

    return prisma.task.upsert({
      where: { id: item.id },
      update: { ...newTask },
      create: { id: item.id, ...newTask },
    });
  });

  await Promise.all(tasksWrite);

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
