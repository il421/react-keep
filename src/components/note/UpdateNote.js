import React from 'react';
import Modal from 'react-modal';
import NoteForm from './NoteForm';
import { handleUpdateNote } from '../../actions/notes';
import {connect} from 'react-redux';

export class UpdateNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.selectedNote ? props.selectedNote.color : '#fff'
    };
  }

  updateEditedNote = (id, note) => {
    const { handleUpdateNote, removeSelectedNote } = this.props;
    handleUpdateNote(id, note);
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
        className="note-modal--form"
        ariaHideApp={ false }
      >
        {
          this.props.selectedNote !== undefined &&
          <div
            className="note-form content-container"
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
  handleUpdateNote: (id, note) => dispatch(handleUpdateNote(id, note))
});

export default connect(undefined, mapDispatchToProps)(UpdateNote);
