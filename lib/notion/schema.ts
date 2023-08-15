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

export type Relation = {
  id: string;
  type: "relation";
  relation: { id: string }[];
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

export type HandbookSchema = {
  Order: Number;
  Title: Title;
  Description: RichText;
  Slug: RichText;
};

export type TodoSchema = {
  "Story Points": Select<"1" | "2" | "3" | "5" | "8">;
  "Parent item": Relation;
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
  Sprint: Relation;
  Dates: Dates;
  "Sub-item": Relation;
  Blocking: Relation;
  Status: Status;
  "Blocked by": Relation;
  Private: Checkbox;
  Assignee: People;
  Name: Title;
};

export type RoadmapSchema = {
  Name: Title;
  Dates: Dates;
  Type: Select<"Theme" | "Epic">;
  Status: Status;
  Theme: Relation;
  Epic: Relation;
  "To-dos": Relation;
};
