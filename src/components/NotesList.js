import React from 'react';
import Note from './Note';
import UpdateNote from './UpdateNote';
import { connect } from 'react-redux';


export class NotesList extends React.Component {

  state = {
    selectedNote: undefined
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

  render() {
    return (
      <>
        <div className="notes content-container">
          { this.props.notes.length > 0 &&
          this.props.notes.map((note) => (
            <Note
              key={ note.id }
              { ...note }
              selectNote={ () => this.selectNote(note) }
            />
          ))
          }
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

export default connect(mapStateToProps)(NotesList);
