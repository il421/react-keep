import React from 'react';
import { shallow } from 'enzyme';
import { SideBar } from '../../../../../components/common/SideBar';

let wrapper, hideSidebar;

beforeEach(() => {
  hideSidebar = jest.fn();
  wrapper = shallow(
    <SideBar
      hideSidebar={ hideSidebar }
      showBar={ true }
    />
  );
});

test('should render SideBar correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should pass showBar correctly and generate sidebar--show class', () => {
  expect(wrapper.exists('.sidebar--show')).toBe(true);
});

test('should call hideSidebar on btn click', () => {
  wrapper.find('.sidebar__close-button').simulate('click');
  expect(hideSidebar).toHaveBeenCalled();
});
