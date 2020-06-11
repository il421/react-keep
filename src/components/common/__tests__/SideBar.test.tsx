import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { SideBar, SideBarProp } from "../SideBar";

let props: SideBarProp, wrapper: ShallowWrapper<SideBarProp, any>;

beforeEach(() => {
  props = {
    showBar: false,
    setShowSidebar: jest.fn(),
  };

  wrapper = shallow<SideBarProp>(<SideBar {...props} />);
});

test("should render SideBar", () => {
  expect(wrapper.exists(".sidebar__cover")).toBeFalsy();
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should close side bar if click on close button", () => {
  wrapper.find("IconButton").at(0).prop<any>("onButtonClick")();
  expect(props.setShowSidebar).toHaveBeenLastCalledWith(false);
});

test("should close side bar if click on cover", () => {
  wrapper.setProps({ showBar: true });
  expect(wrapper.exists(".sidebar__cover")).toBeTruthy();
  wrapper.find(".sidebar__cover").simulate("click");
  expect(props.setShowSidebar).toHaveBeenLastCalledWith(false);
});
