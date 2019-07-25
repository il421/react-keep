import React from 'react';
import { shallow } from 'enzyme';
import LoadingPage from '../../../../../components/login/LoadingPage';

let wrapper;

beforeEach(() => {
  wrapper = shallow(
    <LoadingPage />
  );
});

test('should render LoadingPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
