import FrameworkLogo from "./framework-logo";
import { FrameworkHeaderActions } from "./framework-header-actions";
import { Suspense } from "react";

export default function FrameworkHeader({ id }: { id: string }) {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b border-neutral-200 shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <FrameworkLogo />
      <Suspense
        fallback={
          <div className="flex-1 ml-4 h-3 rounded-md shrink-0 animate-pulse bg-zinc-200 dark:bg-zinc-800" />
        }
      >
        <FrameworkHeaderActions id={id} />
      </Suspense>
    </div>
  );
}
