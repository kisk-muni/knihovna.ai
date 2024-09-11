import type { MDXComponents } from "mdx/types";
import { defaultComponents } from "./lib/mdx";
import RoadmapTimeline from "@/components/visualization/timeline/timeline";
import TimelinePhases from "@/components/visualization/timeline/timeline-phases";
import ResponsiveImage from "@/components/ui/responsive-image";
import PlaceholderComponent from "@/components/placeholder-component";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import ContactCard from "@/components/contact-card";
import Card from "@/components/ui/card";
import Bookmark from "@/components/ui/bookmark";
import Headline from "@/components/ui/headline";
import BackgroundGradient from "@/components/ui/background-gradient";
import { Callout } from "@/components/ui/callout";
import { Button } from "./components/ui/button";
import Affiliation from "./components/affiliation";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: ResponsiveImage,
    RoadmapTimeline: RoadmapTimeline,
    RoadmapPhases: TimelinePhases,
    Container: Container,
    Section: Section,
    Placeholder: PlaceholderComponent,
    ContactCard: ContactCard,
    Bookmark: Bookmark,
    Card: Card,
    Headline: Headline,
    BackgroundGradient: BackgroundGradient,
    BackgroundGradientRadial: BackgroundGradient.Radial,
    Affiliation: Affiliation,
    Callout: Callout,
    Button: Button,
  };
}
