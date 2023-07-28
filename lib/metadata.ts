import siteConfig from "@/site-config";
import { Metadata } from "next";

export function createMetadata(metadata: {
  title: string;
  description: string;
  ogTitle?: string;
}): Metadata {
  return {
    title: `${metadata.title} | ${siteConfig.title}`,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      siteName: siteConfig.title,
      images: [
        {
          url: `/og?title=${
            metadata.ogTitle ? metadata.ogTitle : metadata.title
          }`,
        },
      ],
      authors: siteConfig.team.map((member) => member.name),
    },
  };
}
