import SiteSailsNodeManager from '../nodes';
import SiteSailsMemberManager from '../members';
import SiteSailsConnectionManager from '../connections';
import SiteSailsCollectionManager from '../collections';
import SiteSailsNotificationManager from '../notifications';
import SiteSailsStripeIntegration from '../integrations/stripe';
import SiteSailsMailChimpIntegration from '../integrations/mailchimp';

import { Configuration, FetchOptions } from './types';
import { siteSailsFetch } from './utils';

const DEFAULT_API_URL = 'https://api.sitesails.com/api/v1';

export default class SiteSailsClient {
  configuration: Configuration;

  constructor(configuration: Configuration) {
    this.configuration = {
      ...configuration,
      apiUrl: configuration.apiUrl || DEFAULT_API_URL,
    };
  }

  async fetch(routeUrl: string, params: any, options?: FetchOptions) {
    return siteSailsFetch(this.configuration, routeUrl, params, options);
  }

  nodes(section: string) {
    return new SiteSailsNodeManager(this, section);
  }

  connections(section: string) {
    return new SiteSailsConnectionManager(this, section);
  }

  collections(section: string, collectionSection: string) {
    return new SiteSailsCollectionManager(this, section, collectionSection);
  }

  members(memberToken?: string) {
    return new SiteSailsMemberManager(this, memberToken);
  }

  notifications() {
    return new SiteSailsNotificationManager(this);
  }

  integrations = {
    mailchimp: new SiteSailsMailChimpIntegration(this),
    stripe: new SiteSailsStripeIntegration(this),
  };
}
