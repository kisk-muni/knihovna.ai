import classNames from "classnames";

export default function Roadmap({
  children,
  className,
  invert = false,
  secondary = false,
  smaller = false,
}: {
  children: React.ReactNode;
  className?: string | null;
  invert?: boolean;
  secondary?: boolean;
  smaller?: boolean;
}) {
  return (
    <button
      type="button"
      className={classNames(
        "focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-xl text-center mr-3 md:mr-0 transition duration-150 ease-out",
        {
          "text-white bg-primary hover:bg-primarydarker": !invert && !secondary,
          "text-text hover:text-text": !invert && secondary,
          "text-text bg-white hover:bg-sheet": invert && !secondary,
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
