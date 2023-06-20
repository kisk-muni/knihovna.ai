import Button from "@/components/button";
import Card from "@/components/card";
import Container from "@/components/container";
import Headline from "@/components/headline";

/* eslint-disable @next/next/no-img-element */
export default function DesignPage() {
  return (
    <main className="mt-24">
      <Container className="flex mb-10">
        <Button>Button base</Button>
      </Container>
      <Container className="flex mb-10 py-10 bg-gray-500">
        <Card className="bg-white">Card base</Card>
      </Container>
      <Container className="bg-primary-400 mb-10">Container</Container>
      <Container fullWidth className="bg-primary-400 mb-10">
        Container Full Width
      </Container>
      <Container className="mb-10">
        <Headline as="h1" level="1">
          Headline 1
        </Headline>
        <Headline as="h2" level="2">
          Headline 2
        </Headline>
        <Headline as="h3" level="3">
          Headline 3
        </Headline>
        <Headline as="h4" level="4">
          Headline 4
        </Headline>
        <Headline as="h5" level="5">
          Headline 5
        </Headline>
        <Headline as="h6" level="6">
          Headline 6
        </Headline>
      </Container>
    </main>
  );
}
