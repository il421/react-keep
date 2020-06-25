import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { ConfirmButton, ConfirmButtonProps } from "../ConfirmButton";

let props: ConfirmButtonProps, wrapper: ReactWrapper<ConfirmButtonProps, {}>;

beforeEach(() => {
  props = {
    text: "text",
    onCLick: jest.fn(),
  };
});

test("should render ConfirmButton", () => {
  wrapper = mount<ConfirmButtonProps>(<ConfirmButton {...props} />);
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should render ConfirmButton with loading spinner", () => {
  wrapper = mount<ConfirmButtonProps>(
    <ConfirmButton {...props} loading={true} />
  );
  expect(wrapper.find("Loader").exists()).toBeTruthy();
});
