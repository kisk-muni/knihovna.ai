import Container from "@/components/container";
import Headline from "@/components/headline";
import BackgroundGradient from "@/components/background-gradient";
import getData from "@/lib/notion/get-data";
import siteConfig from "@/site-config";
import { TodoSchema } from "@/lib/notion/schema";
import RoadmapTimeline from "@/components/visualization/roadmap/roadmap-timeline";
import Card from "@/components/card";
// import Roadmap from "@/components/visualization/roadmap/roadmap-timeline";

export default async function RoadmapPage() {
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
              Harmonogram projektu
            </Headline>
            <div className="-mx-6 -mb-8">
              <RoadmapTimeline />
            </div>
          </Card>
        </section>
      </Container>
    </main>
  );
}
