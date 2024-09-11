import Container from "@/components/ui/container";
/* eslint-disable react/no-unescaped-entities */
import Headline from "@/components/ui/headline";
import Image from "next/image";
import { IconPlus, IconSeparator } from "./ui/icons";
import Affiliation from "./affiliation";

export default function SectionAffiliation() {
  return (
    <section className="pt-24 pb-24">
      <Container>
        <div className="grid grid-cols-1">
          <div className="flex flex-col">
            <Headline level="2" as="h2" className="max-w-xl mb-12">
              Za projektem stojí výzkumníci z Masarykovy univerzity s podporou 
              EU
            </Headline>
            {/*<Link href="/tym">
                <Button smaller>Více o našem týmu</Button>
              </Link>*/}
          </div>
          <Affiliation />
        </div>
      </Container>
    </section>
  );
}
