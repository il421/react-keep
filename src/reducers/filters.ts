import {
  Filters,
  FiltersActionsTypes,
  FiltersStoreState,
  SearchFilterAction,
  TagsFilterAction
} from "../store/store.types";

const defaultFiltersState: FiltersStoreState = {
  tagFilters: [],
  search: ""
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
        search: action.search
      };

    case FiltersActionsTypes.setTagsFilter:
      return {
        ...state,
        tagFilters: action.tagFilters
      };

    default:
      return state;
  }
};
