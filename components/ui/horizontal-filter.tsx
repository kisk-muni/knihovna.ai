"use client";
import classNames from "classnames";
import { ListBox, ListBoxItem } from "react-aria-components";
import { ListBoxProps } from "react-aria-components";

export default function HorizontalFilter<
  T extends { icon?: any; label: string; id: string }
>(props: ListBoxProps<T>) {
  return (
    <ListBox
      {...props}
      orientation="horizontal"
      className="flex bg-sheet rounded-lg p-0.5 space-x-0.5 mt-px overflow-hidden"
    >
      {(item) => (
        <ListBoxItem
          className={({ isFocusVisible, isSelected, isFocused }) =>
            classNames(
              "px-2 items-center flex py-1 leading-normal rounded-lg text-sm hover:cursor-pointer",
              {
                "bg-text-700 text-white": isSelected,
                "bg-sheet text-text hover:text-text": !isSelected,
                "outline-0": isFocused,
                "outline-primarydarker": isFocusVisible,
              }
            )
          }
        >
          {item?.icon ? item.icon : item.label}
        </ListBoxItem>
      )}
    </ListBox>
  );
}
