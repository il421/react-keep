import {
  FiltersActionsTypes,
  FiltersStoreState,
  SearchFilterAction,
  TagsFilterAction,
} from "../store/store.types";

const defaultFiltersState: FiltersStoreState = {
  tagFilters: [],
  search: "",
};

type FiltersAction = SearchFilterAction | TagsFilterAction;

export default (
  state = defaultFiltersState,
  action: FiltersAction
): FiltersStoreState => {
  switch (action.type) {
    case FiltersActionsTypes.setSearchFilter:
      return {
        ...state,
        search: action.search,
      };

    case FiltersActionsTypes.setTagFilter:
      return {
        ...state,
        tagFilters: state.tagFilters.includes(action.tag)
          ? state.tagFilters.filter((i) => i !== action.tag)
          : [...state.tagFilters, action.tag],
      };

    default:
      return state;
  }
};
