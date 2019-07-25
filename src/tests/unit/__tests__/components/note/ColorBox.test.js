import React from 'react';
import { shallow } from 'enzyme';
import { ColorBox } from '../../../../../components/note/ColorBox';

let wrapper, updateColor, defaultColor, name, color;

beforeEach(() => {
  updateColor = jest.fn();
  defaultColor = '#fff';
  color = '#f28b82';

  name='add'
  wrapper = shallow(
    <ColorBox
      name={ name }
      updateColor={ updateColor }
      defaultColor={ defaultColor }
    />
  );
});

test('should render ColorBox correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call updateColor when a color has been checked', () => {
  wrapper.find('input').at(1).simulate('change', { target: { value: color } })
  expect(wrapper.state('color')).toBe(color);
  expect(updateColor).toHaveBeenLastCalledWith(color);
});

test('should pass name correctly', () => {
  expect(wrapper.find('input').at(1).prop('id')).toBe(color + name);
});
