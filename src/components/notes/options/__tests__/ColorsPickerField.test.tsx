import { shallow, ShallowWrapper } from "enzyme";
import React from "react";

import ColorsPickerField from "../ColorsPickerField";

test("should render ColorsPickerField correctly", () => {
  const wrapper: ShallowWrapper = shallow(<ColorsPickerField />);
  expect(wrapper.debug()).toMatchSnapshot();
});
