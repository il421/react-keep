import { Collaborator } from "../store/store.types";

export const user = {
  email: "app.ilya.testing@gmail.com",
  password: "{SECURE_TEST_USER_PASS}",
  uid: "{SECURE_TEST_USER_UID}",
  firstName: "Ilya",
  lastName: "Suglobov",
  url: null,
};

export const collaborators: Collaborator[] = [
  {
    email: "test1@gmail.com",
    uid: "KyddyBpci1Nijzd5CmHrDQFUFKF3",
    displayName: "Ivan",
    photoURL: "http://test.com",
    notesIds: ["1"],
  },
  {
    email: "test2@gmail.com",
    uid: "VXPqBsRtJcW7FFOtlUTZfkmjU222",
    displayName: "Tany",
    photoURL: "http://tdest.com",
    notesIds: ["1"],
  },
];
