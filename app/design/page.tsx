import Card from "@/components/ui/card";
import Container from "@/components/ui/container";
import Headline from "@/components/ui/headline";
import FormatedDate from "@/components/ui/formated-date";
import { Button } from "@/components/ui/button";

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
      <Container className="flex mb-10 gap-6 flex-wrap items-start">
        <Button theme="primary" variant="solid" size="large">
          Primary Large
        </Button>
        <Button theme="primary" variant="solid">
          Primary
        </Button>
        <Button variant="ghost" theme="primary" size="small">
          Primary Ghost
        </Button>
        <Button theme="primary" size="small">
          Primary
        </Button>
        <Button theme="gray">Gray Solid</Button>
        <Button theme="gray" variant="pagination">
          Pagination
        </Button>
        <Button theme="gray" variant="ghost">
          Gray Ghost
        </Button>
        <Button theme="white">White</Button>
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
