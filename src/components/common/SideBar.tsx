import React from "react";
import { IconButton, FlexBox } from "../ui-components";
import "../../styles/components/common/_sidebar.scss";
import { JustifyContent, toggleArrayElement } from "../../common";
import Tags from "../tags/Tags";
import { ArchiveList } from "../archive/ArchiveList";
import { Collaborators } from "../collaborators/Collaborators";
import { ThunkDispatch } from "redux-thunk";
import {
  CollapseType,
  Modal as ModalType,
  ModalsStoreState,
  Store,
} from "../../store/store.types";
import { setCollapsedOptionsInSidebar, toggle } from "../../actions/modals";
import { connect } from "react-redux";

interface SideBarProp {}

interface StateProps {
  modals: ModalsStoreState;
}

interface DispatchProps {
  toggle: (modal: ModalType, isOpen: boolean) => void;
  setCollapsedOptionsInSidebar: (collapsed: CollapseType[]) => void;
}

export type SideBarBaseProps = SideBarProp & DispatchProps & StateProps;

export const SideBarBase: React.FunctionComponent<SideBarBaseProps> = ({
  modals,
  toggle,
  setCollapsedOptionsInSidebar,
}) => {
  const handleCloseModal = () => toggle("sidebar", false);
  const handleSetCollapsed = (item: CollapseType) => () =>
    setCollapsedOptionsInSidebar(toggleArrayElement(collapsed, item));

  const { isOpen, collapsed } = modals.sidebar;
  return (
    <>
      <div className={`sidebar ${isOpen && "sidebar--show"}`}>
        <FlexBox justifyContent={JustifyContent.end}>
          <IconButton
            className="sidebar__close-button"
            onButtonClick={handleCloseModal}
            icon="times"
            size="2x"
          />
        </FlexBox>

        <div className="dashboard__sidebar">
          <>
            <IconButton
              icon="tags"
              text="Tags list"
              onButtonClick={handleSetCollapsed(CollapseType.tags)}
              className={
                collapsed.includes(CollapseType.tags)
                  ? "icon-button--collapsed"
                  : undefined
              }
            />
            {collapsed.includes(CollapseType.tags) && <Tags />}
          </>

          <>
            <IconButton
              icon="archive"
              text="Archived notes"
              onButtonClick={handleSetCollapsed(CollapseType.arch)}
              className={
                collapsed.includes(CollapseType.arch)
                  ? "icon-button--collapsed"
                  : undefined
              }
            />
            {collapsed.includes(CollapseType.arch) && <ArchiveList />}
          </>
          <>
            <IconButton
              icon="user-friends"
              text="Collaborators"
              onButtonClick={handleSetCollapsed(CollapseType.collaborators)}
              className={
                collapsed.includes(CollapseType.collaborators)
                  ? "icon-button--collapsed"
                  : undefined
              }
            />
            {collapsed.includes(CollapseType.collaborators) && (
              <Collaborators />
            )}
          </>
        </div>
      </div>

      {
        // handle click on cover to close the sidebar
        isOpen && <div className="sidebar__cover" onClick={handleCloseModal} />
      }
    </>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  toggle: (modal: ModalType, isOpen: boolean) =>
    dispatch(toggle(modal, isOpen)),
  setCollapsedOptionsInSidebar: (collapsed: CollapseType[]) =>
    dispatch(setCollapsedOptionsInSidebar(collapsed)),
});

const mapStateToProps = (state: Store): StateProps => {
  return {
    modals: state.modals,
  };
};

export const SideBar = connect<StateProps, DispatchProps, SideBarProp, Store>(
  mapStateToProps,
  mapDispatchToProps
)(SideBarBase);
