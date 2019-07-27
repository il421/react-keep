import React from 'react';
import { shallow } from 'enzyme';
import { Tags } from '../../../../../components/tags/Tags';

let wrapper, handleDisplayTagsModal, hideSidebar;

beforeEach(() => {
  handleDisplayTagsModal = jest.fn();
  hideSidebar = jest.fn();
  wrapper = shallow(
    <Tags
      hideSidebar={ hideSidebar }
      handleDisplayTagsModal={ handleDisplayTagsModal }
    />
  );
});

test('should render Tags correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should hide sidebar, and display tags popup correctly', () => {
  wrapper.find('.tags__add-edit button').simulate('click');
  expect(hideSidebar).toHaveBeenCalled();
  expect(handleDisplayTagsModal).toHaveBeenLastCalledWith(true);
});
