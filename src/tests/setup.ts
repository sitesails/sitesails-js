import SiteSails from '../index';

export const ss = new SiteSails({
  apiUrl: 'https://api.sitesails.com/api/v1',
  adminApiKey: null,
  publicApiKey: '66461de9-b081-43ed-87c4-7fa098829251',
  // debug: true,
});

export const memberData = {
  email: 'karlo.marinovic@init.hr',
  firstName: 'Karlo',
  lastName: 'Marinović',
  password: 'matrixmatrix',
};
