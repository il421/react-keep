import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import TagsPickerField from "../TagsPickerField";
import { tags } from "../../../../testData/tags";

test("should render TagsPickerField correctly", () => {
  const wrapper: ShallowWrapper = shallow(<TagsPickerField tags={tags} />);
  expect(wrapper.debug()).toMatchSnapshot();
});
