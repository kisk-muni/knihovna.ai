import siteConfig from "@/site-config";
import { Metadata } from "next";

export function createMetadata(metadata: {
  title: string;
  description: string;
  ogTitle?: string;
}): Metadata {
  const ogImage = `/og?title=${
    metadata.ogTitle ? metadata.ogTitle : metadata.title
  }`;
  return {
    title: `${metadata.title} | ${siteConfig.title}`,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      siteName: siteConfig.title,
      images: [
        {
          url: ogImage,
        },
      ],
      authors: siteConfig.team.map((member) => member.name),
    },
    twitter: {
      card: "summary_large_image",
      description: metadata.description,
      images: [
        {
          url: ogImage,
        },
      ],
    },
  };
}
