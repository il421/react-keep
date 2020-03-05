import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { History } from "history";
import { JustifyContent } from "../../common/variables";
import Header from "./Header";
import { SideBar } from "./SideBar";
import { Controllers } from "./Controllers";
import { FlexBox } from "../ui-components";
import UserFormModal from "../login/UserFormModal";
import "../../styles/components/common/_dashboard.scss";
import "../../styles/components/notes/_note-modal.scss";
import TextNoteFormModal from "../notes/TextNoteFormModal";
import NotesList from "../notes/NotesList";

interface DashboardPageProps {
  history: History;
}

export const DashboardPage: React.FunctionComponent<DashboardPageProps> = ({
  history
}): JSX.Element => {
  const [showBar, setShowSidebar] = useState<boolean>(false);

  return (
    <FlexBox
      vertical={true}
      justifyContent={JustifyContent.spaceBetween}
      className="dashboard"
    >
      <Header showSidebar={setShowSidebar} />
      {/*<NoteSelection className="content-container"/>*/}
      <NotesList />

      <SideBar showBar={showBar} setShowSidebar={setShowSidebar}>
        test
      </SideBar>

      <TextNoteFormModal />
      <UserFormModal history={history} />
      <Controllers isMobile />

      <ToastContainer autoClose={2000} />
    </FlexBox>
  );
};
