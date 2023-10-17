import { getSprints } from "@/lib/notion/get-sprints";

export async function GET(request: Request) {
  const sprints = await getSprints(false, true);
  return new Response(JSON.stringify(sprints), {
    status: 500,
  });
}
