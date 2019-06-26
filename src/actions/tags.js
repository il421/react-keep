import database from '../firebase/firebase';

const initDocumentRef = (uid) => {
  const USERS_NOTES_DATABASE = 'users';
  return database.collection(USERS_NOTES_DATABASE).doc(uid).collection('tags');
};

export const setTags = (tags) => ({
  type: 'SET_TAGS',
  tags
});

export const addTag = (tag) => ({
  type: 'ADD_TAG',
  tag
});

export const removeTag = (id) => ({
  type: 'REMOVE_TAG',
  id
});

export const updateTag = (id, update) => ({
  type: 'UPDATE_TAG',
  id,
  update,
});

export const handleSetTags = () => {
  return (dispatch, getState) => {
    const tags = [];
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);

    docRef.get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if(doc.exists) {
            tags.unshift({id: doc.id, ...doc.data()});
          } else {
            console.log('No such document!');
          }
        });

        dispatch(setTags(tags));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const handleAddTag = (value) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const tag = { value };

    try {
      const docRef = await initDocumentRef(uid).add(tag);
      dispatch(addTag({
        id: docRef.id,
        ...tag
      }));
    } catch (e) {
      console.log(e);
    }
  };
};

export const handleRemoveTag = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const docRef = initDocumentRef(uid);
    try {
      dispatch(removeTag(id));
      await docRef.doc(id).delete();
    } catch (e) {
      console.log(e);
    }
  };
};

export const handleUpdateTag = (id, update) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const docRef = initDocumentRef(uid);
    try {
      dispatch(updateTag(id, update));
      await docRef.doc(id).update({
        value: update
      });
    } catch (e) {
      console.log(e);
    }
  };
};
