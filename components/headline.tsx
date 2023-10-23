import classNames from "classnames";
import slugify from "slugify";

export default function Headline({
  children,
  className,
  level,
  as,
  id,
}: {
  children: React.ReactNode;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  level: "1" | "2" | "3" | "4" | "5" | "6" | "ultra";
  className?: string | null;
  id?: string;
}) {
  const props = {
    id: id ? id : (typeof children === "string" && slugify(children)) || "",
    className: classNames(
      "text-text mb-6 font-bold tracking-tight scroll-mt-20 leading-tight md:leading-tight",
      {
        "md:text-5xl text-4xl font-extrabold ": level === "ultra",
        "md:text-4xl text-3xl": level === "1",
        "md:text-3xl text-2xl": level === "2",
        "md:text-2xl text-xl": level === "3",
        "md:text-xl text-lg": level === "4",
        "md:text-lg text-base": level === "5",
        "md:text-base text-sm": level === "6",
      },
      className
    ),
  };
  switch (as) {
    case "h1":
      return <h1 {...props}>{children}</h1>;
    case "h2":
      return <h2 {...props}>{children}</h2>;
    case "h3":
      return <h3 {...props}>{children}</h3>;
    case "h4":
      return <h4 {...props}>{children}</h4>;
    case "h5":
      return <h5 {...props}>{children}</h5>;
    case "h6":
      return <h6 {...props}>{children}</h6>;
  }
}

export const Headline1 = ({ children }: { children: string }) => (
  <Headline level="1" as="h1">
    {children}
  </Headline>
);

export const Headline2 = ({ children }: { children: string }) => (
  <Headline level="2" as="h2">
    {children}
  </Headline>
);

export const Headline3 = ({ children }: { children: string }) => (
  <Headline level="3" as="h3">
    {children}
  </Headline>
);

export const Headline4 = ({ children }: { children: string }) => (
  <Headline level="4" as="h4">
    {children}
  </Headline>
);

export const Headline5 = ({ children }: { children: string }) => (
  <Headline level="5" as="h5">
    {children}
  </Headline>
);

export const Headline6 = ({ children }: { children: string }) => (
  <Headline level="6" as="h6">
    {children}
  </Headline>
);
