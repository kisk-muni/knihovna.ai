/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { IconExternalLink, IconPlus } from "./ui/icons";
import classNames from "classnames";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Affiliation({ prose = false }: { prose?: boolean }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div>
          <div className="flex justify-start flex-wrap gap-3 items-center w-full">
            <div className="bg-[#0000DC] p-1 md:p-0 relative h-[72px] rounded-xl flex justify-center items-center border border-neutral-200 z-20">
              <Image
                src="/backers/muni.png"
                alt="Jsme projekt Masarykovy Univerzity"
                className="mx-2"
                width={136}
                height={136}
              />
            </div>
            <IconPlus className="h-6 w-8 text-text-200" />
            <div className="p-3 bg-text-900 md:p-0 relative h-[72px] rounded-xl flex justify-center items-center border border-neutral-200 z-10">
              <Image
                src="/backers/kisk.svg"
                alt="Katedra informačních studií a knihovnictví"
                className="mx-2"
                width={204}
                height={60}
              />
            </div>
            <IconPlus className="h-6 w-6 text-text-200 " />
            <div className="bg-white p-3 md:p-0 relative h-[72px] w-auto rounded-xl flex justify-center items-center border-2 border-neutral-200 z-10">
              <Image
                src="/backers/logo-mpsv-op-zam.png"
                alt="Financováno Ervropskou Unií"
                width={400}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="gap-8 mt-6">
        <p
          className={classNames("flex items-center w-full md:max-w-lg", {
            "text-lg text-text": !prose,
          })}
        >
          Projekt Veřejné knihovny jako místa podpory zaměstnanosti byl podpořen
          Evropskou unií v rámci Operačního programu Zaměstnanost plus
          (CZ.03.03.01/00/22_021/0001969).
        </p>
        <div className="mt-6 grid lg:flex lg:flex-row gap-4 grid-cols-1 md:grid-cols-[1fr,1fr] grid-rows-[repeat(2,1fr)]">
          <Link href="/shrnuti" className="shrink-0">
            <Button
              theme="gray"
              size="small"
              className="items-center justify-between lg:justify-center w-full"
            >
              Shrnutí projektu
              <IconExternalLink className="h-5 w-5 shrink-0 ml-1" />
            </Button>
          </Link>
          <Link href="/poznatky" className="shrink-0">
            <Button
              theme="gray"
              size="small"
              className="items-center justify-between lg:justify-center w-full"
            >
              Co jsme zjistili a co jsme se naučili
              <IconExternalLink className="h-5 w-5 shrink-0 ml-1" />
            </Button>
          </Link>
          <Link href="/zprava" className="shrink-0">
            <Button
              theme="gray"
              size="small"
              className="items-center justify-between lg:justify-center w-full"
            >
              Zpráva
              <IconExternalLink className="h-5 w-5 shrink-0 ml-1" />
            </Button>
          </Link>
          <Link href="/manual" className="shrink-0">
            <Button
              theme="gray"
              size="small"
              className="items-center justify-between lg:justify-center w-full"
            >
              Manuál pro knihovny
              <IconExternalLink className="h-5 w-5 shrink-0 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
