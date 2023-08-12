import getData from "./get-data";
import { HandbookSchema } from "./schema";

export async function getHandbookPages() {
  const data = await getData<HandbookSchema>("handbook", {
    withPages: false,
    sorts: [
      {
        property: "Order",
        direction: "ascending",
      },
    ],
  });
  // console.log(data.map((page) => page.properties.Slug.rich_text[0].text));
  return data;
}

export async function getHandbookPage(slug: string) {
  const data = await getData<HandbookSchema>("handbook", {
    withPages: true,
    filter: {
      property: "Slug",
      rich_text: {
        equals: "/" + slug,
      },
    },
  });
  console.log(data.map((page) => page.properties));
  if (data.length === 0) {
    return null;
  }
  return data[0];
}
