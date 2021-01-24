import { toMatchShapeOf, toMatchOneOf } from 'jest-to-match-shape-of';

import SiteSailsClient from '../client';
import {
  KeyValue,
  KeyValueResponseTransformation,
  KeyValueSearchResult,
} from './types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toIncludeSearchStringInKeyValue(expected: string): R;
    }
  }
}

const ss = new SiteSailsClient({
  apiUrl: 'https://api.sitesails.com/api/v1',
  adminApiKey: 'b5ca746b-d81f-43c5-b52b-3168c13d9fa0',
  publicApiKey: '66461de9-b081-43ed-87c4-7fa098829251',
  // debug: true,
});

// TODO WILL NEED ADMIN KEY HERE INSTEAD OF USING TOKEN IN METHODS

const toIncludeSearchStringInKeyValue: jest.CustomMatcher = (
  received: KeyValue,
  expected: string,
) => {
  if (typeof expected !== 'string') {
    throw new Error('Expected searchString to be a string!');
  }

  if (received.key.includes(expected) || received.value.includes(expected))
    return {
      pass: true,
      message: () => `Search results expected to contain '${expected}'`,
    };

  return {
    pass: false,
    message: () => `Search results expected to contain '${expected}':
    result: 
    {
      key: ${received.key}
      value: ${received.value}
    }
    `,
  };
};

expect.extend({
  toMatchShapeOf,
  toMatchOneOf,
  toIncludeSearchStringInKeyValue,
});

const store = 'redirect';
type TransformedKeyValueTuple = [key: string, value: string];
const transformFunction: KeyValueResponseTransformation<TransformedKeyValueTuple> = (
  response,
) => {
  return [response.key, response.value];
};

describe('KeyValues search method', () => {
  it('should return all keyvalue pairs from the specified store', async () => {
    const { data } = await ss.keyvalues(store).search();

    expect(data).toHaveLength(3);
  });

  it('should return response that matches the default search result type', async () => {
    const expectedResponseShape: KeyValueSearchResult<KeyValue> = {
      data: [
        {
          key: 'one',
          value: 'less',
        },
      ],
      meta: { pageNumber: 1, pageSize: 20, totalRows: 3, totalPages: 1 },
    };

    const res = await ss.keyvalues(store).search();

    expect(res).toMatchShapeOf(expectedResponseShape);
  });

  it('should return response that matches transformed type when transform function is provided', async () => {
    const expectedTransformedShape: KeyValueSearchResult<TransformedKeyValueTuple> = {
      data: [['one', 'less']],
      meta: { pageNumber: 1, pageSize: 20, totalRows: 3, totalPages: 1 },
    };

    const res = await ss
      .keyvalues(store)
      .search<TransformedKeyValueTuple>(null, transformFunction);

    expect(res).toMatchShapeOf(expectedTransformedShape);
  });

  it('should return specified number of results per page', async () => {
    const expectedNumberOfResults = 1;

    const { data } = await ss
      .keyvalues(store)
      .search({ pageSize: expectedNumberOfResults });

    expect(data).toHaveLength(expectedNumberOfResults);
  });

  it('should return specified results page', async () => {
    const expectedResultsPage = 2;
    const numberOfResults = 1;

    const { meta } = await ss
      .keyvalues(store)
      .search({ pageSize: numberOfResults, pageNumber: expectedResultsPage });

    expect(meta.pageNumber).toBe(expectedResultsPage);
  });

  it('should return all entries where either key or value contains specified value string', async () => {
    const expectedSearchString = 'one';

    const { data } = await ss
      .keyvalues(store)
      .search({ search: expectedSearchString });

    data.forEach((result) => {
      expect(result).toIncludeSearchStringInKeyValue(expectedSearchString);
    });
  });
});

describe('KeyValue get method', () => {
  const expectedKeyValueObject: KeyValue = {
    key: 'another',
    value: 'another-one',
  };

  it('should return correct value for a specified key', async () => {
    const res = await ss.keyvalues(store).get(expectedKeyValueObject.key);

    expect(res.value).toBe(expectedKeyValueObject.value);
  });

  it('should return an object of correct shape', async () => {
    const res = await ss.keyvalues(store).get(expectedKeyValueObject.key);

    expect(res).toMatchShapeOf(expectedKeyValueObject);
  });

  it('should return a correctly transformed response when transform function is provided ', async () => {
    const expectedTransformedResponse: TransformedKeyValueTuple = [
      'another',
      'another-one',
    ];

    const res = await ss
      .keyvalues(store)
      .get(expectedKeyValueObject.key, transformFunction);

    expect(res).toEqual(expectedTransformedResponse);
  });
});

describe('KeyValue set method', () => {
  it('should update value of an existing key', async () => {
    const existingKey = 'one';
    const newValue = 'more';

    const res = await ss.keyvalues(store).set(existingKey, newValue);

    expect(res.value).toBe(newValue);
  });

  it('should add a new keyvalue pair if provided key does not exist', async () => {
    const newKeyValue: KeyValue = {
      key: 'two',
      value: 'more',
    };

    const res = await ss
      .keyvalues(store)
      .set(newKeyValue.key, newKeyValue.value);

    expect(res).toMatchObject(newKeyValue);
  });
});

describe('KeyValue delete method', () => {
  it('should delete an existing keyvalue entry when called', async () => {
    const deletedKeyValue: KeyValue = {
      key: 'two',
      value: 'more',
    };

    await ss.keyvalues(store).delete(deletedKeyValue.key);

    const { data: allKeyValuesResponse } = await ss.keyvalues(store).search();

    allKeyValuesResponse.forEach((keyValue) => {
      expect(keyValue.key).not.toBe('two');
    });
  });
});
