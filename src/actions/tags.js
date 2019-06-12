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

export const startSetTags = () => {
  return (dispatch, getState) => {
    const tags = [];
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);

    docRef.get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if(doc.exists) {
            tags.push({id: doc.id, ...doc.data()});
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

export const startAddTag = (value) => {
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

export const startRemoveTag = (id) => {
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
