import { MemberLoginParams } from 'members/types';
import { NodeGetParams, NodeSearchParams } from 'nodes/types';
import SiteSails, { MemberRegistrationParams } from '../index';

const ss = new SiteSails({
  apiUrl: 'https://api.sitesails.com/api/v1',
  // TODOD admin COPIED FROM CGH
  // adminApiKey: '0fe40734-ae13-4eee-9782-df342c203bda',
  adminApiKey: null,
  publicApiKey: '66461de9-b081-43ed-87c4-7fa098829251',
});

// NODES
export const fetchNodes = async (params: NodeSearchParams = {}) => {
  const res = await ss.nodes('products').search(params);

  return res;
};
export const getNode = async (id: string, params: NodeGetParams = {}) => {
  const res = await ss.nodes('products').get(id, params);

  return res;
};

export const fetchNodeCategories = async (
  section: string,
  params: NodeSearchParams = {},
) => {
  const res = await ss.nodes(section).categories(params);
  return res;
};

export const getNodeCategory = async (
  section: string,
  category: string,
  params: NodeGetParams = {},
) => {
  const res = await ss.nodes(section).category(category, params);

  return res;
};

// MEMBERS

// TODO CREATE A MEMBER
export const registerMember = async (
  registerDetails: MemberRegistrationParams,
) => {
  const res = await ss.members().register(registerDetails);

  return res;
};

// TODO LOGIN MEMBER

export const loginMember = async (loginDetails: MemberLoginParams) => {
  const res = await ss.members().login(loginDetails);
  console.log('login res', res);
  return res;
};
// TODO LOGOUT MEMBER
// THERE IS NO LOGOUT

// TODO MEMBER SOCIAL LOGIN
// TODO GET ME
// TODO GET SPECIFIC MEMBER
// TODO UPDATE
// TODO UPDATE AVATAR

// TODO LOGIN AND REGISTER TOKEN IS VALID?

// /* MEMBER FAILS TESTING */

// CONNECTIONS
