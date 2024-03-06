import classNames from "classnames";

export default function DashboardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="py-2 px-6 bg-background z-30 border-b border-neutral-200 sticky top-[48px] width-full">
      <div className={classNames("flex", className)}>{children}</div>
    </div>
  );
}
