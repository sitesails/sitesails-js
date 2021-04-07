import SiteSailsClient from '../client';

import { Node } from '../types';
import {
  NodeGetParams,
  NodeResponseTransformation,
  NodeSearchParams,
  NodeSearchResult,
} from './types';

export default class SiteSailsNodeManager {
  client: SiteSailsClient;
  section: string;

  constructor(client: SiteSailsClient, section: string) {
    this.client = client;
    this.section = section;
  }

  async search<T = Node>(
    params: NodeSearchParams,
    transformation?: NodeResponseTransformation<T>,
  ): Promise<NodeSearchResult<T>> {
    return this.client.fetch(`/nodes/${this.section}`, params, {
      transformation,
      list: true,
    });
  }

  async get<T = Node>(
    id: number | string,
    params?: NodeGetParams,
    transformation?: NodeResponseTransformation<T>,
  ): Promise<T> {
    return this.client.fetch(
      `/nodes/${this.section}/${encodeURIComponent(id)}`,
      params,
      {
        transformation,
      },
    );
  }

  async categories<T = Node>(
    params: NodeSearchParams,
    transformation?: NodeResponseTransformation<T>,
  ): Promise<NodeSearchResult<T>> {
    return this.client.fetch(`/nodes/${this.section}/categories`, params, {
      transformation,
      list: true,
    });
  }

  async category<T = Node>(
    id: number | string,
    params?: NodeGetParams,
    transformation?: NodeResponseTransformation<T>,
  ): Promise<T> {
    return this.client.fetch(
      `/nodes/${this.section}/categories/${id}`,
      params,
      {
        transformation,
      },
    );
  }
}
