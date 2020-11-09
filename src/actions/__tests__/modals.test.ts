import {
  CollapseType,
  ModalActionsTypes,
  ModalsStoreState,
} from "../../store/store.types";
import { NoteType } from "../../components/notes";
import { setCollapsedOptionsInSidebar, toggle } from "../modals";

export const defaultModalsState = {
  user: {
    isOpen: false,
  },
  sidebar: {
    isOpen: false,
    collapsed: [],
  },
  note: {
    isOpen: false,
    type: NoteType.text,
  },
} as ModalsStoreState;

test("should generate toggle action object correctly", () => {
  const action = toggle("note", true);
  expect(action).toEqual({
    type: ModalActionsTypes.toggle,
    modal: "note",
    isOpen: true,
  });
});

test("should generate set collapsed action object correctly", () => {
  const action = setCollapsedOptionsInSidebar([CollapseType.arch]);
  expect(action).toEqual({
    type: ModalActionsTypes.setCollapsedOptions,
    collapsed: [CollapseType.arch],
  });
});
