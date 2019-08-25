import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../../../../components/login/LoginPage';

let wrapper, startLogin, startSignUp;

beforeEach(() => {
  startLogin = jest.fn();
  startSignUp = jest.fn();
  wrapper = shallow(
    <LoginPage
      startLogin={ startLogin }
      startSignUp={ startSignUp }
    />
  );
});

test('should render LoginPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle correct email input', () => {
  const value = 'il421@gmail.com';
  wrapper.find('#email').simulate('input', {
    target: { value }
  });
  expect(wrapper.state('email')).toBe(value);
  expect(wrapper.state().errors.email).toBe('');
});

test('should handle incorrect email input', () => {
  const value = 'il421gmail.com';
  const emailError = 'Email is not valid!';
  wrapper.find('#email').simulate('input', {
    target: { value }
  });
  expect(wrapper.state('email')).toBe(value);
  expect(wrapper.state().errors.email).toBe(emailError);
});

test('should handle correct password input', () => {
  const value = '12345678';
  wrapper.find('#password').simulate('input', {
    target: { value }
  });
  expect(wrapper.state('password')).toBe(value);
  expect(wrapper.state().errors.password).toBe('');
});

test('should handle incorrect password input', () => {
  const value = '123';
  const passError = 'Password must be 8 characters long!';
  wrapper.find('#password').simulate('input', {
    target: { value }
  });
  expect(wrapper.state('password')).toBe(value);
  expect(wrapper.state().errors.password).toBe(passError);
});

test('should handle new user change', () => {
  wrapper.find('#new').simulate('change');
  expect(wrapper.state('new')).toBe(true);
});

test('should call startSignUp if it is a new user', () => {
  const userData = {
    email: 'il421@gmail.com',
    password: '12345678'
  };

  wrapper.find('#new').simulate('change');

  wrapper.find('#email').simulate('input', {
    target: { value: userData.email }
  });

  wrapper.find('#password').simulate('input', {
    target: { value: userData.password }
  });

  wrapper.find('.login-form__btn').simulate('click');

  expect(startSignUp).toHaveBeenLastCalledWith(userData.email, userData.password);
});

test('should call startLogin if it is not a new user', () => {
  const userData = {
    email: 'il421@gmail.com',
    password: '12345678'
  };

  wrapper.find('#email').simulate('input', {
    target: { value: userData.email }
  });

  wrapper.find('#password').simulate('input', {
    target: { value: userData.password }
  });

  wrapper.find('.login-form__btn').simulate('click');

  expect(startLogin).toHaveBeenLastCalledWith(userData.email, userData.password);
});
