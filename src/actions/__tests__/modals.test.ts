import {
  CollapseType,
  ModalActionsTypes,
  ModalsStoreState,
} from "../../store/store.types";
import { NoteType } from "../../components/notes";
import {
  setCollapsedOptionsInSidebar,
  toggleCurrentNote,
  toggle,
} from "../modals";

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
    noteType: NoteType.text,
    id: null,
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

test("should generate set note type action object correctly", () => {
  const action = toggleCurrentNote(NoteType.list, true);
  expect(action).toEqual({
    type: ModalActionsTypes.toggleCurrentNote,
    noteType: NoteType.list,
    isOpen: true,
    id: null,
  });
});
