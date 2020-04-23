import React from "react";
import { FlexBox } from "../ui-components/FlexBox";
import { JustifyContent } from "../../common/variables";
import { ThunkDispatch } from "redux-thunk";

import { NotesStoreState, Store } from "../../store/store.types";
import { connect } from "react-redux";
import { changeNoteArchiveStatus } from "../../actions/notes";
import { ArchiveItem } from "./ArchiveIem";
import "../../styles/components/archive/_archive-list.scss";

interface StateProps {
  notes: NotesStoreState[];
}

interface DispatchProps {
  unarchiveNote: (id: string) => void;
}

type Props = StateProps & DispatchProps;

const ArchiveList: React.FunctionComponent<Props> = ({
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
        .filter((note) => note.archive)
        .map((note) => (
          <ArchiveItem note={note} unarchiveNote={unarchiveNote} />
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

export default connect<StateProps, DispatchProps, {}, Store>(
  mapStateToProps,
  mapDispatchToProps
)(ArchiveList);
