import classNames from "classnames";
import type { ProgressBarProps } from "react-aria-components";
import { ProgressBar } from "react-aria-components";

interface MyProgressBarProps extends ProgressBarProps {
  condition: "healthy" | "warning" | "critical";
  label?: string;
}

export default function CircularProgressBar({
  condition,
  label,
  ...props
}: MyProgressBarProps) {
  let center = 16;
  let strokeWidth = 3.5;
  let r = 16 - strokeWidth;
  let c = 2 * r * Math.PI;

  return (
    <ProgressBar {...props}>
      {({ percentage, valueText }) => (
        <>
          <svg
            width={72}
            height={72}
            viewBox="0 0 32 32"
            fill="none"
            strokeWidth={strokeWidth}
          >
            <circle
              role="presentation"
              cx={center}
              cy={center}
              r={r}
              strokeDasharray={`${c} ${c}`}
              className="stroke-neutral-100"
            />
            <circle
              role="presentation"
              cx={center}
              cy={center}
              r={r}
              className={classNames({
                "stroke-green-500": condition === "healthy",
                "stroke-rose-500": condition === "critical",
                "stroke-orange-400": condition === "warning",
              })}
              strokeDasharray={`${c} ${c}`}
              strokeDashoffset={c - ((percentage || 0) / 100) * c}
              strokeLinecap="round"
              transform="rotate(-90 16 16)"
            />
            <text
              role="presentation"
              x={center}
              y={center + 3}
              fontSize={9}
              textAnchor="middle"
              className="fill-text font-medium"
            >
              {percentage?.toFixed(0)}
            </text>
          </svg>
        </>
      )}
    </ProgressBar>
  );
}
