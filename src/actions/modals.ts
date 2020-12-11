import {
  CollapseType,
  Modal,
  ModalActionsTypes,
  ToggleCurrentNoteAction,
  SetSidebarCollapseAction,
  ToggleModalAction,
} from "../store/store.types";
import { NoteType } from "../components/notes";

export const toggle = (modal: Modal, isOpen: boolean): ToggleModalAction => ({
  type: ModalActionsTypes.toggle,
  modal,
  isOpen,
});

export const setCollapsedOptionsInSidebar = (
  collapsed: CollapseType[]
): SetSidebarCollapseAction => ({
  type: ModalActionsTypes.setCollapsedOptions,
  collapsed,
});

export const toggleCurrentNote = (
  noteType: NoteType,
  isOpen: boolean,
  noteId?: string
): ToggleCurrentNoteAction => ({
  type: ModalActionsTypes.toggleCurrentNote,
  noteType,
  isOpen,
  id: noteId ?? null,
});
