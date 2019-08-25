export default (state = {}, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      uid: action.uid,
      name: action.name,
      url: action.url
    };

  case 'LOGOUT':
    return {};

  case 'LOADING':
    return {
      ...state,
      loading: action.loading
    };

  default:
    return state;
  }
};
