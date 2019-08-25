import React from 'react';
import { shallow } from 'enzyme';
import { NotesList } from '../../../../../components/note/NotesList';
import { notes } from '../../../../fixtures/unit';

let wrapper, handleRemoveNote, changeNoteImportance, resetSelectedNote;

beforeEach(() => {
  handleRemoveNote = jest.fn();
  resetSelectedNote = jest.fn();
  changeNoteImportance = jest.fn();
  wrapper = shallow(
    <NotesList
      notes={ notes }
      handleRemoveNote={ handleRemoveNote }
      resetSelectedNote={ resetSelectedNote }
      changeNoteImportance={ changeNoteImportance }
    />
  );
});

test('should render NotesList correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should select correct note', () => {
  wrapper.find('Note').at(0).prop('selectNote')(notes[1]);

  expect(wrapper.state('selectedNote')).toEqual(notes[1]);
});

test('should remove selected note correctly', () => {
  wrapper.setState({selectedNote: notes[0]});

  wrapper.find('Connect(UpdateNote)').prop('resetSelectedNote')();
  expect(wrapper.state('selectedNote')).toBe(undefined);
});

test('should open confirm modal, and set note id for deleting', () => {
  wrapper.find('Note').at(0).prop('toggleConfirmDelete')(notes[0].id);
  expect(wrapper.state('confirmDelete')).toBe(true);
  expect(wrapper.state('shouldBeDeletedId')).toBe(notes[0].id);
});

test('should delete a note by id', () => {
  wrapper.setState({ confirmDelete: true });
  wrapper.setState({ shouldBeDeletedId: notes[0].id });
  wrapper.find('.button--yep').simulate('click');
  expect(handleRemoveNote).toHaveBeenLastCalledWith(notes[0].id);
});

test('should close modal if do not want to delete by clicking nope', () => {
  wrapper.setState({ confirmDelete: true });
  wrapper.setState({ shouldBeDeletedId: notes[0].id });
  wrapper.find('.button--nope').simulate('click');
  expect(wrapper.state('confirmDelete')).toBe(false);
});

test('should close modal bt request', () => {
  wrapper.setState({ confirmDelete: true });
  wrapper.setState({ shouldBeDeletedId: notes[0].id });
  wrapper.find('Modal').prop('onRequestClose')();
  expect(wrapper.state('confirmDelete')).toBe(false);
});

test('should call changeNoteImportance', () => {
  wrapper.find('Note').at(0).prop('changeNoteImportance')(notes[0].id);
  expect(changeNoteImportance).toHaveBeenLastCalledWith(notes[0].id);
});
