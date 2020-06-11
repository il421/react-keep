import React from "react";
import { shallow } from "enzyme";
import NotFoundPage from "../NotFoundPage";

test("should render NotFoundPage correctly", () => {
  const wrapper: any = shallow<typeof NotFoundPage>(<NotFoundPage />);
  expect(wrapper.debug()).toMatchSnapshot();
});
