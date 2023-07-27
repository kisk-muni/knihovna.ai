import classNames from "classnames";
import Container from "./container";
import { Fragment } from "react";

export default function Section({
  children,
  hero,
  prose,
  title,
  className,
}: {
  children: React.ReactNode;
  hero?: boolean;
  prose?: boolean;
  title?: string;
  className?: string;
}) {
  return (
    <Fragment>
      {hero && (
        <div
          className="absolute md:-inset-x-[calc(100%)] top-0 h-[600px] -z-10 transform-gpu"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#FCF2E8] -z-10 to-[#ffffff]"></div>
        </div>
      )}
      <div
        className={classNames(
          "w-full max-w-3xl mx-auto px-6 lg:px-8 relative z-10",
          {
            "mt-16 pt-20 pb-16 md:pt-28 md:pb-20 text-center max-w-3xl flex flex-col justify-center items-center":
              hero,
            "pb-16": prose,
          },
          className
        )}
      >
        {title ? (
          <div className="uppercase mb-4 text-sm text-primary font-bold tracking-wider rounded-full px-4 py-2">
            {title}
          </div>
        ) : null}
        {children}
      </div>
    </Fragment>
  );
}
