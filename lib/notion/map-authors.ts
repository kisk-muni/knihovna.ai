import siteConfig from "@/site-config";
import { People } from "./schema";

export function mapAuthors(people: People) {
  const authorIds = people.people.map((author) => author.id) || [];
  return siteConfig.team.filter((member) =>
    authorIds.includes(member?.notionId || "")
  );
}
