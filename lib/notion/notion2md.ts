import notion from "./notion";
import { NotionToMarkdown } from "notion-to-md";
const n2m = new NotionToMarkdown({ notionClient: notion });
export default n2m;
