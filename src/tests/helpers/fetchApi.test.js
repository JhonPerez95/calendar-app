import '@testing-library/jest-dom/';
import { fetchNoToken, fetchToken } from '../../helpers/fetchApi';

describe('Test the helper fetchApi ', () => {
  let token = '';
  test('should  make request to API ', async () => {
    const data = {
      email: 'test@gmail.com',
      password: '123456',
    };
    const resp = await fetchNoToken('auth', data, 'POST');
    expect(resp instanceof Response).toBe(true);

    const body = await resp.json();
    token = body.token;
    expect(body.ok).toBe(true);
  });

  test('should with token request api', async () => {
    localStorage.setItem('token', token);
    const resp = await fetchToken(
      'event/5f4333fd2b8b4172048b0ee3',
      {},
      'DELETE'
    );
    const body = await resp.json();

    expect(resp instanceof Response).toBe(true);
    expect(body.msg).toBe('Evento no existe');
  });
});
