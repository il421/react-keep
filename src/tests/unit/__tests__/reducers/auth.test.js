import authReducer from '../../../../reducers/auth';

test('should set loading value', () => {
  const action = {
    type: 'LOADING',
    loading: true
  };

  const state = authReducer({}, action);
  expect(state.loading).toBe(action.loading);
})

test('should set uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid: '123'
  };
  const state = authReducer({}, action);

  expect(state.uid).toBe(action.uid);
});

test('should clear uid for logout', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer({uid: 'asd'}, action);

  expect(state).toEqual({});
});
