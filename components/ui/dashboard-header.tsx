import classNames from "classnames";

export default function DashboardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="py-2 px-8 bg-background z-30 border-b sticky top-[53px] width-full">
      <div className={classNames("space-x-2 flex", className)}>{children}</div>
    </div>
  );
}
