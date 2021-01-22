import { ss } from './setup';

const userData = {
  email: 'karlo.marinovic@init.hr',
  firstName: 'Karlo',
  lastName: 'Marinović',
  password: 'matrixmatrix',
};

describe('Api nodes', () => {
  const nodes = 'products';
  const productSlug = 'football';

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
    const { data } = await ss.nodes(nodes).get(productSlug);
    expect(data.title).toEqual('Football');
  });

  it('should fetch a specified node in specified language', async () => {
    const lang = 'hr';
    const { data } = await ss.nodes(nodes).get(productSlug, { lang });

    expect(data.title).toEqual('Nogometna lopta');
  });

  it('should be of specific shape when a node is fetched', async () => {
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

    const expectedProductKeys = Object.keys(expectedProduct);

    const res = await ss.nodes(nodes).get(productSlug);
    const resKeys = Object.keys(res);

    expect(resKeys).toEqual(expectedProductKeys);
  });

  it('should fetch a node with English translations when English language specified', async () => {
    const expectedResponse = {
      author: 'Karlo M',
      title: 'Football',
      description: 'A beautiful ball',
      text: '<p>Go out and play football. </p>',
      whatIsIt: 'sports item',
      modelNumber: '3',
      recommended: false,
    };
    // NOT SURE WHICH IS THE DEFAULT LANGUAGE, SO SPECIFYING ENGLISH EXPLICITLY
    const lang = 'en';

    const { data } = await ss.nodes(nodes).get(productSlug, { lang });

    expect(data).toEqual(expectedResponse);
  });

  it('should fetch a node with Croatian translations when Croatian language specified', async () => {
    const expectedResponse = {
      author: 'Karlo M',
      title: 'Nogometna lopta',
      description: 'Prekrasna lopta',
      text: '<p>Igrajte nogomet</p>',
      whatIsIt: 'sportski rekvizit',
      modelNumber: '3',
      recommended: false,
    };
    const lang = 'hr';

    const { data } = await ss.nodes(nodes).get(productSlug, { lang });

    expect(data).toEqual(expectedResponse);
  });

  it('should fetch a node with Italian translations when Italian language specified', async () => {
    const expectedResponse = {
      author: 'Karlo M',
      title: 'Football in Italian',
      description: 'A beautiful ball in Italian language',
      text: '<p>Esci e gioca a calcio.</p>',
      whatIsIt: 'sports item in italian',
      modelNumber: '3',
      recommended: false,
    };
    const lang = 'it';

    const { data } = await ss.nodes(nodes).get(productSlug, { lang });

    expect(data).toEqual(expectedResponse);
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
  // it('should register new user correctly', async () => {
  // TODO ADD DYNAMIC EMAIL SO NO EMAIL CONFLICT // ADD ASSERTION
  // const res = await ss.members().register({
  //   email: 'karlo.marinovic@init.hr',
  //   firstName: 'Karlo',
  //   lastName: 'Marinović',
  //   password: 'matrixmatrix',
  // });
  // console.log('res', res);
  // });
  it('should login existing user corectly', async () => {
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
  const connection = 'likes';
  const productId = 2856;
  const slug = 'football';
  const nodes = 'products';

  it('should return a correct response after adding a connection to a node', async () => {
    const expectedConnectionResponse = {
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
      createdAt: '01/21/2021 19:28:36',
      data: {},
      contents: null,
    };
    const expectedConnectionKeys = Object.keys(expectedConnectionResponse);

    const { token } = await ss
      .members()
      .login({ email: userData.email, password: userData.password });
    const res = await ss.connections(connection).add({
      memberToken: token,
      nodeId: productId,
    });
    const resKeys = Object.keys(res);

    expect(resKeys).toEqual(expectedConnectionKeys);
  });
  it('should place connection type to a node response when connection added', async () => {
    const expectedResponse = ['likes'];
    const { token } = await ss
      .members()
      .login({ email: userData.email, password: userData.password });

    await ss.connections(connection).remove({
      memberToken: token,
      nodeId: productId,
    });
    await ss.connections(connection).add({
      memberToken: token,
      nodeId: productId,
    });

    const { connectionStats, connections } = await ss
      .nodes(nodes)
      .get(slug, { connections: 'likes', connectionStats: 'likes' });
    const connectionsKeys = Object.keys(connections);
    const connectionStatsKeys = Object.keys(connectionStats);

    // TODO THIS DOES NOT ALWAYS PASS // CONNECTION DOES NOT SEEM TO BE ALWAYS ADDED, OR MULTIPLE ARE ADDED // NEED LOOK INTO
    expect(connectionsKeys).toEqual(expectedResponse);
    expect(connectionStatsKeys).toEqual(expectedResponse);
  });

  it('should remove connection type from a node when connection removed', async () => {
    const expectedConnectionStatsResponse = { likes: { count: 0 } };
    const expectedConnectionsResponse = {};
    const { token } = await ss
      .members()
      .login({ email: userData.email, password: userData.password });

    await ss.connections(connection).add({
      memberToken: token,
      nodeId: productId,
    });

    await ss.connections(connection).remove({
      memberToken: token,
      nodeId: productId,
    });

    const { connectionStats, connections } = await ss
      .nodes(nodes)
      .get(slug, { connections: 'likes', connectionStats: 'likes' });

    // TODO THIS DOES NOT ALWAYS PASS // CONNECTION DOES NOT SEEM TO BE ALWAYS ADDED, OR MULTIPLE ARE ADDED // NEED LOOK INTO
    expect(connectionStats).toEqual(expectedConnectionStatsResponse);
    expect(connections).toEqual(expectedConnectionsResponse);
  });
});
