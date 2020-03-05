import {
  FiltersActionsTypes,
  SearchFilterAction,
  TagsFilterAction
} from "../store/store.types";

export const setSearchFilter = (search: string): SearchFilterAction => ({
  type: FiltersActionsTypes.setSearchFilter,
  search
});

export const setTagsFilter = (tagFilters: string[]): TagsFilterAction => ({
  type: FiltersActionsTypes.setTagsFilter,
  tagFilters
});
