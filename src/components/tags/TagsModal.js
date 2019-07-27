import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import { handleAddTag, handleRemoveTag, handleUpdateTag, handleDisplayTagsModal } from '../../actions/tags';
import { removeTagFromNotes, updateNotesTag } from '../../actions/notes';

export class TagsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editableTag: null,
      tag: '',
    };

    // input new tag ref
    this.refNewInput = createRef();
  }

  onTagChange = (evt) => {
    const value = evt.target.value;
    this.setState(() => ({
      tag: value.trim()
    }));
  }

  onCurrentTagUpdate = (id, update) => {
    if (update.trim().length > 0) {
      this.props.handleUpdateTag(id, update);
      this.props.updateNotesTag(id, update);
    }

    this.setEditableTag(id);
  }

  addNewTag = () => {
    if (this.state.tag !== '') {
      this.props.handleAddTag(this.state.tag);
    } else {
      // @todo Add toast
    }

    // clean state.tag and local input value by ref
    this.refNewInput.current.value = '';
    this.setState({ tag: '' });
  }

  removeTag = (id) => {
    this.props.handleRemoveTag(id);
    this.props.removeTagFromNotes(id);
  }

  setEditableTag = (id) => {
    let editableTag = null;

    if (this.state.editableTag === null) {
      editableTag = id;
    }

    this.setState({ editableTag });
  }

  render () {
    return (
      <>
        <Modal
          isOpen={ this.props.displayTagsModal }
          onRequestClose={ () => this.props.handleDisplayTagsModal(false) }
          closeTimeoutMS={ 200 }
          className="tags__modal"
          ariaHideApp={ false }
        >
          <div>
            <div className="tags__title">Add/Edit Tags</div>
            <div className="tags__add">
              <input
                id="newTag"
                ref={ this.refNewInput }
                type="text"
                placeholder="Type a new tag ..."
                onChange={ this.onTagChange }
                onKeyPress={ (evt) => evt.key === 'Enter' && this.addNewTag() }
                disabled={ this.state.editableTag !== null }
              />
              <button className="button--link tags__add-btn" onClick={ this.addNewTag }>+</button>
            </div>

            <div className="tags__list">
              {
                this.props.userTags.map((tag, index) => (
                  <div className="tags__item item" key={ index }>

                    {
                      this.state.editableTag === tag.id ?
                      // if id is in editableTags array display input to edit the tag
                        (
                            <>
                              <input
                                id="editableTag"
                                type="text"
                                autoFocus={ true }
                                onChange={ this.onTagChange }
                                onKeyPress={ (evt) => evt.key === 'Enter' && this.onCurrentTagUpdate(tag.id, this.state.tag) }
                                placeholder={ tag.value }
                              />
                              <div className="item__actions">
                                <div className="pointer actions__edit" onClick={ () => this.onCurrentTagUpdate(tag.id, this.state.tag) }>
                                  <FontAwesomeIcon icon="edit" size="1x" />
                                </div>
                                <div className="pointer actions__remove" onClick={ () => this.setEditableTag(tag.id) }>
                                  <FontAwesomeIcon icon="times" size="1x" />
                                </div>
                              </div>
                            </>
                        ) : (
                            <>
                              <div className="pointer tags__edit-btn" onClick={ () => this.setEditableTag(tag.id) }>
                                <FontAwesomeIcon icon="edit" size="1x" />
                              </div>
                              <div className={`tags__name tags__name--${index}`}>{ tag.value }</div>
                              <div className="pointer tags__remove-btn" onClick={ () => { this.removeTag(tag.id); } }>
                                <FontAwesomeIcon icon="times" size="1x" />
                              </div>
                            </>
                        )
                    }
                  </div>
                ))
              }
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleAddTag: (tag) => dispatch(handleAddTag(tag)),
  handleRemoveTag: (id) => dispatch(handleRemoveTag(id)),
  removeTagFromNotes: (id) => dispatch(removeTagFromNotes(id)),
  handleUpdateTag: (id, update) => dispatch(handleUpdateTag(id, update)),
  updateNotesTag: (id, update) => dispatch(updateNotesTag(id, update)),
  handleDisplayTagsModal: (value) => dispatch(handleDisplayTagsModal(value))
});

const mapStateToProps = (state) => {
  return {
    userTags: state.tags.list,
    displayTagsModal: state.tags.displayTagsModal
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsModal);
