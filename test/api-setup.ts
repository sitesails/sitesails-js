import SiteSails from '../src';

export const ss = new SiteSails({
  apiUrl: 'https://api.sitesails.com/api/v1',
  adminApiKey: 'b5ca746b-d81f-43c5-b52b-3168c13d9fa0',
  publicApiKey: '66461de9-b081-43ed-87c4-7fa098829251',
  // debug: true,
});

export const memberData = {
  email: 'karlo.marinovic@init.hr',
  firstName: 'Karlo',
  lastName: 'Marinović',
  password: 'matrixmatrix',
};
