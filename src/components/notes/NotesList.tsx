import React from "react";
import { connect } from "react-redux";
import { Store } from "../../store/store.types";
import { Note } from "../../store/store.types";

import { ContentContainer } from "../ui-components/ContentContainer";
import NotesItem from "./NotesItem";
import { ThunkDispatch } from "redux-thunk";
import { changeNoteImportance, handleRemoveNote } from "../../actions/notes";
import { QueryKeys } from "../../routers/Routing";

interface StateProps {
  notes: Note[];
}

interface DispatchProps {
  removeNote: (id: string) => void;
  toggleImportance: (id: string) => void;
}

interface NotesListProp {
  onNoteSelected: (key: keyof typeof QueryKeys, id: string) => void;
}

type Props = StateProps & DispatchProps & NotesListProp;

const NotesList: React.FunctionComponent<Props> = ({
  notes,
  removeNote,
  toggleImportance,
  onNoteSelected
}): JSX.Element => {
  return (
    <ContentContainer>
      {notes.map((note: Note, index: number) => (
        <NotesItem
          key={index}
          note={note}
          toggleImportance={toggleImportance}
          removeNote={removeNote}
          onNoteSelected={onNoteSelected}
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

export default connect<StateProps, DispatchProps, NotesListProp, Store>(
  mapStateToProps,
  mapDispatchToProps
)(NotesList);
