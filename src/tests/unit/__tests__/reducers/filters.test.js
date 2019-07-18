import filtersReducer from '../../../../reducers/filters';
import { filters } from '../../../fixtures/unit.js';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    tagFilters: [],
    search: ''
  });
});

test('should set search query', () => {
  const action = {
    type: 'SET_TEXT_FILTER',
    search: filters.search
  };

  const state = filtersReducer(filters.search, action);
  expect(state).toBe(filters.search);
});

test('should set tag', () => {
  const action = {
    type: 'SET_TAGS_FILTER',
    tagFilters: filters.tagFilters
  };

  const state = filtersReducer(filters.tagFilters, action);
  expect(state.tagFilters).toBe(filters.tagFilters);
});
