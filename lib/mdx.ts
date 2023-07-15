import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import siteConfig, { TeamMember } from "@/site-config";

const rootDirectory = path.join(process.cwd(), "content");

export const getPostBySlug = async (slug: string) => {
  const realSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`);

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
    content,
  } as unknown as {
    meta: {
      slug: string;
      publishedAt: Date;
      title: string;
      authors: TeamMember[];
      summary: string;
    };
    content: any;
  };
};

export const getAllPostsMeta = async () => {
  const files = fs.readdirSync(rootDirectory);

  let posts = [];

  for (const file of files) {
    const { meta } = await getPostBySlug(file);
    posts.push(meta);
  }

  return posts;
};
