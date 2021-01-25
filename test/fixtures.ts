// NODES
export const footballShapeEn = {
  id: 2856,
  slug: 'football',
  slugs: { it: 'italian-football', hr: 'nogometna-lopta', en: 'football' },
  sectionId: 59,
  languageId: 'en',
  isPublished: true,
  publishedFrom: '2021-01-21T08:58:00',
  publishedTo: null,
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
  slugs: { hr: 'sport', en: 'sport' },
  sectionId: 60,
  languageId: 'en',
  isPublished: true,
  publishedFrom: '2021-01-21T08:58:11.199',
  publishedTo: null,
  category: { id: null, slug: null, name: null, itemCount: 3 },
  data: {
    author: '',
    title: '',
    description: null,
    text: '',
    name: 'sport',
    featured: false,
  },
  seoMetadata: '[]',
  image: null,
  images: [],
  contents: null,
  connectionStats: null,
  connections: {},
  event: null,
  collectionItems: null,
  subsections: null,
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
  isPublished: true,
  publishedFrom: '2021-01-22T09:53:00',
  publishedTo: null,
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
  collectionItems: null,
  subsections: null,
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

export const keyValueSearchResponseShape = {
  data: [
    {
      id: 282,
      keyvalueStoreId: 4,
      key: 'test',
      value: 'test-target',
      userCreatedId: 1,
      userCreated: null,
      userUpdatedId: 1,
      userUpdated: null,
    },
  ],
  meta: { pageNumber: 1, pageSize: 20, totalRows: 3, totalPages: 1 },
};

export const keyValueSearchTransformedShape = {
  data: [
    ['test', 'test-target'],
    ['another', 'another-one'],
    ['one', 'more'],
  ],
  meta: { pageNumber: 1, pageSize: 20, totalRows: 3, totalPages: 1 },
};

export const keyValueGetResponse = {
  id: 0,
  keyvalueStoreId: 0,
  key: 'another',
  value: 'another-one',
  userCreatedId: 1,
  userCreated: null,
  userUpdatedId: 1,
  userUpdated: null,
};
