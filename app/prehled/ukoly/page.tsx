import Container from "@/components/container";
import Headline from "@/components/headline";
import BackgroundGradient from "@/components/background-gradient";
import getData from "@/lib/notion/get-data";
import siteConfig from "@/site-config";
import { TodoSchema } from "@/lib/notion/schema";
// import Roadmap from "@/components/visualization/roadmap/roadmap-timeline";

export default async function RoadmapPage() {
  const data = await getData<TodoSchema>(siteConfig.notion.databases.todos);
  const publicTodos = data.filter(
    (item) => item.properties.Private.checkbox != true
  );
  // console.log(JSON.stringify(data[20].properties, null, 2));
  return (
    <main className="mt-12 mb-12 overflow-hidden">
      <Headline as="h1" level="ultra">
        Úkoly
      </Headline>
      <section className="text-text">
        {publicTodos?.map((item, i) => {
          return (
            <div key={i}>{item.properties.Name?.title[0]?.plain_text}</div>
          );
        })}
      </section>
    </main>
  );
}
