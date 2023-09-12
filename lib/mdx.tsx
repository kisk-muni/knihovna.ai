import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import siteConfig, { TeamMember } from "@/site-config";
import RoadmapTimeline from "@/components/visualization/roadmap/roadmap-timeline";
import RoadmapPhases from "@/components/visualization/roadmap/roadmap-phases";
import ResponsiveImage from "@/components/responsive-image";
import PlaceholderComponent from "@/components/placeholder-component";
import Container from "@/components/container";
import Section from "@/components/section";
import ContactCard from "@/components/contact-card";

export type PostMeta = {
  slug: string;
  publishedAt: Date;
  title: string;
  authors: TeamMember[];
  summary: string;
};

export type Post = {
  meta: PostMeta;
  content: any;
};

const rootDirectory = path.join(process.cwd(), "content");

export const getPostBySlug = async (slug: string, type: "blog" | "pages") => {
  const realSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(rootDirectory, type, `${realSlug}.mdx`);

  const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

  const { frontmatter, content } = await compileMDX({
    source: fileContent,
    options: { parseFrontmatter: true },
  });

  const authors = (frontmatter.authors as unknown as string)
    .split(",")
    .map((author) => author.trim());

  return {
    meta: {
      ...frontmatter,
      publishedAt: new Date(frontmatter?.publishedAt as string),
      slug: realSlug,
      authors: siteConfig.team.filter((member) => authors.includes(member.id)),
    },
    content: fileContent,
  } as unknown as Post;
};

export const getAllPostsMeta = async (type: "blog" | "pages") => {
  const files = fs.readdirSync(path.join(rootDirectory, type));

  let posts = [];

  for (const file of files) {
    const { meta } = await getPostBySlug(file, type);
    posts.push(meta);
  }

  return posts.sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
  );
};

export const getPageContent = async (slug: string, type: "blog" | "pages") => {
  const { meta, content } = await getPostBySlug(slug, type);
  return { meta, content };
};

export const components: any = {
  img: ResponsiveImage,
  RoadmapTimeline: RoadmapTimeline,
  RoadmapPhases: RoadmapPhases,
  Container: Container,
  Section: Section,
  Placeholder: PlaceholderComponent,
  ContactCard: ContactCard,
};
