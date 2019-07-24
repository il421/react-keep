import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  setNotes, addNote, removeNote, updateNote, changeImportance, removeTag, updateTag, handleSetNotes,
  handleAddENote, handleRemoveNote, handleUpdateNote, changeNoteImportance, removeTagFromNotes,
  updateNotesTag } from '../../../../actions/notes';
import { notes, tags } from '../../../fixtures/unit';
import database from '../../../../firebase/firebase';


const uid = 'PpHPdiJXZaNPnET2H8o9MUaPAVA2';
const defaultAuthState = {auth: { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  // to firestore format data
  notes.forEach(({ id, title, text, important, createAt, color, tags }) => {
    const note = { title, text, important, createAt, color, tags };

    // set data to test firestore
    database.collection('users').doc(uid).collection('notes').doc(id).set(note)
      .then(() => done());
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

test('should add a note to DB and store', (done) => {
  const newNote = {
    color: '#cbf0f8',
    createAt: 1562906831467,
    important: false,
    tags: [
      {
        id: 'YpjypoYGueKBUukRPQ5F',
        value: 'Not important'
      }
    ],
    text: 'Dont forget to make a call',
    title: 'Call'
  };

  const store = createMockStore(defaultAuthState);

  store.dispatch(handleAddENote(newNote)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_NOTE',
      note: {
        id: expect.any(String),
        ...newNote
      }
    });

    database.collection('users').doc(uid).collection('notes').doc(actions[0].note.id).get()
      .then((doc) => {
        if (doc.exists) {
          expect(doc.data()).toEqual(newNote);
        }
        done();
      });

  });
});

test('should setup remove note action object correctly', () => {

  const action = removeNote(notes[0].id);
  expect(action).toEqual({
    type: 'REMOVE_NOTE',
    id: notes[0].id
  });
});

test('should remove a note to DB and store by id', (done) => {
  const id = 'kYKnuzVVnPKKhohfo7Z7';

  const store = createMockStore(defaultAuthState);

  store.dispatch(handleRemoveNote(id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_NOTE',
      id
    });

    database.collection('users').doc(uid).collection('notes').doc(id).get()
      .then((doc) => {
        expect(doc.exists).toBe(false);
        done();
      });

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

test('should update a note in DB and store by id', (done) => {
  const id = 'orNjPwhicsrT5HZ7FdV8';
  const updates = {
    color: '#cbf0f8',
    createAt: 1562906831465,
    important: false,
    tags: [
      {
        id: 'YpjypoYGueKBUukRPQ5F',
        value: 'Not important'
      }
    ],
    text: 'I need to buy a bike for my son.',
    title: 'I love Tany'
  };

  const store = createMockStore(defaultAuthState);

  store.dispatch(handleUpdateNote(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'UPDATE_NOTE',
      id,
      updates
    });

    database.collection('users').doc(uid).collection('notes').doc(id).get()
      .then((doc) => {
        if (doc.exists) {
          expect(doc.data().text).toBe(updates.text);
        }
        done();
      });

  });
});

test('should setup change note importance tag action object correctly', () => {

  const action = changeImportance(notes[0].id);
  expect(action).toEqual({
    type: 'TOGGLE_IMPORTANCE',
    id: notes[0].id,
  });
});

test('should setup change note importance tag in DB and store by id', (done) => {
  const id = 'orNjPwhicsrT5HZ7FdV8';
  const store = createMockStore(defaultAuthState);

  store.dispatch(changeNoteImportance(id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'TOGGLE_IMPORTANCE',
      id
    });

    database.collection('users').doc(uid).collection('notes').doc(id).get()
      .then((doc) => {
        if (doc.exists) {
          expect(doc.data().important).toBe(true);
        }
        done();
      });
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

test('should update tag in a note in DB and store by id', (done) => {
  const store = createMockStore(defaultAuthState);
  const update = { value: 'Ha ha' };

  store.dispatch(updateNotesTag(tags.list[0].id, update.value)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'UPDATE_NOTES_TAG',
      id: tags.list[0].id,
      update: update.value
    });

    const id = 'orNjPwhicsrT5HZ7FdV8';

    database.collection('users').doc(uid).collection('notes').doc(id).get()
      .then((doc) => {
        if (doc.exists) {
          expect(doc.data().tags[0].value).toBe(update.value);
        }
        done();
      });
  });
});

test('should setup remove tag from note action object correctly', () => {

  const action = removeTag(tags.list[0].id);
  expect(action).toEqual({
    type: 'REMOVE_TAG_FROM_NOTES',
    id: tags.list[0].id,
  });
});

test('should remove tag from note in DB and store by id', (done) => {

  const store = createMockStore(defaultAuthState);

  store.dispatch(removeTagFromNotes(tags.list[0].id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_TAG_FROM_NOTES',
      id: tags.list[0].id,
    });

    const id = 'orNjPwhicsrT5HZ7FdV8';

    database.collection('users').doc(uid).collection('notes').doc(id).get()
      .then((doc) => {
        if (doc.exists) {
          expect(doc.data().tags.length).toBe(0);
        }
        done();
      });
  });
});
