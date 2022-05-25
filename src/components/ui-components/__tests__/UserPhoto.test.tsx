import { shallow, ShallowWrapper } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

import { UserPhoto, UserPhotoProps } from "../UserPhoto";

let props: UserPhotoProps, wrapper: ShallowWrapper;

beforeEach(() => {
  props = {
    src: "src",
    height: 100,
    width: 100
  };
});

test("should render UserPhoto", () => {
  wrapper = shallow(<UserPhoto {...props} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
