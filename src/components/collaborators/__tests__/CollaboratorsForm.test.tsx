import { mount, ReactWrapper } from "enzyme";
import { ValidationErrors } from "final-form";
import React from "react";

import { defaultAuthState } from "../../../actions/__tests__/auth.test";
import { Errors } from "../../../common";
import { WithFontAwesome } from "../../../common/WithFontAwesome";
import { collaborators } from "../../../testData/users";
import {
  CollaboratorForm,
  Props,
  getValidationErrors
} from "../CollaboratorForm";

let wrapper: ReactWrapper | undefined, props: Props;

beforeEach(() => {
  props = {
    collaborators,
    auth: defaultAuthState.auth,
    addCollaborator: jest.fn()
  };
  wrapper = mount(
    <WithFontAwesome>
      <CollaboratorForm {...props} />
    </WithFontAwesome>
  );
});

afterEach(() => {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }
});

describe("Rendering", () => {
  test("should render CollaboratorForm correctly", () => {
    if (wrapper) {
      expect(wrapper.debug()).toMatchSnapshot();
    }
  });
});

describe("Validation", () => {
  test("should return no errors", () => {
    const noErrors: ValidationErrors = getValidationErrors(
      props.auth.email!,
      collaborators.map(c => c.email!)
    )({
      email: "test@test.com"
    });
    expect(Object.keys(noErrors).length).toBe(0);
  });

  test("should return value required", () => {
    const requiredError: ValidationErrors = getValidationErrors(
      props.auth.email!,
      collaborators.map(c => c.email!)
    )({
      email: ""
    });
    expect(Object.keys(requiredError).length).toBe(1);
    expect(requiredError.email).toBe(Errors.required);
  });

  test("should return not email", () => {
    const requiredError: ValidationErrors = getValidationErrors(
      props.auth.email!,
      collaborators.map(c => c.email!)
    )({
      email: "test"
    });
    expect(Object.keys(requiredError).length).toBe(1);
    expect(requiredError.email).toBe(Errors.email);
  });

  test("should return currentEmail", () => {
    const requiredError: ValidationErrors = getValidationErrors(
      props.auth.email!,
      collaborators.map(c => c.email!)
    )({
      email: props.auth.email!
    });
    expect(Object.keys(requiredError).length).toBe(1);
    expect(requiredError.email).toBe(Errors.currentEmail);
  });

  test("should return existing collaborator", () => {
    const requiredError: ValidationErrors = getValidationErrors(
      props.auth.email!,
      ["test@test.com"]
    )({
      email: "test@test.com"
    });
    expect(Object.keys(requiredError).length).toBe(1);
    expect(requiredError.email).toBe(Errors.existingCollaborator);
  });
});
