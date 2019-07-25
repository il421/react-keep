import React from 'react';
import { shallow } from 'enzyme';
import DashboardPage from '../../../../../components/common/DashboardPage';

test('should render DashboardPage correctly', () => {

  const wrapper = shallow(
    <DashboardPage hideSidebar={() => {}} showBar={() => {}}  />
  );
  expect(wrapper).toMatchSnapshot();
});
