import tagsReducer from '../../../../reducers/tags';
import { tags } from '../../../fixtures/unit.js';

const defaultState = {
  list: [],
  displayTagsModal: false
};

test('should setup default tags values', () => {

  const state = tagsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(defaultState);
});

test('should add a tag', () => {
  const action = {
    type: 'ADD_TAG',
    tag: tags.list[0]
  };

  const state = tagsReducer(defaultState, action);
  expect(state.list[0]).toEqual(tags.list[0]);
});

test('should set tags', () => {
  const action = {
    type: 'SET_TAGS',
    tags: tags.list
  };

  const state = tagsReducer(defaultState, action);
  expect(state).toEqual(tags.list);
});

test('should remove a tag', () => {
  const id = 'YpjypoYGueKBUukRPQ5F';
  const action = {
    type: 'REMOVE_TAG',
    id
  };

  const state = tagsReducer({...tags}, action);
  expect(state.list).toEqual([tags.list[1]]);
});

test('update a tag', () => {
  const id = 'testId';
  const update = 'Need To Buy';
  const action = {
    type: 'UPDATE_TAG',
    id,
    update
  };

  const state = tagsReducer({...tags}, action);
  expect(state.list[0].value).toBe(update);
});

test('update a display tags modal', () => {

  const action = {
    type: 'DISPLAY_TAGS_MODAL',
    displayTagsModal: true
  };

  const state = tagsReducer(defaultState, action);
  expect(state.displayTagsModal).toBe(true);
});
