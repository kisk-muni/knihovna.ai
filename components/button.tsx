import classNames from "classnames";

export default function Button({
  children,
  className,
  invert = false,
}: {
  children: React.ReactNode;
  className?: string | null;
  invert?: boolean;
}) {
  return (
    <button
      type="button"
      className={classNames(
        "focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-xl text-sm px-7 py-6 text-center mr-3 md:mr-0 transition duration-150 ease-out",
        {
          "text-white bg-primary-400 hover:bg-primary-600": !invert,
          "text-black bg-primary-50 hover:bg-primary-200": invert,
        },
        className
      )}
    >
      {children}
    </button>
  );
}
