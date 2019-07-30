import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getShortText } from '../../libs/filters';

import html from 'react-inner-html';

const Note = ({
  title, text, createAt, color, id, important, tags, selectNote, changeNoteImportance, toggleConfirmDelete
}) => {

  return (
    <>
      <div
        className="note note--animation"
        style={{ backgroundColor: color }}
        onClick={ () => selectNote({ title, text, createAt, color, id }) }
      >
        <div className="note__actions actions">
          <div
            className={ important ? 'actions--important pointer' : 'actions--casual pointer' }
            onClick={(evt) => {
              changeNoteImportance(id);
              evt.stopPropagation();
            }
            }>
            <FontAwesomeIcon icon="bookmark" size="lg" />
          </div>
          <div className="actions__remove-btn pointer" onClick={
            (evt) => {
              evt.stopPropagation();
              toggleConfirmDelete(id);
            }
          }>
            <FontAwesomeIcon icon="times" size="lg" />
          </div>
        </div>

        <div className="note__content content">
          {
            title.trim() !== '' && <div className="content__title">{ title }</div>
          }
          <div className="content__text" { ...html(getShortText(text)) } />
        </div>

        <div className="note__details details">
          <div className='details__date'>{ moment(createAt).format('MMMM Do, YYYY') }</div>
          <div className='details__tags'>
            {
              tags.length > 0 && (
                tags.map((tag, index) => (
                  <div key={ index }>
                    { tag.value }
                  </div>
                ))
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
