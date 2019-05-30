import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class NewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.note ? props.note.title : '',
      text: props.note ? props.note.text : '',
      createAt: props.note ? moment(props.note.createAt) : moment(),
      color: props.note ? props.note.color : 'white',
    };
  }

  colors = [
    {
      label: 'white',
      value: '#fff',
      default: true
    },
    {
      label: 'red',
      value: '#f28b82',
      default: false
    },
    {
      label: 'blue',
      value: '#cbf0f8',
      default: false
    },
    {
      label: 'yellow',
      value: '#fff475',
      default: false
    }
  ]


  onTitleChange = (evt) => {
    const title = evt.target.value;
    this.setState(() => ({ title }));
  };

  onTextChange = (evt) => {
    const text = evt.target.value;
    this.setState(() => ({ text }));
  }

  onColorChange = (evt) => {
    const color = evt.target.value;
    this.setState(() => ({ color }));
  }

  addNote = () => {
    const defaultNoteState = {
      title: '',
      text: '',
      createAt: moment(),
      color: 'white',
    }

    if (this.state.text !== '') {
      this.props.addNote({
        title: this.state.title,
        text: this.state.text,
        createAt: this.state.createAt.valueOf(),
        color: this.state.color,
      });

      this.setState(defaultNoteState);
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
            value={this.state.title}
            onChange={this.onTitleChange}
          />
          <textarea
            className="form__text"
            value={this.state.text}
            onChange={this.onTextChange}
            required
          />
          <div>
            {
              this.colors.map((color) => (
                <div key={ color.value }>
                  <label htmlFor={color.value}>{ color.label }</label>
                  <input
                    id={ color.value }
                    type="radio"
                    name="color"
                    value={ color.value }
                    onChange={ this.onColorChange }
                    checked={ color.default }
                  />
                </div>
              ))
            }
          </div>
          <div className="form__actions">
            <button onClick={this.addNote} disabled={this.state.text === ''}>Keep</button>
            <button>Close</button>
          </div>
        </div>
      </>
    );
  }
}

NewNote.propTypes = {
  note: PropTypes.object,
  addNote: PropTypes.func,
};
