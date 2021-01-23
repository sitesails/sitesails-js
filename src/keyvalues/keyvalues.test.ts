import SiteSailsClient from '../client';

const ss = new SiteSailsClient({
  apiUrl: 'https://api.sitesails.com/api/v1',
  adminApiKey: 'b5ca746b-d81f-43c5-b52b-3168c13d9fa0',
  publicApiKey: '66461de9-b081-43ed-87c4-7fa098829251',
  // debug: true,
});

const store = 'redirect';

// TODO WILL NEED ADMIN KEY HERE
// TODO BEFORE GET ADMIN KEY, USE UI ADMIN TOKEN IN EACH REQUEST

describe('KeyValues search method', () => {
  // TODO REMOVE THIS ONE
  // it('should return something', async () => {
  //   const res = await ss.keyvalues('redirect').testAllStores();
  //   console.log('res here', res);
  // });
  // TODO TEST SEARCH
  // SEARCH ALL
  it('should return all keyvalue pairs from the specified store', async () => {
    const res = await ss.keyvalues(store).search();

    console.log('res', res);

    expect(res).match;
  });
  // SEARCH RESULTS COME IN SPECIFIC SHAPE AS PER TYPE
  // SEARCH RESULTS COME TRANSFORMED AS PER SPECIFIED TYPE
  // need to specify return type on the method
  // SEARCH PER PAGE
  // SEARH PAGE NR
  // SEARCH STRING SEARCH
});
