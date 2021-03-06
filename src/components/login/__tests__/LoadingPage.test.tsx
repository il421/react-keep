import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import LoadingPage from "../LoadingPage";

test("should render LoadingPage correctly", () => {
  const wrapper: ShallowWrapper<typeof LoadingPage> = shallow<
    typeof LoadingPage
  >(<LoadingPage />);
  expect(wrapper.debug()).toMatchSnapshot();
});
