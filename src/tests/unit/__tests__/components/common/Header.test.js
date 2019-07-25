import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../../../components/common/Header';
import {SideBar} from '../../../../../components/common/SideBar';

let wrapper, startLogout, showSidebar;

beforeEach(() => {
  startLogout = jest.fn();
  showSidebar = jest.fn();
  wrapper = shallow(
    <Header
      startLogout={ startLogout }
      showSidebar={ showSidebar }
      auth={ {url: 'Ilya'} }
    />
  );
});

test('should render Header correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on btn click', () => {
  wrapper.find('.user-box__logout').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});

test('should call showSidebar on btn click', () => {
  wrapper.find('.header__sidebar .button--sidenav').simulate('click');
  expect(showSidebar).toHaveBeenCalled();
});

test('should pass img url', () => {
  expect(wrapper.find('img').prop('src')).toBe('Ilya');
});

