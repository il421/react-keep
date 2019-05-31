import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColorBox from './ColorBox';

export default class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.note ? props.note.title : '',
      text: props.note ? props.note.text : '',
      createAt: props.note ? moment(props.note.createAt) : moment(),
      color: props.note ? props.note.color : 'white',
    };
  }

  options = [
    {
      key: 'color',
      icon: 'palette',
    }
  ]

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

      this.clearForm();
    }
  }

  clearForm =() => {
    const defaultNoteState = {
      title: '',
      text: '',
      createAt: moment(),
      color: 'white',
    };

    this.setState(defaultNoteState);
    this.onColorChange(defaultNoteState.color);
  }

  render() {
    return (
      <>
        <div className="form">
          <input
            className="form__title"
            style={{ backgroundColor: this.state.color }}
            type="text"
            autoFocus
            value={ this.state.title }
            onChange={ this.onTitleChange }
            placeholder="Title"
          />
          <textarea
            className="form__text"
            style={{ backgroundColor: this.state.color }}
            value={ this.state.text }
            onChange={ this.onTextChange }
            required
            placeholder="Text a note ..."
            rows="2"
          />
          <div className="form__wrapper">
            <div className="form__options options">
              {
                this.options.map((option) => (
                  <div key={ option.key } className={ `pointer options__${ option.key }` }>
                    <FontAwesomeIcon icon={ option.icon } size="2x" />
                    {
                      option.key === 'color' && (
                        <ColorBox changeColor={ this.onColorChange } />
                      )
                    }
                  </div>
                ))
              }
            </div>
            <div className="form__actions">
              <button className="button--link pointer" onClick={ this.addNote } disabled={ this.state.text === '' }>Keep</button>
              <button className="button--link pointer" onClick={ this.clearForm }>Close</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

NoteForm.propTypes = {
  note: PropTypes.object,
  addNote: PropTypes.func,
};
