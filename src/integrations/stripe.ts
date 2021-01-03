import SiteSailsClient from '../client';

export type StripeCreateSessionParams = {
  sectionId: number;
  successUrl: string;
  cancelUrl: string;
  priceId: string;
  email: string;
  nodeId: number;
  firstName: string;
  lastName: string;
};

export default class SiteSailsStripeIntegration {
  client: SiteSailsClient;

  constructor(client: SiteSailsClient) {
    this.client = client;
  }

  async createSession(
    params: StripeCreateSessionParams,
    isProduction: boolean,
  ): Promise<string | null> {
    const urlParams = {
      sectionId: params.sectionId,
      isProduction,
    };

    const body = {
      successUrl: params.successUrl,
      cancelUrl: params.cancelUrl,
      items: [{ price: params.priceId, quantity: 1 }],
      metadata: {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        productIds: params.nodeId.toString(),
      },
    };

    const res = await this.client.fetch(
      `/integrations/stripe/create-session`,
      urlParams,
      {
        method: 'POST',
        body,
      },
    );

    return res?.id;
  }
}
