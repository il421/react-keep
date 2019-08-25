import { login, logout, loading } from '../../../../actions/auth';

test('should generate loading action object correctly', () => {
  const action = loading(true);
  expect(action).toEqual({
    type: 'LOADING',
    loading: true
  });
});

test('should generate login action object', () => {
  const uid = '123';
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid: uid
  });
});

test('should generate logout action object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
