import Card from "./ui/card";
import Container from "./ui/container";
import Headline from "./ui/headline";

export default function SectionVision() {
  return (
    <section className="bg-white pt-12 lg:pt-20 pb-0">
      <Container>
        <div className="flex flex-col gap-x-6">
          <Headline level="2" as="h2" className="max-w-md mb-10">
            Naší vizí je knihovna, která ...
          </Headline>
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-4">
            <Card
              size="md"
              className="bg-[url('/bg-1.png')] bg-cover bg-no-repeat flex flex-col border-[1px] border-text/20 px-10 md:aspect-45/39 justify-center text-center"
            >
              <p className="text-base md:text-xl text-text font-bold">
                Zpřístupňuje nové technologie komunitám.
              </p>
            </Card>
            <Card
              size="md"
              className="bg-[url('/bg-2.png')] bg-cover bg-no-repeat flex flex-col border-[1px] border-text/20 px-10 md:aspect-45/39 justify-center text-center"
            >
              <p className="text-base md:text-xl text-text font-bold">
                Nabízí celoživotní vzdělávání pro široké skupiny lidí.
              </p>
            </Card>
            <Card
              size="md"
              className="bg-[url('/bg-3.png')] bg-cover bg-no-repeat flex flex-col border-[1px] border-text/20 px-10 md:aspect-45/39 justify-center text-center"
            >
              <p className="text-base md:text-xl text-text font-bold">
                Pomáhá jako přístupný bod sociální záchranné sítě.
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
