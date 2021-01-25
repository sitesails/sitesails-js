import { ss, memberData } from '../tests/setup';

describe('Members', () => {
  // it('should register new user correctly', async () => {
  // TODO ADD DYNAMIC EMAIL SO NO EMAIL CONFLICT // ADD ASSERTION
  // const res = await ss.members().register({
  //   email: 'karlo.marinovic@init.hr',
  //   firstName: 'Karlo',
  //   lastName: 'Marinović',
  //   password: 'matrixmatrix',
  // });
  // console.log('res', res);
  // });
  it('should login existing user corectly', async () => {
    const expectedLoginResponse = {
      id: 0,
      token: '',
      email: '',
      firstName: '',
      lastName: '',
      avatarUrl: null,
      hasNotificationConsent: true,
    };
    const expectedKeys = Object.keys(expectedLoginResponse);
    const res = await ss
      .members()
      .login({ email: memberData.email, password: memberData.password });
    const resKeys = Object.keys(res);

    expect(resKeys).toEqual(expectedKeys);
  });
});
