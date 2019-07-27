import '@babel/polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import { TagsList } from '../../../../../components/tags/TagsList';
import {tags} from '../../../../fixtures/unit';

let wrapper, setTagsFilter;

beforeEach(() => {
  setTagsFilter = jest.fn();
  wrapper = shallow(
    <TagsList
      setTagsFilter={ setTagsFilter }
      userTags={ tags.list }
    />
  );
  wrapper.setState({tagFilters: []});
});

test('should render TagsList correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should check tags correctly', async () => {
  wrapper.find('input').at(0).simulate('change', { target: {
    value: tags.list[0].id
  }});
  await expect(wrapper.state('tagFilters')).toEqual([tags.list[0].id])
  expect(setTagsFilter).toHaveBeenLastCalledWith([tags.list[0].id]);
});
