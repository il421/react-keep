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
import { QueryKeys } from "../../routers/Routing";
import { stringify } from "query-string";
import ListNoteFormModal from "../notes/ListNoteFormModal";
import { NoteType } from "../notes/notes.types";
import { IconButton } from "../ui-components/IconButton";
import { toggleArrayElement } from "../../common/utils";
import Tags from "../tags/Tags";

interface DashboardPageProps {
  history: History;
}

enum CollapseType {
  "tags",
  "arch",
}

export const DashboardPage: React.FunctionComponent<DashboardPageProps> = ({
  history,
}): JSX.Element => {
  const [showBar, setShowSidebar] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<CollapseType[]>([]);

  const onNoteSelected = (type: NoteType, id: string) => {
    let key: keyof typeof QueryKeys;
    switch (type) {
      case NoteType.text:
        key = QueryKeys.text;
        break;
      case NoteType.list:
        key = QueryKeys.list;
        break;
      default:
        key = QueryKeys.image;
    }

    const query = stringify({
      [key]: id,
    });
    history.push(`${history.location.pathname}?${query}`);
  };

  return (
    <FlexBox
      vertical={true}
      justifyContent={JustifyContent.spaceBetween}
      className="dashboard"
    >
      <Header showSidebar={setShowSidebar} />
      <NotesList onNoteSelected={onNoteSelected} />

      <SideBar showBar={showBar} setShowSidebar={setShowSidebar}>
        <div className="dashboard__sidebar">
          <>
            <IconButton
              icon="tags"
              text="Tags list"
              onButtonClick={() => {
                setCollapsed(toggleArrayElement(collapsed, CollapseType.tags));
              }}
              className={
                collapsed.includes(CollapseType.tags)
                  ? "icon-button--collapsed"
                  : ""
              }
            />
            {collapsed.includes(CollapseType.tags) && <Tags />}
          </>

          <>
            <IconButton
              icon="archive"
              text="Archived notes"
              onButtonClick={() => {
                setCollapsed(toggleArrayElement(collapsed, CollapseType.arch));
              }}
              className={
                collapsed.includes(CollapseType.arch)
                  ? "icon-button--collapsed"
                  : ""
              }
            />
            {collapsed.includes(CollapseType.arch) && <div>Archived items</div>}
          </>
        </div>
      </SideBar>

      <TextNoteFormModal history={history} />
      <ListNoteFormModal history={history} />
      <UserFormModal history={history} />
      <Controllers isMobile />

      <ToastContainer autoClose={2000} />
    </FlexBox>
  );
};
