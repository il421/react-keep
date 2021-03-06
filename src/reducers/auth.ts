import {
  AuthActionsTypes,
  AuthStoreState,
  LoadingAction,
  LoginAction,
  LogoutAction,
} from "../store/store.types";

export type AuthAction = LoginAction | LogoutAction | LoadingAction;

export const defaultAuthStore: AuthStoreState = {
  name: null,
  url: null,
  uid: "",
  email: "",
  loading: false,
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

    default:
      return state;
  }
};
