import Container from "./ui/container";

export default function SectionHero() {
  return (
    <section className="relative">
      <Container>
        <div className="relative max-w-3xl mx-auto pt-20 pb-20 lg:pt-32">
          <div className="text-center">
            <div
              className={
                "mt-6 text-primary [&>h1]:leading-normal [&>h1]:text-5xl  2xl:[&>h1]:text-6xl 2xl:[&>h1]:leading-normal [&>h1]:font-extrabold [&>h1]:mb-6 [&>p]:mb-6 [&>p]:text-xl [&>p]:font-normal [&>p]:leading-relaxed [&>p]:text-text"
              }
            >
              <h1>
                Mapujeme budoucnost knihoven v éře{" "}
                <span className="text-text">umělé inteligence</span>.
              </h1>
              <p>
                Knihovny podle nás sehrají důležitou roli v popularizaci AI a
                pomoci ohroženým skupinám obyvatel. AI pro společnost nemá být
                ohrožením ale novou příležitostí.
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
