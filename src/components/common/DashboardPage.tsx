import { History, Path } from "history";
import { stringify } from "query-string";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

import { JustifyContent, toggleArrayElement } from "../../common";
import { QueryKeys } from "../../routers/Routing";
import "../../styles/components/common/_dashboard.scss";
import "../../styles/components/notes/_note-modal.scss";
import { ArchiveList } from "../archive/ArchiveList";
import { Collaborators } from "../collaborators/Collaborators";
import { UserFormModal } from "../login/UserFormModal";
import {
  NoteType,
  ImageNoteFormModal,
  TextNoteFormModal,
  ListNoteFormModal
} from "../notes";
import { NotesList } from "../notes/NotesList";
import { Tags } from "../tags/Tags";
import { IconButton, FlexBox } from "../ui-components";
import { Controllers } from "./Controllers";
import { Header } from "./Header";
import { SideBar } from "./SideBar";

export interface DashboardPageProps {
  history: History;
}

enum CollapseType {
  "tags",
  "arch",
  "collaborators"
}

export const onNoteSelected = (options: {
  type: NoteType;
  id: string;
  pathname: string;
  push: (path: Path) => void;
}) => {
  let key: keyof typeof QueryKeys;
  const { type, id, pathname, push } = options;
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
    [key]: id
  });
  push(`${pathname}?${query}`);
};

export const DashboardPage: React.FunctionComponent<DashboardPageProps> = ({
  history
}): JSX.Element => {
  const [showBar, setShowSidebar] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<CollapseType[]>([]);

  const handleSetCollapsed = (value: CollapseType[]) => () =>
    setCollapsed(value);

  return (
    <FlexBox
      vertical={true}
      justifyContent={JustifyContent.spaceBetween}
      className="dashboard"
    >
      <Header showSidebar={setShowSidebar} history={history} />
      <NotesList
        onNoteSelected={(type: NoteType, id: string) =>
          onNoteSelected({
            type,
            id,
            pathname: history.location.pathname,
            push: history.push
          })
        }
      />

      <SideBar showBar={showBar} setShowSidebar={setShowSidebar}>
        <div className="dashboard__sidebar">
          <>
            <IconButton
              icon="tags"
              text="Tags list"
              onButtonClick={handleSetCollapsed(
                toggleArrayElement(collapsed, CollapseType.tags)
              )}
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
              onButtonClick={handleSetCollapsed(
                toggleArrayElement(collapsed, CollapseType.arch)
              )}
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
              onButtonClick={handleSetCollapsed(
                toggleArrayElement(collapsed, CollapseType.collaborators)
              )}
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
      </SideBar>

      <TextNoteFormModal history={history} />
      <ListNoteFormModal history={history} />
      <ImageNoteFormModal history={history} />
      <UserFormModal history={history} />
      <Controllers
        isMobile
        openDialog={query =>
          history.push(`${history.location.pathname}?${query}`)
        }
      />

      <ToastContainer autoClose={2000} />
    </FlexBox>
  );
};
