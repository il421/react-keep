import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { TextInputField, TextInputFieldProps } from "../TextInputField";
import { Form } from "react-final-form";
import { ValidationErrors } from "final-form";
import { Errors } from "../../../common";
import { FileFormField, FileFormFieldProps } from "../FileFormField";

let props: FileFormFieldProps, wrapper: ReactWrapper<FileFormFieldProps, {}>;

beforeEach(() => {
  props = {
    className: "className",
    name: "name",
    id: "id",
  };
});

test("should render FileFormField", () => {
  wrapper = mount<FileFormFieldProps>(
    <Form initialValues={{ name: "" }} onSubmit={() => {}}>
      {() => <FileFormField {...props} />}
    </Form>
  );
  expect(wrapper.debug()).toMatchSnapshot();
  expect(wrapper.find("input[name='name']").exists()).toBeTruthy();
});

test("should render error message after invalid submitting", () => {
  wrapper = mount<FileFormFieldProps>(
    <Form
      initialValues={{ name: undefined }}
      onSubmit={() => {}}
      validate={(values: { name: File | undefined }): ValidationErrors => {
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
          <FileFormField {...props} />
        </form>
      )}
    </Form>
  );

  expect(wrapper.find("form").exists()).toBeTruthy();
  wrapper.find("form").simulate("focus").simulate("submit");
  expect(wrapper.find("#error-message-name").exists()).toBeTruthy();
  expect(wrapper.find("#error-message-name").text()).toBe(Errors.required);
});
