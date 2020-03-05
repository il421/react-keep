import {
  AuthActionsTypes,
  AuthStoreState,
  LoadingAction,
  LoginAction,
  LogoutAction
} from "../store/store.types";

type AuthAction = LoginAction | LogoutAction | LoadingAction;

export default (
  state = {} as AuthStoreState,
  action: AuthAction
): AuthStoreState | object => {
  switch (action.type) {
    case AuthActionsTypes.login:
      return {
        ...state,
        uid: action.uid,
        name: action.name,
        url: action.url
      } as AuthStoreState;

    case AuthActionsTypes.logout:
      return {};

    case AuthActionsTypes.loading:
      return {
        ...state,
        loading: action.loading
      } as AuthStoreState;

    default:
      return state;
  }
};
