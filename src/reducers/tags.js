// Expenses Reducer
const tagsReducerDefaultState = {
  list: [],
  displayTagsModal: false,
};

export default (state = tagsReducerDefaultState, action) => {
  switch (action.type) {
  case 'ADD_TAG':
    return {
      ...state,
      list: [action.tag, ...state.list]
    };

  case 'SET_TAGS':
    return action.tags;

  case 'REMOVE_TAG':
    return {
      ...state,
      list: state.list.filter((tag) => tag.id !== action.id)
    };

  case 'UPDATE_TAG':
    return {
      ...state,
      list: state.list.map((tag) => {
        if (tag.id === action.id) {
          return {
            ...tag,
            value: action.update
          };
        } else {
          return tag;
        }
      })
    };

  case 'DISPLAY_TAGS_MODAL':
    return {
      ...state,
      displayTagsModal: action.displayTagsModal
    };

  default:
    return state;
  }
};
