import siteConfig from "@/site-config";
import parseISO from "date-fns/parseISO";
import getData from "@/lib/notion/get-data";
import { RoadmapSchema } from "@/lib/notion/schema";

export default async function getRoadmapData() {
  const data = await getData<RoadmapSchema>(
    siteConfig.notion.databases.roadmap,
    {
      withPages: true,
      filter: {
        property: "Type",
        select: {
          equals: "Theme",
        },
      },
    }
  );

  const roadmapThemes = data
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
