"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "react-aria-components";
import { useFramework } from "../lib/hooks/use-framework";
import { urlName } from "@/framework";

export default function DebugPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") || "cs") as "cs" | "en";
  const { id, mode, answerAll, questions } = useFramework();

  const setAll = (value: boolean | null | "random") => {
    answerAll(value);
    if (!pathname.includes("vysledky"))
      router.push(
        `/${urlName}/${id}/${questions.length}/${
          lang !== "cs" ? `?lang=${lang}` : ""
        }`
      );
  };

  if (mode === "dev")
    return (
      <div className="sticky bottom-2 left-2 bg-text text-white text-base rounded-lg w-[600px] p-2 font-mono shadow-lg z-100">
        <p className="mb-2 font-bold">{mode.toUpperCase()} panel</p>
        <div className="flex space-x-2">
          <Button
            className="border border-text-300 px-1 hover:bg-text-500 rounded-md"
            onPress={() => setAll(null)}
          >
            Skip all
          </Button>
          <Button
            className="border border-text-300 px-1 hover:bg-text-500 rounded-md"
            onPress={() => setAll(true)}
          >
            All true
          </Button>
          <Button
            className="border border-text-300 px-1 hover:bg-text-500 rounded-md"
            onPress={() => setAll(false)}
          >
            All false
          </Button>
          <Button
            className="border border-text-300 px-1 hover:bg-text-500 rounded-md"
            onPress={() => setAll("random")}
          >
            Random answers
          </Button>
        </div>
      </div>
    );
}
