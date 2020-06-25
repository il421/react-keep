import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { UserPhoto, UserPhotoProps } from "../UserPhoto";
import toJson from "enzyme-to-json";

let props: UserPhotoProps, wrapper: ShallowWrapper;

beforeEach(() => {
  props = {
    src: "src",
    height: 100,
    width: 100,
  };
});

test("should render UserPhoto", () => {
  wrapper = shallow(<UserPhoto {...props} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
