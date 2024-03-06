"use client";
/* eslint-disable @next/next/no-img-element */
import { Link, LinkProps, composeRenderProps } from "react-aria-components";
import { focusRing } from "@/lib/focus-ring";
import { tv } from "tailwind-variants";

const avatar = tv({
  extend: focusRing,
  base: "h-6 w-6 -ml-1 bg-neutral-300 items-center justify-center flex text-[12px] text-text-600 rounded-full ring-1 ring-white overflow-hidden bo-underline disabled:cursor-default transition",
});

export default function Avatar({
  src,
  name,
  ...props
}: {
  src?: string | null;
  name: string;
} & LinkProps) {
  return (
    <Link
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        avatar({ ...renderProps, className })
      )}
    >
      {src ? <img src={src} alt={name} /> : name[0]}
    </Link>
  );
}
