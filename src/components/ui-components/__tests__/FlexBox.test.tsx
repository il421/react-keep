import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { FlexBox, FlexBoxProps } from "../FlexBox";
import { JustifyContent } from "../../../common";
import toJson from "enzyme-to-json";

let props: FlexBoxProps, wrapper: ShallowWrapper;

beforeEach(() => {
  props = {
    justifyContent: JustifyContent.center,
  };
});

test("should render FlexBox", () => {
  wrapper = shallow(<FlexBox {...props} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
