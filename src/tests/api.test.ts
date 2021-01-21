import { fetchNodeCategories, fetchNodes, getNode } from './setup';

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

  it('categories should all be fetched correctly', async () => {
    const section = 'products';
    const { data } = await fetchNodeCategories(section);

    expect(data).toHaveLength(2);
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
});

describe('Api connections', () => {});
