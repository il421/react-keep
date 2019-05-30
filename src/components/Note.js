import React from 'react';
import moment from 'moment';

const Note = ({ title, text, createAt, color }) => {

  return (
    <div
      className="note content-container"
      style={ {backgroundColor: color} }
    >
      <h4>{ title }</h4>
      <div>{ text }</div>
      <div>{ moment(createAt).format('MMMM Do, YYYY') }</div>
    </div>
  );
};

export default Note;
