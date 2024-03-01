import type { MDXComponents } from "mdx/types";
import { defaultComponents } from "./lib/mdx";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
  };
}
