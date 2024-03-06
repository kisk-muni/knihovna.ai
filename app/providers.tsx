"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SSRProvider } from "react-aria-components";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SSRProvider>{children}</SSRProvider>
    </NextUIProvider>
  );
}
