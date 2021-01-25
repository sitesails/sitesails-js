import { ss } from './api-setup';
import {
  footballShapeEn,
  footballDataShapeEn,
  footballDataShapeHr,
  categoryShape,
} from './fixtures';
import { stripForTest } from './utils';

describe('Nodes', () => {
  const nodes = 'products';
  const productSlug = 'football';
  const category = 'sport';

  it('should all be fetched correctly', async () => {
    const { data } = await ss.nodes(nodes).search({});

    expect(data).toHaveLength(4);
  });

  it('should be fetched only from a specified node category', async () => {
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

    expect(stripForTest(res)).toMatchShapeOf(footballShapeEn);
  });

  it('should fetch a node with English translations when English language specified', async () => {
    const lang = 'en';
    const { data } = await ss.nodes(nodes).get(productSlug, { lang });

    expect(data).toMatchShapeOf(footballDataShapeEn);
  });

  it('should fetch a node with Croatian translations when Croatian language specified', async () => {
    const lang = 'hr';
    const { data } = await ss.nodes(nodes).get(productSlug, { lang });

    expect(data).toMatchShapeOf(footballDataShapeHr);
  });

  it('should fetch a node with default English translations when unused language specified', async () => {
    const lang = 'pt';
    const { data } = await ss.nodes(nodes).get(productSlug, { lang });

    expect(data).toMatchShapeOf(footballDataShapeEn);
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
    const { data } = await ss.nodes(nodes).category(category);

    expect(data.name).toMatchShapeOf(category);
  });

  it('category should be fetched in specified language', async () => {
    const lang = 'hr';
    const { data } = await ss.nodes(nodes).category(category, { lang });

    expect(data.name).toEqual('sport');
  });

  it('category should be fetched in specific shape', async () => {
    const res = await ss.nodes(nodes).category(category);

    expect(stripForTest(res)).toEqual(categoryShape);
  });
});
