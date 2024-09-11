/* eslint-disable @next/next/no-img-element */
import Container from "@/components/ui/container";
/* eslint-disable react/no-unescaped-entities */
import Headline from "@/components/ui/headline";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TypeformButton from "./ui/typeform-button";
import siteConfig from "@/site-config";
import Link from "next/link";

export default function SectionEngage() {
  const contactPerson = siteConfig.team.find((member) => member.id == "kacova");
  return (
    <section id="zapojeni" className="pt-12 pb-24">
      <Container>
        <div className="flex flex-col gap-x-6">
          <Headline level="2" as="h2" className="max-w-sm mb-10">
            Jak se zapojit?
          </Headline>

          <div className="grid md:grid-cols-5 gap-x-6 gap-y-6">
            <Card
              size="md"
              className="md:col-span-2 bg-primary text-center flex py-10 px-10 flex-col items-center justify-center"
            >
              <div className="max-w-lg mb-6 flex flex-col items-center">
                <p className="mb-4 text-3xl font-bold text-white">
                  Sledujte projektové novinky
                </p>
                <p className="text-sheet text-lg font-semibold">
                  Odběrem novinek budete informováni o aktuálním dění v projektu
                  a nových výstupech. 
                </p>
              </div>
              <div className="flex justify-start">
                <TypeformButton id="ZkIhUqLK">
                  <Button theme="white" size="base">
                    Odebírat novinky
                  </Button>
                </TypeformButton>
              </div>
            </Card>
            <Card
              size="md"
              className="md:col-span-3 bg-sheet text-center flex py-10 px-10 flex-col items-center justify-center"
            >
              <div className="max-w-lg mb-6 flex flex-col items-center">
                <p className="w-86 mb-4 text-3xl font-bold text-text">
                  Máte zájem o konzultaci nebo spolupráci?
                </p>
                <p className="text-text text-lg font-semibold">
                  V případě zájmu o konzultování či zprostředkování výzkumných
                  dat se prosím ozvěte kontaktní osobě:
                </p>
              </div>
              {contactPerson && (
                <div className="flex items-center gap-x-3 text-left">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={contactPerson.avatar}
                    alt={contactPerson.name}
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-tight tracking-tight text-text">
                      {contactPerson.academicPrefix} {contactPerson.name}{" "}
                      <span className="text-text-600 font-normal">
                        ({contactPerson.description})
                      </span>
                    </h3>
                    <p className="text-base leading-6 text-text-600 hover:text-text">
                      <Link href={`mailto:${contactPerson.email}`}>
                        {contactPerson.email}
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
