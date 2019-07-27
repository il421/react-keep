import React from 'react';
import { shallow } from 'enzyme';
import { UpdateNote } from '../../../../../components/note/UpdateNote';
import { notes } from '../../../../fixtures/unit';

let wrapper, handleUpdateNote, resetSelectedNote;

beforeEach(() => {
  handleUpdateNote = jest.fn();
  resetSelectedNote = jest.fn();
  wrapper = shallow(
    <UpdateNote
      resetSelectedNote={ resetSelectedNote }
      handleUpdateNote={ handleUpdateNote }
      selectedNote={notes[0]}
    />
  );
  wrapper.setState({ displayForm: true });

});

test('should render UpdateNote correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call handleUpdateNote', () => {
  wrapper.find('Connect(NoteForm)').prop('updateNote')();

  expect(handleUpdateNote).toHaveBeenCalled();
  expect(resetSelectedNote).toHaveBeenCalled();
});

test('should set a new color value', () => {
  const color = '#fff';
  wrapper.find('Connect(NoteForm)').prop('onColorChange')(color);
  expect(wrapper.state('color')).toBe(color);
});

test('should call resetSelectedNote', () => {
  wrapper.find('Connect(NoteForm)').prop('closeUpdateForm')();
  expect(resetSelectedNote).toHaveBeenCalled();
});

test('should call resetSelectedNote if close Modal', () => {
  wrapper.find('Modal').prop('onRequestClose')();
  expect(resetSelectedNote).toHaveBeenCalled();
});
