import React from 'react';
import { connect } from 'react-redux';
import { handleAddENote } from '../../actions/notes';

import TextForm from './forms/TextForm';
import ListForm from './forms/ListForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class NoteSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#fff',
      noteOption: null
    };
  }

  noteOptions = [
    {
      key: 'simple',
      icon: 'align-left'
    },
    {
      key: 'list',
      icon: 'check-square'
    }
  ]


  addNewNote = (note) => {
    const { handleAddENote } = this.props;
    handleAddENote(note);
  }

  changeNoteColor = (color) => {
    this.setState(() => ({ color }));
  }

  // @todo re-write tests
  handleFormOptionSelect = (evt) => {
    let value = null;
    if(evt !== null) {
      value = evt.target.value;
    }
    this.setState(() => ({ noteOption: value }));
  }

  render() {
    return (
      <>
        {
          this.state.noteOption === null ? (
            // Note Options Select
            <div
              className="note-selection note-selection--select note-selection--animation content-container"
            >
              <div className="note-selection__title">Keep note ...</div>
              <div className="note-selection__options">
                {
                  this.noteOptions.map((option, index) => (
                    <div key={ index }>
                      <input
                        id={ option.key } type="radio" name="note-selection"
                        value={ option.key }
                        onChange={ this.handleFormOptionSelect }
                      />
                      <label htmlFor={ option.key } className="pointer">
                        <FontAwesomeIcon icon={option.icon} size="2x" />
                      </label>
                    </div>
                  ))
                }
              </div>
            </div>
          ) :
            this.state.noteOption === 'simple' ? (
              // Simple Note Option
              <div className="note-selection content-container" style={{ backgroundColor: this.state.color }}>
                <TextForm
                  addNote={ this.addNewNote }
                  name={ 'add' }
                  userTags={ this.props.userTags }
                  onColorChange={ this.changeNoteColor }
                  handleFormOptionSelect={ this.handleFormOptionSelect }
                />
              </div>
            ) : (
              // List Note Option
              <div className="note-selection content-container" style={{ backgroundColor: this.state.color }}>
                <ListForm
                  addNote={ this.addNewNote }
                  userTags={ this.props.userTags }
                  name={ 'add' }
                  onColorChange={ this.changeNoteColor }
                  handleFormOptionSelect={ this.handleFormOptionSelect }
                />
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

const mapStateToProps = (state) => {
  return {
    userTags: state.tags.list
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteSelection);
