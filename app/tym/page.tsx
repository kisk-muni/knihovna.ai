import Headline from "@/components/headline";
import siteConfig from "@/site-config";

/* eslint-disable @next/next/no-img-element */
export default function AboutPage() {
  return (
    <main>
      <div className="pt-24 sm:pt-32 pb-40">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mt-6">
              <h1 className="mt-6 text-text leading-normal text-5xl font-extrabold mb-6">
                Věříme, že knihovny budou hrát v době{" "}
                <span className="text-primary">umělé inteligence</span>{" "}
                důležitou roli.
              </h1>
              <p className="text-xl text-text mb-6">
                Hledáme potenciál knihoven v rozvoji a podpoře dospělých při
                průchodu další vlnou digitální transformace.
              </p>
              <p className="text-xl text-text mb-6">
                Jsme tým mladých lidí z katedry Informačních studií a
                knihovnictví na Filozofické fakultě Masarykovy univerzity.
                Spojuje nás zvídavost a zájem o technologické a sociální výzvy
                současného světa.
              </p>
            </div>
          </div>
          <div className="mt-24 max-w-2xl">
            <Headline as="h2" level="3">
              Poznejte náš tým
            </Headline>
          </div>
          <ul
            role="list"
            className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-y-10 xl:col-span-2"
          >
            {siteConfig.team.map((member, i) => (
              <li key={i}>
                <div className="flex items-center gap-x-3">
                  <img
                    className="h-20 w-20 rounded-full"
                    src={member.avatar}
                    alt=""
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-tight tracking-tight text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-sm leading-6 text-gray-600">
                      {member.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
