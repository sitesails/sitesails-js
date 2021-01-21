import {
  // addConnection,
  // fetchNodeCategories,
  // fetchNodes,
  // getNode,
  loginMember,
  ss,
} from './setup';

const userData = {
  email: 'karlo.marinovic@init.hr',
  firstName: 'Karlo',
  lastName: 'Marinović',
  password: 'matrixmatrix',
};

describe('Api nodes', () => {
  const nodes = 'products';

  it('should all be fetched correctly', async () => {
    const nodes = 'products';
    const { data } = await ss.nodes(nodes).search({});
    expect(data).toHaveLength(4);
  });

  it('should be fetched only from a specified node category', async () => {
    const category = 'sport';
    const { data } = await ss.nodes(nodes).search({ category });
    expect(data).toHaveLength(2);
  });
  it('should fetch only in specified language', async () => {
    const lang = 'hr';
    const { data } = await ss.nodes(nodes).search({ lang });
    expect(data[0].languageId).toEqual(lang);
  });

  it('should fetch a specified node', async () => {
    const slug = 'football';
    const { data } = await ss.nodes(nodes).get(slug);
    expect(data.title).toEqual('Football');
  });

  it('should fetch a specified node in specified language', async () => {
    const slug = 'football';
    const lang = 'hr';
    const { data } = await ss.nodes(nodes).get(slug, { lang });
    expect(data.title).toEqual('Nogometna lopta');
  });

  it('should be of specific shape when a node is fetched', async () => {
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

    const node = await ss.nodes(nodes).get(slug);
    expect(node).toEqual(expectedProduct);
  });

  it('categories should all be fetched correctly', async () => {
    const { data } = await ss.nodes(nodes).categories({});
    expect(data).toHaveLength(2);
  });

  it('categories should all be fetched correctly in specified language', async () => {
    const lang = 'hr';
    const { data } = await ss.nodes(nodes).categories({ lang });
    expect(data[0].languageId).toEqual(lang);
  });

  it('category should be fetched correctly', async () => {
    const category = 'food';
    const { data } = await ss.nodes(nodes).category(category);
    expect(data.name).toEqual(category);
  });

  it('category should be fetched in specified language', async () => {
    const category = 'food';
    const lang = 'hr';
    const { data } = await ss.nodes(nodes).category(category, { lang });
    expect(data.name).toEqual('hrana');
  });

  it('category should be fetched in specific shape', async () => {
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

    const res = await ss.nodes(nodes).category(category);

    expect(res).toEqual(expectedResponse);
  });
});
describe('Api members', () => {
  test('should register new user correctly', async () => {
    // TODO ADD DYNAMIC EMAIL SO NO EMAIL CONFLICT
    // await registerMember(userData);
  });

  test('should login existing user corectly', async () => {
    const expectedLoginResponse = {
      id: 0,
      token: '',
      email: '',
      firstName: '',
      lastName: '',
      avatarUrl: null,
      hasNotificationConsent: true,
    };

    const expectedKeys = Object.keys(expectedLoginResponse);
    const res = await ss
      .members()
      .login({ email: userData.email, password: userData.password });
    const resKeys = Object.keys(res);

    expect(resKeys).toEqual(expectedKeys);
  });
});

describe('Api connections', () => {
  // test that a node can be liked

  it('adds a connection to a node correctly', async () => {
    // const connection = 'likes';
    // // const productId =
    // const loggedUser = await loginMember({
    //   email: userData.email,
    //   password: userData.password,
    // });
    // const res = await addConnection(connection, loggedUser,  )
  });
  // test taht a node can be unliked
  // test that a node has a like when fetched
  // test search for connections on a node?
});
