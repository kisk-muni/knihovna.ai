"use client";
import { ProgressBar, type ProgressBarProps } from "react-aria-components";

export default function CircularStatus({
  svgClassName,
  ...props
}: { svgClassName: string } & ProgressBarProps) {
  let center = 16;
  let strokeWidth = 4;
  let r = 16 - strokeWidth;
  let c = 2 * r * Math.PI;
  return (
    <ProgressBar {...props}>
      {({ percentage }) => (
        <>
          <svg
            className={svgClassName}
            viewBox="0 0 32 32"
            fill="none"
            strokeWidth={strokeWidth}
          >
            <circle cx={center} cy={center} r={r} className="stroke-text/10" />
            <circle
              cx={center}
              cy={center}
              r={r}
              className="stroke-text/60"
              strokeDasharray={`${c} ${c}`}
              strokeDashoffset={c - ((percentage || 0) / 100) * c}
              strokeLinecap="round"
              transform="rotate(-90 16 16)"
            />
          </svg>
        </>
      )}
    </ProgressBar>
  );
}
