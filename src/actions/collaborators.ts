import database from "../firebase/firebase";
import {
  AddCollaboratorAction,
  Collaborator,
  CollaboratorsActionsTypes,
  RemoveCollaboratorAction,
  SetCollaboratorsAction,
  Store,
  UserData,
} from "../store/store.types";
import { Action, Dispatch } from "redux";
import { toast } from "react-toastify";
import { getMessage, Message, unique } from "../common";
import { Collections } from "../firebase/Collections";
import { ThunkAction } from "redux-thunk";
import { getUserByUids } from "../libs/functions";

const initDocumentRef = (uid: string) => {
  return database
    .collection(Collections.users)
    .doc(uid)
    .collection(Collections.collaborators);
};

export const setCollaborators = (
  collaborators: Collaborator[]
): SetCollaboratorsAction => ({
  type: CollaboratorsActionsTypes.setCollaborators,
  collaborators,
});

export const addCollaborator = (data: UserData): AddCollaboratorAction => ({
  type: CollaboratorsActionsTypes.addCollaborator,
  data,
});

export const removeCollaborator = (uid: string): RemoveCollaboratorAction => ({
  type: CollaboratorsActionsTypes.removeCollaborator,
  uid,
});

export const handleSetCollaborators = (): ThunkAction<
  any,
  Store,
  any,
  Action
> => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    let collaborators: Pick<Collaborator, "uid" | "notesIds">[] = [];
    const uid = getState().auth.uid;
    const docRef = initDocumentRef(uid);

    try {
      const snapshot = await docRef.get();
      snapshot.forEach((doc) => {
        if (doc.exists) {
          collaborators.push({
            uid: doc.id,
            notesIds: doc.data().notesIds,
          } as Pick<Collaborator, "uid" | "notesIds">);
        } else {
          console.log(getMessage(Message.errorNoSuchDoc));
          toast.error(getMessage(Message.errorNoSuchDoc));
        }
      });

      const notes = getState().notes.filter((n) => n.createdBy);

      // get unique uids of collaborators, and noted owners
      const uids: string[] = unique([
        ...collaborators.map((c) => c.uid),
        ...notes.map((n) => n.createdBy!),
      ]);

      if (uids.length > 0) {
        await getUserByUids(uids, (users: UserData[]) => {
          const mappedUsers: Collaborator[] = users.map((u: UserData) => {
            const index = uids.findIndex((k) => k === u.uid);
            if (index >= 0) {
              return { ...u, notesIds: collaborators[index].notesIds };
            }
          }) as Collaborator[];

          // run get users func
          if (mappedUsers.length > 0) {
            dispatch(setCollaborators(mappedUsers));
            return;
          } else {
            toast.error(getMessage(Message.usersNotFound));
          }
        });
      }
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
};

export const handleAddCollaborator = (
  data: UserData
): ThunkAction<any, Store, any, Action> => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const currentUid = getState().auth.uid;
    const { uid } = data;
    try {
      await initDocumentRef(currentUid)
        .doc(uid)
        .set({
          notesIds: [],
        } as Pick<Collaborator, "notesIds">);
      dispatch(addCollaborator(data));
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
};

export const handleRemoveCollaborator = (
  id: string
): ThunkAction<any, Store, any, Action> => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const uid = getState().auth.uid;

    const docRef = initDocumentRef(uid);
    try {
      dispatch(removeCollaborator(id));
      await docRef.doc(id).delete();
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
};
