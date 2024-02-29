import notion from "@/lib/notion/notion";
import siteConfig from "@/site-config";

export async function GET(request: Request) {
  const pages = await notion.databases.query({
    database_id: siteConfig.notion.databases.blog,
  });
  return new Response(JSON.stringify(pages), {
    status: 200,
  });
}
