import SiteSailsClient from '../client';
import {
  KeyValue,
  KeyValueResponseTransformation,
  KeyValueSearchParams,
  KeyValueSearchResult,
} from './types';

export default class SiteSailsKeyValueManager {
  client: SiteSailsClient;
  store: string;

  constructor(client: SiteSailsClient, store: string) {
    this.client = client;
    this.store = store;
  }

  async search<T = KeyValue>(
    params?: KeyValueSearchParams,
    transformation?: KeyValueResponseTransformation<T>,
  ): Promise<KeyValueSearchResult<T>> {
    const res = await this.client.fetch(`/keyvalues/${this.store}`, params, {
      transformation,
      // TODO REMOVE HEADERS
      headers: {
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyOSIsImdyb3Vwc2lkIjoiMTkiLCJlbWFpbCI6ImUyZS10ZXN0LWpzLWFkbWluQHNpdGVzYWlscy5jb20iLCJyb2xlIjoiYWRtaW4iLCJuYmYiOjE2MTE0MDI0MDAsImV4cCI6MTY0MjkzODQwMCwiaWF0IjoxNjExNDAyNDAwfQ.GMHM-FfP6F8Ed0LlVeV8X6DYCzVe7FM0xV4Cm8KQQ7s'}`,
      },
      list: true,
    });

    return res;
  }

  async get<T = KeyValue>(
    key: string,
    transformation?: KeyValueResponseTransformation<T>,
  ): Promise<T> {
    const res = await this.client.fetch(
      `/keyvalues/${this.store}/${key}`,
      null,
      {
        transformation,
        // TODO REMOVE HEADERS
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyOSIsImdyb3Vwc2lkIjoiMTkiLCJlbWFpbCI6ImUyZS10ZXN0LWpzLWFkbWluQHNpdGVzYWlscy5jb20iLCJyb2xlIjoiYWRtaW4iLCJuYmYiOjE2MTE0MDI0MDAsImV4cCI6MTY0MjkzODQwMCwiaWF0IjoxNjExNDAyNDAwfQ.GMHM-FfP6F8Ed0LlVeV8X6DYCzVe7FM0xV4Cm8KQQ7s'}`,
        },
      },
    );

    return res;
  }

  async set(key: string, value: string): Promise<KeyValue> {
    const res = await this.client.fetch(
      `/keyvalues/${this.store}/${key}`,
      null,
      {
        method: 'post',
        // TODO REMOVE HEADERS
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyOSIsImdyb3Vwc2lkIjoiMTkiLCJlbWFpbCI6ImUyZS10ZXN0LWpzLWFkbWluQHNpdGVzYWlscy5jb20iLCJyb2xlIjoiYWRtaW4iLCJuYmYiOjE2MTE0MDI0MDAsImV4cCI6MTY0MjkzODQwMCwiaWF0IjoxNjExNDAyNDAwfQ.GMHM-FfP6F8Ed0LlVeV8X6DYCzVe7FM0xV4Cm8KQQ7s'}`,
        },
        body: { value },
      },
    );

    return res;
  }

  async delete(key: string): Promise<KeyValue> {
    const res = await this.client.fetch(
      `/keyvalues/${this.store}/${key}`,
      null,
      {
        method: 'delete',
        // TODO REMOVE HEADERS
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyOSIsImdyb3Vwc2lkIjoiMTkiLCJlbWFpbCI6ImUyZS10ZXN0LWpzLWFkbWluQHNpdGVzYWlscy5jb20iLCJyb2xlIjoiYWRtaW4iLCJuYmYiOjE2MTE0MDI0MDAsImV4cCI6MTY0MjkzODQwMCwiaWF0IjoxNjExNDAyNDAwfQ.GMHM-FfP6F8Ed0LlVeV8X6DYCzVe7FM0xV4Cm8KQQ7s'}`,
        },
      },
    );

    return res;
  }
}
