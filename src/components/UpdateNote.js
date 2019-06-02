import React from 'react';
import Modal from 'react-modal';
import NoteForm from './NoteForm';
import { updateNote } from '../actions/notes';
import {connect} from 'react-redux';
// import uuid from 'uuid/v4';

export class UpdateNote extends React.Component {

  updateEditedNote = (id, note) => {
    const { updateNote, handleClearSelectedNote } = this.props;
    updateNote(id, note);
    handleClearSelectedNote();
  }

  render() {
    return (
      <Modal
        isOpen={ !!this.props.selectedNote }
        onRequestClose={ this.props.handleClearSelectedNote }
        contentLabel="Selected option"
        closeTimeoutMS={ 200 }
        className="note-modal"
        ariaHideApp={ false }
      >
        {
          this.props.selectedNote !== undefined &&
          <div
            className="create content-container"
            style={{ backgroundColor: this.props.selectedNote.color }}
          >
            <NoteForm
              updateNote={ this.updateEditedNote }
              onColorChange={ this.changeNoteColor }
              note={ this.props.selectedNote }
              closeUpdateForm={ this.props.handleClearSelectedNote }
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
