import React from 'react';
import Note from './Note';
import EditNote from './UpdateNote';
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

  handleClearSelectedNote = () => {
    this.setState(() => ({
      selectedNote: undefined
    }));
  };

  render() {
    return (
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
        <EditNote
          selectedNote={ this.state.selectedNote }
          handleClearSelectedNote={ this.handleClearSelectedNote }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  };
};

export default connect(mapStateToProps)(NotesList);
