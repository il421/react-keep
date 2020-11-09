import {
  CollapseType,
  Modal,
  ModalActionsTypes,
  SetSidebarCollapseAction,
  ToggleModalAction,
} from "../store/store.types";

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
