import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Collaborators } from "../Collaborators";
import toJson from "enzyme-to-json";

let wrapper: ShallowWrapper;

test("should render Collaborators", () => {
  wrapper = shallow(<Collaborators />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
