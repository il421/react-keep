import { shallow, ShallowWrapper } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

import { IconButton, IconButtonProps } from "../IconButton";

let props: IconButtonProps, wrapper: ShallowWrapper;

beforeEach(() => {
  props = {
    icon: "times",
    text: "text"
  };
});

test("should render IconButton", () => {
  wrapper = shallow(<IconButton {...props} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
