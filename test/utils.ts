import { KeyValueResponseTransformation } from 'keyvalues/types';

export const stripForTest = (obj: any): any => {
  const newObj = { ...obj };
  delete newObj.createdAt;
  delete newObj.updatedAt;

  return newObj;
};

export type TransformedKeyValueTuple = [key: string, value: string];

export const transformFunction: KeyValueResponseTransformation<TransformedKeyValueTuple> = (
  response,
) => {
  return [response.key, response.value];
};
