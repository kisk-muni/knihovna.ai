import classNames from "classnames";
import {
  IconCheckCircle,
  IconCheckCircleFilled,
  IconCircle,
  IconCircleDashed,
  IconCircleDot,
  IconCircleHalf,
  IconMinusCircle,
} from "./icons";

export const TodoIcon = ({
  state,
  className,
  colorful,
}: {
  state: string;
  className?: string;
  colorful?: boolean;
}) => {
  const cs = classNames(className, {
    "text-text-400": state === "backlog" && colorful,
    "text-emerald-600": state === "done" && colorful,
    "text-yellow-500": state === "in-progress" && colorful,
    "text-orange-500": state === "review" && colorful,
    "text-text-600": state === "not-started" && colorful,
  });
  if (state === "backlog") {
    return <IconCircleDashed className={cs} />;
  }
  if (state === "not-started") {
    return <IconCircle className={cs} />;
  }
  if (state === "in-progress") {
    return <IconCircleDot className={cs} />;
  }
  if (state === "review") {
    return <IconCircleHalf className={cs} />;
  }
  if (state === "done") {
    return <IconCheckCircleFilled className={cs} />;
  }
  if (state === "cancelled") {
    return <IconMinusCircle className={classNames("rotate-45", cs)} />;
  }
  return <IconCircleDashed className={cs} />;
};
