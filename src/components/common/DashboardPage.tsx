import React, { useState } from "react";
import Header from "./Header";
import { SideBar } from "./SideBar";
import "../../styles/components/common/_dashboard.scss";
import "../../styles/components/notes/_note-modal.scss";

import TextNoteFormModal from "../notes/TextNoteFormModal";
import { FlexBox } from "../ui-components/FlexBox";
import { Controllers } from "./Controllers";
import { JustifyContent } from "../../common/variables";
import UserFormModal from "../login/UserFormModal";
import { QueryKeys } from "../../routers/Routing";
import { stringify } from "query-string";
import { History } from "history";
import {ToastContainer} from "react-toastify";

interface DashboardPageProps {
  history: History
}

export const DashboardPage: React.FunctionComponent<DashboardPageProps> = ({ history }): JSX.Element => {
  const [showBar, setShowSidebar] = useState<boolean>(false);

  return (
    <FlexBox
      vertical={ true }
      justifyContent={ JustifyContent.spaceBetween }
      className="dashboard"
    >
      <Header showSidebar={ setShowSidebar } />
      {/*<NoteSelection className="content-container"/>*/}
      {/*<NotesList/>*/}

      <SideBar
        showBar={ showBar }
        setShowSidebar={ setShowSidebar }
      >
        test
      </SideBar>

      <TextNoteFormModal />
      <UserFormModal history={ history } />
      <Controllers isMobile />


      <ToastContainer autoClose={ 2000 } />
    </FlexBox>
  );
};
