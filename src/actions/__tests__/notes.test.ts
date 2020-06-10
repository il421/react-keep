import { user } from "../../testData/users";
import {
  AuthStoreState,
  Note,
  NotesActionsTypes,
} from "../../store/store.types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { newNote, notes, updatedNote } from "../../testData/notes";
import database from "../../firebase/firebase";
import { Collections } from "../../firebase/Collections";
import {
  addNote,
  changeArchive,
  changeImportance,
  changeNoteArchiveStatus,
  changeNoteImportance,
  handleAddNote,
  handleRemoveNote,
  handleSetNotes,
  handleUpdateNote,
  removeNote,
  removeTag,
  removeTagFromNotes,
  setNotes,
  updateNote,
} from "../notes";
import { tags } from "../../testData/tags";

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

describe("Setting", () => {
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
});

describe("Adding", () => {
  test("should setup add note action object correctly", () => {
    const action = addNote(notes[0]);
    expect(action).toEqual({
      type: NotesActionsTypes.addNote,
      note: notes[0],
    });
  });

  test("should add a note to DB and store", (done) => {
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
});
describe("Removing", () => {
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
});
describe("Updating", () => {
  test("should setup update note action object correctly", () => {
    const action = updateNote(notes[0].id, { ...notes[0], title: "test" });
    expect(action).toEqual({
      type: NotesActionsTypes.updateNote,
      id: notes[0].id,
      updates: { ...notes[0], title: "test" },
    });
  });

  test("should update a note in DB and store by id", (done) => {
    const store = createMockStore(defaultAuthState);

    store.dispatch<any>(handleUpdateNote(notes[0].id, updatedNote)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: NotesActionsTypes.updateNote,
        id: notes[0].id,
        updates: updatedNote,
      });

      database
        .collection(Collections.users)
        .doc(user.uid)
        .collection(Collections.notes)
        .doc(notes[0].id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            expect((doc.data() as Note).content).toBe(updatedNote.content);
            expect((doc.data() as Note).color).toBe(updatedNote.color);
            expect((doc.data() as Note).title).toBe(updatedNote.title);
          }
          done();
        });
    });
  });
});

describe("Importance", () => {
  test("should setup change note importance tag action object correctly", () => {
    const action = changeImportance(notes[0].id);
    expect(action).toEqual({
      type: NotesActionsTypes.toggleImportance,
      id: notes[0].id,
    });
  });

  test("should setup change note importance tag in DB and store by id", (done) => {
    const store = createMockStore(defaultAuthState);

    store.dispatch<any>(changeNoteImportance(notes[0].id)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: NotesActionsTypes.toggleImportance,
        id: notes[0].id,
      });

      database
        .collection(Collections.users)
        .doc(user.uid)
        .collection(Collections.notes)
        .doc(notes[0].id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            expect((doc.data() as Note).important).toBe(true);
          }
          done();
        });
    });
  });
});

describe("Archiving", () => {
  test("should setup change note archive status tag action object correctly", () => {
    const action = changeArchive(notes[0].id);
    expect(action).toEqual({
      type: NotesActionsTypes.toggleArchive,
      id: notes[0].id,
    });
  });

  test("should setup change note archive status tag in DB and store by id", (done) => {
    const store = createMockStore(defaultAuthState);

    store.dispatch<any>(changeNoteArchiveStatus(notes[0].id)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: NotesActionsTypes.toggleArchive,
        id: notes[0].id,
      });

      database
        .collection(Collections.users)
        .doc(user.uid)
        .collection(Collections.notes)
        .doc(notes[0].id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            expect((doc.data() as Note).archive).toBe(true);
          }
          done();
        });
    });
  });
});

describe("Tagging", () => {
  test("should setup remove tag from note action object correctly", () => {
    const action = removeTag(tags[0].id);
    expect(action).toEqual({
      type: NotesActionsTypes.removeTagFromNote,
      tagId: tags[0].id,
    });
  });

  test("should remove tag from note in DB and store by id", (done) => {
    const store = createMockStore(defaultAuthState);

    database
      .collection(Collections.users)
      .doc(user.uid)
      .collection(Collections.notes)
      .doc(notes[0].id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          expect((doc.data() as Note).tags.length).toBe(1);
          expect((doc.data() as Note).tags[0]).toBe(tags[0].id);
        }
        done();
      });

    store.dispatch<any>(removeTagFromNotes(tags[0].id)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: NotesActionsTypes.removeTagFromNote,
        tagId: tags[0].id,
      });

      database
        .collection(Collections.users)
        .doc(user.uid)
        .collection(Collections.notes)
        .doc(notes[0].id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            expect((doc.data() as Note).tags.length).toBe(0);
          }
          done();
        });
    });
  });
});
