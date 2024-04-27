import classNames from "classnames";
import {
  Popover,
  Select,
  SelectProps,
  SelectValue,
  Button,
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
} from "react-aria-components";

export default function FrameworkSelectAnswer<A extends {}>(
  props: SelectProps<A>
) {
  return (
    <div className="p-8 sm:h-[250px] rounded-lg flex justify-center">
      <Select
        defaultSelectedKey="skip"
        className="flex flex-col gap-1 w-[200px]"
        {...props}
      >
        <Button className="flex items-center cursor-default rounded-lg border-0 bg-white bg-opacity-90 pressed:bg-opacity-100 transition text-base text-left leading-normal shadow-md text-gray-700 focus:outline-none focus-visible:ring-2 ring-white ring-offset-2 ring-offset-rose-700">
          <SelectValue className="flex-1 truncate placeholder-shown:italic" />
        </Button>
        <Popover className="max-h-60 w-[--trigger-width] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out">
          <ListBox className="outline-none">
            <StatusItem key="yes">Ano</StatusItem>
            <StatusItem key="no">Ne</StatusItem>
            <StatusItem key="skip">Přeskočeno</StatusItem>
          </ListBox>
        </Popover>
      </Select>
    </div>
  );
}

function StatusItem(props: ListBoxItemProps & { children: React.ReactNode }) {
  return (
    <ListBoxItem
      {...props}
      className={
        "group flex items-center gap-2 cursor-default select-none outline-none rounded text-neutral-900 focus:bg-primary-600 focus:text-white"
      }
    >
      {({ isSelected }) => (
        <>
          <span
            className={classNames(
              "flex-1 text-text text-sm flex items-center gap-2 truncate py-2 px-4 font-normal group-selected:font-medium",
              {
                "bg-neutral-200 text-text hover:bg-neutral-300": isSelected,
                "text-text hover:bg-neutral-50": !isSelected,
              }
            )}
          >
            {props.children}
          </span>
        </>
      )}
    </ListBoxItem>
  );
}
