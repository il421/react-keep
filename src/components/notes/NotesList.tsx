import React from "react";
import { connect } from "react-redux";
import { Store } from "../../store/store.types";
import { ContentContainer } from "../ui-components/ContentContainer";

const NotesList: React.FunctionComponent = () => {

  return (
    <ContentContainer>
      notes
    </ContentContainer>
  );
};

const mapStateToProps = (state: Store) => {
  return {
    notes: state.notes
  };
};


export default connect(mapStateToProps, undefined)(NotesList);
