import {
  AddNote,
  AddNoteAction,
  ImageItem,
  ListItem,
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

      const content =
        note.type === NoteType.image
          ? { text: (note.content as ImageItem).text, imageUrl, imageId }
          : note.type === NoteType.list
          ? (note.content as ListItem[]).filter(
              // remove all empty items if a list note
              (i) => i.content.trim().length > 0
            )
          : note.content;

      const newNote: Omit<Note, "id"> = {
        ...note,
        content,
        createdAt: moment().valueOf(),
        updatedAt: moment().valueOf(),
        important: false,
        archive: false,
      };

      // add note to DB
      const docRef = await initDocumentRef(uid).add(newNote);

      // if has collaborators, add one for each with the case id
      if (newNote.collaborators && newNote.collaborators.length > 0) {
        await addNoteToCollaborators(newNote, uid, docRef.id);
      }

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

export const addNoteToCollaborators = async (
  note: Omit<Note, "id">,
  createdBy: string,
  docId: string
) => {
  const collNote: Omit<Note, "id"> = {
    ...note,
    tags: [],
    important: false,
    archive: false,
    createdBy,
  };
  await handleCollaboratorsPromises({
    collaborators: note.collaborators!,
    callback: (collUid) => initDocumentRef(collUid).doc(docId).set(collNote),
  });
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

    const { collaborators, type, content } = deletedNote;
    const docRef = initDocumentRef(uid);
    try {
      await docRef.doc(id).delete();

      // delete the image from storage if exist
      if (type === NoteType.image && (content as ImageItem).imageId !== null) {
        const ref = initStorageImageRef((content as ImageItem).imageId!);
        await ref.delete();
      }

      if (collaborators && collaborators.length > 0) {
        await removeNoteFromCollaborators(deletedNote, uid);
      }

      dispatch(removeNote(id));
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
};

export const removeNoteFromCollaborators = async (
  deletedNote: Note,
  uid: string
) => {
  // AS OWNER: collaborators, and createdBy from all collaborators
  if (!deletedNote.createdBy) {
    const { collaborators = [] } = deletedNote;

    await handleCollaboratorsPromises({
      collaborators,
      callback: async (
        collUid // deleted all notes with the same id
      ) => {
        // get the shared note
        let note: Note | undefined = undefined;
        const notes = await initDocumentRef(collUid).get();

        notes.docs.forEach((snapshot) => {
          if (snapshot.id === deletedNote.id) {
            note = snapshot.data() as Note;
          }
        });

        // if found clone one with a new id
        if (note) {
          return initDocumentRef(collUid).add({
            ...note!,
            collaborators: [],
            createdBy: "",
          } as Note);
        } else {
          console.log(getMessage(Message.noteNotFound));
          toast.error(getMessage(Message.noteNotFound));
          return;
        }
      },
    });

    // delete the shared one
    await handleCollaboratorsPromises({
      collaborators,
      callback: (
        collUid // deleted all notes with the same id
      ) => initDocumentRef(collUid).doc(deletedNote.id).delete(),
    });
  } else {
    // AS COLLABORATOR: deleted uid from collaborators of the note, and owner
    const { id, collaborators = [], createdBy } = deletedNote;
    // all collaborators excluding current one
    const filteredCollaborators: string[] = collaborators!.filter(
      (coll) => coll !== uid
    );

    await handleCollaboratorsPromises({
      collaborators: [...filteredCollaborators, createdBy],
      callback: (
        collUid // update
      ) =>
        initDocumentRef(collUid)
          .doc(id)
          .update({ collaborators: filteredCollaborators }),
    });
  }
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

      const content =
        updates.type === NoteType.image
          ? {
              text: (updates.content as ImageItem).text,
              imageUrl: imageUrl ?? (updates.content as ImageItem).imageUrl,
              imageId: imageId ?? (updates.content as ImageItem).imageId,
            }
          : updates.type === NoteType.list
          ? (updates.content as ListItem[]).filter(
              // remove all empty items if a list note
              (i) => i.content.trim().length > 0
            )
          : updates.content;

      const note = {
        ...updates,
        content,
        // set user id in createdBy field if the note has collaborators
        createdBy:
          updates.collaborators && updates.collaborators.length > 0
            ? updates.createdBy === uid
              ? uid
              : updates.createdBy
            : undefined,
        id: undefined,
      };

      const cleanedNote: Note = JSON.parse(JSON.stringify(note));
      // update the note
      await docRef.doc(id).set(cleanedNote);

      // update note for all collaborators
      if (cleanedNote.collaborators && cleanedNote.collaborators.length > 0) {
        const oldNote = getState().notes.find((n) => n.id === id);
        // check are there any updates in title, content, or collaborators
        if (
          oldNote &&
          (oldNote.title !== updates.title ||
            oldNote.content !== updates.content ||
            oldNote.collaborators.length !== updates.collaborators.length ||
            !oldNote.collaborators.some((c) =>
              updates.collaborators.includes(c)
            ))
        ) {
          await updateCollaboratorsNote(cleanedNote, id, uid);
        }
      }

      dispatch(updateNote(id, cleanedNote));
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };
};

export const updateCollaboratorsNote = async (
  note: Note,
  noteId: string,
  uid: string
) => {
  const { createdBy, title, content, updatedAt } = note;
  const collaborators: string[] = [
    ...note.collaborators!,
    createdBy ?? "",
  ].filter((coll: string) => coll && coll !== uid);

  await handleCollaboratorsPromises({
    collaborators,
    callback: async (collUid) => {
      const doc = await initDocumentRef(collUid).doc(noteId).get();
      // if exists update, not add a new one
      if (doc.exists) {
        return initDocumentRef(collUid)
          .doc(noteId)
          .update({
            title,
            content,
            updatedAt,
            collaborators,
          } as Note);
      } else {
        return initDocumentRef(collUid)
          .doc(noteId)
          .set({ ...note, createdBy: uid } as Note);
      }
    },
  });
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

export const handleCollaboratorsPromises = async (options: {
  collaborators: string[];
  callback: (callUid: string) => Promise<any>;
}) => {
  const { collaborators, callback } = options;
  let promises: Promise<any>[] = [];

  collaborators.forEach((callUid: string) => {
    promises.push(callback(callUid));
  });

  return Promise.all(promises).catch((e) => {
    console.log(e.message);
    toast.error(e.message);
  });
};
