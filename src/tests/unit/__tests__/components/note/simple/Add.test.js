import React from 'react';
import { shallow } from 'enzyme';
import { Add } from '../../../../../../components/note/NoteSelection';
import { notes } from '../../../../../fixtures/unit';

let wrapper, handleAddENote;

beforeEach(() => {
  handleAddENote = jest.fn();
  wrapper = shallow(
    <Add
      handleAddENote={ handleAddENote }
    />
  );
  wrapper.setState({ displayForm: true });

});

test('should render Add correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle handleAddENote', () => {
  wrapper.find('Connect(NoteForm)').prop('addNote')(notes[0]);

  expect(handleAddENote).toHaveBeenLastCalledWith(notes[0]);
});

test('should call changeNoteColor and set a new color value', () => {
  const color = '#fff';
  wrapper.find('Connect(NoteForm)').prop('onColorChange')(color);
  expect(wrapper.state('color')).toBe(color);
});

test('should call displayNoteForm and set a new displayForm value', () => {
  const displayForm = false;
  wrapper.find('Connect(NoteForm)').prop('displayNoteForm')(displayForm);
  expect(wrapper.state('displayForm')).toBe(displayForm);
});
