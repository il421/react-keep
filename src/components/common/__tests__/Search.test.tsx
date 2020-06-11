import React from "react";
import { shallow } from "enzyme";
import { DispatchProps, Search } from "../Search";

let wrapper: any, props: DispatchProps;

beforeEach(() => {
  props = {
    setSearchFilter: jest.fn(),
  };
  wrapper = shallow<typeof Search>(<Search {...props} />);
});

test("should render Search", () => {
  expect(wrapper.exists(".search")).toBeTruthy();
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should setSearchFilter when search", () => {
  wrapper.find(".search").simulate("change", {
    target: { value: "test" },
  });
  expect(props.setSearchFilter).toHaveBeenLastCalledWith("test");
});
