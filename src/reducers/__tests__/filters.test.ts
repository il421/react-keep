import filtersReducer, { defaultFiltersState } from "../../reducers/filters";
import {
  FiltersActionsTypes,
  FiltersStoreState,
  SearchFilterAction,
  TagsFilterAction
} from "../../store/store.types";

describe("Filters reducer", () => {
  test("should set search filter", () => {
    const action: SearchFilterAction = {
      type: FiltersActionsTypes.setSearchFilter,
      search: "search"
    };

    const state = filtersReducer(
      defaultFiltersState,
      action
    ) as FiltersStoreState;
    expect(state.search).toBe(action.search);
  });

  test("should set tag filter", () => {
    const action: TagsFilterAction = {
      type: FiltersActionsTypes.setTagFilter,
      tag: "tag"
    };

    const state = filtersReducer(
      defaultFiltersState,
      action
    ) as FiltersStoreState;
    expect(state.tagFilters).toEqual(["tag"]);
  });
});
