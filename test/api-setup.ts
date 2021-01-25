import SiteSails from '../src';

export const ss = new SiteSails({
  apiUrl: process.env.SITESAILS_API_URL,
  adminApiKey: process.env.SITESAILS_API_PUBLIC_KEY,
  publicApiKey: process.env.SITESAILS_API_ADMIN_KEY,
  debug: process.env.SITESAILS_DEBUG === 'true',
});

export const memberData = {
  email: 'karlo.marinovic@init.hr',
  firstName: 'Karlo',
  lastName: 'Marinović',
  password: 'matrixmatrix',
};
