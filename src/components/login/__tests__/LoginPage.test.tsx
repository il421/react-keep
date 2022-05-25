import { mount, ReactWrapper } from "enzyme";
import { ValidationErrors } from "final-form";
import React from "react";

import { Errors } from "../../../common";
import {
  triggerCheckboxChange,
  triggerInputChange
} from "../../../common/testUtils";
import { user } from "../../../testData/users";
import { Props, LoginPage, getValidationErrors } from "../LoginPage";

let wrapper: ReactWrapper | undefined, props: Props;

beforeEach(() => {
  props = {
    startLogin: jest.fn(),
    startSignUp: jest.fn(),
    loading: false
  };
  wrapper = mount(<LoginPage {...props} />);
});

afterEach(() => {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }
});

describe("Rendering", () => {
  test("should render LoginPage correctly", () => {
    if (wrapper) {
      expect(wrapper.debug()).toMatchSnapshot();
    }
  });
});

describe("Submitting", () => {
  test("should logIn with  correct data", () => {
    if (wrapper) {
      triggerInputChange(wrapper, { name: "email" }, user.email);
      triggerInputChange(wrapper, { name: "password" }, user.password);

      wrapper.find("form").simulate("focus").simulate("submit");
      expect(props.startLogin).toHaveBeenLastCalledWith(
        user.email,
        user.password
      );
      expect(props.startSignUp).not.toBeCalled();
    }
  });

  test("should submit logIn correct data correctly", () => {
    if (wrapper) {
      triggerInputChange(wrapper, { name: "email" }, user.email);
      triggerInputChange(wrapper, { name: "password" }, user.password);
      triggerCheckboxChange(wrapper, { name: "isNew" }, true);

      wrapper.find("form").simulate("focus").simulate("submit");
      expect(props.startSignUp).toHaveBeenLastCalledWith(
        user.email,
        user.password
      );
      expect(props.startLogin).not.toBeCalled();
    }
  });

  test("should not submit with invalid email correctly", () => {
    if (wrapper) {
      triggerInputChange(wrapper, { name: "email" }, "email");
      triggerInputChange(wrapper, { name: "password" }, user.password);
      triggerCheckboxChange(wrapper, { name: "isNew" }, true);

      wrapper.find("form").simulate("focus").simulate("submit");
      expect(props.startSignUp).not.toBeCalled();
      expect(props.startLogin).not.toBeCalled();
    }
  });
});

describe("Validation", () => {
  test("should return no errors", () => {
    const noErrors: ValidationErrors = getValidationErrors({
      email: user.email,
      password: user.password,
      isNew: false
    });
    expect(Object.keys(noErrors).length).toBe(0);
  });

  test("should return email required", () => {
    const emailIsRequiredError: ValidationErrors = getValidationErrors({
      email: "",
      password: user.password,
      isNew: false
    });
    expect(Object.keys(emailIsRequiredError).length).toBe(1);
    expect(emailIsRequiredError.email).toBe(Errors.required);
  });

  test("should return email is not valid", () => {
    const emailIsRequiredError: ValidationErrors = getValidationErrors({
      email: "il.com",
      password: user.password,
      isNew: false
    });
    expect(Object.keys(emailIsRequiredError).length).toBe(1);
    expect(emailIsRequiredError.email).toBe(Errors.email);
  });

  test("should return password required", () => {
    const emailIsRequiredError: ValidationErrors = getValidationErrors({
      email: user.email,
      password: "",
      isNew: false
    });
    expect(Object.keys(emailIsRequiredError).length).toBe(1);
    expect(emailIsRequiredError.password).toBe(Errors.required);
  });

  test("should return password to short", () => {
    const emailIsRequiredError: ValidationErrors = getValidationErrors({
      email: user.email,
      password: "123",
      isNew: false
    });
    expect(Object.keys(emailIsRequiredError).length).toBe(1);
    expect(emailIsRequiredError.password).toBe(Errors.password);
  });
});
