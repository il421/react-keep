import React from "react";
import { mount, ReactWrapper } from "enzyme";
import {
  CheckboxInputField,
  CheckboxInputFieldProps,
} from "../CheckboxInputField";
import { Form } from "react-final-form";

let props: CheckboxInputFieldProps,
  wrapper: ReactWrapper<CheckboxInputFieldProps, {}>;

beforeEach(() => {
  props = {
    className: "className",
    name: "name",
    id: "id",
  };
});

test("should render CheckboxInputField, and contain input element", () => {
  wrapper = mount<CheckboxInputFieldProps>(
    <Form initialValues={{}} onSubmit={() => {}}>
      {() => <CheckboxInputField {...props} />}
    </Form>
  );
  expect(wrapper.debug()).toMatchSnapshot();
  expect(wrapper.find("#id").exists()).toBeTruthy();
  expect(wrapper.find("label[htmlFor='id']").exists()).toBeTruthy();
});
