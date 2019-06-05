import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColorBox from './ColorBox';
import ContentEditable from 'react-contenteditable';

export default class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.note ? props.note.title : '',
      text: props.note ? props.note.text : '',
      createAt: props.note ? moment(props.note.createAt) : moment(),
      color: props.note ? props.note.color : '#fff',
    };
  }

  onTitleChange = (evt) => {
    const title = evt.target.value;
    this.setState(() => ({ title }));
  };

  onTextChange = (evt) => {
    const text = evt.target.value;
    this.setState(() => ({ text }));
  };

  onColorChange = (color) => {
    this.setState(() => ({ color }));
    this.props.onColorChange(color);
  };

  addNote = () => {
    if (this.state.text !== '') {
      this.props.addNote({
        title: this.state.title,
        text: this.state.text,
        createAt: this.state.createAt.valueOf(),
        color: this.state.color,
      });

      this.cleanForm();
    }
  }

  updateNote = () => {
    if (this.props.note) {
      this.props.updateNote(this.props.note.id, {
        title: this.state.title,
        text: this.state.text,
        createAt: this.state.createAt.valueOf(),
        color: this.state.color,
      });
    }
  }

  cleanForm = () => {
    const defaultNoteState = {
      title: '',
      text: '',
      createAt: moment(),
      color: '#fff',
    };

    this.setState(defaultNoteState);
    this.onColorChange(defaultNoteState.color);
  }

  closeUpdateForm = () => {
    if (this.props.note) {
      this.props.closeUpdateForm();
    }
  }

  render() {
    return (
      <>
        <div className="form">
          <input
            className="form__title"
            type="text"
            autoFocus
            value={ this.state.title }
            onChange={ this.onTitleChange }
            placeholder="Title"
            spellCheck="false"
          />

          <ContentEditable
            className="form__text"
            html={ this.state.text }
            onChange={ this.onTextChange }
            placeholder={'Type something ...'}
            spellCheck="false"
          />

          <div className="form__wrapper">
            <div className="form__options options">
              <div className="pointer options__color">
                <FontAwesomeIcon icon="palette" size="2x" />
                <ColorBox
                  name={ this.props.name }
                  updateColor={ this.onColorChange }
                  defaultColor={ this.state.color }
                />
              </div>
            </div>
            <div className="form__actions">
              <button
                className="button--link pointer"
                onClick={ this.props.note ? this.updateNote : this.addNote }
                disabled={ this.state.text === '' }
              >
                { this.props.note ? 'Update' : 'Keep' }
              </button>

              <button
                className="button--link pointer"
                onClick={ this.props.note ? this.closeUpdateForm : this.cleanForm }
              >
                { this.props.note ? 'Close' : 'Clean' }
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
