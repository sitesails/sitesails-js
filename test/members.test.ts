import { ss, memberData } from './api-setup';
import { loginResponseShape } from './fixtures';

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
    const res = await ss
      .members()
      .login({ email: memberData.email, password: memberData.password });
    // const resKeys = Object.keys(res);

    expect(res).toMatchShapeOf(loginResponseShape);
  });
});
