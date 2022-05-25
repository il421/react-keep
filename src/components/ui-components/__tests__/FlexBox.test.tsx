import { shallow, ShallowWrapper } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

import { JustifyContent } from "../../../common";
import { FlexBox, FlexBoxProps } from "../FlexBox";

let props: FlexBoxProps, wrapper: ShallowWrapper;

beforeEach(() => {
  props = {
    justifyContent: JustifyContent.center
  };
});

test("should render FlexBox", () => {
  wrapper = shallow(<FlexBox {...props} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
