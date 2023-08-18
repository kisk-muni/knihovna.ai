import { type } from "os";

export type Title = {
  title: {
    plain_text: string;
  }[];
};

export type Dates = {
  date: {
    start: string;
    end: string;
    time_zone: string | null;
  };
};

export type RichText = {
  id: string;
  type: "rich_text";
  rich_text: {
    type: "text";
    text: {
      content: string;
      link: null | any;
    };
    annotations: any;
    plain_text: string;
    href: null;
  }[];
};
export type Number = {
  id: string;
  type: "number";
  number: number;
};

export type User = {
  object: "user";
  id: string;
  name: string;
  avatar_url: string;
  type: "person";
  person: {};
};

export type People = {
  id: string;
  type: "people";
  people: User[];
};

export type Checkbox = {
  id: string;
  type: "checkbox";
  checkbox: boolean;
};

export type Status = {
  id: string;
  type: "status";
  status: {
    id: string;
    name: "Backlog" | "Not Started" | "In Progress" | "Review" | "Done";
    color: string;
  };
};

export type URL = {
  id: string;
  type: "url";
  url: string;
};

export type Select<T> = {
  id: string;
  type: "select";
  select: {
    id: string;
    name: T;
    color: string;
  };
};

export type MultiSelect<T> = {
  id: string;
  type: "multi_select";
  multi_select: {
    id: string;
    name: T;
    color: string;
  }[];
};

export type Relation<T> = {
  id: string;
  type: "relation";
  relation: { id: string }[];
  items?: QueryResultWithMarkdownContents<T>[];
  has_more: boolean;
};

export type QueryResult<Properties> = {
  id: string;
  url: string;
  public_url: string;
  properties: Properties;
};

export type QueryResultWithMarkdownContents<Properties> =
  QueryResult<Properties> & {
    markdownContents?: string;
  };

export type MaterialsSchema = {
  Name: Title;
  Description: RichText;
  Labels: MultiSelect<string>;
  Type: Select<
    | "App"
    | "Book"
    | "Article"
    | "Video"
    | "Podcast"
    | "Course"
    | "Research Paper"
    | "Institution"
    | "Best Practices"
  >;
  Image: any;
  URL: URL;
  Chapter: Relation<DocsSchema>;
  "Is Project Output": Checkbox;
  Featured: Checkbox;
};

export type DocsSchema = {
  Order: Number;
  Title: Title;
  Description: RichText;
  Slug: RichText;
  State: Select<"Draft" | "Published">;
  "Recommended Materials": Relation<MaterialsSchema>;
  "Sub-pages": Relation<DocsSchema>;
  "Parent page": Relation<DocsSchema>;
};

export type TodoSchema = {
  "Story Points": Select<"1" | "2" | "3" | "5" | "8">;
  "Parent item": Relation<TodoSchema>;
  Category: MultiSelect<
    | "Web"
    | "Výzkum"
    | "Spolupráce"
    | "Komunikace"
    | "Dokumentace"
    | "Interní"
    | "/Terén"
    | "/Rešerše"
  >;
  // Sprint: Relation;
  Dates: Dates;
  "Sub-item": Relation<TodoSchema>;
  // Blocking: Relation;
  Status: Status;
  // "Blocked by": Relation;
  Private: Checkbox;
  Assignee: People;
  Name: Title;
};

export type RoadmapSchema = {
  Name: Title;
  Dates: Dates;
  Type: Select<"Theme" | "Epic">;
  Status: Status;
  Theme: Relation<RoadmapSchema>;
  Epic: Relation<RoadmapSchema>;
  "To-dos": Relation<TodoSchema>;
};
