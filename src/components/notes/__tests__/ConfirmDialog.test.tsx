import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { ConfirmDialogProps, ConfirmDialog } from "../ConfirmDialog";
import { ConfirmButtonProps } from "../../ui-components";

let wrapper: ReactWrapper<ConfirmDialogProps>, props: ConfirmDialogProps;
const btnNames = {
  confirmButtonText: "confirmTest",
  cancelButtonText: "cancelTest",
};
beforeEach(() => {
  props = {
    className: "confirm-dialog",
    closeDialog: jest.fn(),
    handleConfirm: jest.fn(),
    buttonsProps: {
      confirmButtonText: btnNames.confirmButtonText,
      cancelButtonText: btnNames.cancelButtonText,
    },
  };
  wrapper = mount(<ConfirmDialog {...props} />);
});

test("should render ConfirmDialog correctly", () => {
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should call correct method by clicking actions buttons (with new btn names)", () => {
  const deleteBtn = wrapper.find("#test-confirm-dialog-delete-btn").hostNodes();
  const dontBtn = wrapper.find("#test-confirm-dialog-dont-btn").hostNodes();

  expect(deleteBtn.exists()).toBeTruthy();
  expect(deleteBtn.text()).toBe(btnNames.confirmButtonText);
  deleteBtn.simulate("click");
  expect(props.handleConfirm).toBeCalled();

  expect(dontBtn.exists()).toBeTruthy();
  expect(dontBtn.text()).toBe(btnNames.cancelButtonText);
  dontBtn.simulate("click");
  expect(props.closeDialog).toBeCalled();
});
