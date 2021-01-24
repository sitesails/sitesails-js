import { toMatchShapeOf } from 'jest-to-match-shape-of';
import SiteSailsClient from '../client';
import { KeyValue, KeyValueSearchResult } from './types';

const ss = new SiteSailsClient({
  apiUrl: 'https://api.sitesails.com/api/v1',
  adminApiKey: 'b5ca746b-d81f-43c5-b52b-3168c13d9fa0',
  publicApiKey: '66461de9-b081-43ed-87c4-7fa098829251',
  // debug: true,
});

const store = 'redirect';

// TODO WILL NEED ADMIN KEY HERE
// TODO BEFORE GET ADMIN KEY, USE UI ADMIN TOKEN IN EACH REQUEST

expect.extend({
  toMatchShapeOf,
});

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

  // SEARCH RESULTS COME TRANSFORMED AS PER SPECIFIED TYPE
  it('should return response that matches transformed type when transform function is provided', async () => {
    type TransformedKeyValueTuple = [key: string, value: string];
    const expectedTransformedShape: KeyValueSearchResult<TransformedKeyValueTuple> = {
      data: [['one', 'less']],
      meta: { pageNumber: 1, pageSize: 20, totalRows: 3, totalPages: 1 },
    };
    const transformFunction = (
      response: KeyValue,
    ): TransformedKeyValueTuple => {
      return [response.key, response.value];
    };

    const res = await ss.keyvalues(store).search(null, transformFunction);

    expect(res).toMatchShapeOf(expectedTransformedShape);
  });

  // need to specify return type on the method
  // SEARCH PER PAGE
  // SEARH PAGE NR
  // SEARCH STRING SEARCH
});
