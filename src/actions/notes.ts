import {
  AddNote,
  AddNoteAction,
  ImageItem,
  Note,
  NotesActionsTypes,
  RemoveNoteAction,
  RemoveNoteTagAction,
  SetNotesAction,
  Store,
  ToggleArchiveAction,
  ToggleImportantAction,
  UpdateNote,
  UpdateNoteAction,
} from "../store/store.types";
import { Dispatch } from "redux";
import { getMessage, Message } from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import database, { firebase, storage } from "../firebase/firebase";
import { NoteType } from "../components/notes/notes.types";
import { v4 as uuidv4 } from "uuid";

const initStorageAvatarRef = (name: string): firebase.storage.Reference => {
  const IMAGES = "images";

  const ref = storage.ref();
  return ref.child(`${IMAGES}/${name}`);
};

const initDocumentRef = (uid: string) => {
  const USERS_NOTES_DATABASE = "users";
  return database.collection(USERS_NOTES_DATABASE).doc(uid).collection("notes");
};

const setNotes = (notes: Note[]): SetNotesAction => ({
  type: NotesActionsTypes.setNotes,
  notes,
});

const addNote = (note: Note): AddNoteAction => ({
  type: NotesActionsTypes.addNote,
  note,
});

const removeNote = (id: string): RemoveNoteAction => ({
  type: NotesActionsTypes.removeNote,
  id,
});

const updateNote = (id: string, updates: UpdateNote): UpdateNoteAction => ({
  type: NotesActionsTypes.updateNote,
  id,
  updates,
});

const changeImportance = (id: string): ToggleImportantAction => ({
  type: NotesActionsTypes.toggleImportance,
  id,
});

const changeArchive = (id: string): ToggleArchiveAction => ({
  type: NotesActionsTypes.toggleArchive,
  id,
});

const removeTag = (tagId: string): RemoveNoteTagAction => ({
  type: NotesActionsTypes.removeTagFromNote,
  tagId,
});

export const handleSetNotes = () => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const notes: Note[] = [];
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);

    try {
      const snapshot = await docRef.get();
      snapshot.forEach((doc) => {
        if (doc.exists) {
          notes.push({ id: doc.id, ...(doc.data() as Note) });
        } else {
          toast.error(Message.errorNoSuchDoc);
          console.log(getMessage(Message.errorNoSuchDoc));
        }
      });

      // sort notes by created day
      notes.sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf());

      dispatch(setNotes(notes));
    } catch (e) {
      toast.error(e.message);
      console.log(e.message);
    }
  };
};

export const handleAddNote = (note: AddNote) => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;
    let imageUrl: string | null = null;

    try {
      if (
        note.type === NoteType.image &&
        !!(note.content as ImageItem).uploadingImage
      ) {
        const ref = initStorageAvatarRef(uuidv4());
        const snapshot = await ref.put(
          (note.content as ImageItem).uploadingImage!
        );
        if (snapshot) {
          imageUrl = await snapshot.ref.getDownloadURL();
        }
      }

      const newNote: Omit<Note, "id"> = {
        ...note,
        content:
          (note.type === NoteType.image)
            ? { content: (note.content as ImageItem).content, imageUrl }
            : note.content,
        createdAt: moment().valueOf(),
        updatedAt: moment().valueOf(),
        important: false,
        archive: false,
      };
      const docRef = await initDocumentRef(uid).add(newNote);
      dispatch(
        addNote({
          id: docRef.id,
          ...newNote,
        })
      );
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
};

export const handleRemoveNote = (id: string) => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;

    const docRef = initDocumentRef(uid);
    try {
      await docRef.doc(id).delete();
      dispatch(removeNote(id));
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
};

export const handleUpdateNote = (id: string, updates: UpdateNote) => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;
    // @todo update

    const docRef = initDocumentRef(uid);
    try {
      await docRef.doc(id).set(updates);
      dispatch(updateNote(id, updates));
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };
};

export const changeNoteImportance = (id: string) => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);

    try {
      dispatch(changeImportance(id));

      const doc = await docRef.doc(id).get();
      if (doc.exists) {
        const note = doc.data() as Note;
        const impValue = note.important;

        await docRef.doc(id).update({
          important: !impValue,
        });
      }
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
};

export const changeNoteArchiveStatus = (id: string) => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);

    try {
      dispatch(changeArchive(id));

      const doc = await docRef.doc(id).get();
      if (doc.exists) {
        const note = doc.data() as Note;
        const archiveValue = note.archive;

        await docRef.doc(id).update({
          archive: !archiveValue,
        });
      }
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
};

export const removeTagFromNotes = (id: string) => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);

    dispatch(removeTag(id));

    try {
      const snapshot = await docRef.get();
      snapshot.forEach((doc) => {
        if (doc.exists) {
          let data = doc.data();

          if (data.tags.length > 0) {
            let updatedTags = data.tags.filter((tagId: string) => tagId !== id);
            docRef.doc(doc.id).update({
              tags: updatedTags,
            });
          }
        }
      });
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
};
