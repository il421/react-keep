import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { ContentContainerProps, ContentContainer } from "../ContentContainer";
import toJson from "enzyme-to-json";

let props: ContentContainerProps,
  wrapper: ShallowWrapper<ContentContainerProps, {}>;

beforeEach(() => {
  props = {};
});

test("should render ContentContainer", () => {
  wrapper = shallow<ContentContainerProps>(<ContentContainer {...props} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
