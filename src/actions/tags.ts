import { toast } from "react-toastify";
import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { getMessage, Message } from "../common";
import { Collections } from "../firebase/Collections";
import { database } from "../firebase/firebase";
import {
  AddTagAction,
  RemoveTagAction,
  SetTagsAction,
  Store,
  Tag,
  TagsActionsTypes
} from "../store/store.types";

const initDocumentRef = (uid: string) => {
  return database
    .collection(Collections.users)
    .doc(uid)
    .collection(Collections.tags);
};

export const setTags = (tags: Tag[]): SetTagsAction => ({
  type: TagsActionsTypes.setTags,
  tags
});

export const addTag = (tag: Tag): AddTagAction => ({
  type: TagsActionsTypes.addTag,
  tag
});

export const removeTag = (id: string): RemoveTagAction => ({
  type: TagsActionsTypes.removeTag,
  id
});

export const handleSetTags = (): ThunkAction<any, Store, any, Action> => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const tags: Tag[] = [];
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);

    try {
      const snapshot = await docRef.get();
      snapshot.forEach(doc => {
        if (doc.exists) {
          tags.unshift({ id: doc.id, ...(doc.data() as Tag) });
        } else {
          // eslint-disable-next-line no-console
          console.warn(getMessage(Message.errorNoSuchDoc));
          toast.error(getMessage(Message.errorNoSuchDoc));
        }
      });
      dispatch(setTags(tags));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e.message);
      toast.error(e.message);
    }
  };
};

export const handleAddTag = (
  value: string
): ThunkAction<any, Store, any, Action> => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;

    try {
      const docRef = await initDocumentRef(uid).add({ value });
      dispatch(
        addTag({
          id: docRef.id,
          value
        })
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e.message);
      toast.error(e.message);
    }
  };
};

export const handleRemoveTag = (
  id: string
): ThunkAction<any, Store, any, Action> => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;

    const docRef = initDocumentRef(uid);
    try {
      dispatch(removeTag(id));
      await docRef.doc(id).delete();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e.message);
      toast.error(e.message);
    }
  };
};
