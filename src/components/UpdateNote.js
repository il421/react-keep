import React from 'react';
import Modal from 'react-modal';
import NoteForm from './NoteForm';
import { updateNote } from '../actions/notes';
import {connect} from 'react-redux';
// import uuid from 'uuid/v4';

export class UpdateNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.selectedNote ? props.selectedNote.color : '#fff'
    };
  }

  updateEditedNote = (id, note) => {
    const { updateNote, removeSelectedNote } = this.props;
    updateNote(id, note);
    removeSelectedNote();
  }

  updateNoteColor = (color) => {
    this.setState(({color}));
  }

  render() {
    return (
      <Modal
        isOpen={ !!this.props.selectedNote }
        onRequestClose={ this.props.removeSelectedNote }
        contentLabel="Selected option"
        closeTimeoutMS={ 200 }
        className="note-modal"
        ariaHideApp={ false }
      >
        {
          this.props.selectedNote !== undefined &&
          <div
            className="create content-container"
            style={{ backgroundColor: this.state.color }}
          >
            <NoteForm
              updateNote={ this.updateEditedNote }
              onColorChange={ this.updateNoteColor }
              note={ this.props.selectedNote }
              closeUpdateForm={ this.props.removeSelectedNote }
              name={ 'update' }
            />
          </div>
        }

      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateNote: (id, note) => dispatch(updateNote(id, note))
});

export default connect(undefined, mapDispatchToProps)(UpdateNote);
