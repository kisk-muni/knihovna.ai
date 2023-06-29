import classNames from "classnames";

export default function Button({
  children,
  className,
  invert = false,
  smaller = false,
}: {
  children: React.ReactNode;
  className?: string | null;
  invert?: boolean;
  smaller?: boolean;
}) {
  return (
    <button
      type="button"
      className={classNames(
        "focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-xl text-center mr-3 md:mr-0 transition duration-150 ease-out",
        {
          "text-white bg-primary hover:bg-primarydarker": !invert,
          "text-black bg-white hover:bg-sheet": invert,
          "text-base px-8 py-4": smaller,
          "text-lg px-12 py-4": !smaller,
        },
        className
      )}
    >
      {children}
    </button>
  );
}
