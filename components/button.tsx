import { cva, VariantProps } from "class-variance-authority";

const button = cva(
  [
    "button",
    "focus:ring-4",
    "focus:outline-none",
    "focus:ring-primary-300",
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
      },
      size: {
        small: ["text-base", "font-medium", "px-4", "py-2"],
        base: ["text-base", "font-semibold", "px-8", "py-4"],
        large: ["text-lg", "font-bold", "px-12", "py-4", "py-7"],
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
    ],
    defaultVariants: {
      theme: "primary",
      variant: "solid",
      size: "base",
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
  ...props
}) => (
  <button className={button({ theme, size, variant, className })} {...props} />
);
