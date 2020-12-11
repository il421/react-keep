import {
  ModalActionsTypes,
  ModalsStoreState,
  ToggleCurrentNoteAction,
  SetSidebarCollapseAction,
  ToggleModalAction,
} from "../store/store.types";
import { NoteType } from "../components/notes";

export const modalsReducerDefaultState: ModalsStoreState = {
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
};

type ModalsAction =
  | ToggleModalAction
  | SetSidebarCollapseAction
  | ToggleCurrentNoteAction;

export default (
  state: ModalsStoreState = modalsReducerDefaultState,
  action: ModalsAction
) => {
  switch (action.type) {
    case ModalActionsTypes.toggle:
      return {
        ...state,
        [action.modal]: {
          ...state[action.modal],
          isOpen: action.isOpen,
        },
      };

    case ModalActionsTypes.setCollapsedOptions:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          collapsed: action.collapsed,
        },
      };

    case ModalActionsTypes.toggleCurrentNote:
      return {
        ...state,
        note: {
          isOpen: action.isOpen,
          noteType: action.noteType,
          id: action.id,
        },
      };

    default:
      return state;
  }
};
