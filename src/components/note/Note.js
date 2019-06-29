import React from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Note = ({
  title, text, createAt, color, id, important, tags,
  handleRemoveNote, selectNote, changeNoteImportance,
  confirmDelete, toggleConfirmDelete
}) => {

  return (
    <>
      <div
        className="note"
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
            <FontAwesomeIcon icon="bookmark" size="2x" />
          </div>
          <div className="actions__remove-btn pointer" onClick={
            (evt) => {
              evt.stopPropagation();
              toggleConfirmDelete();
            }
          }>
            <FontAwesomeIcon icon="times" size="2x" />
          </div>
        </div>

        <div className="note__content content">
          {
            title.trim() !== '' && <div className="content__title">{ title }</div>
          }
          <div className="content__text">{ text }</div>
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
      <Modal
        isOpen={ confirmDelete }
        onRequestClose={ toggleConfirmDelete }
        contentLabel="Selected option"
        closeTimeoutMS={ 200 }
        className="note-modal"
        ariaHideApp={ false }
      >
        <div className="note__confirm">
          <div>Do you want to delete this note?</div>
          <div>
            <button className="button" onClick={() => {
              handleRemoveNote(id);
              toggleConfirmDelete();
            }}>Yep</button>
            <button className="button button--secondary" onClick={() => { toggleConfirmDelete(); }}>Nope</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Note;
