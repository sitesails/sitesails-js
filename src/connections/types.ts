import { ResponseMeta } from '../types';

export type ConnectionCategory = {
  id: number;
  slug: string;
  name: string;
};

export type ConnectionImage = Record<string, string> & {
  id: number;
  url: string;
  smallUrl: string;
  mediumUrl: string;
};

export type Connection = {
  id: number;
  slug: string;
  data: any;
  category: ConnectionCategory | null;
  images: ConnectionImage[] | null;
  image: ConnectionImage | null;
  publishedFrom: Date | null;
  connections: any;
  connectionStats: any;
};

export type ConnectionSearchParams = {
  node: string | number;
  memberId?: number;
  lang?: string;
  verified?: boolean;
};

export type ConnectionAddParams = {
  memberToken: string;
  nodeId: number;
  lang?: string;
  data?: any;
};

export type ConnectionResponseTransformation<T> = (response: Connection) => T;

export type ConnectionSearchResult<T> = {
  data: T[];
  meta: ResponseMeta;
};
