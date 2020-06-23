import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import NotFoundPage from "../NotFoundPage";

test("should render NotFoundPage correctly", () => {
  const wrapper: ShallowWrapper = shallow(<NotFoundPage />);
  expect(wrapper.debug()).toMatchSnapshot();
});
