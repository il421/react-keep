import { setSearchFilter, setTagsFilter } from '../../../../actions/filters';
import { filters } from '../../../fixtures/unit';


test('should set search filter correctly', () => {

  const action = setSearchFilter(filters.search);
  expect(action).toEqual({
    type: 'SET_SEARCH_FILTER',
    search: filters.search
  });
});

test('should set tags filter correctly', () => {

  const action = setTagsFilter(filters.tagFilters);
  expect(action).toEqual({
    type: 'SET_TAGS_FILTER',
    tagFilters: filters.tagFilters
  });
});
