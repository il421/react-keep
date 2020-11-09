import React from "react";
import { ToastContainer } from "react-toastify";
import { History, Path } from "history";
import { JustifyContent } from "../../common";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { Controllers } from "./Controllers";
import UserFormModal from "../login/UserFormModal";
import "../../styles/components/common/_dashboard.scss";
import "../../styles/components/notes/_note-modal.scss";
import { QueryKeys } from "../../routers/Routing";
import { stringify } from "query-string";
import {
  NoteType,
  ImageNoteFormModal,
  TextNoteFormModal,
  ListNoteFormModal,
} from "../notes";
import { FlexBox } from "../ui-components";
import { NotesList } from "../notes/NotesList";

export interface DashboardPageProps {
  history: History;
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
    [key]: id,
  });
  push(`${pathname}?${query}`);
};

export const DashboardPage: React.FunctionComponent<DashboardPageProps> = ({
  history,
}): JSX.Element => {
  return (
    <FlexBox
      vertical={true}
      justifyContent={JustifyContent.spaceBetween}
      className="dashboard"
    >
      <Header history={history} />
      <NotesList
        onNoteSelected={(type: NoteType, id: string) =>
          onNoteSelected({
            type,
            id,
            pathname: history.location.pathname,
            push: history.push,
          })
        }
      />

      <SideBar />
      <TextNoteFormModal history={history} />
      <ListNoteFormModal history={history} />
      <ImageNoteFormModal history={history} />
      <UserFormModal />
      <Controllers
        isMobile
        openDialog={(query) =>
          history.push(`${history.location.pathname}?${query}`)
        }
      />

      <ToastContainer autoClose={2000} />
    </FlexBox>
  );
};
