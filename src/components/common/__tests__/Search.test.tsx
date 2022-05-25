import { shallow, ShallowWrapper } from "enzyme";
import React from "react";

import { DispatchProps, SearchBase } from "../Search";

let wrapper: ShallowWrapper<DispatchProps, any>, props: DispatchProps;

beforeEach(() => {
  props = {
    setSearchFilter: jest.fn()
  };
  wrapper = shallow<DispatchProps>(<SearchBase {...props} />);
});

test("should render Search", () => {
  expect(wrapper.exists(".search")).toBeTruthy();
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should setSearchFilter when search", () => {
  wrapper.find(".search").simulate("change", {
    target: { value: "test" }
  });
  expect(props.setSearchFilter).toHaveBeenLastCalledWith("test");
});
