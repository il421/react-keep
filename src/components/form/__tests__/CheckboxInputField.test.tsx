import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { Form } from "react-final-form";

import {
  CheckboxInputField,
  CheckboxInputFieldProps
} from "../CheckboxInputField";

let props: CheckboxInputFieldProps,
  wrapper: ReactWrapper<CheckboxInputFieldProps, {}>;

beforeEach(() => {
  props = {
    className: "className",
    name: "name",
    id: "id"
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
