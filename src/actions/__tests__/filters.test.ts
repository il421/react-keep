import { FiltersActionsTypes } from "../../store/store.types";
import { filter } from "../../testData/filters";
import { setSearchFilter, setTagsFilter } from "../filters";

test("should set search filter correctly", () => {
  const action = setSearchFilter(filter.search);
  expect(action).toEqual({
    type: FiltersActionsTypes.setSearchFilter,
    search: filter.search
  });
});

test("should set tags filter correctly", () => {
  const action = setTagsFilter(filter.tag);
  expect(action).toEqual({
    type: FiltersActionsTypes.setTagFilter,
    tag: filter.tag
  });
});
