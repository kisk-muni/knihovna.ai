import { cva, VariantProps } from "class-variance-authority";

const button = cva(["rounded-3xl", "transition", "duration-150", "ease-out"], {
  variants: {
    theme: {
      white: ["bg-white"],
      primary: [],
      gray: [],
    },
    variant: {
      solid: "",
      ghost: ["bg-transparent", "hover:bg-transparent"],
    },
    size: {
      base: [],
      sm: ["px-4", "py-4"],
      md: ["px-6", "py-8"],
    },
  },
  defaultVariants: {
    theme: "primary",
    variant: "solid",
    size: "base",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof button> {}

const Card: React.FC<CardProps> = ({
  className,
  theme,
  variant,
  size,
  ...props
}) => (
  <div className={button({ theme, size, variant, className })} {...props} />
);

export default Card;
