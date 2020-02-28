import {firebase} from "../firebase/firebase";
import {toast} from "react-toastify";
import {AuthActionsTypes, LoadingAction, LoginAction, LogoutAction, Store, UpdateUser} from "../store/store.types";
import {Dispatch} from "redux";
import { getMessage, Message } from "../common";

export const loading = (loading: boolean): LoadingAction => ({
  type: AuthActionsTypes.loading,
  loading,
});

export const login = (uid: string, name: string | null, url :string | null): LoginAction => ({
  type: AuthActionsTypes.login,
  uid,
  name,
  url
});

export const logout = (): LogoutAction => ({
  type: AuthActionsTypes.logout
});

export const startLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loading(true));
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log(getMessage(Message.successLoggedIn));
    } catch (e) {
      console.log(e);
      toast.error(e.message);
      dispatch(loading(false));
    } finally {
      dispatch(loading(false));
    }
  };
};

export const startSignUp = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loading(true));
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log(getMessage(Message.successLoggedIn));
    } catch (e) {
      console.log(e);
      toast.error(e.message);
      dispatch(loading(false));
    } finally {
      dispatch(loading(false));
    }
  };
};

export const startLogout = () => {
  return async () => {
    try {
      await firebase.auth().signOut();
      console.log(getMessage(Message.successLoggedOut));
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };
};

export const updateUserData = (data: UpdateUser) => {
  return async (dispatch: Dispatch, getState: () => Store) => {
    try {
      dispatch(loading(true));
      const currentUser = await firebase.auth().currentUser;
      if (currentUser) {
        const auth = getState().auth;

        await currentUser.updateProfile({
          displayName: data.displayName,
          photoURL: data.photoURL
        });
        dispatch(login(auth.uid, data.displayName, auth.url));
      }

      toast.success(getMessage(Message.successUpdated));
      console.log(getMessage(Message.successUpdated));
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    } finally {
      dispatch(loading(false));
    }
  };
};
