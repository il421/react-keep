import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { IconButton, IconButtonProps } from "../IconButton";
import toJson from "enzyme-to-json";

let props: IconButtonProps, wrapper: ShallowWrapper;

beforeEach(() => {
  props = {
    icon: "times",
    text: "text",
  };
});

test("should render IconButton", () => {
  wrapper = shallow(<IconButton {...props} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
