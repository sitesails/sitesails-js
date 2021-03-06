import { ResponseMeta, Node } from '../types';

export type NodeInclude =
  | 'unpublished'
  | 'content'
  | 'contents'
  | 'images'
  | 'onlytranslated'
  | 'linkednodes';

export type NodeSearchParams = {
  category?: string | number;
  pageNumber?: number;
  pageSize?: number;
  lang?: string;
  connections?: string;
  connectionStats?: string;
  connectionsFor?: number;
  connectedBy?: string;
  search?: string;
  sortBy?: string;
  sortDirection?: string;
  filters?: any;
  include?: NodeInclude[];
};

export type NodeGetParams = {
  lang?: string;
  connections?: string;
  connectionStats?: string;
  connectionsFor?: number;
};

export type NodeResponseTransformation<T> = (response: Node) => T;

export type NodeSearchResult<T> = {
  data: T[];
  meta: ResponseMeta;
};
