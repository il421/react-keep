import { collaborators, user } from "../../testData/users";
import { ListItem, Note, NotesActionsTypes } from "../../store/store.types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { newNote, notes, updatedNote } from "../../testData/notes";
import database from "../../firebase/firebase";
import { Collections } from "../../firebase/Collections";
import { v4 as uuidv4 } from "uuid";

import {
  addNote,
  addNoteToCollaborators,
  changeArchive,
  changeImportance,
  changeNoteArchiveStatus,
  changeNoteImportance,
  handleAddNote,
  handleCollaboratorsPromises,
  handleRemoveNote,
  handleSetNotes,
  handleUpdateNote,
  removeNote,
  removeNoteFromCollaborators,
  removeTag,
  removeTagFromNotes,
  setNotes,
  updateCollaboratorsNote,
  updateNote,
} from "../notes";
import { tags } from "../../testData/tags";
import { NoteType } from "../../components/notes";

const defaultState = {
  auth: {
    uid: user.uid,
    name: user.firstName,
    url: user.url,
    loading: false,
  },
  notes: notes,
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
  [...collaborators.map((c) => c.uid), user.uid].forEach((uid) =>
    database
      .collection(Collections.users)
      .doc(uid)
      .collection(Collections.notes)
      .get()
      .then((res) => {
        res.forEach(async (note) => {
          await note.ref.delete();
          done();
        });
      })
  );
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
    const store = createMockStore(defaultState);
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
    const store = createMockStore(defaultState);
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
  test("should not include empty lines in a list note when add", (done) => {
    const store = createMockStore(defaultState);
    let id: string | undefined;
    const listNote = {
      ...newNote,
      type: NoteType.list,
      content: [
        { id: "1", checked: true, content: "content" },
        { id: "2", checked: false, content: "" },
        { id: "3", checked: true, content: "   " },
      ],
    };
    store.dispatch<any>(handleAddNote(listNote)).then(() => {
      const actions = store.getActions();
      id = actions[0].note.id;

      database
        .collection(Collections.users)
        .doc(user.uid)
        .collection(Collections.notes)
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            expect(((doc.data() as Note).content as ListItem[]).length).toBe(1);
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
    const store = createMockStore(defaultState);

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

  test("should not include empty lines in a list note when update", (done) => {
    const store = createMockStore(defaultState);
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { id, ...rest } = notes[1];
    const updates = {
      ...rest,
      content: [
        ...(rest.content as ListItem[]),
        { content: "   ", id: "123", checked: false },
      ],
    };

    store.dispatch<any>(handleUpdateNote(id, updates)).then(() => {
      database
        .collection(Collections.users)
        .doc(user.uid)
        .collection(Collections.notes)
        .doc(notes[1].id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            expect(((doc.data() as Note).content as ListItem[]).length).toBe(2);
          }
          done();
        });
    });
  });

  test("should update a note in DB and store by id", (done) => {
    const store = createMockStore(defaultState);

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
            expect((doc.data() as Note).id).toBeUndefined();
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
    const store = createMockStore(defaultState);

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
    const store = createMockStore(defaultState);

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
    const store = createMockStore(defaultState);

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

describe("Collaborators", () => {
  const collNote: Omit<Note, "id"> = {
    ...notes[0],
    tags: [],
    important: false,
    archive: false,
    createdBy: user.uid,
  };

  test("handleCollaboratorsPromises should resolve all promises", async () => {
    const result = await handleCollaboratorsPromises({
      collaborators: ["1", "2"],
      callback: (uid) =>
        new Promise((resolve) => {
          resolve(uid);
        }),
    });

    expect(result).toEqual(["1", "2"]);
  });

  test("should add note to collaborators", async (done) => {
    const docIdAdd = uuidv4();

    // added note to collaborators
    await addNoteToCollaborators(notes[0], user.uid, docIdAdd);
    // check if added
    notes[0].collaborators!.forEach((uid) => {
      database
        .collection(Collections.users)
        .doc(uid)
        .collection(Collections.notes)
        .doc(docIdAdd)
        .get()
        .then((doc) => {
          if (doc.exists) {
            expect(doc.data()).toEqual(collNote);
          }
          done();
        });
    });
  });

  test("should remove notes from collaborators as owner", async (done) => {
    // added note to collaborators
    const docIdRemove = uuidv4();
    await addNoteToCollaborators(notes[0], user.uid, docIdRemove);
    // check if added
    notes[0].collaborators!.forEach((uid) => {
      database
        .collection(Collections.users)
        .doc(uid)
        .collection(Collections.notes)
        .doc(docIdRemove)
        .get()
        .then((doc) => {
          if (doc.exists) {
            expect(doc.data()).toEqual(collNote);
          }
        });
    });

    // remove notes as owner
    await removeNoteFromCollaborators(
      { ...notes[0], createdBy: undefined, id: docIdRemove },
      user.uid
    );

    // check if removed
    notes[0].collaborators!.forEach((uid) => {
      database
        .collection(Collections.users)
        .doc(uid)
        .collection(Collections.notes)
        .doc(docIdRemove)
        .get()
        .then((doc) => {
          expect(doc.exists).toBeFalsy();
          done();
        });
    });
  });

  test("should remove notes from collaborators as collaborator", async (done) => {
    const docIdR = uuidv4();

    // added note to collaborators
    await addNoteToCollaborators(notes[0], user.uid, docIdR);

    // remove note as collaborator
    await removeNoteFromCollaborators(
      { ...notes[0], id: docIdR },
      collaborators[0].uid
    );

    // check if collaborator list is updated
    database
      .collection(Collections.users)
      .doc(collaborators[1].uid)
      .collection(Collections.notes)
      .doc(docIdR)
      .get()
      .then((doc) => {
        if (doc.exists) {
          expect((doc.data() as Note).collaborators!.length).toBe(1);
          expect((doc.data() as Note).collaborators![0]).toBe(
            collaborators[1].uid
          );
          done();
        }
      });
  });

  test("should update a note from collaborators", async (done) => {
    const docIdR = uuidv4();

    // added note to collaborators
    await addNoteToCollaborators(
      { ...notes[0], collaborators: [notes[0].collaborators[0]] },
      user.uid,
      docIdR
    );

    // update note with one new collaborator
    await updateCollaboratorsNote(
      { ...notes[0], title: "OOO" },
      docIdR,
      user.uid
    );

    // check if collaborator list is updated
    database
      .collection(Collections.users)
      .doc(collaborators[0].uid)
      .collection(Collections.notes)
      .doc(docIdR)
      .get()
      .then((doc) => {
        if (doc.exists) {
          expect((doc.data() as Note).title).toBe("OOO");
        }
      });

    // check if collaborator list is updated
    database
      .collection(Collections.users)
      .doc(collaborators[1].uid)
      .collection(Collections.notes)
      .doc(docIdR)
      .get()
      .then((doc) => {
        if (doc.exists) {
          expect((doc.data() as Note).title).toBe("OOO");
          done();
        }
      });
  });
});
