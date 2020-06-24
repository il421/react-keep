import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { TextInputField, TextInputFieldProps } from "../TextInputField";
import { Form } from "react-final-form";
import { ValidationErrors } from "final-form";
import { emailRegEx, Errors } from "../../../common";
import { LoginFormValues } from "../../login/LoginPage";

let props: TextInputFieldProps, wrapper: ReactWrapper<TextInputFieldProps, {}>;

beforeEach(() => {
  props = {
    className: "className",
    name: "name",
  };
});

test("should render TextInputField, and contain input element", () => {
  wrapper = mount<TextInputFieldProps>(
    <Form initialValues={{ name: "" }} onSubmit={() => {}}>
      {() => <TextInputField {...props} />}
    </Form>
  );
  expect(wrapper.debug()).toMatchSnapshot();
  expect(wrapper.find("input[name='name']").exists()).toBeTruthy();
});

test("should contain textarea element", () => {
  wrapper = mount<TextInputFieldProps>(
    <Form initialValues={{}} onSubmit={() => {}}>
      {() => <TextInputField {...props} isTextArea={true} />}
    </Form>
  );
  expect(wrapper.find("textarea[name='name']").exists()).toBeTruthy();
});

test("should render error message after invalid submitting", () => {
  wrapper = mount<TextInputFieldProps>(
    <Form
      initialValues={{ name: undefined }}
      onSubmit={() => {}}
      validate={(values: { name: string | undefined }): ValidationErrors => {
        const errors: ValidationErrors = {};
        const { name } = values;

        if (!name) {
          errors.name = Errors.required;
        }

        return errors;
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <TextInputField {...props} />
        </form>
      )}
    </Form>
  );

  expect(wrapper.find("form").exists()).toBeTruthy();
  wrapper.find("form").simulate("focus").simulate("submit");
  expect(wrapper.find("#error-message-name").exists()).toBeTruthy();
  expect(wrapper.find("#error-message-name").text()).toBe(Errors.required);
});
