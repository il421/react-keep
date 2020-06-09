import { user } from "../../testData/users";
import {
  AuthStoreState,
  Note,
  NotesActionsTypes,
} from "../../store/store.types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { notes } from "../../testData/notes";
import database from "../../firebase/firebase";
import { Collections } from "../../firebase/Collections";
import {
  addNote,
  handleAddNote,
  handleRemoveNote,
  handleSetNotes,
  removeNote,
  setNotes,
} from "../notes";
import { tags } from "../../testData/tags";
import { NoteType } from "../../components/notes/notes.types";

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
  notes.forEach((note: Note) => {
    // set data to test firestore
    const { id, ...rest } = note;
    database
      .collection(Collections.users)
      .doc(user.uid)
      .collection(Collections.notes)
      .doc(id)
      .set(rest)
      .then(() => done());
  });
});

afterAll((done) => {
  database
    .collection(Collections.users)
    .doc(user.uid)
    .collection(Collections.notes)
    .get()
    .then((res) => {
      res.forEach((note) => {
        note.ref.delete();
      });
    })
    .then(() => done());
});

test("should setup set notes action object correctly", () => {
  const action = setNotes(notes);
  expect(action).toEqual({
    type: NotesActionsTypes.setNotes,
    notes,
  });
});

test("should fetch the notes from DB", (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch<any>(handleSetNotes()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: NotesActionsTypes.setNotes,
      notes,
    });
    done();
  });
});

test("should setup add note action object correctly", () => {
  const action = addNote(notes[0]);
  expect(action).toEqual({
    type: NotesActionsTypes.addNote,
    note: notes[0],
  });
});

test("should add a note to DB and store", (done) => {
  const newNote: Omit<Note, "id" | "createdAt" | "updatedAt"> = {
    color: "#cbf0f8",
    important: false,
    archive: false,
    tags: [tags[0].id],
    type: NoteType.text,
    content: "Dont forget to make a call",
    title: "Call",
  };

  const store = createMockStore(defaultAuthState);
  let id: string | undefined;
  let createdAt: number | undefined;
  let updatedAt: number | undefined;

  store.dispatch<any>(handleAddNote(newNote)).then(() => {
    const actions = store.getActions();
    id = actions[0].note.id;
    createdAt = actions[0].note.createdAt;
    updatedAt = actions[0].note.updatedAt;
    expect(actions[0]).toEqual({
      type: NotesActionsTypes.addNote,
      note: {
        id,
        createdAt,
        updatedAt,
        ...newNote,
      },
    });

    database
      .collection(Collections.users)
      .doc(user.uid)
      .collection(Collections.notes)
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          expect(doc.data()).toEqual({
            createdAt,
            updatedAt,
            ...newNote,
          });
        }
        done();
      });
  });
});

test("should setup remove note action object correctly", () => {
  const action = removeNote(notes[0].id);
  expect(action).toEqual({
    type: NotesActionsTypes.removeNote,
    id: notes[0].id,
  });
});

test("should remove a note to DB and store by id", (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch<any>(handleRemoveNote(notes[0].id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: NotesActionsTypes.removeNote,
      id: notes[0].id,
    });

    database
      .collection(Collections.users)
      .doc(user.uid)
      .collection(Collections.notes)
      .doc(notes[0].id)
      .get()
      .then((doc) => {
        expect(doc.exists).toBe(false);
        done();
      });
  });
});
