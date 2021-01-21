export type NodeCategory = {
  id: number;
  slug: string;
  name: string;
};

export type NodeImage = {
  id: number;
  url: string;
  smallUrl: string;
  mediumUrl: string;
};

export type NodeEvent = {
  occurences: Date[];
};

export type Node = {
  id: number;
  slug: string;
  data: any;
  category: NodeCategory | null;
  images: NodeImage[] | null;
  image: NodeImage | null;
  publishedFrom: Date | null;
  connections: any;
  connectionStats: any;
  event: NodeEvent;
  // TODO ADDED LANGUAGE ID? TO BE ABLE TO ACCESS LANGUAGE IN THE TESTS
  languageId?: string;
};

export type ResponseMeta = {
  pageNumber: number;
  pageSize: number;
  totalRows: number;
  totalPages: number;
};
