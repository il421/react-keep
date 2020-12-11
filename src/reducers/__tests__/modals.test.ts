import modalsReducer, {
  modalsReducerDefaultState,
} from "../../reducers/modals";
import {
  CollapseType,
  ModalActionsTypes,
  ModalsStoreState,
  ToggleCurrentNoteAction,
  SetSidebarCollapseAction,
  ToggleModalAction,
} from "../../store/store.types";
import { NoteType } from "../../components/notes";

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

test("should set note type", () => {
  const action: ToggleCurrentNoteAction = {
    type: ModalActionsTypes.toggleCurrentNote,
    noteType: NoteType.image,
    isOpen: true,
    id: "1",
  };

  const state = modalsReducer(
    modalsReducerDefaultState,
    action
  ) as ModalsStoreState;
  expect(state.note).toEqual({
    noteType: NoteType.image,
    isOpen: true,
    id: "1",
  });
});
