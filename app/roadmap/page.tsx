import Container from "@/components/container";
import Headline from "@/components/headline";
import BackgroundGradient from "@/components/background-gradient";
import Roadmap from "@/components/visualization/roadmap/roadmap-timeline";

export default function RoadmapPage() {
  return (
    <main className="mt-24 mb-24 overflow-hidden">
      <BackgroundGradient />
      <Container className="pt-10 pb-10">
        <Headline as="h1" level="ultra">
          Roadmap projektu
        </Headline>
        <p className="text-lg text-text">Jednotlivé fáze projektu v čase.</p>
      </Container>
      <section>
        <Roadmap />
      </section>
    </main>
  );
}
