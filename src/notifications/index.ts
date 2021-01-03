import FormData from 'form-data';

import SiteSailsClient from '../client';

export default class SiteSailsNotificationManager {
  client: SiteSailsClient;

  constructor(client: SiteSailsClient) {
    this.client = client;
  }

  async sendNotification(email: string, name: string, message: string) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('apiKey', this.client.configuration.publicApiKey);

    await this.client.fetch(`/contact`, null, {
      method: 'POST',
      formData,
    });
  }
}
