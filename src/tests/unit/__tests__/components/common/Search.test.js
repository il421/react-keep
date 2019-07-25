import React from 'react';
import { shallow } from 'enzyme';
import { Search } from '../../../../../components/common/Search';

test('should render Search correctly', () => {

  const wrapper = shallow(
    <Search setSearchFilter={() => {}}/>
  );
  expect(wrapper).toMatchSnapshot();
});

test('should call Search when type a search query', () => {
  const setSearchFilter = jest.fn();
  const value = 'Ilya';
  const wrapper = shallow(
    <Search setSearchFilter={ setSearchFilter(value) }/>
  );

  wrapper.find('.search').simulate('change', {
    target: { value }
  })
  expect(setSearchFilter).toHaveBeenLastCalledWith(value);
});

