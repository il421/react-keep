// Expenses Reducer
const tagsReducerDefaultState = [];

export default (state = tagsReducerDefaultState, action) => {
  switch (action.type) {
  case 'ADD_TAG':
    return [action.tag, ...state];

  case 'SET_TAGS':
    return action.tags;

  case 'REMOVE_TAG':
    return state.filter((tag) => tag.id !== action.id);

  case 'UPDATE_TAG':
    return state.map((tag) => {
      if (tag.id === action.id) {
        return {
          ...tag,
          ...action.updates
        };
      } else {
        return tag;
      }
    });

  default:
    return state;
  }
};
