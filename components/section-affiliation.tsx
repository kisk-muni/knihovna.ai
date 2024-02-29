import Container from "@/components/ui/container";
/* eslint-disable react/no-unescaped-entities */
import Headline from "@/components/ui/headline";
import Image from "next/image";

export default function SectionAffiliation() {
  return (
    <section className="pt-12 pb-24">
      <Container>
        <div className="grid grid-cols-1">
          <div className="flex flex-col items-center justify-center">
            <Headline level="2" as="h2" className="text-center max-w-md mb-12">
              Za projektem stojí výzkumníci z Masarykovy univerzity
            </Headline>
            {/*<Link href="/tym">
                <Button smaller>Více o našem týmu</Button>
              </Link>*/}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center md:justify-end">
              <div className="bg-white p-3 md:p-0 relative md:-right-4 rounded-full w-[168px] aspect-square flex justify-center items-center shadow-[0px_5px_20px_0px_rgba(0,0,0,0.05)] z-10">
                <Image
                  src="/backers/eu.jpg"
                  alt="Financováno Ervropskou Unií"
                  className="mt-1"
                  width={110}
                  height={110}
                />
              </div>
              <div className="bg-[#0000DC] p-1 md:p-0 relative rounded-full w-[168px] aspect-square flex justify-center items-center shadow-[0px_5px_20px_0px_rgba(0,0,0,0.05)] z-20">
                <Image
                  src="/backers/muni.png"
                  alt="Jsme projekt Masarykovy Univerzity"
                  className=""
                  width={150}
                  height={150}
                />
              </div>
            </div>
            <p className="flex items-center w-full md:max-w-[380px] text-lg text-text">
              Projekt Veřejné knihovny jako místa podpory zaměstnanosti byl
              podpořen Evropskou unií v rámci Operačního programu
              <br />
              <br />
              CZ.03.03.01/00/22_021/0001969
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
