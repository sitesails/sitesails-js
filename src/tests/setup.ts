import { NodeSearchParams } from 'nodes/types';
import SiteSails from '../index';

const ss = new SiteSails({
  apiUrl: 'https://api.sitesails.com/api/v1',
  // TODOD admin COPIED FROM CGH
  adminApiKey: '0fe40734-ae13-4eee-9782-df342c203bda',
  publicApiKey: '66461de9-b081-43ed-87c4-7fa098829251',
});

export const fetchProducts = async (params: NodeSearchParams = {}) => {
  // TODO TEMP SEARCH PARAMS IF I NEED SOME
  const res = await ss.nodes('products').search(params);

  return res;
};

export const fetchCategories = async (
  section: string,
  params: NodeSearchParams = {}
) => {
  const res = await ss.nodes(section).categories(params);
  return res;
};
