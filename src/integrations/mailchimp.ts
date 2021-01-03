import SiteSailsClient from '../client';

export default class SiteSailsMailChimpIntegration {
  client: SiteSailsClient;

  constructor(client: SiteSailsClient) {
    this.client = client;
  }

  async subscribe(listId: string, email: string) {
    await this.client.fetch(`/integrations/mailchimp/subscribe`, null, {
      method: 'POST',
      body: {
        email,
        listId,
      },
    });
  }
}
