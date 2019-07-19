import notesReducer from '../../../../reducers/notes';
import { notes, tags } from '../../../fixtures/unit.js';


test('should setup default notes values', () => {
  const state = notesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should add a note', () => {
  const action = {
    type: 'ADD_NOTE',
    note: notes[0]
  };

  const state = notesReducer([], action);
  expect(state).toEqual([notes[0]]);
});

test('should set notes', () => {
  const action = {
    type: 'SET_NOTES',
    notes
  };

  const state = notesReducer(notes, action);
  expect(state).toEqual(notes);
});

test('should remove a note by id', () => {
  const id = 'kYKnuzVVnPKKhohfo7Z7';
  const action = {
    type: 'REMOVE_NOTE',
    id
  };

  const state = notesReducer(notes, action);
  expect(state).toEqual([notes[1]]);
});

test('should update a note', () => {
  const id = 'kYKnuzVVnPKKhohfo7Z7';
  const updates = {
    title: 'ilya'
  };
  const action = {
    type: 'UPDATE_NOTE',
    id,
    updates
  };

  const state = notesReducer(notes, action);
  expect(state[0].title).toBe(updates.title);
});

test('should change importance tag to opposite', () => {
  const id = 'kYKnuzVVnPKKhohfo7Z7';

  const action = {
    type: 'TOGGLE_IMPORTANCE',
    id,
  };

  const state = notesReducer(notes, action);
  expect(state[0].important).toBe(false);
});

test('should delete a tag from all notes', () => {

  const action = {
    type: 'REMOVE_TAG_FROM_NOTES',
    id: tags.list[0].id,
  };

  const state = notesReducer(notes, action);
  expect(state[1].tags).toEqual([]);
});

test('should update a tag from all notes', () => {
  const update = 'Need to buy';
  const action = {
    type: 'UPDATE_NOTES_TAG',
    id: tags.list[1].id,
    update
  };

  const state = notesReducer(notes, action);
  expect(state[0].tags[0].value).toBe(update);
});
