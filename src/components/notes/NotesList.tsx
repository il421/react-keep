import React from "react";
import { connect } from "react-redux";
import { Note, Store } from "../../store/store.types";
import NotesItem from "./NotesItem";
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

interface StateProps {
  notes: Note[];
}

interface DispatchProps {
  removeNote: (id: string) => void;
  moveToArchive: (id: string) => void;
  toggleImportance: (id: string) => void;
}

interface NotesListProp {
  onNoteSelected: (type: NoteType, id: string) => void;
}

type Props = StateProps & DispatchProps & NotesListProp;

const NotesList: React.FunctionComponent<Props> = ({
  notes,
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
    615: 1,
  };

  return (
    <ContentContainer style={{ margin: "0 50px" }}>
      <FlexBox justifyContent={JustifyContent.center} className="note-list">
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
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  removeNote: (id: string) => dispatch(handleRemoveNote(id)),
  moveToArchive: (id: string) => dispatch(changeNoteArchiveStatus(id)),
  toggleImportance: (id: string) => dispatch(changeNoteImportance(id)),
});

export default connect<StateProps, DispatchProps, NotesListProp, Store>(
  mapStateToProps,
  mapDispatchToProps
)(NotesList);
