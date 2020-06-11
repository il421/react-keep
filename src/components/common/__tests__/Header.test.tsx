import React from "react";
import { shallow } from "enzyme";
import { Header, Props } from "../Header";
import { defaultAuthStore } from "../../../reducers/auth";

let props: Props, wrapper: any;
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

  wrapper = shallow<typeof Header>(<Header {...props} />);
});

test("should render Header correctly", () => {
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should show side bar if click on burger button", () => {
  wrapper.find("IconButton").at(0).prop("onButtonClick")();
  expect(props.showSidebar).toHaveBeenLastCalledWith(true);
});

test("should open user edit modal by clicking on user name link", () => {
  wrapper.find("LinkButton").at(0).prop("onClick")();
  expect(mockHistoryPush).toHaveBeenLastCalledWith("pathname?user=edit");
});

test("should open user edit modal by clicking on user cog icon", () => {
  wrapper.find("IconButton").at(1).prop("onButtonClick")();
  expect(mockHistoryPush).toHaveBeenLastCalledWith("pathname?user=edit");
});

test("should logout if click on an logout button", () => {
  wrapper.find("IconButton").at(2).prop("onButtonClick")();
  expect(props.startLogout).toHaveBeenLastCalledWith();
});
