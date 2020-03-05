import React from "react";
import { connect } from "react-redux";
import { Store } from "../../store/store.types";
import { Note } from "../../store/store.types";

import { ContentContainer } from "../ui-components/ContentContainer";
import NotesItem from "./NotesItem";
import { ThunkDispatch } from "redux-thunk";
import { changeNoteImportance, handleRemoveNote } from "../../actions/notes";

interface StateProps {
  notes: Note[];
}

interface DispatchProps {
  removeNote: (id: string) => void;
  toggleImportance: (id: string) => void;
}

type NotesListProp = StateProps & DispatchProps;

const NotesList: React.FunctionComponent<NotesListProp> = ({
  notes,
  removeNote,
  toggleImportance
}): JSX.Element => {
  // console.log(notes)
  return (
    <ContentContainer>
      {notes.map((note: Note, index: number) => (
        <NotesItem
          key={index}
          note={note}
          toggleImportance={toggleImportance}
          removeNote={removeNote}
        />
      ))}
    </ContentContainer>
  );
};

const mapStateToProps = (state: Store): StateProps => ({
  notes: state.notes
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  removeNote: (id: string) => dispatch(handleRemoveNote(id)),
  toggleImportance: (id: string) => dispatch(changeNoteImportance(id))
});

export default connect<StateProps, DispatchProps, {}, Store>(
  mapStateToProps,
  mapDispatchToProps
)(NotesList);
