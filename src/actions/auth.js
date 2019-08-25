import { firebase } from '../firebase/firebase';
import { toast } from 'react-toastify';

export const loading = (loading) => ({
  type: 'LOADING',
  loading,
});

export const login = (uid, name, url) => ({
  type: 'LOGIN',
  uid,
  name,
  url
});

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Logged in successfully');
    } catch (e) {
      console.log(e);
      toast.error(e.message);
      dispatch(loading(false));
    } finally {
      dispatch(loading(false));
    }
  };
};

export const startSignUp = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('Logged in successfully');
    } catch (e) {
      console.log(e);
      toast.error(e.message);
      dispatch(loading(false));
    } finally {
      dispatch(loading(false));
    }
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return async () => {
    try {
      await firebase.auth().signOut();
      console.log('Logged out successfully');
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };
};
