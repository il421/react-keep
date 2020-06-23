import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import ColorsPickerField from "../ColorsPickerField";

test("should render ColorsPickerField correctly", () => {
  const wrapper: ShallowWrapper = shallow(<ColorsPickerField />);
  expect(wrapper.debug()).toMatchSnapshot();
});
