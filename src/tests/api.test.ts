import {
  fetchNodeCategories,
  fetchNodes,
  getNode,
  getNodeCategory,
  loginMember,
  // registerMember,
} from './setup';

describe('Api nodes', () => {
  it('should all be fetched correctly', async () => {
    const { data } = await fetchNodes();

    expect(data).toHaveLength(4);
  });

  it('should be fetched only from a specified node category', async () => {
    const category = 'sport';
    const { data } = await fetchNodes({ category });

    expect(data).toHaveLength(2);
  });
  it('should fetch only in specified language', async () => {
    const lang = 'hr';
    const { data } = await fetchNodes({ lang });

    expect(data[0].languageId).toEqual(lang);
  });

  it('should fetch a specified node', async () => {
    const slug = 'football';

    const { data } = await getNode(slug);

    expect(data.title).toEqual('Football');
  });

  it('should fetch a specified node in specified language', async () => {
    const slug = 'football';
    const lang = 'hr';

    const { data } = await getNode(slug, { lang });

    expect(data.title).toEqual('Nogometna lopta');
  });

  it('should be of specific shape when fetched', async () => {
    const slug = 'football';
    const expectedProduct = {
      id: 2856,
      slug: 'football',
      sectionId: 59,
      languageId: 'en',
      isPublished: true,
      publishedFrom: '2021-01-21T08:58:00',
      publishedTo: null,
      createdAt: '2021-01-21T09:59:15.465864',
      updatedAt: '2021-01-21T09:59:15.465864',
      category: { id: 2854, slug: 'sport', name: 'sport', itemCount: null },
      data: {
        author: '',
        title: 'Football',
        description: '',
        text: '',
        whatIsIt: '',
        modelNumber: '',
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

    const node = await getNode(slug);

    expect(node).toEqual(expectedProduct);
  });

  it('categories should all be fetched correctly', async () => {
    const section = 'products';
    const { data } = await fetchNodeCategories(section);

    expect(data).toHaveLength(2);
  });

  it('categories should all be fetched correctly in specified language', async () => {
    const section = 'products';
    const lang = 'hr';
    const { data } = await fetchNodeCategories(section, { lang });

    expect(data[0].languageId).toEqual(lang);
  });

  it('category should be fetched correctly', async () => {
    const section = 'products';
    const category = 'food';

    const { data } = await getNodeCategory(section, category);

    expect(data.name).toEqual(category);
  });

  it('category should be fetched in specified language', async () => {
    const section = 'products';
    const category = 'food';
    const lang = 'hr';

    const { data } = await getNodeCategory(section, category, { lang });
    expect(data.name).toEqual('hrana');
  });

  it('category should be fetched in specific shape', async () => {
    const section = 'products';
    const category = 'food';
    const expectedResponse = {
      id: 2855,
      slug: 'food',
      sectionId: 60,
      languageId: 'en',
      isPublished: true,
      publishedFrom: '2021-01-21T08:58:35.056',
      publishedTo: null,
      createdAt: '2021-01-21T09:58:35.426232',
      updatedAt: '2021-01-21T09:58:35.426232',
      category: { id: null, slug: null, name: null, itemCount: 2 },
      data: {
        author: '',
        title: '',
        description: null,
        text: '',
        name: 'food',
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

    const res = await getNodeCategory(section, category);
    expect(res).toEqual(expectedResponse);
  });
});
describe('Api members', () => {
  const userData = {
    email: 'karlo.marinovic@init.hr',
    firstName: 'Karlo',
    lastName: 'Marinović',
    password: 'matrixmatrix',
  };
  test('should register new user correctly', async () => {
    // await registerMember(userData);
  });

  test('should login existing user corectly', async () => {
    const expectedLoginResponse = {
      id: 9,
      token: 'token',
      email: 'karlo.marinovic@init.hr',
      firstName: 'Karlo',
      lastName: 'Marinović',
      avatarUrl: null,
      hasNotificationConsent: true,
    };

    const expectedKeys = Object.keys(expectedLoginResponse);

    const res = await loginMember({
      email: userData.email,
      password: userData.password,
    });

    const resKeys = Object.keys(res);

    expect(resKeys).toEqual(expectedKeys);
  });
});

describe('Api connections', () => {
  // test that a node can be liked
  // test taht a node can be unliked
  // test that a node has a like when fetched
  // test search for connections on a node?
});
