import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { triggerInputChange } from "../../../common/testUtils";
import { TagForm, Props, getValidationErrors } from "../TagForm";
import { tags } from "../../../testData/tags";
import { ValidationErrors } from "final-form";
import { user } from "../../../testData/users";
import { Errors } from "../../../common";

let wrapper: ReactWrapper | undefined, props: Props;

beforeEach(() => {
  props = {
    tags: tags,
    addTag: jest.fn(),
  };
  wrapper = mount(<TagForm {...props} />);
});

afterEach(() => {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }
});

describe("Rendering", () => {
  test("should render TagForm correctly", () => {
    if (wrapper) {
      expect(wrapper.debug()).toMatchSnapshot();
    }
  });
});

describe("Submitting", () => {
  test("should add tag", () => {
    if (wrapper) {
      expect(wrapper.exists(".tags-form")).toBeTruthy();

      // set values
      triggerInputChange(wrapper, { name: "value" }, "test");
      wrapper.find("form").simulate("focus").simulate("submit");
      expect(props.addTag).toHaveBeenLastCalledWith("test");
    }
  });
});

describe("Validation", () => {
  test("should return no errors", () => {
    const noErrors: ValidationErrors = getValidationErrors({
      value: "value",
    });
    expect(Object.keys(noErrors).length).toBe(0);
  });

  test("should return value required", () => {
    const requiredError: ValidationErrors = getValidationErrors({
      value: "",
    });
    expect(Object.keys(requiredError).length).toBe(1);
    expect(requiredError.value).toBe(Errors.required);
  });

  test("should return value 20 characters long", () => {
    const requiredError: ValidationErrors = getValidationErrors({
      value: "123456789123456789123456789",
    });
    expect(Object.keys(requiredError).length).toBe(1);
    expect(requiredError.value).toBe(Errors.tag);
  });
});
