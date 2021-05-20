export type NodeCategory = {
  id: number;
  slug: string;
  name: string;
};

export type NodeImage = Record<string, string> & {
  id: number;
  original: string;
};

export type NodeEvent = {
  dateFrom: Date;
  dateTo?: Date;
  recurringWeekDay?: number;
  recurringDay?: number;
  weekdayOccurrence?: number;
  occurences: Date[];
};

export type NodeProduct = {
  price: number;
  currency: string;
  quantity: number;
  sold: number;
  stripeLiveId?: string;
  stripeTestId?: string;
};

export type NodePublishable = {
  isPublished: boolean;
  publishedFrom?: Date | null;
  publishedTo?: Date | null;
};

export type Node = {
  id: number;
  slug: string;
  slugs: Record<string, string>;
  languageId: string;
  data: any;
  category: NodeCategory | null;
  images: NodeImage[] | null;
  image: NodeImage | null;
  publishable?: NodePublishable;
  connections: any;
  connectionStats: any;
  event: NodeEvent;
  product: NodeProduct;
};

export type ResponseMeta = {
  pageNumber: number;
  pageSize: number;
  totalRows: number;
  totalPages: number;
};
