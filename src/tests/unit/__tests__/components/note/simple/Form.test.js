import React from 'react';
import { shallow } from 'enzyme';
import { SimpleForm } from '../../../../../../components/note/forms/TextForm';
import { tags } from '../../../../../fixtures/unit';

let wrapper, addNote, updateNote, displayNoteForm, name, onColorChange, closeUpdateForm, handleDisplayTagsModal;

beforeEach(() => {
  addNote = jest.fn();
  updateNote = jest.fn();
  displayNoteForm = jest.fn();
  onColorChange = jest.fn();
  closeUpdateForm = jest.fn();
  handleDisplayTagsModal = jest.fn();
  name = 'add';
  wrapper = shallow(
    <SimpleForm
      addNote={ addNote }
      updateNote={ updateNote }
      displayNoteForm={ displayNoteForm }
      closeUpdateForm={ closeUpdateForm }
      handleDisplayTagsModal={ handleDisplayTagsModal }
      name={ name }
      onColorChange={ onColorChange }
      userTags={ tags.list }
    />
  );
});

test('should render NoteForm correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onTitleChange', () => {
  const value = 'Ilya';
  wrapper.find('.form__title').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('title')).toBe(value);
});

test('should handle onTextChange', () => {
  const value = 'Ilya';
  wrapper.find('.form__text').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('text')).toBe(value);
});

test('should handle onColorChange', () => {
  const value = '#fff';
  wrapper.find('ColorBox').prop('updateColor')(value);

  expect(wrapper.state('color')).toBe(value);
});

test('should handle handleTagChange', () => {
  const id = 'YpjypoYGueKBUukRPQ5F';
  wrapper.find('TagsSelection').prop('handleTagChange')(true, id);

  expect(wrapper.state('tags')).toEqual([tags.list[0]]);
});

test('should clean form bt setting default state', () => {

  const defaultNoteState = {
    title: '',
    text: '',
    createAt: expect.anything(),
    color: '#fff',
    important: false,
    tags: []
  };
  wrapper.find('.actions__close-note').simulate('click');

  expect(wrapper.state()).toEqual(defaultNoteState);
  expect(onColorChange).toHaveBeenLastCalledWith(defaultNoteState.color);
  expect(displayNoteForm).toHaveBeenLastCalledWith(false);
});


test('should add note if clicked Keep', () => {
  const note = {
    title: 'test',
    text: 'test',
    createAt: 123,
    color: '#fff',
    important: false,
    tags: []
  };
  wrapper.setState(note)
  wrapper.find('.actions__keep-note').simulate('click');
  expect(addNote).toHaveBeenLastCalledWith(note);
});

test('should update note if clicked Keep', () => {
  const note = {
    id: '123',
    title: '',
    text: '',
    color: '#fff',
    important: false,
    tags: []
  };
  wrapper.setProps({note})
  wrapper.find('.actions__keep-note').simulate('click');
  expect(updateNote).toHaveBeenLastCalledWith('123', expect.any(Object));
});

test('should close form if it is update form', () => {
  const note = {
    id: '123',
    title: '',
    text: '',
    color: '#fff',
    important: false,
    tags: []
  };
  wrapper.setProps({note})
  wrapper.find('.actions__close-note').simulate('click');
  expect(closeUpdateForm).toHaveBeenCalled();
});

test('should display tag modal if no tags', () => {
  const note = {
    id: '123',
    title: '',
    text: '',
    color: '#fff',
    important: false,
    tags: []
  };
  wrapper.setProps({note})
  wrapper.setProps({userTags: []});
  wrapper.find('.tags-selection__none > a').simulate('click');

  expect(handleDisplayTagsModal).toHaveBeenCalled();
  expect(closeUpdateForm).toHaveBeenCalled();
});
