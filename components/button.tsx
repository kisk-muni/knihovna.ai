import { cva, VariantProps } from "class-variance-authority";

const button = cva(
  [
    "flex",
    "focus:ring-2",
    "focus:outline-none",
    "focus:ring-primary/50",
    "font-bold",
    "rounded-xl",
    "text-center",
    "transition",
    "duration-150",
    "ease-out",
  ],
  {
    variants: {
      theme: {
        primary: [],
        gray: [],
        white: [
          "text-text",
          "bg-white",
          "hover:text-text/95",
          "hover:bg-sheet",
        ],
      },
      variant: {
        solid: "",
        ghost: ["bg-transparent", "hover:bg-transparent"],
        pagination: [
          "flex-col",
          "bg-transparent",
          "hover:bg-transparent",
          "border border-text/20",
          "hover:border-text/50",
          "ring-0",
          "focus:ring-0",
        ],
      },
      size: {
        none: [],
        small: ["text-base", "font-medium"],
        base: ["text-base", "font-semibold"],
        large: ["text-lg", "font-bold"],
      },
      align: {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
      },
    },
    compoundVariants: [
      {
        theme: "primary",
        variant: "solid",
        className: "text-white bg-primary hover:bg-primarydarker",
      },
      {
        theme: "primary",
        variant: "ghost",
        className: "text-primary hover:text-primarydarker",
      },
      {
        theme: "gray",
        variant: "solid",
        className: [
          "text-text",
          "hover:text-black",
          "bg-text/20",
          "hover:bg-text/50",
        ],
      },
      {
        theme: "gray",
        variant: "ghost",
        className: ["text-text", "hover:text-text/80"],
      },
      {
        variant: ["solid", "ghost"],
        size: ["small"],
        className: ["px-4", "py-2"],
      },
      {
        variant: ["solid", "ghost"],
        size: ["base"],
        className: ["px-8", "py-4"],
      },
      {
        variant: ["solid", "ghost"],
        size: ["large"],
        className: ["px-12", "py-7"],
      },
      {
        variant: "pagination",
        size: "base",
        className: ["text-text", "gap-1", "px-6", "py-4"],
      },
    ],
    defaultVariants: {
      theme: "primary",
      variant: "solid",
      size: "base",
      align: "center",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  theme,
  variant,
  size,
  align,
  ...props
}) => (
  <button
    className={button({ theme, size, align, variant, className })}
    {...props}
  />
);
