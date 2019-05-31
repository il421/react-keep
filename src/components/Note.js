import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { removeNote } from '../actions/notes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Note = ({ title, text, createAt, color, id, removeNote }) => {

  return (
    <div
      className="note content-container"
      style={{ backgroundColor: color }}
    >
      <div className="note__remove-btn">
        <div className="pointer">
          <FontAwesomeIcon icon="map-marker-alt" size="2x" />
        </div>
        <div className="pointer" onClick={ () => removeNote({id}) }>
          <FontAwesomeIcon icon="times" size="2x" />
        </div>
      </div>
      <div className="note__title">{ title }</div>
      <div className="note__text">{ text }</div>
      <div className='note__date'>{ moment(createAt).format('MMMM Do, YYYY') }</div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeNote: (id) => dispatch(removeNote(id))
}
);

export default connect(undefined, mapDispatchToProps)(Note);
