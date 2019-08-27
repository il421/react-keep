import React from 'react';
import moment from 'moment';

import Textarea from 'react-textarea-autosize';
import FormActions from '../FormActions';

export class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.note ? props.note.title : '',
      text: props.note ? props.note.text : '',
      createAt: props.note ? moment(props.note.createAt) : moment(),
      color: props.note ? props.note.color : '#fff',
      important: props.note ? props.note.important : false,
      tags: props.note ? props.note.tags : []
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

  onTagChange = (checked, id) => {
    if (checked) {
      const tag = this.props.userTags.find((tag) => tag.id === id);
      // add tag
      this.setState(() => ({
        tags: [...this.state.tags, tag]
      }));
    } else {
      // delete tag
      this.setState((prevState) => ({
        tags: prevState.tags.filter((tag) => tag.id !== id)
      }));
    }
  }

  addNote = () => {
    this.props.addNote({
      title: this.state.title,
      text: this.state.text,
      createAt: this.state.createAt.valueOf(),
      color: this.state.color,
      important: this.state.important,
      tags: this.state.tags,
    });

    this.cleanForm();
  }

  updateNote = () => {
    if (this.props.note) {
      this.props.updateNote(this.props.note.id, {
        title: this.state.title,
        text: this.state.text,
        createAt: this.state.createAt.valueOf(),
        color: this.state.color,
        important: this.state.important,
        tags: this.state.tags,
      });
    }
  }

  cleanForm = () => {
    const defaultNoteState = {
      title: '',
      text: '',
      createAt: moment(),
      color: '#fff',
      important: false,
      tags: []
    };

    this.setState(defaultNoteState);
    this.onColorChange(defaultNoteState.color);
    this.props.handleFormOptionSelect(null);
  }

  closeUpdateForm = () => {
    if (this.props.note) {
      this.props.closeUpdateForm();
    }
  }

  render() {
    return (
      <>
        <div className={ `form form--${ this.props.name }` }>
          <input
            className="form__title"
            type="text"
            value={ this.state.title }
            onChange={ this.onTitleChange }
            placeholder="Title"
            spellCheck="false"
          />

          <Textarea
            className="form__text"
            value={this.state.text}
            onChange={this.onTextChange}
            placeholder={'Type something ...'}
            spellCheck="false"
          />

          <FormActions
            userTags={ this.props.userTags }
            name={ this.props.name }
            state={ this.state }
            note={ this.props.note }
            updateColor={ this.onColorChange }
            updateNote={ this.updateNote }
            addNote={ this.addNote }
            closeUpdateForm={ this.closeUpdateForm }
            cleanForm={ this.cleanForm }
            handleTagChange={ this.onTagChange }
          />
        </div>
      </>
    );
  }
}

export default TextForm;

