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
      author: '',
      title: 'Football',
      description: '',
      text: '',
      whatIsIt: '',
      modelNumber: '',
      recommended: false,
    };

    const { data } = await getNode(slug);

    expect(data).toEqual(expectedProduct);
  });
});
