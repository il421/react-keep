import React from "react";
import { FlexBox } from "../ui-components";
import { JustifyContent } from "../../common";
import { ThunkDispatch } from "redux-thunk";

import { NotesStoreState, Store } from "../../store/store.types";
import { connect } from "react-redux";
import { changeNoteArchiveStatus } from "../../actions/notes";
import { ArchiveItem } from "./ArchiveItem";
import "../../styles/components/archive/_archive-list.scss";

interface StateProps {
  notes: NotesStoreState[];
}

interface DispatchProps {
  unarchiveNote: (id: string) => void;
}

export type Props = StateProps & DispatchProps;

export const ArchiveListBase: React.FunctionComponent<Props> = ({
  notes,
  unarchiveNote,
}) => {
  return (
    <FlexBox
      className="archive-list"
      vertical
      justifyContent={JustifyContent.spaceBetween}
    >
      {notes
        .filter((note: NotesStoreState) => note.archive)
        .map((note: NotesStoreState, index: number) => (
          <ArchiveItem note={note} unarchiveNote={unarchiveNote} key={index} />
        ))}
    </FlexBox>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  unarchiveNote: (id: string) => dispatch(changeNoteArchiveStatus(id)),
});

const mapStateToProps = (state: Store): StateProps => {
  return {
    notes: state.notes,
  };
};

export const ArchiveList = connect<StateProps, DispatchProps, {}, Store>(
  mapStateToProps,
  mapDispatchToProps
)(ArchiveListBase);
