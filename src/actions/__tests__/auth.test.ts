import {
  login,
  logout,
  loading,
  updateUserData,
  toggleUserModal,
} from "../auth";
import { user } from "../../testData/users";
import { AuthActionsTypes, AuthStoreState } from "../../store/store.types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { firebase } from "../../firebase/firebase";

export const defaultAuthState = {
  auth: {
    uid: user.uid,
    name: user.firstName,
    url: user.url,
    loading: false,
    email: user.email,
  } as AuthStoreState,
};
const createMockStore = configureMockStore([thunk]);

beforeAll((done) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(() => done());
});

afterAll(async (done) => {
  const currentUser = await firebase.auth().currentUser;
  if (currentUser) {
    currentUser
      .updateProfile({
        displayName: "Ilya Suglobov",
        photoURL: null,
      })
      .then(() => done());
  }
});

test("should generate loading action object correctly", () => {
  const action = loading(true);
  expect(action).toEqual({
    type: AuthActionsTypes.loading,
    loading: true,
  });
});

test("should generate login action object", () => {
  const action = login(user.uid, user.firstName, user.url, user.email);
  expect(action).toEqual({
    type: AuthActionsTypes.login,
    uid: user.uid,
    name: user.firstName,
    url: user.url,
    email: user.email,
  });
});

test("should generate logout action object", () => {
  const action = logout();
  expect(action).toEqual({
    type: AuthActionsTypes.logout,
  });
});

test("should generate toggle action object", () => {
  const action = toggleUserModal(true);
  expect(action).toEqual({
    type: AuthActionsTypes.toggleModal,
    isUserModalOpen: true,
  });
});

test("should fetch the data from DB", async (done) => {
  const store = createMockStore(defaultAuthState);
  store
    .dispatch<any>(
      updateUserData({
        displayName: "Ivan Suglobov",
        photoURL: null,
        tenantId: user.uid,
      })
    )
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: AuthActionsTypes.loading,
        loading: true,
      });
      expect(actions[1]).toEqual({
        type: AuthActionsTypes.login,
        name: "Ivan Suglobov",
        uid: user.uid,
        url: null,
      });

      expect(actions[2]).toEqual({
        type: AuthActionsTypes.loading,
        loading: false,
      });
      done();
    });
});
