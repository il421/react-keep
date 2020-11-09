import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { SideBarBase, SideBarBaseProps } from "../SideBar";
import { modalsReducerDefaultState } from "../../../reducers/modals";

let props: SideBarBaseProps, wrapper: ShallowWrapper<SideBarBaseProps, any>;

beforeEach(() => {
  props = {
    modals: modalsReducerDefaultState,
    toggle: jest.fn(),
    setCollapsedOptionsInSidebar: jest.fn(),
  };

  wrapper = shallow<SideBarBaseProps>(<SideBarBase {...props} />);
});

test("should render SideBar", () => {
  expect(wrapper.exists(".sidebar__cover")).toBeFalsy();
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should close side bar if click on close button", () => {
  wrapper.find("IconButton").at(0).prop<any>("onButtonClick")();
  expect(props.toggle).toHaveBeenLastCalledWith("sidebar", false);
});

test("should close side bar if click on cover", () => {
  wrapper = shallow<SideBarBaseProps>(
    <SideBarBase
      {...props}
      modals={{
        ...modalsReducerDefaultState,
        sidebar: { collapsed: [], isOpen: true },
      }}
    />
  );
  wrapper.update();
  expect(wrapper.exists(".sidebar__cover")).toBeTruthy();
  wrapper.find(".sidebar__cover").simulate("click");
  expect(props.toggle).toHaveBeenLastCalledWith("sidebar", false);
});
