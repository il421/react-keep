import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { HeaderBase, HeaderBaseProps } from "../Header";
import { defaultAuthStore } from "../../../reducers/auth";

let props: HeaderBaseProps, wrapper: ShallowWrapper<HeaderBaseProps, any>;
const mockHistoryPush = jest.fn();

const history = {
  push: mockHistoryPush,
  location: {
    pathname: "pathname",
  },
};
beforeEach(() => {
  props = {
    toggle: jest.fn(),
    startLogout: jest.fn(),
    history: history as any,
    auth: defaultAuthStore,
  };

  wrapper = shallow<HeaderBaseProps>(<HeaderBase {...props} />);
});

test("should render Header correctly", () => {
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should show side bar if click on burger button", () => {
  wrapper.find("IconButton").at(0).prop<any>("onButtonClick")();
  expect(props.toggle).toHaveBeenLastCalledWith("sidebar", true);
});

test("should open user edit modal by clicking on user name link", () => {
  wrapper.find("LinkButton").at(0).prop<any>("onClick")();
  expect(props.toggle).toHaveBeenLastCalledWith("user", true);
});

test("should open user edit modal by clicking on user cog icon", () => {
  wrapper.find("IconButton").at(1).prop<any>("onButtonClick")();
  expect(props.toggle).toHaveBeenLastCalledWith("user", true);
});

test("should logout if click on an logout button", async () => {
  wrapper.find("IconButton").at(2).prop<any>("onButtonClick")();
  wrapper.find("IconButton").at(2).prop<any>("onButtonClick")();
  wrapper.find("ConfirmDialog").prop<any>("handleConfirm")();
  expect(props.startLogout).toHaveBeenLastCalledWith();
});
