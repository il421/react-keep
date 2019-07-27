import React from 'react';
import { shallow } from 'enzyme';
import TagsSelection from '../../../../../components/tags/TagsSelection';
import { tags} from '../../../../fixtures/unit';

let wrapper, handleTagChange;

beforeEach(() => {
  handleTagChange = jest.fn();
  wrapper = shallow(
    <TagsSelection
      handleTagChange={ handleTagChange }
      tags={ tags.list }
      userTags={ [tags.list[0]] }
      name={ 'list' }
    />
  );
});

test('should render TagsSelections correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should check inputs', () => {
  wrapper.find('input').simulate('change', { target: {
    value: tags.list[0].id, checked: true
  }});
  expect(handleTagChange).toHaveBeenLastCalledWith(true, tags.list[0].id);
});
