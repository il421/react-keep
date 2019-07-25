import React from 'react';
import { connect } from 'react-redux';
import { setSearchFilter } from '../../actions/filters';

export const Search = ({ setSearchFilter }) => {

  return (
    <>
      <input
        className="search"
        placeholder="Search"
        onInput={ (evt) => setSearchFilter(evt.target.value) }
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchFilter: (value) => dispatch(setSearchFilter(value))
  };
};

export default connect(undefined, mapDispatchToProps)(Search);
