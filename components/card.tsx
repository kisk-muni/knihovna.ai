import classNames from "classnames";

export default function Button({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string | null;
}) {
  return (
    <div className={classNames("rounded-2xl px-6 py-8", className)}>
      {children}
    </div>
  );
}
