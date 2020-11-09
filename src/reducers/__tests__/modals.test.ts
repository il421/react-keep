import modalsReducer, {
  modalsReducerDefaultState,
} from "../../reducers/modals";
import {
  CollapseType,
  ModalActionsTypes,
  ModalsStoreState,
  SetSidebarCollapseAction,
  ToggleModalAction,
} from "../../store/store.types";

test("should toggle modals correctly", () => {
  const action: ToggleModalAction = {
    type: ModalActionsTypes.toggle,
    modal: "user",
    isOpen: true,
  };

  const state = modalsReducer(
    modalsReducerDefaultState,
    action
  ) as ModalsStoreState;
  expect(state.user).toEqual({ isOpen: action.isOpen });
});

test("should set collapsed items in sidebar modal", () => {
  const action: SetSidebarCollapseAction = {
    type: ModalActionsTypes.setCollapsedOptions,
    collapsed: [CollapseType.arch],
  };

  const state = modalsReducer(
    modalsReducerDefaultState,
    action
  ) as ModalsStoreState;
  expect(state.sidebar).toEqual({
    collapsed: [CollapseType.arch],
    isOpen: false,
  });
});
