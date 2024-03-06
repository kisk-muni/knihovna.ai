import { composeTailwindRenderProps, focusRing } from "@/lib/focus-ring";
import React from "react";
import {
  composeRenderProps,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxProps as AriaListBoxProps,
  ListBoxItemProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

export const itemStyles = tv({
  extend: focusRing,
  base: "group relative flex items-center gap-2 cursor-default select-none py-1.5 px-2.5 will-change-transform text-sm forced-color-adjust-none",
  variants: {
    isSelected: {
      false:
        "text-text-900  hover:bg-neutral-100 -outline-offset-2",
      true: "bg-primary-400 text-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] [&:has(+[data-selected])]:rounded-b-none [&+[data-selected]]:rounded-t-none -outline-offset-4 outline-white dark:outline-white forced-colors:outline-[HighlightText]",
    },
    isDisabled: {
      true: "text-text-300 forced-colors:text-[GrayText]",
    },
  },
});

export function ListBoxItem(props: ListBoxItemProps) {
  let textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined);
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={itemStyles}>
      {composeRenderProps(props.children, (children) => (
        <>
          {children}
        </>
      ))}
    </AriaListBoxItem>
  );
}

interface ListBoxProps<T> extends Omit<AriaListBoxProps<T>, "layout"> {}

export function ListBox<T extends object>({
  children,
  ...props
}: ListBoxProps<T>) {
  return (
    <AriaListBox
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "outline-0 p-1 border border-neutral-300 dark:border-neutral-600 rounded-lg"
      )}
    >
      {children}
    </AriaListBox>
  );
}
