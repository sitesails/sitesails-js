import { ResponseMeta, Node } from '../types';

export type CollectionItem = {
  id: number;
  nodeId: number;
  nodeName: string;
  nodeSlug: string;
  node: Node;
};

export type Collection = Node & { collectionItems: CollectionItem[] };

export type CollectionSearchParams = {
  pageNumber?: number;
  pageSize?: number;
  lang?: string;
  search?: string;
  sortBy?: string;
  sortDirection?: string;
  filters?: any;
  collectionItemNode?: string | number;
};

export type CollectionGetParams = {
  lang?: string;
};

export type CollectionResponseTransformation<T> = (response: Collection) => T;

export type CollectionSearchResult<T> = {
  data: T[];
  meta: ResponseMeta;
};

export type CollectionNodeRankingSearchResult<T> = {
  data: T[];
  meta: ResponseMeta;
};

export type CollectionNodeRanking = {
  collectionNodeId: number;
  collectionNodeSlug: string;
  collectionNodeName: string;
  position: number;
};

export type CollectionNodeRankingResponseTransformation<T> = (
  response: CollectionNodeRanking,
) => T;
