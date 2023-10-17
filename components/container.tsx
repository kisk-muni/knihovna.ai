import classNames from "classnames";

export default function Container({
  children,
  fullWidth,
  size = "max",
  className,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg" | "prose" | "max" | "full";
  className?: string;
}) {
  return (
    <div
      className={classNames(
        "w-full mx-auto px-6 lg:px-8 relative z-10",
        {
          "max-w-3xl": size == "prose",
          "max-w-full": fullWidth || size == "full",
          "md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl":
            size == "max" && !fullWidth,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
