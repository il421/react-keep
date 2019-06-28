const defaultFiltersState = {
  tagFilters: [],
  search: ''
};

export default (state = defaultFiltersState, action) => {
  switch (action.type) {
  case 'SET_SEARCH_FILTER':
    return {
      ...state,
      search: action.search
    };

  case 'SET_TAGS_FILTER':
    return {
      ...state,
      tagFilters: action.tagFilters
    };

  default:
    return state;
  }
};
