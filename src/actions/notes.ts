import database from "../firebase/firebase";
import {
  AddNote,
  AddNoteAction,
  Note,
  NotesActionsTypes,
  RemoveNoteAction,
  RemoveNoteTagAction,
  SetNotesAction,
  Store,
  Tag,
  ToggleImportantAction,
  UpdateNoteAction
} from "../store/store.types";
import { Dispatch } from "redux";
import { getMessage, Message } from "../common";
import { toast } from "react-toastify";
import moment from "moment";

const initDocumentRef = (uid: string) => {
  const USERS_NOTES_DATABASE = "users";
  return database.collection(USERS_NOTES_DATABASE).doc(uid).collection("notes");
};

const setNotes = (notes: Note[]): SetNotesAction => ({
  type: NotesActionsTypes.setNotes,
  notes
});

const addNote = (note: Note): AddNoteAction => ({
  type: NotesActionsTypes.addNote,
  note
});

const removeNote = (id: string): RemoveNoteAction => ({
  type: NotesActionsTypes.removeNote,
  id
});

const updateNote = (id: string, updates: Note): UpdateNoteAction => ({
  type: NotesActionsTypes.updateNote,
  id,
  updates
});

const changeImportance = (id: string): ToggleImportantAction => ({
  type: NotesActionsTypes.toggleImportance,
  id
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
        if(doc.exists) {
          notes.push({ id: doc.id, ...doc.data() as Note });
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

    const newNote = {
      createdAt: moment().valueOf(),
      updatedAt: moment().valueOf(),
      important: false,
      ...note
    };
    try {
      const docRef = await initDocumentRef(uid).add(newNote);
      dispatch(addNote({
        id: docRef.id,
        ...newNote
      }));
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
      await dispatch(removeNote(id));
      await docRef.doc(id).delete();
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
};

export const handleUpdateNote = (id: string, updates: Note) => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;

    const docRef = initDocumentRef(uid);
    try {
      dispatch(updateNote(id, updates));
      await docRef.doc(id).set(updates);
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
      if(doc.exists) {
        const note = doc.data() as Note;
        const impValue = note.important;

        await docRef.doc(id).update({
          important: !impValue
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
        if(doc.exists) {
          let data = doc.data();

          if (data.tags.length > 0) {
            let updatedTags = data.tags.filter((tag: Tag) => tag.id !== id);
            docRef.doc(doc.id).update({
              tags: updatedTags
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
