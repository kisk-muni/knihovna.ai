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
              <Headline
                as="h1"
                level="1"
                className="leading-relaxed md:leading-relaxed"
              >
                Věříme, že knihovny hrají v době umělé inteligence důležitou
                roli
              </Headline>
              <p className="text-lg text-gray-600">
                Veřejné knihovny podle nás mají potenciál na to, aby podporovaly
                dospělé při průchodu dalšími vlnami digitální transformace práce
                – zejména pak ty pracující, které nástup nové technologie může
                ohrozit či znevýhodnit oproti ostatním.
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
