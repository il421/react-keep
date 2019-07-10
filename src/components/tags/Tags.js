import React, { Component, createRef } from 'react';
import {connect} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';

import { handleAddTag, handleRemoveTag, handleUpdateTag } from '../../actions/tags';
import { removeTagFromNotes, updateNotesTag } from '../../actions/notes';

import TagsList from './TagsList';

export class Tags extends Component{
  constructor(props) {
    super(props);
    this.state = {
      displayEditTags: false,
      editableTag: null,
      tag: '',
    };

    // input new tag ref
    this.refNewInput = createRef();
  }

  toggleEditTags = () => {
    this.setState((prevState) => ({
      displayEditTags: !prevState.displayEditTags
    }));
    this.props.hideSidebar();
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
      // Add toast
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

  render() {
    return (
      <div className="tags">

        <div className="tags__filters">
          <TagsList userTags={ this.props.tags } name={ 'list' } />
        </div>

        <div className="tags__add-edit pointer">
          <FontAwesomeIcon icon="edit" size="2x" />
          <button onClick={ this.toggleEditTags } className="button--link">Add/Edit Tags</button>
        </div>

        <Modal
          isOpen={ this.state.displayEditTags }
          onRequestClose={ this.toggleEditTags }
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
              <button className="button--link" onClick={ this.addNewTag }>+</button>
            </div>

            <div className="tags__list">
              {
                this.props.tags.map((tag, index) => (
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
                              <div className="pointer" onClick={ () => this.onCurrentTagUpdate(tag.id, this.state.tag) }>
                                <FontAwesomeIcon icon="edit" size="1x" />
                              </div>
                              <div className="pointer" onClick={ () => this.setEditableTag(tag.id) }>
                                <FontAwesomeIcon icon="times" size="1x" />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="pointer" onClick={ () => this.setEditableTag(tag.id) }>
                              <FontAwesomeIcon icon="edit" size="1x" />
                            </div>
                            <div className="tags__name">{ tag.value }</div>
                            <div className="pointer" onClick={ () => {this.removeTag(tag.id)} }>
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleAddTag: (tag) => dispatch(handleAddTag(tag)),
  handleRemoveTag: (id) => dispatch(handleRemoveTag(id)),
  removeTagFromNotes: (id) => dispatch(removeTagFromNotes(id)),
  handleUpdateTag: (id, update) => dispatch(handleUpdateTag(id, update)),
  updateNotesTag: (id, update) => dispatch(updateNotesTag(id, update))
}
);

const mapStateToProps = (state) => {
  return {
    tags: state.tags
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
