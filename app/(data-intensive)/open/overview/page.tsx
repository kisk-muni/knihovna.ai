import Container from "@/components/ui/container";
import Headline from "@/components/ui/headline";
import BackgroundGradient from "@/components/ui/background-gradient";
import getData from "@/lib/notion/get-data";
import siteConfig from "@/site-config";
import { TodoSchema } from "@/lib/notion/schema";
import Card from "@/components/ui/card";
import getTimelineData from "@/components/visualization/timeline/get-timeline-data";
import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { MDXRemote } from "next-mdx-remote/rsc";
import { defaultComponents } from "@/lib/mdx";
import { getRoadmap } from "@/lib/notion/get-roadmap";

export const metadata: Metadata = createMetadata({
  title: "Roadmap",
  description: "Projektový harmonogram a plánované výstupy projektu.",
});

export const revalidate = 3600;

export default async function RoadmapPage() {
  const themes = await getRoadmap();
  return (
    <main className="my-6">
      <Container size="max">
        <section>
          <Card
            theme="white"
            size="md"
            className="mt-4 overflow-hidden border border-sheet shadow"
          >
            <Headline as="h2" level="3">
              Plán projektu
            </Headline>
            <div className="-mx-6 -mb-8">
              {themes.map((theme, tindex) => (
                <div className="my-4 mx-6 text-text" key={tindex}>
                  <div>Fáze - {theme.name}</div>
                  <div>
                    {theme.epics.map((epic, index) => (
                      <div key={index}>
                        <div>Podvýstup - {epic.name}</div>
                        <div>
                          {epic.todos.map((todo, todoindex) => (
                            <div key={todoindex}>Todo - {todo.name}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </Container>
    </main>
  );
}
