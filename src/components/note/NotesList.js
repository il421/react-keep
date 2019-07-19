import React from 'react';
import Note from './Note';
import UpdateNote from './UpdateNote';
import { connect } from 'react-redux';
import { handleRemoveNote, changeNoteImportance } from '../../actions/notes';
import { getFilteredNotes } from '../../libs/filters';
import Modal from 'react-modal';


export class NotesList extends React.Component {

  state = {
    selectedNote: undefined,
    confirmDelete: false,
    shouldBeDeletedId: null
  };

  selectNote = (note) => {
    this.setState(() => ({
      selectedNote: note
    }));
  };

  removeSelectedNote = () => {
    this.setState(() => ({
      selectedNote: undefined
    }));
  };

  toggleConfirmDelete = (id) => {
    this.setState((prevState) => ({
      confirmDelete: !prevState.confirmDelete
    }));

    this.setState(() => ({
      shouldBeDeletedId: id
    }));
  };

  render() {
    return (
      <>
        {
          this.props.notes.some((note) => note.important) && (
            <div className="notes">
              { this.props.notes.length > 0 &&
              this.props.notes.map((note) => (
                note.important && (
                  <Note
                    key={ note.id }
                    { ...note }
                    selectNote={ () => this.selectNote(note) }
                    handleRemoveNote={ this.props.handleRemoveNote }
                    changeNoteImportance={ this.props.changeNoteImportance }
                    confirmDelete={ this.state.confirmDelete }
                    toggleConfirmDelete={ this.toggleConfirmDelete }
                  />)
              ))}
            </div>
          )
        }

        <div className="notes">
          { this.props.notes.length > 0 &&
          this.props.notes.map((note) => (
            !note.important && (
              <Note
                key={ note.id }
                { ...note }
                selectNote={ () => this.selectNote(note) }
                handleRemoveNote={ this.props.handleRemoveNote }
                changeNoteImportance={ this.props.changeNoteImportance }
                confirmDelete={ this.state.confirmDelete }
                toggleConfirmDelete={ this.toggleConfirmDelete }
              />)
          ))}
        </div>
        {
          this.state.selectedNote &&
          (
            <UpdateNote
              selectedNote={ this.state.selectedNote }
              removeSelectedNote={ this.removeSelectedNote }
            />
          )
        }

        <Modal
          isOpen={ this.state.confirmDelete }
          onRequestClose={ this.toggleConfirmDelete }
          contentLabel="Selected option"
          closeTimeoutMS={ 200 }
          className="note-modal"
          ariaHideApp={ false }
        >
          <div className="note__confirm">
            <div>Do you want to delete this note?</div>
            <div>
              <button className="button button--yep" onClick={() => {
                this.props.handleRemoveNote(this.state.shouldBeDeletedId);
                this.toggleConfirmDelete();}}
              >
                Yep
              </button>
              <button
                className="button button--nope button--secondary"
                onClick={() => { this.toggleConfirmDelete(); }}
              >
                Nope
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: getFilteredNotes(state.notes, state.filters.search, state.filters.tagFilters)
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    handleRemoveNote: (id) => dispatch(handleRemoveNote(id)),
    changeNoteImportance: (id) => dispatch(changeNoteImportance(id))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
