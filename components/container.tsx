import classNames from "classnames";

export default function Container({
  children,
  fullWidth,
  className,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        "w-full mx-auto px-6 lg:px-8 relative z-10",
        {
          "max-w-screen-2xl": fullWidth,
          "mx-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg": !fullWidth,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
