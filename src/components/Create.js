import React from 'react';
import { connect } from 'react-redux';
import { addNote } from '../actions/notes';

import uuid from 'uuid/v4';

import NewNote from './NewNote';

export class Create extends React.Component {
  addNewNote = (note) => {
    const { addNote } = this.props;
    addNote({id: uuid(), ...note});
  }

  render() {
    return (
      <div className="create content-container">
        <NewNote
          addNote={ this.addNewNote }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => dispatch(addNote(note))
}
);

export default connect(undefined, mapDispatchToProps)(Create);
