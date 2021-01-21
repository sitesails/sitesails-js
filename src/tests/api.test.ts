import { fetchCategories, fetchProducts, getProduct } from './setup';

describe('Api products', () => {
  it('should all be fetched correctly', async () => {
    const { data } = await fetchProducts();

    expect(data).toHaveLength(4);
  });

  it('should be fetched only from specified category', async () => {
    const category = 'sport';
    const { data } = await fetchProducts({ category });

    expect(data).toHaveLength(2);
  });
  it('should fetch only in specified language', async () => {
    const lang = 'hr';
    const { data } = await fetchProducts({ lang });

    expect(data[0].languageId).toEqual(lang);
  });

  it('categories should all be fetched correctly', async () => {
    const section = 'products';
    const { data } = await fetchCategories(section);

    expect(data).toHaveLength(2);
  });

  it('should fetch a specified product', async () => {
    const slug = 'football';

    const { data } = await getProduct(slug);

    expect(data.title).toEqual('Football');
  });

  it('should fetch a specified product in specified language', async () => {
    const slug = 'football';
    const lang = 'hr';

    const { data } = await getProduct(slug, { lang });

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

    const { data } = await getProduct(slug);

    expect(data).toEqual(expectedProduct);
  });
});
