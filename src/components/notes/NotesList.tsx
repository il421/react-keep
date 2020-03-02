import React from "react";
import { connect } from "react-redux";
import { Store } from "../../store/store.types";
import { Note } from "../../store/store.types";

import { ContentContainer } from "../ui-components/ContentContainer";
import { NotesItem } from "./NotesItem";

interface NotesListProps {
  notes: Note[];
}

const NotesList: React.FunctionComponent<NotesListProps> = ({ notes }): JSX.Element => {

  return (
    <ContentContainer>
      {
        notes!.map((note: Note, index: number) => (
          <NotesItem note={note} key={index} />
        ))
      }
    </ContentContainer>
  );
};

const mapStateToProps = (state: Store) => ({
  notes: state.notes
});


export default connect(mapStateToProps, () => {})(NotesList);
