import { cva, VariantProps } from "class-variance-authority";

const button = cva(
  [
    "flex",
    "focus:ring-2",
    "focus:outline-none",
    "focus:ring-primary/50",
    "font-bold",
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
        "dark-gray": [],
        white: [
          "text-text",
          "bg-white",
          "hover:text-text/95",
          "hover:bg-sheet",
        ],
      },
      variant: {
        solid: "",
        link: "",
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
        small: ["text-base", "font-medium", "rounded-lg"],
        base: ["text-base", "font-semibold", "rounded-2xl"],
        large: ["text-lg", "font-bold", "rounded-2xl"],
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
        className: "text-white bg-primary hover:bg-primary-500",
      },
      {
        theme: "primary",
        variant: ["ghost", "link"],
        className: "text-primary hover:text-primary-500",
      },
      {
        theme: "gray",
        variant: "solid",
        className: [
          "text-text",
          "bg-text/20",
          "hover:bg-text/50",
          "hover:text-text-50",
        ],
      },
      {
        theme: "dark-gray",
        variant: "solid",
        size: "small",
        className: [
          "text-white",
          "hover:text-white",
          "bg-neutral-600",
          "hover:bg-neutral-700",
          "shadow-sm",
          "font-normal",
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
        className: ["px-3", "py-1.5"],
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
