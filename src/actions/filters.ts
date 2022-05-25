import {
  FiltersActionsTypes,
  SearchFilterAction,
  TagsFilterAction
} from "../store/store.types";

export const setSearchFilter = (search: string): SearchFilterAction => ({
  type: FiltersActionsTypes.setSearchFilter,
  search
});

export const setTagsFilter = (tag: string): TagsFilterAction => ({
  type: FiltersActionsTypes.setTagFilter,
  tag
});
