import siteConfig from "@/site-config";
import { Metadata } from "next";

export function createMetadata(metadata: {
  title: string;
  description: string;
}): Metadata {
  return {
    title: `${metadata.title} | ${siteConfig.title}`,
    description: metadata.description,
  };
}
