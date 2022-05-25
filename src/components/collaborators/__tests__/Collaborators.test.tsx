import { shallow, ShallowWrapper } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

import { Collaborators } from "../Collaborators";

let wrapper: ShallowWrapper;

test("should render Collaborators", () => {
  wrapper = shallow(<Collaborators />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
