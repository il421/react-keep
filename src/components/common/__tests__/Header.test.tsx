import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Header, Props } from "../Header";
import { defaultAuthStore } from "../../../reducers/auth";

let props: Props, wrapper: ShallowWrapper<Props, any>;
const mockHistoryPush = jest.fn();

const history = {
  push: mockHistoryPush,
  location: {
    pathname: "pathname",
  },
};
beforeEach(() => {
  props = {
    showSidebar: jest.fn(),
    startLogout: jest.fn(),
    history: history as any,
    auth: defaultAuthStore,
  };

  wrapper = shallow<Props>(<Header {...props} />);
});

test("should render Header correctly", () => {
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should show side bar if click on burger button", () => {
  wrapper.find("IconButton").at(0).prop<any>("onButtonClick")();
  expect(props.showSidebar).toHaveBeenLastCalledWith(true);
});

test("should open user edit modal by clicking on user name link", () => {
  wrapper.find("LinkButton").at(0).prop<any>("onClick")();
  expect(mockHistoryPush).toHaveBeenLastCalledWith("pathname?user=edit");
});

test("should open user edit modal by clicking on user cog icon", () => {
  wrapper.find("IconButton").at(1).prop<any>("onButtonClick")();
  expect(mockHistoryPush).toHaveBeenLastCalledWith("pathname?user=edit");
});

test("should logout if click on an logout button", () => {
  wrapper.find("IconButton").at(2).prop<any>("onButtonClick")();
  expect(props.startLogout).toHaveBeenLastCalledWith();
});
