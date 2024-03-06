import classNames from "classnames";

export function SidePanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-text-500 text-sm font-medium mb-1">{children}</div>
  );
}

export default function DashboardSidepanelLayout({
  content,
  contentClassName,
  sidebar,
  sidebarClassName,
}: {
  content: React.ReactNode;
  contentClassName?: string;
  sidebar: React.ReactNode;
  sidebarClassName?: string;
}) {
  return (
    <div className="grow h-full w-full flex">
      <div className={classNames("grow h-full", contentClassName)}>
        {content}
      </div>
      <div
        className={classNames(
          "h-full border-neutral-200 border-l shrink-0 w-auto min-w-[280px] md:max-w-[448px] px-2 md:flex pt-3 flex-col items-start fixed md:sticky top-[53px] z-10 hidden",
          sidebarClassName
        )}
      >
        {sidebar}
      </div>
    </div>
  );
}
