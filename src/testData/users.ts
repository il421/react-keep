import { Collaborator } from "../store/store.types";

export const user = {
  email: "app.ilya.testing@gmail.com",
  password: "il421sugTest",
  uid: "{SECURE_TEST_USER_UID}",
  firstName: "Ilya",
  lastName: "Suglobov",
  url: null
};

export const collaborators: Collaborator[] = [
  {
    email: "test1@gmail.com",
    uid: "BYKMnT7RSfeyrLiBAZwvGLajEPF2",
    displayName: "Ivan",
    photoURL: "http://test.com"
  },
  {
    email: "test2@gmail.com",
    uid: "Q81hnXu9qJM5Y2iTRkun6gVRj0i1",
    displayName: "Tany",
    photoURL: "http://tdest.com"
  }
];
