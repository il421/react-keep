import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TagsModal from './TagsModal';
import TagsList from './TagsList';
import {connect} from 'react-redux';
import { handleDisplayTagsModal } from '../../actions/tags';

export class Tags extends Component{
  toggleEditTags = () => {
    this.props.handleDisplayTagsModal(true);
    this.props.hideSidebar();
  }


  render() {
    return (
      <div className="tags">

        <div className="tags__filters">
          <TagsList />
        </div>

        <div className="tags__add-edit pointer">
          <FontAwesomeIcon icon="edit" size="lg" />
          <button onClick={ this.toggleEditTags } className="button--link">Add/Edit Tags</button>
        </div>

        <TagsModal />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleDisplayTagsModal: (value) => dispatch(handleDisplayTagsModal(value))
}
);

export default connect(undefined, mapDispatchToProps)(Tags);
