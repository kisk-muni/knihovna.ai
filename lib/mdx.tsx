import RoadmapTimeline from "@/components/visualization/roadmap/roadmap-timeline";
import RoadmapPhases from "@/components/visualization/roadmap/roadmap-phases";
import ResponsiveImage from "@/components/responsive-image";
import PlaceholderComponent from "@/components/placeholder-component";
import Container from "@/components/container";
import Section from "@/components/section";
import ContactCard from "@/components/contact-card";
import Card from "@/components/card";
import Bookmark from "@/components/bookmark";
import {
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
} from "@/components/headline";
import remarkGfm from "remark-gfm";
import { compileMDX } from "next-mdx-remote/rsc";

export const defaultComponents: any = {
  img: ResponsiveImage,
  RoadmapTimeline: RoadmapTimeline,
  RoadmapPhases: RoadmapPhases,
  Container: Container,
  Section: Section,
  Placeholder: PlaceholderComponent,
  ContactCard: ContactCard,
  Bookmark: Bookmark,
  h1: Headline1,
  h2: Headline2,
  h3: Headline3,
  h4: Headline4,
  h5: Headline5,
  h6: Headline6,
  Card: Card,
};

export async function compile(source: string) {
  return await compileMDX({
    options: {
      scope: {},
      mdxOptions: {
        rehypePlugins: [],
        remarkRehypeOptions: {
          footnoteLabel: "Reference",
          footnoteLabelTagName: "div",
          footnoteLabelProperties: {
            style: "display: none;",
          },
          footnoteBackLabel: "Zpět na referenci",
        },
        format: "mdx",
      },
      parseFrontmatter: false,
    },
    source,
    components: defaultComponents,
  });
}
