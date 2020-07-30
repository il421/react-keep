import React from "react";
import { connect } from "react-redux";
import {
  AuthStoreState,
  Collaborator,
  Note,
  Store,
} from "../../store/store.types";
import { NotesItem } from "./NotesItem";
import { ThunkDispatch } from "redux-thunk";
import {
  changeNoteArchiveStatus,
  changeNoteImportance,
  handleRemoveNote,
} from "../../actions/notes";
import { NoteType } from "./notes.types";
import Masonry from "react-masonry-css";
import { getFilteredNotes } from "../../common";
import { FlexBox, ContentContainer } from "../ui-components";
import { JustifyContent } from "../../common";
import "../../styles/components/notes/_note-list.scss";

interface StateProps {
  notes: Note[];
  auth: AuthStoreState;
  collaborators: Collaborator[];
}

interface DispatchProps {
  removeNote: (id: string) => void;
  moveToArchive: (id: string) => void;
  toggleImportance: (id: string) => void;
}

interface NotesListProp {
  onNoteSelected: (type: NoteType, id: string) => void;
}

export type Props = StateProps & DispatchProps & NotesListProp;

export const NotesListBase: React.FunctionComponent<Props> = ({
  notes,
  auth,
  collaborators,
  removeNote,
  moveToArchive,
  toggleImportance,
  onNoteSelected,
}): JSX.Element => {
  const breakpointColumnsObj = {
    default: 5,
    1400: 4,
    991: 3,
    794: 2,
    569: 2,
  };

  const getCollaborator = (uid: string): Collaborator | undefined => {
    return uid !== auth.uid
      ? collaborators.find((c: Collaborator) => c.uid === uid)
      : undefined;
  };

  return (
    <ContentContainer style={{ margin: "0 5px" }} className="note-list">
      <FlexBox justifyContent={JustifyContent.center}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map((note: Note, index: number) => (
            <NotesItem
              key={index}
              note={note}
              toggleImportance={toggleImportance}
              removeNote={removeNote}
              moveToArchive={moveToArchive}
              onNoteSelected={onNoteSelected}
              getCollaborator={getCollaborator}
            />
          ))}
        </Masonry>
      </FlexBox>
    </ContentContainer>
  );
};

const mapStateToProps = (state: Store): StateProps => ({
  notes: getFilteredNotes(state.notes, {
    search: state.filters.search,
    tagFilters: state.filters.tagFilters,
  }),
  collaborators: state.collaborators,
  auth: state.auth,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  removeNote: (id: string) => dispatch(handleRemoveNote(id)),
  moveToArchive: (id: string) => dispatch(changeNoteArchiveStatus(id)),
  toggleImportance: (id: string) => dispatch(changeNoteImportance(id)),
});

export const NotesList = connect<
  StateProps,
  DispatchProps,
  NotesListProp,
  Store
>(
  mapStateToProps,
  mapDispatchToProps
)(NotesListBase);
