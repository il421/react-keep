import {
  AuthActionsTypes,
  AuthStoreState,
  LoadingAction,
  LoginAction,
  LogoutAction
} from "../store/store.types";

export type AuthAction = LoginAction | LogoutAction | LoadingAction;

export const defaultAuthStore: AuthStoreState = {
  name: null,
  url: null,
  uid: "",
  email: "",
  loading: false
};

export const authReducer = (
  state = defaultAuthStore,
  action: AuthAction
): AuthStoreState | object => {
  switch (action.type) {
    case AuthActionsTypes.login:
      return {
        ...state,
        uid: action.data.uid,
        name: action.data.name,
        url: action.data.url,
        email: action.data.email
      } as AuthStoreState;

    case AuthActionsTypes.logout:
      return defaultAuthStore;

    case AuthActionsTypes.loading:
      return {
        ...state,
        loading: action.loading
      } as AuthStoreState;

    default:
      return state;
  }
};
