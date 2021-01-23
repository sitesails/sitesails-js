import { ss } from './setup';
import { footballEn } from './fixtures';
import { stripForTest } from './utils';

describe('Nodes', () => {
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
    const res = await ss.nodes(nodes).get(productSlug);
    // @Karlo: you can do a console.log(JSON.stringify(res)); here to get how the fixture should look, you copy
    // it from the console and copy over into fixtures
    expect(stripForTest(res)).toEqual(footballEn);
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
      // TODO slugs added recently?
      slugs: {
        en: 'food',
        hr: 'hrana',
      },
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
