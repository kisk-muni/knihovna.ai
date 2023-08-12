import siteConfig from "@/site-config";
import notion, { TextBlock } from "@/lib/notion/notion";
import n2m from "@/lib/notion/notion2md";
import parseISO from "date-fns/parseISO";

type RoadmapNotionItem = {
  id: string;
  url: string;
  public_url: string;
  properties: {
    Name: TextBlock;
    Dates: {
      date: {
        start: string;
        end: string;
        time_zone: string | null;
      };
    };
  };
  markdownContents?: string;
};

export default async function getRoadmapData() {
  const database = (
    await notion.databases.query({
      database_id: siteConfig.notion.databases.roadmap,
    })
  ).results as unknown as RoadmapNotionItem[];

  for (const item of database) {
    const { results } = await notion.blocks.children.list({
      block_id: item.id,
    });
    const x = await n2m.blocksToMarkdown(results);
    item.markdownContents = n2m.toMarkdownString(x).parent;
  }

  const roadmapThemes = database
    .map((item) => {
      return {
        id: item.id,
        name: item.properties.Name.title[0].plain_text,
        dates: {
          start: parseISO(item.properties.Dates.date.start),
          end: parseISO(item.properties.Dates.date.end),
        },
        markdownContents: item.markdownContents,
      };
    })
    .sort((a, b) => {
      return a.dates.start.getTime() - b.dates.start.getTime();
    });
  const range = {
    start: roadmapThemes[0].dates.start,
    end: roadmapThemes[roadmapThemes.length - 1].dates.end,
  };
  roadmapThemes.push(roadmapThemes.shift() as any);
  return { themes: roadmapThemes, range };
}
