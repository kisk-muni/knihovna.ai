import siteConfig from "@/site-config";
import getData, {
  convertToToc,
  transformChildDatabase,
  transformImage,
} from "./get-data";
import { RoadmapSchema, SprintSchema, TodoSchema } from "./schema";
import { mapAuthors } from "./map-authors";
import n2m from "./notion2md";

export async function getRoadmap(publicOnly = true, full = false) {
  const data = await getData<RoadmapSchema>(
    siteConfig.notion.databases.roadmap,
    {
      withRelations: false,
    }
  );
  const roadmapWithRelation = data
    .map((item) => {
      const { Name, Dates, Epics, "To-dos": Todos } = item.properties;
      return {
        id: item.id,
        name: Name?.title[0]?.plain_text,
        status: item.properties.Status.status.name,
        dates: {
          start: new Date(Dates?.date?.start),
          end: new Date(Dates?.date?.end),
        },
        type: item.properties.Type?.select?.name,
        epics: Epics.relation.map((epic) => epic.id),
        todos: Todos.relation.map((todo) => todo.id),
      };
    })
    .filter((sprint) => sprint.name !== "Default sprint")
    .sort((a, b) => b.dates.start.getTime() - a.dates.start.getTime());

  /* const epics = await getData<RoadmapSchema>(
    siteConfig.notion.databases.roadmap,
    {
      withBlocks: full,
      filter: publicOnly
        ? {
            property: "Private",
            checkbox: {
              equals: false,
            },
          }
        : undefined,
      blocksAs: ["objects"],
    }
  );
*/
  const todos = await getData<TodoSchema>(siteConfig.notion.databases.todos, {
    withBlocks: full,
    filter: publicOnly
      ? {
          property: "Private",
          checkbox: {
            equals: false,
          },
        }
      : undefined,
    blocksAs: ["objects"],
  });

  const todoPromises = todos.map(async (item) => {
    const { Name, Status, Dates } = item.properties;

    if (full) {
      const headings =
        item?.blocks
          ?.filter((block: any) => block.type.startsWith("heading"))
          .map((block: any) => {
            const { type } = block;
            return {
              level: parseInt(block.type.split("_")[1]),
              text: block[type].rich_text.length
                ? (block[type].rich_text[0]?.plain_text as string | "")
                : "",
            };
          }) || [];
      const { nestedHeadings } = convertToToc(headings);
      item.toc = nestedHeadings;
      const x = await n2m.blocksToMarkdown(item.blocks);
      n2m.setCustomTransformer("child_database", transformChildDatabase);
      n2m.setCustomTransformer("image", transformImage);
      item.markdownContents = n2m.toMarkdownString(x).parent;
    }

    return {
      id: item.id,
      public_url: item.public_url,
      url: item.url,
      created_time: item.created_time,
      last_edited_time: item.last_edited_time,
      created_by: item.created_by,
      last_edited_by: item.last_edited_by,
      name: Name?.title[0]?.plain_text,
      status: Status?.status.name,
      dates: {
        start: Dates?.date?.start ? new Date(Dates?.date?.start) : undefined,
        end: Dates?.date?.end ? new Date(Dates?.date?.end) : undefined,
      },
      blocks: item?.blocks,
      markdown: item.markdownContents,
      toc: item.toc,
    };
  });

  const fetchedTodos = await Promise.all(todoPromises);
  const epics = roadmapWithRelation
    .filter((item) => item.type == "Epic")
    .map((epic) => {
      return {
        ...epic,
        todos: fetchedTodos.filter((todo) => epic.todos.includes(todo.id)),
      };
    });

  const themes = roadmapWithRelation
    .filter((item) => item.type == "Theme")
    .map((sprint) => {
      return {
        ...sprint,
        epics: epics.filter((epic) => sprint.epics.includes(epic.id)),
      };
    });

  return themes;
}
