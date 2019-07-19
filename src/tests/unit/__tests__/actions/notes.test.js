import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  setNotes, addNote, removeNote, updateNote, changeImportance, removeTag, updateTag, handleSetNotes,
  handleAddENote, handleRemoveNote, handleUpdateNote, changeNoteImportance, removeTagFromNotes,
  updateNotesTag } from '../../../../actions/notes';
import { filters, notes, tags } from '../../../fixtures/unit';
import database from '../../../../firebase/firebase';


const uid = 'PpHPdiJXZaNPnET2H8o9MUaPAVA2';
const defaultAuthState = {auth: { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  // to firestore format data
  notes.forEach(({ id, title, text, important, createAt, color, tags }) => {
    const note = { title, text, important, createAt, color, tags };

    // set data to test firestore
    database.collection('users').doc(uid).collection('notes')
      .doc(id).set(note).then(() => done());
  });
});

test('should setup set notes action object correctly', () => {

  const action = setNotes(notes);
  expect(action).toEqual({
    type: 'SET_NOTES',
    notes
  });
});

test('should fetch the notes from DB', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(handleSetNotes()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_NOTES',
      notes
    });
    done();
  });
});

test('should setup add note action object correctly', () => {

  const action = addNote(notes[0]);
  expect(action).toEqual({
    type: 'ADD_NOTE',
    note: notes[0]
  });
});

test('should setup remove note action object correctly', () => {

  const action = removeNote(notes[0].id);
  expect(action).toEqual({
    type: 'REMOVE_NOTE',
    id: notes[0].id
  });
});

test('should setup update note action object correctly', () => {

  const updates = { title: 'Ilya' };
  const action = updateNote(notes[0].id, updates);
  expect(action).toEqual({
    type: 'UPDATE_NOTE',
    id: notes[0].id,
    updates
  });
});

test('should setup change note importance tag action object correctly', () => {

  const action = changeImportance(notes[0].id);
  expect(action).toEqual({
    type: 'TOGGLE_IMPORTANCE',
    id: notes[0].id,
  });
});

test('should setup remove tag from note action object correctly', () => {

  const action = removeTag(tags.list[0].id);
  expect(action).toEqual({
    type: 'REMOVE_TAG_FROM_NOTES',
    id: tags.list[0].id,
  });
});

test('should setup update tag from note action object correctly', () => {
  const update = { value: 'Ha ha' };
  const action = updateTag(tags.list[0].id, update);
  expect(action).toEqual({
    type: 'UPDATE_NOTES_TAG',
    id: tags.list[0].id,
    update
  });
});
