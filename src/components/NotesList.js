import React from 'react';
import Note from './note';
import { connect } from 'react-redux';


const NotesList = (props)  => {

  return (
    <div className="notes content-container">
      { props.notes.length > 0 &&
        props.notes.map((note) => (
          <Note
            key={ note.id }
            { ...note }
          />
        ))
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  };
}

export default connect(mapStateToProps)(NotesList);
