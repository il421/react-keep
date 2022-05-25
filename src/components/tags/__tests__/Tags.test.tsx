import { shallow, ShallowWrapper } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

import Tags from "../Tags";

let wrapper: ShallowWrapper;

test("should render Tags", () => {
  wrapper = shallow(<Tags />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
