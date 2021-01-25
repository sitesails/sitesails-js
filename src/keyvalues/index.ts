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
      list: true,
      admin: true,
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
        admin: true,
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
        body: { value },
        admin: true,
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
        admin: true,
      },
    );

    return res;
  }
}
