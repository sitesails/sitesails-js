import { ss } from './api-setup';
import { KeyValue, KeyValueSearchResult } from '../src/keyvalues/types';
import { TransformedKeyValueTuple, transformFunction } from './utils';
import { toIncludeSearchStringInKeyValue } from './setupTests';
import { keyValueSearchResponse } from './fixtures';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toIncludeSearchStringInKeyValue(expected: string): R;
    }
  }
}

expect.extend({
  toIncludeSearchStringInKeyValue,
});

const store = 'redirect';

describe('KeyValues search method', () => {
  it('should return all keyvalue pairs from the specified store', async () => {
    const { data } = await ss.keyvalues(store).search();

    expect(data).toHaveLength(3);
  });

  it('should return response that matches the default search result type', async () => {
    const res = await ss.keyvalues(store).search();

    expect(res).toMatchShapeOf(keyValueSearchResponse);
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
