import SiteSailsClient from '../client';

import {
  Connection,
  ConnectionSearchParams,
  ConnectionAddParams,
  ConnectionResponseTransformation,
  ConnectionSearchResult,
} from './types';

export default class SiteSailsConnectionManager {
  client: SiteSailsClient;
  section: string;

  constructor(client: SiteSailsClient, section: string) {
    this.client = client;
    this.section = section;
  }

  async search<T = Connection>(
    params: ConnectionSearchParams,
    transformation?: ConnectionResponseTransformation<T>,
  ): Promise<ConnectionSearchResult<T>> {
    return this.client.fetch(`/connections/${this.section}`, params, {
      transformation,
      list: true,
    });
  }

  async add<T = Connection>(
    params?: ConnectionAddParams,
    transformation?: ConnectionResponseTransformation<T>,
  ): Promise<T> {
    return this.client.fetch(`/connections/${this.section}`, null, {
      method: 'POST',
      body: {
        nodeId: params.nodeId,
        data: JSON.stringify(params.data),
      },
      headers: {
        Authorization: `Bearer ${params.memberToken}`,
      },
      transformation,
    });
  }

  async remove(params?: ConnectionAddParams) {
    await this.client.fetch(`/connections/${this.section}`, null, {
      method: 'DELETE',
      body: {
        nodeId: params.nodeId,
      },
      headers: {
        Authorization: `Bearer ${params.memberToken}`,
      },
    });
  }
}
