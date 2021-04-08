import { KeyValue, KeyValueSearchResult } from 'keyvalues/types';

// NODES
export const footballShapeEn = {
  id: 2856,
  slug: 'football',
  slugs: { it: 'italian-football', hr: 'nogometna-lopta', en: 'football' },
  sectionId: 59,
  languageId: 'en',
  publishable: {
    isPublished: true,
    publishedFrom: '2021-01-21T08:58:00',
    publishedTo: null,
  },
  category: { id: 2854, slug: 'sport', name: 'sport', itemCount: null },
  data: {
    author: 'Karlo M',
    title: 'Football',
    description: 'A beautiful ball',
    text: '<p>Go out and play football. </p>',
    whatIsIt: 'sports item',
    modelNumber: '3',
    recommended: false,
  },
  seoMetadata: '[]',
  image: null,
  images: [],
  contents: null,
  connectionStats: null,
  connections: {},
  event: null,
  product: null,
  collectionItems: null,
  subsections: null,
};

export const footballDataShapeEn = {
  author: 'Karlo M',
  title: 'Football',
  description: 'A beautiful ball',
  text: '<p>Go out and play football. </p>',
  whatIsIt: 'sports item',
  modelNumber: '3',
  recommended: false,
};

export const footballDataShapeHr = {
  author: 'Karlo M',
  title: 'Nogometna lopta',
  description: 'Prekrasna lopta',
  text: '<p>Igrajte nogomet</p>',
  whatIsIt: 'sportski rekvizit',
  modelNumber: '3',
  recommended: false,
};

export const categoryShape = {
  id: 2854,
  slug: 'sport',
  slugs: { en: 'sport', hr: 'sport' },
  sectionId: 60,
  languageId: 'en',
  category: { id: null, slug: null, name: null, itemCount: 3 },
  data: {
    title: '',
    description: null,
    text: '',
    featured: false,
    name: 'sport',
  },
  seoMetadata: '[]',
  image: null,
  images: [],
  contents: null,
  connectionStats: null,
  connections: {},
  event: null,
  product: null,
  publishable: null,
  collectionItems: null,
  subsections: null,
  blocks: null,
};

// CONNECTIONS

export const connectionShape = {
  id: 67,
  parentId: null,
  nodeId: 2856,
  nodeName: 'Football',
  nodeSlug: 'football',
  nodeImageUrl: 'https://api.sitesails.com/public/',
  memberId: 11,
  memberFirstName: 'Karlo',
  memberLastName: 'Marinović',
  memberAvatarUrl: null,
  data: {},
  contents: null,
};

// COLLECTIONS

export const collectionShape = {
  id: 2887,
  slug: 'fotoball-star',
  slugs: { hr: 'nogometna-zvijezda', en: 'fotoball-star' },
  sectionId: 67,
  languageId: 'en',
  category: { id: 2854, slug: 'sport', name: 'sport', itemCount: null },
  data: {
    author: 'Karlo M',
    title: 'Be a football star',
    description: 'Be a star',
    text: '<p>Yes, be a star</p>',
  },
  seoMetadata: '[]',
  image: null,
  images: null,
  contents: null,
  connectionStats: null,
  connections: {},
  event: null,
  product: null,
  collectionItems: null,
  subsections: null,
  publishable: null,
};

export const collectionDataEn = {
  author: 'Karlo M',
  title: 'Be a football star',
  description: 'Be a star',
  text: '<p>Yes, be a star</p>',
};

export const collectionDataHr = {
  author: 'Karlo M',
  title: 'Budi nogometna zvijezda',
  description: 'Budu zvijezda',
  text: '<p>Da, budi zvijezda</p>',
};

// MEMBERS

export const loginResponseShape = {
  id: 0,
  token: '',
  email: '',
  firstName: '',
  lastName: '',
  avatarUrl: null,
  hasNotificationConsent: true,
};

// KEYVALUES

export const keyValueSearchResponse: KeyValueSearchResult<KeyValue> = {
  data: [
    {
      key: 'one',
      value: 'less',
    },
  ],
  meta: { pageNumber: 1, pageSize: 20, totalRows: 3, totalPages: 1 },
};
