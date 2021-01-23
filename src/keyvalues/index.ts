// TODO
import SiteSailsClient from '../client';

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
    const res = await this.client.fetch('/keyvalues', {});
    return res;
  }
}
