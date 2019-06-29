import React from 'react';
import { connect } from 'react-redux';
import { handleAddENote } from '../../actions/notes';

import NoteForm from './NoteForm';

export class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#fff',
      displayForm: false
    };
  }
  addNewNote = (note) => {
    const { handleAddENote } = this.props;
    handleAddENote(note);
  }

  changeNoteColor = (color) => {
    this.setState(() => ({ color }));
  }

  displayNoteForm = (value) => {
    this.setState(() => ({ displayForm: value }));
  }

  render() {
    return (
      <>
        {
          this.state.displayForm ? (
            <div className="note-form content-container" style={{ backgroundColor: this.state.color }}>
              <NoteForm
                addNote={ this.addNewNote }
                name={ 'add' }
                onColorChange={ this.changeNoteColor }
                displayNoteForm={ this.displayNoteForm }
              />
            </div>
          ) : (
            <div
              className="note-form note-form--animation content-container"
              onClick={ () => this.displayNoteForm(true) }
            >
              <div className="note-form__keep pointer">Keep note ...</div>
            </div>
          )
        }
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleAddENote: (note) => dispatch(handleAddENote(note))
}
);

export default connect(undefined, mapDispatchToProps)(AddNote);
