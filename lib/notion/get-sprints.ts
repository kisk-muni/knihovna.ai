import siteConfig from "@/site-config";
import getData, {
  convertToToc,
  transformChildDatabase,
  transformImage,
} from "./get-data";
import { SprintSchema, TodoSchema } from "./schema";
import { mapAuthors } from "./map-authors";
import n2m from "./notion2md";

export async function getSprints(publicOnly = true, full = false) {
  const data = await getData<SprintSchema>(
    siteConfig.notion.databases.sprints,
    {
      withRelations: false,
    }
  );
  const sprintsWithRelation = data
    .map((item) => {
      const { Name, Dates, "To-dos": ToDos } = item.properties;
      return {
        id: item.id,
        name: Name?.title[0]?.plain_text,
        dates: {
          start: new Date(Dates?.date?.start),
          end: new Date(Dates?.date?.end),
        },
        todos: ToDos.relation,
      };
    })
    .filter((sprint) => sprint.name !== "Default sprint")
    .sort((a, b) => b.dates.start.getTime() - a.dates.start.getTime());

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

  const mdPromises = todos
    .filter((item) => item.properties.Private.checkbox != true)
    .map(async (item) => {
      const { Name, Status, Category, Dates, Assignee, Sprint } =
        item.properties;

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
        const toc = convertToToc(headings);
        item.toc = toc;
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
        category: Category?.multi_select,
        dates: Dates?.date,
        authors: mapAuthors(Assignee),
        blocks: item?.blocks,
        markdown: item.markdownContents,
        toc: item.toc,
        sprints: Sprint.relation,
      };
    });

  const publicTodos = await Promise.all(mdPromises);

  const sprints = sprintsWithRelation.map((sprint) => {
    return {
      ...sprint,
      todos: publicTodos.filter((todo) =>
        sprint.todos.find((item) => item.id === todo.id)
      ),
    };
  });

  return sprints;
}
