import { shallow, ShallowWrapper } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

import { ContentContainerProps, ContentContainer } from "../ContentContainer";

let props: ContentContainerProps,
  wrapper: ShallowWrapper<ContentContainerProps, {}>;

beforeEach(() => {
  props = {};
});

test("should render ContentContainer", () => {
  wrapper = shallow<ContentContainerProps>(<ContentContainer {...props} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
