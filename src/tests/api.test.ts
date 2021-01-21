import { fetchCategories, fetchProducts } from './setup';

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

  // test that specified product should be fetched
  // test that specified product in some language should be fetched
  // test that specified product has a specific shape
});
