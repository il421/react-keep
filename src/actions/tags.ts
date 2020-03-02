import database from "../firebase/firebase";
import {
  AddTagAction,
  DisplayTagsModalAction,
  RemoveTagAction,
  SetTagsAction,
  Store,
  Tag,
  TagsActionsTypes,
  UpdateTagAction
} from "../store/store.types";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import { getMessage, Message } from "../common";

const initDocumentRef = (uid: string) => {
  const USERS_NOTES_DATABASE = "users";
  return database.collection(USERS_NOTES_DATABASE).doc(uid).collection("tags");
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

export const updateTag = (id: string, update: Tag): UpdateTagAction => ({
  type: TagsActionsTypes.updateTag,
  id,
  update,
});

export const handleDisplayTagsModal = (displayTagsModal: boolean): DisplayTagsModalAction => ({
  type: TagsActionsTypes.displayTagsModal,
  displayTagsModal,
});

export const handleSetTags = () => {
  return async (dispatch: Dispatch, getState: () => Store) => {

    let tags: Tag[] = [];
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);

    try {
      const snapshot = await docRef.get();
      snapshot.forEach((doc) => {
        if(doc.exists) {
          tags.unshift({ id: doc.id, ...doc.data() as Tag });
        } else {
          console.log(getMessage(Message.errorNoSuchDoc));
          toast.error(getMessage(Message.errorNoSuchDoc));
        }
      });
      dispatch(setTags(tags));
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
};

export const handleAddTag = (value: Tag) => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;

    const tag = { ...value };

    try {
      const docRef = await initDocumentRef(uid).add(tag);
      dispatch(addTag({
        id: docRef.id,
        ...tag
      }));
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
};

export const handleRemoveTag = (id: string) => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;

    const docRef = initDocumentRef(uid);
    try {
      dispatch(removeTag(id));
      await docRef.doc(id).delete();
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
};

export const handleUpdateTag = (id: string, update: Tag) => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;

    const docRef = initDocumentRef(uid);
    try {
      dispatch(updateTag(id, update));
      await docRef.doc(id).update({
        value: update
      });
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
};
