// TODO
import SiteSailsClient from '../client';
import {
  KeyValue,
  KeyValueResponseTransformation,
  KeyValueSearchParams,
  KeyValueSearchResult,
} from './types';

// TODO CREATE CLASS FOR KEY VALUE

export default class SiteSailsKeyValueManager {
  client: SiteSailsClient;
  store: string;

  constructor(client: SiteSailsClient, store: string) {
    this.client = client;
    this.store = store;
  }
  // TODO TEST FOW NOW // NEED RETURN TYPE TOO
  async testAllStores() {
    const res = await this.client.fetch(
      // '/keyvalues/redirect/test',
      // { value: 'three' },

      '/keyvalues/redirect/',
      {
        // search: 'one',
        pageSize: 1,
        pageNumber: 3,
      },
      {
        method: 'get',
        // method: 'post',
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyOSIsImdyb3Vwc2lkIjoiMTkiLCJlbWFpbCI6ImUyZS10ZXN0LWpzLWFkbWluQHNpdGVzYWlscy5jb20iLCJyb2xlIjoiYWRtaW4iLCJuYmYiOjE2MTE0MDI0MDAsImV4cCI6MTY0MjkzODQwMCwiaWF0IjoxNjExNDAyNDAwfQ.GMHM-FfP6F8Ed0LlVeV8X6DYCzVe7FM0xV4Cm8KQQ7s'}`,
        },
        // body: {
        //   value: 'less',
        // },
      },
    );
    return res;
  }

  async search<T = KeyValue>(
    params?: KeyValueSearchParams,
    transformation?: KeyValueResponseTransformation<T>,
  ): Promise<KeyValueSearchResult<T>> {
    const res = await this.client.fetch(`/keyvalues/${this.store}`, params, {
      transformation,
      headers: {
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyOSIsImdyb3Vwc2lkIjoiMTkiLCJlbWFpbCI6ImUyZS10ZXN0LWpzLWFkbWluQHNpdGVzYWlscy5jb20iLCJyb2xlIjoiYWRtaW4iLCJuYmYiOjE2MTE0MDI0MDAsImV4cCI6MTY0MjkzODQwMCwiaWF0IjoxNjExNDAyNDAwfQ.GMHM-FfP6F8Ed0LlVeV8X6DYCzVe7FM0xV4Cm8KQQ7s'}`,
      },
      list: true,
    });

    return res;
  }
}
