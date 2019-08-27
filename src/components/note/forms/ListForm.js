import React from 'react';

import moment from 'moment';
import uuid from 'uuid/v1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FormActions from '../FormActions';

export class ListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.note ? props.note.title : '',
      list: props.note ? props.note.list : [{ id: uuid(), text: '', checked: false }],
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

  onTextChange = (evt, id) => {
    const text = evt.target.value;
    const item = this.state.list.find((i) => i.id === id);

    if (typeof item !== 'undefined' && item.text.length === 0) {
      const item = {
        id: uuid(),
        text: '',
        checked: false
      };

      this.setState((prevState) => ({
        list: [...prevState.list, item]
      }));
    }

    this.setState((prevState) => ({
      list: prevState.list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            text
          };
        }
        return item;
      })
    }));
  };

  onCheckChange = (id) => {
    this.setState((prevState) => ({
      list: prevState.list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked
          };
        }
        return item;
      })
    }));
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

  removeListItem = (id) => {
    this.setState((prevState) => ({
      list: prevState.list.filter(item => item.id !== id)
    }));
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

  displayTagsModal = () => {
    this.closeUpdateForm();
    this.props.handleDisplayTagsModal(true);
  }


  render() {
    return (
      <div className={ `form form--${ this.props.name }` }>
        <input
          className="form__title"
          type="text"
          value={ this.state.title }
          onChange={ this.onTitleChange }
          placeholder="Title"
          spellCheck="false"
        />

        <div className="form__list list">
          {
            this.state.list.map((item, index) => (
              <div key={ index } className="list__item item">

                {
                  item.text.length !== 0 ? (
                    <div className="item__check">
                      <input
                        id={ `checkbox${ item.id }` }
                        type="checkbox"
                        name="list" value={ item.checked }
                        onChange={ () => this.onCheckChange(item.id) }
                      />
                      <label htmlFor={ `checkbox${ item.id }` } />
                    </div>
                  ) : (
                    <div className="item__check">
                    +
                    </div>
                  )
                }

                <div className="item__text">
                  <input
                    id={ `item${ item.id }` }
                    type="text"
                    value={ item.text }
                    className="form__text"
                    onChange={ (evt) => this.onTextChange(evt, item.id) }
                    placeholder={item.text.length === 0 ? 'Type something important' : ''}
                  />
                </div>

                {
                  item.text.length !== 0 && ( // not for empty item
                    <div className="item__remove pointer" onClick={ () => this.removeListItem(item.id) }>
                      <FontAwesomeIcon icon="times" size="1x" />
                    </div>
                  )
                }
              </div>
            ))
          }
        </div>

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
          displayTagsModal={ this.displayTagsModal }
          handleTagChange={ this.onTagChange }
        />
      </div>
    );
  }
}

export default ListForm;
