import Button from "@/components/button";
import Card from "@/components/card";
import Container from "@/components/container";
import Headline from "@/components/headline";
import FormatedDate from "@/components/formated-date";

/* eslint-disable @next/next/no-img-element */
export default function DesignPage() {
  return (
    <main className="mt-24 mb-24">
      <Container className="pt-24 pb-40">
        <Headline as="h1" level="ultra">
          UI Kit
        </Headline>
        <p className="text-lg text-text">
          Toto jsou základní UI komponenty pro urychlení vývoje.
        </p>
      </Container>
      <div>
        <Container className="bg-sheet mb-10 py-6">Container</Container>
      </div>
      <div>
        <Container fullWidth className="bg-sheet mb-10 py-6">
          Container Full Width
        </Container>
      </div>
      <Container className="flex mb-10 gap-6 flex-wrap">
        <Button>Button primary</Button>
        <Button smaller>Button primary smaller</Button>
        <Button invert>Button inverted</Button>
      </Container>
      <Container className="flex gap-3 mb-10 py-10">
        <Card className="bg-sheet" size="md">
          Card base
        </Card>
        <Card className="bg-sheet" size="sm">
          Card with smaller padding
        </Card>
      </Container>
      <Container className="mb-10">
        <Headline as="h1" level="ultra">
          Headline Ultra
        </Headline>
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
        <p>
          Date: <FormatedDate date={new Date()} />
        </p>
      </Container>
    </main>
  );
}
