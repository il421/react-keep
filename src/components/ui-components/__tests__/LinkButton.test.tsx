import { shallow, ShallowWrapper } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

import { LinkButton, LinkButtonProps } from "../LinkButton";

let props: LinkButtonProps, wrapper: ShallowWrapper;

beforeEach(() => {
  props = {
    text: "text",
    type: "submit"
  };
});

test("should render LinkButton", () => {
  wrapper = shallow(<LinkButton {...props} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
