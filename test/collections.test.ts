import { stripForTest } from './utils';
import { ss } from './api-setup';
import {
  collectionDataEn,
  collectionDataHr,
  collectionShape,
} from './fixtures';

describe('Collections', () => {
  const section = 'products';
  const collection = 'featured';
  const collectionListId = 2887;

  it('should fetch all collections within a collection section correctly', async () => {
    const { data: arrayHoldingAllCollectionLists } = await ss
      .collections(section, collection)
      .search({});
    const responseSingleCollection = arrayHoldingAllCollectionLists[0];

    expect(Object.keys(stripForTest(responseSingleCollection))).toEqual(
      Object.keys(collectionShape),
    );
    expect(arrayHoldingAllCollectionLists).toHaveLength(1);
  });

  it('should fetch a specified collection', async () => {
    const res = await ss.collections(section, collection).get(collectionListId);

    // typo here
    expect(res.slug).toBe('fotoball-star');
  });

  it('should fetch a specfied collection in English language correctly', async () => {
    const lang = 'en';

    const { data } = await ss
      .collections(section, collection)
      .get(collectionListId, { lang });

    expect(data).toEqual(collectionDataEn);
  });

  it('should fetch a specified collection in Croatian language correctly', async () => {
    const lang = 'hr';

    const { data } = await ss
      .collections(section, collection)
      .get(collectionListId, { lang });

    expect(data).toEqual(collectionDataHr);
  });
});
