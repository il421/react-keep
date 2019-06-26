import React from 'react';
import { connect } from 'react-redux';
import { handleAddENote } from '../../actions/notes';

import NoteForm from './NoteForm';

export class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#fff'
    };
  }
  addNewNote = (note) => {
    const { handleAddENote } = this.props;
    handleAddENote(note);
  }

  changeNoteColor = (color) => {
    this.setState(() => ({ color }));
  }

  render() {
    return (
      <div className="create content-container" style={{ backgroundColor: this.state.color }}>
        <NoteForm
          addNote={ this.addNewNote }
          name={ 'add' }
          onColorChange={ this.changeNoteColor }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleAddENote: (note) => dispatch(handleAddENote(note))
}
);

export default connect(undefined, mapDispatchToProps)(AddNote);
