import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Tags from "../Tags";
import toJson from "enzyme-to-json";

let wrapper: ShallowWrapper;

test("should render Tags", () => {
  wrapper = shallow(<Tags />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
