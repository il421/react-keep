import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import { startAddTag, startRemoveTag } from '../../actions/tags';
import {connect} from 'react-redux';

export class Tags extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      displayEditTags: false,
      tag: '',
    };
  }

  toggleEditTags = () => {
    this.props.toggleSidebarDisplay();

    this.setState((prevState) => ({
      displayEditTags: !prevState.displayEditTags
    }));
  }

  onTagChange = (evt) => {
    const value = evt.target.value;
    this.setState(() => ({
      tag: value.trim()
    }));
  }

  addNewTag = () => {
    if (this.state.tag !== '') {
      this.props.startAddTag(this.state.tag);
    } else {
      // Add toast
    }

    this.setState({ tag: '' });
  }

  render() {
    return (
      <div className="tags">
        <div className="tags__filters"></div>
        <div className="tags__add-edit pointer">
          <FontAwesomeIcon icon="edit" size="2x" />
          <button onClick={ this.toggleEditTags } className="button--link">Add/Edit Tags</button>
        </div>

        <Modal
          isOpen={ this.state.displayEditTags }
          onRequestClose={ this.toggleEditTags }
          contentLabel="Add/Edit Tags"
          closeTimeoutMS={ 200 }
          className="tags__modal"
          ariaHideApp={ false }
          overlayClassName="modal-overlay"
        >
          <div>
            <div className="tags__add">
              <input
                type="text"
                placeholder="Type a new tag ..."
                autoFocus={ true }
                onChange={ this.onTagChange }
                value={ this.state.tag }
              />
              <button className="button--link" onClick={ this.addNewTag }>+</button>
            </div>

            <div className="tags__list">
              {
                this.props.tags.length > 0 &&
                this.props.tags.map((tag, index) => (
                  <div key={ index } className="tags__item">
                    <div><FontAwesomeIcon icon="edit" size="1x" /></div>
                    <div>{ tag.value }</div>
                    <div className="pointer" onClick={ () => this.props.startRemoveTag(tag.id) }>
                      <FontAwesomeIcon icon="times" size="1x" />
                    </div>
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
  startAddTag: (tag) => dispatch(startAddTag(tag)),
  startRemoveTag: (id) => dispatch(startRemoveTag(id))
}
);

const mapStateToProps = (state) => {
  return {
    tags: state.tags
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
