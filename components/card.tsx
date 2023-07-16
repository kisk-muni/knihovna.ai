import classNames from "classnames";

export default function Button({
  children,
  className,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string | null;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={classNames(
        "rounded-2xl",
        {
          "px-6 py-8": size === "md",
          "px-4 py-4": size === "sm",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
