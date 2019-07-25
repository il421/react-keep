import React from 'react';
import { shallow } from 'enzyme';
import Note from '../../../../../components/note/Note';
import { notes } from '../../../../fixtures/unit';

let wrapper, props, selectNote, changeNoteImportance, toggleConfirmDelete, note;

beforeEach(() => {
  note = notes[0];
  selectNote = jest.fn();
  changeNoteImportance = jest.fn();
  toggleConfirmDelete = jest.fn();
  props = { ...note, ...selectNote, ...changeNoteImportance, ...toggleConfirmDelete }

  wrapper = shallow(
    <Note
      {...props}
    />
  );
});

test('should render Note correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
