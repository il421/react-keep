import React from 'react';
import Note from './Note';
import UpdateNote from './UpdateNote';
import { connect } from 'react-redux';
import { startRemoveNote, toggleNoteImportance } from '../../actions/notes';


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
            <div className="notes content-container">
              { this.props.notes.length > 0 &&
              this.props.notes.map((note) => (
                note.important && (
                  <Note
                    key={ note.id }
                    { ...note }
                    selectNote={ () => this.selectNote(note) }
                    startRemoveNote={ this.props.startRemoveNote }
                    toggleNoteImportance={ this.props.toggleNoteImportance }
                    confirmDelete={ this.state.confirmDelete }
                    toggleConfirmDelete={ this.toggleConfirmDelete }
                  />)
              ))}
            </div>
          )
        }

        <div className="notes content-container">
          { this.props.notes.length > 0 &&
          this.props.notes.map((note) => (
            !note.important && (
              <Note
                key={ note.id }
                { ...note }
                selectNote={ () => this.selectNote(note) }
                startRemoveNote={ this.props.startRemoveNote }
                toggleNoteImportance={ this.props.toggleNoteImportance }
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
    notes: state.notes
  };
};

const mapDispatchToProps = (dispatch) => ({
  startRemoveNote: (id) => dispatch(startRemoveNote(id)),
  toggleNoteImportance: (id) => dispatch(toggleNoteImportance(id))
}
);

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
