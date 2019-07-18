import tagsReducer from '../../../../reducers/tags';
import { tags } from '../../../fixtures/unit.js';


test('should setup default tags values', () => {
  const state = tagsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should add a tag', () => {
  const action = {
    type: 'ADD_TAG',
    tag: tags[0]
  };

  const state = tagsReducer([], action);
  expect(state).toEqual([tags[0]]);
});

test('should set tags', () => {
  const action = {
    type: 'SET_TAGS',
    tags
  };

  const state = tagsReducer([], action);
  expect(state).toEqual(tags);
});

test('should remove a tag', () => {
  const id = 'YpjypoYGueKBUukRPQ5F';
  const action = {
    type: 'REMOVE_TAG',
    id
  };

  const state = tagsReducer([...tags], action);
  expect(state).toEqual([tags[1]]);
});

test('update a tag', () => {
  const id = 'YpjypoYGueKBUukRPQ5F';
  const update = 'Need To Buy'
  const action = {
    type: 'UPDATE_TAG',
    id,
    update
  };

  const state = tagsReducer([...tags], action);
  expect(state[0].value).toBe(update);
});
