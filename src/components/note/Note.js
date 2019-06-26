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
        className="note content-container"
        style={{ backgroundColor: color }}
        onClick={ () => selectNote({ title, text, createAt, color, id }) }
      >
        <div className="note__wrapper">
          <div
            className={ important ? 'note--important pointer' : 'note--casual pointer' }
            onClick={(evt) => {
              changeNoteImportance(id);
              evt.stopPropagation();
            }
            }>
            <FontAwesomeIcon icon="bookmark" size="2x" />
          </div>
          <div className="pointer note__remove-btn" onClick={
            (evt) => {
              evt.stopPropagation();
              toggleConfirmDelete();
            }
          }>
            <FontAwesomeIcon icon="times" size="2x" />
          </div>
        </div>

        <div>
          {
            title.trim() !== '' && <div className="note__title">{ title }</div>
          }
          <div className="note__text">{ text }</div>
        </div>

        <div className="note__details">
          <div className='note__date'>{ moment(createAt).format('MMMM Do, YYYY') }</div>
          <div className='note__tags'>
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
