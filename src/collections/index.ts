import SiteSailsClient from '../client';
import { Node } from '../types';

import {
  CollectionSearchParams,
  CollectionGetParams,
  CollectionResponseTransformation,
  CollectionSearchResult,
  CollectionNodeRanking,
  CollectionNodeRankingResponseTransformation,
  CollectionNodeRankingSearchResult,
} from './types';

export default class SiteSailsCollectionManager {
  client: SiteSailsClient;
  section: string;
  collectionSection: string;

  constructor(
    client: SiteSailsClient,
    section: string,
    collectionSection: string,
  ) {
    this.client = client;
    this.section = section;
    this.collectionSection = collectionSection;
  }

  async search<T = Node>(
    params: CollectionSearchParams,
    transformation?: CollectionResponseTransformation<T>,
  ): Promise<CollectionSearchResult<T>> {
    return this.client.fetch(
      `/collections/${this.section}/${this.collectionSection}`,
      params,
      {
        transformation,
        list: true,
      },
    );
  }

  async get<T = Node>(
    id: number | string,
    params?: CollectionGetParams,
    transformation?: CollectionResponseTransformation<T>,
  ): Promise<T> {
    return this.client.fetch(
      `/collections/${this.section}/${this.collectionSection}/${id}`,
      params,
      {
        transformation,
      },
    );
  }

  async searchNodeRankings<T = CollectionNodeRanking>(
    nodeId: string | number,
    params: CollectionSearchParams,
    transformation?: CollectionNodeRankingResponseTransformation<T>,
  ): Promise<CollectionNodeRankingSearchResult<T>> {
    return this.client.fetch(
      `/collections/${this.section}/${this.collectionSection}/rankings/${nodeId}`,
      params,
      {
        transformation,
        list: true,
      },
    );
  }
}
