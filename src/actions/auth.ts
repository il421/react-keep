import { toast } from "react-toastify";
import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { getMessage, Message } from "../common";
import { Collections } from "../firebase/Collections";
import { firebase, storage } from "../firebase/firebase";
import {
  AuthActionsTypes,
  AuthStoreState,
  LoadingAction,
  LoginAction,
  LogoutAction,
  Store,
  UpdateUser
} from "../store/store.types";
import { setCollaborators } from "./collaborators";
import { setNotes } from "./notes";
import { setTags } from "./tags";

const initStorageAvatarRef = (name: string): firebase.storage.Reference => {
  const ref = storage.ref();
  return ref.child(`${Collections.avatars}/${name}`);
};

export const loading = (loading: boolean): LoadingAction => ({
  type: AuthActionsTypes.loading,
  loading
});

export const login = (data: {
  uid: string;
  name: string | null;
  url: string | null;
  email?: string;
}): LoginAction => ({
  type: AuthActionsTypes.login,
  data
});

export const logout = (): LogoutAction => ({
  type: AuthActionsTypes.logout
});

export const startLogin = (
  email: string,
  password: string
): ThunkAction<any, Store, any, Action> => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loading(true));
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      toast.error(e.message);
      dispatch(loading(false));
    } finally {
      dispatch(loading(false));
    }
  };
};

export const startSignUp = (
  email: string,
  password: string
): ThunkAction<any, Store, any, Action> => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loading(true));
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      toast.error(e.message);
      dispatch(loading(false));
    } finally {
      dispatch(loading(false));
    }
  };
};

export const startLogout = (): ThunkAction<any, Store, any, Action> => {
  return async (dispatch: Dispatch) => {
    try {
      await firebase.auth().signOut();
      dispatch(logout());
      dispatch(setNotes([]));
      dispatch(setTags([]));
      dispatch(setCollaborators([]));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      toast.error(e.message);
    }
  };
};

export const updateUserData = (
  data: UpdateUser
): ThunkAction<any, Store, any, Action> => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    const auth: AuthStoreState = getState().auth;
    try {
      let photoURL: string | null = null;
      dispatch(loading(true));
      const ref = initStorageAvatarRef(auth.uid!);

      if (data.photoFile) {
        const snapshot = await ref.put(data.photoFile);
        if (snapshot) {
          photoURL = await snapshot.ref.getDownloadURL();
        }
      } else if (data.photoURL === null && !!data.photoFile) {
        await ref.delete();
      }

      const currentUser = await firebase.auth().currentUser;
      if (currentUser) {
        await currentUser.updateProfile({
          displayName: data.displayName,
          photoURL
        });
        dispatch(
          login({ uid: auth.uid, name: data.displayName, url: photoURL })
        );
        toast.success(getMessage(Message.successUpdated));
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      toast.error(e.message);
    } finally {
      dispatch(loading(false));
    }
  };
};
