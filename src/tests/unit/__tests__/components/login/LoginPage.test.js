import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../../../../components/login/LoginPage';

let wrapper, startLogin;

beforeEach(() => {
  startLogin = jest.fn();
  wrapper = shallow(
    <LoginPage
      startLogin={ startLogin }
    />
  );
});

test('should render LoginPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call LoginPage on btn click', () => {
  wrapper.find('.login__btn').simulate('click');
  expect(startLogin).toHaveBeenCalled();
});
