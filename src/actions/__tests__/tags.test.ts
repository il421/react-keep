import { user } from "../../testData/users";
import { AuthStoreState, Tag, TagsActionsTypes } from "../../store/store.types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { tags } from "../../testData/tags";
import database from "../../firebase/firebase";
import { Collections } from "../../firebase/Collections";
import {
  addTag,
  handleAddTag,
  handleRemoveTag,
  handleSetTags,
  removeTag,
  setTags,
} from "../tags";

const defaultAuthState = {
  auth: {
    uid: user.uid,
    name: user.firstName,
    url: user.url,
    loading: false,
  } as AuthStoreState,
};
const createMockStore = configureMockStore([thunk]);

beforeAll((done) => {
  // to firestore format data
  tags.forEach((tag: Tag) => {
    // set data to test firestore
    database
      .collection(Collections.users)
      .doc(user.uid)
      .collection(Collections.tags)
      .doc(tag.id)
      .set({ value: tag.value })
      .then(() => done());
  });
});

afterAll((done) => {
  database
    .collection(Collections.users)
    .doc(user.uid)
    .collection(Collections.tags)
    .get()
    .then((res) => {
      res.forEach((tag) => {
        tag.ref.delete();
      });
    })
    .then(() => done());
});

test("should setup set tags action object correctly", () => {
  const action = setTags(tags);
  expect(action).toEqual({
    type: TagsActionsTypes.setTags,
    tags,
  });
});

test("should fetch the tags from DB", (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch<any>(handleSetTags()).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: TagsActionsTypes.setTags,
      tags: expect.arrayContaining(tags),
    });
    done();
  });
});

test("should setup add tag action object correctly", () => {
  const action = addTag(tags[0]);
  expect(action).toEqual({
    type: TagsActionsTypes.addTag,
    tag: tags[0],
  });
});

test("should add a note to DB and store", (done) => {
  const newTag: { value: string } = {
    value: "Tag3",
  };
  let id: undefined | string;

  const store = createMockStore(defaultAuthState);

  store.dispatch<any>(handleAddTag(newTag.value)).then(() => {
    const actions = store.getActions();
    id = actions[0].tag.id;
    expect(actions[0]).toEqual({
      type: TagsActionsTypes.addTag,
      tag: {
        id,
        ...newTag,
      },
    });

    database
      .collection(Collections.users)
      .doc(user.uid)
      .collection(Collections.tags)
      .doc(actions[0].tag.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          expect(doc.data()).toEqual(newTag);
        }
        done();
      });
  });
});

test("should setup remove tag action object correctly", () => {
  const action = removeTag(tags[0].id);
  expect(action).toEqual({
    type: TagsActionsTypes.removeTag,
    id: tags[0].id,
  });
});

test("should remove a tag from tags in DB and store by id", (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch<any>(handleRemoveTag(tags[0].id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: TagsActionsTypes.removeTag,
      id: tags[0].id,
    });

    database
      .collection(Collections.users)
      .doc(user.uid)
      .collection(Collections.tags)
      .doc(tags[0].id)
      .get()
      .then((doc) => {
        expect(doc.exists).toBe(false);
        done();
      });
  });
});
