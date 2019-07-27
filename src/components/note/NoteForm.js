import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColorBox from './ColorBox';
import TagsSelection from '../tags/TagsSelection';
import Textarea from 'react-textarea-autosize';
import { handleDisplayTagsModal } from '../../actions/tags';

export class NoteForm extends React.Component {
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
    this.props.displayNoteForm(false);
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

          <div className="form__wrapper">
            <div className="form__options options">
              <div className="pointer options__color">
                <FontAwesomeIcon icon="palette" size="lg" />
                <ColorBox
                  name={ this.props.name }
                  updateColor={ this.onColorChange }
                  defaultColor={ this.state.color }
                />
              </div>

              <div className="pointer options__tags">
                <FontAwesomeIcon icon="tags" size="lg" />
                {
                  this.props.userTags.length > 0 ? (
                    <TagsSelection
                      tags={ this.state.tags }
                      userTags={ this.props.userTags }
                      handleTagChange={ this.onTagChange }
                      name={ this.props.name }
                    />
                  ) : (
                    <div className="tags-selection tags-selection__none">
                      <a onClick={ this.displayTagsModal  }>Add your personal tags</a>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="form__actions">
              <button
                className="button--link pointer actions__close-note"
                onClick={ this.props.note ? this.closeUpdateForm : this.cleanForm }
              >
                Close
              </button>

              <button
                className="button--link pointer actions__keep-note"
                onClick={ this.props.note ? this.updateNote : this.addNote }
                disabled={ this.state.text === '' && this.state.title === '' }
              >
                { this.props.note ? 'Update' : 'Keep' }
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userTags: state.tags.list
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleDisplayTagsModal: (value) => dispatch(handleDisplayTagsModal(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);

