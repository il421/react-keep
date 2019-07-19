import React from 'react';
import { connect } from 'react-redux';
import xor from 'lodash/xor';

import { setTagsFilter } from '../../actions/filters';

export class TagsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tagFilters: []
    };
  }

  handleTagsCheck = async (evt) => {
    const value = evt.target.value;

    // toggle elements of array with xor lodash
    await this.setState((prevState) => ({
      tagFilters: xor(prevState.tagFilters, [value])
    }));

    this.props.setTagsFilter(this.state.tagFilters);
  }

  render() {
    return (
      <div className="tags-list">
        <h2 className="tags-list__title">Filter by Tag</h2>
        <div className="tags-list__filters">
          {
            this.props.userTags.length > 0 && (
              this.props.userTags.map((tag, index) => (
                <div key={ index } className="tags-list__filter">
                  <input
                    ref={ tag.id + 'list' }
                    id={ tag.id + 'list' }
                    type="checkbox"
                    value={ tag.id }
                    defaultChecked={ true }
                    onChange={ this.handleTagsCheck }
                  />
                  <label htmlFor={ tag.id + 'list' } className={ `tag-${index}` }/>
                  <div>{ tag.value }</div>
                </div>
              ))
            )
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTagsFilter: (tagFilters) => dispatch(setTagsFilter(tagFilters))
  };
};

const mapStateToProps = (state) => {
  return {
    userTags: state.tags.list
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsList);
