import { ss } from '../tests/setup';

describe('Collections', () => {
  const section = 'products';
  const collection = 'featured';
  const collectionListId = 2887;
  const expectedSingleCollectionResponse = {
    id: 2887,
    slug: 'fotoball-star',
    slugs: {},
    sectionId: 67,
    languageId: 'en',
    isPublished: true,
    publishedFrom: '2021-01-22T09:53:00',
    publishedTo: null,
    createdAt: '2021-01-22T10:54:49.916891',
    updatedAt: '2021-01-22T10:54:49.916891',
    category: [Object],
    data: [Object],
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
  const expectedCollectionResponseKeys = Object.keys(
    expectedSingleCollectionResponse,
  );

  it('should fetch all collections within a collection section correctly', async () => {
    const { data: arrayHoldingAllCollectionLists } = await ss
      .collections(section, collection)
      .search({});
    const responseCollectionKeys = Object.keys(
      arrayHoldingAllCollectionLists[0],
    );

    expect(responseCollectionKeys).toEqual(expectedCollectionResponseKeys);
    expect(arrayHoldingAllCollectionLists).toHaveLength(1);
  });

  it('should fetch a specified collection', async () => {
    const res = await ss.collections(section, collection).get(collectionListId);
    const resKeys = Object.keys(res);

    expect(resKeys).toEqual(expectedCollectionResponseKeys);
  });

  it('should fetch a specfied collection in English language correctly', async () => {
    const lang = 'en';
    const expectedResponse = {
      author: 'Karlo M',
      title: 'Be a football star',
      description: 'Be a star',
      text: '<p>Yes, be a star</p>',
    };

    const { data } = await ss
      .collections(section, collection)
      .get(collectionListId, { lang });

    expect(data).toEqual(expectedResponse);
  });

  it('should fetch a specfied collection in Croatian language correctly', async () => {
    const lang = 'hr';
    const expectedResponse = {
      author: 'Karlo M',
      title: 'Budi nogometna zvijezda',
      description: 'Budu zvijezda',
      text: '<p>Da, budi zvijezda</p>',
    };

    const { data } = await ss
      .collections(section, collection)
      .get(collectionListId, { lang });

    expect(data).toEqual(expectedResponse);
  });
});
