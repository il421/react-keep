import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColorBox from './ColorBox';
import TagsSelection from '../tags/TagsSelection';
import { handleDisplayTagsModal } from '../../actions/tags';

export const FormActions = ({
  name, state, userTags, note, updateColor, updateNote, addNote,
  closeUpdateForm, cleanForm, handleTagChange, handleDisplayTagsModal,
}) => {
  return (
    <div className="form-actions">
      <div className="form-actions__options options">
        <div className="options__color pointer">
          <FontAwesomeIcon icon="palette" size="lg" />
          <ColorBox
            name={ name }
            updateColor={ updateColor }
            defaultColor={ state.color }
          />
        </div>

        <div className="options__tags pointer ">
          <FontAwesomeIcon icon="tags" size="lg" />
          {
            userTags.length > 0 ? (
              <TagsSelection
                tags={ state.tags }
                userTags={ userTags }
                handleTagChange={ handleTagChange }
                name={ name }
              />
            ) : (
              <div className="tags-selection tags-selection__none">
                <a onClick={ () => handleDisplayTagsModal(true) }>Add your personal tags</a>
              </div>
            )
          }
        </div>
      </div>
      <div className="form-actions__actions actions">
        <button
          className="actions__close-note button button--link "
          onClick={ note ? closeUpdateForm : cleanForm }
        >
          Close
        </button>

        <button
          className="actions__keep-note button button--link "
          onClick={ note ? updateNote : addNote }
          disabled={ state.text === '' && state.title === '' }
        >
          { note ? 'Update' : 'Keep' }
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleDisplayTagsModal: (value) => dispatch(handleDisplayTagsModal(value))
});

export default connect(undefined, mapDispatchToProps)(FormActions);
