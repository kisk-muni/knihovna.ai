"use client";
import Tracker from "@/tracker";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function TrackerComponent() {
  if (typeof window !== "undefined" && !Tracker.initiated) {
    // if localstorage has key "env" set to "dev", set dev mode
    const env = localStorage.getItem("env");
    console.log("env", env);
    Tracker.init("knihovna-ai-site", env === "dev", false);
  }

  const pathname = usePathname();

  useEffect(() => {
    Tracker.send("pageview");
  }, [pathname]);

  return null;
}
