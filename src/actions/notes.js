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

export const toggleImportance = ( id ) => ({
  type: 'TOGGLE_IMPORTANCE',
  id,
});

export const startSetNotes = () => {
  return (dispatch, getState) => {
    const notes = [];
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);

    docRef.get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if(doc.exists) {
            notes.push({id: doc.id, ...doc.data()});
          } else {
            console.log('No such document!');
          }
        });

        dispatch(setNotes(notes));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const startAddExpense = (noteData = {}) => {
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

export const startRemoveNote = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const docRef = initDocumentRef(uid);
    try {
      dispatch(removeNote(id));
      await docRef.doc(id).delete();
    } catch (e) {
      console.log(e);
    }
  };
};

export const startUpdateNote = (id, updates) => {
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

export const toggleNoteImportance = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);
    try {
      dispatch(toggleImportance(id));
      const doc = await docRef.doc(id).get();
      if(doc.exists) {
        const impValue = doc.data().importance;

        await docRef.doc(id).update({
          important: !impValue
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

