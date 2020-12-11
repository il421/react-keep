import React from "react";
import { ToastContainer } from "react-toastify";
import { History } from "history";
import { JustifyContent } from "../../common";
import { Header, HeaderProps } from "./Header";
import { SideBar } from "./SideBar";
import { Controllers } from "./Controllers";
import UserFormModal from "../login/UserFormModal";
import "../../styles/components/common/_dashboard.scss";
import "../../styles/components/notes/_note-modal.scss";
import {
  NoteType,
  ImageNoteFormModal,
  TextNoteFormModal,
  ListNoteFormModal,
} from "../notes";
import { FlexBox } from "../ui-components";
import { NotesList } from "../notes/NotesList";
import { connect } from "react-redux";
import { Store } from "../../store/store.types";
import { ThunkDispatch } from "redux-thunk";
import { toggleCurrentNote } from "../../actions/modals";

export interface DashboardPageProps {
  history: History;
}

interface DispatchProps {
  toggleCurrentNote: (noteType: NoteType, isOpen: boolean, id?: string) => void;
}

export type DashboardPageBaseProps = DashboardPageProps & DispatchProps;

export const DashboardPageBase: React.FunctionComponent<DashboardPageBaseProps> = ({
  history,
  toggleCurrentNote,
}): JSX.Element => {
  return (
    <FlexBox
      vertical={true}
      justifyContent={JustifyContent.spaceBetween}
      className="dashboard"
    >
      <Header />
      <NotesList
        onNoteSelected={(type: NoteType, id: string) =>
          toggleCurrentNote(type, true, id)
        }
      />

      <SideBar />
      <TextNoteFormModal history={history} />
      <ListNoteFormModal history={history} />
      <ImageNoteFormModal history={history} />

      <UserFormModal />
      <Controllers
        isMobile
        openDialog={(type: NoteType) => toggleCurrentNote(type, true)}
      />

      <ToastContainer autoClose={2000} />
    </FlexBox>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  toggleCurrentNote: (noteType: NoteType, isOpen: boolean, id?: string) =>
    dispatch(toggleCurrentNote(noteType, isOpen, id)),
});

export const DashboardPage = connect<DispatchProps, HeaderProps, Store>(
  undefined,
  mapDispatchToProps
)(DashboardPageBase);
