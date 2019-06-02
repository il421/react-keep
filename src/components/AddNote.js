import React from 'react';
import { connect } from 'react-redux';
import { addNote } from '../actions/notes';

import uuid from 'uuid/v4';

import NoteForm from './NoteForm';

export class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#fff'
    };
  }
  addNewNote = (note) => {
    const { addNote } = this.props;
    addNote({ id: uuid(), ...note });
  }

  changeNoteColor = (color) => {
    this.setState(() => ({ color }));
  }

  render() {
    return (
      <div className="create content-container" style={{ backgroundColor: this.state.color }}>
        <NoteForm
          addNote={ this.addNewNote }
          onColorChange={ this.changeNoteColor }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => dispatch(addNote(note))
}
);

export default connect(undefined, mapDispatchToProps)(AddNote);
