import { CheckCircleIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";

export const SprintIcon = ({
  isActive = false,
  isPast = false,
  className,
}: {
  isActive: boolean;
  isPast: boolean;
  className?: string;
}) => {
  if (isActive) {
    return <PlayCircleIcon className={classNames("text-primary", className)} />;
  }
  if (!isActive && isPast) {
    return (
      <CheckCircleIcon
        className={classNames("-mt-0.5 relative text-text/50", className)}
      />
    );
  }
  return null;
};
