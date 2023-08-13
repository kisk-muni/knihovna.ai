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
