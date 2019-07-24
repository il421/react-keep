import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  setTags, addTag, removeTag, updateTag, handleDisplayTagsModal, handleSetTags, handleAddTag, handleRemoveTag,
  handleUpdateTag } from '../../../../actions/tags';
import { tags } from '../../../fixtures/unit';
import database from '../../../../firebase/firebase';

const uid = 'PpHPdiJXZaNPnET2H8o9MUaPAVA2';
const defaultAuthState = {auth: { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  // to firestore format data
  tags.list.forEach(({ id, value }) => {
    const tag = { value };

    // set data to test firestore
    database.collection('users').doc(uid).collection('tags').doc(id).set(tag)
      .then(() => done());
  });
});

test('should setup set tags action object correctly', () => {
  const action = setTags(tags.list);
  expect(action).toEqual({
    type: 'SET_TAGS',
    tags: tags.list
  });
});

test('should fetch the tags from DB', (done) => {

  const store = createMockStore(defaultAuthState);
  store.dispatch(handleSetTags()).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'SET_TAGS',
      tags: tags
    });
    done();
  });
});

test('should setup add tag action object correctly', () => {
  const action = addTag(tags.list[0]);
  expect(action).toEqual({
    type: 'ADD_TAG',
    tag: tags.list[0]
  });
});

test('should add a note to DB and store', (done) => {
  const newTag = {
    value: 'Ilya'
  };

  const store = createMockStore(defaultAuthState);

  store.dispatch(handleAddTag(newTag.value)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_TAG',
      tag: {
        id: expect.any(String),
        ...newTag
      }
    });

    database.collection('users').doc(uid).collection('tags').doc(actions[0].tag.id).get()
      .then((doc) => {
        if (doc.exists) {
          expect(doc.data()).toEqual(newTag);
        }
        done();
      });

  });
});

test('should setup update tag action object correctly', () => {
  const update = { value: 'Ilya' };
  const action = updateTag(tags.list[0].id, update);
  expect(action).toEqual({
    type: 'UPDATE_TAG',
    id: tags.list[0].id,
    update
  });
});

test('should update a tag value  in DB and store by id', (done) => {
  const store = createMockStore(defaultAuthState);
  const update = { value: 'Ilya' };

  store.dispatch(handleUpdateTag(tags.list[0].id, update.value)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'UPDATE_TAG',
      id: tags.list[0].id,
      update: update.value
    });

    database.collection('users').doc(uid).collection('tags').doc(tags.list[0].id).get()
      .then((doc) => {
        if (doc.exists) {
          expect(doc.data().value).toBe(update.value);
        }
        done();
      });
  });
});

test('should setup remove tag action object correctly', () => {
  const action = removeTag(tags.list[0].id);
  expect(action).toEqual({
    type: 'REMOVE_TAG',
    id: tags.list[0].id
  });
});

test('should remove a tag from tags in DB and store by id', (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(handleRemoveTag(tags.list[0].id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_TAG',
      id: tags.list[0].id,
    });

    database.collection('users').doc(uid).collection('tags').doc(tags.list[0].id).get()
      .then((doc) => {
        expect(doc.exists).toBe(false);
        done();
      });
  });
});

test('should setup handle display tags modal action object correctly', () => {
  const displayTagsModal = true;
  const action = handleDisplayTagsModal(displayTagsModal);
  expect(action).toEqual({
    type: 'DISPLAY_TAGS_MODAL',
    displayTagsModal
  });
});
