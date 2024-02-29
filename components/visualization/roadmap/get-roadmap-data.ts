import siteConfig from "@/site-config";
import parseISO from "date-fns/parseISO";
import getData from "@/lib/notion/get-data";
import { RoadmapSchema } from "@/lib/notion/schema";

export default async function getRoadmapData() {
  const data = await getData<RoadmapSchema>(
    siteConfig.notion.databases.roadmap,
    {
      withBlocks: false,
      filter: {
        property: "Type",
        select: {
          equals: "Theme",
        },
      },
    }
  );

  const timelineThemes = data
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
    start: timelineThemes[0].dates.start,
    end: timelineThemes[timelineThemes.length - 1].dates.end,
  };
  timelineThemes.push(timelineThemes.shift() as any);
  return { themes: timelineThemes, range };
}
