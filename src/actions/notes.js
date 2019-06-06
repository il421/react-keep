import database from '../firebase/firebase';

const USERS_NOTES_DATABASE = 'users';

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

export const startSetNotes = () => {
  return (dispatch, getState) => {
    const notes = [];
    const uid = getState().auth.uid;

    database.collection(USERS_NOTES_DATABASE).doc(uid).collection('notes').get()
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
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      title = '',
      text = '',
      color = '#fff',
      createAt = 0,
    } = noteData;

    const note = { title, text, color, createAt };

    database.collection(USERS_NOTES_DATABASE).doc(uid).collection('notes').add(note)
      .then((docRef) => {
        dispatch(addNote({
          id: docRef.id,
          ...note
        }));
      }).catch((error) => {
        console.log('Error writing document: ', error);
      });
  };
};

export const startRemoveNote = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const ref = database.collection(USERS_NOTES_DATABASE).doc(uid).collection('notes');

    try {
      await ref.doc(id).delete();
      dispatch(removeNote(id));
    } catch (e) {
      console.log(e);
    }
  };
};

