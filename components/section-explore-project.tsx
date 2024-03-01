import Container from "@/components/ui/container";
/* eslint-disable react/no-unescaped-entities */
import Headline from "@/components/ui/headline";
import Card from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export default function SectionExploreProject() {
  return (
    <section className="bg-white pt-24">
      <Container>
        <div className="flex flex-col gap-x-6">
          <Headline level="2" as="h2" className="max-w-sm mb-10">
            Projekt je otevřený
          </Headline>

          <div className="mb-4 grid gap-4 grid-cols-1 md:grid-cols-[1fr,1fr,1fr] md:grid-rows-[repeat(2,1fr)">
            <Link
              href="/project"
              className="flex shrink md:row-span-2 md:col-span-1"
            >
              <Card size="md" className="bg-sheet flex flex-col justify-end">
                <p className="text-text text-lg">
                  Prozkoumejte na čem pracujeme, projektové finance a další
                  informace.
                </p>
                <div className="flex mt-6">
                  <Button size="base" theme="primary">
                    Prozkoumat
                  </Button>
                </div>
              </Card>
            </Link>
            <Link href="/project/epics" className="md:row-span-1 md:col-span-2">
              <Card size="md" className="bg-sheet flex flex-col">
                <p className="text-text text-lg">Harmonogram a cíle projektu</p>
              </Card>
            </Link>
            <Link
              href="/project/finance"
              className="md:row-span-1 md:col-span-1"
            >
              <Card size="md" className="bg-sheet flex flex-col">
                <p className="text-text text-lg">Finance</p>
              </Card>
            </Link>
            <Link
              href="/project/sprints"
              className="md:row-span-1 md:col-span-1"
            >
              <Card size="md" className="bg-sheet flex flex-col">
                <p className="text-text text-lg">Týdenní sprinty</p>
              </Card>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
