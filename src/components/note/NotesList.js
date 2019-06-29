import React from 'react';
import Note from './Note';
import UpdateNote from './UpdateNote';
import { connect } from 'react-redux';
import { handleRemoveNote, changeNoteImportance } from '../../actions/notes';
import getFilteredNotes from '../../libs/filters';


export class NotesList extends React.Component {

  state = {
    selectedNote: undefined,
    confirmDelete: false
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

  toggleConfirmDelete = () => {
    this.setState((prevState) => ({
      confirmDelete: !prevState.confirmDelete
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
