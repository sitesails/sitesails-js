import { ResponseMeta } from 'types';

export type KeyValueSearchParams = {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
};

export type KeyValue = {
  key: string;
  value: string;
};

export type KeyValueResponseTransformation<T> = (response: KeyValue) => T;

export type KeyValueSearchResult<T> = {
  data: T[];
  meta: ResponseMeta;
};
