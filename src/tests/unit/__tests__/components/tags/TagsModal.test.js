import '@babel/polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import { TagsModal } from '../../../../../components/tags/TagsModal';
import { tags } from '../../../../fixtures/unit';

let wrapper, handleAddTag, handleRemoveTag, handleUpdateTag, handleDisplayTagsModal, removeTagFromNotes, updateNotesTag;

beforeEach(() => {
  handleAddTag = jest.fn();
  handleRemoveTag = jest.fn();
  handleUpdateTag = jest.fn();
  handleDisplayTagsModal = jest.fn();
  removeTagFromNotes = jest.fn();
  updateNotesTag = jest.fn();
  wrapper = shallow(
    <TagsModal
      handleAddTag={ handleAddTag }
      handleRemoveTag={ handleRemoveTag }
      handleUpdateTag={ handleUpdateTag }
      handleDisplayTagsModal={ handleDisplayTagsModal }
      removeTagFromNotes={ removeTagFromNotes }
      updateNotesTag={ updateNotesTag }
      displayTagsModal={ true }
      userTags={ tags.list }
    />
  );
  // mock ref
  wrapper.instance().refNewInput.current = jest.fn();
});

test('should render TagsModal correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onTagChange when input a tag', async () => {
  wrapper.find('input').at(0).simulate('change', { target: {
    value: tags.list[0].id
  }});
  await expect(wrapper.state('tag')).toBe(tags.list[0].id);
});

test('should handle onCurrentTagUpdate, update a tag, update notes tag, and set editable tag', async () => {
  wrapper.setState({editableTag: tags.list[0].id});
  wrapper.find('#editableTag').at(0).simulate('change', { target: {
    value: tags.list[0].value
  }});
  wrapper.find('.actions__edit').simulate('click');
  expect(handleUpdateTag).toHaveBeenLastCalledWith(tags.list[0].id, tags.list[0].value);
  expect(updateNotesTag).toHaveBeenLastCalledWith(tags.list[0].id, tags.list[0].value);
  expect(wrapper.state('editableTag')).toBe(null);
});

test('should add a new taf', () => {
  wrapper.setState({tag: tags.list[0].value});

  wrapper.find('#newTag').simulate('change', { target: {
    value: tags.list[0].value
  }});
  wrapper.find('.tags__add-btn').simulate('click');

  expect(wrapper.instance().refNewInput).toBeTruthy();
  expect(wrapper.state('tag')).toBe('');
  expect(handleAddTag).toHaveBeenLastCalledWith(tags.list[0].value);
});

test('should remove a teg', () => {
  wrapper.find('.tags__remove-btn').at(0).simulate('click');
  expect(handleRemoveTag).toHaveBeenLastCalledWith(tags.list[0].id);
  expect(removeTagFromNotes).toHaveBeenLastCalledWith(tags.list[0].id);
});

test('should set an editable tag', () => {
  wrapper.find('.tags__edit-btn').at(0).simulate('click');
  expect(wrapper.state('editableTag')).toBe(tags.list[0].id);
});
