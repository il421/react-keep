import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { LinkButton, LinkButtonProps } from "../LinkButton";
import toJson from "enzyme-to-json";

let props: LinkButtonProps, wrapper: ShallowWrapper;

beforeEach(() => {
  props = {
    text: "text",
    type: "submit",
  };
});

test("should render LinkButton", () => {
  wrapper = shallow(<LinkButton {...props} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
