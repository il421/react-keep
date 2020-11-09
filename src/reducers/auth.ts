import {
  AuthActionsTypes,
  AuthStoreState,
  LoadingAction,
  LoginAction,
  LogoutAction,
  UserModalToggle,
} from "../store/store.types";

export type AuthAction =
  | LoginAction
  | LogoutAction
  | LoadingAction
  | UserModalToggle;

export const defaultAuthStore: AuthStoreState = {
  name: null,
  url: null,
  uid: "",
  email: "",
  loading: false,
  isUserModalOpen: false,
};

export default (
  state = defaultAuthStore,
  action: AuthAction
): AuthStoreState | object => {
  switch (action.type) {
    case AuthActionsTypes.login:
      return {
        ...state,
        uid: action.uid,
        name: action.name,
        url: action.url,
        email: action.email,
      } as AuthStoreState;

    case AuthActionsTypes.logout:
      return defaultAuthStore;

    case AuthActionsTypes.loading:
      return {
        ...state,
        loading: action.loading,
      } as AuthStoreState;

    case AuthActionsTypes.toggleModal:
      return {
        ...state,
        isUserModalOpen: action.isUserModalOpen,
      } as AuthStoreState;

    default:
      return state;
  }
};
