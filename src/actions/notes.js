import database from '../firebase/firebase';
const initDocumentRef = (uid) => {
  const USERS_NOTES_DATABASE = 'users';
  return database.collection(USERS_NOTES_DATABASE).doc(uid).collection('notes');
};


export const setNotes = (notes) => ({
  type: 'SET_NOTES',
  notes
});

export const addNote = (note) => ({
  type: 'ADD_NOTE',
  note
});

export const removeNote = (id) => ({
  type: 'REMOVE_NOTE',
  id
});

export const updateNote = ( id, updates ) => ({
  type: 'UPDATE_NOTE',
  id,
  updates
});

export const changeImportance = ( id ) => ({
  type: 'TOGGLE_IMPORTANCE',
  id,
});

export const removeTag = (id) => ({
  type: 'REMOVE_TAG_FROM_NOTES',
  id,
});

export const updateTag = (id, update) => ({
  type: 'UPDATE_NOTES_TAG',
  id,
  update,
});

export const handleSetNotes = () => {
  return async (dispatch, getState) => {
    const notes = [];
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);

    try {
      const snapshot = await docRef.get();
      snapshot.forEach((doc) => {
        if(doc.exists) {
          notes.push({id: doc.id, ...doc.data()});
        } else {
          console.log('No such document!');
        }
      });

      // sort notes by created day
      notes.sort((a, b) => b.createAt - a.createAt);

      dispatch(setNotes(notes));
    } catch (e) {
      console.log(e);
    }
  };
};

export const handleAddENote = (noteData = {}) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      title = '',
      text = '',
      color = '#fff',
      createAt = 0,
      important = false,
      tags = [],
    } = noteData;

    const note = { title, text, color, createAt, important, tags };

    try {
      const docRef = await initDocumentRef(uid).add(note);
      dispatch(addNote({
        id: docRef.id,
        ...note
      }));
    } catch (e) {
      console.log(e);
    }
  };
};

export const handleRemoveNote = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const docRef = initDocumentRef(uid);
    try {
      await dispatch(removeNote(id));
      await docRef.doc(id).delete();
    } catch (e) {
      console.log(e);
    }
  };
};

export const handleUpdateNote = (id, updates) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const docRef = initDocumentRef(uid);
    try {
      dispatch(updateNote(id, updates));
      await docRef.doc(id).set(updates);
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeNoteImportance = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);

    try {
      dispatch(changeImportance(id));

      const doc = await docRef.doc(id).get();
      if(doc.exists) {
        const impValue = doc.data().important;

        await docRef.doc(id).update({
          important: !impValue
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const removeTagFromNotes = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);

    dispatch(removeTag(id));

    try {
      const snapshot = await docRef.get();
      snapshot.forEach(async (doc) => {
        if(doc.exists) {
          let data = doc.data();

          if (data.tags.length > 0) {
            let updatedTags = data.tags.filter((tag) => tag.id !== id);
            await docRef.doc(doc.id).update({
              tags: updatedTags
            });
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateNotesTag = (id, update) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);

    dispatch(updateTag(id, update));

    try {
      const snapshot = await docRef.get();
      snapshot.forEach(async (doc) => {
        if(doc.exists) {
          let data = doc.data();
          let tags = data.tags;

          if (tags.some(tag => tag.id === id)) {
            tags.find(tag => tag.id === id).value = update;

            await docRef.doc(doc.id).update({
              tags
            });
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
};

