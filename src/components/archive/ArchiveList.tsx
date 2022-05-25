import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { changeNoteArchiveStatus } from "../../actions/notes";
import { JustifyContent } from "../../common";
import { NotesStoreState, Store } from "../../store/store.types";
import "../../styles/components/archive/_archive-list.scss";
import { FlexBox } from "../ui-components";
import { ArchiveItem } from "./ArchiveItem";

interface StateProps {
  notes: NotesStoreState[];
}

interface DispatchProps {
  unarchiveNote: (id: string) => void;
}

export type Props = StateProps & DispatchProps;

export const ArchiveListBase: React.FunctionComponent<Props> = ({
  notes,
  unarchiveNote
}) => {
  return (
    <FlexBox
      className="archive-list"
      vertical
      justifyContent={JustifyContent.spaceBetween}
    >
      {notes
        .filter((note: NotesStoreState) => note.archive)
        .map((note: NotesStoreState) => (
          <ArchiveItem note={note} unarchiveNote={unarchiveNote} key={note.id} />
        ))}
    </FlexBox>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  unarchiveNote: (id: string) => dispatch(changeNoteArchiveStatus(id))
});

const mapStateToProps = (state: Store): StateProps => {
  return {
    notes: state.notes
  };
};

export const ArchiveList = connect<StateProps, DispatchProps, {}, Store>(
  mapStateToProps,
  mapDispatchToProps
)(ArchiveListBase);
