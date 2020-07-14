import {
  AddNote,
  AddNoteAction,
  ImageItem,
  Note,
  NotesActionsTypes,
  NotesStoreState,
  RemoveNoteAction,
  RemoveNoteTagAction,
  SetNotesAction,
  Store,
  ToggleArchiveAction,
  ToggleImportantAction,
  UpdateNote,
  UpdateNoteAction,
} from "../store/store.types";
import { Action, Dispatch } from "redux";
import { getMessage, Message } from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import database, { firebase, storage } from "../firebase/firebase";
import { NoteType } from "../components/notes";
import { v4 as uuidv4 } from "uuid";
import { Collections } from "../firebase/Collections";
import { ThunkAction } from "redux-thunk";

const initStorageImageRef = (name: string): firebase.storage.Reference => {
  const ref = storage.ref();
  return ref.child(`${Collections.images}/${name}`);
};

const initDocumentRef = (uid: string) => {
  return database
    .collection(Collections.users)
    .doc(uid)
    .collection(Collections.notes);
};

export const setNotes = (notes: Note[]): SetNotesAction => ({
  type: NotesActionsTypes.setNotes,
  notes,
});

export const addNote = (note: Note): AddNoteAction => ({
  type: NotesActionsTypes.addNote,
  note,
});

export const removeNote = (id: string): RemoveNoteAction => ({
  type: NotesActionsTypes.removeNote,
  id,
});

export const updateNote = (
  id: string,
  updates: UpdateNote
): UpdateNoteAction => ({
  type: NotesActionsTypes.updateNote,
  id,
  updates,
});

export const changeImportance = (id: string): ToggleImportantAction => ({
  type: NotesActionsTypes.toggleImportance,
  id,
});

export const changeArchive = (id: string): ToggleArchiveAction => ({
  type: NotesActionsTypes.toggleArchive,
  id,
});

export const removeTag = (tagId: string): RemoveNoteTagAction => ({
  type: NotesActionsTypes.removeTagFromNote,
  tagId,
});

export const handleSetNotes = (): ThunkAction<any, Store, any, Action> => {
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
      notes.sort(
        (a: Note, b: Note) => b.createdAt.valueOf() - a.createdAt.valueOf()
      );

      dispatch(setNotes(notes));
    } catch (e) {
      toast.error(e.message);
      console.log(e.message);
    }
  };
};

export const handleAddNote = (
  note: AddNote
): ThunkAction<any, Store, any, Action> => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;
    let imageUrl: string | null = null;
    let imageId: string | null = null;

    try {
      if (
        note.type === NoteType.image &&
        !!(note.content as ImageItem).uploadedImage
      ) {
        imageId = uuidv4() as string;
        const ref = initStorageImageRef(imageId);
        const snapshot = await ref.put(
          (note.content as ImageItem).uploadedImage!
        );
        if (snapshot) {
          imageUrl = await snapshot.ref.getDownloadURL();
        }
      }

      const newNote: Omit<Note, "id"> = {
        ...note,
        content:
          note.type === NoteType.image
            ? { text: (note.content as ImageItem).text, imageUrl, imageId }
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

export const handleRemoveNote = (
  id: string
): ThunkAction<any, Store, any, Action> => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;
    const notes = getState().notes;

    const deletedNote = notes.find((n: NotesStoreState) => n.id === id);
    if (!deletedNote) {
      toast.error(getMessage(Message.noteNotFound));
      return;
    }

    const docRef = initDocumentRef(uid);
    try {
      await docRef.doc(id).delete();

      // delete the image from storage if exist
      if (
        deletedNote.type === NoteType.image &&
        (deletedNote.content as ImageItem).imageId !== null
      ) {
        const ref = initStorageImageRef(
          (deletedNote.content as ImageItem).imageId!
        );
        await ref.delete();
      }
      dispatch(removeNote(id));
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
};

export const handleUpdateNote = (
  id: string,
  updates: UpdateNote
): ThunkAction<any, Store, any, Action> => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);
    let imageId: string | null = null;
    let imageUrl: string | null = null;

    try {
      // in case if update an image
      if (
        updates.type === NoteType.image &&
        (updates.content as ImageItem).uploadedImage
      ) {
        // delete the old image
        const delRef = initStorageImageRef(
          (updates.content as ImageItem).imageId!
        );
        await delRef.delete();

        // store a new one
        imageId = uuidv4() as string;
        const ref = initStorageImageRef(imageId);
        const snapshot = await ref.put(
          (updates.content as ImageItem).uploadedImage!
        );
        if (snapshot) {
          imageUrl = await snapshot.ref.getDownloadURL();
        }
      }
      const note = {
        ...updates,
        content:
          updates.type === NoteType.image
            ? {
                text: (updates.content as ImageItem).text,
                imageUrl: imageUrl ?? (updates.content as ImageItem).imageUrl,
                imageId: imageId ?? (updates.content as ImageItem).imageId,
              }
            : updates.content,
      };

      // update the note
      await docRef.doc(id).set(note);
      dispatch(updateNote(id, note));
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };
};

export const changeNoteImportance = (
  id: string
): ThunkAction<any, Store, any, Action> => {
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

export const changeNoteArchiveStatus = (
  id: string
): ThunkAction<any, Store, any, Action> => {
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

export const removeTagFromNotes = (
  id: string
): ThunkAction<any, Store, any, Action> => {
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
