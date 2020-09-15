import { collaborators, user } from "../../testData/users";
import {
  AuthStoreState,
  Collaborator,
  CollaboratorsActionsTypes,
} from "../../store/store.types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";
import { Collections } from "../../firebase/Collections";
import {
  addCollaborator,
  handleAddCollaborator,
  handleRemoveCollaborator,
  handleSetCollaborators,
  removeCollaborator,
  setCollaborators,
} from "../collaborators";

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
  collaborators.forEach((coll: Collaborator) => {
    // set data to test firestore
    database
      .collection(Collections.users)
      .doc(user.uid)
      .collection(Collections.collaborators)
      .doc(coll.uid)
      .set({})
      .then(() => done())
      .catch(() => done());
  });
});

afterAll((done) => {
  database
    .collection(Collections.users)
    .doc(user.uid)
    .collection(Collections.collaborators)
    .get()
    .then((res) => {
      res.forEach((coll) => {
        coll.ref.delete();
      });
    })
    .then(() => done())
    .catch(() => done());
});

test("should setup set collaborators action object correctly", () => {
  const action = setCollaborators(collaborators);
  expect(action).toEqual({
    type: CollaboratorsActionsTypes.setCollaborators,
    collaborators,
  });
});

test("should fetch the collaborators from DB", (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch<any>(handleSetCollaborators()).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: CollaboratorsActionsTypes.setCollaborators,
      collaborators: expect.arrayContaining(
        collaborators.map((c) => ({
          uid: c.uid,
          email: expect.anything(),
          displayName: expect.anything(),
          photoURL: expect.anything(),
        }))
      ),
    });
    done();
  });
});

test("should setup add collaborator action object correctly", () => {
  const action = addCollaborator(collaborators[0]);
  expect(action).toEqual({
    type: CollaboratorsActionsTypes.addCollaborator,
    data: collaborators[0],
  });
});

test("should add a collaborator to DB and store", (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch<any>(handleAddCollaborator(collaborators[0])).then(() => {
    const actions = store.getActions();
    const id = actions[0].data.uid;
    expect(actions[0]).toEqual({
      type: CollaboratorsActionsTypes.addCollaborator,
      data: collaborators[0],
    });

    database
      .collection(Collections.users)
      .doc(user.uid)
      .collection(Collections.collaborators)
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          expect(doc.data()).toEqual({});
        }
        done();
      });
  });
});

test("should setup remove collaborator action object correctly", () => {
  const action = removeCollaborator(collaborators[0].uid);
  expect(action).toEqual({
    type: CollaboratorsActionsTypes.removeCollaborator,
    uid: collaborators[0].uid,
  });
});

test("should remove a collaborator from collaborators in DB and store by uid", (done) => {
  const store = createMockStore(defaultAuthState);

  store
    .dispatch<any>(handleRemoveCollaborator(collaborators[0].uid))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: CollaboratorsActionsTypes.removeCollaborator,
        uid: collaborators[0].uid,
      });

      database
        .collection(Collections.users)
        .doc(user.uid)
        .collection(Collections.collaborators)
        .doc(collaborators[0].uid)
        .get()
        .then((doc) => {
          expect(doc.exists).toBe(false);
          done();
        });
    });
});
