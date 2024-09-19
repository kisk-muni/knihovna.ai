import Container from "@/components/ui/container";
/* eslint-disable react/no-unescaped-entities */
import Headline from "@/components/ui/headline";
import Card from "@/components/ui/card";
import {
  FaceSmileIcon,
  FunnelIcon,
  MapIcon,
  SquaresPlusIcon,
  ViewfinderCircleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import facilitationScenariosImage from "@/public/tools/facilitacni-scenare.png";
import experientialProgramme from "@/public/tools/zazitkovka.png";
import framework from "@/public/tools/framework.png";
import {
  IconChatCircle,
  IconChecks,
  IconLight,
  IconSquaresFour,
  IconUsersThree,
} from "./ui/icons";

export default function SectionToolsPromo() {
  return (
    <section className="bg-white pt-12">
      <Container>
        <div className="flex flex-col gap-x-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-[1fr,1fr]">
            <Link
              href="/facilitacni-scenare"
              className="group grow md:row-span-1 md:col-span-1"
            >
              <Card
                size="md"
                className="bg-slate-50 h-full group-hover:bg-slate-100 border border-border flex flex-col justify-start"
              >
                <div className="flex gap-x-2 items-center mb-3">
                  <div className="rounded-full bg-white p-2 w-fit">
                    <IconLight className="w-5 h-5 text-slate-500" />
                  </div>
                  <p className="text-slate-500 mt-0 mb-0 text-base uppercase">
                    Otevření diskuze o AI
                  </p>
                </div>
                <div className="text-lg md:text-xl xl:text-2xl font-medium mb-4">
                  <strong className="text-text font-bold">
                    Mluvte o obavách, bariérách i příležitostech ve vašem týmu.
                  </strong>{" "}
                  <p className="inline text-text-400">
                    Pomocí sady Facilitačních scénářů veďte diskuze o AI ve vaší
                    knihovně konstruktivně a produktivně.
                  </p>
                </div>
                <div className="grow flex items-center">
                  <Image
                    src={facilitationScenariosImage}
                    draggable="false"
                    alt="Facilitační scénáře"
                  />
                </div>
              </Card>
            </Link>
            <Link
              href="/zazitkova-hra"
              className="group grow md:row-span-1 md:col-span-1"
            >
              <Card
                size="md"
                className="bg-slate-50 h-full border border-border flex flex-col justify-start"
              >
                <div className="flex gap-x-2 w-full items-center mb-3">
                  <div className="rounded-full bg-white p-2 w-fit">
                    <IconUsersThree className="w-5 h-5 text-slate-500" />
                  </div>
                  <p className="text-slate-500 mt-0 mb-0 text-base uppercase">
                    Pochopení potřeb uživatelů
                  </p>
                  <span className="ml-auto self-center py-0.5 -mt-1 px-2 flex w-max grow-0 rounded-full text-sm font-medium bg-emerald-500 text-white">
                    Nově přidáno
                  </span>
                </div>
                <div className="text-lg md:text-xl xl:text-2xl font-medium mb-4">
                  <strong className="text-text font-bold">
                    Připravte se na celospolečenské změny.
                  </strong>{" "}
                  <p className="inline text-text-400">
                    Zážitková hra pro knihovny i veřejnost vám pomůže na vlastní
                    kůži pochopit nové potřeby vznikající v důsledku AI.
                  </p>
                </div>
                <div className="grow flex items-center">
                  <Image
                    src={experientialProgramme}
                    draggable="false"
                    alt="Zážitkovka"
                  />
                </div>
              </Card>
            </Link>
            <Link
              href="/evaluace"
              className="group grow md:row-span-1 md:col-span-2"
            >
              <Card
                size="md"
                className="bg-primary-100 h-full min-h-[500px] xl:min-h-[400px] overflow-hidden relative group-hover:bg-primary-200 border border-border flex flex-col justify-start"
              >
                <div className="relative z-30">
                  <div className="flex gap-x-2 items-center mb-3">
                    <div className="rounded-full bg-white p-2 w-fit">
                      <IconChecks className="w-5 h-5 text-text-500" />
                    </div>
                    <p className="text-text-500 mt-0 mb-0 text-base uppercase">
                      Sebe-hodnocení knihovny
                    </p>
                  </div>
                  <div className="text-lg md:text-xl xl:text-2xl font-medium mb-4 max-w-xl">
                    <strong className="text-text font-bold">
                      Vyhodnoťte připravenost knihovny na rostoucí vliv AI.
                    </strong>{" "}
                    <p className="inline text-text-500">
                      Odpovězte na sérii otázek o vaší knihovně a okamžitě
                      získejte základní vyhodnocení  a doporučení, na co se
                      v knihovně zaměřit.
                    </p>
                  </div>
                </div>
                <div className="absolute xl:left-1/2 xl:right-0 xl:bottom-0 xl:top-10 z-20 xl:bg-gradient-to-br from-[#ffffff00] to-[#f7e8dd66] group-hover:to-[#edcfbb99] transition duration-150 ease-out"></div>
                <div>
                  <div className="absolute xs:left-10 xs:right-10 z-10 xl:-right-[45%] xl:-bottom-[15%] xl:top-10">
                    <Image
                      src={framework}
                      draggable="false"
                      width={1150}
                      alt="Evaluační framework"
                    />
                  </div>
                </div>
              </Card>
            </Link>
            <Link
              href="https://chat.knihovna.ai/"
              className="group grow md:row-span-1 md:col-span-1"
            >
              <Card
                size="md"
                className="bg-slate-50 h-full group-hover:bg-slate-100 border border-border flex flex-col justify-start"
              >
                <div className="flex gap-x-2 items-center mb-3">
                  <div className="rounded-full bg-white p-2 w-fit">
                    <IconChatCircle className="w-5 h-5 text-slate-500" />
                  </div>
                  <p className="text-slate-500 mt-0 mb-0 text-base uppercase">
                    Experimentální Chatbot
                  </p>
                </div>
                <div className="text-lg md:text-xl xl:text-2xl font-medium mb-4">
                  <strong className="text-text font-bold">
                    Zjednodušte si práci a experimentujte s AI chatbotem.
                  </strong>{" "}
                  <p className="inline text-text-400">
                    S pomocí ChatBota pro knihovníky objevujte, v čem všem vám
                    umělá inteligence může pomáhat.
                  </p>
                </div>
                <div></div>
              </Card>
            </Link>
            <Link
              href="/materialy/rozcestnik"
              className="group grow md:row-span-1 md:col-span-1"
            >
              <Card
                size="md"
                className="bg-slate-50 h-full group-hover:bg-slate-100 border border-border flex flex-col justify-start"
              >
                <div className="flex gap-x-2 items-center mb-3">
                  <div className="rounded-full bg-white p-2 w-fit">
                    <IconSquaresFour className="w-5 h-5 text-slate-500" />
                  </div>
                  <p className="text-slate-500 mt-0 mb-0 text-base uppercase">
                    Užitečné materiály
                  </p>
                </div>
                <div className="text-lg md:text-xl xl:text-2xl font-medium mb-4">
                  <strong className="text-text font-bold">
                    Prozkoumejte zajímavé zdroje a materiály k tématu AI.
                  </strong>{" "}
                  <p className="inline text-text-400">
                    V rozcestníku zdrojů najdete námi ověřené zdroje, pro ty,
                    kteří v této oblasti zatím tápou.
                  </p>
                </div>
                <div></div>
              </Card>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
