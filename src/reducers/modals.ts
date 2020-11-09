import {
  ModalActionsTypes,
  ModalsStoreState,
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
    type: NoteType.text,
  },
};

type ModalsAction = ToggleModalAction | SetSidebarCollapseAction;

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

    default:
      return state;
  }
};
