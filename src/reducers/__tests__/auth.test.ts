import authReducer, { defaultAuthStore } from "../../reducers/auth";
import {
  AuthActionsTypes,
  AuthStoreState,
  LoadingAction,
  LoginAction,
  LogoutAction,
} from "../../store/store.types";

describe("Auth reducer", () => {
  test("should set loading value", () => {
    const action: LoadingAction = {
      type: AuthActionsTypes.loading,
      loading: true,
    };

    const state = authReducer(defaultAuthStore, action) as AuthStoreState;
    expect(state.loading).toBe(action.loading);
  });

  test("should set uid for login", () => {
    const action: LoginAction = {
      type: AuthActionsTypes.login,
      uid: "123",
      name: "123",
      url: null,
    };
    const state = authReducer(defaultAuthStore, action) as AuthStoreState;

    expect(state.uid).toBe(action.uid);
    expect(state.name).toBe(action.name);
    expect(state.url).toBe(action.url);
  });

  test("should clear uid for logout", () => {
    const action: LogoutAction = {
      type: AuthActionsTypes.logout,
    };

    const state = authReducer(defaultAuthStore, action) as AuthStoreState;

    expect(state).toEqual(defaultAuthStore);
  });
});
