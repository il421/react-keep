import React from 'react';
import { shallow } from 'enzyme';
import { AddNote } from '../../../../../components/note/AddNote';
import { notes } from '../../../../fixtures/unit';

let wrapper, handleAddENote;

beforeEach(() => {
  handleAddENote = jest.fn();
  wrapper = shallow(
    <AddNote
      handleAddENote={ handleAddENote }
    />
  );
  wrapper.setState({ displayForm: true });

});

test('should render SideBar correctly', () => {
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
